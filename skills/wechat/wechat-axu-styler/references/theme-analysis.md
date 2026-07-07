# Xukache WeChat Theme Analysis

## Source Moodboard

The theme is derived from `xukache-ai-ip-moodboard`, especially:

- IP name: 阿栩
- Slogan: 不慌不忙，学点 AI
- Positioning: professional, warm, restrained AI learning companion
- Style: clean 2D hand-drawn flat feeling, not childish, not cyber, not sticker-like

## Visual Translation

Use typography and color to echo the IP without inserting the character everywhere.

| Moodboard Signal | Article Theme Decision |
| --- | --- |
| 温白 `#F7F4EE` | outer paper background |
| 柔炭灰 `#33363A` | main text and outlines |
| 淡鼠尾草绿 `#AFC8B3` | subtle rule, note marker, quiet brand accent |
| 暖杏色 `#E8C7A1` | sparse highlight and quote warmth |
| 浅鼠尾草绿 `#EEF6EF` | legacy quote background token, kept for compatibility |
| 浅雾灰 `#D9DED8` | dividers, code backgrounds, low-contrast borders |
| 专业轻亲和 | restrained editorial layout, no loud decoration |
| 不慌不忙，学点 AI | comfortable line-height, generous but not empty spacing |

## Theme: xukache-warm-companion

Runtime parameters live in `../theme.yaml`. Keep this table and YAML file aligned when the design system changes.

Current parameters:

```yaml
name: xukache-warm-companion
fontFamily: "'Source Han Sans SC','Noto Sans CJK SC','PingFang SC','Microsoft YaHei',Arial,sans-serif"
fontFamilyEn: "'Inter','SF Pro Text','Helvetica Neue',Arial,sans-serif"
codeFont: "'JetBrains Mono','SF Mono',Menlo,Consolas,monospace"
fontSize: 17
lineHeight: 1.83
accent: "#AFC8B3"
accentWarm: "#E8C7A1"
quoteBg: "#EEF6EF"
bg: "#F7F4EE"
surface: "#FFFCF7"
text: "#33363A"
muted: "#6C706D"
divider: "#D9DED8"
codeBg: "#EEE9DF"
imageBorder: "#DED6C8"
h2NumberColor: "#9A7145"
maxWidth: 628
```

Renderer personality:

- H1: calm title block, not hero poster.
- H2: numbered warm-brown marker plus a quiet bottom rule.
- H3: charcoal text with warm apricot underline.
- Paragraph: relaxed line height for Chinese technical essays.
- Quote: plain `>` marker plus warm theme-colored text, no left rule or colored block background.
- Code: light warm gray, readable monospace, no dark developer-console look.
- Lists: compact, usable for tutorials.
- Images: centered with small muted caption support.

## Prohibitions

Do not add:

- many selectable public themes
- cold corporate blue as the dominant accent
- neon, chip, circuit, data-stream, matrix, robot, or obvious AI decoration
- childish mascot/sticker tone
- large rounded decorative cards around every section
- gradients as the main identity
- `rgba()` colors in copied WeChat HTML

## MarkNice MVP Analysis

MarkNice is useful as an interaction reference, not as a feature clone.

Must-have for this skill:

- Markdown textarea on the left
- WeChat preview on the right
- live conversion while editing
- fixed theme controls shown clearly
- import `.md/.markdown/.txt`
- copy rendered rich text to clipboard
- save generated HTML
- lightweight status/toast feedback

Nice but not required:

- dark mode
- phone/desktop preview toggle
- formatting toolbar buttons
- sample article button

Out of scope for the first version:

- Word import
- PDF import/export
- Word export
- 15 public templates
- cloud storage or account features
