# analyze 命令

当用户输入 `$pm-workflow analyze`、"开始分析需求"、"需求分析" 或类似意图时，使用本命令。

## 负责角色

必须委派 `.codex/agents/demand-analyst.toml` 中的 `demand_analyst` 子 agent 执行需求分析。产品经理负责保持对话节奏，并记录关键决策。

如果当前 Codex 环境无法启动子 agent，必须先向用户说明“本次无法委派 demand_analyst，将由当前会话按需求分析师角色执行”，然后再继续需求分析。不要静默降级。

## 输入

- `docs/project-config.md`
- 当前对话中用户补充的澄清信息

## 必须执行的流程

1. 执行四轮引导：用户角色与场景、功能模块、优先级与边界、规则与验收。
2. 为每个功能分配 `M{模块号}-F{功能号}` 格式的编号。
3. 将功能划分为 P0、P1 或 P2。
4. 明确记录不做项和范围边界。
5. 写入或更新 `docs/prd.md` 和 `docs/handoff-prd.md`。
6. 更新 `docs/workflow-state.json`，记录阶段产物，并把 `recommended_next` 设置为 `review analyze` 或 `architect`。

## 必须具备的追溯关系

`docs/prd.md` 必须包含追溯表，字段包括：功能编号、优先级、用户角色、用户故事、业务规则、验收信号、是否进入最小可行版本。

## 收尾引导

结束时询问用户：是否要先做需求审核、修改需求文档，还是开始技术架构设计。
