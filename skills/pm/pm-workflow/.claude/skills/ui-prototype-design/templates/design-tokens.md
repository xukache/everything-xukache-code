# {{PRODUCT_NAME}} UI 设计系统与 Tokens

## 现有系统扫描

| 类型 | 文件/来源 | 结论 | 处理方式 |
|---|---|---|---|
| UI 框架 |  |  | 复用/扩展/新增 |
| CSS 变量/tokens |  |  | 复用/扩展/新增 |
| Tailwind/主题配置 |  |  | 复用/扩展/新增 |
| 组件库 |  |  | 复用/扩展/新增 |
| 字体 |  |  | 复用/扩展/新增 |
| 图标 |  |  | 复用/扩展/新增 |

## 主题库与组件框架来源

- 主题库 README：
- 主题扫描命令：
- 已读取主题 `DESIGN.md`：
- 已读取主题 `examples.html`：
- 选定主题：
- Vben 主色值：
- Vben 使用范围：仅主色/品牌色 token，不作为组件规范
- Arco Design Pro Vue / Arco Design Vue 一比一引用策略：
- 若不采用 Vben 主色的原因：

| 候选方向 | 主题 `DESIGN.md` 路径 | 主色来源 | 组件框架/组件语义 | 采用/不采用 | 原因 |
|---|---|---|---|---|---|
| Arco Design Pro + Vben 主色 | assets/design-themes/vben/DESIGN.md | Vben 主色 | Arco Design Pro Vue / Arco Design Vue 一比一引用 | 待确认 | B 端默认推荐 |

## Token 决策

| 类别 | Token/规则 | 值或范围 | 使用场景 | 来源 |
|---|---|---|---|---|
| 颜色 |  |  |  |  |
| 字体 |  |  |  |  |
| 间距 |  |  |  |  |
| 圆角 |  |  |  |  |
| 阴影/边框 |  |  |  |  |
| 动效 |  |  |  |  |
| 断点 |  |  |  |  |

## 主色覆盖与全局变量

| Token | 项目值 | 覆盖目标 | 使用场景 | 禁止事项 |
|---|---|---|---|---|
| `--primary-1` | `#E8EFFF` | Arco primary-1 | 弱选中背景 | 不写页面级近似浅紫 |
| `--primary-2` | `#C6D4F7` | Arco primary-2 | hover 浅底、弱边框 | 不手写临时浅色 |
| `--primary-3` | `#A6B8EF` | Arco primary-3 | 禁用主色背景 | 不与语义禁用灰混用 |
| `--primary-4` | `#879CE7` | Arco primary-4 | 次强调 | 不作为正文色 |
| `--primary-5` | `#6A80DF` | Arco primary-5 | hover | 不按组件单独取色 |
| `--primary-6` | `#4F63D7` | Arco primary-6 / `themeColor` | 主按钮、链接、选中态、Progress | 不再使用 `#165DFF` 作为项目主色 |
| `--primary-7` | `#3241B4` | Arco primary-7 | active | 不按页面单独加深 |
| `--primary-8` | `#1B2592` | Arco primary-8 | 深色强调 | 不大面积铺底 |
| `--primary-9` | `#0A0F6F` | Arco primary-9 | 极深强调 | 不用于普通文本 |
| `--primary-10` | `#00014D` | Arco primary-10 | 极深强调 | 不用于普通背景 |

- 主色色阶来源：`assets/design-themes/vben/DESIGN.md` 第十四章，使用 `@arco-design/color` 由 `#4F63D7` 生成。
- Vue 项目设置方式：
- HTML 原型设置方式：
- 禁止页面级临时主色、临时 hover 色、临时 active 色：

## 组件级 Token 应用表

每个组件必须先查 `assets/design-themes/vben/DESIGN.md` 第十五章的 Arco token，再写入本表。若原型或开发没有使用某组件，写“不使用”；不得留空。

| 组件 | 必用 Arco token | 项目覆盖/固定值 | 使用场景 | 禁止偏离项 | 原型/页面证据 |
|---|---|---|---|---|---|
| Button | `@btn-border-radius`、`@btn-size-*-height`、`@btn-primary-color-bg` | 圆角 `@radius-small`，默认高 `32px`，primary `--primary-6` | 主操作、次操作、危险操作 | 不手写按钮高度/圆角/主色 | 待填写 |
| Input / Textarea | `@input-border-radius`、`@input-size-default-height`、`@input-color-border_focus` | 圆角 `@radius-small`，默认高 `32px`，focus `--primary-6` | 表单输入、搜索 | 不混用多套输入框高度 | 待填写 |
| Select / Cascader / TreeSelect | option height、popup padding、hover bg | option 默认 `36px`，hover `var(--color-fill-2)` | 选择器、筛选器 | 不自定义下拉项高度 | 待填写 |
| Table | `@table-size-*-padding-*`、`@table-border-radius`、header/hover bg | 表格圆角 `@radius-medium`，行 hover `var(--color-fill-1)` | 列表、数据表 | 不给每行加卡片阴影或大圆角 | 待填写 |
| Form | `@form-size-default-margin-item-bottom`、label spacing | 表单项底距 `20px`，label right `16px` | 表单页、筛选表单 | 不按页面感觉调 label 间距 | 待填写 |
| Modal | `@modal-border-radius`、`@modal-default-size-width`、padding | 圆角 `@radius-medium`，默认宽 `520px` | 弹窗确认、表单弹窗 | 不自定义弹窗宽度和阴影 | 待填写 |
| Drawer | header height、padding | 头部 `48px`，左右 `16px` | 详情、编辑抽屉 | 不临时改变抽屉内边距 | 待填写 |
| Card | `@card-border-radius`、body padding、title size | 圆角按 Arco Card，body padding `16px` | 工作台卡片、信息容器 | 同页不出现多套卡片圆角 | 待填写 |
| Tag / Badge | `@tag-border-radius`、`@tag-size-default`、badge size | Tag 默认高 `24px`，Badge 计数高 `20px` | 状态、分类、数量 | 不临时放大标签字号和圆角 | 待填写 |
| Tabs / Breadcrumb / Pagination / Menu | title size、active weight、pagination size、menu height | active 使用 `--primary-6`，分页默认 `32px` | 导航、分页 | 不用页面级 active 色 | 待填写 |
| Progress | `@progress-line-color-inner-bg`、`@progress-line-color-line-bg` | 完成进度固定 `--primary-6/#4F63D7`，轨道 `var(--color-fill-3)` | 完成度、流程进度 | 不按百分比变绿/橙/红 | 待填写 |
| Tooltip / Popover / Dropdown / Popconfirm | `@popup-border-radius`、`@popup-shadow`、option height | 浮层圆角/阴影按 Arco，Dropdown option `36px` | 提示、菜单、确认 | 不自定义浮层阴影 | 待填写 |
| Skeleton / Spin / Empty / Result | loading、icon、empty size token | Spin icon `--primary-6`，Empty 图高 `80px` | 加载、空态、结果页 | 不用 emoji 或自绘风格替代 | 待填写 |
| Slider / Timeline / Tree / Anchor | track、dot、node line-height、active color | active 使用 `--primary-6` | 进度调节、时间轴、树 | 不临时改线宽和节点大小 | 待填写 |

## B 端规范引用

| 阶段 | 已读取章节 | 采用规则 | 偏离原因 |
|---|---|---|---|
| 识别和边界 |  |  |  |
| 风格和配色 |  |  |  |
| 画布和密度 |  |  |  |
| 组件表现 |  |  |  |

## 原型落地要求

- 颜色变量：
- 字体变量：
- 间距变量：
- 控件高度：
- 响应式断点：
- 暗色模式：

## 阶段确认

- 确认状态：待确认
- 用户意见：
- 下一阶段：方向 demo 和 `docs/ui-build-tasks.md`

## 文档同步检查

| 变更项 | 影响类型 | 是否影响上游事实 | 已检查文档 | 已同步文档 | 不需要同步原因 | 责任阶段 | 检查结论 |
|---|---|---|---|---|---|---|---|
| 设计系统和 tokens | UI 框架/组件库/主题/响应式 | 是/否 | `docs/tech-architecture.md`、`docs/handoff-architecture.md`、`docs/ui-design.md`、`docs/handoff-ui.md` | 待填写 | 待填写 | design | 待确认 |
