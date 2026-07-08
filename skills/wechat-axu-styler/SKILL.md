---
name: wechat-axu-styler
description: Use when converting Chinese Markdown articles into Xukache/阿栩 branded WeChat Official Account HTML, opening a local Markdown editing preview page, copying rich text for WeChat, or applying the Xukache AI IP visual system to article typography.
---

# WeChat Axu Styler

## Purpose

Turn local Markdown articles into WeChat-ready inline-style HTML using the fixed Xukache/阿栩 visual system. This skill is intentionally not a general theme switcher: use only the built-in `xukache-warm-companion` theme unless the user explicitly asks to redesign the brand.

Theme values are configured in `theme.yaml`. The conversion script and editor preview both read this same file, so colors, widths, font sizes, line heights, and quote styling should be changed there first instead of being duplicated across scripts.

## First Run

If the user asks to use this skill without a file path, open the editor page so they can paste or write Markdown:

```bash
node .codex/skills/wechat-axu-styler/scripts/open-editor.mjs
```

If the user provides a Markdown file path, convert it directly:

```bash
node .codex/skills/wechat-axu-styler/scripts/convert.mjs path/to/article.md
```

Local relative images are embedded as base64 data URIs during conversion so the generated HTML can preview and copy correctly without depending on the original folder.

Then offer the editor when they want to tune the copy visually:

```bash
node .codex/skills/wechat-axu-styler/scripts/open-editor.mjs path/to/article.md
```

## Required Context

Before changing theme rules, read `references/theme-analysis.md` and `theme.yaml`. The reference file contains the distilled Xukache IP moodboard constraints and the MarkNice-inspired MVP feature boundary; `theme.yaml` is the actual runtime configuration.

Useful source assets in this repository:

- `xukache-ai-ip-moodboard/asset-delivery-spec.md`
- `xukache-ai-ip-moodboard/data.json`
- `xukache-ai-ip-moodboard/deliverables/`

## Workflow

1. **Identify input**
   - File path: run `convert.mjs`.
   - No file path or user wants interaction: run `open-editor.mjs`.
   - Multiple files: convert one by one unless the user asks for batch automation.

2. **Apply the fixed theme**
   - Warm white paper background.
   - Soft charcoal text.
   - Muted sage only as a quiet accent.
   - Warm apricot for sparse emphasis.
   - Theme tokens come from `theme.yaml`.
   - No cold blue tech palette, neon AI decoration, cute sticker tone, or busy card layout.

3. **Produce WeChat-compatible HTML**
   - All output styles must be inline.
   - Use solid hex colors, not `rgba()`.
   - Repeat background color on outer sections and text blocks when useful.
   - Keep max width near 640px.

4. **Open the editor when visual choice matters**
   - The editor supports left-side Markdown editing, right-side live preview, file import, sample content, HTML export, and one-click rich-text copy.
   - The editor is a local HTML file; it does not upload content.

## MarkNice Boundary

Implemented because they are essential for this skill:

- left Markdown editor
- right WeChat preview
- fixed brand theme
- live rendering
- import Markdown
- copy rich HTML to clipboard
- save HTML

Not implemented by default:

- Word/PDF import
- PDF/Word export
- many public themes
- account login, cloud sync, template marketplace
- complex toolbar formatting buttons

## Commands

Convert a file:

```bash
node .codex/skills/wechat-axu-styler/scripts/convert.mjs articles/example.md
```

Convert to a specific output path:

```bash
node .codex/skills/wechat-axu-styler/scripts/convert.mjs articles/example.md --output articles/example_wechat.html
```

Open local editor:

```bash
node .codex/skills/wechat-axu-styler/scripts/open-editor.mjs articles/example.md
```

## Output Naming

Default output:

```text
path/to/article.md -> path/to/article_xukache_wechat.html
```

## Quality Check

Before saying the result is ready:

- Run the conversion command on a real Markdown file or sample.
- Confirm the output HTML exists.
- For editor changes, open the generated page and verify the preview is non-empty.
- Check the visual tone against `references/theme-analysis.md`.
