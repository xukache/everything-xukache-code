# {{PRODUCT_NAME}} - 产品开发工作室

本目录是一个 Codex 项目级工作室。请把这里当作产品从想法到开发施工蓝图的主工作区。

## 工作室角色

- 产品经理：项目初始化、阶段路由、用户引导、状态记录。
- 需求分析师：需求文档、功能编号、P0/P1/P2、边界和验收。
- 技术架构师：技术选型、数据库、接口、部署和架构映射。
- 界面设计师：设计方向、界面文档、高保真 HTML 原型。
- 开发规划师：可执行任务拆解和验证方式。
- 质量审核官：评分、仿真测试、结构化对账和返工建议。

## 项目结构约定

- 根目录 `AGENTS.md` 是本工作室总控说明。
- `.codex/agents/` 存放 6 个角色配置。
- `.agents/skills/pm-workflow/` 是主入口技能。
- `.agents/skills/*/` 中的角色技能提供方法和检查表。
- `docs/` 是阶段文档产出区。
- `prototype/` 是高保真 HTML 原型区。
- `outputs/dev-package/` 是最终交付包。

## 启动方式

用户可以直接说产品想法，也可以使用自然语言命令：

- `开始分析需求`
- `开始设计技术架构`
- `开始界面原型设计`
- `开始规划`
- `审核一下`
- `开始打包`
- `当前进度`

主入口技能：`.agents/skills/pm-workflow/SKILL.md`。

## 阶段纪律

- 每个阶段命令都必须先委派对应的 `.codex/agents/*.toml` 子 agent；不要只由当前会话扮演角色。
- 阶段到 agent 的固定映射：`init/help/status/deliver -> product_manager`，`analyze -> demand_analyst`，`architect -> tech_architect`，`design -> ui_designer`，`plan -> dev_planner`，`review -> quality_reviewer`。
- 如果当前环境无法启动子 agent，必须先向用户说明降级原因，再由当前会话按对应角色执行；不要静默降级。
- 每阶段结束必须引导用户选择：审核、修改、进入下一阶段。
- 审核是软门控：不强制阻断，但必须记录风险。
- 不要让后续阶段静默新增需求范围。
- 功能编号必须从需求文档贯穿到架构、界面和开发任务。
- 原型必须能演示 P0 功能的关键路径和状态。
- 交付后停止，不要默认进入研发实现。

## 脚本路径

在本框架内运行脚本时使用：

```bash
python .agents/skills/pm-workflow/scripts/review_stage.py --root . --stage analyze
python .agents/skills/pm-workflow/scripts/package_delivery.py --root .
```

## 后续开发执行

当 `outputs/dev-package/` 生成后，可以在交付包目录中启动新的开发会话，并按 `dev-tasks.md` 顺序执行。
