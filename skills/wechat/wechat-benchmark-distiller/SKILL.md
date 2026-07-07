---
name: wechat-benchmark-distiller
description: 当用户想从一个或多个微信公众号对标文章中蒸馏、比较、学习或融合写作方法时使用，包括文章结构、语言风格、选题模式、标题、读者关系，或把对标账号沉淀成可复用写作 Skill。
---

# 公众号对标号蒸馏器

这个 Skill 用来把微信公众号对标文章转化成用户自己账号可复用的写作规则。核心立场：**先分类文章类型，再分别蒸馏账号，最后融合可迁移优点**，不要复制具名作者的人格。

## 硬规则

- 没有先按文章类型分类，不要总结某个对标账号的“整体风格”。
- 不要把多个账号混成一个平均画像。必须先分别蒸馏，再综合融合。
- 不要扮演或仿写具名作者本人。只提取方法：结构、节奏、解释方式、标题逻辑、证据使用和读者关系。
- 不要编造作者意图、阅读数据、受众画像或心理动机。证据不足时明确标注。
- 保留用户自己的作者人设和真实经历。对标方法服务用户文章，不反过来覆盖用户。
- 如果用户明确说“这次只用某个账号/某个人的风格”，遵守该范围，但仍然避免人格模仿。

## 参考文件路由

只读取当前任务需要的文件：

- 文章类型分类：`references/article-type-taxonomy.md`
- 单账号蒸馏：`references/account-distillation.md`
- 结构和语言分析：`references/structure-and-language.md`
- 多账号融合：`references/multi-account-synthesis.md`
- 用户风格整合和纠偏：`references/user-style-integration.md`
- 输出目录结构、原始素材归档、账号 ID 和样本索引：`references/output-structure.md`
- 输出格式和检查清单：`references/output-contracts.md`
- 第一次使用、用户不知道如何提供样本或需要初始化说明：`references/first-use-guide.md`

如果用户给的是一批 `mp.weixin.qq.com` 链接，而不是整理好的 Markdown / 文本 / 截图，先使用 `wechat-article-archive` 的批量对标链接入库流程，把链接归档到本 Skill 规定的 `raw-materials/` 和 `analysis/sample-map.md` 结构中。

如果用户只给公众号名称、账号名或关键词，没有具体文章链接，也先使用 `wechat-article-archive`：通过其 `references/mptext-api.md` 流程搜索公众号、获取历史文章列表、选择样本链接，再归档到本 Skill 的目录结构中。

如果任务涉及实际产出公众号文章，在蒸馏结果完成后同时使用 `wechat-article-workflow`。

## SOP

### Step 0：范围识别

先确认：

- 是单账号、多账号，还是用户指定只学某一个风格
- 样本形式：公众号名称、链接、复制全文、截图、本地文件或用户笔记
- 用户需要的输出：分析报告、可复用规则、大纲模板、初稿辅助、改稿建议，还是新的 Skill
- 用户明确不想借鉴什么

如果没有样本，先要求用户提供样本；也可以只做框架草案，但必须标明“未基于样本验证”。如果样本是一批微信文章链接，先触发 `wechat-article-archive` 做本地归档和 `sample-map.md` 初始化。如果样本只有公众号名称，先触发 `wechat-article-archive` 的 mptext API 账号文章采集流程。

在接收任何原始素材之前，必须先根据 `references/output-structure.md` 创建本次蒸馏任务目录骨架。不要等分析结束后再补目录。

### Step 1：样本地图

读取 `references/output-structure.md`。

分析前先完成两件事：

1. 创建本次蒸馏任务目录骨架，包括 `raw-materials/`、`analysis/`、`synthesis/`、`deliverables/`
2. 初始化 `analysis/sample-map.md` 和 `analysis/article-type-classification.md`

然后建立样本地图：

- 账号名或来源标签
- 账号 ID
- 样本 ID
- 文章标题
- 文章链接或本地路径
- 文本质量：全文 / 摘录 / 截图 / 仅笔记
- 发布时间，如果已知
- 用户认为它值得对标的原因

原始对标素材必须放在本次蒸馏目录的 `raw-materials/` 下，不要放进 Skill 目录本身。

### Step 2：文章类型门禁

读取 `references/article-type-taxonomy.md`。

每篇样本都要标注：

- 主类型
- 辅类型，如果存在
- 读者当前状态
- 文章承诺
- 证据置信度

没有这张表，不进入账号级风格总结。

### Step 3：逐账号蒸馏

读取 `references/account-distillation.md`。

对每个账号独立完成：

- 识别文章类型分布
- 蒸馏不同类型下的写作规则
- 区分可迁移方法与不可迁移的人格、经历、上下文
- 记录缺口和弱证据

### Step 4：结构和语言拆解

读取 `references/structure-and-language.md`。

对每个代表性文章类型拆解：

- 标题、开头、章节顺序、转折、例子、证据、结尾
- 句子节奏、信息密度、词汇、抽象层级、情绪温度和常用连接方式
- 除非用户拥有文本版权，否则只做短摘录或转述，不大量复用原文

### Step 5：多账号融合

涉及多个账号时读取 `references/multi-account-synthesis.md`。

按能力融合，不按作者身份融合：

- 结构可以借账号 A
- 标题逻辑可以借账号 B
- 解释方式可以借账号 C
- 语言表达要整合回用户自己的口吻

### Step 6：整合到用户风格

读取 `references/user-style-integration.md`。

把对标发现转化为用户自己的写作系统：

- 借什么
- 不借什么
- 怎么改造
- 哪些仍然保持用户默认表达
- 如何记录用户反馈形成纠偏规则

### Step 7：交付

读取 `references/output-contracts.md`。

根据用户当前请求给出最小可用交付物。如果是在创建或更新可复用 Skill，把文件写入用户指定的 skill 目录，并保留输出契约作为参考资料。

## 完成标准

只有当用户拿到可复用资产时，任务才算完成：

- 分类表，或
- 账号画像，或
- 融合规则书，或
- 写作模板 / 检查清单，或
- 具体 Skill 目录

最终必须说明剩余证据缺口，以及下一步最值得补充的样本。
