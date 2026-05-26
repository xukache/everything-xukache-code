# deliver 命令

当用户输入 `$pm-workflow deliver`、"开始打包"、"打包交付" 或类似意图时，使用本命令。

## 负责角色

必须启动当前 CLI 结构下的产品经理子 agent 主控交付打包，并在打包前启动质量审核子 agent 做最终完整性检查：Codex 使用 `.codex/agents/product-manager.toml` 和 `.codex/agents/quality-reviewer.toml`，Claude Code 使用 `.claude/agents/product-manager.md` 和 `.claude/agents/quality-reviewer.md`。

如果当前环境无法启动产品经理或质量审核子 agent，必须停止交付打包，不运行打包脚本，不生成或修改 `outputs/dev-package/`，并提示用户在支持项目子 agent 调度的 CLI 中打开当前工作室目录后重试。

## 输入

- `docs/`
- `prototype/`
- `AGENTS.md`
- `docs/review-*.md`

## 必须执行的流程

1. 启动 `quality_reviewer` 检查最终完整性和已知风险，必须覆盖 `docs/prd.md`、`docs/tech-architecture.md`、`docs/ui-design.md`、`docs/dev-tasks.md`、`docs/handoff-*.md` 和 `AGENTS.md` 的文档同步检查。
2. 若任一阶段缺少有效 `## 文档同步检查`，或最终发现功能编号、接口、页面、测试策略、开发执行方式未同步，先返工对应文档，不得打包。
3. 运行或等价执行：
   `node .agents/skills/pm-workflow/scripts/package_delivery.js --root .`
4. 向用户报告已复制文件、缺失文件、文档同步检查结果和已知审核风险。
5. 指向最终交付目录 `outputs/dev-package/`。
6. 交付后停止。除非用户明确要求，不要开始研发实现。

## 收尾引导

结束时询问用户：检查交付包、修改某份文档，还是从交付包启动单独的开发会话。
