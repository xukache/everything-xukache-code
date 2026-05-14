# architect 命令

当用户输入 `$pm-workflow architect`、"开始设计技术架构"、"技术架构" 或类似意图时，使用本命令。

## 负责角色

必须委派 `.codex/agents/tech-architect.toml` 中的 `tech_architect` 子 agent 执行技术架构设计。

如果当前 Codex 环境无法启动子 agent，必须先向用户说明“本次无法委派 tech_architect，将由当前会话按技术架构师角色执行”，然后再继续技术架构设计。不要静默降级。

## 输入

- `docs/prd.md`
- `docs/handoff-prd.md`
- 用户提供的技术约束或偏好

## 必须执行的流程

1. 设计前先检查需求文档是否存在歧义。遇到阻塞问题时交给产品经理澄清，不要自行猜测。
2. 使用五维度决策框架：平台类型、复杂度、数据规模、第三方集成、维护成本。
3. 输出技术选型、架构形态、数据库设计、接口清单、部署方案和本地开发说明。
4. 写入或更新 `docs/tech-architecture.md` 和 `docs/handoff-architecture.md`。
5. 更新 `docs/workflow-state.json`，记录阶段产物，并把 `recommended_next` 设置为 `review architect` 或 `design`。

## 必须具备的追溯关系

必须包含需求到架构的映射表：

- 功能编号
- 数据实体或数据表
- 字段
- 接口
- 部署或配置影响
- 开放技术风险

## 收尾引导

结束时询问用户：是否要先做架构审核、修改架构，还是开始界面与体验设计。
