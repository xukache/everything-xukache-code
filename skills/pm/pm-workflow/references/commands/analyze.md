# analyze 命令

当用户输入 `$pm-workflow analyze`、"开始分析需求"、"需求分析" 或类似意图时，使用本命令。

## 负责角色

必须启动 `.codex/agents/demand-analyst.toml` 中的 `demand_analyst` 子 agent 执行需求分析。产品经理负责保持对话节奏，并记录关键决策。

如果当前 Codex 环境无法启动 `demand_analyst` 子 agent，必须停止需求分析，不生成或修改 `docs/prd.md`、`docs/handoff-prd.md` 和 `docs/workflow-state.json`，并提示用户在支持项目子 agent 调度的 Codex 运行方式中打开当前工作室目录后重试。

## 输入

- `docs/project-config.md`
- `docs/workflow-state.json`
- 当前对话中用户补充的澄清信息

## 必须执行的流程

1. 先输出阶段开场卡：当前用户情况、推荐方案、为什么这样选、接下来产出什么。
2. 检查 `clarification.status` 是否为 `user_confirmed`。未确认时默认停止需求分析，交回产品经理继续澄清；用户坚持跳过时必须记录风险。
3. 先生成 PRD 草稿，标记 `文档状态：draft`，并列出 `待用户回答问题`。
4. 把问题抛给用户，等用户回答后再完善最终稿。
5. 最终稿必须把 `文档状态` 改为 `final`，清空阻塞的 `待用户回答问题`。
6. 执行四轮引导：用户角色与场景、功能模块、优先级与边界、规则与验收。
7. 为每个功能分配 `M{模块号}-F{功能号}` 格式的编号。
8. 将功能划分为 P0、P1 或 P2。
9. 明确记录不做项和范围边界。
10. 写入或更新 `docs/prd.md` 和 `docs/handoff-prd.md`。
11. 更新 `docs/workflow-state.json`，记录阶段产物；草稿阶段把 `recommended_next` 设置为 `answer analyze questions`，最终稿阶段设置为 `review analyze`。
12. 最终稿完成后自动启动 `quality_reviewer` 执行 `$pm-workflow review analyze`。

## 必须具备的追溯关系

`docs/prd.md` 必须包含追溯表，字段包括：功能编号、优先级、用户角色、用户故事、业务规则、验收信号、是否进入最小可行版本。

## 收尾引导

草稿阶段结束时只抛出待用户回答问题。最终稿审核后询问用户：修改需求文档，还是开始技术架构设计。
