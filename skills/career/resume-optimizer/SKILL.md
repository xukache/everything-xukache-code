---
name: resume-optimizer
description: 优化简历并准备面试表达。用户要求改进、重写、诊断、定制或从零创建简历/CV 时使用；用户需要将简历匹配到一个或多个 JD 时使用；用户提供项目、作品集、代码仓库、科研、实习或工作经历并希望提炼简历 bullet 时使用；用户存在转岗、经历弱、空窗、贡献不清、包装边界等简历风险时使用；用户希望基于简历准备面试沟通重点时使用。
---

# 简历优化器

将本 Skill 作为简历咨询 Harness 使用，而不是一次性的润色提示词。目标是引导用户从原始材料走到岗位定制简历和面试可讲的经历故事。

## 核心原则

- 从岗位匹配开始，而不是从文字润色开始。
- 改写前先建立事实底座。
- 用证据、数据、产出物和贡献边界支撑表达。
- 先做策略，再做改写。
- 在高影响决策前让用户确认。
- 从 JD 匹配、真实性和面试可讲性三个角度审查。
- 只修复最小必要片段，避免整份简历被无谓重写。

## 首次响应行为

如果用户材料不足，读取 `references/onboarding.md`，温和引导用户开始。不要要求用户一次性提供所有文档。告诉用户可以先发送任意已有材料：简历、JD、目标公司列表、项目笔记、代码仓库、作品集或职业困惑。

如果用户已经提供了足够材料，也要简短说明当前处于哪个阶段，然后继续推进。

## 工作区约定

当任务较复杂时，在本地使用清晰的工作区保存过程材料，通常为：

```text
resume-workspace/
  inputs/
  analysis/
  drafts/
  reviews/
  interview/
```

小型请求无需创建多余文件。多 JD、仓库较多或完整服务型任务，应使用文件保存状态。

## 阶段流程

### 阶段 0：初始化引导与任务分流

当材料不完整或用户直接调用 Skill 时，读取 `references/onboarding.md`。

先判断请求类型：

- 简历诊断；
- 简历重写；
- 针对 JD 定制；
- 多公司/多 JD 策略；
- 从零创建简历；
- 从项目或代码仓库提炼简历；
- 面试沟通辅导。

### 阶段 1：材料接收

读取 `references/intake.md`。

将已有材料整理为材料清单。必要时使用 `templates/material-inventory.md`。

### 阶段 2：JD 拆解

读取 `references/jd-analysis.md`。

为每个 JD 生成匹配矩阵。使用 `templates/jd-match-matrix.md`。

### 阶段 3：经历证据挖掘

读取 `references/evidence-mining.md`。

如果涉及代码仓库或作品集，同时读取 `references/repo-analysis.md`。

使用 `templates/evidence-bank.md` 建立经历证据库。

### 阶段 4：简历策略规划

读取 `references/resume-strategy.md`。

使用 `templates/resume-plan.md` 生成简历计划。

### 检查点 1：策略确认

完整改写简历前必须暂停，让用户确认策略。读取 `references/phase-guidance.md`，并使用 `templates/checkpoint-summary.md` 的检查点表达方式。

用户需要确认：

- 目标岗位优先级；
- 简历主叙事；
- 要重点强调的经历；
- 包装和真实性边界；
- 是否需要多版本简历。

### 阶段 5：简历改写

读取 `references/bullet-writing.md`。

基于已确认策略改写简历或目标章节。最强的岗位匹配证据必须放在黄金广告位。

如果用户需要生成完整可视化简历，或当前 skill 目录存在 `templates/resume-preview/index.html` 简历模板，读取 `references/resume-template.md`。先将改写后的内容写入 `templates/resume-preview/resume-content.md` 的结构化 Markdown，再用 `templates/resume-preview/index.html` 渲染预览。不要直接把用户真实信息硬编码进 HTML。

如果用户要求从 AI/RAG/MCP 项目或代码仓库提炼简历项目经历，可按需参考 `references/examples/modular-rag-mcp-project.md` 的拆解方式：技术亮点、话术方向、可量化角度。该文件是案例参考，不是通用事实库，不要把其中的项目数据直接套到用户经历上。

### 阶段 6：多视角审查

读取 `references/review-checklists.md`。

用三个视角审查：

1. JD 匹配审查；
2. 证据可信审查；
3. 面试可讲审查。

使用 `templates/resume-review.md`。

如果已生成可视化简历，同时审查 `templates/resume-preview/resume-content.md` 与 `templates/resume-preview/index.html` 渲染结果是否一致：字段是否缺失、项目顺序是否符合策略、黄金广告位是否放入最强证据、是否存在未脱敏示例信息。

### 阶段 7：最小切片修复

读取 `references/repair-policy.md`。

只修复最小失败单元。任务较复杂时，使用 `templates/repair-log.md` 记录关键修复。

### 检查点 2：最终简历确认

询问用户是否需要最终交付、针对某家公司微调、格式转换、继续修复或进入面试辅导。

### 阶段 8：面试表达辅导

读取 `references/interview-coaching.md`。

使用 `templates/interview-playbook.md` 准备面试表达。

## 引导规则

- 每个主要阶段开始时，简短告诉用户当前在做什么，以及会产出什么。
- 每个检查点必须列出需要用户确认的具体决策。可以给推荐方案，但不能悄悄替用户决定高影响事项。
- 如果用户中途补充新材料，先将其归入事实底座，再判断继续当前阶段还是回退到前一阶段。
- 如果用户只要求快速看一眼，执行压缩流程：诊断、最高优先级修改建议、一个示例改写片段。
- 如果用户要求完整服务，执行完整阶段流程。

## 参考文件路由

- 使用 `references/onboarding.md` 处理首次引导。
- 使用 `references/phase-guidance.md` 处理阶段提示和检查点提示。
- 使用 `references/intake.md` 处理材料收集和归一化。
- 使用 `references/jd-analysis.md` 处理 JD 拆解和招聘诉求判断。
- 使用 `references/evidence-mining.md` 处理 STAR/PAR 和经历提炼。
- 使用 `references/repo-analysis.md` 处理代码仓库和作品集分析。
- 使用 `references/resume-strategy.md` 处理结构、黄金广告位、模块排序和多版本策略。
- 使用 `references/bullet-writing.md` 处理 bullet 改写和结果导向表达。
- 使用 `references/resume-template.md` 处理 Markdown 内容源和 HTML 简历模板渲染。
- 使用 `references/examples/modular-rag-mcp-project.md` 作为 AI/RAG/MCP 项目经历拆解案例，只借鉴结构和提炼方式。
- 当存在弱匹配、空窗、转岗、频繁变动、贡献不清或过度包装风险时，使用 `references/risk-handling.md`。
- 使用 `references/review-checklists.md` 做质量审查。
- 使用 `references/repair-policy.md` 做局部修复。
- 使用 `references/interview-coaching.md` 做面试表达。

## 交付物

根据用户请求，交付以下一种或多种：

- 简历诊断报告；
- JD 匹配矩阵；
- 经历证据库；
- 简历策略计划；
- 改写后的简历或目标章节；
- `templates/resume-preview/resume-content.md` 驱动的 HTML 简历预览；
- 多 JD 简历版本；
- 审查发现和修复记录；
- 面试表达稿和高频追问。

最终回复应清楚说明改了什么、还有哪些不确定信息，以及用户投递前需要自行核实什么。
