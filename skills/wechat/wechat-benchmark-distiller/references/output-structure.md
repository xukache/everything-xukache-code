# 输出目录结构

本文件规定公众号对标蒸馏任务的文件组织方式。原始对标素材不要放进 `.codex/skills/wechat-benchmark-distiller/`，Skill 目录只保存方法论和规则。

## 推荐根目录

每次蒸馏建立一个独立任务目录：

```text
benchmark-distillations/
  <本次蒸馏主题>/
```

例如：

```text
benchmark-distillations/ai-coding-public-account/
```

如果用户已经指定文章项目目录，也可以在该目录下建立：

```text
articles/<文章或专题名>/benchmark-distillation/
```

## 标准结构

```text
benchmark-distillations/
  <本次蒸馏主题>/
    raw-materials/
      accounts/
        <account_id>-<账号安全短名>/
          <sample_id>-<文章短标题>.md
          <sample_id>-<文章短标题>.txt
          notes.md
        <account_id>-<账号安全短名>/
          <sample_id>-<文章短标题>.md
      screenshots/
        <sample_id>-01.png
      links.md

    analysis/
      sample-map.md
      article-type-classification.md
      accounts/
        <account_id>-account-profile.md
      articles/
        <sample_id>-structure-language.md

    synthesis/
      multi-account-synthesis.md
      user-writing-system.md
      type-templates.md
      correction-log.md

    deliverables/
      writing-rulebook.md
      outline-templates.md
      review-checklist.md
```

## 初始化必须先做

在接收或处理原始素材前，先创建目录骨架。最小初始化结构：

```text
benchmark-distillations/<本次蒸馏主题>/
  raw-materials/
    accounts/
    screenshots/
    links.md
  analysis/
    sample-map.md
    article-type-classification.md
    accounts/
    articles/
  synthesis/
    correction-log.md
  deliverables/
```

初始化后立即写入两个空索引文件和纠偏文件。

`raw-materials/links.md`：

```md
# 原始链接

## 用户原始输入

## 处理状态

| url | status | sample_id | account_id | local_path | notes |
|---|---|---|---|---|---|
```

`analysis/sample-map.md`：

```md
# 样本地图

## 账号索引

| account_id | account_name | account_slug | account_dir | notes |
|---|---|---|---|---|

## 文章样本

| sample_id | account_id | account_name | title | source_url | local_path | material_type | publish_date | user_reason | classification_status |
|---|---|---|---|---|---|---|---|---|---|
```

`analysis/article-type-classification.md`：

```md
# 文章类型分类

| 账号 | 文章 | 主类型 | 辅类型 | 读者状态 | 文章承诺 | 置信度 | 备注 |
|---|---|---|---|---|---|---|---|
```

`synthesis/correction-log.md`：

```md
# 纠偏记录

暂无。
```

## 原始素材放哪里

所有原始对标素材放在：

```text
benchmark-distillations/<本次蒸馏主题>/raw-materials/
```

按账号分组：

```text
raw-materials/accounts/<account_id>-<账号安全短名>/
```

每篇文章可以保存为：

- `.md`：复制正文、整理后的 Markdown、Jina/网页转写结果
- `.txt`：纯文本摘录
- `.png` / `.jpg`：截图，放在 `raw-materials/screenshots/`
- 链接统一登记到 `raw-materials/links.md`

不要把原始文章、截图、链接清单放进：

```text
.codex/skills/wechat-benchmark-distiller/
```

该目录只放 Skill 自身。

## 账号 ID 规则

多账号任务必须给每个账号分配稳定 `account_id`。

推荐：

```md
| account_id | account_name | account_slug | notes |
|---|---|---|---|
| A | 阿栩的朋友们 | axu-friends | 偏案例复盘 |
| B | 某某 AI 周刊 | ai-weekly | 偏工具推荐 |
| C | 某某产品手记 | product-notes | 偏观点判断 |
```

规则：

- `account_id` 用大写字母：`A`、`B`、`C`；账号很多时用 `A01`、`A02`
- `account_name` 保留真实账号名
- `account_slug` 用小写英文、数字和连字符；如果不会翻译，可用拼音或安全短名
- 后续所有样本、分析、截图都引用 `account_id`

## 样本 ID 规则

每篇文章使用：

```text
<account_id>-<三位序号>
```

例如：

```text
A-001
A-002
B-001
C-001
```

文件命名：

```text
raw-materials/accounts/A-axu-friends/A-001-为什么我不再手写prompt.md
raw-materials/accounts/B-ai-weekly/B-001-agent工具清单.md
raw-materials/screenshots/A-001-01.png
analysis/articles/A-001-structure-language.md
```

## sample-map.md

每次蒸馏必须创建 `analysis/sample-map.md`，作为逻辑索引。

模板：

```md
# 样本地图

## 账号索引

| account_id | account_name | account_slug | account_dir | notes |
|---|---|---|---|---|
| A | | | raw-materials/accounts/A-xxx/ | |
| B | | | raw-materials/accounts/B-xxx/ | |

## 文章样本

| sample_id | account_id | account_name | title | source_url | local_path | material_type | publish_date | user_reason | classification_status |
|---|---|---|---|---|---|---|---|---|---|
| A-001 | A | | | | raw-materials/accounts/A-xxx/A-001-xxx.md | 全文 | | | 待分类 |
| B-001 | B | | | | raw-materials/accounts/B-xxx/B-001-xxx.md | 摘录 | | | 待分类 |
```

`material_type` 可选：

- 全文
- 摘录
- 截图
- 链接未抓取
- 用户笔记

`classification_status` 可选：

- 待分类
- 已分类
- 证据不足

## 分析文件命名

文章类型分类：

```text
analysis/article-type-classification.md
```

单账号画像：

```text
analysis/accounts/A-account-profile.md
analysis/accounts/B-account-profile.md
```

单篇结构语言拆解：

```text
analysis/articles/A-001-structure-language.md
analysis/articles/B-001-structure-language.md
```

多账号融合：

```text
synthesis/multi-account-synthesis.md
```

用户写作系统：

```text
synthesis/user-writing-system.md
```

纠偏记录：

```text
synthesis/correction-log.md
```

最终可交付物：

```text
deliverables/writing-rulebook.md
deliverables/outline-templates.md
deliverables/review-checklist.md
```

## 缺失信息处理

如果不知道账号名：

- 临时使用 `A-unknown`、`B-unknown`
- 在 `sample-map.md` 标注待补充

如果只有链接没有正文：

- 先放到 `raw-materials/links.md`
- `sample-map.md` 的 `material_type` 标为 `链接未抓取`
- 不做高置信度风格判断

如果同一账号改名：

- `account_id` 保持不变
- 在 `account_name` 或备注中记录历史名称

## 关键原则

- 目录负责物理归档。
- `sample-map.md` 负责逻辑索引。
- `account_id` 负责跨文件引用。
- `sample_id` 负责单篇文章追踪。
- 原始素材和分析结果分开。
- Skill 目录不存放项目素材。
