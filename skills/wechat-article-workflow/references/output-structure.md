# 输出结构

最终标题确认后，在 `articles/` 下按文章标题创建目录。

## 标准结构

```text
articles/<最终标题>/
  raw-materials/
  <最终标题>.md
  draft.md
  outline.md
  source-notes.md
  visual-plan.md
  title-candidates.md
  <最终标题>_xukache_wechat.html
  article-handoff.md
  images/
  cover/
    cover.html
    cover.png
    images/
```

如果当前项目已经有不同的草稿文件名，除非用户要求重命名，否则保留原名。

## 中间产物必须落盘

文章生产过程中的关键产物不要只输出在会话里，默认写入文章目录：

- 大纲：`outline.md`
- 初稿：`draft.md` 或项目已有草稿名
- 素材笔记：`source-notes.md`
- 配图计划：`visual-plan.md`
- 标题候选：`title-candidates.md`
- 公众号排版 HTML：`<最终标题>_xukache_wechat.html`，仅在用户需要公众号格式、富文本复制或发布前 HTML 预览时生成
- 交接文档：`article-handoff.md`

如果最终标题还没确认，先用工作标题或安全短名创建目录：

```text
articles/<工作标题>/
```

标题确认后，再整理为：

```text
articles/<最终标题>/
```

会话里只摘要展示关键内容，并提供文件路径，避免用户后续找不到产物。

## 用户原始素材文件夹

每篇文章目录下必须保留一个 `raw-materials/` 文件夹，用来统一存放用户提供或本次写作收集到的原始资料。

适合放入：

- 用户和 AI 的对话记录
- 用户提供的代码文件或代码片段
- 用户发送的参考文章链接和网页摘录
- 用户截图、原始图片、设计图
- 项目导出的文档、JSON、HTML、Markdown
- 用户自己的零散想法、手写笔记、语音转写

推荐结构：

```text
raw-materials/
  conversations/
  code/
  links.md
  screenshots/
  references/
  notes.md
```

规则：

- 不要把原始素材散落在文章目录根部。
- 不要覆盖用户原始素材；需要整理时，另存为 `source-notes.md` 或派生文件。
- 写稿前先查看 `raw-materials/`，再查看草稿、大纲和图片目录。
- 如果用户只在会话里提供了重要素材，应该提示或帮助写入 `raw-materials/` 下的合适文件。

## 当前项目模式

当前项目已经使用过这个结构：

```text
articles/我用 Codex 和 Moodboard Skill，做出了专属 IP 资产/
  raw-materials/
  我用 Codex 和 Moodboard Skill，做出了专属 IP 资产.md
  ip-asset-workflow-draft.md
  ip-asset-workflow-outline.md
  article-hero-watering.png
  images/
  cover/
```

在当前仓库中工作时，优先沿用这个项目模式。

## 文件职责

- 最终 markdown：可发布正文，包含图片引用。
- 草稿：粗稿和中间修改。
- 大纲：确认后的结构和章节意图。
- 素材笔记：事实、素材、链接、文件引用、归因边界。
- 配图计划：图片位置、来源和处理状态。
- 标题候选：生成的主标题/副标题候选和最终选择。
- 公众号排版 HTML：由 `wechat-axu-styler` 从最终 markdown 转换得到，用于公众号预览、复制富文本或发布前检查。
- 文章交接文档：当前状态、已确认约束、剩余待办、下一步。

## 发布正文尾部结构

最终 markdown 的正文尾部必须按这个顺序整理：

```markdown
## 参考链接

- [链接标题](URL)：一句话说明它在本文中用于什么。

![固定底图](images/...)

#AI #Codex #AI编程 #Prompt #个人效率
```

规则：

- `参考链接` 放在正文内容之后、固定底图之前。
- 只列真实使用过的外部链接、官方文档、GitHub 项目、论文、工具页、参考文章或素材来源。
- 不要为了显得完整添加未阅读、未使用或无法确认来源的链接。
- 如果本文没有外部参考链接，写：

```markdown
## 参考链接

本文无外部参考链接。
```

- 固定底图之后必须增加一行 `#tag` 标签。
- 标签从文章内容自动识别，优先选择大流量、可检索、和正文强相关的热词。
- 标签不超过 5 个，格式为同一行连续标签，例如：`#AI #Codex #AI编程 #Prompt #个人效率`。
- 不要使用和正文无关的蹭流量标签；不要为了热度牺牲准确性。
- 如果文章包含固定底图，标签必须在固定底图下方；如果没有底图，标签放在全文最后。

## 命名规则

- 使用确认后的文章标题作为目录和最终 markdown 文件名。
- 公众号排版 HTML 使用 `<最终标题>_xukache_wechat.html`，除非用户明确指定其他输出路径。
- 图片名要可读且稳定。
- 不要擅自修改用户提供的图片名。
- 发布正文中不要暴露不必要的本地绝对路径。

## 交接文档内容

每篇文章的交接文档应包含：

- 摘要
- 用户要求和最终决策
- 已确认标题/副标题
- 已确认归因边界
- 已改文件
- 已插入或仍缺失的图片
- 参考链接区状态
- 底图下方标签
- 公众号排版 HTML 路径，以及是否已用 `wechat-axu-styler` 转换或打开编辑器
- 可沉淀到 skill 的规则候选
- 不要改动列表
- 下一步
