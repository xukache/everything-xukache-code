# 设计主题库

这个目录存放 `pm-workflow` 可复用的设计主题。每个主题使用一个文件夹，主题正文统一放在 `DESIGN.md`，预览样例统一放在 `examples.html`。主题文件只描述视觉语言、tokens、组件、布局和提示词，不承担主题选择逻辑。

主题选择规则统一维护在 `../../role-skills/ui-prototype-design/references/design-theme-selection.md`。新增主题时，文件夹名使用具体风格名，例如 `linear/`、`vercel/`、`stripe/`。

## 可用主题

| 主题 | 主题文件 | 样例预览 | 视觉关键词 | 预览产品类型 |
| --- | --- | --- | --- | --- |
| Vben | [vben/DESIGN.md](vben/DESIGN.md) | [vben/examples.html](vben/examples.html) | 应用工作台、浅色/深色、侧边栏、顶栏、表格、筛选、抽屉、语义状态 | 后台管理系统、数据分析看板、内部工作台 |
| RevenueCat | [revenuecat/DESIGN.md](revenuecat/DESIGN.md) | [revenuecat/examples.html](revenuecat/examples.html) | 白底精密、深紫文本、单一强调色、方正信息容器、全圆角主按钮、克制阴影 | SaaS 产品页、品牌主页、轻量产品界面 |

## Open Design 扩展库

[open-design/](open-design/) 收录了从 `nexu-io/open-design` 引入的设计系统库，每个子目录包含一个 `DESIGN.md`。这些主题用于补充品牌风格、视觉方向和更丰富的参考，不替代上表中的本地精选主题。

使用顺序：

1. 先按 `../../role-skills/ui-prototype-design/references/design-theme-selection.md` 生成候选主题和设计方向确认表单。
2. 展示候选主题的 `examples.html` 预览路径，让用户确认后再进入 HTML 原型。
3. 如果用户指定品牌、参考站点、截图或风格名，再查找 `open-design/<slug>/DESIGN.md`。
4. 如果使用 Open Design 主题，必须在 `notes/requirements.md` 里记录源文件，例如 `assets/design-themes/open-design/linear-app/DESIGN.md`。
5. 品牌类主题只作为 aesthetic inspiration，不代表官方品牌资产或授权。

导入来源和许可证见 [open-design/OPEN_DESIGN_IMPORT.md](open-design/OPEN_DESIGN_IMPORT.md)。

## 精选 Open Design 样例

以下扩展主题提供了本地预览样例，可作为候选主题展示给用户：

| 主题 | 主题文件 | 样例预览 |
| --- | --- | --- |
| Linear | [open-design/linear-app/DESIGN.md](open-design/linear-app/DESIGN.md) | [open-design/linear-app/examples.html](open-design/linear-app/examples.html) |
| Vercel | [open-design/vercel/DESIGN.md](open-design/vercel/DESIGN.md) | [open-design/vercel/examples.html](open-design/vercel/examples.html) |
| Stripe | [open-design/stripe/DESIGN.md](open-design/stripe/DESIGN.md) | [open-design/stripe/examples.html](open-design/stripe/examples.html) |
| Notion | [open-design/notion/DESIGN.md](open-design/notion/DESIGN.md) | [open-design/notion/examples.html](open-design/notion/examples.html) |
| GitHub | [open-design/github/DESIGN.md](open-design/github/DESIGN.md) | [open-design/github/examples.html](open-design/github/examples.html) |
| Apple | [open-design/apple/DESIGN.md](open-design/apple/DESIGN.md) | [open-design/apple/examples.html](open-design/apple/examples.html) |
| Airbnb | [open-design/airbnb/DESIGN.md](open-design/airbnb/DESIGN.md) | [open-design/airbnb/examples.html](open-design/airbnb/examples.html) |
| Figma | [open-design/figma/DESIGN.md](open-design/figma/DESIGN.md) | [open-design/figma/examples.html](open-design/figma/examples.html) |
| Supabase | [open-design/supabase/DESIGN.md](open-design/supabase/DESIGN.md) | [open-design/supabase/examples.html](open-design/supabase/examples.html) |
| Shadcn | [open-design/shadcn/DESIGN.md](open-design/shadcn/DESIGN.md) | [open-design/shadcn/examples.html](open-design/shadcn/examples.html) |
| Ant | [open-design/ant/DESIGN.md](open-design/ant/DESIGN.md) | [open-design/ant/examples.html](open-design/ant/examples.html) |
| OpenAI | [open-design/openai/DESIGN.md](open-design/openai/DESIGN.md) | [open-design/openai/examples.html](open-design/openai/examples.html) |
| Cursor | [open-design/cursor/DESIGN.md](open-design/cursor/DESIGN.md) | [open-design/cursor/examples.html](open-design/cursor/examples.html) |
| Shopify | [open-design/shopify/DESIGN.md](open-design/shopify/DESIGN.md) | [open-design/shopify/examples.html](open-design/shopify/examples.html) |
| Spotify | [open-design/spotify/DESIGN.md](open-design/spotify/DESIGN.md) | [open-design/spotify/examples.html](open-design/spotify/examples.html) |
| Material | [open-design/material/DESIGN.md](open-design/material/DESIGN.md) | [open-design/material/examples.html](open-design/material/examples.html) |
| IBM | [open-design/ibm/DESIGN.md](open-design/ibm/DESIGN.md) | [open-design/ibm/examples.html](open-design/ibm/examples.html) |
| Raycast | [open-design/raycast/DESIGN.md](open-design/raycast/DESIGN.md) | [open-design/raycast/examples.html](open-design/raycast/examples.html) |
| Slack | [open-design/slack/DESIGN.md](open-design/slack/DESIGN.md) | [open-design/slack/examples.html](open-design/slack/examples.html) |
| Webflow | [open-design/webflow/DESIGN.md](open-design/webflow/DESIGN.md) | [open-design/webflow/examples.html](open-design/webflow/examples.html) |
| MongoDB | [open-design/mongodb/DESIGN.md](open-design/mongodb/DESIGN.md) | [open-design/mongodb/examples.html](open-design/mongodb/examples.html) |
| Hugging Face | [open-design/huggingface/DESIGN.md](open-design/huggingface/DESIGN.md) | [open-design/huggingface/examples.html](open-design/huggingface/examples.html) |
| xAI | [open-design/x-ai/DESIGN.md](open-design/x-ai/DESIGN.md) | [open-design/x-ai/examples.html](open-design/x-ai/examples.html) |
