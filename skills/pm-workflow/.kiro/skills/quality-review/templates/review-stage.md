# 阶段 {{STAGE}} 审核报告

> 本报告由质量审核官根据阶段产物生成。脚本可生成草稿，最终结论由审核角色确认。

## 审核轮次

- 当前轮次：{{ROUND}}
- 最大轮次：3
- 结论：{{RESULT}}

## 评分

| 维度 | 分数 | 说明 |
|---|---:|---|
| 完整性 | {{COMPLETENESS}}/10 | {{COMPLETENESS_NOTE}} |
| 清晰度 | {{CLARITY}}/10 | {{CLARITY_NOTE}} |
| 一致性 | {{CONSISTENCY}}/10 | {{CONSISTENCY_NOTE}} |
| 可执行性 | {{EXECUTABILITY}}/10 | {{EXECUTABILITY_NOTE}} |
| 平均 | {{AVERAGE}}/10 | {{AVERAGE_NOTE}} |

## 仿真测试

{{SIMULATION}}

## 结构化对账

{{RECONCILIATION}}

## 一致性检查

本阶段检查下游产物是否明显改变了上游事实(蓝图、PRD、架构、UI 等)。若有改动而未按 craft-principles 第 4 条「重大变革协议」回写上游、或 `workflow-state.notes` 缺少决策说明、或蓝图 Mx-Fx 编号在阶段间不一致,本轮审核不通过。2.0 起不再要求每份产物固定 `## 文档同步检查` 表;以蓝图为锚做轻量化判断为主。

## 问题清单

{{ISSUES}}

## 返工建议

{{REWORK}}

## 下一步建议

{{NEXT_STEP}}
