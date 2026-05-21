# init 命令

当用户带着产品想法开始、输入 `$pm-workflow`，说“澄清需求”“需求澄清”，或给出无法匹配其他命令的模糊自然语言需求时，使用本命令。

## 负责角色

必须启动 `.codex/agents/product-manager.toml` 中的 `product_manager` 子 agent 执行初始化。

如果当前 Codex 环境无法启动 `product_manager` 子 agent，必须停止初始化，不生成或修改 `docs/project-config.md` 和 `docs/workflow-state.json`，并提示用户在支持项目子 agent 调度的 Codex 运行方式中打开当前工作室目录后重试。

## 输入

- 用户的产品想法和附带材料。
- 如果已经存在，读取 `docs/project-config.md`。
- 如果已经存在，读取 `docs/workflow-state.json`。

## 必须执行的流程

1. 如果项目还没有初始化目录，提示用户运行，或由当前角色运行：
   `python .agents/skills/pm-workflow/scripts/scaffold_project.py --root . --name "<product name>"`
   如果当前是在源码仓库中生成框架，则使用：
   `python skills/pm/pm-workflow/scripts/scaffold_project.py --root frameworks/pm-workflow --name "<product name>"`
2. 先输出欢迎语和理解复述：
   `🤖 AI产品开发工作室已就绪`
   `朋友你好！我是你的产品经理，会带着你一步步把想法变成现实。`
   然后用普通用户能听懂的话确认“我理解得对不对”。
3. 执行需求澄清协议：每轮只问 3-5 个关键问题，覆盖设备/平台、特别想要的功能、类似产品或反向参考、自己用还是多人用。用户不用一次性全答，想到什么说什么即可。
4. 如环境允许，主动搜索 2-4 个类似产品作参考；如无法联网，说明无法实时搜索，并把本地经验示例标记为待确认。
5. 按 6 项澄清完成标准检查：产品给谁用、解决什么场景问题、用户想达成什么结果、首版平台与使用设备、MVP 必做和暂不做边界、无阻塞开放问题。
6. 只有 6 项达标并且用户明确确认后，才将 `clarification.status` 写为 `user_confirmed`，`user_confirmation_required=false`，`recommended_next=analyze`；否则保持 `user_confirmation_required=true`，把缺口写入 `clarification.missing_context` 和 `pending_user_questions`。
7. 沉淀产品定位、目标用户、平台类型、核心场景、参考产品、必须有功能、明确不要的内容和工作量粗估。
8. 写入或更新 `docs/project-config.md`。
9. 更新 `docs/workflow-state.json`，设置 `current_stage=init`，记录 `project-config.md` 产物，并把 `recommended_next` 设置为 `clarify init`、`review init` 或 `analyze`。

## 收尾引导

结束时如果用户尚未确认，继续围绕缺口提问；如果已确认，询问下一步要做什么：审核本阶段、修改项目配置，还是开始需求分析。
