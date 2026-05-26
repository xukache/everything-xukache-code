# analyze 命令

当用户输入 `$pm-workflow analyze`、"开始分析需求"、"需求分析" 或类似意图时，使用本命令。

## 负责角色

必须启动当前 CLI 结构下的需求分析子 agent 执行需求分析：Codex 使用 `.codex/agents/demand-analyst.toml`，Claude Code 使用 `.claude/agents/demand-analyst.md`。产品经理负责保持对话节奏，并记录关键决策。

如果当前环境无法启动需求分析子 agent，必须停止需求分析，不生成或修改 `docs/prd.md`、`docs/handoff-prd.md` 和 `docs/workflow-state.json`，并提示用户在支持项目子 agent 调度的 CLI 中打开当前工作室目录后重试。

## 输入

- `docs/project-config.md`
- `docs/workflow-state.json`
- 当前对话中用户补充的澄清信息

## 必须执行的流程

1. 先输出阶段开场卡：当前用户情况、推荐方案、为什么这样选、接下来产出什么。
2. 检查 `clarification.status` 是否为 `user_confirmed`。未确认时默认停止需求分析，交回产品经理继续澄清；用户坚持跳过时必须记录风险。
3. 先生成符合新 1-8 章格式的 PRD 草稿；PRD 正文不写 `文档状态` 和 `待用户回答问题`。
4. 把问题抛给用户，等用户回答后再完善最终稿。
5. 草稿阶段必须把阻塞问题写入 `docs/workflow-state.json.pending_user_questions`；最终稿必须清空 `pending_user_questions`。
6. 执行四轮引导并映射到新 PRD：产品概述与目标用户、功能范围、核心业务流程、功能详细设计/规则/异常/接口、数据模型/权限/非功能。
7. 为每个功能分配 `M{模块号}-F{功能号}` 格式的编号。
8. 将功能划分为 P0、P1 或 P2。
9. 明确记录不在范围内的功能和范围边界。
10. 如 PRD 最终稿改变了产品定位、目标用户、平台、范围或 MVP 边界，必须同步回写 `docs/project-config.md`。
11. 写入或更新 `docs/prd.md` 和 `docs/handoff-prd.md`。
12. 更新 `docs/workflow-state.json`，记录阶段产物和上游同步说明；草稿阶段把 `recommended_next` 设置为 `answer analyze questions`，最终稿阶段清空 `pending_user_questions` 并设置为 `review analyze`。
13. 最终稿完成后自动启动 `quality_reviewer` 执行 `$pm-workflow review analyze`。

## 必须具备的追溯关系

`docs/prd.md` 必须在 `2.1 功能模块总览`、`4.x 功能详细设计`、`5.2 状态流转` 和接口需求中保持 `M{模块号}-F{功能号}` 可追溯；每个功能必须有优先级、用户角色、业务规则、异常边界、初步接口需求和验收信号。

## 收尾引导

草稿阶段结束时只抛出 `pending_user_questions` 中的问题。最终稿审核后询问用户：修改需求文档，还是开始技术架构设计。
