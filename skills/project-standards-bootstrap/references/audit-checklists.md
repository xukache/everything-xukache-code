# 审计与验收清单

## 已有项目审计清单

重组已有仓库文档前，先检查：

- 当前 DEV_SPEC 模式：`<完整 | 轻量 | 不启用 | 未确认>`。
- 当前治理级别：`<strict | reviewed | autonomous | 未配置>`。
- 当前集成分支和任务分支规则是否明确。
- 当前所有指令文件：`AGENTS.md`、`CLAUDE.md`、编辑器规则、Agent 指令、Workflow 文档。
- 当前 `DEV_SPEC.md` 是否存在，是否为唯一完整规格事实源。
- 是否存在平行规格、架构、计划或代码事实源，以及它们是否冲突。
- 历史规格版本和架构版本是否被原地覆盖。
- API 契约事实来源，以及它们与 route / schema / service 的一致性。
- `docs/api-contracts.md` 是否存在；没有后端 API 时是否明确说明“不暴露 HTTP API / 暂无公开 API”。
- 技术架构事实来源，以及它们与模块边界、核心数据模型、运行时、状态机、消息事件和权限规则的一致性。
- `docs/architecture.md` 是否存在；简单项目是否明确说明哪些架构章节不适用。
- 前端 service / adapter / Raw 类型，以及它们与后端响应 schema 的一致性。
- 后端 schema / route / service 分层和测试目录。
- 开发者或 Agent 必须读取的环境、配置、部署文件。
- 需要与 UI 变化同步的用户手册、帮助页、FAQ、运行手册。
- 生成文档、历史文档或迁移文档是否仍是当前事实来源。
- 轻量模式是否出现升级信号：多模块、公共接口、迁移、多人/多 Agent、分阶段交付、历史恢复或复杂验收。

## 去重规则

- 跨项目通用工程规则放入 `docs/frontend-conventions.md`、`docs/backend-conventions.md` 或 `docs/api-contracts/00-conventions.md`。
- 项目特有路径、命令、端口、角色、领域、部署边界和流程例外放入 `AGENTS.md` 或对应文档的项目补充章节。
- 技术架构入口放入 `docs/architecture.md`，架构分册放入 `docs/architecture/`；不要把长篇架构说明塞进 `AGENTS.md`。
- Agent 变更监控统一放入技术架构文档，优先使用 `docs/architecture/10-evolution-rules.md`；不要拆出 `docs/agent-monitoring.md`。
- 接口字段表放入 `docs/api-contracts/<nn>-<domain>.md`，不要放在 `docs/api-contracts.md`。
- 前后端字段映射放入 API 领域契约或 service 文档，不放在页面组件里。
- 已有事实来源时使用链接，不复制长规则。

## 新项目启动清单

- 判断项目是前端、后端、全栈，是否带 Agent。
- 根据六维风险矩阵推荐 DEV_SPEC 模式，并记录用户最终选择。
- 完整模式逐章确认；轻量模式整体确认；不启用模式不创建 DEV_SPEC。
- 创建 `AGENTS.md`、`docs/architecture.md`、`docs/api-contracts.md` 三个基础入口。
- 模板按最全结构设计，但按项目实际情况启用章节和分册。
- `AGENTS.md` 放项目根目录。
- 其他文档全部放 `docs/`。
- 技术架构入口为 `docs/architecture.md`；复杂项目或多模块项目再启用 `docs/architecture/` 分册。
- API 契约入口为 `docs/api-contracts.md`。
- API 领域契约放 `docs/api-contracts/`；没有后端 API 时只在总纲说明暂无公开 API，不创建空领域分册。
- 填入已知技术栈事实：框架、包管理器、测试命令、lint/typecheck 命令、应用根目录。
- 对未决架构使用占位符，并明确标注需要决策。
- 如果 Agent 会修改仓库，必须在 `docs/architecture/10-evolution-rules.md` 中写入 Agent 变更监控，`AGENTS.md` 只保留阅读入口。
- 启用 DEV_SPEC 时，确认固定七章、固定小节编号和条件小节编号空缺规则。
- 完整模式或轻量升级时，确认规格版本、架构 changelog 和完整架构版本的判定。

## 架构演进与 Agent 监控清单

带 Agent 的项目应在技术架构文档中监控这些变更类别：

- API：路由路径 / 方法、schema 字段、枚举 / 状态、响应外层结构、错误结构、鉴权 / 权限、分页、上传、删除。
- 技术架构：系统模块边界、业务流程、核心数据模型、运行时、消息 / 事件、状态机、权限 / 资源隔离、观测诊断、架构 changelog。
- 前端接入：service 函数、adapter、Raw 类型、生成客户端、mock fixture、加载 / 空 / 错误态。
- 后端实现：schema / model、数据库迁移、service 规则、事务 / 并发规则、后台任务、缓存 key。
- 文档：API 契约、前端规范、后端规范、用户手册、帮助页、变更记录、运行手册。
- Agent 系统：`AGENTS.md`、Skill、Prompt、Workflow YAML、MCP 配置、自动化脚本、评审清单。
- 运行时：环境变量、配置文件、端口、CORS、启动脚本、Docker / Nginx / 部署文件。
- UI 系统：设计 token、主题变量、共享组件、布局原语、可访问性约定。
- 测试：fixture 数据结构、测试辅助端点、契约测试、快照、端到端流程。

## 最终质量门禁

产物满足以下条件才算完成：

- 模式推荐、风险理由和用户最终选择有记录。
- 固定七章和固定小节编号稳定，未通过动态重排隐藏不适用项。
- 规格版本、当前架构分册、架构 changelog 和完整架构版本的判定彼此独立且正确。
- 任务状态与验证状态分离；未确认任务没有标记为完成。
- 不存在空版本目录、空版本文件或没有独立基线的版本占位物。
- 已有文档未经审计和确认没有被覆盖、删除或静默改写。
- 新 Agent 能从 `AGENTS.md` 判断前端、后端、API、Agent 工作流改动前分别该读哪些文档。
- 新 Agent 能从 `AGENTS.md` 判断架构、数据模型、运行时、消息事件、状态机或权限隔离改动前该读哪些架构分册。
- 除 `AGENTS.md` 外，没有把规范文档放在项目根目录。
- 所有项目存在 `docs/architecture.md`；复杂项目的架构分册位于 `docs/architecture/`；架构 changelog 能记录重大设计变更。
- 所有项目存在 `docs/api-contracts.md`；无后端 API 的项目明确说明暂无公开 API。
- API 契约入口和领域契约路径符合 `docs/api-contracts.md` 与 `docs/api-contracts/` 约定。
- API 契约足以指导后端响应 schema 和前端 adapter 实现。
- 前端规范能防止静默 mock / 默认值掩盖真实接口问题。
- 后端规范明确 route / service / schema / test 边界。
- 架构演进规则列出了具体、容易漂移的文件和变更类别。
- 不存在独立的 `docs/agent-monitoring.md`；Agent 变更监控统一由技术架构文档管理。
- 通用规范中没有混入源项目的业务事实。
