#!/usr/bin/env python3
"""Package PM Workflow deliverables into outputs/dev-package/."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


SKILL_ROOT = Path(__file__).resolve().parents[1]
TEMPLATE_DIR = SKILL_ROOT / "templates"

CORE_DOCS = [
    "project-config.md",
    "prd.md",
    "handoff-prd.md",
    "tech-architecture.md",
    "handoff-architecture.md",
    "ui-design.md",
    "handoff-ui.md",
    "prototype-review.md",
    "dev-tasks.md",
    "workflow-state.json",
]


def ensure_safe_output(root: Path, output_dir: Path) -> None:
    root_resolved = root.resolve()
    output_resolved = output_dir.resolve()
    if root_resolved not in output_resolved.parents:
        raise RuntimeError(f"Refusing to package outside project root: {output_resolved}")


def copy_file_if_exists(src: Path, dest: Path, copied: list[str], missing: list[str]) -> None:
    if src.exists():
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)
        copied.append(str(dest.name))
    else:
        missing.append(src.name)


def generate_readme(missing: list[str]) -> str:
    template = (TEMPLATE_DIR / "delivery-README.md").read_text(encoding="utf-8")
    if missing:
        missing_section = "\n".join(f"- {item}" for item in missing)
    else:
        missing_section = "无。"
    return template.replace("{{MISSING_SECTION}}", missing_section)


def generate_delivery_agents(root: Path) -> str:
    product_name = root.name
    state_path = root / "docs" / "workflow-state.json"
    if state_path.exists():
        text = state_path.read_text(encoding="utf-8", errors="ignore")
        marker = '"project_name":'
        if marker in text:
            try:
                import json

                product_name = json.loads(text).get("project_name") or product_name
            except Exception:
                pass
    template = (TEMPLATE_DIR / "AGENTS.md").read_text(encoding="utf-8")
    return template.replace("{{PRODUCT_NAME}}", product_name)


def package(root: Path) -> None:
    root = root.resolve()
    docs_dir = root / "docs"
    prototype_dir = root / "prototype"
    output_dir = root / "outputs" / "dev-package"

    if not docs_dir.exists():
        raise RuntimeError("Missing docs/ directory. Run scaffold_project.py first.")

    ensure_safe_output(root, output_dir)

    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True)

    copied: list[str] = []
    missing: list[str] = []

    for filename in CORE_DOCS:
        copy_file_if_exists(docs_dir / filename, output_dir / filename, copied, missing)

    for review in sorted(docs_dir.glob("review-*.md")):
        shutil.copy2(review, output_dir / review.name)
        copied.append(review.name)

    (output_dir / "AGENTS.md").write_text(generate_delivery_agents(root), encoding="utf-8")
    copied.append("AGENTS.md")

    if prototype_dir.exists() and any(prototype_dir.iterdir()):
        shutil.copytree(
            prototype_dir,
            output_dir / "prototype",
            ignore=shutil.ignore_patterns("__pycache__", "*.pyc", ".DS_Store"),
        )
        copied.append("prototype/")
    else:
        missing.append("prototype/")

    (output_dir / "README.md").write_text(generate_readme(missing), encoding="utf-8")
    copied.append("README.md")

    print(f"Delivery package generated: {output_dir}")
    print("Copied:")
    for item in copied:
        print(f"  + {item}")
    if missing:
        print("Missing:")
        for item in missing:
            print(f"  - {item}")
    print("Quality completeness is owned by the quality reviewer; this script only packages and reports missing files.")


def main() -> int:
    parser = argparse.ArgumentParser(description="Package PM Workflow deliverables for Codex execution.")
    parser.add_argument("--root", default=".", help="Project root directory. Defaults to current directory.")
    args = parser.parse_args()

    try:
        package(Path(args.root))
    except RuntimeError as exc:
        print(f"ERROR: {exc}")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
