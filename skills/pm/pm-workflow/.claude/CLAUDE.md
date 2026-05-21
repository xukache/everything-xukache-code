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

Stage 00 must also identify who uses the product frequently, the user's real high-frequency need, the trigger for opening the product, the user's start-to-finish flow, and the page/module reduction boundary. These details drive true-demand analysis and simple page access logic.

When a downstream document changes requirements, platform, scope, feature IDs, technical constraints, page paths, or acceptance criteria, update the corresponding upstream source document and record the sync in `docs/workflow-state.json` notes.

UI prototypes must not use emoji in visible copy, buttons, navigation, empty states, or prompts. Use an icon library, SVG, or image assets for icons. Body, form, button, and list text should default to 16px or larger; helper text may be smaller but not below 14px.

After `clarification.status=user_confirmed` and `clarification.concepts_aligned=true`, use the Claude Code subagents for later stages:

- `demand-analyst`: PRD draft and final requirements.
- `tech-architect`: technical architecture.
- `ui-designer`: UI direction, prototype, and Impeccable self-review.
- `dev-planner`: development task breakdown.
- `quality-reviewer`: stage review and gate checks.
- `product-manager`: status, delivery, and post-confirmation orchestration.
