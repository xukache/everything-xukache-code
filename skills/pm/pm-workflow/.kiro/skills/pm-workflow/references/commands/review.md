# review 命令

当用户输入 `$pm-workflow review [stage]`、"审核"、"检查文档"、"质量把关" 或类似意图时，使用本命令。

## 负责角色

由主 agent 派发 `quality-reviewer` subagent 执行审核，或用户用 `/quality-reviewer <stage>` slash 命令显式触发。脚本只生成审核草稿，subagent 必须解释草稿并补充专业判断。

## 输入

- 用户显式提供的阶段参数。
- 如果未提供阶段参数，读取 `docs/workflow-state.json`。
- `docs/` 和 `prototype/` 下的阶段产物。

## 必须执行的流程

1. 确定目标阶段：优先使用用户显式参数，其次使用 workflow state 中的 `current_stage`。
2. 派发 `quality-reviewer` subagent，并把目标阶段、工作室根目录、当前阶段产物路径传给它。
3. 由 `quality-reviewer` 运行或等价执行:
   `node .kiro/skills/pm-workflow/scripts/review_stage.js --root . --stage <stage>`(stage ∈ init|blueprint|design|analyze|architect|plan|deliver)
4. 由 `quality-reviewer` 执行三重审核机制:
   - 对完整性、清晰度、一致性、可执行性评分
   - 模拟下游角色使用产物
   - 做结构化追溯对账(蓝图 Mx-Fx 编号在 design / analyze / architect / plan 各阶段是否一致)
   - 执行一致性硬门禁:任何阶段明显改变上游事实但未按 craft-principles 第 4 条「重大变革协议」回写上游(蓝图/PRD/架构/UI),直接判为不通过
   - design 阶段额外核对 `docs/prototype-review.md`、`prototype/review/screenshots/`、Playwright 三视口截图和 Impeccable 审查修正记录
5. 如果阶段未通过，给出具体返工指令，并询问用户现在修复还是带风险继续推进。
6. 如果这是第三轮未通过，必须明确告知风险，并建议先停止推进、修复产物。

## 收尾引导

结束时询问用户：应用审核修复建议、重新审核，还是进入推荐的下一阶段。
