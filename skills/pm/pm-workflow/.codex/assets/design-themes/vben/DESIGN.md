# Vben / Arco Design Pro UI Design Tokens

> 本文件用于 B 端后台、SaaS 控制台、运营平台、CRM、数据看板和内部工具。基础 token 必须逐项对照 Arco Design Vue 官方 token 与 Arco Design Pro Vue 默认布局参数；项目定制只能写在第十四章。

**组件框架：** Arco Design Pro Vue / Arco Design Vue
**官方基准：** `@arco-design/web-vue@2.58.0`、`arco-design-pro-vue@2.7.3`
**约束：** 第一到十三章、第十五章只记录 Arco 官方默认值或官方变量映射；不得写项目色、品牌偏好或经验推荐。

---

## 一、色彩体系

### 1.1 品牌色与语义色

| Token | 官方默认值 | 官方映射 | 用途 |
|---|---|---|---|
| `--primary-6` | `#165DFF` | `--arcoblue-6` | 品牌主色、主按钮、链接、选中态 |
| `--success-6` | `#00B42A` | `--green-6` | 成功状态 |
| `--warning-6` | `#FF7D00` | `--orange-6` | 警告状态 |
| `--danger-6` | `#F53F3F` | `--red-6` | 错误、危险、删除、校验失败 |
| `--link-6` | `#165DFF` | `--arcoblue-6` | 文本链接 |

### 1.2 预设调色板（6 阶主值）

| Token | 值 | Token | 值 |
|---|---|---|---|
| `--red-6` | `#F53F3F` | `--arcoblue-6` | `#165DFF` |
| `--orangered-6` | `#F77234` | `--blue-6` | `#3491FA` |
| `--orange-6` | `#FF7D00` | `--purple-6` | `#722ED1` |
| `--gold-6` | `#F7BA1E` | `--pinkpurple-6` | `#D91AD9` |
| `--yellow-6` | `#FADC19` | `--magenta-6` | `#F5319D` |
| `--lime-6` | `#9FDB1D` | `--cyan-6` | `#14C9C9` |
| `--green-6` | `#00B42A` | `--gray-10` | `#1D2129` |

### 1.3 主色阶（官方默认 Arcoblue）

| Token | 值 | Token | 值 |
|---|---|---|---|
| `--primary-1` | `#E8F3FF` | `--primary-6` | `#165DFF` |
| `--primary-2` | `#BEDAFF` | `--primary-7` | `#0E42D2` |
| `--primary-3` | `#94BFFF` | `--primary-8` | `#072CA6` |
| `--primary-4` | `#6AA1FF` | `--primary-9` | `#031A79` |
| `--primary-5` | `#4080FF` | `--primary-10` | `#000D4D` |

### 1.4 中性色（文字）

| Token | 官方默认值 | 官方映射 | 用途 |
|---|---|---|---|
| `--color-text-1` | `#1D2129` | `--color-neutral-10` | 标题、正文主文字 |
| `--color-text-2` | `#4E5969` | `--color-neutral-8` | 次级文字、标签 |
| `--color-text-3` | `#86909C` | `--color-neutral-6` | 辅助文字、描述、占位 |
| `--color-text-4` | `#C9CDD4` | `--color-neutral-4` | 禁用、弱提示 |

### 1.5 背景色

| Token | 官方默认值 | 用途 |
|---|---|---|
| `--color-bg-1` | `#FFFFFF` | 整体背景层级 1 |
| `--color-bg-2` | `#FFFFFF` | 容器背景 |
| `--color-bg-3` | `#FFFFFF` | 次级容器背景 |
| `--color-bg-4` | `#FFFFFF` | 强调容器背景 |
| `--color-bg-5` | `#FFFFFF` | 浮层背景 |
| `--color-bg-popup` | `var(--color-bg-5)` | 弹窗、下拉、气泡 |
| `--color-bg-white` | `#FFFFFF` | 白色背景 |
| `--color-mask-bg` | `rgba(29, 33, 41, 0.6)` | 遮罩层 |
| `--color-tooltip-bg` | `#1D2129` | Tooltip 背景 |

### 1.6 填充色

| Token | 官方默认值 | 官方映射 | 用途 |
|---|---|---|---|
| `--color-fill-1` | `#F7F8FA` | `--color-neutral-1` | 最弱填充 |
| `--color-fill-2` | `#F2F3F5` | `--color-neutral-2` | 常规填充、页面内容背景 |
| `--color-fill-3` | `#E5E6EB` | `--color-neutral-3` | 强填充、hover 填充 |
| `--color-fill-4` | `#C9CDD4` | `--color-neutral-4` | 最强填充、禁用强调 |

### 1.7 边框色

| Token | 官方默认值 | 官方映射 | 用途 |
|---|---|---|---|
| `--color-border` | `#E5E6EB` | `--gray-3` | 通用边框 |
| `--color-border-1` | `#F2F3F5` | `--color-neutral-2` | 弱分割 |
| `--color-border-2` | `#E5E6EB` | `--color-neutral-3` | 默认边框 |
| `--color-border-3` | `#C9CDD4` | `--color-neutral-4` | 强边框 |
| `--color-border-4` | `#86909C` | `--color-neutral-6` | 最强边框 |

---

## 二、字体体系

### 2.1 字体族

| Token | 官方默认值 |
|---|---|
| `@font-family` | `Inter, "-apple-system", BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "noto sans", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif` |
| `@code-family` | `Consolas, Menlo` |

### 2.2 字号梯度

| Token | 官方默认值 | 用途 |
|---|---|---|
| `@font-size-display-3` | `56px` | 展示级标题 |
| `@font-size-display-2` | `48px` | 展示级标题 |
| `@font-size-display-1` | `36px` | 展示级标题 |
| `@font-size-title-3` | `24px` | 大标题 |
| `@font-size-title-2` | `20px` | 中标题 |
| `@font-size-title-1` | `16px` | 小标题 |
| `@font-size-body-3` | `14px` | 正文 |
| `@font-size-body-2` | `13px` | 次正文 |
| `@font-size-body-1` | `12px` | 辅助正文 |
| `@font-size-caption` | `12px` | 说明文字 |
| `@font-size-body` | `14px` | 全局正文基准 |

### 2.3 行高

| Token | 官方默认值 |
|---|---|
| `@line-height-base` | `1.5715` |
| `mini line-height` | `1.667` |

### 2.4 字重

| Token | 官方默认值 |
|---|---|
| `@font-weight-100` | `100` |
| `@font-weight-200` | `200` |
| `@font-weight-300` | `300` |
| `@font-weight-400` | `400` |
| `@font-weight-500` | `500` |
| `@font-weight-600` | `600` |
| `@font-weight-700` | `700` |
| `@font-weight-800` | `800` |
| `@font-weight-900` | `900` |

---

## 三、尺寸与间距体系

### 3.1 尺寸梯度

| Token | 值 | Token | 值 | Token | 值 |
|---|---|---|---|---|---|
| `@size-none` | `0` | `@size-1` | `4px` | `@size-2` | `8px` |
| `@size-3` | `12px` | `@size-4` | `16px` | `@size-5` | `20px` |
| `@size-6` | `24px` | `@size-7` | `28px` | `@size-8` | `32px` |
| `@size-9` | `36px` | `@size-10` | `40px` | `@size-11` | `44px` |
| `@size-12` | `48px` | `@size-13` | `52px` | `@size-14` | `56px` |
| `@size-15` | `60px` | `@size-16` | `64px` | `@size-20` | `80px` |
| `@size-25` | `100px` | `@size-50` | `200px` |  |  |

### 3.2 控件尺寸别名

| Token | 官方默认值 |
|---|---|
| `@size-mini` | `@size-6` = `24px` |
| `@size-small` | `@size-7` = `28px` |
| `@size-default` | `@size-8` = `32px` |
| `@size-large` | `@size-9` = `36px` |

### 3.3 间距梯度

| Token | 值 | Token | 值 | Token | 值 |
|---|---|---|---|---|---|
| `@spacing-none` | `0` | `@spacing-1` | `2px` | `@spacing-2` | `4px` |
| `@spacing-3` | `6px` | `@spacing-4` | `8px` | `@spacing-5` | `10px` |
| `@spacing-6` | `12px` | `@spacing-7` | `16px` | `@spacing-8` | `20px` |
| `@spacing-9` | `24px` | `@spacing-10` | `32px` | `@spacing-11` | `36px` |
| `@spacing-12` | `40px` | `@spacing-13` | `48px` | `@spacing-14` | `56px` |
| `@spacing-15` | `60px` | `@spacing-16` | `64px` | `@spacing-17` | `72px` |
| `@spacing-18` | `80px` | `@spacing-19` | `84px` | `@spacing-20` | `96px` |
| `@spacing-21` | `100px` | `@spacing-22` | `120px` |  |  |

---

## 四、圆角体系

| Token | 官方默认值 | 用途 |
|---|---|---|
| `--border-radius-none` / `@radius-none` | `0` | 无圆角 |
| `--border-radius-small` / `@radius-small` | `2px` | 默认小圆角 |
| `--border-radius-medium` / `@radius-medium` | `4px` | 中圆角 |
| `--border-radius-large` / `@radius-large` | `8px` | 大圆角、浮层 |
| `--border-radius-circle` / `@radius-circle` | `50%` | 圆形 |

---

## 五、边框体系

| Token | 官方默认值 |
|---|---|
| `@border-none` | `0` |
| `@border-1` | `1px` |
| `@border-2` | `2px` |
| `@border-3` | `3px` |
| `@border-4` | `4px` |
| `@border-5` | `5px` |
| `@border-solid` | `solid` |
| `@border-dashed` | `dashed` |
| `@border-dotted` | `dotted` |

---

## 六、控件高度体系

| 尺寸 | 官方 token | 官方默认值 | 典型组件 |
|---|---|---|---|
| mini | `@size-mini` | `24px` | mini Button / Input |
| small | `@size-small` | `28px` | small Button / Input |
| default | `@size-default` | `32px` | default Button / Input / Select |
| large | `@size-large` | `36px` | large Button / Input |

| 组件 token | 官方默认值 |
|---|---|
| `@btn-size-default-height` | `@size-default` = `32px` |
| `@input-size-default-height` | `@size-default` = `32px` |
| `@radio-size-default-height` | `@size-default` = `32px` |
| `@switch-size-default` | `@size-6` = `24px` |
| `@checkbox-mask-height` | `14px` |
| `@radio-layout-height` | `14px` |

---

## 七、阴影体系

| Token | 官方默认值 |
|---|---|
| `@shadow-none` | `none` |
| `@shadow-special` | `0 0 1px rgba(0, 0, 0, 0.3)` |
| `@shadow1-center` | `0 0 5px rgba(0, 0, 0, 0.1)` |
| `@shadow1-down` | `0 2px 5px rgba(0, 0, 0, 0.1)` |
| `@shadow2-center` | `0 0 10px rgba(0, 0, 0, 0.1)` |
| `@shadow2-down` | `0 4px 10px rgba(0, 0, 0, 0.1)` |
| `@shadow3-center` | `0 0 20px rgba(0, 0, 0, 0.1)` |
| `@shadow3-down` | `0 8px 20px rgba(0, 0, 0, 0.1)` |
| `@popup-box-shadow-base` | `@shadow1-down` |

---

## 八、动效体系

### 8.1 动画时长

| Token | 官方默认值 |
|---|---|
| `@transition-duration-1` | `0.1s` |
| `@transition-duration-2` | `0.2s` |
| `@transition-duration-3` | `0.3s` |
| `@transition-duration-4` | `0.4s` |
| `@transition-duration-5` | `0.5s` |
| `@transition-duration-loading` | `1s` |

### 8.2 缓动曲线

| Token | 官方默认值 |
|---|---|
| `@transition-timing-function-linear` | `cubic-bezier(0, 0, 1, 1)` |
| `@transition-timing-function-standard` | `cubic-bezier(0.34, 0.69, 0.1, 1)` |
| `@transition-timing-function-overshoot` | `cubic-bezier(0.3, 1.3, 0.3, 1)` |
| `@transition-timing-function-decelerate` | `cubic-bezier(0.4, 0.8, 0.74, 1)` |
| `@transition-timing-function-accelerate` | `cubic-bezier(0.26, 0, 0.6, 0.2)` |

---

## 九、层级体系（z-index）

| Token | 官方默认值 |
|---|---|
| `@z-index-popup-base` | `1000` |
| `@z-index-affix` | `999` |
| `@z-index-popup` | `1000` |
| `@z-index-drawer` | `1001` |
| `@z-index-modal` | `1001` |
| `@z-index-message` | `1003` |
| `@z-index-notification` | `1003` |
| `@z-index-image-preview` | `1001` |

---

## 十、响应式断点

| Token | 官方默认值 | 来源 |
|---|---|---|
| `xs` | `< 576px` | Arco Grid 默认列类 |
| `sm` | `>= 576px` | Arco Grid `@media (min-width: 576px)` |
| `md` | `>= 768px` | Arco Grid `@media (min-width: 768px)` |
| `lg` | `>= 992px` | Arco Grid `@media (min-width: 992px)` |
| `xl` | `>= 1200px` | Arco Grid `@media (min-width: 1200px)` |
| `xxl` | `>= 1600px` | Arco Grid `@media (min-width: 1600px)` |

---

## 十一、聚焦与交互态

| 场景 | 官方 token | 官方默认值 |
|---|---|---|
| 主色 hover | `@color-primary-5` | `#4080FF` |
| 主色 active | `@color-primary-7` | `#0E42D2` |
| 输入框聚焦边框 | `@input-color-border_focus` | `@color-primary-6` |
| 输入框聚焦阴影 | `@input-color-shadow_focus` | `var(--color-primary-light-2)` |
| 输入框聚焦阴影距离 | `@input-size-shadow_focus` | `@shadow-distance-none` |
| 错误聚焦边框 | `@input-color-border_error_focus` | `@color-danger-6` |
| 错误聚焦阴影 | `@input-color-shadow_error_focus` | `var(--color-danger-light-2)` |
| 列表 hover | `@dropdown-option-color-bg_hover` | `var(--color-fill-2)` |
| 选项 active | `@cascader-color-item-bg_active` | `var(--color-fill-2)` |
| 禁用文字 | `--color-text-4` | `#C9CDD4` |
| 禁用填充 | `--color-fill-2` | `#F2F3F5` |

---

## 十二、图标与其他

| Token | 官方默认值 |
|---|---|
| `@icon-hover-border-radius` | `@radius-circle` |
| `@icon-hover-color-bg` | `var(--color-fill-2)` |
| `@icon-hover-size-default-height` | `@size-5` = `20px` |
| `@icon-hover-size-default-icon` | `@size-3` = `12px` |
| `@color-white` | `#FFFFFF` |
| `@color-black` | `#000000` |
| `@opacity-1` 到 `@opacity-10` | `10%` 到 `100%` |
| `@color-spin-layer-bg` | `rgba(255, 255, 255, 0.6)` |

---

## 十三、Arco Design Pro 默认布局参数

### 13.1 Pro 框架设置

| 参数 | 官方默认值 | 来源 |
|---|---|---|
| `theme` | `light` | `settings.json` |
| `themeColor` | `#165DFF` | `settings.json` |
| `navbar` | `true` | `settings.json` |
| `menu` | `true` | `settings.json` |
| `topMenu` | `false` | `settings.json` |
| `hideMenu` | `false` | `settings.json` |
| `menuCollapse` | `false` | `settings.json` |
| `menuWidth` | `220` | `settings.json` |
| `tabBar` | `false` | `settings.json` |
| `footer` | `true` | `settings.json` |
| `device` | `desktop` | `settings.json` |

### 13.2 Pro 布局尺寸

| 区域 | 官方默认值 | 来源 |
|---|---|---|
| Navbar 高度 | `60px` | `default-layout.vue` |
| Sider 展开宽度 | `220px` | `settings.json` + `default-layout.vue` |
| Sider 收起宽度 | `48px` | `default-layout.vue` |
| Sider breakpoint | `xl` | `default-layout.vue` |
| Layout 最大宽度变量 | `1100px` | `@layout-max-width` |
| Layout Navbar z-index | `100` | `default-layout.vue` |
| Layout Sider z-index | `99` | `default-layout.vue` |
| Layout 内容背景 | `var(--color-fill-2)` | `.layout-content` |
| Layout 过渡 | `0.2s cubic-bezier(0.34, 0.69, 0.1, 1)` | `.layout-content` |
| TabBar 视觉高度 | `48px` | `tab-bar/index.vue` `.tags-wrap` |
| TabBar 内部滚动高 | `32px` | `tab-bar/index.vue` `.tab-bar-scroll` |

---

## 十四、项目定制项

> 只有本章允许写项目级定制。第一到十三章、第十五章不得混入项目定制值。

| 定制项 | 项目值 | 说明 |
|---|---|---|
| Vben 项目主题色 | `#4F63D7` | 用于覆盖 Arco Pro 官方默认 `themeColor: #165DFF` |

---

## 十五、组件级 Design Token（Component Token）

> 以下逐项对照 Arco Design Vue 官方 `style/token.less`。值为官方 Less token 或官方默认值；未列出的细分状态继续以对应组件 `token.less` 为准。

### 15.1 Button 按钮

| Token | 官方默认值 |
|---|---|
| `@btn-font-weight` | `@font-weight-400` |
| `@btn-border-width` | `@border-1` |
| `@btn-border-radius` | `@radius-small` |
| `@btn-size-mini-height` | `@size-mini` = `24px` |
| `@btn-size-small-height` | `@size-small` = `28px` |
| `@btn-size-default-height` | `@size-default` = `32px` |
| `@btn-size-large-height` | `@size-large` = `36px` |
| `@btn-size-default-padding-horizontal` | `15px` |
| `@btn-size-large-padding-horizontal` | `19px` |
| `@btn-size-default-font-size` | `@font-size-body-3` = `14px` |
| `@btn-primary-color-bg` | `@color-primary-6` |
| `@btn-primary-color-bg_hover` | `@color-primary-5` |
| `@btn-primary-color-bg_active` | `@color-primary-7` |

### 15.2 Input / Textarea 输入

| Token | 官方默认值 |
|---|---|
| `@input-color-bg` | `var(--color-fill-2)` |
| `@input-color-bg_hover` | `var(--color-fill-3)` |
| `@input-color-bg_focus` | `var(--color-bg-2)` |
| `@input-border-radius` | `@radius-small` |
| `@input-size-default-height` | `@size-default` = `32px` |
| `@input-size-mini-height` | `@size-mini` = `24px` |
| `@input-size-small-height` | `@size-small` = `28px` |
| `@input-size-large-height` | `@size-large` = `36px` |
| `@input-padding-horizontal` | `@spacing-6` = `12px` |
| `@textarea-padding-horizontal` | `@spacing-6` = `12px` |
| `@textarea-padding-vertical` | `@spacing-2` = `4px` |

### 15.3 Table 表格

| Token | 官方默认值 |
|---|---|
| `@table-size-default-padding-horizontal` | `@spacing-7` = `16px` |
| `@table-size-default-padding-vertical` | `9px` |
| `@table-size-middle-padding-vertical` | `7px` |
| `@table-size-small-padding-vertical` | `5px` |
| `@table-size-mini-padding-vertical` | `2px` |
| `@table-size-default-font-size` | `@font-size-body-3` = `14px` |
| `@table-border-width` | `@border-1` |
| `@table-border-radius` | `@radius-medium` |
| `@table-color-bg-header-cell` | `var(--color-neutral-2)` |
| `@table-color-bg-body-row_hover` | `var(--color-fill-1)` |
| `@table-size-selection-col-width` | `40px` |

### 15.4 Modal / Drawer 弹窗与抽屉

| 组件 | Token | 官方默认值 |
|---|---|---|
| Modal | `@modal-border-radius` | `@radius-medium` |
| Modal | `@modal-default-size-width` | `520px` |
| Modal | `@modal-simple-size-width` | `400px` |
| Modal | `@modal-default-size-header-height` | `@size-12` = `48px` |
| Modal | `@modal-default-padding-horizontal` | `@spacing-8` = `20px` |
| Modal | `@modal-default-padding-content-vertical` | `@spacing-9` = `24px` |
| Drawer | `@drawer-size-header-height` | `@size-12` = `48px` |
| Drawer | `@drawer-padding-horizontal` | `@spacing-7` = `16px` |
| Drawer | `@drawer-padding-content-vertical` | `@spacing-6` = `12px` |
| Drawer | `@drawer-font-header-weight` | `@font-weight-500` |

### 15.5 Form 表单

| Token | 官方默认值 |
|---|---|
| `@form-size-default-margin-item-bottom` | `@spacing-8` = `20px` |
| `@form-size-default-font-label-size` | `@font-size-body-3` = `14px` |
| `@form-font-extra-text-size` | `@font-size-body-1` = `12px` |
| `@form-font-error-text-size` | `@font-size-body-1` = `12px` |
| `@form-margin-label-right` | `@spacing-7` = `16px` |
| `@form-inline-margin-item-right` | `@spacing-9` = `24px` |
| `@form-color-text-label` | `var(--color-text-2)` |

### 15.6 Tag / Badge 标签与徽标

| 组件 | Token | 官方默认值 |
|---|---|---|
| Tag | `@tag-size-default` | `@size-6` = `24px` |
| Tag | `@tag-size-small` | `@size-5` = `20px` |
| Tag | `@tag-border-radius` | `@radius-small` |
| Tag | `@tag-size-default-font-size` | `12px` |
| Tag | `@tag-size-medium-font-size` | `14px` |
| Badge | `@badge-size-count-height` | `@size-5` = `20px` |
| Badge | `@badge-padding-count-horizontal` | `@spacing-3` = `6px` |
| Badge | `@badge-font-count-size` | `@font-size-body-1` = `12px` |
| Badge | `@badge-color-count-bg` | `@color-danger-6` |
| Badge | `@badge-size-dot-width` | `6px` |

### 15.7 Alert / Message / Notification 反馈提示

| 组件 | Token | 官方默认值 |
|---|---|---|
| Alert | `@alert-min-height` | `@size-10` = `40px` |
| Alert | `@alert-border-radius` | `@radius-small` |
| Alert | `@alert-padding-horizontal` | `@spacing-7 - @border-1` |
| Alert | `@alert-font-size-text-content` | `@font-size-body-3` = `14px` |
| Message | `@message-wrapper-margin-top` | `@spacing-12` = `40px` |
| Message | `@message-padding-left` | `@spacing-7` = `16px` |
| Message | `@message-border-radius` | `@radius-small` |
| Notification | `@notification-width` | `300px` |
| Notification | `@notification-border-radius` | `@radius-medium` |
| Notification | `@notification-padding-left` | `@spacing-8` = `20px` |

### 15.8 Select / Cascader / TreeSelect 选择控件

| 组件 | Token | 官方默认值 |
|---|---|---|
| Select | `@select-popup-option-height` | `@size-9` = `36px` |
| Select | `@select-signal-popup-option-padding-horizontal` | `@spacing-6` = `12px` |
| Select | `@select-popup-option-color-bg_hover` | `var(--color-fill-2)` |
| Cascader | `@cascader-size-item-height` | `@size-9` = `36px` |
| Cascader | `@cascader-font-item-size` | `@font-size-body-3` = `14px` |
| Cascader | `@cascader-padding-item-left` | `@spacing-6` = `12px` |
| TreeSelect | `@tree-select-padding-popup-left` | `@spacing-5` = `10px` |

### 15.9 DatePicker / TimePicker / Calendar 日期时间

| 组件 | Token | 官方默认值 |
|---|---|---|
| DatePicker | `@picker-container-border-radius` | `@radius-medium` |
| DatePicker | `@picker-panel-date-width` | `265px` |
| DatePicker | `@picker-header-padding-horizontal` | `24px` |
| DatePicker | `@picker-panel-cell-circle-height` | `24px` |
| DatePicker | `@picker-panel-color-bg-cell_selected` | `@color-primary-6` |
| Calendar | `@calendar-header-padding-horizontal` | `24px` |
| Calendar | `@calendar-panel-date-cell-circle-height` | `24px` |
| Calendar | `@calendar-panel-color-bg-cell_selected` | `@color-primary-6` |

### 15.10 Tabs / Breadcrumb / Pagination 导航

| 组件 | Token | 官方默认值 |
|---|---|---|
| Tabs | `@tabs-line-font-title-size` | `@font-size-body-3` = `14px` |
| Tabs | `@tabs-line-font-title-text-weight_active` | `@font-weight-500` |
| Tabs | `@tabs-line-margin-title-horizontal` | `@spacing-10` = `32px` |
| Tabs | `@tabs-content-padding` | `@spacing-7` = `16px` |
| Breadcrumb | `@breadcrumb-size-font-size` | `@font-size-body-3` = `14px` |
| Breadcrumb | `@breadcrumb-size-text-height` | `@size-6` = `24px` |
| Pagination | `@pagination-size-default` | `@size-default` = `32px` |
| Pagination | `@pagination-size-small` | `@size-small` = `28px` |

### 15.11 Radio / Checkbox / Switch 表单选择

| 组件 | Token | 官方默认值 |
|---|---|---|
| Radio | `@radio-layout-height` | `14px` |
| Radio | `@radio-border-width` | `@border-2` |
| Radio | `@radio-size-default-height` | `@size-default` = `32px` |
| Checkbox | `@checkbox-mask-height` | `14px` |
| Checkbox | `@checkbox-mask-border-width` | `@border-2` |
| Checkbox | `@checkbox-mask-border-radius` | `@radius-small` |
| Switch | `@switch-size-default` | `@size-6` = `24px` |
| Switch | `@switch-size-small` | `@size-4` = `16px` |
| Switch | `@switch-round-default-width` | `@size-10` = `40px` |

### 15.12 Upload / Transfer / InputNumber 数据录入

| 组件 | Token | 官方默认值 |
|---|---|---|
| Upload | `@upload-drag-border-radius` | `@radius-small` |
| Upload | `@upload-drag-padding-vertical` | `50px` |
| Upload | `@upload-picture-item-width` | `@size-20` = `80px` |
| Transfer | `@transfer-width` | `200px` |
| Transfer | `@transfer-height` | `224px` |
| Transfer | `@transfer-border-radius` | `@radius-small` |
| InputNumber | `@input-number-border-radius` | `@radius-small` |
| InputNumber | `@input-number-size-default-step-button-width` | `@size-default` = `32px` |

### 15.13 Tooltip / Popover / Dropdown / Popconfirm 浮层

| 组件 | Token | 官方默认值 |
|---|---|---|
| Tooltip | `@tooltip-padding-horizontal` | `@spacing-6` = `12px` |
| Tooltip | `@tooltip-padding-vertical` | `@spacing-4` = `8px` |
| Tooltip | `@tooltip-border-radius` | `@radius-small` |
| Popover | `@popup-border-radius` | `@radius-medium` |
| Popover | `@popup-shadow` | `@shadow2-down` |
| Dropdown | `@dropdown-border-radius` | `@radius-medium` |
| Dropdown | `@dropdown-padding-vertical` | `@spacing-2` = `4px` |
| Dropdown | `@dropdown-option-height` | `@size-9` = `36px` |
| Popconfirm | `@popconfirm-border-radius` | `@radius-medium` |
| Popconfirm | `@popconfirm-shadow` | `@shadow2-down` |

### 15.14 Progress / Result / Skeleton / Spin / Empty

| 组件 | Token | 官方默认值 |
|---|---|---|
| Progress | `@progress-line-color-inner-bg` | `@color-primary-6` |
| Progress | `@progress-line-color-line-bg` | `var(--color-fill-3)` |
| Progress | `@progress-line-size-default-font-size` | `@font-size-body-1` = `12px` |
| Result | `@result-padding-horizontal` | `@spacing-10` = `32px` |
| Result | `@result-size-icon-wrapper` | `45px` |
| Result | `@result-font-title-size` | `@font-size-body-3` = `14px` |
| Skeleton | `@skeleton-color-bg-base` | `var(--color-fill-2)` |
| Skeleton | `@skeleton-color-animate-bg` | `var(--color-fill-3)` |
| Spin | `@spin-font-size-icon` | `20px` |
| Spin | `@spin-color-icon` | `@color-primary-6` |
| Empty | `@empty-size-img-height` | `@size-20` = `80px` |
| Empty | `@empty-font-size-text` | `@font-size-body-3` = `14px` |

### 15.15 Avatar / Card / Descriptions / Collapse

| 组件 | Token | 官方默认值 |
|---|---|---|
| Avatar | `@avatar-size-default` | `@size-10` = `40px` |
| Avatar | `@avatar-square-border-radius` | `@radius-medium` |
| Avatar | `@avatar-group-item-margin-left` | `-10px` |
| Card | `@card-border-radius` | `@radius-medium` |
| Card | `@card-size-default-padding-horizontal-body` | `@spacing-7` = `16px` |
| Card | `@card-size-default-font-size-title` | `@font-size-title-1` = `16px` |
| Descriptions | `@descriptions-size-default-font-size-text` | `@font-size-body-3` = `14px` |
| Descriptions | `@descriptions-border-radius` | `@radius-medium` |
| Collapse | `@collapse-border-radius` | `@radius-medium` |
| Collapse | `@collapse-title-padding-horizontal` | `13px` |

### 15.16 Menu / Layout / Grid / Space

| 组件 | Token | 官方默认值 |
|---|---|---|
| Menu | `@menu-light-color-bg` | `var(--color-menu-light-bg)` = `#FFFFFF` |
| Menu | `@menu-dark-color-bg` | `var(--color-menu-dark-bg)` = `#232324` |
| Menu | `@menu-vertical-item-height` | `40px` |
| Layout | `@layout-trigger-height` | `48px` |
| Layout | `@layout-sider-background-light` | `var(--color-menu-light-bg)` |
| Grid | 列数 | `24` |
| Grid | `sm / md / lg / xl / xxl` | `576 / 768 / 992 / 1200 / 1600px` |
| Space | 默认 size | 使用组件 `size` 属性映射 spacing |

### 15.17 Anchor / Timeline / Tree / Slider / Rate

| 组件 | Token | 官方默认值 |
|---|---|---|
| Anchor | `@anchor-width` | `150px` |
| Anchor | `@anchor-line-width` | `2px` |
| Anchor | `@anchor-font-size-title` | `14px` |
| Timeline | `@timeline-dot-size-width` | `6px` |
| Timeline | `@timeline-size-line-width` | `@border-1` |
| Tree | `@tree-size-default-line-height` | `@size-default` = `32px` |
| Tree | `@tree-node-border-radius` | `@radius-small` |
| Slider | `@slider-size-road-width` | `2px` |
| Slider | `@slider-size-button-width` | `@size-3` = `12px` |
| Rate | `@rate-font-size` | `@font-size-title-3` = `24px` |
| Rate | `@rate-gap-size` | `@spacing-4` = `8px` |

### 15.18 ColorPicker / Image / Statistic / Divider

| 组件 | Token | 官方默认值 |
|---|---|---|
| ColorPicker | `@color-panel-width` | `260px` |
| ColorPicker | `@color-panel-padding` | `@spacing-6` = `12px` |
| ColorPicker | `@color-panel-border-radius` | `@border-radius-small` |
| Image | `@image-preview-position-toolbar-bottom` | `46px` |
| Image | `@image-preview-radius-toolbar` | `@radius-medium` |
| Statistic | `@statistic-font-title-size` | `@font-size-body-3` = `14px` |
| Statistic | `@statistic-font-int-size` | `26px` |
| Divider | `@divider-size` | `1px` |
| Divider | `@divider-margin-vertical` | `@spacing-8` = `20px` |
| Divider | `@divider-font-size` | `@font-size-body-3` = `14px` |

---

## 官方来源对照

| 内容 | 来源文件 |
|---|---|
| 全局色彩、尺寸、间距、圆角、阴影 | `@arco-design/web-vue/lib/style/theme/global.less` |
| 字体、动效、层级、行高 | `@arco-design/web-vue/lib/style/theme/index.less` |
| CSS 变量最终默认值 | `@arco-design/web-vue/dist/arco.css` |
| 组件级 token | `@arco-design/web-vue/lib/{component}/style/token.less` |
| Arco Pro 默认设置 | `arco-design-pro-vue/arco-design-pro-vite/src/config/settings.json` |
| Arco Pro 默认布局 | `arco-design-pro-vue/arco-design-pro-vite/src/layout/default-layout.vue` |
| Arco Pro TabBar | `arco-design-pro-vue/arco-design-pro-vite/src/components/tab-bar/index.vue` |
