# {{PRODUCT_NAME}} UI 原型构建任务

## 任务原则

- 每个任务都是垂直切片，包含结构、样式、交互和验证。
- 每个任务完成后立即打开页面、执行交互、截图或记录验证结果。
- 当前任务验证通过后，才能进入下一个任务。

## Foundation

- [ ] UI-001 锁定原型技术基线和资源路径
  - 覆盖页面/功能：全部原型页面。
  - 创建/修改文件：`prototype/assets/`、`prototype/directions/index.html`。
  - 复用/新增：复用已确认 tokens，建立公共 CSS/JS/图标资源。
  - 验证：打开 `prototype/directions/index.html`，确认无 404、无控制台错误、公共样式生效。

- [ ] UI-002 实现应用外壳、导航和页面容器
  - 覆盖页面/功能：全部 P0 页面入口。
  - 创建/修改文件：`prototype/layout/`、`prototype/index.html`。
  - 复用/新增：新增或复用应用外壳、侧栏/顶栏、面包屑、内容容器。
  - 验证：在 desktop/tablet/mobile 视口确认导航可用、无横向滚动。

## Direction Demos

- [ ] UI-101 实现方向 A 首页 demo
  - 覆盖页面/功能：首屏、核心入口、关键状态。
  - 创建/修改文件：`prototype/directions/option-a.html`。
  - 验证：打开路径并截图，确认能体现方向 A 的视觉气质和核心任务。

- [ ] UI-102 实现方向 B 首页 demo
  - 覆盖页面/功能：首屏、核心入口、关键状态。
  - 创建/修改文件：`prototype/directions/option-b.html`。
  - 验证：打开路径并截图，确认和方向 A 有真实差异。

- [ ] UI-103 实现方向 C 首页 demo
  - 覆盖页面/功能：首屏、核心入口、关键状态。
  - 创建/修改文件：`prototype/directions/option-c.html`。
  - 验证：打开路径并截图，确认和方向 A/B 有真实差异；如不需要第三方向，记录原因。

## Core Flows

- [ ] UI-201 实现页面：`待填写页面名`
  - 覆盖功能编号：
  - 用户目标：
  - 创建/修改文件：
  - 复用/新增组件：
  - 覆盖状态：默认/加载/空/错误/成功/权限异常。
  - 验证：打开页面，按核心流程操作，截图并记录预期结果。

## Review

- [ ] UI-901 执行 Playwright 截图和控制台检查
  - 覆盖页面：方向 demo、`prototype/index.html`、所有 P0 页面。
  - 覆盖视口：B 端至少 `1280x800`、`1440x900`；非 B 端按目标设备覆盖。
  - 验证：截图保存到 `prototype/review/screenshots/`，控制台无阻塞错误。

- [ ] UI-902 执行 Impeccable 审查、修正和复查
  - 覆盖能力：critique/audit/adapt/layout/typeset/clarify/animate/harden/polish。
  - 修改文件：原型文件、`docs/prototype-review.md`。
  - 验证：每个问题都有处理结果或遗留说明。

## 文档同步检查

| 变更项 | 影响类型 | 是否影响上游事实 | 已检查文档 | 已同步文档 | 不需要同步原因 | 责任阶段 | 检查结论 |
|---|---|---|---|---|---|---|---|
| UI 构建任务 | 页面路径/交互/状态/验收 | 是/否 | `docs/prd.md`、`docs/handoff-prd.md`、`docs/tech-architecture.md`、`docs/ui-design.md`、`docs/handoff-ui.md` | 待填写 | 待填写 | design | 待确认 |
