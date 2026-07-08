# /pm-workflow:blueprint

Run Stage 00.5 blueprint (五层递进设计底稿).

Read `.claude/skills/pm-workflow/references/commands/blueprint.md`. The product-manager subagent leads this stage; do not start a separate analyze/design subagent. Apply the five-layer method from `.claude/skills/pm-workflow/references/blueprint-method.md` and the cross-stage rules in `.claude/skills/pm-workflow/references/craft-principles.md`. Only proceed when `docs/workflow-state.json` has `clarification.status=user_confirmed` and `clarification.concepts_aligned=true`.
