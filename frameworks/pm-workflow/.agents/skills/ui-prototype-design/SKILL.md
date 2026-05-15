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

## 输出

- `docs/ui-design.md`
- `docs/handoff-ui.md`
- `prototype/`

## 设计流程

1. 先做上游前置审查，发现歧义先报告。
2. 推荐 2-3 个差异化设计方向。
3. 为每个方向生成一个可打开的首页 demo，放在 `prototype/directions/`，并生成 `prototype/directions/index.html` 作为预览索引。
4. 在 `docs/ui-design.md` 中写清每个方向的 demo 路径；没有 demo 的方向不得交给用户选择。
5. 等用户选择，或在用户明确授权后使用第一推荐。
6. 设计页面清单、布局、组件、状态和流程。
7. 基于选定方向构建完整高保真 HTML 原型。

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
- 设计方向是否都有可打开的首页 demo，而不是只有文字说明。
- 是否沉淀了可复用布局，并能支撑后续开发稳定复现。
- 成功、失败、空、加载状态是否覆盖。
- 页面是否符合真实工作流。
- 原型路径是否能映射回需求功能编号。
