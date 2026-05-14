# init 命令

当用户带着产品想法开始、输入 `$pm-workflow`，或给出无法匹配其他命令的模糊自然语言需求时，使用本命令。

## 负责角色

必须委派 `.codex/agents/product-manager.toml` 中的 `product_manager` 子 agent 执行初始化。

如果当前 Codex 环境无法启动子 agent，必须先向用户说明“本次无法委派 product_manager，将由当前会话按产品经理角色执行”，然后再继续初始化。不要静默降级。

## 输入

- 用户的产品想法和附带材料。
- 如果已经存在，读取 `docs/project-config.md`。
- 如果已经存在，读取 `docs/workflow-state.json`。

## 必须执行的流程

1. 如果项目还没有初始化目录，提示用户运行，或由当前角色运行：
   `python .agents/skills/pm-workflow/scripts/scaffold_project.py --root . --name "<product name>"`
   如果当前是在源码仓库中生成框架，则使用：
   `python skills/pm/pm-workflow/scripts/scaffold_project.py --root frameworks/pm-workflow --name "<product name>"`
2. 用普通用户能听懂的话询问 5 个初始化问题。想法还模糊时，不要一次性追问所有细节。
3. 沉淀产品定位、目标用户、平台类型、核心场景、参考产品、必须有功能、明确不要的内容和工作量粗估。
4. 写入或更新 `docs/project-config.md`。
5. 更新 `docs/workflow-state.json`，设置 `current_stage=init`，记录 `project-config.md` 产物，并把 `recommended_next` 设置为 `review init` 或 `analyze`。

## 收尾引导

结束时询问用户下一步要做什么：审核本阶段、修改项目配置，还是开始需求分析。
