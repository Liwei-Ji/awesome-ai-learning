/* 產生 public/sitemap.xml：首頁 + 全部課程章 + 挑戰題落地頁 + 全部挑戰題，
   每頁三語（en 在根、/zh、/ja）各一筆 <url>，並互相以 hreflang 標註替代版本。
   路徑一律走 app 的 buildPath（單一真相，內容變動後重跑即可）：
     node scripts/gen-sitemap.mjs
   （若日後改路由方案，改 src/lib/router.js 即可，這裡自動跟上。） */
import fs from 'fs';
import { CH } from '../src/data/chapters.js';
import { IV_ORDER } from '../src/data/interviews.js';
import { buildPath } from '../src/lib/router.js';

const SITE = 'https://awesome-ai-learning.vercel.app';
const LOCALES = ['en', 'ja', 'zh'];
const HREFLANG = { en: 'en', ja: 'ja', zh: 'zh-Hant' };

// 每個「路由」= { mode, current, iv }（語言之外的頁面識別）+ 優先權
const routes = [
  { mode: 'course', current: null, iv: null, pri: '1.0' }, // 首頁 / 課程地圖
  ...Object.keys(CH).map((id) => ({ mode: 'course', current: Number(id), iv: null, pri: '0.8' })),
  { mode: 'interview', current: null, iv: null, pri: '0.7' }, // 挑戰題落地頁
  ...IV_ORDER.map((iv) => ({ mode: 'interview', current: null, iv, pri: '0.6' })),
];

const abs = (route, locale) => SITE + buildPath({ ...route, locale });

function urlEntry(route, locale) {
  const alts = LOCALES.map((l) => `    <xhtml:link rel="alternate" hreflang="${HREFLANG[l]}" href="${abs(route, l)}" />`).join('\n');
  const xdefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(route, 'en')}" />`;
  return `  <url>\n    <loc>${abs(route, locale)}</loc>\n    <priority>${route.pri}</priority>\n${alts}\n${xdefault}\n  </url>`;
}

const body = routes.flatMap((r) => LOCALES.map((l) => urlEntry(r, l))).join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`;

fs.writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`sitemap.xml: ${routes.length} routes × ${LOCALES.length} langs = ${routes.length * LOCALES.length} URLs`);
