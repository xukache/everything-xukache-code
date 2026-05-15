# design 命令

当用户输入 `$pm-workflow design`、"开始界面设计"、"开始界面原型设计"、"界面设计"、"原型设计" 或类似意图时，使用本命令。

## 负责角色

必须启动 `.codex/agents/ui-designer.toml` 中的 `ui_designer` 子 agent 执行界面与原型设计。

如果当前 Codex 环境无法启动 `ui_designer` 子 agent，必须停止界面与原型设计，不生成或修改 `docs/ui-design.md`、`docs/handoff-ui.md`、`prototype/` 和 `docs/workflow-state.json`，并提示用户在支持项目子 agent 调度的 Codex 运行方式中打开当前工作室目录后重试。

## 输入

- `docs/prd.md`
- `docs/tech-architecture.md`
- 已确认的产品约束、品牌线索和用户偏好
- `assets/design-themes/`

## 必须执行的流程

1. 先做上游前置审查。发现需求文档或技术架构歧义时要报告，不要猜测。
2. 从 `assets/design-themes/` 推荐 2-3 个真正有差异的设计方向。
3. 必须为每个设计方向生成一个可打开的首页 demo，用真实业务语境展示首屏、核心入口、关键状态和视觉气质。demo 放在 `prototype/directions/`，并生成 `prototype/directions/index.html` 作为预览索引。
4. 在 `docs/ui-design.md` 中记录每个方向的说明和 demo 预览路径。没有 demo 路径的方向不得交给用户选择。
5. 等待用户选择方向；只有用户明确授权“按你推荐的继续”时，才使用第一推荐。
6. 用户选择方向后，基于选定方向产出完整 `docs/ui-design.md` 和 `docs/handoff-ui.md`。
7. 在 `prototype/` 下构建完整 HTML 原型。完整原型可以复用或重构候选 demo，但不能只停留在候选 demo。
8. 更新 `docs/workflow-state.json`，记录阶段产物，并把 `recommended_next` 设置为 `review design` 或 `plan`。

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

## 必须具备的追溯关系

必须包含需求到界面的映射表：

- 功能编号
- 页面或路径
- 组件或控件
- 用户动作
- 成功、失败、空状态、加载状态
- 原型路径

## 收尾引导

结束时询问用户：是否要先做界面审核、修改设计或原型，还是开始开发规划。
