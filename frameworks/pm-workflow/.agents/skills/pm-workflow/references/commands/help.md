# help 命令

当用户输入 `$pm-workflow help`、没有提供参数，或询问"有哪些命令"时，使用本命令。

## 响应要求

必须委派 `.codex/agents/product-manager.toml` 中的 `product_manager` 子 agent 展示菜单并引导用户选择阶段。

如果当前 Codex 环境无法启动子 agent，必须先向用户说明“本次无法委派 product_manager，将由当前会话按产品经理角色执行”，然后再展示菜单。不要静默降级。

按阶段展示命令菜单：

| 命令 | 自然语言说法 | 产物 |
|---|---|---|
| `init` | 我想做一个... | `docs/project-config.md` |
| `analyze` | 开始分析需求 | `docs/prd.md`, `docs/handoff-prd.md` |
| `architect` | 开始设计技术架构 | `docs/tech-architecture.md`, `docs/handoff-architecture.md` |
| `design` | 开始界面原型设计 | `docs/ui-design.md`, `docs/handoff-ui.md`, `prototype/` |
| `plan` | 开始规划 | `docs/dev-tasks.md` |
| `review [stage]` | 审核一下 | `docs/review-{stage}.md` |
| `deliver` | 开始打包 | `outputs/dev-package/` |
| `status` | 当前进度 | 阶段进度摘要 |

最后询问用户想执行哪个阶段。
