# 标准文档模板

这些模板用于生成目标项目文档。替换占位符时，只使用目标项目自身事实。

## 引导语模板

~~~markdown
我会先判断项目类型和阶段，再读取现有文档与代码结构，最后生成或整理一套标准化项目启动文档。默认规则是：`AGENTS.md` 放在项目根目录；其他规范文档全部放在 `docs/` 下；技术架构总纲和 API 契约总纲是必须存在的事实源；具体分册和章节按项目实际复杂度选用。通用规范和项目专有补充会分层放置，避免重复维护和内容漂移。
~~~

## `AGENTS.md` 模板

~~~markdown
# 项目规范

> 单一事实来源：
> - 前端开发规范：`docs/frontend-conventions.md`
> - 后端开发规范：`docs/backend-conventions.md`
> - 技术架构总纲：`docs/architecture.md`
> - API 契约入口：`docs/api-contracts.md`
> - Agent 变更监控：`docs/architecture/10-evolution-rules.md`
>
> 本文件只保留顶层索引、Agent 阅读顺序和项目特有补充。不要在这里重复维护详细规则。

## 项目形态

- 类型：`<前端项目 | 后端项目 | 全栈项目>`
- 是否带 Agent 工作流：`<是 | 否>`
- 主要应用 / 服务：
  - `<应用名>`：`<路径>`，`<框架>`，`<用途>`

## 修改前必读

- 前端改动：先读 `docs/frontend-conventions.md` 和受影响页面 / service 文档。
- 后端或 API 改动：先读 `docs/backend-conventions.md`、`docs/api-contracts.md` 和对应领域契约。
- 架构、数据模型、运行时、消息事件、权限隔离或状态机改动：先读 `docs/architecture.md` 和对应架构分册。
- Agent 工作流改动：先读 `docs/architecture.md`、`docs/architecture/10-evolution-rules.md` 和受影响的 Skill / Prompt / Workflow 文件。

## 项目特有补充

1. 测试目录：
   - 前端：`<frontend-test-path>`
   - 后端：`<backend-test-path>`
2. 本地命令：
   - 安装：`<command>`
   - 测试：`<command>`
   - Lint / 类型检查：`<command>`
3. 文档同步：
   - 用户可见流程、字段名、筛选条件、异常提示、FAQ 变化时，同步更新 `<manual/help/docs>`。
4. 部署和运行：
   - `<端口、环境文件、运行时配置、静态资源、存储边界>`

## API 契约纪律

- 新增或修改 API 前，先更新对应契约文件。
- 前端 Raw 响应类型必须与后端 schema 字段逐字段对齐。
- mock 或默认值不得覆盖接口成功返回的空数据，也不得掩盖契约漂移。

## 技术架构纪律

- 新增或修改系统模块边界、核心数据结构、运行时、消息 / 事件、状态机、权限隔离、观测诊断或前端读模型前，先更新 `docs/architecture/` 对应分册。
- 架构级变更必须更新 `docs/architecture/<changelog>.md`。
- 如果架构文档、API 契约和当前代码冲突，应明确当前代码是实际表现，API 契约是接口事实源，架构文档是目标设计和迁移方向。

## Agent 变更监控

- Agent 变更监控由技术架构文档统一管理，详见 `docs/architecture/10-evolution-rules.md`。
- Agent 修改用户可见行为、API、配置、测试、工作流或设计系统时，必须按架构演进规则同步检查对应文档。
- 不创建独立的 `docs/agent-monitoring.md`。
~~~

## `docs/architecture.md` 模板

~~~markdown
# 技术架构总纲

本文是 `<项目名>` 的技术架构入口。后续涉及系统模块、业务流程、核心数据模型、运行时、消息 / 事件、权限隔离、前端架构、观测诊断或架构演进规则的开发，必须先阅读本文和对应分册。

## 文档状态

- 本目录描述 `<当前实现 | 目标架构 | 迁移方向>`，需要明确哪些内容已实现、哪些内容是规划。
- 本文件是所有项目必须存在的架构入口；简单项目可以只启用少量章节，但必须显式说明不适用项。
- API 接口事实源为 `docs/api-contracts.md` 和 `docs/api-contracts/`。
- 当架构文档、API 契约、代码实现冲突时：
  1. 当前代码决定实际表现。
  2. API 契约决定前后端接口对齐。
  3. 架构文档决定下一步设计和重构方向。
- 每次修改系统模块边界、核心数据结构、运行时、消息 / 事件、权限规则、状态机或观测诊断时，必须同步更新相关分册和架构 changelog。

## 阅读顺序

| 顺序 | 文档 | 目的 |
|---|---|---|
| 1 | `docs/architecture/01-product-business-flow.md` | 理解业务流程和状态机 |
| 2 | `docs/architecture/02-system-modules.md` | 理解系统模块与边界 |
| 3 | `docs/architecture/03-data-models.md` | 理解核心数据模型 |
| 4 | `docs/architecture/04-runtime-architecture.md` | 理解运行时、provider、外部服务或后台任务 |
| 5 | `docs/architecture/05-message-event-model.md` | 理解消息、上下文、事件、回调和可见性 |
| 6 | `docs/architecture/06-data-flow.md` | 理解关键数据流和状态推进 |
| 7 | `docs/architecture/07-permissions-isolation.md` | 理解权限、额度、租户、工作区或资源隔离 |
| 8 | `docs/architecture/08-frontend-architecture.md` | 理解前端页面、状态、读模型和渲染边界 |
| 9 | `docs/architecture/09-observability-diagnostics.md` | 理解日志、诊断、审计、恢复 |
| 10 | `docs/architecture/10-evolution-rules.md` | 理解架构演进和同步规则 |
| 11 | `docs/architecture/99-changelog.md` | 查看架构变更记录 |

## 核心原则

1. `<原则 1：例如用户可见数据与内部执行上下文分离>`
2. `<原则 2：例如运行时、provider、业务能力分离>`
3. `<原则 3：例如状态推进必须由后端或可信服务驱动>`
4. `<原则 4：例如结构化事件优先于不可解析日志>`
5. `<原则 5：例如权限和资源隔离先于功能便利>`

## 当前已知技术债

- `<技术债 1：当前实现与目标架构的差异>`
- `<技术债 2>`

## 维护规则

- 本文件只做索引和顶层原则，不放长篇模块细节。
- 模板按最全结构设计，实际项目按复杂度启用章节；未启用章节应说明“不适用 / 暂无”，不要静默缺失关键事实。
- 分册中出现的公开 API 字段必须与 `docs/api-contracts/` 保持一致。
- 架构变更必须更新 changelog。
- Agent 变更监控属于架构演进治理，统一写入 `docs/architecture/10-evolution-rules.md`；不单独创建 `docs/agent-monitoring.md`。
~~~

## `docs/architecture/<nn>-<domain>.md` 模板

~~~markdown
# <nn>. <架构领域名称>

本文定义 `<领域>` 的目标架构、当前实现差异和后续开发规则。

## 范围

- 包含：`<本分册覆盖的模块 / 数据 / 流程 / 运行时>`
- 不包含：`<明确不属于本分册的内容，避免职责漂移>`

## 当前实现

- `<当前代码或文档事实 1>`
- `<当前代码或文档事实 2>`

## 目标架构

```text
<用文本图、表格或 Mermaid 描述目标结构>
```

## 核心数据结构

```ts
type Example = {
  id: string;
  // 仅使用目标项目自身字段；模板中用占位符。
};
```

## 关键流程

1. `<步骤 1>`
2. `<步骤 2>`
3. `<步骤 3>`

## 约束和不变量

- `<不可违反的业务或技术约束>`
- `<权限 / 状态 / 数据一致性要求>`

## 失败、恢复和观测

- 失败场景：`<失败条件>`
- 恢复策略：`<重试 / 回滚 / 标记失败 / 人工处理>`
- 观测信号：`<日志 / 事件 / metrics / diagnostics>`

## 与其他文档的关系

- API 字段和错误码以 `docs/api-contracts/` 为事实源。
- 前端实现规则见 `docs/frontend-conventions.md`。
- 后端实现规则见 `docs/backend-conventions.md`。
- Agent 变更监控见 `docs/architecture/10-evolution-rules.md`。

## 变更记录要求

修改本分册涉及架构级决策时，必须同步更新 `docs/architecture/<changelog>.md`。
~~~

## `docs/architecture/<changelog>.md` 模板

~~~markdown
# 架构变更记录

> 返回总纲：`../architecture.md`

本文记录架构文档和重大设计决策变化。凡是影响系统模块边界、核心数据模型、运行时、消息 / 事件、权限隔离、状态机、前端架构或观测诊断的变更，都必须在此记录。

| 日期 | 变更内容 |
|---|---|
| `<YYYY-MM-DD>` | `<变更摘要：说明新增 / 修改 / 废弃的架构规则和影响范围>` |
~~~

## `docs/architecture/10-evolution-rules.md` 模板

~~~markdown
# 10. 架构演进与变更监控

本文定义架构演进、文档同步和 Agent 变更监控规则。Agent 监控不单独拆出 `docs/agent-monitoring.md`，统一在本文维护。

## 范围

- 系统模块边界、核心数据模型、运行时、消息 / 事件、状态机、权限 / 资源隔离、观测诊断。
- API 契约、前端接入、后端实现、测试 fixture、配置、部署和用户可见流程。
- Skill、Prompt、Workflow、MCP 配置、自动化脚本和 Agent 指令。

## 变更同步规则

- 修改系统模块边界、核心数据结构、运行时、消息 / 事件、状态机、权限隔离或观测诊断时，同步更新对应架构分册和架构 changelog。
- 修改 API 路由、schema、service、响应字段、错误结构、权限或分页规则时，同步更新 API 契约和前端 adapter / Raw 类型。
- 修改用户可见流程、字段名称、筛选条件、异常提示或帮助内容时，同步更新用户文档或相关说明。
- 修改环境变量、配置文件、启动脚本、端口、CORS、鉴权或部署边界时，同步更新运行说明和架构文档。
- 修改 Skill、Prompt、Workflow、MCP 配置或自动化脚本时，同步更新本文中的 Agent 监控范围。
- 如果本次改动不需要文档更新，交付说明中必须说明原因。

## Agent 必须监控的变更类别

- API：路由路径 / 方法、schema 字段、枚举 / 状态、响应外层结构、错误结构、鉴权 / 权限、分页、上传、删除。
- 技术架构：系统模块边界、业务流程、核心数据模型、运行时、消息 / 事件、状态机、权限 / 资源隔离、观测诊断、架构 changelog。
- 前端接入：service 函数、adapter、Raw 类型、生成客户端、mock fixture、加载 / 空 / 错误态。
- 后端实现：schema / model、数据库迁移、service 规则、事务 / 并发规则、后台任务、缓存 key。
- 文档：API 契约、前端规范、后端规范、用户手册、帮助页、变更记录、运行手册。
- Agent 系统：`AGENTS.md`、Skill、Prompt、Workflow YAML、MCP 配置、自动化脚本、评审清单。
- 运行时：环境变量、配置文件、端口、CORS、启动脚本、Docker / Nginx / 部署文件。
- UI 系统：设计 token、主题变量、共享组件、布局原语、可访问性约定。
- 测试：fixture 数据结构、测试辅助端点、契约测试、快照、端到端流程。
~~~

## `docs/api-contracts.md` 模板

~~~markdown
# API 契约总纲

> API 通用约定见 `docs/api-contracts/00-conventions.md`。
> 本文件只维护阅读顺序、领域索引和维护规则，不放具体接口字段表。
> 本文件是所有项目必须存在的接口事实源；没有后端 API 时，必须明确写明当前不暴露 HTTP API 或暂无公开 API。

## 阅读顺序

1. 先读 `docs/api-contracts/00-conventions.md`，确认通用接口约定和项目补充。
2. 再按业务领域阅读下面的契约文件。
3. 新增或调整接口时，更新对应领域文件，并在 `docs/api-contracts/99-changelog.md` 增加记录。

## 领域文件

| 领域 | 文件 | 内容 |
|---|---|---|
| 通用约定 | `docs/api-contracts/00-conventions.md` | 共享接口规则和项目补充 |
| `<domain>` | `docs/api-contracts/01-<domain>.md` | `<主要资源 / 接口>` |
| 变更记录 | `docs/api-contracts/99-changelog.md` | 契约变更 |

## 维护规则

- 本文件只做索引，不追加具体接口字段表。
- 模板按最全结构设计，实际项目按接口复杂度启用领域分册；没有后端 API 时不要创建空领域分册。
- 新接口先选择已有领域；没有合适领域时，再新增 `docs/api-contracts/<序号>-<domain>.md`。
- 如果代码、测试或注释引用契约章节，保持章节编号或锚点稳定。
- 每个接口契约必须包含方法、路径、鉴权 / 权限、查询参数、请求体、响应 data、字段表、错误场景；有前端时还必须包含前端字段映射说明。
~~~

## `docs/api-contracts/<nn>-<domain>.md` 模板

~~~markdown
# <领域>接口契约

> 返回总纲：`../api-contracts.md`
> 通用响应结构和共享规则见：`00-conventions.md`

## <section-id> <接口名称> `<METHOD /v1/resources>`

用途：`<一句话说明>`

鉴权 / 权限：`<角色、scope、当前用户边界>`

查询参数：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `<param>` | `<type>` | `<是 / 否>` | `<说明>` |

请求体：

```json
{
  "field_name": "value"
}
```

成功响应 `data`：

```json
{
  "id": "uuid",
  "name": "示例"
}
```

响应字段表：

| 字段 | 类型 | 可空 | 说明 |
|---|---|---|---|
| `id` | `string(UUID)` | 否 | 资源 ID |

错误场景：

| HTTP | 场景 | message 规则 |
|---|---|---|
| 400 | 参数错误 | 返回可读的校验错误 |
| 401 | 未认证 | 使用鉴权层错误消息 |
| 403 | 无权限 | 使用权限错误消息 |
| 404 | 资源不存在 | 返回资源不存在提示 |
| 409 | 状态或引用冲突 | 返回冲突原因 |

前端字段映射：

| 后端 schema 字段 | 前端 Raw 字段 | 前端模型字段 |
|---|---|---|
| `created_at` | `created_at` | `createdAt` |
~~~

## `docs/api-contracts/00-conventions.md` 模板

~~~markdown
# API 通用约定摘要

> API 契约总纲：`../api-contracts.md`

## 基础约定

- 业务接口使用版本化前缀，如 `/v1`。
- 路径使用 kebab-case 资源名词，动作由 HTTP Method 表达。
- 响应使用统一外层结构，如 `{ success, code, message, data, request_id }`。
- 列表返回 `{ items, total }`；空列表返回 `[]`，不返回 `null`。
- 请求和响应字段使用统一后端命名风格，通常为 `snake_case`。
- ID 使用字符串；时间使用 ISO 8601，除非字段明确说明只有日期精度。
- 错误响应应保留 request_id 或 trace_id，便于排障。

## 项目补充

- `<项目特有补充，如上传限制、权限边界、历史迁移说明>`

## 契约验证

- 后端 schema 字段与前端 Raw 响应类型必须完全一致。
- 前端 adapter 在 service 层统一转换字段命名和格式。
- 接口成功返回空结果时展示空态，不得使用 mock 覆盖。
- 请求失败时展示错误态，不得静默返回假数据。
~~~

## `docs/frontend-conventions.md` 模板

~~~markdown
# 前端开发规范

## 代码组织

- 数据请求和响应适配放在 service 层，不放在页面或组件中。
- 纯数据转换、计算和归一化逻辑从组件中抽离，便于复用和测试。
- 环境相关值放在环境变量或配置文件中，不写死在业务代码里。

## API 接入

- HTTP 拦截器统一解包响应外层结构。
- service 函数返回前端模型。
- Raw 响应类型必须逐字段镜像后端 schema。
- adapter 负责把后端字段名 / 格式转换为前端模型字段名 / 格式。
- 不得用 mock 或默认值覆盖接口成功返回的空数据，也不得掩盖关键字段缺失。

## UI 状态

- 数据驱动页面必须区分加载态、空态、错误态。
- 错误态不得伪装成成功空态。
- 指标类数据请求失败时使用中性占位，不显示误导性 0。

## 样式

- 共享颜色、间距、字体、语义状态使用设计 token 或主题变量。
- 当视觉常量重复出现时，应抽取为 token 或共享样式，避免散落硬编码。

## 测试

- 测试放在 `<frontend-test-root>`，按模块组织。
- 覆盖 adapter、状态转换、加载 / 空 / 错误态和关键用户流程。
~~~

## `docs/backend-conventions.md` 模板

~~~markdown
# 后端开发规范

## 代码组织

- 路由处理函数保持轻薄。
- 业务规则放在 service / use case 层。
- 请求和响应校验放在 schema / model 层。
- 配置、日志、鉴权、错误处理、响应包装集中管理。

## API 纪律

- 新接口必须先写契约，或在同一变更中补齐契约。
- 响应 schema 必须与契约字段名和类型一致。
- 错误响应使用统一状态码和响应结构。
- 权限边界和当前用户边界必须在 route / service 中明确体现。

## 数据与状态

- 状态机、枚举、幂等键、唯一约束和冲突行为必须落文档。
- 数据库迁移、schema 变化、种子数据和 API 契约保持同步。

## 测试

- 测试放在 `<backend-test-root>`，按模块组织。
- 覆盖接口契约、service 规则、权限、错误场景和迁移敏感行为。
~~~
