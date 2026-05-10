# Flow Viewer Standards

Use this reference when generating `flow.html` for a PM workflow delivery folder.

The goal is to make Mermaid flow diagrams reviewable by business, product, design, engineering, and QA without requiring a Markdown renderer. The page must open locally and show rendered diagrams by default.

## Required Behavior

`flow.html` must:

- Load Mermaid from local `assets/vendor/flow-viewer/mermaid.min.js`.
- Load pan/zoom from local `assets/vendor/flow-viewer/svg-pan-zoom.min.js`.
- Render Mermaid source into SVG diagrams on page load.
- Show rendered diagrams by default, not code blocks.
- Support dragging/panning the SVG canvas.
- Support zoom in, zoom out, reset, and fit-to-view.
- Provide a "view source" toggle for Mermaid source.
- Show an explicit error state if a diagram fails to render.
- Link to `flow.md`, `index.html`, and third-party license notes.
- Avoid external network dependencies.

## Source Handling

The page may embed Mermaid source in HTML using a safe data block:

```html
<script type="application/json" id="diagram-data">...</script>
```

The same diagrams must also be present in `flow.md`, because Markdown remains the version-control source of truth. The embedded HTML source is a render-time copy for offline viewing.

## Viewer Controls

Each rendered diagram should have controls:

- `放大`
- `缩小`
- `适配视图`
- `重置`
- `查看源码` / `隐藏源码`

Controls must be keyboard reachable and labeled in the document language.

## Diagram Set

For workflow-heavy products, include at least:

- Main workflow: `flowchart`.
- Cross-role flow: `sequenceDiagram` or grouped flowchart.
- Status lifecycle: `stateDiagram-v2`.
- Exception/rework flow: `flowchart`.

If a product includes algorithm/data steps, include a data handoff diagram or mark it as out of scope.

## Offline Vendor Layout

Generated folders should include:

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

The `pm-workflow` skill keeps canonical copies under:

```text
skills/pm/pm-workflow/assets/vendor/flow-viewer/
```

The scaffold script copies them into each generated delivery folder.

## Fallbacks

If scripts fail to load:

- Show a clear message that local vendor assets are missing.
- Keep the Mermaid source visible in a source panel.
- Tell the reviewer to regenerate the scaffold or copy `assets/vendor/flow-viewer`.

Do not silently show only code without explaining why rendering failed.

## Test Requirements

Before delivering a generated folder:

- Open `flow.html` locally.
- Confirm at least one `<svg>` exists inside the diagram canvas.
- Confirm no external network requests are required.
- Confirm zoom and fit controls change the rendered SVG view.
- Confirm source toggle works.
