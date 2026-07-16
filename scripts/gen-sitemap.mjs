/* 產生 public/sitemap.xml：首頁 ＋ 全部課程章（?ch=N）＋ 全部挑戰題（?iv=<id>）。
   內容變更後重跑：  node scripts/gen-sitemap.mjs
   （目前是 query-param 路由；若日後改成路徑路由/預渲染，這裡也要一併更新。） */
import fs from 'fs';
import { CH } from '../src/data/chapters.js';
import { IV_ORDER } from '../src/data/interviews.js';

const SITE = 'https://awesome-ai-learning.vercel.app';

const urls = [{ loc: SITE + '/', pri: '1.0' }];
for (const id of Object.keys(CH)) urls.push({ loc: `${SITE}/?ch=${id}`, pri: '0.8' });
for (const iv of IV_ORDER) urls.push({ loc: `${SITE}/?iv=${iv}`, pri: '0.6' });

const body = urls
  .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <priority>${u.pri}</priority>\n  </url>`)
  .join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

fs.writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`sitemap.xml: ${urls.length} URLs (1 home + ${Object.keys(CH).length} chapters + ${IV_ORDER.length} challenges)`);
