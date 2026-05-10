# PM Workflow Bundled Subskills

This directory vendors helper skills used by `pm-workflow` so the workflow can run consistently even when a user's global skill environment does not have those skills installed.

## Resolution Rule

When `pm-workflow` asks for a helper skill, resolve it in this order:

1. Read `skills/pm/pm-workflow/subskills/<skill-name>/SKILL.md`.
2. Follow that skill's local references, scripts, and assets relative to its own directory.
3. Only if the bundled copy is missing or unusable, fall back to user-level skill locations such as `.agents/skills` or `.codex/skills`.
4. Record any fallback reason in `notes/requirements.md` when it affects prototype polish, document quality, or final delivery.

## Bundled Skills

| Subskill | Purpose in pm-workflow |
| --- | --- |
| `impeccable` | Prototype critique, polish, accessibility, responsiveness, visual hierarchy, and UI quality gate. |
| `ui-ux-pro-max` | Supplemental UX, layout, dashboard, accessibility, responsive, and component guidance without replacing the selected theme. |
| `prd-development` | Production-grade PRD structure and requirement depth patterns. |
| `user-story` | User story and Gherkin acceptance criteria patterns. |
| `epic-hypothesis` | Strategy, outcome, hypothesis, and validation framing for major initiatives. |
| `user-story-mapping` | Workflow, activity backbone, release slice, and story map structuring patterns. |

These copies are intentionally complete directories, not excerpts, so their internal references and scripts continue to work.
