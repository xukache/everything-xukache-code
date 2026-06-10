# help 命令

当用户输入 `$pm-workflow help`、没有提供参数,或询问"有哪些命令"时,使用本命令。

## 响应要求

由主 agent 派发 `product-manager` subagent 展示菜单并引导用户选择阶段,或用户用 `/product-manager` slash 命令显式触发。

按阶段展示命令菜单(2.0 阶段顺序:`init → blueprint → design → analyze → architect → plan → deliver`):

| 命令 | 自然语言说法 | 产物 |
|---|---|---|
| `init` | 我想做一个... / 澄清需求 | `docs/project-config.md` |
| `blueprint` | 做设计底稿 / 梳理流程 / 五层确认 | `docs/feature-flow-layout.md` |
| `design` | 开始界面原型设计 | `docs/ui-design-brief.md`, `docs/ui-design-tokens.md`, `docs/ui-build-tasks.md`, `docs/ui-design.md`, `docs/handoff-ui.md`, `prototype/` |
| `analyze` | 开始分析需求 / 写 PRD(后置) | `docs/prd.md`, `docs/handoff-prd.md` |
| `architect` | 开始设计技术架构 | `docs/architecture-options.md`, `docs/tech-architecture.md`, `docs/handoff-architecture.md` |
| `plan` | 开始规划 | `docs/dev-tasks.md` |
| `review [stage]` | 审核一下 | `docs/review-{stage}.md` |
| `deliver` | 开始打包 | `outputs/dev-package/` |
| `status` | 当前进度 | 阶段进度摘要 |

最后询问用户想执行哪个阶段。
