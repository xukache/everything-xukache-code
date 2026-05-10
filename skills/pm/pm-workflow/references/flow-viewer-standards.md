# 流程图查看器标准

在为 PM 工作流交付目录生成 `flow.html` 时使用本文档。

目标是让业务、产品、设计、研发和测试评审方不依赖 Markdown 渲染器，也能直接查看 Mermaid 流程图。页面必须可本地打开，并默认展示已渲染的图，而不是源码。

## 必须行为

`flow.html` 必须：

- 从本地 `assets/vendor/flow-viewer/mermaid.min.js` 加载 Mermaid。
- 从本地 `assets/vendor/flow-viewer/svg-pan-zoom.min.js` 加载拖拽/缩放能力。
- 页面加载时把 Mermaid 源码渲染为 SVG 图。
- 默认展示渲染后的流程图，而不是代码块。
- 支持拖拽/平移 SVG 画布。
- 支持放大、缩小、重置和适配视图。
- 提供“查看源码”切换项，方便查看 Mermaid 源码。
- 当某张图渲染失败时展示明确错误状态。
- 链接到 `flow.md`、`index.html` 和第三方许可证说明。
- 不依赖外部网络资源。

## 源码处理

页面可以用安全的数据块在 HTML 中嵌入 Mermaid 源码：

```html
<script type="application/json" id="diagram-data">...</script>
```

同一批流程图也必须存在于 `flow.md`，因为 Markdown 仍然是版本管理的源文件。HTML 中嵌入的源码只是为了离线渲染阅读。

## 查看器控件

每张已渲染流程图都应提供以下控件：

- `放大`
- `缩小`
- `适配视图`
- `重置`
- `查看源码` / `隐藏源码`

控件必须可以通过键盘访问，并使用文档语言标注。

## 图表集合

对工作流较重的产品，至少包含：

- 主流程：`flowchart`。
- 跨角色流程：`sequenceDiagram` 或分组 `flowchart`。
- 状态生命周期：`stateDiagram-v2`。
- 异常/返工流程：`flowchart`。

如果产品包含算法或数据步骤，则补充数据交接图；如果本期不涉及，明确标注为不适用或不在范围内。

## 离线 Vendor 结构

生成目录中应包含：

```text
assets/
  vendor/
    flow-viewer/
      mermaid.min.js
      svg-pan-zoom.min.js
      MERMAID_LICENSE
      SVG_PAN_ZOOM_LICENSE
      THIRD_PARTY_LICENSES.md
```

`pm-workflow` 的规范副本保存在：

```text
skills/pm/pm-workflow/assets/vendor/flow-viewer/
```

脚手架脚本会把这些文件复制到每个生成的交付目录。

## 降级处理

如果脚本加载失败：

- 显示明确提示，说明本地 vendor 资源缺失。
- 在源码面板中保留 Mermaid 源码可见。
- 提醒评审方重新运行脚手架，或复制 `assets/vendor/flow-viewer`。

不得在不解释原因的情况下静默只显示代码。

## 测试要求

交付生成目录前：

- 本地打开 `flow.html`。
- 确认流程图画布中至少存在一个 `<svg>`。
- 确认不需要外部网络请求。
- 确认放大和适配视图控件会改变 SVG 视图。
- 确认源码切换可用。
