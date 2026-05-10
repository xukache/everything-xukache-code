# Discovery Playbook

Use this reference when the business context is vague, the user only provides a solution idea, or the algorithm/data boundary is unclear.

For the first intake response and stage gates, use `discovery-intake.md` first. This file is the question bank and conversation guide used after the intake mode is clear.

## Conversation Shape

Ask one small group of questions at a time. After each answer, summarize what changed and ask the next highest-impact question.

After each confirmed or temporarily accepted summary, record the useful context in `notes/requirements.md`. The notes file is the memory store for future iteration, not a polished PRD.

Only record confirmed facts as facts. Put unconfirmed content under assumptions or follow-up questions, following `discovery-intake.md`.

Prefer this order:

1. Problem and user
2. Current workflow
3. Desired outcome and success metric
4. External reference scan, when the product type has mature patterns
5. Scope and constraints
6. Rules, data, and exceptions
7. Interaction architecture: function relationships, role entry, menu structure, page responsibility, and key action placement
8. Prototype and PRD confirmation

## Requirement Memory Rules

Write to `notes/requirements.md` when any of these become clear:

- Target user or business role
- Current workflow or handoff
- Pain point and business cost
- Desired outcome or success metric
- Scope choice: must have / later / out of scope / risk
- External reference source, hidden need, MVP impact, and rejected expansion
- Business rule, exception, threshold, or permission
- Algorithm/data participation point
- Review decision, change request, or follow-up decision item

Do not wait until the end of the conversation to reconstruct these from memory. Keep entries short and factual; move polished content to `prd.md`, `flow.md`, and `dev-handoff.md` after confirmation.

## Question Bank

### Problem

- Who is the primary user of this feature?
- What job are they trying to complete?
- What is painful or inefficient in the current process?
- What happens if this problem is not solved?
- Is this a frequent problem, a high-risk problem, or both?
- Which role is most blocked today, and which role only needs visibility?
- What is the cost of the current workaround: delay, rework, missed handoff, quality risk, accountability risk, or manual coordination?

### Current Workflow

- How is this handled today?
- Which systems, spreadsheets, groups, or offline steps are involved?
- Where do handoffs happen?
- Which decisions are manual today?
- Which steps are most error-prone?
- What enters the workflow first, and what counts as finished?
- Where do tasks get returned, disputed, reassigned, or paused?

### Desired Outcome

- What should be faster, more accurate, more visible, or more controllable after launch?
- What business metric should improve?
- What user behavior proves this is useful?
- What would make the business team say "this is good enough for this iteration"?

### Scope

- What must be included in the first usable version?
- What can be mocked, manual, or deferred?
- What must explicitly not be built now?
- Which users or scenarios are out of scope?
- Which feature is only useful if another feature already exists?
- Which feature can be represented as a filter, status, action, or detail panel instead of a full page?

### Function Relationships

Use this when the user lists many desired functions.

- Which function creates the work queue?
- Which function consumes or completes the work queue?
- Which function changes object ownership?
- Which function changes object status?
- Which function only observes or summarizes results?
- Which function creates rules or templates used by other functions?
- What should happen after the user completes the primary action?
- Which data should flow back into the dashboard or report?

Summarize as:

```text
功能关系假设：
- 上游：
- 执行：
- 审核/确认：
- 返工/异常：
- 汇总/看板：
- 配置/规范：
```

Do not convert this into page design yet. First ask the user to confirm whether the relationship is correct.

### Menu and Page Architecture

Use this after MVP scope is confirmed and before prototype design.

- Which role should the product optimize for first?
- What should each role see first after login?
- Which modules deserve top-level navigation?
- Which items should be tabs, filters, batch actions, drawers, or detail sections instead of menu items?
- What names do users naturally use for these modules?
- Which menu order matches the daily workflow?
- Which page owns each critical action?
- Which screen should demonstrate the end-to-end flow in the prototype?
- How will the prototype be polished before review: local `impeccable` skill, `npx impeccable`, project script, or fallback only after install attempts fail?

Menu confirmation prompt:

```text
菜单结构草案：
- 一级菜单：
- 二级菜单/标签：
- 不进入菜单、只作为动作或筛选的内容：
- 默认首页：
- 需要确认的命名：
```

Ask the user to confirm naming and workflow order before theme selection.

### External Reference Scan

Trigger this scan when the request includes platform, system, tool, workbench, dashboard, workflow, data processing, algorithm review, annotation, audit, CRM, admin, or internal operations language.

Do not trigger it for a tiny copy change, a known single-page tweak, or a user who explicitly asks to avoid web research.

Search query templates:

```text
<domain> open source platform GitHub
<domain> workflow management open source
<domain> admin dashboard requirements
<domain> annotation review tool GitHub
<domain> docs permissions workflow status
```

Mature source signals:

- Official docs or README explain roles, workflows, states, permissions, and deployment boundaries.
- GitHub project has recent commits, releases, issues, stars, or active maintainers.
- Product docs show concrete workflows rather than only marketing claims.
- Multiple sources repeat the same pattern, such as review status, audit logs, import/export, queue assignment, or human override.

Minimum-boundary rules:

- Treat every external pattern as a candidate, not a requirement.
- Ask: "Does this protect the user's core job in v1?" If not, keep it out of MVP.
- Use the categories `可借鉴隐藏需求`, `待验证假设`, `不进入一期范围`, `对 MVP 的最小影响`, `来源链接`.
- Put advanced workflow builders, plugin marketplaces, multi-tenant billing, complex RBAC, full observability, automation engines, and production deployment details into later/out-of-scope unless the user already named them as core pain.
- When search creates more than five candidate needs, keep only the three that most directly protect the main workflow.

Summarize scan output:

```text
外部参考扫描：
- 来源：
- 可借鉴隐藏需求：
- 待验证假设：
- 不进入一期范围：
- 对 MVP 的最小影响：
- 来源链接：
```

### Rules and Constraints

- What are the required fields?
- Which fields are system-generated, user-entered, imported, or algorithm-generated?
- Are there approval rules, thresholds, quotas, time windows, or priorities?
- What permissions are needed?
- What should happen when data is missing, duplicated, late, or inconsistent?

### Algorithm Needs

- Is the algorithm recommending, predicting, ranking, detecting, generating, or deciding?
- What are the input data sources?
- What output should the user see?
- Does the user need confidence score, explanation, evidence, or reason tags?
- Can a human override the result?
- How should overrides be recorded?
- What offline metric and online business metric matter?
- What failure modes are unacceptable?

### Acceptance

- What must be true for business acceptance?
- What edge cases must be demonstrated?
- What data examples should appear in the prototype?
- Which flow should be shown in the demo?
- What questions should remain as open risks?

## Summarization Template

```text
需求摘要：
- 用户：
- 场景：
- 问题：
- 目标：
- 当前流程：
- 本次范围：
- 功能关系：
- 菜单/页面结构：
- 规则/约束：
- 算法参与点：
- 验收标准：
- 待确认/后续决策项：
```
