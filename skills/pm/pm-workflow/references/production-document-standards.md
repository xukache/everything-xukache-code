# Production Document Standards

Use this reference when creating `prd.md`, `flow.md`, `dev-handoff.md`, and their HTML reading pages after the prototype has been confirmed.

The goal is product-grade detail: enough for engineering, QA, design, and business stakeholders to implement and verify the work without guessing product intent. These documents still stop before engineering ownership. Do not define final database schema, final API contracts, technology choices, sprint commitments, or architecture unless the user explicitly changes the task.

`pm-workflow` bundles method helper skills under `subskills/`. When more structure is needed, read the bundled copies before falling back to user-installed skills:

- `subskills/prd-development/SKILL.md` for PRD depth and requirement structure.
- `subskills/user-story/SKILL.md` for user stories and Gherkin acceptance criteria.
- `subskills/epic-hypothesis/SKILL.md` for strategic context, outcome, and validation framing.
- `subskills/user-story-mapping/SKILL.md` for workflow decomposition and release slice thinking.

These subskills inform the product document method; the final output must still follow the standards in this file.

## Production-Grade Completion Rule

A formal document is not complete if it only contains headings, placeholders, or generic bullets.

Before delivery, each confirmed requirement must be traceable across:

- Problem or user need.
- Screen, workflow step, or system behavior.
- Data or field involved.
- Business rule or permission rule.
- Acceptance criterion.
- Open decision or explicit out-of-scope note, if unresolved.

If a detail is unknown, write it as a follow-up decision item with owner or impact. Do not leave `待补充`, empty tables, or vague text such as `优化体验`.

## PRD Minimum Standard

`prd.md` must include:

1. Executive summary: problem, target users, solution direction, expected impact.
2. Problem evidence: current workflow, pain, cost, user/business evidence, assumptions.
3. Target users and scenarios: primary/secondary roles, jobs-to-be-done, entry points.
4. Strategic context: business goal, why now, MVP principle, success signal.
5. Scope: must-have, later, out of scope, risk to confirm, with reasons.
6. Information architecture: menus, pages, page responsibilities, primary actions.
7. Core workflows: happy path, review/approval path, exception path, manual fallback.
8. Functional requirements: one subsection per feature or page.
9. Field dictionary: name, meaning, source, required, validation, owner, display/edit surface.
10. Permissions: role capability matrix.
11. Business rules and status rules: triggers, guards, side effects, audit needs.
12. Data and algorithm requirements: input, output, explainability, confidence, override, fallback, if applicable.
13. Metrics and analytics: primary, secondary, guardrail metrics, suggested events.
14. Non-functional product requirements: usability, accessibility, performance expectation, auditability, security/privacy notes from a product perspective.
15. User stories and acceptance criteria: Mike Cohn story format plus Gherkin scenarios for build-critical behavior.
16. Dependencies, risks, mitigations.
17. Open questions and follow-up decisions.

## Functional Requirement Detail

Each functional requirement should use this shape:

```markdown
### FR-<number>: <requirement name>

- 用户/角色：
- 目标：
- 入口：
- 前置条件：
- 触发动作：
- 系统响应：
- 字段与数据：
- 权限规则：
- 状态变化：
- 异常/边界：
- 验收标准：
- 关联页面/原型：
- 关联埋点：
```

## Field Dictionary Detail

Use a table like:

```markdown
| 字段 | 含义 | 来源 | 必填 | 校验/口径 | 可见角色 | 可编辑角色 | 所在页面 |
| --- | --- | --- | --- | --- | --- | --- | --- |
```

Do not replace field rules with "按实际情况处理." If the rule is unresolved, write what decision is needed and why it affects development.

## User Story Detail

Use Mike Cohn format:

```markdown
### US-<number>: <summary>

- As a <role>
- I want to <action>
- so that <outcome>

#### Acceptance Criteria

- Scenario: <name>
- Given <precondition>
- When <action>
- Then <observable result>
```

Each critical page action should have at least one acceptance scenario.

## Flow Document Minimum Standard

`flow.md` must include Mermaid source for:

- Main end-to-end workflow.
- Role swimlane or cross-role sequence flow.
- Object status lifecycle, preferably `stateDiagram-v2`.
- Exception, return, rejection, or rework path.
- Data handoff or algorithm participation flow, if relevant.

Each diagram must have:

- Purpose.
- Mermaid source.
- Key rule notes.
- Status or decision table when needed.

## Development Handoff Minimum Standard

`dev-handoff.md` must include:

1. Product goal and MVP boundary.
2. Role and permission matrix.
3. Page/action matrix.
4. Requirement-level entity glossary, not final database schema.
5. Field rules and validation summary.
6. Status and workflow rules.
7. Error, empty, loading, disabled, no-permission, and conflict states.
8. Analytics/event suggestions.
9. User stories and Gherkin acceptance checklist.
10. QA scenarios and demo script.
11. Dependencies, risks, follow-up decisions.

## HTML Reading Page Standard

HTML reading pages should make the Markdown easier to review, not replace it.

- `prd.html` and `dev-handoff.html` should provide a structured reading version or a clearly organized generated companion.
- `flow.html` must render diagrams visually; source code is available only through a toggle or source panel.
- HTML pages must link back to Markdown source and `index.html`.

## Quality Gate

Before final delivery, check:

- No `待补充` remains in formal documents after review passes.
- No empty requirement tables remain.
- Each must-have feature has fields, rules, and acceptance criteria.
- Each important status has owner, entry condition, exit condition, and allowed actions.
- Each page has purpose, primary user, primary action, empty/error/no-permission behavior.
- `dev-handoff.md` is useful to engineering without becoming final technical architecture.
- Open questions are clearly separated from confirmed behavior.

## Anti-Patterns

- A PRD that names pages but does not describe behavior.
- A flow document that only contains one happy-path diagram.
- A handoff that says "开发自行处理" for core product rules.
- Acceptance criteria that are not observable.
- HTML pages that show Mermaid code instead of rendered diagrams.
- Formal documents full of placeholders after user confirmation.
