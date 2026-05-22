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
pmflow init --ai codex --root ./pm-workflow-demo --name "习惯打卡"
pmflow init --ai claude --root ./pm-workflow-claude-demo --name "习惯打卡"
```

- `--ai auto|codex|claude`：选择生成结构。默认 `auto`；空目录默认 Codex；目录已有 `.claude/` 时选择 Claude Code。
- `--root <dir>`：目标项目目录，默认当前目录。
- `--name <product name>`：产品名称，默认 `My Product`。
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

## 本地开发

在本仓库调试包：

```bash
cd skills/pm/pm-workflow
npm test
node bin/pmflow.js init --ai codex --root /tmp/pmflow-demo --name "习惯打卡"
```
