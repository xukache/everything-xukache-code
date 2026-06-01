# everything-xukache-code

日常必备的 Codex/Agent skill 集合，按用途存放在 `skills/` 下。

## 目录结构

```text
skills/
  ai-coding-prompt-optimize/  # 编程类 AI 提示词优化 skill
  projects/   # 项目理解、文档维护、代码审查类 skill
  pm/         # PM Workflow 和 skill 迭代流程
  uiux/       # UI/UX 设计知识库
```

## 已有技能

| Skill | 路径 | 简单介绍 | 常见使用方式 |
| --- | --- | --- | --- |
| `ai-coding-prompt-optimize` | `skills/ai-coding-prompt-optimize` | 根据用户的原始编程需求、报错描述、代码修改目标、重构想法或审查请求，优化生成更具体、更有约束、更能指导 AI 编程工具执行的提示词。 | “用编程提示词 Skill 优化：xxx”、“把下面这段需求改成更适合 Claude Code 执行的提示词”。 |
| `codebase-onboarding` | `skills/projects/codebase-onboarding` | 分析陌生代码库，生成结构化入门指南、架构地图、关键入口、项目约定和 `AGENTS.md`。 | “帮我理解这个仓库”、“给这个项目生成 AGENTS.md”。 |
| `code-documentation` | `skills/projects/code-documentation` | 维护项目文档，覆盖 README、API 文档、架构说明、开发者指南、迁移说明、代码注释和文档影响检查。 | “更新 README”、“补充接口文档”、“代码改完后检查文档是否同步”。 |
| `backend-code-review` | `skills/projects/backend-code-review` | 来自 Dify 的后端代码审查 skill，面向 `api/` 下 Python 后端代码，检查安全、性能、架构分层、SQLAlchemy、数据库模型和 repository 抽象等问题。 | “review 这次后端改动”、“检查 `api/...` 这个文件”。 |
| `frontend-code-review` | `skills/projects/frontend-code-review` | 来自 Dify 的前端代码审查 skill，面向 `.tsx`、`.ts`、`.js` 等前端代码，按代码质量、性能和业务逻辑清单输出审查意见。 | “review 这次前端改动”、“检查这个组件有没有问题”。 |
| `pm-workflow` | `skills/pm/pm-workflow` | AI 产品开发工作室和 CLI，覆盖需求澄清、需求分析、架构设计、界面原型、开发规划、质量审核和交付打包。目录内维护 Codex 与 Claude Code 两套结构镜像。 | `pmflow init --ai codex --root ./demo --name "产品名"`，或在生成后的工作室里使用 `init`、`analyze`、`architect`、`design`、`plan`、`review`、`deliver`、`status`。 |
| `skill-iteration-retrospective` | `skills/pm/skill-iteration-retrospective` | 复盘并迭代指定 skill，基于失败样本诊断触发条件、输入结构、判断规则、输出接口和停止条件。 | “这个 skill 不好用，帮我复盘并改进”。 |
| `ui-ux-pro-max` | `skills/uiux/ui-ux-pro-max` | UI/UX 设计知识库，包含风格、配色、字体、UX 指南、图表和技术栈设计建议，并提供搜索脚本。 | “给这个页面做 UI/UX 设计建议”、“查找适合 SaaS 后台的设计风格”。 |

## 使用说明

在 Codex 或其他支持 Agent Skills 的环境中，把需要的 skill 目录放入对应的 skills 搜索路径，或在当前仓库中直接引用 `skills/<分类>/<skill-name>/SKILL.md`。每个 skill 的入口文件都是 `SKILL.md`，其中包含触发场景、工作流程、检查清单和输出格式。

常用调用方式：

```text
请使用 skills/projects/backend-code-review review 当前后端改动
请使用 skills/projects/frontend-code-review 检查 web/app/components/Foo.tsx
请使用 skills/projects/code-documentation 更新 README 和架构说明
请使用 skills/projects/codebase-onboarding 帮我梳理这个仓库
请使用 skills/ai-coding-prompt-optimize 优化下面这段编程需求
```

如果需要安装到 Codex 全局技能目录，可以将对应目录复制到 `$CODEX_HOME/skills/`；安装后重启 Codex 才会被自动发现。

## PM Workflow CLI

`pm-workflow` 已发布为 npm 包：`pm-workflow-studio`。安装后可以用 `pmflow` 一条命令生成 Codex 或 Claude Code 工作室结构。

```bash
npm install -g pm-workflow-studio
pmflow init --ai codex --root ./pm-workflow-demo --name "习惯打卡"
pmflow init --ai claude --root ./pm-workflow-claude-demo --name "习惯打卡"
```

`pmflow` also exposes the alias `pm-workflow`. Package source lives in `skills/pm/pm-workflow/`.

`pmflow init` only requires Node.js. It does not require Python.
