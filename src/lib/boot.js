/* ============================================================
   開機正規化：把舊的 query 連結（?ch= / ?iv= / ?lang=）改寫成新的路徑，
   必須在任何 store 讀取 location 之前執行 —— 所以在 main.js 第一個 import 它。
   只跑一次、用 replaceState（不留歷史）。純瀏覽器端。
   ============================================================ */
import { CH } from '../data/chapters.js';
import { INTERVIEWS } from '../data/interviews.js';
import { buildPath } from './router.js';

(function normalizeLegacyURL() {
  try {
    const p = new URLSearchParams(location.search);
    if (!p.has('ch') && !p.has('iv') && !p.has('lang')) return;

    const lang = p.get('lang');
    const locale = lang === 'zh' || lang === 'ja' ? lang : 'en';

    let mode = 'course', current = null, iv = null;
    if (p.has('iv')) {
      mode = 'interview';
      const id = p.get('iv');
      iv = id && INTERVIEWS[id] ? id : null;
    } else if (p.has('ch')) {
      const n = Number(p.get('ch'));
      current = CH[n] ? n : null;
    }

    const path = buildPath({ locale, mode, current, iv });
    history.replaceState(null, '', path + location.hash);
  } catch { /* 忽略 */ }
})();
