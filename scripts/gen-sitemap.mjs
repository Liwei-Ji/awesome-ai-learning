/* 產生 public/sitemap.xml：首頁 + 全部課程章 + 挑戰題落地頁 + 全部挑戰題 + 全部學習路線，
   每頁三語（en 在根、/zh、/ja）各一筆 <url>，並互相以 hreflang 標註替代版本，附 <lastmod>。
   路徑一律走 app 的 buildPath（單一真相，內容變動後重跑即可）：
     node scripts/gen-sitemap.mjs
   （若日後改路由方案，改 src/lib/router.js 即可，這裡自動跟上。） */
import fs from 'fs';
import { execSync } from 'node:child_process';
import { CH } from '../src/data/chapters.js';
import { IV_ORDER } from '../src/data/interviews.js';
import { PATHS } from '../src/data/paths.js';
import { buildPath } from '../src/lib/router.js';

const SITE = 'https://awesome-ai-learning.vercel.app';
const LOCALES = ['en', 'ja', 'zh'];
const HREFLANG = { en: 'en', ja: 'ja', zh: 'zh-Hant' };

// lastmod：取各資料檔的 git 最後提交日（YYYY-MM-DD）；取不到就退回建置日。
const BUILD_DATE = new Date().toISOString().slice(0, 10);
function gitDate(relPath) {
  try {
    const d = execSync(`git log -1 --format=%cs -- ${relPath}`, { encoding: 'utf8' }).trim();
    return d || BUILD_DATE;
  } catch {
    return BUILD_DATE;
  }
}
const maxDate = (...ds) => ds.filter(Boolean).sort().at(-1) || BUILD_DATE;
const LM_COURSE = maxDate(gitDate('src/data/chapters.js'), gitDate('src/data/bodies.js'));
const LM_IV = gitDate('src/data/interviews.js');
const LM_PATH = gitDate('src/data/paths.js');
const LM_ALL = maxDate(LM_COURSE, LM_IV, LM_PATH);

// 每個「路由」= { mode, current, iv, path }（語言之外的頁面識別）+ 優先權 + lastmod
const routes = [
  { mode: 'course', current: null, iv: null, pri: '1.0', lastmod: LM_ALL }, // 首頁 / 課程地圖
  ...Object.keys(CH).map((id) => ({ mode: 'course', current: Number(id), iv: null, pri: '0.8', lastmod: LM_COURSE })),
  { mode: 'interview', current: null, iv: null, pri: '0.7', lastmod: LM_IV }, // 挑戰題落地頁
  ...IV_ORDER.map((iv) => ({ mode: 'interview', current: null, iv, pri: '0.6', lastmod: LM_IV })),
  ...PATHS.map((p) => ({ mode: 'paths', path: p.id, pri: '0.7', lastmod: LM_PATH })), // 學習路線總覽（/paths/<id>）
  { mode: 'browse', browse: 'lessons', pri: '0.8', lastmod: LM_COURSE }, // 課程目錄
  { mode: 'browse', browse: 'challenges', pri: '0.7', lastmod: LM_IV }, // 挑戰題目錄
];

const abs = (route, locale) => SITE + buildPath({ ...route, locale });

function urlEntry(route, locale) {
  const alts = LOCALES.map((l) => `    <xhtml:link rel="alternate" hreflang="${HREFLANG[l]}" href="${abs(route, l)}" />`).join('\n');
  const xdefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(route, 'en')}" />`;
  return `  <url>\n    <loc>${abs(route, locale)}</loc>\n    <lastmod>${route.lastmod}</lastmod>\n    <priority>${route.pri}</priority>\n${alts}\n${xdefault}\n  </url>`;
}

const body = routes.flatMap((r) => LOCALES.map((l) => urlEntry(r, l))).join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`;

fs.writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(
  `sitemap.xml: ${routes.length} routes × ${LOCALES.length} langs = ${routes.length * LOCALES.length} URLs ` +
    `(lastmod course=${LM_COURSE}, iv=${LM_IV}, paths=${LM_PATH})`,
);
