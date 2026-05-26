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

## 阶段参考和模板

本技能包采用分阶段 UI 设计产物，不再只依赖单一 `docs/ui-design.md` 汇总文档。执行时按需读取以下参考，并使用对应模板生成阶段产物：

| 阶段 | 参考 | 模板 | 产物 |
|---|---|---|---|
| 设计流程 | `references/design-flow.md` | - | 阶段执行顺序和门禁 |
| 设计简报 | `references/design-brief.md` | `templates/design-brief.md` | `docs/ui-design-brief.md` |
| 信息架构 | `references/information-architecture.md` | `templates/information-architecture.md` | `docs/ui-information-architecture.md` |
| 设计系统和 tokens | `references/design-tokens.md` | `templates/design-tokens.md` | `docs/ui-design-tokens.md` |
| UI 构建任务 | `references/ui-build-tasks.md` | `templates/ui-build-tasks.md` | `docs/ui-build-tasks.md` |
| B 端设计规范 | `references/b-end-ui-design-spec.md` | - | 写入阶段文档和 `docs/ui-design.md` |
| 视觉审查 | `references/visual-review.md` | `templates/prototype-review.md` | `docs/prototype-review.md` |

如果 UI 阶段新增或调整页面清单、交互路径、字段、状态、技术约束或验收标准，或发现页面/模块过多、流程不顺，必须同步回写 `docs/project-config.md`、`docs/prd.md`、`docs/handoff-prd.md` 或 `docs/tech-architecture.md`，并在 `docs/workflow-state.json` 的 `notes` 记录同步说明。

## UI 硬规则

- 页面可见文案、按钮、导航、空状态和提示语禁止使用 emoji。
- 图标必须使用图标库、SVG 或图片资源，不用 emoji 代替。
- 通用 Web 和移动端正文、表单、按钮、列表文本不小于 16px；移动端优先保持 16px 起。
- B 端网页、后台、运营台、管理系统和 SaaS 产品必须优先遵循 `references/b-end-ui-design-spec.md` 的文字、间距和控件参数，不强行套用 16px 起的移动端规则。
- B 端常规正文可按规范使用 `13-16`，注释和辅助信息可按规范使用 `10-13`；但核心正文、主操作、关键状态必须清晰可读，不得为了信息密度牺牲可读性。

## B 端设计规范渐进读取

当需求、PRD、架构或用户描述出现后台、管理系统、运营台、SaaS、工作台、CRM、ERP、数据看板、审批、配置、权限、表格、列表、筛选、批量操作等信号时，默认按 B 端网页处理，并引用 `references/b-end-ui-design-spec.md`。

不要在 UI 阶段一开始完整读取整份 B 端参考文档。必须先用 `rg -n "^##|^###" references/b-end-ui-design-spec.md` 查看章节索引，再按当前阶段只读取必要章节；只有当某个设计决策需要参数、禁止事项或验收标准时，才读取对应段落。

B 端规范是阶段门禁，不是可选灵感：一旦识别为 B 端网页，每个阶段都必须按下表读取对应章节、应用设计动作，并在 `docs/ui-design.md` 或 `docs/prototype-review.md` 记录采用结果。若因业务特殊而偏离，必须写明偏离原因和替代规则。

| 阶段门禁 | 使用时机 | 只读取的规范章节 | 必须完成的设计动作 |
|---|---|---|---|
| 识别和边界 | UI 阶段开始、读取 PRD 和架构后 | `使用原则` | 判断是否为 B 端；确认是否按 B 端默认规范执行；非 B 端或局部偏离必须记录原因。 |
| 风格和配色 | 推荐设计方向、确定视觉气质前 | `配色流程与色彩系统规则` | 先明确品牌调性和产品风格，再做灰度层级和色彩 token；不得先靠颜色解决结构问题。 |
| 画布和密度 | 生成 2-3 个方向 demo 前 | `画布与适配`、`页面基础参数`、`栅格与间距`、`B 端适配与响应式规则` | 默认按 `1440x900` 构思，必须检查 `1280x800` 核心内容可用，`1920x1080` 只做增强。 |
| 页面清单和信息架构 | 推导访问逻辑、合并页面和模块 | `格式塔设计原则`、`原则到设计动作速查`、`视觉动线与页面布局模型规则`、`视觉动线速查` | 用邻近性、相似性、连续性组织信息，并按页面类型选择 F 型、古腾堡或 Z 型动线。 |
| 页面模式和布局骨架 | 设计导航、主内容、详情栏、筛选区、弹窗和固定区 | `基础组件体系与布局参数规则`、`B 端适配与响应式规则`、`后台数据页面补充规则` | 先确定页面模式、固定区、自适应区和主内容栅格，再画具体页面。 |
| 组件和视觉表现 | 设计表单、表格、卡片、按钮、输入框、导航、标签 | `字体选择`、`文本参数`、`图标参数`、`按钮参数`、`输入框参数`、`视觉层级与组件表现规则`、`后台界面质感细节规则` | 收敛字号、间距、控件高度、状态样式和后台适用细节，保证开发可还原。 |
| 交互流程和状态 | 设计创建、筛选、审批、批量、保存、上传、删除等路径 | `交互效率与认知负荷规则`、`交互规则速查`、`尼尔森可用性原则补充规则`、`包容性与可理解性补充规则` | 降低寻找、选择和记忆成本；补齐状态反馈、错误修正、权限异常、加载超时和帮助入口。 |
| 原型自审和修正 | Playwright 截图后、Impeccable 审查前后 | 暴露问题对应章节中的 `禁止事项` 和 `验收标准` | 只按问题读取对应段落并修正；每个未通过项必须回到对应规范章节复查，不做整份文档复述。 |

阶段化读取方法：

- 开始阶段：只读章节索引和当前阶段涉及的 `##` 章节。
- 做具体决策：用 `rg -n "关键词" references/b-end-ui-design-spec.md` 定位具体 `###` 小节，再读取该小节上下文。
- 写入文档：只摘录实际采用的规则、设计动作和偏离原因，不复制整段规范。
- 做原型：把已采用规则转换为布局、字号、间距、控件高度、状态、交互和响应式实现。
- 自审修正：用截图问题反查对应章节的 `禁止事项` 和 `验收标准`，修正后记录证据。

B 端规范引用要求：

- 在 `docs/ui-design.md` 只记录被采用的关键规则和设计取舍，不粘贴整份参考文档。
- 在 `docs/prototype-review.md` 只记录与截图问题相关的验收标准，不写泛泛的规范摘要。
- 如果页面不是 B 端网页，例如 C 端营销页、移动 App、游戏或大屏展示，不默认套用 B 端规范；需要使用时必须说明原因。
- 当 B 端规范与通用审美建议冲突时，以业务效率、信息密度、对齐、复用和可开发还原优先。
- 不得因为未完整读取参考文档而跳过规范；应按阶段最小读取、持续遵守、按问题补读。

## 原型开发前确认门禁

在编写完整业务页面原型代码前，必须先完成 `docs/ui-design.md` 中的页面清单、页面任务卡、模块准入表和原型开发前确认区，并暂停等待用户确认。方向 demo 可以先做；完整 `prototype/` 业务页面实现必须等确认状态为 `已确认` 后才能开始。

提交给用户确认时，每个页面必须说明：

- 核心任务：用户进入这个页面到底要完成什么。
- 主操作：页面最应该引导用户执行的动作。
- 用户流程：用户从哪里来、先看什么、再做什么、做完去哪里。
- 保留模块：哪些模块直接服务页面核心任务。
- 删除/后置模块：哪些模块不该放在本页主流程。
- 本页不做什么：明确页面边界，避免把配置、审核、报表、审计等低相关能力塞进同一页。

用户未明确确认前，`docs/ui-design.md` 的确认状态必须保持 `待确认`，并写明“未确认不得进入原型实现”。确认状态只能是 `待确认`、`需修正`、`已确认`，不得自造其他状态。如果用户指出页面边界、模块职责或跳转上下文错误，必须先把确认状态改为 `需修正`，修正 `docs/ui-design.md` 的页面任务卡、模块准入表和相关设计记录，再重新提交确认。只有用户明确确认后，才能将确认状态改为 `已确认` 并进入完整原型实现。

提交确认时必须使用明确的暂停话术和表格，不得夹带“我将继续开发原型”之类的默认推进语。推荐格式：

```markdown
我先暂停在原型开发前确认门禁，暂不编写完整业务页面代码。请确认下面的页面任务卡和页面边界。

| 页面 | 用户进入原因 | 当前上下文对象 | 页面核心任务 | 主操作 | 保留模块 | 删除/后置模块 | 本页不做什么 |
|---|---|---|---|---|---|---|---|
| 待补充 | 待补充 | 待补充 | 待补充 | 待补充 | 待补充 | 待补充 | 待补充 |

| 页面 | 关键流程 | 跳转边界和上下文边界 | 需要你确认的问题 |
|---|---|---|---|
| 待补充 | 待补充 | 待补充 | 待补充 |

请回复“确认”后，我再进入完整原型实现；如果页面职责或模块边界不对，请直接指出，我会先修正 `docs/ui-design.md` 再重新提交确认。
```

## 输出

- `docs/ui-design-brief.md`
- `docs/ui-information-architecture.md`
- `docs/ui-design-tokens.md`
- `docs/ui-build-tasks.md`
- `docs/ui-design.md`
- `docs/handoff-ui.md`
- `docs/prototype-review.md`
- `prototype/`

## 设计流程

1. 读取 `references/design-flow.md`，向用户说明 UI 阶段会依次产出设计简报、信息架构、tokens、方向 demo、UI 构建任务、完整原型和截图审查。
2. 做上游前置审查，确认高频真实需求、使用人群和真实使用流程清晰；必须询问用户当前上下文是否足够理解显性需求和隐藏需求，发现歧义先报告。
3. 读取 `references/design-brief.md`，扫描 PRD、架构、现有设计系统、组件、tokens、字体、图标和主题资产，生成 `docs/ui-design-brief.md`；未确认前不进入信息架构。
4. 判断是否为 B 端网页；如果是，先查 `references/b-end-ui-design-spec.md` 章节索引，并在阶段文档和 `docs/ui-design.md` 建立 B 端规范引用记录。
5. 读取 `references/information-architecture.md`，从真实使用流程推导页面访问逻辑、页面地图、页面任务卡、模块准入表和需求到界面追溯，生成 `docs/ui-information-architecture.md`；需要和用户反复确认页面边界。
6. 读取 `references/design-tokens.md`，基于已确认方向和既有系统生成 `docs/ui-design-tokens.md`；B 端项目必须读取配色、画布、密度、组件表现和适配相关章节。
7. 推荐 2-3 个差异化设计方向；为每个方向生成一个可打开的首页 demo，放在 `prototype/directions/`，并生成 `prototype/directions/index.html` 作为预览索引。
8. 在 `docs/ui-design.md` 中汇总设计简报、IA、tokens、每个方向的 demo 路径和已采用的 B 端规则；没有 demo 的方向不得交给用户选择。
9. 等用户选择，或在用户明确授权后使用第一推荐。
10. 读取 `references/ui-build-tasks.md`，生成 `docs/ui-build-tasks.md`，把完整原型实现拆成可独立打开、独立截图验证的垂直切片任务。
11. 暂停并提交原型开发前确认：向用户说明每个页面的核心任务、主操作、用户流程、保留模块、删除/后置模块、本页不做什么、跳转边界和上下文边界；未确认不得进入原型实现。
12. 如果用户要求修正页面边界，先更新 `docs/ui-information-architecture.md`、`docs/ui-design.md` 和 `docs/ui-build-tasks.md` 并重新确认；用户明确确认后，才能基于选定方向构建完整高保真 HTML 原型。
13. 按 `docs/ui-build-tasks.md` 顺序实现完整原型；每完成一个 UI 任务，必须打开对应路径、执行交互并验证通过后才能进入下一任务。
14. 已采用的 B 端规则和 token 决策必须落成真实布局、字号、间距、控件高度、状态和响应式实现。
15. 读取 `references/visual-review.md`，使用 Playwright 对候选 demo 和完整原型逐页截图，B 端项目必须覆盖 `1280x800`、`1440x900`，必要时补 `1920x1080`；非 B 端按实际设备覆盖 desktop/tablet/mobile。
16. 使用 Impeccable 做专项审查和修正，最多两轮；B 端项目必须把发现问题反查到对应 B 端规范章节的禁止事项和验收标准。
17. 写入 `docs/prototype-review.md`，记录截图证据、审查结论、原型开发前确认检查、B 端规范抽检、修正项和遗留问题。
18. 如 UI 决策改变上游事实，回写上游文档并记录同步说明。

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
- B 端项目是否已识别并按阶段引用 `references/b-end-ui-design-spec.md`，而不是一次性完整读取。
- B 端项目是否完成识别、配色、画布、信息架构、布局骨架、组件表现、交互状态和自审修正的阶段门禁。
- B 端项目是否在 `docs/ui-design.md` 和 `docs/prototype-review.md` 记录实际采用的规范章节、设计动作、偏离原因和验收结果。
- B 端项目是否把规范落成真实原型实现，而不是只在文档中引用。
- 是否已产出 `docs/ui-design-brief.md`、`docs/ui-information-architecture.md`、`docs/ui-design-tokens.md` 和 `docs/ui-build-tasks.md`。
- 是否在设计简报阶段明确询问并记录上下文是否足够理解显性需求和隐藏需求。
- 是否在 IA 和原型开发前确认阶段反复确认页面任务、模块边界和跳转上下文。
- `docs/ui-build-tasks.md` 的每个任务是否是可独立打开、独立截图验证的垂直切片。
- 设计方向是否都有可打开的首页 demo，而不是只有文字说明。
- 完整原型实现前是否已完成页面任务卡、模块准入表和原型开发前确认。
- 用户提出的页面边界问题是否已先回写 `docs/ui-design.md` 并重新确认。
- 是否有 Playwright 截图证据并覆盖 desktop/tablet/mobile。
- B 端项目是否至少检查 `1280x800` 与 `1440x900` 下的核心路径。
- 是否完成 Impeccable 审查、修正和复查记录。
- 是否沉淀了可复用布局，并能支撑后续开发稳定复现。
- 成功、失败、空、加载状态是否覆盖。
- 页面是否符合真实工作流和高频使用习惯。
- 原型路径是否能映射回需求功能编号。
