# Vben — Style Reference

> 明亮、模块化、精密的后台工作台。像一间干净的数字控制室：白色画布、清晰信息层、稳定导航骨架，以及克制但明确的交互反馈。

**主题：** 自适应 light/dark，默认以浅色为主

Vben 风格是一套可复用的应用工作台设计语言。它不追求营销页式的夸张视觉，而是强调高频操作、密集信息、权限清晰、状态明确的界面秩序。整体体验应该让用户感到可信、快速、整洁、可配置，并且能支撑长时间使用。

## Tokens — Colors

### Light Theme

| 名称                    | 值                          | Token                      | 用途                                       |
| ----------------------- | --------------------------- | -------------------------- | ------------------------------------------ |
| Canvas 画布白           | `#ffffff`                 | `--color-canvas`         | 页面主背景、弹窗内文字反色、深色按钮文字。 |
| Surface 页面底色        | `#f8fafc`                 | `--color-surface`        | 应用主体背景、工作区背景、轻量分区背景。   |
| Surface Raised 抬升表面 | `#ffffff`                 | `--color-surface-raised` | 卡片、面板、弹窗、抽屉、表格容器。         |
| Surface Muted 弱化表面  | `#f1f5f9`                 | `--color-surface-muted`  | 次级面板、禁用区域、分段控件、表头背景。   |
| Text Primary 主文字     | `#172033`                 | `--color-text-primary`   | 页面标题、模块标题、表格主值、导航文字。   |
| Text Secondary 次文字   | `#475569`                 | `--color-text-secondary` | 正文、说明、表单标签、辅助信息。           |
| Text Tertiary 弱文字    | `#64748b`                 | `--color-text-tertiary`  | 占位符、时间戳、元信息、低强调计数。       |
| Text Disabled 禁用文字  | `#94a3b8`                 | `--color-text-disabled`  | 禁用控件、不可用操作。                     |
| Primary 主色            | `#4f63d7`                 | `--color-primary`        | 主按钮、激活导航、焦点控件、选中行。       |
| Primary Hover 主色悬停  | `#3f51c1`                 | `--color-primary-hover`  | 主操作 hover 状态。                        |
| Primary Soft 主色浅底   | `#eef2ff`                 | `--color-primary-soft`   | 选中菜单、激活标签、低强调主色背景。       |
| Primary Border 主色描边 | `#c7d2fe`                 | `--color-primary-border` | 选中描边、焦点相邻边框。                   |
| Success 成功            | `#16a34a`                 | `--color-success`        | 成功状态、完成状态、正向趋势。             |
| Success Soft 成功浅底   | `#dcfce7`                 | `--color-success-soft`   | 成功徽标背景。                             |
| Warning 警告            | `#d97706`                 | `--color-warning`        | 警告状态、需要注意的信息。                 |
| Warning Soft 警告浅底   | `#fef3c7`                 | `--color-warning-soft`   | 警告徽标背景。                             |
| Danger 危险             | `#dc2626`                 | `--color-danger`         | 删除、错误、失败状态。                     |
| Danger Soft 危险浅底    | `#fee2e2`                 | `--color-danger-soft`    | 错误徽标、删除确认提示背景。               |
| Info 信息               | `#0284c7`                 | `--color-info`           | 中性系统提示、信息状态。                   |
| Info Soft 信息浅底      | `#e0f2fe`                 | `--color-info-soft`      | 信息徽标背景。                             |
| Border Subtle 弱边框    | `#e2e8f0`                 | `--color-border-subtle`  | 面板边框、表格分割线、输入框边框。         |
| Border Strong 强边框    | `#cbd5e1`                 | `--color-border-strong`  | hover 边框、拖拽分隔线、强调分割线。       |
| Overlay 遮罩            | `rgba(15, 23, 42, 0.42)`  | `--color-overlay`        | 弹窗、抽屉背景遮罩。                       |
| Focus Ring 焦点环       | `rgba(79, 99, 215, 0.24)` | `--color-focus-ring`     | 键盘焦点、输入框聚焦外阴影。               |
| Sidebar 侧边栏          | `#ffffff`                 | `--color-sidebar`        | 左侧导航区域背景。                         |
| Header 顶栏             | `#ffffff`                 | `--color-header`         | 顶部工具栏背景。                           |

### Dark Theme

| 名称                             | 值                            | Token                           | 用途                           |
| -------------------------------- | ----------------------------- | ------------------------------- | ------------------------------ |
| Canvas Dark 深色画布             | `#0f172a`                   | `--color-canvas-dark`         | 深色模式主背景。               |
| Surface Dark 深色底色            | `#111827`                   | `--color-surface-dark`        | 深色应用主体背景。             |
| Surface Raised Dark 深色抬升表面 | `#1e293b`                   | `--color-surface-raised-dark` | 深色卡片、面板、抽屉、弹窗。   |
| Surface Muted Dark 深色弱化表面  | `#273449`                   | `--color-surface-muted-dark`  | 深色表头、次级面板、禁用控件。 |
| Text Primary Dark 深色主文字     | `#f8fafc`                   | `--color-text-primary-dark`   | 深色标题和高强调内容。         |
| Text Secondary Dark 深色次文字   | `#cbd5e1`                   | `--color-text-secondary-dark` | 深色正文和标签。               |
| Text Tertiary Dark 深色弱文字    | `#94a3b8`                   | `--color-text-tertiary-dark`  | 深色占位符和元信息。           |
| Border Dark 深色边框             | `#334155`                   | `--color-border-dark`         | 深色分割线和控件边框。         |
| Primary Dark 深色主色            | `#8ea0ff`                   | `--color-primary-dark`        | 深色模式主交互色。             |
| Primary Soft Dark 深色主色浅底   | `rgba(142, 160, 255, 0.16)` | `--color-primary-soft-dark`   | 深色选中态和低强调高亮。       |

## Tokens — Typography

### Interface Sans — 界面主字体 · `--font-interface`

- **字体栈：** Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
- **字重：** 400, 500, 600, 700
- **字号：** 12px, 13px, 14px, 16px, 18px, 20px, 24px, 30px, 36px
- **行高：** 1.2, 1.35, 1.45, 1.5
- **字距：** 正文 normal；页面标题可使用 `-0.01em` 到 `-0.02em`
- **用途：** 导航、表格、表单、按钮、标题、指标数字、操作文案。

### Mono — 等宽字体 · `--font-mono`

- **字体栈：** "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace
- **字重：** 400, 500, 600
- **字号：** 12px, 13px, 14px
- **行高：** 1.45
- **字距：** normal
- **用途：** ID、API Key、日志、时间戳、技术字段、机器可读短文本。

### Type Scale

| 角色       | 字号 | 行高 | 字重 | 字距     | Token                 |
| ---------- | ---- | ---- | ---- | -------- | --------------------- |
| overline   | 12px | 1.35 | 600  | 0.04em   | `--text-overline`   |
| caption    | 12px | 1.45 | 400  | normal   | `--text-caption`    |
| body-sm    | 13px | 1.5  | 400  | normal   | `--text-body-sm`    |
| body       | 14px | 1.5  | 400  | normal   | `--text-body`       |
| body-lg    | 16px | 1.5  | 400  | normal   | `--text-body-lg`    |
| label      | 14px | 1.35 | 500  | normal   | `--text-label`      |
| heading-sm | 18px | 1.35 | 600  | -0.01em  | `--text-heading-sm` |
| heading    | 24px | 1.25 | 700  | -0.015em | `--text-heading`    |
| heading-lg | 30px | 1.2  | 700  | -0.02em  | `--text-heading-lg` |
| display    | 36px | 1.2  | 700  | -0.02em  | `--text-display`    |
| metric     | 32px | 1.1  | 700  | -0.02em  | `--text-metric`     |

## Tokens — Spacing & Shapes

**基础单位：** 4px
**密度：** 默认舒展，数据表格可切换紧凑

### Spacing Scale

| 名称 | 值   | Token            |
| ---- | ---- | ---------------- |
| 2    | 2px  | `--spacing-2`  |
| 4    | 4px  | `--spacing-4`  |
| 6    | 6px  | `--spacing-6`  |
| 8    | 8px  | `--spacing-8`  |
| 10   | 10px | `--spacing-10` |
| 12   | 12px | `--spacing-12` |
| 16   | 16px | `--spacing-16` |
| 20   | 20px | `--spacing-20` |
| 24   | 24px | `--spacing-24` |
| 32   | 32px | `--spacing-32` |
| 40   | 40px | `--spacing-40` |
| 48   | 48px | `--spacing-48` |
| 64   | 64px | `--spacing-64` |
| 80   | 80px | `--spacing-80` |

### Border Radius

| 元素      | 值     | Token                    |
| --------- | ------ | ------------------------ |
| 页面面板  | 10px   | `--radius-panel`       |
| 卡片      | 12px   | `--radius-card`        |
| 输入框    | 8px    | `--radius-input`       |
| 按钮      | 8px    | `--radius-button`      |
| 图标按钮  | 8px    | `--radius-icon-button` |
| 徽标/胶囊 | 9999px | `--radius-pill`        |
| 弹窗      | 14px   | `--radius-modal`       |
| 抽屉      | 0px    | `--radius-drawer`      |
| 标签页    | 8px    | `--radius-tab`         |

### Shadows

| 名称  | 值                                                                     | Token              |
| ----- | ---------------------------------------------------------------------- | ------------------ |
| xs    | `0 1px 2px rgba(15, 23, 42, 0.06)`                                   | `--shadow-xs`    |
| sm    | `0 1px 3px rgba(15, 23, 42, 0.10), 0 1px 2px rgba(15, 23, 42, 0.06)` | `--shadow-sm`    |
| md    | `0 8px 24px rgba(15, 23, 42, 0.10)`                                  | `--shadow-md`    |
| lg    | `0 18px 48px rgba(15, 23, 42, 0.16)`                                 | `--shadow-lg`    |
| focus | `0 0 0 3px var(--color-focus-ring)`                                  | `--shadow-focus` |

### Layout

- **页面最大宽度：** 1440px
- **内容最大宽度：** 1280px
- **侧边栏宽度：** 248px
- **折叠侧边栏宽度：** 64px
- **顶栏高度：** 56px
- **标签栏高度：** 40px
- **页面内边距：** 桌面 24px，平板 16px，移动端 12px
- **区块间距：** 24px
- **面板内边距：** 20px
- **卡片内边距：** 20px
- **控件高度：** 默认 36px，紧凑 32px，大号 40px
- **表格行高：** 默认 44px，紧凑 36px

## Components

### Primary Button 主按钮

**用途：** 页面主操作、确认、提交、流程继续。

使用 `Primary` 背景和白色文字。默认高度 `36px`，水平内边距 `16px`，圆角 `8px`，文字为 `14px` medium。Hover 使用 `Primary Hover`；聚焦使用 `Focus Ring`；禁用态使用 `Surface Muted` 背景和 `Text Disabled`。

### Secondary Button 次按钮

**用途：** 次级操作、中性操作、取消相邻操作。

白色或透明背景，`Border Subtle` 边框，`Text Primary` 文字。Hover 背景变为 `Surface Muted`。只有选中态才使用 `Primary Soft`，视觉重量必须弱于主按钮。

### Icon Button 图标按钮

**用途：** 工具栏操作、刷新、折叠、设置、行操作。

正方形按钮，尺寸 `32px` 或 `36px`，圆角 `8px`。默认透明背景和 `Text Tertiary` 图标。Hover 使用 `Surface Muted` 背景和 `Text Primary`。选中态使用 `Primary Soft` 背景和 `Primary` 图标。

### Sidebar Navigation 侧边导航

**用途：** 应用主导航。

使用 `Sidebar` 表面，右侧加 `Border Subtle` 边框。分组标题使用 `overline` 和 `Text Tertiary`。菜单项高度 `36px`，圆角 `8px`，水平内边距 `12px`。激活菜单使用 `Primary Soft` 背景、`Primary` 图标和 `Text Primary` 文本。嵌套层级每级缩进 `16px`。

### Header Toolbar 顶部工具栏

**用途：** 全局操作、页面上下文和快捷入口。

固定顶栏，高度 `56px`，背景 `Header`，底部边框 `Border Subtle`。左侧放侧边栏切换、面包屑或页面上下文；右侧放搜索、通知、主题/语言控制、用户菜单。所有图标控件对齐在 `32px` 的控制网格上。

### Page Container 页面容器

**用途：** 标准应用工作区。

使用 `Surface` 背景，桌面端 `24px` 页面内边距。页面标题位于内容上方，可带描述和右侧操作。内容模块之间使用 `24px` 间距。表单和详情页可限制最大宽度；看板和表格页可以撑满可用空间。

### Data Card 数据卡片

**用途：** 设置面板、内容模块、详情区块、看板模块。

使用 `Surface Raised` 背景、`Border Subtle` 边框、`12px` 圆角、`20px` 内边距，可选 `shadow-xs`。卡片头部包含 `heading-sm` 标题和可选操作。不要使用装饰性色块，依靠信息层级和间距组织内容。

### Metric Card 指标卡片

**用途：** KPI、统计摘要、运营指标。

使用抬升白色表面和弱边框。指标数字使用 `metric` 字体样式和 `Text Primary`。标签使用 `body-sm` 和 `Text Secondary`。趋势徽标使用语义浅底色。图标可放在 `Primary Soft` 或语义浅底色容器中。

### Table 表格

**用途：** 高密度数据浏览、对比、选择、批量操作。

表格容器使用 `Surface Raised`、边框、`12px` 圆角。表头使用 `Surface Muted` 背景、`Text Secondary`、`label` 字体。正文默认行高 `44px`，用 `Border Subtle` 分割。Hover 行使用 `Surface`；选中行使用 `Primary Soft`。行操作优先使用图标按钮或紧凑文字按钮。

### Filter Form 筛选表单

**用途：** 搜索、筛选、查询条件组合。

放在表格上方的抬升面板或工具栏中。控件间距 `12px`，控件高度 `36px`，只在必要时显示标签。主查询按钮放在末尾，重置按钮使用次按钮样式。高级筛选建议放入可折叠区域或抽屉。

### Input Field 输入框

**用途：** 文本输入、搜索、数字输入、技术字段。

高度 `36px`，水平内边距 `12px`，圆角 `8px`，白色背景，`Border Subtle` 边框。占位符使用 `Text Tertiary`。聚焦时边框为 `Primary` 并显示 `shadow-focus`。错误态边框为 `Danger`，错误说明文字也使用 `Danger`。

### Select / Dropdown 选择器/下拉菜单

**用途：** 选项选择、紧凑命令菜单。

触发器与输入框高度和圆角一致。触发器文字使用 `Text Primary`，占位符使用 `Text Tertiary`。下拉面板使用 `Surface Raised`、`12px` 圆角、`shadow-md`、`8px` 内边距。选项高度 `32px`；选中项使用 `Primary Soft` 和 `Primary`。

### Tabs / Tabbar 标签页

**用途：** 视图切换、多页面工作区导航。

分段标签使用 `Surface Muted` 背景和 `8px` 圆角。激活标签使用 `Surface Raised`、`Text Primary`、`shadow-xs`。多页面标签栏高度 `40px`，关闭图标 hover 时出现，激活态可使用 `Primary` 下划线或浅色填充。

### Breadcrumb 面包屑

**用途：** 嵌套页面的位置感。

祖先路径使用 `body-sm` 和 `Text Tertiary`，当前页使用 `Text Secondary`。分隔符使用弱化 chevron 或 `Border Strong` 色。小屏空间不足时可以隐藏面包屑。

### Modal 弹窗

**用途：** 短表单、确认、删除确认、需要中断用户流程的决策。

居中显示，使用 `Surface Raised`、`14px` 圆角、`shadow-lg` 和遮罩。标题使用 `heading-sm`，正文使用 `body`，底部操作右对齐。删除确认中，只有最终删除按钮使用 `Danger`。

### Drawer 抽屉

**用途：** 侧边编辑、详情预览、高级筛选、配置面板。

右侧滑出，使用 `Surface Raised`，外侧圆角 `0px`，`shadow-lg`。桌面端宽度建议 `420px` 到 `640px`。头部固定，主体可滚动，底部操作区在长表单中保持固定。

### Notification 通知

**用途：** 非阻塞反馈。

使用抬升表面、`12px` 圆角、`shadow-md` 和语义图标。成功、警告、危险、信息状态只在图标或细微强调上使用语义色，不要整块大面积铺色。

### Empty State 空状态

**用途：** 无数据、无搜索结果、首次使用引导。

在面板中居中展示。图标使用 `Text Tertiary` 或 `Primary Soft`。标题使用 `heading-sm`，说明文字使用 `Text Secondary`。如果用户可以解决空状态，提供一个明确操作。

### Error State 错误状态

**用途：** 加载失败、无权限、内容不可用。

文案要直接说明问题，并给出恢复操作。真正失败时使用 `Danger`；无权限或不可用状态可以使用 `Info` 或中性色。不要为常规权限边界使用过度惊吓的插画。

### Login Panel 登录面板

**用途：** 身份认证入口。

可使用左右分栏或居中卡片。表单面板使用 `Surface Raised`、`12px` 圆角、`24px` 内边距、`shadow-md`。品牌区域可使用轻微主色渐变或抽象产品界面片段。输入框遵循标准样式，主提交按钮占满宽度。

## Do's and Don'ts

### Do

- 使用一个主色承担操作、焦点、激活导航和选中态。
- 让 `Canvas`、`Surface`、`Surface Raised` 成为界面的主导背景。
- 语义色只用于状态、校验和系统反馈。
- 表格要重视扫描效率：统一行高、数字对齐、分割线克制。
- 常见工具栏操作优先使用图标按钮。
- 长流程侧边编辑用抽屉，短确认和中断式决策用弹窗。
- 即使组件内部紧凑，页面区块之间也要留出清晰呼吸感。
- 所有可交互元素都必须有可见焦点态。

### Don't

- 不要使用多个高饱和强调色抢主操作的注意力。
- 不要让所有模块都变成重阴影卡片；大多数面板应保持安静。
- 不要把高频工作台做成营销页 hero 风格。
- 不要在所有按钮上滥用胶囊圆角；胶囊主要用于徽标和状态。
- 不要只用颜色表达状态，必须配合文字或图标。
- 不要把主操作藏进更多菜单。
- 不要在用户需要快速检查数据的地方放大幅装饰插画。
- 不要让表格因为单元格 padding 和字体不一致而失去对齐感。

## Elevation

- **Flat Surface 平面层：** 无阴影，使用 `Border Subtle`，用于大多数面板和表格。
- **Raised Card 轻抬升层：** 使用 `shadow-xs`，用于看板卡片和轻量模块。
- **Floating Surface 浮层：** 使用 `shadow-md`，用于下拉菜单、气泡、通知。
- **Modal Layer 弹窗层：** 使用 `shadow-lg`，只用于弹窗和抽屉。
- **Focus Ring 焦点层：** 使用 `shadow-focus`，所有键盘可访问交互都需要。

## Imagery

图像应该帮助理解，而不是装饰应用外壳。优先使用产品截图、紧凑数据可视化、状态图、头像缩略图和中性空状态图标。插画应少量使用，保持单色或主色浅底。除用户头像或团队资料外，不建议使用商业图库摄影。产品截图应放在白色或抬升表面中，使用细边框，不要做夸张透视。

## Layout

Vben 风格默认使用稳定的侧边栏加顶部工具栏。主内容区域位于 `Surface` 背景上，承载表格、表单、卡片、看板和详情面板。详情页和设置页建议使用 `1280px` 内容最大宽度；表格页和数据看板可以使用全宽布局。

常见布局模式：

- **列表页：** 页面头部、筛选表单、表格面板、分页区域。
- **看板页：** 指标卡片网格、主图表区域、次级活动流或数据表。
- **详情页：** 标题区、摘要卡片、标签页内容、侧边元信息。
- **设置页：** 左侧分区导航或顶部标签、堆叠表单面板、固定保存区。
- **新增/编辑页：** 最大 `720px` 的单列表单、分组区块、右对齐操作。
- **分栏工作台：** 左侧列表或树，右侧详情/编辑面板。

响应式行为：

- `1024px` 以下折叠侧边栏。
- `768px` 以下将顶栏文字操作替换为图标。
- `640px` 以下看板网格堆叠为单列。
- 移动端始终保持主操作可见，可放在头部或固定底部。

## Agent Prompt Guide

### Quick Color Reference

- 页面背景：`#ffffff`
- 应用主体背景：`#f8fafc`
- 面板背景：`#ffffff`
- 主文字：`#172033`
- 次文字：`#475569`
- 弱文字：`#64748b`
- 主操作色：`#4f63d7`
- 弱边框：`#e2e8f0`
- 选中/激活背景：`#eef2ff`

### 组件生成 Prompt 示例

1. **创建列表页：** 设计一个 Vben 风格列表页，背景使用 `Surface`。顶部包含页面标题、说明文字和右侧主按钮。下方是抬升筛选面板，包含搜索输入框、选择器筛选、重置按钮和查询按钮。再下方是带边框表格，表头弱化背景，行高 `44px`，hover 行高亮，包含状态徽标和紧凑行操作按钮。
2. **设计指标看板：** 创建一个数据看板，顶部四个指标卡片组成响应式网格。每张卡片使用白色背景、弱边框、`12px` 圆角和 `20px` 内边距。指标数字使用 `32px` 粗体和主文字色；标签使用 `13px` 次文字色；趋势使用语义浅色徽标。下方加入大图表面板，右上角有时间范围分段控件。
3. **构建设置表单：** 创建一个设置页，由多个堆叠数据卡片组成。每个区块包含 `18px` 标题、简短说明和标准表单控件。输入框高度 `36px`。底部使用固定保存栏，包含次级取消按钮和主保存按钮。整体使用弱分割线，不使用重阴影。
4. **创建抽屉编辑流程：** 设计一个右侧抽屉用于编辑记录。宽度 `520px`，白色表面，固定头部，可滚动表单主体，固定底部操作区。输入框圆角 `8px`，聚焦显示主色焦点环。底部包含主保存按钮和次取消按钮。
5. **生成空状态：** 在带边框面板中居中展示一个中性线性图标、标题、简短说明和一个主操作按钮。使用弱文字和克制图形，不要使用大幅彩色插画，除非是首次使用引导。

## Similar Products

- **Linear：** 精准排版、低噪声表面、支持键盘操作的高效工作流。
- **Stripe Dashboard：** 数据呈现清晰、色彩克制、金融和产品工作流层级明确。
- **Vercel Dashboard：** 开发者工具气质、界面外壳极简、面板清晰、深色模式克制。
- **Retool：** 运营工具密度高、控件直接、布局实用。
- **Notion 管理视图：** 留白冷静、层级清楚、内容组织轻量。

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-canvas: #ffffff;
  --color-surface: #f8fafc;
  --color-surface-raised: #ffffff;
  --color-surface-muted: #f1f5f9;
  --color-text-primary: #172033;
  --color-text-secondary: #475569;
  --color-text-tertiary: #64748b;
  --color-text-disabled: #94a3b8;
  --color-primary: #4f63d7;
  --color-primary-hover: #3f51c1;
  --color-primary-soft: #eef2ff;
  --color-primary-border: #c7d2fe;
  --color-success: #16a34a;
  --color-success-soft: #dcfce7;
  --color-warning: #d97706;
  --color-warning-soft: #fef3c7;
  --color-danger: #dc2626;
  --color-danger-soft: #fee2e2;
  --color-info: #0284c7;
  --color-info-soft: #e0f2fe;
  --color-border-subtle: #e2e8f0;
  --color-border-strong: #cbd5e1;
  --color-overlay: rgba(15, 23, 42, 0.42);
  --color-focus-ring: rgba(79, 99, 215, 0.24);
  --color-sidebar: #ffffff;
  --color-header: #ffffff;

  /* Dark mode tokens */
  --color-canvas-dark: #0f172a;
  --color-surface-dark: #111827;
  --color-surface-raised-dark: #1e293b;
  --color-surface-muted-dark: #273449;
  --color-text-primary-dark: #f8fafc;
  --color-text-secondary-dark: #cbd5e1;
  --color-text-tertiary-dark: #94a3b8;
  --color-border-dark: #334155;
  --color-primary-dark: #8ea0ff;
  --color-primary-soft-dark: rgba(142, 160, 255, 0.16);

  /* Typography */
  --font-interface: Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  --text-overline: 12px;
  --text-caption: 12px;
  --text-body-sm: 13px;
  --text-body: 14px;
  --text-body-lg: 16px;
  --text-label: 14px;
  --text-heading-sm: 18px;
  --text-heading: 24px;
  --text-heading-lg: 30px;
  --text-display: 36px;
  --text-metric: 32px;
  --leading-tight: 1.2;
  --leading-snug: 1.35;
  --leading-normal: 1.45;
  --leading-relaxed: 1.5;
  --tracking-heading: -0.015em;
  --tracking-display: -0.02em;

  /* Spacing */
  --spacing-2: 2px;
  --spacing-4: 4px;
  --spacing-6: 6px;
  --spacing-8: 8px;
  --spacing-10: 10px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;

  /* Layout */
  --page-max-width: 1440px;
  --content-max-width: 1280px;
  --sidebar-width: 248px;
  --sidebar-width-collapsed: 64px;
  --header-height: 56px;
  --tabbar-height: 40px;
  --page-padding: 24px;
  --section-gap: 24px;
  --panel-padding: 20px;
  --card-padding: 20px;
  --control-height: 36px;
  --control-height-compact: 32px;
  --control-height-large: 40px;
  --table-row-height: 44px;
  --table-row-height-compact: 36px;

  /* Radius */
  --radius-panel: 10px;
  --radius-card: 12px;
  --radius-input: 8px;
  --radius-button: 8px;
  --radius-icon-button: 8px;
  --radius-pill: 9999px;
  --radius-modal: 14px;
  --radius-drawer: 0px;
  --radius-tab: 8px;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-sm:
    0 1px 3px rgba(15, 23, 42, 0.1),
    0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-md: 0 8px 24px rgba(15, 23, 42, 0.1);
  --shadow-lg: 0 18px 48px rgba(15, 23, 42, 0.16);
  --shadow-focus: 0 0 0 3px var(--color-focus-ring);
}

.dark {
  --color-canvas: var(--color-canvas-dark);
  --color-surface: var(--color-surface-dark);
  --color-surface-raised: var(--color-surface-raised-dark);
  --color-surface-muted: var(--color-surface-muted-dark);
  --color-text-primary: var(--color-text-primary-dark);
  --color-text-secondary: var(--color-text-secondary-dark);
  --color-text-tertiary: var(--color-text-tertiary-dark);
  --color-border-subtle: var(--color-border-dark);
  --color-border-strong: #475569;
  --color-primary: var(--color-primary-dark);
  --color-primary-soft: var(--color-primary-soft-dark);
  --color-sidebar: var(--color-surface-raised-dark);
  --color-header: var(--color-surface-raised-dark);
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-canvas: #ffffff;
  --color-surface: #f8fafc;
  --color-surface-raised: #ffffff;
  --color-surface-muted: #f1f5f9;
  --color-text-primary: #172033;
  --color-text-secondary: #475569;
  --color-text-tertiary: #64748b;
  --color-text-disabled: #94a3b8;
  --color-primary: #4f63d7;
  --color-primary-hover: #3f51c1;
  --color-primary-soft: #eef2ff;
  --color-primary-border: #c7d2fe;
  --color-success: #16a34a;
  --color-success-soft: #dcfce7;
  --color-warning: #d97706;
  --color-warning-soft: #fef3c7;
  --color-danger: #dc2626;
  --color-danger-soft: #fee2e2;
  --color-info: #0284c7;
  --color-info-soft: #e0f2fe;
  --color-border-subtle: #e2e8f0;
  --color-border-strong: #cbd5e1;
  --color-sidebar: #ffffff;
  --color-header: #ffffff;

  /* Typography */
  --font-interface: Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  --text-overline: 12px;
  --text-caption: 12px;
  --text-body-sm: 13px;
  --text-body: 14px;
  --text-body-lg: 16px;
  --text-label: 14px;
  --text-heading-sm: 18px;
  --text-heading: 24px;
  --text-heading-lg: 30px;
  --text-display: 36px;
  --text-metric: 32px;

  /* Spacing */
  --spacing-2: 2px;
  --spacing-4: 4px;
  --spacing-6: 6px;
  --spacing-8: 8px;
  --spacing-10: 10px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;

  /* Radius */
  --radius-panel: 10px;
  --radius-card: 12px;
  --radius-input: 8px;
  --radius-button: 8px;
  --radius-icon-button: 8px;
  --radius-pill: 9999px;
  --radius-modal: 14px;
  --radius-drawer: 0px;
  --radius-tab: 8px;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-sm: 0 1px 3px rgba(15, 23, 42, 0.1), 0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-md: 0 8px 24px rgba(15, 23, 42, 0.1);
  --shadow-lg: 0 18px 48px rgba(15, 23, 42, 0.16);
}
```
