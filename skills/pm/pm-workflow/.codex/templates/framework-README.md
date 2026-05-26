# {{PRODUCT_NAME}} 工作室说明

这是一个可直接进入并运行的产品开发工作室目录。它可以按 Codex 或 Claude Code 结构安装；`pmflow init` 会根据 `--ai auto|codex|claude` 选择对应目录。

## 目录说明

```text
AGENTS.md
.codex/
  config.toml
  agents/
.agents/
  context/
  skills/
.claude/
  CLAUDE.md
  agents/
  commands/
  skills/
docs/
prototype/
  directions/
  review/screenshots/
outputs/dev-package/
```

- Codex 使用 `AGENTS.md`、`.codex/agents/`、`.agents/skills/pm-workflow/`、`.agents/skills/<role>/`、`.agents/skills/impeccable/` 和 `.agents/context/`。
- Claude Code 使用 `.claude/CLAUDE.md`、`.claude/agents/`、`.claude/commands/pm-workflow/`、`.claude/skills/pm-workflow/`、`.claude/skills/<role>/` 和 `.claude/skills/impeccable/`。
- `docs/`：阶段文档产出区。
- `prototype/`：高保真 HTML 原型区；`directions/` 存放候选方向首页 demo，`review/screenshots/` 存放自审截图。
- `outputs/dev-package/`：最终开发交付包。

## 开始使用

1. 在本目录启动开发会话。
2. 直接输入你的产品想法，例如：`我想做一个每天记录习惯的 App`，或先说 `澄清需求`。
3. 产品经理会先用普通聊天方式帮你澄清真实需求，每轮最多问 3 个问题，重点判断解决什么问题、哪一段最值得先做、需要什么 Agent 能力、结果落到哪里，以及如何收束成最小可用 demo；等你确认理解无误后，再进入需求、架构、界面、任务规划、审核和打包。

常用自然语言：

- `澄清需求`
- `开始分析需求`
- `开始设计技术架构`
- `开始界面原型设计`
- `开始规划`
- `审核一下`
- `开始打包`
- `当前进度`

## 脚本

```bash
node .agents/skills/pm-workflow/scripts/review_stage.js --root . --stage analyze
node .agents/skills/pm-workflow/scripts/package_delivery.js --root .
node .claude/skills/pm-workflow/scripts/review_stage.js --root . --stage analyze
node .claude/skills/pm-workflow/scripts/package_delivery.js --root .
```

## 流程规则

- 下游文档如果改变需求、平台、范围、功能编号、技术约束、页面路径或验收标准，必须同步回写上游源文档，并在 `docs/workflow-state.json` 的 `notes` 记录。
- 需求分析必须基于高频真实需求和真实使用流程识别真需求与伪需求，合并同类能力，避免功能清单堆叠。
- 写 PRD 前必须完成 `docs/requirement-alignment.md`，一个模块一个模块、一个页面一个页面、一个业务流程一个业务流程和用户确认；整体状态未到 `已确认` 前不得编写 PRD 正式内容。
- UI 页面访问逻辑必须从真实使用流程推导，页面数量以完成高频路径为准，能合并的页面/模块必须合并并记录理由。
- UI 原型页面可见文案、按钮、导航、空状态和提示语禁止使用 emoji；图标必须使用图标库、SVG 或图片资源。
- UI 正文、表单、按钮、列表文本默认不小于 16px，辅助说明不得低于 14px。
