#!/usr/bin/env python3
"""Initialize a Codex-native PM Workflow framework workspace."""

from __future__ import annotations

import argparse
import os
import shutil
from pathlib import Path


SKILL_ROOT = Path(__file__).resolve().parents[1]
AGENT_DIR = SKILL_ROOT / "agents"
ROLE_SKILLS_DIR = SKILL_ROOT / "role-skills"
REPO_SKILLS_DIR = SKILL_ROOT.parent

TEMPLATE_DIR = SKILL_ROOT / "templates"

DOC_TEMPLATES = [
    ("project-config.md", "project-config.md"),
    ("demand-analysis/templates/prd.md", "prd.md"),
    ("demand-analysis/templates/handoff-prd.md", "handoff-prd.md"),
    ("tech-architecture/templates/tech-architecture.md", "tech-architecture.md"),
    ("tech-architecture/templates/handoff-architecture.md", "handoff-architecture.md"),
    ("ui-prototype-design/templates/ui-design.md", "ui-design.md"),
    ("ui-prototype-design/templates/handoff-ui.md", "handoff-ui.md"),
    ("ui-prototype-design/templates/prototype-review.md", "prototype-review.md"),
    ("dev-task-planning/templates/dev-tasks.md", "dev-tasks.md"),
]


def role_skills_dir() -> Path:
    if ROLE_SKILLS_DIR.exists():
        return ROLE_SKILLS_DIR
    return REPO_SKILLS_DIR


def template_path(name: str) -> Path:
    central_path = TEMPLATE_DIR / name
    if central_path.exists():
        return central_path
    role_path = role_skills_dir() / name
    if role_path.exists():
        return role_path
    raise FileNotFoundError(f"Template not found: {name}")


def render_template(name: str, product_name: str) -> str:
    source_path = template_path(name)
    content = source_path.read_text(encoding="utf-8")
    return content.replace("{{PRODUCT_NAME}}", product_name)


def write_if_missing(path: Path, content: str) -> bool:
    if path.exists():
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    return True


def copy_agents(root: Path) -> list[str]:
    target = root / ".codex" / "agents"
    target.mkdir(parents=True, exist_ok=True)
    copied: list[str] = []

    if not AGENT_DIR.exists():
        return copied

    for src in sorted(AGENT_DIR.glob("*.toml")):
        dest = target / src.name
        if not dest.exists():
            shutil.copy2(src, dest)
            copied.append(str(dest.relative_to(root)))
    return copied


def copy_tree_if_missing(src: Path, dest: Path) -> bool:
    if dest.exists():
        return False
    if src.is_dir():
        shutil.copytree(
            src,
            dest,
            ignore=shutil.ignore_patterns("__pycache__", "*.pyc", ".DS_Store"),
        )
    else:
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)
    return True


def copy_main_skill_if_missing(dest: Path) -> bool:
    if dest.exists():
        return False

    def ignore(path: str, names: list[str]) -> set[str]:
        current = Path(path)
        ignored = {"__pycache__", ".DS_Store"}
        ignored.update(name for name in names if name.endswith(".pyc"))
        if current.name == "pm-workflow":
            ignored.add("role-skills")
        if current.name == "agents":
            ignored.update(name for name in names if name.endswith(".toml"))
        return ignored

    shutil.copytree(SKILL_ROOT, dest, ignore=ignore)
    return True


def copy_repo_scoped_skills(root: Path) -> list[str]:
    target_root = root / ".agents" / "skills"
    target_root.mkdir(parents=True, exist_ok=True)
    copied: list[str] = []

    main_skill_dest = target_root / "pm-workflow"
    if copy_main_skill_if_missing(main_skill_dest):
        copied.append(str(main_skill_dest.relative_to(root)))

    if ROLE_SKILLS_DIR.exists():
        for src in sorted(ROLE_SKILLS_DIR.iterdir()):
            if not src.is_dir():
                continue
            dest = target_root / src.name
            if copy_tree_if_missing(src, dest):
                copied.append(str(dest.relative_to(root)))
    return copied


def impeccable_source_candidates() -> list[Path]:
    candidates: list[Path] = []
    for env_name in ["CODEX_HOME", "AGENTS_HOME"]:
        env_value = os.environ.get(env_name)
        if env_value:
            candidates.append(Path(env_value) / "skills" / "impeccable")
    home = Path.home()
    candidates.extend(
        [
            home / ".codex" / "skills" / "impeccable",
            home / ".agents" / "skills" / "impeccable",
        ]
    )
    return candidates


def copy_impeccable_skill(root: Path) -> tuple[list[str], list[str]]:
    target = root / ".agents" / "skills" / "impeccable"
    if target.exists():
        return [], []

    for src in impeccable_source_candidates():
        if (src / "SKILL.md").exists():
            copy_tree_if_missing(src, target)
            return [str(target.relative_to(root))], []

    searched = [str(path) for path in impeccable_source_candidates()]
    return [], searched


def write_plugin_manifest(root: Path) -> bool:
    manifest = """{
  "name": "pm-workflow",
  "version": "0.1.0",
  "description": "Codex-native AI product development studio framework.",
  "author": {
    "name": "[TODO: author name]",
    "email": "[TODO: author email]",
    "url": "[TODO: author url]"
  },
  "homepage": "[TODO: homepage]",
  "repository": "[TODO: repository]",
  "license": "[TODO: license]",
  "keywords": ["codex", "product-management", "workflow", "prototype", "planning"],
  "skills": "./.agents/skills/",
  "interface": {
    "displayName": "PM Workflow",
    "shortDescription": "AI 产品开发工作室：从模糊想法到可执行开发蓝图。",
    "longDescription": "A Codex-native product development studio with role agents, repo-scoped skills, staged documents, quality reviews, HTML prototypes, and delivery packaging.",
    "developerName": "[TODO: developer name]",
    "category": "Productivity",
    "capabilities": ["Interactive", "Write"],
    "defaultPrompt": [
      "我想做一个产品，帮我从需求开始梳理",
      "开始分析需求",
      "审核一下当前阶段"
    ],
    "brandColor": "#2563EB"
  }
}
"""
    return write_if_missing(root / ".codex-plugin" / "plugin.json", manifest)


def create_structure(root: Path, product_name: str) -> None:
    root = root.resolve()

    dirs = [
        root / "docs",
        root / "prototype",
        root / "prototype" / "directions",
        root / "prototype" / "pages",
        root / "prototype" / "layout",
        root / "prototype" / "components",
        root / "prototype" / "assets",
        root / "prototype" / "review",
        root / "prototype" / "review" / "screenshots",
        root / "prototype" / "review" / "screenshots" / "desktop",
        root / "prototype" / "review" / "screenshots" / "tablet",
        root / "prototype" / "review" / "screenshots" / "mobile",
        root / "outputs" / "dev-package",
        root / ".codex" / "agents",
        root / ".agents" / "context",
        root / ".agents" / "skills",
    ]
    for directory in dirs:
        directory.mkdir(parents=True, exist_ok=True)

    created: list[str] = []

    for template_name, filename in DOC_TEMPLATES:
        target = root / "docs" / filename
        if write_if_missing(target, render_template(template_name, product_name)):
            created.append(str(target.relative_to(root)))

    if write_if_missing(
        root / "docs" / "workflow-state.json",
        render_template("workflow-state.json", product_name),
    ):
        created.append("docs/workflow-state.json")

    if write_if_missing(
        root / "AGENTS.md",
        render_template("framework-AGENTS.md", product_name),
    ):
        created.append("AGENTS.md")

    if write_if_missing(
        root / "README.md",
        render_template("framework-README.md", product_name),
    ):
        created.append("README.md")

    if write_if_missing(
        root / "prototype" / "README.md",
        render_template("prototype-README.md", product_name),
    ):
        created.append("prototype/README.md")

    config_toml = """[agents]
max_threads = 6
max_depth = 1
job_max_runtime_seconds = 1800
"""
    if write_if_missing(root / ".codex" / "config.toml", config_toml):
        created.append(".codex/config.toml")

    copied_agents = copy_agents(root)
    copied_skills = copy_repo_scoped_skills(root)
    copied_impeccable, missing_impeccable_sources = copy_impeccable_skill(root)
    copied_skills.extend(copied_impeccable)
    if write_plugin_manifest(root):
        created.append(".codex-plugin/plugin.json")

    print(f"Project structure created: {root}")
    print("Created or confirmed directories: docs/, prototype/, prototype/review/screenshots/, outputs/dev-package/, .codex/agents/, .agents/context/, .agents/skills/")
    if created:
        print("Template files created:")
        for item in created:
            print(f"  + {item}")
    else:
        print("Template files already existed; no template files overwritten.")

    if copied_agents:
        print("Agent configs copied:")
        for item in copied_agents:
            print(f"  + {item}")
    else:
        print("Agent configs already existed or source agents were unavailable.")

    if copied_skills:
        print("Repo-scoped skills copied:")
        for item in copied_skills:
            print(f"  + {item}")
    else:
        print("Repo-scoped skills already existed or source role skills were unavailable.")

    if missing_impeccable_sources:
        print("Missing required Impeccable skill source. Searched:")
        for item in missing_impeccable_sources:
            print(f"  - {item}")
        print("Design stage must stop until .agents/skills/impeccable/ is available.")

    print("Next step: start Codex in this directory, then describe your product idea or say `开始分析需求`.")


def main() -> int:
    parser = argparse.ArgumentParser(description="Initialize a PM Workflow project structure.")
    parser.add_argument("--root", default=".", help="Project root directory. Defaults to current directory.")
    parser.add_argument("--name", default="My Product", help="Product name for templates.")
    args = parser.parse_args()

    create_structure(Path(args.root), args.name)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
