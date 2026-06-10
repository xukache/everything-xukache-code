# /pm-workflow:review

Run quality review for a stage.

Read `.claude/skills/pm-workflow/references/commands/review.md`, then use the `quality-reviewer` subagent. Stages: `init | blueprint | design | analyze | architect | plan | deliver`. For `init`, the review must fail unless clarification is user-confirmed and concepts are aligned. For later stages, the review applies the consistency backstop from craft-principles: verify the stage artifact has not silently changed upstream facts (especially the blueprint Mx-Fx feature IDs) without applying the major-change protocol; verify traceability between this stage and the blueprint.
