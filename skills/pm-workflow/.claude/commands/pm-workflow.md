# /pm-workflow

启动 AI 产品开发工作室。

If the user provides a product idea, enter Stage 00 and run demand clarification in the main conversation. Do not delegate unconfirmed clarification to a subagent.

Read:

- `.claude/skills/pm-workflow/SKILL.md`
- `.claude/skills/pm-workflow/references/commands/init.md` when the user gives a product idea or says "澄清需求".

Route natural-language commands to the matching command file under `.claude/commands/pm-workflow/`.

Before moving from any stage into review or the next stage, run the consistency check from `.claude/skills/pm-workflow/references/craft-principles.md`. Downstream stages may not silently change upstream facts; if they need to, apply the major-change protocol (write back to upstream then propagate consistently).
