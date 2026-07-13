/* ============================================================
   知識庫索引 —— 自動聚合 knowledge/<slug>.js（中文，每章一檔）。
   多語：knowledge/en/<slug>.js、knowledge/ja/<slug>.js（可選，翻好幾課就放幾課）。
   缺該語言版本時自動 fallback 回中文。
   每個章節檔 export default { qs, kb, notes }。
   ============================================================ */
const GLOBS = {
  zh: import.meta.glob('./*.js', { eager: true }),
  en: import.meta.glob('./en/*.js', { eager: true }),
  ja: import.meta.glob('./ja/*.js', { eager: true }),
};

function build(mods) {
  const m = {};
  for (const path in mods) {
    const slug = path.replace(/^.*\//, '').replace(/\.js$/, ''); // basename → slug
    if (slug === 'index') continue;
    m[slug] = mods[path].default;
  }
  return m;
}
const KB = { zh: build(GLOBS.zh), en: build(GLOBS.en), ja: build(GLOBS.ja) };

const EMPTY = { qs: [], kb: [], notes: [] };

/** 取某章（slug）在指定語言的知識庫；缺該語言就 fallback 中文，再缺回空殼。 */
export function knowledgeFor(slug, locale = 'zh') {
  const m = KB[locale] || KB.zh;
  return { ...EMPTY, ...((m[slug] ?? KB.zh[slug]) ?? {}) };
}
