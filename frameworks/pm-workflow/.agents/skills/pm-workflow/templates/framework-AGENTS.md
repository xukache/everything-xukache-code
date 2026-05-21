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

- Codex 结构：根目录 `AGENTS.md` 是总控说明，`.codex/agents/` 存放 6 个角色配置，`.agents/skills/pm-workflow/` 是主入口技能，`.agents/skills/*/` 是角色技能，`.agents/skills/impeccable/` 是界面原型自审和打磨技能。
- Claude Code 结构：`.claude/CLAUDE.md` 是总控说明，`.claude/agents/` 存放 Markdown subagents，`.claude/commands/pm-workflow/` 存放 slash commands，`.claude/skills/pm-workflow/` 是主入口技能，`.claude/skills/*/` 是角色和第三方技能。
- `.agents/context/` 或 `.claude/context/` 存放 Impeccable 使用的产品和设计上下文。
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

主入口技能：Codex 使用 `.agents/skills/pm-workflow/SKILL.md`；Claude Code 使用 `.claude/skills/pm-workflow/SKILL.md`。

## 阶段纪律

- 阶段 00 的需求澄清由主 agent 直接完成：欢迎、复述、追问、整理缺口和请用户确认都不能外包给子 agent。
- 禁止把用户刚输入的需求先总结成二手摘要，再交给 `product_manager` 或其他子 agent 继续澄清；主 agent 持有完整对话上下文，必须亲自判断真实需求。
- 阶段 00 必须摸清谁高频使用、用户真正的高频需求、打开产品的触发点、从开始到结束的真实使用流程，以及页面/模块减负边界；这些信息是需求分析识别真需求和 UI 设计制定页面访问逻辑的依据。
- 除阶段 00 的需求澄清外，每个阶段命令都必须先启动当前 CLI 结构下对应的项目子 agent：Codex 使用 `.codex/agents/*.toml`，Claude Code 使用 `.claude/agents/*.md`。
- 阶段到 agent 的固定映射：`help/status/deliver -> product_manager/product-manager`，`analyze -> demand_analyst/demand-analyst`，`architect -> tech_architect/tech-architect`，`design -> ui_designer/ui-designer`，`plan -> dev_planner/dev-planner`，`review -> quality_reviewer/quality-reviewer`。`init` 在用户确认前不启动子 agent，确认后可调用产品经理子 agent 做文档沉淀和状态维护。
- 每个阶段开始都先输出阶段开场卡：当前用户情况、推荐方案、为什么这样选、接下来产出什么。
- 进入需求分析前，`docs/workflow-state.json` 中的 `clarification.status` 默认必须是 `user_confirmed`，且 `user_confirmation_required=false`。
- 需求分析先产出 PRD 草稿和待用户回答问题；用户回答后再完善最终稿，并自动触发 `quality_reviewer` 审核 analyze。
- 需求分析必须基于高频真实需求和真实使用流程识别真需求与伪需求，P0 功能必须映射到高频场景和流程位置，功能模块优先合并同类能力。
- 如果当前环境无法启动后续阶段所需的项目子 agent，必须停止对应阶段执行，不生成或修改阶段产物，不运行阶段脚本，并提示用户在支持项目子 agent 调度的 CLI 中打开当前工作室目录后重试。
- 每阶段结束必须引导用户选择：审核、修改、进入下一阶段。
- 审核是软门控：不强制阻断，但必须记录风险。
- 不要让后续阶段静默新增需求范围。
- 如果下游文档改变需求、平台、范围、功能编号、技术约束、页面路径或验收标准，必须同步回写上游源文档，并在 `docs/workflow-state.json` 的 `notes` 记录同步说明。
- 功能编号必须从需求文档贯穿到架构、界面和开发任务。
- 原型必须能演示 P0 功能的关键路径和状态。
- UI 页面访问逻辑必须从真实使用流程推导，页面数量以完成高频路径为准；能合并的入口、状态、表单、列表、详情必须合并并记录理由。
- UI 页面可见文案、按钮、导航、空状态和提示语禁止使用 emoji；图标必须使用图标库、SVG 或图片资源，不用 emoji 代替。
- UI 正文、表单、按钮、列表文本默认不小于 16px；辅助说明不得低于 14px。
- 界面设计师交付完整原型前，必须完成 Playwright 截图和 Impeccable 自审，并写入 `docs/prototype-review.md`。
- 交付后停止，不要默认进入研发实现。

## 脚本路径

在本框架内运行脚本时使用：

```bash
python .agents/skills/pm-workflow/scripts/review_stage.py --root . --stage analyze
python .agents/skills/pm-workflow/scripts/package_delivery.py --root .
python .claude/skills/pm-workflow/scripts/review_stage.py --root . --stage analyze
python .claude/skills/pm-workflow/scripts/package_delivery.py --root .
```

## 后续开发执行

当 `outputs/dev-package/` 生成后，可以在交付包目录中启动新的开发会话，并按 `dev-tasks.md` 顺序执行。
