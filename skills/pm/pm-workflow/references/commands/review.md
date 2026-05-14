# review 命令

当用户输入 `$pm-workflow review [stage]`、"审核"、"检查文档"、"质量把关" 或类似意图时，使用本命令。

## 负责角色

必须启动 `.codex/agents/quality-reviewer.toml` 中的 `quality_reviewer` 子 agent 执行审核。脚本只生成审核草稿，质量审核官必须解释草稿并补充专业判断。

如果当前 Codex 环境无法启动 `quality_reviewer` 子 agent，必须停止审核，不生成或修改 `docs/review-{stage}.md` 和 `docs/workflow-state.json`，不运行审核脚本，并提示用户在支持项目子 agent 调度的 Codex 运行方式中打开当前工作室目录后重试。

## 输入

- 用户显式提供的阶段参数。
- 如果未提供阶段参数，读取 `docs/workflow-state.json`。
- `docs/` 和 `prototype/` 下的阶段产物。

## 必须执行的流程

1. 确定目标阶段：优先使用用户显式参数，其次使用 workflow state 中的 `current_stage`。
2. 启动 `quality_reviewer` 子 agent，并把目标阶段、工作室根目录、当前阶段产物路径传给它。
3. 由 `quality_reviewer` 运行或等价执行：
   `python .agents/skills/pm-workflow/scripts/review_stage.py --root . --stage <stage>`
4. 由 `quality_reviewer` 执行三重审核机制：
   - 对完整性、清晰度、一致性、可执行性评分
   - 模拟下游角色使用产物
   - 做结构化追溯对账
5. 如果阶段未通过，给出具体返工指令，并询问用户现在修复还是带风险继续推进。
6. 如果这是第三轮未通过，必须明确告知风险，并建议先停止推进、修复产物。

## 收尾引导

结束时询问用户：应用审核修复建议、重新审核，还是进入推荐的下一阶段。
