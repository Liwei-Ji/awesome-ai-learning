/* 繁體中文 UI 字串（介面外殼；章節內容仍在 data 層）。 */
export default {
  brand: 'AI 學院',
  langName: '繁中',
  group: {
    prologue: '序章',
    basics: 'AI 基礎',
    learn: 'AI 如何學習',
    llm: '大型語言模型 LLM',
    chatgpt: '從模型到 ChatGPT',
    apps: '生成式 AI 與 AI Agent',
    literacy: 'AI 素養',
  },
  home: {
    title: '從零開始，建立扎實的 AI 基礎',
    lede: '我們把複雜的概念拆成一個個容易理解的知識點，不用死背名詞，也不用面對一整面公式。每一章都搭配<b>互動 Demo</b>，讓你邊操作、邊理解，從「AI 是什麼」一路學到能<b>自己組裝 AI 方案</b>。',
    start: '開始學習 →',
    mapTitle: 'AI 知識地圖',
  },
  stage: { keyPoints: '重點整理', keyTerms: '關鍵名詞', knowledge: '知識庫 · 延伸知識點' },
  tutor: {
    name: 'AI 教授',
    placeholder: '問教授一個問題…',
    send: '送出',
    open: '開啟 AI 教授',
    close: '收合 AI 教授',
    thinking: '思考中',
    opening: '嗨，我是 AI 教授 👋 這一章我們談<b>{topic}</b>。左邊的動畫可以直接動手玩，有問題隨時問我。',
    fallback: '我是這門課的助教，專門回答課綱裡的<b>AI 概念</b>——每章的<b>定義、原理、差別、應用</b>都能問。這一題我不太有把握：換個說法、試試下面的建議問題，或直接問某個關鍵名詞。若超出課程範圍，我可能就答不上來。',
    outScope: '這一題不在本章（{topic}）的範圍——不過 {names} 有講到喔，切過去再問我，我能答得更完整。',
  },
};
