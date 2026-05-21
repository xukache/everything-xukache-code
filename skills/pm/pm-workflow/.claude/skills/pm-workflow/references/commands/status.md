# status 命令

当用户输入 `$pm-workflow status`、"当前进度"、"现在到哪一步" 或类似意图时，使用本命令。

## 负责角色

必须启动当前 CLI 结构下的产品经理子 agent 汇总当前状态：Codex 使用 `.codex/agents/product-manager.toml`，Claude Code 使用 `.claude/agents/product-manager.md`。

如果当前环境无法启动产品经理子 agent，必须停止状态汇总，不修改任何产物，并提示用户在支持项目子 agent 调度的 CLI 中打开当前工作室目录后重试。

## 输入

- `docs/workflow-state.json`
- `docs/`、`prototype/`、`outputs/dev-package/` 下已经存在的文件

## 必须执行的流程

1. 总结当前阶段、已有产物、审核轮次、最近审核结论和推荐下一步。
2. 提醒缺失的预期产物，但不要因此阻断用户。
3. 询问用户下一步要做什么：审核、修改，还是继续推进。
