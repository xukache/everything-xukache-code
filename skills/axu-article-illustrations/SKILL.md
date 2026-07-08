---
name: axu-article-illustrations
description: Generate Xukache/阿栩 style WeChat article visuals. Use when the user asks for 阿栩, Xukache, 公众号正文配图, article explanation illustrations, shot lists, AI learning companion visuals, or to reuse the built-in 900x383 WeChat cover template with a title, subtitle, and column name.
---

# 阿栩公众号正文配图

## Core Positioning

Use this skill to turn Chinese WeChat articles into calm, readable 16:9 in-article explanation illustrations featuring 阿栩, the Xukache AI learning companion. The goal is not decoration, a PPT infographic, a tech poster, or a cute sticker. The goal is to help readers understand one article idea at a time.

阿栩 is the fixed IP: a warm-white, rounded, restrained 2D hand-drawn learning companion with a small muted-sage top leaf. 阿栩 must participate in the core action of the image, not stand beside the idea as an ornament.

## First Run Guide

When the user triggers this skill without providing an article, title, or concrete task, respond with a short onboarding guide instead of asking a vague question.

Use this structure:

```text
我可以用阿栩帮你做两类公众号视觉：

1. 正文解释图
   你给我文章正文、Markdown 文件或文章链接，我会先提炼认知锚点，输出 3-6 张配图 shot list；你确认后再生成 16:9 正文图。

2. 公众号封面
   你给我栏目名、标题、副标题，我会套用内置 900x383 封面模板，只替换文案，不重新设计版式。

你可以这样开始：
- “Use 阿栩正文配图，帮这篇文章规划正文配图：[粘贴文章]”
- “Use 阿栩正文配图，直接为这篇文章生成 4 张正文解释图：[粘贴文章]”
- “Use 阿栩正文配图，用封面模板生成封面：栏目名=...，标题=...，副标题=...”
```

If the user provides only an article, default to article illustration planning. If the user provides only title/subtitle/column fields, default to cover generation. If both are provided, offer to do cover plus article shot list in one pass.

## Read References As Needed

- `references/axu-ip.md`: 阿栩 identity, visual rules, allowed actions, and prohibitions.
- `references/article-illustration-style.md`: article illustration style, composition, color, and anti-patterns.
- `references/prompt-template.md`: prompt template for a single generated illustration.
- `references/qa-checklist.md`: quality checks and iteration rules.
- `references/cover-template-usage.md`: how to reuse the built-in WeChat cover template.
- `references/fixed-article-assets.md`: how to copy the fixed article top and bottom images.

Useful bundled assets:

- `assets/references/core-character.png`
- `assets/references/expression-preview-128-v01.png`
- `assets/references/article-cover-character-cutout.png`
- `assets/references/article-hero-watering.png`
- `assets/references/article-footer-growth.png`
- `assets/templates/wechat-cover-template.html`
- `scripts/render-cover.mjs`

## Workflow

### 1. Decide The User Intent

If the user asks for article illustrations, read the article first and create a shot list or generate images.

If the user asks for a WeChat cover, use the built-in cover template. Do not redesign the cover unless explicitly asked.

For WeChat cover text, never casually truncate, summarize, or delete the user's headline or subtitle to make it fit. Preserve the provided text by default and rely on the template's dynamic typography: font size, line height, top position, and text width may adjust to fit the cover. Only ask for a shorter cover headline/subtitle if the text still does not fit after the smallest dynamic preset.

For Chinese cover headlines and subtitles, prefer semantic line breaks at punctuation such as `，` or `：` when the text contains a natural pause. This keeps the text readable and usually allows a larger font. Do not let browser auto-wrapping split phrases awkwardly if a punctuation break is available.

If the user asks for both, make the cover first only when title, subtitle, and column name are available; otherwise proceed with article illustration planning and ask for the missing cover fields later.

If the user asks for fixed article opening or closing visuals, copy the bundled top/bottom images directly. Do not regenerate them unless the user explicitly asks to redesign those fixed assets.

### 2. Digest The Article

Extract:

- the main claim
- 3-6 visualizable cognitive anchors
- the paragraph where each image should sit
- the input, process, and output behind each anchor
- the role 阿栩 should play in the action

Do not illustrate every section. Prefer ideas where an image clarifies the reading: before/after, bottleneck, input-output loop, sorting, calibration, accumulation, handoff, transformation, or common mistake.

### 3. Produce A Shot List First

Unless the user explicitly says to generate immediately, give a concise shot list. For each image include:

- insertion point
- topic
- one-sentence meaning
- structure type
- 阿栩 action
- visual elements
- short Chinese labels

Default to 3-6 images. Use 1-2 for short posts. Avoid more than 8 unless the article is long and dense.

### 4. Generate Single Images

When generating, create each image independently as a 16:9 horizontal illustration. Do not combine multiple article images into one grid.

Before writing the final image prompt, read:

- `references/axu-ip.md`
- `references/article-illustration-style.md`
- `references/prompt-template.md`

Use the bundled reference images only for identity calibration. Do not copy their pose or composition mechanically.

### 5. Check And Iterate

After image generation, read `references/qa-checklist.md` and check the result. Regenerate or edit if:

- 阿栩 is decorative rather than acting
- the image is too poster-like, PPT-like, cute, or technical
- the background is not clean and light
- Chinese labels are too many, too large, or wrong
- the image explains a generic AI scene instead of the article idea
- forbidden props or AI decorations appear

### 6. Save Deliverables

Save generated files inside the article's own folder. If the user provides a Markdown/HTML/article file path, use that file's parent directory as `ARTICLE_DIR`.

Article illustrations go under:

```text
<ARTICLE_DIR>/images/
```

Name files in order:

```text
01-topic-name.png
02-topic-name.png
```

WeChat cover files go under:

```text
<ARTICLE_DIR>/cover/
  cover.html
  cover.png
  images/article-cover-character-cutout.png
```

Fixed article top/bottom images go under:

```text
<ARTICLE_DIR>/images/
  article-hero-watering.png
  article-footer-growth.png
```

If the article is pasted directly and no article folder exists, create a folder from the article slug in the current workspace and then use the same `images/` and `cover/` layout inside it.

For WeChat covers, copy the built-in template into the article folder's `cover/` directory and replace only the requested text fields unless the user asks for layout changes.

Then export the cover PNG with:

```bash
node /home/xukai/.codex/skills/axu-article-illustrations/scripts/render-cover.mjs \
  <ARTICLE_DIR>/cover/cover.html \
  <ARTICLE_DIR>/cover/cover.png
```

The script uses system Chrome headless and captures the `.cover` element at 900x383. If the environment path differs, resolve the script relative to the loaded skill directory.

After export, check that the headline and subtitle are visible, not clipped, and not overlapping 阿栩. If they do not fit, adjust dynamic typography or ask the user for shorter cover copy; do not silently cut the text.

## Output Style

Keep strategy output short and usable. After generation, report:

- generated files
- intended article placement
- which images are strongest
- any images that may need another pass
