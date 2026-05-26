# design 命令

当用户输入 `$pm-workflow design`、"开始界面设计"、"开始界面原型设计"、"界面设计"、"原型设计" 或类似意图时，使用本命令。

## 负责角色

必须启动当前 CLI 结构下的界面设计子 agent 执行界面与原型设计：Codex 使用 `.codex/agents/ui-designer.toml`，Claude Code 使用 `.claude/agents/ui-designer.md`。

如果当前环境无法启动界面设计子 agent，必须停止界面与原型设计，不生成或修改 `docs/ui-design-brief.md`、`docs/ui-information-architecture.md`、`docs/ui-design-tokens.md`、`docs/ui-build-tasks.md`、`docs/ui-design.md`、`docs/handoff-ui.md`、`prototype/` 和 `docs/workflow-state.json`，并提示用户在支持项目子 agent 调度的 CLI 中打开当前工作室目录后重试。

## 输入

- `docs/prd.md`
- `docs/tech-architecture.md`
- 已确认的产品约束、品牌线索和用户偏好
- `assets/design-themes/`
- `ui-prototype-design/references/design-theme-selection.md`
- Codex: `.agents/skills/impeccable/`
- Claude Code: `.claude/skills/impeccable/`

## 必须执行的流程

1. 先读取 `ui-prototype-design/references/design-flow.md`，按设计简报、信息架构、设计系统和 tokens、方向 demo、UI 构建任务、完整原型、截图审查推进。
2. 做上游前置审查。发现需求文档或技术架构歧义时要报告，不要猜测；必须询问用户当前上下文是否足够理解显性需求和隐藏需求。
3. 读取 `ui-prototype-design/references/design-theme-selection.md`，定位主题库，读取主题库 `README.md`，用 `find <theme-root> -name DESIGN.md -maxdepth 4` 或等价命令列出候选主题文件；后续每个候选方向必须读取并记录具体 `DESIGN.md` 路径。
4. 基于 `references/design-brief.md` 和 `templates/design-brief.md` 生成 `docs/ui-design-brief.md`，记录用户、任务、成功标准、审美方向、反向参考、约束、未确认问题和主题库扫描结果。
5. 判断是否为 B 端网页。若是 B 端，默认读取 `assets/design-themes/vben/DESIGN.md` 只提取 Vben 主色；组件框架、页面骨架、布局模式、表格、筛选、表单、弹窗、状态、导航和交互必须完全按照 Arco Design Pro Vue / Arco Design Vue 一比一引用和复用。
6. 基于 `references/information-architecture.md` 和 `templates/information-architecture.md` 生成 `docs/ui-information-architecture.md`，记录页面地图、导航、核心用户流、页面任务卡、模块准入表和需求到界面追溯。
7. 基于 `references/design-tokens.md` 和 `templates/design-tokens.md` 生成 `docs/ui-design-tokens.md`，扫描并锁定 UI 框架、组件库、tokens、字体、图标、断点、Vben 主色来源、项目主色色阶、Arco Design Pro 组件引用策略、组件级 token 应用表和 B 端规范采用结果。
8. 从已读取的 `DESIGN.md` 中推荐 2-3 个真正有差异的设计方向；B 端默认推荐方向必须是 Arco Design Pro + Vben 主色方向。
9. 必须为每个设计方向生成一个可打开的首页 demo，用真实业务语境展示首屏、核心入口、关键状态和视觉气质。demo 放在 `prototype/directions/`，并生成 `prototype/directions/index.html` 作为预览索引。
10. UI 页面可见文案、按钮、导航、空状态和提示语禁止使用 emoji；图标必须使用图标库、SVG 或图片资源，不用 emoji 代替。
11. 默认字号基准：正文、表单、按钮、列表文本不小于 16px；辅助说明可小于 16px 但不得低于 14px；移动端优先保持 16px 起。B 端项目按 B 端规范的文字、间距和控件参数执行。
12. 在 `docs/ui-design.md` 中汇总每个阶段产物、每个方向的说明、已读取主题 `DESIGN.md` 路径、demo 预览路径、Vben 主色采用状态、项目主色色阶覆盖状态、Arco Design Pro 组件一比一引用状态和组件级 token 锁定记录。没有 demo 路径或主题路径的方向不得交给用户选择。
13. 等待用户选择方向；只有用户明确授权“按你推荐的继续”时，才使用第一推荐。
14. 用户选择方向后，基于 `references/ui-build-tasks.md` 和 `templates/ui-build-tasks.md` 生成 `docs/ui-build-tasks.md`，把完整原型拆为可独立打开、独立截图验证的垂直切片任务。
15. 在完整业务页面原型实现前，必须提交页面任务卡、模块准入表、跳转边界和上下文边界给用户确认；确认前不得开始完整原型实现。
16. 在 `prototype/` 下按 `docs/ui-build-tasks.md` 顺序构建完整 HTML 原型。完整原型可以复用或重构候选 demo，但不能只停留在候选 demo；每完成一个 UI 任务必须立即验证，通过后才能继续。
17. 如果 UI 阶段新增或调整页面清单、交互路径、字段、状态、技术约束或验收标准，必须同步回写 `docs/prd.md`、`docs/handoff-prd.md`、必要时 `docs/tech-architecture.md` 和 `docs/handoff-architecture.md`。
18. 生成 Impeccable 上下文：Codex 写入 `.agents/context/PRODUCT.md` 和 `.agents/context/DESIGN.md`；Claude Code 可写入 `.claude/context/PRODUCT.md` 和 `.claude/context/DESIGN.md` 或沿用 `.agents/context/`。按当前 CLI 运行对应的 `impeccable/scripts/load-context.mjs`，完整读取上下文。
19. 基于 `references/visual-review.md` 使用 Playwright 打开候选 demo 和完整原型页面，B 端项目至少覆盖 `1280x800`、`1440x900`；非 B 端覆盖 desktop/tablet/mobile，截图保存到 `prototype/review/screenshots/`。
20. 使用 Impeccable 执行专项审查和修正：候选方向至少运行 `critique`、`audit`；完整原型运行 `critique`、`audit`、`adapt`，并按问题使用 `layout`、`typeset`、`clarify`、`animate`、`harden`；最后运行 `polish`。B 端原型还必须抽检组件级 token，发现字体、字号、颜色、控件高度、间距、圆角、阴影不一致时先修正 token 或实现。
21. 最多两轮自审修正；仍未解决的问题写入遗留问题。
22. 产出 `docs/prototype-review.md`，记录阶段产物、页面清单、视口清单、截图路径、控制台错误、Vben 主色、项目主色色阶、Arco Design Pro 组件引用检查、组件级 token 抽检、Impeccable 审查结论、已修正项、遗留问题和复查结果。
23. 在 UI 阶段所有主文档和 `docs/handoff-ui.md` 填写 `## 文档同步检查`，记录已检查/已同步的 PRD、架构、handoff 和原型产物；不得留空或写 `待补充`。
24. 更新 `docs/workflow-state.json`，记录阶段产物和文档同步检查结论，并把 `recommended_next` 设置为 `review design` 或 `plan`。

如果当前 CLI 结构下的 Impeccable skill 不存在，必须停止 design 阶段并提示补齐 Impeccable skill；不要用普通 UI 审查代替。

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
| `prototype/review/screenshots/` | 原型自审截图证据 | 按 desktop、tablet、mobile 存放 Playwright 截图；每个候选 demo 和主要原型页面都要覆盖。 |

## 必须具备的追溯关系

必须包含需求到界面的映射表：

- 功能编号
- 页面或路径
- 组件或控件
- 用户动作
- 成功、失败、空状态、加载状态
- 原型路径
- 文档同步检查：说明页面、模块、交互路径、字段、状态、响应式和验收信号是否同步到 `docs/prd.md`、`docs/handoff-prd.md`、`docs/tech-architecture.md`、`docs/handoff-ui.md`。

## 收尾引导

结束时询问用户：是否要先做界面审核、修改设计或原型，还是开始开发规划。
