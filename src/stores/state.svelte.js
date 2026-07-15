/* ============================================================
   全域可反應狀態（Svelte 5 runes）。
   兩個 mode：
     course    —— 課程，nav.current = 章號（null = 課程首頁地圖）
     interview —— 面試演練，nav.iv = 題目 id（null = 題庫落地頁）
   兩者各自記住停在哪；頂部切換只是換 mode + 同步網址。

   深連結：?ch=N 開課程某章；?iv=<id> 開面試某題（可分享）。
   ============================================================ */
import { CH } from '../data/chapters.js';

function initial() {
  const p = new URLSearchParams(location.search);
  if (p.get('iv') !== null) {
    return { mode: 'interview', current: null, iv: p.get('iv') || null };
  }
  const raw = p.get('ch');
  const n = raw === null ? null : (CH[Number(raw)] ? Number(raw) : null);
  return { mode: 'course', current: n, iv: null };
}

export const nav = $state(initial());

function syncURL() {
  const url = new URL(location.href);
  url.searchParams.delete('ch');
  url.searchParams.delete('iv');
  if (nav.mode === 'interview') {
    if (nav.iv != null) url.searchParams.set('iv', nav.iv);
  } else if (nav.current != null) {
    url.searchParams.set('ch', nav.current);
  }
  history.replaceState(null, '', url);
}

/** 切到課程某章；傳 null 回課程首頁 */
export function go(id) {
  nav.mode = 'course';
  nav.current = id;
  syncURL();
}

/** 切到面試某題；傳 null 回題庫落地頁 */
export function goIv(id) {
  nav.mode = 'interview';
  nav.iv = id;
  syncURL();
}

/** 頂部切換 course / interview（記住各自剛才的位置） */
export function setMode(m) {
  nav.mode = m;
  syncURL();
}
