# Impeccable 原型打磨关卡

在 HTML 原型初稿完成后、交付用户做原型确认前使用本文档。

目标是让 `impeccable` 成为真实质量门，而不是可有可无的备注。如果 `impeccable` 不可用，执行者必须主动解决缺失能力，再考虑人工降级审阅。

## 必须产出

原型交付前，必须在 `notes/requirements.md` 中记录打磨结果：

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

## 可用性处理顺序

如果看起来无法使用 `impeccable`，不要停在“未安装”。按顺序尝试：

1. 先检查 bundled 版本：`skills/pm/pm-workflow/subskills/impeccable/SKILL.md`。
2. 如果存在，读取它，并按其中的 setup、preflight、critique、audit、polish 或产品 UI 评审说明执行。相对引用和脚本从 `subskills/impeccable/` 解析。
3. 检查当前会话可用 skill 列表中是否有 `impeccable`。
4. 检查常见本地路径：
   - `C:\Users\<user>\.agents\skills\impeccable\SKILL.md`
   - `C:\Users\<user>\.codex\skills\impeccable\SKILL.md`
   - `<repo>/.agents/skills/impeccable/SKILL.md`
   - `<repo>/skills/impeccable/SKILL.md`
5. 如果找到本地 `SKILL.md`，读取并按其 setup、preflight、critique、audit、polish 或产品 UI 评审说明执行。
6. 如果 bundled 和本地版本都不存在，且当前环境提供 `skill-installer`，先尝试安装 `impeccable`，再回到本关卡。
7. 如果项目或环境支持命令执行，尝试合适的 `npx impeccable` 命令或本地 wrapper。
8. 如果 bundled 解析、安装或命令执行因为网络、权限、包管理器缺失或工具不可用而失败，记录明确阻塞原因，再使用下面的人工降级清单。

除非需要用户提供凭据、审批、私有源权限或受策略限制，否则不要先要求用户自己解决安装问题。

## 选择 Impeccable 模式

选择最轻但足够的模式：

- `critique`：原型已经存在，需要先做 UX/设计评审。
- `audit`：主要风险是可访问性、响应式、性能或技术 UI 质量。
- `polish`：设计方向已经确认，只需要最终打磨。
- `shape`：原型结构仍缺少确认过的设计 brief；正常情况下这一步应在 HTML 生成前完成。

对 `pm-workflow`，原型生成后的默认方式是先 `critique`，再做有针对性的 `polish` 修正。不要用 `craft` 新增功能范围。

## 范围保护

允许修正：

- 视觉层级、间距、对齐、密度和节奏。
- 表格、筛选器、表单、抽屉、弹窗、标签页、状态和导航清晰度。
- 空态、加载中、错误、禁用、hover、focus 和 active 状态。
- 响应式布局和文本溢出。
- 可访问性、对比度、键盘焦点和 UX 文案。
- 与已确认设计主题保持一致。

不允许：

- 新增角色。
- 新增工作流步骤。
- 新增业务字段。
- 改变已确认状态规则。
- 改变已选设计主题。
- 增加生产 API、后端、鉴权或持久化逻辑。
- 未经用户确认替换已确认菜单架构。

如果设计评审提出超范围建议，只能写入 `后续决策项`。

## 人工降级检查清单

只有主动解决失败后才使用人工降级。

检查并记录：

- 主工作流是否能在原型 UI 中完成。
- 每个角色是否有清晰入口。
- 菜单、标签页、筛选器、动作、抽屉和详情页是否放在正确位置。
- 主次操作是否有清晰视觉区分。
- 状态标签和状态流转是否容易理解。
- 表格在真实信息密度下是否可读。
- 标签命名是否符合用户业务语言。
- 常见桌面宽度下文本是否没有溢出或重叠。
- hover、focus、禁用、空态、错误和加载状态是否在需要的地方体现。
- 关键文字、控件和状态颜色对比度是否足够。
- UI 是否遵循已确认主题的颜色、字体、间距、圆角和组件气质。
- 是否存在明显 AI 化反模式：泛泛卡片网格、装饰性渐变、无意义 hero、嵌套卡片、密集工具里过大的标题。
- 打磨是否避免新增未经确认的产品范围。

## 停止条件

只有满足以下任一条件，才能交付原型：

- 已运行 `impeccable`，并记录修正或决策。
- 已找到 bundled `subskills/impeccable`，并遵循其相关评审说明。
- 已找到本地 `impeccable` skill，并遵循其相关评审说明。
- 已尝试安装或命令执行，因已记录原因失败，并完成人工降级清单。

不得把“工具缺失”作为跳过打磨关卡的唯一理由。
