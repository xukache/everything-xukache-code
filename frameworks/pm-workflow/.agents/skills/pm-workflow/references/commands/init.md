# init 命令

当用户带着产品想法开始、输入 `$pm-workflow`，说“澄清需求”“需求澄清”，或给出无法匹配其他命令的模糊自然语言需求时，使用本命令。

## 负责角色

阶段 00 的需求澄清必须由当前主 agent 直接执行，不启动 `product_manager` 或任何其他子 agent 代问。主 agent 持有用户刚输入的产品想法、上下文、语气和补充材料，最适合判断哪些是真需求、哪些只是表达不完整。

用户明确确认“我理解得对”之前，禁止把需求整理成二手摘要交给子 agent 继续澄清。用户确认后，可以由主 agent 直接写入 `docs/project-config.md` 和 `docs/workflow-state.json`；如需调用 `product_manager` 辅助文档沉淀，只能传递完整用户原话、关键问答记录、未确认假设和待补材料，不得让子 agent 覆盖用户已确认的表达。

## 输入

- 用户的产品想法和附带材料。
- 如果已经存在，读取 `docs/project-config.md`。
- 如果已经存在，读取 `docs/workflow-state.json`。

## 必须执行的流程

1. 如果项目还没有初始化目录，提示用户运行，或由当前角色运行：
   `python .agents/skills/pm-workflow/scripts/scaffold_project.py --root . --name "<product name>" --cli auto`
   Claude Code 工作室使用：
   `python .claude/skills/pm-workflow/scripts/scaffold_project.py --root . --name "<product name>" --cli claude`
   如果当前是在源码仓库中生成框架，则使用：
   `python skills/pm/pm-workflow/scripts/scaffold_project.py --root frameworks/pm-workflow --name "<product name>" --cli auto`
2. 先输出欢迎语和理解复述：
   `🤖 AI产品开发工作室已就绪`
   `朋友你好！我是你的产品经理，会带着你一步步把想法变成现实。`
   然后用普通用户能听懂的话确认“我理解得对不对”。
3. 主 agent 基于当前对话上下文亲自执行需求澄清协议：每轮只问 3-5 个关键问题，必须覆盖谁最常用、用户真正的高频需求、打开产品的触发点、从开始到结束的真实使用流程、设备/平台、类似产品或反向参考、必须做和可以合并/后置/暂不做的功能。用户不用一次性全答，想到什么说什么即可。
4. 做术语与概念对齐：用户提到专业词、行业词、产品形态、技术词或容易多义的普通词时，先用白话复述你的理解，再请用户确认是不是同一个意思；你主动描述需求时，也要解释关键概念，不能默认用户和 AI 使用同一套定义。
5. 如环境允许，主动搜索 2-4 个类似产品作参考；如无法联网，说明无法实时搜索，并把本地经验示例标记为待确认。
6. 按 8 项澄清完成标准检查：产品给谁用、用户真正的高频需求、解决什么场景问题、用户想达成什么结果、用户从开始到结束的真实使用流程、首版平台与使用设备、MVP 必做和暂不做边界（包括功能整合和页面/模块减负原则）、无阻塞开放问题（包括关键术语和概念没有歧义）。
7. 只有 8 项达标、`clarification.concepts_aligned=true` 并且用户明确确认后，才将 `clarification.status` 写为 `user_confirmed`，`completion_criteria.high_frequency_need=true`、`completion_criteria.core_usage_flow=true`、`user_confirmation_required=false`，`recommended_next=analyze`；否则保持 `user_confirmation_required=true`，把缺口写入 `clarification.missing_context`、`clarification.terminology` 和 `pending_user_questions`。
8. 沉淀产品定位、目标用户、使用人群、高频真实需求、使用触发点、真实使用流程、页面访问逻辑约束、功能整合原则、平台类型、核心场景、参考产品、术语概念表、必须有功能、明确不要的内容和工作量粗估。
9. 写入或更新 `docs/project-config.md`。
10. 更新 `docs/workflow-state.json`，设置 `current_stage=init`，记录 `project-config.md` 产物，并把 `recommended_next` 设置为 `clarify init`、`review init` 或 `analyze`。

## 收尾引导

结束时如果用户尚未确认，继续围绕缺口提问；如果已确认，询问下一步要做什么：审核本阶段、修改项目配置，还是开始需求分析。
