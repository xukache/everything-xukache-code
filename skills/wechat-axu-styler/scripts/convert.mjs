#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTheme } from './theme.mjs';

const THEME = loadTheme();

function usage() {
  console.log('Usage: node convert.mjs <article.md> [--output output.html]');
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const input = args.find((arg) => !arg.startsWith('--'));
  const outputFlag = args.indexOf('--output');
  const output = outputFlag >= 0 ? args[outputFlag + 1] : null;
  return { input, output };
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function mimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.bmp': 'image/bmp',
    '.avif': 'image/avif'
  };
  return map[ext] || 'application/octet-stream';
}

function isRemoteOrDataUri(src) {
  return /^(https?:)?\/\//i.test(src) || /^data:/i.test(src);
}

function isImageSrc(src) {
  return /^data:image\//i.test(src) || /\.(png|jpe?g|gif|webp|svg|bmp|avif)([?#].*)?$/i.test(src);
}

function localImageToDataUri(src, baseDir = process.cwd()) {
  if (isRemoteOrDataUri(src) || src.startsWith('#')) return src;
  const cleanSrc = decodeURIComponent(src.split(/[?#]/)[0]);
  const imagePath = path.isAbsolute(cleanSrc) ? cleanSrc : path.resolve(baseDir, cleanSrc);
  if (!fs.existsSync(imagePath) || !fs.statSync(imagePath).isFile()) return src;
  const data = fs.readFileSync(imagePath).toString('base64');
  return `data:${mimeType(imagePath)};base64,${data}`;
}

function embedLocalImages(markdown, baseDir = process.cwd()) {
  return markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    const trimmedSrc = src.trim();
    const dataUri = localImageToDataUri(trimmedSrc, baseDir);
    return `![${alt}](${dataUri})`;
  });
}

function inline(text, options = {}) {
  let value = escapeHtml(text);
  value = value.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    const imageSrc = localImageToDataUri(src, options.baseDir);
    return `<img src="${escapeHtml(imageSrc)}" alt="" style="display:block;max-width:94%;height:auto;margin:28px auto;border:1px solid ${THEME.imageBorder};border-radius:7px;" />`;
  });
  value = value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const cleanHref = href.trim();
    if (isImageSrc(cleanHref)) {
      const imageSrc = localImageToDataUri(cleanHref, options.baseDir);
      return `<img src="${escapeHtml(imageSrc)}" alt="" style="display:block;max-width:94%;height:auto;margin:28px auto;border:1px solid ${THEME.imageBorder};border-radius:7px;" />`;
    }
    return `<a href="${cleanHref}" style="color:${THEME.text};text-decoration:none;border-bottom:1px solid ${THEME.accent};">${label}</a>`;
  });
  value = value.replace(/\*\*([^*]+)\*\*/g, `<strong style="color:${THEME.text};font-weight:700;background:linear-gradient(transparent 62%, ${THEME.accentWarm} 62%);">$1</strong>`);
  value = value.replace(/`([^`]+)`/g, `<code style="font-family:${THEME.codeFont};font-size:0.9em;color:${THEME.text};background-color:${THEME.codeBg};padding:2px 5px;border-radius:4px;">$1</code>`);
  return value;
}

function stripFrontmatter(markdown) {
  if (!markdown.startsWith('---')) return { body: markdown, meta: {} };
  const end = markdown.indexOf('\n---', 3);
  if (end < 0) return { body: markdown, meta: {} };
  const raw = markdown.slice(3, end).trim();
  const meta = {};
  raw.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (match) meta[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
  });
  return { body: markdown.slice(end + 4).trimStart(), meta };
}

function block(tag, content, style) {
  return `<${tag} style="${style}">${content}</${tag}>`;
}

function renderMarkdown(markdown, options = {}) {
  const { body, meta } = stripFrontmatter(markdown);
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let paragraph = [];
  let list = null;
  let quote = [];
  let code = null;
  let h2Index = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    out.push(block('p', inline(paragraph.join(' ').trim(), options), `margin:0 0 19px;color:${THEME.text};font-size:${THEME.fontSize}px;line-height:${THEME.lineHeight};letter-spacing:0;background-color:${THEME.bg};`));
    paragraph = [];
  };
  const flushList = () => {
    if (!list) return;
    const tag = list.type === 'ol' ? 'ol' : 'ul';
    out.push(`<${tag} style="margin:0 0 20px 0;padding-left:24px;color:${THEME.text};font-size:${THEME.fontSize}px;line-height:${THEME.lineHeight};background-color:${THEME.bg};">${list.items.map((item) => `<li style="margin:6px 0;padding-left:2px;">${inline(item, options)}</li>`).join('')}</${tag}>`);
    list = null;
  };
  const flushQuote = () => {
    if (!quote.length) return;
    out.push(`<blockquote style="margin:24px 0;padding:0;background-color:${THEME.bg};color:${THEME.h2NumberColor};font-size:${THEME.fontSize - 1}px;line-height:${THEME.lineHeight};border:none;">${quote.map((line) => `<p style="margin:0 0 8px;background-color:${THEME.bg};color:${THEME.h2NumberColor};"><span style="color:${THEME.accent};font-weight:800;margin-right:8px;background-color:${THEME.bg};">&gt;</span><span style="color:${THEME.h2NumberColor};font-weight:650;background-color:${THEME.bg};">${inline(line, options)}</span></p>`).join('')}</blockquote>`);
    quote = [];
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const fence = line.match(/^```(.*)$/);
    if (fence) {
      if (code) {
        out.push(`<pre style="margin:22px 0;padding:16px;overflow:auto;background-color:${THEME.codeBg};color:${THEME.text};font-family:${THEME.codeFont};font-size:14px;line-height:1.65;border-radius:8px;"><code>${escapeHtml(code.lines.join('\n'))}</code></pre>`);
        code = null;
      } else {
        flushAll();
        code = { lang: fence[1], lines: [] };
      }
      continue;
    }
    if (code) {
      code.lines.push(rawLine);
      continue;
    }
    if (!line.trim()) {
      flushAll();
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      const text = inline(heading[2], options);
      if (level === 1) {
        out.push(block('h1', text, `margin:8px 0 28px;color:${THEME.text};font-size:28px;line-height:1.28;font-weight:750;letter-spacing:0;background-color:${THEME.bg};`));
      } else if (level === 2) {
        h2Index += 1;
        out.push(`<h2 style="margin:42px 0 17px;padding-bottom:8px;border-bottom:1px solid ${THEME.divider};color:${THEME.text};font-size:22px;line-height:1.42;font-weight:780;letter-spacing:0;background-color:${THEME.bg};"><span style="color:${THEME.h2NumberColor};font-size:13px;font-weight:800;letter-spacing:0.08em;margin-right:12px;background-color:${THEME.bg};">${String(h2Index).padStart(2, '0')}</span><span style="background-color:${THEME.bg};">${text}</span></h2>`);
      } else {
        out.push(`<h3 style="margin:30px 0 13px;color:${THEME.text};font-size:18px;line-height:1.45;font-weight:740;letter-spacing:0;background-color:${THEME.bg};"><span style="border-bottom:3px solid ${THEME.accentWarm};padding-bottom:2px;background-color:${THEME.bg};">${text}</span></h3>`);
      }
      continue;
    }
    if (/^---+$/.test(line.trim())) {
      flushAll();
      out.push(`<hr style="border:none;border-top:1px solid ${THEME.divider};width:72px;margin:30px auto;background-color:${THEME.bg};" />`);
      continue;
    }
    const quoteLine = line.match(/^>\s?(.*)$/);
    if (quoteLine) {
      flushParagraph();
      flushList();
      quote.push(quoteLine[1]);
      continue;
    }
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (ordered || unordered) {
      flushParagraph();
      flushQuote();
      const type = ordered ? 'ol' : 'ul';
      if (!list || list.type !== type) flushList();
      if (!list) list = { type, items: [] };
      list.items.push((ordered || unordered)[1]);
      continue;
    }
    flushList();
    flushQuote();
    paragraph.push(line.trim());
  }
  flushAll();
  const title = meta.title || inferTitle(body) || 'Xukache Article';
  return { title, html: out.join('\n') };
}

function inferTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

function renderDocument(markdown, options = {}) {
  const rendered = renderMarkdown(markdown, options);
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(rendered.title)}</title>
</head>
<body style="margin:0;background-color:${THEME.bg};">
<section style="box-sizing:border-box;max-width:${THEME.maxWidth}px;margin:0 auto;padding:34px 22px 46px;background-color:${THEME.bg};font-family:${THEME.fontFamily};color:${THEME.text};">
${rendered.html}
</section>
</body>
</html>`;
}

function defaultOutput(input) {
  const parsed = path.parse(input);
  return path.join(parsed.dir, `${parsed.name}_xukache_wechat.html`);
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  const { input, output } = parseArgs(process.argv);
  if (!input) {
    usage();
    process.exit(1);
  }
  const source = fs.readFileSync(input, 'utf8');
  const html = renderDocument(source, { baseDir: path.dirname(path.resolve(input)) });
  const outPath = output || defaultOutput(input);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(outPath);
}

export { THEME, embedLocalImages, localImageToDataUri, renderDocument, renderMarkdown };
