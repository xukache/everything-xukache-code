#!/usr/bin/env python3
"""Create a versioned PM workflow folder for Markdown source and HTML demo delivery."""

from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import re
import shutil
from pathlib import Path


SKILL_ROOT = Path(__file__).resolve().parents[1]
FLOW_VIEWER_VENDOR = SKILL_ROOT / "assets" / "vendor" / "flow-viewer"


def slugify(value: str, fallback: str) -> str:
    text = value.strip().lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = re.sub(r"-+", "-", text).strip("-")
    return text or fallback


def write_if_missing(path: Path, content: str) -> None:
    if not path.exists():
        path.write_text(content, encoding="utf-8")


def copy_flow_viewer_vendor(base: Path) -> None:
    """Copy local Mermaid viewer dependencies into a generated delivery folder."""
    destination = base / "assets" / "vendor" / "flow-viewer"
    destination.mkdir(parents=True, exist_ok=True)
    for filename in [
        "mermaid.min.js",
        "svg-pan-zoom.min.js",
        "MERMAID_LICENSE",
        "SVG_PAN_ZOOM_LICENSE",
        "THIRD_PARTY_LICENSES.md",
    ]:
        source = FLOW_VIEWER_VENDOR / filename
        if source.exists():
            shutil.copy2(source, destination / filename)


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
      <a href="prototype.html"><strong>交互原型入口</strong><span>全量演示 must-have 功能、动作反馈、状态变化和 PRD 浮标。</span></a>
      <a href="prototype/example-page.html"><strong>多页面原型模板</strong><span>当单页无法承载完整交互时，将页面拆入 prototype/ 目录。</span></a>
      <a href="requirements-list.md"><strong>需求清单</strong><span>记录问题陈述、JTBD、是否值得做、优先级、风险和验收信号。</span></a>
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
    .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }}
    .card {{ border: 1px solid #d8dee8; border-radius: 8px; background: #fff; padding: 16px; }}
    table {{ width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }}
    th, td {{ padding: 10px 12px; border: 1px solid #e1e7ef; text-align: left; vertical-align: top; }}
    th {{ background: #f8fafc; }}
    .badge {{ display: inline-flex; align-items: center; padding: 3px 8px; border-radius: 999px; background: #e8f1ff; color: #1d4ed8; font-size: 12px; }}
    .muted {{ color: #687386; }}
    .actions {{ display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }}
    .button {{ display: inline-flex; align-items: center; justify-content: center; min-height: 34px; padding: 0 12px; border-radius: 6px; border: 1px solid #cbd5e1; background: #fff; color: #172033; text-decoration: none; cursor: pointer; }}
    .button.primary {{ border-color: #2563eb; background: #2563eb; color: #fff; }}
    .notice {{ margin-top: 12px; padding: 12px; border-radius: 6px; background: #f0fdf4; color: #166534; display: none; }}
    .notice.is-visible {{ display: block; }}
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
      <h1>原型入口与交互覆盖</h1>
      <a href="index.html">返回索引</a>
    </div>
    <section class="panel">
      <h2>全量可演示要求</h2>
      <p class="muted">本页是原型入口。实际原型必须覆盖所有已确认 must-have 功能的入口、动作、反馈、状态变化、异常路径和动作级验收。复杂产品请把页面拆入 <code>prototype/</code> 目录。</p>
      <div class="grid">
        <div class="card">
          <span class="badge">必须覆盖</span>
          <h3>must-have 功能</h3>
          <p class="muted">每个 must-have 功能至少有一个可点击成功路径，不能只放在卡片、文字或 PRD 浮标里。</p>
        </div>
        <div class="card">
          <span class="badge">必须可见</span>
          <h3>状态与反馈</h3>
          <p class="muted">提交、审核、退回、分配、保存等动作要展示状态变化、成功反馈和关键异常反馈。</p>
        </div>
        <div class="card">
          <span class="badge">可拆多页</span>
          <h3>prototype/</h3>
          <p class="muted">当单页承载不清楚时，使用多页面原型，并保持导航、返回路径和 PRD 面板一致。</p>
        </div>
      </div>
      <div class="actions">
        <a class="button primary" href="prototype/example-page.html">打开多页面原型模板</a>
        <button class="button" type="button" onclick="simulateAction()">演示状态反馈</button>
      </div>
      <div class="notice" id="demoNotice">示例动作已完成：列表/详情中的状态、计数或队列应在真实原型中同步表现。</div>
    </section>
    <section class="panel" style="margin-top:16px">
      <h2>原型交互覆盖矩阵</h2>
      <p class="muted">生成正式原型时，用真实功能替换这些示例行；每个 must-have 功能都必须有一行。</p>
      <table>
        <thead>
          <tr>
            <th>Must-have 功能</th>
            <th>原型页面</th>
            <th>入口/控件</th>
            <th>用户动作</th>
            <th>成功反馈</th>
            <th>状态/数据变化</th>
            <th>异常路径</th>
            <th>验收场景</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>核心功能示例</td>
            <td><a href="prototype/example-page.html">prototype/example-page.html</a></td>
            <td>主按钮 / 表格行操作 / 抽屉动作</td>
            <td>选择数据并提交</td>
            <td>Toast、列表刷新或详情状态更新</td>
            <td>对象状态、负责人、计数或队列变化</td>
            <td>必填缺失、无权限、状态冲突</td>
            <td>Given/When/Then 可观察结果</td>
          </tr>
        </tbody>
      </table>
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
        <p>作为原型入口，汇总 must-have 功能覆盖情况，并链接到单页或多页面交互原型。</p>
      </section>
      <section>
        <h3>动作级验收标准</h3>
        <ul>
          <li>每个已确认 must-have 功能都有可点击入口和可观察反馈。</li>
          <li>关键动作能展示成功、失败或无权限等必要状态。</li>
          <li>多页面原型能从本入口进入，并能返回索引或原型入口。</li>
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
    function simulateAction() {{
      document.getElementById('demoNotice').classList.add('is-visible');
    }}
  </script>
</body>
</html>
"""


def prototype_example_page_html(product: str, iteration: str) -> str:
    title = html.escape(f"{product} 多页面原型模板 - {iteration}")
    return f"""<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <style>
    body {{ margin: 0; font-family: Arial, "Microsoft YaHei", sans-serif; background: #f6f8fb; color: #172033; }}
    header {{ display: flex; justify-content: space-between; align-items: center; padding: 18px 28px; background: #fff; border-bottom: 1px solid #d8dee8; }}
    main {{ width: min(1120px, calc(100vw - 40px)); margin: 24px auto 80px; }}
    .panel {{ border: 1px solid #d8dee8; border-radius: 8px; background: #fff; padding: 18px; margin-bottom: 16px; }}
    .muted {{ color: #687386; }}
    .layout {{ display: grid; grid-template-columns: 260px 1fr; gap: 16px; }}
    @media (max-width: 860px) {{ .layout {{ grid-template-columns: 1fr; }} }}
    button, .button {{ display: inline-flex; align-items: center; justify-content: center; min-height: 34px; padding: 0 12px; border-radius: 6px; border: 1px solid #cbd5e1; background: #fff; color: #172033; text-decoration: none; cursor: pointer; }}
    button.primary {{ border-color: #2563eb; background: #2563eb; color: #fff; }}
    .toast {{ display: none; margin-top: 12px; padding: 12px; border-radius: 6px; background: #ecfdf5; color: #166534; }}
    .toast.is-visible {{ display: block; }}
    .error {{ display: none; margin-top: 12px; padding: 12px; border-radius: 6px; background: #fef2f2; color: #991b1b; }}
    .error.is-visible {{ display: block; }}
    table {{ width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }}
    th, td {{ padding: 10px 12px; border: 1px solid #e1e7ef; text-align: left; }}
    th {{ background: #f8fafc; }}
    .status {{ display: inline-flex; padding: 3px 8px; border-radius: 999px; background: #e0f2fe; color: #075985; font-size: 12px; }}
  </style>
</head>
<body>
  <header>
    <strong>{title}</strong>
    <nav><a href="../prototype.html">返回原型入口</a> · <a href="../index.html">返回索引</a></nav>
  </header>
  <main>
    <section class="panel">
      <h1>多页面原型模板</h1>
      <p class="muted">把本页复制为真实业务页面，如 overview.html、tasks.html、review.html。每个页面都应承载明确角色、关键动作、状态反馈和 PRD 面板。</p>
    </section>
    <div class="layout">
      <aside class="panel">
        <h2>页面职责</h2>
        <p class="muted">说明本页服务哪个角色、处理哪个对象、承载哪些 must-have 功能。</p>
        <ul>
          <li>主要角色：</li>
          <li>主对象：</li>
          <li>主动作：</li>
          <li>不放在本页：</li>
        </ul>
      </aside>
      <section class="panel">
        <h2>可点击交互示例</h2>
        <p class="muted">正式原型中用真实业务字段、状态和动作替换示例。</p>
        <button class="primary" type="button" onclick="markDone()">提交并更新状态</button>
        <button type="button" onclick="showError()">触发异常反馈</button>
        <div class="toast" id="successToast">提交成功：状态已从“待处理”变为“待审核”。</div>
        <div class="error" id="errorToast">提交失败：缺少必填字段或当前状态不允许提交。</div>
        <table>
          <thead><tr><th>对象</th><th>当前状态</th><th>负责人</th><th>下一步</th></tr></thead>
          <tbody><tr><td>示例对象</td><td><span class="status" id="status">待处理</span></td><td>当前用户</td><td>提交后进入下一角色队列</td></tr></tbody>
        </table>
      </section>
    </div>
  </main>
  <script>
    function markDone() {{
      document.getElementById('status').textContent = '待审核';
      document.getElementById('successToast').classList.add('is-visible');
      document.getElementById('errorToast').classList.remove('is-visible');
    }}
    function showError() {{
      document.getElementById('errorToast').classList.add('is-visible');
      document.getElementById('successToast').classList.remove('is-visible');
    }}
  </script>
</body>
</html>
"""


def prototype_readme_md(product: str, iteration: str) -> str:
    return f"""# {product} / {iteration} 多页面原型目录

`prototype.html` 是原型入口页。本目录用于承载复杂产品的多页面交互原型。

## 使用规则

- 每个已确认 must-have 功能都必须有可点击原型路径。
- 页面必须表现入口、触发控件、成功反馈、状态/数据变化和关键异常反馈。
- 页面之间的导航、返回路径、命名和角色入口必须一致。
- 不得用静态页面、PRD 浮标或文字说明替代关键交互。

## 建议页面

| 页面文件 | 页面职责 | 承载功能 | 主要角色 |
| --- | --- | --- | --- |
| example-page.html | 多页面原型模板 | 复制后替换为真实业务页面 | 产品/设计/研发评审 |
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
    body {{ margin: 0; font-family: Arial, "Microsoft YaHei", sans-serif; color: #172033; background: #f7f9fc; }}
    main {{ width: min(1120px, calc(100vw - 40px)); margin: 40px auto 80px; }}
    h1 {{ margin: 16px 0 8px; font-size: 32px; }}
    h2 {{ margin-top: 32px; padding-bottom: 8px; border-bottom: 1px solid #d8dee8; }}
    h3 {{ margin: 20px 0 8px; }}
    p, li {{ line-height: 1.7; }}
    table {{ width: 100%; border-collapse: collapse; margin: 12px 0 20px; background: #fff; }}
    th, td {{ border: 1px solid #d8dee8; padding: 10px 12px; text-align: left; vertical-align: top; }}
    th {{ background: #eef2f7; }}
    .toc {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; margin: 20px 0 28px; }}
    .toc a, .panel {{ display: block; border: 1px solid #d8dee8; border-radius: 8px; background: #fff; padding: 14px 16px; color: #172033; text-decoration: none; }}
    .muted {{ color: #687386; }}
    a {{ color: #2563eb; }}
  </style>
</head>
<body>
  <main>
    <a href="index.html">返回索引</a>
    <h1>{title}</h1>
    <p class="muted">正式版本管理源文件：<a href="prd.md">prd.md</a>。本页是评审阅读入口，最终内容请以 Markdown 源文件维护。</p>
    <nav class="toc" aria-label="PRD 目录">
      <a href="#summary">执行摘要</a>
      <a href="#problem">问题证据</a>
      <a href="#users">用户与场景</a>
      <a href="#scope">范围边界</a>
      <a href="#requirements">功能详规</a>
      <a href="#acceptance">验收与风险</a>
    </nav>
    <section class="panel">
      <strong>生产级 PRD 完成线</strong>
      <p>每个必须有功能都应能追溯到用户问题、页面/流程、字段、业务规则、权限、异常和验收标准。评审通过后不得保留空表、占位符或仅有章节名的内容。</p>
    </section>
    <h2 id="summary">1. 执行摘要</h2>
    <p>用一段话说明：为哪些用户解决什么问题，通过什么方案达成什么业务或用户结果。</p>
    <h2 id="problem">2. 问题证据</h2>
    <table><thead><tr><th>维度</th><th>应填写内容</th></tr></thead><tbody><tr><td>当前流程</td><td>用户今天如何完成任务，涉及哪些工具、角色和交接点。</td></tr><tr><td>痛点代价</td><td>慢、错、漏、返工、风险、无法追踪等具体影响。</td></tr><tr><td>证据</td><td>用户访谈、业务数据、工单、观察记录或明确标注的假设。</td></tr></tbody></table>
    <h2 id="users">3. 用户与场景</h2>
    <p>列出主要角色、目标、入口、频率、当前替代方案和 Jobs-to-be-Done。</p>
    <h2 id="scope">4. 范围边界</h2>
    <p>用必须有、后置、不做、风险待确认四类说明取舍，并写清原因。</p>
    <h2 id="requirements">5. 功能详规</h2>
    <p>每个功能至少包含用户/角色、目标、入口、前置条件、触发控件、触发动作、系统响应、字段与数据、权限规则、状态变化、成功/失败反馈、异常边界、动作级验收标准、关联原型和埋点建议。</p>
    <h2 id="acceptance">6. 验收与风险</h2>
    <p>使用用户故事和 Gherkin 标准描述可测试验收条件，并记录依赖、风险、缓解方案和开放问题。</p>
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


def flow_diagrams(product: str) -> list[dict[str, str]]:
    return [
        {
            "id": "main-workflow",
            "title": "主流程",
            "description": "从需求入口到交付确认的端到端路径，后续应替换为本产品的真实业务流。",
            "source": f"""flowchart TD
  A[业务方提出需求] --> B[PM 澄清问题与用户]
  B --> C{{问题定义是否确认}}
  C -->|否| B
  C -->|是| D[确认范围、规则和验收信号]
  D --> E[确认交互架构和菜单]
  E --> F[生成并打磨 HTML 原型]
  F --> G{{原型是否通过评审}}
  G -->|否| E
  G -->|是| H[深化 PRD、流程图、开发交接]
  H --> I[最终交付归档]
  I --> J[开发评审准备]
""",
        },
        {
            "id": "cross-role-flow",
            "title": "跨角色协作流",
            "description": "展示业务方、PM、设计/前端、研发/测试之间的协作顺序。",
            "source": f"""sequenceDiagram
  participant Biz as 业务方/需求提出者
  participant PM as 产品负责人
  participant UX as 原型/设计
  participant Eng as 研发/测试
  Biz->>PM: 提供目标、场景、痛点和约束
  PM->>Biz: 确认问题定义和范围边界
  PM->>UX: 交付交互架构、页面职责和主题选择
  UX->>Biz: 演示可交互原型
  Biz->>PM: 确认或提出修改
  PM->>Eng: 提交 PRD、流程图和开发交接
  Eng->>PM: 反馈实现疑问、风险和验收缺口
  PM->>Biz: 回收后续决策项
""",
        },
        {
            "id": "status-lifecycle",
            "title": "需求交付状态机",
            "description": "标记一次 PM Workflow 迭代的状态生命周期。",
            "source": """stateDiagram-v2
  [*] --> 需求收集
  需求收集 --> 问题定义待确认
  问题定义待确认 --> 需求收集: 信息不足
  问题定义待确认 --> 范围规则待确认: 问题确认
  范围规则待确认 --> 交互架构待确认: 范围确认
  交互架构待确认 --> 原型评审: 架构确认
  原型评审 --> 交互架构待确认: 页面结构需调整
  原型评审 --> 正式文档深化: 原型确认
  正式文档深化 --> 最终交付: 文档质量通过
  最终交付 --> [*]
""",
        },
        {
            "id": "exception-flow",
            "title": "异常与返工路径",
            "description": "说明信息不足、范围漂移、文档不完整或图表渲染失败时的回退路径。",
            "source": """flowchart TD
  A[进入交付阶段] --> B{是否缺关键事实}
  B -->|是| C[回到需求澄清并记录缺口]
  B -->|否| D{是否出现范围漂移}
  D -->|是| E[写入后续决策项并等待确认]
  D -->|否| F{文档是否达到详规标准}
  F -->|否| G[补齐字段、规则、验收和风险]
  F -->|是| H{flow.html 是否成功渲染}
  H -->|否| I[检查本地 vendor 并显示错误和源码]
  H -->|是| J[交付评审]
  C --> A
  E --> A
  G --> F
  I --> H
""",
        },
    ]


def flow_viewer_html(product: str, iteration: str) -> str:
    title = html.escape(f"{product} 流程图 - {iteration}")
    data = json.dumps(flow_diagrams(product), ensure_ascii=False).replace("</", "<\\/")
    return f"""<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <style>
    :root {{ --bg:#f6f8fb; --panel:#fff; --text:#172033; --sub:#64748b; --line:#d8dee8; --primary:#2563eb; --soft:#eff6ff; --danger:#b91c1c; }}
    * {{ box-sizing: border-box; }}
    body {{ margin: 0; font-family: Arial, "Microsoft YaHei", sans-serif; color: var(--text); background: var(--bg); }}
    header {{ display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 24px; background: var(--panel); border-bottom: 1px solid var(--line); }}
    main {{ width: min(1280px, calc(100vw - 32px)); margin: 24px auto 64px; display: grid; gap: 18px; }}
    h1 {{ margin: 0; font-size: 24px; }}
    h2 {{ margin: 0; font-size: 18px; }}
    p {{ color: var(--sub); line-height: 1.6; }}
    a {{ color: var(--primary); }}
    .links {{ display: flex; gap: 12px; flex-wrap: wrap; }}
    .diagram-card {{ background: var(--panel); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }}
    .diagram-header {{ display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 16px; border-bottom: 1px solid var(--line); }}
    .diagram-copy {{ min-width: 220px; }}
    .diagram-copy p {{ margin: 4px 0 0; font-size: 13px; }}
    .controls {{ display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }}
    button {{ min-height: 34px; border: 1px solid var(--line); border-radius: 7px; background: #fff; color: var(--text); padding: 0 10px; cursor: pointer; }}
    button:hover {{ border-color: var(--primary); color: var(--primary); }}
    .canvas {{ min-height: 420px; height: min(66vh, 680px); border-bottom: 1px solid var(--line); background: #fbfdff; overflow: hidden; display: grid; place-items: center; }}
    .canvas svg {{ max-width: none; cursor: grab; }}
    .canvas svg:active {{ cursor: grabbing; }}
    .source {{ display: none; margin: 0; padding: 16px; max-height: 360px; overflow: auto; background: #111827; color: #e5e7eb; font: 13px/1.6 Consolas, "SFMono-Regular", monospace; }}
    .source.is-open {{ display: block; }}
    .error {{ padding: 16px; color: var(--danger); background: #fef2f2; border-top: 1px solid #fecaca; }}
    .notice {{ padding: 14px 16px; border: 1px solid var(--line); border-radius: 10px; background: var(--soft); }}
  </style>
</head>
<body>
  <header>
    <div>
      <h1>{title}</h1>
      <p>默认显示离线渲染的 Mermaid SVG 画布。Markdown 源文件：<a href="flow.md">flow.md</a></p>
    </div>
    <nav class="links" aria-label="文档导航">
      <a href="index.html">返回索引</a>
      <a href="flow.md">查看 flow.md</a>
      <a href="assets/vendor/flow-viewer/THIRD_PARTY_LICENSES.md">第三方许可证</a>
    </nav>
  </header>
  <main>
    <section class="notice">
      <strong>操作提示：</strong>拖拽画布可平移，使用按钮缩放、重置或适配视图。若渲染失败，请确认 <code>assets/vendor/flow-viewer/</code> 中的本地依赖存在。
    </section>
    <div id="diagrams"></div>
  </main>
  <script src="assets/vendor/flow-viewer/mermaid.min.js"></script>
  <script src="assets/vendor/flow-viewer/svg-pan-zoom.min.js"></script>
  <script id="diagram-data" type="application/json">{data}</script>
  <script>
    const dataElement = document.getElementById('diagram-data');
    const diagrams = JSON.parse(dataElement.textContent);
    const root = document.getElementById('diagrams');
    const panZoomInstances = new Map();

    function createButton(label, handler) {{
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.addEventListener('click', handler);
      return button;
    }}

    function toggleSource(id) {{
      document.getElementById(`${{id}}-source`).classList.toggle('is-open');
    }}

    function control(id, action) {{
      const instance = panZoomInstances.get(id);
      if (!instance) return;
      if (action === 'zoomIn') instance.zoomIn();
      if (action === 'zoomOut') instance.zoomOut();
      if (action === 'reset') instance.reset();
      if (action === 'fit') {{
        instance.resize();
        instance.fit();
        instance.center();
      }}
    }}

    function cardTemplate(diagram) {{
      const card = document.createElement('article');
      card.className = 'diagram-card';
      card.innerHTML = `
        <div class="diagram-header">
          <div class="diagram-copy">
            <h2>${{diagram.title}}</h2>
            <p>${{diagram.description}}</p>
          </div>
          <div class="controls" id="${{diagram.id}}-controls"></div>
        </div>
        <div class="canvas" id="${{diagram.id}}-canvas" aria-label="${{diagram.title}} 渲染画布"></div>
        <pre class="source" id="${{diagram.id}}-source"></pre>
      `;
      root.appendChild(card);
      const controls = document.getElementById(`${{diagram.id}}-controls`);
      controls.appendChild(createButton('放大', () => control(diagram.id, 'zoomIn')));
      controls.appendChild(createButton('缩小', () => control(diagram.id, 'zoomOut')));
      controls.appendChild(createButton('适配视图', () => control(diagram.id, 'fit')));
      controls.appendChild(createButton('重置', () => control(diagram.id, 'reset')));
      controls.appendChild(createButton('查看源码', () => toggleSource(diagram.id)));
      document.getElementById(`${{diagram.id}}-source`).textContent = diagram.source;
    }}

    async function renderDiagram(diagram, index) {{
      const canvas = document.getElementById(`${{diagram.id}}-canvas`);
      try {{
        const result = await mermaid.render(`diagram-${{index}}`, diagram.source);
        canvas.innerHTML = result.svg;
        const svg = canvas.querySelector('svg');
        if (svg && window.svgPanZoom) {{
          svg.removeAttribute('height');
          svg.style.width = '100%';
          svg.style.height = '100%';
          const instance = svgPanZoom(svg, {{
            zoomEnabled: true,
            controlIconsEnabled: false,
            fit: true,
            center: true,
            minZoom: 0.2,
            maxZoom: 8
          }});
          panZoomInstances.set(diagram.id, instance);
          setTimeout(() => control(diagram.id, 'fit'), 0);
        }}
      }} catch (error) {{
        canvas.innerHTML = `<div class="error"><strong>流程图渲染失败</strong><br>${{String(error)}}</div>`;
      }}
    }}

    async function init() {{
      if (!window.mermaid) {{
        root.innerHTML = '<div class="error"><strong>Mermaid 未加载。</strong><br>请确认本地 vendor 文件已复制到 assets/vendor/flow-viewer/。</div>';
        return;
      }}
      mermaid.initialize({{ startOnLoad: false, securityLevel: 'loose', theme: 'default' }});
      diagrams.forEach(cardTemplate);
      for (let i = 0; i < diagrams.length; i += 1) {{
        await renderDiagram(diagrams[i], i);
      }}
    }}

    init();
  </script>
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
| 需求清单 | [requirements-list.md](requirements-list.md) | - |
| Mermaid 流程图 | [flow.md](flow.md) | [flow.html](flow.html) |
| 开发交接 | [dev-handoff.md](dev-handoff.md) | [dev-handoff.html](dev-handoff.html) |
| 最终交付说明 | [final-delivery.md](final-delivery.md) | [final-delivery.html](final-delivery.html) |
| 需求笔记 | [notes/requirements.md](notes/requirements.md) | - |
| 交互原型入口 | - | [prototype.html](prototype.html) |
| 多页面原型目录 | [prototype/README.md](prototype/README.md) | [prototype/example-page.html](prototype/example-page.html) |
| 演示入口 | - | [index.html](index.html) |

## 职责边界

本轮交付聚焦业务真实需求梳理、产品原型和开发可读文档，不默认输出技术架构、数据库设计、正式 API 契约或开发排期。

## 当前范围

- 在问题定义、范围确认和原型评审后填写已确认范围；未确认前只记录为需求笔记中的假设。

## 需求阶段完成线

- 需求阶段必须先完成 worker 输出和主 PM 验收。
- [requirements-list.md](requirements-list.md) 是需求清单源文件；没有确认版需求清单，不进入交互架构或原型设计。
- 每条需求都必须包含问题陈述、JTBD、是否值得做判断、证据等级、优先级、风险和验收信号。

## 原型交互覆盖要求

- `prototype.html` 是原型入口页；复杂交互拆入 `prototype/` 目录。
- 所有已确认 must-have 功能都必须能在原型中点击演示。
- 原型、PRD、流程图和开发交接中的页面、动作、状态和验收标准必须一致。
- 不得用静态一级页面、PRD 浮标或文字说明替代关键交互逻辑。

## 本期不做

- 列出本迭代明确排除的能力，并说明后续触发条件。

## 后续决策项

- 列出仍会影响开发拆解、验收或排期的问题。
"""


def requirements_list_md(product: str, iteration: str) -> str:
    return f"""# {product} 需求清单 - {iteration}

状态：待评审

## 1. 需求阶段结论

| 项 | 内容 |
| --- | --- |
| 需求阶段 worker | 已派发 / 角色化降级 / 未执行 |
| 主 PM 验收结论 | 通过 / 需补充 / 不通过 |
| 是否允许进入范围表 | 是 / 否 |
| 是否允许进入交互架构 | 是 / 否 |
| 主要未决问题 |  |

## 2. 子技能调用记录

| 子技能 | 已用/未用 | 使用原因或未用原因 | 关键输出 |
| --- | --- | --- | --- |
| problem-statement |  | 模糊需求第一闸门 |  |
| jobs-to-be-done |  | 功能诉求转真实任务 |  |
| discovery-interview-prep |  | 证据不足或需访谈 |  |
| pol-probe |  | 高风险假设或是否该做不确定 |  |
| user-story |  | 需求进入可交付表达 |  |
| user-story-splitting |  | 需求过大需拆小 |  |
| epic-breakdown-advisor |  | 复杂 Epic 或长流程拆解 |  |
| prd-development |  | PRD 准备度检查 |  |

## 3. 问题陈述

```text
用户：
想完成：
当前阻碍：
可能原因：
造成影响：
```

## 4. JTBD

| 角色 | 功能性任务 | 当前替代方案 | 痛点 | 痛点代价 | 期望收益 |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## 5. 是否值得做判断

| 功能候选 | 判断 | 理由 | 证据等级 | 建议动作 |
| --- | --- | --- | --- | --- |
|  | 做 / 先验证 / 后置 / 不做 |  | 高/中/低 |  |

## 6. 需求清单

| 需求编号 | 用户/角色 | 问题陈述 | JTBD | 用户目标 | 功能候选 | 价值/痛点代价 | 证据等级 | 是否值得做 | 优先级 | 进入一期原因 | 依赖与风险 | 验收信号 | 使用的子技能 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| REQ-001 |  |  |  |  |  |  | 高/中/低 | 做 / 先验证 / 后置 / 不做 | P0/P1/P2 |  |  |  |  |

## 7. 风险与验证清单

| 假设/风险 | 影响 | 验证方式 | 触发决策 | 使用的子技能 |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 8. 主 PM 验收记录

| 检查项 | 结果 | 说明 |
| --- | --- | --- |
| 是否有问题陈述 | 是/否 |  |
| 是否有 JTBD | 是/否 |  |
| 是否有是否值得做判断 | 是/否 |  |
| 是否形成需求清单 | 是/否 |  |
| 是否记录子技能调用情况 | 是/否 |  |
| 是否需要继续追问 | 是/否 |  |
"""


def prd_md(product: str, iteration: str) -> str:
    return f"""# {product} PRD - {iteration}

状态：待评审

## 1. 执行摘要

一句话模板：我们将为【目标用户】建设【方案/能力】，解决【当前痛点】，使【业务或用户结果】得到改善。

| 项 | 内容 |
| --- | --- |
| 目标用户 | 主要使用本能力并从中获得价值的角色 |
| 核心问题 | 当前流程中最需要解决的阻塞、风险或低效 |
| 解决方案 | 本迭代提供的核心能力，不写技术实现细节 |
| 预期结果 | 可观察的业务结果、用户行为或流程改善 |
| 成功信号 | 评审或上线后判断有效的主要指标/信号 |

## 2. 问题证据与当前流程

### 2.1 当前流程

| 步骤 | 当前做法 | 涉及角色/工具 | 痛点 | 影响 |
| --- | --- | --- | --- | --- |
| 1 | 记录现状步骤 | 角色、表格、系统、群消息等 | 慢/错/漏/不可追踪 | 对业务、质量或效率的影响 |

### 2.2 问题陈述

```text
I am:
Trying to:
But:
Because:
This causes:
```

### 2.3 证据与假设

| 类型 | 内容 | 来源 | 可信度 | 对 MVP 的影响 |
| --- | --- | --- | --- | --- |
| 已确认事实 | 来自用户确认或材料的事实 | 访谈/数据/文档 | 高/中/低 | 必须有/后置/风险 |
| 待验证假设 | 暂未验证但影响方案的判断 | PM 推断/外部参考 | 高/中/低 | 验证方式 |

## 3. 用户、场景与 JTBD

| 角色 | 目标 | 高频场景 | 当前替代方案 | 成功标准 |
| --- | --- | --- | --- | --- |
| 主要角色 | 需要完成的工作 | 触发时机和使用场景 | 现在怎么做 | 什么表现说明任务完成 |

### 3.1 Jobs-to-be-Done

| 角色 | Functional job | Pain | Cost of pain | Desired gain |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 4. 战略上下文与成功指标

| 维度 | 内容 |
| --- | --- |
| 业务目标 | 本迭代服务的业务目标或管理目标 |
| 为什么现在做 | 当前风险、机会、成本或窗口期 |
| MVP 原则 | 第一版只保护哪条核心工作流 |
| 主指标 | 本迭代最希望改善的指标 |
| 次级指标 | 需要观察但不作为唯一成败标准的指标 |
| 护栏指标 | 不应恶化的体验、质量或效率指标 |

## 5. 需求范围

| 分类 | 内容 |
| --- | --- |
| 必须有 | 第一版必须支持且直接保护核心工作流的能力 |
| 后置 | 有价值但不影响第一版闭环的能力 |
| 不做 | 明确排除的能力及原因 |
| 风险待确认 | 会影响范围、交互、数据或验收的待决问题 |

## 6. 信息架构与页面职责

| 菜单/页面 | 主要用户 | 页面目标 | 主操作 | 次操作 | 不放在这里的内容 |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## 7. 核心流程

见 [flow.md](flow.md)。

| 流程 | 目标 | 入口 | 结束状态 | 异常/回退 |
| --- | --- | --- | --- | --- |
| 主流程 | 完成核心业务闭环 |  |  |  |
| 审核/确认流程 | 需要人工判断或审批时使用 |  |  |  |
| 异常/返工流程 | 数据缺失、退回、冲突或权限不足时使用 |  |  |  |

## 8. 功能详规

### FR-1：核心能力名称

- 用户/角色：
- 目标：
- 入口：
- 前置条件：
- 触发动作：
- 触发控件：
- 系统响应：
- 字段与数据：
- 权限规则：
- 状态变化：
- 成功反馈：
- 失败/异常反馈：
- 异常/边界：
- 动作级验收标准：
- 关联页面/原型：
- 关联埋点：

## 8.1 动作级验收矩阵

| 页面 | 动作 | 触发控件 | 前置条件 | 成功结果 | 失败结果 | 状态变化 | 权限边界 | Gherkin 场景 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 页面/模块 | 新增/编辑/提交/审核/退回 | 按钮/表格行/抽屉/弹窗 | 权限、状态、数据条件 | Toast/状态更新/列表刷新 | 校验/无权限/冲突提示 | from -> to | 角色与数据范围 | AC-1 |

## 9. 字段字典

| 字段 | 含义 | 来源 | 必填 | 校验/口径 | 可见角色 | 可编辑角色 | 所在页面 |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  |  | 用户录入/系统生成/导入/算法输出 | 是/否 |  |  |  |  |

## 10. 权限矩阵

| 角色 | 可查看 | 可新增 | 可编辑 | 可审核/确认 | 可导出 | 限制 |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |

## 11. 业务规则与状态规则

| 规则编号 | 规则描述 | 触发条件 | 系统处理 | 用户反馈 | 验收方式 |
| --- | --- | --- | --- | --- | --- |
| BR-1 |  |  |  |  |  |

| 状态 | 负责人 | 进入条件 | 可执行动作 | 退出条件 | 下一状态 |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## 12. 算法与数据要求

| 项 | 内容 |
| --- | --- |
| 数据输入 | 数据来源、格式、必填性、质量要求 |
| 数据输出 | 输出结果、展示位置、导出或回流方式 |
| 算法角色 | 推荐/预测/排序/识别/生成/辅助决策/不参与 |
| 可解释性 | 是否需要原因、依据、置信度或证据 |
| 人工兜底 | 人可否修改、覆盖、退回、记录原因 |
| 失败模式 | 数据缺失、算法失败、低置信度、超时等处理 |

## 13. 指标与埋点

| 类型 | 指标/事件 | 口径 | 触发时机 | 用途 |
| --- | --- | --- | --- | --- |
| 主指标 |  |  |  |  |
| 次级指标 |  |  |  |  |
| 护栏指标 |  |  |  |  |
| 埋点事件 |  |  |  |  |

## 14. 非功能性产品要求

| 维度 | 要求 |
| --- | --- |
| 可用性 | 高频操作路径清晰、关键反馈明确 |
| 可访问性 | 键盘焦点、对比度、表单标签、错误提示 |
| 性能感知 | 列表、筛选、提交等关键动作有加载/失败状态 |
| 审计追踪 | 关键状态变化、审核、退回、导出需记录操作者和时间 |
| 安全/隐私 | 敏感字段、权限边界、导出限制和数据留痕 |

## 15. 用户故事与验收标准

### US-1：用户价值摘要

- As a 具体角色
- I want to 完成某个动作
- so that 获得某个结果

#### Acceptance Criteria

- Scenario: 核心场景
- Given 前置条件
- When 用户或系统触发动作
- Then 可以观察到的结果

- Scenario: 异常或权限场景
- Given 用户不满足权限、状态或必填数据条件
- When 用户尝试触发动作
- Then 系统阻止操作、保留原状态并给出可理解反馈

## 16. 依赖、风险与缓解

| 类型 | 内容 | 影响 | 缓解方案 | 决策状态 |
| --- | --- | --- | --- | --- |
| 依赖 | 设计/数据/权限/外部系统/业务确认 |  |  | 已确认/待确认 |
| 风险 | 范围、质量、数据、流程、体验风险 |  |  | 已确认/待确认 |

## 17. 本期不做

| 不做内容 | 原因 | 后续触发条件 |
| --- | --- | --- |
|  |  |  |

## 18. 开放问题与后续决策项

| 问题 | 影响范围 | 建议负责人 | 需要在何时确认 |
| --- | --- | --- | --- |
|  |  |  |  |
"""


def flow_md(product: str, iteration: str) -> str:
    diagrams = flow_diagrams(product)
    diagram_sections = "\n\n".join(
        f"## {index}. {diagram['title']}\n\n"
        f"用途：{diagram['description']}\n\n"
        "```mermaid\n"
        f"{diagram['source'].strip()}\n"
        "```"
        for index, diagram in enumerate(diagrams, start=1)
    )
    return f"""# {product} Mermaid 流程图 - {iteration}

状态：待评审

说明：本文件是流程图的版本管理源文件，`flow.html` 是离线渲染阅读入口。正式交付时，应把示例流程替换为本产品真实流程。

{diagram_sections}

## 5. 状态规则表

| 对象 | 状态 | 负责人 | 进入条件 | 可执行动作 | 退出条件 | 下一状态 |
| --- | --- | --- | --- | --- | --- | --- |
| 需求/任务/业务对象 | 示例状态 | 角色 | 触发条件 | 操作 | 完成条件 | 下一状态 |

## 6. 异常与人工兜底

| 异常 | 发现方式 | 处理角色 | 处理动作 | 用户反馈 | 是否留痕 |
| --- | --- | --- | --- | --- | --- |
| 信息不足 | 表单校验/人工审核 | 业务方/PM | 补充材料并重新提交 | 显示缺失项和原因 | 是 |

## 7. 数据/算法交接说明

| 节点 | 输入 | 输出 | 负责人 | 失败处理 |
| --- | --- | --- | --- | --- |
| 数据或算法节点 | 数据来源、格式、质量要求 | 结果、状态、解释或置信度 | 角色/系统 | 人工兜底或重试策略 |
"""


def dev_handoff_md(product: str, iteration: str) -> str:
    return f"""# {product} 开发交接 - {iteration}

状态：待评审

## 职责边界

本文档是需求侧交接材料，不替代技术架构、数据库设计、正式 API 契约或开发排期。

## 1. MVP 目标与边界

| 项 | 内容 |
| --- | --- |
| 产品目标 | 本迭代要解决的用户/业务问题 |
| MVP 闭环 | 第一版必须跑通的端到端路径 |
| 成功信号 | 开发完成后业务/产品如何判断可用 |
| 明确不做 | 不进入本期实现和验收的内容 |

## 2. 角色与权限矩阵

| 角色 | 可查看 | 可新增 | 可编辑 | 可提交 | 可审核/确认 | 可导出 | 限制 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 业务角色 | 页面/数据范围 | 是/否 | 是/否 | 是/否 | 是/否 | 是/否 | 项目、组织或状态限制 |

## 3. 页面动作矩阵

| 页面/模块 | 入口 | 主要用户 | 动作 | 触发控件 | 前置条件 | 成功反馈 | 失败/异常反馈 | 状态变化 | 权限边界 | 关联原型 | 验收场景 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 页面名称 | 菜单/按钮/跳转 | 角色 | 新增/编辑/提交/审核/退回 | 按钮/表格行/抽屉/弹窗 | 权限、状态、必填数据 | Toast/状态变化/跳转/刷新 | 错误提示/空态/无权限/冲突 | from -> to | 角色与数据范围 | prototype/*.html | AC-1 |

## 4. 核心实体词汇表（需求视角）

| 实体 | 业务含义 | 关键字段 | 产生方式 | 状态 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 业务对象 | 用业务语言解释，不写数据库表设计 | 字段名列表 | 用户创建/导入/系统生成 | 状态枚举 | 与其他实体关系 |

## 5. 字段规则与校验摘要

| 字段 | 所在页面 | 输入方式 | 必填 | 校验 | 默认值 | 错误提示 |
| --- | --- | --- | --- | --- | --- | --- |
| 字段名 | 页面/弹窗/抽屉 | 手填/选择/导入/系统生成 | 是/否 | 长度、格式、范围、唯一性 |  |  |

## 6. 状态与工作流规则

见 [flow.md](flow.md)。

| 状态 | 进入条件 | 允许动作 | 禁止动作 | 下一状态 | 是否记录操作日志 |
| --- | --- | --- | --- | --- | --- |
| 示例状态 | 触发条件 | 可执行动作 | 不允许动作 | 下一状态 | 是/否 |

## 7. 边界状态与异常处理

| 场景 | 触发条件 | 页面反馈 | 系统行为 | 验收方式 |
| --- | --- | --- | --- | --- |
| 空状态 | 没有数据 | 显示空态文案和引导动作 | 不报错 | 首次进入可见 |
| 加载中 | 请求或处理未完成 | 显示 loading | 禁用重复提交 | 不出现重复数据 |
| 无权限 | 角色无权限 | 显示无权限提示或隐藏动作 | 拒绝操作 | 不能越权 |
| 冲突/过期 | 状态已变化或数据被他人处理 | 提示刷新或重新进入 | 不覆盖最新数据 | 保留原状态 |

## 8. 指标与埋点建议

| 事件 | 触发时机 | 关键属性 | 用途 |
| --- | --- | --- | --- |
| page_view | 页面打开 | role, page, project_id | 看页面使用情况 |
| action_submit | 用户提交关键动作 | role, object_id, status_from, status_to | 分析流程转化和失败点 |

## 9. 用户故事与 Gherkin 验收清单

### US-1：核心用户完成主任务

- As a 具体角色
- I want to 完成某个动作
- so that 获得某个结果

#### Acceptance Criteria

- Scenario: 正常完成主流程
- Given 用户具备所需权限且前置数据存在
- When 用户执行关键动作
- Then 系统保存结果、更新状态并给出明确成功反馈

- Scenario: 权限不足
- Given 用户没有该动作权限
- When 用户尝试进入或触发动作
- Then 系统阻止操作并给出可理解反馈

## 10. QA 场景与演示脚本

| 场景 | 前置数据 | 操作步骤 | 期望结果 |
| --- | --- | --- | --- |
| 主流程演示 | 准备一条可处理数据 | 进入页面并完成关键动作 | 状态变化、反馈和数据展示符合 PRD |
| 异常流程演示 | 准备缺失/无权限/冲突数据 | 触发异常路径 | 页面反馈和系统行为符合边界规则 |

## 11. 依赖、风险与后续决策项

| 类型 | 内容 | 影响 | 建议处理 | 状态 |
| --- | --- | --- | --- | --- |
| 依赖 | 设计稿、权限策略、数据来源、业务确认等 | 影响开发或验收 | 负责人/时间点 | 已确认/待确认 |
| 风险 | 范围、质量、数据、体验或流程风险 | 影响交付或使用 | 缓解方案 | 已确认/待确认 |
"""


def final_delivery_md(product: str, iteration: str) -> str:
    return f"""# {product} 最终交付说明 - {iteration}

状态：待评审

## 1. 评审状态

- 记录 PRD、流程图、开发交接、原型是否已通过业务/产品/研发评审。

## 2. 确认范围

- 汇总本次已确认交付范围，必须与 `prd.md` 和 `dev-handoff.md` 保持一致。

## 3. 交付物清单

- [README.md](README.md)
- [prd.md](prd.md)
- [flow.md](flow.md)
- [dev-handoff.md](dev-handoff.md)
- [notes/requirements.md](notes/requirements.md)
- [prototype.html](prototype.html)

## 4. 本期不做

- 汇总本期明确不做内容，并说明原因。

## 5. 后续决策项

- 汇总交付后仍需要业务、产品、设计或研发确认的问题。

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

## 需求阶段 worker 调用记录

- 真实子 agent 是否派发：
- 若未派发，降级原因：
- 主 PM 验收结论：
- 使用的子技能：
- 未使用的子技能及原因：
- 关键输出链接：[requirements-list.md](../requirements-list.md)

## 是否值得做判断

| 功能候选 | 判断 | 理由 | 证据等级 | 建议动作 |
| --- | --- | --- | --- | --- |
|  | 做 / 先验证 / 后置 / 不做 |  | 高/中/低 |  |

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

## 外部参考扫描

- 是否执行：
- 搜索关键词：
- 来源链接：
- 可借鉴隐藏需求：
- 待验证假设：
- 不进入一期范围：
- 对 MVP 的最小影响：
- 未执行原因：

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

## 原型交互覆盖记录

| Must-have 功能 | 原型页面 | 入口/控件 | 用户动作 | 成功反馈 | 状态/数据变化 | 异常路径 | 验收场景 |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  | prototype.html 或 prototype/*.html |  |  |  |  |  |  |

## 原型设计输入

- 产品语境：
- 已确认交互架构：
- 原型是否拆分多页面：
- 多页面原型目录：
- 设计方向确认表单：
- 候选主题：
- 用户确认结果：
- 设计主题：
- 主题源文件：
- 样例预览路径：
- 选择原因：
- 品牌/参考来源：
- 是否来自 Open Design 扩展库：
- ui-ux-pro-max 是否补充：
- ui-ux-pro-max 补充内容：

## 原型打磨记录

- impeccable 是否执行：
- 检查方式：
- 发现的问题：
- 已修正内容：
- 未采纳建议：
- 未采纳原因：
- 是否改变业务范围：否

## 验收标准确认记录

| 功能/页面动作 | 验收颗粒度 | Given | When | Then | 是否覆盖原型 | 是否确认 |
| --- | --- | --- | --- | --- | --- | --- |
|  | 动作级 |  |  |  | 是/否 | 是/否 |

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
    (base / "prototype").mkdir(parents=True, exist_ok=True)
    copy_flow_viewer_vendor(base)

    write_if_missing(base / "index.html", index_html(args.product, args.iteration))
    write_if_missing(base / "prototype.html", prototype_html(args.product, args.iteration))
    write_if_missing(base / "prototype" / "example-page.html", prototype_example_page_html(args.product, args.iteration))
    write_if_missing(base / "prototype" / "README.md", prototype_readme_md(args.product, args.iteration))
    write_if_missing(base / "prd.html", prd_html(args.product, args.iteration))
    write_if_missing(base / "flow.html", flow_viewer_html(args.product, args.iteration))
    write_if_missing(base / "dev-handoff.html", simple_doc_html(args.product, args.iteration, "开发交接", "dev-handoff.md", "开发交接只表达需求侧建议，不替代技术方案或排期。"))
    write_if_missing(base / "final-delivery.html", simple_doc_html(args.product, args.iteration, "最终交付说明", "final-delivery.md", "评审通过后在 final-delivery.md 中记录确认范围和后续决策项。"))
    write_if_missing(base / "README.md", readme_md(args.product, args.iteration))
    write_if_missing(base / "requirements-list.md", requirements_list_md(args.product, args.iteration))
    write_if_missing(base / "prd.md", prd_md(args.product, args.iteration))
    write_if_missing(base / "flow.md", flow_md(args.product, args.iteration))
    write_if_missing(base / "dev-handoff.md", dev_handoff_md(args.product, args.iteration))
    write_if_missing(base / "final-delivery.md", final_delivery_md(args.product, args.iteration))
    write_if_missing(base / "notes" / "requirements.md", requirements_md(args.product, args.iteration))

    print(base)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
