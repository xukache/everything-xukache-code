# Impeccable Polish Gate

Use this reference after an HTML prototype draft is created and before showing it to the user for prototype confirmation.

The goal is to make `impeccable` a real quality gate, not a best-effort note. If `impeccable` is unavailable, the agent must actively resolve the missing capability before falling back to manual review.

## Required Outcome

Before prototype delivery, produce a polish record in `notes/requirements.md`:

```markdown
## 原型打磨记录

- Impeccable 可用性：
- 执行方式：skill / npx impeccable / 项目脚本 / 人工降级
- 主动解决动作：
- 检查范围：
- 发现问题：
- 已修正：
- 未采纳建议及原因：
- 范围保护：未新增未经确认的业务需求 / 有新增风险并已回滚
```

## Availability Resolution

If `impeccable` appears unavailable, do not stop at "not installed." Try these steps in order:

1. Check the current available skill list for `impeccable`.
2. Check common local skill paths:
   - `C:\Users\<user>\.agents\skills\impeccable\SKILL.md`
   - `C:\Users\<user>\.codex\skills\impeccable\SKILL.md`
   - `<repo>/.agents/skills/impeccable/SKILL.md`
   - `<repo>/skills/impeccable/SKILL.md`
3. If a local `SKILL.md` exists, read it and follow its setup, preflight, critique, audit, polish, or product UI review instructions.
4. If no local skill exists and `skill-installer` is available, use it to install `impeccable`, then return to this gate.
5. If the project or environment supports the command, try the appropriate `npx impeccable` command or local wrapper.
6. If installation or command execution fails because of network, permissions, missing package manager, or unavailable tool support, record the exact blocker and continue with the manual fallback checklist below.

Do not ask the user to solve the installation first unless credentials, approvals, private registry access, or policy restrictions make it impossible for the agent to proceed.

## Choosing the Impeccable Mode

Pick the lightest applicable mode:

- `critique`: when the prototype exists and needs UX/design review before edits.
- `audit`: when accessibility, responsive behavior, performance, or technical UI quality is the main risk.
- `polish`: when the design direction is accepted and needs final refinement.
- `shape`: when the prototype structure still lacks a confirmed design brief; this should normally have happened before HTML generation.

For `pm-workflow`, the default after prototype generation is `critique` followed by targeted `polish` fixes. Do not use `craft` to introduce new feature scope.

## Scope Protection

Allowed changes:

- Visual hierarchy, spacing, alignment, density, and rhythm.
- Table, filter, form, drawer, modal, tab, status, and navigation clarity.
- Empty, loading, error, disabled, hover, focus, and active states.
- Responsive layout and text overflow.
- Accessibility, contrast, keyboard focus, and UX copy.
- Consistency with the confirmed design theme.

Not allowed:

- Adding new roles.
- Adding new workflow steps.
- Adding new business fields.
- Changing confirmed status rules.
- Changing the chosen design theme.
- Adding production API, backend, auth, or persistence logic.
- Replacing the confirmed menu architecture without user confirmation.

If a design review suggests an out-of-scope improvement, write it under `后续决策项`.

## Manual Fallback Checklist

Use this only after active resolution fails.

Check and record:

- Can the main workflow be completed from the prototype UI?
- Does each role have a clear entry point?
- Are menus, tabs, filters, actions, drawers, and detail pages used for the right job?
- Are primary and secondary actions visually distinct?
- Are status tags and state transitions understandable?
- Are tables readable at realistic density?
- Do labels match the user's business language?
- Is text free of overflow and overlap at common desktop widths?
- Are hover, focus, disabled, empty, error, and loading states represented where they matter?
- Is contrast sufficient for key text, controls, and status colors?
- Does the UI follow the confirmed theme's colors, type, spacing, radius, and component tone?
- Are there obvious AI-looking patterns: generic card grids, decorative gradients, meaningless hero areas, nested cards, or over-large headings inside dense tools?
- Did the polish avoid adding unconfirmed product scope?

## Stop Conditions

Do not deliver the prototype until one of these is true:

- `impeccable` ran and resulting fixes or decisions are recorded.
- A local `impeccable` skill was found and its relevant review instructions were followed.
- Installation or command execution was attempted, failed for a recorded reason, and the manual fallback checklist was completed.

Do not use "tool missing" as the only reason for skipping the polish gate.
