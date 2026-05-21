# plan 命令

当用户输入 `$pm-workflow plan`、"开始规划"、"开发规划"、"任务拆解" 或类似意图时，使用本命令。

## 负责角色

必须启动 `.codex/agents/dev-planner.toml` 中的 `dev_planner` 子 agent 执行开发任务规划。

如果当前 Codex 环境无法启动 `dev_planner` 子 agent，必须停止开发任务规划，不生成或修改 `docs/dev-tasks.md` 和 `docs/workflow-state.json`，并提示用户在支持项目子 agent 调度的 Codex 运行方式中打开当前工作室目录后重试。

## 输入

- `docs/prd.md`
- `docs/tech-architecture.md`
- `docs/ui-design.md`
- `prototype/`

## 必须执行的流程

1. 先检查上游产物是否完整，发现阻塞问题时先报告。
2. 将实现工作拆成用户可见、可独立验证的任务。
3. 每个任务控制在约 5-20 分钟 AI 执行粒度。
4. 用 `Txxx` 编号明确标注任务依赖。
5. 写入或更新 `docs/dev-tasks.md`。
6. 更新 `docs/workflow-state.json`，记录阶段产物，并把 `recommended_next` 设置为 `review plan` 或 `deliver`。

## 必须具备的追溯关系

必须包含需求到任务的映射表：

- 功能编号
- 任务 ID
- 前置依赖
- 可能涉及的文件
- 验证方式
- 边缘情况

## 收尾引导

结束时询问用户：是否要先做任务规划审核、修改任务，还是打包交付。
