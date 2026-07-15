/* ============================================================
   面試演練（進階題庫）：與課程分流的獨立 mode。
   base = 繁中；en / ja 放 INT_TR / CAT_TR，缺就 fallback 回中文
   （比照 chapters 的 CH_TR）。透過 ivOf() / catNameOf() 取在地化內容。

   每題採「核心答＋加分」雙層結構：
     core = 一口氣講得完的 3–4 個 beat（回答了題目）
     plus = 追問才展開的深度（避免「擴張」失焦）
   ============================================================ */

// 側邊欄題庫分類（貼齊課程群組，坐實「基本之上」）；t 為繁中，翻譯放 CAT_TR
export const IV_CATS = [
  { key: 'principle', t: '原理機制' },
  { key: 'training', t: '訓練與微調' },
  { key: 'inference', t: '推論與部署' },
  { key: 'retrieval', t: '檢索與知識' },
  { key: 'agent', t: 'Agent 與工程' },
  { key: 'generative', t: '生成與多模態' },
  { key: 'literacy', t: 'AI 素養與風險' },
  { key: 'design', t: '系統設計' },
];

const CAT_TR = {
  en: {
    principle: 'Principles & Mechanisms', training: 'Training & Fine-tuning',
    inference: 'Inference & Deployment', retrieval: 'Retrieval & Knowledge',
    agent: 'Agents & Engineering', generative: 'Generative & Multimodal',
    literacy: 'AI Literacy & Risk', design: 'System Design',
  },
  ja: {
    principle: '原理と仕組み', training: '学習とファインチューニング',
    inference: '推論とデプロイ', retrieval: '検索と知識',
    agent: 'エージェントと工学', generative: '生成とマルチモーダル',
    literacy: 'AI リテラシーとリスク', design: 'システム設計',
  },
};

export const INTERVIEWS = {
  'context-window': {
    cat: 'inference',
    label: '上下文窗口限制',
    q: '如何處理大模型的上下文窗口限制？',
    trap: '多數人直接丟一個工具：「用 RAG」或「換更大窗口的模型」。面試官要的不是工具名，是你懂不懂<b>為什麼有這個限制</b>、以及<b>怎麼依場景組合取捨</b>。',
    points: [
      { icon: 'atom', title: '底層原理', desc: '知不知道限制的物理根源：注意力是「每個 token 對所有 token」，計算與記憶體隨長度 O(n²) 成長；位置編碼只在訓練長度內可靠；就算塞進窗口，中段內容也常被忽略（lost in the middle）。' },
      { icon: 'scale', title: '工程權衡', desc: '面對時間／成本／準確度怎麼取捨，例如長上下文微調 vs 動態壓縮、更大窗口 vs 檢索。' },
      { icon: 'network', title: '系統化', desc: '能不能把它當成「上下文預算管理」問題、用多階段框架處理，而不是押寶單一招。' },
    ],
    core: [
      { h: '點根源', d: '窗口有上限，主因是模型只在固定長度上訓練、位置編碼也只在該範圍內可靠；而注意力 O(n²) 又讓塞越多越貴越慢、中段還常被忽略。所以重點不是「開大」，是<b>管理什麼該進窗口</b>。' },
      { h: '主要做法＋取捨', d: '塞不下就 →（a）只留最相關／最近的（截斷、滑動視窗）；（b）把舊的壓成摘要；（c）放外部用 RAG 每次只取相關片段；（d）跨會話就用記憶。取捨：RAG 省窗口但看檢索品質、摘要省空間但丟細節、換大窗口最省事但貴且中段照樣弱。' },
      { h: '收尾', d: '實務上是<b>組合拳＋依場景選</b>（聊天＝滑動視窗＋摘要＋記憶、文件問答＝RAG…），把它當「上下文預算管理」。' },
    ],
    plus: [
      '位置編碼的外推／內插（RoPE、position interpolation）如何把窗口撐大，以及為何硬外推會退化。',
      '「lost in the middle」：把關鍵資訊放頭尾、避開中段盲區的擺位技巧。',
      '架構層：FlashAttention 省記憶體、稀疏／線性注意力降計算量級，顯示你知道根在注意力。',
    ],
    traps: [
      '只答一個工具名（「用 RAG」就結束）。',
      '把「窗口開大」當萬靈丹，忽略成本與中段盲區。',
      '把 RAG 說成「教模型記住」，其實 RAG 是<b>查</b>、不是記。',
    ],
    related: ['context-window', 'transformer', 'rag', 'memory'],
  },

  'agent-planning': {
    cat: 'agent',
    label: 'Agent 的規劃機制',
    q: '請說明 Agent 的規劃機制。',
    trap: '很多人只說「它會自己想」。面試官要的是你講得出<b>規劃的具體做法與取捨</b>（ReAct vs 計畫再執行、何時重規劃），而不是一句「有 Agent 就會規劃」。',
    points: [
      { icon: 'atom', title: '底層原理', desc: '規劃＝把大目標拆成可執行的小步驟，並決定用什麼方式推進：可先擬完整計畫，也可邊做邊調。' },
      { icon: 'scale', title: '工程權衡', desc: 'ReAct（想→做→觀察，逐步）彈性但步數多、易繞路；plan-then-execute（先擬計畫再執行）省 token、好追蹤，但計畫一錯整條偏。' },
      { icon: 'network', title: '系統化', desc: '能不能加上「重規劃／錯誤恢復」：觀察到失敗就修正計畫，並設步數上限與終止條件，避免無限繞圈。' },
    ],
    core: [
      { h: '先定義', d: '規劃＝把大目標拆成一連串可執行步驟，並安排怎麼推進；<b>可先擬完整計畫、也可邊做邊調</b>，重點是能依情況選對方式、並在出錯時修正。' },
      { h: '兩種主流＋取捨', d: 'ReAct：想→做→觀察逐步推進，彈性但步數多、可能繞路；plan-then-execute：先擬完整計畫再依序做，省 token、好追蹤，但計畫錯了整條偏。實務常混用：先粗略計畫，執行中用 ReAct 微調。' },
      { h: '讓它穩', d: '關鍵是<b>重規劃與錯誤恢復</b>：工具失敗或結果不對就修正計畫；並用步數上限、明確終止條件，防止無限繞圈。' },
    ],
    plus: [
      'tree-of-thought／多路徑探索 vs 單線 ReAct 的取捨。',
      '把「規劃」與「執行」分不同模型（強模型規劃、便宜模型執行）。',
      '反思（reflection）：讓 Agent 回顧自己的軌跡、從失敗中修正下一輪。',
    ],
    traps: [
      '只說「它會自己想」，講不出 ReAct／計畫再執行的差別。',
      '忽略終止條件與步數上限，導致無限繞圈（也是成本失控的來源）。',
      '把規劃講成一次性，不提「邊做邊重規劃」。',
    ],
    related: ['agent', 'integration', 'mcp'],
  },

  'agent-tools': {
    cat: 'agent',
    label: '可靠調用外部工具',
    q: '如何設計一個能可靠調用外部工具的 Agent？',
    trap: '只回「用 function calling」不夠。面試官要的是<b>整個調用迴圈怎麼防呆</b>：選錯工具、參數錯、工具報錯、逾時，你都要有對策。',
    points: [
      { icon: 'atom', title: '底層原理', desc: '模型本身不會「執行」工具，它只<b>輸出「要呼叫哪個工具、帶什麼參數」的結構化意圖</b>，由外部程式真正執行、再把結果回餵。' },
      { icon: 'scale', title: '工程權衡', desc: '給模型的工具越多越靈活，但越容易選錯、參數越容易亂；工具描述要精簡清楚，數量要收斂。' },
      { icon: 'network', title: '系統化', desc: '完整迴圈：選工具 → 產參數 → 校驗 → 執行（逾時／重試）→ 結果回餵 → 判斷是否完成，每一關都要有失敗處理。' },
    ],
    core: [
      { h: '先講機制', d: '模型不執行工具，它<b>只輸出「呼叫哪個工具、帶什麼參數」的結構化意圖</b>，外部程式執行後把結果回餵。所以可靠性＝「意圖對不對」＋「執行穩不穩」。' },
      { h: '調用迴圈防呆', d: '選工具（描述精簡、數量收斂，避免選錯）→ 產參數（給 schema、驗型別）→ 執行（逾時、重試、權限白名單）→ 出錯就把錯誤訊息回餵讓它自我修正 → 判斷完成。' },
      { h: '取捨與收尾', d: '工具越多越靈活但越易選錯，所以<b>寧可少而精</b>；重點是每一關都能失敗、能恢復，而不是假設一次就對。' },
    ],
    plus: [
      '結構化輸出的保證：function calling／JSON schema／約束解碼（見「穩定輸出 JSON」）。',
      'MCP 這類統一協定如何讓工具接入標準化。',
      '危險操作（寫入、付款）加人類確認或沙箱隔離。',
    ],
    traps: [
      '只答「用 function calling」，不提校驗、重試、逾時。',
      '一次塞太多工具，模型選錯或亂帶參數。',
      '工具報錯就整個中斷，而不是把錯誤回餵讓它修正。',
    ],
    related: ['agent', 'mcp', 'integration'],
  },

  'json-output': {
    cat: 'agent',
    label: '穩定輸出 JSON',
    q: '大模型如何穩定輸出 JSON 格式？',
    trap: '只說「在 prompt 裡叫它輸出 JSON」不保證：模型是機率生成，隨時可能多一段話、少一個括號。面試官要的是<b>從「拜託」升級到「保證」的手段</b>。',
    points: [
      { icon: 'atom', title: '底層原理', desc: '模型是<b>逐 token 機率生成</b>，天生不保證合法 JSON；它可能加解釋、漏逗號、被截斷。所以「穩定」不能只靠 prompt 許願。' },
      { icon: 'scale', title: '工程權衡', desc: '手段由弱到強：prompt 要求 → function calling／JSON mode → 約束解碼（只允許生出合法 JSON）。越強越穩，但越依賴特定 API／推論框架、彈性越低。' },
      { icon: 'network', title: '系統化', desc: '加校驗＋重試：拿到輸出用 schema 驗（如 JSON Schema），失敗就帶著錯誤訊息重試或修補，形成閉環。' },
    ],
    core: [
      { h: '先點根本', d: '模型是<b>逐 token 機率生成</b>，本質不保證合法 JSON；只在 prompt 裡拜託，隨時可能多一段話或漏括號。' },
      { h: '手段由弱到強', d: '① prompt 明確要求＋給範例 → ② function calling／JSON mode（API 層約束）→ ③ 約束解碼／grammar（解碼時就只允許合法結構，最穩）。越往後越保證，但越綁特定框架。' },
      { h: '一定要有校驗閉環', d: '不管哪招，都<b>用 schema 驗一次</b>（JSON Schema），失敗就把錯誤回餵重試或自動修補，別假設它一次就對。' },
    ],
    plus: [
      '約束解碼原理：在每一步把不合法的 token 機率壓成 0。',
      'Pydantic／zod 這類「schema → 驗證 → 重試」的工具鏈。',
      '溫度調低有幫助但不夠（仍非保證，只是比較不亂）。',
    ],
    traps: [
      '只在 prompt 裡叫它輸出 JSON，就當作穩了。',
      '不做 schema 校驗，壞掉才在下游炸。',
      '把 JSON mode 當成 100% 保證（格式合法 ≠ 內容正確）。',
    ],
    related: ['agent', 'prompt', 'llm'],
  },

  'agent-memory': {
    cat: 'agent',
    label: 'Agent 的記憶管理',
    q: 'Agent 是怎麼做記憶管理的？',
    trap: '別跟「上下文窗口」混為一談。窗口是「一次能讀多少」，記憶管理是「跨很多步驟，該把哪些東西留在手邊」。面試官看你分不分得清、以及怎麼在有限窗口下維持連貫。',
    points: [
      { icon: 'atom', title: '底層原理', desc: '模型本身<b>無狀態</b>，每步只看得到當下丟進去的 context。Agent 的「記憶」＝外部程式決定「每一步要把哪些歷史塞回去」。' },
      { icon: 'scale', title: '工程權衡', desc: '全塞（保真但爆窗口、貴）vs 摘要（省空間但丟細節）vs 檢索（只取相關、可擴大但看檢索品質），通常混用。' },
      { icon: 'network', title: '系統化', desc: '分層：短期（本回合的 scratchpad／最近幾步）＋長期（跨會話的事實、偏好，存 DB／向量庫，需要時檢索回來）。' },
    ],
    core: [
      { h: '先切清楚', d: '模型<b>無狀態</b>，每步只看當下的 context；記憶是外部在管「每步把哪些歷史放回去」。這跟「窗口大小」是兩件事：窗口是容量，記憶管理是<b>取捨策略</b>。' },
      { h: '手段＋取捨', d: '工作記憶（scratchpad、最近步驟）保連貫；太長就摘要壓縮；更久遠或跨會話的存外部（DB／向量庫）需要時檢索回來。取捨：全塞爆窗口、摘要丟細節、檢索看命中率。' },
      { h: '分層收尾', d: '實務分<b>短期</b>（本回合）＋<b>長期</b>（跨會話事實／偏好），受窗口預算約束，本質是「上下文預算管理」的一種。' },
    ],
    plus: [
      '工具呼叫結果先摘要再回餵，避免佔滿窗口。',
      '長期記憶跟 RAG 幾乎同一套技術（存向量、按相關度取回）。',
      '記憶的隱私與過期：要能檢視、刪除、避免用到過時資訊。',
    ],
    traps: [
      '把「記憶管理」跟「上下文窗口」講成同一件事。',
      '把所有歷史全塞進每一步，窗口爆掉又貴。',
      '把記憶說成「模型記住了」，其實是外部餵回去的。',
    ],
    related: ['agent', 'memory', 'context-window'],
  },

  'agent-eval': {
    cat: 'agent',
    label: '量化 Agent 性能',
    q: '如何量化一個 Agent 的性能？',
    trap: '只說「看它答得對不對」不夠。Agent 是多步驟、會用工具，光看最終答案漏很多。面試官要你講出<b>任務級＋過程級</b>的評估，還要把成本／延遲算進去。',
    points: [
      { icon: 'atom', title: '底層原理', desc: 'Agent 的產出是「一連串動作＋最終結果」，所以評估要分：結果對不對（任務成功率）與過程好不好（軌跡：有沒有繞路、工具用對嗎）。' },
      { icon: 'scale', title: '工程權衡', desc: '人工評（準但貴慢）vs 自動評（快但難評開放式任務）vs LLM-as-judge（可擴但有偏誤、要校準）；離線測試集 vs 線上真實流量。' },
      { icon: 'network', title: '系統化', desc: '建一套：固定任務測試集 → 量 成功率／工具正確率／步數／成本／延遲 → 抓失敗案例回頭改，形成迭代閉環。' },
    ],
    core: [
      { h: '先分兩層', d: 'Agent 是多步驟＋用工具，<b>只看最終答案不夠</b>：要量「任務成功率」（結果對不對）＋「軌跡品質」（過程有沒有繞路、工具選對用對）。' },
      { h: '該量哪些', d: '任務成功率、工具呼叫正確率、平均步數、成本（token）、延遲。開放式任務難自動評，常用 LLM-as-judge，但它<b>有偏誤、要校準</b>，並保留人工抽查。' },
      { h: '成系統', d: '建固定<b>任務測試集</b>跑指標 → 抓失敗案例分析 → 改進 → 回歸測試。沒有測試集，改了也只是憑感覺。' },
    ],
    plus: [
      '軌跡評估：比對理想步驟序列，或檢查關鍵中間狀態。',
      '線上（A/B、真實成功率、用戶回饋）vs 離線（固定集回歸）。',
      'LLM-as-judge 的偏誤（位置偏好、偏好冗長）與校準方法。',
    ],
    traps: [
      '只看最終答案對錯，不評過程／軌跡。',
      '沒有固定測試集，改了也不知道變好變壞。',
      '完全信 LLM-as-judge，不知道它有偏誤。',
    ],
    related: ['agent', 'evaluation'],
  },

  'agent-cost': {
    cat: 'agent',
    label: 'Agent 成本控制',
    q: 'Agent 的成本怎麼避免失控？',
    trap: '只說「用便宜一點的模型」漏了根源。失控來自<b>多步驟 × context 逐步累積</b>：每多一步，前面的歷史又重算一次 token。面試官要你點出這個累積效應與對策。',
    points: [
      { icon: 'atom', title: '底層原理', desc: 'Agent 成本＝步數 × 每步 token，而每步都把前面歷史再塞一次，<b>token 隨步數累積成長</b>；一旦繞圈或無限重試，成本爆炸。' },
      { icon: 'scale', title: '工程權衡', desc: '省成本 vs 保品質：便宜模型省錢但可能做錯要重來、反而更貴；步數上限省錢但可能提早放棄任務。' },
      { icon: 'network', title: '系統化', desc: '多管齊下：步數上限＋明確終止、摘要壓縮歷史、快取重複子問題、模型分流（簡單步用便宜模型）、早停。' },
    ],
    core: [
      { h: '先點根源', d: 'Agent 成本＝<b>步數 × 每步 token</b>，而每步都把前面歷史再算一次，所以 token 隨步數<b>累積</b>成長；繞圈或無限重試就是成本爆炸。' },
      { h: '對策組合', d: '① 步數上限＋明確終止條件（防繞圈）；② 摘要壓縮歷史（別每步全塞）；③ 快取重複子問題；④ 模型分流（簡單步用便宜模型，難的才用強模型）；⑤ 早停。' },
      { h: '取捨收尾', d: '不是一味用便宜模型：<b>做錯要重來反而更貴</b>；重點是「花在刀口上」＋防止累積失控。' },
    ],
    plus: [
      'prompt caching：固定前綴（系統提示、工具描述）快取，省重算。',
      '把「規劃」與「執行」分模型（強模型少量規劃、便宜模型大量執行）。',
      '設每任務成本上限（budget guard），超了就停。',
    ],
    traps: [
      '只想到「換便宜模型」，忽略 token 累積與繞圈。',
      '沒有步數上限，Agent 無限重試燒錢。',
      '每步都把完整歷史塞回去，不摘要。',
    ],
    related: ['agent', 'inference', 'model-size'],
  },

  'rag-documents': {
    cat: 'retrieval',
    label: 'RAG 怎麼吃 Word／PDF',
    q: 'RAG 怎麼處理 Word 和 PDF 這類文件？',
    trap: '別以為「把檔案丟進去就好」。RAG 讀不懂 Word／PDF 這種「檔案」，它只吃純文字＋向量；中間的<b>解析 → 切塊 → 向量化</b>才是成敗關鍵，尤其表格、掃描檔、多欄版面。',
    points: [
      { icon: 'atom', title: '底層原理', desc: 'RAG 存的是「文字片段的向量」，不是檔案本身。所以任何格式都要先<b>抽成純文字</b>（PDF／Word → text），才談得上切塊與檢索。' },
      { icon: 'scale', title: '工程權衡', desc: '解析深度的取捨：純抽文字（快，但丟版面／表格）vs 版面感知解析（保留標題／表格／欄位，但慢、要工具）；掃描 PDF 還得先 OCR。' },
      { icon: 'network', title: '系統化', desc: '完整管線：解析（含 OCR／表格）→ 清理 → 依結構切塊 → 向量化 → 存向量庫，每一關的品質都直接決定檢索品質。' },
    ],
    core: [
      { h: '先破除誤解', d: 'RAG 存的是<b>文字片段的向量</b>，不是 Word／PDF 檔本身。所以第一步一定是把檔案<b>抽成純文字</b>，「格式問題」其實是「解析問題」。' },
      { h: '解析的取捨', d: '一般文字直接抽即可；但 PDF／Word 常有<b>表格、多欄、標題階層</b>，純抽會糊成一團，要用版面感知解析保留結構；<b>掃描檔沒有文字層，要先 OCR</b>。解析爛，後面再強也沒用。' },
      { h: '接回管線', d: '抽完文字後照常：清理 → <b>依結構切塊</b>（別把表格、段落硬切斷）→ 向量化 → 存庫。文件解析品質＝RAG 品質的天花板。' },
    ],
    plus: [
      '表格／圖表轉成 markdown 表格或描述文字，否則向量化後語意會亂。',
      '保留 metadata（來源檔名、頁碼、章節）方便引用與過濾。',
      '大檔案切塊要尊重結構（按標題／段落），不是死板固定長度。',
    ],
    traps: [
      '以為「丟檔案進去就會」，忽略解析這關。',
      '掃描 PDF 沒做 OCR，等於沒有文字可檢索。',
      '把表格當普通文字硬抽，行列糊在一起、語意壞掉。',
    ],
    related: ['rag', 'embedding', 'data'],
  },

  'rag-retrieval': {
    cat: 'retrieval',
    label: 'RAG 檢索策略設計',
    q: '如何設計 RAG 的檢索策略？',
    trap: '只說「算向量相似度取最相關的 top-k」是最陽春版。面試官要看你懂<b>切塊、混合檢索、重排、查詢改寫</b>這些讓檢索真的準的手段與取捨。',
    points: [
      { icon: 'atom', title: '底層原理', desc: '檢索品質＝「找回來的片段對不對」，一路受制於：切塊怎麼切、用什麼向量、怎麼比、取幾個。錯一環，LLM 再強也答錯（garbage in）。' },
      { icon: 'scale', title: '工程權衡', desc: '純向量檢索（懂語意但可能漏關鍵字）vs 關鍵字檢索（精準但不懂同義）→ 混合檢索兼顧但更複雜；top-k 大則召回高但塞爆窗口、雜訊多。' },
      { icon: 'network', title: '系統化', desc: '一條可調管線：切塊 → 向量化 →（混合）檢索 → 重排（rerank）→ 取 top-k → 塞進 prompt，每一關都可量測、可調。' },
    ],
    core: [
      { h: '先定成敗點', d: '檢索品質決定 RAG 上限（找錯片段，LLM 再強也答錯）。它取決於<b>一整條管線</b>，不是單一個「相似度」。' },
      { h: '關鍵手段＋取捨', d: '① <b>切塊</b>：太大塞不下又混雜、太小切斷語意；② <b>混合檢索</b>：向量（懂語意）＋關鍵字（抓專有名詞）互補；③ <b>重排 rerank</b>：先粗召回再精排，準度大升；④ <b>top-k</b>：大則召回高但雜訊多、佔窗口。' },
      { h: '進階與收尾', d: '再上去有<b>查詢改寫／擴展</b>（把口語問題改成好檢索的查詢）、metadata 過濾。心法：<b>召回率 vs 精確率 vs 成本</b>的平衡，且每關都要能量測迭代。' },
    ],
    plus: [
      '查詢改寫／擴展：multi-query 讓 LLM 生多個查詢變體；HyDE 讓 LLM 先寫一段「假想答案」，用它的向量去檢索。',
      'metadata／過濾：先用條件縮小範圍，再做向量比對。',
      '單獨評檢索本身（召回率、命中率），而不是只看最終答案。',
    ],
    traps: [
      '只會「向量相似度 top-k」，不知道 rerank 與混合檢索。',
      '切塊用死板固定長度，切斷語意或混入雜訊。',
      '只評最終答案，分不清是檢索爛還是生成爛。',
    ],
    related: ['rag', 'embedding', 'context-window'],
  },

  'hallucination': {
    cat: 'literacy',
    label: '為什麼會有幻覺',
    q: '大模型為什麼會有幻覺？能不能完全消除？',
    trap: '別把幻覺當成「bug」。它不是程式錯誤，是模型運作方式的<b>副作用</b>：它在猜最可能的字、不是在查事實。面試官要你講出成因，並理解為何無法「根治」、只能降低。',
    points: [
      { icon: 'atom', title: '底層原理', desc: '模型是<b>猜下一個最合理的字</b>，不是查資料庫；當它「不知道」時也不會停下說不知道，而是繼續生出語感最順、但可能是假的內容。' },
      { icon: 'scale', title: '工程權衡', desc: '想壓幻覺就要犧牲一些「流暢／敢答」：強制引用、不確定就拒答，會讓它比較保守，有時該答的也不答。' },
      { icon: 'network', title: '系統化', desc: '降低（非消除）的組合：RAG 給事實依據＋要求引用來源＋輸出校驗／事實查核＋讓它能說「不知道」。' },
    ],
    core: [
      { h: '先破除誤解', d: '幻覺不是 bug，是<b>運作方式的副作用</b>：模型在<b>猜最可能的字、不是查事實</b>；不知道時也不會煞車，照樣生出語感順但可能是假的內容。' },
      { h: '為什麼無法根治', d: '成因是本質性的（機率生成＋知識有截止＋沒有內建的真假判斷），所以<b>只能降低、不能歸零</b>。' },
      { h: '怎麼降低', d: '組合拳：RAG 給真實依據、要求<b>引用來源</b>可查證、對重要輸出做校驗／事實查核、並讓它<b>能說「不知道」</b>。' },
    ],
    plus: [
      '調低溫度有幫助但不夠（仍會自信地錯）。',
      '檢索錯了幻覺照樣發生：RAG 只降不消。',
      '越專業／冷門的問題越容易幻覺（訓練資料稀疏）。',
    ],
    traps: [
      '把幻覺當成可以「修掉的 bug」。',
      '以為「接了 RAG 就不會幻覺」。',
      '把「模型很自信」當成「答案很可靠」。',
    ],
    related: ['limits', 'llm', 'rag'],
  },
};

// 各語言的內容翻譯（欄位與 base 對齊；points 只翻 title/desc，icon 沿用 base）
const INT_TR = {
  en: {
    "agent-planning": {
      label: "Agent planning",
      q: "Explain how an agent does planning.",
      trap: "Many people just say “it figures things out on its own.” The interviewer wants you to articulate <b>the concrete approaches to planning and their trade-offs</b> (ReAct vs. plan-then-execute, when to replan), not a throwaway line like “an agent just plans by itself.”",
      points: [
        { title: "Underlying principle", desc: "Planning means breaking a big goal into small, executable steps and deciding how to drive them forward: you can lay out a full plan up front, or adjust as you go." },
        { title: "Engineering trade-offs", desc: "ReAct (think → act → observe, step by step) is flexible but takes many steps and wanders easily; plan-then-execute (draft a plan, then run it) saves tokens and is easy to trace, but if the plan is wrong the whole thing goes off course." },
        { title: "Systematic thinking", desc: "Whether you add “replanning / error recovery”: revise the plan the moment you observe a failure, and set a step limit and termination conditions to avoid looping forever." },
      ],
      core: [
        { h: "Define it first", d: "Planning means breaking a big goal into a sequence of executable steps and arranging how to drive them forward; <b>you can draft a full plan up front, or adjust as you go</b>. The key is picking the right approach for the situation and correcting course when things go wrong." },
        { h: "Two mainstream approaches + trade-offs", d: "ReAct: think → act → observe, one step at a time, flexible but many steps and prone to wandering; plan-then-execute: draft a full plan then run it in order, token-efficient and easy to trace, but if the plan is wrong the whole thing goes off course. In practice you often mix them: rough out a plan first, then use ReAct to fine-tune during execution." },
        { h: "Making it robust", d: "The key is <b>replanning and error recovery</b>: revise the plan when a tool fails or a result is off, and use a step limit and explicit termination conditions to prevent looping forever." },
      ],
      plus: [
        "The trade-off between tree-of-thought / multi-path exploration and single-track ReAct.",
        "Splitting “planning” and “execution” across different models (a strong model plans, a cheap model executes).",
        "Reflection: letting the agent review its own trajectory and correct the next round based on its failures.",
      ],
      traps: [
        "Just saying “it figures things out on its own,” unable to explain the difference between ReAct and plan-then-execute.",
        "Ignoring termination conditions and step limits, leading to endless loops (also a source of runaway cost).",
        "Treating planning as a one-shot thing, never mentioning “replanning as you go.”",
      ],
    },
    "agent-tools": {
      label: "Reliable tool calling",
      q: "How would you design an agent that reliably calls external tools?",
      trap: "Just answering “use function calling” isn’t enough. The interviewer wants to see <b>how you fail-proof the whole calling loop</b>: wrong tool picked, bad arguments, tool errors, timeouts, you need an answer for each.",
      points: [
        { title: "Underlying principle", desc: "The model doesn’t “execute” tools itself; it only <b>outputs a structured intent of “which tool to call, with what arguments”</b>, and external code actually runs it and feeds the result back." },
        { title: "Engineering trade-offs", desc: "The more tools you give the model, the more flexible it is, but the easier it picks the wrong one and the messier the arguments get; tool descriptions should be concise and clear, and the count kept small." },
        { title: "Systematic thinking", desc: "The full loop: pick a tool → generate arguments → validate → execute (timeout / retry) → feed the result back → decide whether it’s done, with failure handling at every stage." },
      ],
      core: [
        { h: "Start with the mechanism", d: "The model doesn’t execute tools; it <b>only outputs a structured intent of “which tool to call, with what arguments”</b>, and external code runs it and feeds the result back. So reliability = “is the intent right” + “is the execution stable.”" },
        { h: "Fail-proofing the calling loop", d: "Pick a tool (concise descriptions, small count, to avoid wrong picks) → generate arguments (give a schema, check types) → execute (timeout, retry, permission allowlist) → on error, feed the message back so it can self-correct → decide it’s done." },
        { h: "Trade-offs and wrap-up", d: "More tools mean more flexibility but easier wrong picks, so <b>prefer few and well-chosen</b>; the point is that every stage can fail and recover, rather than assuming it gets it right the first time." },
      ],
      plus: [
        "Guaranteeing structured output: function calling / JSON schema / constrained decoding (see “Reliable JSON output”).",
        "How a unifying protocol like MCP standardizes tool integration.",
        "Adding human confirmation or sandbox isolation for dangerous operations (writes, payments).",
      ],
      traps: [
        "Just answering “use function calling,” never mentioning validation, retries, or timeouts.",
        "Cramming in too many tools at once, so the model picks the wrong one or passes garbage arguments.",
        "Aborting the whole thing when a tool errors, instead of feeding the error back so it can fix it.",
      ],
    },
    "json-output": {
      label: "Reliable JSON output",
      q: "How do you get a large model to reliably output JSON?",
      trap: "Just saying “tell it in the prompt to output JSON” guarantees nothing: the model generates probabilistically and can add an extra sentence or drop a bracket at any time. The interviewer wants <b>the means to go from “please” to “guaranteed”</b>.",
      points: [
        { title: "Underlying principle", desc: "The model generates <b>token by token, probabilistically</b>, so it inherently doesn’t guarantee valid JSON; it may add an explanation, drop a comma, or get truncated. So “reliable” can’t rest on wishing in the prompt." },
        { title: "Engineering trade-offs", desc: "The means run from weak to strong: prompt instructions → function calling / JSON mode → constrained decoding (only valid JSON can be emitted). Stronger is more reliable, but ties you more to a specific API / inference framework and is less flexible." },
        { title: "Systematic thinking", desc: "Add validation + retry: validate the output against a schema (e.g. JSON Schema), and on failure retry or patch it with the error message, forming a closed loop." },
      ],
      core: [
        { h: "Name the root cause", d: "The model generates <b>token by token, probabilistically</b>, so it fundamentally doesn’t guarantee valid JSON; if you only ask nicely in the prompt, it can add an extra sentence or drop a bracket at any time." },
        { h: "Means from weak to strong", d: "① explicit prompt instructions + examples → ② function calling / JSON mode (constraints at the API layer) → ③ constrained decoding / grammar (only valid structures are allowed at decode time, the most robust). The further along, the stronger the guarantee, but the more it ties you to a specific framework." },
        { h: "Always have a validation loop", d: "Whichever approach you use, <b>validate once against a schema</b> (JSON Schema); on failure, feed the error back to retry or auto-patch, and don’t assume it gets it right the first time." },
      ],
      plus: [
        "How constrained decoding works: at each step, push the probability of illegal tokens down to 0.",
        "Tool chains like Pydantic / zod that do “schema → validate → retry.”",
        "Lowering the temperature helps but isn’t enough (still no guarantee, just less erratic).",
      ],
      traps: [
        "Just telling it in the prompt to output JSON and calling it done.",
        "Skipping schema validation, so it only blows up downstream when something breaks.",
        "Treating JSON mode as a 100% guarantee (valid format ≠ correct content).",
      ],
    },
    "agent-memory": {
      label: "Agent memory",
      q: "How does an agent manage memory?",
      trap: "Don’t conflate it with “context window.” The window is “how much it can read at once”; memory management is “across many steps, what to keep at hand.” The interviewer is watching whether you can tell them apart and how you stay coherent within a limited window.",
      points: [
        { title: "Underlying principle", desc: "The model itself is <b>stateless</b>; at each step it only sees the context you put in right then. An agent’s “memory” = external code deciding “which history to feed back in at each step.”" },
        { title: "Engineering trade-offs", desc: "Stuff everything in (faithful but blows the window and costs more) vs. summarize (saves space but loses detail) vs. retrieve (pull only what’s relevant, scalable but depends on retrieval quality); usually a mix." },
        { title: "Systematic thinking", desc: "Layer it: short-term (this turn’s scratchpad / the last few steps) + long-term (cross-session facts and preferences, stored in a DB / vector store and retrieved when needed)." },
      ],
      core: [
        { h: "Draw the distinction first", d: "The model is <b>stateless</b>; at each step it only sees the current context; memory is external code managing “which history to put back at each step.” This is a separate thing from “window size”: the window is capacity, memory management is <b>the selection strategy</b>." },
        { h: "Means + trade-offs", d: "Working memory (scratchpad, recent steps) keeps things coherent; when it gets too long, compress it into a summary; older or cross-session content lives externally (DB / vector store) and is retrieved when needed. Trade-offs: stuffing everything blows the window, summaries lose detail, retrieval depends on hit rate." },
        { h: "Wrap up with layering", d: "In practice, split into <b>short-term</b> (this turn) + <b>long-term</b> (cross-session facts / preferences), bounded by the window budget; at heart it’s a form of “context-budget management.”" },
      ],
      plus: [
        "Summarizing tool-call results before feeding them back, to avoid filling the window.",
        "Long-term memory uses almost the same tech as RAG (store vectors, retrieve by relevance).",
        "Memory privacy and expiry: you need to be able to inspect, delete, and avoid using stale information.",
      ],
      traps: [
        "Talking about “memory management” and “context window” as if they were the same thing.",
        "Stuffing the entire history into every step, blowing the window and running up the cost.",
        "Describing memory as “the model remembered,” when it’s actually external code feeding it back.",
      ],
    },
    "agent-eval": {
      label: "Measuring agent performance",
      q: "How would you quantify an agent’s performance?",
      trap: "Just saying “check whether its answer is right” isn’t enough. An agent is multi-step and uses tools, so looking only at the final answer misses a lot. The interviewer wants you to lay out <b>task-level and process-level</b> evaluation, and to factor in cost / latency too.",
      points: [
        { title: "Underlying principle", desc: "An agent’s output is “a sequence of actions + a final result,” so evaluation splits into: is the result right (task success rate) and is the process good (the trajectory: did it wander, did it use the right tools)." },
        { title: "Engineering trade-offs", desc: "Human evaluation (accurate but slow and expensive) vs. automated evaluation (fast but hard for open-ended tasks) vs. LLM-as-judge (scalable but biased and needs calibration); offline test sets vs. live real traffic." },
        { title: "Systematic thinking", desc: "Build a system: a fixed task test set → measure success rate / tool accuracy / step count / cost / latency → collect failure cases and go back to fix them, forming an iterative closed loop." },
      ],
      core: [
        { h: "Split into two layers first", d: "An agent is multi-step and uses tools, so <b>the final answer alone isn’t enough</b>: measure “task success rate” (is the result right) + “trajectory quality” (did the process wander, were the right tools picked and used well)." },
        { h: "What to measure", d: "Task success rate, tool-call accuracy, average step count, cost (tokens), latency. Open-ended tasks are hard to score automatically, so LLM-as-judge is common, but it <b>is biased and needs calibration</b>, and you should keep human spot-checks." },
        { h: "Turn it into a system", d: "Build a fixed <b>task test set</b> to run the metrics → collect and analyze failure cases → improve → regression test. Without a test set, any change is just a gut feeling." },
      ],
      plus: [
        "Trajectory evaluation: compare against an ideal step sequence, or check key intermediate states.",
        "Online (A/B, real success rate, user feedback) vs. offline (regression on a fixed set).",
        "LLM-as-judge biases (position preference, preference for verbosity) and how to calibrate them.",
      ],
      traps: [
        "Judging only whether the final answer is right, without evaluating the process / trajectory.",
        "Having no fixed test set, so you can’t tell whether a change made things better or worse.",
        "Trusting LLM-as-judge completely, unaware that it’s biased.",
      ],
    },
    "agent-cost": {
      label: "Agent cost control",
      q: "How do you keep an agent’s cost from spiraling out of control?",
      trap: "Just saying “use a cheaper model” misses the root cause. Runaway cost comes from <b>multiple steps × context piling up step by step</b>: each extra step re-computes the earlier history as tokens all over again. The interviewer wants you to name this compounding effect and the countermeasures.",
      points: [
        { title: "Underlying principle", desc: "Agent cost = step count × tokens per step, and each step stuffs the earlier history in again, so <b>tokens grow cumulatively with the step count</b>; once it loops or retries endlessly, cost explodes." },
        { title: "Engineering trade-offs", desc: "Saving cost vs. keeping quality: a cheap model saves money but may get it wrong and need a redo, ending up pricier; a step limit saves money but may abandon the task too early." },
        { title: "Systematic thinking", desc: "Attack it on several fronts: a step limit + explicit termination, summarizing to compress history, caching repeated sub-problems, model routing (a cheap model for simple steps), and early stopping." },
      ],
      core: [
        { h: "Name the root cause first", d: "Agent cost = <b>step count × tokens per step</b>, and each step re-computes the earlier history, so tokens grow <b>cumulatively</b> with the step count; looping or endless retries is exactly where cost explodes." },
        { h: "A combination of countermeasures", d: "① a step limit + explicit termination conditions (to prevent looping); ② summarize to compress history (don’t stuff everything in at each step); ③ cache repeated sub-problems; ④ model routing (a cheap model for simple steps, a strong model only for the hard ones); ⑤ early stopping." },
        { h: "Wrap up with the trade-off", d: "It’s not about blindly using a cheap model: <b>getting it wrong and having to redo it is actually pricier</b>; the point is to “spend where it counts” and prevent the compounding from running away." },
      ],
      plus: [
        "Prompt caching: cache fixed prefixes (system prompt, tool descriptions) to avoid re-computing them.",
        "Splitting “planning” and “execution” across models (a strong model for a little planning, a cheap model for a lot of execution).",
        "Setting a per-task cost cap (a budget guard) that stops once it’s exceeded.",
      ],
      traps: [
        "Only thinking of “switch to a cheaper model,” ignoring token accumulation and looping.",
        "Having no step limit, so the agent retries forever and burns money.",
        "Feeding the full history back in at every step, with no summarization.",
      ],
    },
    "rag-documents": {
      label: "RAG with Word / PDF",
      q: "How does RAG handle documents like Word and PDF?",
      trap: "Don’t assume “just drop the file in and you’re done.” RAG can’t read a “file” like Word / PDF; it only consumes plain text + vectors. The <b>parse → chunk → vectorize</b> steps in between are what make or break it, especially for tables, scanned files, and multi-column layouts.",
      points: [
        { title: "Underlying principle", desc: "RAG stores “vectors of text chunks,” not the file itself. So any format must first be <b>extracted into plain text</b> (PDF / Word → text) before chunking and retrieval even come into play." },
        { title: "Engineering trade-offs", desc: "The trade-off in parsing depth: plain text extraction (fast, but loses layout / tables) vs. layout-aware parsing (preserves headings / tables / columns, but slow and needs tooling); a scanned PDF also needs OCR first." },
        { title: "Systematic thinking", desc: "The full pipeline: parse (including OCR / tables) → clean → chunk by structure → vectorize → store in a vector database, where the quality of each stage directly determines retrieval quality." },
      ],
      core: [
        { h: "Clear up the misconception first", d: "RAG stores <b>vectors of text chunks</b>, not the Word / PDF file itself. So the first step is always to <b>extract the file into plain text</b>; a “format problem” is really a “parsing problem.”" },
        { h: "The parsing trade-off", d: "Plain text can just be extracted directly; but PDF / Word often have <b>tables, multiple columns, and heading hierarchies</b>, which plain extraction mushes together, so you need layout-aware parsing to preserve the structure; <b>scanned files have no text layer and need OCR first</b>. If parsing is bad, nothing downstream can save it." },
        { h: "Rejoin the pipeline", d: "Once the text is extracted, proceed as usual: clean → <b>chunk by structure</b> (don’t brutally cut through tables or paragraphs) → vectorize → store. Document parsing quality is the ceiling on RAG quality." },
      ],
      plus: [
        "Converting tables / charts into markdown tables or descriptive text, otherwise the semantics get muddled after vectorization.",
        "Preserving metadata (source filename, page number, section) to make citation and filtering easier.",
        "Chunking large files should respect structure (by heading / paragraph), not a rigid fixed length.",
      ],
      traps: [
        "Assuming “drop the file in and it just works,” ignoring the parsing stage.",
        "Not running OCR on a scanned PDF, which means there’s no text to retrieve at all.",
        "Extracting a table as ordinary text, so the rows and columns blur together and the meaning breaks.",
      ],
    },
    "rag-retrieval": {
      label: "RAG retrieval strategy",
      q: "How would you design a RAG retrieval strategy?",
      trap: "Just saying “compute vector similarity and take the most relevant top-k” is the barest version. The interviewer wants to see that you understand <b>chunking, hybrid search, reranking, and query rewriting</b>, the means and trade-offs that make retrieval actually accurate.",
      points: [
        { title: "Underlying principle", desc: "Retrieval quality = “are the chunks you pull back the right ones,” constrained all along by: how you chunk, which vectors you use, how you compare, and how many you take. Get one link wrong and even the strongest LLM answers wrong (garbage in)." },
        { title: "Engineering trade-offs", desc: "Pure vector search (understands semantics but may miss keywords) vs. keyword search (precise but doesn’t understand synonyms) → hybrid search covers both but is more complex; a large top-k means higher recall but blows the window and brings more noise." },
        { title: "Systematic thinking", desc: "A tunable pipeline: chunk → vectorize → (hybrid) search → rerank → take top-k → put into the prompt, where every stage is measurable and tunable." },
      ],
      core: [
        { h: "Pin down what makes or breaks it", d: "Retrieval quality sets the ceiling on RAG (pull the wrong chunks and even the strongest LLM answers wrong). It depends on <b>a whole pipeline</b>, not a single “similarity” score." },
        { h: "Key means + trade-offs", d: "① <b>Chunking</b>: too large won’t fit and mixes topics, too small cuts through the meaning; ② <b>hybrid search</b>: vectors (understand semantics) + keywords (catch proper nouns) complement each other; ③ <b>rerank</b>: coarse recall first, then fine ordering, which sharply boosts accuracy; ④ <b>top-k</b>: large means higher recall but more noise and more window used up." },
        { h: "Advanced steps and wrap-up", d: "Beyond that come <b>query rewriting / expansion</b> (turning a colloquial question into a query that retrieves well) and metadata filtering. The guiding idea: balancing <b>recall vs. precision vs. cost</b>, with every stage measurable and iterable." },
      ],
      plus: [
        "Query rewriting / expansion: multi-query has the LLM generate several query variants; HyDE has the LLM first write a “hypothetical answer” and retrieves using its vector.",
        "Metadata / filtering: narrow the scope with conditions first, then do the vector comparison.",
        "Evaluating retrieval on its own (recall, hit rate), not just looking at the final answer.",
      ],
      traps: [
        "Only knowing “vector similarity top-k,” unaware of rerank and hybrid search.",
        "Chunking with a rigid fixed length, cutting through the meaning or mixing in noise.",
        "Evaluating only the final answer, unable to tell whether retrieval or generation is the weak link.",
      ],
    },
    "hallucination": {
      label: "Why hallucinations happen",
      q: "Why do large models hallucinate? Can it be eliminated entirely?",
      trap: "Don’t treat hallucination as a “bug.” It isn’t a programming error, it’s a <b>side effect</b> of how the model works: it’s guessing the most likely words, not looking up facts. The interviewer wants you to explain the causes and to understand why it can’t be “cured,” only reduced.",
      points: [
        { title: "Underlying principle", desc: "The model <b>guesses the next most plausible word</b>, it doesn’t query a database; when it “doesn’t know,” it won’t stop and say so, but keeps generating the most fluent-sounding, possibly false, content." },
        { title: "Engineering trade-offs", desc: "Suppressing hallucination means sacrificing some “fluency / willingness to answer”: forcing citations and refusing when uncertain makes it more conservative, so sometimes it won’t answer even when it should." },
        { title: "Systematic thinking", desc: "The combination for reducing (not eliminating) it: RAG to ground it in facts + requiring source citations + output validation / fact-checking + letting it say “I don’t know.”" },
      ],
      core: [
        { h: "Clear up the misconception first", d: "Hallucination isn’t a bug, it’s a <b>side effect of how the model works</b>: the model is <b>guessing the most likely words, not looking up facts</b>; when it doesn’t know, it won’t hit the brakes but generates fluent-sounding, possibly false content all the same." },
        { h: "Why it can’t be cured", d: "The causes are intrinsic (probabilistic generation + a knowledge cutoff + no built-in sense of true vs. false), so <b>it can only be reduced, never brought to zero</b>." },
        { h: "How to reduce it", d: "A combination: RAG to ground it in real evidence, requiring <b>source citations</b> that can be verified, validating / fact-checking important outputs, and letting it <b>say “I don’t know”</b>." },
      ],
      plus: [
        "Lowering the temperature helps but isn’t enough (it will still be confidently wrong).",
        "If retrieval is wrong, hallucination happens anyway: RAG only reduces, never removes.",
        "The more specialized / obscure the question, the more likely hallucination is (sparse training data).",
      ],
      traps: [
        "Treating hallucination as a “bug you can fix.”",
        "Assuming “hook up RAG and it won’t hallucinate.”",
        "Taking “the model is confident” to mean “the answer is reliable.”",
      ],
    },
    'context-window': {
      label: 'Context window limits',
      q: 'How would you handle a large model’s context window limit?',
      trap: 'Most people just name a tool: “use RAG” or “switch to a bigger-window model.” The interviewer doesn’t want a tool name; they want to see whether you understand <b>why the limit exists</b> and <b>how to combine strategies for the situation</b>.',
      points: [
        { title: 'Underlying principle', desc: 'Do you know the physical root of the limit: attention has “every token attend to every token,” so compute and memory grow O(n²) with length; positional encoding is only reliable within the trained length; and even inside the window, the middle is often under-used (lost in the middle).' },
        { title: 'Engineering trade-offs', desc: 'How you weigh time / cost / accuracy, e.g. long-context fine-tuning vs. dynamic compression, a bigger window vs. retrieval.' },
        { title: 'Systematic thinking', desc: 'Whether you treat it as a “context-budget management” problem with a multi-stage framework, instead of betting on a single trick.' },
      ],
      core: [
        { h: 'Name the root', d: 'The window has a ceiling mainly because the model was trained on a fixed length and positional encoding is only reliable within that range; attention being O(n²) further makes stuffing more in pricier and slower, with the middle often ignored. So the point isn’t “make it bigger,” it’s <b>managing what gets into the window</b>.' },
        { h: 'Main options + trade-offs', d: 'When it won’t fit: (a) keep only the most relevant / recent (truncation, sliding window); (b) summarize the old stuff; (c) keep it external and use RAG to pull only relevant chunks each time; (d) use memory across sessions. Trade-offs: RAG saves the window but depends on retrieval quality; summaries save space but lose detail; a bigger window is easiest but pricey and still weak in the middle.' },
        { h: 'Wrap up', d: 'In practice it’s <b>a combination chosen by scenario</b> (chat = sliding window + summary + memory; doc-QA = RAG…), treating it as “context-budget management.”' },
      ],
      plus: [
        'How positional-encoding extrapolation / interpolation (RoPE, position interpolation) extends the window, and why naive extrapolation degrades.',
        '“Lost in the middle”: putting key info at the start and end to dodge the middle blind spot.',
        'Architecture level: FlashAttention saves memory and sparse / linear attention lowers the compute order, showing you know the root is attention.',
      ],
      traps: [
        'Naming a single tool (“just use RAG”) and stopping there.',
        'Treating “make the window bigger” as a cure-all, ignoring cost and the middle blind spot.',
        'Describing RAG as “teaching the model to remember”: RAG is <b>lookup</b>, not memory.',
      ],
    },
  },
  ja: {
    "agent-planning": {
      label: "エージェントのプランニング",
      q: "エージェントのプランニング機構について説明してください。",
      trap: "多くの人は「勝手に考えてくれる」としか言いません。面接官が見たいのは<b>プランニングの具体的なやり方と取捨</b>を語れるか（ReAct vs plan-then-execute、いつ再プランニングするか）であって、「エージェントなら勝手に計画する」の一言ではありません。",
      points: [
        { title: "基礎原理", desc: "プランニング＝大きな目標を実行可能な小さいステップに分解し、どう進めるかを決めること：先に完全な計画を立てても、進めながら調整してもよい。" },
        { title: "工学的トレードオフ", desc: "ReAct（考える→実行→観察を逐次）は柔軟だがステップ数が多く遠回りしやすい；plan-then-execute（先に計画を立ててから実行）は token を節約でき追跡しやすいが、計画が一度狂うと全体がずれる。" },
        { title: "体系的な解決", desc: "「再プランニング／エラー回復」を組み込めるか：失敗を観測したら計画を修正し、ステップ数の上限と終了条件を設けて無限ループを防ぐ。" },
      ],
      core: [
        { h: "まず定義する", d: "プランニング＝大きな目標を一連の実行可能なステップに分解し、進め方を組み立てること。<b>先に完全な計画を立てても、進めながら調整してもよく</b>、要点は状況に応じて正しいやり方を選び、間違えたら修正できることです。" },
        { h: "主要な2つ＋取捨", d: "ReAct：考える→実行→観察で逐次進める。柔軟だがステップ数が多く遠回りしがち。plan-then-execute：先に完全な計画を立ててから順に実行する。token を節約でき追跡しやすいが、計画が狂うと全体がずれる。実務では併用が多く、まず大まかに計画し、実行中に ReAct で微調整します。" },
        { h: "安定させる", d: "鍵は<b>再プランニングとエラー回復</b>です：ツールが失敗したり結果が正しくなければ計画を修正する；さらにステップ数の上限と明確な終了条件を設け、無限ループを防ぎます。" },
      ],
      plus: [
        "tree-of-thought／複数経路の探索 vs 単線の ReAct の取捨。",
        "「プランニング」と「実行」を別々のモデルに分ける（強いモデルで計画、安いモデルで実行）。",
        "リフレクション（reflection）：エージェントに自分の軌跡を振り返らせ、失敗から次のラウンドを修正させる。",
      ],
      traps: [
        "「勝手に考えてくれる」としか言えず、ReAct／plan-then-execute の違いを語れない。",
        "終了条件とステップ数の上限を無視し、無限ループに陥る（コスト暴走の原因でもある）。",
        "プランニングを一度きりのものとして語り、「進めながら再プランニングする」に触れない。",
      ],
    },
    "agent-tools": {
      label: "外部ツールの確実な呼び出し",
      q: "外部ツールを確実に呼び出せるエージェントを、どう設計しますか？",
      trap: "「function calling を使う」と答えるだけでは不十分です。面接官が見たいのは<b>呼び出しループ全体をどうフールプルーフにするか</b>：ツールの選択ミス、引数の誤り、ツールのエラー、タイムアウト、どれにも対策が要ります。",
      points: [
        { title: "基礎原理", desc: "モデル自体はツールを「実行」しない。<b>「どのツールを、どの引数で呼ぶか」という構造化された意図を出力するだけ</b>で、実際に実行するのは外部プログラムであり、その結果をモデルに戻す。" },
        { title: "工学的トレードオフ", desc: "モデルに渡すツールが多いほど柔軟になるが、選択を誤りやすく引数も乱れやすい；ツールの説明は簡潔で明確に、数は絞り込むべき。" },
        { title: "体系的な解決", desc: "呼び出しループの全体：ツール選択 → 引数生成 → 検証 → 実行（タイムアウト／リトライ）→ 結果を戻す → 完了かの判定。どの関門にも失敗処理が要る。" },
      ],
      core: [
        { h: "まず仕組みを話す", d: "モデルはツールを実行しません。<b>「どのツールを、どの引数で呼ぶか」という構造化された意図を出力するだけ</b>で、外部プログラムが実行してから結果を戻します。だから信頼性＝「意図が正しいか」＋「実行が安定しているか」です。" },
        { h: "呼び出しループのフールプルーフ", d: "ツール選択（説明は簡潔・数は絞り、選択ミスを防ぐ）→ 引数生成（schema を与え、型を検証）→ 実行（タイムアウト、リトライ、権限のホワイトリスト）→ エラーが出たらエラーメッセージを戻して自己修正させる → 完了の判定。" },
        { h: "取捨とまとめ", d: "ツールは多いほど柔軟だが選択を誤りやすいので、<b>少数精鋭が望ましい</b>；要点は、一度で正しくいくと仮定せず、どの関門でも失敗し得て回復できることです。" },
      ],
      plus: [
        "構造化出力の担保：function calling／JSON schema／制約デコーディング（「JSON を安定して出力する」を参照）。",
        "MCP のような統一プロトコルが、ツール接続をどう標準化するか。",
        "危険な操作（書き込み、決済）には人間の確認やサンドボックス隔離を加える。",
      ],
      traps: [
        "「function calling を使う」と答えるだけで、検証・リトライ・タイムアウトに触れない。",
        "一度に多くのツールを詰め込み、モデルが選択を誤ったり引数を乱す。",
        "ツールがエラーを出すと全体を中断してしまい、エラーを戻して修正させない。",
      ],
    },
    "json-output": {
      label: "JSON を安定して出力",
      q: "大規模モデルに、どうやって JSON 形式を安定して出力させますか？",
      trap: "「prompt で JSON を出力するよう指示する」だけでは保証になりません：モデルは確率的な生成なので、いつでも余計な一文が増えたり括弧が1つ抜けたりし得ます。面接官が見たいのは<b>「お願い」から「保証」へ引き上げる手段</b>です。",
      points: [
        { title: "基礎原理", desc: "モデルは<b>トークンごとの確率的な生成</b>であり、そもそも正しい JSON を保証しない；説明を付けたり、カンマを抜かしたり、途中で切れたりし得る。だから「安定」は prompt への願掛けだけでは足りない。" },
        { title: "工学的トレードオフ", desc: "手段は弱いものから強いものへ：prompt での要求 → function calling／JSON mode → 制約デコーディング（正しい JSON しか生成させない）。強いほど安定するが、特定の API／推論フレームワークに依存し柔軟性は下がる。" },
        { title: "体系的な解決", desc: "検証＋リトライを加える：出力を schema（JSON Schema など）で検証し、失敗したらエラーメッセージを添えてリトライまたは修復し、閉ループにする。" },
      ],
      core: [
        { h: "まず根本を指す", d: "モデルは<b>トークンごとの確率的な生成</b>で、本質的に正しい JSON を保証しません；prompt でお願いするだけでは、いつでも余計な一文が増えたり括弧が抜けたりし得ます。" },
        { h: "手段は弱から強へ", d: "① prompt で明確に要求＋例を与える → ② function calling／JSON mode（API 層での制約）→ ③ 制約デコーディング／grammar（デコード時点で正しい構造しか許さず、最も安定）。後ろほど保証は強いが、特定のフレームワークに縛られます。" },
        { h: "検証の閉ループは必須", d: "どの手を使っても、<b>schema で一度検証する</b>（JSON Schema）。失敗したらエラーを戻してリトライか自動修復し、一度で正しくいくと仮定しないことです。" },
      ],
      plus: [
        "制約デコーディングの原理：各ステップで不正なトークンの確率を 0 に押しつぶす。",
        "Pydantic／zod のような「schema → 検証 → リトライ」のツールチェーン。",
        "温度を下げるのは助けになるが不十分（依然として保証ではなく、乱れにくくなるだけ）。",
      ],
      traps: [
        "prompt で JSON を出力させるだけで、安定したと思い込む。",
        "schema 検証をせず、壊れて初めて下流で破綻する。",
        "JSON mode を 100% の保証と見なす（形式が正しい ≠ 内容が正しい）。",
      ],
    },
    "agent-memory": {
      label: "エージェントの記憶管理",
      q: "エージェントは、どのように記憶管理をしていますか？",
      trap: "「コンテキストウィンドウ」と混同しないこと。ウィンドウは「一度にどれだけ読めるか」、記憶管理は「多くのステップをまたいで、何を手元に残すか」です。面接官は、この2つを区別できるか、そして限られたウィンドウで一貫性をどう保つかを見ています。",
      points: [
        { title: "基礎原理", desc: "モデル自体は<b>ステートレス</b>で、各ステップではそのとき渡された context しか見えない。エージェントの「記憶」＝外部プログラムが「各ステップでどの履歴を戻すか」を決めること。" },
        { title: "工学的トレードオフ", desc: "全部詰める（忠実だがウィンドウが溢れ、高い）vs 要約（場所を節約できるが細部を失う）vs 検索（関連分だけ取り拡張できるが検索品質しだい）。通常は併用する。" },
        { title: "体系的な解決", desc: "階層に分ける：短期（今回の scratchpad／直近の数ステップ）＋長期（会話をまたぐ事実や好み。DB／ベクトルストアに保存し、必要なとき検索で取り戻す）。" },
      ],
      core: [
        { h: "まず切り分ける", d: "モデルは<b>ステートレス</b>で、各ステップではそのときの context しか見ません；記憶は外部が「各ステップでどの履歴を戻すか」を管理するものです。これは「ウィンドウの大きさ」とは別物で、ウィンドウは容量、記憶管理は<b>取捨の戦略</b>です。" },
        { h: "手段＋取捨", d: "ワーキングメモリ（scratchpad、直近のステップ）で一貫性を保つ；長すぎれば要約に圧縮する；さらに古いものや会話をまたぐものは外部（DB／ベクトルストア）に保存し、必要なとき検索で取り戻す。取捨：全部詰めるとウィンドウが溢れ、要約は細部を失い、検索はヒット率しだい。" },
        { h: "階層でまとめる", d: "実務では<b>短期</b>（今回）＋<b>長期</b>（会話をまたぐ事実／好み）に分けます。ウィンドウ予算に制約され、本質は「コンテキスト予算の管理」の一種です。" },
      ],
      plus: [
        "ツール呼び出しの結果は先に要約してから戻し、ウィンドウを埋め尽くさないようにする。",
        "長期記憶は RAG とほぼ同じ技術（ベクトルで保存し、関連度で取り戻す）。",
        "記憶のプライバシーと期限切れ：閲覧・削除でき、古くなった情報を使わないようにする必要がある。",
      ],
      traps: [
        "「記憶管理」と「コンテキストウィンドウ」を同じものとして語る。",
        "すべての履歴を毎ステップに詰め込み、ウィンドウが溢れて高くつく。",
        "記憶を「モデルが覚えた」と説明する（実際は外部が戻しているだけ）。",
      ],
    },
    "agent-eval": {
      label: "エージェント性能の定量化",
      q: "エージェントの性能を、どう定量化しますか？",
      trap: "「答えが正しいかを見る」だけでは不十分です。エージェントは多ステップでツールも使うので、最終的な答えだけを見ると多くを見落とします。面接官は<b>タスク単位＋プロセス単位</b>の評価を語り、さらにコスト／レイテンシも織り込むことを求めます。",
      points: [
        { title: "基礎原理", desc: "エージェントの産物は「一連の行動＋最終結果」なので、評価は分けて考える：結果が正しいか（タスク成功率）と、過程が良いか（軌跡：遠回りしていないか、ツールを正しく使えたか）。" },
        { title: "工学的トレードオフ", desc: "人手評価（正確だが高く遅い）vs 自動評価（速いが自由回答のタスクは評価しにくい）vs LLM-as-judge（拡張できるがバイアスがあり、キャリブレーションが必要）；オフラインのテストセット vs オンラインの実トラフィック。" },
        { title: "体系的な解決", desc: "一式を組む：固定のタスクテストセット → 成功率／ツール正解率／ステップ数／コスト／レイテンシを計測 → 失敗事例を拾って改善し、反復の閉ループにする。" },
      ],
      core: [
        { h: "まず2層に分ける", d: "エージェントは多ステップ＋ツール利用なので、<b>最終的な答えだけを見るのは不十分</b>です：「タスク成功率」（結果が正しいか）＋「軌跡の品質」（過程で遠回りしていないか、ツールを正しく選び使えたか）を計測します。" },
        { h: "何を計測するか", d: "タスク成功率、ツール呼び出しの正解率、平均ステップ数、コスト（token）、レイテンシ。自由回答のタスクは自動評価が難しく LLM-as-judge をよく使いますが、<b>バイアスがありキャリブレーションが必要</b>で、人手の抜き取り検査も残します。" },
        { h: "システムにする", d: "固定の<b>タスクテストセット</b>を作って指標を回す → 失敗事例を拾って分析 → 改善 → 回帰テスト。テストセットがなければ、直しても感覚頼みになります。" },
      ],
      plus: [
        "軌跡評価：理想的なステップ列と突き合わせるか、重要な中間状態を確認する。",
        "オンライン（A/B、実際の成功率、ユーザーフィードバック）vs オフライン（固定セットでの回帰）。",
        "LLM-as-judge のバイアス（位置バイアス、冗長さを好む傾向）とキャリブレーション手法。",
      ],
      traps: [
        "最終的な答えの正誤だけを見て、過程／軌跡を評価しない。",
        "固定のテストセットがなく、直しても良くなったか悪くなったか分からない。",
        "LLM-as-judge を完全に信じ、バイアスがあることを知らない。",
      ],
    },
    "agent-cost": {
      label: "エージェントのコスト制御",
      q: "エージェントのコストが暴走しないよう、どう抑えますか？",
      trap: "「もう少し安いモデルを使う」だけでは根源を見落とします。暴走の元は<b>多ステップ × context の逐次的な累積</b>：ステップが1つ増えるたびに、前の履歴の token をまた計算し直します。面接官は、この累積効果と対策を指摘することを求めます。",
      points: [
        { title: "基礎原理", desc: "エージェントのコスト＝ステップ数 × 各ステップの token。各ステップで前の履歴を再び詰めるため、<b>token はステップ数とともに累積して増える</b>；いったん堂々巡りや無限リトライに陥ると、コストは爆発する。" },
        { title: "工学的トレードオフ", desc: "コスト削減 vs 品質維持：安いモデルは節約になるが、間違えてやり直すとかえって高くつく；ステップ数の上限は節約になるが、タスクを早々に諦めてしまうこともある。" },
        { title: "体系的な解決", desc: "複数を同時に：ステップ数の上限＋明確な終了、履歴を要約で圧縮、繰り返す部分問題をキャッシュ、モデルの振り分け（簡単なステップは安いモデル）、早期停止。" },
      ],
      core: [
        { h: "まず根源を指す", d: "エージェントのコスト＝<b>ステップ数 × 各ステップの token</b>。各ステップで前の履歴をまた計算するので、token はステップ数とともに<b>累積</b>して増えます；堂々巡りや無限リトライはコスト爆発そのものです。" },
        { h: "対策の組み合わせ", d: "① ステップ数の上限＋明確な終了条件（堂々巡りを防ぐ）；② 履歴を要約で圧縮（毎ステップ全部詰めない）；③ 繰り返す部分問題をキャッシュ；④ モデルの振り分け（簡単なステップは安いモデル、難しいものだけ強いモデル）；⑤ 早期停止。" },
        { h: "取捨でまとめる", d: "ひたすら安いモデルを使えばよいわけではありません：<b>間違えてやり直すとかえって高くつく</b>；要点は「使いどころにコストをかける」＋累積の暴走を防ぐことです。" },
      ],
      plus: [
        "prompt caching：固定の接頭辞（システムプロンプト、ツールの説明）をキャッシュし、再計算を省く。",
        "「プランニング」と「実行」をモデルで分ける（強いモデルで少量の計画、安いモデルで大量の実行）。",
        "タスクごとにコスト上限を設ける（budget guard）。超えたら停止する。",
      ],
      traps: [
        "「安いモデルに替える」しか思いつかず、token の累積と堂々巡りを無視する。",
        "ステップ数の上限がなく、エージェントが無限にリトライしてコストを浪費する。",
        "毎ステップで完全な履歴を詰め直し、要約しない。",
      ],
    },
    "rag-documents": {
      label: "RAG での Word／PDF 処理",
      q: "RAG は Word や PDF のような文書を、どう処理しますか？",
      trap: "「ファイルを放り込めばよい」と思わないこと。RAG は Word／PDF という「ファイル」を読めず、扱えるのはプレーンテキスト＋ベクトルだけです；その間の<b>解析 → チャンク分割 → ベクトル化</b>こそ成否の鍵で、とくに表・スキャン文書・多段組のレイアウトが問題になります。",
      points: [
        { title: "基礎原理", desc: "RAG が保存するのは「テキスト断片のベクトル」であり、ファイルそのものではない。だからどの形式もまず<b>プレーンテキストに抽出</b>（PDF／Word → text）してはじめて、チャンク分割や検索の話になる。" },
        { title: "工学的トレードオフ", desc: "解析の深さの取捨：テキストだけ抽出（速いがレイアウト／表を失う）vs レイアウト認識解析（見出し／表／段組を保持するが遅く、ツールが要る）；スキャン PDF はさらに先に OCR が必要。" },
        { title: "体系的な解決", desc: "パイプライン全体：解析（OCR／表を含む）→ クリーニング → 構造に沿ったチャンク分割 → ベクトル化 → ベクトルストアに保存。どの関門の品質も、検索品質を直接左右する。" },
      ],
      core: [
        { h: "まず誤解を解く", d: "RAG が保存するのは<b>テキスト断片のベクトル</b>で、Word／PDF ファイルそのものではありません。だから第一歩は必ずファイルを<b>プレーンテキストに抽出</b>することで、「形式の問題」は実は「解析の問題」です。" },
        { h: "解析の取捨", d: "普通のテキストはそのまま抽出すればよい；ただし PDF／Word には<b>表・多段組・見出しの階層</b>がよくあり、ただ抽出すると一塊につぶれてしまうので、レイアウト認識解析で構造を保つ必要があります；<b>スキャン文書はテキスト層がないので、先に OCR</b>。解析が粗悪だと、後段がいくら強くても無駄です。" },
        { h: "パイプラインに戻す", d: "テキストを抽出したら通常どおり：クリーニング → <b>構造に沿ったチャンク分割</b>（表や段落を無理に断ち切らない）→ ベクトル化 → 保存。文書解析の品質＝RAG 品質の上限です。" },
      ],
      plus: [
        "表／図は markdown の表や説明文に変換する。そうしないとベクトル化後に意味が乱れる。",
        "メタデータ（出典のファイル名、ページ番号、章節）を保持し、引用や絞り込みをしやすくする。",
        "大きなファイルのチャンク分割は構造を尊重する（見出し／段落単位）。杓子定規な固定長ではない。",
      ],
      traps: [
        "「ファイルを放り込めば動く」と思い込み、解析の関門を無視する。",
        "スキャン PDF に OCR をかけず、検索できるテキストが存在しないことになる。",
        "表を普通のテキストとして無理に抽出し、行と列がつぶれて意味が壊れる。",
      ],
    },
    "rag-retrieval": {
      label: "RAG 検索戦略の設計",
      q: "RAG の検索戦略を、どう設計しますか？",
      trap: "「ベクトルの類似度を計算して最も関連する top-k を取る」だけでは、いちばん素朴な版です。面接官が見たいのは<b>チャンク分割、ハイブリッド検索、リランク、クエリ書き換え</b>といった、検索を本当に精確にする手段と取捨を理解しているかです。",
      points: [
        { title: "基礎原理", desc: "検索品質＝「取り戻した断片が正しいか」であり、チャンクをどう切るか・どのベクトルを使うか・どう比較するか・いくつ取るかにずっと左右される。一つでも間違えれば、LLM がいくら強くても答えを誤る（garbage in）。" },
        { title: "工学的トレードオフ", desc: "ベクトル検索のみ（意味は分かるがキーワードを取りこぼす）vs キーワード検索（精確だが同義語を理解しない）→ ハイブリッド検索は両立できるがより複雑；top-k が大きいと再現率は上がるがウィンドウを溢れさせ、ノイズも多い。" },
        { title: "体系的な解決", desc: "調整可能なパイプライン：チャンク分割 → ベクトル化 →（ハイブリッド）検索 → リランク（rerank）→ top-k を取る → prompt に入れる。どの関門も計測でき、調整できる。" },
      ],
      core: [
        { h: "まず成否の要を定める", d: "検索品質が RAG の上限を決めます（間違った断片を取れば、LLM がいくら強くても答えを誤る）。それは<b>パイプライン全体</b>に依存し、単一の「類似度」ではありません。" },
        { h: "鍵となる手段＋取捨", d: "① <b>チャンク分割</b>：大きすぎると収まらず雑多になり、小さすぎると意味を断ち切る；② <b>ハイブリッド検索</b>：ベクトル（意味が分かる）＋キーワード（固有名詞を捉える）で補い合う；③ <b>リランク（rerank）</b>：まず粗く再現してから精密に並べ替え、精度が大きく上がる；④ <b>top-k</b>：大きいと再現率は上がるがノイズが増えウィンドウを占める。" },
        { h: "応用とまとめ", d: "さらに上には<b>クエリの書き換え／拡張</b>（口語の質問を検索しやすいクエリに直す）、メタデータでの絞り込みがあります。要諦は<b>再現率 vs 適合率 vs コスト</b>のバランスで、どの関門も計測して反復できることです。" },
      ],
      plus: [
        "クエリの書き換え／拡張：multi-query は LLM に複数のクエリのバリエーションを生成させる；HyDE は LLM にまず「仮の答え」を書かせ、そのベクトルで検索する。",
        "メタデータ／絞り込み：先に条件で範囲を狭めてから、ベクトル比較を行う。",
        "検索そのものを単独で評価する（再現率、ヒット率）。最終的な答えだけを見ない。",
      ],
      traps: [
        "「ベクトル類似度の top-k」しか知らず、リランクやハイブリッド検索を知らない。",
        "チャンク分割に杓子定規な固定長を使い、意味を断ち切ったりノイズを混ぜたりする。",
        "最終的な答えだけを評価し、検索が悪いのか生成が悪いのか区別できない。",
      ],
    },
    "hallucination": {
      label: "ハルシネーションはなぜ起きるか",
      q: "大規模モデルはなぜハルシネーションを起こすのですか？完全になくせますか？",
      trap: "ハルシネーションを「bug」と捉えないこと。プログラムの誤りではなく、モデルの動作の仕方が生む<b>副作用</b>です：最も可能性の高い語を推測しているのであって、事実を調べているのではありません。面接官は、原因を語り、なぜ「根治」できず低減しかできないのかを理解しているかを求めます。",
      points: [
        { title: "基礎原理", desc: "モデルは<b>次に最ももっともらしい語を推測する</b>のであって、データベースを調べているのではない；「知らない」ときも立ち止まって知らないと言わず、語感が最も自然な、しかし嘘かもしれない内容を生成し続ける。" },
        { title: "工学的トレードオフ", desc: "ハルシネーションを抑えるには「流暢さ／答える積極性」を多少犠牲にする必要がある：出典の強制、不確かなら回答を拒否させると、モデルは保守的になり、本来答えるべきことも答えないことがある。" },
        { title: "体系的な解決", desc: "低減（消去ではない）の組み合わせ：RAG で事実の根拠を与える＋出典の引用を求める＋出力の検証／ファクトチェック＋「知らない」と言えるようにする。" },
      ],
      core: [
        { h: "まず誤解を解く", d: "ハルシネーションは bug ではなく、<b>動作の仕方が生む副作用</b>です：モデルは<b>最も可能性の高い語を推測しているのであって、事実を調べているのではありません</b>；知らないときもブレーキをかけず、語感は自然でも嘘かもしれない内容を生成します。" },
        { h: "なぜ根治できないか", d: "原因は本質的なものです（確率的な生成＋知識にカットオフがある＋真偽を判断する仕組みが内蔵されていない）。だから<b>低減できても、ゼロにはできません</b>。" },
        { h: "どう低減するか", d: "組み合わせ技：RAG で事実の根拠を与え、検証できるよう<b>出典の引用</b>を求め、重要な出力には検証／ファクトチェックを行い、さらに<b>「知らない」と言える</b>ようにします。" },
      ],
      plus: [
        "温度を下げるのは助けになるが不十分（依然として自信たっぷりに間違える）。",
        "検索を誤ればハルシネーションは変わらず起きる：RAG は低減するだけで消しはしない。",
        "専門的／マイナーな問いほどハルシネーションを起こしやすい（学習データが疎）。",
      ],
      traps: [
        "ハルシネーションを「直せる bug」と捉える。",
        "「RAG をつなげばハルシネーションは起きない」と思い込む。",
        "「モデルが自信満々」を「答えが信頼できる」と取り違える。",
      ],
    },
    'context-window': {
      label: 'コンテキストウィンドウの限界',
      q: '大規模モデルのコンテキストウィンドウの限界に、どう対処しますか？',
      trap: '多くの人はツール名を1つ挙げて終わりです（「RAG を使う」「もっと大きなウィンドウのモデルに替える」）。面接官が見たいのはツール名ではなく、<b>なぜこの限界があるのか</b>、そして<b>場面に応じてどう組み合わせて取捨するか</b>です。',
      points: [
        { title: '基礎原理', desc: '限界の物理的な根っこを知っているか：注意は「各トークンが全トークンを見る」ため、計算量とメモリが長さに対して O(n²) で増える；位置エンコーディングは学習した長さの範囲でしか信頼できない；ウィンドウに収めても中盤は活かされにくい（lost in the middle）。' },
        { title: '工学的トレードオフ', desc: '時間／コスト／精度をどう取捨するか。例：長コンテキストのファインチューニング vs 動的圧縮、より大きなウィンドウ vs 検索。' },
        { title: '体系的な解決', desc: '単発の技に賭けるのではなく、「コンテキスト予算の管理」問題として多段階のフレームワークで扱えるか。' },
      ],
      core: [
        { h: '根っこを指す', d: 'ウィンドウに上限があるのは、主にモデルが固定長で学習され、位置エンコーディングもその範囲内でしか信頼できないから。さらに注意が O(n²) なので、詰めるほど高く遅くなり中盤も無視されがち。だから要点は「大きくする」ことではなく、<b>何をウィンドウに入れるかを管理する</b>ことです。' },
        { h: '主な手法＋取捨', d: '収まらないなら →（a）最も関連する／最近のものだけ残す（切り捨て・スライディングウィンドウ）；（b）古い分は要約に圧縮；（c）外部に置いて RAG で毎回関連する断片だけ取る；（d）会話をまたぐなら記憶を使う。取捨：RAG はウィンドウを節約できるが検索品質しだい、要約は場所を節約できるが細部を失う、大きなウィンドウは楽だが高く中盤は依然弱い。' },
        { h: 'まとめ', d: '実務では<b>組み合わせ＋場面で選ぶ</b>（チャット＝スライディングウィンドウ＋要約＋記憶、文書QA＝RAG…）、「コンテキスト予算の管理」として扱います。' },
      ],
      plus: [
        '位置エンコーディングの外挿／内挿（RoPE、position interpolation）でウィンドウをどう広げるか、なぜ素朴な外挿は劣化するか。',
        '「lost in the middle」：重要情報を先頭と末尾に置き、中盤の死角を避ける配置の工夫。',
        'アーキテクチャ層：FlashAttention はメモリを節約し、疎／線形注意は計算量のオーダーを下げる。根が注意にあると分かっていることを示す。',
      ],
      traps: [
        'ツールを1つ挙げて終わる（「RAG を使う」で止まる）。',
        '「ウィンドウを大きくする」を万能薬扱いし、コストと中盤の死角を無視する。',
        'RAG を「モデルに覚えさせる」と説明する（RAG は<b>検索</b>であって記憶ではない）。',
      ],
    },
  },
};

// 題庫顯示順序（分類內依此排；Agent 走 arc：規劃→工具→JSON→記憶→量化→成本）
export const IV_ORDER = [
  'agent-planning', 'agent-tools', 'json-output', 'agent-memory', 'agent-eval', 'agent-cost',
  'context-window',
  'rag-documents', 'rag-retrieval',
  'hallucination',
];

/** 依分類 key 取該類題目 id 陣列（依 IV_ORDER 排序） */
export function ivByCat(catKey) {
  return IV_ORDER.filter((id) => INTERVIEWS[id]?.cat === catKey);
}

/** 分類名稱（在地化，缺就回中文） */
export function catNameOf(key, locale = 'zh') {
  return (locale !== 'zh' && CAT_TR[locale]?.[key]) || IV_CATS.find((c) => c.key === key)?.t || '';
}

/** 側邊短標籤（在地化） */
export function ivLabel(id, locale = 'zh') {
  return (locale !== 'zh' && INT_TR[locale]?.[id]?.label) || INTERVIEWS[id]?.label || '';
}

/** 取一題的在地化內容（欄位逐一 fallback 回中文；points 的 icon 沿用 base） */
export function ivOf(id, locale = 'zh') {
  const base = INTERVIEWS[id];
  if (!base) return base;
  const tr = locale !== 'zh' ? INT_TR[locale]?.[id] : null;
  if (!tr) return base;
  return {
    ...base,
    label: tr.label ?? base.label,
    q: tr.q ?? base.q,
    trap: tr.trap ?? base.trap,
    points: base.points.map((p, i) => ({
      icon: p.icon,
      title: tr.points?.[i]?.title ?? p.title,
      desc: tr.points?.[i]?.desc ?? p.desc,
    })),
    core: base.core.map((c, i) => ({ h: tr.core?.[i]?.h ?? c.h, d: tr.core?.[i]?.d ?? c.d })),
    plus: tr.plus ?? base.plus,
    traps: tr.traps ?? base.traps,
  };
}
