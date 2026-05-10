# Discovery Intake

Use this reference during the first stage of `pm-workflow`, before creating MVP scope, prototype pages, PRD, or delivery folders.

The goal is to turn a vague idea or feature request into a confirmed product problem. Do not treat guesses as facts.

## Intake Modes

Choose the lightest mode that fits the user's input.

| Mode | When to use | Allowed output | Not allowed yet |
| --- | --- | --- | --- |
| Fuzzy idea | User gives a broad idea, example, or "I want a platform/tool" | Candidate understanding, assumptions, 3-5 clarification questions | Directory initialization, MVP scope, PRD, prototype |
| Feature request | User names features but not the underlying problem | Problem reframing, JTBD prompts, current workflow questions | Treating requested features as confirmed requirements |
| Evidence-backed request | User provides users, workflow, pain, data, or research | Problem statement draft, scope options, requirements notes | Final PRD or prototype before user confirms |

## First Response Rule

When the input is fuzzy, the first response should contain only:

1. What I think you might be asking for
2. What is still an assumption
3. The 3-5 highest-impact questions
4. What will happen after those answers

Do not initialize files or write `requirements.md` until either:

- The user explicitly asks to create the workspace or documents, or
- The problem definition has been confirmed.

## Four Lenses

Borrow these lenses from strong product discovery skills and use only what the situation needs.

### 1. Problem Statement Lens

Clarify the problem from the affected user's point of view.

```text
I am:
Trying to:
But:
Because:
This causes:
```

Quality checks:

- The user is specific enough to picture.
- "Trying to" is an outcome, not a screen or feature.
- "But" names the barrier.
- "Because" is a likely root cause, not only a symptom.
- Impact can be practical, emotional, operational, or business-facing.

Anti-patterns:

- "The problem is we need a dashboard."
- "The problem is there is no AI feature."
- "The problem is low efficiency" without who is blocked and where.

### 2. Jobs-to-Be-Done Lens

Use this when the user describes functions before the real task is clear.

```text
Functional job:
Current workaround:
Pain:
Cost of pain:
Desired gain:
Alternative solutions:
```

For internal/B2B tools, social and emotional jobs can be translated into work confidence and accountability:

- Who needs to look reliable, in control, or accountable?
- What mistake, delay, or blind spot are they trying to avoid?
- What would make them trust the workflow?

### 3. Evidence Lens

Separate facts from assumptions.

```text
Known facts:
User-provided evidence:
Assumptions:
Missing evidence:
Fast validation option:
```

Use a lightweight validation suggestion only when the direction is risky or unsupported. Keep it as an optional product validation step, not a development commitment.

Optional PoL probe prompt for high-risk assumptions:

```text
Risky assumption:
Smallest signal to test:
Fast probe:
Pass signal:
Fail signal:
Time limit:
```

Use this only when the problem or solution direction is uncertain enough that writing full PRD/prototype would likely create waste.

### 4. Delivery Readiness Lens

Before moving to MVP scope or prototype, check:

```text
Primary user:
Current workflow:
Core job:
Main barrier:
Expected outcome:
MVP boundary:
Out of scope:
Acceptance signal:
```

If three or more fields are missing, stay in discovery and ask questions.

## Requirements Note Rules

When writing `notes/requirements.md`, use these buckets:

```markdown
## 已确认事实

## 待验证假设

## 问题陈述草案

## JTBD / 真实任务

## 当前流程与替代方案

## 业务影响与成功信号

## 范围边界

## 后续澄清问题
```

Rules:

- Confirmed facts must come from user input, source material, or explicit user confirmation.
- Assumptions must be labeled as assumptions.
- Do not promote assumptions into PRD, MVP scope, or prototype behavior until confirmed.
- Keep the first notes short; the PRD is created later.

## Gate Checks

### Gate 1: Can summarize the problem?

Required:

- Affected user or role
- Job/outcome they are trying to achieve
- Barrier or pain
- Current workaround or current workflow

If missing, ask more questions.

### Gate 2: Can create MVP scope?

Required:

- Confirmed problem statement
- Primary user
- Must-have workflow
- Out-of-scope list
- At least one acceptance signal

If missing, do not produce `必须有 / 后置 / 不做 / 风险待确认`.

### Gate 3: Can create prototype?

Required:

- Confirmed MVP scope
- Key pages or workflow steps
- Main user actions
- Important states and exceptions
- Prototype design input from `ui-ux-pro-max`

If missing, stop before HTML.
