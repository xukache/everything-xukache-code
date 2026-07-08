# 设计主题选择规则

本规则用于 UI 阶段把内置设计主题库变成必读输入，而不是可选灵感。任何设计方向、tokens 或原型实现都必须能追溯到实际读取过的 `DESIGN.md`。

## 必读顺序

1. 先定位主题库：在 Kiro 工作室中，主题库位于 `.kiro/skills/pm-workflow/assets/design-themes/`。
2. 读取主题库 `README.md`，确认本地精选主题和 Open Design 扩展主题。
3. 用 `find <theme-root> -name DESIGN.md -maxdepth 4` 或等价命令列出候选主题文件。
4. 每个推荐方向必须先读取对应主题的 `DESIGN.md`；如果存在 `examples.html`，也要记录预览路径。
5. 在 `docs/ui-design-brief.md`、`docs/ui-design-tokens.md` 和 `docs/ui-design.md` 记录已读取的主题文件路径、采用原因和不采用原因。

## 选择优先级

1. 用户明确指定品牌、截图、参考站点、组件框架或技术栈时，先满足用户约束。
2. B 端网页、后台、运营台、管理系统、SaaS、CRM、ERP、数据看板、审批、配置、权限、表格、筛选、批量操作等场景，默认读取 `vben/DESIGN.md` 只用于提取 Vben 主色和品牌色 token。
3. B 端组件框架、页面骨架、布局模式、表格、筛选、表单、弹窗、状态、导航和交互必须完全按照 Arco Design Pro Vue / Arco Design Vue 一比一引用和复用，不得用 Vben 主题文档自行仿造组件。
4. 如果项目技术架构不是 Vue，仍要按 Arco Design Pro 的信息架构、布局、密度、组件语义和交互模式在当前技术栈中一比一复刻；`vben/DESIGN.md` 仍只提供主色 token，除非用户明确拒绝。
5. 本地精选主题优先于 Open Design 扩展库：`vben` 只作为 B 端主色来源，`revenuecat` 用于 SaaS 产品页和轻量产品界面。
6. Open Design 主题只作为补充方向；使用时必须记录 `assets/design-themes/open-design/<slug>/DESIGN.md` 的来源路径。

## B 端强制规则

- B 端默认推荐方向必须命名为 Arco Design Pro + Vben 主色方向，主题资产写明 `assets/design-themes/vben/DESIGN.md`，并说明“仅提取 Vben 主色”。
- B 端 `docs/ui-design-tokens.md` 必须写明组件框架优先级：`Arco Design Pro Vue / Arco Design Vue`，并声明组件、布局和交互一比一引用 Arco Design Pro，不从 Vben 主题文档仿造。
- 如果不采用 Vben 主色，必须记录用户明确拒绝、技术架构硬性冲突或业务场景不属于 B 端的证据；没有证据时视为 UI 阶段不合格。
- B 端候选 demo 必须体现 Arco Design Pro 的侧边栏、顶栏、表格、筛选、详情、表单、弹窗和状态组件结构；Vben 只能影响主色，不得影响组件框架。

## 禁止事项

- 不得只写“参考主题资产”“使用内置主题库”而不列出具体 `DESIGN.md` 路径。
- 不得在未读取 `DESIGN.md` 的情况下生成候选方向。
- 不得把 Open Design 品牌主题当成官方授权资产。
- 不得在 B 端项目中跳过 Vben 主色，除非文档记录了明确拒绝或冲突原因。
- 不得把 Vben 主题文档当成组件库规范；B 端组件必须按 Arco Design Pro / Arco Design Vue 实际组件体系引用。
