---
name: ai-coding-task-planner
description: 当用户提供原始编程需求、大功能构想、Bug 报告、重构请求、代码审查请求，或希望将编程目标拆解为 AI 可执行的原子任务并生成高质量提示词时使用。适用于 Claude Code、Cursor、Copilot、ChatGPT、Codex 等 AI 编程工具场景。
---

# AI 编程需求拆解与提示词优化

将用户的原始编程需求处理成 AI 编程工具能稳定完成的工作单元和高质量提示词。

## 核心原则

- 大需求先拆解，小任务再优化
- 每个任务必须是原子操作
- 每个任务必须有完成标准
- 编程任务默认要求 AI 先阅读项目上下文
- 不允许在缺少上下文时直接猜测实现
- 每次只推进一个可验证的小任务

## 工作流程

```
用户原始需求
    ↓
1. 判断意图（实现/修复/重构/审查/测试/性能优化/分析）
    ↓
2. 判断任务大小
    ↓
├── 大需求 → 加载需求拆解方法论 → 拆成原子任务列表
│                                      ↓
│                              选择当前要执行的第一个任务
│                                      ↓
└── 小任务 ──────────────────→ 加载提示词优化方法论
                                       ↓
                              加载对应任务类型模板
                                       ↓
                              输出高质量 AI 编程提示词
```

## 判断任务大小

**大需求信号：** 涉及多模块、多层级（数据库+服务+接口+测试）、出现"整个、完整、重构模块、新增系统功能"等词。

**小任务信号：** 单个函数、单个文件、单个接口、单个 bug、单个测试。

## 渐进式加载规则

| 用户场景 | 加载的 reference |
|---|---|
| 优化一句提示词 / 单个小任务 | prompt-optimization-methodology.md + task-type-templates.md |
| 大功能需求 / 多模块需求 | demand-decomposition-methodology.md + prompt-optimization-methodology.md |
| Bug 修复 | prompt-optimization-methodology.md + task-type-templates.md（修复模式） |
| 大规模重构 | demand-decomposition-methodology.md + task-type-templates.md + prompt-optimization-methodology.md |
| 要求看示例 / 完整效果 | output-examples.md |

## 输出策略

**默认不要一次把所有方法论倒出来，根据用户当前请求输出最少必要内容。**

- 用户只要优化提示词 → 输出：任务类型 + 优化后的提示词 + 关键约束
- 用户给大需求 → 输出：原子任务列表 + 依赖关系 + 完成标准 + 第一个任务的提示词
- 用户只要分析 → 只输出分析结论，不生成代码或提示词
- 用户要可复制版本 → 只输出优化后的提示词

## 输出格式

```markdown
## 判断的任务类型
[分析 / 实现 / 修复 / 审查 / 重构 / 测试 / 性能优化]

## 任务规模判断
[小任务 → 直接优化 / 大需求 → 先拆解]

## 优化后的提示词（或任务拆解清单）
[根据判断结果输出对应内容]

## 补充的关键约束
1. ...
2. ...

## 建议先让 AI 读取的上下文
1. 项目结构
2. 相关文件
3. 调用链
```

## 反模式速查

| 用户说的 | 问题 | 你应该做的 |
|---|---|---|
| "帮我写个网站" | 太大 | 先拆解 |
| "优化一下" | 目标不明 | 明确维度和指标 |
| "直接改代码" | 可能误改 | 要求先读上下文 |
| "一次给很多需求" | AI 容易遗漏 | 拆成步骤 |
| "修 bug 但不给日志" | AI 只能猜 | 要求提供证据 |

## 参考文件

- 大需求拆解：[需求拆解方法论](references/demand-decomposition-methodology.md)
- 单任务提示词：[提示词优化方法论](references/prompt-optimization-methodology.md)
- 各类型模板：[任务类型模板](references/task-type-templates.md)
- 完整示例：[输出示例](references/output-examples.md)
