# UI 设计阶段流程参考

本参考吸收 `designer-skills` 的阶段化设计方法，并适配 pm-workflow 的固定阶段门禁。

## 阶段顺序

1. 设计澄清：确认用户是否已经提供足够上下文来理解显性需求和隐藏需求。
2. 设计简报：沉淀目标用户、使用场景、成功标准、审美方向、约束和反向参考。
3. 信息架构：确定导航、页面层级、关键路径、页面边界和 URL/入口策略。
4. 设计系统和 tokens：确认既有设计系统、组件库、字体、色彩、间距、圆角、阴影、动效和断点。
5. 方向 demo：生成 2-3 个可打开的首页方向 demo，并等待用户选择或明确授权。
6. 页面任务卡：把页面拆成可确认的任务、模块准入、状态和流程边界。
7. 原型实现：在用户确认后构建完整高保真原型。
8. 设计审查：用 Playwright 截图和 Impeccable 审查，问题必须引用截图证据。

## 门禁原则

- 每个阶段都要说明本阶段产物、关键决策和未解决问题。
- 不要在一两轮询问后自行宣布“需求已清楚”；需要明确询问用户是否上下文已经足够。
- 能从 PRD、架构、代码和现有设计系统中查到的信息，先查再问。
- 阶段产物未完成或用户未确认时，不进入下一阶段。
- UI 原型实现前必须完成页面任务卡、模块准入表和原型开发前确认。

## pm-workflow 产物映射

| 阶段 | 产物 | 模板 |
|---|---|---|
| 设计简报 | `docs/ui-design-brief.md` | `templates/design-brief.md` |
| 信息架构 | `docs/ui-information-architecture.md` | `templates/information-architecture.md` |
| 设计系统和 tokens | `docs/ui-design-tokens.md` | `templates/design-tokens.md` |
| UI 构建任务 | `docs/ui-build-tasks.md` | `templates/ui-build-tasks.md` |
| 汇总设计文档 | `docs/ui-design.md` | `templates/ui-design.md` |
| UI 交接 | `docs/handoff-ui.md` | `templates/handoff-ui.md` |
| 原型审查 | `docs/prototype-review.md` | `templates/prototype-review.md` |
