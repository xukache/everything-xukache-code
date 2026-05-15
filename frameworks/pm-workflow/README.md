# 未命名产品 工作室说明

这是一个可直接进入并运行的产品开发工作室目录。

## 目录说明

```text
AGENTS.md
.codex/
  config.toml
  agents/
.agents/
  skills/
docs/
prototype/
  directions/
outputs/dev-package/
```

- `AGENTS.md`：Codex 项目级总控说明。
- `.codex/agents/`：产品经理、需求分析师、技术架构师、界面设计师、开发规划师、质量审核官。
- `.agents/skills/pm-workflow/`：主入口技能和脚本。
- `.agents/skills/<role>/`：角色可调用的专用技能。
- `docs/`：阶段文档产出区。
- `prototype/`：高保真 HTML 原型区；`directions/` 存放候选方向首页 demo。
- `outputs/dev-package/`：最终开发交付包。

## 开始使用

1. 在本目录启动开发会话。
2. 直接输入你的产品想法，例如：`我想做一个每天记录习惯的 App`。
3. 产品经理会引导你完成初始化、需求、架构、界面、任务规划、审核和打包。

常用自然语言：

- `开始分析需求`
- `开始设计技术架构`
- `开始界面原型设计`
- `开始规划`
- `审核一下`
- `开始打包`
- `当前进度`

## 脚本

```bash
python .agents/skills/pm-workflow/scripts/review_stage.py --root . --stage analyze
python .agents/skills/pm-workflow/scripts/package_delivery.py --root .
```
