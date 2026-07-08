# init 命令(2.0)

当用户带着产品想法开始、输入 `$pm-workflow`,说"澄清需求""需求澄清",或给出无法匹配其他命令的模糊自然语言需求时,使用本命令。

## 负责角色

阶段 00 的需求澄清必须由当前主 agent 直接执行,不派发 `product-manager` 或任何其他 subagent 代问。主 agent 持有用户刚输入的产品想法、上下文、语气和补充材料,最适合判断哪些是真需求、哪些只是表达不完整。

用户明确确认"我理解得对"之前,禁止把需求整理成二手摘要交给 subagent 继续澄清。用户确认后,可以由主 agent 直接写入 `docs/project-config.md` 和 `docs/workflow-state.json`;如需调用 `product-manager` 辅助文档沉淀,只能传递完整用户原话、关键问答记录、未确认假设和待补材料,不得让 subagent 覆盖用户已确认的表达。

## 工艺准则

贯穿全程遵守 [craft-principles.md](../craft-principles.md):一次只抛一项、决策三件套、守边界、重大变革协议、一致性检查、可追溯。

## 输入

- 用户的产品想法和附带材料。
- 如果已经存在,读取 `docs/project-config.md`。
- 如果已经存在,读取 `docs/workflow-state.json`。

## 必须执行的流程

1. 如果当前目录还不是工作室目录,提示用户先在终端运行 npm CLI 初始化:
   `pmflow init --ai auto --root . --name "<product name>"`
   Codex 工作室可显式使用:
   `pmflow init --ai codex --root . --name "<product name>"`
   Claude Code 工作室可显式使用:
   `pmflow init --ai claude --root . --name "<product name>"`
2. 先输出欢迎语和理解复述:
   `🤖 AI产品开发工作室已就绪`
   `朋友你好!我是你的产品经理,会带着你一步步把想法变成现实。`
   然后用普通用户能听懂的话确认"我理解得对不对"。
3. 主 agent 基于当前对话上下文亲自执行顾问式需求澄清:不要直接给完整方案,不要先推荐很多平台,每轮最多问 3 个问题。先判断当前最大不确定点,再围绕"解决什么问题、哪一段最值得先做、需要什么 Agent 能力、结果落到哪里、如何收束成最小可用 demo"追问。用户不用一次性全答,想到什么说什么即可。
4. 做术语与概念对齐:用户提到专业词、行业词、产品形态、技术词或容易多义的普通词时,先用白话复述你的理解,再请用户确认是不是同一个意思;你主动描述需求时,也要解释关键概念,不能默认用户和 AI 使用同一套定义。
5. 竞品或平台参考只在能帮助用户做取舍时使用;不要把参考产品、平台、技术路线提前展开成方案。如环境允许,可搜索 2-4 个类似产品作参考;如无法联网,说明无法实时搜索,并把本地经验示例标记为待确认。
6. 按 8 个判断锚点检查是否足够收束:产品给谁用、用户真正的高频需求、解决什么场景问题、用户想达成什么结果以及结果落点、用户从开始到结束的真实使用流程以及最值得先做的一段、首版平台与使用设备、最小可用 demo 必做和暂不做边界(包括能力合并、页面/模块减负和人工兜底原则)、无阻塞开放问题(包括关键术语和概念没有歧义)。
7. 只有 8 项达标、`clarification.concepts_aligned=true` 并且用户明确确认后,才将 `clarification.status` 写为 `user_confirmed`,`completion_criteria.high_frequency_need=true`、`completion_criteria.core_usage_flow=true`、`user_confirmation_required=false`,`recommended_next=blueprint`;否则保持 `user_confirmation_required=true`,把缺口写入 `clarification.missing_context`、`clarification.terminology` 和 `pending_user_questions`。
8. 沉淀产品定位、目标用户、使用人群、高频真实需求、使用触发点、真实使用流程、最值得先做的一段、Agent 能力边界、结果落点、最小 demo 闭环、页面访问逻辑约束、功能整合原则、平台类型、核心场景、参考产品、术语概念表、必须有功能、明确不要的内容和工作量粗估。**注意:init 阶段不输出页面清单与功能编号 Mx-Fx,这些由 `blueprint` 阶段五层递进产出。**
9. 写入或更新 `docs/project-config.md`。
10. 更新 `docs/workflow-state.json`,设置 `current_stage=init`,记录 `project-config.md` 产物,并把 `recommended_next` 设置为 `clarify init`、`review init` 或 `blueprint`。

## 收尾引导

结束时如果用户尚未确认,继续围绕缺口提问;如果已确认,询问下一步要做什么:审核本阶段、修改项目配置,还是进入 `blueprint`(五层递进梳理设计底稿,作为 design 的直接输入)。
