# PM Workflow Bundled Subskills

本目录内置 `pm-workflow` 使用的辅助技能，保证工作流在用户本机没有安装同名 skill 时也能稳定运行。

## 全局同步与调用

`subskills/` 是随 `pm-workflow` 分发的离线副本，不作为运行时直接入口。调用任何辅助技能前，先把本目录同步到全局 Codex skills 目录，然后按正常 skill 名称调用。

```bash
python skills/pm/pm-workflow/scripts/sync_subskills.py
```

默认只复制全局缺失的 skill，不覆盖用户已有目录。若必须强制使用 pm-workflow 内置版本，可执行：

```bash
python skills/pm/pm-workflow/scripts/sync_subskills.py --overwrite
```

同步后按正常 skill 名称调用，例如 `problem-statement`、`jobs-to-be-done`、`user-story`、`impeccable`。如果全局已存在同名 skill 且没有覆盖，记录“已存在，使用全局版本”。

`impeccable` 的默认调用方式是先 `impeccable audit`，再 `impeccable polish`；不要只读取 bundled 文件后人工代替执行。

## 需求阶段 Helper Skills

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

## 原型与文档阶段 Helper Skills

这些 helper skills 由阶段 worker 按需调用。主 PM 必须在 `notes/stage-workers.md` 记录已用、未用和未用原因。

| Subskill | 主要阶段 | 用途 |
| --- | --- | --- |
| `user-story-splitting` | 方案架构 worker | 拆小过大的需求，防止一期范围失控。 |
| `epic-breakdown-advisor` | 方案架构 worker | 拆复杂后台、长流程、多角色协作和 MVP 切片。 |
| `user-story-mapping` | 方案架构 worker / 文档交付 worker | 工作流、活动主干、版本切片和故事地图结构。 |
| `ui-ux-pro-max` | 原型设计 worker | 补充 UX、布局、看板、组件、可访问性和响应式建议，不覆盖已选主题。 |
| `impeccable` | 原型设计 worker | 原型可用性、视觉层级、响应式、可访问性和 UI 质量门槛。 |
| `prd-development` | 文档交付 worker | PRD 深度、结构和开发交接准备度。 |
| `user-story` | 文档交付 worker | 用户故事和 Gherkin 验收标准。 |
| `epic-hypothesis` | 文档交付 worker | 战略上下文、目标结果和验证假设。 |

这些副本是完整目录，不是摘录，因此其内部引用和脚本可以继续工作。
