---
name: pm-workflow
description: "用于把模糊产品想法推进为可评审、可设计、可开发、可交付的产品开发蓝图。覆盖初始化、需求、架构、界面原型、任务规划、质量审核和交付打包。"
argument-hint: "[init|analyze|architect|design|plan|review [stage]|deliver|status|help] [product idea or target]"
user-invocable: true
---

# AI 产品开发工作室

把一句模糊的产品想法，逐步变成可评审、可设计、可开发、可交付的施工蓝图。工作室按阶段串行推进，由 6 个角色协作：产品经理、需求分析师、技术架构师、界面设计师、开发规划师、质量审核官。

当前仓库内 `skills/pm/pm-workflow` 是本技能的源码依据。真正给用户进入运行的工作室目录应由脚手架生成，例如 `frameworks/pm-workflow/`，其中主入口位于 `.agents/skills/pm-workflow/`。

## 命令菜单

| 命令 | 自然语言触发 | 主角色 | 产物 |
|---|---|---|---|
| `init` | `$pm-workflow`、"我想做一个..."、"澄清需求"、"需求澄清" | 产品经理 | `docs/project-config.md` |
| `analyze` | "开始分析需求"、"需求分析" | 需求分析师 | `docs/prd.md`, `docs/handoff-prd.md` |
| `architect` | "开始设计技术架构"、"技术架构" | 技术架构师 | `docs/tech-architecture.md`, `docs/handoff-architecture.md` |
| `design` | "开始界面设计"、"开始界面原型设计" | 界面设计师 | `docs/ui-design.md`, `docs/handoff-ui.md`, `prototype/` |
| `plan` | "开始规划"、"开发规划"、"任务拆解" | 开发规划师 | `docs/dev-tasks.md` |
| `review [stage]` | "审核一下"、"检查文档"、"质量把关" | 质量审核官 | `docs/review-{stage}.md` |
| `deliver` | "开始打包"、"打包交付" | 产品经理 | `outputs/dev-package/` |
| `status` | "当前进度"、"现在到哪一步" | 产品经理 | 阶段摘要 |
| `help` | 无参数、"有哪些命令" | 产品经理 | 命令菜单 |

## 路由规则

按以下规则路由：

1. **无参数**：读取 [references/commands/help.md](references/commands/help.md)，展示命令菜单，并询问用户要进入哪个阶段。
2. **首词命中命令**：读取 `references/commands/` 下对应的阶段说明并执行；命令后的内容作为目标或上下文。
3. **首词没有命中命令**：把完整输入当作产品想法，进入 `init`。
4. **自然语言命中触发词**：即使没有明确命令，也进入对应阶段；"澄清需求"、"需求澄清"、模糊产品想法都进入 `init` 内的需求澄清协议。
5. **进入 analyze 前的默认硬门槛**：`docs/workflow-state.json` 中 `clarification.status` 必须为 `user_confirmed`。若用户强行跳过，必须把风险写入 `notes` 和下一阶段文档，并保留 `user_confirmation_required=true`。
6. **每阶段开始时**：先输出“阶段开场卡”，说明当前用户情况、推荐方案、选择原因、接下来会产出什么。
7. **每阶段结束后**：必须请用户选择下一步：审核、修改当前阶段、进入推荐下一阶段。
8. **审核是软门控**：审核意见用于引导流程，但不强制阻断下一命令。若用户选择带风险继续，必须把风险记录到 `docs/workflow-state.json` 或下一阶段文档。

## Agent 调度规则

除阶段 00 的需求澄清外，每个阶段都必须先启动对应的 `.codex/agents/*.toml` 子 agent。阶段 00 是特殊例外：用户刚输入产品想法时，主 agent 拥有最完整的对话上下文，必须亲自完成欢迎、复述、追问、整理缺口和请用户确认，禁止把“待澄清需求”先总结后交给 `product_manager` 或任何子 agent 继续澄清。若当前 Codex 环境无法启动后续阶段所需的项目子 agent，必须停止对应阶段执行，不生成或修改阶段产物，不运行阶段脚本，并提示用户在支持项目子 agent 调度的 Codex 运行方式中打开当前工作室目录后重试。

| 命令 | 调度方式 | 配置文件 |
|---|---|---|
| `init` | 需求澄清由主 agent 直接完成；用户确认后可由主 agent 写入配置，或启动 `product_manager` 只做文档沉淀和状态维护 | `.codex/agents/product-manager.toml` |
| `help` | `product_manager` | `.codex/agents/product-manager.toml` |
| `status` | `product_manager` | `.codex/agents/product-manager.toml` |
| `analyze` | `demand_analyst` | `.codex/agents/demand-analyst.toml` |
| `architect` | `tech_architect` | `.codex/agents/tech-architect.toml` |
| `design` | `ui_designer` | `.codex/agents/ui-designer.toml` |
| `plan` | `dev_planner` | `.codex/agents/dev-planner.toml` |
| `review` | `quality_reviewer` | `.codex/agents/quality-reviewer.toml` |
| `deliver` | `product_manager`，并在打包前启动 `quality_reviewer` 做最终完整性检查 | `.codex/agents/product-manager.toml`, `.codex/agents/quality-reviewer.toml` |

自然语言路由示例：

- "我想做一个记录每天读书笔记的网站" -> `init`
- "澄清需求" / "需求澄清" -> `init`
- "开始分析需求" -> `analyze`
- "开始设计技术架构" -> `architect`
- "开始界面原型设计" -> `design`
- "开始规划" -> `plan`
- "审核一下" / "检查文档" / "质量把关" -> `review`
- "开始打包" -> `deliver`
- "当前进度" -> `status`

## 框架结构

在源码仓库中生成一个可运行的 Codex 工作室框架：

```bash
python skills/pm/pm-workflow/scripts/scaffold_project.py --root frameworks/pm-workflow --name "<product name>"
```

在生成后的框架目录中，脚本路径位于 `.agents/skills/pm-workflow/scripts/`。

脚手架会创建：

```text
project-root/
  AGENTS.md
  README.md
  .codex/
    config.toml
    agents/
      product-manager.toml
      demand-analyst.toml
      tech-architect.toml
      ui-designer.toml
      dev-planner.toml
      quality-reviewer.toml
  .agents/
    skills/
      pm-workflow/
        SKILL.md
        references/
        scripts/
        templates/           # 框架、初始化、状态和交付模板
        assets/
        bundled-skills/
          impeccable/        # 随 pm-workflow 分发的第三方界面审查技能
        agents/openai.yaml
      impeccable/
        SKILL.md
      demand-analysis/
        SKILL.md
        templates/
      tech-architecture/
        SKILL.md
        templates/
      ui-prototype-design/
        SKILL.md
        templates/
      dev-task-planning/
        SKILL.md
        templates/
      quality-review/
        SKILL.md
        templates/
  docs/
    workflow-state.json
    project-config.md
    prd.md
    handoff-prd.md
    tech-architecture.md
    handoff-architecture.md
    ui-design.md
    handoff-ui.md
    prototype-review.md
    dev-tasks.md
    review-{stage}.md
  prototype/
    directions/
    index.html
    pages/
    layout/
    components/
    assets/
    review/
      screenshots/
  outputs/
    dev-package/
```

`AGENTS.md` 是项目级总控说明。`.codex/agents/` 是 6 个角色配置。`.agents/skills/` 是当前项目内可调用的技能，其中 `impeccable/` 是界面原型自审和打磨能力。`pm-workflow/bundled-skills/impeccable/` 是随本技能一起分发的第三方技能副本，脚手架会优先从这里复制到项目的 `.agents/skills/impeccable/`，避免用户只安装 pm-workflow 时缺少依赖。角色阶段模板放在对应角色技能的 `templates/` 目录中；`docs/` 只放运行时生成的阶段产物。`prototype/` 是高保真网页原型区。`outputs/dev-package/` 是最终开发交付包。

## 阶段流程

### 阶段 00：项目初始化

阶段说明：[references/commands/init.md](references/commands/init.md)

产品经理先执行需求澄清协议，再沉淀五个核心问题。用户第一次输入产品想法时，必须先输出欢迎语：

```text
🤖 AI产品开发工作室已就绪
朋友你好！我是你的产品经理，会带着你一步步把想法变成现实。
你提到的「xxx」是个很好的产品，xxx。不过在落地之前，我想先帮你理清楚几个关键问题。
先确认一下我理解的对不对：
你说的 xxx 产品，核心就是：xxx
```

阶段 00 的澄清必须由主 agent 直接完成，不能把用户原话压缩成二手摘要后交给子 agent 代问。原因是主 agent 持有完整聊天上下文、用户语气、补充材料和刚刚发生的追问线索，最不容易遗漏真实需求。

在用户确认前，禁止启动 `product_manager`、`demand_analyst` 或其他子 agent 做需求澄清；禁止把“我总结一下再让子 agent 问你”作为默认流程。若后续需要子 agent 做文档沉淀，必须传递完整用户原话、关键问答记录、未确认假设和待补材料，且不得让子 agent 覆盖用户已确认的表达。

随后只问 3-5 个最关键的问题，必须用普通用户能懂的话，并允许用户“不用一次性全回答，想到什么说什么就行”。问题默认覆盖：

1. 你想在什么设备或平台上用？
2. 除了核心功能，还有特别想要的功能吗？
3. 有没有用过类似产品觉得不错或不喜欢？如环境允许，AI 主动搜索 2-4 个类似产品作参考；如无法联网，说明无法实时搜索，并用本地经验示例且标记待确认。
4. 这个产品只给自己用，还是分享给别人一起用？

需求澄清必须包含“术语与概念对齐”。主 agent 遇到用户提到的专业词、行业词、产品形态、技术词或容易多义的普通词时，必须先用白话复述自己的理解，再问用户是不是这个意思；主 agent 自己描述需求时，也要解释关键概念，避免用户表面点头但实际理解不同。典型句式是：“你说的 xxx，我先按 yyy 理解；如果你指的是 zzz，那方案会不一样，我理解得对吗？”

澄清完成标准固定为 6 项：

1. 产品给谁用。
2. 解决什么场景问题。
3. 用户想达成什么结果。
4. 首版平台与使用设备。
5. MVP 必须做和暂不做边界。
6. 无阻塞开放问题，包括关键术语和概念没有歧义。

只有 6 项均有答案、关键术语概念已经对齐，并且用户确认“我理解得对”，才能把 `docs/workflow-state.json` 中 `clarification.status` 更新为 `user_confirmed`，把 `clarification.concepts_aligned` 设为 `true`，把 `user_confirmation_required` 设为 `false`，并推荐进入 `analyze`。内部判断通过、文档已写好、审核通过都不等于用户确认。

产品经理继续补齐五个核心问题：

1. 产品是什么，解决什么问题，谁会使用？
2. 面向什么平台：网页、应用、桌面端、小程序或其他载体？
3. 用户打开产品后的核心场景是什么？
4. 有哪些参考产品或反向参考？
5. 必须包含什么，明确不包含什么？

产物：`docs/project-config.md`。

结束时若澄清未完成，继续围绕缺口提问；若澄清完成但未确认，请用户确认理解是否正确；只有用户确认后，才询问：审核初始化、修改配置，还是开始需求分析。

### 阶段 01：需求分析

阶段说明：[references/commands/analyze.md](references/commands/analyze.md)

需求分析师开始前先输出阶段开场卡，并检查 `clarification.status=user_confirmed`。如果未确认，先交还产品经理继续澄清；用户坚持继续时必须记录风险。

需求分析师执行两步式需求分析：

1. 先根据已确认的 `project-config.md` 生成 PRD 草稿，标记 `文档状态：draft`，并在 `待用户回答问题` 中列出完成最终稿必须回答的问题。
2. 产品经理把这些问题抛给用户。用户回答后，需求分析师回填并完善 `docs/prd.md` 和 `docs/handoff-prd.md`，把 `文档状态` 改为 `final`，清空阻塞问题，再自动调用 `quality_reviewer` 审核 `analyze`。

PRD 草稿和最终稿都使用四轮引导框架：

1. 用户角色与场景。
2. 功能模块与依赖。
3. 优先级与边界：P0/P1/P2 和不做项。
4. 业务规则与验收标准。

每个功能必须获得 `M{模块号}-F{功能号}` 编号。`docs/prd.md` 必须包含需求追溯表。`docs/handoff-prd.md` 总结架构和界面设计需要的输入。

草稿阶段不触发审核；最终稿完成后必须自动运行 `review analyze`，再询问用户：修改需求文档，还是开始技术架构。

### 阶段 02：技术架构

阶段说明：[references/commands/architect.md](references/commands/architect.md)

技术架构师开始前先输出阶段开场卡，用小白能听懂的话说明推荐技术路线和原因。例如：如果产品是微信小程序内使用，优先考虑微信原生小程序 + 微信云开发；如果是网页、App 或桌面软件，再根据平台、用户体量、商业化计划、迭代方向和维护成本比较技术栈。

技术架构师使用五维度决策框架：

- 平台类型
- 复杂度
- 数据规模
- 第三方集成
- 维护成本

`docs/tech-architecture.md` 必须包含技术选型、数据库设计、接口清单、部署方案和需求到架构映射表。`docs/handoff-architecture.md` 总结下游界面设计和开发规划关注点。

结束时询问用户：审核架构、修改架构，还是开始界面与体验设计。

### 阶段 03：界面与网页原型

阶段说明：[references/commands/design.md](references/commands/design.md)

界面设计师先做上游前置审查，再基于 `assets/design-themes/` 推荐 2-3 个有明显差异的设计方向。每个候选方向必须生成一个可打开的首页 demo，放在 `prototype/directions/`，并在 `docs/ui-design.md` 中给出预览路径。等待用户选择；只有在用户明确授权时，才默认使用第一推荐。

产物：

- `docs/ui-design.md`
- `docs/handoff-ui.md`
- `docs/prototype-review.md`
- `prototype/`

原型结构：

- 单页面产品：`prototype/index.html` 是完整可交互原型，复用页面结构放在 `prototype/layout/`。
- 多页面系统：`prototype/index.html` 是入口，页面放在 `prototype/pages/`，复用页面结构放在 `prototype/layout/`，可复用组件示例放在 `prototype/components/`，资源放在 `prototype/assets/`。
- 方向候选：`prototype/directions/` 存放 2-3 个首页 demo，`prototype/directions/index.html` 是预览索引；它只用于方向选择，不替代最终完整原型。

原型必须覆盖 P0 点击路径、成功/失败/空/加载状态、关键异常和主要响应式视口。`prototype/layout/` 必须沉淀可复用页面结构，避免界面实现只能在原型中成立、实际开发时无法稳定复现。

完整原型交付前，界面设计师必须完成 Playwright + Impeccable 自审：生成 `.agents/context/PRODUCT.md` 和 `.agents/context/DESIGN.md`，运行 Impeccable context loader，用 Playwright 覆盖 desktop/tablet/mobile 截图，对候选 demo 和完整原型执行 `critique`、`audit`、`adapt` 以及必要的 `layout`、`typeset`、`clarify`、`animate`、`harden`、`polish`，并把审查、修正和复查结果写入 `docs/prototype-review.md`。

原型目录职责：

| 路径 | 职责 |
|---|---|
| `prototype/directions/` | 设计方向首页 demo 和预览索引。 |
| `prototype/index.html` | 原型入口、全局导航、关键流程起点。 |
| `prototype/pages/` | 多页面系统的独立业务页面。 |
| `prototype/layout/` | 应用外壳、导航、页头、侧栏、内容网格、表单页骨架、状态页骨架等可复用页面结构。 |
| `prototype/components/` | 按钮组、表单控件、卡片、列表、弹窗、状态块等可复用组件和交互片段。 |
| `prototype/assets/` | 样式、脚本、图片、图标、示例数据等公共资源。 |
| `prototype/review/screenshots/` | Playwright 原型自审截图证据，按 desktop/tablet/mobile 存放。 |

结束时询问用户：审核界面设计、修改设计/原型，还是开始开发规划。

### 阶段 04：开发规划

阶段说明：[references/commands/plan.md](references/commands/plan.md)

开发规划师把需求、架构、界面设计和原型转为 `docs/dev-tasks.md`。

任务规则：

- 使用 `Txxx` 编号。
- 每个任务都能独立验证。
- 每个任务尽量控制在 5-20 分钟执行粒度。
- 每个任务包含目标、依赖、涉及文件、执行指令、验证步骤和边缘情况。
- 包含需求到任务映射表。

结束时询问用户：审核任务规划、修改任务，还是打包交付。

### 阶段 05：交付打包

阶段说明：[references/commands/deliver.md](references/commands/deliver.md)

运行：

```bash
python .agents/skills/pm-workflow/scripts/package_delivery.py --root .
```

交付包输出到 `outputs/dev-package/`。打包脚本只报告缺失文件，不判断质量完整性；质量结论由质量审核官负责。

结束时询问用户：检查交付包、修改文档，还是基于交付包启动独立开发会话。

## 审核流程

阶段说明：[references/commands/review.md](references/commands/review.md)

用户触发审核时，必须启动 `.codex/agents/quality-reviewer.toml` 中的 `quality_reviewer` 子 agent。若当前环境无法启动项目子 agent，必须停止审核，不生成或修改审核报告，不运行审核脚本，并提示用户在支持项目子 agent 调度的 Codex 运行方式中打开当前工作室目录后重试。

运行：

```bash
python .agents/skills/pm-workflow/scripts/review_stage.py --root . --stage <init|analyze|architect|design|plan|deliver>
```

质量审核官必须使用三种机制：

1. 对完整性、清晰度、一致性、可执行性评分。通过标准：平均分 >= 8 且每项 >= 6。
2. 仿真下游角色，判断是否能基于当前产物继续工作。
3. 核对追溯关系：
   - 需求功能编号到架构数据、接口、部署。
   - 需求功能编号到界面页面、组件、状态、原型路径。
   - 需求功能编号到开发任务。

审核脚本会把审核轮次记录到 `docs/workflow-state.json`。如果某阶段三轮仍不通过，必须向用户明确说明风险，并建议先修复再继续。

## 状态流程

阶段说明：[references/commands/status.md](references/commands/status.md)

结合 `docs/workflow-state.json` 以及 `docs/`、`prototype/`、`outputs/dev-package/` 下的实际文件，报告当前阶段、已有产物、审核轮次、最近结论、缺失文件和推荐下一步。

## 质量要求

- 不编造缺失的业务事实；需要时提问或标记风险。
- 不跳过阶段收尾引导；始终询问用户要审核、修改还是进入下一阶段。
- 不要让后续阶段静默新增需求范围。
- 功能编号必须从需求文档贯穿到架构、界面和任务。
- 即使审核不是硬阻断，也要把它当作真实质量机制。
- 界面原型必须使用真实业务数据和可运行网页交互，不要用静态文字替代关键 P0 流程。
- 交付默认止步于交付包，除非用户明确要求继续实现产品。
