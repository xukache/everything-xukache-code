# deliver 命令

当用户输入 `$pm-workflow deliver`、"开始打包"、"打包交付" 或类似意图时，使用本命令。

## 负责角色

由主 agent 派发 `product-manager` subagent 主控交付打包，并在打包前再派发 `quality-reviewer` subagent 做最终完整性检查。两个 subagent 也可以由用户用 `/product-manager`、`/quality-reviewer` 显式触发。

## 输入

- `docs/`(包含 `feature-flow-layout.md`、`prd.md`、`tech-architecture.md`、`ui-design.md`、`dev-tasks.md`、`handoff-*.md`)
- `prototype/`
- `AGENTS.md`
- `docs/review-*.md`

## 必须执行的流程

1. 派发 `quality-reviewer` subagent 检查最终完整性和已知风险,必须覆盖 `docs/feature-flow-layout.md`、`docs/prd.md`、`docs/tech-architecture.md`、`docs/ui-design.md`、`docs/dev-tasks.md`、`docs/handoff-*.md` 和 `AGENTS.md` 的一致性(蓝图 Mx-Fx 是否在各阶段统一)。
2. 若任一阶段明显改变上游事实但未按 craft-principles 第 4 条「重大变革协议」回写,或发现功能编号、接口、页面、测试策略、开发执行方式与蓝图不一致,先返工对应文档,不得打包。
3. 运行或等价执行:
   `node .kiro/skills/pm-workflow/scripts/package_delivery.js --root .`
4. 向用户报告已复制文件、缺失文件、一致性检查结果和已知审核风险。
5. 指向最终交付目录 `outputs/dev-package/`。
6. 交付后停止。除非用户明确要求,不要开始研发实现。

## 收尾引导

结束时询问用户：检查交付包、修改某份文档，还是从交付包启动单独的开发会话。
