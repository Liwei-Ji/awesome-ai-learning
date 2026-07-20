/* 預渲染（SSG 快照）：build 後跑。啟一台本機 preview，用 headless Chrome
   逐一開啟每條路由（三語），把 client 端渲染完成的 DOM 存成靜態 HTML 到 dist/，
   讓爬蟲與社群分享（不執行 JS）也能拿到完整內容與 head。
   執行：node scripts/prerender.mjs   （會自動 build 前置需先跑 vite build）
   路由清單走 app 的 buildPath（與 sitemap 同源，永不漂移）。 */
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import puppeteer from 'puppeteer';
import { CH } from '../src/data/chapters.js';
import { IV_ORDER } from '../src/data/interviews.js';
import { buildPath } from '../src/lib/router.js';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://awesome-ai-learning.vercel.app';
const PORT = 4189;
const ORIGIN = `http://localhost:${PORT}`;
// 本機用系統 Chrome（快、免下載）；Vercel 等 build 環境沒有系統 Chrome，改用 puppeteer 內建 Chromium
const MAC_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const CHROME = process.env.CHROME_PATH || (fs.existsSync(MAC_CHROME) ? MAC_CHROME : puppeteer.executablePath());
const LOCALES = ['en', 'ja', 'zh'];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- 全部路由（語言之外的頁面）----
const routes = [
  { mode: 'course', current: null, iv: null },
  ...Object.keys(CH).map((id) => ({ mode: 'course', current: Number(id), iv: null })),
  { mode: 'interview', current: null, iv: null },
  ...IV_ORDER.map((iv) => ({ mode: 'interview', current: null, iv })),
  { mode: 'browse', browse: 'lessons' },
  { mode: 'browse', browse: 'challenges' },
];
const paths = routes.flatMap((r) => LOCALES.map((l) => buildPath({ ...r, locale: l })));

const fileFor = (p) => path.join(DIST, p === '/' ? '' : p, 'index.html');

function waitReady(timeoutMs = 15000) {
  const t0 = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      http.get(ORIGIN + '/', (res) => { res.resume(); resolve(); }).on('error', () => {
        if (Date.now() - t0 > timeoutMs) reject(new Error('preview server did not start'));
        else setTimeout(tick, 250);
      });
    };
    tick();
  });
}

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('dist/ not found — run `vite build` first.');
  process.exit(1);
}

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], { cwd: ROOT, stdio: 'ignore' });
let browser;
try {
  await waitReady();
  browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  let ok = 0;
  for (const p of paths) {
    await page.goto(ORIGIN + p, { waitUntil: 'networkidle0' });
    await sleep(250); // 讓 Seo $effect 與過場落定
    let html = await page.content();
    html = html.split(ORIGIN).join(SITE); // 把 canonical/og/hreflang 的 localhost 換成正式網域
    const out = fileFor(p);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    ok++;
    if (ok % 40 === 0) console.log(`  …${ok}/${paths.length}`);
  }
  console.log(`prerendered ${ok}/${paths.length} pages → dist/`);
} finally {
  if (browser) await browser.close();
  server.kill();
}
