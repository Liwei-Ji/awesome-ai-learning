/* ============================================================
   全域可反應狀態（Svelte 5 runes）。
   單一事實來源：目前章節。元件 import 後直接讀 nav.current 即自動訂閱更新。

   深連結：網址帶 ?ch=N 可直接開該章（可分享的課文連結）。
   切章時也會用 replaceState 同步網址，方便複製當下頁面。
   ============================================================ */
import { CH } from '../data/chapters.js';

// current === null 代表首頁（課程地圖）。沒帶 ?ch 參數 → 首頁；
// ?ch=N 有效（含序章 0）→ 該章。
function initialChapter() {
  const raw = new URLSearchParams(location.search).get('ch');
  if (raw === null) return null;
  const n = Number(raw);
  return CH[n] ? n : null;
}

export const nav = $state({ current: initialChapter() });

/** 切換到某一章；傳 null 回首頁 */
export function go(id) {
  nav.current = id;
  const url = new URL(location.href);
  if (id == null) url.searchParams.delete('ch');
  else url.searchParams.set('ch', id);
  history.replaceState(null, '', url);
}
