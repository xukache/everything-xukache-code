---
name: quality-review
description: "质量审核官使用：对阶段产物评分、仿真下游使用、核对追溯关系，并产出审核报告。"
---

# 质量审核角色技能

服务于本工作室的质量审核官角色。

## 输入

- 当前阶段产物
- `docs/workflow-state.json`
- 上游阶段文档

## 输出

- `docs/review-{stage}.md`
- 更新后的 `docs/workflow-state.json`

## 审核机制

1. 多维度评分：完整性、清晰度、一致性、可执行性。
2. 仿真测试：扮演下游角色验证是否能继续工作。
3. 结构化对账：需求功能编号到架构、界面、任务的映射。

## 脚本

在框架目录内运行：

```bash
node .claude/skills/pm-workflow/scripts/review_stage.js --root . --stage <stage>
```

## 检查表

- 平均分是否 >= 8，且单项是否都 >= 6。
- 是否存在待补充、待办占位或空表。
- init 阶段是否已经在 `workflow-state.json` 中达到 `clarification.status=user_confirmed`、`clarification.concepts_aligned=true`，且 8 项澄清标准均完成。
- analyze 阶段是否已清空 `docs/workflow-state.json.pending_user_questions`，并且没有未回答的阻塞问题。
- init 阶段 8 个判断锚点是否全部完成，尤其是高频真实需求、最值得先做的一段流程、Agent 能力、结果落点和最小可用 demo 边界。
- analyze 阶段是否基于高频真实需求和真实使用流程识别真需求与伪需求，P0 是否映射到高频场景和流程位置。
- design 阶段 UI 可见内容是否使用 emoji，主体字号是否低于 16px。
- design 阶段页面访问逻辑是否来自真实使用流程，页面和模块是否避免堆叠并记录整合理由。
- plan 阶段是否为单文件 Kiro 风格实施计划，使用 `- [ ] 1. 任务名` checklist。
- plan 阶段每个编号任务是否包含 3-6 条具体动作、测试/验收动作和 `_需求: ..._` 追溯。
- plan 阶段第一个编号任务是否锁定语言/框架版本、包管理器、依赖文件形态、脚手架命令、安装命令、启动命令和测试命令。
- plan 阶段每个 P0 `Mx-Fx` 是否出现在至少一个编号任务中，并且每个最小任务要求测试/验收通过后才能继续。
- 下游文档如改变上游事实，是否同步回写上游源文档，并在 `workflow-state.json` notes 记录同步说明。
- 是否存在跨阶段新增范围。
- design 阶段是否为每个候选方向生成可打开的首页 demo，并提供 `prototype/directions/index.html` 预览索引。
- design 阶段是否提供 `docs/prototype-review.md`、`prototype/review/screenshots/`、Playwright 三视口截图和 Impeccable 审查修正记录。
- 三轮仍不通过时是否明确提醒风险。
