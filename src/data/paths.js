/* ============================================================
   學習路線（Paths）：一層「策展」，把現有的課程章節與挑戰卡，
   依「目標」串成有順序的路線。不新增內容，只做導引與分流。
   - group 'journey' 完整路線（由淺到深的整段旅程）
   - group 'track'   主題深潛（單一主題的專門路線）
   step.k：'course' → ref 是章節 slug；'iv' → ref 是挑戰題 id。
   step 的顯示文字直接取自現有 data 層（chOf / ivLabel），這裡只放 ref。
   路線標題／副標／對象／階段名為三語；缺該語言回退 zh。
   ============================================================ */

export const PATHS = [
  // ---------- 完整路線 ----------
  {
    id: 'understand',
    icon: 'Compass',
    group: 'journey',
    time: { zh: '約 2 小時', en: '~2 hrs', ja: '約2時間' },
    t: {
      zh: { title: '搞懂 AI', tagline: '看懂新聞在講什麼，會用工具，不被唬。', who: '想快速建立正確概念，不碰工程細節。' },
      en: { title: 'Understand AI', tagline: 'Follow the headlines, use the tools, and not get fooled.', who: 'Build correct intuition fast, skip the engineering internals.' },
      ja: { title: 'AI をざっくり掴む', tagline: 'ニュースがわかり、ツールを使え、惑わされない。', who: '正しい概念を素早く。エンジニアリングの内部は省略。' },
    },
    phases: [
      { t: { zh: '認識 AI', en: 'What AI is', ja: 'AI とは' },
        steps: [{ k: 'course', ref: 'history' }, { k: 'course', ref: 'ai-intro' }, { k: 'course', ref: 'ml' }, { k: 'course', ref: 'data' }] },
      { t: { zh: 'LLM 在做什麼', en: 'What an LLM does', ja: 'LLM は何をするか' },
        steps: [{ k: 'course', ref: 'llm' }, { k: 'course', ref: 'prompt' }, { k: 'course', ref: 'generative' }, { k: 'course', ref: 'multimodal' }] },
      { t: { zh: '界線與應用', en: 'Limits and uses', ja: '限界と使い道' },
        steps: [{ k: 'course', ref: 'limits' }, { k: 'iv', ref: 'hallucination' }, { k: 'iv', ref: 'ai-limits' }, { k: 'iv', ref: 'can-llm-reason' }, { k: 'course', ref: 'evaluation' }, { k: 'course', ref: 'capstone' }] },
    ],
  },
  {
    id: 'builder',
    icon: 'Wrench',
    group: 'journey',
    time: { zh: '約 5 小時', en: '~5 hrs', ja: '約5時間' },
    t: {
      zh: { title: '用 AI 做產品', tagline: '不深挖理論，專心把 AI 應用做出來、上得了線。', who: '應用開發者、PM，想把 AI 接進產品。' },
      en: { title: 'Build with AI', tagline: 'Skip the deep theory, focus on shipping a real AI feature.', who: 'App developers and PMs wiring AI into a product.' },
      ja: { title: 'AI でプロダクトを作る', tagline: '深い理論は飛ばし、動くAI機能を出すことに集中。', who: 'AI をプロダクトに組み込む開発者・PM。' },
    },
    phases: [
      { t: { zh: '夠用的底', en: 'Enough foundation', ja: '必要な土台' },
        steps: [{ k: 'course', ref: 'ai-intro' }, { k: 'course', ref: 'llm' }, { k: 'course', ref: 'context-window' }, { k: 'iv', ref: 'what-model-stores' }] },
      { t: { zh: '會用模型', en: 'Drive the model', ja: 'モデルを使いこなす' },
        steps: [{ k: 'course', ref: 'prompt' }, { k: 'iv', ref: 'prompt-craft' }, { k: 'iv', ref: 'few-shot' }, { k: 'iv', ref: 'prompt-eval' }, { k: 'course', ref: 'generative' }, { k: 'course', ref: 'multimodal' }] },
      { t: { zh: '接資料與工具', en: 'Add data and tools', ja: 'データとツールを繋ぐ' },
        steps: [{ k: 'course', ref: 'rag' }, { k: 'iv', ref: 'rag-documents' }, { k: 'iv', ref: 'chunking' }, { k: 'course', ref: 'memory' }, { k: 'course', ref: 'mcp' }, { k: 'course', ref: 'integration' }] },
      { t: { zh: '做成產品', en: 'Ship it', ja: 'プロダクトにする' },
        steps: [{ k: 'course', ref: 'agent' }, { k: 'iv', ref: 'agent-vs-workflow' }, { k: 'iv', ref: 'design-doc-qa' }, { k: 'iv', ref: 'design-support-bot' }, { k: 'iv', ref: 'design-cost' }, { k: 'iv', ref: 'guardrails' }, { k: 'iv', ref: 'data-leakage' }, { k: 'iv', ref: 'design-eval-improve' }] },
    ],
  },
  {
    id: 'engineer',
    icon: 'Cpu',
    group: 'journey',
    time: { zh: '約 12 小時', en: '~12 hrs', ja: '約12時間' },
    t: {
      zh: { title: '成為 AI 工程師', tagline: '懂原理、蓋得出來、還能判斷好壞，三件事都練。', who: '要做出來、要為結果負責的人。' },
      en: { title: 'Become an AI Engineer', tagline: 'Understand it, build it, and judge it well, all three.', who: 'Those who build it and own the outcome.' },
      ja: { title: 'AI エンジニアになる', tagline: '原理を理解し、作れて、良し悪しも判断する、その三つを鍛える。', who: '実際に作り、結果に責任を持つ人。' },
    },
    phases: [
      { t: { zh: '打底', en: 'Foundations', ja: '土台' },
        steps: [{ k: 'course', ref: 'ai-intro' }, { k: 'course', ref: 'ml' }, { k: 'course', ref: 'data' }, { k: 'course', ref: 'deep-learning' }, { k: 'course', ref: 'neural-network' }, { k: 'iv', ref: 'tokenizer-why' }, { k: 'iv', ref: 'embedding-meaning' }] },
      { t: { zh: '深入 LLM', en: 'Inside the LLM', ja: 'LLM の内部' },
        steps: [{ k: 'course', ref: 'tokenizer' }, { k: 'course', ref: 'embedding' }, { k: 'course', ref: 'transformer' }, { k: 'course', ref: 'llm' }, { k: 'course', ref: 'model-size' }, { k: 'course', ref: 'context-window' }, { k: 'course', ref: 'inference' }, { k: 'iv', ref: 'attention-compute' }, { k: 'iv', ref: 'multi-head' }, { k: 'iv', ref: 'positional-encoding' }, { k: 'iv', ref: 'what-model-stores' }] },
      { t: { zh: '訓練與調校', en: 'Training and tuning', ja: '学習と調整' },
        steps: [{ k: 'course', ref: 'training' }, { k: 'course', ref: 'backprop' }, { k: 'course', ref: 'pretraining' }, { k: 'course', ref: 'fine-tuning' }, { k: 'iv', ref: 'rlhf-why' }, { k: 'iv', ref: 'finetune-vs-rag' }, { k: 'iv', ref: 'lora' }, { k: 'iv', ref: 'catastrophic-forgetting' }, { k: 'iv', ref: 'scaling-law' }] },
      { t: { zh: '應用鏈', en: 'The application chain', ja: '応用チェーン' },
        steps: [{ k: 'course', ref: 'prompt' }, { k: 'course', ref: 'rag' }, { k: 'course', ref: 'memory' }, { k: 'course', ref: 'mcp' }, { k: 'course', ref: 'agent' }, { k: 'course', ref: 'integration' }, { k: 'iv', ref: 'prompt-craft' }, { k: 'iv', ref: 'rag-documents' }, { k: 'iv', ref: 'rag-why-wrong' }, { k: 'iv', ref: 'agent-vs-workflow' }, { k: 'iv', ref: 'agent-planning' }, { k: 'iv', ref: 'json-output' }] },
      { t: { zh: '會判斷', en: 'Judgment', ja: '判断力' },
        steps: [{ k: 'course', ref: 'limits' }, { k: 'course', ref: 'evaluation' }, { k: 'iv', ref: 'can-llm-reason' }, { k: 'iv', ref: 'design-doc-qa' }, { k: 'iv', ref: 'design-support-bot' }, { k: 'iv', ref: 'design-eval-improve' }, { k: 'iv', ref: 'monitoring' }] },
    ],
  },

  // ---------- 主題深潛 ----------
  {
    id: 'prompt',
    icon: 'PenLine',
    group: 'track',
    time: { zh: '約 2 小時', en: '~2 hrs', ja: '約2時間' },
    t: {
      zh: { title: '精通 Prompt', tagline: '從寫法、少樣本到 CoT 與評估，把 prompt 用到極致。', who: '想把手上模型榨出更好結果的人。' },
      en: { title: 'Master Prompting', tagline: 'From craft and few-shot to CoT and evaluation.', who: 'Squeeze the best out of the model you already have.' },
      ja: { title: 'Prompt を極める', tagline: '書き方・few-shot から CoT・評価まで。', who: '手元のモデルから最良の結果を引き出したい人。' },
    },
    phases: [
      { t: { zh: '基礎', en: 'Basics', ja: '基礎' },
        steps: [{ k: 'course', ref: 'prompt' }, { k: 'iv', ref: 'prompt-craft' }, { k: 'iv', ref: 'few-shot' }] },
      { t: { zh: '進階', en: 'Advanced', ja: '応用' },
        steps: [{ k: 'iv', ref: 'cot-prompting' }, { k: 'iv', ref: 'reasoning-models' }, { k: 'iv', ref: 'test-time-compute' }, { k: 'iv', ref: 'cot-limits' }] },
      { t: { zh: '選擇與評估', en: 'Choose and evaluate', ja: '選択と評価' },
        steps: [{ k: 'iv', ref: 'prompt-vs-tune-vs-rag' }, { k: 'iv', ref: 'prompt-eval' }] },
    ],
  },
  {
    id: 'rag',
    icon: 'Library',
    group: 'track',
    time: { zh: '約 2 小時', en: '~2 hrs', ja: '約2時間' },
    t: {
      zh: { title: '打造知識庫（RAG）', tagline: '讓 AI 查你的資料：切塊、檢索、為何還錯、怎麼取捨。', who: '要做文件問答／企業知識庫的人。' },
      en: { title: 'Build a RAG System', tagline: 'Let AI look things up: chunking, retrieval, why it still errs.', who: 'Building doc Q&A or an enterprise knowledge base.' },
      ja: { title: 'RAG で知識ベースを作る', tagline: 'AI に資料を引かせる：分割・検索・なぜ間違うか。', who: 'ドキュメントQ&Aや社内ナレッジを作る人。' },
    },
    phases: [
      { t: { zh: '觀念', en: 'Concept', ja: '概念' },
        steps: [{ k: 'course', ref: 'rag' }, { k: 'iv', ref: 'finetune-vs-rag' }, { k: 'iv', ref: 'rag-documents' }] },
      { t: { zh: '切與取', en: 'Chunk and retrieve', ja: '分割と検索' },
        steps: [{ k: 'iv', ref: 'chunking' }, { k: 'iv', ref: 'rag-retrieval' }] },
      { t: { zh: '為何還錯 · 取捨', en: 'Why it errs, trade-offs', ja: 'なぜ間違うか・トレードオフ' },
        steps: [{ k: 'iv', ref: 'rag-why-wrong' }, { k: 'iv', ref: 'rag-vs-longcontext' }, { k: 'iv', ref: 'data-leakage' }] },
      { t: { zh: '落地', en: 'Ship it', ja: '実装' },
        steps: [{ k: 'course', ref: 'memory' }, { k: 'iv', ref: 'design-doc-qa' }] },
    ],
  },
  {
    id: 'agent',
    icon: 'Bot',
    group: 'track',
    time: { zh: '約 3 小時', en: '~3 hrs', ja: '約3時間' },
    t: {
      zh: { title: '打造 AI Agent', tagline: '從 workflow vs agent、工具、記憶到量化與成本。', who: '要做會自己動手的 AI 系統的人。' },
      en: { title: 'Build AI Agents', tagline: 'From workflow vs agent to tools, memory, metrics and cost.', who: 'Building AI that takes actions on its own.' },
      ja: { title: 'AI エージェントを作る', tagline: 'workflow と agent の違いからツール・記憶・評価・コストまで。', who: '自律的に動く AI システムを作る人。' },
    },
    phases: [
      { t: { zh: '觀念', en: 'Concept', ja: '概念' },
        steps: [{ k: 'course', ref: 'agent' }, { k: 'iv', ref: 'agent-vs-workflow' }, { k: 'iv', ref: 'agent-planning' }] },
      { t: { zh: '工具與輸出', en: 'Tools and output', ja: 'ツールと出力' },
        steps: [{ k: 'course', ref: 'mcp' }, { k: 'iv', ref: 'agent-tools' }, { k: 'iv', ref: 'json-output' }] },
      { t: { zh: '記憶與整合', en: 'Memory and integration', ja: '記憶と統合' },
        steps: [{ k: 'course', ref: 'integration' }, { k: 'iv', ref: 'agent-memory' }, { k: 'iv', ref: 'realtime-assistant' }] },
      { t: { zh: '量化與成本', en: 'Metrics and cost', ja: '評価とコスト' },
        steps: [{ k: 'iv', ref: 'agent-eval' }, { k: 'iv', ref: 'agent-cost' }] },
    ],
  },
  {
    id: 'safety',
    icon: 'ShieldCheck',
    group: 'track',
    time: { zh: '約 3 小時', en: '~3 hrs', ja: '約3時間' },
    t: {
      zh: { title: 'AI 風險與安全', tagline: '幻覺、偏見、注入、越獄、護欄、資料外洩，一次看懂。', who: '在意可靠性、合規與上線風險的人。' },
      en: { title: 'AI Risk & Safety', tagline: 'Hallucination, bias, injection, jailbreak, guardrails, leakage.', who: 'Those who care about reliability, compliance and launch risk.' },
      ja: { title: 'AI のリスクと安全', tagline: '幻覚・バイアス・注入・脱獄・ガードレール・情報漏洩。', who: '信頼性・コンプラ・公開リスクを気にする人。' },
    },
    phases: [
      { t: { zh: '可靠性', en: 'Reliability', ja: '信頼性' },
        steps: [{ k: 'course', ref: 'limits' }, { k: 'iv', ref: 'hallucination' }, { k: 'iv', ref: 'bias' }, { k: 'iv', ref: 'trust-answer' }] },
      { t: { zh: '攻擊面', en: 'Attack surface', ja: '攻撃面' },
        steps: [{ k: 'iv', ref: 'prompt-injection' }, { k: 'iv', ref: 'jailbreak' }] },
      { t: { zh: '防護', en: 'Defenses', ja: '防御' },
        steps: [{ k: 'iv', ref: 'guardrails' }, { k: 'iv', ref: 'data-leakage' }] },
      { t: { zh: '界線', en: 'Boundaries', ja: '境界' },
        steps: [{ k: 'course', ref: 'evaluation' }, { k: 'iv', ref: 'ai-limits' }, { k: 'iv', ref: 'can-llm-reason' }] },
    ],
  },
];

/** 依 id 取路線 */
export function pathById(id) {
  return PATHS.find((p) => p.id === id) || null;
}

/** 攤平所有步驟（算總數用） */
export function pathSteps(p) {
  return p ? p.phases.flatMap((ph) => ph.steps) : [];
}

/** 取路線在地化文字（缺該語言回退 zh） */
export function pathText(p, locale = 'zh') {
  return (p && (p.t[locale] || p.t.zh)) || { title: '', tagline: '', who: '' };
}

/** 取在地化短字串（tag / phase 標題），缺則回退 zh */
export function locText(obj, locale = 'zh') {
  return (obj && (obj[locale] ?? obj.zh)) || '';
}
