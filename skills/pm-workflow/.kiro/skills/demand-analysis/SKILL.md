---
name: demand-analysis
description: "需求分析师使用(2.0 PRD 后置):基于已确认的蓝图 feature-flow-layout.md 与 UI 定稿回填生成 PRD,沿用蓝图 Mx-Fx 编号。"
---

# 需求分析角色技能(2.0 PRD 后置)

服务于本工作室的需求分析师角色。**2.0 起 PRD 后置**:基于已确认的蓝图与 UI 定稿回填成文,而非凭空起草。

## 工艺准则

贯穿全程遵守 craft-principles(详见 `references/craft-principles.md`):一次只抛一项、决策三件套、守边界、重大变革协议、一致性检查、可追溯。

## 输入

- `docs/project-config.md`
- **`docs/feature-flow-layout.md`**(蓝图,核心上游;Mx-Fx 功能编号在第 4 层落定)
- `docs/ui-design.md`、`prototype/`(界面定稿与高保真原型)
- `docs/workflow-state.json`
- 用户补充说明

## 输出

- `docs/prd.md`
- `docs/handoff-prd.md`

## 前置检查

- 确认 `docs/feature-flow-layout.md` 五层均已定稿。蓝图缺失或某层未确认时,先回到 `blueprint`。
- 确认 `docs/ui-design.md` 与 `prototype/` 已通过 `review design`。UI 未通过时,先回到 `design`。

如果回填过程中发现产品定位、目标用户、平台、范围或 MVP 边界与 `docs/project-config.md` 不一致,按 craft-principles 第 4 条「重大变革协议」处理:验证 → 梳理连锁影响 → 确认范围 → 全文一致传播(必要时回写 project-config / blueprint)→ 一致性检查。2.0 起不再要求固定 `## 文档同步检查` 表格;`review analyze` 做兜底。

## 工作法

1. 开始前输出阶段开场卡:当前用户情况、推荐方案(回填而非起草)、为什么这样选(避免脱离蓝图与 UI)、接下来产出。
2. 把蓝图功能编号、模块边界、流程、规则、交互逻辑映射为 PRD 1-8 章结构;UI 定稿的页面字段、操作、状态作为 4.x 详细设计的可视化依据。
3. 草稿阶段把仍需用户回答的阻塞问题写入 `docs/workflow-state.json.pending_user_questions`,不写进 PRD 正文。
4. 草稿阶段不触发审核;最终稿完成后清空 `pending_user_questions`,把 `recommended_next` 设置为 `review analyze`,并自动派发 `quality-reviewer` subagent 审核 analyze。
5. 功能编号沿用蓝图第 4 层定下的 `M{模块号}-F{功能号}`,不重新编号。
6. 每个功能保留蓝图给出的 P0/P1/P2 标记;P0 必须能映射到高频场景和流程位置(沿用蓝图第 2 层)。
7. P0 功能必须有业务规则、页面字段、页面操作、状态流转、权限、异常边界、初步接口需求和验收信号。
8. 明确不在范围内的功能(沿用蓝图 MVP 边界)。

## 回填映射表

| PRD 章节 | 来源 |
|---|---|
| 1. 产品概述、产品目标、目标用户 | `docs/project-config.md` |
| 2. 功能范围、功能模块总览(Mx-Fx) | 蓝图第 1、4 层 |
| 3. 核心业务流程、优先级与边界 | 蓝图第 2 层 |
| 4.x 业务规则、异常边界、初步接口 | 蓝图第 4、5 层 |
| 4.x 页面字段、操作、状态 | `docs/ui-design.md`、`prototype/` |
| 5. 数据模型、5.2 状态流转 | 蓝图第 4 层 + UI 定稿 |
| 6. 权限、7. 非功能性需求 | `docs/project-config.md` + 蓝图 |

## 检查表

- 是否有目标用户和核心场景(来自 project-config)。
- 是否引用蓝图作为功能编号、模块、流程的来源。
- 是否引用 UI 定稿作为页面字段、操作、状态的来源。
- 功能编号是否与蓝图第 4 层完全一致(不得重新编号)。
- 是否标记 P0/P1/P2(沿用蓝图)。
- P0 是否都能映射到蓝图第 2 层的高频场景和流程步骤。
- 是否有不在范围内的功能(沿用蓝图 MVP 边界)。
- 是否每个 P0 都能交给架构师继续设计。
- 是否没有 `pending_user_questions` 阻塞问题。
- 是否只有 `pending_user_questions` 清空后才触发 analyze 审核。
