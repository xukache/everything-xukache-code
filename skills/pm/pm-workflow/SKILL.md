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
| `init` | `$pm-workflow`、"我想做一个..." | 产品经理 | `docs/project-config.md` |
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
4. **自然语言命中触发词**：即使没有明确命令，也进入对应阶段。
5. **每阶段结束后**：必须请用户选择下一步：审核、修改当前阶段、进入推荐下一阶段。
6. **审核是软门控**：审核意见用于引导流程，但不强制阻断下一命令。若用户选择带风险继续，必须把风险记录到 `docs/workflow-state.json` 或下一阶段文档。

## Agent 调度规则

每个阶段都必须先启动对应的 `.codex/agents/*.toml` 子 agent。不要只由当前会话扮演角色。若当前 Codex 环境无法启动项目子 agent，必须停止本阶段执行，不生成或修改阶段产物，不运行阶段脚本，并提示用户在支持项目子 agent 调度的 Codex 运行方式中打开当前工作室目录后重试。

| 命令 | 必须启动的 agent | 配置文件 |
|---|---|---|
| `init` | `product_manager` | `.codex/agents/product-manager.toml` |
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

`AGENTS.md` 是项目级总控说明。`.codex/agents/` 是 6 个角色配置。`.agents/skills/` 是当前项目内可调用的技能，其中 `impeccable/` 是界面原型自审和打磨能力。角色阶段模板放在对应角色技能的 `templates/` 目录中；`docs/` 只放运行时生成的阶段产物。`prototype/` 是高保真网页原型区。`outputs/dev-package/` 是最终开发交付包。

## 阶段流程

### 阶段 00：项目初始化

阶段说明：[references/commands/init.md](references/commands/init.md)

产品经理询问五个核心问题：

1. 产品是什么，解决什么问题，谁会使用？
2. 面向什么平台：网页、应用、桌面端、小程序或其他载体？
3. 用户打开产品后的核心场景是什么？
4. 有哪些参考产品或反向参考？
5. 必须包含什么，明确不包含什么？

产物：`docs/project-config.md`。

结束时询问用户：审核初始化、修改配置，还是开始需求分析。

### 阶段 01：需求分析

阶段说明：[references/commands/analyze.md](references/commands/analyze.md)

需求分析师执行四轮引导：

1. 用户角色与场景。
2. 功能模块与依赖。
3. 优先级与边界：P0/P1/P2 和不做项。
4. 业务规则与验收标准。

每个功能必须获得 `M{模块号}-F{功能号}` 编号。`docs/prd.md` 必须包含需求追溯表。`docs/handoff-prd.md` 总结架构和界面设计需要的输入。

结束时询问用户：审核需求、修改需求文档，还是开始技术架构。

### 阶段 02：技术架构

阶段说明：[references/commands/architect.md](references/commands/architect.md)

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
