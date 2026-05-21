---
name: ui-prototype-design
description: "界面设计师使用：选择设计方向、编写界面与体验文档，并构建高保真网页原型。"
---

# 界面原型设计角色技能

服务于本工作室的界面设计师角色。

## 输入

- `docs/prd.md`
- `docs/tech-architecture.md`
- `assets/design-themes/`

如果 UI 阶段新增或调整页面清单、交互路径、字段、状态、技术约束或验收标准，或发现页面/模块过多、流程不顺，必须同步回写 `docs/project-config.md`、`docs/prd.md`、`docs/handoff-prd.md` 或 `docs/tech-architecture.md`，并在 `docs/workflow-state.json` 的 `notes` 记录同步说明。

## UI 硬规则

- 页面可见文案、按钮、导航、空状态和提示语禁止使用 emoji。
- 图标必须使用图标库、SVG 或图片资源，不用 emoji 代替。
- 正文、表单、按钮、列表文本不小于 16px。
- 辅助说明可小于 16px 但不得低于 14px；移动端优先保持 16px 起。

## 输出

- `docs/ui-design.md`
- `docs/handoff-ui.md`
- `docs/prototype-review.md`
- `prototype/`

## 设计流程

1. 先做上游前置审查，确认高频真实需求、使用人群和真实使用流程清晰；发现歧义先报告。
2. 推荐 2-3 个差异化设计方向。
3. 为每个方向生成一个可打开的首页 demo，放在 `prototype/directions/`，并生成 `prototype/directions/index.html` 作为预览索引。
4. 在 `docs/ui-design.md` 中写清每个方向的 demo 路径；没有 demo 的方向不得交给用户选择。
5. 等用户选择，或在用户明确授权后使用第一推荐。
6. 从真实使用流程推导页面访问逻辑，页面数量以完成高频路径为准。
7. 设计页面清单、布局、组件、状态和流程；页面模块不能堆叠过多，能合并的入口、状态、表单、列表、详情必须合并。
8. 基于选定方向构建完整高保真 HTML 原型。
9. 在 `docs/ui-design.md` 记录页面访问逻辑和模块整合理由。
10. 使用 Playwright 对候选 demo 和完整原型逐页截图，覆盖 desktop/tablet/mobile。
11. 使用 Impeccable 做专项审查和修正，最多两轮。
12. 写入 `docs/prototype-review.md`，记录截图证据、审查结论、修正项和遗留问题。
13. 如 UI 决策改变上游事实，回写上游文档并记录同步说明。

## Impeccable 使用清单

开始自审前必须确认当前 CLI 结构下的 Impeccable skill 存在：Codex 检查 `.agents/skills/impeccable/SKILL.md`，Claude Code 检查 `.claude/skills/impeccable/SKILL.md`；不存在时停止，不做普通降级。

1. 生成 Impeccable 上下文：Codex 写入 `.agents/context/PRODUCT.md` 和 `.agents/context/DESIGN.md`；Claude Code 可写入 `.claude/context/PRODUCT.md` 和 `.claude/context/DESIGN.md` 或沿用 `.agents/context/`。
2. 运行当前 CLI 结构下的 `impeccable/scripts/load-context.mjs`，完整读取输出。
3. 对候选方向 demo 使用 `critique` 和 `audit`，确认方向差异、视觉质量、AI 味和基础技术质量。
4. 对完整原型使用 `critique`、`audit`、`adapt`。
5. 根据问题选择 `layout`、`typeset`、`clarify`、`animate`、`harden` 修正。
6. 功能路径、状态和响应式完成后，用 `polish` 做最终打磨。
7. 在 `docs/prototype-review.md` 中逐项记录每个 Impeccable 功能的目标、发现和处理结果。

功能用途：

| 功能 | 用途 |
|---|---|
| `critique` | 审美、视觉层级、信息架构、AI 味、认知负荷、启发式审查 |
| `audit` | 可访问性、性能、响应式、语义结构、反模式检测 |
| `adapt` | 桌面、平板、移动适配 |
| `layout` | 间距、对齐、节奏、布局稳定性 |
| `typeset` | 字体层级、行高、可读性、文字拥挤 |
| `clarify` | 按钮、空状态、错误提示、说明文字 |
| `animate` | 动效、状态过渡、交互反馈 |
| `harden` | 长文本、空数据、错误、加载、异常路径 |
| `polish` | 最终综合打磨 |

## 原型结构

单页面产品：

```text
prototype/
  directions/
  index.html
  layout/
  assets/
```

多页面系统：

```text
prototype/
  directions/
  index.html
  pages/
  layout/
  components/
  assets/
  review/
    screenshots/
```

目录职责：

| 路径 | 职责 | 产物要求 |
|---|---|---|
| `prototype/directions/` | 设计方向首页 demo | 每个候选方向必须有一个可打开的首页 demo；`index.html` 汇总 2-3 个预览入口，供用户选择方向。 |
| `prototype/index.html` | 原型入口、全局导航、关键流程起点 | 必须能进入所有 P0 原型路径；多页面系统必须链接到 `pages/` 中的具体页面。 |
| `prototype/pages/` | 独立业务页面 | 多页面系统的每个主要页面单独存放；页面结构必须引用或遵循 `layout/` 中的复用布局。 |
| `prototype/layout/` | 可复用页面结构 | 沉淀应用外壳、导航、页头、侧栏、内容网格、表单页骨架、状态页骨架等结构，保证后续开发能稳定复现。 |
| `prototype/components/` | 可复用界面组件和交互片段 | 存放按钮组、表单控件、卡片、列表、弹窗、状态块等组件示例，并标注使用场景和状态。 |
| `prototype/assets/` | 公共资源 | 存放样式、脚本、图片、图标、示例数据等资源；页面不得依赖散落在目录外的资源。 |

页面原型应优先复用布局结构，避免只在单个页面里临时拼装。

## 检查表

- P0 功能是否都有可点击路径。
- 页面访问逻辑是否来自真实使用流程。
- 页面数量和模块数量是否服务高频路径，而不是堆叠低频功能。
- 能合并的入口、状态、表单、列表、详情是否已经合并并记录理由。
- 设计方向是否都有可打开的首页 demo，而不是只有文字说明。
- 是否有 Playwright 截图证据并覆盖 desktop/tablet/mobile。
- 是否完成 Impeccable 审查、修正和复查记录。
- 是否沉淀了可复用布局，并能支撑后续开发稳定复现。
- 成功、失败、空、加载状态是否覆盖。
- 页面是否符合真实工作流和高频使用习惯。
- 原型路径是否能映射回需求功能编号。
