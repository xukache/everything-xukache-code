# WeChat Cover Template Usage

## Built-In Template

Use the bundled template:

```text
assets/templates/wechat-cover-template.html
```

It includes the built-in cover character image at:

```text
assets/templates/images/article-cover-character-cutout.png
```

The cover canvas is fixed:

```text
900px x 383px
```

## Inputs

Required:

- column name
- headline
- subtitle

Optional:

- article file path or article folder
- article slug

## Replace Only These Fields

In the copied HTML, replace:

- `.label`: column name while preserving the green dot and brand text `阿栩学AI`
- `.headline`: article headline
- `.subtitle`: article subtitle

Do not redesign layout, palette, typography, border, or hero character unless the user explicitly asks.

## Output Location

Save the cover in the article's own folder.

If the user provides an article file path, use its parent folder as `ARTICLE_DIR`. If the user provides an article folder, use it directly. If the article is pasted directly and no folder exists, create a slug folder in the current workspace and use that as `ARTICLE_DIR`.

Copy the whole template folder context so the image path remains valid:

```text
<ARTICLE_DIR>/cover/
  cover.html
  cover.png
  images/article-cover-character-cutout.png
```

The copied `cover.html` should reference:

```html
<img src="images/article-cover-character-cutout.png" alt="">
```

## Practical Rules

- Prefer preserving the user's full headline and subtitle. Do not shorten copy just because the default font size is too large.
- The template automatically adjusts headline and subtitle font size, line height, top position, and text width before PNG export.
- For Chinese headlines with natural punctuation such as `，`、`：`、`；`、`、`, prefer a controlled line break at the punctuation when it improves readability or allows a larger headline. Example: `我把公众号排版，<br>也接进了自己的写作 Skill`.
- For Chinese subtitles with natural punctuation, also prefer a controlled line break at the punctuation when it improves reading rhythm. Example: `从最终 Markdown 到可复制公众号格式，<br>补上文章发布前的最后一步`.
- Do not let browser auto-wrapping split a short Chinese phrase awkwardly when a comma or colon already provides the intended semantic break.
- If the headline looks too small after dynamic sizing, first try a semantic `<br>` at punctuation before accepting a smaller preset.
- Use manual `<br>` only at semantic break points, not to arbitrarily force a visual shape.
- For two-line Chinese headlines, keep headline line-height loose enough to breathe. Avoid compact values around `1.13`; prefer about `1.22-1.26` unless the text is a single short line.
- If the headline is still too long after the smallest preset, ask the user for a shorter cover headline.
- Keep subtitle concise when possible, but use the dynamic sizing before asking for cuts.
- Do not insert the slogan into the standalone character image.

## PNG Export

After creating `cover.html`, always export a PNG for WeChat cover use:

```bash
node /home/xukai/.codex/skills/axu-article-illustrations/scripts/render-cover.mjs \
  <ARTICLE_DIR>/cover/cover.html \
  <ARTICLE_DIR>/cover/cover.png
```

The renderer:

- uses system Chrome or Chromium, not Playwright
- opens the local HTML file
- clips the `.cover` element
- writes a `900 x 383` PNG

If Chrome is installed elsewhere, set:

```bash
CHROME_PATH=/path/to/chrome node /home/xukai/.codex/skills/axu-article-illustrations/scripts/render-cover.mjs cover.html cover.png
```
