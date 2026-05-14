# deliver 命令

当用户输入 `$pm-workflow deliver`、"开始打包"、"打包交付" 或类似意图时，使用本命令。

## 负责角色

必须启动 `.codex/agents/product-manager.toml` 中的 `product_manager` 子 agent 主控交付打包，并在打包前启动 `.codex/agents/quality-reviewer.toml` 中的 `quality_reviewer` 子 agent 做最终完整性检查。

如果当前 Codex 环境无法启动 `product_manager` 或 `quality_reviewer` 子 agent，必须停止交付打包，不运行打包脚本，不生成或修改 `outputs/dev-package/`，并提示用户在支持项目子 agent 调度的 Codex 运行方式中打开当前工作室目录后重试。

## 输入

- `docs/`
- `prototype/`
- `AGENTS.md`
- `docs/review-*.md`

## 必须执行的流程

1. 启动 `quality_reviewer` 检查最终完整性和已知风险。
2. 运行或等价执行：
   `python .agents/skills/pm-workflow/scripts/package_delivery.py --root .`
3. 向用户报告已复制文件、缺失文件和已知审核风险。
4. 指向最终交付目录 `outputs/dev-package/`。
5. 交付后停止。除非用户明确要求，不要开始研发实现。

## 收尾引导

结束时询问用户：检查交付包、修改某份文档，还是从交付包启动单独的 Codex 开发会话。
