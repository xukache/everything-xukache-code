# 原型设计 Worker 标准

在 `pm-workflow` 阶段 3 使用本文档。目标是把已确认的方案架构转成全量可演示的 HTML 原型，而不是只展示一级页面或静态看板。

原型设计 worker 合并设计主题选择、HTML 原型生成和 impeccable 打磨。主题选择和打磨是内部步骤，不单独派发 worker，除非用户明确要求拆分。

## 主 PM 与原型设计 Worker 分工

- 主 PM：负责确认方案架构已通过、派发原型设计 worker、审核主题候选、暂停让用户确认设计方向、验收原型是否覆盖所有 must-have。
- 原型设计 worker：负责主题候选、样例预览路径、HTML 原型、多页面拆分、关键交互、PRD 浮标、mock 状态联动和 impeccable 打磨。
- 主 PM 不得让 worker 借设计发挥新增未经确认的角色、字段、流程或业务范围。

## 子 Agent 调度规则

每个产品迭代第一次进入原型设计阶段时，主 PM 必须新开真实原型设计 worker。阶段内补充、调整、返工时复用已启动的原型设计 worker，不再重复新开。

任务说明必须包含：

- 已确认的方案架构输出。
- 原型交互覆盖矩阵。
- 设计主题选择要求。
- 需要覆盖的 must-have 功能。
- 本阶段允许读取的 reference、assets 和 helper skills。
- 不允许修改 MVP 范围、技术架构、正式 API 或排期。

只有在当前工具环境不支持新开 worker，或用户明确要求不要新开时，才允许降级为同一模型内的角色化流程，并在 `notes/stage-workers.md` 记录原因：工具不支持 / 用户明确禁止 / 其他。若是阶段内调整，记录复用了哪个已启动 worker。

## 阶段引用白名单

原型设计 worker 只能读取以下输入：

- `references/prototype-design-worker-standards.md`。
- `references/design-theme-selection.md`。
- `references/prototype-interaction-standards.md`。
- `references/html-prd-template.md`。
- `references/impeccable-polish-gate.md`。
- 已确认的问题定义、需求清单、方案架构和原型交互覆盖矩阵。
- `assets/design-themes/**/examples.html` 和对应主题说明。
- 全局 `ui-ux-pro-max` skill。
- 全局 `impeccable` skill。

不得读取或套用以下阶段文档：

- 需求发现方法、需求是否值得做判断。
- 生产级 PRD、流程图 viewer、开发交接和最终交付 reference。
- 未经用户确认的范围扩展建议。

## Helper Skill 使用规则

| Helper skill | 何时使用 | 作用 | 是否必用 |
| --- | --- | --- | --- |
| `ui-ux-pro-max` | 原型布局、组件、表格、看板、响应式或可访问性需要补充时 | 补充 UX 和组件建议，不覆盖已选主题 | 需要补充时用 |
| `impeccable` | 原型初稿完成后、交付用户确认前 | 先执行 `impeccable audit`，再执行 `impeccable polish` | 必用；不可用时必须先同步/安装并记录主动解决过程 |

调用前必须先将 bundled 副本同步到全局 skills 目录，再按正常 skill 名称调用。

## 原型设计 Worker 必须输出

```markdown
## 原型设计 worker 输出

### 1. 设计方向确认表单
- 产品类型：
- 主用户：
- 核心工作流：
- 信息密度：
- 菜单/模块结构：
- 品牌/参考来源：
- 推荐主题：
- 需要用户确认的问题：

### 2. 候选主题
| 主题 | examples.html 路径 | 推荐理由 | 不适用风险 | 排序 |
| --- | --- | --- | --- | --- |

### 3. 原型文件计划
- 原型入口：prototype.html
- 是否拆多页面：
- prototype/ 页面清单：
- 每个页面对应的 must-have：

### 4. 原型交互覆盖复核
| Must-have 功能 | 原型页面 | 可点击路径 | 成功反馈 | 状态变化 | 异常反馈 | PRD 浮标 | 验收结论 |
| --- | --- | --- | --- | --- | --- | --- | --- |

### 5. Mock 数据与状态联动
- 关键对象：
- 初始状态：
- 用户动作后的状态变化：
- 跨页面可见变化：

### 6. impeccable 打磨记录
- 是否已同步到全局 skills：
- audit 执行方式：
- polish 执行方式：
- 发现的问题：
- 已修正：
- 未采纳建议：
- 未采纳原因：
- 是否新增业务范围：否
```

## 主 PM 验收门槛

主 PM 必须逐项检查：

- 少于 3 个候选主题，不通过。
- 没有展示或指向内置 `examples.html`，不通过。
- 用户未确认主题就生成正式原型，不通过。
- 只做一级页面或静态看板，不通过。
- 用 PRD 浮标或文字说明代替关键交互，不通过。
- 原型覆盖矩阵中的任一 must-have 无可点击路径，不通过。
- 单页承载不清楚但未拆多页面，不通过。
- 关键动作没有成功反馈、状态变化或异常反馈，不通过。
- 没有执行 impeccable，也没有主动定位/安装/降级记录，不通过。
- 原型打磨新增未经确认的业务范围，不通过。

## 用户确认输出

主 PM 给用户的原型确认输出必须包含：

- 原型入口路径。
- 多页面原型目录路径。
- 设计主题和用户确认结果。
- must-have 交互覆盖摘要。
- 关键异常/退回/无权限/冲突状态覆盖情况。
- impeccable 打磨结果。
- 需要用户重点点击确认的路径。
- 下一步：确认后才进入正式文档交付。
