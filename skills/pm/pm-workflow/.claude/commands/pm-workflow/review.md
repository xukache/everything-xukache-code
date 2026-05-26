# /pm-workflow:review

Run quality review for a stage.

Read `.claude/skills/pm-workflow/references/commands/review.md`, then use the `quality-reviewer` subagent. For `init`, the review must fail unless clarification is user-confirmed and concepts are aligned. For later stages, the review must fail when `## 文档同步检查` is missing, placeholder-only, or does not record synced documents / concrete no-sync reasons for risky changes.
