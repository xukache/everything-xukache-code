<div align="center">

# everything-xukache-skills

**日常 AI 编程必备的 Agent Skills 集合**

将实用的 Agent Skills 按用途组织，适配 Claude Code / Codex / Cursor / Copilot 等 AI 编程工具。

![Agent Skills](https://img.shields.io/badge/Agent_Skills-Specification-blue) ![License](https://img.shields.io/badge/License-MIT-green.svg) ![GitHub stars](https://img.shields.io/github/stars/xukache/everything-xukache-skills?logo=github)

[English](README_en.md) | 简体中文

</div>

---

## 项目简介

这是一个精心整理的 Agent Skills 集合仓库，收录了 AI 编程场景下的常用技能包。每个 Skill 遵循 [Agent Skills 开放规范](https://agentskills.io/specification)，支持渐进式加载，可以在任何兼容的 AI 编程工具中使用。

## 目录结构

```
skills/
├── ai-coding-task-planner/        # AI 编程需求拆解与提示词优化
├── prompt-engineering-loop/        # 通用提示词优化与评测闭环
├── resume-optimizer/               # 简历优化与面试表达
├── code-documentation/             # 项目文档维护
├── project-standards-bootstrap/     # 项目启动规范与架构文档模板
├── pm-workflow/                    # 产品工作流 Studio
├── skill-iteration-retrospective/  # Skill 迭代复盘
├── wechat-article-workflow/        # 公众号文章生产
├── wechat-benchmark-distiller/     # 公众号对标蒸馏
├── wechat-axu-styler/              # 公众号 HTML 排版
└── axu-article-illustrations/      # 阿栩风格文章配图
```

## 技能一览


| Skill                                                                    | 介绍                                                                   | 使用方式                                                |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------- | --------------------------------------------------- |
| [`ai-coding-task-planner`](skills/ai-coding-task-planner/)               | 将原始编程需求处理成 AI 能稳定完成的原子任务和高质量提示词。大需求先拆解（含依赖和完成标准），再逐个优化提示词。采用渐进式加载架构。 | "帮我把这个需求拆给 Cursor 做"<br>"用编程提示词 Skill 优化：xxx"       |
| [`prompt-engineering-loop`](skills/prompt-engineering-loop/)             | 将用户意图或待优化提示词转成上下文充足、结构清晰、可评测迭代的标准提示词交付包，并提供失败分类、定位方法和评测闭环。           | "帮我优化这个提示词并给评测方法"<br>"把这个意图变成标准 prompt"             |
| [`code-documentation`](skills/code-documentation/)                       | 维护项目文档，覆盖 README、API 文档、架构说明、开发者指南、代码注释和文档同步检查。                      | "更新 README"、"补充接口文档"                                |
| [`project-standards-bootstrap`](skills/project-standards-bootstrap/)     | 为 AI 辅助开发项目生成或重组标准化启动文档，覆盖 AGENTS、DEV_SPEC、技术架构总纲、API 契约、前后端开发规范、版本治理和架构演进监控规则。 | "为这个项目生成标准规范文档"<br>"判断是否启用 DEV_SPEC 并整理架构与 API 契约" |
| [`resume-optimizer`](skills/resume-optimizer/)                           | 简历优化与面试表达辅导，覆盖材料梳理、JD 匹配、经历证据挖掘、简历改写、审查修复和面试追问准备。                    | "帮我优化简历"<br>"针对这个 JD 定制简历"                          |
| [`pm-workflow`](skills/pm-workflow/)                                     | AI 产品开发工作室，覆盖需求分析、架构设计、界面原型、开发规划、质量审核和交付打包。                          | `pmflow init --ai codex --root ./demo --name "产品名"` |
| [`skill-iteration-retrospective`](skills/skill-iteration-retrospective/) | 复盘并迭代指定 Skill，基于失败样本诊断触发条件和输出接口。                                     | "这个 skill 不好用，帮我复盘"                                 |
| [`wechat-article-workflow`](skills/wechat-article-workflow/)             | 辅助 Xukai/Axu 公众号文章生产，覆盖素材梳理、大纲、初稿、标题、配图计划、最终目录和交接文档。                 | "帮我规划这篇公众号文章"                                       |
| [`wechat-benchmark-distiller`](skills/wechat-benchmark-distiller/)       | 从一个或多个微信公众号对标样本中蒸馏结构、语言、标题和读者关系，沉淀成可复用写作规则。                          | "帮我分析这些对标文章"                                        |
| [`wechat-axu-styler`](skills/wechat-axu-styler/)                         | 将中文 Markdown 文章转换成 Xukache/阿栩品牌微信公众号 HTML，并支持本地编辑预览。                 | "把这篇 Markdown 转成公众号排版"                              |
| [`axu-article-illustrations`](skills/axu-article-illustrations/)         | 生成阿栩风格公众号正文解释图、配图 shot list 和内置 900x383 封面模板。                        | "用阿栩风格帮这篇文章规划配图"                                    |


## 外部推荐 Skills

以下 Skill 不在本仓库内维护，只作为外部仓库推荐。请以原仓库最新版本为准。


| Skill                  | 说明                                                     | 外部仓库                                                                                            |
| ---------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `web-access`           | 为 AI Agent 提供联网、搜索、网页抓取、登录态浏览器 CDP 操作和站点经验积累能力。        | [eze-is/web-access](https://github.com/eze-is/web-access)                                       |
| `human-writing`        | 活人感写作，通用中文创作与改稿 Skill，先检查材料是否足够，再处理现实与虚构分流、文章推进、中文节奏和常见模型腔。 | [KKKKhazix/human-writing](https://github.com/KKKKhazix/human-writing)                           |
| `comprehensive-thinking` | 面向 AI Agent 的复杂问题推理与判断 Skill，强调问题定义、前提审计、关键事实、反方压力测试和可验证结论。 | [syzkillall/comprehensive-thinking-skill](https://github.com/syzkillall/comprehensive-thinking-skill/tree/main) |
| `ui-ux-pro-max`        | UI/UX 设计知识库，包含风格、配色、字体、UX 指南和多技术栈设计建议。                 | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| `web-design-engineer`  | 提升 AI 生成网页的视觉设计质量，覆盖设计系统宣告、反俗套规则、oklch 配色、字体组合、风格配方、动效和按需浏览器验收。 | [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills/tree/main/skills/web-design-engineer) |
| `backend-code-review`  | Dify 项目中的后端代码审查规则，覆盖安全、性能、架构分层、SQLAlchemy 等检查项。        | [langgenius/dify](https://github.com/langgenius/dify)                                           |
| `frontend-code-review` | Dify 项目中的前端代码审查规则，覆盖 `.tsx`、`.ts`、`.js` 的质量、性能和业务逻辑检查。 | [langgenius/dify](https://github.com/langgenius/dify)                                           |


## 快速使用

在支持 Agent Skills 的环境中，将需要的 Skill 目录放入 skills 搜索路径即可。

```bash
# 常用调用方式
请使用 skills/ai-coding-task-planner 帮我把这个大需求拆成小任务
请使用 skills/code-documentation 更新 README 和架构说明
请使用 skills/wechat-article-workflow 帮我规划公众号文章
```

## 安装技能（AI 执行指令）

> 本章节供 AI 编程助手（Claude Code / Codex / Cursor 等）读取并执行。用户只需用自然语言告诉 AI 安装哪些技能即可。

**仓库地址：** `https://github.com/xukache/everything-xukache-skills.git`

### 技能路径映射


| 技能名                             | 仓库内路径                                   |
| ------------------------------- | --------------------------------------- |
| `ai-coding-task-planner`        | `skills/ai-coding-task-planner/`        |
| `prompt-engineering-loop`       | `skills/prompt-engineering-loop/`       |
| `resume-optimizer`              | `skills/resume-optimizer/`              |
| `code-documentation`            | `skills/code-documentation/`            |
| `project-standards-bootstrap`   | `skills/project-standards-bootstrap/`   |
| `pm-workflow`                   | `skills/pm-workflow/`                   |
| `skill-iteration-retrospective` | `skills/skill-iteration-retrospective/` |
| `wechat-article-workflow`       | `skills/wechat-article-workflow/`       |
| `wechat-benchmark-distiller`    | `skills/wechat-benchmark-distiller/`    |
| `wechat-axu-styler`             | `skills/wechat-axu-styler/`             |
| `axu-article-illustrations`     | `skills/axu-article-illustrations/`     |


### 用户指令示例

```text
帮我安装 ai-coding-task-planner 技能到全局
帮我安装 wechat-article-workflow 技能到当前项目下
帮我安装所有技能到全局
帮我安装所有技能到当前项目下
```

### AI 执行逻辑

当用户要求安装技能时，按以下步骤执行：

**1. 克隆或拉取仓库（如本地不存在）：**

```bash
# 克隆到临时目录
git clone --depth 1 https://github.com/xukache/everything-xukache-skills.git /tmp/everything-xukache-skills
```

**2. 根据安装范围确定目标目录：**


| 范围              | 目标路径                                      |
| --------------- | ----------------------------------------- |
| 全局（Claude Code） | `~/.claude/skills/`                       |
| 全局（Codex）       | `~/.codex/skills/`                        |
| 全局（通用）          | `~/.agents/skills/`                       |
| 当前项目            | `./.agents/skills/` 或 `./.claude/skills/` |


**3. 复制技能：**

```bash
# 安装单个技能（示例：ai-coding-task-planner 到全局）
cp -r /tmp/everything-xukache-skills/skills/ai-coding-task-planner ~/.agents/skills/

# 安装单个技能到当前项目
cp -r /tmp/everything-xukache-skills/skills/ai-coding-task-planner ./.agents/skills/

# 安装所有技能到全局
cp -r /tmp/everything-xukache-skills/skills/ai-coding-task-planner ~/.agents/skills/
cp -r /tmp/everything-xukache-skills/skills/prompt-engineering-loop ~/.agents/skills/
cp -r /tmp/everything-xukache-skills/skills/resume-optimizer ~/.agents/skills/
cp -r /tmp/everything-xukache-skills/skills/code-documentation ~/.agents/skills/
cp -r /tmp/everything-xukache-skills/skills/project-standards-bootstrap ~/.agents/skills/
cp -r /tmp/everything-xukache-skills/skills/pm-workflow ~/.agents/skills/
cp -r /tmp/everything-xukache-skills/skills/skill-iteration-retrospective ~/.agents/skills/
cp -r /tmp/everything-xukache-skills/skills/wechat-article-workflow ~/.agents/skills/
cp -r /tmp/everything-xukache-skills/skills/wechat-benchmark-distiller ~/.agents/skills/
cp -r /tmp/everything-xukache-skills/skills/wechat-axu-styler ~/.agents/skills/
cp -r /tmp/everything-xukache-skills/skills/axu-article-illustrations ~/.agents/skills/
```

**4. 清理临时文件：**

```bash
rm -rf /tmp/everything-xukache-skills
```

**5. 安装完成后告知用户：**

- 已安装的技能名称和数量
- 安装位置
- 如何使用（直接在对话中引用技能名即可）

## PM Workflow CLI

`pm-workflow` 已发布为 npm 包 `pm-workflow-studio`：

```bash
npm install -g pm-workflow-studio
pmflow init --ai codex --root ./pm-workflow-demo --name "习惯打卡"
pmflow init --ai claude --root ./pm-workflow-claude-demo --name "习惯打卡"
```

`pmflow init` 仅需 Node.js，无需 Python。

## 本仓库维护的 Skills


| Skill                           | 来源  | 链接  |
| ------------------------------- | --- | --- |
| `ai-coding-task-planner`        | 原创  | —   |
| `prompt-engineering-loop`       | 原创  | —   |
| `resume-optimizer`              | 原创  | —   |
| `pm-workflow`                   | 原创  | —   |
| `code-documentation`            | 原创  | —   |
| `project-standards-bootstrap`   | 原创  | —   |
| `skill-iteration-retrospective` | 原创  | —   |
| `wechat-article-workflow`       | 原创  | —   |
| `wechat-benchmark-distiller`    | 原创  | —   |
| `wechat-axu-styler`             | 原创  | —   |
| `axu-article-illustrations`     | 原创  | —   |


## 相关资源

- [Agent Skills 官方规范](https://agentskills.io/specification)
- [Anthropic 官方 Skills 仓库](https://github.com/anthropics/skills)
- [awesome-agent-skills 社区合集](https://github.com/VoltAgent/awesome-claude-skills)
- [Agent Skills Marketplace](https://skillsmp.com/)
- [AI 编程实战三卷书](https://book.aibuzhiyu.com/)

## 许可证

本仓库原创内容采用 MIT 许可证。来自第三方的 Skill 保留其原始许可。
