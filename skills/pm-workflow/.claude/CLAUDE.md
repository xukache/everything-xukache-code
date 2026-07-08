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

Do not reach conclusions too early. The agent must not stop clarification after only one or two rounds and assume the requirements are understood. Before starting analysis, explicitly ask whether the user has provided enough context to understand both the stated requirements and the hidden needs behind them, then wait for confirmation or additional context.

Stage 00 must also identify who uses the product frequently, the user's real high-frequency need, the trigger for opening the product, the user's start-to-finish flow, and the page/module reduction boundary. These details drive true-demand analysis and simple page access logic.

Apply the workflow craft principles end-to-end (see `.claude/skills/pm-workflow/references/craft-principles.md`): one decision at a time, three-piece decisions, hold the boundary, major-change protocol, consistency check, traceability. When any stage changes requirements, scope, feature IDs, interfaces, data, technical constraints, page paths, interaction flows, states, acceptance criteria, test strategy, or development execution method, run the major-change protocol: validate insight → map cascade → confirm scope → propagate consistently across upstream/current/downstream documents → consistency check.

As of 2.0 we no longer require a fixed `## 文档同步检查` table in each artifact; `review <stage>` performs the consistency backstop.

2.0 stage order: `init → blueprint → design → analyze → architect → plan → deliver`. Blueprint is the new central artifact (`docs/feature-flow-layout.md` — five layers: information architecture, core flows, per-page skeleton, per-feature with Mx-Fx, per-interaction). Design consumes blueprint directly. PRD is post-design (back-fill from blueprint + UI). Architect, plan, deliver follow.

Technical architecture must be confirmed iteratively before producing a final architecture document. Clarify platform, deployment environment, data scale, third-party dependencies, runtime/framework versions, package manager, scaffold method, team maintenance constraints, and unacceptable options.

UI design and prototype work must be confirmed iteratively before writing the final design document or implementing the complete prototype. Clarify page tasks, user paths, key fields, permission states, empty/error/loading states, interaction boundaries, and prototype implementation boundaries.

UI prototypes must not use emoji in visible copy, buttons, navigation, empty states, or prompts. Use an icon library, SVG, or image assets for icons. Body, form, button, and list text should default to 16px or larger; helper text may be smaller but not below 14px.

After `clarification.status=user_confirmed` and `clarification.concepts_aligned=true`, use the Claude Code subagents for later stages:

- `demand-analyst`: requirement alignment by module/page/business flow, then PRD draft and final requirements.
- `tech-architect`: technical architecture.
- `ui-designer`: UI direction, prototype, and Impeccable self-review.
- `dev-planner`: development task breakdown.
- `quality-reviewer`: stage review and gate checks.
- `product-manager`: status, delivery, and post-confirmation orchestration.
