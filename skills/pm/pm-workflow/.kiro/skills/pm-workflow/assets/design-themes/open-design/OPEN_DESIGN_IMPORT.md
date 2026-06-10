# Open Design 扩展设计系统导入说明

本目录从 `nexu-io/open-design` 的 `design-systems/` 目录导入，用作 `pm-workflow` 的扩展设计风格库。

## 来源

- 上游仓库：https://github.com/nexu-io/open-design
- 上游目录：https://github.com/nexu-io/open-design/tree/main/design-systems
- 导入 commit：见 `OPEN_DESIGN_COMMIT`
- 上游许可证：见 `OPEN_DESIGN_LICENSE`

## 使用方式

- 每个子目录是一个可读取的设计系统。
- 每个主题的主文件是 `DESIGN.md`。
- 当用户指定品牌、参考站点、截图或明确风格名时，可以从本目录查找匹配主题。
- 使用时在 `notes/requirements.md` 的“原型设计输入”中记录完整源文件路径。

## 使用边界

- 本地精选主题 `vben/DESIGN.md` 和 `revenuecat/DESIGN.md` 仍是默认优先推荐主题，但必须经过用户确认后才能用于原型。
- Open Design 主题用于补充更丰富的品牌灵感和视觉方向。
- 品牌类主题只作为 aesthetic inspiration，不代表官方品牌资产或授权。
- 不要把 Open Design 的主题选择逻辑写回单个主题文件；选择逻辑只维护在 `references/design-theme-selection.md`。

## 更新方式

如需同步上游新版，重新从上游 `design-systems/` 导入，并更新 `OPEN_DESIGN_COMMIT` 与许可证文件。
