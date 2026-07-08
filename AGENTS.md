# 项目指令

## 高优先级规则
- 修改或新增功能后，如果影响用户可见行为、API、配置、命令、架构、数据模型、权限、错误处理或部署方式，必须检查并同步更新相关项目文档，包括 README、docs、API 文档、配置说明、示例、changelog 或迁移指南。若判断无需更新文档，交付回复中必须说明依据。

## 技术栈
- 本仓库是 Agent Skills 集合，主要内容是 Markdown 技能说明、参考资料、CSV 知识库和少量脚本。
- 唯一 npm 包位于 `skills/pm-workflow/`，包名为 `pm-workflow-studio`，使用 CommonJS，要求 Node.js `>=16`。
- 公众号文章生产、对标蒸馏、阿栩配图和微信 HTML 排版相关技能位于 `skills/wechat-article-workflow/`、`skills/wechat-benchmark-distiller/`、`skills/axu-article-illustrations/` 和 `skills/wechat-axu-styler/`，其中部分脚本使用 Node.js。

## 构建与运行
- 根目录没有统一构建脚本。
- 调试 PM Workflow CLI：`cd skills/pm-workflow && node bin/pmflow.js --help`
- npm 包测试命令：`cd skills/pm-workflow && npm test`
- 本仓库没有检测到 lint、format、CI 或依赖安装脚本。

## 测试
- 已确认测试入口：`skills/pm-workflow/package.json` 中的 `npm test`，实际运行 `node bin/pmflow.js --help`。
- 修改 `pmflow` 初始化/更新逻辑后，至少运行 `cd skills/pm-workflow && npm test`。
- 其他技能主要是文档资产，修改后应人工检查 frontmatter、相对链接和渐进式加载路径。

## 代码风格
- 技能入口统一使用 `SKILL.md`，文件开头保留 YAML frontmatter：`name` 和 `description` 是核心字段。
- Markdown 内容以中文为主，部分第三方技能保留英文原文；不要无理由大规模翻译或改写第三方来源内容。
- `pmflow` CLI 目前是单文件 CommonJS 风格，使用 Node 内置模块 `fs/path/readline`，不要引入运行时依赖，除非同步更新包声明和发布说明。
- 保持 Agent Skills 的渐进式加载结构：主 `SKILL.md` 只放路由和流程，长方法论放入 `references/`、`templates/`、`scripts/` 或 `assets/`。

## 项目结构
- `README.md` / `README_en.md`：中英文项目介绍、技能清单和安装说明。
- `skills/`：所有 Skill 和 npm 包均直接放在该目录下，不再按用途创建二级分类目录。
- `skills/ai-coding-task-planner/`：编程需求拆解与提示词优化技能。
- `skills/prompt-engineering-loop/`：通用提示词优化与评测闭环技能。
- `skills/code-documentation/`：项目文档维护技能。
- `skills/pm-workflow/`：PM Workflow Studio npm 包，包含 `bin/pmflow.js` 和 Codex/Claude/Kiro 三套模板镜像。
- `skills/skill-iteration-retrospective/`：技能迭代复盘工作流。
- `skills/wechat-article-workflow/`、`skills/wechat-benchmark-distiller/`、`skills/wechat-axu-styler/`、`skills/axu-article-illustrations/`：微信公众号内容创作链路。

## 修改边界
- 可以编辑各技能目录下的 `SKILL.md`、`references/`、`templates/`、`scripts/`、`assets/` 和 README。
- 不要手动编辑 `__pycache__/` 或 `.pyc` 文件；这些是生成缓存。
- 修改 `skills/pm-workflow/.codex/`、`.claude/`、`.kiro/` 中任一平台镜像时，注意三套结构可能需要同步更新。
- 修改 `pmflow` 生成策略时，重点检查不会覆盖用户业务产物；更新模式应继续保护 `docs/`、`prototype/`、`README.md` 和根目录 `AGENTS.md`。
- 发布 `pm-workflow-studio` 前需核对 `package.json` 的 `files`、版本号、许可证声明和 README 中的命令示例。

## 项目约定
- 近期 commit 风格以 Conventional Commits 为主，如 `feat(pm-workflow): ...`、`docs: ...`、`refactor: ...`，也存在中文说明。
- README 声明原创内容采用 MIT 许可证，第三方 Skill 保留原始许可；新增或迁移第三方内容时必须保留来源说明。
- 不在本仓库维护的第三方 Skill 只放在 README 的外部推荐表中，不复制完整 skill 目录。
- 技能安装说明默认面向 Claude Code / Codex / Cursor / Copilot 等 AI 编程工具，路径映射需要和实际目录保持一致。

## 未知项
- 未检测到 GitHub Actions、发布流水线或自动 lint 配置。
- 未检测到根目录统一包管理器、锁文件或测试套件。
- PR 合并策略无法从仓库文件可靠判断。
