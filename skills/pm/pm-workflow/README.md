# PM Workflow Studio

AI 产品开发工作室 CLI。把一句产品想法初始化成 Codex 或 Claude Code 可直接使用的产品工作室目录，也支持把 pm-workflow 安全更新到已有项目。

GitHub 仓库：[xukache/everything-xukache-code / skills/pm/pm-workflow](https://github.com/xukache/everything-xukache-code/tree/main/skills/pm/pm-workflow)

## 安装

```bash
npm install -g pm-workflow-studio
```

安装后会得到两个等价命令：

```bash
pmflow --help
pm-workflow --help
```

## 快速开始

交互式：

```bash
pmflow
```

或：

```bash
pmflow init
```

CLI 会逐步询问产品名称、项目目录、是新建项目还是更新已有项目，以及 AI 工作区结构；选择题可用上下键移动，空格确认。适合不想记参数的日常使用。

已有项目更新：

```bash
cd ./your-existing-project
pmflow update --ai auto --root . --name "已有项目"
```

更新模式会保护用户已有业务产物：`docs/`、`prototype/`、`README.md` 和根目录 `AGENTS.md` 只会在缺失时创建，不会覆盖。框架管理的 `.codex/`、`.claude/`、`.agents/skills/` 文件会刷新到当前包版本；如果已有文件内容不同，会先备份到 `.pmflow/backups/<timestamp>/` 再替换。

Codex：

```bash
pmflow init --ai codex --root ./pm-workflow-demo --name "习惯打卡"
cd ./pm-workflow-demo
codex
```

进入 Codex 后，直接说：

```text
我想做一个习惯打卡小程序
```

Claude Code：

```bash
pmflow init --ai claude --root ./pm-workflow-claude-demo --name "习惯打卡"
cd ./pm-workflow-claude-demo
claude
```

进入 Claude Code 后，直接说产品想法，或运行：

```text
/pm-workflow:init
```

## 命令参数

```bash
pmflow init --ai auto --name "习惯打卡"
pmflow update --ai auto --root . --name "已有项目"
pm-workflow update --ai auto --root . --name "已有项目"
pmflow init --interactive
pmflow init --ai codex --root ./pm-workflow-demo --name "习惯打卡"
pmflow init --ai claude --root ./pm-workflow-claude-demo --name "习惯打卡"
```

- `--ai auto|codex|claude`：选择生成结构。默认 `auto`；空目录默认 Codex；目录已有 `.claude/` 时选择 Claude Code。
- `--root <dir>`：目标项目目录，默认当前目录。
- `--name <product name>`：产品名称，默认 `My Product`。
- `--mode new|update`：选择新建或更新模式；`pmflow update` 等价于 `--mode update`。
- `--new` / `--update`：强制新建或更新模式。
- `--interactive` / `-i`：进入交互式创建向导。
- `--cli` 是 `--ai` 的别名。

当前支持 Codex 和 Claude Code；`kiro` 暂未支持。

## 生成内容

Codex 结构会生成：

```text
.codex/
.agents/skills/pm-workflow/
.agents/skills/impeccable/
docs/
prototype/
outputs/dev-package/
```

Claude Code 结构会生成：

```text
.claude/agents/
.claude/commands/
.claude/skills/pm-workflow/
.claude/skills/impeccable/
docs/
prototype/
outputs/dev-package/
```

`pmflow init` 和 `pmflow update` 只依赖 Node.js，不依赖 Python。包内维护 `.codex/` 和 `.claude/` 两套结构镜像，审核与打包脚本也使用 Node。

## 已有项目更新策略

已有项目推荐运行：

```bash
pmflow update --root . --ai auto --name "你的产品名"
```

更新策略分两类：

- 用户业务产物只补缺不覆盖：`docs/*.md`、`docs/workflow-state.json`、`prototype/`、`outputs/`、`README.md`、根目录 `AGENTS.md`。
- pm-workflow 框架文件可刷新：`.codex/`、`.claude/`、`.agents/skills/pm-workflow/`、角色 skills、内置 Impeccable skill 和角色 agent 配置。

当框架文件需要替换时，旧文件会先复制到 `.pmflow/backups/<timestamp>/`。如果用户曾直接修改项目内的框架 skill 或 agent 文件，更新后可以从备份目录对照迁回自定义内容。

## UI 原型设计能力

内置 `ui-prototype-design` 角色技能，支持从 PRD 和技术架构推进到界面设计文档、高保真 HTML 原型和原型自审报告。

针对 B 端网页、后台、运营台、管理系统和 SaaS 产品，包内提供一份 B 端 UI 设计规范参考，并在 Codex / Claude Code 两套结构中保持镜像一致。UI 阶段不会一次性读取整份规范，而是按阶段渐进引用：

- 识别和边界：判断是否默认应用 B 端规范。
- 风格和配色：先明确品牌调性和产品风格，再定义灰度和色彩 token。
- 画布和密度：默认按 `1440x900` 设计，并检查 `1280x800` 核心路径。
- 信息架构和动线：用格式塔原则和 F 型、古腾堡、Z 型动线组织页面。
- 布局骨架和组件表现：约束导航、表格、筛选、表单、按钮、输入框、弹窗和状态反馈。
- 原型自审：按截图问题反查规范中的禁止事项和验收标准，修正后记录证据。

这样可以让 B 端原型持续遵守文字、间距、控件高度、信息密度、响应式适配和可用性规则，同时避免把大参考文档全部塞进上下文。

## 开发任务规划能力

`plan` 阶段会生成 Kiro 风格的 `docs/dev-tasks.md` 实施计划，用编号 checklist 拆解开发任务。每个任务都必须能直接执行、单独勾选、单独验收，并用 `_需求: ..._` 追溯到 PRD 功能编号或工程准备项。

实施计划会先锁定技术基线，包括语言和框架版本、包管理器、依赖文件形态、脚手架命令、安装命令、启动命令和测试命令。若上游文档没有明确这些信息，计划必须把它们列为阻塞确认项，不能让开发执行者自行默认。例如用户要求 `uv` 时不得改用 `requirements.txt`，Next.js 新项目应优先使用官方脚手架命令创建。

质量审核会检查每个编号任务是否包含 3-6 条具体动作、测试/验收动作和需求追溯；也会拦截过粗任务、缺少技术基线、包管理器混用或绕过脚手架的计划。

## 文档同步硬门禁

每个阶段结束后，必须先完成文档同步检查，再运行 `review <stage>`。下游阶段不能只改自己的产物；如果改动需求、范围、功能编号、接口、数据、技术约束、页面路径、交互流程、状态、验收标准、测试策略或开发执行方式，就要同步检查上游源文档、当前阶段文档和下游交接文档。

阶段产物必须包含 `## 文档同步检查` 表，列固定为：变更项、影响类型、是否影响上游事实、已检查文档、已同步文档、不需要同步原因、责任阶段、检查结论。表格不得留空，不得写 `待补充`，也不得用泛泛的“不适用”绕过同步责任。`review <stage>` 会直接拦截缺失同步检查或明显未同步的阶段。

阶段映射：

- `analyze`：产品定位、范围、平台、MVP、术语影响 `project-config.md`、`prd.md`、`handoff-prd.md`。
- `architect`：接口、数据、权限、部署、技术限制影响 `tech-architecture.md`、`handoff-architecture.md`，必要时回写 PRD。
- `design`：页面、模块、交互、字段、状态、响应式、验收信号影响 PRD、架构和 `handoff-ui.md`。
- `plan`：环境、脚手架、框架版本、模块边界、接口、测试策略或验收标准不一致时，先回写前文，再在 `dev-tasks.md` 记录同步检查。
- `deliver`：最终检查 PRD、架构、UI、开发任务、handoff 和 `AGENTS.md` 的全链路一致性。

## PRD 前需求对齐门禁

`analyze` 阶段不会在需求澄清后直接写 PRD。它会先生成 `docs/requirement-alignment.md`，让产品经理按模块、页面、业务流程逐项和用户确认：

- 模块：目标、角色、高频需求、保留能力、合并/后置/删除能力、边界和模糊点。
- 页面：入口来源、上下文对象、核心任务、主操作、关键字段、本页不做什么和模糊点。
- 业务流程：起点、终点、参与角色、主路径、分支异常、状态变化和验收信号。

只有对齐清单整体状态为 `已确认`，所有 PRD 写作准入项确认，并且用户明确同意可以开始写 PRD 后，才会生成 `docs/prd.md`。

## 技术架构选型门禁

`architect` 阶段不会直接写唯一技术架构定稿。它会先生成 `docs/architecture-options.md`，提供 2-3 个候选技术架构方案给用户参考：

- 每个方案说明前端/客户端、后端/API、数据库/存储、部署方式、适合场景、维护成本、主要风险和推荐等级。
- 使用平台类型、复杂度、数据规模、第三方集成、维护成本五个维度做对比。
- AI 可以给第一推荐，但必须说明为什么不是其他方案。

只有用户确认最终选择，且 `docs/architecture-options.md` 的选型确认状态为 `已确认` 后，才会生成正式 `docs/tech-architecture.md`。

## 本地开发

在本仓库调试包：

```bash
cd skills/pm/pm-workflow
npm test
node bin/pmflow.js init --ai codex --root /tmp/pmflow-demo --name "习惯打卡"
node bin/pmflow.js update --ai codex --root /tmp/pmflow-demo --name "习惯打卡"
```
