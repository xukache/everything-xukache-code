# 文档交付 Worker 标准

在 `pm-workflow` 阶段 4 和阶段 5 使用本文档。目标是把已确认原型和方案架构转成开发、测试和业务评审能真正使用的生产级产品文档，并完成最终交付归档。

文档交付 worker 合并 PRD、流程图、开发交接、HTML 阅读页和最终交付检查。它不替工程决定数据库、API、架构或排期。

## 主 PM 与文档交付 Worker 分工

- 主 PM：负责确认原型已通过、派发文档交付 worker、审核文档深度、检查 Markdown/HTML 一致性、确认没有越界输出工程方案。
- 文档交付 worker：负责生产级 `prd.md`、`flow.md`、`flow.html`、`dev-handoff.md`、HTML 阅读页、`final-delivery.md` 和最终索引一致性检查。
- 主 PM 不得接受只有章节名、空表、占位符或“待补充”的正式文档。

## 子 Agent 调度规则

每个产品迭代第一次进入文档交付阶段时，主 PM 必须新开真实文档交付 worker。阶段内补充、调整、返工时复用已启动的文档交付 worker，不再重复新开。

任务说明必须包含：

- 已确认的需求清单。
- 已确认的方案架构输出。
- 已确认的原型路径和原型交互覆盖矩阵。
- 本阶段允许读取的 reference 和 helper skills。
- 文档职责边界：不输出最终数据库设计、正式 API 契约、技术架构或开发排期。

只有在当前工具环境不支持新开 worker，或用户明确要求不要新开时，才允许降级为同一模型内的角色化流程，并在 `notes/stage-workers.md` 记录原因：工具不支持 / 用户明确禁止 / 其他。若是阶段内调整，记录复用了哪个已启动 worker。

## 阶段引用白名单

文档交付 worker 只能读取以下输入：

- `references/documentation-delivery-worker-standards.md`。
- `references/production-document-standards.md`。
- `references/flow-viewer-standards.md`。
- `references/artifact-standards.md`。
- `requirements-list.md`。
- `notes/requirements.md`。
- `notes/stage-workers.md`。
- 已确认原型和原型交互覆盖矩阵。
- 全局 `prd-development` skill。
- 全局 `user-story` skill。
- 全局 `epic-hypothesis` skill。
- 全局 `user-story-mapping` skill。

不得读取或套用以下阶段内容：

- 未确认的需求假设。
- 未经用户确认的原型变更建议。
- 工程实现偏好的数据库、API、架构或排期方案，除非用户明确要求进入研发实现。

## Helper Skill 使用规则

| Helper skill | 何时使用 | 作用 | 是否必用 |
| --- | --- | --- | --- |
| `prd-development` | 编写正式 PRD 前 | 检查 PRD 结构、问题、用户、方案、成功标准和风险 | 必用 |
| `user-story` | 写用户故事和 Gherkin 验收标准时 | 把关键需求转成开发和 QA 可验收表达 | 必用 |
| `epic-hypothesis` | 需要战略上下文、目标结果和假设时 | 说明为什么做、预期结果和验证方式 | 需要战略背景时用 |
| `user-story-mapping` | 需要把流程、活动和版本切片写清楚时 | 支撑流程拆解和版本边界 | 工作流型产品必用 |

调用前必须先将 bundled 副本同步到全局 skills 目录，再按正常 skill 名称调用。worker 必须记录“已用 / 未用 / 未用原因”。

## 文档交付 Worker 必须输出

```markdown
## 文档交付 worker 输出

### 1. 文档清单
| 文档 | 路径 | 状态 | 说明 |
| --- | --- | --- | --- |
| PRD | prd.md / prd.html |  |  |
| 流程图 | flow.md / flow.html |  |  |
| 开发交接 | dev-handoff.md / dev-handoff.html |  |  |
| 最终交付 | final-delivery.md / final-delivery.html |  |  |

### 2. Must-have 覆盖追踪
| 需求编号 | Must-have 功能 | 原型页面 | PRD 条目 | 流程图 | 开发交接 | 动作级验收 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |

### 3. PRD 完成度检查
- 问题证据：
- 用户/场景：
- 范围：
- 信息架构：
- 功能详规：
- 字段字典：
- 权限：
- 业务规则：
- 异常边界：
- 指标：
- 验收标准：
- 风险与开放问题：

### 4. 流程图完成度检查
- 主流程：
- 角色泳道/跨角色流程：
- 状态机：
- 异常/退回流程：
- 数据交接/算法参与流程：
- flow.html 是否离线渲染 SVG：
- 是否支持拖拽/缩放/重置/适配视图/源码切换：

### 5. 开发交接完成度检查
- 角色权限矩阵：
- 页面动作矩阵：
- 实体词汇表：
- 字段规则：
- 状态规则：
- 边界场景：
- 埋点建议：
- 用户故事：
- Gherkin 验收清单：

### 6. 最终交付检查
- README 链接：
- index.html 链接：
- Markdown/HTML 一致性：
- 孤立文件：
- 过期描述：
- 停止线：
```

## 主 PM 验收门槛

主 PM 必须逐项检查：

- PRD、流程图或开发交接只有章节名、空表或 `待补充`，不通过。
- 任一 must-have 缺字段、规则、权限、异常或验收标准，不通过。
- 文档没有对应原型路径或动作级验收，不通过。
- `flow.html` 只显示 Mermaid 源码、不显示可拖拽缩放画布，不通过。
- 有孤立文件、断链或过期描述，不通过。
- `requirements-list.md`、原型和正式文档范围不一致，不通过。
- 文档越界输出最终数据库/API/排期，除非用户明确要求，否则不通过。

## 用户确认输出

主 PM 给用户的正式交付输出必须包含：

- 交付索引路径。
- PRD、流程图、开发交接、最终交付说明路径。
- 每个 must-have 的覆盖确认摘要。
- 文档质量自检结果。
- 明确不包含的工程事项：数据库、正式 API、技术架构、排期。
- 后续决策项。
- 停止线：确认后归档；除非用户要求，不进入研发实现。
