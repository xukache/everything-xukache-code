---
name: quality-review
description: "质量审核官使用(2.0):对阶段产物评分、仿真下游使用、核对蓝图编号传递,并产出审核报告。"
---

# 质量审核角色技能(2.0)

服务于本工作室的质量审核官角色。

## 工艺准则

贯穿全程遵守 craft-principles(详见 `references/craft-principles.md`):一次只抛一项、决策三件套、守边界、重大变革协议、一致性检查、可追溯。

## 输入

- 当前阶段产物
- `docs/workflow-state.json`
- 上游阶段文档(尤其是蓝图 `docs/feature-flow-layout.md`)

## 输出

- `docs/review-{stage}.md`
- 更新后的 `docs/workflow-state.json`

## 审核机制

1. 多维度评分:完整性、清晰度、一致性、可执行性。
2. 仿真测试:扮演下游角色验证是否能继续工作。
3. 结构化对账:蓝图功能编号 Mx-Fx 在 design / analyze / architect / plan 各阶段是否一致传递,无重新编号、无静默漂移。
4. 一致性兜底:2.0 起不再要求每份产物固定 `## 文档同步检查` 表;只要下游产物明显改变了上游事实(蓝图/PRD/架构/UI),就检查是否按 craft-principles 第 4 条「重大变革协议」回写上游、`workflow-state.notes` 是否记录决策说明。

## 脚本

在工作室根目录运行:

```bash
node .kiro/skills/pm-workflow/scripts/review_stage.js --root . --stage <stage>
```

stage ∈ `init | blueprint | design | analyze | architect | plan | deliver`。

## 检查表

- 平均分是否 >= 8,且单项是否都 >= 6。
- 是否存在待补充、待办占位或空表。
- init 阶段是否已经在 `workflow-state.json` 中达到 `clarification.status=user_confirmed`、`clarification.concepts_aligned=true`,且 8 项澄清标准均完成。
- blueprint 阶段是否五层(信息架构、核心流程、逐个页面骨架、逐个功能、逐个交互)逐层用户确认通过,且 Mx-Fx 编号在第 4 层定稿。
- analyze 阶段是否已清空 `docs/workflow-state.json.pending_user_questions`,并且没有未回答的阻塞问题;PRD 是否沿用蓝图 Mx-Fx 编号(无重新编号)。
- init 阶段 8 个判断锚点是否全部完成,尤其是高频真实需求、最值得先做的一段流程、Agent 能力、结果落点和最小可用 demo 边界。
- analyze 阶段是否基于高频真实需求和真实使用流程识别真需求与伪需求,P0 是否映射到蓝图第 2 层的高频场景和流程位置。
- design 阶段是否直接消费蓝图(信息架构来自第 1 层、流程来自第 2 层、页面骨架来自第 3 层、交互来自第 5 层),不再单独产出 `docs/ui-information-architecture.md`。
- design 阶段 UI 可见内容是否使用 emoji,主体字号是否低于 16px。
- design 阶段是否为每个候选方向生成可打开的首页 demo,并提供 `prototype/directions/index.html` 预览索引。
- design 阶段是否提供 `docs/prototype-review.md`、`prototype/review/screenshots/`、Playwright 三视口截图和 Impeccable 审查修正记录。
- architect 阶段是否在 analyze 之后(2.0 顺序),且映射表沿用蓝图 Mx-Fx 编号。
- plan 阶段是否为单文件 Kiro 风格实施计划,使用 `- [ ] 1. 任务名` checklist。
- plan 阶段每个编号任务是否包含 3-6 条具体动作、测试/验收动作和 `_需求: Mx-Fx, ..._` 追溯(沿用蓝图编号)。
- plan 阶段第一个编号任务是否锁定语言/框架版本、包管理器、依赖文件形态、脚手架命令、安装命令、启动命令和测试命令。
- plan 阶段每个 P0 `Mx-Fx` 是否出现在至少一个编号任务中,并且每个最小任务要求测试/验收通过后才能继续。
- 下游文档如改变上游事实,是否按 craft-principles 第 4 条「重大变革协议」回写上游源文档,并在 `workflow-state.json` notes 记录决策说明。
- 是否存在跨阶段新增范围(尤其下游静默引入蓝图未声明的功能或页面)。
- 三轮仍不通过时是否明确提醒风险。
