/* ============================================================
   借鑑 Andrew Ng 教法的兩個「行家層」，放在 Demo 之後、重點之前：
   practical（實務上）：真正在用時的經驗法則。
   decision（怎麼選）：何時用 A、何時用 B 的極簡決策指引。
   依語言分；缺該語言時「不顯示」（不 fallback，避免半成品語言看到中文）。
   目前為 RAG 章的中文樣本，確認風格後再鋪開其他章與 en/ja。
   ============================================================ */
export const PRACTICE = {
  rag: {
    practical: {
      zh: [
        '<b>檢索品質決定一切</b>：RAG 答不好，八成是「沒找到對的段落」，不是模型笨。先把檢索調好，再怪模型。',
        '<b>切塊要適中</b>：一塊太大會塞進無關內容、太小會切斷語意。常見做法是一塊 200 到 500 字，並讓相鄰塊稍微重疊。',
        '<b>強制「依據找到的內容回答並附出處」</b>：找不到就讓它說找不到，這樣才壓得住幻覺。',
        '<b>純向量會漏關鍵字</b>（人名、代號、型號），實務上常用「向量＋關鍵字」混合檢索更穩。',
      ],
    },
    decision: {
      zh: {
        q: '要讓模型「用上」它本來不知道的資料，該用哪個？',
        rows: [
          { when: '要最新／私有／可查證的資料', use: 'RAG', why: '把資料臨時讀進上下文，不動模型，還能附來源' },
          { when: '要固定的語氣、格式或風格', use: '微調', why: '把行為練進模型，但不適合用來灌事實' },
          { when: '只是一次性的小調整', use: 'Prompt', why: '直接在提示裡講清楚，最快也最省' },
        ],
      },
    },
  },
};

/** 實務上要點陣列；缺該語言回 null（不 fallback）。 */
export function practicalFor(slug, locale = 'zh') {
  return PRACTICE[slug]?.practical?.[locale] ?? null;
}
/** 決策指引物件 { q, rows:[{when,use,why}] }；缺該語言回 null（不 fallback）。 */
export function decisionFor(slug, locale = 'zh') {
  return PRACTICE[slug]?.decision?.[locale] ?? null;
}
