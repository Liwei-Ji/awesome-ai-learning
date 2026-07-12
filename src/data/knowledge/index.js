/* ============================================================
   知識庫索引 —— 自動聚合 knowledge/*.js（每章一個檔）。
   用 Vite import.meta.glob：以後新增章節「丟一個 <slug>.js 進這個資料夾就生效」，
   不需手動維護清單。每個章節檔 export default { qs, kb, notes }：
     qs    = AI 教授的建議問題
     kb    = [[關鍵字陣列, HTML 答案], ...]（關鍵字比對用）
     notes = 延伸知識點（顯示在課文下方的「知識庫」區）
   ============================================================ */
const mods = import.meta.glob('./*.js', { eager: true });

const KB = {};
for (const path in mods) {
  const slug = path.slice(2, -3); // './deep-learning.js' → 'deep-learning'
  if (slug === 'index') continue;
  KB[slug] = mods[path].default;
}

const EMPTY = { qs: [], kb: [], notes: [] };

/** 取某章（slug）的知識庫；缺少時回空殼，UI 不會出錯。 */
export function knowledgeFor(slug) {
  return { ...EMPTY, ...(KB[slug] ?? {}) };
}
