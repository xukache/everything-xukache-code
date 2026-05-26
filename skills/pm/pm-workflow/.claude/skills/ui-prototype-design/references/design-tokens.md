# 设计系统和 Tokens 参考

tokens 阶段用于把审美方向转换成可实现、可复用、可验收的设计参数。

## 必须先查

- CSS 变量、主题文件、Tailwind 配置、组件库主题。
- `package.json` 中的 UI 框架、图标库、动效库和字体方案。
- 现有组件目录、Storybook、样式规范和设计 token 文件。
- 按 `references/design-theme-selection.md` 读取实际主题 `DESIGN.md`，并把主题路径写入 `docs/ui-design-tokens.md`。
- B 端项目必须按阶段读取 `b-end-ui-design-spec.md` 的相关章节。
- B 端项目必须从 `assets/design-themes/vben/DESIGN.md` 提取 Vben 主色，并写明 Arco Design Pro Vue / Arco Design Vue 组件、布局和交互的一比一引用策略；不得从 Vben 主题文档仿造组件。
- B 端项目必须读取 `vben/DESIGN.md` 的第十四章“项目定制项”和第十五章“组件级 Design Token”，把 Vben 主色覆盖为 Arco 主色 token，并逐组件锁定字体、字号、颜色、控件大小、间距、圆角和阴影。

## 决策范围

- 颜色：背景、文本、边框、主操作、状态色、图表色、暗色模式。
- 字体：字族、字号阶梯、字重、行高、字间距。
- 间距：基础单位、页面边距、栅格、控件间距、列表密度。
- 形状：圆角、边框、阴影、分割线。
- 动效：时长、缓动、进入/退出、状态反馈、减少动效。
- 断点：移动、平板、桌面、宽屏的布局变化。

## 输出要求

- 优先复用和扩展现有 tokens，不替换已有系统。
- 只在 `docs/ui-design-tokens.md` 中记录本项目采用的 token 决策；不要复制整份官方规范。
- 主色来源必须可追溯到具体 `DESIGN.md`，组件框架来源必须明确写为 Arco Design Pro Vue / Arco Design Vue，不能只写“参考主题资产”。
- 后续原型必须使用这些 token 决策，避免一次性硬编码。
- 必须产出组件级 token 应用表，至少覆盖 Button、Input、Select、Table、Form、Modal、Drawer、Card、Tag、Tabs、Progress、Tooltip、Dropdown、Skeleton、Spin、Empty；每行写清 Arco token、项目覆盖值、使用场景和禁止偏离项。
- Progress 必须明确：完成进度固定使用项目主色 `--primary-6/#4F63D7`，轨道使用 `var(--color-fill-3)`，不得按进度百分比变化为绿/橙/红；只有明确的成功/失败/警告状态组件才能使用语义色。
- 原型和开发实现不得写页面级临时颜色、临时圆角、临时阴影或临时控件高度；新增样式前必须先检查组件级 token 应用表是否已有对应 token。
