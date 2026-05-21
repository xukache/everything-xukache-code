# HTML 原型目录

`prototype/index.html` 始终是原型入口。

## 单页面产品

```text
prototype/
  directions/
  index.html
  layout/
  assets/
  review/
    screenshots/
```

## 多页面系统

```text
prototype/
  directions/
  index.html
  pages/
  layout/
  components/
  assets/
  review/
    screenshots/
```

## 目录职责

| 路径 | 职责 | 产物要求 |
|---|---|---|
| `prototype/directions/` | 设计方向首页 demo | 每个候选方向必须有一个可打开的首页 demo；`index.html` 汇总 2-3 个预览入口，供用户选择方向。 |
| `prototype/index.html` | 原型入口、全局导航、关键流程起点 | 必须能进入所有 P0 原型路径；多页面系统必须链接到 `pages/` 中的具体页面。 |
| `prototype/pages/` | 独立业务页面 | 多页面系统的每个主要页面单独存放；页面结构必须引用或遵循 `layout/` 中的复用布局。 |
| `prototype/layout/` | 可复用页面结构 | 沉淀应用外壳、导航、页头、侧栏、内容网格、表单页骨架、状态页骨架等结构，保证后续开发能稳定复现。 |
| `prototype/components/` | 可复用界面组件和交互片段 | 存放按钮组、表单控件、卡片、列表、弹窗、状态块等组件示例，并标注使用场景和状态。 |
| `prototype/assets/` | 公共资源 | 存放样式、脚本、图片、图标、示例数据等资源；页面不得依赖散落在目录外的资源。 |
| `prototype/review/screenshots/` | 原型自审截图证据 | 按 desktop、tablet、mobile 存放 Playwright 截图；每个候选 demo 和主要原型页面都要覆盖。 |

界面设计师应根据真实需求动态决定页面数量和结构，但必须沉淀可复用布局，避免原型结构在实际开发中无法稳定复现。原型必须覆盖 P0 功能的可点击路径、成功、失败、空状态、关键异常和主要响应式视口。完整原型交付前必须完成 Playwright 截图和 Impeccable 自审，结果记录到 `docs/prototype-review.md`。
