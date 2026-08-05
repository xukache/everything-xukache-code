<div align="center">

# everything-xukache-skills

**Essential Agent Skills Collection for AI-Powered Programming**

A curated set of Agent Skills organized by use case, compatible with Claude Code / Codex / Cursor / Copilot and other AI coding tools.

[![Agent Skills](https://img.shields.io/badge/Agent_Skills-Specification-blue)](https://agentskills.io/specification)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/xukache/everything-xukache-skills?logo=github)](https://github.com/xukache/everything-xukache-skills/stargazers)

English | [简体中文](README.md)

</div>

---

## Overview

A curated collection of Agent Skills for AI-assisted programming workflows. Each skill follows the [Agent Skills open specification](https://agentskills.io/specification), supports progressive disclosure, and works with any compatible AI coding tool.

## Directory Structure

```
skills/
├── ai-coding-task-planner/        # Requirement decomposition & prompt optimization
├── prompt-engineering-loop/        # General prompt optimization & evaluation loop
├── resume-optimizer/               # Resume optimization & interview preparation
├── code-documentation/             # Project documentation maintenance
├── project-standards-bootstrap/     # Project standards and architecture templates
├── pm-workflow/                    # Product workflow studio
├── skill-iteration-retrospective/  # Skill iteration retrospective
├── wechat-article-workflow/        # WeChat article production
├── wechat-benchmark-distiller/     # WeChat benchmark distillation
├── wechat-axu-styler/              # WeChat HTML styling
└── axu-article-illustrations/      # Axu-style article illustrations
```

## Skills Overview

| Skill | Description | Usage |
| --- | --- | --- |
| [`ai-coding-task-planner`](skills/ai-coding-task-planner/) | Converts raw programming requirements into atomic AI-executable tasks with high-quality prompts. Decomposes large features first (with dependencies and completion criteria), then optimizes prompts per task. | "Break this requirement into tasks for Cursor"<br>"Optimize this prompt for AI coding" |
| [`prompt-engineering-loop`](skills/prompt-engineering-loop/) | Turns user intent or rough prompts into context-rich, structured, testable prompt deliverables with failure diagnosis and evaluation-loop guidance. | "Optimize this prompt and give me an eval plan"<br>"Turn this intent into a standard prompt" |
| [`code-documentation`](skills/code-documentation/) | Maintains project documentation including README, API docs, architecture docs, developer guides, and doc-sync checks. | "Update the README" |
| [`project-standards-bootstrap`](skills/project-standards-bootstrap/) | Generates or reorganizes standardized startup docs for AI-assisted projects, covering AGENTS, DEV_SPEC, architecture docs, API contracts, frontend/backend conventions, version governance, and architecture evolution rules. | "Generate standard project docs"<br>"Choose DEV_SPEC mode and organize architecture/API contracts" |
| [`resume-optimizer`](skills/resume-optimizer/) | Optimizes resumes and prepares interview narratives, covering material intake, JD matching, evidence mining, resume rewriting, review, repair, and interview follow-ups. | "Optimize my resume"<br>"Tailor my resume for this JD" |
| [`pm-workflow`](skills/pm-workflow/) | AI product development studio covering requirement analysis, architecture design, UI prototyping, dev planning, quality review, and delivery. | `pmflow init --ai codex --root ./demo --name "MyApp"` |
| [`skill-iteration-retrospective`](skills/skill-iteration-retrospective/) | Retrospective and iteration for skills based on failure diagnosis. | "This skill isn't working well, help me improve it" |
| [`wechat-article-workflow`](skills/wechat-article-workflow/) | Assists Xukai/Axu WeChat article production, including material mapping, outlines, drafts, titles, visual plans, final article folders, and handoff docs. | "Help me plan this WeChat article" |
| [`wechat-benchmark-distiller`](skills/wechat-benchmark-distiller/) | Distills writing methods from one or more WeChat benchmark articles, including structure, language, titles, and reader relationships. | "Analyze these benchmark articles" |
| [`wechat-axu-styler`](skills/wechat-axu-styler/) | Converts Chinese Markdown articles into Xukache/Axu branded WeChat HTML with local editing preview support. | "Convert this Markdown article into WeChat styling" |
| [`axu-article-illustrations`](skills/axu-article-illustrations/) | Generates Axu-style WeChat article explanation visuals, illustration shot lists, and built-in 900x383 cover templates. | "Plan Axu-style visuals for this article" |

## External Skill Recommendations

The following skills are not maintained in this repository. Use the upstream repositories for the latest versions.

| Skill | Description | External Repository |
| --- | --- | --- |
| `web-access` | Adds web access for AI agents, including search, page fetching, browser CDP operations with login state, and site-pattern memory. | [eze-is/web-access](https://github.com/eze-is/web-access) |
| `human-writing` | Human-like Chinese writing and revision skill that checks material sufficiency, separates nonfiction and fiction workflows, and improves progression, natural Chinese rhythm, and common model-like phrasing. | [KKKKhazix/human-writing](https://github.com/KKKKhazix/human-writing) |
| `ui-ux-pro-max` | UI/UX design knowledge base with style, color, typography, UX, and technology-stack recommendations. | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| `web-design-engineer` | Improves the visual quality of AI-generated web artifacts through design-system declaration, anti-cliché rules, oklch color guidance, font pairings, style recipes, motion, and opt-in browser acceptance. | [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills/tree/main/skills/web-design-engineer) |
| `backend-code-review` | Backend code review rules from Dify, covering security, performance, architecture layering, SQLAlchemy, and related checks. | [langgenius/dify](https://github.com/langgenius/dify) |
| `frontend-code-review` | Frontend code review rules from Dify for `.tsx`, `.ts`, and `.js` quality, performance, and business logic checks. | [langgenius/dify](https://github.com/langgenius/dify) |

## Quick Start

Place the desired skill directory into your agent's skills search path.

```bash
# Example usage
Use skills/ai-coding-task-planner to break this large requirement into small tasks
Use skills/code-documentation to update README and architecture docs
Use skills/wechat-article-workflow to plan a WeChat article
```

## Install Skills (AI Execution Instructions)

> This section is for AI coding assistants (Claude Code / Codex / Cursor, etc.) to read and execute. Users only need to tell the AI which skills to install in natural language.

**Repository URL:** `https://github.com/xukache/everything-xukache-skills.git`

### Skill Path Mapping

| Skill Name | Path in Repository |
| --- | --- |
| `ai-coding-task-planner` | `skills/ai-coding-task-planner/` |
| `prompt-engineering-loop` | `skills/prompt-engineering-loop/` |
| `resume-optimizer` | `skills/resume-optimizer/` |
| `code-documentation` | `skills/code-documentation/` |
| `project-standards-bootstrap` | `skills/project-standards-bootstrap/` |
| `pm-workflow` | `skills/pm-workflow/` |
| `skill-iteration-retrospective` | `skills/skill-iteration-retrospective/` |
| `wechat-article-workflow` | `skills/wechat-article-workflow/` |
| `wechat-benchmark-distiller` | `skills/wechat-benchmark-distiller/` |
| `wechat-axu-styler` | `skills/wechat-axu-styler/` |
| `axu-article-illustrations` | `skills/axu-article-illustrations/` |

### User Command Examples

```text
Install ai-coding-task-planner skill globally
Install wechat-article-workflow skill to current project
Install all skills globally
Install all skills to current project
```

### AI Execution Logic

When the user requests skill installation, follow these steps:

**1. Clone the repository (if not already local):**

```bash
git clone --depth 1 https://github.com/xukache/everything-xukache-skills.git /tmp/everything-xukache-skills
```

**2. Determine target directory based on scope:**

| Scope | Target Path |
| --- | --- |
| Global (Claude Code) | `~/.claude/skills/` |
| Global (Codex) | `~/.agents/skills/` |
| Global (Generic) | `~/.agents/skills/` |
| Current Project | `./.agents/skills/` or `./.claude/skills/` |

**3. Copy skills:**

```bash
# Install single skill (example: ai-coding-task-planner globally)
cp -r /tmp/everything-xukache-skills/skills/ai-coding-task-planner ~/.agents/skills/

# Install single skill to current project
cp -r /tmp/everything-xukache-skills/skills/ai-coding-task-planner ./.agents/skills/

# Install all skills globally
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

**4. Clean up temporary files:**

```bash
rm -rf /tmp/everything-xukache-skills
```

**5. After installation, inform the user:**
- Names and count of installed skills
- Installation location
- How to use (reference skill name directly in conversation)

## PM Workflow CLI

`pm-workflow` is published as npm package `pm-workflow-studio`:

```bash
npm install -g pm-workflow-studio
pmflow init --ai codex --root ./pm-workflow-demo --name "HabitTracker"
pmflow init --ai claude --root ./pm-workflow-claude-demo --name "HabitTracker"
```

`pmflow init` only requires Node.js. Python is not needed.

## Skills Maintained Here

| Skill | Source | Link |
| --- | --- | --- |
| `ai-coding-task-planner` | Original | — |
| `prompt-engineering-loop` | Original | — |
| `resume-optimizer` | Original | — |
| `pm-workflow` | Original | — |
| `code-documentation` | Original | — |
| `project-standards-bootstrap` | Original | — |
| `skill-iteration-retrospective` | Original | — |
| `wechat-article-workflow` | Original | — |
| `wechat-benchmark-distiller` | Original | — |
| `wechat-axu-styler` | Original | — |
| `axu-article-illustrations` | Original | — |

## Related Resources

- [Agent Skills Official Specification](https://agentskills.io/specification)
- [Anthropic Official Skills Repository](https://github.com/anthropics/skills)
- [awesome-agent-skills Community Collection](https://github.com/VoltAgent/awesome-claude-skills)
- [Agent Skills Marketplace](https://skillsmp.com/)
- [AI 编程实战三卷书 online book](https://book.aibuzhiyu.com/)

## License

Original content in this repository is licensed under MIT. Third-party skills retain their original licenses.
