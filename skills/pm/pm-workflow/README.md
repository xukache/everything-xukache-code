# PM Workflow Studio

AI 产品开发工作室 CLI。把一句产品想法，初始化成 Codex 或 Claude Code 可直接使用的产品工作室目录。

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

CLI 会逐步询问产品名称、项目目录和 AI 工作区结构；选择题可用上下键移动，空格确认。适合不想记参数的日常使用。

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
pmflow init --interactive
pmflow init --ai codex --root ./pm-workflow-demo --name "习惯打卡"
pmflow init --ai claude --root ./pm-workflow-claude-demo --name "习惯打卡"
```

- `--ai auto|codex|claude`：选择生成结构。默认 `auto`；空目录默认 Codex；目录已有 `.claude/` 时选择 Claude Code。
- `--root <dir>`：目标项目目录，默认当前目录。
- `--name <product name>`：产品名称，默认 `My Product`。
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

`pmflow init` 只依赖 Node.js，不依赖 Python。包内维护 `.codex/` 和 `.claude/` 两套结构镜像，审核与打包脚本也使用 Node。

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

## 本地开发

在本仓库调试包：

```bash
cd skills/pm/pm-workflow
npm test
node bin/pmflow.js init --ai codex --root /tmp/pmflow-demo --name "习惯打卡"
```
