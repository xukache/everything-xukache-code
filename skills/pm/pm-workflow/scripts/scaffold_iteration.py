#!/usr/bin/env python3
"""Create a versioned PM workflow folder for Markdown source and HTML demo delivery."""

from __future__ import annotations

import argparse
import datetime as dt
import html
import re
from pathlib import Path


def slugify(value: str, fallback: str) -> str:
    text = value.strip().lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = re.sub(r"-+", "-", text).strip("-")
    return text or fallback


def write_if_missing(path: Path, content: str) -> None:
    if not path.exists():
        path.write_text(content, encoding="utf-8")


def index_html(product: str, iteration: str) -> str:
    title = html.escape(f"{product} - {iteration}")
    return f"""<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <style>
    body {{ margin: 0; font-family: Arial, "Microsoft YaHei", sans-serif; color: #172033; background: #f6f8fb; }}
    main {{ width: min(960px, calc(100vw - 40px)); margin: 64px auto; }}
    h1 {{ margin: 0 0 8px; font-size: 30px; }}
    p {{ color: #5b6472; line-height: 1.7; }}
    .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 28px; }}
    a {{ display: block; padding: 20px; border: 1px solid #d8dee8; border-radius: 8px; background: #fff; color: #172033; text-decoration: none; }}
    a:hover {{ border-color: #2563eb; box-shadow: 0 10px 28px rgba(37, 99, 235, .12); }}
    strong {{ display: block; margin-bottom: 8px; }}
  </style>
</head>
<body>
  <main>
    <h1>{title}</h1>
    <p>这是本次需求迭代的演示入口。Markdown 文档用于版本管理，HTML 页面用于评审演示。完成需求澄清后，请替换占位内容，并保持原型、PRD、流程图、开发交接和最终交付说明从这里可访问。</p>
    <section class="grid" aria-label="交付物入口">
      <a href="prototype.html"><strong>交互原型</strong><span>演示核心页面、主流程和 PRD 浮标。</span></a>
      <a href="prd.html"><strong>PRD 文档</strong><span>汇总背景、范围、规则、流程和验收标准。</span></a>
      <a href="flow.html"><strong>Mermaid 流程图</strong><span>展示主流程、状态流转和异常分支；源文件见 flow.md。</span></a>
      <a href="dev-handoff.html"><strong>开发交接</strong><span>记录需求侧实体、页面动作、规则和验收清单。</span></a>
      <a href="final-delivery.html"><strong>最终交付说明</strong><span>评审通过后记录确认范围、交付物和后续决策项。</span></a>
      <a href="README.md"><strong>Markdown 文档索引</strong><span>进入可版本管理的正式文档入口。</span></a>
      <a href="notes/requirements.md"><strong>需求笔记</strong><span>记录业务沟通、后续决策项和版本变更。</span></a>
    </section>
  </main>
</body>
</html>
"""


def prototype_html(product: str, iteration: str) -> str:
    title = html.escape(f"{product} 原型 - {iteration}")
    return f"""<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <style>
    body {{ margin: 0; font-family: Arial, "Microsoft YaHei", sans-serif; background: #f5f7fb; color: #172033; }}
    header {{ padding: 20px 28px; background: #fff; border-bottom: 1px solid #d8dee8; }}
    main {{ width: min(1180px, calc(100vw - 40px)); margin: 24px auto 96px; }}
    .toolbar {{ display: flex; gap: 12px; align-items: center; justify-content: space-between; margin-bottom: 16px; }}
    .panel {{ border: 1px solid #d8dee8; border-radius: 8px; background: #fff; padding: 18px; }}
    .muted {{ color: #687386; }}
    .prd-fab {{ position: fixed; right: 24px; bottom: 24px; z-index: 50; width: 52px; height: 52px; border: 0; border-radius: 12px; background: #111827; color: #fff; font-weight: 700; box-shadow: 0 12px 30px rgba(17,24,39,.22); cursor: pointer; }}
    .prd-panel {{ position: fixed; right: 24px; bottom: 88px; z-index: 49; width: min(420px, calc(100vw - 32px)); max-height: min(680px, calc(100vh - 120px)); display: none; overflow: hidden; border: 1px solid #d1d5db; border-radius: 8px; background: #fff; box-shadow: 0 18px 60px rgba(15,23,42,.2); }}
    .prd-panel.is-open {{ display: block; }}
    .prd-panel__header {{ display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border-bottom: 1px solid #e5e7eb; }}
    .prd-panel__header button {{ border: 0; background: transparent; font-size: 22px; cursor: pointer; }}
    .prd-panel__body {{ max-height: calc(min(680px, calc(100vh - 120px)) - 54px); overflow: auto; padding: 16px; }}
    .prd-panel__body h3 {{ margin: 14px 0 6px; font-size: 14px; }}
    .prd-panel__body p, .prd-panel__body li {{ font-size: 13px; line-height: 1.6; }}
  </style>
</head>
<body>
  <header>
    <strong>{title}</strong>
    <div class="muted">请根据真实需求替换本页占位内容。</div>
  </header>
  <main>
    <div class="toolbar">
      <h1>核心工作台</h1>
      <a href="index.html">返回索引</a>
    </div>
    <section class="panel">
      <h2>主流程演示区</h2>
      <p class="muted">在这里实现业务方需要确认的关键页面、字段、状态和操作。</p>
    </section>
  </main>
  <button class="prd-fab" type="button" onclick="togglePrdPanel()" aria-label="打开需求说明">PRD</button>
  <aside class="prd-panel" id="prdPanel" aria-hidden="true">
    <div class="prd-panel__header">
      <strong>页面需求说明</strong>
      <button type="button" onclick="togglePrdPanel()" aria-label="关闭需求说明">×</button>
    </div>
    <div class="prd-panel__body">
      <section>
        <h3>页面目标</h3>
        <p>说明该页面帮助哪个角色完成什么业务动作。</p>
      </section>
      <section>
        <h3>验收标准</h3>
        <ul>
          <li>业务方可以通过本页面演示并确认主流程。</li>
        </ul>
      </section>
    </div>
  </aside>
  <script>
    function togglePrdPanel() {{
      const panel = document.getElementById('prdPanel');
      const isOpen = panel.classList.toggle('is-open');
      panel.setAttribute('aria-hidden', String(!isOpen));
    }}
  </script>
</body>
</html>
"""


def prd_html(product: str, iteration: str) -> str:
    title = html.escape(f"{product} PRD - {iteration}")
    return f"""<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <style>
    body {{ margin: 0; font-family: Arial, "Microsoft YaHei", sans-serif; color: #172033; background: #fff; }}
    main {{ width: min(920px, calc(100vw - 40px)); margin: 48px auto 80px; }}
    h1 {{ font-size: 30px; }}
    h2 {{ margin-top: 32px; padding-bottom: 8px; border-bottom: 1px solid #d8dee8; }}
    li {{ margin: 8px 0; line-height: 1.7; }}
    a {{ color: #2563eb; }}
  </style>
</head>
<body>
  <main>
    <a href="index.html">返回索引</a>
    <h1>{title}</h1>
    <p>正式版本管理源文件：<a href="prd.md">prd.md</a></p>
    <h2>1. 背景与目标</h2>
    <ul><li>待补充。</li></ul>
    <h2>2. 用户与场景</h2>
    <ul><li>待补充。</li></ul>
    <h2>3. 需求范围</h2>
    <ul><li>必须有 / 后置 / 不做。</li></ul>
    <h2>4. 核心流程</h2>
    <ul><li>待补充流程图或步骤。</li></ul>
    <h2>5. 功能需求</h2>
    <ul><li>待补充。</li></ul>
    <h2>6. 字段与业务规则</h2>
    <ul><li>待补充。</li></ul>
    <h2>7. 算法与数据要求</h2>
    <ul><li>待补充输入、输出、指标、兜底和风险。</li></ul>
    <h2>8. 验收标准</h2>
    <ul><li>待补充。</li></ul>
    <h2>9. 待确认问题 / 后续决策项</h2>
    <ul><li>待补充。</li></ul>
  </main>
</body>
</html>
"""


def simple_doc_html(product: str, iteration: str, doc_title: str, source_file: str, intro: str) -> str:
    title = html.escape(f"{product} {doc_title} - {iteration}")
    intro_html = html.escape(intro)
    return f"""<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <style>
    body {{ margin: 0; font-family: Arial, "Microsoft YaHei", sans-serif; color: #172033; background: #fff; }}
    main {{ width: min(920px, calc(100vw - 40px)); margin: 48px auto 80px; }}
    h1 {{ font-size: 30px; }}
    p, li {{ line-height: 1.7; }}
    .panel {{ border: 1px solid #d8dee8; border-radius: 8px; padding: 18px; background: #f8fafc; }}
    a {{ color: #2563eb; }}
  </style>
</head>
<body>
  <main>
    <a href="index.html">返回索引</a>
    <h1>{title}</h1>
    <p>{intro_html}</p>
    <section class="panel">
      <strong>版本管理源文件</strong>
      <p><a href="{html.escape(source_file)}">{html.escape(source_file)}</a></p>
      <p>请在 Markdown 中维护正式内容，本 HTML 仅作为评审演示入口。</p>
    </section>
  </main>
</body>
</html>
"""


def readme_md(product: str, iteration: str) -> str:
    return f"""# {product} / {iteration} 交付索引

状态：待评审

## 文档入口

| 文档 | Markdown | HTML |
| --- | --- | --- |
| PRD | [prd.md](prd.md) | [prd.html](prd.html) |
| Mermaid 流程图 | [flow.md](flow.md) | [flow.html](flow.html) |
| 开发交接 | [dev-handoff.md](dev-handoff.md) | [dev-handoff.html](dev-handoff.html) |
| 最终交付说明 | [final-delivery.md](final-delivery.md) | [final-delivery.html](final-delivery.html) |
| 需求笔记 | [notes/requirements.md](notes/requirements.md) | - |
| 交互原型 | - | [prototype.html](prototype.html) |
| 演示入口 | - | [index.html](index.html) |

## 职责边界

本轮交付聚焦业务真实需求梳理、产品原型和开发可读文档，不默认输出技术架构、数据库设计、正式 API 契约或开发排期。

## 当前范围

- 待补充已确认范围。

## 本期不做

- 待补充。

## 后续决策项

- 待补充。
"""


def prd_md(product: str, iteration: str) -> str:
    return f"""# {product} PRD - {iteration}

状态：待评审

## 1. 背景与目标

- 待补充。

## 2. 用户与场景

- 待补充。

## 3. 需求范围

| 分类 | 内容 |
| --- | --- |
| 必须有 |  |
| 后置 |  |
| 不做 |  |
| 风险/后续决策项 |  |

## 4. 信息架构与页面

- 待补充。

## 5. 核心流程

见 [flow.md](flow.md)。

## 6. 功能需求

- 待补充。

## 7. 字段与业务规则

- 待补充。

## 8. 算法与数据要求

- 输入：
- 输出：
- 指标：
- 人工兜底：

## 9. 权限

- 待补充。

## 10. 指标与埋点

- 待补充。

## 11. 验收标准

- Given 待补充
- When 待补充
- Then 待补充

## 12. 本期不做

- 待补充。

## 13. 后续决策项

- 待补充。
"""


def flow_md(product: str, iteration: str) -> str:
    return f"""# {product} Mermaid 流程图 - {iteration}

状态：待评审

## 1. 主流程

```mermaid
flowchart TD
  A[开始] --> B[用户进入工作流]
  B --> C{{是否满足提交条件}}
  C -->|是| D[提交并进入下一环节]
  C -->|否| E[补充信息或处理异常]
  E --> B
  D --> F[结束]
```

## 2. 状态规则

| 状态 | 负责人 | 进入条件 | 退出条件 |
| --- | --- | --- | --- |
| 待补充 | 待补充 | 待补充 | 待补充 |

## 3. 异常与人工兜底

- 待补充。
"""


def dev_handoff_md(product: str, iteration: str) -> str:
    return f"""# {product} 开发交接 - {iteration}

状态：待评审

## 职责边界

本文档是需求侧交接材料，不替代技术架构、数据库设计、正式 API 契约或开发排期。

## 1. MVP 目标与边界

- 待补充。

## 2. 角色与权限矩阵

| 角色 | 可查看 | 可操作 | 备注 |
| --- | --- | --- | --- |
| 待补充 |  |  |  |

## 3. 页面与动作清单

| 页面 | 关键动作 | 业务规则 | 验收标准 |
| --- | --- | --- | --- |
| 待补充 |  |  |  |

## 4. 核心实体（需求视角）

- 待补充。

## 5. 状态与规则

见 [flow.md](flow.md)。

## 6. 指标与埋点建议

- 待补充。

## 7. 开发验收清单

- 待补充。

## 8. 后续决策项

- 待补充。
"""


def final_delivery_md(product: str, iteration: str) -> str:
    return f"""# {product} 最终交付说明 - {iteration}

状态：待评审

## 1. 评审状态

- 待补充。

## 2. 确认范围

- 待补充。

## 3. 交付物清单

- [README.md](README.md)
- [prd.md](prd.md)
- [flow.md](flow.md)
- [dev-handoff.md](dev-handoff.md)
- [notes/requirements.md](notes/requirements.md)
- [prototype.html](prototype.html)

## 4. 本期不做

- 待补充。

## 5. 后续决策项

- 待补充。

## 6. 交付完成线

本交付停在确认版产品需求文档和原型归档。除非用户明确要求进入研发实现，不继续输出技术架构、数据库设计、正式 API 契约或开发排期。
"""


def requirements_md(product: str, iteration: str) -> str:
    return f"""# {product} / {iteration} 需求笔记

## 需求来源

- 原始诉求：
- 业务背景：
- 沟通对象：

## 已确认事实

- 

## 待验证假设

- 

## 问题定义

- 目标用户：
- 业务问题：
- 当前流程：
- 核心痛点：
- 期望结果：
- 成功指标：
- 关键约束：
- 本次不做：

## 问题陈述草案

```text
I am:
Trying to:
But:
Because:
This causes:
```

## JTBD / 真实任务

- Functional job：
- Current workaround：
- Pain：
- Cost of pain：
- Desired gain：
- Alternative solutions：

## 当前流程与替代方案

- 当前流程：
- 当前工具/系统/表格：
- 关键交接点：
- 现有替代方案：
- 最易出错步骤：

## 业务影响与成功信号

- 业务影响：
- 成功指标：
- 用户行为信号：
- 可接受的第一版标准：

## 范围边界

- 必须解决：
- 可以后置：
- 明确不做：
- 风险待确认：

## 后续澄清问题

- 

## 方案范围

| 类型 | 内容 |
| --- | --- |
| 必须有 |  |
| 后置 |  |
| 不做 |  |
| 风险待确认 |  |

## 原型设计输入

- 产品语境：
- 设计主题：
- 主题源文件：
- 选择原因：
- 品牌/参考来源：
- 是否来自 Open Design 扩展库：
- ui-ux-pro-max 是否补充：
- ui-ux-pro-max 补充内容：

## 业务规则

- 

## 算法与数据

- 输入：
- 输出：
- 指标：
- 人工兜底：

## 验收标准

- 

## 评审决策

- 

## 后续决策项

- 

## 变更记录

- {dt.date.today().isoformat()}：初始化迭代目录。
"""


def main() -> int:
    parser = argparse.ArgumentParser(description="Create PM Markdown source and HTML demo iteration files.")
    parser.add_argument("--root", default="pm-work", help="Root output directory.")
    parser.add_argument("--product", required=True, help="Product line name.")
    parser.add_argument("--iteration", required=True, help="Iteration name.")
    parser.add_argument("--slug", default="", help="ASCII product slug. Recommended for Chinese product names.")
    parser.add_argument("--date", default=dt.date.today().strftime("%Y%m%d"), help="Version date, default today.")
    args = parser.parse_args()

    product_slug = slugify(args.slug or args.product, "product")
    iteration_slug = slugify(args.iteration, "iteration")
    base = Path(args.root) / product_slug / f"v{args.date}-{iteration_slug}"

    (base / "notes").mkdir(parents=True, exist_ok=True)
    (base / "assets").mkdir(parents=True, exist_ok=True)

    write_if_missing(base / "index.html", index_html(args.product, args.iteration))
    write_if_missing(base / "prototype.html", prototype_html(args.product, args.iteration))
    write_if_missing(base / "prd.html", prd_html(args.product, args.iteration))
    write_if_missing(base / "flow.html", simple_doc_html(args.product, args.iteration, "流程图", "flow.md", "流程图必须在 flow.md 中维护 Mermaid 源码。"))
    write_if_missing(base / "dev-handoff.html", simple_doc_html(args.product, args.iteration, "开发交接", "dev-handoff.md", "开发交接只表达需求侧建议，不替代技术方案或排期。"))
    write_if_missing(base / "final-delivery.html", simple_doc_html(args.product, args.iteration, "最终交付说明", "final-delivery.md", "评审通过后在 final-delivery.md 中记录确认范围和后续决策项。"))
    write_if_missing(base / "README.md", readme_md(args.product, args.iteration))
    write_if_missing(base / "prd.md", prd_md(args.product, args.iteration))
    write_if_missing(base / "flow.md", flow_md(args.product, args.iteration))
    write_if_missing(base / "dev-handoff.md", dev_handoff_md(args.product, args.iteration))
    write_if_missing(base / "final-delivery.md", final_delivery_md(args.product, args.iteration))
    write_if_missing(base / "notes" / "requirements.md", requirements_md(args.product, args.iteration))

    print(base)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
