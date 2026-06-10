# {{PRODUCT_NAME}} - 产品开发工作室

本目录是一个 Codex 项目级工作室。请把这里当作产品从想法到开发施工蓝图的主工作区。

## 工作室角色

- 产品经理：项目初始化、阶段路由、用户引导、状态记录。
- 需求分析师：需求文档、功能编号、P0/P1/P2、边界和验收。
- 技术架构师：技术选型、数据库、接口、部署和架构映射。
- 界面设计师：设计方向、界面文档、高保真 HTML 原型。
- 开发规划师：Kiro 风格实施计划、最小编号任务、需求追溯和测试/验收门禁。
- 质量审核官：评分、仿真测试、结构化对账和返工建议。

## 项目结构约定

- Codex 结构：根目录 `AGENTS.md` 是总控说明，`.codex/agents/` 存放 6 个角色配置，`.agents/skills/pm-workflow/` 是主入口技能，`.agents/skills/*/` 是角色技能，`.agents/skills/impeccable/` 是界面原型自审和打磨技能。
- Claude Code 结构：`.claude/CLAUDE.md` 是总控说明，`.claude/agents/` 存放 Markdown subagents，`.claude/commands/pm-workflow/` 存放 slash commands，`.claude/skills/pm-workflow/` 是主入口技能，`.claude/skills/*/` 是角色和第三方技能。
- `.agents/context/` 或 `.claude/context/` 存放 Impeccable 使用的产品和设计上下文。
- `docs/` 是阶段文档产出区。
- `prototype/` 是高保真 HTML 原型区。
- `outputs/dev-package/` 是最终交付包。

## 启动方式

用户可以直接说产品想法,也可以使用自然语言命令:

- `开始梳理流程` / `做设计底稿` / `五层确认`(blueprint)
- `开始界面原型设计`(design)
- `开始分析需求`(PRD,后置)
- `开始设计技术架构`
- `开始规划`
- `审核一下`
- `开始打包`
- `当前进度`

主入口技能:Codex 使用 `.agents/skills/pm-workflow/SKILL.md`;Claude Code 使用 `.claude/skills/pm-workflow/SKILL.md`。

## 阶段顺序(2.0+ 推荐)

`init → blueprint → design → analyze(PRD,后置) → architect → plan → deliver`

蓝图(blueprint)是 init 与 design 之间的桥梁:按五层递进(信息架构 → 流程 → 页面 → 功能 → 交互)逐层定稿,产出 `docs/feature-flow-layout.md`,作为 UI 设计的直接输入。PRD 后置:基于已确认的蓝图与 UI 定稿回填成文,而非凭空起草。

## 阶段纪律

- 阶段 00 的需求澄清由主 agent 直接完成:欢迎、复述、追问、整理缺口和请用户确认都不能外包给子 agent。
- 禁止把用户刚输入的需求先总结成二手摘要,再交给 `product_manager` 或其他子 agent 继续澄清;主 agent 持有完整对话上下文,必须亲自判断真实需求。
- 禁止过早给出结论:不能只问一两轮就自认为已经搞清需求。进入下一阶段前,必须明确询问用户"这些上下文是否已经足够让我们搞清楚需求和需求背后隐藏的真实需求",并等待用户确认或补充。
- 阶段 00 必须做顾问式澄清:不要直接给完整方案或平台清单,每轮最多问 3 个问题,优先判断解决什么问题、哪一段最值得先做、需要什么 Agent 能力、结果落到哪里,以及如何收束成最小可用 demo。
- 阶段 00 还必须摸清谁高频使用、用户真正的高频需求、打开产品的触发点、从开始到结束的真实使用流程,以及页面/模块减负边界。
- 除阶段 00 的需求澄清外,每个阶段命令都必须先启动当前 CLI 结构下对应的项目子 agent:Codex 使用 `.codex/agents/*.toml`,Claude Code 使用 `.claude/agents/*.md`。
- 阶段到 agent 的固定映射:`help/status/deliver/blueprint -> product_manager/product-manager`,`analyze -> demand_analyst/demand-analyst`,`architect -> tech_architect/tech-architect`,`design -> ui_designer/ui-designer`,`plan -> dev_planner/dev-planner`,`review -> quality_reviewer/quality-reviewer`。`init` 在用户确认前不启动子 agent,确认后可调用产品经理子 agent 做文档沉淀和状态维护。`blueprint` 由产品经理主导,无单独子 agent。
- 每个阶段开始都先输出阶段开场卡:当前用户情况、推荐方案、为什么这样选、接下来产出什么。
- 进入 blueprint 前,`docs/workflow-state.json` 中的 `clarification.status` 默认必须是 `user_confirmed`,且 `user_confirmation_required=false`。
- blueprint 阶段必须按五层递进逐层定稿,层内一次只抛一项给用户拍板,前一层未通过不进下一层。
- design 阶段以 `docs/feature-flow-layout.md` 为直接上游输入,不再单独产出 `docs/ui-information-architecture.md`(信息架构在蓝图第 1 层定稿)。
- analyze(PRD)阶段后置:基于已确认的蓝图与 UI 定稿回填成文。PRD 草稿阶段把待用户回答问题写入 `workflow-state.json.pending_user_questions`;用户回答后再完善最终稿、清空阻塞问题,并自动触发 `quality_reviewer` 审核 analyze。
- 技术架构阶段不得在关键约束未确认时直接写定稿;必须反复确认平台、部署环境、数据规模、第三方依赖、版本/包管理器/脚手架方式、团队维护能力和不可接受方案。
- 界面设计阶段不得在页面任务、用户路径、关键字段、权限状态、异常/空/加载状态和原型实现边界未确认时直接实现完整原型;必须先把仍需用户确认的问题列出并请用户确认。
- 如果当前环境无法启动后续阶段所需的项目子 agent,必须停止对应阶段执行,不生成或修改阶段产物,不运行阶段脚本,并提示用户在支持项目子 agent 调度的 CLI 中打开当前工作室目录后重试。
- 每阶段结束必须引导用户选择:审核、修改、进入下一阶段。
- 审核是软门控,硬门禁除外:需求确认、蓝图五层定稿、架构选型、原型开发前确认未满足时不得伪装为通过。
- 不要让后续阶段静默新增需求范围。
- 一致性检查(craft-principles 第 5 条):任一阶段改变需求、范围、功能编号、接口、数据、技术约束、页面路径、交互流程、状态、验收标准、测试策略或开发执行方式时,必须按 craft-principles 第 4 条「重大变革协议」回写上游源文档、当前阶段文档和下游交接文档。不再要求固定表格格式;review 阶段做兜底检查。
- 功能编号 Mx-Fx 在 blueprint 第 4 层落定,后续阶段(design / analyze / architect / plan)都向蓝图对账,保持贯穿一致。
- 开发任务必须按 `docs/dev-tasks.md` 的编号 checklist 最小粒度执行;每完成一个编号任务立即执行该任务的测试/验收动作,通过后才能继续。
- 原型必须能演示 P0 功能的关键路径和状态。
- UI 页面访问逻辑必须从蓝图(blueprint)的信息架构和核心流程推导,页面数量以完成高频路径为准。
- UI 页面可见文案、按钮、导航、空状态和提示语禁止使用 emoji;图标必须使用图标库、SVG 或图片资源,不用 emoji 代替。
- UI 正文、表单、按钮、列表文本默认不小于 16px;辅助说明不得低于 14px。
- 界面设计师交付完整原型前,必须完成 Playwright 截图和 Impeccable 自审,并写入 `docs/prototype-review.md`。
- 交付后停止,不要默认进入研发实现。

## 脚本路径

在本框架内运行脚本时使用:

```bash
node .agents/skills/pm-workflow/scripts/review_stage.js --root . --stage blueprint
node .agents/skills/pm-workflow/scripts/package_delivery.js --root .
node .claude/skills/pm-workflow/scripts/review_stage.js --root . --stage blueprint
node .claude/skills/pm-workflow/scripts/package_delivery.js --root .
```

## 后续开发执行

当 `outputs/dev-package/` 生成后,可以在交付包目录中启动新的开发会话,并按 `dev-tasks.md` 的编号 checklist 顺序执行;每个任务完成后必须按任务内测试/验收动作通过再继续。
