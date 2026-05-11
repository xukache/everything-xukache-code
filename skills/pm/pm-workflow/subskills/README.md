# PM Workflow Bundled Subskills

本目录内置 `pm-workflow` 使用的辅助技能，保证工作流在用户本机没有安装同名 skill 时也能稳定运行。

## 解析顺序

当 `pm-workflow` 需要调用辅助技能时，按以下顺序解析：

1. 优先读取 `skills/pm/pm-workflow/subskills/<skill-name>/SKILL.md`。
2. 该技能的 references、scripts 和 assets 都按自身目录的相对路径解析。
3. 只有 bundled 副本缺失或不可用时，才回退到用户级路径，例如 `.agents/skills` 或 `.codex/skills`。
4. 如果回退会影响原型打磨、文档质量或最终交付，必须在 `notes/requirements.md` 中记录原因。

## 需求阶段子技能

这 8 个技能组成需求阶段 worker 的方法工具箱。它们必须完整内置，但不是每次都全量使用；需求 worker 必须记录“已用 / 未用 / 未用原因”。

| Subskill | 需求阶段用途 | 典型触发时机 |
| --- | --- | --- |
| `problem-statement` | 把模糊想法重写成用户、目标、阻碍、原因和影响 | 用户一上来说想做平台/工具/功能 |
| `jobs-to-be-done` | 把功能诉求拉回真实任务、痛点和收益 | 用户只列功能、页面或模块 |
| `discovery-interview-prep` | 规划访谈/调研目标、对象和问题，避免证据偏差 | 证据不足或需要验证需求 |
| `pol-probe` | 设计轻量验证探针，判断是否值得继续做 | 方向风险高、是否该做不确定 |
| `user-story` | 把需求清单转成角色、动作、结果和可验收表达 | 需求进入可交付表达前 |
| `user-story-splitting` | 拆小过大的用户故事 | 一个迭代吃不下或难以估算时 |
| `epic-breakdown-advisor` | 拆复杂 Epic、后台长流程和多角色协作需求 | 需求过大、流程复杂、依赖多 |
| `prd-development` | 检查 PRD 准备度和需求结构完整性 | 需求阶段结束前、正式 PRD 前 |

## 原型与文档阶段子技能

| Subskill | 用途 |
| --- | --- |
| `impeccable` | 原型可用性、视觉层级、响应式、可访问性和 UI 质量门槛。 |
| `ui-ux-pro-max` | 补充 UX、布局、看板、组件、可访问性和响应式建议，不覆盖已选主题。 |
| `user-story-mapping` | 工作流、活动主干、版本切片和故事地图结构；主要服务交互架构和范围拆分。 |

这些副本是完整目录，不是摘录，因此其内部引用和脚本可以继续工作。
