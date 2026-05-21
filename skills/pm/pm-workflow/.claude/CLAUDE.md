# PM Workflow for Claude Code

This directory is the Claude Code layout for PM Workflow. Use it when installing or vendoring this workflow into a Claude Code project.

## Claude Code Layout

- `.claude/skills/pm-workflow/SKILL.md`: main PM Workflow skill.
- `.claude/skills/{demand-analysis,tech-architecture,ui-prototype-design,dev-task-planning,quality-review}/SKILL.md`: role skills.
- `.claude/skills/impeccable/SKILL.md`: bundled third-party UI review skill.
- `.claude/agents/*.md`: Claude Code subagents converted from the Codex TOML agents.
- `.claude/commands/pm-workflow/*.md`: project slash commands.
- `.claude/settings.json`: project-level permissions and defaults for Claude Code.

## Operating Contract

Stage 00 demand clarification is handled by the main conversation agent, not a subagent. The main agent must preserve user wording, clarify real intent, align terminology and concepts, then ask the user to confirm "我理解得对不对" before analysis begins.

After `clarification.status=user_confirmed` and `clarification.concepts_aligned=true`, use the Claude Code subagents for later stages:

- `demand-analyst`: PRD draft and final requirements.
- `tech-architect`: technical architecture.
- `ui-designer`: UI direction, prototype, and Impeccable self-review.
- `dev-planner`: development task breakdown.
- `quality-reviewer`: stage review and gate checks.
- `product-manager`: status, delivery, and post-confirmation orchestration.

