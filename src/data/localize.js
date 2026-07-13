/* 依目前語言取「章節顯示資料」：有翻譯就覆蓋中文，缺就 fallback 中文。
   元件用 chOf(id).t / .sub / .key / .terms 取代直接讀 CH[id].t（slug 等語言無關欄位仍讀 CH）。
   讀 i18n.locale 使其在語言切換時反應更新。 */
import { i18n } from '../stores/i18n.svelte.js';
import { CH } from './chapters.js';
import { CH_TR } from './i18n/chapters.js';

export function chOf(id) {
  const base = CH[id];
  if (!base) return base;
  const tr = i18n.locale !== 'zh' && CH_TR[i18n.locale]?.[base.slug];
  return tr ? { ...base, ...tr } : base;
}
