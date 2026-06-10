# analyze 命令(PRD 后置)

当用户输入 `$pm-workflow analyze`、"开始分析需求"、"写 PRD"、"补齐 PRD" 或类似意图时,使用本命令。**2.0 起 PRD 后置**:基于已确认的蓝图(`docs/feature-flow-layout.md`)与 UI 定稿(`docs/ui-design.md`、`prototype/`)回填成文,而非凭空起草。

## 负责角色

由主 agent 派发 `demand-analyst` subagent 执行 PRD 撰写,或用户用 `/demand-analyst` slash 命令显式触发。

## 输入

- `docs/project-config.md`(产品定位、目标用户、平台、MVP 边界)
- `docs/feature-flow-layout.md`(蓝图五层定稿:信息架构、流程、页面、功能、交互;Mx-Fx 功能编号在第 4 层落定)
- `docs/ui-design.md`、`prototype/`(界面定稿与高保真原型,作为详细设计的可视化依据)
- `docs/workflow-state.json`
- 当前对话中用户补充的澄清信息

## 工艺准则

贯穿全程遵守 [craft-principles](../craft-principles.md):一次只抛一项、决策三件套、守边界、重大变革协议、一致性检查、可追溯。

## 必须执行的流程

1. **前置检查**:确认 `docs/feature-flow-layout.md` 五层均已定稿、`docs/ui-design.md` 与 `prototype/` 已通过审核。蓝图缺失或某层未确认时,先回到 `blueprint`;UI 未通过时,先回到 `design`。
2. **阶段开场卡**:当前用户情况、推荐方案(基于蓝图与 UI 回填 PRD)、为什么这样选(避免凭空起草、确保功能编号贯穿)、接下来产出 `docs/prd.md` 与 `docs/handoff-prd.md`。
3. **回填映射**:把蓝图中已确认的功能编号(Mx-Fx)、模块边界、流程、规则和交互逻辑映射为 PRD 1-8 章结构;UI 定稿的页面字段、操作、状态作为 4.x 详细设计的可视化依据。
4. **生成 PRD 草稿**:符合新 1-8 章格式;PRD 正文不写 `文档状态` 和 `待用户回答问题`。
5. **草稿阶段把阻塞问题写入 `docs/workflow-state.json.pending_user_questions`**;最终稿必须清空。
6. **优先级分配**:为每个功能保留蓝图给出的 P0/P1/P2 标记或 MVP 边界;明确不在范围内的功能。
7. **回写上游**:如 PRD 撰写过程中发现产品定位、目标用户、平台、范围或 MVP 边界与 `docs/project-config.md` 不一致,按 craft-principles 第 4 条「重大变革协议」处理:验证、梳理连锁影响、确认范围、全文一致传播、一致性检查。
8. **写入或更新 `docs/prd.md` 和 `docs/handoff-prd.md`**。
9. **更新 `docs/workflow-state.json`**:草稿阶段把 `recommended_next` 设置为 `answer analyze questions`;最终稿阶段清空 `pending_user_questions` 并设置为 `review analyze`。
10. **最终稿完成后自动派发 `quality-reviewer` subagent 执行 `$pm-workflow review analyze`**。

## 必须具备的追溯关系

`docs/prd.md` 必须在 `2.1 功能模块总览`、`4.x 功能详细设计`、`5.2 状态流转` 和接口需求中保持 `M{模块号}-F{功能号}` 可追溯,且与 `docs/feature-flow-layout.md` 第 4 层的编号完全一致。每个功能必须有优先级、用户角色、业务规则、异常边界、初步接口需求和验收信号。

`docs/handoff-prd.md` 总结架构和后续阶段需要的输入。

## 收尾引导

草稿阶段结束时只抛出 `pending_user_questions` 中的问题。最终稿审核后询问用户:修改 PRD,还是开始技术架构设计(architect)。
