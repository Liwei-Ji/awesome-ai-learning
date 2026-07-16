/* ============================================================
   語言狀態（Svelte 5 runes）。
   語言以「路徑前綴」表示：en = 無前綴（主要語言）、/zh、/ja。
   載入時解析 location.pathname 取得語言（見 lib/router.js）；URL 為準。
   內容資料層以 zh 為底、en/ja 為翻譯層（見 localize.js），與此顯示語言無關。
   t(key)：以點路徑取 UI 字串，缺該語言時 fallback 回中文。
   ============================================================ */
import { LOCALES, messages } from '../i18n/index.js';
import { parsePath, buildPath } from '../lib/router.js';

export const htmlLangOf = (l) => (l === 'zh' ? 'zh-Hant' : l);

function initialLocale() {
  try {
    return parsePath(location.pathname).locale;
  } catch {
    return 'en';
  }
}

export const i18n = $state({ locale: initialLocale() });

// 首次設定 <html lang>
if (typeof document !== 'undefined') document.documentElement.lang = htmlLangOf(i18n.locale);

/** 切換語言：同一路由換語言前綴、更新狀態與 <html lang>、記住偏好。 */
export function setLocale(l) {
  if (!LOCALES.includes(l) || l === i18n.locale) return;
  i18n.locale = l;
  try {
    localStorage.setItem('locale', l);
    const route = parsePath(location.pathname); // 目前所在的 mode/current/iv
    const path = buildPath({ ...route, locale: l });
    history.pushState(null, '', path + location.hash);
    document.documentElement.lang = htmlLangOf(l);
  } catch { /* 忽略 */ }
}

/** 取 UI 字串（點路徑，如 'home.title'）；缺就 fallback 中文，再退回 key。 */
export function t(key) {
  const pick = (dict) => key.split('.').reduce((o, k) => (o == null ? o : o[k]), dict);
  return pick(messages[i18n.locale]) ?? pick(messages.zh) ?? key;
}
