/* ============================================================
   語言狀態（Svelte 5 runes）。
   locale：'zh' | 'en' | 'ja'。來源優先序：?lang= → localStorage → 瀏覽器語言 → en（主要語言）。
   內容資料層以 zh 為底、en/ja 為翻譯層（見 localize.js），與此顯示語言預設無關。
   t(key)：以點路徑取 UI 字串，缺該語言時 fallback 回中文。
   內容層（章節/知識庫/demo）另以 data 綁定，不透過這裡。
   ============================================================ */
import { LOCALES, messages } from '../i18n/index.js';

const htmlLangOf = (l) => (l === 'zh' ? 'zh-Hant' : l);

function initialLocale() {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (LOCALES.includes(q)) return q;
    const saved = localStorage.getItem('locale');
    if (LOCALES.includes(saved)) return saved;
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('zh')) return 'zh';
    if (nav.startsWith('ja')) return 'ja';
  } catch { /* SSR/無 window 時忽略 */ }
  return 'en';
}

export const i18n = $state({ locale: initialLocale() });

// 首次設定 <html lang>
if (typeof document !== 'undefined') document.documentElement.lang = htmlLangOf(i18n.locale);

/** 切換語言：更新狀態、localStorage、網址 ?lang 與 <html lang>。 */
export function setLocale(l) {
  if (!LOCALES.includes(l)) return;
  i18n.locale = l;
  try {
    localStorage.setItem('locale', l);
    const url = new URL(location.href);
    if (l === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', l);
    history.replaceState(null, '', url);
    document.documentElement.lang = htmlLangOf(l);
  } catch { /* 忽略 */ }
}

/** 取 UI 字串（點路徑，如 'home.title'）；缺就 fallback 中文，再退回 key。 */
export function t(key) {
  const pick = (dict) => key.split('.').reduce((o, k) => (o == null ? o : o[k]), dict);
  return pick(messages[i18n.locale]) ?? pick(messages.zh) ?? key;
}
