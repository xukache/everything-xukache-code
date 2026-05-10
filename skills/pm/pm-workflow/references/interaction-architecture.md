# Interaction Architecture

Use this reference after MVP scope is confirmed and before design theme selection or HTML prototyping.

The goal is to turn a list of functions into a usable product structure. A senior PM should not jump from "must-have features" to screens. First confirm how roles enter the system, how functions depend on each other, how data and states move, and where each action belongs in the interface.

## Core Rule

Do not treat functions as pages by default.

For every important function, decide whether it belongs as:

- A top-level menu item.
- A second-level menu item.
- A tab inside a page.
- A table action.
- A detail page section.
- A drawer or modal.
- A workbench primary action.
- A configuration item.
- A dashboard metric.
- A status or filter.

If this decision is unclear, pause and ask before prototyping.

## Required Inputs

Before creating an interaction architecture, collect or mark as assumption:

- Primary roles and their daily jobs.
- Current workflow and handoff points.
- Confirmed MVP scope.
- Key business objects and their lifecycle states.
- Main success path.
- Exception and rework paths.
- First prototype demo path.
- Any naming conventions users already use.

If three or more of these are missing, stay in discovery.

## Senior PM Reasoning Lenses

### 1. Role Entry Lens

For each role, answer:

```text
Role:
First screen after login:
Primary job:
Most frequent action:
Most urgent alert or queue:
What they should not see first:
```

Use this to avoid one generic dashboard that serves nobody well.

### 2. Function Relationship Lens

For each core function, answer:

```text
Function:
Upstream source:
Downstream consumer:
Creates or changes which object:
Creates or changes which status:
Related metrics:
Failure or exception path:
```

If a function has no upstream, downstream, status, metric, or user decision, it may be a later-phase feature or configuration detail.

### 3. Object Lifecycle Lens

Identify the product's main objects, then define their states.

```text
Object:
Status:
Owner:
Entry condition:
Allowed actions:
Exit condition:
Exception path:
```

For task, audit, annotation, order, ticket, case, review, or workflow products, this lens is mandatory.

### 4. Menu Architecture Lens

Menus should reflect user work, not internal implementation.

Decide:

- Default home page for each role.
- Top-level menu names.
- Menu order by daily workflow, not database object order.
- Which items are grouped.
- Which actions should not become menu items.
- Which names match the user's business language.

Menu naming rules:

- Prefer user task nouns: `我的标注`, `质检审核`, `任务分配`.
- Avoid vague containers: `管理中心`, `综合平台`, `基础配置`, unless they are truly needed.
- Avoid implementation names: `TaskEntity`, `WorkflowEngine`, `DatasetModule`.
- If two names are plausible, present both and ask the user which matches their team language.

### 5. Page Responsibility Lens

Each page should have one primary job.

```text
Page:
Primary user:
Primary job:
Main object:
Primary action:
Secondary actions:
Shown states:
Entry points:
Exit paths:
What does not belong here:
```

Use this to avoid crowded pages where dashboards, tables, forms, review tools, and settings all compete.

### 6. Action Placement Lens

Place actions where the user has enough context to make the decision.

Common placements:

- Create/import: page header or batch management page.
- Assign/reassign: list bulk action or task detail action.
- Continue work: role-specific queue or workbench.
- Submit/review/pass/reject: workbench or review detail.
- View reason/history: detail panel, drawer, or timeline.
- Configure rule/template: settings or project configuration.
- Export: list page, report page, or project detail, depending on scope.

If an action changes status or ownership, show its consequence before the user confirms.

## Interaction Architecture Output

Use this format before design theme selection:

```markdown
## 交互架构草案

### 1. 核心角色入口
| 角色 | 默认入口 | 主要任务 | 高频动作 | 需要提醒的队列 |
| --- | --- | --- | --- | --- |

### 2. 主流程链路
1. 
2. 
3. 

### 3. 功能关系
| 功能 | 上游 | 下游 | 改变的数据/状态 | 关联指标 |
| --- | --- | --- | --- | --- |

### 4. 菜单结构建议
| 菜单位置 | 菜单名称 | 页面职责 | 推荐理由 | 可选命名 |
| --- | --- | --- | --- | --- |

### 5. 页面职责
| 页面 | 主要用户 | 主要动作 | 关键状态 | 不放在这里的内容 |
| --- | --- | --- | --- | --- |

### 6. 关键动作位置
| 动作 | 推荐位置 | 触发条件 | 结果反馈 |
| --- | --- | --- | --- |

### 7. 状态流转
| 对象 | 状态 | 进入条件 | 可执行动作 | 下一状态 |
| --- | --- | --- | --- | --- |

### 8. 待用户确认
- 
```

## Confirmation Questions

Ask a small batch of high-impact questions. Do not ask every question below.

Good questions:

- Which role should the product optimize for first: manager, operator, reviewer, analyst, or end user?
- After login, what should that role see first to continue work without thinking?
- Which feature produces work for another feature?
- Which action should be available in bulk, and which must happen in a detail view?
- Should this item be a top-level menu, a tab, or an action inside another page?
- What does your team usually call this module?
- Which status transition is most likely to create rework or disputes?
- What is the one end-to-end workflow the prototype must demonstrate?

Avoid:

- "Do you like this IA?" without explaining tradeoffs.
- Asking users to design the whole menu from scratch.
- Presenting menu names without page responsibilities.
- Creating one page per function before checking workflow order.

## Stop Conditions

Stop before design theme selection when:

- The default role entry is unknown.
- The main workflow cannot be described as steps.
- Core functions have no upstream/downstream relationship.
- Menu names are still implementation terms.
- Critical actions do not have a placement.
- Object status flow is missing for a workflow-heavy product.
- The user has only confirmed scope, not interaction architecture.

## Example: Internal Annotation Platform

This is an example pattern, not a default requirement.

```text
Suggested top-level menu:
- 总览看板
- 项目与批次
- 任务分配
- 我的标注
- 质检审核
- 标注规范
- 人员管理

Relationship:
- 项目与批次 creates task batches.
- 任务分配 sends tasks into 我的标注 queues.
- 我的标注 submits results into 质检审核.
- 质检审核 passes tasks into completed state or returns them to 我的标注.
- 总览看板 reads counts and rates across the workflow.
```

Questions to confirm:

- Should managers start from `总览看板` or `任务分配`?
- Should annotators start from `我的标注` directly?
- Should reviewers review by batch, annotator, task type, or priority?
- Should returned tasks always go back to the original annotator?
- Should `项目与批次` and `任务分配` be separate menus or combined as `任务管理`?
