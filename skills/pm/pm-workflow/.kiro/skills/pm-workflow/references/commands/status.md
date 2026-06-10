# status 命令

当用户输入 `$pm-workflow status`、"当前进度"、"现在到哪一步" 或类似意图时，使用本命令。

## 负责角色

由主 agent 派发 `product-manager` subagent 汇总当前状态，或用户用 `/product-manager` slash 命令显式触发。

## 输入

- `docs/workflow-state.json`
- `docs/`、`prototype/`、`outputs/dev-package/` 下已经存在的文件

## 必须执行的流程

1. 总结当前阶段、已有产物、审核轮次、最近审核结论和推荐下一步。
2. 提醒缺失的预期产物，但不要因此阻断用户。
3. 询问用户下一步要做什么：审核、修改，还是继续推进。
