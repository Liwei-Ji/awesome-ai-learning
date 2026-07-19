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
        steps: [{ k: 'course', ref: 'ai-intro' }, { k: 'course', ref: 'ml' }, { k: 'course', ref: 'data' }, { k: 'course', ref: 'deep-learning' }, { k: 'course', ref: 'neural-network' }, { k: 'course', ref: 'cnn' }, { k: 'iv', ref: 'tokenizer-why' }, { k: 'iv', ref: 'embedding-meaning' }] },
      { t: { zh: '深入 LLM', en: 'Inside the LLM', ja: 'LLM の内部' },
        steps: [{ k: 'course', ref: 'tokenizer' }, { k: 'course', ref: 'embedding' }, { k: 'course', ref: 'rnn' }, { k: 'course', ref: 'transformer' }, { k: 'course', ref: 'llm' }, { k: 'course', ref: 'model-size' }, { k: 'course', ref: 'model-knowledge' }, { k: 'course', ref: 'context-window' }, { k: 'course', ref: 'inference' }, { k: 'iv', ref: 'attention-compute' }, { k: 'iv', ref: 'multi-head' }, { k: 'iv', ref: 'positional-encoding' }, { k: 'iv', ref: 'what-model-stores' }] },
      { t: { zh: '訓練與調校', en: 'Training and tuning', ja: '学習と調整' },
        steps: [{ k: 'course', ref: 'training' }, { k: 'course', ref: 'backprop' }, { k: 'course', ref: 'pretraining' }, { k: 'course', ref: 'fine-tuning' }, { k: 'iv', ref: 'rlhf-why' }, { k: 'iv', ref: 'finetune-vs-rag' }, { k: 'iv', ref: 'lora' }, { k: 'iv', ref: 'catastrophic-forgetting' }, { k: 'iv', ref: 'scaling-law' }] },
      { t: { zh: '應用鏈', en: 'The application chain', ja: '応用チェーン' },
        steps: [{ k: 'course', ref: 'prompt' }, { k: 'course', ref: 'rag' }, { k: 'course', ref: 'memory' }, { k: 'course', ref: 'mcp' }, { k: 'course', ref: 'agent' }, { k: 'course', ref: 'integration' }, { k: 'iv', ref: 'prompt-craft' }, { k: 'iv', ref: 'rag-documents' }, { k: 'iv', ref: 'rag-why-wrong' }, { k: 'iv', ref: 'agent-vs-workflow' }, { k: 'iv', ref: 'agent-planning' }, { k: 'iv', ref: 'json-output' }] },
      { t: { zh: '會判斷', en: 'Judgment', ja: '判断力' },
        steps: [{ k: 'course', ref: 'limits' }, { k: 'course', ref: 'evaluation' }, { k: 'iv', ref: 'can-llm-reason' }, { k: 'iv', ref: 'design-doc-qa' }, { k: 'iv', ref: 'design-support-bot' }, { k: 'iv', ref: 'design-eval-improve' }, { k: 'iv', ref: 'monitoring' }] },
    ],
  },

  {
    id: 'leader',
    icon: 'Compass',
    group: 'journey',
    time: { zh: '約 4 小時', en: '~4 hrs', ja: '約4時間' },
    t: {
      zh: { title: '決策者的 AI', tagline: '不寫程式，但要能做技術選型、評估、抓風險與成本。', who: '主管、PM、決策者：對 AI 做判斷，不碰底層數學。' },
      en: { title: 'AI for Leaders', tagline: 'No coding, but able to choose the tech, evaluate it, and weigh risk and cost.', who: 'Managers, PMs and decision-makers who judge AI without the underlying math.' },
      ja: { title: '意思決定者のための AI', tagline: 'コードは書かないが、技術選定・評価・リスクとコストの判断ができる。', who: '管理職・PM・意思決定者：数式には踏み込まず AI を判断する人。' },
    },
    phases: [
      { t: { zh: '看懂在買什麼', en: 'Know what you are buying', ja: '何を導入するか理解する' },
        steps: [{ k: 'course', ref: 'ai-intro' }, { k: 'course', ref: 'llm' }, { k: 'course', ref: 'prompt' }, { k: 'course', ref: 'generative' }, { k: 'iv', ref: 'what-model-stores' }] },
      { t: { zh: '界線與風險', en: 'Limits and risk', ja: '限界とリスク' },
        steps: [{ k: 'course', ref: 'limits' }, { k: 'iv', ref: 'hallucination' }, { k: 'iv', ref: 'ai-limits' }, { k: 'iv', ref: 'can-llm-reason' }, { k: 'iv', ref: 'bias' }] },
      { t: { zh: '選型與成本', en: 'Build vs buy, and cost', ja: '選定とコスト' },
        steps: [{ k: 'iv', ref: 'finetune-vs-rag' }, { k: 'iv', ref: 'prompt-vs-tune-vs-rag' }, { k: 'iv', ref: 'agent-vs-workflow' }, { k: 'iv', ref: 'design-cost' }] },
      { t: { zh: '上線與治理', en: 'Launch and governance', ja: '公開とガバナンス' },
        steps: [{ k: 'iv', ref: 'guardrails' }, { k: 'iv', ref: 'data-leakage' }, { k: 'iv', ref: 'design-eval-improve' }, { k: 'iv', ref: 'monitoring' }, { k: 'course', ref: 'evaluation' }] },
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
  {
    id: 'llm-internals',
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
      { t: { zh: '推論', en: 'Inference', ja: '推論' },
        steps: [{ k: 'course', ref: 'context-window' }, { k: 'course', ref: 'inference' }, { k: 'iv', ref: 'train-vs-infer' }, { k: 'iv', ref: 'faster-inference' }] },
    ],
  },
  {
    id: 'train-tune',
    icon: 'Cpu',
    group: 'track',
    time: { zh: '約 3 小時', en: '~3 hrs', ja: '約3時間' },
    t: {
      zh: { title: '訓練與微調', tagline: '模型怎麼練出來、怎麼調：RLHF、LoRA、微調還是 RAG。', who: '想懂訓練流程與調校選擇的人。' },
      en: { title: 'Training & Fine-tuning', tagline: 'How a model is trained and tuned: RLHF, LoRA, fine-tune vs RAG.', who: 'Anyone who wants to understand training and tuning choices.' },
      ja: { title: '学習とファインチューニング', tagline: 'モデルの学習と調整：RLHF、LoRA、ファインチューニングか RAG か。', who: '学習の流れと調整の選択を理解したい人。' },
    },
    phases: [
      { t: { zh: '怎麼學起來', en: 'How it learns', ja: 'どう学習するか' },
        steps: [{ k: 'course', ref: 'training' }, { k: 'course', ref: 'backprop' }, { k: 'iv', ref: 'data-quality' }] },
      { t: { zh: '從模型到 ChatGPT', en: 'From model to ChatGPT', ja: 'モデルから ChatGPT へ' },
        steps: [{ k: 'course', ref: 'pretraining' }, { k: 'course', ref: 'fine-tuning' }, { k: 'iv', ref: 'rlhf-why' }, { k: 'iv', ref: 'why-not-pretrain' }] },
      { t: { zh: '微調的選擇', en: 'Tuning choices', ja: '調整の選択' },
        steps: [{ k: 'iv', ref: 'finetune-vs-rag' }, { k: 'iv', ref: 'lora' }, { k: 'iv', ref: 'catastrophic-forgetting' }] },
      { t: { zh: '規模', en: 'Scale', ja: 'スケール' },
        steps: [{ k: 'iv', ref: 'scaling-law' }] },
    ],
  },
  {
    id: 'genmm',
    icon: 'PenLine',
    group: 'track',
    time: { zh: '約 2 小時', en: '~2 hrs', ja: '約2時間' },
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
    icon: 'Wrench',
    group: 'track',
    time: { zh: '約 3 小時', en: '~3 hrs', ja: '約3時間' },
    t: {
      zh: { title: '系統設計實戰', tagline: '把 AI 組成能上線的產品：架構、成本、監控。', who: '要設計、負責 AI 產品的人。' },
      en: { title: 'System Design', tagline: 'Assemble AI into a product that ships: architecture, cost, monitoring.', who: 'Those who design and own AI products.' },
      ja: { title: 'システム設計の実戦', tagline: 'AI を公開できるプロダクトに組み立てる：構成・コスト・監視。', who: 'AI プロダクトを設計し、担う人。' },
    },
    phases: [
      { t: { zh: '架構基礎', en: 'Architecture basics', ja: '構成の基礎' },
        steps: [{ k: 'course', ref: 'integration' }, { k: 'iv', ref: 'agent-vs-workflow' }, { k: 'iv', ref: 'design-doc-qa' }] },
      { t: { zh: '常見場景', en: 'Common scenarios', ja: 'よくある場面' },
        steps: [{ k: 'iv', ref: 'design-support-bot' }, { k: 'iv', ref: 'realtime-assistant' }] },
      { t: { zh: '成本與可靠', en: 'Cost and reliability', ja: 'コストと信頼性' },
        steps: [{ k: 'iv', ref: 'design-cost' }, { k: 'iv', ref: 'guardrails' }, { k: 'iv', ref: 'data-leakage' }] },
      { t: { zh: '評估與上線', en: 'Evaluate and launch', ja: '評価と公開' },
        steps: [{ k: 'iv', ref: 'design-eval-improve' }, { k: 'iv', ref: 'monitoring' }] },
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
