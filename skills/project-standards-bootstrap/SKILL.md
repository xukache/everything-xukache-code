---
name: project-standards-bootstrap
description: 为 AI 辅助开发项目创建标准化启动文档。适用于需要编写或重组 AGENTS.md、技术架构、API 契约文档、前端/后端开发规范、Agent 运行规则和架构演进监控清单的场景；覆盖新项目、已有项目、前端项目、后端项目、全栈项目和带 Agent 工作流的项目。
---

# 项目规范启动模板

为项目生成一套可复用、可维护、适合 Agent 协作的标准化文档。产出时必须从目标项目提取通用工程规则和本项目事实，但不要把源项目或样例项目的业务字段、业务角色、历史缺陷、专有端点写进通用规范。

## 引导语

使用本技能时，先向用户说明将按以下方式推进：

> 我会先判断项目类型和阶段，再读取现有文档与代码结构，最后生成或整理一套标准化项目启动文档。默认规则是：`AGENTS.md` 放在项目根目录；其他规范文档全部放在 `docs/` 下；技术架构总纲和 API 契约总纲是必须存在的事实源；具体分册和章节按项目实际复杂度选用。通用规范和项目专有补充会分层放置，避免重复维护和内容漂移。

如果用户没有指定文档语言，默认使用中文。

## 工作流程

1. 判断项目分类。
2. 阅读当前文档和代码目录。
3. 基于最全文档模板，选择本项目实际需要启用的章节和分册。
4. 按单一事实来源原则起草或整理文档。
5. 确保技术架构和 API 契约事实源存在；没有后端 API 的项目也要在契约总纲中说明“不暴露 HTTP API / 暂无公开 API”。
6. 为带 Agent 的项目补充变更监控规则；统一写入技术架构文档，优先放在 `docs/architecture/10-evolution-rules.md`，`AGENTS.md` 只保留阅读入口和强制提醒。
7. 检查通用规范与项目专有事实是否分层清楚。

写具体模板时读取 `references/standard-doc-templates.md`。梳理已有项目、判断架构演进监控范围或做最终验收时读取 `references/audit-checklists.md`。

## 分类判断

同时按项目形态和项目阶段分类：

| 信号 | 分类 | 必要文档 |
|---|---|---|
| 只有 UI、静态站点或 SPA，不拥有后端 API | 前端项目 | `AGENTS.md`、`docs/architecture.md`、`docs/api-contracts.md`、`docs/frontend-conventions.md`、环境与配置说明；契约总纲说明暂无后端 API |
| 只有 API 或服务，不拥有前端 UI | 后端项目 | `AGENTS.md`、`docs/architecture.md`、`docs/api-contracts.md`、`docs/backend-conventions.md` |
| 同时拥有前端 UI 和后端 API | 全栈项目 | `AGENTS.md`、`docs/architecture.md`、`docs/api-contracts.md`、API 契约分册、前端规范、后端规范 |
| 存在复杂业务流程、核心数据模型、运行时、权限隔离、异步任务或多模块边界 | 架构复杂项目 | 基于 `docs/architecture.md` 额外启用 `docs/architecture/` 分册 |
| 使用 Coding Agent、Skill、提示词、MCP、自动化工作流或生成式计划 | Agent 项目 | 在 `docs/architecture/10-evolution-rules.md` 中加入 Agent 变更监控，`AGENTS.md` 只链接到该架构规则 |
| 已有代码和文档 | 已有项目 | 先审计、保留项目事实、去重和重组 |
| 新仓库或空白基线 | 新项目 | 创建干净的启动模板，用占位符标出待决策项 |

如果多个分类同时成立，合并所需文档。模板按最全结构设计，但生成时按项目实际启用章节；不能因为项目简单而省略 `docs/architecture.md` 或 `docs/api-contracts.md` 这两个入口事实源。

## 输出位置规则

严格使用以下落位规则：

- `<project-root>/AGENTS.md`：唯一允许放在项目根目录的启动文档，负责顶层索引、Agent 读文档顺序、项目专有补充和关键约束摘要。
- `<project-root>/docs/frontend-conventions.md`：前端开发规范。
- `<project-root>/docs/backend-conventions.md`：后端开发规范。
- `<project-root>/docs/architecture.md`：技术架构入口索引；只做阅读顺序、分册索引、事实源优先级和维护规则。所有项目都必须有；简单项目可只保留少量章节并说明不适用项。
- `<project-root>/docs/architecture/00-overview.md` 或 `<nn>-<domain>.md`：按业务流、模块边界、数据模型、运行时、消息/事件、权限隔离、前端架构、观测诊断等领域拆分的架构分册。
- `<project-root>/docs/architecture/99-changelog.md`：架构变更记录。已有项目可以沿用既有编号，但必须有 changelog 分册。
- `<project-root>/docs/api-contracts.md`：API 契约入口索引；只做阅读顺序、领域索引和维护规则。
- `<project-root>/docs/api-contracts/00-conventions.md`：API 通用约定摘要和项目补充。
- `<project-root>/docs/api-contracts/<nn>-<domain>.md`：按业务领域拆分的接口契约和字段表。
- `<project-root>/docs/api-contracts/99-changelog.md`：API 契约变更记录。

不要把前端规范、后端规范、Agent 监控清单或 API 领域契约散落到项目根目录。Agent 监控清单归入技术架构文档，不单独创建 `docs/agent-monitoring.md`。

## 上下文读取

写文档前只读取目标项目自身材料：

- Agent 指令：`AGENTS.md`、`CLAUDE.md`、`.cursorrules`、`.windsurfrules`、`.github/copilot-instructions.md`、已有 Agent/Skill/Prompt 文档。
- 架构材料：`docs/architecture.md`、`docs/architecture/`、设计文档、状态机文档、数据流文档、运行时/权限/观测文档。
- API 材料：`docs/api-contracts.md`、`docs/api-contracts/`、OpenAPI、路由、schema、service、测试。
- 前端材料：框架、包管理器、`src/services/`、状态管理、测试目录、环境变量、设计 token、帮助文档。
- 后端材料：框架、入口文件、router/schema/service 分层、配置、鉴权、日志、测试、迁移。
- Agent 材料：Skill、提示词、工作流 YAML、MCP 配置、自动化脚本、评审清单。

不要把样例项目中的业务名词、接口名、角色名、历史缺陷编号、专有字段复制到通用 Skill 或通用规范中；应转换为占位符或抽象规则。

## 文档分层原则

- `AGENTS.md` 只放顶层入口、阅读顺序、项目专有补充和必须提醒 Agent 的约束。
- `docs/architecture.md` 只放技术架构索引、阅读顺序、事实源优先级和维护规则，不追加长篇模块细节。
- `docs/architecture/<nn>-<domain>.md` 放系统模块边界、业务流、核心数据结构、运行时、消息/事件、权限隔离、前端架构、观测诊断和演进规则。
- `docs/architecture/<changelog>.md` 放架构变更记录。
- `docs/api-contracts.md` 只放 API 契约索引和维护规则，不追加具体接口字段表。
- `docs/api-contracts/00-conventions.md` 放通用 API 约定摘要和本项目允许的补充。
- `docs/api-contracts/<nn>-<domain>.md` 放具体接口契约、字段表、错误场景和前端映射。
- `docs/frontend-conventions.md` 放可复用的前端工程规则。
- `docs/backend-conventions.md` 放可复用的后端工程规则。
- Agent 变更监控属于架构演进治理，统一放在 `docs/architecture/10-evolution-rules.md` 或对应架构分册；`AGENTS.md` 只保留指向该规则的入口提醒，不单独创建 `docs/agent-monitoring.md`。

同一事实只维护一次。摘要文档使用链接指向事实来源，不复制长规则。

## 新项目启动流程

1. 根据用户说明或脚手架识别技术栈和项目形态。
2. 创建 `AGENTS.md`、`docs/architecture.md`、`docs/api-contracts.md` 这三个基础入口，再按分类启用前端、后端、架构分册或 API 领域分册。
3. 对路径、端口、包命令、鉴权模型、部署目标、API 领域、架构分册范围等未决项使用占位符。
4. 对会阻塞实现的未决项标注“待决策”。
5. 项目没有后端 API 时，仍创建 `docs/api-contracts.md`，并写明当前不暴露 HTTP API；只有存在真实接口领域时才创建 `docs/api-contracts/` 领域分册。

## 已有项目梳理流程

1. 绘制现有文档地图，找出重复、过期和事实冲突。
2. 选择通用规则、API 规则、前端规则、后端规则、项目补充的事实来源。
3. 将重复的架构说明移动到 `docs/architecture/`，将重复的通用工程规则移动到 `docs/*-conventions.md` 或 `docs/api-contracts/00-conventions.md`。
4. 让 `AGENTS.md` 回到“索引 + 项目例外 + 强制阅读顺序”的角色。
5. 保留项目事实，不要把本项目真实路径、命令、部署边界、业务领域泛化掉。
6. 旧接口、旧响应壳、旧目录结构仍临时有效时，写清迁移说明和失效条件。

## Agent 项目变更监控

带 Agent 的项目必须要求 Agent 监控这些容易漂移的内容。这部分统一归入 `docs/architecture/10-evolution-rules.md`；如果没有拆分架构分册，则放入 `docs/architecture.md` 的“架构演进与变更监控”章节：

- API 路由、schema、service 与 API 契约文档、前端 adapter 是否同步。
- 前端 service、Raw 类型、adapter、mock fixture 与后端响应字段是否同步。
- 用户可见页面流程、字段名称、筛选条件、异常提示、帮助页和用户手册是否同步。
- 环境变量、配置文件、启动脚本、端口、CORS、鉴权、部署边界是否同步。
- 测试目录约定、fixtures、mock 数据结构、测试辅助端点是否同步。
- Agent 指令、Skill、提示词、工作流、MCP 配置、自动化脚本是否同步。
- 技术架构文档、架构分册和架构 changelog 是否随模块边界、数据模型、运行时、消息事件、状态机、权限或观测规则同步。
- 设计 token、主题变量、全局样式、共享组件是否同步。
- 数据库迁移、种子数据、枚举/状态值、权限、审计日志事件是否同步。

Agent 修改上述内容时，应在同一变更中更新对应文档；如果无需更新文档，必须在交付说明中说明原因。

## 最终检查

交付前确认：

- 文档集合符合项目分类。
- 除 `AGENTS.md` 外，所有产出文档都在 `docs/` 下。
- 技术架构入口在 `docs/architecture.md`；复杂项目的架构分册在 `docs/architecture/` 下，并包含架构 changelog。
- API 契约入口在 `docs/api-contracts.md`；有真实接口领域时，领域契约在 `docs/api-contracts/` 下。
- 通用规范没有混入源项目业务事实。
- 项目专有事实只出现在目标项目的补充章节或领域契约中。
- 有真实接口时，API 契约包含路径、方法、请求、响应、字段表、错误场景和前端映射要求；没有后端 API 时，契约总纲明确说明暂无公开 API。
- 前端/后端规范包含测试目录、环境配置、service/route/schema 边界和验证命令。
- `AGENTS.md` 链接到事实来源，而不是重复维护长规则。
- `docs/architecture.md` 和 `docs/api-contracts.md` 必须存在；没有适用内容时要显式写“不适用 / 暂无”，不能静默缺失。
- 不创建 `docs/agent-monitoring.md`；Agent 变更监控统一由技术架构文档管理。
