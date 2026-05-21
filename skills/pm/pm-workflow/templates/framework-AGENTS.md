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
- `.agents/skills/impeccable/` 是界面原型自审、审美审查和打磨技能。
- `.agents/context/` 存放 Impeccable 使用的产品和设计上下文。
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

- 每个阶段命令都必须先启动对应的 `.codex/agents/*.toml` 子 agent；不要只由当前会话扮演角色。
- 阶段到 agent 的固定映射：`init/help/status/deliver -> product_manager`，`analyze -> demand_analyst`，`architect -> tech_architect`，`design -> ui_designer`，`plan -> dev_planner`，`review -> quality_reviewer`。
- 每个阶段开始都先输出阶段开场卡：当前用户情况、推荐方案、为什么这样选、接下来产出什么。
- 进入需求分析前，`docs/workflow-state.json` 中的 `clarification.status` 默认必须是 `user_confirmed`，且 `user_confirmation_required=false`。
- 需求分析先产出 PRD 草稿和待用户回答问题；用户回答后再完善最终稿，并自动触发 `quality_reviewer` 审核 analyze。
- 如果当前环境无法启动项目子 agent，必须停止本阶段执行，不生成或修改阶段产物，不运行阶段脚本，并提示用户在支持项目子 agent 调度的 Codex 运行方式中打开当前工作室目录后重试。
- 每阶段结束必须引导用户选择：审核、修改、进入下一阶段。
- 审核是软门控：不强制阻断，但必须记录风险。
- 不要让后续阶段静默新增需求范围。
- 功能编号必须从需求文档贯穿到架构、界面和开发任务。
- 原型必须能演示 P0 功能的关键路径和状态。
- 界面设计师交付完整原型前，必须完成 Playwright 截图和 Impeccable 自审，并写入 `docs/prototype-review.md`。
- 交付后停止，不要默认进入研发实现。

## 脚本路径

在本框架内运行脚本时使用：

```bash
python .agents/skills/pm-workflow/scripts/review_stage.py --root . --stage analyze
python .agents/skills/pm-workflow/scripts/package_delivery.py --root .
```

## 后续开发执行

当 `outputs/dev-package/` 生成后，可以在交付包目录中启动新的开发会话，并按 `dev-tasks.md` 顺序执行。
