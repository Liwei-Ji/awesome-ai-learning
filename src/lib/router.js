/* ============================================================
   路徑路由（純函式，無副作用、不碰 store）。
   URL 方案（語言以路徑前綴表示，en 為主要語言、不加前綴）：
     /                     課程首頁（知識地圖），英文
     /course/<slug>        某一章，英文
     /challenge            挑戰題落地頁，英文
     /challenge/<id>       某一題，英文
     /zh…、/ja…            同上，但整站中文／日文（例 /zh/course/tokenizer）
   nav 形狀：{ locale:'en'|'zh'|'ja', mode:'course'|'interview', current:章號|null, iv:題id|null }
   ============================================================ */
import { CH, idOf } from '../data/chapters.js';
import { INTERVIEWS } from '../data/interviews.js';

const PREFIX = { zh: true, ja: true };

/** pathname → { locale, mode, current, iv }（無效 slug/id 會落回該區的落地頁） */
export function parsePath(pathname) {
  const segs = (pathname || '/').split('/').filter(Boolean);
  let locale = 'en';
  if (PREFIX[segs[0]]) locale = segs.shift();

  let mode = 'course', current = null, iv = null;
  if (segs[0] === 'challenge') {
    mode = 'interview';
    const id = segs[1] || null;
    iv = id && INTERVIEWS[id] ? id : null;
  } else if (segs[0] === 'course') {
    const id = idOf(segs[1] || '');
    current = id >= 0 ? id : null;
  }
  return { locale, mode, current, iv };
}

/** { locale, mode, current, iv } → 路徑字串（一律以 / 開頭、無尾斜線） */
export function buildPath({ locale = 'en', mode = 'course', current = null, iv = null } = {}) {
  let route = '';
  if (mode === 'interview') route = iv != null ? `/challenge/${iv}` : '/challenge';
  else if (current != null && CH[current]) route = `/course/${CH[current].slug}`;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return prefix + route || '/';
}
