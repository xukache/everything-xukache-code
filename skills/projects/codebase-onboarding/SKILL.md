---
name: codebase-onboarding
description: 分析陌生代码库并生成结构化入门指南、架构地图、关键入口、项目约定和 Codex 使用的 AGENTS.md。适用于第一次进入仓库、加入新项目、请求理解代码库、生成项目级 Codex 指令，或需要把现有 CLAUDE.md 中仍有价值的约定迁移到 AGENTS.md 的场景。
---

# 代码库入门分析

来源：ECC。

系统性分析一个陌生代码库，并产出可供人和 Codex 后续使用的入门材料。这个技能适合开发者第一次进入一个项目，也适合为 Codex 建立项目级工作上下文。

## 使用场景

- 第一次用 Codex 打开一个项目。
- 加入一个新团队或新仓库。
- 用户要求“帮我理解这个代码库”。
- 用户要求生成或更新项目级 `AGENTS.md`。
- 用户说 “onboard me”、“walk me through this repo” 或类似请求。
- 项目里已有 `CLAUDE.md`，需要提取仍然有效的项目约定，并迁移到 Codex 使用的 `AGENTS.md`。

## 工作流程

### 阶段 1：项目侦察

先收集项目信号，不要读取每一个文件。优先并行检查这些内容：

```text
1. 项目清单识别
   -> package.json, go.mod, Cargo.toml, pyproject.toml, pom.xml, build.gradle,
      Gemfile, composer.json, mix.exs, pubspec.yaml

2. 框架指纹识别
   -> next.config.*, nuxt.config.*, angular.json, vite.config.*,
      Django settings, Flask app factory, FastAPI main, Rails config

3. 入口文件识别
   -> main.*, index.*, app.*, server.*, cmd/, src/main/

4. 目录结构快照
   -> 查看前两层目录，忽略 node_modules, vendor, .git, dist, build,
      __pycache__, .next 等目录

5. 配置与工具识别
   -> .eslintrc*, .prettierrc*, tsconfig.json, Makefile, Dockerfile,
      docker-compose*, .github/workflows/, .env.example, CI 配置

6. 测试结构识别
   -> tests/, test/, __tests__/, *_test.go, *.spec.ts, *.test.js,
      pytest.ini, jest.config.*, vitest.config.*
```

### 阶段 2：架构映射

基于侦察结果，识别这些信息：

**技术栈**
- 语言和版本约束。
- 框架和主要库。
- 数据库、ORM 或数据访问层。
- 构建工具、打包器和任务脚本。
- CI/CD 平台。

**架构形态**
- 单体、monorepo、微服务或 serverless。
- 前后端分离、全栈应用或纯后端服务。
- API 风格：REST、GraphQL、gRPC、tRPC 或其他。

**关键目录**
把顶层目录映射到用途，避免解释显而易见的目录名，只记录会影响开发路径的结构。

```text
src/components/  -> UI 组件
src/api/         -> API 路由或处理器
src/lib/         -> 共享工具和基础设施代码
src/db/          -> 数据模型、迁移或数据库访问层
tests/           -> 测试套件
scripts/         -> 构建、维护或部署脚本
```

**请求或数据流**
尽量追踪一条典型路径：
- 请求从哪里进入？例如 router、handler、controller、command。
- 输入在哪里校验？例如 middleware、schema、guard、serializer。
- 业务逻辑在哪里？例如 service、use case、model、domain 层。
- 如何访问数据库或外部服务？例如 ORM、repository、SDK、raw query。
- 响应、错误或副作用在哪里生成？

### 阶段 3：约定识别

识别代码库已经形成的模式，不要凭空发明标准。

**命名约定**
- 文件命名：kebab-case、camelCase、PascalCase、snake_case。
- 组件、类、函数、服务、hook 或模块的命名模式。
- 测试文件命名：`*.test.ts`、`*.spec.ts`、`*_test.go` 等。

**代码模式**
- 错误处理方式：try/catch、Result 类型、错误码、异常类。
- 依赖组织方式：依赖注入、直接 import、服务容器、provider。
- 状态管理方式：框架内置状态、Redux、Zustand、Pinia、signals 等。
- 异步模式：async/await、Promise、callback、channel、job queue。
- 配置来源：环境变量、配置文件、secret manager、默认值。

**Codex 工作约束**
- 常用命令：安装、开发、测试、lint、build、迁移、代码生成。
- 修改边界：哪些目录是源码，哪些是生成文件、构建产物或外部同步文件。
- 验证方式：改动后应运行哪些最小测试或检查。
- 危险命令：删除、迁移、发布、重置数据库、覆盖生成物等需要特别谨慎的操作。
- 外部依赖：网络、服务账号、本地数据库、Docker、环境变量或私有包源。

**Git / PR 约定**
- 从近期分支识别分支命名。
- 从近期提交识别 commit message 风格。
- 从仓库配置或历史识别 PR 工作流：squash、merge、rebase。
- 如果仓库没有提交历史，或历史太浅，例如 `git clone --depth 1`，跳过此项并说明“Git history unavailable or too shallow to detect conventions”。

### 阶段 4：生成入门产物

产出两个结果：

#### 产物 1：入门指南

在对话中输出一份结构化入门指南，帮助人快速理解项目。

```markdown
# 入门指南：[项目名称]

## 概览
[用 2-3 句话说明项目做什么、服务谁、主要能力是什么]

## 技术栈
| 层级 | 技术 | 版本 |
|-------|------------|---------|
| 语言 | TypeScript | 5.x |
| 框架 | Next.js | 14.x |
| 数据库 | PostgreSQL | 16 |
| ORM | Prisma | 5.x |
| 测试 | Jest + Playwright | - |

## 架构
[描述组件如何连接；必要时用简短文本图表示]

## 关键入口
- **API 路由**：`src/app/api/` -> API route handlers
- **页面**：`src/app/(dashboard)/` -> authenticated pages
- **数据库**：`prisma/schema.prisma` -> data model source of truth
- **配置**：`next.config.ts` -> build and runtime config

## 目录地图
[顶层目录 -> 用途映射]

## 请求生命周期
[追踪一条典型请求或数据流，从入口到响应]

## 项目约定
- [文件命名模式]
- [错误处理方式]
- [测试模式]
- [Git 工作流]

## 常用任务
- **运行开发服务**：`npm run dev`
- **运行测试**：`npm test`
- **运行 lint**：`npm run lint`
- **数据库迁移**：`npx prisma migrate dev`
- **生产构建**：`npm run build`

## 修改入口
| 想要做什么 | 应该查看 |
|--------------|------------|
| 新增 API endpoint | `src/app/api/` |
| 新增 UI 页面 | `src/app/(dashboard)/` |
| 新增数据库表 | `prisma/schema.prisma` |
| 新增测试 | `tests/` 中与源码路径匹配的位置 |
| 修改构建配置 | `next.config.ts` |
```

#### 产物 2：项目级 `AGENTS.md`

生成或更新项目根目录的 `AGENTS.md`，作为 Codex 后续工作的项目级指令文件。

如果项目已有 `AGENTS.md`，必须先读取并增强它，保留已有的项目特定要求，并清楚说明新增或调整了什么。

如果项目没有 `AGENTS.md` 但已有 `CLAUDE.md`，可以读取 `CLAUDE.md` 作为迁移参考。只迁移仍然适用于当前项目和 Codex 工作流的内容，不要保留 Claude 专属表述。

```markdown
# 项目指令

## 技术栈
[检测到的技术栈摘要]

## 构建与运行
- 安装依赖：`[检测到的安装命令]`
- 开发服务：`[检测到的开发命令]`
- 构建：`[检测到的构建命令]`
- Lint：`[检测到的 lint 命令]`

## 测试
- 运行测试：`[检测到的测试命令]`
- 测试文件模式：[检测到的测试文件约定]
- 覆盖率：[如果存在，写明 coverage 命令]
- 交付前必跑检查：[交付前至少需要运行的检查]

## 代码风格
- [检测到的命名约定]
- [需要遵循的代码组织模式]
- [错误处理、异步、状态管理或依赖组织模式]

## 项目结构
[关键目录 -> 用途映射]

## 修改边界
- [可以安全编辑的源码区域]
- [不要手动编辑的生成文件、构建产物或外部同步文件]
- [涉及数据库、迁移、发布或删除操作时的注意事项]

## 项目约定
- [Commit 风格，如果能检测到]
- [PR 工作流，如果能检测到]
- [配置、环境变量或外部服务约定]

## 未知项
- [无法确认但会影响 Codex 工作的事项]
```

## 最佳实践

1. **不要读完整个仓库**：侦察阶段优先使用 `rg`、`rg --files`、目录快照和清单文件。只有信号不明确时才选择性读取源码。
2. **验证，不要猜**：如果配置文件显示一种框架，但实际入口代码显示另一种实现，以代码为准。
3. **尊重已有 `AGENTS.md`**：如果文件存在，增强它而不是覆盖它；明确说明新增、调整或保留的内容。
4. **谨慎迁移 `CLAUDE.md`**：只把项目约定迁移到 `AGENTS.md`，不要复制 Claude 专属措辞。
5. **保持简洁**：Onboarding Guide 应该能在 2 分钟内扫完；细节属于代码，不属于指南。
6. **标注未知项**：无法可靠确认的约定要明说。写“Could not determine test runner” 比写错测试命令更好。
7. **服务 Codex 实操**：优先记录会影响修改、测试、验证和交付的事实，而不是泛泛介绍项目。

## 避免的反模式

- 生成超过 100 行的 `AGENTS.md`，除非项目确实复杂到需要更多内容。
- 罗列每一个依赖；只突出会影响开发方式的关键依赖。
- 解释显而易见的目录名，例如单独解释 `src/`。
- 复制 README；Onboarding Guide 应该补充结构性理解，而不是复述介绍文案。
- 把不确定的命令写成确定事实。
- 把历史工具的指令原样搬进 Codex 项目指令。

## 示例

### 示例 1：第一次进入新仓库

**用户**：“帮我快速熟悉这个代码库”

**动作**：执行完整四阶段流程，产出入门指南，并在项目根目录生成或更新 `AGENTS.md`。

**输出**：在对话中给出入门指南；在项目中写入 Codex 可用的 `AGENTS.md`。

### 示例 2：为现有项目生成 `AGENTS.md`

**用户**：“为这个项目生成一份 `AGENTS.md`”

**动作**：执行阶段 1-3，跳过完整入门指南，只生成项目级 `AGENTS.md`。

**输出**：包含技术栈、命令、代码风格、测试、修改边界和未知项的 `AGENTS.md`。

### 示例 3：更新已有项目指令

**用户**：“根据当前项目约定更新 `AGENTS.md`”

**动作**：读取现有 `AGENTS.md`，执行阶段 1-3，把新发现合并进去，并保留仍然有效的原有项目要求。

**输出**：更新后的 `AGENTS.md`，并说明新增或调整了哪些内容。

### 示例 4：从 `CLAUDE.md` 迁移到 Codex

**用户**：“这个仓库有 `CLAUDE.md`，帮我迁移成 Codex 可用的 `AGENTS.md`”

**动作**：读取 `CLAUDE.md` 和项目结构，提取仍然有效的项目约定，生成或更新 `AGENTS.md`，去掉 Claude 专属语境。

**输出**：Codex 语境下的 `AGENTS.md`，并说明哪些内容来自迁移、哪些内容来自重新侦察。
