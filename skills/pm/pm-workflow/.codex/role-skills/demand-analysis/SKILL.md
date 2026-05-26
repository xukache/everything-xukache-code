---
name: demand-analysis
description: "需求分析师使用：把项目配置和用户补充说明整理为需求文档、功能编号、优先级、边界和验收标准。"
---

# 需求分析角色技能

服务于本工作室的需求分析师角色。

## 输入

- `docs/project-config.md`
- `docs/workflow-state.json`
- 用户补充说明
- 产品经理记录的开放问题

如果需求分析改变产品定位、目标用户、平台、范围或 MVP 边界，必须同步回写 `docs/project-config.md`，并在 `docs/workflow-state.json` 的 `notes` 记录同步说明。

## 输出

- `docs/requirement-alignment.md`
- `docs/prd.md`
- `docs/handoff-prd.md`

## 工作法

1. 开始前输出阶段开场卡：当前用户情况、推荐方案、选择原因、接下来产物。
2. 检查 `clarification.status=user_confirmed`；未确认时交回产品经理澄清，用户坚持跳过则记录风险。
3. 在写 PRD 之前，先生成并维护 `docs/requirement-alignment.md`，逐模块、逐页面、逐业务流程列出理解、边界、模糊点和推荐理解。
4. 产品经理必须把 `docs/requirement-alignment.md` 中的模块、页面、业务流程一个个提交给用户确认；每项确认前不得把相关内容写成 PRD 正式结论。
5. 只有 `docs/requirement-alignment.md` 整体确认状态为 `已确认`，且用户明确同意“可以开始写 PRD”，才能生成符合新 1-8 章格式的 PRD 草稿。
6. 对齐通过后生成 PRD 草稿，未解决问题只写入 `docs/workflow-state.json.pending_user_questions`，不写进 PRD 正文。
7. 草稿阶段不触发审核；最终稿完成后清空 `pending_user_questions`，把 `recommended_next` 设置为 `review analyze`，并自动触发 `quality_reviewer` 审核 analyze。
8. 做四轮引导并映射到新 PRD：产品概述与目标用户、功能范围、核心业务流程、功能详细设计/规则/异常/接口、数据模型/权限/非功能。
9. 先基于高频真实需求、使用人群、触发点和真实使用流程识别真需求与伪需求；低频、炫技、重复、增加理解成本或偏离高频路径的需求必须标记为合并、后置或删除。
10. 功能模块必须优先合并同类能力，避免写成一长串功能清单。
11. 每个功能必须有 `M{模块号}-F{功能号}`。
12. 每个功能必须标记 P0/P1/P2；每个 P0 必须说明对应的高频场景和流程位置。
13. P0 功能必须有业务规则、页面字段、页面操作、状态流转、权限、异常边界、初步接口需求和验收信号。
14. 明确不在范围内的功能，防止范围失控。
15. 下游分析若改变上游事实，必须同步回写上游源文档，不能只改 PRD。

## 检查表

- 是否有目标用户和核心场景。
- 是否有高频真实需求、使用触发点和真实使用流程。
- 是否识别并处理了低频、炫技、重复、增加理解成本的伪需求。
- 是否有功能编号体系。
- PRD 编写前是否已完成 `docs/requirement-alignment.md`，并逐模块、逐页面、逐业务流程获得用户确认。
- 模块、页面、业务流程中的模糊点是否全部有用户最终确认。
- 是否有 P0/P1/P2。
- P0 是否都能映射到高频场景和流程步骤。
- 是否有不在范围内的功能。
- 是否每个 P0 都能交给架构师继续设计。
- 是否没有 `pending_user_questions` 阻塞问题。
- 是否只有 `pending_user_questions` 清空后才触发 analyze 审核。
