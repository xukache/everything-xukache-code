# everything-xukache-code

## PM Workflow CLI

`pm-workflow` 已发布为 npm 包：`pm-workflow-studio`。安装后可以用 `pmflow` 一条命令生成 Codex 或 Claude Code 工作室结构。

```bash
npm install -g pm-workflow-studio
pmflow init --ai codex --root ./pm-workflow-demo --name "习惯打卡"
pmflow init --ai claude --root ./pm-workflow-claude-demo --name "习惯打卡"
```

`pmflow` also exposes the alias `pm-workflow`. Package source lives in `skills/pm/pm-workflow/`.

`pmflow init` only requires Node.js. It does not require Python.
日常必备的skill存放
