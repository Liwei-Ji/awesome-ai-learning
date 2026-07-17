/* ============================================================
   全域導覽狀態（Svelte 5 runes）。路徑方案見 lib/router.js。
   兩個 mode：
     course    課程，nav.current = 章號（null = 課程首頁地圖）
     interview 進階挑戰，nav.iv = 題目 id（null = 題庫落地頁）
   語言不放這裡（由 i18n store 管），但一起編碼在路徑前綴。
   深連結：/course/<slug>、/challenge/<id>（可分享，語言前綴 /zh、/ja）。
   ============================================================ */
import { parsePath, buildPath } from '../lib/router.js';
import { i18n, htmlLangOf } from './i18n.svelte.js';

function initial() {
  const { mode, current, iv } = parsePath(location.pathname);
  return { mode, current, iv };
}

export const nav = $state(initial());

/** 依 nav + 目前語言重建路徑，寫回網址（預設 push，留下歷史）。 */
function syncURL(replace = false) {
  const path = buildPath({ locale: i18n.locale, mode: nav.mode, current: nav.current, iv: nav.iv });
  if (location.pathname === path && !replace) return; // 已在該路徑，不重複 push
  const full = path + location.hash;
  if (replace) history.replaceState(null, '', full);
  else history.pushState(null, '', full);
}

/** 切到課程某章；傳 null 回課程首頁 */
export function go(id) {
  nav.mode = 'course';
  nav.current = id;
  syncURL();
}

/** 切到進階挑戰某題；傳 null 回題庫落地頁 */
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

/** 給 <a href> 用：依目前語言算出目的地路徑（讓爬蟲能跟連結） */
export const hrefCourse = (id) => buildPath({ locale: i18n.locale, mode: 'course', current: id });
export const hrefIv = (id) => buildPath({ locale: i18n.locale, mode: 'interview', iv: id });

/** 手機版：側邊欄抽屜開合狀態 */
export const ui = $state({ menuOpen: false });
export function toggleMenu() { ui.menuOpen = !ui.menuOpen; }
export function closeMenu() { ui.menuOpen = false; }

/** <a> 點擊攔截：純左鍵才走 client 端導覽；cmd/ctrl/shift/中鍵維持「開新分頁」等瀏覽器預設。
    導覽後自動關閉手機抽屜（close=false 可保留，例如 course/challenge 切換） */
export function onNav(e, fn, close = true) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  fn();
  if (close) ui.menuOpen = false;
}

// 上一頁／下一頁：從網址還原 nav 與語言
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    const { locale, mode, current, iv } = parsePath(location.pathname);
    nav.mode = mode;
    nav.current = current;
    nav.iv = iv;
    i18n.locale = locale;
    document.documentElement.lang = htmlLangOf(locale);
  });
}
