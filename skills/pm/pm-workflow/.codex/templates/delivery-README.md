# 开发交付包

本目录包含产品开发所需的核心文档、审核报告和原型。

## 使用方式

1. 在本目录启动开发会话。
2. 先阅读 `AGENTS.md`。
3. 按照 `dev-tasks.md` 的编号 checklist 顺序执行开发。
4. 每完成一个编号任务，立即执行该任务列出的测试/验收动作。
5. 只有测试/验收通过，才能进入下一个编号任务；失败时先修复当前任务。

## 文档清单

| 文档 | 说明 |
|---|---|
| `AGENTS.md` | 开发执行准则 |
| `project-config.md` | 项目配置和定位 |
| `prd.md` | 产品需求文档 |
| `handoff-prd.md` | 需求交接摘要 |
| `tech-architecture.md` | 技术架构方案 |
| `handoff-architecture.md` | 架构交接摘要 |
| `ui-design.md` | 界面与体验设计文档 |
| `handoff-ui.md` | 界面交接摘要 |
| `prototype-review.md` | 高保真原型自审报告 |
| `dev-tasks.md` | 开发任务清单 |
| `review-*.md` | 阶段审核报告 |
| `prototype/` | 高保真 HTML 原型 |

## 缺失项

{{MISSING_SECTION}}

## 执行提醒

- 严格按任务编号顺序执行。
- 每个最小粒度任务都必须完成实现、验收和测试，不能合并跳过。
- 遇到需求矛盾时先回看需求文档和审核报告。
- 不默认新增需求范围外的功能。
