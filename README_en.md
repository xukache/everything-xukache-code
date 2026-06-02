<div align="center">

# everything-xukache-code

**Essential Agent Skills Collection for AI-Powered Programming**

A curated set of Agent Skills organized by use case, compatible with Claude Code / Codex / Cursor / Copilot and other AI coding tools.

[![Agent Skills](https://img.shields.io/badge/Agent_Skills-Specification-blue)](https://agentskills.io/specification)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

English | [简体中文](README.md)

</div>

---

## Overview

A curated collection of Agent Skills for AI-assisted programming workflows. Each skill follows the [Agent Skills open specification](https://agentskills.io/specification), supports progressive disclosure, and works with any compatible AI coding tool.

## Directory Structure

```
skills/
├── ai-coding-task-planner/   # Requirement decomposition & prompt optimization
├── projects/                  # Codebase understanding, docs, code review
│   ├── codebase-onboarding/
│   ├── code-documentation/
│   ├── backend-code-review/
│   └── frontend-code-review/
├── pm/                        # Product workflow & skill iteration
│   ├── pm-workflow/
│   └── skill-iteration-retrospective/
└── uiux/                      # UI/UX design knowledge base
    └── ui-ux-pro-max/
```

## Skills Overview

### 🧠 Coding Assistance

| Skill | Description | Usage |
| --- | --- | --- |
| [`ai-coding-task-planner`](skills/ai-coding-task-planner/) | Converts raw programming requirements into atomic AI-executable tasks with high-quality prompts. Decomposes large features first (with dependencies and completion criteria), then optimizes prompts per task. | "Break this requirement into tasks for Cursor"<br>"Optimize this prompt for AI coding" |

### 📂 Project Engineering

| Skill | Description | Usage |
| --- | --- | --- |
| [`codebase-onboarding`](skills/projects/codebase-onboarding/) | Analyzes unfamiliar codebases and generates structured onboarding guides, architecture maps, key entry points, and `AGENTS.md`. | "Help me understand this repo" |
| [`code-documentation`](skills/projects/code-documentation/) | Maintains project documentation including README, API docs, architecture docs, developer guides, and doc-sync checks. | "Update the README" |
| [`backend-code-review`](skills/projects/backend-code-review/) | Backend code review for Python projects. Checks security, performance, architecture layers, SQLAlchemy patterns, etc. | "Review the backend changes" |
| [`frontend-code-review`](skills/projects/frontend-code-review/) | Frontend code review for `.tsx`, `.ts`, `.js` files. Evaluates quality, performance, and business logic. | "Review the frontend changes" |

### 🚀 Product Workflow

| Skill | Description | Usage |
| --- | --- | --- |
| [`pm-workflow`](skills/pm/pm-workflow/) | AI product development studio covering requirement analysis, architecture design, UI prototyping, dev planning, quality review, and delivery. | `pmflow init --ai codex --root ./demo --name "MyApp"` |
| [`skill-iteration-retrospective`](skills/pm/skill-iteration-retrospective/) | Retrospective and iteration for skills based on failure diagnosis. | "This skill isn't working well, help me improve it" |

### 🎨 Design

| Skill | Description | Usage |
| --- | --- | --- |
| [`ui-ux-pro-max`](skills/uiux/ui-ux-pro-max/) | UI/UX design knowledge base with 50+ styles, 161 color palettes, 57 font pairings, 99 UX guidelines, and more. | "Give UI/UX design suggestions for this page" |

## Quick Start

Place the desired skill directory into your agent's skills search path.

```bash
# Example usage
Use skills/ai-coding-task-planner to break this large requirement into small tasks
Use skills/projects/backend-code-review to review current backend changes
Use skills/projects/code-documentation to update README and architecture docs
Use skills/projects/codebase-onboarding to help me understand this repo
```

## Install Skills (AI Execution Instructions)

> This section is for AI coding assistants (Claude Code / Codex / Cursor, etc.) to read and execute. Users only need to tell the AI which skills to install in natural language.

**Repository URL:** `https://github.com/xukache/everything-xukache-code.git`

### Skill Path Mapping

| Skill Name | Path in Repository |
| --- | --- |
| `ai-coding-task-planner` | `skills/ai-coding-task-planner/` |
| `codebase-onboarding` | `skills/projects/codebase-onboarding/` |
| `code-documentation` | `skills/projects/code-documentation/` |
| `backend-code-review` | `skills/projects/backend-code-review/` |
| `frontend-code-review` | `skills/projects/frontend-code-review/` |
| `pm-workflow` | `skills/pm/pm-workflow/` |
| `skill-iteration-retrospective` | `skills/pm/skill-iteration-retrospective/` |
| `ui-ux-pro-max` | `skills/uiux/ui-ux-pro-max/` |

### User Command Examples

```text
Install ai-coding-task-planner skill globally
Install backend-code-review skill to current project
Install all skills globally
Install all skills to current project
```

### AI Execution Logic

When the user requests skill installation, follow these steps:

**1. Clone the repository (if not already local):**

```bash
git clone --depth 1 https://github.com/xukache/everything-xukache-code.git /tmp/everything-xukache-code
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
cp -r /tmp/everything-xukache-code/skills/ai-coding-task-planner ~/.agents/skills/

# Install single skill to current project
cp -r /tmp/everything-xukache-code/skills/ai-coding-task-planner ./.agents/skills/

# Install all skills globally
cp -r /tmp/everything-xukache-code/skills/ai-coding-task-planner ~/.agents/skills/
cp -r /tmp/everything-xukache-code/skills/projects/codebase-onboarding ~/.agents/skills/
cp -r /tmp/everything-xukache-code/skills/projects/code-documentation ~/.agents/skills/
cp -r /tmp/everything-xukache-code/skills/projects/backend-code-review ~/.agents/skills/
cp -r /tmp/everything-xukache-code/skills/projects/frontend-code-review ~/.agents/skills/
cp -r /tmp/everything-xukache-code/skills/pm/pm-workflow ~/.agents/skills/
cp -r /tmp/everything-xukache-code/skills/pm/skill-iteration-retrospective ~/.agents/skills/
cp -r /tmp/everything-xukache-code/skills/uiux/ui-ux-pro-max ~/.agents/skills/
```

**4. Clean up temporary files:**

```bash
rm -rf /tmp/everything-xukache-code
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

## Credits & Sources

Some skills in this repository are sourced from excellent open-source projects:

| Skill | Source | Link |
| --- | --- | --- |
| `backend-code-review` | Dify Project | [langgenius/dify](https://github.com/langgenius/dify) |
| `frontend-code-review` | Dify Project | [langgenius/dify](https://github.com/langgenius/dify) |
| `ui-ux-pro-max` | UI UX Pro Max Skill | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| `codebase-onboarding` | ECC Community | — |
| `ai-coding-task-planner` | Original | — |
| `pm-workflow` | Original | — |
| `code-documentation` | Original | — |
| `skill-iteration-retrospective` | Original | — |

## Related Resources

- [Agent Skills Official Specification](https://agentskills.io/specification)
- [Anthropic Official Skills Repository](https://github.com/anthropics/skills)
- [awesome-agent-skills Community Collection](https://github.com/VoltAgent/awesome-claude-skills)
- [Agent Skills Marketplace](https://skillsmp.com/)

## License

Original content in this repository is licensed under MIT. Third-party skills retain their original licenses.
