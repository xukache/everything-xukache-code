#!/usr/bin/env node
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, isAbsolute } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';

const [inputHtml, outputPng] = process.argv.slice(2);

if (!inputHtml || !outputPng) {
  console.error('Usage: node scripts/render-cover.mjs <cover.html> <cover.png>');
  process.exit(2);
}

const chromeCandidates = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

function findChrome() {
  return chromeCandidates.find((path) => {
    try {
      return !!path && Bun.file(path);
    } catch {
      return false;
    }
  });
}

async function commandExists(path) {
  const { access } = await import('node:fs/promises');
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function pickChrome() {
  for (const candidate of chromeCandidates) {
    if (await commandExists(candidate)) return candidate;
  }
  throw new Error('Chrome/Chromium not found. Set CHROME_PATH to a Chrome executable.');
}

function wait(ms) {
  return new Promise((resolveWait) => setTimeout(resolveWait, ms));
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} -> HTTP ${response.status}`);
  return response.json();
}

class CdpClient {
  constructor(wsUrl) {
    this.nextId = 1;
    this.pending = new Map();
    this.ws = new WebSocket(wsUrl);
    this.ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve: done, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else done(message.result);
      }
    });
  }

  async open() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    await new Promise((resolveOpen, rejectOpen) => {
      this.ws.addEventListener('open', resolveOpen, { once: true });
      this.ws.addEventListener('error', rejectOpen, { once: true });
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    const payload = JSON.stringify({ id, method, params });
    const promise = new Promise((resolveSend, rejectSend) => {
      this.pending.set(id, { resolve: resolveSend, reject: rejectSend });
    });
    this.ws.send(payload);
    return promise;
  }

  close() {
    this.ws.close();
  }
}

async function main() {
  const chrome = await pickChrome();
  const userDataDir = mkdtempSync(resolve(tmpdir(), 'axu-cover-chrome-'));
  const port = 9223 + Math.floor(Math.random() * 1000);
  const htmlPath = isAbsolute(inputHtml) ? inputHtml : resolve(process.cwd(), inputHtml);
  const outputPath = isAbsolute(outputPng) ? outputPng : resolve(process.cwd(), outputPng);
  const url = pathToFileURL(htmlPath).href;

  const args = [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--headless=new',
    '--no-first-run',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=1000,520',
    url,
  ];

  const chromeProcess = spawn(chrome, args, { stdio: 'ignore' });

  try {
    let targets;
    for (let i = 0; i < 80; i += 1) {
      try {
        targets = await fetchJson(`http://127.0.0.1:${port}/json/list`);
        if (targets.length) break;
      } catch {
        await wait(100);
      }
    }

    const pageTarget = targets?.find((target) => target.type === 'page');
    if (!pageTarget?.webSocketDebuggerUrl) {
      throw new Error('No Chrome page target found.');
    }

    const cdp = new CdpClient(pageTarget.webSocketDebuggerUrl);
    await cdp.open();
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1000,
      height: 520,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await wait(500);

    const result = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const cover = document.querySelector('.cover');
        if (!cover) throw new Error('Missing .cover element');
        const rect = cover.getBoundingClientRect();
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      })()`,
      returnByValue: true,
    });

    const rect = result.result.value;
    const screenshot = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
      clip: {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        scale: 1,
      },
    });

    writeFileSync(outputPath, Buffer.from(screenshot.data, 'base64'));
    cdp.close();
    console.log(`wrote ${outputPath} (${Math.round(rect.width)}x${Math.round(rect.height)})`);
  } finally {
    chromeProcess.kill('SIGTERM');
    try {
      rmSync(userDataDir, { recursive: true, force: true });
    } catch {
      // Non-critical cleanup.
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
