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
    next: 'builder',
    icon: 'Compass',
    group: 'journey',
    time: { zh: '約 2.5 小時', en: '~2.5 hrs', ja: '約2.5時間' },
    t: {
      zh: { title: '搞懂 AI', tagline: '不用寫程式，理解 AI 如何運作，學會善用工具，不再被行銷話術唬住。', who: '完全新手：不寫程式、不碰數學，從這裡開始。' },
      en: { title: 'Understand AI', tagline: 'No coding needed. Understand how AI works, learn to use the tools well, and stop being fooled by marketing hype.', who: 'Complete beginners: no code and no math, start here.' },
      ja: { title: 'AI をざっくり掴む', tagline: 'コード不要。AI の仕組みを理解し、ツールを使いこなし、マーケティングの誇張に惑わされない。', who: '完全な初心者：コードも数式もなし、ここから。' },
    },
    phases: [
      { t: { zh: '認識 AI', en: 'What AI is', ja: 'AI とは' },
        steps: [{ k: 'course', ref: 'history' }, { k: 'course', ref: 'ai-intro' }, { k: 'course', ref: 'ml' }, { k: 'course', ref: 'data' }] },
      { t: { zh: 'LLM 在做什麼', en: 'What an LLM does', ja: 'LLM は何をするか' },
        steps: [{ k: 'course', ref: 'llm' }, { k: 'course', ref: 'prompt' }, { k: 'course', ref: 'generative' }, { k: 'course', ref: 'multimodal' }] },
      { t: { zh: '會查資料、會做事', en: 'Look things up, take action', ja: '調べる・動く' },
        steps: [{ k: 'course', ref: 'rag' }, { k: 'course', ref: 'agent' }] },
      { t: { zh: '界線與應用', en: 'Limits and uses', ja: '限界と使い道' },
        steps: [{ k: 'course', ref: 'limits' }, { k: 'iv', ref: 'hallucination' }, { k: 'iv', ref: 'ai-limits' }, { k: 'iv', ref: 'can-llm-reason' }, { k: 'course', ref: 'evaluation' }, { k: 'course', ref: 'capstone' }] },
    ],
  },
  {
    id: 'builder',
    next: 'evaluate',
    icon: 'Wrench',
    group: 'journey',
    time: { zh: '約 4 小時', en: '~4 hrs', ja: '約4時間' },
    t: {
      zh: { title: '用 AI 做產品', tagline: '不深挖理論，專心把 AI 應用做出來、上得了線。', who: '應用開發者與親自動手的 PM：要把 AI 接進產品。' },
      en: { title: 'Build with AI', tagline: 'Skip the deep theory, focus on shipping a real AI feature.', who: 'App developers and hands-on PMs who will wire AI into a product themselves.' },
      ja: { title: 'AI でプロダクトを作る', tagline: '深い理論は飛ばし、動くAI機能を出すことに集中。', who: '自分で手を動かす開発者・PM：AI をプロダクトに組み込む人。' },
    },
    phases: [
      { t: { zh: '夠用的底', en: 'Enough foundation', ja: '必要な土台' },
        steps: [{ k: 'course', ref: 'ai-intro' }, { k: 'course', ref: 'llm' }, { k: 'course', ref: 'context-window' }, { k: 'iv', ref: 'what-model-stores' }] },
      { t: { zh: '會用模型', en: 'Drive the model', ja: 'モデルを使いこなす' },
        steps: [{ k: 'course', ref: 'prompt' }, { k: 'iv', ref: 'prompt-craft' }, { k: 'iv', ref: 'few-shot' }, { k: 'iv', ref: 'prompt-eval' }, { k: 'course', ref: 'generative' }, { k: 'course', ref: 'multimodal' }] },
      { t: { zh: '接資料與工具', en: 'Add data and tools', ja: 'データとツールを繋ぐ' },
        steps: [{ k: 'course', ref: 'rag' }, { k: 'iv', ref: 'rag-documents' }, { k: 'iv', ref: 'chunking' }, { k: 'course', ref: 'memory' }, { k: 'course', ref: 'mcp' }] },
      { t: { zh: '做成產品', en: 'Ship it', ja: 'プロダクトにする' },
        steps: [{ k: 'course', ref: 'agent' }, { k: 'iv', ref: 'agent-vs-workflow' }, { k: 'course', ref: 'integration' }, { k: 'iv', ref: 'design-doc-qa' }, { k: 'iv', ref: 'design-support-bot' }, { k: 'iv', ref: 'design-cost' }] },
      { t: { zh: '上線與品質', en: 'Launch and quality', ja: '公開と品質' },
        steps: [{ k: 'iv', ref: 'guardrails' }, { k: 'iv', ref: 'data-leakage' }, { k: 'iv', ref: 'hallucination' }, { k: 'course', ref: 'evaluation' }, { k: 'iv', ref: 'monitoring' }, { k: 'iv', ref: 'design-eval-improve' }] },
    ],
  },
  {
    id: 'engineer',
    next: 'safety',
    icon: 'Cpu',
    group: 'journey',
    time: { zh: '約 8.5 小時', en: '~8.5 hrs', ja: '約8.5時間' },
    t: {
      zh: { title: '成為 AI 工程師', tagline: '懂原理、蓋得出來、還能判斷好壞，三件事都練。', who: '想連底層也搞懂的工程師：原理、訓練、上線判斷，不只是接線。' },
      en: { title: 'Become an AI Engineer', tagline: 'Understand it, build it, and judge it well, all three.', who: 'Engineers who want the internals too: theory, training, and production judgment, not just wiring.' },
      ja: { title: 'AI エンジニアになる', tagline: '原理を理解し、作れて、良し悪しも判断する、その三つを鍛える。', who: '内部まで理解したいエンジニア：配線だけでなく原理・学習・本番の判断まで。' },
    },
    phases: [
      { t: { zh: '打底', en: 'Foundations', ja: '土台' },
        steps: [{ k: 'course', ref: 'ai-intro' }, { k: 'course', ref: 'ml' }, { k: 'course', ref: 'data' }, { k: 'course', ref: 'deep-learning' }, { k: 'course', ref: 'neural-network' }, { k: 'course', ref: 'cnn' }] },
      { t: { zh: '文字到注意力', en: 'From text to attention', ja: 'テキストから注意へ' },
        steps: [{ k: 'course', ref: 'tokenizer' }, { k: 'iv', ref: 'tokenizer-why' }, { k: 'course', ref: 'embedding' }, { k: 'iv', ref: 'embedding-meaning' }, { k: 'course', ref: 'rnn' }, { k: 'course', ref: 'transformer' }, { k: 'iv', ref: 'attention-compute' }, { k: 'iv', ref: 'multi-head' }] },
      { t: { zh: '大模型與推論', en: 'The model and inference', ja: 'モデルと推論' },
        steps: [{ k: 'iv', ref: 'positional-encoding' }, { k: 'course', ref: 'llm' }, { k: 'course', ref: 'model-size' }, { k: 'course', ref: 'model-knowledge' }, { k: 'iv', ref: 'what-model-stores' }, { k: 'course', ref: 'context-window' }, { k: 'course', ref: 'inference' }, { k: 'iv', ref: 'emergence' }] },
      { t: { zh: '訓練與預訓練', en: 'Training and pretraining', ja: '学習と事前学習' },
        steps: [{ k: 'course', ref: 'training' }, { k: 'course', ref: 'backprop' }, { k: 'course', ref: 'pretraining' }, { k: 'iv', ref: 'rlhf-why' }, { k: 'iv', ref: 'dpo-pipeline' }, { k: 'iv', ref: 'scaling-law' }] },
      { t: { zh: '微調與推理模型', en: 'Tuning and reasoning models', ja: '調整と推論モデル' },
        steps: [{ k: 'course', ref: 'fine-tuning' }, { k: 'course', ref: 'reasoning' }, { k: 'iv', ref: 'finetune-vs-rag' }, { k: 'iv', ref: 'lora' }, { k: 'iv', ref: 'catastrophic-forgetting' }] },
      { t: { zh: '應用鏈', en: 'The application chain', ja: '応用チェーン' },
        steps: [{ k: 'course', ref: 'prompt' }, { k: 'iv', ref: 'prompt-craft' }, { k: 'course', ref: 'rag' }, { k: 'iv', ref: 'rag-documents' }, { k: 'iv', ref: 'rag-why-wrong' }, { k: 'course', ref: 'memory' }, { k: 'course', ref: 'mcp' }, { k: 'course', ref: 'agent' }] },
      { t: { zh: '組裝與判斷', en: 'Assemble and judge', ja: '組み立てと判断' },
        steps: [{ k: 'course', ref: 'integration' }, { k: 'iv', ref: 'agent-vs-workflow' }, { k: 'iv', ref: 'agent-planning' }, { k: 'iv', ref: 'json-output' }, { k: 'course', ref: 'limits' }, { k: 'course', ref: 'evaluation' }, { k: 'iv', ref: 'can-llm-reason' }] },
      { t: { zh: '上線判斷', en: 'Production judgment', ja: '本番の判断' },
        steps: [{ k: 'iv', ref: 'design-doc-qa' }, { k: 'iv', ref: 'design-support-bot' }, { k: 'iv', ref: 'design-cost' }, { k: 'iv', ref: 'guardrails' }, { k: 'iv', ref: 'data-leakage' }, { k: 'iv', ref: 'design-eval-improve' }, { k: 'iv', ref: 'monitoring' }] },
    ],
  },

  {
    id: 'leader',
    next: 'evaluate',
    icon: 'Compass',
    group: 'journey',
    time: { zh: '約 3 小時', en: '~3 hrs', ja: '約3時間' },
    t: {
      zh: { title: '決策者的 AI', tagline: '不寫程式，但要能做技術選型、評估、抓風險與成本。', who: '主管與決策者：評估、採購、治理 AI，不用寫程式。' },
      en: { title: 'AI for Leaders', tagline: 'No coding, but able to choose the tech, evaluate it, and weigh risk and cost.', who: 'Managers and decision-makers who evaluate, buy, and govern AI without touching code.' },
      ja: { title: '意思決定者のための AI', tagline: 'コードは書かないが、技術選定・評価・リスクとコストの判断ができる。', who: '管理職・意思決定者：コードを書かずに AI を評価・導入・統治する人。' },
    },
    phases: [
      { t: { zh: '看懂在買什麼', en: 'Know what you are buying', ja: '何を導入するか理解する' },
        steps: [{ k: 'course', ref: 'ai-intro' }, { k: 'course', ref: 'llm' }, { k: 'course', ref: 'prompt' }, { k: 'course', ref: 'generative' }, { k: 'iv', ref: 'what-model-stores' }] },
      { t: { zh: '界線與風險', en: 'Limits and risk', ja: '限界とリスク' },
        steps: [{ k: 'course', ref: 'limits' }, { k: 'iv', ref: 'hallucination' }, { k: 'iv', ref: 'ai-limits' }, { k: 'iv', ref: 'can-llm-reason' }, { k: 'iv', ref: 'bias' }] },
      { t: { zh: '選型與成本', en: 'Build vs buy, and cost', ja: '選定とコスト' },
        steps: [{ k: 'course', ref: 'rag' }, { k: 'iv', ref: 'finetune-vs-rag' }, { k: 'iv', ref: 'prompt-vs-tune-vs-rag' }, { k: 'iv', ref: 'agent-vs-workflow' }, { k: 'iv', ref: 'design-build-vs-buy' }] },
      { t: { zh: '成本與上線', en: 'Cost and launch', ja: 'コストと公開' },
        steps: [{ k: 'iv', ref: 'design-cost' }, { k: 'iv', ref: 'guardrails' }, { k: 'iv', ref: 'data-leakage' }, { k: 'course', ref: 'evaluation' }, { k: 'iv', ref: 'design-eval-improve' }, { k: 'iv', ref: 'monitoring' }] },
    ],
  },

  // ---------- 主題深潛 ----------
  {
    id: 'foundations',
    deepens: 'engineer',
    icon: 'Layers',
    group: 'track',
    time: { zh: '約 1.5 小時', en: '~1.5 hrs', ja: '約1.5時間' },
    t: {
      zh: { title: '打好 AI 底子', tagline: '從神經網路到訓練與 CNN，看懂模型是怎麼學出來的。', who: '想弄懂「模型到底怎麼訓練」的人。' },
      en: { title: 'AI Foundations', tagline: 'From neural networks to training and CNNs, see how a model actually learns.', who: 'Anyone who wants to understand how models are trained.' },
      ja: { title: 'AI の土台', tagline: 'ニューラルネットから学習と CNN まで、モデルがどう学ぶかを理解する。', who: 'モデルがどう学習するのかを理解したい人。' },
    },
    phases: [
      { t: { zh: '從資料到模型', en: 'From data to a model', ja: 'データからモデルへ' },
        steps: [{ k: 'course', ref: 'ml' }, { k: 'course', ref: 'data' }, { k: 'iv', ref: 'data-quality' }] },
      { t: { zh: '神經網路', en: 'Neural networks', ja: 'ニューラルネット' },
        steps: [{ k: 'course', ref: 'deep-learning' }, { k: 'course', ref: 'neural-network' }] },
      { t: { zh: '模型怎麼學', en: 'How a model learns', ja: 'モデルの学び方' },
        steps: [{ k: 'course', ref: 'training' }, { k: 'course', ref: 'backprop' }] },
      { t: { zh: '影像與規模', en: 'Vision and scale', ja: '画像とスケール' },
        steps: [{ k: 'course', ref: 'cnn' }, { k: 'iv', ref: 'scaling-law' }] },
    ],
  },
  {
    id: 'prompt',
    deepens: 'builder',
    icon: 'PenLine',
    group: 'track',
    time: { zh: '約 1.5 小時', en: '~1.5 hrs', ja: '約1.5時間' },
    t: {
      zh: { title: '精通 Prompt', tagline: '從寫法、少樣本到 CoT 與評估，把 prompt 用到極致。', who: '想把手上模型榨出更好結果的人。' },
      en: { title: 'Master Prompting', tagline: 'From craft and few-shot to CoT and evaluation.', who: 'Squeeze the best out of the model you already have.' },
      ja: { title: 'Prompt を極める', tagline: '書き方・few-shot から CoT・評価まで。', who: '手元のモデルから最良の結果を引き出したい人。' },
    },
    phases: [
      { t: { zh: '基礎', en: 'Basics', ja: '基礎' },
        steps: [{ k: 'course', ref: 'prompt' }, { k: 'iv', ref: 'prompt-craft' }, { k: 'iv', ref: 'few-shot' }, { k: 'iv', ref: 'temperature' }] },
      { t: { zh: '進階', en: 'Advanced', ja: '応用' },
        steps: [{ k: 'course', ref: 'reasoning' }, { k: 'iv', ref: 'cot-prompting' }, { k: 'iv', ref: 'reasoning-models' }, { k: 'iv', ref: 'test-time-compute' }, { k: 'iv', ref: 'cot-limits' }] },
      { t: { zh: '選擇與評估', en: 'Choose and evaluate', ja: '選択と評価' },
        steps: [{ k: 'iv', ref: 'prompt-vs-tune-vs-rag' }, { k: 'iv', ref: 'prompt-eval' }] },
    ],
  },
  {
    id: 'rag',
    deepens: 'builder',
    icon: 'Library',
    group: 'track',
    time: { zh: '約 1.5 小時', en: '~1.5 hrs', ja: '約1.5時間' },
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
    deepens: 'builder',
    icon: 'Bot',
    group: 'track',
    time: { zh: '約 1.5 小時', en: '~1.5 hrs', ja: '約1.5時間' },
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
    deepens: 'leader',
    icon: 'ShieldCheck',
    group: 'track',
    time: { zh: '約 2 小時', en: '~2 hrs', ja: '約2時間' },
    t: {
      zh: { title: 'AI 風險與安全', tagline: '幻覺、偏見、注入、越獄、護欄、資料外洩，一次看懂。', who: '在意可靠性、合規與上線風險的人。' },
      en: { title: 'AI Risk & Safety', tagline: 'Hallucination, bias, injection, jailbreak, guardrails, leakage.', who: 'Those who care about reliability, compliance and launch risk.' },
      ja: { title: 'AI のリスクと安全', tagline: '幻覚・バイアス・注入・脱獄・ガードレール・情報漏洩。', who: '信頼性・コンプラ・公開リスクを気にする人。' },
    },
    phases: [
      { t: { zh: '可靠性', en: 'Reliability', ja: '信頼性' },
        steps: [{ k: 'course', ref: 'limits' }, { k: 'iv', ref: 'hallucination' }, { k: 'iv', ref: 'bias' }, { k: 'iv', ref: 'trust-answer' }] },
      { t: { zh: '攻擊面', en: 'Attack surface', ja: '攻撃面' },
        steps: [{ k: 'course', ref: 'prompt' }, { k: 'iv', ref: 'prompt-injection' }, { k: 'iv', ref: 'jailbreak' }] },
      { t: { zh: '防護', en: 'Defenses', ja: '防御' },
        steps: [{ k: 'iv', ref: 'guardrails' }, { k: 'iv', ref: 'data-leakage' }] },
      { t: { zh: '界線與評估', en: 'Boundaries and evaluation', ja: '境界と評価' },
        steps: [{ k: 'iv', ref: 'ai-limits' }, { k: 'iv', ref: 'can-llm-reason' }, { k: 'course', ref: 'evaluation' }] },
    ],
  },
  {
    id: 'llm-internals',
    deepens: 'engineer',
    icon: 'Cpu',
    group: 'track',
    time: { zh: '約 3 小時', en: '~3 hrs', ja: '約3時間' },
    t: {
      zh: { title: '看懂 LLM 內部', tagline: '從 tokenizer 到注意力，看懂大模型到底怎麼運作。', who: '想真的理解 LLM 機制的人。' },
      en: { title: 'Inside the LLM', tagline: 'From the tokenizer to attention, see how a large model actually works.', who: 'Anyone who wants to truly understand how LLMs work.' },
      ja: { title: 'LLM の内部を理解する', tagline: 'tokenizer から注意機構まで、大規模モデルの仕組みを理解する。', who: 'LLM の仕組みを本当に理解したい人。' },
    },
    phases: [
      { t: { zh: '從文字到向量', en: 'From text to vectors', ja: 'テキストからベクトルへ' },
        steps: [{ k: 'course', ref: 'tokenizer' }, { k: 'iv', ref: 'tokenizer-why' }, { k: 'course', ref: 'embedding' }, { k: 'iv', ref: 'embedding-meaning' }] },
      { t: { zh: '注意力與 Transformer', en: 'Attention and the Transformer', ja: '注意機構と Transformer' },
        steps: [{ k: 'course', ref: 'rnn' }, { k: 'course', ref: 'transformer' }, { k: 'iv', ref: 'attention-compute' }, { k: 'iv', ref: 'multi-head' }, { k: 'iv', ref: 'positional-encoding' }, { k: 'iv', ref: 'transformer-vs-rnn' }] },
      { t: { zh: '大模型與記憶', en: 'The model and memory', ja: 'モデルと記憶' },
        steps: [{ k: 'course', ref: 'llm' }, { k: 'course', ref: 'model-size' }, { k: 'course', ref: 'model-knowledge' }, { k: 'iv', ref: 'what-model-stores' }] },
      { t: { zh: '推論與湧現', en: 'Inference and emergence', ja: '推論と創発' },
        steps: [{ k: 'course', ref: 'context-window' }, { k: 'iv', ref: 'context-window' }, { k: 'course', ref: 'inference' }, { k: 'iv', ref: 'train-vs-infer' }, { k: 'iv', ref: 'faster-inference' }, { k: 'iv', ref: 'emergence' }] },
    ],
  },
  {
    id: 'train-tune',
    deepens: 'engineer',
    icon: 'Cpu',
    group: 'track',
    time: { zh: '約 2 小時', en: '~2 hrs', ja: '約2時間' },
    t: {
      zh: { title: '訓練與微調', tagline: '模型怎麼練出來、怎麼調：RLHF、LoRA、微調還是 RAG。', who: '想懂訓練流程與調校選擇的人。' },
      en: { title: 'Training & Fine-tuning', tagline: 'How a model is trained and tuned: RLHF, LoRA, fine-tune vs RAG.', who: 'Anyone who wants to understand training and tuning choices.' },
      ja: { title: '学習とファインチューニング', tagline: 'モデルの学習と調整：RLHF、LoRA、ファインチューニングか RAG か。', who: '学習の流れと調整の選択を理解したい人。' },
    },
    phases: [
      { t: { zh: '怎麼學起來', en: 'How it learns', ja: 'どう学習するか' },
        steps: [{ k: 'course', ref: 'neural-network' }, { k: 'course', ref: 'training' }, { k: 'course', ref: 'backprop' }, { k: 'iv', ref: 'data-quality' }] },
      { t: { zh: '從模型到 ChatGPT', en: 'From model to ChatGPT', ja: 'モデルから ChatGPT へ' },
        steps: [{ k: 'course', ref: 'pretraining' }, { k: 'iv', ref: 'rlhf-why' }, { k: 'iv', ref: 'why-not-pretrain' }, { k: 'iv', ref: 'dpo-pipeline' }, { k: 'iv', ref: 'scaling-law' }] },
      { t: { zh: '微調的選擇', en: 'Tuning choices', ja: '調整の選択' },
        steps: [{ k: 'course', ref: 'fine-tuning' }, { k: 'iv', ref: 'finetune-vs-rag' }, { k: 'iv', ref: 'lora' }, { k: 'iv', ref: 'catastrophic-forgetting' }] },
    ],
  },
  {
    id: 'genmm',
    deepens: 'understand',
    icon: 'PenLine',
    group: 'track',
    time: { zh: '約 1 小時', en: '~1 hr', ja: '約1時間' },
    t: {
      zh: { title: '生成式 AI／多模態', tagline: 'AI 怎麼畫圖、看圖，跨越文字與影像。', who: '想懂圖像生成與多模態的人。' },
      en: { title: 'Generative & Multimodal', tagline: 'How AI draws, sees, and crosses between text and images.', who: 'Anyone curious about image generation and multimodal models.' },
      ja: { title: '生成 AI・マルチモーダル', tagline: 'AI がどう描き、どう見て、テキストと画像をまたぐか。', who: '画像生成とマルチモーダルを理解したい人。' },
    },
    phases: [
      { t: { zh: '怎麼生圖', en: 'How images are made', ja: '画像はどう作られるか' },
        steps: [{ k: 'course', ref: 'generative' }, { k: 'iv', ref: 'diffusion-how' }, { k: 'iv', ref: 'diffusion-not-collage' }] },
      { t: { zh: '生圖的細節', en: 'The details', ja: '生成の細部' },
        steps: [{ k: 'iv', ref: 'genimg-errors' }, { k: 'iv', ref: 'diffusion-vs-gan' }] },
      { t: { zh: '多模態', en: 'Multimodal', ja: 'マルチモーダル' },
        steps: [{ k: 'course', ref: 'multimodal' }, { k: 'iv', ref: 'multimodal-key' }, { k: 'iv', ref: 'vlm-see' }] },
    ],
  },
  {
    id: 'system-design',
    deepens: 'builder',
    icon: 'Wrench',
    group: 'track',
    time: { zh: '約 2.5 小時', en: '~2.5 hrs', ja: '約2.5時間' },
    t: {
      zh: { title: '系統設計實戰', tagline: '把 AI 組成能上線的產品：架構、成本、監控。', who: '要設計、負責 AI 產品的人。' },
      en: { title: 'System Design', tagline: 'Assemble AI into a product that ships: architecture, cost, monitoring.', who: 'Those who design and own AI products.' },
      ja: { title: 'システム設計の実戦', tagline: 'AI を公開できるプロダクトに組み立てる：構成・コスト・監視。', who: 'AI プロダクトを設計し、担う人。' },
    },
    phases: [
      { t: { zh: '先看整條鏈', en: 'See the whole chain', ja: '鎖全体を見る' },
        steps: [{ k: 'course', ref: 'rag' }, { k: 'course', ref: 'agent' }, { k: 'course', ref: 'integration' }, { k: 'iv', ref: 'agent-vs-workflow' }, { k: 'iv', ref: 'design-doc-qa' }] },
      { t: { zh: '常見場景', en: 'Common scenarios', ja: 'よくある場面' },
        steps: [{ k: 'iv', ref: 'design-data-pipeline' }, { k: 'iv', ref: 'design-support-bot' }, { k: 'iv', ref: 'realtime-assistant' }] },
      { t: { zh: '成本與可靠', en: 'Cost and reliability', ja: 'コストと信頼性' },
        steps: [{ k: 'iv', ref: 'design-cost' }, { k: 'iv', ref: 'design-build-vs-buy' }, { k: 'iv', ref: 'design-latency-scale' }, { k: 'iv', ref: 'guardrails' }, { k: 'iv', ref: 'data-leakage' }] },
      { t: { zh: '評估與上線', en: 'Evaluate and launch', ja: '評価と公開' },
        steps: [{ k: 'course', ref: 'evaluation' }, { k: 'iv', ref: 'design-eval-improve' }, { k: 'iv', ref: 'monitoring' }] },
    ],
  },
  {
    id: 'evaluate',
    deepens: 'leader',
    icon: 'Scale',
    group: 'track',
    time: { zh: '約 2.5 小時', en: '~2.5 hrs', ja: '約2.5時間' },
    t: {
      zh: { title: '評估與決策', tagline: '怎麼知道 AI 做得好不好，怎麼在方案之間選對的。', who: '要為 AI 品質與技術選型負責的人。' },
      en: { title: 'Evaluation & Decisions', tagline: 'How to tell if AI is doing well, and how to pick the right option.', who: 'Anyone who owns AI quality and technology choices.' },
      ja: { title: '評価と意思決定', tagline: 'AI の良し悪しをどう測り、どの選択肢を選ぶか。', who: 'AI の品質と技術選定に責任を持つ人。' },
    },
    phases: [
      { t: { zh: '什麼叫做得好', en: 'What good looks like', ja: '良いとは何か' },
        steps: [{ k: 'course', ref: 'evaluation' }, { k: 'iv', ref: 'trust-answer' }, { k: 'iv', ref: 'prompt-eval' }, { k: 'iv', ref: 'eval-benchmark' }, { k: 'iv', ref: 'eval-llm-judge' }, { k: 'iv', ref: 'eval-set' }] },
      { t: { zh: '在方案之間選', en: 'Choosing between options', ja: '選択肢から選ぶ' },
        steps: [{ k: 'iv', ref: 'prompt-vs-tune-vs-rag' }, { k: 'iv', ref: 'finetune-vs-rag' }, { k: 'iv', ref: 'agent-vs-workflow' }, { k: 'iv', ref: 'design-build-vs-buy' }] },
      { t: { zh: '量化與改進', en: 'Measure and improve', ja: '計測して改善' },
        steps: [{ k: 'iv', ref: 'agent-eval' }, { k: 'iv', ref: 'design-eval-improve' }, { k: 'iv', ref: 'monitoring' }, { k: 'iv', ref: 'eval-offline-online' }, { k: 'iv', ref: 'eval-regression' }] },
      { t: { zh: '判斷力的底線', en: 'The judgment floor', ja: '判断の下限' },
        steps: [{ k: 'course', ref: 'limits' }, { k: 'iv', ref: 'ai-limits' }, { k: 'iv', ref: 'can-llm-reason' }] },
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

/** 取路線「學習成果」條列（缺該語言回退 zh，未撰寫回空陣列） */
export function pathOutcomes(p, locale = 'zh') {
  const o = p && OUTCOMES[p.id];
  return (o && (o[locale] || o.zh)) || [];
}

/* ============================================================
   各路線「你將學到什麼」學習成果（en / ja / zh）。
   與 phases 對齊、以成果口吻描述；缺語言回退 zh、未列出的路線不顯示此區。
   ============================================================ */
const OUTCOMES = {
  understand: {
    zh: [
      '理解 AI、生成式 AI 與大型語言模型（LLM）的基本原理。',
      '看懂 AI 新聞與熱門名詞，不再被術語弄得一頭霧水。',
      '學會如何用 Prompt 與 AI 有效溝通，提升回答品質。',
      '了解 AI 如何查找資料、完成任務，以及 AI Agent 的運作方式。',
      '認識 AI 的能力與限制，包括幻覺、偏見與推理能力。',
      '知道哪些事情適合交給 AI，建立正確、安全的使用觀念。',
    ],
    en: [
      'Grasp the basics of AI, generative AI, and large language models (LLMs).',
      'Follow AI news and buzzwords without getting lost in the jargon.',
      'Learn to talk to AI through prompts and get better answers.',
      'See how AI looks things up, gets tasks done, and how AI agents work.',
      'Know AI’s strengths and limits, including hallucination, bias, and reasoning.',
      'Judge what to hand off to AI, and build correct, safe habits for using it.',
    ],
    ja: [
      'AI・生成 AI・大規模言語モデル（LLM）の基本原理をつかむ。',
      'AI ニュースや流行り言葉を、専門用語に惑わされず読み解く。',
      'プロンプトで AI とうまくやり取りし、回答の質を上げる。',
      'AI が情報を調べてタスクをこなす仕組みと、AI エージェントの動きを理解する。',
      '幻覚・バイアス・推論力を含め、AI の能力と限界を知る。',
      '何を AI に任せるべきかを見極め、正しく安全に使う感覚を身につける。',
    ],
  },
  builder: {
    zh: [
      '打好夠用的底：搞懂 LLM、context window 與模型記得什麼，不必啃理論。',
      '熟練 Prompt：用提示工程與 few-shot 穩定拉高輸出品質，並學會評估。',
      '接上你的資料與工具：用 RAG、Memory、MCP 讓 AI 讀你的知識、串外部工具。',
      '把 AI 做成產品：從 Agent、系統整合到文件問答、客服機器人的實作設計。',
      '顧好上線品質：加上防護欄、防資料外洩、評估與監控，安心上線。',
    ],
    en: [
      'Get just enough foundation: LLMs, context windows, and what a model remembers, without heavy theory.',
      'Master prompting: use prompt engineering and few-shot to reliably raise quality, and learn to evaluate it.',
      'Connect your data and tools: use RAG, memory, and MCP so AI reads your knowledge and calls external tools.',
      'Turn AI into a product: from agents and system integration to doc-QA and support-bot design.',
      'Ship with quality: add guardrails, prevent data leakage, and set up evaluation and monitoring.',
    ],
    ja: [
      '必要な土台だけ固める：LLM、コンテキストウィンドウ、モデルが覚えていることを、重い理論なしで。',
      'プロンプトを使いこなす：プロンプト設計と few-shot で品質を安定して高め、評価もできるように。',
      'データとツールを繋ぐ：RAG・メモリ・MCP で、AI に自社の知識を読ませ外部ツールを呼ばせる。',
      'AI をプロダクトにする：エージェントやシステム統合から、文書 QA・サポートボットの設計まで。',
      '品質を保って公開：ガードレール、データ漏洩対策、評価と監視を備える。',
    ],
  },
  engineer: {
    zh: [
      '打穩理論基礎：機器學習、資料、深度學習、神經網路與 CNN，看懂模型怎麼學。',
      '讀懂 LLM 內部：tokenizer、embedding、Transformer 與 attention 如何運作。',
      '掌握模型與推論：模型大小、知識邊界、context window 與推論的實際行為。',
      '理解訓練全貌：梯度下降、反向傳播、預訓練、RLHF、對齊與 scaling law。',
      '會微調與推理模型：fine-tuning、LoRA，以及微調 vs RAG 的取捨。',
      '具備工程與上線判斷：系統整合、可靠輸出、評估、成本、防護欄與監控。',
    ],
    en: [
      'Build solid theory: machine learning, data, deep learning, neural networks, and CNNs, so you see how models learn.',
      'Read the LLM internals: how the tokenizer, embeddings, the Transformer, and attention work.',
      'Master models and inference: model size, knowledge limits, context windows, and how inference really behaves.',
      'Understand the whole training story: gradient descent, backprop, pretraining, RLHF, alignment, and scaling laws.',
      'Fine-tune and use reasoning models: fine-tuning, LoRA, and the fine-tune vs RAG trade-off.',
      'Gain engineering and production judgment: system integration, reliable output, evaluation, cost, guardrails, and monitoring.',
    ],
    ja: [
      '理論の土台を固める：機械学習、データ、深層学習、ニューラルネット、CNN で、モデルの学び方を理解。',
      'LLM の内部を読む：トークナイザ、埋め込み、Transformer、アテンションの仕組み。',
      'モデルと推論を押さえる：モデルサイズ、知識の限界、コンテキストウィンドウ、推論の実挙動。',
      '学習の全体像を理解：勾配降下、逆伝播、事前学習、RLHF、アライメント、スケーリング則。',
      '微調整と推論モデル：ファインチューニング、LoRA、微調整 vs RAG の使い分け。',
      'エンジニアリングと運用判断：システム統合、信頼できる出力、評価、コスト、ガードレール、監視。',
    ],
  },
  leader: {
    zh: [
      '看懂你在買什麼：LLM、Prompt、生成式 AI 的能力與適用場景，不必寫程式。',
      '認清風險與極限：幻覺、偏見、能力邊界與「會不會推理」，做決策前先知道。',
      '判斷自建或外購：用 Prompt、RAG 還是微調？自架模型還是用 API？看懂取捨。',
      '掌握成本與治理：成本控制、防護欄、資料外洩與評估監控，管得住也放得心。',
    ],
    en: [
      'Understand what you’re buying: the capabilities and fit of LLMs, prompting, and generative AI, no coding required.',
      'See the risks and limits: hallucination, bias, capability boundaries, and whether it really reasons, before you decide.',
      'Judge build vs buy: prompt, RAG, or fine-tune? self-host or use an API? understand the trade-offs.',
      'Own cost and governance: cost control, guardrails, data-leakage prevention, and evaluation and monitoring.',
    ],
    ja: [
      '何を買うのか理解する：LLM、プロンプト、生成 AI の能力と適用範囲を、コードなしで。',
      'リスクと限界を見極める：幻覚、バイアス、能力の境界、本当に推論するのか、を決定前に知る。',
      '自作か購入かを判断：プロンプト・RAG・微調整のどれか、自前運用か API か、そのトレードオフ。',
      'コストとガバナンスを握る：コスト管理、ガードレール、データ漏洩対策、評価と監視。',
    ],
  },
  foundations: {
    zh: [
      '看懂從資料到模型：機器學習的基本流程與資料品質為何關鍵。',
      '理解神經網路：深度學習與神經網路的組成與運作。',
      '掌握模型怎麼學：梯度下降與反向傳播如何讓模型自己找到權重。',
      '認識視覺與規模：CNN 怎麼看圖，以及為什麼規模越大越強（scaling law）。',
    ],
    en: [
      'See how data becomes a model: the basic ML workflow and why data quality is decisive.',
      'Understand neural networks: what deep learning and neural nets are made of and how they run.',
      'Grasp how a model learns: how gradient descent and backprop let a model find its own weights.',
      'Know vision and scale: how CNNs see images, and why bigger tends to be stronger (scaling laws).',
    ],
    ja: [
      'データがモデルになる流れを理解：ML の基本フローと、なぜデータ品質が決定的か。',
      'ニューラルネットを理解：深層学習とニューラルネットの構成と動作。',
      'モデルの学び方を掴む：勾配降下と逆伝播で、モデルが自ら重みを見つける仕組み。',
      '視覚と規模を知る：CNN が画像を見る方法と、なぜ大きいほど強いのか（スケーリング則）。',
    ],
  },
  prompt: {
    zh: [
      '打好提示基本功：提示寫作原則、few-shot，以及為什麼同一題答案會不同。',
      '進階推理提示：Chain-of-Thought 與推理模型，讓 AI「多想幾步」把答案想得更好。',
      '知道何時該用什麼：Prompt、RAG 還是微調，以及如何評估一個 Prompt 好不好。',
    ],
    en: [
      'Build prompting fundamentals: prompt-writing principles, few-shot, and why the same question can vary.',
      'Go advanced with reasoning: Chain-of-Thought and reasoning models that think a few steps more for better answers.',
      'Know when to use what: prompt, RAG, or fine-tune, and how to evaluate whether a prompt is any good.',
    ],
    ja: [
      'プロンプトの基本を固める：書き方の原則、few-shot、なぜ同じ問いでも答えが変わるのか。',
      '推論プロンプトへ：Chain-of-Thought と推論モデルで、数手多く考えて答えを良くする。',
      '使い分けを知る：プロンプト・RAG・微調整のどれか、そしてプロンプトの良し悪しの評価。',
    ],
  },
  rag: {
    zh: [
      '搞懂 RAG 概念：讓 AI 先檢索再生成，以及 RAG 與微調的差別。',
      '學會切塊與檢索：如何 chunk、用什麼檢索策略把對的內容找出來。',
      '認清限制與取捨：RAG 為什麼還是會錯、RAG vs 長 context，以及防資料外洩。',
      '做出可上線的系統：加上記憶，設計一個文件問答系統。',
    ],
    en: [
      'Grasp the RAG idea: retrieve first, then generate, and how RAG differs from fine-tuning.',
      'Learn chunking and retrieval: how to chunk and which retrieval strategy surfaces the right content.',
      'Know the limits and trade-offs: why RAG still errs, RAG vs long context, and preventing data leakage.',
      'Build a shippable system: add memory and design a document-QA system.',
    ],
    ja: [
      'RAG の考え方をつかむ：まず検索してから生成する仕組みと、微調整との違い。',
      'チャンク分割と検索を学ぶ：どう chunk し、どの検索戦略で正しい内容を出すか。',
      '限界とトレードオフを知る：なぜ RAG でも誤るか、RAG vs 長コンテキスト、データ漏洩対策。',
      '公開できるシステムを作る：メモリを加え、文書 QA システムを設計する。',
    ],
  },
  agent: {
    zh: [
      '搞懂 Agent 概念：Agent 與 workflow 的差別，以及 Agent 怎麼規劃。',
      '接上工具與穩定輸出：用 MCP 接工具，讓工具呼叫與 JSON 輸出可靠。',
      '加上記憶與整合：Agent 記憶與系統整合，做出即時助理。',
      '衡量成效與控成本：怎麼評估 Agent 表現、怎麼把成本壓下來。',
    ],
    en: [
      'Grasp the agent idea: how an agent differs from a workflow, and how agents plan.',
      'Wire up tools and stable output: use MCP for tools, and make tool calls and JSON output reliable.',
      'Add memory and integration: agent memory and system integration to build a real-time assistant.',
      'Measure results and control cost: how to evaluate agent performance and cut its cost.',
    ],
    ja: [
      'エージェントの考え方：エージェントとワークフローの違い、そして計画の立て方。',
      'ツール接続と安定出力：MCP でツールを繋ぎ、ツール呼び出しと JSON 出力を信頼できるものに。',
      'メモリと統合：エージェントのメモリとシステム統合で、リアルタイム助手を作る。',
      '成果測定とコスト管理：エージェントの性能評価と、コストの抑え方。',
    ],
  },
  safety: {
    zh: [
      '認清可靠性問題：幻覺與偏見從何而來，以及怎麼判斷答案可不可信。',
      '了解攻擊面：prompt injection 與 jailbreak 是什麼、能不能防。',
      '建立防線：用防護欄與防資料外洩降低上線風險。',
      '畫清邊界與驗證：AI 的能力極限、會不會推理，以及如何評估。',
    ],
    en: [
      'Face the reliability issues: where hallucination and bias come from, and how to judge if an answer is trustworthy.',
      'Understand the attack surface: what prompt injection and jailbreaks are, and whether they can be stopped.',
      'Build defenses: use guardrails and data-leakage prevention to lower launch risk.',
      'Draw boundaries and verify: AI’s capability limits, whether it reasons, and how to evaluate it.',
    ],
    ja: [
      '信頼性の問題を直視：幻覚とバイアスの出どころ、答えが信頼できるかの見極め方。',
      '攻撃面を理解：プロンプトインジェクションとジェイルブレイクとは何か、防げるのか。',
      '防御を築く：ガードレールとデータ漏洩対策で公開リスクを下げる。',
      '境界を引き検証：AI の能力限界、推論の有無、そして評価の方法。',
    ],
  },
  'llm-internals': {
    zh: [
      '從文字到向量：tokenizer 怎麼切字、embedding 為什麼能承載意義。',
      'attention 與 Transformer：序列模型、多頭注意力與位置編碼如何運作。',
      '模型與記憶：模型大小、知識存在哪，以及模型記得什麼。',
      '推論與湧現：context window、推論行為，以及大模型為何突然變強。',
    ],
    en: [
      'From text to vectors: how the tokenizer splits text and why embeddings can carry meaning.',
      'Attention and the Transformer: how sequence models, multi-head attention, and positional encoding work.',
      'The model and its memory: model size, where knowledge lives, and what a model remembers.',
      'Inference and emergence: context windows, how inference behaves, and why big models suddenly get stronger.',
    ],
    ja: [
      '文字からベクトルへ：トークナイザの分割と、なぜ埋め込みが意味を運べるのか。',
      'アテンションと Transformer：系列モデル、マルチヘッド注意、位置符号化の仕組み。',
      'モデルとメモリ：モデルサイズ、知識のありか、モデルが覚えていること。',
      '推論と創発：コンテキストウィンドウ、推論の挙動、そして大規模モデルが急に強くなる理由。',
    ],
  },
  'train-tune': {
    zh: [
      '看懂模型怎麼學：神經網路、梯度下降、反向傳播與資料品質。',
      '從模型到 ChatGPT：預訓練、RLHF、對齊管線與 scaling law。',
      '做出微調決策：fine-tuning、LoRA 為何有效，以及微調 vs RAG 的取捨。',
    ],
    en: [
      'See how a model learns: neural networks, gradient descent, backprop, and data quality.',
      'From model to ChatGPT: pretraining, RLHF, the alignment pipeline, and scaling laws.',
      'Make tuning decisions: fine-tuning, why LoRA is efficient, and the fine-tune vs RAG trade-off.',
    ],
    ja: [
      'モデルの学び方を理解：ニューラルネット、勾配降下、逆伝播、データ品質。',
      'モデルから ChatGPT へ：事前学習、RLHF、アライメントの流れ、スケーリング則。',
      '微調整の判断：ファインチューニング、LoRA が効く理由、微調整 vs RAG の使い分け。',
    ],
  },
  genmm: {
    zh: [
      '看懂 AI 怎麼生圖：擴散模型如何從雜訊去噪成圖，以及它不是拼貼。',
      '掌握細節與差別：為什麼手指常畫錯、擴散模型與 GAN 的差異。',
      '認識多模態：多模態的關鍵，以及 VLM 怎麼「看懂」圖片。',
    ],
    en: [
      'See how AI makes images: how diffusion denoises noise into a picture, and why it isn’t collage.',
      'Grasp the details and differences: why fingers come out wrong, and diffusion vs GAN.',
      'Understand multimodal: the key to multimodal, and how VLMs make sense of images.',
    ],
    ja: [
      'AI の画像生成を理解：拡散モデルがノイズを除去して画像にする仕組み、そしてコラージュではない理由。',
      '細部と違いを掴む：なぜ指が崩れるのか、拡散モデルと GAN の違い。',
      'マルチモーダルを知る：マルチモーダルの鍵と、VLM が画像を「理解」する方法。',
    ],
  },
  'system-design': {
    zh: [
      '看清整條鏈：RAG、Agent、系統整合怎麼組成一個會出貨的產品。',
      '熟悉常見場景：資料管線、客服 AI、即時助理的設計。',
      '顧好成本與可靠性：成本控制、自建或用 API、延遲與流量、防護欄與資料外洩。',
      '評估與上線：AI 評估、怎麼確認做得好，以及上線後的監控。',
    ],
    en: [
      'See the whole chain: how RAG, agents, and system integration form a product that ships.',
      'Know common scenarios: designing data pipelines, support AI, and real-time assistants.',
      'Handle cost and reliability: cost control, self-host vs API, latency and load, guardrails, and data leakage.',
      'Evaluate and launch: AI evaluation, confirming it’s good, and post-launch monitoring.',
    ],
    ja: [
      '全体の流れを見る：RAG・エージェント・システム統合が、出荷できる製品をどう構成するか。',
      'よくある場面を知る：データパイプライン、サポート AI、リアルタイム助手の設計。',
      'コストと信頼性を扱う：コスト管理、自前運用か API か、レイテンシと負荷、ガードレール、データ漏洩。',
      '評価と公開：AI 評価、良し悪しの確認、公開後の監視。',
    ],
  },
  evaluate: {
    zh: [
      '定義什麼叫好：AI 評估、可信度、Prompt 評估與 benchmark 的意義與陷阱。',
      '在選項之間做決定：Prompt/RAG/微調、自建或 API、Agent 或 workflow 的取捨。',
      '量測與改進：評估 Agent、離線測試 vs 線上 A/B，以及上線後怎麼確認沒退步。',
      '守住判斷底線：AI 的極限、幻覺與偏見，以及會不會真的推理。',
    ],
    en: [
      'Define what good means: AI evaluation, trustworthiness, prompt evaluation, and what benchmarks do and hide.',
      'Decide between options: prompt vs RAG vs fine-tune, self-host vs API, agent vs workflow.',
      'Measure and improve: evaluating agents, offline tests vs online A/B, and confirming nothing regressed after launch.',
      'Hold the judgment floor: AI’s limits, hallucination and bias, and whether it truly reasons.',
    ],
    ja: [
      '「良い」を定義する：AI 評価、信頼性、プロンプト評価、ベンチマークの意味と落とし穴。',
      '選択肢の中で決める：プロンプト vs RAG vs 微調整、自前運用 vs API、エージェント vs ワークフロー。',
      '測定と改善：エージェント評価、オフライン試験 vs オンライン A/B、公開後の劣化確認。',
      '判断の下限を守る：AI の限界、幻覚とバイアス、本当に推論するのか。',
    ],
  },
};
