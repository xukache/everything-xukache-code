# 设计主题库

这个目录存放 `pm-workflow` 可复用的设计主题。主题文件只描述视觉语言、tokens、组件、布局和提示词，不承担主题选择逻辑。

主题选择规则统一维护在 `../../references/design-theme-selection.md`。新增主题时，文件名使用具体风格名，例如 `linear.md`、`vercel.md`、`stripe.md`。

## 可用主题

| 主题 | 文件 | 视觉关键词 |
| --- | --- | --- |
| Vben | [vben.md](vben.md) | 应用工作台、浅色/深色、侧边栏、顶栏、表格、筛选、抽屉、语义状态 |
| RevenueCat | [revenuecat.md](revenuecat.md) | 白底精密、深紫文本、单一强调色、方正信息容器、全圆角主按钮、克制阴影 |

## Open Design 扩展库

[open-design/](open-design/) 收录了从 `nexu-io/open-design` 引入的设计系统库，每个子目录包含一个 `DESIGN.md`。这些主题用于补充品牌风格、视觉方向和更丰富的参考，不替代上表中的本地精选主题。

使用顺序：

1. 先按 `../../references/design-theme-selection.md` 判断是否命中本地精选主题。
2. 如果用户指定品牌、参考站点、截图或风格名，再查找 `open-design/<slug>/DESIGN.md`。
3. 如果使用 Open Design 主题，必须在 `notes/requirements.md` 里记录源文件，例如 `assets/design-themes/open-design/linear-app/DESIGN.md`。
4. 品牌类主题只作为 aesthetic inspiration，不代表官方品牌资产或授权。

导入来源和许可证见 [open-design/OPEN_DESIGN_IMPORT.md](open-design/OPEN_DESIGN_IMPORT.md)。
