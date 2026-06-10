# design 命令

当用户输入 `$pm-workflow design`、"开始界面设计"、"开始界面原型设计"、"界面设计"、"原型设计" 或类似意图时,使用本命令。

## 负责角色

由主 agent 派发 `ui-designer` subagent 执行界面与原型设计,或用户用 `/ui-designer` slash 命令显式触发。

## 输入

- `docs/project-config.md`(产品约束、品牌线索)
- `docs/feature-flow-layout.md`(**蓝图,核心上游输入**:信息架构、核心流程、逐个页面骨架/布局选型、逐个功能、逐个交互)
- 已确认的产品约束、品牌线索和用户偏好
- `assets/design-themes/`
- `ui-prototype-design/references/design-theme-selection.md`
- `.kiro/skills/impeccable/`

## 关键约束

**信息架构已在蓝图第 1 层定稿,design 阶段不再单独产出 `docs/ui-information-architecture.md`**。design 聚焦视觉系统、Tokens、HTML 高保真原型、Impeccable 自审。如需调整蓝图已确认的页面、流程节点或交互,按 craft-principles 第 4 条「重大变革协议」处理:回到 blueprint 修订对应层 → 全文一致传播 → 一致性检查。

## 工艺准则

贯穿全程遵守 [craft-principles](../craft-principles.md):一次只抛一项、决策三件套、守边界、重大变革协议、一致性检查、可追溯。

## 必须执行的流程

1. **前置检查**:确认 `docs/feature-flow-layout.md` 五层均已定稿。蓝图缺失或某层未确认时,先回到 `blueprint`。
2. 读取 `ui-prototype-design/references/design-flow.md`,按设计简报、设计系统和 tokens、方向 demo、UI 构建任务、完整原型、截图审查推进。
3. 读取 `ui-prototype-design/references/design-theme-selection.md`,定位主题库,读取主题库 `README.md`,用 `find <theme-root> -name DESIGN.md -maxdepth 4` 或等价命令列出候选主题文件;后续每个候选方向必须读取并记录具体 `DESIGN.md` 路径。
4. 基于 `references/design-brief.md` 和 `templates/design-brief.md` 生成 `docs/ui-design-brief.md`,记录用户、任务、成功标准、审美方向、反向参考、约束、未确认问题和主题库扫描结果。在 `docs/ui-design-brief.md` 中**显式引用 `docs/feature-flow-layout.md`** 作为信息架构与流程来源。
5. 判断是否为 B 端网页。若是 B 端,默认读取 `assets/design-themes/vben/DESIGN.md` 只提取 Vben 主色;组件框架、页面骨架、布局模式、表格、筛选、表单、弹窗、状态、导航和交互必须完全按照 Arco Design Pro Vue / Arco Design Vue 一比一引用和复用。
6. 基于 `references/design-tokens.md` 和 `templates/design-tokens.md` 生成 `docs/ui-design-tokens.md`,扫描并锁定 UI 框架、组件库、tokens、字体、图标、断点、Vben 主色来源、项目主色色阶、Arco Design Pro 组件引用策略、组件级 token 应用表和 B 端规范采用结果。
7. 从已读取的 `DESIGN.md` 中推荐 2-3 个真正有差异的设计方向;B 端默认推荐方向必须是 Arco Design Pro + Vben 主色方向。
8. 必须为每个设计方向生成一个可打开的首页 demo,用真实业务语境展示首屏、核心入口、关键状态和视觉气质。demo 放在 `prototype/directions/`,并生成 `prototype/directions/index.html` 作为预览索引。
9. UI 页面可见文案、按钮、导航、空状态和提示语禁止使用 emoji;图标必须使用图标库、SVG 或图片资源,不用 emoji 代替。
10. 默认字号基准:正文、表单、按钮、列表文本不小于 16px;辅助说明可小于 16px 但不得低于 14px;移动端优先保持 16px 起。B 端项目按 B 端规范的文字、间距和控件参数执行。
11. 在 `docs/ui-design.md` 中汇总每个阶段产物、每个方向的说明、已读取主题 `DESIGN.md` 路径、demo 预览路径、Vben 主色采用状态、项目主色色阶覆盖状态、Arco Design Pro 组件一比一引用状态和组件级 token 锁定记录。没有 demo 路径或主题路径的方向不得交给用户选择。
12. 等待用户选择方向;只有用户明确授权"按你推荐的继续"时,才使用第一推荐。
13. 用户选择方向后,基于 `references/ui-build-tasks.md` 和 `templates/ui-build-tasks.md` 生成 `docs/ui-build-tasks.md`,把完整原型拆为可独立打开、独立截图验证的垂直切片任务。
14. 在完整业务页面原型实现前,必须按蓝图第 3 层(逐个页面)和第 5 层(逐个交互)定稿做一致性检查;不一致时按重大变革协议回 blueprint 修订。
15. 在 `prototype/` 下按 `docs/ui-build-tasks.md` 顺序构建完整 HTML 原型。完整原型可以复用或重构候选 demo,但不能只停留在候选 demo;每完成一个 UI 任务必须立即验证,通过后才能继续。
16. 生成 Impeccable 上下文:写入 `.kiro/context/PRODUCT.md` 和 `.kiro/context/DESIGN.md`,运行 `node .kiro/skills/impeccable/scripts/load-context.mjs` 完整读取上下文。
17. 基于 `references/visual-review.md` 使用 Playwright 打开候选 demo 和完整原型页面,B 端项目至少覆盖 `1280x800`、`1440x900`;非 B 端覆盖 desktop/tablet/mobile,截图保存到 `prototype/review/screenshots/`。
18. 使用 Impeccable 执行专项审查和修正:候选方向至少运行 `critique`、`audit`;完整原型运行 `critique`、`audit`、`adapt`,并按问题使用 `layout`、`typeset`、`clarify`、`animate`、`harden`;最后运行 `polish`。B 端原型还必须抽检组件级 token,发现字体、字号、颜色、控件高度、间距、圆角、阴影不一致时先修正 token 或实现。
19. 最多两轮自审修正;仍未解决的问题写入遗留问题。
20. 产出 `docs/prototype-review.md`,记录阶段产物、页面清单、视口清单、截图路径、控制台错误、Vben 主色、项目主色色阶、Arco Design Pro 组件引用检查、组件级 token 抽检、Impeccable 审查结论、已修正项、遗留问题和复查结果。
21. 更新 `docs/workflow-state.json`,记录阶段产物,并把 `recommended_next` 设置为 `review design` 或 `analyze`(进入 PRD 后置成文)。

如果 `.kiro/skills/impeccable/SKILL.md` 不存在,必须停止 design 阶段并提示补齐 Impeccable skill;不要用普通 UI 审查代替。

## 原型结构

单页面产品:

```text
prototype/
  directions/
  index.html
  layout/
  assets/
```

多页面系统:

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

目录职责:

| 路径 | 职责 | 产物要求 |
|---|---|---|
| `prototype/directions/` | 设计方向首页 demo | 每个候选方向必须有一个可打开的首页 demo;`index.html` 汇总 2-3 个预览入口,供用户选择方向。 |
| `prototype/index.html` | 原型入口、全局导航、关键流程起点 | 必须能进入所有 P0 原型路径;多页面系统必须链接到 `pages/` 中的具体页面。 |
| `prototype/pages/` | 独立业务页面 | 多页面系统的每个主要页面单独存放;页面结构必须引用或遵循 `layout/` 中的复用布局。 |
| `prototype/layout/` | 可复用页面结构 | 沉淀应用外壳、导航、页头、侧栏、内容网格、表单页骨架、状态页骨架等结构,保证后续开发能稳定复现。 |
| `prototype/components/` | 可复用界面组件和交互片段 | 存放按钮组、表单控件、卡片、列表、弹窗、状态块等组件示例,并标注使用场景和状态。 |
| `prototype/assets/` | 公共资源 | 存放样式、脚本、图片、图标、示例数据等资源;页面不得依赖散落在目录外的资源。 |
| `prototype/review/screenshots/` | 原型自审截图证据 | 按 desktop、tablet、mobile 存放 Playwright 截图;每个候选 demo 和主要原型页面都要覆盖。 |

## 必须具备的追溯关系

蓝图功能编号到界面映射表:

- 功能编号(沿用蓝图 Mx-Fx)
- 页面或路径
- 组件或控件
- 用户动作
- 成功、失败、空状态、加载状态
- 原型路径

## 收尾引导

结束时询问用户:是否要先做界面审核、修改设计或原型,回 blueprint 修订某一层,还是进入 `analyze`(PRD 后置成文)。
