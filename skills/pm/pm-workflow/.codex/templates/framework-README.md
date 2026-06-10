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
2. 直接输入你的产品想法,例如:`我想做一个每天记录习惯的 App`,或先说 `澄清需求`。
3. 产品经理会先用普通聊天方式帮你澄清真实需求(init);确认后进入 blueprint 五层递进梳理,把信息架构、核心流程、页面、功能、交互逐层拍板;然后做 UI 设计与高保真原型;接着回填 PRD;再做技术架构、任务规划、审核与打包。

阶段顺序(2.0+):`init → blueprint → design → analyze(PRD,后置) → architect → plan → deliver`。

常用自然语言:

- `澄清需求`(init)
- `做设计底稿` / `梳理流程` / `五层确认`(blueprint)
- `开始界面原型设计`(design)
- `开始分析需求`(PRD,后置)
- `开始设计技术架构`
- `开始规划`
- `审核一下`
- `开始打包`
- `当前进度`

## 脚本

```bash
node .agents/skills/pm-workflow/scripts/review_stage.js --root . --stage blueprint
node .agents/skills/pm-workflow/scripts/package_delivery.js --root .
node .claude/skills/pm-workflow/scripts/review_stage.js --root . --stage blueprint
node .claude/skills/pm-workflow/scripts/package_delivery.js --root .
```

## 流程规则

- 工艺准则贯穿全程(craft-principles):一次只抛一项、决策三件套(推荐+理由+取舍)、守边界(MVP)、重大变革协议、一致性检查、可追溯。
- blueprint 五层递进(blueprint-method):第 1 层信息架构 → 第 2 层核心流程 → 第 3 层逐个页面 → 第 4 层逐个功能(Mx-Fx 编号在此落定) → 第 5 层逐个交互。前一层未通过不进下一层。
- design 直接消费蓝图作为信息架构来源,不再单独产出 `docs/ui-information-architecture.md`。
- analyze(PRD)后置:基于已确认的蓝图与 UI 定稿回填成文,而非凭空起草。
- 一致性检查(craft-principles 第 5 条):任一阶段改动牵动上下游事实时,按重大变革协议五步处理(验证洞察 → 梳理连锁影响 → 确认范围 → 全文一致传播 → 一致性检查)。不再要求固定表格格式;review 阶段做兜底检查。
- UI 页面访问逻辑必须从蓝图的信息架构和核心流程推导,页面数量以完成高频路径为准,能合并的页面/模块必须合并并记录理由。
- UI 原型页面可见文案、按钮、导航、空状态和提示语禁止使用 emoji;图标必须使用图标库、SVG 或图片资源。
- UI 正文、表单、按钮、列表文本默认不小于 16px,辅助说明不得低于 14px。
