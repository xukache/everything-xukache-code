# PM Workflow Studio

AI 产品开发工作室 CLI。把一句产品想法初始化成 Codex、Claude Code 或 Kiro 可直接使用的产品工作室目录，也支持把 pm-workflow 安全更新到已有项目。

GitHub 仓库：[xukache/everything-xukache-code / skills/pm-workflow](https://github.com/xukache/everything-xukache-code/tree/main/skills/pm-workflow)

## 安装

```bash
npm install -g pm-workflow-studio
```

安装后会得到两个等价命令：

```bash
pmflow --help
pm-workflow --help
```

## 快速开始

交互式：

```bash
pmflow
```

或：

```bash
pmflow init
```

CLI 会逐步询问产品名称、项目目录、是新建项目还是更新已有项目，以及 AI 工作区结构；选择题可用上下键移动，空格确认。适合不想记参数的日常使用。

已有项目更新：

```bash
cd ./your-existing-project
pmflow update --ai auto --root . --name "已有项目"
```

更新模式会保护用户已有业务产物：`docs/`、`prototype/`、`README.md` 和根目录 `AGENTS.md` 只会在缺失时创建，不会覆盖。框架管理的 `.codex/`、`.claude/`、`.kiro/`、`.agents/skills/` 文件会刷新到当前包版本；如果已有文件内容不同，会先备份到 `.pmflow/backups/<timestamp>/` 再替换。

Codex：

```bash
pmflow init --ai codex --root ./pm-workflow-demo --name "习惯打卡"
cd ./pm-workflow-demo
codex
```

进入 Codex 后，直接说：

```text
我想做一个习惯打卡小程序
```

Claude Code：

```bash
pmflow init --ai claude --root ./pm-workflow-claude-demo --name "习惯打卡"
cd ./pm-workflow-claude-demo
claude
```

进入 Claude Code 后，直接说产品想法，或运行：

```text
/pm-workflow:init
```

Kiro：

```bash
pmflow init --ai kiro --root ./pm-workflow-kiro-demo --name "习惯打卡"
cd ./pm-workflow-kiro-demo
kiro
```

进入 Kiro 后，直接说产品想法，Kiro 会按 subagent 的 description 自动派发 6 个角色之一；也可以用 `/product-manager` slash 命令显式触发。`.kiro/steering/` 下的工艺准则与五层蓝图法是 always 加载，全程生效。

## 命令参数

```bash
pmflow init --ai auto --name "习惯打卡"
pmflow update --ai auto --root . --name "已有项目"
pm-workflow update --ai auto --root . --name "已有项目"
pmflow init --interactive
pmflow init --ai codex --root ./pm-workflow-demo --name "习惯打卡"
pmflow init --ai claude --root ./pm-workflow-claude-demo --name "习惯打卡"
pmflow init --ai kiro --root ./pm-workflow-kiro-demo --name "习惯打卡"
```

- `--ai auto|codex|claude|kiro`：选择生成结构。默认 `auto`；空目录默认 Codex；目录已有 `.kiro/` 时选择 Kiro，已有 `.claude/` 时选择 Claude Code，已有 `.codex/` 或 `.agents/` 时选择 Codex。
- `--root <dir>`：目标项目目录，默认当前目录。
- `--name <product name>`：产品名称，默认 `My Product`。
- `--mode new|update`：选择新建或更新模式；`pmflow update` 等价于 `--mode update`。
- `--new` / `--update`：强制新建或更新模式。
- `--interactive` / `-i`：进入交互式创建向导。
- `--cli` 是 `--ai` 的别名。

当前支持 Codex、Claude Code 和 Kiro。

## 生成内容

Codex 结构会生成：

```text
.codex/
.agents/skills/pm-workflow/
.agents/skills/impeccable/
docs/
prototype/
outputs/dev-package/
```

Claude Code 结构会生成：

```text
.claude/agents/
.claude/commands/
.claude/skills/pm-workflow/
.claude/skills/impeccable/
docs/
prototype/
outputs/dev-package/
```

Kiro 结构会生成：

```text
.kiro/agents/                 # 6 份 subagent（product-manager 等）
.kiro/skills/pm-workflow/     # 主 skill + references + scripts + assets
.kiro/skills/<role>/          # 5 份角色子 skill
.kiro/skills/impeccable/      # 内嵌 UI 自审 skill
.kiro/steering/               # craft-principles.md / blueprint-method.md（always 加载）
.kiro/settings/mcp.json       # 空模板
docs/
prototype/
outputs/dev-package/
```

`pmflow init` 和 `pmflow update` 只依赖 Node.js，不依赖 Python。包内维护 `.codex/`、`.claude/` 和 `.kiro/` 三套结构镜像，审核与打包脚本也使用 Node。

## 已有项目更新策略

已有项目推荐运行：

```bash
pmflow update --root . --ai auto --name "你的产品名"
```

更新策略分两类：

- 用户业务产物只补缺不覆盖：`docs/*.md`、`docs/workflow-state.json`、`prototype/`、`outputs/`、`README.md`、根目录 `AGENTS.md`。
- pm-workflow 框架文件可刷新：`.codex/`、`.claude/`、`.kiro/`、`.agents/skills/pm-workflow/`、角色 skills、内置 Impeccable skill、角色 agent 配置以及 `.kiro/steering/` 工艺基线。

当框架文件需要替换时，旧文件会先复制到 `.pmflow/backups/<timestamp>/`。如果用户曾直接修改项目内的框架 skill 或 agent 文件，更新后可以从备份目录对照迁回自定义内容。

## UI 原型设计能力

内置 `ui-prototype-design` 角色技能，支持从 PRD 和技术架构推进到界面设计文档、高保真 HTML 原型和原型自审报告。

针对 B 端网页、后台、运营台、管理系统和 SaaS 产品，包内提供一份 B 端 UI 设计规范参考，并在 Codex、Claude Code、Kiro 三套结构中保持镜像一致。UI 阶段不会一次性读取整份规范，而是按阶段渐进引用：

- 识别和边界：判断是否默认应用 B 端规范。
- 风格和配色：先明确品牌调性和产品风格，再定义灰度和色彩 token。
- 画布和密度：默认按 `1440x900` 设计，并检查 `1280x800` 核心路径。
- 信息架构和动线：用格式塔原则和 F 型、古腾堡、Z 型动线组织页面。
- 布局骨架和组件表现：约束导航、表格、筛选、表单、按钮、输入框、弹窗和状态反馈。
- 原型自审：按截图问题反查规范中的禁止事项和验收标准，修正后记录证据。

这样可以让 B 端原型持续遵守文字、间距、控件高度、信息密度、响应式适配和可用性规则，同时避免把大参考文档全部塞进上下文。

## 开发任务规划能力

`plan` 阶段会生成 Kiro 风格的 `docs/dev-tasks.md` 实施计划，用编号 checklist 拆解开发任务。每个任务都必须能直接执行、单独勾选、单独验收，并用 `_需求: ..._` 追溯到 PRD 功能编号或工程准备项。

实施计划会先锁定技术基线，包括语言和框架版本、包管理器、依赖文件形态、脚手架命令、安装命令、启动命令和测试命令。若上游文档没有明确这些信息，计划必须把它们列为阻塞确认项，不能让开发执行者自行默认。例如用户要求 `uv` 时不得改用 `requirements.txt`，Next.js 新项目应优先使用官方脚手架命令创建。

质量审核会检查每个编号任务是否包含 3-6 条具体动作、测试/验收动作和需求追溯；也会拦截过粗任务、缺少技术基线、包管理器混用或绕过脚手架的计划。

## 阶段顺序(2.0+)

`init → blueprint → design → analyze(PRD,后置) → architect → plan → deliver`

蓝图(blueprint)是 init 与 design 之间的桥梁:按五层递进(信息架构 → 流程 → 页面 → 功能 → 交互)逐层定稿,产出 `docs/feature-flow-layout.md`,作为 UI 设计的直接输入。PRD 后置:基于已确认的蓝图与 UI 定稿回填成文,而非凭空起草。

## 工艺准则(贯穿全程)

参见 `references/craft-principles.md`(包内三套镜像各一份):

1. **一次只抛一项**:把每个决策拆到最小可拍板单位,逐项确认逐项落盘。
2. **决策三件套**:推荐方向 + 为什么这么定 + 如果走另一种(代价或损失)。
3. **守边界**:每阶段明确「这一版做」「二期做」「不做」三档,范围蔓延就先回 MVP 边界。
4. **重大变革协议**:用户提方向性改动时按五步处理(验证洞察 → 梳理连锁影响 → 确认范围 → 全文一致传播 → 一致性检查)。
5. **一致性检查**:多文档协作时真理只能有一个版本;review 阶段做兜底。
6. **可追溯**:每个非显然决策就地记一句**为什么**。

## 五层递进蓝图法(blueprint 阶段方法论)

参见 `references/blueprint-method.md`。串行五层、层内一次只抛一项、前一层不通过不进下一层:

- **第 1 层 信息架构**:页面清单、给谁用、全局导航、跳转地图。
- **第 2 层 核心流程**:把页面串成端到端流程,标关键卡点。
- **第 3 层 逐个页面**:骨架、布局选型(带理由)、模块、四态。
- **第 4 层 逐个功能**:输入/处理/输出/异常/MVP 边界,功能编号 `M{模块}-F{功能}`。
- **第 5 层 逐个交互**:触发/主流程/异常,加全局异常态。

## 一致性检查

每阶段结束后,如果改动牵动上下游事实,按重大变革协议处理。`review <stage>` 会做兜底检查:

- 不再要求固定表格格式(2.0 起轻量化);
- 仍会拦截:蓝图五层未定稿、技术架构选型未确认、Mx-Fx 编号在下游缺失、design 未引用蓝图、analyze 未引用蓝图等关键不一致。

## 技术架构选型门禁

`architect` 阶段不会直接写唯一技术架构定稿。它会先生成 `docs/architecture-options.md`,提供 2-3 个候选技术架构方案给用户参考:

- 每个方案说明前端/客户端、后端/API、数据库/存储、部署方式、适合场景、维护成本、主要风险和推荐等级。
- 使用平台类型、复杂度、数据规模、第三方集成、维护成本五个维度做对比。
- AI 可以给第一推荐,但必须说明为什么不是其他方案。

只有用户确认最终选择,且 `docs/architecture-options.md` 的选型确认状态为 `已确认` 后,才会生成正式 `docs/tech-architecture.md`。

## BREAKING CHANGES(0.x → 2.0)

2.0 是流程层的重大重构,不向后兼容已生成的项目。主要变化:

- **新增 `blueprint` 阶段**:产出 `docs/feature-flow-layout.md`,放在 init 与 design 之间。
- **新增 2 份贯穿全程方法**:`references/craft-principles.md`、`references/blueprint-method.md`。
- **PRD 强制后置**:阶段顺序改为 `init → blueprint → design → analyze → architect → plan → deliver`。
- **删除**:
  - `docs/requirement-alignment.md`(被 blueprint 第 1-2 层吸收);
  - `docs/ui-information-architecture.md`(被 blueprint 第 1 层吸收)。
- **保留**:`docs/ui-design-brief.md` / `docs/ui-design-tokens.md` / `docs/ui-build-tasks.md`(视觉与构建相关,非结构性);`docs/architecture-options.md` 选型门禁;Impeccable + Playwright 自审;欢迎卡 + 8 锚点澄清协议。
- **轻量化文档同步**:不再要求每份产物固定表格;改为「重大变革协议 + 一致性检查」。

### 已有项目迁移(0.x → 2.0)

```bash
cd ./your-existing-project
pmflow update --root . --ai auto --name "你的产品名"
```

`pmflow update` 会自动备份框架文件到 `.pmflow/backups/<timestamp>/` 再替换,业务产物(`docs/*.md`)只补缺不覆盖。手动迁移要点:

- 旧的 `docs/requirement-alignment.md` 内容请人工归并到新的 `docs/feature-flow-layout.md`(蓝图)第 1-2 层。
- 旧的 `docs/ui-information-architecture.md` 内容请人工归并到 `docs/feature-flow-layout.md` 第 1 层。
- 旧的 `## 文档同步检查` 表格可保留也可删除;review 不再硬性要求该表格格式。
- 已写成的 PRD 仍可继续使用;新阶段顺序仅约束新建项目。

## 本地开发

在本仓库调试包:

```bash
cd skills/pm-workflow
npm test
node bin/pmflow.js init --ai codex --root /tmp/pmflow-demo --name "习惯打卡"
node bin/pmflow.js update --ai codex --root /tmp/pmflow-demo --name "习惯打卡"
```
