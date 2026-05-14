# status 命令

当用户输入 `$pm-workflow status`、"当前进度"、"现在到哪一步" 或类似意图时，使用本命令。

## 负责角色

必须委派 `.codex/agents/product-manager.toml` 中的 `product_manager` 子 agent 汇总当前状态。

如果当前 Codex 环境无法启动子 agent，必须先向用户说明“本次无法委派 product_manager，将由当前会话按产品经理角色执行”，然后再继续状态汇总。不要静默降级。

## 输入

- `docs/workflow-state.json`
- `docs/`、`prototype/`、`outputs/dev-package/` 下已经存在的文件

## 必须执行的流程

1. 总结当前阶段、已有产物、审核轮次、最近审核结论和推荐下一步。
2. 提醒缺失的预期产物，但不要因此阻断用户。
3. 询问用户下一步要做什么：审核、修改，还是继续推进。
