# RevenueCat 风格参考

> 白底、精密、结构化，像在明亮数字实验室中透视一组组织严密的产品组件。

**主题：** 浅色

RevenueCat 风格呈现高度组织化、可信、精密的数字产品界面。它通过高对比白色背景、深紫文本和单一主强调色 `Digital Violet` 建立清晰层级，让复杂信息显得稳定、精密、可操作。结构容器偏方正，主要按钮使用全圆角，形成“严谨信息结构 + 友好操作入口”的对比。

## 视觉关键词

- 明亮白底
- 精密架构
- 高信息密度但不拥挤
- 单一主强调色
- 结构化表格、卡片、状态标签
- 克制阴影
- 方正信息容器
- 圆角主操作按钮

## Tokens — Colors

| 名称 | 值 | Token | 用途 |
| --- | --- | --- | --- |
| White Canvas | `#ffffff` | `--color-white-canvas` | 页面背景、主要表面、按钮文字。 |
| Cloud Gray | `#f9f9fb` | `--color-cloud-gray` | 次级区域背景、分组卡片背景、轻量分隔。 |
| Deep Space Violet | `#1f1f47` | `--color-deep-space-violet` | 标题、导航、关键数据和主要文本。 |
| Digital Violet | `#576cdb` | `--color-digital-violet` | 主按钮、选中态、链接、关键交互图标。 |
| Charcoal Text | `#171a1c` | `--color-charcoal-text` | 正文、标签、较重要的辅助文本。 |
| Slate Text | `#3d3d5c` | `--color-slate-text` | 长文本、说明、次级信息。 |
| Whisper Gray | `#6c7693` | `--color-whisper-gray` | 占位符、弱提示、细边框、三级信息。 |
| Hover Violet | `#abb6ed` | `--color-hover-violet` | Hover 背景、浅强调区域。 |
| Light Violet Stroke | `#eaedf6` | `--color-light-violet-stroke` | 分割线、表格线、卡片边框。 |

## Tokens — Typography

### Object Sans

- **用途：** 标题、数据强调、页面主标题。
- **替代字体：** `system-ui`
- **字重：** 100、300、400、500、700
- **建议字号：** 13px、14px、16px、18px、24px、28px、32px、40px、48px
- **行高：** 1.13、1.25、1.38、1.5
- **字距：** 大标题可以轻微负字距，营造精密感。

### Helvetica Neue

- **用途：** 正文、导航、表单、表格文本。
- **替代字体：** `system-ui`
- **字重：** 300、400、500
- **建议字号：** 14px、16px、18px、20px
- **行高：** 1.25、1.38、1.5
- **字距：** 默认。

## Type Scale

| 角色 | 大小 | 行高 | 字距 | Token |
| --- | --- | --- | --- | --- |
| caption | 13px | 1.5 | 默认 | `--text-caption` |
| body | 16px | 1.5 | 默认 | `--text-body` |
| subheading | 18px | 1.5 | 默认 | `--text-subheading` |
| heading-sm | 24px | 1.38 | -0.48px | `--text-heading-sm` |
| heading | 32px | 1.25 | -0.8px | `--text-heading` |
| heading-lg | 40px | 1.25 | -1.2px | `--text-heading-lg` |
| display | 48px | 1.25 | -1.92px | `--text-display` |

## Spacing & Shapes

**基础单位：** 4px  
**密度：** 宽松但结构清晰

| 类型 | 建议 |
| --- | --- |
| 页面最大宽度 | 1216px |
| 大区块间距 | 64px 到 120px |
| 卡片内边距 | 20px 到 24px |
| 元素间距 | 16px 到 24px |
| 信息卡片圆角 | 0px |
| 输入框圆角 | 0px |
| 主按钮圆角 | 9999px |
| 强调卡片圆角 | 16px |
| 常规边框 | `1px solid #eaedf6` |

## Components

### Primary Action Button

用于主操作。背景使用 `Digital Violet`，文字使用 `White Canvas`，圆角使用 `9999px`，水平内边距 24px 到 28px，垂直内边距 12px 到 16px。

### Text Link Button

用于次级操作、导航和内联链接。透明背景，文本使用 `Charcoal Text` 或 `Digital Violet`，不使用卡片式按钮外观。

### Informational Card

用于展示信息分组、指标解释、功能块。默认使用白底或 `Cloud Gray` 背景，圆角 0px，轻边框或无边框，避免厚重阴影。

### Elevated Content Card

用于关键数据、重要提醒或需要突出层级的模块。使用白底、16px 圆角和轻量复合阴影，不要滥用。

### Input Field

透明或白色背景，文本使用 `Slate Text`，焦点边框使用 `Digital Violet`，圆角 0px，水平内边距 20px 到 24px。

### Data Table

表头使用浅灰背景或白底加分割线，行间距保持宽松，状态标签使用低饱和背景，关键操作使用 `Digital Violet`。

### Status Tag

状态标签应克制、清晰，优先用浅底深字。不要使用大面积高饱和色块。关键状态可以用 `Digital Violet` 或语义色补充，但主视觉仍以白、灰、深紫为主。

## Do

- 使用 `Digital Violet` 作为主操作和选中态，不要到处滥用。
- 保持白色和浅灰作为主要背景。
- 使用深紫和炭黑建立清晰文本层级。
- 信息容器尽量方正，体现结构感。
- 主按钮保持全圆角，让操作入口更友好。
- 表格、过滤器、状态流、指标卡都要保持足够留白。
- 图标使用统一线性图标风格，颜色以深紫或主强调色为主。

## Don't

- 不要把 `Digital Violet` 当装饰色大面积使用。
- 不要增加新的主色或多套渐变。
- 不要加入脱离产品内容的大型营销式 hero。
- 不要使用厚重、浑浊的阴影。
- 不要把所有卡片都做成大圆角。
- 不要使用 emoji 作为功能图标。
- 不要引入会覆盖本主题颜色、字体、圆角和整体气质的一次性视觉风格。

## Layout

- 页面主容器建议使用 1216px 最大宽度。
- 应用界面可采用顶部栏、侧边导航和主工作区组织内容。
- 数据页面可使用表格、筛选器、状态标签、指标卡和详情抽屉。
- 页面背景以 `White Canvas` 为主，局部区域使用 `Cloud Gray` 做分组。
- 重要数据可使用精密的大数字展示，但避免营销式夸张排版。
- 操作按钮应靠近业务对象，不要远离上下文。

## CSS Custom Properties

```css
:root {
  --color-white-canvas: #ffffff;
  --color-cloud-gray: #f9f9fb;
  --color-deep-space-violet: #1f1f47;
  --color-digital-violet: #576cdb;
  --color-charcoal-text: #171a1c;
  --color-slate-text: #3d3d5c;
  --color-whisper-gray: #6c7693;
  --color-hover-violet: #abb6ed;
  --color-light-violet-stroke: #eaedf6;

  --font-object-sans: 'Object Sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-helvetica-neue: 'Helvetica Neue', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --text-caption: 13px;
  --text-body: 16px;
  --text-subheading: 18px;
  --text-heading-sm: 24px;
  --text-heading: 32px;
  --text-heading-lg: 40px;
  --text-display: 48px;

  --page-max-width: 1216px;
  --card-padding: 24px;
  --element-gap: 20px;

  --radius-cards: 0px;
  --radius-buttons: 9999px;
  --radius-emphasis: 16px;

  --shadow-md: rgba(73, 46, 107, 0.14) 0px 3px 16px 0px;
  --shadow-lg: rgba(71, 92, 133, 0.25) 0px 4px 20px 0px, rgba(144, 138, 208, 0.1) 0px 30px 60px 0px;
}
```

## Tailwind v4 Theme

```css
@theme {
  --color-white-canvas: #ffffff;
  --color-cloud-gray: #f9f9fb;
  --color-deep-space-violet: #1f1f47;
  --color-digital-violet: #576cdb;
  --color-charcoal-text: #171a1c;
  --color-slate-text: #3d3d5c;
  --color-whisper-gray: #6c7693;
  --color-hover-violet: #abb6ed;
  --color-light-violet-stroke: #eaedf6;

  --font-object-sans: 'Object Sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-helvetica-neue: 'Helvetica Neue', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  --text-caption: 13px;
  --text-body: 16px;
  --text-subheading: 18px;
  --text-heading-sm: 24px;
  --text-heading: 32px;
  --text-heading-lg: 40px;
  --text-display: 48px;

  --radius-cards: 0px;
  --radius-buttons: 9999px;
  --radius-emphasis: 16px;
}
```
