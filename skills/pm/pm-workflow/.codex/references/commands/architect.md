# architect 命令

当用户输入 `$pm-workflow architect`、"开始设计技术架构"、"技术架构" 或类似意图时，使用本命令。

## 负责角色

必须启动当前 CLI 结构下的技术架构子 agent 执行技术架构设计：Codex 使用 `.codex/agents/tech-architect.toml`，Claude Code 使用 `.claude/agents/tech-architect.md`。

如果当前环境无法启动技术架构子 agent，必须停止技术架构设计，不生成或修改 `docs/architecture-options.md`、`docs/tech-architecture.md`、`docs/handoff-architecture.md` 和 `docs/workflow-state.json`，并提示用户在支持项目子 agent 调度的 CLI 中打开当前工作室目录后重试。

## 输入

- `docs/prd.md`
- `docs/handoff-prd.md`
- 用户提供的技术约束或偏好

## 必须执行的流程

1. 先输出阶段开场卡：当前用户情况、候选方案生成方式、为什么需要先选型、接下来产出什么。
2. 设计前先检查需求文档是否存在歧义。遇到阻塞问题时交给产品经理澄清，不要自行猜测。
3. 不得直接编写 `docs/tech-architecture.md` 正式架构方案；必须先生成 `docs/architecture-options.md`。
4. 至少提供 2-3 个技术架构候选方案，用小白能懂的话说明每个方案的适合场景、维护成本、风险和未来迭代影响。
5. 使用五维度决策框架比较候选方案：平台类型、复杂度、数据规模、第三方集成、维护成本。
6. 可以给第一推荐，但必须说明为什么不是其他方案；等待用户确认最终选择。
7. `docs/architecture-options.md` 选型确认状态为 `已确认` 后，才能输出技术选型、架构形态、数据库设计、接口清单、部署方案和本地开发说明。
8. 如架构设计发现需求、平台、范围、功能编号或技术约束需要调整，必须同步回写 `docs/prd.md` 和 `docs/handoff-prd.md`。
9. 写入或更新 `docs/tech-architecture.md` 和 `docs/handoff-architecture.md`。
10. 更新 `docs/workflow-state.json`，记录阶段产物和上游同步说明；选型未确认时把 `recommended_next` 设置为 `confirm architecture option`，正式架构完成后设置为 `review architect` 或 `design`。

## 必须具备的追溯关系

必须包含需求到架构的映射表：

- 功能编号
- 数据实体或数据表
- 字段
- 接口
- 部署或配置影响
- 开放技术风险

`docs/architecture-options.md` 必须包含：

- 2-3 个候选方案。
- 五维度对比。
- 第一推荐和不推荐其他方案的原因。
- 用户确认问题。
- 用户最终选择和确认原文。

## 收尾引导

选型未确认时只询问用户选择哪一版或需要补充什么约束，不进入正式架构。正式架构完成后询问用户：是否要先做架构审核、修改架构，还是开始界面与体验设计。
