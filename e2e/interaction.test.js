/* ============================================================
   真實互動回歸測試 —— puppeteer-core 驅動系統 Chrome，
   實際點擊/拖曳/打字，攔截 console/page error，並偵測「靜默失效」。
   這是靜態截圖抓不到的那一層（例：effect 迴圈全站 crash、
   按鈕有反應但沒改到 state 的空輸出）。

   用法：
     1. 先起 dev server：  npm run dev
     2. 另開終端機：       npm run test:e2e            （預設 http://localhost:5173）
        或指定網址：       npm run test:e2e -- http://localhost:4173

   需要：本機安裝 Google Chrome（走系統 Chrome，不下載 Chromium）。
   離開碼：全部通過=0，有任何 console/page error 或死互動=1。
   ============================================================ */
import puppeteer from 'puppeteer-core';

const CHROME = process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = (process.argv[2] || 'http://localhost:5173').replace(/\/$/, '');
const TOTAL = 27; // 最大章號（序章 0 ～ 27，共 28 章）
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CH = ['AI簡史', 'AI是什麼', '機器學習', '資料', '深度學習', '神經網路', '梯度下降',
  '反向傳播', 'Tokenizer', 'Embedding', 'Transformer', 'LLM', '模型大小', 'ContextWindow',
  '推論', '到ChatGPT', 'Fine-tuning', 'Prompt', '生成式AI', '多模態', 'RAG', 'Memory', 'MCP',
  'Agent', '系統整合', 'Limits', '評估', 'Capstone'];

function attachErrorSinks(page, errs) {
  page.on('pageerror', (e) => errs.push('PAGEERROR: ' + (e.message || e).toString().split('\n')[0]));
  page.on('console', (m) => { if (m.type() === 'error') errs.push('console.error: ' + m.text().slice(0, 200)); });
  page.on('response', (r) => { if (r.status() === 404) errs.push('404: ' + r.url().slice(-60)); });
}

// 驅動 demo：點所有按鈕 → 拖所有滑桿 → 點可互動塊 → 再點一輪 → 等計時器/rAF
async function driveDemo(page) {
  const clickAll = async (sel) => {
    for (const el of await page.$$(sel)) { try { await el.click({ delay: 5 }); await sleep(110); } catch (e) {} }
  };
  const wiggle = async (sel) => {
    for (const r of await page.$$(sel)) {
      for (const f of [0, 0.5, 1, 0.28]) {
        try {
          await page.evaluate((el, frac) => {
            const min = parseFloat(el.min) || 0, max = parseFloat(el.max) || 100, step = parseFloat(el.step) || 1;
            const v = Math.round((min + (max - min) * frac) / step) * step;
            Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value').set.call(el, String(v));
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, r, f);
          await sleep(80);
        } catch (e) {}
      }
    }
  };
  await clickAll('.canvas-wrap button');
  await wiggle('.canvas-wrap input[type=range]');
  await clickAll('.canvas-wrap [role="button"], .canvas-wrap .pl, .canvas-wrap .chip, .canvas-wrap .cell, .canvas-wrap .word');
  await clickAll('.canvas-wrap button');
  await sleep(700);
}

// 靜默失效偵測：只點一次每顆按鈕（避免 toggle 歸位）+ 滑桿推到底，
// 比對 demo panel 的 innerText 是否有變（文字沒變不代表壞，只作候選旗標）
async function stateChanged(page) {
  const snap = () => page.$eval('.canvas-wrap', (n) => {
    const p = n.querySelector('.panel') || n;
    return (p.innerText || '').replace(/\s+/g, ' ').trim();
  }).catch(() => '');
  const before = await snap();
  for (const b of await page.$$('.canvas-wrap .panel button')) { try { await b.click(); await sleep(120); } catch (e) {} }
  for (const r of await page.$$('.canvas-wrap .panel input[type=range]')) {
    try {
      await page.evaluate((el) => {
        Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value').set.call(el, el.max || '100');
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }, r);
    } catch (e) {}
  }
  await sleep(900);
  return before !== (await snap());
}

async function testTutor(browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const errs = [];
  attachErrorSinks(page, errs);
  const info = { opened: false, chipAnswered: false, typedAnswered: false, resetOnNav: false };
  try {
    await page.goto(`${BASE}/?ch=1`, { waitUntil: 'networkidle2', timeout: 15000 });
    await sleep(500);
    await page.click('.fab'); await sleep(400);
    info.opened = !!(await page.$('.tutor-card'));
    await page.click('.tutor-card .chip'); await sleep(800);
    info.chipAnswered = (await page.$eval('.tutor-card .msg.bot:last-child', (n) => n.innerText).catch(() => '')).length > 20;
    const input = await page.$('.tutor-in input');
    if (input) {
      const before = await page.$$eval('.tutor-card .msg', (n) => n.length);
      await input.click(); await page.keyboard.type('什麼是模型'); await page.keyboard.press('Enter');
      await sleep(800);
      info.typedAnswered = (await page.$$eval('.tutor-card .msg', (n) => n.length)) > before;
    }
    await page.goto(`${BASE}/?ch=11`, { waitUntil: 'networkidle2' }); await sleep(400);
    await page.click('.fab'); await sleep(400);
    info.resetOnNav = (await page.$$eval('.tutor-card .msg', (n) => n.length)) === 1;
  } catch (e) { errs.push('TUTOR EXCEPTION: ' + e.message); }
  await page.close();
  return { errs, info };
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--window-size=1280,900'],
  });
  let fail = 0;
  console.log(`\n===== 真實互動回歸測試  (${BASE}) =====\n`);

  for (let ch = 0; ch <= TOTAL; ch++) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    const errs = [];
    attachErrorSinks(page, errs);
    let changed = false;
    try {
      await page.goto(`${BASE}/?ch=${ch}`, { waitUntil: 'networkidle2', timeout: 15000 });
      await sleep(500);
      await driveDemo(page);
    } catch (e) { errs.push('DRIVE EXCEPTION: ' + e.message); }
    // 重新載入乾淨頁面做靜默失效偵測
    try {
      await page.goto(`${BASE}/?ch=${ch}`, { waitUntil: 'networkidle2' });
      await sleep(400);
      changed = await stateChanged(page);
    } catch (e) {}
    await page.close();

    const errCount = errs.filter((e) => !e.startsWith('404: favicon') && !/favicon\.ico/.test(e)).length;
    if (errCount) {
      fail++;
      console.log(`✗ Ch${ch} ${CH[ch]}`);
      errs.slice(0, 6).forEach((e) => console.log('    ' + e));
    } else {
      console.log(`✓ Ch${ch} ${CH[ch]}${changed ? '' : '  (⚠ 互動後文字未變 — 可能為純視覺變化，建議人工確認)'}`);
    }
  }

  const t = await testTutor(browser);
  const tutorOk = t.info.opened && t.info.chipAnswered && t.info.typedAnswered && t.info.resetOnNav && !t.errs.length;
  console.log(`\n${tutorOk ? '✓' : '✗'} AI教授  ${JSON.stringify(t.info)}`);
  t.errs.forEach((e) => console.log('    ' + e));
  if (!tutorOk) fail++;

  await browser.close();
  console.log(`\n===== ${fail === 0 ? '全部通過 ✅' : fail + ' 項失敗 ✗'} =====\n`);
  process.exit(fail === 0 ? 0 : 1);
})();
