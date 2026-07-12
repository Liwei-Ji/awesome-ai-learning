/* ============================================================
   離線 AI 教授檢索引擎（無 LLM）— Phase 1
   意圖辨識 + 詞彙加權比對 + 範圍門檻 + 跨章導引。

   設計原則：只有當提問確實觸及「本章涵蓋的主題詞」時才作答；
   否則誠實說不知道，並在其他章有涵蓋時導引過去。
   這樣可根治「弱匹配到通用詞就給出理直氣壯的錯答」。
   ============================================================ */

// 意圖線索詞（用來分類提問類型；本身不是主題詞）
const INTENT_CUES = {
  define:  ['是什麼', '什麼是', '什麼叫', '何謂', '定義', '意思', '解釋', '介紹', '是啥', '是甚麼'],
  compare: ['差別', '差在', '不同', '比較', '區別', '差異', 'vs', '哪個', '哪裡不一樣'],
  why:     ['為什麼', '為何', '原因', '目的', '為甚麼', '幹嘛'],
  how:     ['怎麼', '如何', '怎樣', '步驟', '流程', '方法', '怎么'],
  example: ['例子', '舉例', '應用', '用在', '用途', '場景', '實例'],
};
const ALL_CUES = new Set(Object.values(INTENT_CUES).flat());

const norm = (s) => (s || '').toLowerCase().replace(/\s+/g, '');

/** 辨識提問意圖（define/compare/why/how/example）；無法判斷回 null。 */
export function detectIntent(query) {
  const q = norm(query);
  let best = null, bestN = 0;
  for (const [intent, cues] of Object.entries(INTENT_CUES)) {
    const n = cues.reduce((a, c) => a + (q.includes(norm(c)) ? 1 : 0), 0);
    if (n > bestN) { bestN = n; best = intent; }
  }
  return best;
}

/** 建立單章索引：主題詞彙（供範圍門檻）+ 原始 kb（供計分）。 */
export function makeChapterIndex({ kb = [], title = '', terms = [] } = {}) {
  const vocab = new Set();
  const add = (w) => { const x = norm(w); if (x.length >= 2 && !ALL_CUES.has(x)) vocab.add(x); };
  for (const [keys] of kb) for (const k of keys) add(k);        // kb 關鍵字（已含大量同義詞）
  for (const [t] of terms) add(t);                              // 關鍵名詞
  (title.match(/[A-Za-z0-9]{2,}/g) || []).forEach((w) => vocab.add(norm(w))); // 標題英數詞（AI/GPT…）
  return { kb, vocab };
}

// 條目計分：主題詞重（越長越具體）、意圖線索輕。
function scoreEntry(qn, keys) {
  let score = 0;
  for (const k of keys) {
    const kk = norm(k);
    if (!kk || !qn.includes(kk)) continue;
    if (ALL_CUES.has(kk)) score += 0.3;
    else score += 1 + Math.min(1, Math.max(0, kk.length - 2) * 0.15);
  }
  return score;
}

/**
 * 在本章檢索答案。
 * @returns {{answer:string|null, confident:boolean, intent:string|null, score:number, inScope:boolean}}
 */
export function searchChapter(query, index) {
  const qn = norm(query);
  const intent = detectIntent(query);

  // 範圍門檻：提問必須觸及本章主題詞彙，否則視為出範圍
  let inScope = false;
  for (const v of index.vocab) { if (qn.includes(v)) { inScope = true; break; } }

  // 逐條目計分，取最高
  let best = null, bestScore = 0;
  for (const [keys, ans] of index.kb) {
    const score = scoreEntry(qn, keys);
    if (score > bestScore) { bestScore = score; best = ans; }
  }

  const confident = inScope && !!best;
  return { answer: confident ? best : null, confident, intent, score: bestScore, inScope };
}

/**
 * 跨章導引：找出哪些「其他章」的主題詞彙有涵蓋此提問。
 * @param chapters [{slug, title, index}]
 * @returns [{slug, title}]（至多 3 章）
 */
export function suggestChapters(query, chapters, currentSlug) {
  const qn = norm(query);
  const hits = [];
  for (const ch of chapters) {
    if (ch.slug === currentSlug) continue;
    for (const v of ch.index.vocab) {
      if (qn.includes(v)) { hits.push({ slug: ch.slug, title: ch.title }); break; }
    }
  }
  return hits.slice(0, 3);
}
