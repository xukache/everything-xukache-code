# blueprint 命令

当用户输入 `$pm-workflow blueprint`、"梳理流程"、"做设计底稿"、"五层确认"、"梳理页面与流程" 或类似意图时,使用本命令。本阶段是 init 与 design 之间的桥梁,产出 UI 设计的直接输入。

## 负责角色

由产品经理主导(无单独子 agent):Codex 使用 `.codex/agents/product-manager.toml`,Claude Code 使用 `.claude/agents/product-manager.md`。如果当前环境无法启动产品经理子 agent,必须停止本阶段,不修改任何产物,并提示用户在支持项目子 agent 调度的 CLI 中打开当前工作室目录后重试。

## 输入

- `docs/project-config.md`(已确认的产品定位、目标用户、高频真实需求、首版平台)
- `docs/workflow-state.json`(`clarification.status` 必须为 `user_confirmed`)
- 当前对话中用户补充的澄清信息

## 方法论

按 [blueprint-method.md](../blueprint-method.md) 五层递进法执行。贯穿全程遵守 [craft-principles.md](../craft-principles.md):一次只抛一项、决策三件套、守边界、重大变革协议、一致性检查、可追溯。

## 必须执行的流程

1. **前置检查**:确认 `clarification.status=user_confirmed` 且 `concepts_aligned=true`。未确认时回到 `init` 不开始本阶段。
2. **阶段开场卡**:用普通用户能听懂的话说明会按五层递进帮 ta 把产品结构敲定;接下来产出 `docs/feature-flow-layout.md`,作为 UI 设计的直接输入。
3. **第 1 层:信息架构**——和用户确认页面清单、给谁用、全局导航、跳转地图;每条决策一句**为什么**。
4. **第 2 层:核心流程**——把第 1 层的页面串成端到端流程,标出关键卡点。
5. **第 3 层:逐个页面**——每页的骨架、布局选型(带理由)、模块、四态。
6. **第 4 层:逐个功能**——每个功能的输入/处理/输出/异常/MVP边界,功能编号 `M{模块号}-F{功能号}`;数值待定项标"待定",不编造。
7. **第 5 层:逐个交互**——每个交互点的触发/主流程/异常,加全局异常态。
8. **每层逐项确认**:层内一次只抛一项给用户拍板,确认后落盘 `docs/feature-flow-layout.md` 对应小节;前一层不通过不进下一层。
9. **重大变革处理**:用户在中后层提出方向性改动时,先走 craft-principles 第 4 条「重大变革协议」五步,再决定要不要改;不直接顺手改。
10. **更新 `docs/workflow-state.json`**:记录阶段产物 `docs/feature-flow-layout.md` 与 `recommended_next=design`。

## 产物

`docs/feature-flow-layout.md`,包含以下章节(对应五层递进):

- 主骨架(产品形态、核心交互范式、关键约束)
- 一·五:信息架构(第 1 层定稿)
- 二:核心流程(第 2 层定稿)
- 三:功能清单(频次标注)
- 四:页面/区域划分(第 3 层定稿)
- 五:核心概念在各环节的调用与呈现
- 六:功能规则与边界(第 4 层定稿)
- 七:高频路径的丝滑设计取舍
- 八:交互逻辑与异常态(第 5 层定稿)
- 九:待确认 / 开放问题

## 收尾引导

完成后询问用户:审核蓝图、修改某一层,还是进入 `design`(界面与高保真原型)。
