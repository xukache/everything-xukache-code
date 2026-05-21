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
python .agents/skills/pm-workflow/scripts/review_stage.py --root . --stage <stage>
```

在源码仓库内运行：

```bash
python skills/pm/pm-workflow/scripts/review_stage.py --root <project-root> --stage <stage>
```

## 检查表

- 平均分是否 >= 8，且单项是否都 >= 6。
- 是否存在待补充、待办占位或空表。
- init 阶段是否已经在 `workflow-state.json` 中达到 `clarification.status=user_confirmed`、`clarification.concepts_aligned=true`，且 6 项澄清标准均完成。
- analyze 阶段是否为 `文档状态：final`，并且没有未回答的阻塞问题。
- 是否存在跨阶段新增范围。
- design 阶段是否为每个候选方向生成可打开的首页 demo，并提供 `prototype/directions/index.html` 预览索引。
- design 阶段是否提供 `docs/prototype-review.md`、`prototype/review/screenshots/`、Playwright 三视口截图和 Impeccable 审查修正记录。
- 三轮仍不通过时是否明确提醒风险。
