#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { THEME, localImageToDataUri } from './convert.mjs';

const input = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : null;
const inputBaseDir = input && fs.existsSync(input) ? path.dirname(path.resolve(input)) : process.cwd();
const sourceMarkdown = input && fs.existsSync(input) ? fs.readFileSync(input, 'utf8') : null;
const initialMarkdown = input && fs.existsSync(input)
  ? localImagesToFileUris(sourceMarkdown, inputBaseDir)
  : `---
title: 不慌不忙，学点 AI
summary: 一篇使用阿栩主题排版的公众号文章示例
---

# 不慌不忙，学点 AI

这是一段正文。这个主题把 **Xukache 的 AI 圈** 的 IP 气质转成公众号排版：温白、柔炭灰、淡鼠尾草绿，以及克制的暖杏色强调。

## 为什么要定制主题

- 公众号排版应该稳定复用
- 复制到编辑器后样式不应大面积丢失
- 视觉风格要和阿栩 IP 资产保持一致

> 阿栩的感觉不是卖萌，而是一个专业、温暖、安静陪你学习 AI 的伙伴。

## 代码或工具说明

\`\`\`bash
node .codex/skills/wechat-axu-styler/scripts/convert.mjs article.md
\`\`\`

### 小结

写作和排版都可以慢一点，但每次都沉淀成可复用资产。`;
const imageDataUriByFileUri = sourceMarkdown ? collectImageDataUriMap(sourceMarkdown, inputBaseDir) : {};

const html = buildEditor(initialMarkdown, imageDataUriByFileUri);
const dir = path.join(os.tmpdir(), 'wechat-axu-styler');
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, `editor-${Date.now()}.html`);
fs.writeFileSync(file, html, 'utf8');

const opener = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'cmd' : 'xdg-open';
const args = process.platform === 'win32' ? ['/c', 'start', '', file] : [file];
execFile(opener, args, { stdio: 'ignore' }, () => {});
console.log(file);

function isRemoteOrDataUri(src) {
  return /^(https?:)?\/\//i.test(src) || /^data:/i.test(src);
}

function resolveLocalImagePath(src, baseDir) {
  if (!src || isRemoteOrDataUri(src) || src.startsWith('#')) return null;
  const cleanSrc = decodeURIComponent(src.trim().split(/[?#]/)[0]);
  const imagePath = path.isAbsolute(cleanSrc) ? cleanSrc : path.resolve(baseDir, cleanSrc);
  return fs.existsSync(imagePath) && fs.statSync(imagePath).isFile() ? imagePath : null;
}

function localImagesToFileUris(markdown, baseDir) {
  return markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    const imagePath = resolveLocalImagePath(src, baseDir);
    return imagePath ? `![${alt}](${pathToFileURL(imagePath).href})` : match;
  });
}

function collectImageDataUriMap(markdown, baseDir) {
  const map = {};
  markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    const imagePath = resolveLocalImagePath(src, baseDir);
    if (imagePath) {
      map[pathToFileURL(imagePath).href] = localImageToDataUri(src.trim(), baseDir);
    }
    return match;
  });
  return map;
}

function buildEditor(markdown, imageDataUriMap) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>WeChat Axu Styler</title>
<style>
:root {
  --bg: ${THEME.bg};
  --surface: ${THEME.surface};
  --text: ${THEME.text};
  --muted: ${THEME.muted};
  --sage: ${THEME.accent};
  --warm: ${THEME.accentWarm};
  --quote: ${THEME.quoteBg};
  --line: ${THEME.divider};
  --code: ${THEME.codeBg};
}
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: "Source Han Sans SC", "Noto Sans CJK SC", "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
}
.app {
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
}
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 18px;
  border-bottom: 1px solid var(--line);
  background: var(--surface);
}
.brand { display: flex; align-items: baseline; gap: 10px; min-width: 0; }
.brand strong { font-size: 16px; letter-spacing: 0; white-space: nowrap; }
.brand span { color: var(--muted); font-size: 13px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
button, .file-btn {
  height: 34px;
  border: 1px solid var(--line);
  background: #fffaf2;
  color: var(--text);
  border-radius: 6px;
  padding: 0 12px;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
button.primary { background: var(--text); color: var(--surface); border-color: var(--text); }
button:hover, .file-btn:hover { border-color: var(--sage); }
input[type=file] { display: none; }
.grid {
  display: grid;
  grid-template-columns: minmax(320px, 1fr) minmax(360px, 1fr);
  min-height: 0;
}
.pane { min-width: 0; min-height: 0; display: flex; flex-direction: column; overflow: hidden; }
.pane:first-child { border-right: 1px solid var(--line); }
.pane-head {
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  border-bottom: 1px solid var(--line);
  background: rgba(255,252,247,0.72);
}
.pane-title { font-size: 13px; font-weight: 700; }
.status { color: var(--muted); font-size: 12px; }
textarea {
  width: 100%;
  flex: 1;
  border: 0;
  resize: none;
  outline: none;
  padding: 20px;
  background: #fffaf2;
  color: var(--text);
  font: 15px/1.72 "SF Mono", "JetBrains Mono", Consolas, monospace;
}
.preview-wrap {
  flex: 1;
  overflow: auto;
  padding: 24px;
  background: var(--bg);
}
#preview {
  max-width: 640px;
  margin: 0 auto;
  background: var(--bg);
  min-height: 100%;
}
.note {
  padding: 8px 14px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 12px;
  background: var(--surface);
}
@media (max-width: 900px) {
  .topbar { height: auto; min-height: 58px; align-items: flex-start; padding: 12px; flex-direction: column; }
  .actions { justify-content: flex-start; }
  .grid { grid-template-columns: 1fr; }
  .pane:first-child { border-right: 0; border-bottom: 1px solid var(--line); min-height: 45vh; }
  .pane:nth-child(2) { min-height: 55vh; }
}
</style>
</head>
<body>
<div class="app">
  <header class="topbar">
    <div class="brand">
      <strong>WeChat Axu Styler</strong>
      <span>阿栩主题 · 不慌不忙，学点 AI</span>
    </div>
    <div class="actions">
      <label class="file-btn">导入 MD<input id="file" type="file" accept=".md,.markdown,.txt,text/markdown,text/plain" /></label>
      <button id="sample">示例</button>
      <button id="save">保存 HTML</button>
      <button id="copy" class="primary">复制到公众号</button>
    </div>
  </header>
  <main class="grid">
    <section class="pane">
      <div class="pane-head"><span class="pane-title">Markdown</span><span id="count" class="status"></span></div>
      <textarea id="editor" spellcheck="false"></textarea>
    </section>
    <section class="pane">
      <div class="pane-head"><span class="pane-title">公众号预览</span><span id="status" class="status">已渲染</span></div>
      <div class="preview-wrap"><article id="preview"></article></div>
      <div class="note">复制按钮会写入富文本 HTML。粘贴到公众号编辑器后，若长文不稳定，分段复制更稳。</div>
    </section>
  </main>
</div>
<script>
const theme = {
  font: ${JSON.stringify(THEME.fontFamily)},
  codeFont: ${JSON.stringify(THEME.codeFont)},
  fontSize: ${JSON.stringify(THEME.fontSize)},
  lineHeight: ${JSON.stringify(THEME.lineHeight)},
  bg: ${JSON.stringify(THEME.bg)},
  surface: ${JSON.stringify(THEME.surface)},
  text: ${JSON.stringify(THEME.text)},
  muted: ${JSON.stringify(THEME.muted)},
  sage: ${JSON.stringify(THEME.accent)},
  warm: ${JSON.stringify(THEME.accentWarm)},
  quoteBg: ${JSON.stringify(THEME.quoteBg)},
  line: ${JSON.stringify(THEME.divider)},
  code: ${JSON.stringify(THEME.codeBg)},
  imageBorder: ${JSON.stringify(THEME.imageBorder)},
  h2NumberColor: ${JSON.stringify(THEME.h2NumberColor)},
  maxWidth: ${JSON.stringify(THEME.maxWidth)}
};
const initial = ${JSON.stringify(markdown)};
const sample = initial;
const imageDataUriByFileUri = ${JSON.stringify(imageDataUriMap)};
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const statusEl = document.getElementById('status');
const countEl = document.getElementById('count');
editor.value = initial;

function esc(s) {
  return String(s || '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
}
function inline(text) {
  let value = esc(text);
  value = value.replace(/!\\[([^\\]]*)\\]\\(([^)]+)\\)/g, (_, alt, src) => '<img src="' + esc(src) + '" alt="" style="display:block;max-width:94%;height:auto;margin:28px auto;border:1px solid ' + theme.imageBorder + ';border-radius:7px;" />');
  value = value.replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g, (_, label, href) => {
    const cleanHref = href.trim();
    const isImage = /^data:image\\//i.test(cleanHref) || /\\.(png|jpe?g|gif|webp|svg|bmp|avif)([?#].*)?$/i.test(cleanHref);
    if (isImage) {
      return '<img src="' + esc(cleanHref) + '" alt="" style="display:block;max-width:94%;height:auto;margin:28px auto;border:1px solid ' + theme.imageBorder + ';border-radius:7px;" />';
    }
    return '<a href="' + esc(cleanHref) + '" style="color:' + theme.text + ';text-decoration:none;border-bottom:1px solid ' + theme.sage + ';">' + label + '</a>';
  });
  value = value.replace(/\\*\\*([^*]+)\\*\\*/g, '<strong style="color:' + theme.text + ';font-weight:700;background:linear-gradient(transparent 62%, ' + theme.warm + ' 62%);">$1</strong>');
  const tick = String.fromCharCode(96);
  value = value.replace(new RegExp(tick + '([^' + tick + ']+)' + tick, 'g'), '<code style="font-family:' + theme.codeFont + ';font-size:0.9em;color:' + theme.text + ';background-color:' + theme.code + ';padding:2px 5px;border-radius:4px;">$1</code>');
  return value;
}
function stripFrontmatter(md) {
  if (!md.startsWith('---')) return md;
  const end = md.indexOf('\\n---', 3);
  return end >= 0 ? md.slice(end + 4).trimStart() : md;
}
function render(md) {
  const lines = stripFrontmatter(md).replace(/\\r\\n/g, '\\n').split('\\n');
  const out = [];
  let p = [], list = null, quote = [], code = null, h2Index = 0;
  const flushP = () => { if (p.length) { out.push('<p style="margin:0 0 19px;color:' + theme.text + ';font-size:' + theme.fontSize + 'px;line-height:' + theme.lineHeight + ';letter-spacing:0;background-color:' + theme.bg + ';">' + inline(p.join(' ').trim()) + '</p>'); p = []; } };
  const flushList = () => { if (list) { const tag = list.type; out.push('<' + tag + ' style="margin:0 0 20px 0;padding-left:24px;color:' + theme.text + ';font-size:' + theme.fontSize + 'px;line-height:' + theme.lineHeight + ';background-color:' + theme.bg + ';">' + list.items.map(i => '<li style="margin:6px 0;padding-left:2px;">' + inline(i) + '</li>').join('') + '</' + tag + '>'); list = null; } };
  const flushQuote = () => { if (quote.length) { out.push('<blockquote style="margin:24px 0;padding:0;background-color:' + theme.bg + ';color:' + theme.h2NumberColor + ';font-size:' + (theme.fontSize - 1) + 'px;line-height:' + theme.lineHeight + ';border:none;">' + quote.map(q => '<p style="margin:0 0 8px;background-color:' + theme.bg + ';color:' + theme.h2NumberColor + ';"><span style="color:' + theme.sage + ';font-weight:800;margin-right:8px;background-color:' + theme.bg + ';">&gt;</span><span style="color:' + theme.h2NumberColor + ';font-weight:650;background-color:' + theme.bg + ';">' + inline(q) + '</span></p>').join('') + '</blockquote>'); quote = []; } };
  const flushAll = () => { flushP(); flushList(); flushQuote(); };
  for (const raw of lines) {
    const line = raw.trimEnd();
    const fence = line.startsWith(String.fromCharCode(96).repeat(3));
    if (fence) {
      if (code) { out.push('<pre style="margin:22px 0;padding:16px;overflow:auto;background-color:' + theme.code + ';color:' + theme.text + ';font-family:' + theme.codeFont + ';font-size:14px;line-height:1.65;border-radius:8px;"><code>' + esc(code.join('\\n')) + '</code></pre>'); code = null; }
      else { flushAll(); code = []; }
      continue;
    }
    if (code) { code.push(raw); continue; }
    if (!line.trim()) { flushAll(); continue; }
    const h = line.match(/^(#{1,3})\\s+(.+)$/);
    if (h) {
      flushAll();
      const level = h[1].length, text = inline(h[2]);
      if (level === 1) out.push('<h1 style="margin:8px 0 28px;color:' + theme.text + ';font-size:28px;line-height:1.28;font-weight:750;letter-spacing:0;background-color:' + theme.bg + ';">' + text + '</h1>');
      else if (level === 2) { h2Index += 1; out.push('<h2 style="margin:42px 0 17px;padding-bottom:8px;border-bottom:1px solid ' + theme.line + ';color:' + theme.text + ';font-size:22px;line-height:1.42;font-weight:780;letter-spacing:0;background-color:' + theme.bg + ';"><span style="color:' + theme.h2NumberColor + ';font-size:13px;font-weight:800;letter-spacing:0.08em;margin-right:12px;background-color:' + theme.bg + ';">' + String(h2Index).padStart(2, '0') + '</span><span style="background-color:' + theme.bg + ';">' + text + '</span></h2>'); }
      else out.push('<h3 style="margin:30px 0 13px;color:' + theme.text + ';font-size:18px;line-height:1.45;font-weight:740;letter-spacing:0;background-color:' + theme.bg + ';"><span style="border-bottom:3px solid ' + theme.warm + ';padding-bottom:2px;background-color:' + theme.bg + ';">' + text + '</span></h3>');
      continue;
    }
    if (/^---+$/.test(line.trim())) { flushAll(); out.push('<hr style="border:none;border-top:1px solid ' + theme.line + ';width:72px;margin:30px auto;background-color:' + theme.bg + ';" />'); continue; }
    const q = line.match(/^>\\s?(.*)$/);
    if (q) { flushP(); flushList(); quote.push(q[1]); continue; }
    const ol = line.match(/^\\d+\\.\\s+(.+)$/), ul = line.match(/^[-*]\\s+(.+)$/);
    if (ol || ul) {
      flushP(); flushQuote();
      const type = ol ? 'ol' : 'ul';
      if (!list || list.type !== type) flushList();
      if (!list) list = { type, items: [] };
      list.items.push((ol || ul)[1]);
      continue;
    }
    flushList(); flushQuote(); p.push(line.trim());
  }
  flushAll();
  return '<section style="box-sizing:border-box;max-width:' + theme.maxWidth + 'px;margin:0 auto;padding:34px 22px 46px;background-color:' + theme.bg + ';font-family:' + theme.font + ';color:' + theme.text + ';">' + out.join('\\n') + '</section>';
}
function update() {
  preview.innerHTML = render(editor.value);
  countEl.textContent = editor.value.length + ' 字符';
  statusEl.textContent = '已渲染';
}
editor.addEventListener('input', update);
document.getElementById('sample').addEventListener('click', () => { editor.value = sample; update(); });
document.getElementById('file').addEventListener('change', async (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  editor.value = await file.text();
  update();
});
document.getElementById('save').addEventListener('click', () => {
  const doc = '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Xukache WeChat HTML</title></head><body style="margin:0;background-color:' + theme.bg + ';">' + preview.innerHTML + '</body></html>';
  const blob = new Blob([doc], { type: 'text/html;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'xukache-wechat.html';
  a.click();
  URL.revokeObjectURL(a.href);
});
function htmlWithBase64Images() {
  const clone = preview.cloneNode(true);
  clone.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src') || '';
    const resolved = img.src || src;
    const dataUri = imageDataUriByFileUri[src] || imageDataUriByFileUri[resolved];
    if (dataUri) img.setAttribute('src', dataUri);
  });
  return clone.innerHTML;
}
document.getElementById('copy').addEventListener('click', async () => {
  const html = htmlWithBase64Images();
  try {
    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }), 'text/plain': new Blob([preview.innerText], { type: 'text/plain' }) })]);
    } else {
      const range = document.createRange();
      range.selectNodeContents(preview);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
    }
    statusEl.textContent = '已复制富文本';
  } catch (error) {
    statusEl.textContent = '复制失败，请手动选择预览区复制';
  }
});
update();
</script>
</body>
</html>`;
}
