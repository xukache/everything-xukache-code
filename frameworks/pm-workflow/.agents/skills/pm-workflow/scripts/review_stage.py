#!/usr/bin/env python3
"""Generate a PM Workflow stage review draft and update review rounds."""

from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path


SKILL_ROOT = Path(__file__).resolve().parents[1]
TEMPLATE_DIR = SKILL_ROOT / "templates"
ROLE_SKILLS_DIR = SKILL_ROOT / "role-skills"
REPO_SKILLS_DIR = SKILL_ROOT.parent
REVIEW_TEMPLATE = "quality-review/templates/review-stage.md"

STAGE_ARTIFACTS: dict[str, list[str]] = {
    "init": ["docs/project-config.md"],
    "analyze": ["docs/prd.md", "docs/handoff-prd.md"],
    "architect": ["docs/tech-architecture.md", "docs/handoff-architecture.md"],
    "design": [
        "docs/ui-design.md",
        "docs/handoff-ui.md",
        "docs/prototype-review.md",
        "prototype/directions/index.html",
        "prototype/index.html",
    ],
    "plan": ["docs/dev-tasks.md"],
    "deliver": [
        "docs/project-config.md",
        "docs/prd.md",
        "docs/tech-architecture.md",
        "docs/ui-design.md",
        "docs/dev-tasks.md",
        "AGENTS.md",
        "prototype/index.html",
    ],
}

NEXT_STAGE = {
    "init": "analyze",
    "analyze": "architect",
    "architect": "design",
    "design": "plan",
    "plan": "deliver",
    "deliver": "status",
}

DOWNSTREAM_ROLE = {
    "init": "需求分析师",
    "analyze": "技术架构师",
    "architect": "界面设计师",
    "design": "开发规划师",
    "plan": "Codex 执行者",
    "deliver": "最终接包人",
}

PLACEHOLDER_PATTERNS = ["待补充", "TODO", "[TODO]", "{{"]


def default_clarification() -> dict:
    return {
        "status": "not_started",
        "summary": "",
        "missing_context": [],
        "materials_needed": [],
        "completion_criteria": {
            "target_user": False,
            "scenario_problem": False,
            "desired_outcome": False,
            "first_platform": False,
            "mvp_boundary": False,
            "no_blocking_questions": False,
        },
        "user_confirmed_at": None,
    }


def read_text(path: Path) -> str:
    if not path.exists() or path.is_dir():
        return ""
    return path.read_text(encoding="utf-8", errors="ignore")


def template_path(name: str) -> Path:
    central_path = TEMPLATE_DIR / name
    if central_path.exists():
        return central_path
    source_role_path = ROLE_SKILLS_DIR / name
    if source_role_path.exists():
        return source_role_path
    repo_role_path = REPO_SKILLS_DIR / name
    if repo_role_path.exists():
        return repo_role_path
    raise FileNotFoundError(f"Template not found: {name}")


def load_state(root: Path) -> dict:
    state_path = root / "docs" / "workflow-state.json"
    if not state_path.exists():
        return {
            "project_name": root.name,
            "current_stage": "init",
            "recommended_next": "clarify init",
            "clarification": default_clarification(),
            "pending_user_questions": [],
            "user_confirmation_required": True,
            "artifacts": {},
            "reviews": {},
            "notes": [],
        }
    try:
        return json.loads(state_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {
            "project_name": root.name,
            "current_stage": "init",
            "recommended_next": "clarify init",
            "clarification": default_clarification(),
            "pending_user_questions": [],
            "user_confirmation_required": True,
            "artifacts": {},
            "reviews": {},
            "notes": ["workflow-state.json was invalid JSON when review ran."],
        }


def save_state(root: Path, state: dict) -> None:
    state_path = root / "docs" / "workflow-state.json"
    state_path.parent.mkdir(parents=True, exist_ok=True)
    state_path.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def extract_ids(text: str, prefix: str) -> set[str]:
    if prefix == "feature":
        return set(re.findall(r"\bM\d+-F\d+\b", text))
    if prefix == "task":
        return set(re.findall(r"\bT\d{3,}\b", text))
    return set()


def score_stage(root: Path, stage: str) -> dict:
    state = load_state(root)
    expected = STAGE_ARTIFACTS[stage]
    present = [item for item in expected if (root / item).exists()]
    missing = [item for item in expected if item not in present]
    required_count = len(expected)
    present_count = len(present)
    if stage == "design":
        required_count += 2
        screenshots_dir = root / "prototype" / "review" / "screenshots"
        screenshot_files = []
        if screenshots_dir.exists():
            screenshot_files = [
                path
                for path in screenshots_dir.rglob("*")
                if path.is_file() and path.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}
            ]
        if screenshot_files:
            present_count += 1
        else:
            missing.append("prototype/review/screenshots/")
        if (root / ".agents" / "skills" / "impeccable" / "SKILL.md").exists():
            present_count += 1
        else:
            missing.append(".agents/skills/impeccable/SKILL.md")
    contents = "\n\n".join(read_text(root / item) for item in expected)
    has_placeholder = any(pattern in contents for pattern in PLACEHOLDER_PATTERNS)
    total_chars = len(contents.strip())
    init_not_confirmed = stage == "init" and not clarification_confirmed(state)
    analyze_has_open_questions = stage == "analyze" and has_blocking_analyze_questions(state, read_text(root / "docs" / "prd.md"))

    if init_not_confirmed:
        missing.append("docs/workflow-state.json: clarification.status=user_confirmed")
    if analyze_has_open_questions:
        missing.append("docs/prd.md: 待用户回答问题未清空或文档仍为 draft")

    completeness = 10 if not missing else max(1, round(10 * present_count / max(required_count, 1)))
    if has_placeholder:
        completeness = min(completeness, 6)
    if init_not_confirmed or analyze_has_open_questions:
        completeness = min(completeness, 5)

    clarity = 9 if total_chars > 2500 and not has_placeholder else 6 if total_chars > 800 else 3
    if has_placeholder:
        clarity = min(clarity, 5)
    if analyze_has_open_questions:
        clarity = min(clarity, 5)

    consistency, consistency_note = consistency_score(root, stage)
    if init_not_confirmed:
        consistency = min(consistency, 5)
        consistency_note = "需求澄清尚未获得用户确认，不能视为初始化完成。"
    executability = executability_score(contents, stage, has_placeholder)
    if init_not_confirmed or analyze_has_open_questions:
        executability = min(executability, 5)

    scores = {
        "completeness": completeness,
        "clarity": clarity,
        "consistency": consistency,
        "executability": executability,
    }
    average = round(sum(scores.values()) / 4, 1)
    scores["average"] = average
    scores["missing"] = missing
    scores["has_placeholder"] = has_placeholder
    scores["consistency_note"] = consistency_note
    scores["init_not_confirmed"] = init_not_confirmed
    scores["analyze_has_open_questions"] = analyze_has_open_questions
    return scores


def clarification_confirmed(state: dict) -> bool:
    clarification = state.get("clarification") or {}
    criteria = clarification.get("completion_criteria") or {}
    all_criteria_done = bool(criteria) and all(bool(value) for value in criteria.values())
    return (
        clarification.get("status") == "user_confirmed"
        and not state.get("user_confirmation_required", True)
        and all_criteria_done
    )


def has_blocking_analyze_questions(state: dict, prd: str) -> bool:
    pending = state.get("pending_user_questions") or []
    if pending:
        return True
    if re.search(r"当前状态[：:]\s*draft", prd, re.IGNORECASE):
        return True
    if "用户问题是否已回答：否" in prd or "用户问题是否已回答: 否" in prd:
        return True
    unanswered_blocking_row = re.search(r"\|[^|\n]+未回答[^|\n]*\|[^|\n]*是[^|\n]*\|", prd)
    return bool("## 待用户回答问题" in prd and unanswered_blocking_row)


def consistency_score(root: Path, stage: str) -> tuple[int, str]:
    prd = read_text(root / "docs" / "prd.md")
    tech = read_text(root / "docs" / "tech-architecture.md")
    ui = read_text(root / "docs" / "ui-design.md")
    tasks = read_text(root / "docs" / "dev-tasks.md")

    prd_ids = extract_ids(prd, "feature")
    if stage == "init":
        return 8, "初始化阶段主要检查项目配置自身一致性。"
    if not prd_ids and stage != "analyze":
        return 4, "上游需求功能编号缺失，无法做跨阶段对账。"

    target_text = {
        "analyze": prd,
        "architect": tech,
        "design": ui,
        "plan": tasks,
        "deliver": "\n".join([tech, ui, tasks]),
    }.get(stage, "")

    target_ids = extract_ids(target_text, "feature")
    if stage == "analyze":
        return (8, "需求文档已出现功能编号。") if target_ids else (4, "需求文档未出现 Mx-Fx 功能编号。")

    missing_ids = sorted(prd_ids - target_ids)
    if missing_ids:
        return 5, "以下需求功能编号未在本阶段产物中出现：" + ", ".join(missing_ids)
    return 9, "需求功能编号在本阶段产物中均有出现。"


def executability_score(contents: str, stage: str, has_placeholder: bool) -> int:
    required_terms = {
        "init": ["下一步", "工作量", "核心场景"],
        "analyze": ["验收", "P0", "不做"],
        "architect": ["接口", "数据库", "部署"],
        "design": ["原型", "状态", "prototype", "directions", "impeccable", "screenshots"],
        "plan": ["T001", "验证方式", "前置依赖"],
        "deliver": ["AGENTS", "dev-tasks", "prototype"],
    }[stage]
    hits = sum(1 for term in required_terms if term in contents)
    score = 4 + hits * 2
    if has_placeholder:
        score = min(score, 6)
    return max(1, min(score, 10))


def result_from_scores(scores: dict, override: str) -> str:
    if override in {"pass", "fail"}:
        return "通过" if override == "pass" else "不通过"
    if scores["average"] >= 8 and all(scores[key] >= 6 for key in ["completeness", "clarity", "consistency", "executability"]):
        return "通过"
    return "不通过"


def build_report(root: Path, stage: str, round_no: int, result: str, scores: dict) -> str:
    template = template_path(REVIEW_TEMPLATE).read_text(encoding="utf-8")
    missing = scores["missing"]
    placeholder_note = "存在待补充占位。" if scores["has_placeholder"] else "未发现明显占位。"
    simulation_result = (
        "结论：下游角色可以基于当前产物继续工作；如用户有偏好调整，可作为非阻塞微调处理。"
        if result == "通过"
        else "结论：若存在缺失或占位，下游执行会产生猜测，需要返工。"
    )

    simulation = (
        f"以下游角色“{DOWNSTREAM_ROLE[stage]}”视角检查：\n\n"
        f"- 可以使用的内容：已找到 {len(STAGE_ARTIFACTS[stage]) - len(missing)} 个阶段产物。\n"
        f"- 主要阻碍：{'缺失 ' + ', '.join(missing) if missing else placeholder_note}\n"
        f"- {simulation_result}"
    )

    reconciliation = reconciliation_table(root, stage)
    issues = build_issues(scores, round_no)
    rework = build_rework(stage, result, scores, round_no)
    next_step = build_next_step(stage, result, round_no)

    replacements = {
        "{{STAGE}}": stage,
        "{{ROUND}}": str(round_no),
        "{{RESULT}}": result,
        "{{COMPLETENESS}}": str(scores["completeness"]),
        "{{COMPLETENESS_NOTE}}": "缺失：" + ", ".join(missing) if missing else "阶段产物齐全。" + (" 但存在占位。" if scores["has_placeholder"] else ""),
        "{{CLARITY}}": str(scores["clarity"]),
        "{{CLARITY_NOTE}}": "内容长度和占位情况的启发式评分。",
        "{{CONSISTENCY}}": str(scores["consistency"]),
        "{{CONSISTENCY_NOTE}}": scores["consistency_note"],
        "{{EXECUTABILITY}}": str(scores["executability"]),
        "{{EXECUTABILITY_NOTE}}": "按该阶段是否包含验收、验证、接口、任务或原型等执行要素评分。",
        "{{AVERAGE}}": str(scores["average"]),
        "{{AVERAGE_NOTE}}": "平均分 >= 8 且单项 >= 6 时视为脚本草稿通过。",
        "{{SIMULATION}}": simulation,
        "{{RECONCILIATION}}": reconciliation,
        "{{ISSUES}}": issues,
        "{{REWORK}}": rework,
        "{{NEXT_STEP}}": next_step,
    }
    for key, value in replacements.items():
        template = template.replace(key, value)
    return template


def reconciliation_table(root: Path, stage: str) -> str:
    prd_ids = extract_ids(read_text(root / "docs" / "prd.md"), "feature")
    if not prd_ids:
        return "| 对账项 | 状态 |\n|---|---|\n| 需求功能编号 | 未找到 Mx-Fx 编号 |"

    target_paths = {
        "architect": ["docs/tech-architecture.md"],
        "design": ["docs/ui-design.md"],
        "plan": ["docs/dev-tasks.md"],
        "deliver": ["docs/tech-architecture.md", "docs/ui-design.md", "docs/dev-tasks.md"],
    }.get(stage, ["docs/prd.md"])
    target_text = "\n".join(read_text(root / path) for path in target_paths)
    target_ids = extract_ids(target_text, "feature")

    lines = ["| 需求功能编号 | 本阶段覆盖 |", "|---|---|"]
    for feature_id in sorted(prd_ids):
        lines.append(f"| {feature_id} | {'是' if feature_id in target_ids else '否'} |")
    return "\n".join(lines)


def build_issues(scores: dict, round_no: int) -> str:
    issues: list[str] = []
    if scores["missing"]:
        issues.append("- 缺失阶段产物：" + ", ".join(scores["missing"]))
    if scores["has_placeholder"]:
        issues.append("- 文档仍包含“待补充”或 TODO，占位内容需要替换为真实决策。")
    if scores.get("init_not_confirmed"):
        issues.append("- 需求澄清尚未获得用户确认，`init` 不能判定完成。")
    if scores.get("analyze_has_open_questions"):
        issues.append("- PRD 仍是草稿或存在待用户回答问题，不能触发 analyze 通过。")
    if scores["consistency"] < 6:
        issues.append("- 跨阶段追溯不足，需求功能编号没有完整映射到当前阶段产物。")
    if scores["executability"] < 6:
        issues.append("- 下游执行信号不足，缺少验收、验证、接口、状态或任务粒度信息。")
    if round_no >= 3 and scores["average"] < 8:
        issues.append("- 已达到第三轮未通过，建议停止推进并先修复关键问题。")
    return "\n".join(issues) if issues else "- 未发现阻塞性问题。"


def build_rework(stage: str, result: str, scores: dict, round_no: int) -> str:
    if result == "通过":
        return "本阶段已通过，无需返工。可根据用户偏好做非阻塞微调。"

    suggestions = {
        "init": "补齐五个核心问题、核心场景、参考产品、特殊要求和工作量粗估。",
        "analyze": "先让用户回答 PRD 草稿中的待确认问题，再补齐 P0/P1/P2、Mx-Fx 功能编号、业务规则、不做清单和验收标准，并把文档状态改为 final。",
        "architect": "补齐需求到数据库、字段、接口、部署配置和技术风险的映射。",
        "design": "补齐 2-3 个设计方向、每个方向的首页 demo、prototype/directions/index.html 预览索引、docs/prototype-review.md、Playwright 截图证据、Impeccable 审查记录、页面清单、需求到界面映射和完整原型路径。",
        "plan": "补齐 Txxx 任务、前置依赖、涉及文件、执行指令、验证方式和边缘情况。",
        "deliver": "补齐缺失文档、审核报告、AGENTS.md 和 prototype 后重新打包。",
    }
    extra = "\n\n第三轮仍未通过：请向用户报告继续推进的具体风险。" if round_no >= 3 and scores["average"] < 8 else ""
    return suggestions[stage] + extra


def build_next_step(stage: str, result: str, round_no: int) -> str:
    next_stage = NEXT_STAGE[stage]
    if result == "通过":
        return f"建议进入 `{next_stage}`，或根据用户反馈继续微调本阶段。"
    if round_no >= 3:
        return "建议先返工，不要继续扩大后续阶段的不确定性；如用户坚持推进，需要明确记录风险。"
    return f"建议按返工建议修复后重新运行 `$pm-workflow review {stage}`；也可由用户决定带风险进入 `{next_stage}`。"


def update_review_state(root: Path, stage: str, round_no: int, result: str, report_path: Path) -> None:
    state = load_state(root)
    state.setdefault("artifacts", {})
    state.setdefault("reviews", {})
    state.setdefault("clarification", default_clarification())
    state.setdefault("pending_user_questions", [])
    state.setdefault("user_confirmation_required", True)
    state["current_stage"] = stage
    state["recommended_next"] = f"review {stage}" if result != "通过" else NEXT_STAGE[stage]
    state["artifacts"][stage] = STAGE_ARTIFACTS[stage]
    state["reviews"][stage] = {
        "round": round_no,
        "last_result": result,
        "report": str(report_path.relative_to(root)),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    save_state(root, state)


def review(root: Path, stage: str, override: str) -> Path:
    root = root.resolve()
    if stage not in STAGE_ARTIFACTS:
        raise RuntimeError(f"Unknown stage: {stage}. Available: {', '.join(STAGE_ARTIFACTS)}")

    state = load_state(root)
    previous = state.get("reviews", {}).get(stage, {}).get("round", 0)
    round_no = min(previous + 1, 3)

    scores = score_stage(root, stage)
    result = result_from_scores(scores, override)
    report = build_report(root, stage, round_no, result, scores)

    report_path = root / "docs" / f"review-{stage}.md"
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(report, encoding="utf-8")

    update_review_state(root, stage, round_no, result, report_path)
    return report_path


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate a PM Workflow stage review draft.")
    parser.add_argument("--root", default=".", help="Project root directory. Defaults to current directory.")
    parser.add_argument("--stage", required=True, choices=sorted(STAGE_ARTIFACTS), help="Stage to review.")
    parser.add_argument("--result", choices=["auto", "pass", "fail"], default="auto", help="Override review result for workflow simulations.")
    args = parser.parse_args()

    try:
        report_path = review(Path(args.root), args.stage, args.result)
    except RuntimeError as exc:
        print(f"ERROR: {exc}")
        return 1

    print(f"Review report generated: {report_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
