<div align="center">

# everything-xukache-code

**日常 AI 编程必备的 Agent Skills 集合**

将实用的 Agent Skills 按用途组织，适配 Claude Code / Codex / Cursor / Copilot 等 AI 编程工具。

[![Agent Skills](https://img.shields.io/badge/Agent_Skills-Specification-blue)](https://agentskills.io/specification)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[English](README_en.md) | 简体中文

</div>

---

## 项目简介

这是一个精心整理的 Agent Skills 集合仓库，收录了 AI 编程场景下的常用技能包。每个 Skill 遵循 [Agent Skills 开放规范](https://agentskills.io/specification)，支持渐进式加载，可以在任何兼容的 AI 编程工具中使用。

## 目录结构

```
skills/
├── ai-coding-task-planner/   # AI 编程需求拆解与提示词优化
├── projects/                  # 项目理解、文档维护、代码审查
│   ├── codebase-onboarding/
│   ├── code-documentation/
│   ├── backend-code-review/
│   └── frontend-code-review/
├── pm/                        # 产品工作流与 Skill 迭代
│   ├── pm-workflow/
│   └── skill-iteration-retrospective/
└── uiux/                      # UI/UX 设计知识库
    └── ui-ux-pro-max/
```

## 技能一览

### 🧠 编程辅助

| Skill | 介绍 | 使用方式 |
| --- | --- | --- |
| [`ai-coding-task-planner`](skills/ai-coding-task-planner/) | 将原始编程需求处理成 AI 能稳定完成的原子任务和高质量提示词。大需求先拆解（含依赖和完成标准），再逐个优化提示词。采用渐进式加载架构。 | "帮我把这个需求拆给 Cursor 做"<br>"用编程提示词 Skill 优化：xxx" |

### 📂 项目工程

| Skill | 介绍 | 使用方式 |
| --- | --- | --- |
| [`codebase-onboarding`](skills/projects/codebase-onboarding/) | 分析陌生代码库，生成结构化入门指南、架构地图、关键入口、项目约定和 `AGENTS.md`。 | "帮我理解这个仓库" |
| [`code-documentation`](skills/projects/code-documentation/) | 维护项目文档，覆盖 README、API 文档、架构说明、开发者指南、代码注释和文档同步检查。 | "更新 README"、"补充接口文档" |
| [`backend-code-review`](skills/projects/backend-code-review/) | 后端代码审查，面向 Python 后端，检查安全、性能、架构分层、SQLAlchemy 等问题。 | "review 这次后端改动" |
| [`frontend-code-review`](skills/projects/frontend-code-review/) | 前端代码审查，面向 `.tsx`、`.ts`、`.js`，按质量、性能和业务逻辑清单输出意见。 | "review 这次前端改动" |

### 🚀 产品工作流

| Skill | 介绍 | 使用方式 |
| --- | --- | --- |
| [`pm-workflow`](skills/pm/pm-workflow/) | AI 产品开发工作室，覆盖需求分析、架构设计、界面原型、开发规划、质量审核和交付打包。 | `pmflow init --ai codex --root ./demo --name "产品名"` |
| [`skill-iteration-retrospective`](skills/pm/skill-iteration-retrospective/) | 复盘并迭代指定 Skill，基于失败样本诊断触发条件和输出接口。 | "这个 skill 不好用，帮我复盘" |

### 🎨 设计

| Skill | 介绍 | 使用方式 |
| --- | --- | --- |
| [`ui-ux-pro-max`](skills/uiux/ui-ux-pro-max/) | UI/UX 设计知识库，含 50+ 风格、161 配色方案、57 字体搭配、99 条 UX 指南等。 | "给这个页面做 UI/UX 设计建议" |

## 快速使用

在支持 Agent Skills 的环境中，将需要的 Skill 目录放入 skills 搜索路径即可。

```bash
# 常用调用方式
请使用 skills/ai-coding-task-planner 帮我把这个大需求拆成小任务
请使用 skills/projects/backend-code-review review 当前后端改动
请使用 skills/projects/code-documentation 更新 README 和架构说明
请使用 skills/projects/codebase-onboarding 帮我梳理这个仓库
```

安装到全局技能目录：

```bash
# Codex
cp -r skills/<skill-name> $CODEX_HOME/skills/

# Claude Code
cp -r skills/<skill-name> ~/.claude/skills/
```

## PM Workflow CLI

`pm-workflow` 已发布为 npm 包 `pm-workflow-studio`：

```bash
npm install -g pm-workflow-studio
pmflow init --ai codex --root ./pm-workflow-demo --name "习惯打卡"
pmflow init --ai claude --root ./pm-workflow-claude-demo --name "习惯打卡"
```

`pmflow init` 仅需 Node.js，无需 Python。

## 致谢与来源

本仓库中部分 Skill 来自优秀的开源项目，在此致谢：

| Skill | 来源 | 链接 |
| --- | --- | --- |
| `backend-code-review` | Dify 项目 | [langgenius/dify](https://github.com/langgenius/dify) |
| `frontend-code-review` | Dify 项目 | [langgenius/dify](https://github.com/langgenius/dify) |
| `ui-ux-pro-max` | UI UX Pro Max Skill | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| `codebase-onboarding` | ECC 社区 | — |
| `ai-coding-task-planner` | 原创 | — |
| `pm-workflow` | 原创 | — |
| `code-documentation` | 原创 | — |
| `skill-iteration-retrospective` | 原创 | — |

## 相关资源

- [Agent Skills 官方规范](https://agentskills.io/specification)
- [Anthropic 官方 Skills 仓库](https://github.com/anthropics/skills)
- [awesome-agent-skills 社区合集](https://github.com/VoltAgent/awesome-claude-skills)
- [Agent Skills Marketplace](https://skillsmp.com/)

## 许可证

本仓库原创内容采用 MIT 许可证。来自第三方的 Skill 保留其原始许可。
