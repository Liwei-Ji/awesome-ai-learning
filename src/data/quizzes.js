/* ============================================================
   各挑戰題的「判斷題」：讀完示範答案後，換你判斷哪個回答最到位。
   提示文字用 i18n 的 iv.quizPrompt（固定），此處只放選項。
   zh 每個選項帶 ok（哪個是正解）；en/ja 只放翻譯的 t/why，ok 由 zh 提供。
   quizFor 合併：ok 取 zh、文字取該語言（缺則回退 zh）。新增題目改這裡即可。
   ============================================================ */
export const QUIZZES = {
  "vector-search": {
    "en": [
      { "t": "It works like Ctrl+F, matching identical words in the documents by keyword.", "why": "That's old keyword search; modern RAG retrieval compares semantic closeness, so it finds matches even when the words differ." },
      { "t": "It turns both the question and the documents into vectors and finds the few closest in meaning — that's semantic search.", "why": "Correct: embeddings put meaning into coordinates, nearest-neighbor finds the close ones, stored in a vector database." },
      { "t": "It dumps all the documents into the model and lets the model read everything and pick.", "why": "The document volume far exceeds the context window, so it can't all fit; that's exactly why vector search narrows it down first." }
    ],
    "ja": [
      { "t": "Ctrl+F のように、文書内の同じ語をキーワードで照合する。", "why": "それは旧来のキーワード検索。現代の RAG 検索は意味的な近さを比べ、語が違っても見つける。" },
      { "t": "質問も文書もベクトルにし、意味が最も近い数節を探す。つまり意味検索。", "why": "正解：embedding が意味を座標にし、最近傍で近いものを探し、ベクトルデータベースに保存する。" },
      { "t": "全文書をモデルに投入し、モデルが全部読んで選ぶ。", "why": "文書量はコンテキストウィンドウを遥かに超え、全部は載らない。だからこそ先にベクトル検索で絞る。" }
    ],
    "zh": [
      { "t": "它像 Ctrl+F 一樣，用關鍵字在文件裡比對相同的字。", "ok": false, "why": "那是舊式關鍵字搜尋；現代 RAG 檢索比的是語意相近，字不同、意思近也找得到。" },
      { "t": "把問題和文件都變成向量，找意思最接近（距離最近）的幾段，也就是語意搜尋。", "ok": true, "why": "正解：靠 embedding 把語意變成座標，用最近鄰找相近的，存在向量資料庫裡。" },
      { "t": "它把整批文件全部丟進模型，讓模型自己讀完再挑。", "ok": false, "why": "文件量遠超 context window，不可能全塞；正因如此才要先用向量搜尋縮小範圍。" }
    ]
  },
  "quantization": {
    "en": [
      { "t": "Because it's a completely different, natively small model, unrelated to the big one.", "why": "It's usually a quantized version of the same model: lowering weight precision makes it smaller and faster, not a different model." },
      { "t": "Through quantization: lowering the numeric precision of the weights, which cuts size and boosts speed while quality drops only a little.", "why": "Correct: quantization trades a little accuracy for size and speed, so it fits consumer hardware." },
      { "t": "It uploads the model to the phone, which then calls back to the maker's big GPU to compute.", "why": "That's actually still using a cloud API, not running locally; true local runs rely on the small footprint of a quantized model." }
    ],
    "ja": [
      { "t": "それは全く別の、元から小さいモデルで、大きいモデルとは無関係だから。", "why": "多くは同じモデルの量子化版：重みの精度を下げて小さく速くしたもので、別モデルではない。" },
      { "t": "量子化による：重みの数値精度を下げ、サイズを大きく減らし速くする。品質は少し落ちるだけ。", "why": "正解：量子化はわずかな正確さをサイズと速度に交換するので、消費者向けハードに載る。" },
      { "t": "モデルをスマホにアップし、スマホが原メーカーの大 GPU に繋いで計算させる。", "why": "それは実際にはクラウド API の利用でローカル実行ではない。真のローカル実行は量子化された小さな容量に頼る。" }
    ],
    "zh": [
      { "t": "因為那是完全不同、天生就小的模型，跟大模型沒關係。", "ok": false, "why": "多半是同一個模型的量化版：降低權重精度讓它變小變快，不是另一個模型。" },
      { "t": "靠量化：把權重數字的精度降低，體積大減、速度變快，品質只掉一點。", "ok": true, "why": "正解：量化用一點準確度換體積與速度，所以塞得進消費級硬體。" },
      { "t": "把模型上傳到手機，手機再連回原廠的大 GPU 幫忙算。", "ok": false, "why": "那其實還是用雲端 API，不算在本機跑；真正本機跑靠的是量化後的小體積模型。" }
    ]
  },
  "outline-workflow": {
    "en": [
      { "t": "Just tell it \"write a complete 3000-word report,\" one shot is the least effort.", "why": "Long content in one shot tends to ramble, drift, and contradict itself, and you still have to edit it end to end." },
      { "t": "Ask for an outline first; review and adjust the structure, then expand section by section, giving direction each passage before moving on.", "why": "It separates structure from wording and lets you steer at the cheapest stage; each step is small, easy to review and roll back." },
      { "t": "Have it expand every section at once so you see the whole thing fastest.", "why": "Expanding everything at once blows up the length and is hard to review, and one wrong direction dooms the whole piece; section by section is what lets you steer." }
    ],
    "ja": [
      { "t": "「3000 字の完全な報告を書いて」と頼み、一発で出すのが一番楽。", "why": "一度に生成した長文は散漫・脱線・矛盾しがちで、結局端から端まで直すことになる。" },
      { "t": "まず大綱を求め、構成を確認・調整してから一節ずつ展開し、各段落で方向を与えて進む。", "why": "構成と言葉を分離し、最も安い段階で方向を正せる。各ステップは小さく、確認も差し戻しも容易。" },
      { "t": "全節を一度に展開させ、全体を最速で見る。", "why": "一度に全展開は長さが膨れて確認しづらく、方向が一つ狂えば全体が狂う。一節ずつが舵取りを可能にする。" }
    ],
    "zh": [
      { "t": "直接叫它「寫一篇 3000 字的完整報告」，一次到位最省事。", "ok": false, "why": "一次生成長文容易發散、離題、前後不一，你還得從頭改到尾。" },
      { "t": "先只要大綱，審過、調整結構後，再一節一節展開，每段給方向再往下。", "ok": true, "why": "把結構與文字分開，在最便宜的大綱階段就把關方向；每步小、好審、好退。" },
      { "t": "讓它一次展開所有章節，這樣最快看到全貌。", "ok": false, "why": "全部一次展開長度爆掉、難審，且方向一歪就整篇一起歪；逐節展開才好把關。" }
    ]
  },
  "manage-context": {
    "en": [
      { "t": "Keeping one continuous chat is best — AI fully remembers everything ever said in it.", "why": "The model is stateless and the context window is finite; more stuffed in is slower and pricier, and past the limit the oldest gets dropped — not “remembers all of it.”" },
      { "t": "Periodically ask it to summarize the key points, keep important decisions externally, and start a fresh chat for unrelated tasks.", "why": "That’s the core of managing a long chat: anchor summaries, externalized key facts, and clean context boundaries." },
      { "t": "If the chat gets slow and dull, the model got dumber — just switch to a bigger model.", "why": "Usually the context is just too long and dirty, not the model; a fresh chat with a pasted summary typically fixes it right away." }
    ],
    "ja": [
      { "t": "一つの会話を続けるのが最良。AI は話した内容をすべて完全に覚えている。", "why": "モデルは無状態でコンテキストウィンドウは有限。詰めるほど遅く高く、上限を超えれば古いものが落ちる——「全部覚えている」ではない。" },
      { "t": "定期的に要点を要約させ、重要な決定は外部に保存し、無関係なタスクは新しい会話で始める。", "why": "これが長い会話管理の核心：アンカー要約、外部化した重要事実、きれいな文脈の区切り。" },
      { "t": "会話が遅く鈍くなったらモデルが劣化した証拠。大きいモデルに替えればよい。", "why": "多くは文脈が長く汚れているだけでモデルのせいではない。新しい会話に要約を貼ると大抵すぐ直る。" }
    ],
    "zh": [
      { "t": "一直用同一條對話接下去最好，AI 會完整記得所有講過的內容。", "ok": false, "why": "模型無狀態、context window 有限，塞越多越慢越貴，超過還會截掉最舊的——不是「都記得」。" },
      { "t": "適時要它總結目前重點、把關鍵決定另外存起來，不相干的新任務就開新對話。", "ok": true, "why": "這正是管理長對話的核心：做錨點總結、外存關鍵事實、切乾淨脈絡。" },
      { "t": "對話變慢變鈍，代表模型變笨了，換更大的模型就好。", "ok": false, "why": "多半是脈絡太長太髒，不是模型變笨；開新對話、貼上總結通常立刻改善。" }
    ]
  },
  "sycophancy": {
    "en": [
      { "t": "“Great idea” means my direction got neutral validation, so I can proceed confidently.", "why": "That’s usually sycophancy: it’s trained to please you, so praise is often learned politeness, not judgment." },
      { "t": "Reframe the question neutrally and ask it to name the three biggest risks and the opposing case, then decide.", "why": "Neutral framing plus actively asking for the other side gets around its urge to agree and forces useful feedback." },
      { "t": "Its tone is very confident, so the answer is probably right.", "why": "Confident tone has nothing to do with correctness; high confidence ≠ correct, which is exactly the trap." }
    ],
    "ja": [
      { "t": "「素晴らしいアイデア」は中立的な承認なので、安心して進めてよい。", "why": "多くは sycophancy。喜ばせるよう訓練されており、称賛は判断でなく習得した礼儀のことが多い。" },
      { "t": "問い方を中立にし、最大のリスク三つと反対論を挙げさせてから判断する。", "why": "中立な問い方と反対側の要求で、同調の傾向を回避し有用な回答を引き出せる。" },
      { "t": "口調が自信たっぷりだから、答えは正しいはず。", "why": "自信のある口調は正しさと無関係。高い自信≠正確——まさにそこが罠。" }
    ],
    "zh": [
      { "t": "AI 說「很棒的想法」，代表我的方向獲得中立肯定，可以放心推進。", "ok": false, "why": "那多半是 sycophancy：它被訓練成討你喜歡，稱讚常是習得的禮貌，不是判斷。" },
      { "t": "把問法改成中立，甚至主動要它挑三個最大風險與反方論點，再據此判斷。", "ok": true, "why": "中立＋主動要反方，能繞過它的附和傾向，逼出真正有用的回饋。" },
      { "t": "它語氣很篤定，所以答案應該是對的。", "ok": false, "why": "語氣篤定和正確與否無關；高信心 ≠ 正確，這正是要小心的地方。" }
    ]
  },
  "honest-feedback": {
    "en": [
      { "t": "Just ask “my plan’s fine, right?” — if it says yes, there’s no big problem.", "why": "A closed, approval-seeking question only gets agreement; “fine, right?” almost guarantees a “yes.”" },
      { "t": "Have it play a harsh critic, list the three most likely failure causes, and test it on a flaw you left in on purpose.", "why": "Designing it to argue against you, plus verifying with a known flaw, is what gets real critique." },
      { "t": "Just write “please be honest” a few times in the prompt and it’ll tell the truth.", "why": "Repeating “be honest” does little; what works is neutral framing, a critic role, and separating ideation from judgment." }
    ],
    "ja": [
      { "t": "「この案で大丈夫ですよね？」と直接聞き、はいと言えば問題なし。", "why": "閉じた・同意を求める問い方は同調しか得られない。「ですよね？」はほぼ「はい」を招く。" },
      { "t": "辛口の批判役を演じさせ、最も失敗しそうな原因を三つ挙げさせ、わざと残した欠陥を見抜けるか試す。", "why": "反対させる設計と既知の欠陥での検証こそ、本当の批判を引き出す。" },
      { "t": "プロンプトに「必ず正直に」と何度も書けば真実を言う。", "why": "「正直に」と唱えても効果は限定的。効くのは中立な問い方、批判役の指定、発想と評価の分離。" }
    ],
    "zh": [
      { "t": "直接問「我這個方案還可以吧？」，如果它說可以就代表沒大問題。", "ok": false, "why": "封閉、求認同的問法只會拿到附和；「還可以吧」幾乎注定得到「可以」。" },
      { "t": "要它扮演挑剔的對手，列出三個最可能失敗的原因，並用一個你故意留的漏洞測試它抓不抓得到。", "ok": true, "why": "設計成「逼它反對」＋用已知漏洞驗證，才拿得到真正的批評。" },
      { "t": "在提示裡多寫幾次「請務必誠實」，它就會給真話。", "ok": false, "why": "光喊「誠實」效果有限；真正有效的是中立問法、指定反方角色、把發想與評斷分開。" }
    ]
  },
  "eval-benchmark": {
    "en": [
      { "t": "The higher a model's benchmark score, the better it will perform on any task you give it.", "why": "Strong at math does not mean strong at your customer-service tone; the total score also hides the subcategory you care about." },
      { "t": "The score is only a first-pass filter: there may be question-set leakage or task mismatch, so the final call should use a blind test on your own real cases.", "why": "A benchmark measures that particular set, not necessarily your scenario, and popular question sets have often already leaked into training." },
      { "t": "How high the score is comes down mainly to the model's parameter count and has little to do with the question set's content.", "why": "Models of the same size can still score very differently; what matters is whether the question set leaked and whether it fits your task." }
    ],
    "ja": [
      { "t": "benchmark スコアが高いモデルほど、どんなタスクでも良い成績を出す。", "why": "数学が得意でも、あなたのカスタマーサポートの語り口が得意とは限らない；総合スコアはあなたが気にするサブカテゴリも覆い隠す。" },
      { "t": "スコアは一次スクリーニングにすぎない：問題集の漏洩やタスク不一致があり得るので、最終的には自分の実ケースでブラインドテストをする。", "why": "benchmark が測るのはその問題集であって、必ずしもあなたのシナリオではなく、人気の問題集は訓練データにすでに漏れていることも多い。" },
      { "t": "スコアの高低は主にモデルのパラメータ数で決まり、問題集の内容とはあまり関係ない。", "why": "同じサイズのモデルでもスコアは大きく異なることがあり、鍵となるのは問題集が漏洩しているか、あなたのタスクに合っているかだ。" }
    ],
    "zh": [
      { "t": "跑分越高的模型，拿到任何任務上都會表現越好。", "ok": false, "why": "強在數學不代表強在你的客服語氣；總分也會掩蓋你在意的子類。" },
      { "t": "分數只是初篩：可能有題庫洩漏或任務不合，最終要用你自己的真實案例盲測。", "ok": true, "why": "benchmark 測的是那套題，未必是你的場景，熱門題庫還常已洩漏進訓練。" },
      { "t": "分數高低主要由模型參數量決定，跟題庫內容關係不大。", "ok": false, "why": "同樣大小的模型分數也能差很多，關鍵在題庫是否洩漏、是否貼合你的任務。" }
    ]
  },
  "eval-llm-judge": {
    "en": [
      { "t": "Yes, but you must calibrate: the judge has biases such as favoring length and position, so first align it with human annotations and spot-check key decisions afterward.", "why": "An LLM judge is fast and scalable, but it has its own biases, so it is only trustworthy once calibrated." },
      { "t": "An LLM judge has no stance, so the scores it produces are objective and neutral.", "why": "It favors long answers, favors the option that appears first, and favors its own style, so it is not neutral." },
      { "t": "Letting a model judge its own output is the most accurate, because it understands its own intent best.", "why": "A model often goes easy on its own output, so self-evaluation actually skews high." }
    ],
    "ja": [
      { "t": "できる、ただし較正が必要：評価者には長さや位置などへの偏りがあるので、まず人手のアノテーションと整合させ、重要な判断は抽出チェックする。", "why": "LLM 評価者は速くスケールもするが、自身に偏りがあるので、較正して初めて信頼できる。" },
      { "t": "LLM 評価者には立場がないので、出すスコアは客観的で中立だ。", "why": "長い回答を好み、先に出てくる選択肢を好み、自分と同じスタイルを好むので、中立ではない。" },
      { "t": "モデルに自分の出力を評価させるのが最も正確だ、自分の意図を一番よく分かっているから。", "why": "モデルは自分の出力に甘くなりがちで、自己評価はむしろ高めに偏る。" }
    ],
    "zh": [
      { "t": "可以，但要校準：評審有偏長、偏位置等偏誤，先和人工標註對齊、關鍵決策再抽樣複核。", "ok": true, "why": "LLM 評審快又可規模化，但自身有偏誤，校準過才可信。" },
      { "t": "LLM 評審沒有立場，打出來的分數是客觀中立的。", "ok": false, "why": "它會偏長答案、偏先出現的選項、偏自家風格，並不中立。" },
      { "t": "讓模型評自己的輸出最準，因為它最懂自己的意圖。", "ok": false, "why": "模型對自己的輸出常手軟，自評反而偏高。" }
    ]
  },
  "eval-set": {
    "en": [
      { "t": "Using a public benchmark as your own eval set is the most convenient and the most standardized.", "why": "A public question set may already have leaked into training and may not fit your task, giving inflated scores." },
      { "t": "Just grab a few questions and test; as long as the general direction is right, there is no need to design it deliberately.", "why": "The sample is too small so the conclusions are unstable, and you also cannot see the weaknesses across different subcategories." },
      { "t": "It should represent the real distribution, have a correct answer or rubric for each question, and be separated from the training data to prevent leakage.", "why": "Coverage, a standard, and cleanliness: only when all three are in place can you measure accurately." }
    ],
    "ja": [
      { "t": "公開の benchmark を自分の評価用問題集にするのが、最も手間がかからず標準的だ。", "why": "公開の問題集は訓練データにすでに漏れている可能性があり、あなたのタスクにも合わず、スコアが水増しになる。" },
      { "t": "適当に数問取ってテストすればよく、大まかな方向が合っていればいい、わざわざ設計する必要はない。", "why": "サンプルが少なすぎて結論が不安定になり、異なるサブカテゴリの弱点も見えない。" },
      { "t": "実際の分布を代表し、各問に正解か基準があり、訓練データと分離して漏洩を防げるものであるべき。", "why": "カバレッジ、基準がある、クリーン、この3つがそろって初めて正確に測れる。" }
    ],
    "zh": [
      { "t": "拿公開 benchmark 當自己的評估題庫最省事又標準。", "ok": false, "why": "公開題庫可能已洩漏進訓練、又不貼合你的任務，虛高。" },
      { "t": "隨手抓幾題測一下，大方向對就行，不用刻意設計。", "ok": false, "why": "樣本太小結論不穩，也看不出不同子類的弱點。" },
      { "t": "要能代表真實分佈、每題有正解或準則、且與訓練資料分離防洩漏。", "ok": true, "why": "覆蓋、有標準、乾淨，三者到位才量得準。" }
    ]
  },
  "eval-offline-online": {
    "en": [
      { "t": "Testing with the offline question set is enough; online A/B is too much hassle and can be skipped.", "why": "There is a gap between the question set and real usage, so offline testing alone will miss real-world problems." },
      { "t": "The two are complementary: first the offline question set blocks regressions, then a small-traffic A/B looks at real metrics and guardrail metrics.", "why": "Offline is fast and safe but distorted, online is real but slow; chaining them together is what makes it solid." },
      { "t": "In A/B, as long as the primary metric wins you can roll out to everyone, and latency and cost do not matter.", "why": "Without guardrail metrics, the primary metric may win while cost or complaints surge." }
    ],
    "ja": [
      { "t": "オフラインの問題集でテストすれば十分で、オンライン A/B は面倒なので省略できる。", "why": "問題集と実際の利用にはギャップがあるので、オフラインテストだけでは現実世界の問題を見落とす。" },
      { "t": "両者は補完し合う：まずオフラインの問題集で回帰を止め、次に小トラフィックの A/B で実指標とガードレール指標を見る。", "why": "オフラインは速く安全だが実態とずれ、オンラインは現実的だが遅い；つなげて初めて安定する。" },
      { "t": "A/B では主要指標さえ勝てば全量展開でき、レイテンシとコストは気にしなくていい。", "why": "ガードレール指標がなければ、主要指標が勝ってもコストやクレームが急増しかねない。" }
    ],
    "zh": [
      { "t": "離線題庫測過就夠了，線上 A/B 太麻煩可以省略。", "ok": false, "why": "題庫和真實使用有落差，只離線測會漏掉真實世界的問題。" },
      { "t": "兩者互補：先離線題庫擋回歸，再小流量 A/B 看真實指標與護欄指標。", "ok": true, "why": "離線快又安全但失真，線上真實但慢，串起來才穩。" },
      { "t": "A/B 只要主要指標贏了就能全量，延遲和成本不用管。", "ok": false, "why": "沒有護欄指標，可能主要指標贏了卻讓成本或投訴暴增。" }
    ]
  },
  "eval-regression": {
    "en": [
      { "t": "As long as you test the new features, there is no need to go back and test the old cases that used to work.", "why": "Changes are global, so a new feature getting better may quietly cause old cases to regress." },
      { "t": "As long as a vendor's model keeps the same name, its behavior will not change, so there is no need to retest.", "why": "A model with the same name can still be quietly updated and drift in behavior, so rerun the regression set regularly." },
      { "t": "Store what used to work plus errors you have fixed as a fixed regression set, and on every change automatically rerun and compare.", "why": "Only with a fixed regression set can you see \"whether what used to work has gotten worse.\"" }
    ],
    "ja": [
      { "t": "新機能さえテストすればよく、これまでできていた古いケースを振り返ってテストする必要はない。", "why": "変更は全域的なので、新機能が良くなっても古いケースが密かに後退することがある。" },
      { "t": "ベンダーのモデルは名前さえ変わらなければ挙動も変わらないので、再テストは不要だ。", "why": "同名のモデルでも密かに更新され、挙動がドリフトすることがあるので、定期的に回帰を再実行する。" },
      { "t": "これまでできていたこと＋修正した誤りを固定の回帰用問題集として保存し、変更のたびに自動で再実行して比較する。", "why": "固定の回帰用問題集があって初めて「これまでできていたことが悪化していないか」が見える。" }
    ],
    "zh": [
      { "t": "只要新功能測過就好，原本會的舊案例不用回頭測。", "ok": false, "why": "改動是全域的，新功能變好卻可能讓舊案例默默退步。" },
      { "t": "供應商模型只要名字沒變，行為就不會變，不必重測。", "ok": false, "why": "同名模型也會悄悄更新、行為漂移，要定期重跑回歸。" },
      { "t": "把原本會的＋修過的錯存成固定回歸題庫，每次改動自動重跑比對。", "ok": true, "why": "有固定回歸題庫才看得到「原本會的有沒有變爛」。" }
    ]
  },
  "tokenizer-why": {
    "zh": [
      {
        "t": "Tokenizer 就是把文字切成一段段 token，切法只是內部實作細節，對使用者沒什麼實際影響。",
        "ok": false,
        "why": "停在定義：忽略了 token 數會連動成本、速度與上下文佔用。"
      },
      {
        "t": "不同切法會讓同一段文字的 token 數不同，而計價、運算、上下文都按 token 算，所以 token 越多越貴越慢、也越快吃光上下文；又因詞表多以英文為主，中文、日文常被切成更多 token，形成多語言的系統性不公平。",
        "ok": true,
        "why": "完整涵蓋：token 數是源頭，並連到成本、上下文佔用與多語公平。"
      },
      {
        "t": "切法不同只會影響 API 帳單金額，多花點錢就好，其他沒差。",
        "ok": false,
        "why": "以偏概全：漏掉上下文佔用與非英文使用者的系統性不公平。"
      }
    ],
    "en": [
      {
        "t": "A tokenizer just splits text into tokens, and how it splits is an internal implementation detail with no real impact on users.",
        "why": "Stops at the definition: it ignores that the token count drives cost, speed, and context usage."
      },
      {
        "t": "Different splitting produces different token counts for the same text, and pricing, computation, and context are all measured in tokens, so more tokens means more expensive, slower, and faster context exhaustion; also, because vocabularies are mostly English-centric, Chinese and Japanese are often split into more tokens, creating a systematic unfairness across languages.",
        "why": "Fully covers it: the token count is the root, connecting to cost, context usage, and cross-language fairness."
      },
      {
        "t": "Different splitting only affects the API bill; just spend a bit more and nothing else matters.",
        "why": "Overgeneralizes: it misses context usage and the systematic unfairness to non-English users."
      }
    ],
    "ja": [
      {
        "t": "Tokenizer は文字を token に分割するだけで、分割の仕方は内部実装の詳細にすぎず、ユーザーには実質的な影響はない。",
        "why": "定義で止まっている: token 数がコスト、速度、コンテキスト消費に連動することを見落としている。"
      },
      {
        "t": "分割の仕方が違えば同じ文章でも token 数が変わり、課金、計算、コンテキストはすべて token 単位で数えられるため、token が多いほど高く遅くなり、コンテキストも早く食いつぶす。さらに語彙は英語中心のものが多いため、中国語や日本語はより多くの token に分割されがちで、多言語における体系的な不公平を生む。",
        "why": "網羅的: token 数が起点であり、コスト、コンテキスト消費、多言語の公平性につながることを示している。"
      },
      {
        "t": "分割の仕方が違っても影響するのは API の請求額だけで、少し多めに払えば済む話で、他は変わらない。",
        "why": "一部で全体を語っている: コンテキスト消費と非英語ユーザーへの体系的な不公平を見落としている。"
      }
    ]
  },
  "embedding-meaning": {
    "zh": [
      {
        "t": "靠分佈假說：一個詞的意思由它常一起出現的上下文決定；訓練時模型用上下文互相預測，為了預測準，語境相似的詞就被推到相近的向量位置，意義是從共現統計中長出來的。",
        "ok": true,
        "why": "完整說明意義如何進入向量，也解釋了相近詞為何會靠近。"
      },
      {
        "t": "因為 embedding 就是把每個詞轉成一組向量或數字，能拿去算數學所以就代表意義。",
        "ok": false,
        "why": "停在定義：沒說明意義如何進到向量、相近詞為何靠近。"
      },
      {
        "t": "因為訓練前有人工替每個詞標好語意分類，再把相近的詞指定到相近的座標上。",
        "ok": false,
        "why": "機制錯：意義不是人工標的，是從共現統計中自動學到的。"
      }
    ],
    "en": [
      {
        "t": "It relies on the distributional hypothesis: a word's meaning is determined by the contexts it frequently appears in; during training the model predicts words from their context, and to predict accurately, words with similar contexts get pushed to nearby vector positions, so meaning grows out of co-occurrence statistics.",
        "why": "Fully explains how meaning enters the vectors and why similar words end up close together."
      },
      {
        "t": "Because an embedding just turns each word into a set of vectors or numbers that can be used in math, it therefore represents meaning.",
        "why": "Stops at the definition: it does not explain how meaning gets into the vectors or why similar words are close."
      },
      {
        "t": "Because before training, humans manually label each word with a semantic category and then assign similar words to nearby coordinates.",
        "why": "Wrong mechanism: meaning is not manually labeled; it is learned automatically from co-occurrence statistics."
      }
    ],
    "ja": [
      {
        "t": "分布仮説に基づく: ある語の意味は、その語がよく一緒に現れる文脈によって決まる。訓練時にモデルは文脈から語を予測し合い、正確に予測するために、文脈が似た語は近い vector 位置へ押し寄せられる。意味は共起統計から育っていく。",
        "why": "意味がどのように vector に入るか、なぜ似た語が近づくかを完全に説明している。"
      },
      {
        "t": "embedding は各語を vector や数値の組に変換し、数学的な計算に使えるようになるだけで、それがそのまま意味を表すから。",
        "why": "定義で止まっている: 意味がどのように vector に入るか、なぜ似た語が近づくかを説明していない。"
      },
      {
        "t": "訓練の前に、人手で各語に意味カテゴリを付け、似た語を近い座標に割り当てているから。",
        "why": "仕組みが誤り: 意味は人手で付けたものではなく、共起統計から自動的に学習される。"
      }
    ]
  },
  "attention-compute": {
    "zh": [
      {
        "t": "Attention 就是模型記住了整段上下文，把之前讀過的句子存起來，之後回答時再調出來用。",
        "ok": false,
        "why": "把 attention 當成「記憶」，其實它是每次當場依整句重新加權算出來的，沒有存起來的記憶。"
      },
      {
        "t": "每個詞會生出 Query、Key、Value 三個向量：用自己的 Query 和所有詞的 Key 算相似度得到一組權重，再用權重去加權平均所有詞的 Value；因為權重是看整句當場動態算的，「他」會把權重壓在前面的人名、「蘋果」會依周圍詞偏水果或公司，所以同一個詞在不同句子表示不同，這正是上下文理解的來源。",
        "ok": true,
        "why": "講出 Q／K／V 怎麼互動、算出相似度權重再加權 Value，還點出是動態加權而非記憶，正是到位的答法。"
      },
      {
        "t": "Attention 就是讓模型去關注句子裡的重點詞，把注意力放在重要的字上面，其他不重要的就略過。",
        "ok": false,
        "why": "只說「關注重點」卻答不出「重點」是用 Query 和 Key 的相似度權重算出來的，等於沒講到機制。"
      }
    ],
    "en": [
      {
        "t": "Attention just means the model memorizes the whole context: it stores the sentences it has read and pulls them back out when it answers later.",
        "why": "This treats attention as memory, but it is recomputed on the fly from the whole sentence every time; there is no stored memory."
      },
      {
        "t": "Each token produces three vectors, Query, Key and Value: you take a token's Query, score it against every token's Key to get a set of relevance weights, then take a weighted average of all the Values. Because the weights are computed dynamically over the whole sentence, a pronoun like \"he\" puts its weight on the earlier name and an ambiguous word like \"apple\" leans toward fruit or company depending on the surrounding words, so the same word has a different representation in different sentences. That is where context understanding comes from.",
        "why": "It spells out how Q, K and V interact, that relevance is a similarity weight over Values, and that this is dynamic weighting rather than memory, which is exactly the point."
      },
      {
        "t": "Attention just means the model pays attention to the important words in the sentence and focuses on the ones that matter while skipping the rest.",
        "why": "Saying it focuses on the important parts without explaining that importance is a similarity score between Query and Key skips the actual mechanism."
      }
    ],
    "ja": [
      {
        "t": "Attention とは、モデルが文脈全体を記憶することだ。読んだ文を保存しておき、あとで答えるときに取り出して使う。",
        "why": "attention を「記憶」と捉えているが、実際は毎回、文全体からその場で重みを計算し直すもので、保存された記憶はない。"
      },
      {
        "t": "各単語は Query、Key、Value の三つのベクトルを生成する。自分の Query と全単語の Key で類似度を計算して重みの組を得て、その重みで全単語の Value を加重平均する。重みは文全体を見てその場で動的に計算されるので、「彼」は前の人名に重みを寄せ、「りんご」は周囲の語によって果物か企業かに傾く。だから同じ単語でも文が違えば表現が変わり、これが文脈理解の源になる。",
        "why": "Q・K・V がどう相互作用して類似度の重みを出し Value を加重平均するかを述べ、記憶ではなく動的な重み付けだと押さえており、まさに的を射ている。"
      },
      {
        "t": "Attention とは、モデルが文中の重要な単語に注目することだ。大事な語に注意を向け、そうでない語は読み飛ばす。",
        "why": "「重要な部分に注目する」と言うだけで、その「重要さ」が Query と Key の類似度の重みで計算されることを答えられておらず、肝心の仕組みが抜けている。"
      }
    ]
  },
  "multi-head": {
    "zh": [
      {
        "t": "多頭就是頭數比較多、參數比較大，所以整體上會算得比單頭準。",
        "ok": false,
        "why": "沒講原理：沒說單頭的侷限，也沒說多頭如何分工與融合。"
      },
      {
        "t": "頭數越多模型一定越強，所以盡量把注意力頭加到最多就對了。",
        "ok": false,
        "why": "過度宣稱：總維度通常固定切給各頭，不是無腦加頭就更強。"
      },
      {
        "t": "單頭注意力只能學一種關係，softmax 又傾向集中在少數詞上；多頭並行跑多組獨立的 Q／K／V，各自在子空間看一種關係（語法、指代、語意），再把各頭結果拼接投影融合，等於同時從多個角度理解一句話。",
        "ok": true,
        "why": "完整：點出單頭侷限，並說明多頭如何分工與合併。"
      }
    ],
    "en": [
      {
        "t": "Multi-head just means more heads and more parameters, so overall it computes more accurately than a single head.",
        "why": "Gives no mechanism: it does not state the limits of a single head or how multiple heads divide work and merge results."
      },
      {
        "t": "The more heads, the stronger the model must be, so just add as many attention heads as possible.",
        "why": "Overclaims: the total dimension is usually fixed and split among the heads, so blindly adding heads does not make it stronger."
      },
      {
        "t": "Single-head attention can only learn one kind of relationship, and softmax tends to concentrate on a few words; multi-head runs several independent sets of Q/K/V in parallel, each looking at one kind of relationship in its subspace (syntax, coreference, semantics), then concatenates, projects, and fuses the heads' outputs, which amounts to understanding a sentence from multiple angles at once.",
        "why": "Complete: it points out the single-head limitation and explains how multiple heads divide work and combine."
      }
    ],
    "ja": [
      {
        "t": "multi-head とは要するに head の数が多くパラメータが大きいということで、だから全体として単一 head より正確に計算できる。",
        "why": "原理を述べていない: 単一 head の限界も、複数 head がどう分担して統合するかも説明していない。"
      },
      {
        "t": "head の数が多いほどモデルは必ず強くなるので、attention head をできるだけ多く増やせばよい。",
        "why": "過剰な主張: 全体の次元は通常固定で各 head に分配されるため、やみくもに head を増やせば強くなるわけではない。"
      },
      {
        "t": "単一 head の attention は一種類の関係しか学べず、softmax も少数の語に集中しがちである。multi-head は独立した Q/K/V の組を複数並行して走らせ、それぞれが部分空間で一種類の関係(構文、照応、意味)を捉え、各 head の出力を連結、射影して融合する。これは一文を同時に複数の視点から理解することに等しい。",
        "why": "網羅的: 単一 head の限界を指摘し、複数 head がどう分担して統合するかを説明している。"
      }
    ]
  },
  "positional-encoding": {
    "zh": [
      {
        "t": "位置編碼只是順便加上去的小優化，有沒有它都不太影響結果。",
        "ok": false,
        "why": "低估作用：少了它，詞序資訊會整個消失。"
      },
      {
        "t": "self-attention 本質是加權平均，對詞序無感，把詞序打亂算出來的結果其實一樣，所以模型看不到誰前誰後；位置編碼把每個詞的位置變成向量，加（或旋轉）進表示，讓模型分得出「貓追狗」和「狗追貓」，主流做法是 RoPE。",
        "ok": true,
        "why": "完整：點出 self-attention 對順序無感，說明位置編碼補了什麼。"
      },
      {
        "t": "self-attention 其實已經看得到詞的先後順序，位置編碼只是讓訓練收斂更快。",
        "ok": false,
        "why": "事實錯：self-attention 天生看不到詞序，順序資訊全靠位置編碼。"
      }
    ],
    "en": [
      {
        "t": "Positional encoding is just a minor optimization added on the side, and whether it is there or not barely affects the result.",
        "why": "Underestimates its role: without it, word-order information disappears entirely."
      },
      {
        "t": "Self-attention is essentially a weighted average and is insensitive to word order; scrambling the word order actually yields the same result, so the model cannot see which word comes first; positional encoding turns each word's position into a vector and adds (or rotates) it into the representation, letting the model tell 'cat chases dog' from 'dog chases cat', and the mainstream approach is RoPE.",
        "why": "Complete: it points out that self-attention is order-insensitive and explains what positional encoding supplies."
      },
      {
        "t": "Self-attention can actually already see the order of words, and positional encoding just makes training converge faster.",
        "why": "Factually wrong: self-attention inherently cannot see word order, and all order information comes from positional encoding."
      }
    ],
    "ja": [
      {
        "t": "位置エンコーディングはついでに加えた小さな最適化にすぎず、あってもなくても結果にはほとんど影響しない。",
        "why": "役割を過小評価している: これがなければ語順の情報は丸ごと消えてしまう。"
      },
      {
        "t": "self-attention は本質的に加重平均であり語順に無頓着で、語順をかき混ぜても計算結果は実は同じになるため、モデルはどの語が前か後かを見分けられない。位置エンコーディングは各語の位置を vector に変え、表現に加算(または回転)して組み込み、「猫が犬を追う」と「犬が猫を追う」をモデルが区別できるようにする。主流の手法は RoPE である。",
        "why": "網羅的: self-attention が語順に無頓着であることを指摘し、位置エンコーディングが何を補うかを説明している。"
      },
      {
        "t": "self-attention は実はすでに語の前後順序を捉えられており、位置エンコーディングは訓練の収束を速くするだけである。",
        "why": "事実が誤り: self-attention は本来語順を捉えられず、順序の情報はすべて位置エンコーディングに頼っている。"
      }
    ]
  },
  "transformer-vs-rnn": {
    "zh": [
      {
        "t": "Transformer 比較新、架構比較強，各方面都贏過 RNN／LSTM，而且幾乎沒有缺點，所以自然就取代了它們。",
        "ok": false,
        "why": "只說「比較強、沒缺點」，講不出平行與抓長距這兩個關鍵機制，也漏了 attention O(n²) 的代價。"
      },
      {
        "t": "RNN／LSTM 逐字循序處理、靠隱藏狀態一路傳資訊，距離一遠就衰減、遺忘長距關係，而且前一步沒算完後一步不能開始、無法平行；Transformer 用 attention 一次看整句，任兩個詞不論多遠都能直接建立關聯、抓得住長距依賴，還能整句平行運算、很適合 GPU、好擴展到超大模型。代價是 attention 是 O(n²)、序列一長計算和記憶體就暴增，但「平行＋抓長距＋好擴展」讓大規模預訓練變可能，這才是它取代 RNN 的根本原因。",
        "ok": true,
        "why": "同時講出平行、長距兩個機制，點出 O(n²) 代價，還收在「讓大規模預訓練成為可能」，正是重點。"
      },
      {
        "t": "因為 Transformer 有記憶，能把整個序列記住，不像 RNN 那樣讀到後面就忘了前面，所以它比較不會忘。",
        "ok": false,
        "why": "把「一次看全句」誤當成「有記憶」，其實 Transformer 沒有跨序列的內建記憶，是靠當場加權關聯、不是記住。"
      }
    ],
    "en": [
      {
        "t": "Transformer is newer and its architecture is stronger; it beats RNN and LSTM on every front and has basically no downsides, so it naturally replaced them.",
        "why": "Saying it is just stronger with no downsides skips the two key mechanisms, parallelism and long-range reach, and ignores the O(n^2) cost of attention."
      },
      {
        "t": "RNN and LSTM process one token at a time and carry information through a hidden state, so it decays over distance and long-range relations get forgotten, and one step cannot start before the previous finishes, so there is no parallelism. Transformer uses attention to see the whole sentence at once, letting any two tokens link directly no matter how far apart, which captures long-range dependencies, and the whole sentence can be computed in parallel, which suits GPUs and scales to very large models. The cost is that attention is O(n^2), so compute and memory blow up as sequences grow, but parallelism plus long-range reach plus scalability is what made large-scale pretraining possible, and that is the root reason it replaced RNNs.",
        "why": "It names both mechanisms, parallelism and long-range reach, flags the O(n^2) cost, and lands on enabling large-scale pretraining, which is the point."
      },
      {
        "t": "It is because Transformer has memory and can remember the entire sequence, unlike an RNN that forgets the beginning by the time it reaches the end, so it forgets less.",
        "why": "This mistakes seeing the whole sentence at once for having memory; a Transformer has no built-in cross-sequence memory and works by weighting relations on the spot, not by remembering."
      }
    ],
    "ja": [
      {
        "t": "Transformer は新しくて構造も強力で、あらゆる面で RNN／LSTM に勝り、しかもほぼ欠点がないので、自然に取って代わった。",
        "why": "「強くて欠点がない」と言うだけで、並列化と長距離依存という二つの鍵となる仕組みを述べられず、attention の O(n^2) という代償も抜けている。"
      },
      {
        "t": "RNN／LSTM は一語ずつ逐次処理し、情報を隠れ状態で伝えるので距離が遠いほど減衰して長距離の関係を忘れやすく、前のステップが終わらないと次を始められず並列化できない。Transformer は attention で文全体を一度に見て、どれだけ離れた二語でも直接関連づけられ長距離依存を捉えられ、しかも文全体を並列計算できて GPU に向き、超大規模モデルへ拡張しやすい。代償は attention が O(n^2) で系列が長くなると計算とメモリが急増することだが、並列化＋長距離＋拡張性が大規模事前学習を可能にしたことこそ、RNN を置き換えた根本理由だ。",
        "why": "並列化と長距離という二つの仕組みを述べ、O(n^2) の代償を指摘し、大規模事前学習を可能にした点に着地しており、まさに核心を突いている。"
      },
      {
        "t": "Transformer には記憶があり系列全体を覚えられるからだ。RNN のように後ろまで読むと前を忘れることがなく、だから忘れにくい。",
        "why": "「文全体を一度に見る」ことを「記憶がある」と取り違えている。Transformer に系列をまたぐ内蔵の記憶はなく、その場で重み付けして関連づけているのであって、覚えているわけではない。"
      }
    ]
  },
  "what-model-stores": {
    "zh": [
      {
        "t": "模型把訓練資料存進一個大資料庫，回答時就去裡面查出最相關的一筆。",
        "ok": false,
        "why": "把 LLM 當查表資料庫是最常見的誤解：它是壓縮的模式，回答是重建不是查詢。"
      },
      {
        "t": "知識是壓縮、分散在權重裡的模式，不是存檔：模型主要泛化，但也會逐字背下一部分資料；因為有損，冷門精確的事實容易記錯（幻覺），要更新知識靠 RAG 而非微調。",
        "ok": true,
        "why": "講出「壓縮模式非資料庫＋記憶/泛化光譜＋有損會錯＋用 RAG 更新」，層次完整。"
      },
      {
        "t": "模型完全不會記住任何原始文字，全是抽象規律，所以不可能吐出訓練資料。",
        "ok": false,
        "why": "其實會逐字背下重複多次的內容並可能原樣吐出（regurgitation），這正是隱私與著作權爭議的來源。"
      }
    ],
    "en": [
      {
        "t": "The model stores its training data in a big database and, when answering, looks up the single most relevant record from it.",
        "why": "Treating an LLM as a lookup database is the most common misconception: it is compressed patterns, and answering is reconstruction, not a query."
      },
      {
        "t": "Knowledge is compressed patterns distributed across the weights, not saved files: the model mostly generalizes, but it also memorizes some data verbatim; because it is lossy, obscure precise facts are easily misremembered (hallucination), and updating knowledge relies on RAG rather than fine-tuning.",
        "why": "It states 'compressed patterns not a database + the memorization/generalization spectrum + lossy so it errs + updating with RAG,' a complete, layered answer."
      },
      {
        "t": "The model never remembers any original text at all, only abstract regularities, so it is impossible for it to reproduce training data.",
        "why": "In fact it memorizes verbatim content that appears repeatedly and may reproduce it exactly (regurgitation), which is precisely the source of privacy and copyright disputes."
      }
    ],
    "ja": [
      {
        "t": "モデルは訓練データを大きなデータベースに保存し、回答時にはそこから最も関連する一件を引き出す。",
        "why": "LLM を表引きのデータベースと捉えるのは最もよくある誤解だ。それは圧縮されたパターンであり、回答は検索ではなく再構築である。"
      },
      {
        "t": "知識は圧縮され、重みに分散したパターンであって保存ファイルではない。モデルは主に汎化するが、一部のデータは逐語的に暗記もする。ロッシーであるため、マイナーで正確さを要する事実は誤って覚えられやすく（ハルシネーション）、知識の更新はファインチューニングではなく RAG に頼る。",
        "why": "「圧縮パターンでありデータベースではない＋記憶と汎化のスペクトル＋ロッシーで誤る＋RAG で更新」を述べており、階層立てて完結している。"
      },
      {
        "t": "モデルは原文をまったく覚えず、すべて抽象的な規則なので、訓練データを吐き出すことは不可能だ。",
        "why": "実際には繰り返し現れた内容を逐語的に暗記し、そのまま吐き出すこともあり（regurgitation）、これこそがプライバシーや著作権をめぐる論争の源だ。"
      }
    ]
  },
  "emergence": {
    "zh": [
      {
        "t": "GPT-4 就是把 GPT-3 等比例放大，參數變多所以每件事都做得更準一點，本質是同一個模型。",
        "ok": false,
        "why": "放大帶來的不只是更準；跨過某個規模會湧現出小模型根本不會的新能力，是質變不只是量變。"
      },
      {
        "t": "scaling law 讓 loss 隨參數、資料、算力放大而平滑下降；但某些下游能力會在某個規模「突然」出現（湧現），所以 GPT-4 相對 GPT-3 是量變引發質變、多了新能力，而非線性放大。不過這「突然」有一部分是評測指標造成的錯覺。",
        "ok": true,
        "why": "講出 loss 平滑 vs 能力跳升（湧現）、量變到質變，還補上指標錯覺的但書，完整。"
      },
      {
        "t": "模型只要一直變大，任何能力都會自動無限湧現，越大一定越好。",
        "ok": false,
        "why": "湧現有門檻也有指標錯覺成分，且報酬會遞減、資料會枯竭，「一直放大就無限變強」不成立。"
      }
    ],
    "en": [
      {
        "t": "GPT-4 is just GPT-3 scaled up proportionally; with more parameters it does everything a bit more accurately, and it is essentially the same model.",
        "why": "Scaling brings more than accuracy; past a certain scale, new abilities that small models fundamentally cannot do emerge, a qualitative change and not only a quantitative one."
      },
      {
        "t": "A scaling law makes loss fall smoothly as parameters, data, and compute scale up; but some downstream abilities appear 'suddenly' at a certain scale (emergence), so GPT-4 relative to GPT-3 is a quantitative change triggering a qualitative one, gaining new abilities, rather than a linear scale-up. That said, part of this 'suddenness' is an illusion created by evaluation metrics.",
        "why": "It states smooth loss vs jumping ability (emergence) and quantitative to qualitative change, and adds the caveat about the metric illusion; complete."
      },
      {
        "t": "As long as a model keeps getting bigger, any ability will automatically emerge without limit, and bigger is always better.",
        "why": "Emergence has thresholds and a metric-illusion component, returns diminish, and data runs out, so 'keep scaling and get infinitely stronger' does not hold."
      }
    ],
    "ja": [
      {
        "t": "GPT-4 は GPT-3 を比例してスケールしただけで、parameters が増えたので何でも少し正確にこなす、本質的には同じモデルである。",
        "why": "スケールがもたらすのは正確さだけではありません。ある規模を超えると、小さいモデルには全くできない新しい能力が創発し、量的変化だけでなく質的変化です。"
      },
      {
        "t": "scaling law は loss を parameters、data、compute のスケールに応じて滑らかに下げるが、一部の下流の能力はある規模で「突然」現れる(創発)ので、GPT-4 は GPT-3 に対して量的変化が質的変化を引き起こし、新しい能力が増えたのであり、線形なスケールアップではない。ただしこの「突然」の一部は評価指標が生む錯覚である。",
        "why": "loss の滑らかさ vs 能力の跳躍(創発)、量的変化から質的変化までを述べ、さらに指標の錯覚という但し書きも補っており、完全です。"
      },
      {
        "t": "モデルはひたすら大きくしさえすれば、あらゆる能力が自動的に無限に創発し、大きいほど必ず良い。",
        "why": "創発には閾値があり指標の錯覚の要素もあり、さらに収穫は逓減し data も枯渇するので、「ひたすらスケールすれば無限に強くなる」は成り立ちません。"
      }
    ]
  },
  "rlhf-why": {
    "zh": [
      {
        "t": "預訓練的模型知識不夠、也不夠聰明，RLHF 的作用就是再灌進更多新知識、把它變得更博學更會推理。",
        "ok": false,
        "why": "RLHF 動的是行為與偏好、不是知識，它不會灌新知識也不會讓模型變聰明，這是最常見的誤解。"
      },
      {
        "t": "預訓練只學「猜下一個最合理的字」，模型有知識也會說人話，但它只是在接話、不是在聽指令：你問問題它可能反過來續寫更多問題，也不管答案有沒有用、安不安全。所以先用 SFT（監督微調）拿「指令：好答案」的示範教它照指令回答，再用 RLHF 拿人類對多個答案的偏好排序去獎勵它，把有用、誠實、無害一起調到位（因為「什麼叫好答案」很難用示範寫死、用比較偏好更容易）。RLHF 調的是行為與偏好、不是知識。",
        "ok": true,
        "why": "點出預訓練只會接話的缺口、分清 SFT 與 RLHF 的分工、講出「有用＋誠實＋無害」都要調，且界定它不動知識，完整到位。"
      },
      {
        "t": "預訓練完模型已經很會答，RLHF 只是最後加一層安全護欄，避免它講出危險或不當的內容而已。",
        "ok": false,
        "why": "只講「更安全」漏掉「更有用」這一半，RLHF 是把有用和無害一起調、不是只做安全過濾。"
      }
    ],
    "en": [
      {
        "t": "The pretrained model does not know enough and is not smart enough, so the job of RLHF is to inject more new knowledge and make it more knowledgeable and better at reasoning.",
        "why": "RLHF adjusts behavior and preferences, not knowledge; it does not add new facts and does not make the model smarter, which is the most common misunderstanding."
      },
      {
        "t": "Pretraining only learns to guess the next most plausible token, so the model has knowledge and speaks fluently, but it is just continuing text rather than following your instructions: you ask a question and it may keep writing more questions, with no regard for whether the answer is useful or safe. So first SFT (supervised fine-tuning) uses instruction-and-good-answer demonstrations to teach it to answer in the form the instruction asks, then RLHF uses human preference rankings over several answers to reward it, tuning helpful, honest and harmless together, because what counts as a good answer is hard to pin down with demonstrations and easier to capture with comparative preferences. RLHF moves behavior and preference, not knowledge.",
        "why": "It names the gap that pretraining only continues text, separates the roles of SFT and RLHF, says helpful and honest and harmless are all tuned, and bounds it as not touching knowledge, which is complete."
      },
      {
        "t": "The pretrained model already answers well, so RLHF just adds a final safety guardrail to keep it from saying dangerous or inappropriate things.",
        "why": "Saying only more safe misses the more useful half; RLHF tunes helpfulness and harmlessness together, not just a safety filter."
      }
    ],
    "ja": [
      {
        "t": "事前学習済みモデルは知識が足りず賢さも足りないので、RLHF の役割は新しい知識をさらに詰め込み、より博識で推論も上手にすることだ。",
        "why": "RLHF が動かすのは振る舞いと好みであって知識ではない。新しい知識を注入することも、モデルを賢くすることもなく、これは最もよくある誤解だ。"
      },
      {
        "t": "事前学習は「次に最もありそうな語を当てる」ことしか学ばないので、モデルは知識を持ち流暢に話せるが、指示を聞いているのではなく文を続けているだけだ。質問すると逆に質問を書き足したりし、答えが役立つか安全かも気にしない。そこでまず SFT（教師ありファインチューニング）で「指示：良い答え」のお手本を使って指示どおりに答える形を教え、次に RLHF で複数の答えに対する人間の好みの順位づけを使って報酬を与え、有用・正直・無害をまとめて整える（「良い答えとは何か」はお手本で書ききるのが難しく、比較の好みで捉える方が容易だから）。RLHF が動かすのは振る舞いと好みであって知識ではない。",
        "why": "事前学習は文を続けるだけという欠落を指摘し、SFT と RLHF の分担を切り分け、有用・正直・無害をすべて整えると述べ、知識には触れないと線引きしており、完結している。"
      },
      {
        "t": "事前学習済みモデルはもう十分うまく答えられるので、RLHF は危険や不適切な内容を言わせないための最後の安全ガードレールを足すだけだ。",
        "why": "「より安全に」だけを言って「より有用に」という半分を落としている。RLHF は有用さと無害さを同時に整えるものであり、単なる安全フィルタではない。"
      }
    ]
  },
  "dpo-pipeline": {
    "zh": [
      {
        "t": "對齊就是 RLHF：訓一個獎勵模型再用 PPO 去 RL，沒有別的做法。",
        "ok": false,
        "why": "漏了 SFT 打底，也漏了 DPO 這條更主流的簡化路線（直接用偏好對優化、不用獎勵模型與 RL）。"
      },
      {
        "t": "從預訓練 → SFT → 偏好對齊是一條管線；偏好對齊可用 RLHF（獎勵模型＋PPO，複雜不穩）或 DPO（直接在偏好對上算損失，穩、省、好復現）。DPO 把 RLHF 的目標改寫成可直接訓練的 loss，但仍需高品質偏好資料，也一樣只調行為不加知識。",
        "ok": true,
        "why": "講出三階段管線、RLHF vs DPO 的差別與 DPO 的洞見，還補上資料與界線，完整。"
      },
      {
        "t": "DPO 比 RLHF 好，因為它不需要偏好資料、還能讓模型更聰明。",
        "ok": false,
        "why": "DPO 一樣要高品質偏好資料；且對齊只調行為與偏好、不加知識，不會讓模型更聰明。"
      }
    ],
    "en": [
      {
        "t": "Alignment is just RLHF: train a reward model and then do RL with PPO, and there is no other way.",
        "why": "It misses the SFT groundwork, and it misses DPO, the more mainstream simplified route (optimize directly on preference pairs, with no reward model and no RL)."
      },
      {
        "t": "Pretraining → SFT → preference optimization is a pipeline; preference optimization can use RLHF (reward model plus PPO, complex and unstable) or DPO (compute a loss directly on preference pairs, stable, cheap, reproducible). DPO rewrites RLHF's objective into a loss you can train directly, but it still needs high-quality preference data and likewise only tunes behavior without adding knowledge.",
        "why": "It lays out the three-stage pipeline, the difference between RLHF and DPO, and DPO's insight, and adds the point about data and limits: complete."
      },
      {
        "t": "DPO is better than RLHF because it needs no preference data and can also make the model smarter.",
        "why": "DPO still requires high-quality preference data; and alignment only tunes behavior and preferences and adds no knowledge, so it will not make the model smarter."
      }
    ],
    "ja": [
      {
        "t": "アライメントとはつまり RLHF だ：reward model を1つ訓練し、その後 PPO で RL するだけで、ほかのやり方はない。",
        "why": "SFT の土台作りを見落としており、より主流の簡略ルートである DPO（preference pairs で直接最適化し、reward model と RL を使わない）も見落としています。"
      },
      {
        "t": "pretraining → SFT → preference optimization は1本のパイプラインだ。preference optimization には RLHF（reward model ＋ PPO、複雑で不安定）か DPO（preference pairs 上で直接 loss を計算、安定・低コスト・再現しやすい）を使える。DPO は RLHF の目的を直接学習できる loss に書き換えるが、それでも高品質な preference data を必要とし、同様に振る舞いを調整するだけで知識は追加しない。",
        "why": "三段階のパイプライン、RLHF と DPO の違い、DPO の洞察を述べ、さらにデータと限界まで補っており、完全です。"
      },
      {
        "t": "DPO は RLHF より優れている、なぜなら preference data が要らず、しかもモデルをより賢くできるからだ。",
        "why": "DPO も同様に高品質な preference data を必要とします。さらにアライメントは振る舞いと preference を調整するだけで知識は追加しないため、モデルがより賢くなることはありません。"
      }
    ]
  },
  "finetune-vs-rag": {
    "zh": [
      {
        "t": "想讓模型知道最新或私有的事實，就去微調它，把這些新事實訓練進權重裡，它以後就記得了。",
        "ok": false,
        "why": "灌事實是 RAG 的活、不是微調的：微調改的是「怎麼答」，拿它記事實成本高、知識一變就得重訓、還可能記錯。"
      },
      {
        "t": "兩者不是二選一：微調改「怎麼答」（語氣、格式、固定領域能力，寫進權重），RAG 補「答什麼事實」（把常變或私有資料放外部，每次查最相關的餵進去）。取捨上，微調能內化風格但訓練貴、知識一變要重訓；RAG 改資料只要更新知識庫、還能引用來源，但每次多一段檢索、成效吃檢索品質。所以要穩定語氣／格式就微調，要最新／私有／可引用的事實就 RAG，實務上常兩者合用：微調定調性、RAG 供事實。",
        "ok": true,
        "why": "切開「怎麼答 vs 答什麼」、講出雙方取捨、又點出常常並用，正是完整到位的答法。"
      },
      {
        "t": "微調和 RAG 是二選一，挑一個用就好；反正 RAG 隨查隨有、幾乎沒什麼成本，直接全部都用 RAG 最省事。",
        "ok": false,
        "why": "把兩者當二選一、又漏了「常常並用」，還忽略 RAG 每次檢索都有延遲與成本、檢索錯了答案就白搭。"
      }
    ],
    "en": [
      {
        "t": "If you want the model to know the latest or private facts, fine-tune it and train those new facts into the weights, and then it will remember them.",
        "why": "Injecting facts is RAG's job, not fine-tuning's; fine-tuning changes how it answers, and using it to store facts is costly, needs retraining whenever the knowledge changes, and can be misremembered."
      },
      {
        "t": "They are not either/or: fine-tuning changes how it answers (tone, format, fixed-domain ability, written into the weights), while RAG supplies what facts to answer (put frequently changing or private data outside and retrieve the most relevant pieces each time). On trade-offs, fine-tuning internalizes style but is expensive to train and needs retraining when knowledge changes; RAG lets you change data by updating the knowledge base and can cite sources, but adds a retrieval step each time and its quality depends on retrieval quality. So use fine-tuning for a stable tone or format and RAG for the latest, private, or citable facts, and in practice you often combine them: fine-tune sets the voice, RAG supplies the facts.",
        "why": "It separates how to answer from what facts to answer, gives the trade-offs on both sides, and notes they are often combined, which is the complete answer."
      },
      {
        "t": "Fine-tuning and RAG are an either/or choice, so just pick one; RAG is available on demand and has almost no cost anyway, so just use RAG for everything and keep it simple.",
        "why": "This treats them as either/or and misses that they are often combined, and it ignores that every RAG query adds latency and cost and that a bad retrieval ruins the answer."
      }
    ],
    "ja": [
      {
        "t": "最新の事実や社内の事実をモデルに知らせたいなら、ファインチューニングしてその新しい事実を重みに学習させればいい。そうすれば以後は覚えている。",
        "why": "事実を詰め込むのは RAG の役割でファインチューニングの役割ではない。ファインチューニングは「どう答えるか」を変えるもので、事実の記憶に使うとコストが高く、知識が変わるたびに再学習が要り、間違って覚えることもある。"
      },
      {
        "t": "二者択一ではない。ファインチューニングは「どう答えるか」（口調、書式、固定領域の能力を重みに書き込む）を変え、RAG は「どの事実を答えるか」（頻繁に変わる情報や社内情報を外部に置き、毎回最も関連する断片を取り込む）を補う。トレードオフとして、ファインチューニングは文体を内面化できるが学習コストが高く知識が変われば再学習が要る。RAG はデータの更新が知識ベースの更新だけで済み出典も示せるが、毎回検索が一段増え、成果は検索品質に左右される。だから安定した口調や書式ならファインチューニング、最新・社内・出典が要る事実なら RAG。実務では両方を併用することが多い：ファインチューニングで調子を決め、RAG で事実を供給する。",
        "why": "「どう答えるか」と「どの事実を答えるか」を切り分け、双方のトレードオフを述べ、よく併用する点も指摘しており、完全に的を射ている。"
      },
      {
        "t": "ファインチューニングと RAG は二者択一なので一つ選べばよい。どうせ RAG はその都度すぐ引けてほとんどコストもないので、全部 RAG にするのが一番手軽だ。",
        "why": "二者択一と捉えたうえ「よく併用する」ことを落とし、さらに RAG は毎回の検索に遅延とコストがあり検索を外すと答えが台無しになることを無視している。"
      }
    ]
  },
  "lora": {
    "zh": [
      {
        "t": "LoRA 凍結原模型權重，只在旁邊加一組低秩小增量去學該調多少；要訓練與儲存的參數、梯度、優化器狀態都變少，主要省下顯存與時間，而原模型不變；且 adapter 只有幾 MB 可插拔，一個底模能掛多個按任務即時切換。",
        "ok": true,
        "why": "完整：涵蓋凍結權重、省顯存的原因與可插拔切換的好處。"
      },
      {
        "t": "因為 LoRA 讓要訓練的參數變少，所以整體就跑得比較快。",
        "ok": false,
        "why": "不完整：重點在省顯存與可切換，只講速度漏掉關鍵。"
      },
      {
        "t": "LoRA 會壓縮並減少原模型的參數，把模型本身變小變快。",
        "ok": false,
        "why": "機制錯：原模型權重不動，LoRA 不會縮小底模。"
      }
    ],
    "en": [
      {
        "t": "LoRA freezes the original model weights and adds only a small low-rank increment on the side to learn how much to adjust; the parameters, gradients, and optimizer states to train and store all shrink, mainly saving GPU memory and time while the original model stays unchanged; and since an adapter is only a few MB and pluggable, one base model can carry several adapters and switch between them per task on the fly.",
        "why": "Complete: it covers freezing the weights, the reason for saving GPU memory, and the benefit of pluggable switching."
      },
      {
        "t": "Because LoRA reduces the number of parameters to train, it runs faster overall.",
        "why": "Incomplete: the key points are saving GPU memory and switchability; mentioning only speed misses what matters."
      },
      {
        "t": "LoRA compresses and reduces the original model's parameters, making the model itself smaller and faster.",
        "why": "Wrong mechanism: the original model weights stay untouched, and LoRA does not shrink the base model."
      }
    ],
    "ja": [
      {
        "t": "LoRA は元のモデルの重みを凍結し、脇に低ランクの小さな増分だけを加えてどれだけ調整すべきかを学ぶ。訓練して保存すべきパラメータ、勾配、optimizer の状態がすべて減り、主に GPU メモリと時間を節約でき、元のモデルは変わらない。さらに adapter は数 MB しかなく差し替え可能で、一つのベースモデルに複数を付けてタスクごとに即座に切り替えられる。",
        "why": "網羅的: 重みの凍結、GPU メモリを節約できる理由、差し替え可能な切り替えの利点を押さえている。"
      },
      {
        "t": "LoRA は訓練するパラメータを減らすので、全体として動作が速くなるから。",
        "why": "不完全: 要点は GPU メモリの節約と切り替え可能性にあり、速度だけを述べても肝心な点を落としている。"
      },
      {
        "t": "LoRA は元のモデルのパラメータを圧縮して減らし、モデル自体を小さく速くする。",
        "why": "仕組みが誤り: 元のモデルの重みは変わらず、LoRA がベースモデルを小さくすることはない。"
      }
    ]
  },
  "catastrophic-forgetting": {
    "zh": [
      {
        "t": "不會，微調只會讓模型更強，多練幾輪連通用能力也會一起變好。",
        "ok": false,
        "why": "錯：過度微調窄資料反而會覆蓋掉原本的通用能力。"
      },
      {
        "t": "會遺忘，但只要訓練資料量夠大就完全不會發生。",
        "ok": false,
        "why": "沒抓根因：問題出在過度擬合窄資料，不是單純資料量夠不夠。"
      },
      {
        "t": "會，這叫災難性遺忘：只拿窄領域資料練過頭，會覆蓋掉撐起通用能力的權重；根因是過度擬合而非微調本身，可用小學習率加少步數、LoRA 凍結主體、混入通用語料、並用通用基準盯回歸來緩解。",
        "ok": true,
        "why": "完整：確認會遺忘、點出過頭才是根因、並給出緩解手段。"
      }
    ],
    "en": [
      {
        "t": "No, fine-tuning only makes the model stronger, and a few more training rounds will improve its general abilities too.",
        "why": "Wrong: over-fine-tuning on narrow data actually overwrites the original general abilities."
      },
      {
        "t": "It does forget, but as long as the training data is large enough it will not happen at all.",
        "why": "Misses the root cause: the problem is overfitting to narrow data, not simply whether there is enough data."
      },
      {
        "t": "Yes, this is called catastrophic forgetting: over-training on narrow-domain data alone overwrites the weights that support general abilities; the root cause is overfitting rather than fine-tuning itself, and it can be mitigated with a small learning rate plus few steps, freezing the main body with LoRA, mixing in general-purpose corpora, and watching for regressions with general benchmarks.",
        "why": "Complete: it confirms forgetting happens, points to over-training as the root cause, and offers mitigations."
      }
    ],
    "ja": [
      {
        "t": "そうはならない。fine-tuning はモデルを強くするだけで、何度か多く訓練すれば汎用的な能力も一緒に良くなる。",
        "why": "誤り: 狭いデータで過度に fine-tuning すると、かえって元の汎用能力を上書きしてしまう。"
      },
      {
        "t": "忘却は起きるが、訓練データの量さえ十分に大きければまったく起こらない。",
        "why": "根本原因を捉えていない: 問題は狭いデータへの過学習であり、単にデータ量が足りるかどうかではない。"
      },
      {
        "t": "起きる。これは catastrophic forgetting(破滅的忘却)と呼ばれる。狭い領域のデータだけで訓練しすぎると、汎用能力を支える重みを上書きしてしまう。根本原因は fine-tuning そのものではなく過学習であり、小さな学習率と少ないステップ、LoRA による本体の凍結、汎用コーパスの混入、汎用ベンチマークによる退行の監視で緩和できる。",
        "why": "網羅的: 忘却が起きることを確認し、やりすぎこそが根本原因だと指摘し、緩和手段を示している。"
      }
    ]
  },
  "data-quality": {
    "zh": [
      {
        "t": "資料當然越多越好，量堆得夠大，品質差一點也能靠數量補回來。",
        "ok": false,
        "why": "踩雷：過了基本量後，髒資料只會 garbage in, garbage out。"
      },
      {
        "t": "不是二選一：量要先夠到能涵蓋情境，但過了基本門檻後，品質與多樣性比純數量更關鍵；髒資料、錯標註會被照單全收（garbage in, garbage out），清洗、去重、修標註的投報率常高於一味加量。",
        "ok": true,
        "why": "完整：破二分法，說明門檻後品質壓過數量與髒資料的危害。"
      },
      {
        "t": "只要資料品質夠高，數量多少完全不重要。",
        "ok": false,
        "why": "過度修正：量太少會學不到、涵蓋不了情境，基本量仍要先夠。"
      }
    ],
    "en": [
      {
        "t": "More data is of course always better; pile up enough volume and slightly worse quality can be made up for by quantity.",
        "why": "Falls into the trap: past a basic volume, dirty data only leads to garbage in, garbage out."
      },
      {
        "t": "It is not either/or: volume must first be enough to cover the scenarios, but past a basic threshold, quality and diversity matter more than sheer quantity; dirty data and wrong labels are absorbed wholesale (garbage in, garbage out), and cleaning, deduplication, and fixing labels often have a higher return than blindly adding more data.",
        "why": "Complete: it breaks the dichotomy and explains that past the threshold quality outweighs quantity, plus the harm of dirty data."
      },
      {
        "t": "As long as the data quality is high enough, the amount does not matter at all.",
        "why": "Overcorrects: too little data means the model cannot learn or cover the scenarios; a basic volume is still needed first."
      }
    ],
    "ja": [
      {
        "t": "データは当然多いほど良く、量を十分に積み上げれば、多少品質が悪くても数で補える。",
        "why": "落とし穴にはまっている: 基本的な量を超えると、汚いデータは garbage in, garbage out にしかならない。"
      },
      {
        "t": "二者択一ではない。量はまず状況を網羅できる程度に必要だが、基本的な閾値を超えると、品質と多様性が純粋な量より重要になる。汚いデータや誤ったラベルはそのまま取り込まれ(garbage in, garbage out)、クレンジング、重複除去、ラベル修正の投資対効果は、やみくもに量を増やすことより高いことが多い。",
        "why": "網羅的: 二分法を崩し、閾値を超えると品質が量を上回ることと、汚いデータの害を説明している。"
      },
      {
        "t": "データの品質さえ十分に高ければ、量がどれだけあるかはまったく重要ではない。",
        "why": "過剰修正: 量が少なすぎると学習できず状況を網羅できないため、基本的な量はやはりまず必要である。"
      }
    ]
  },
  "why-not-pretrain": {
    "zh": [
      {
        "t": "從頭預訓練需要兆級 token、成千上萬張 GPU 練上數週數月、花費常百萬美元起跳與整組團隊，等於花大錢重造別人已做得更好的底子，而自有資料與算力通常也不夠；絕大多數情況應站在巨人肩膀上，把預算花在便宜得多的微調與 RAG。",
        "ok": true,
        "why": "完整：講出資料算力成本量級，也說明為何不划算與替代做法。"
      },
      {
        "t": "只要我們有自己的專屬資料，就該從頭自訓一個模型，這樣才會最貼合需求。",
        "ok": false,
        "why": "低估門檻：自有資料量與算力通常遠不足以贏過現成模型。"
      },
      {
        "t": "就只是比較貴而已，公司預算夠的話自己從頭練就好。",
        "ok": false,
        "why": "以偏概全：貴之外，這還是在重造現成的東西，且資料算力多半不足。"
      }
    ],
    "en": [
      {
        "t": "Pretraining from scratch requires trillions of tokens, thousands of GPUs running for weeks or months, costs that often start in the millions of dollars, and a whole team, which amounts to spending big to rebuild a foundation others have already done better, while your own data and compute are usually insufficient; in the vast majority of cases you should stand on the shoulders of giants and spend the budget on much cheaper fine-tuning and RAG.",
        "why": "Complete: it states the scale of data and compute costs and explains why it is not worthwhile and what to do instead."
      },
      {
        "t": "As long as we have our own proprietary data, we should train a model from scratch, because that fits our needs best.",
        "why": "Underestimates the bar: your own data volume and compute are usually far too little to beat an off-the-shelf model."
      },
      {
        "t": "It is just more expensive; if the company has enough budget, just train from scratch yourself.",
        "why": "Overgeneralizes: beyond cost, this is still rebuilding something that already exists, and data and compute are mostly insufficient."
      }
    ],
    "ja": [
      {
        "t": "ゼロからの事前学習には兆単位の token、数千枚の GPU で数週間から数か月の訓練、しばしば数百万ドルからの費用、そしてチーム一式が必要で、これは他者がすでにより良く作った土台を大金をかけて作り直すに等しく、自前のデータと計算資源も通常は足りない。ほとんどの場合、巨人の肩の上に立ち、予算をはるかに安い fine-tuning と RAG に充てるべきである。",
        "why": "網羅的: データと計算資源のコストの規模を述べ、なぜ割に合わないかと代替手段を説明している。"
      },
      {
        "t": "自分たち専用のデータさえあれば、ゼロからモデルを自前で訓練すべきで、そうしてこそニーズに最も合う。",
        "why": "ハードルを過小評価している: 自前のデータ量と計算資源は通常、既製モデルに勝つにはまったく足りない。"
      },
      {
        "t": "単に比較的高いだけで、会社の予算が十分なら自前でゼロから訓練すればよい。",
        "why": "一部で全体を語っている: 高いこと以外にも、これは既製のものを作り直すことであり、データと計算資源もたいてい足りない。"
      }
    ]
  },
  "scaling-law": {
    "zh": [
      {
        "t": "模型參數越多就一定越強，所以把參數無限加大就好。",
        "ok": false,
        "why": "忽略了要等比例配資料與算力，也忽略報酬遞減與資料上限。"
      },
      {
        "t": "scaling law 是經驗規律：模型、資料、算力一起放大，能力可預測地提升；但要按比例配（Chinchilla：很多大模型資料餵太少），而且報酬遞減，所以近年轉向資料品質、蒸餾與推理時運算。",
        "ok": true,
        "why": "講出經驗律＋三者配比＋Chinchilla＋報酬遞減＋新方向，才算完整理解。"
      },
      {
        "t": "scaling law 保證只要夠大就會出現任何能力，是嚴格的物理定律。",
        "ok": false,
        "why": "它是經驗觀察不是保證、會飽和；「湧現」說法也有爭議。"
      }
    ],
    "en": [
      {
        "t": "The more parameters a model has, the stronger it must be, so you should just increase parameters without limit.",
        "why": "It ignores that data and compute must be scaled proportionally, and ignores diminishing returns and the data ceiling."
      },
      {
        "t": "Scaling law is an empirical regularity: scale up model, data, and compute together and capability rises predictably; but they must be matched proportionally (Chinchilla: many large models were fed too little data), and returns diminish, so recent years have shifted toward data quality, distillation, and test-time compute.",
        "why": "Stating the empirical law + the ratio of the three + Chinchilla + diminishing returns + the new directions is what counts as complete understanding."
      },
      {
        "t": "Scaling law guarantees that any capability will appear as long as the model is big enough; it is a strict physical law.",
        "why": "It is an empirical observation, not a guarantee, and it saturates; the 'emergence' claim is also disputed."
      }
    ],
    "ja": [
      {
        "t": "モデルのパラメータが多いほど必ず強くなるので、パラメータを無限に増やせばよい。",
        "why": "データと計算資源を比例して組み合わせる必要があることを無視し、収穫逓減とデータの上限も無視している。"
      },
      {
        "t": "scaling law は経験則だ。モデル、データ、計算資源を一緒に拡大すると能力は予測可能に向上する。ただし比例して組み合わせる必要があり（Chinchilla：多くの大規模モデルはデータを与えられなさすぎていた）、しかも収穫逓減があるため、近年はデータ品質、蒸留、推論時の計算へと転じている。",
        "why": "経験則＋三つの配分比＋Chinchilla＋収穫逓減＋新たな方向性を述べて初めて、完全な理解といえる。"
      },
      {
        "t": "scaling law は、十分大きくしさえすればどんな能力でも現れることを保証する、厳密な物理法則だ。",
        "why": "それは経験的な観察であって保証ではなく、飽和する。「創発」という主張にも議論がある。"
      }
    ]
  },
  "train-vs-infer": {
    "zh": [
      {
        "t": "模型訓練完錢就一次付清了，之後拿來用（推論）幾乎不花什麼算力。",
        "ok": false,
        "why": "錯：每次對話都是一次推論，輸入要跑過整個模型，持續耗算力。"
      },
      {
        "t": "推論確實會花錢，但那只是伺服器租金和網路費，跟運算量沒什麼關係。",
        "ok": false,
        "why": "錯：推論成本主要來自跑整個模型的運算（GPU、電、時間）。"
      },
      {
        "t": "訓練是調參數學規律，慢、一次性、超貴；推論是用學好的參數算輸出、參數不動，平常用模型都在推論。推論也花錢是因為每問一次輸入都要跑過整個模型（大量運算），要 GPU、電與時間，用量一大就是持續成本。",
        "ok": true,
        "why": "完整：分清訓練與推論，並解釋推論為何是持續支出。"
      }
    ],
    "en": [
      {
        "t": "Once the model is trained the cost is paid in one go, and using it afterward (inference) barely consumes any compute.",
        "why": "Wrong: every conversation is an inference, the input has to run through the whole model, so it continuously consumes compute."
      },
      {
        "t": "Inference does cost money, but that is just server rent and network fees, with little to do with the amount of computation.",
        "why": "Wrong: inference cost comes mainly from the computation of running the whole model (GPU, electricity, time)."
      },
      {
        "t": "Training adjusts parameters to learn patterns: slow, one-time, and very expensive; inference uses the learned parameters to compute outputs with the parameters fixed, and everyday use of the model is all inference. Inference costs money too because each query has to run the input through the whole model (a lot of computation), needing GPU, electricity, and time, and at high volume that becomes an ongoing cost.",
        "why": "Complete: it distinguishes training from inference and explains why inference is an ongoing expense."
      }
    ],
    "ja": [
      {
        "t": "モデルの訓練が終われば費用は一度で払い切りで、その後に使う(推論)ときはほとんど計算資源を使わない。",
        "why": "誤り: 会話のたびに一回の推論が発生し、入力はモデル全体を通す必要があるため、継続的に計算資源を消費する。"
      },
      {
        "t": "推論にはたしかに費用がかかるが、それはサーバーの賃料とネットワーク費用にすぎず、計算量とはほとんど関係ない。",
        "why": "誤り: 推論のコストは主に、モデル全体を走らせる計算(GPU、電力、時間)から生じる。"
      },
      {
        "t": "訓練はパラメータを調整して規則を学ぶもので、遅く、一度きりで、非常に高い。推論は学習済みのパラメータを使って出力を計算するもので、パラメータは動かさず、普段モデルを使うのはすべて推論である。推論も費用がかかるのは、一回問うごとに入力をモデル全体に通す必要があり(大量の計算)、GPU、電力、時間を要するためで、利用量が増えれば継続的なコストになる。",
        "why": "網羅的: 訓練と推論を区別し、なぜ推論が継続的な支出になるかを説明している。"
      }
    ]
  },
  "context-window": {
    "zh": [
      {
        "t": "上下文塞不下時，就上 RAG，把資料丟進向量庫再檢索回來就解決了。",
        "ok": false,
        "why": "只丟一個工具名，沒講根源與取捨，也漏了摘要、滑動視窗、記憶等其他做法。"
      },
      {
        "t": "窗口有上限是因為模型只在固定長度上訓練、位置編碼在範圍外不可靠，加上注意力 O(n²) 越塞越貴、中段還常被忽略；所以重點是管理上下文預算：留最相關／最近的（截斷、滑動視窗）、把舊的壓成摘要、用 RAG 每次只取相關片段、跨會話用記憶，依場景組合，各有取捨。",
        "ok": true,
        "why": "講出成因＋為何不是一味開大＋多種做法與取捨，正是這題想問的。"
      },
      {
        "t": "現在模型窗口都做到幾十萬 token 了，直接換大窗口的模型就好，根本不用煩惱。",
        "ok": false,
        "why": "開大窗口貴又慢，中段資訊照樣被忽略，不是萬靈丹。"
      }
    ],
    "en": [
      {
        "t": "When the context does not fit, just use RAG: drop the data into a vector store and retrieve it back, problem solved.",
        "why": "It names a single tool without the root cause or tradeoffs, and skips summarization, sliding windows, and memory."
      },
      {
        "t": "The window is capped because the model was trained on a fixed length, position encoding is unreliable beyond that range, and attention is O(n squared) so cramming in more gets slow and costly while the middle often gets ignored. So the real job is managing the context budget: keep the most relevant or recent parts (truncation, sliding window), compress old turns into summaries, use RAG to pull only the relevant snippets, and use memory across sessions, combining them by scenario with each having its own tradeoffs.",
        "why": "It gives the cause, why bigger is not the answer, and several methods with their tradeoffs, which is exactly what the question is really after."
      },
      {
        "t": "Models now ship with windows of hundreds of thousands of tokens, so just switch to a big-window model and stop worrying about it.",
        "why": "A bigger window is expensive and slow, and middle content still gets ignored, so it is not a cure-all."
      }
    ],
    "ja": [
      {
        "t": "コンテキストに収まらないときは RAG を使えばいい：データをベクトルストアに入れて検索で取り戻せば解決する。",
        "why": "ツール名を一つ挙げただけで、原因やトレードオフに触れず、要約・スライディングウィンドウ・記憶にも言及していない。"
      },
      {
        "t": "窓に上限があるのは、モデルが固定長で訓練され、位置エンコーディングがその範囲外では信頼できず、さらに注意機構が O(n^2) なので詰めるほど遅く高価になり、中盤は無視されやすいからです。だから本質はコンテキスト予算の管理：最も関連する／新しい部分を残す（切り詰め、スライディングウィンドウ）、古い履歴は要約に圧縮、RAG で関連する断片だけ取り出す、セッションをまたぐなら記憶を使う、と場面ごとに組み合わせ、それぞれに取捨があります。",
        "why": "原因＋なぜ大きくするだけではないか＋複数の手法と取捨を語っており、まさにこの設問で問われる水準です。"
      },
      {
        "t": "今のモデルは数十万トークンの窓を積んでいるので、大きな窓のモデルに乗り換えれば悩む必要はない。",
        "why": "窓を大きくしても高価で遅く、中盤の情報は相変わらず無視されるため、万能薬ではない。"
      }
    ]
  },
  "faster-inference": {
    "zh": [
      {
        "t": "最直接的辦法就是換一個更小的模型，或多加幾張 GPU 硬撐。",
        "ok": false,
        "why": "太粗：題目要在不換模型、不重訓的前提下的多種手段與取捨。"
      },
      {
        "t": "在不換模型下有多種手段可組合：量化（降數值精度，省記憶體又加速但可能掉點準）、KV cache（快取前面 token 的 Key／Value 免得重算）、批次（一次處理多請求提高吞吐）、推測解碼（小模型草擬、大模型平行驗證，主要降延遲）；要依低延遲、高吞吐或省記憶體的目標選招，並盯著精度別掉太多。",
        "ok": true,
        "why": "完整：列出多種手段與各自取捨，並強調依目標選擇與組合。"
      },
      {
        "t": "只要把模型量化到最低精度，推論自然又快又省，其他都不必管。",
        "ok": false,
        "why": "以偏概全：只用一招且忽略掉準風險與依目標選擇的取捨。"
      }
    ],
    "en": [
      {
        "t": "The most direct approach is to switch to a smaller model, or just add a few more GPUs to brute-force it.",
        "why": "Too crude: the question asks for multiple methods and trade-offs under the premise of not switching models and not retraining."
      },
      {
        "t": "Without changing the model there are several methods you can combine: quantization (lower numerical precision, saving memory and speeding up but possibly losing some accuracy), KV cache (caching earlier tokens' Key/Value to avoid recomputing), batching (handling multiple requests at once to raise throughput), and speculative decoding (a small model drafts and a large model verifies in parallel, mainly reducing latency); choose the tactic based on your goal of low latency, high throughput, or saving memory, and keep an eye on accuracy so it does not drop too much.",
        "why": "Complete: it lists several methods with their trade-offs and stresses choosing and combining them by goal."
      },
      {
        "t": "Just quantize the model to the lowest precision and inference will naturally be fast and cheap, with nothing else to worry about.",
        "why": "Overgeneralizes: it uses only one tactic and ignores the accuracy-drop risk and the trade-off of choosing by goal."
      }
    ],
    "ja": [
      {
        "t": "最も手っ取り早い方法は、より小さいモデルに換えるか、GPU を数枚追加して力任せに乗り切ることである。",
        "why": "大雑把すぎる: 設問はモデルを換えず再訓練もしないという前提での複数の手段とトレードオフを求めている。"
      },
      {
        "t": "モデルを換えずに組み合わせられる手段は複数ある。量子化(数値精度を下げてメモリを節約し高速化するが、精度が多少落ちる可能性がある)、KV cache(前の token の Key/Value をキャッシュして再計算を避ける)、バッチ処理(一度に複数のリクエストを処理してスループットを上げる)、投機的デコーディング(小さいモデルが下書きし大きいモデルが並行して検証する、主に遅延を下げる)である。低遅延、高スループット、メモリ節約のどの目標かに応じて手を選び、精度が落ちすぎないよう見張る必要がある。",
        "why": "網羅的: 複数の手段とそれぞれのトレードオフを挙げ、目標に応じて選び組み合わせることを強調している。"
      },
      {
        "t": "モデルを最低精度まで量子化しさえすれば、推論は自然と速く安くなり、他は気にする必要がない。",
        "why": "一部で全体を語っている: 一つの手だけを使い、精度低下のリスクや目標に応じて選ぶトレードオフを無視している。"
      }
    ]
  },
  "temperature": {
    "zh": [
      {
        "t": "temperature 調高就是讓模型更聰明、想得更深，所以要好答案就把它開大。",
        "ok": false,
        "why": "調高只是更隨機、更容易離題，不等於更聰明。"
      },
      {
        "t": "把 temperature 設成 0，模型每次都給一樣的答案，就能保證答案是正確的。",
        "ok": false,
        "why": "設 0 只是更一致、每次一樣，一致不等於正確。"
      },
      {
        "t": "模型每生一個字是先算出候選字的機率分佈、再從中取樣，不是每次都挑最高的，這隨機性是設計、不是壞掉；temperature 就是控制隨機度的旋鈕：高（1 以上）分佈變平、更有創意但易離題，低（趨近 0）分佈變尖、穩定保守，所以要創意就調高、要正確與可重現就調低，換的是創意 vs 一致。",
        "ok": true,
        "why": "講出取樣機制＋是設計＋旋鈕作用＋取捨與如何依任務調，正中重點。"
      }
    ],
    "en": [
      {
        "t": "Turning temperature up makes the model smarter and think more deeply, so crank it up when you want a good answer.",
        "why": "Turning it up only makes it more random and prone to drifting off topic, which is not the same as smarter."
      },
      {
        "t": "Set temperature to 0 and the model returns the same answer every time, which guarantees the answer is correct.",
        "why": "Setting it to 0 only makes it more consistent and repeatable, and consistency does not equal correctness."
      },
      {
        "t": "For each token the model computes a probability distribution over candidates and samples from it rather than always picking the top one, and that randomness is by design, not a bug. Temperature is the knob for how random that sampling is: high (above 1) flattens the distribution and is more creative but drifts, low (near 0) sharpens it and is stable and conservative, so raise it for creativity and lower it for correctness and reproducibility, trading creativity against consistency.",
        "why": "It gives the sampling mechanism, that it is by design, what the knob does, and the tradeoff and how to tune by task, hitting the point."
      }
    ],
    "ja": [
      {
        "t": "temperature を上げるとモデルが賢くなり、より深く考えるので、良い答えが欲しいときは大きくすればよい。",
        "why": "上げても単にランダムになり脱線しやすくなるだけで、賢くなるわけではない。"
      },
      {
        "t": "temperature を 0 にすればモデルは毎回同じ答えを返すので、答えが正しいと保証できる。",
        "why": "0 にしても一貫性が上がり毎回同じになるだけで、一貫性は正しさとは別物。"
      },
      {
        "t": "モデルはトークンごとに候補の確率分布を計算し、そこからサンプリングしていて、毎回最高確率を選ぶわけではありません。この乱数性は設計であってバグではなく、temperature はその乱数の強さを決めるつまみです：高い（1 以上）と分布が平らになり創造的だが脱線しやすく、低い（0 付近）だと分布が尖り安定して保守的になるので、創造性が欲しければ上げ、正確さと再現性が欲しければ下げる、つまり創造性 vs 一貫性のトレードオフです。",
        "why": "サンプリング機構＋設計であること＋つまみの働き＋取捨とタスク別の調整を語っており、要点を突いている。"
      }
    ]
  },
  "prompt-craft": {
    "zh": [
      {
        "t": "prompt 的作用是把角色、脈絡、輸出格式講清楚，幫模型縮小生成範圍；原則包含明確角色與任務、給脈絡與限制、指定格式、用 few-shot 範例、複雜任務請它分步，而且要當成可迭代工程反覆寫、測、改。",
        "ok": true,
        "why": "同時涵蓋原理、具體原則與迭代心法，完整對應重點。"
      },
      {
        "t": "prompt 就是把問題完整打進去，只要問題本身講清楚，模型自然會答好，寫法不太影響結果。",
        "ok": false,
        "why": "誤把 prompt 當成單純輸入問題，忽略寫法會決定模型的生成範圍。"
      },
      {
        "t": "只要在開頭加一句「你是專家」並要求逐步思考，就一定能得到最佳答案，不必再調整。",
        "ok": false,
        "why": "把 prompt 化約成單一咒語，忽略脈絡、格式、範例與反覆迭代。"
      }
    ],
    "en": [
      {
        "t": "A prompt's job is to clearly specify the role, context, and output format so the model narrows its generation space. The principles include a clear role and task, giving context and constraints, specifying the format, using few-shot examples, asking it to work step by step on complex tasks, and treating it as iterative engineering that you write, test, and revise repeatedly.",
        "why": "It covers the underlying principle, the concrete guidelines, and the iterative mindset, fully matching the key points."
      },
      {
        "t": "A prompt is just typing the full question in; as long as the question itself is clear, the model will naturally answer well, and how you write it barely affects the result.",
        "why": "This mistakes a prompt for merely entering a question, ignoring that how you write it determines the model's generation space."
      },
      {
        "t": "Just add \"you are an expert\" at the start and ask it to think step by step, and you will always get the best answer with no further adjustment needed.",
        "why": "This reduces a prompt to a single magic phrase, ignoring context, format, examples, and repeated iteration."
      }
    ],
    "ja": [
      {
        "t": "prompt の役割は、役割・文脈・出力形式を明確に伝えてモデルの生成範囲を絞ることです。原則としては、役割とタスクを明確にする、文脈と制約を与える、形式を指定する、few-shot の例を使う、複雑なタスクは段階的に進めさせる、そして書いて試して直すを繰り返す反復的なエンジニアリングとして扱う、が含まれます。",
        "why": "原理、具体的な原則、反復の心構えを同時にカバーし、要点に完全に対応しています。"
      },
      {
        "t": "prompt とは質問をそのまま丸ごと打ち込むことであり、質問自体が明確でありさえすればモデルは自然にうまく答えるので、書き方は結果にあまり影響しない。",
        "why": "prompt を単なる質問の入力だと誤解しており、書き方がモデルの生成範囲を決めることを見落としています。"
      },
      {
        "t": "冒頭に「あなたは専門家です」と一言加えて段階的に考えるよう求めさえすれば、必ず最良の答えが得られ、それ以上調整する必要はない。",
        "why": "prompt を単一の呪文に還元しており、文脈・形式・例・繰り返しの反復を見落としています。"
      }
    ]
  },
  "few-shot": {
    "zh": [
      {
        "t": "zero-shot 只給指令、few-shot 附幾個「輸入→輸出」範例，是在 prompt 裡當場教、不動權重；範例的作用是校準輸出格式、語氣與判斷邊界，分類、抽取、固定格式的任務常一兩個好範例勝過長篇描述；格式嚴、風格特殊、邊界模糊時才給，因為它佔 token、增成本。",
        "ok": true,
        "why": "講出兩者差別＋範例校準了什麼＋何時給與取捨，正中重點。"
      },
      {
        "t": "few-shot 一定比 zero-shot 準，範例塞越多越好，所以每題都盡量多給範例。",
        "ok": false,
        "why": "範例佔 token、拉高成本，簡單任務 zero-shot 就夠，塞多不一定更準。"
      },
      {
        "t": "隨手貼幾個最簡單的例子讓它照抄就好，反正給了範例它就會了。",
        "ok": false,
        "why": "範例全是簡單案例，遇到邊界案例就崩，也沒講範例到底校準了什麼。"
      }
    ],
    "en": [
      {
        "t": "Zero-shot gives only the instruction while few-shot attaches a few input to output examples, teaching on the spot inside the prompt without changing the weights. The examples calibrate output format, tone, and judgment boundaries, and for classification, extraction, and fixed-format tasks one or two good examples often beat a long description. Give them when the format is strict, the style is unusual, or the boundary is fuzzy, since they cost tokens and add cost.",
        "why": "It states the difference, what the examples calibrate, and when to give them with the tradeoff, hitting the point."
      },
      {
        "t": "Few-shot is always more accurate than zero-shot, and more examples are always better, so pack in as many examples as you can for every task.",
        "why": "Examples cost tokens and raise cost, simple tasks are fine with zero-shot, and piling on examples does not necessarily improve accuracy."
      },
      {
        "t": "Just paste a few of the simplest examples for it to copy, since once you give examples it will get it.",
        "why": "Examples that are all simple cases break on edge cases, and it never says what the examples actually calibrate."
      }
    ],
    "ja": [
      {
        "t": "zero-shot は指示だけを与え、few-shot は「入力→出力」の例をいくつか添えるもので、重みを変えずにプロンプトの中でその場で教えます。例は出力の形式・口調・判断の境界を較正し、分類・抽出・固定フォーマットの課題では一つ二つの良い例が長い説明に勝つことも多い。形式が厳しい、スタイルが特殊、境界が曖昧なときに与えるのは、例がトークンを食いコストを増やすからです。",
        "why": "両者の違い＋例が何を較正するか＋いつ与えるかと取捨を語っており、要点を突いている。"
      },
      {
        "t": "few-shot は必ず zero-shot より正確で、例は多いほどよいので、どの課題でもできるだけ多くの例を入れる。",
        "why": "例はトークンを消費してコストを上げ、簡単な課題は zero-shot で十分で、詰め込んでも必ずしも正確になるとは限らない。"
      },
      {
        "t": "一番簡単な例をいくつか貼って真似させればいい、例さえ与えればできるようになるのだから。",
        "why": "簡単な例ばかりでは境界的なケースで崩れ、そもそも例が何を較正するのかを語っていない。"
      }
    ]
  },
  "cot-prompting": {
    "zh": [
      {
        "t": "CoT 就是在 prompt 尾巴加一句「請一步步想」的萬用咒語，加了就一定更準。",
        "ok": false,
        "why": "把 CoT 當成魔法句，忽略它的原理、代價與適用界線。"
      },
      {
        "t": "只要讓模型展開推理步驟，任何題目、任何模型的正確率都會提升，而且沒有額外成本。",
        "ok": false,
        "why": "忽略簡單題無益、小模型不穩，以及 token、延遲、成本的代價。"
      },
      {
        "t": "CoT 是讓模型先寫出中間步驟再下結論，把難題拆成好猜的小步以提高正確率；代價是 token、延遲與成本，簡單題沒必要，小模型效果有限，還可能過程漂亮但結論錯。",
        "ok": true,
        "why": "說清楚是什麼、為何有用，並點出代價與界線。"
      }
    ],
    "en": [
      {
        "t": "CoT is just a universal magic phrase, adding \"think step by step\" at the end of the prompt, and adding it always makes things more accurate.",
        "why": "This treats CoT as a magic phrase, ignoring its underlying principle, its costs, and the limits of where it applies."
      },
      {
        "t": "As long as you make the model lay out its reasoning steps, accuracy will improve on any problem and any model, with no extra cost.",
        "why": "This ignores that it does not help on simple problems, that small models are unstable, and the costs in tokens, latency, and money."
      },
      {
        "t": "CoT has the model write out intermediate steps before drawing a conclusion, breaking a hard problem into small, easier-to-guess steps to raise accuracy. The cost is tokens, latency, and money; it is unnecessary on simple problems, its effect on small models is limited, and the reasoning can look good while the conclusion is wrong.",
        "why": "It clearly states what it is and why it helps, and points out the costs and limits."
      }
    ],
    "ja": [
      {
        "t": "CoT とは prompt の末尾に「一歩ずつ考えてください」と付け足す万能の呪文であり、付ければ必ず精度が上がる。",
        "why": "CoT を魔法の一文とみなし、その原理・コスト・適用の限界を見落としています。"
      },
      {
        "t": "モデルに推論のステップを展開させさえすれば、どんな問題でもどんなモデルでも正確率が上がり、しかも追加コストはかからない。",
        "why": "簡単な問題では役立たないこと、小さいモデルでは不安定なこと、そして token・レイテンシ・コストという代償を見落としています。"
      },
      {
        "t": "CoT はモデルにまず中間ステップを書かせてから結論を出させるもので、難問を推測しやすい小さなステップに分解して正確率を高めます。代償は token・レイテンシ・コストで、簡単な問題では不要、小さいモデルでは効果が限られ、さらに過程は立派でも結論は間違っていることもあります。",
        "why": "何であるか、なぜ有効かを明確にし、代償と限界も指摘しています。"
      }
    ]
  },
  "prompt-eval": {
    "zh": [
      {
        "t": "多試幾個例子，覺得回答變順、變好，就可以上線了。",
        "ok": false,
        "why": "憑感覺、樣本太少，容易「改 A 壞 B」，沒有可重複的依據。"
      },
      {
        "t": "先定義可量的指標，建一組固定的 golden set（含刁鑽案例）離線比新舊版本、防退步；開放式用 rubric 或校準過的 LLM-as-judge；離線贏了再上線 A/B 看真實效果。",
        "ok": true,
        "why": "定義指標＋離線回歸＋合適的評分＋線上 A/B，才是可量測、可重複的評估。"
      },
      {
        "t": "跑公開 benchmark，分數高就代表這個 prompt 好。",
        "ok": false,
        "why": "公開 benchmark 只是參考，跟你的實際任務常有落差，要用貼近任務的 golden set。"
      }
    ],
    "en": [
      {
        "t": "Try a few more examples, and once the answers feel smoother and better, you can ship it.",
        "why": "Going by gut feel with too few samples easily leads to \"fixing A while breaking B\", with no repeatable basis."
      },
      {
        "t": "First define a measurable metric, build a fixed golden set (including tricky cases) to compare new and old versions offline and guard against regressions; for open-ended tasks use a rubric or a calibrated LLM-as-judge; once it wins offline, run online A/B to see the real effect.",
        "why": "Defining metrics plus offline regression plus suitable scoring plus online A/B is what makes evaluation measurable and repeatable."
      },
      {
        "t": "Run a public benchmark, and a high score means this prompt is good.",
        "why": "A public benchmark is only a reference and often diverges from your actual task; use a golden set that is close to the task."
      }
    ],
    "ja": [
      {
        "t": "いくつか例を試してみて、回答がスムーズで良くなったと感じたら公開してよい。",
        "why": "感覚に頼りサンプルが少なすぎると「Aを直してBが壊れる」が起きやすく、再現可能な根拠がない。"
      },
      {
        "t": "まず測定可能な指標を定義し、固定したgolden set（意地悪なケースを含む）を作ってオフラインで新旧バージョンを比較しリグレッションを防ぐ；オープンな場合はrubricか校正済みのLLM-as-judgeを使う；オフラインで勝ってからオンラインA/Bで実際の効果を見る。",
        "why": "指標の定義＋オフラインのリグレッション＋適切な採点＋オンラインA/Bこそが、測定可能で再現可能な評価だ。"
      },
      {
        "t": "公開benchmarkを走らせて、スコアが高ければこのpromptは良いということだ。",
        "why": "公開benchmarkは参考にすぎず、実際のタスクとはしばしばずれるため、タスクに近いgolden setを使うべきだ。"
      }
    ]
  },
  "prompt-vs-tune-vs-rag": {
    "zh": [
      {
        "t": "不管是哪種問題，先反覆改 prompt 就對了，真的改不出來再直接跳去微調。",
        "ok": false,
        "why": "沒先診斷問題類型，跳過 RAG，順序與判斷都不對。"
      },
      {
        "t": "先診斷問題類型：格式、語氣或一次性任務先調 prompt；答錯、過時或私有事實用 RAG；要穩定風格或大量固定行為才微調，順序由便宜到貴是 prompt → RAG → 微調。",
        "ok": true,
        "why": "先分類問題再對症下藥，並給出由便宜到貴的處理順序。"
      },
      {
        "t": "微調一定比 prompt 和 RAG 更強，只要資源夠就應該優先微調。",
        "ok": false,
        "why": "忽略成本與問題類型，多數問題其實不需要微調就能解決。"
      }
    ],
    "en": [
      {
        "t": "No matter what kind of problem it is, just keep revising the prompt first, and if that really does not work, jump straight to fine-tuning.",
        "why": "This does not first diagnose the type of problem and skips RAG, so both the ordering and the judgment are wrong."
      },
      {
        "t": "First diagnose the type of problem: for format, tone, or one-off tasks, adjust the prompt first; for wrong, outdated, or private facts, use RAG; only fine-tune when you need a stable style or a lot of fixed behavior. Ordered cheap to expensive, it is prompt → RAG → fine-tuning.",
        "why": "It classifies the problem first and then treats it accordingly, and gives a cheap-to-expensive order of handling."
      },
      {
        "t": "Fine-tuning is always stronger than prompting and RAG, so as long as you have enough resources you should fine-tune first.",
        "why": "This ignores cost and the type of problem; most problems can actually be solved without fine-tuning."
      }
    ],
    "ja": [
      {
        "t": "どんな問題であれ、まず prompt を繰り返し直せばよく、それでもどうにもならなければそのまま fine-tuning に飛べばよい。",
        "why": "問題の種類をまず診断せず、RAG を飛ばしており、順序も判断も誤っています。"
      },
      {
        "t": "まず問題の種類を診断します。形式・トーン・一回限りのタスクはまず prompt を調整し、誤答・古い情報・非公開の事実には RAG を使い、安定したスタイルや大量の固定的な振る舞いが必要なときだけ fine-tuning します。安い順から高い順に並べると prompt → RAG → fine-tuning です。",
        "why": "まず問題を分類してから対症的に対処し、安い順から高い順への処理順序を示しています。"
      },
      {
        "t": "fine-tuning は必ず prompt や RAG より強力なので、リソースさえ足りれば優先的に fine-tuning すべきだ。",
        "why": "コストと問題の種類を見落としており、ほとんどの問題は実際には fine-tuning なしで解決できます。"
      }
    ]
  },
  "reasoning-models": {
    "zh": [
      {
        "t": "推理模型就是更聰明的版本，所以什麼題都丟給它算最保險。",
        "ok": false,
        "why": "講不出長 CoT／RL 的機制與代價，而且什麼都用它會讓成本與延遲爆炸。"
      },
      {
        "t": "一般 LLM 傾向一步到位，推理模型被訓練成先想很久（長 CoT）再答、並用 RL 獎勵「推得對」，換來的是難題正確率，代價是延遲高、成本高（很多 token 花在看不見的思考上）；所以數學、程式、多步規劃這類難題值得用，簡單問答用它又慢又貴。",
        "ok": true,
        "why": "講出長 CoT＋RL＋代價＋何時用，正中重點。"
      },
      {
        "t": "推理模型會一步步把過程想清楚，所以它算出來的答案不會錯。",
        "ok": false,
        "why": "它只是難題較準，仍會出錯，不是不會錯。"
      }
    ],
    "en": [
      {
        "t": "A reasoning model is just a smarter version, so the safest bet is to throw every question at it.",
        "why": "It fails to explain the long CoT and RL mechanism and the cost, and using it for everything makes cost and latency explode."
      },
      {
        "t": "A general LLM tends to answer in one shot, while a reasoning model is trained to think for a long time (long chain of thought) before answering and uses RL to reward reasoning correctly, buying higher accuracy on hard problems at the cost of high latency and cost because many tokens go into invisible thinking. So it is worth it for hard problems like math, code, and multi-step planning, while for simple Q and A it is slow and expensive.",
        "why": "It states the long CoT, the RL, the cost, and when to use it, hitting the point."
      },
      {
        "t": "A reasoning model thinks through the steps carefully, so the answer it produces will not be wrong.",
        "why": "It is only more accurate on hard problems and still makes mistakes, so it is not error-free."
      }
    ],
    "ja": [
      {
        "t": "推論モデルはより賢い版なので、どんな問題でもとりあえず投げておくのが一番安全だ。",
        "why": "長い CoT や RL の仕組みと代償を語れておらず、何でも使うとコストと遅延が爆発する。"
      },
      {
        "t": "一般の LLM は一発で答えがちですが、推論モデルは答える前に長く考える（長い思考連鎖）よう訓練され、RL で「正しく推論できたこと」を報酬にします。その見返りに難問の正解率が上がる一方、遅延が高くコストも高い（多くのトークンを見えない思考に使う）ので、数学・プログラム・多段の計画といった難問には値するが、簡単な質疑応答に使うと遅くて高い。",
        "why": "長い CoT ＋ RL ＋代償＋いつ使うかを語っており、要点を突いている。"
      },
      {
        "t": "推論モデルは手順を一歩ずつしっかり考えるので、出してくる答えは間違わない。",
        "why": "難問で正解率が高いだけで依然として間違うため、間違えないわけではない。"
      }
    ]
  },
  "test-time-compute": {
    "zh": [
      {
        "t": "推理時多花算力去拆解、嘗試與自我檢查，難題就更可能答對；做法有 CoT、self-consistency 多路投票、生成後驗證，但這是算力換正確率且邊際遞減，要依難度決定想多久。",
        "ok": true,
        "why": "解釋多花算力換正確率的原理、做法與取捨。"
      },
      {
        "t": "test-time compute 只是一個名詞，指模型推理時比較慢，和正確率沒有直接關係。",
        "ok": false,
        "why": "只停在背名詞，沒理解多花推理步驟能換取正確率的原理。"
      },
      {
        "t": "只要讓模型想越久、算越多，正確率就會一直線性上升，所以永遠拉到最長最好。",
        "ok": false,
        "why": "忽略邊際遞減與成本，簡單題拉長其實沒有幫助。"
      }
    ],
    "en": [
      {
        "t": "Spending more compute at inference time to break the problem down, try things, and self-check makes hard problems more likely to be answered correctly. Approaches include CoT, self-consistency with multi-path voting, and post-generation verification, but this trades compute for accuracy with diminishing returns, so decide how long to think based on difficulty.",
        "why": "It explains the principle of trading more compute for accuracy, the methods, and the trade-offs."
      },
      {
        "t": "Test-time compute is just a term meaning the model is slower at inference time, with no direct relationship to accuracy.",
        "why": "This stops at memorizing the term and does not understand the principle that spending more reasoning steps can buy accuracy."
      },
      {
        "t": "The longer you let the model think and the more it computes, the more accuracy keeps rising linearly, so it is always best to push it to the maximum.",
        "why": "This ignores diminishing returns and cost; drawing it out actually does not help on simple problems."
      }
    ],
    "ja": [
      {
        "t": "推論時により多くの計算資源をかけて分解・試行・自己チェックを行うと、難問を正しく答えられる可能性が高まります。手法には CoT、self-consistency による複数経路の投票、生成後の検証があります。ただしこれは計算資源を正確率と引き換えにするもので、限界効用は逓減するため、難易度に応じてどれだけ考えるかを決めます。",
        "why": "計算資源をより多くかけて正確率と引き換える原理・手法・トレードオフを説明しています。"
      },
      {
        "t": "test-time compute は単なる用語で、モデルが推論時に遅いことを指すだけで、正確率とは直接の関係がない。",
        "why": "用語を暗記するだけにとどまり、推論のステップをより多くかけることで正確率を得られるという原理を理解していません。"
      },
      {
        "t": "モデルに長く考えさせ、より多く計算させさえすれば、正確率はずっと線形に上がり続けるので、常に最長まで引き伸ばすのが最善だ。",
        "why": "限界効用の逓減とコストを見落としており、簡単な問題では引き伸ばしても実際には役立ちません。"
      }
    ]
  },
  "cot-limits": {
    "zh": [
      {
        "t": "CoT 是萬靈丹，任何題目只要加上逐步推理都會更準、也更可信。",
        "ok": false,
        "why": "忽略它只對難題有用，以及自圓其說的副作用與界線。"
      },
      {
        "t": "CoT 唯一的缺點就是比較慢，只要能接受延遲就永遠應該打開。",
        "ok": false,
        "why": "忽略對簡單題無益、可能配出像樣推理誤導人、小模型不穩。"
      },
      {
        "t": "CoT 只對多步難題有用，簡單題只是多花 token；副作用是模型可能替錯答案配上像樣的推理而更誤導人，小模型常不穩，要依難度與模型能力判斷，過程漂亮不代表答案對，重要結論仍要驗證。",
        "ok": true,
        "why": "點出適用界線、自圓其說的副作用與該如何判斷。"
      }
    ],
    "en": [
      {
        "t": "CoT is a cure-all: on any problem, adding step-by-step reasoning makes it more accurate and more trustworthy.",
        "why": "This ignores that it only helps on hard problems, along with the side effect of plausible self-justification and its limits."
      },
      {
        "t": "CoT's only drawback is that it is slower, so as long as you can accept the latency you should always turn it on.",
        "why": "This ignores that it does not help on simple problems, that it can pair plausible-looking reasoning with a wrong answer and mislead you, and that small models are unstable."
      },
      {
        "t": "CoT only helps on multi-step hard problems; on simple ones it just spends more tokens. A side effect is that the model may pair plausible-looking reasoning with a wrong answer and mislead you more, and small models are often unstable, so judge by difficulty and model capability. A nice-looking process does not mean the answer is right, and important conclusions still need verification.",
        "why": "It points out the limits of where it applies, the self-justification side effect, and how to judge."
      }
    ],
    "ja": [
      {
        "t": "CoT は万能薬であり、どんな問題でも段階的な推論を加えれば必ず精度が上がり、信頼性も高まる。",
        "why": "難問にしか役立たないこと、そしてもっともらしく取り繕う副作用と限界を見落としています。"
      },
      {
        "t": "CoT の唯一の欠点は遅いことだけであり、レイテンシを許容できるなら常にオンにすべきだ。",
        "why": "簡単な問題では役立たないこと、もっともらしい推論を付けて人を誤導しかねないこと、小さいモデルでは不安定なことを見落としています。"
      },
      {
        "t": "CoT は多段階の難問にしか役立たず、簡単な問題では token を余計に使うだけです。副作用として、モデルが誤った答えにもっともらしい推論を付けてかえって人を誤導することがあり、小さいモデルはしばしば不安定なので、難易度とモデルの能力に応じて判断します。過程が立派でも答えが正しいとは限らず、重要な結論はやはり検証が必要です。",
        "why": "適用の限界、もっともらしく取り繕う副作用、そしてどう判断すべきかを指摘しています。"
      }
    ]
  },
  "rag-documents": {
    "zh": [
      {
        "t": "把 Word 或 PDF 檔直接丟進 RAG 就能用，格式不是問題。",
        "ok": false,
        "why": "RAG 只吃純文字與向量，忽略了解析這一關才是成敗關鍵。"
      },
      {
        "t": "RAG 存的是文字片段的向量而非檔案本身，所以要先把 Word、PDF 抽成純文字；表格、多欄、標題階層需版面感知解析，掃描檔要先 OCR，再清理、依結構切塊、向量化、存庫，解析品質就是 RAG 品質的天花板。",
        "ok": true,
        "why": "破除誤解並講清楚解析、切塊到入庫的完整管線與取捨。"
      },
      {
        "t": "只要用工具把檔案轉成純文字就好，表格、多欄或掃描檔都能一視同仁直接抽。",
        "ok": false,
        "why": "忽略版面感知解析與 OCR，純抽會把表格與結構糊成一團。"
      }
    ],
    "en": [
      {
        "t": "You can just drop a Word or PDF file straight into RAG and it works; format is not an issue.",
        "why": "RAG only takes plain text and vectors; this ignores that the parsing step is what makes or breaks it."
      },
      {
        "t": "RAG stores vectors of text fragments rather than the files themselves, so you first extract Word and PDF into plain text; tables, multiple columns, and heading hierarchies need layout-aware parsing, scanned files need OCR first, then you clean, chunk by structure, vectorize, and store. Parsing quality is the ceiling on RAG quality.",
        "why": "It dispels the misconception and clearly lays out the full pipeline from parsing through chunking to storage, and the trade-offs."
      },
      {
        "t": "You just need a tool to convert files into plain text; tables, multiple columns, and scanned files can all be extracted directly and treated the same way.",
        "why": "This ignores layout-aware parsing and OCR; plain extraction smears tables and structure into a mush."
      }
    ],
    "ja": [
      {
        "t": "Word や PDF のファイルをそのまま RAG に放り込めば使えて、形式は問題にならない。",
        "why": "RAG は純テキストと embedding のベクトルしか受け付けず、解析という関門こそが成否の鍵であることを見落としています。"
      },
      {
        "t": "RAG が保存するのはテキスト断片のベクトルであってファイルそのものではないため、まず Word や PDF を純テキストに抽出します。表・多段組み・見出しの階層には版面を意識した解析が必要で、スキャン文書はまず OCR にかけ、そのうえで整形し、構造に沿って chunk に分割し、ベクトル化して保存します。解析の品質こそが RAG の品質の天井です。",
        "why": "誤解を解いたうえで、解析から chunk 分割、格納までの完全なパイプラインとトレードオフを明確に説明しています。"
      },
      {
        "t": "ツールでファイルを純テキストに変換しさえすればよく、表・多段組み・スキャン文書もすべて同じように直接抽出できる。",
        "why": "版面を意識した解析と OCR を見落としており、単純な抽出では表と構造が一団子に潰れてしまいます。"
      }
    ]
  },
  "chunking": {
    "zh": [
      {
        "t": "就按固定字數（例如每 1000 字）一刀切下去，最簡單也最保險。",
        "ok": false,
        "why": "固定字數會攔腰切斷句子與語意，實務上多用順結構的 recursive 切法並加 overlap。"
      },
      {
        "t": "先控大小與重疊（常 200 到 500 字加 overlap），盡量順著段落／句子結構切（recursive），必要時用 semantic chunk；切法要配資料型態與檢索（如小塊檢索、父段回傳），最後用測試集調參。",
        "ok": true,
        "why": "講出大小/重疊、按結構切、進階 semantic、配資料與檢索、用 eval 調，才完整。"
      },
      {
        "t": "chunk 切越小越好，這樣每塊都很精準。",
        "ok": false,
        "why": "太小會切斷語意、缺上下文，反而檢索到殘缺片段；大小是取捨，不是越小越好。"
      }
    ],
    "en": [
      {
        "t": "Just cut by a fixed character count (for example, every 1000 characters); it is the simplest and safest.",
        "why": "A fixed character count slices sentences and meaning in half; in practice, people mostly use structure-following recursive chunking with overlap added."
      },
      {
        "t": "First control size and overlap (often 200 to 500 characters plus overlap), chunk along the paragraph/sentence structure as much as possible (recursive), and use semantic chunking when needed; the method should match the data type and retrieval (such as retrieve small chunks, return the parent section), and finally tune parameters on a test set.",
        "why": "Covering size/overlap, structure-based chunking, advanced semantic, matching data and retrieval, and tuning with eval is what makes it complete."
      },
      {
        "t": "The smaller you chunk, the better, so that every chunk is precise.",
        "why": "Too small cuts the meaning and loses context, so you end up retrieving incomplete fragments; size is a trade-off, not a matter of smaller being better."
      }
    ],
    "ja": [
      {
        "t": "固定文字数（たとえば 1000 文字ごと）で一気に切ってしまうのが、最も簡単で最も安全だ。",
        "why": "固定文字数は文と意味を途中でぶつ切りにする。実務では構造に沿った recursive な分け方に overlap を加えることが多い。"
      },
      {
        "t": "まずサイズと overlap を制御し（多くは 200 から 500 文字に overlap を追加）、できるだけ段落／文の構造に沿って切り（recursive）、必要なら semantic chunk を使う。分け方はデータ型と検索に合わせ（小さな chunk で検索し親セクションを返すなど）、最後にテストセットでパラメータを調整する。",
        "why": "サイズ／overlap、構造に沿った切り方、応用の semantic、データと検索への適合、eval での調整まで述べて初めて完全になる。"
      },
      {
        "t": "chunk は小さく切れば切るほどよく、そうすればどの chunk も正確になる。",
        "why": "小さすぎると意味が途切れ context が欠け、かえって不完全な断片を検索してしまう。サイズはトレードオフであり、小さいほどよいわけではない。"
      }
    ]
  },
  "rag-retrieval": {
    "zh": [
      {
        "t": "檢索品質決定 RAG 上限，且取決於整條管線：切塊大小、向量加關鍵字的混合檢索、先粗召回再 rerank 精排、調 top-k，進階再加查詢改寫與 metadata 過濾，核心是平衡召回率、精確率與成本並能量測迭代。",
        "ok": true,
        "why": "涵蓋切塊、混合檢索、重排、top-k 與進階手段的取捨。"
      },
      {
        "t": "檢索就是算向量相似度、取最相關的 top-k，其他都不重要。",
        "ok": false,
        "why": "這只是最陽春版，忽略切塊、混合檢索、重排與查詢改寫。"
      },
      {
        "t": "只要把 top-k 調大，撈進越多片段就越準，檢索設計就這麼簡單。",
        "ok": false,
        "why": "大 top-k 會帶來雜訊又佔滿窗口，也忽略切塊、rerank 與混合檢索。"
      }
    ],
    "en": [
      {
        "t": "Retrieval quality sets the ceiling on RAG and depends on the whole pipeline: chunk size, hybrid retrieval combining vectors and keywords, coarse recall first then rerank for fine ranking, tuning top-k, and at an advanced level adding query rewriting and metadata filtering. The core is balancing recall, precision, and cost while being able to measure and iterate.",
        "why": "It covers chunking, hybrid retrieval, reranking, top-k, and the trade-offs of advanced techniques."
      },
      {
        "t": "Retrieval is just computing vector similarity and taking the most relevant top-k; nothing else matters.",
        "why": "This is only the most bare-bones version, ignoring chunking, hybrid retrieval, reranking, and query rewriting."
      },
      {
        "t": "Just turn top-k up: the more fragments you pull in, the more accurate it is; retrieval design is that simple.",
        "why": "A large top-k brings noise and fills up the context window, and this also ignores chunking, rerank, and hybrid retrieval."
      }
    ],
    "ja": [
      {
        "t": "検索の品質が RAG の上限を決め、それはパイプライン全体に依存します。chunk のサイズ、vector とキーワードを組み合わせたハイブリッド検索、まず粗く recall してから rerank で精密に並べ替えること、top-k の調整、さらに進んでクエリの書き換えや metadata フィルタリングを加えます。核心は recall・precision・コストのバランスを取り、計測して反復できることです。",
        "why": "chunk 分割、ハイブリッド検索、rerank、top-k、そして高度な手法のトレードオフをカバーしています。"
      },
      {
        "t": "検索とは vector の類似度を計算して最も関連する top-k を取ることであり、それ以外は重要でない。",
        "why": "これは最も簡素な版にすぎず、chunk 分割・ハイブリッド検索・rerank・クエリの書き換えを見落としています。"
      },
      {
        "t": "top-k を大きくして、より多くの断片を取り込めば取り込むほど精度が上がり、検索の設計はそれだけ単純だ。",
        "why": "大きな top-k はノイズをもたらしコンテキストウィンドウを埋め尽くすうえ、chunk 分割・rerank・ハイブリッド検索も見落としています。"
      }
    ]
  },
  "rag-why-wrong": {
    "zh": [
      {
        "t": "RAG 整條鏈都可能出錯：檢索沒撈到、切塊切爛缺上下文、或依據就在 context 裡但生成端無視它。降錯要先分開量檢索命中率和生成正確率，對症下藥，不是一律換更強的模型。",
        "ok": true,
        "why": "講出三種錯＋先分層診斷（檢索 vs 生成）＋不是換模型就能解，正是重點。"
      },
      {
        "t": "接上 RAG 就等於接上正確答案，還會答錯通常是模型不夠聰明，換更大的模型就解決了。",
        "ok": false,
        "why": "誤以為有 RAG 就不會錯；其實檢索、切塊、生成整條鏈都可能出錯，換模型也救不了沒被撈進來的段落。"
      },
      {
        "t": "答錯八成是檢索沒撈到對的段落，所以只要一直優化檢索、把 top-k 加大就好。",
        "ok": false,
        "why": "依據可能早就在 context 裡卻被生成端無視，只怪檢索、猛加 top-k 治不了生成端的錯。"
      }
    ],
    "en": [
      {
        "t": "A RAG answer can go wrong anywhere in the chain: retrieval misses the passage, chunking cuts it so context is lost, or the evidence is in context but the model ignores it. To reduce errors, measure retrieval hit rate and generation accuracy separately and fix the actual culprit, rather than just swapping in a bigger model.",
        "why": "It names the three failure points, diagnoses retrieval versus generation first, and rejects the model-swap cure-all, which is the point."
      },
      {
        "t": "Once you bolt on RAG the model is fed the right data, so a wrong answer usually just means the model is not smart enough, and a bigger model fixes it.",
        "why": "It assumes RAG cannot be wrong; in fact retrieval, chunking, and generation can all fail, and a bigger model cannot recover a passage that was never retrieved."
      },
      {
        "t": "Wrong answers are almost always the retriever failing to pull the right passage, so you just keep tuning retrieval and raise top-k.",
        "why": "The evidence may already be in context yet ignored by the generator, so blaming retrieval and cranking top-k does not fix generation-side errors."
      }
    ],
    "ja": [
      {
        "t": "RAG は鎖のどこでも間違えます：検索が該当箇所を拾えない、チャンク分割で切れて文脈が欠ける、根拠は context にあるのに生成側が無視する。誤りを減らすには検索のヒット率と生成の正確さを別々に測り、本当の原因に手を打つべきで、単に強いモデルに替えれば済む話ではありません。",
        "why": "三つの誤り＋検索と生成を分けて診断＋モデル交換で万能ではない、という要点を押さえている。"
      },
      {
        "t": "RAG をつなげば正しいデータが入るので、間違えるのはたいていモデルが賢くないからで、大きいモデルにすれば直る。",
        "why": "RAG なら間違えないと思い込んでいる。実際は検索・分割・生成のどこでも失敗し得るし、そもそも拾えていない箇所は大きいモデルでも救えない。"
      },
      {
        "t": "間違いはほぼ検索が該当箇所を拾えていないせいなので、検索をひたすら改善して top-k を増やせばよい。",
        "why": "根拠はすでに context にあるのに生成側が無視していることもあり、検索のせいにして top-k を上げても生成側の誤りは直らない。"
      }
    ]
  },
  "rag-vs-longcontext": {
    "zh": [
      {
        "t": "長上下文的窗口越來越大，以後就不需要 RAG 了。",
        "ok": false,
        "why": "忽略長上下文的成本、上限與中段被忽略，也忽略引用與可擴性。"
      },
      {
        "t": "誰的窗口大就用誰，反正把所有資料一次塞進去最保險。",
        "ok": false,
        "why": "token 隨長度暴增又有上限、中段易漏，忽略依場景取捨。"
      },
      {
        "t": "長上下文每次把全部塞進窗口，簡單但貴、有上限且中段易被忽略；RAG 只撈相關片段，可擴、單次便宜、能附引用，但答得好綁在檢索品質上；資料大又常變動、需引用出處用 RAG，資料小固定或需跨全文整體理解用長上下文，實務常混用。",
        "ok": true,
        "why": "比較兩者成本、上限與盲點，並給出依場景的判準。"
      }
    ],
    "en": [
      {
        "t": "Long-context windows keep getting bigger, so RAG will not be needed in the future.",
        "why": "This ignores the cost of long context, its ceiling, and the middle getting overlooked, and also ignores citations and scalability."
      },
      {
        "t": "Just use whichever has the bigger window; stuffing all the data in at once is the safest bet anyway.",
        "why": "Tokens explode with length and there is still a ceiling, the middle is easily missed, and this ignores choosing based on the scenario."
      },
      {
        "t": "Long context stuffs everything into the window each time: simple but expensive, with a ceiling, and the middle is easily overlooked. RAG pulls only the relevant fragments: scalable, cheap per query, and able to attach citations, but answering well is tied to retrieval quality. Use RAG when data is large and changes often and you need to cite sources; use long context when data is small and fixed or you need whole-document holistic understanding. In practice the two are often combined.",
        "why": "It compares the cost, ceiling, and blind spots of both, and gives criteria based on the scenario."
      }
    ],
    "ja": [
      {
        "t": "long context の窓はますます大きくなっているので、今後は RAG が不要になる。",
        "why": "long context のコスト・上限・中段が見落とされる問題を無視し、引用元の提示や拡張性も見落としています。"
      },
      {
        "t": "窓が大きいほうを使えばよく、どのみち全データを一度に詰め込むのが最も安全だ。",
        "why": "token は長さに応じて急増するうえ上限もあり、中段は漏れやすく、場面に応じた取捨選択を見落としています。"
      },
      {
        "t": "long context は毎回すべてを窓に詰め込むもので、単純だが高価で、上限があり、中段が見落とされやすいです。RAG は関連する断片だけを取り出すもので、拡張しやすく、一回あたりが安く、引用を付けられますが、うまく答えられるかは検索の品質に縛られます。データが大きく頻繁に変わり、出典の引用が必要なら RAG を、データが小さく固定的か、全文を横断した全体的な理解が必要なら long context を使い、実務では両者をよく併用します。",
        "why": "両者のコスト・上限・盲点を比較し、場面に応じた判断基準を示しています。"
      }
    ]
  },
  "agent-vs-workflow": {
    "zh": [
      {
        "t": "只要用到 LLM、又串了好幾步，就是一個 Agent。",
        "ok": false,
        "why": "串幾步多半只是 workflow（流程你寫死）；Agent 是模型自己決定下一步。"
      },
      {
        "t": "Workflow 是你把流程寫死、可預測；Agent 是模型在迴圈裡自己規劃、用工具、依結果決定下一步。能用 workflow 就別上 agent，並常用 routing、reflection、planning，加上驗證與重試上限才可靠。",
        "ok": true,
        "why": "講出「誰決定流程」的差別、先 workflow 的取捨、常見模式與驗證/剎車，完整。"
      },
      {
        "t": "Agent 比 workflow 先進，任何任務都做成 Agent 最好。",
        "ok": false,
        "why": "越自主越貴越難控，能用固定流程就別上 agent；多數產品是 workflow 加幾個 LLM 步驟。"
      }
    ],
    "en": [
      {
        "t": "If it uses an LLM and chains several steps together, it is an Agent.",
        "why": "Chaining a few steps is usually just a workflow (you hard-code the flow); an Agent is where the model decides its own next step."
      },
      {
        "t": "A Workflow hard-codes the flow and is predictable; an Agent has the model plan in a loop, use tools, and decide its next step from the results. If a workflow works, don't reach for an agent, and lean on routing, reflection, and planning, plus verification and retry limits to make it reliable.",
        "why": "It nails the \"who decides the flow\" distinction, the workflow-first trade-off, the common patterns, and verification/brakes: complete."
      },
      {
        "t": "Agents are more advanced than workflows, so it is best to build every task as an Agent.",
        "why": "The more autonomous, the more expensive and harder to control; if a fixed flow works, don't reach for an agent, and most products are a workflow plus a few LLM steps."
      }
    ],
    "ja": [
      {
        "t": "LLM を使い、さらに何ステップかつないでいれば、それは Agent だ。",
        "why": "数ステップつなぐのはたいてい単なる workflow（フローはあなたが固定する）。Agent はモデル自身が次の一手を決めるもの。"
      },
      {
        "t": "Workflow はフローを固定し予測可能なもの。Agent はモデルがループの中で自ら計画し、ツールを使い、結果に応じて次の一手を決めるもの。workflow で済むなら Agent を持ち出さず、routing・reflection・planning をよく使い、検証と再試行の上限を加えてこそ信頼できる。",
        "why": "「誰がフローを決めるか」の違い、workflow を優先するトレードオフ、よく使うパターン、検証／ブレーキまで押さえていて、完全。"
      },
      {
        "t": "Agent は workflow より先進的なので、どんなタスクも Agent にするのが一番よい。",
        "why": "自律的であるほど高価で制御が難しい。固定フローで済むなら Agent を持ち出さない。多くのプロダクトは workflow ＋いくつかの LLM ステップだ。"
      }
    ]
  },
  "agent-planning": {
    "zh": [
      {
        "t": "Agent 的規劃就是它會自己想、自己安排，不需要特別設計。",
        "ok": false,
        "why": "沒講出具體做法與取捨，也忽略重規劃與防止繞圈。"
      },
      {
        "t": "規劃是把大目標拆成可執行步驟並安排推進：ReAct 想、做、觀察逐步進行較彈性但步數多，plan-then-execute 先擬完整計畫省 token、好追蹤但計畫錯就整條偏，實務常混用，並靠重規劃、錯誤恢復與步數上限維持穩定。",
        "ok": true,
        "why": "講出兩種主流做法的取捨與如何靠重規劃維持穩定。"
      },
      {
        "t": "只要先叫模型列出完整計畫再照著做就好，計畫一旦定了就不必再改。",
        "ok": false,
        "why": "忽略計畫可能出錯需重規劃與錯誤恢復，也忽略邊做邊調的彈性。"
      }
    ],
    "en": [
      {
        "t": "An agent's planning is just it thinking and arranging things on its own, with no special design needed.",
        "why": "This does not spell out concrete methods and trade-offs, and ignores replanning and preventing it from going in circles."
      },
      {
        "t": "Planning is breaking a big goal into executable steps and arranging how to move forward: ReAct proceeds step by step by thinking, acting, and observing, which is more flexible but takes many steps; plan-then-execute drafts a full plan up front, saving tokens and easy to track, but if the plan is wrong the whole chain goes off course. In practice they are often combined, and stability comes from replanning, error recovery, and a step limit.",
        "why": "It states the trade-offs of the two mainstream approaches and how replanning keeps things stable."
      },
      {
        "t": "Just have the model list a full plan first and then follow it; once the plan is set there is no need to change it.",
        "why": "This ignores that the plan can be wrong and need replanning and error recovery, and ignores the flexibility of adjusting as you go."
      }
    ],
    "ja": [
      {
        "t": "Agent のプランニングとは、自分で考えて自分で段取りすることであり、特別な設計は要らない。",
        "why": "具体的な手法とトレードオフを述べておらず、再プランニングや堂々巡りの防止も見落としています。"
      },
      {
        "t": "プランニングとは、大きな目標を実行可能なステップに分解して推進を段取りすることです。ReAct は考える・実行する・観察するを一歩ずつ進めるので柔軟性は高いがステップ数が多く、plan-then-execute は先に完全な計画を立てるので token を節約でき追跡しやすいが、計画が誤ると全体がずれます。実務では両者をよく併用し、再プランニング・エラー回復・ステップ数の上限によって安定を保ちます。",
        "why": "二つの主流の手法のトレードオフと、再プランニングでどう安定を保つかを述べています。"
      },
      {
        "t": "先にモデルに完全な計画を列挙させてそのとおりに実行すればよく、計画が一度決まれば変える必要はない。",
        "why": "計画が誤って再プランニングやエラー回復が必要になりうることを見落とし、進めながら調整する柔軟性も見落としています。"
      }
    ]
  },
  "agent-tools": {
    "zh": [
      {
        "t": "模型只輸出要呼叫哪個工具、帶什麼參數的結構化意圖，由外部程式執行再回餵結果；可靠性靠整個迴圈防呆：工具描述精簡、數量收斂避免選錯，給 schema 驗參數，執行加逾時、重試與權限白名單，出錯把訊息回餵讓它自我修正，再判斷完成。",
        "ok": true,
        "why": "說明機制並涵蓋選工具到完成整個調用迴圈的防呆。"
      },
      {
        "t": "只要用 function calling 讓模型會呼叫工具，調用就可靠了。",
        "ok": false,
        "why": "忽略選錯工具、參數錯、工具報錯與逾時等整個迴圈的防呆。"
      },
      {
        "t": "工具給得越多、能力越全，Agent 就會越可靠。",
        "ok": false,
        "why": "工具越多越容易選錯，應少而精，也忽略每一關的失敗與恢復。"
      }
    ],
    "en": [
      {
        "t": "The model only outputs a structured intent of which tool to call and what parameters to pass; an external program executes it and feeds the result back. Reliability comes from making the whole loop foolproof: keep tool descriptions concise and their number small to avoid picking the wrong one, give a schema to validate parameters, add timeouts, retries, and a permission allowlist to execution, feed error messages back so it can self-correct, and then judge completion.",
        "why": "It explains the mechanism and covers making the whole call loop, from choosing a tool to completion, foolproof."
      },
      {
        "t": "Just use function calling so the model can call tools, and the calls will be reliable.",
        "why": "This ignores foolproofing the whole loop against picking the wrong tool, wrong parameters, tool errors, timeouts, and the like."
      },
      {
        "t": "The more tools you give and the more complete the capabilities, the more reliable the agent will be.",
        "why": "The more tools there are, the easier it is to pick the wrong one, so they should be few and well-chosen; this also ignores failure and recovery at each step."
      }
    ],
    "ja": [
      {
        "t": "モデルはどのツールをどんなパラメータで呼び出すかという構造化された意図を出力するだけで、外部のプログラムがそれを実行して結果を返します。信頼性はループ全体をフールプルーフにすることで得られます。ツールの説明は簡潔に、数は絞って選び間違いを避け、schema を与えてパラメータを検証し、実行にタイムアウト・リトライ・権限のホワイトリストを加え、エラー時はメッセージを返して自己修正させ、そのうえで完了を判断します。",
        "why": "仕組みを説明し、ツールの選択から完了まで、呼び出しループ全体のフールプルーフ化をカバーしています。"
      },
      {
        "t": "function calling を使ってモデルにツールを呼び出させさえすれば、呼び出しは信頼できる。",
        "why": "ツールの選び間違い・パラメータの誤り・ツールのエラー・タイムアウトなど、ループ全体のフールプルーフ化を見落としています。"
      },
      {
        "t": "ツールを多く与えるほど、能力が網羅的であるほど、Agent は信頼できるようになる。",
        "why": "ツールが多いほど選び間違えやすいため少数精鋭であるべきで、各段階での失敗と回復も見落としています。"
      }
    ]
  },
  "json-output": {
    "zh": [
      {
        "t": "在 prompt 裡明確寫「請只輸出 JSON」並附上格式說明，就能保證每次都是合法 JSON。",
        "ok": false,
        "why": "模型是逐 token 機率生成，prompt 只是拜託，仍可能多一段話或漏括號，不等於保證。"
      },
      {
        "t": "先認清模型是機率生成、本質不保證合法；手段由弱到強：prompt 要求＋範例 → function calling／JSON mode → 約束解碼／grammar，並一律用 JSON Schema 校驗，失敗就把錯誤回餵重試或自動修補。",
        "ok": true,
        "why": "完整涵蓋機率本質、由弱到強的約束手段，以及不可少的校驗閉環。"
      },
      {
        "t": "只要改用 API 的 function calling 或 JSON mode，輸出就 100% 合法，之後完全不必再做校驗。",
        "ok": false,
        "why": "這些手段能大幅提高合法率但非萬無一失，仍需 schema 校驗與重試閉環兜底。"
      }
    ],
    "en": [
      {
        "t": "Explicitly writing \"output only JSON\" in the prompt and attaching a format description guarantees valid JSON every single time.",
        "why": "The model generates token by token probabilistically; a prompt is only a request, so it may still add an extra passage or drop a bracket, which is not a guarantee."
      },
      {
        "t": "First recognize that the model generates probabilistically and inherently cannot guarantee validity; techniques run from weak to strong: prompt instructions plus examples → function calling / JSON mode → constrained decoding / grammar, and always validate with JSON Schema, feeding errors back for a retry or auto-repair on failure.",
        "why": "It fully covers the probabilistic nature, the weak-to-strong constraint techniques, and the indispensable validation loop."
      },
      {
        "t": "Simply switching to the API's function calling or JSON mode makes the output 100% valid, so no validation is ever needed afterward.",
        "why": "These techniques greatly raise the validity rate but are not foolproof; you still need schema validation and a retry loop as a safety net."
      }
    ],
    "ja": [
      {
        "t": "プロンプトに「JSONだけを出力してください」と明記し、フォーマットの説明を添えれば、毎回必ず正しいJSONになると保証できる。",
        "why": "モデルはtokenを1つずつ確率的に生成するため、promptはあくまでお願いにすぎず、余計な文章が付いたり括弧が抜けたりすることがあり、保証にはならない。"
      },
      {
        "t": "まずモデルは確率的に生成し、本質的に合法性を保証できないと認識する。手段は弱いものから強いものへ、promptでの指示＋例 → function calling／JSON mode → constrained decoding／grammar、そして必ずJSON Schemaで検証し、失敗したらエラーを入力に戻して再試行するか自動修復する。",
        "why": "確率的な本質、弱から強への制約手段、そして欠かせない検証のループを完全に網羅している。"
      },
      {
        "t": "APIのfunction callingやJSON modeに切り替えさえすれば、出力は100%合法になり、その後は検証を一切する必要がない。",
        "why": "これらの手段は合法率を大きく高めるが万全ではなく、schemaによる検証と再試行のループで補う必要がある。"
      }
    ]
  },
  "agent-memory": {
    "zh": [
      {
        "t": "模型無狀態、每步只看當下 context，記憶是外部在決定「每步放回哪些歷史」，跟窗口容量是兩件事；實務用工作記憶＋摘要壓縮＋外部檢索，分短期與長期，本質是上下文預算管理。",
        "ok": true,
        "why": "分清窗口容量與記憶取捨，涵蓋分層手段與取捨，符合 core。"
      },
      {
        "t": "記憶管理其實就是上下文窗口：窗口愈大能記的愈多，把窗口做大就等於做好記憶。",
        "ok": false,
        "why": "混淆容量與策略；窗口是一次能讀多少，記憶管理是跨步驟該保留什麼，兩者不同。"
      },
      {
        "t": "把過去所有對話原封不動全部塞回 prompt，就是最完整的記憶管理。",
        "ok": false,
        "why": "全塞會爆窗口且成本高，記憶管理的重點正是取捨與壓縮，而非照單全收。"
      }
    ],
    "en": [
      {
        "t": "The model is stateless and at each step only sees the current context; memory is the external decision of \"which history to put back at each step,\" which is separate from window capacity. In practice you use working memory plus summary compression plus external retrieval, split into short-term and long-term; essentially it is context budget management.",
        "why": "It distinguishes window capacity from memory trade-offs and covers the layered techniques and trade-offs, matching the core."
      },
      {
        "t": "Memory management is really just the context window: the larger the window, the more it can remember, so enlarging the window is the same as doing memory well.",
        "why": "It confuses capacity with strategy; the window is how much can be read at once, while memory management is what to retain across steps, and the two are different."
      },
      {
        "t": "Stuffing all past conversation back into the prompt untouched is the most complete memory management.",
        "why": "Cramming everything blows past the window and is costly; the point of memory management is precisely selection and compression, not taking in everything wholesale."
      }
    ],
    "ja": [
      {
        "t": "モデルはstatelessで、各ステップでは現在のcontextしか見ない。記憶とは「各ステップでどの履歴を戻すか」を外部が決めることであり、ウィンドウの容量とは別物である。実務では working memory ＋要約による圧縮＋外部検索を使い、短期と長期に分ける。本質はcontextの予算管理である。",
        "why": "ウィンドウの容量と記憶の取捨を区別し、階層的な手段と取捨を網羅しており、coreに合致する。"
      },
      {
        "t": "記憶管理とは要するにcontextウィンドウのことだ。ウィンドウが大きいほど多く覚えられるので、ウィンドウを大きくすることが記憶をうまく行うことと同じである。",
        "why": "容量と戦略を混同している。ウィンドウは一度にどれだけ読めるか、記憶管理はステップをまたいで何を残すかであり、両者は異なる。"
      },
      {
        "t": "過去のすべての対話をそのまま丸ごとpromptに戻すことが、最も完全な記憶管理だ。",
        "why": "全部詰め込むとウィンドウを超えコストも高い。記憶管理の要点はまさに取捨と圧縮であり、すべてをそのまま受け入れることではない。"
      }
    ]
  },
  "agent-eval": {
    "zh": [
      {
        "t": "看它最終答案對不對就好，把答對率拉高就代表這個 Agent 性能好。",
        "ok": false,
        "why": "Agent 是多步驟＋用工具，只看最終答案會漏掉過程繞路、工具誤用與成本延遲。"
      },
      {
        "t": "開放式任務直接交給 LLM-as-judge 打分即可，它完全客觀，不必再人工抽查。",
        "ok": false,
        "why": "LLM-as-judge 有偏誤、需校準，仍要保留人工抽查，不能當成絕對客觀。"
      },
      {
        "t": "分兩層：任務成功率（結果對不對）＋軌跡品質（過程有無繞路、工具選對用對），並量工具正確率、平均步數、成本（token）與延遲；開放任務可用 LLM-as-judge 但要校準＋人工抽查，且建固定測試集跑指標並回歸。",
        "ok": true,
        "why": "涵蓋任務級與過程級指標、成本延遲、LLM-judge 的限制與測試集閉環。"
      }
    ],
    "en": [
      {
        "t": "Just check whether its final answer is right; raising the accuracy rate means this Agent performs well.",
        "why": "An Agent is multi-step and uses tools, so looking only at the final answer misses detours in the process, tool misuse, and cost and latency."
      },
      {
        "t": "For open-ended tasks just hand scoring to an LLM-as-judge; it is completely objective, so no human spot-checking is needed.",
        "why": "An LLM-as-judge has biases and needs calibration; you must still keep human spot-checks and cannot treat it as absolutely objective."
      },
      {
        "t": "Split into two layers: task success rate (whether the result is right) plus trajectory quality (whether the process detoured and whether tools were chosen and used correctly), and measure tool accuracy, average number of steps, cost (tokens), and latency; open-ended tasks may use an LLM-as-judge but with calibration plus human spot-checks, and build a fixed test set to run metrics and check regression.",
        "why": "It covers task-level and process-level metrics, cost and latency, the limits of the LLM-judge, and the test-set loop."
      }
    ],
    "ja": [
      {
        "t": "最終的な答えが合っているかだけを見ればよく、正答率を上げればこのAgentの性能が良いということだ。",
        "why": "Agentは多ステップでツールを使うため、最終的な答えだけを見ると、過程での遠回り、ツールの誤用、コストや遅延を見落とす。"
      },
      {
        "t": "オープンなタスクはそのままLLM-as-judgeに採点を任せればよく、完全に客観的なので人手による抜き取り検査は不要だ。",
        "why": "LLM-as-judgeには偏りがあり校正が必要で、人手による抜き取り検査は残すべきであり、絶対に客観的とはみなせない。"
      },
      {
        "t": "2つの層に分ける。タスク成功率（結果が正しいか）＋軌跡の品質（過程で遠回りがないか、ツールを正しく選び正しく使ったか）。そしてツールの正確率、平均ステップ数、コスト（token）、遅延を計測する。オープンなタスクではLLM-as-judgeを使ってよいが、校正＋人手による抜き取り検査が必要で、さらに固定のテストセットを作って指標を回し回帰を確認する。",
        "why": "タスクレベルと過程レベルの指標、コストと遅延、LLM-judgeの限界、そしてテストセットのループを網羅している。"
      }
    ]
  },
  "agent-cost": {
    "zh": [
      {
        "t": "Agent 成本失控主要就是模型太貴，全部換成最便宜的模型就能壓下來。",
        "ok": false,
        "why": "只想到換便宜模型，忽略 token 隨步數累積與繞圈；便宜模型做錯重來反而更貴。"
      },
      {
        "t": "成本＝步數 × 每步 token，而每步都把前面歷史再算一次，token 會隨步數累積，繞圈或無限重試就爆炸。要設步數上限＋終止條件、摘要壓縮歷史、快取重複子問題、把簡單步分流給便宜模型；不是一味用便宜模型，做錯重來更貴。",
        "ok": true,
        "why": "點出 token 累積成因＋防繞圈與分流等對策＋花在刀口的取捨，最到位。"
      },
      {
        "t": "只要每步都把完整歷史塞回去確保不漏資訊，再讓它一直重試到成功就好。",
        "ok": false,
        "why": "沒有步數上限會無限重試燒錢，每步塞完整歷史又讓 token 暴增，正是失控主因。"
      }
    ],
    "en": [
      {
        "t": "Runaway agent cost is mostly just an expensive model, so switching everything to the cheapest model brings it back down.",
        "why": "It only thinks of a cheaper model and ignores token accumulation and looping; a cheap model that gets it wrong and has to redo the work ends up costing more."
      },
      {
        "t": "Cost equals steps times tokens per step, and each step recomputes the whole prior history, so tokens pile up as steps grow and looping or endless retries blow up. You cap the steps with a clear stop condition, compress history with summaries, cache repeated subproblems, and route easy steps to a cheap model, rather than blindly going cheap, since redoing failed work costs more.",
        "why": "It explains why tokens accumulate, gives concrete defenses like loop caps and routing, and keeps the spend-where-it-matters tradeoff, which is exactly right."
      },
      {
        "t": "Just feed the full history back every step so nothing is lost, and let it keep retrying until it succeeds.",
        "why": "With no step cap it retries forever and burns money, and stuffing the full history every step makes tokens explode, which is the main cause of runaway cost."
      }
    ],
    "ja": [
      {
        "t": "エージェントのコスト暴走はたいていモデルが高いだけなので、全部いちばん安いモデルに替えれば下がる。",
        "why": "安いモデルに替えることしか頭になく、ステップに伴う token の累積やループを見落としている。安いモデルは間違えてやり直すとかえって高くつく。"
      },
      {
        "t": "コスト＝ステップ数 × 1 ステップの token で、各ステップが前の履歴を毎回計算し直すため token はステップとともに積み上がり、ループや無限リトライで爆発する。ステップ上限と明確な終了条件、履歴の要約圧縮、繰り返す小問題のキャッシュ、簡単なステップは安いモデルに振り分ける、が対策で、やみくもに安くするのは違う（やり直しの方が高い）。",
        "why": "token が積み上がる原因＋ループ防止や振り分けなどの対策＋要所に使う取捨を押さえており最も的確。"
      },
      {
        "t": "毎ステップ完全な履歴を渡して情報を漏らさないようにし、成功するまでひたすらリトライさせればよい。",
        "why": "ステップ上限がないと無限にリトライして金を燃やし、毎ステップ完全な履歴を積むと token が爆発する。まさに暴走の主因。"
      }
    ]
  },
  "diffusion-how": {
    "zh": [
      {
        "t": "它就是把一張模糊帶雜訊的圖，用演算法一次銳化、去雜訊變清楚。",
        "ok": false,
        "why": "漏了加噪訓練與反覆去噪生成的逐步迭代，把它當單次影像銳化是誤解。"
      },
      {
        "t": "訓練時把圖逐步加噪到純雜訊，模型學的是在某噪聲程度下該去掉多少噪；生成時從純雜訊出發，每步去一點噪、反覆幾十步讓圖浮現，文字 prompt 當每步去噪的條件引導方向。",
        "ok": true,
        "why": "點出加噪訓練與反覆去噪生成一體兩面，並說明 prompt 作為條件的角色。"
      },
      {
        "t": "模型依 prompt 的關鍵字，從內部圖庫檢索出對應的圖，再加一點雜訊變化後輸出。",
        "ok": false,
        "why": "模型並非檢索圖庫，而是逐步去噪重新算出新圖，這說法混淆了機制。"
      }
    ],
    "en": [
      {
        "t": "It simply takes a blurry, noisy image and sharpens and denoises it clear in one pass with an algorithm.",
        "why": "It leaves out the noise-adding training and the step-by-step iteration of repeated denoising generation; treating it as one-shot image sharpening is a misunderstanding."
      },
      {
        "t": "During training an image is gradually noised up to pure noise, and the model learns how much noise to remove at a given noise level; during generation it starts from pure noise, removes a little noise each step, and repeats dozens of steps to let the image emerge, with the text prompt acting as the condition that guides the direction of each denoising step.",
        "why": "It points out that noise-adding training and repeated denoising generation are two sides of one coin, and explains the prompt's role as the condition."
      },
      {
        "t": "Based on the prompt's keywords, the model retrieves the matching image from an internal image library, then adds a bit of noise variation before outputting it.",
        "why": "The model does not retrieve from an image library but recomputes a new image through step-by-step denoising; this statement confuses the mechanism."
      }
    ],
    "ja": [
      {
        "t": "ぼやけてノイズの乗った画像を、アルゴリズムで一度に鮮明化・ノイズ除去してくっきりさせるだけのものだ。",
        "why": "ノイズを加える訓練と、繰り返しノイズを除去して生成する段階的な反復を見落としており、一度きりの画像鮮明化とみなすのは誤解である。"
      },
      {
        "t": "訓練時には画像を段階的にノイズを加えて純粋なノイズにし、モデルはある程度のノイズのもとでどれだけノイズを除去すべきかを学ぶ。生成時には純粋なノイズから出発し、各ステップで少しずつノイズを除去し、数十ステップ繰り返して画像を浮かび上がらせる。テキストのpromptは各ステップのノイズ除去の条件として方向を導く。",
        "why": "ノイズを加える訓練と繰り返しノイズを除去する生成が表裏一体であることを指摘し、promptが条件として果たす役割を説明している。"
      },
      {
        "t": "モデルはpromptのキーワードに従って内部の画像ライブラリから対応する画像を検索し、少しノイズの変化を加えて出力する。",
        "why": "モデルは画像ライブラリを検索するのではなく、段階的にノイズを除去して新しい画像を計算し直しており、この説明は仕組みを混同している。"
      }
    ]
  },
  "diffusion-not-collage": {
    "zh": [
      {
        "t": "其實就是 AI 找幾張相關圖片，剪下局部再拼接縫合成一張。",
        "ok": false,
        "why": "模型裡沒有存原圖，輸出像素是重新算出的新內容，不是剪貼拼接。"
      },
      {
        "t": "模型絕不可能重現任何訓練圖，輸出永遠 100% 原創、與訓練集毫無雷同。",
        "ok": false,
        "why": "忽略記憶化例外：某圖若重複過多，模型可能近似複製，這是需防範的情況。"
      },
      {
        "t": "不是拼貼：模型沒存原圖，學的是海量圖片的統計規律，生成時整張一次算、每步同時更新所有像素，重畫出通常訓練集裡找不到的全新圖；例外是重複過多的圖可能被記憶而近似複製。",
        "ok": true,
        "why": "說清無存原圖、統計規律 vs 檢索拼接的差別，並補記憶化例外，符合 core。"
      }
    ],
    "en": [
      {
        "t": "It is really just the AI finding several related images, cutting out parts, and stitching them together into one.",
        "why": "The model stores no original images; the output pixels are newly computed content, not cut-and-paste stitching."
      },
      {
        "t": "The model can never reproduce any training image; its output is always 100% original with no resemblance to the training set.",
        "why": "It ignores the memorization exception: if an image repeats too often, the model may approximately copy it, a situation that must be guarded against."
      },
      {
        "t": "It is not collage: the model stores no original images and learns the statistical patterns of massive numbers of images; during generation it computes the whole image at once, updating all pixels simultaneously at each step, redrawing an entirely new image usually not found in the training set; the exception is that overly repeated images may be memorized and approximately copied.",
        "why": "It makes clear that no original images are stored and the difference between statistical patterns and retrieval-collage, and adds the memorization exception, matching the core."
      }
    ],
    "ja": [
      {
        "t": "要するにAIが関連する画像を何枚か見つけて、一部を切り取り、つなぎ合わせて1枚にしているだけだ。",
        "why": "モデルの中に元画像は保存されておらず、出力されるピクセルは計算し直された新しい内容であり、切り貼りのつなぎ合わせではない。"
      },
      {
        "t": "モデルが訓練画像を再現することは絶対にありえず、出力は常に100%オリジナルで、訓練セットとまったく似ることはない。",
        "why": "記憶化という例外を無視している。ある画像が繰り返し多すぎると、モデルはほぼ複製することがあり、これは防ぐべき状況である。"
      },
      {
        "t": "コラージュではない。モデルは元画像を保存しておらず、膨大な画像の統計的な規則性を学ぶ。生成時には画像全体を一度に計算し、各ステップですべてのピクセルを同時に更新し、通常は訓練セットに見当たらないまったく新しい画像を描き直す。例外として、繰り返しが多すぎる画像は記憶されてほぼ複製されることがある。",
        "why": "元画像を保存していないこと、統計的な規則性と検索・つなぎ合わせの違いを明確にし、さらに記憶化の例外を補っており、coreに合致する。"
      }
    ]
  },
  "genimg-errors": {
    "zh": [
      {
        "t": "本質上它追求整體看起來合理、學的是外觀分布，沒有「手指五根」「字母拼成單字」這種硬規則；而手、文字、對稱需精確計數與一致性，卻佔比小、變化大、訓練訊號弱，加上資料偏差，屬機制性弱點，做大有幫助但難根治。",
        "ok": true,
        "why": "涵蓋追求外觀而非結構、為何偏偏這些細節出錯、資料因素與機制性難根治。"
      },
      {
        "t": "這只是模型目前還不夠大造成的暫時 bug，等規模再大一點就會自動完全消失。",
        "ok": false,
        "why": "這是機制性弱點（追求外觀、不理解精確結構），做大有幫助但難完全根治，非暫時 bug。"
      },
      {
        "t": "純粹因為訓練資料裡手和文字的圖太少，只要多餵這類資料就能徹底解決。",
        "ok": false,
        "why": "根因是模型學外觀分布、缺硬規則與計數能力，補資料助益有限，無法徹底解決。"
      }
    ],
    "en": [
      {
        "t": "Fundamentally it pursues overall plausibility and learns the distribution of appearance, without hard rules like \"five fingers\" or \"letters spelling a word\"; yet hands, text, and symmetry require precise counting and consistency but make up a small proportion, vary widely, and give weak training signals, and combined with data bias this is a mechanistic weakness that scaling up helps but hardly cures.",
        "why": "It covers pursuing appearance rather than structure, why these particular details go wrong, the data factors, and why it is mechanistically hard to cure."
      },
      {
        "t": "This is just a temporary bug caused by the model not yet being large enough; once the scale grows a bit more it will automatically disappear completely.",
        "why": "This is a mechanistic weakness (pursuing appearance, not understanding precise structure); scaling up helps but hardly fully cures it, and it is not a temporary bug."
      },
      {
        "t": "It is purely because there are too few images of hands and text in the training data; feeding more of this kind of data will completely solve it.",
        "why": "The root cause is that the model learns the distribution of appearance and lacks hard rules and counting ability; adding data helps only marginally and cannot completely solve it."
      }
    ],
    "ja": [
      {
        "t": "本質的には全体がもっともらしく見えることを追求し、外観の分布を学んでおり、「指は5本」「文字が並んで単語になる」といった厳密な規則はない。一方で手、文字、対称性は正確な数え上げと一貫性を必要とするが、割合が小さく、変化が大きく、訓練の信号が弱い。加えてデータの偏りもあり、これは機構的な弱点であって、規模を大きくすれば助けにはなるが根治は難しい。",
        "why": "構造ではなく外観を追求すること、なぜよりによってこうした細部で誤るのか、データ要因、そして機構的に根治が難しいことを網羅している。"
      },
      {
        "t": "これはモデルがまだ十分に大きくないために起きる一時的なbugにすぎず、規模がもう少し大きくなれば自動的に完全に消える。",
        "why": "これは機構的な弱点（外観を追求し、正確な構造を理解しない）であり、規模を大きくすれば助けにはなるが完全な根治は難しく、一時的なbugではない。"
      },
      {
        "t": "純粋に訓練データの中に手や文字の画像が少なすぎるためであり、この種のデータをもっと与えさえすれば徹底的に解決できる。",
        "why": "根本原因はモデルが外観の分布を学び、厳密な規則と数え上げの能力を欠くことであり、データを補っても効果は限られ、徹底的な解決はできない。"
      }
    ]
  },
  "diffusion-vs-gan": {
    "zh": [
      {
        "t": "擴散就是比較新、比較強、效果更好，所以自然取代了 GAN 成為主流。",
        "ok": false,
        "why": "沒講機制差異與取捨；主流換人是因擴散好訓練、易堆規模、易用條件操控，非只是「更新更強」。"
      },
      {
        "t": "擴散在每個面向都完勝 GAN，包括生成速度，GAN 已一無是處被完全淘汰。",
        "ok": false,
        "why": "擴散要跑多步、速度反而較慢，GAN 仍有快的優勢，說法過度絕對。"
      },
      {
        "t": "機制上 GAN 是生成器對抗判別器、一次生出整張圖，擴散是從雜訊逐步去噪；GAN 快但難訓、易崩潰且多樣性差，擴散穩、品質與多樣性高、好用文字條件操控但多步較慢；正因好訓練、易堆規模又可控，擴散撐起大規模文字生圖成為主流。",
        "ok": true,
        "why": "對比兩者機制與取捨，並由此推出擴散成為主流的原因，符合 core。"
      }
    ],
    "en": [
      {
        "t": "Diffusion is simply newer, stronger, and gives better results, so it naturally replaced GAN as the mainstream.",
        "why": "It does not address the mechanism differences and trade-offs; the shift in mainstream happened because diffusion is easy to train, easy to scale, and easy to steer with conditions, not merely because it is \"newer and stronger.\""
      },
      {
        "t": "Diffusion beats GAN completely on every front, including generation speed, and GAN is now worthless and fully obsolete.",
        "why": "Diffusion has to run many steps and is actually slower, while GAN still holds the advantage of speed, so the claim is overly absolute."
      },
      {
        "t": "Mechanically, GAN has a generator competing against a discriminator and produces the whole image at once, while diffusion denoises step by step from noise; GAN is fast but hard to train, prone to collapse, and poor in diversity, whereas diffusion is stable, high in quality and diversity, and easy to steer with text conditions but slower due to many steps; precisely because it is easy to train, easy to scale, and controllable, diffusion carries large-scale text-to-image generation and became the mainstream.",
        "why": "It contrasts the two mechanisms and their trade-offs and from that derives why diffusion became the mainstream, matching the core."
      }
    ],
    "ja": [
      {
        "t": "diffusionは単に新しく、強く、効果が良いので、自然にGANに取って代わって主流になった。",
        "why": "仕組みの違いと取捨に触れていない。主流が入れ替わったのはdiffusionが訓練しやすく、規模を積みやすく、条件による操作がしやすいからであり、単に「新しくて強い」からではない。"
      },
      {
        "t": "diffusionはあらゆる面で、生成速度も含めてGANに完勝しており、GANはもはや何の取り柄もなく完全に淘汰された。",
        "why": "diffusionは多ステップを走らせる必要があり、むしろ速度は遅い。GANには依然として速いという利点があり、この主張は過度に断定的である。"
      },
      {
        "t": "仕組みの上ではGANは生成器が判別器と対抗し、一度に画像全体を生み出すのに対し、diffusionはノイズから段階的にノイズを除去する。GANは速いが訓練が難しく、崩壊しやすく多様性に乏しい。diffusionは安定し、品質と多様性が高く、テキスト条件による操作がしやすいが、多ステップのため比較的遅い。訓練しやすく、規模を積みやすく、制御可能であるからこそ、diffusionは大規模なテキストからの画像生成を支え主流になった。",
        "why": "両者の仕組みと取捨を対比し、そこからdiffusionが主流になった理由を導いており、coreに合致する。"
      }
    ]
  },
  "multimodal-key": {
    "zh": [
      {
        "t": "關鍵不是把幾個模型拼起來，而是讓圖、文各自編碼後投影到同一個意義向量空間，讓「一張貓的照片」和「貓」這個詞落在相近位置；座標對齊了才談得上互相理解，也才能以字搜圖、看圖答題。這要靠配對資料與對齊訓練，不是各自很強就會。",
        "ok": true,
        "why": "點出共用同一意義空間＋對齊的作用＋要配對資料訓練，正中核心。"
      },
      {
        "t": "多模態就是把一個很強的影像模型和一個很強的語言模型接在一起，各做各的、再把輸出湊起來。",
        "ok": false,
        "why": "只是拼接、各做各的，講不出把不同型態對齊到同一意義空間，這正是拼接做不到互相理解的原因。"
      },
      {
        "t": "關鍵是有一個大型 embedding 資料庫，把所有圖片存起來，要用時再撈出來比對。",
        "ok": false,
        "why": "把 embedding 空間當成「存圖的資料庫」，其實那是共用的意義座標，不是儲存體。"
      }
    ],
    "en": [
      {
        "t": "The key is not stitching several models together but projecting images and text, each encoded on its own, into one shared meaning vector space, so a photo of a cat and the word cat land near each other. Only once the coordinates are aligned can the modalities understand each other and support text-to-image search or visual question answering, and that takes paired data and alignment training, not just strong single models.",
        "why": "It pinpoints the shared meaning space, what alignment does, and the need for paired-data training, which is the core."
      },
      {
        "t": "Multimodal just means connecting one strong vision model and one strong language model, each doing its own thing, then merging their outputs.",
        "why": "That is mere stitching with each model working separately, and it misses aligning the modalities into one shared meaning space, which is exactly what stitching cannot do."
      },
      {
        "t": "The key is a big embedding database that stores all the images and pulls them out to compare when needed.",
        "why": "It treats the embedding space as an image store, when it is really a shared coordinate system of meaning, not a storage backend."
      }
    ],
    "ja": [
      {
        "t": "鍵は複数のモデルを継ぎ合わせることではなく、画像とテキストをそれぞれ符号化したうえで同じ意味ベクトル空間に投影し、「猫の写真」と「猫」という語が近い位置に来るようにすること。座標がそろって初めて互いに理解でき、テキストで画像を検索したり画像を見て答えたりできる。これには対になったデータと整列（アライメント）学習が要り、各自が強いだけでは実現しない。",
        "why": "共通の意味空間＋整列の役割＋対データ学習の必要性を突いており核心を突いている。"
      },
      {
        "t": "マルチモーダルとは、強い画像モデルと強い言語モデルをつなぎ、それぞれ別々に動かして出力を寄せ集めるだけのことだ。",
        "why": "単なる継ぎ合わせで各自が別々に動くだけ。異なるモダリティを同じ意味空間に整列させる話が抜けており、まさに継ぎ合わせでは互いに理解できない理由がそこにある。"
      },
      {
        "t": "鍵はすべての画像を保存しておく大きな embedding データベースで、必要なときに取り出して照合することだ。",
        "why": "embedding 空間を「画像を保存する DB」と誤解している。実際は共通の意味の座標系であって、保存領域ではない。"
      }
    ]
  },
  "vlm-see": {
    "zh": [
      {
        "t": "VLM 就是在 LLM 旁邊接一顆獨立的看圖模型，兩個各做各的、再把結果湊起來。",
        "ok": false,
        "why": "不是接力式拼接；關鍵是把圖變成跟文字同一種向量，同一個 LLM 用同一套注意力一起處理圖和字。"
      },
      {
        "t": "圖片被切成 patch、由視覺編碼器（常用 CLIP 預訓練的 ViT）編成向量，再用投影層對齊進 LLM 的 token 空間，和文字 token 一起送進去讓注意力一起看，所以能用文字回答關於圖的問題。",
        "ok": true,
        "why": "完整講出切塊→編碼→投影對齊→一起進 LLM 的流程，這正是「看得懂」的機制。"
      },
      {
        "t": "它其實是先做 OCR 把圖轉成文字，再交給 LLM 讀那段文字。",
        "ok": false,
        "why": "OCR 只認字；VLM 是把影像本身編碼成向量對齊進 LLM，能理解沒有文字的畫面內容，不是先轉文字。"
      }
    ],
    "en": [
      {
        "t": "A VLM just bolts a separate image model next to the LLM; the two work independently and then their results are stitched together.",
        "why": "It isn't a relay-style patch-up; the key is turning the image into the same kind of vector as text, so one LLM processes image and words together with one shared attention."
      },
      {
        "t": "The image is cut into patches and encoded into vectors by a vision encoder (often a CLIP-pretrained ViT), then a projection layer aligns them into the LLM's token space, and they are fed in together with the text tokens so attention sees them together, which is why it can answer questions about the image in text.",
        "why": "It spells out the full flow of patching → encoding → projection and alignment → going into the LLM together, which is exactly the mechanism behind 'understanding.'"
      },
      {
        "t": "It actually runs OCR first to turn the image into text, then hands that text to the LLM to read.",
        "why": "OCR only recognizes characters; a VLM encodes the image itself into vectors aligned into the LLM, so it can understand visual content with no text at all, rather than converting to text first."
      }
    ],
    "ja": [
      {
        "t": "VLM は LLM の隣に独立した画像モデルを1つ付けただけで、2つが別々に処理し、その結果を後で寄せ集めるものだ。",
        "why": "リレー式の寄せ集めではありません。鍵は画像を文字と同じ種類のベクトルに変え、同一の LLM が同じ attention で画像と文字をまとめて処理することです。"
      },
      {
        "t": "画像は patch に切られ、視覚エンコーダー（多くは CLIP で事前学習した ViT）がベクトルに符号化し、projection layer が LLM の token 空間へ整合させ、文字 token と一緒に入力して attention でまとめて見るので、画像に関する質問に文字で答えられる。",
        "why": "patch への分割→符号化→投影と整合→一緒に LLM へ、という流れを完全に述べており、これこそ「理解できる」仕組みです。"
      },
      {
        "t": "実際にはまず OCR で画像を文字に変換し、その文字を LLM に読ませているのだ。",
        "why": "OCR は文字しか認識しません。VLM は画像そのものをベクトルに符号化して LLM に整合させるので、文字のない映像内容も理解でき、先に文字へ変換するわけではありません。"
      }
    ]
  },
  "hallucination": {
    "zh": [
      {
        "t": "幻覺是模型的 bug，只要把程式修好、把資料清乾淨，就能完全消除。",
        "ok": false,
        "why": "這犯了兩個最常見的誤區：把幻覺當程式錯誤，又說能「完全消除」。它是機率式生成的副作用，只能降低、無法歸零。"
      },
      {
        "t": "模型是在猜最可能的下一個字、不是查事實，不確定時仍會給出流暢答案，所以會自信地錯。成因是本質性的，只能靠 RAG、要求引用、對重要輸出校驗、讓它能說不知道來降低，無法根治。",
        "ok": true,
        "why": "講出成因（猜字而非查事實）＋為何無法歸零＋具體的降低手段，正是這題想問的層次。"
      },
      {
        "t": "只要模型夠大、訓練資料夠多，幻覺自然就會消失。",
        "ok": false,
        "why": "更大更多只會降低、不會消除：成因是機率生成、沒有內建的真假判斷，屬於本質限制。"
      }
    ],
    "en": [
      {
        "t": "Hallucination is a bug in the model. Fix the code and clean the data and it disappears completely.",
        "why": "This makes the two most common mistakes at once: treating hallucination as a programming bug, and claiming it can be “eliminated.” It is a side effect of probabilistic generation, so it can only be reduced, never brought to zero."
      },
      {
        "t": "The model is guessing the most likely next word, not looking up facts, and when unsure it still gives a fluent answer, so it can be confidently wrong. The cause is intrinsic, so you can only reduce it (RAG, requiring citations, validating important outputs, letting it say it doesn’t know), not cure it.",
        "why": "Naming the cause (guessing words, not looking up facts), why it can’t be zeroed out, and concrete ways to reduce it is exactly the level this question is after."
      },
      {
        "t": "As long as the model is big enough and trained on enough data, hallucination will naturally disappear.",
        "why": "Bigger and more only reduces, it doesn’t eliminate: the cause is probabilistic generation with no built-in sense of true or false, which is a fundamental limit."
      }
    ],
    "ja": [
      {
        "t": "ハルシネーションはモデルの bug で、コードを直してデータをきれいにすれば完全になくせる。",
        "why": "これは最もよくある二つの誤りを同時に犯しています：ハルシネーションをプログラムの不具合とみなし、しかも「完全になくせる」と言う点です。確率的な生成の副作用なので、低減できてもゼロにはできません。"
      },
      {
        "t": "モデルは最も可能性の高い次の語を推測しているだけで、事実を調べているのではありません。わからないときも流暢な答えを出すため、自信たっぷりに間違えます。原因は本質的なので、RAG、出典の要求、重要な出力の検証、「わからない」と言わせることで低減できても、根治はできません。",
        "why": "原因（事実を調べず語を推測する）、なぜゼロにできないか、そして具体的な低減策まで述べる。これがまさにこの設問で問われる水準です。"
      },
      {
        "t": "モデルが十分に大きく、学習データが十分に多ければ、ハルシネーションは自然になくなる。",
        "why": "大きく多くしても低減するだけで、なくなりません。原因は確率的な生成であり、真偽を判断する仕組みが内蔵されていないという本質的な限界だからです。"
      }
    ]
  },
  "bias": {
    "zh": [
      {
        "t": "偏見是工程師刻意把立場寫進去，或模型自己有政治／價值立場所致。",
        "ok": false,
        "why": "偏見主要是從訓練資料學來並可能被放大，不是刻意寫入，模型也沒有自己的立場。"
      },
      {
        "t": "偏見主要來自訓練資料：資料反映真實世界的社會偏差，模型照學還可能放大；減少要分層做（資料更多樣平衡、訓練端對齊去偏、輸出端評估與護欄），但根在資料與社會、公平定義彼此衝突，只能降低難以根除。",
        "ok": true,
        "why": "點出資料來源與放大、分層減少手段，以及難根除的原因，完整涵蓋 core。"
      },
      {
        "t": "只要把訓練資料清洗乾淨、再加上輸出護欄，就能把 AI 偏見完全消除。",
        "ok": false,
        "why": "偏見根在資料與社會本身且公平定義會衝突，只能持續降低，無法完全消除。"
      }
    ],
    "en": [
      {
        "t": "Bias comes from engineers deliberately writing their stance in, or from the model having its own political or value positions.",
        "why": "Bias mainly comes from being learned from training data and possibly amplified, not from deliberate insertion, and the model has no positions of its own."
      },
      {
        "t": "Bias mainly comes from training data: the data reflects real-world social biases, and the model learns them and may even amplify them; reducing it must be done in layers (more diverse and balanced data, alignment and debiasing on the training side, evaluation and guardrails on the output side), but its roots lie in the data and society and definitions of fairness conflict with each other, so it can only be lowered and is hard to eradicate.",
        "why": "It points out the data source and amplification, the layered reduction techniques, and the reasons it is hard to eradicate, fully covering the core."
      },
      {
        "t": "Simply cleaning the training data thoroughly and adding output guardrails can completely eliminate AI bias.",
        "why": "Bias is rooted in the data and society itself and definitions of fairness conflict, so it can only be continuously lowered and cannot be completely eliminated."
      }
    ],
    "ja": [
      {
        "t": "偏見は、エンジニアが意図的に立場を書き込むか、モデル自身が政治的・価値的な立場を持つことによって生じる。",
        "why": "偏見は主に訓練データから学ばれ、増幅されることもあるもので、意図的に書き込まれたものではなく、モデルにも自身の立場はない。"
      },
      {
        "t": "偏見は主に訓練データに由来する。データは現実世界の社会的な偏りを反映し、モデルはそれをそのまま学び、さらに増幅することもある。減らすには階層的に行う必要がある（データをより多様で均衡の取れたものにする、訓練側でのアライメントによる偏りの除去、出力側での評価とガードレール）。しかし根はデータと社会にあり、公平性の定義どうしが衝突するため、下げることしかできず根絶は難しい。",
        "why": "データの出所と増幅、階層的な低減手段、そして根絶が難しい理由を指摘しており、coreを完全に網羅している。"
      },
      {
        "t": "訓練データをきれいに洗浄し、さらに出力のガードレールを加えさえすれば、AIの偏見を完全に取り除ける。",
        "why": "偏見の根はデータと社会そのものにあり、公平性の定義が衝突するため、継続的に下げることしかできず、完全に取り除くことはできない。"
      }
    ]
  },
  "trust-answer": {
    "zh": [
      {
        "t": "語氣自信不等於正確，模型是在猜合理的話而非查過事實；判斷要看有無可查證的引用來源、換問法看答案穩不穩、用外部權威資料交叉驗證關鍵事實，並依後果調整力度：低風險放寬，涉決策或專業就逐項驗證。",
        "ok": true,
        "why": "破除自信＝正確的迷思，給出可操作查證方法並依風險調整，符合 core。"
      },
      {
        "t": "只要回答邏輯通順、語氣自信、聽起來很有道理，就可以放心相信。",
        "ok": false,
        "why": "模型永遠講得流暢篤定，語氣自信不等於正確，憑感覺就信正是要避免的陷阱。"
      },
      {
        "t": "AI 本來就會亂講，所以它的任何回答都不可信，乾脆完全不要用。",
        "ok": false,
        "why": "走向另一極端；正確作法是依後果分級查證與交叉驗證，而非一律否定。"
      }
    ],
    "en": [
      {
        "t": "A confident tone does not equal correctness; the model is guessing plausible words rather than having checked facts; to judge, look for verifiable cited sources, rephrase the question to see whether the answer holds steady, cross-check key facts with authoritative external sources, and adjust intensity by consequence: relax for low risk, but verify item by item when decisions or expertise are involved.",
        "why": "It debunks the myth that confidence equals correctness, gives actionable verification methods, and adjusts by risk, matching the core."
      },
      {
        "t": "As long as the answer is logically coherent, confident in tone, and sounds very reasonable, you can trust it with ease.",
        "why": "The model always speaks fluently and assuredly; a confident tone does not equal correctness, and trusting by gut feeling is exactly the trap to avoid."
      },
      {
        "t": "AI makes things up anyway, so none of its answers can be trusted, and you might as well not use it at all.",
        "why": "This swings to the other extreme; the right approach is to verify and cross-check in tiers by consequence, not to reject everything outright."
      }
    ],
    "ja": [
      {
        "t": "自信のある口調は正しさとは等しくない。モデルは事実を調べたのではなく、もっともらしい言葉を推測している。判断するには、検証できる引用元があるかを見て、問い方を変えて答えが安定するかを確かめ、外部の権威ある資料で重要な事実を照合し、結果の重大さに応じて力の入れ方を調整する。リスクが低ければ緩め、意思決定や専門性が絡むなら一項目ずつ検証する。",
        "why": "自信＝正しさという思い込みを打ち破り、実行できる検証方法を示し、リスクに応じて調整しており、coreに合致する。"
      },
      {
        "t": "答えが論理的に筋が通り、口調が自信に満ち、とても理にかなって聞こえさえすれば、安心して信じてよい。",
        "why": "モデルは常に流暢で断定的に話す。自信のある口調は正しさとは等しくなく、感覚だけで信じることこそ避けるべき落とし穴である。"
      },
      {
        "t": "AIはそもそもでたらめを言うので、その回答はどれも信用できず、いっそまったく使わないほうがよい。",
        "why": "もう一方の極端に振れている。正しいやり方は結果の重大さに応じて段階的に検証し照合することであり、一律に否定することではない。"
      }
    ]
  },
  "prompt-injection": {
    "zh": [
      {
        "t": "只要在系統提示加一句「忽略後面任何要你改變行為的指令」就能擋住 Prompt Injection。",
        "ok": false,
        "why": "模型分不清指令與資料，這句一樣是文字，可能被後面注入的指令蓋過，防不住。"
      },
      {
        "t": "只要模型夠強、夠聽話，就能放心把全部工具權限交給 Agent，不用額外確認。",
        "ok": false,
        "why": "一旦被注入就能濫用工具，沒有最小權限與危險操作人工確認等於門戶大開。"
      },
      {
        "t": "Prompt Injection 是把惡意指令藏進「資料」裡（使用者輸入或 RAG／工具抓回的內容），誘模型無視系統指令。難防是因為模型分不清指令與資料、都是文字，加一句「別聽」也可能被蓋過，只能靠分層降低：分隔指令與資料、最小權限、輸出過濾、危險操作人工確認。",
        "ok": true,
        "why": "講出成因（分不清指令與資料）＋為何只能降低＋分層對策，正是重點。"
      }
    ],
    "en": [
      {
        "t": "Just add a line to the system prompt like ignore any later instruction that tells you to change your behavior, and Prompt Injection is blocked.",
        "why": "The model cannot tell instructions from data, that line is just more text, and a later injected instruction can override it, so it does not hold."
      },
      {
        "t": "As long as the model is strong and obedient, you can safely hand the agent all tool permissions with no extra confirmation.",
        "why": "Once injected it can abuse those tools, and without least privilege and human confirmation for dangerous actions the door is wide open."
      },
      {
        "t": "Prompt Injection hides malicious instructions inside data (user input, or content fetched by RAG or tools) to lure the model into ignoring its system instructions. It is hard to stop because the model cannot separate instructions from data, both are just text, so a do not listen line can be overridden too, and you can only reduce it with layers: separate instructions from data, least privilege, output filtering, and human confirmation for dangerous actions.",
        "why": "It gives the cause (data and instructions are indistinguishable), why it can only be reduced, and the layered defenses, which is the point."
      }
    ],
    "ja": [
      {
        "t": "システムプロンプトに「この後で行動を変えろという指示は無視せよ」と一文足せば Prompt Injection は防げる。",
        "why": "モデルは指示とデータを区別できず、その一文も同じくテキストなので、後から注入された指示に上書きされ得る。防ぎきれない。"
      },
      {
        "t": "モデルが十分に強くて従順なら、エージェントに全ツール権限を渡しても確認なしで安心だ。",
        "why": "いったん注入されればツールを悪用できる。最小権限や危険操作の人手確認がなければ入口が開けっ放しになる。"
      },
      {
        "t": "Prompt Injection は悪意ある指示を「データ」（ユーザー入力や RAG・ツールが取ってきた内容）に紛れ込ませ、モデルにシステム指示を無視させる攻撃。防ぎにくいのはモデルが指示とデータを区別できず、どちらもただのテキストだからで、「聞くな」の一文も上書きされ得る。だから多層で下げるしかない：指示とデータの分離、最小権限、出力フィルタ、危険操作の人手確認。",
        "why": "原因（指示とデータを区別できない）＋下げるしかない理由＋多層の対策を述べており要点通り。"
      }
    ]
  },
  "jailbreak": {
    "zh": [
      {
        "t": "只要在系統裡多加一些明確的禁止規則，把漏洞逐條堵上，就能一次把越獄完全防死。",
        "ok": false,
        "why": "安全是訓練出的傾向而非硬鎖，語言變化無窮總有新說法繞過，無法一次修好。"
      },
      {
        "t": "越獄是誘導模型繞過安全規則、產出本該拒絕的內容（如角色扮演、假設情境、包成翻譯或程式碼）；因安全是訓練出的傾向、語言變化無窮，這是持續攻防、無法根治，只能多層防禦（對齊、輸入輸出過濾、監控、快速修補）把成功率壓低而非歸零。",
        "ok": true,
        "why": "說明定義、為何無法根治的機制，以及多層降低而非歸零的目標，符合 core。"
      },
      {
        "t": "越獄就是駭客入侵伺服器、竊取模型權限或程式碼的資安攻擊。",
        "ok": false,
        "why": "誤解概念：越獄是用對話誘導模型繞過安全規則，並非入侵系統或竊取權限。"
      }
    ],
    "en": [
      {
        "t": "Just adding more explicit prohibition rules in the system and plugging the loopholes one by one can block jailbreaks completely in one go.",
        "why": "Safety is a trained tendency rather than a hard lock, and with endless variations of language there is always a new phrasing to get around it, so it cannot be fixed in one go."
      },
      {
        "t": "Jailbreaking is inducing the model to bypass safety rules and produce content it should have refused (such as role-play, hypothetical scenarios, or wrapping it as translation or code); because safety is a trained tendency and language varies endlessly, this is a continuous attack-defense contest that cannot be cured, and one can only use layered defenses (alignment, input and output filtering, monitoring, rapid patching) to push the success rate down rather than to zero.",
        "why": "It explains the definition, the mechanism of why it cannot be cured, and the goal of layered reduction rather than reaching zero, matching the core."
      },
      {
        "t": "Jailbreaking is a cybersecurity attack where hackers break into servers and steal the model's permissions or code.",
        "why": "It misunderstands the concept: jailbreaking uses conversation to induce the model to bypass safety rules, not breaking into systems or stealing permissions."
      }
    ],
    "ja": [
      {
        "t": "システムに明確な禁止規則をもっと加え、抜け穴を一つずつふさぎさえすれば、jailbreakを一度で完全に防ぎきれる。",
        "why": "安全性は訓練で身についた傾向であって硬いロックではなく、言語の変化は無限で常に新しい言い回しで回避されるため、一度で直しきることはできない。"
      },
      {
        "t": "jailbreakとは、モデルを誘導して安全規則を回避させ、本来拒否すべき内容を出力させることである（ロールプレイ、仮定のシナリオ、翻訳やコードに包むなど）。安全性は訓練で身についた傾向であり、言語の変化は無限であるため、これは絶え間ない攻防で根治できず、多層の防御（アライメント、入出力のフィルタリング、監視、迅速な修正）によって成功率をゼロにではなく下げることしかできない。",
        "why": "定義、なぜ根治できないのかという仕組み、そしてゼロではなく多層で下げるという目標を説明しており、coreに合致する。"
      },
      {
        "t": "jailbreakとは、ハッカーがサーバーに侵入し、モデルの権限やコードを盗むサイバーセキュリティ攻撃のことだ。",
        "why": "概念を誤解している。jailbreakは対話でモデルを誘導して安全規則を回避させることであり、システムへの侵入や権限の窃取ではない。"
      }
    ]
  },
  "guardrails": {
    "zh": [
      {
        "t": "加一個內容過濾器（filter）把不當字詞擋掉就好，其餘交給模型自己判斷。",
        "ok": false,
        "why": "只做單點過濾不夠：沒涵蓋輸入注入、輸出外洩與行為權限，等於把安全寄望在模型自律。"
      },
      {
        "t": "只要選一個夠強、對齊得好的模型，靠它自律就不必額外外掛護欄。",
        "ok": false,
        "why": "過度信任模型：它本身不可靠、可被誘導，安全必須在它外面包一圈檢查，不能靠自律。"
      },
      {
        "t": "在模型外圍包一圈檢查：輸入擋惡意與注入、遮 PII；輸出查有害內容、資料外洩與格式；行為做工具權限白名單、危險動作要人審；並按風險分級（高風險嚴守、低風險放行），全程記錄監控以便迭代。",
        "ok": true,
        "why": "完整涵蓋輸入、輸出、行為三關，並點出風險分級與監控的取捨，貼合重點。"
      }
    ],
    "en": [
      {
        "t": "Just add a content filter to block inappropriate words, and leave the rest to the model's own judgment.",
        "why": "A single filter point is not enough: it does not cover input injection, output leakage, or action permissions, which amounts to betting safety on the model policing itself."
      },
      {
        "t": "As long as you pick a strong, well-aligned model, you can rely on its self-discipline and skip adding external guardrails.",
        "why": "Over-trusting the model: it is inherently unreliable and can be manipulated, so safety must wrap a layer of checks around it rather than rely on self-discipline."
      },
      {
        "t": "Wrap a layer of checks around the model: on input, block malicious content and injection and mask PII; on output, screen for harmful content, data leakage, and format; on behavior, use a tool-permission allowlist and require human review for dangerous actions; grade by risk (strict for high risk, pass through for low risk), and log and monitor throughout so you can iterate.",
        "why": "Fully covers the three gates of input, output, and behavior, and calls out the trade-offs of risk grading and monitoring, matching the key points."
      }
    ],
    "ja": [
      {
        "t": "不適切な単語をブロックするコンテンツフィルターを1つ追加するだけでよく、残りはモデル自身の判断に任せる。",
        "why": "単一のフィルターだけでは不十分：入力のインジェクション、出力の情報漏洩、行動の権限をカバーしておらず、安全性をモデルの自律に賭けているようなものです。"
      },
      {
        "t": "十分に強力でアラインメントの取れたモデルを1つ選びさえすれば、その自律に頼って追加のguardrailsは不要になる。",
        "why": "モデルを過信しています：モデル自体は信頼できず誘導されうるため、安全性は自律に頼るのではなく、モデルの外側に検査の層を巻く必要があります。"
      },
      {
        "t": "モデルの外側に検査の層を巻く：入力では悪意ある内容とインジェクションをブロックしPIIをマスクする、出力では有害な内容・情報漏洩・フォーマットをチェックする、行動ではツール権限のallowlistを設け危険な操作は人間がレビューする。さらにリスクで段階分けし（高リスクは厳格に、低リスクは通過させる）、反復改善できるよう全過程を記録・監視する。",
        "why": "入力・出力・行動の3つの関門を完全にカバーし、リスク段階分けと監視のトレードオフにも触れており、要点に合致しています。"
      }
    ]
  },
  "data-leakage": {
    "zh": [
      {
        "t": "用 OpenAI 這種大廠 API 就不會外洩，資料在他們那邊很安全。",
        "ok": false,
        "why": "送出去資料就離開你的邊界；要確認是否拿去訓練、簽 DPA、送出前去識別化，不是預設安全。"
      },
      {
        "t": "資料可能從多個環節漏（送第三方、被模型背下來、RAG 越權檢索、注入誘導、日誌），所以要分層防：送出前最小化加去識別化、選不拿去訓練的方案、RAG 帶權限、輸出掃 PII、日誌去識別化，並對齊 GDPR／個資法（可刪除、簽 DPA）。",
        "ok": true,
        "why": "講出多個外洩環節加對應的分層防護加合規，完整。"
      },
      {
        "t": "只要在輸出加一個過濾器擋掉個資就夠了。",
        "ok": false,
        "why": "輸出過濾只是其中一關；資料在送出、訓練、檢索、日誌等環節都可能漏，要分層防護。"
      }
    ],
    "en": [
      {
        "t": "Using a big-vendor API like OpenAI means no leakage; the data is safe on their side.",
        "why": "Once sent, the data leaves your boundary; you must confirm whether it trains on your data, sign a DPA, and de-identify before sending. It isn't safe by default."
      },
      {
        "t": "Data can leak at multiple stages (sent to third parties, memorized by the model, over-privileged RAG retrieval, injection, logs), so defend in layers: minimize and de-identify before sending, choose a plan that won't train on your data, give RAG permissions, scan output for PII, de-identify logs, and align with GDPR / personal-data law (right to erasure, sign a DPA).",
        "why": "It names multiple leakage stages plus the corresponding layered defenses plus compliance. Complete."
      },
      {
        "t": "Just adding a filter on the output to block PII is enough.",
        "why": "Output filtering is only one gate; data can leak at the sending, training, retrieval, and logging stages, so you need a layered defense."
      }
    ],
    "ja": [
      {
        "t": "OpenAI のような大手ベンダーの API を使えば漏洩しない、データは彼らの側で安全だ。",
        "why": "送信した時点でデータは境界を離れます。学習に使われるかを確認し、DPA を締結し、送信前に非識別化する必要があります。デフォルトで安全ではありません。"
      },
      {
        "t": "データは複数の段階（サードパーティへの送信、モデルによる記憶、RAG の権限逸脱による検索、インジェクション誘導、ログ）で漏れうるので、多層で防ぎます：送信前に最小化と非識別化、学習に使わないプランを選ぶ、RAG に権限を付与、出力の PII をスキャン、ログを非識別化、そして GDPR／個人情報保護法に整合させる（削除可能、DPA を締結）。",
        "why": "複数の漏洩段階に加え、対応する多層防御とコンプライアンスまで語れており、完全です。"
      },
      {
        "t": "出力にフィルターを1つ足して PII を遮断すれば十分だ。",
        "why": "出力フィルタリングは関門の一つにすぎません。データは送信、学習、検索、ログなどの段階で漏れうるので、多層防御が必要です。"
      }
    ]
  },
  "ai-limits": {
    "zh": [
      {
        "t": "先劃清邊界：它強在模式與生成（寫作、翻譯、摘要、程式草稿、加速重複工作），弱在真確性、最新與冷門知識、責任與價值判斷；它是放大生產力的工具而非替代，需求釐清、架構取捨、正確性把關仍靠人，重點在人機分工。",
        "ok": true,
        "why": "同時講清強項、弱項並落在人機分工，完整貼合重點。"
      },
      {
        "t": "它幾乎無所不能，很快就會全面取代工程師，該擔心的是自己何時被淘汰。",
        "ok": false,
        "why": "落入誇大的極端：忽略它在真確性與責任判斷上的弱點，也無視需求釐清、決策仍要人。"
      },
      {
        "t": "它只是會胡言亂語的玩具，正經工作還是別用，交給人做比較實在。",
        "ok": false,
        "why": "走另一端過度貶低：無視它在生成與加速重複工作上的實質價值。"
      }
    ],
    "en": [
      {
        "t": "Start by drawing the boundaries: it is strong at pattern work and generation (writing, translation, summarization, code drafts, speeding up repetitive work) and weak at factual accuracy, up-to-date and niche knowledge, and judgments of responsibility and value; it is a tool that amplifies productivity rather than a replacement, while clarifying requirements, architectural trade-offs, and correctness checks still rely on people, with the key being the division of labor between humans and machines.",
        "why": "It clearly states both strengths and weaknesses and lands on the human-machine division of labor, fully matching the key points."
      },
      {
        "t": "It can do almost anything and will soon fully replace engineers, so the thing to worry about is when you yourself will be phased out.",
        "why": "Falls into the exaggerated extreme: it ignores the model's weaknesses in factual accuracy and judgments of responsibility, and overlooks that clarifying requirements and making decisions still need people."
      },
      {
        "t": "It is just a toy that spouts nonsense, so you should not use it for serious work and are better off leaving that to people.",
        "why": "Goes to the other extreme of over-dismissing it: ignoring its real value in generation and in speeding up repetitive work."
      }
    ],
    "ja": [
      {
        "t": "まず境界を引く：モデルはパターンと生成（執筆、翻訳、要約、コードの下書き、繰り返し作業の高速化）に強く、事実の正確性、最新かつニッチな知識、責任と価値の判断に弱い。生産性を増幅するツールであって代替ではなく、要件の明確化、アーキテクチャの取捨選択、正確性のチェックは依然として人間に頼る。要点は人間と機械の役割分担にある。",
        "why": "強みと弱みの両方を明確に述べ、人間と機械の役割分担に落とし込んでおり、要点に完全に合致しています。"
      },
      {
        "t": "モデルはほぼ何でもでき、すぐにエンジニアを全面的に置き換えるので、心配すべきは自分がいつ淘汰されるかだ。",
        "why": "誇張された極端に陥っています：事実の正確性と責任判断における弱点を無視し、要件の明確化や意思決定が依然として人間を必要とすることも見落としています。"
      },
      {
        "t": "モデルはでたらめを並べるおもちゃにすぎず、まともな仕事には使わず人間に任せる方が確実だ。",
        "why": "もう一方の極端で過小評価しています：生成と繰り返し作業の高速化における実質的な価値を無視しています。"
      }
    ]
  },
  "can-llm-reason": {
    "zh": [
      {
        "t": "LLM 內部有一個推理引擎，會像人一樣一步步做邏輯，所以算術和多步推理都可靠。",
        "ok": false,
        "why": "它本質是預測下一個字，沒有獨立推理引擎；精確計算、長鏈邏輯正是它會錯的地方。"
      },
      {
        "t": "LLM 本質是預測下一個字，因為訓練資料有大量「推理形狀」的文字才學會像推理的續寫；它在訓練分布內很強，但精確計算、數數、長鏈邏輯、規劃、沒見過的新問題容易錯，所以要外包給工具、用 CoT、加驗證。",
        "ok": true,
        "why": "講出本質（token 預測）、為什麼像推理、哪裡會破、怎麼補，完整。"
      },
      {
        "t": "既然它會出錯，代表它只是隨機亂猜，沒有任何實用價值。",
        "ok": false,
        "why": "另一個極端也不對：它在分布內表現驚人、是強力工具；重點是劃清邊界並用工具補，不是全盤否定。"
      }
    ],
    "en": [
      {
        "t": "An LLM has a reasoning engine inside that works through logic step by step like a human, so its arithmetic and multi-step reasoning are reliable.",
        "why": "At its core it predicts the next token and has no independent reasoning engine; exact arithmetic and long logic chains are exactly where it goes wrong."
      },
      {
        "t": "An LLM at its core predicts the next token, and it only learned reasoning-like continuation because the training data holds a vast amount of 'reasoning-shaped' text; it's strong in-distribution, but exact arithmetic, counting, long logic chains, planning, and novel problems trip it up, so you outsource to tools, use CoT, and add verification.",
        "why": "It states the core (token prediction), why it looks like reasoning, where it breaks, and how to shore it up: complete."
      },
      {
        "t": "Since it makes mistakes, it must just be guessing at random and have no practical value at all.",
        "why": "The other extreme is wrong too: it's astonishing in-distribution and a powerful tool; the point is to draw clear boundaries and shore it up with tools, not to dismiss it wholesale."
      }
    ],
    "ja": [
      {
        "t": "LLM の内部には推論エンジンがあり、人間のように一歩ずつ論理を進めるので、算術も多段階の推論も信頼できる。",
        "why": "本質は次のトークンを予測することであり、独立した推論エンジンはありません。正確な計算や長い論理の連鎖こそ、間違える場所です。"
      },
      {
        "t": "LLM の本質は次のトークンを予測することで、学習データに「推論の形」をした文字が大量にあるからこそ推論のような続きを書くことを学んだにすぎません。訓練分布内(in-distribution)では強いですが、正確な計算、数え上げ、長い論理の連鎖、プランニング、見たことのない新しい問題では間違えやすいので、ツールに外注し、CoT を使い、検証を加えます。",
        "why": "本質（token 予測）、なぜ推論のように見えるのか、どこで破綻するのか、どう補うのかを述べており、完全です。"
      },
      {
        "t": "間違えるということは、ただランダムに当てずっぽうをしているだけで、実用的な価値は何もないということだ。",
        "why": "もう一方の極端も誤りです：分布内(in-distribution)では驚くほどの性能を見せる強力なツールです。重要なのは境界を明確に引きツールで補うことであり、全面的に否定することではありません。"
      }
    ]
  },
  "design-doc-qa": {
    "zh": [
      {
        "t": "接一套 RAG、再選個強一點的 LLM 就能上線，生成品質夠好答案自然就準。",
        "ok": false,
        "why": "重點放錯：難點在檢索品質、權限與可引用，找錯片段模型再強也答錯。"
      },
      {
        "t": "定位成 RAG 問題、力氣放在檢索：解析（掃描檔先 OCR）→ 依結構切塊 → 向量化存庫 → 混合檢索加 rerank → 只依片段作答並附出處、查無就說「文件裡沒有」；再加權限過濾（做在 metadata 上）與可引用來源，並分開評估檢索與生成、用真實測試集回頭修切塊或檢索形成閉環。",
        "ok": true,
        "why": "涵蓋整條檢索管線加權限、可引用與分層評估閉環，完整命中重點。"
      },
      {
        "t": "把所有內部文件整包塞進 prompt 讓 LLM 讀完再回答，就不必做檢索了。",
        "ok": false,
        "why": "過度簡化且不可行：context 塞不下又貴，還漏了權限過濾與出處引用。"
      }
    ],
    "en": [
      {
        "t": "Hook up a RAG setup, pick a stronger LLM, and you can ship; once generation quality is good enough, the answers will naturally be accurate.",
        "why": "The focus is misplaced: the hard parts are retrieval quality, permissions, and citability; if the wrong passages are retrieved, even a strong model answers wrong."
      },
      {
        "t": "Frame it as a RAG problem and put the effort into retrieval: parse (OCR scanned files first) → chunk by structure → embed and store in a vector database → hybrid retrieval plus rerank → answer only from the passages with citations, and if nothing is found say \"it is not in the documents\"; then add permission filtering (done on metadata) and citable sources, evaluate retrieval and generation separately, and use a real test set to go back and fix chunking or retrieval, forming a closed loop.",
        "why": "Covers the whole retrieval pipeline plus permissions, citability, and a layered evaluation closed loop, fully hitting the key points."
      },
      {
        "t": "Cram all internal documents into the prompt in one bundle, let the LLM read everything and then answer, and you can skip retrieval.",
        "why": "Oversimplified and unworkable: the context cannot hold it all and is expensive, and it also misses permission filtering and source citation."
      }
    ],
    "ja": [
      {
        "t": "RAGを1セット接続し、もう少し強力なLLMを選べばリリースでき、生成品質が十分に良ければ答えは自然と正確になる。",
        "why": "重点がずれています：難所は検索品質、権限、引用可能性にあり、間違ったチャンクを取ってくればモデルがどれだけ強力でも誤答します。"
      },
      {
        "t": "RAGの問題として位置づけ、検索に力を注ぐ：解析（スキャン文書はまずOCR）→ 構造に沿ってチャンク分割 → ベクトル化してDBに保存 → ハイブリッド検索にrerankを追加 → チャンクのみに基づいて回答し出典を添え、見つからなければ「文書内にありません」と言う。さらに権限フィルタリング（metadata上で実施）と引用可能な出典を加え、検索と生成を分けて評価し、実際のテストセットで戻ってチャンク分割や検索を修正し、閉ループを形成する。",
        "why": "検索パイプライン全体に加え、権限、引用可能性、階層的な評価の閉ループまでカバーしており、要点を完全に押さえています。"
      },
      {
        "t": "すべての社内文書をまとめてpromptに詰め込み、LLMに全部読ませてから回答させれば、検索は不要になる。",
        "why": "過度に単純化されており実行不可能です：contextに収まらず高コストな上、権限フィルタリングと出典の引用も抜けています。"
      }
    ]
  },
  "design-support-bot": {
    "zh": [
      {
        "t": "直接接一個大模型聊天機器人，讓它自由回答所有客服問題就好。",
        "ok": false,
        "why": "過度簡化：缺了查訂單物流的工具、記憶、護欄與轉人工，還會自由發揮亂承諾。"
      },
      {
        "t": "接個 RAG 查產品知識庫來回答退換貨政策，這樣就夠了。",
        "ok": false,
        "why": "只做 RAG 不夠：還要用工具查訂單物流、靠記憶認得用戶、加護欄並能轉人工。"
      },
      {
        "t": "串成一條 pipeline：判斷意圖 → 需知識走 RAG 取政策片段、需即時資料用工具（以 MCP 接後端 API）→ 帶著記憶生成有依據的回答；加護欄（能承諾什麼寫死規則），信心低、情緒升高或涉及金額就轉真人；記憶分短長期並顧隱私，持續回收對話與負評案例迭代。",
        "ok": true,
        "why": "把 RAG、工具、記憶、護欄與轉人工串成一條 pipeline，完整貼合重點。"
      }
    ],
    "en": [
      {
        "t": "Just plug in a large-model chatbot and let it freely answer all customer-service questions.",
        "why": "Oversimplified: it lacks tools to look up orders and shipping, memory, guardrails, and handoff to a human, and it will improvise and make reckless promises."
      },
      {
        "t": "Add a RAG that queries the product knowledge base to answer return and exchange policies, and that is enough.",
        "why": "RAG alone is not enough: you also need tools to look up orders and shipping, memory to recognize the user, guardrails, and the ability to hand off to a human."
      },
      {
        "t": "Chain it into a pipeline: detect intent → for knowledge needs go through RAG to fetch policy passages, for real-time data use tools (connecting to backend APIs via MCP) → generate grounded answers carrying memory; add guardrails (hard-code rules for what can be promised), and hand off to a human when confidence is low, emotions run high, or money is involved; split memory into short-term and long-term while protecting privacy, and continuously collect conversations and negative-review cases to iterate.",
        "why": "Chains RAG, tools, memory, guardrails, and human handoff into one pipeline, fully matching the key points."
      }
    ],
    "ja": [
      {
        "t": "大規模モデルのチャットボットを直接つなぎ、すべてのカスタマーサポートの質問に自由に答えさせるだけでよい。",
        "why": "過度に単純化されています：注文や物流を照会するツール、記憶、guardrails、有人対応への引き継ぎが欠けており、しかも自由に振る舞って無責任な約束をしてしまいます。"
      },
      {
        "t": "商品ナレッジベースを照会するRAGを接続して返品交換ポリシーに答えれば、それで十分だ。",
        "why": "RAGだけでは不十分です：注文や物流を照会するツール、ユーザーを認識するための記憶、guardrailsの追加、有人対応への引き継ぎも必要です。"
      },
      {
        "t": "1本のpipelineにつなぐ：意図を判断 → 知識が必要ならRAGでポリシーのチャンクを取得、リアルタイムのデータが必要ならツールを使う（MCPでバックエンドAPIに接続）→ 記憶を持たせて根拠のある回答を生成する。guardrailsを追加し（何を約束できるかはルールをハードコード）、信頼度が低い・感情が高ぶっている・金額が絡む場合は有人対応に引き継ぐ。記憶は短期と長期に分けてプライバシーに配慮し、会話と低評価のケースを継続的に回収して反復改善する。",
        "why": "RAG、ツール、記憶、guardrails、有人対応への引き継ぎを1本のpipelineにつないでおり、要点に完全に合致しています。"
      }
    ]
  },
  "realtime-assistant": {
    "zh": [
      {
        "t": "先點根本：模型知識有截止、預設不會主動連網，即時要靠工具或檢索把最新資料拉進來；流程是判斷是否需即時 → 用 function calling／API 或即時檢索取回 → 把結果（含時間戳與來源）放進 prompt 作答；並依資料變動速度設快取時效，處理逾時重試、查不到就誠實說沒有、權限與成本上限並監控成功率。",
        "ok": true,
        "why": "從根本原因到取回、快取取捨與失敗／權限處理整條串起，完整命中。"
      },
      {
        "t": "接一個外部 API 讓模型隨時去呼叫，就能查到即時資料了。",
        "ok": false,
        "why": "只講接 API 不夠：漏了快取取捨、逾時重試、查不到的處理與權限成本控管。"
      },
      {
        "t": "現在的大模型都能連網，直接問它最新資訊即可，不必特別設計。",
        "ok": false,
        "why": "過度誇大：模型知識有截止且預設不主動連網，即時能力得靠外部工具或檢索補進來。"
      }
    ],
    "en": [
      {
        "t": "Start with the root cause: the model's knowledge has a cutoff and by default it does not go online on its own, so real-time needs rely on tools or retrieval to pull in the latest data; the flow is to decide whether real-time is needed → retrieve via function calling / API or live retrieval → put the results (with timestamps and sources) into the prompt to answer; and set cache lifetimes according to how fast the data changes, handle timeout retries, honestly say there is nothing when the lookup fails, apply permission and cost limits, and monitor the success rate.",
        "why": "Chains it all together from the root cause through retrieval, cache trade-offs, and failure/permission handling, fully on point."
      },
      {
        "t": "Connect an external API that the model can call at any time, and you will be able to look up real-time data.",
        "why": "Just connecting an API is not enough: it misses cache trade-offs, timeout retries, handling of failed lookups, and permission and cost control."
      },
      {
        "t": "Today's large models can all go online, so you can just ask them for the latest information and do not need any special design.",
        "why": "Overblown: the model's knowledge has a cutoff and by default it does not go online on its own, so real-time capability must be supplied through external tools or retrieval."
      }
    ],
    "ja": [
      {
        "t": "まず根本を突く：モデルの知識には締め切りがあり、デフォルトでは自らネットに接続しないため、リアルタイム性はツールや検索で最新データを引き込むことに頼る。流れは、リアルタイムが必要か判断 → function callingやAPI、あるいはライブ検索で取得 → 結果（タイムスタンプと出典を含む）をpromptに入れて回答する。さらにデータの変化速度に応じてキャッシュの有効期限を設定し、タイムアウト時の再試行を処理し、見つからなければ正直にないと言い、権限とコストの上限を設けて成功率を監視する。",
        "why": "根本原因から取得、キャッシュのトレードオフ、失敗・権限の処理まで一連につないでおり、完全に的を射ています。"
      },
      {
        "t": "外部APIを1つ接続してモデルがいつでも呼び出せるようにすれば、リアルタイムのデータを取得できる。",
        "why": "APIを接続するだけでは不十分です：キャッシュのトレードオフ、タイムアウト時の再試行、見つからない場合の処理、権限とコストの管理が抜けています。"
      },
      {
        "t": "今の大規模モデルはどれもネットに接続できるので、直接最新情報を尋ねればよく、特別な設計は不要だ。",
        "why": "過度な誇張です：モデルの知識には締め切りがあり、デフォルトでは自らネットに接続しないため、リアルタイム能力は外部ツールや検索で補う必要があります。"
      }
    ]
  },
  "design-build-vs-buy": {
    "zh": [
      {
        "t": "API 一定比較貴又不安全，能自架就自架，開源模型免費又可控。",
        "ok": false,
        "why": "「開源＝免費」是錯覺（GPU 加維運成本高）；安全取決於怎麼做，不是自架本身；低量時 API 往往更划算。"
      },
      {
        "t": "沒有一律答案，要按情境權衡：高敏感／受法規、要資料留自家傾向自架；低量或早期用 API 划算，量夠大攤平 GPU 才輪到自架；再看能力 vs 可控與維運人力。實務常混用：預設 API，敏感或高量路徑自架。",
        "ok": true,
        "why": "講出多維度取捨（隱私、成本結構、能力/可控、維運）與混合策略，完整。"
      },
      {
        "t": "一律用商用 API 最好，因為它最強又零維運，成本永遠比自架低。",
        "ok": false,
        "why": "量夠大時自架可能更便宜；且高敏感或合規場景未必能用外部 API，不是一律 API。"
      }
    ],
    "en": [
      {
        "t": "APIs are always more expensive and less secure, so self-host whenever you can; open-source models are free and controllable.",
        "why": "'Open-source equals free' is an illusion (GPU plus operations costs are high); security depends on how you do it, not on self-hosting itself; at low volume the API is often the better deal."
      },
      {
        "t": "There is no one-size-fits-all answer; weigh it by context: highly sensitive/regulated cases that must keep data in-house lean toward self-hosting; low volume or early stage makes the API the better deal, and self-hosting only comes into play once volume is large enough to amortize the GPUs; then consider capability vs control and operations staffing. In practice you often mix: default to the API, self-host the sensitive or high-volume paths.",
        "why": "It spells out the multi-dimensional trade-off (privacy, cost structure, capability/control, operations) and the hybrid strategy; complete."
      },
      {
        "t": "Always using a commercial API is best, because it is the strongest and has zero operations, and its cost is always lower than self-hosting.",
        "why": "At large enough volume self-hosting can be cheaper; and highly sensitive or compliance scenarios may not allow an external API, so it is not always the API."
      }
    ],
    "ja": [
      {
        "t": "API は必ず高くて安全でないから、self-host できるなら self-host すべきで、open-source model は無料でコントロールもできる。",
        "why": "「open-source＝無料」は錯覚（GPU と運用のコストが高い）；安全性はやり方次第であって self-host 自体ではない；低量では API のほうが得なことが多い。"
      },
      {
        "t": "一律の答えはなく、状況に応じて重みづけする：高機密／法規制の対象でデータを自社に留めたい場合は self-host 寄り；低量や初期段階は API が得で、GPU を分散できるほど量が大きくなって初めて self-host の出番；さらに能力 vs コントロールと運用の人手を見る。実務ではよく混ぜる：デフォルトは API、機密や大量の経路は self-host。",
        "why": "多面的なトレードオフ（プライバシー、コスト構造、能力／コントロール、運用）とハイブリッド戦略を述べており、完全。"
      },
      {
        "t": "一律で商用 API が最良、なぜなら最強で運用ゼロだし、コストも常に self-host より低いから。",
        "why": "量が十分大きいと self-host のほうが安いこともある；また高機密やコンプライアンスの場面では外部 API を使えないこともあり、一律 API ではない。"
      }
    ]
  },
  "design-data-pipeline": {
    "zh": [
      {
        "t": "把所有文件一次倒進向量庫就好，資料準備是一次性的工作。",
        "ok": false,
        "why": "資料會變、會髒、有隱私；要可重跑、可更新、可版本控的管線，還要去識別化與去重，不是一次性。"
      },
      {
        "t": "設計成一條可重跑的管線：收集 → 清洗去重 → 去識別化與權限 → 依用途加工（RAG 切塊向量化、微調做指令對、評估抽測試集）→ 索引存 → 增量更新與版本控。解析與清洗品質是整個系統的天花板。",
        "ok": true,
        "why": "涵蓋收集清洗、隱私治理、依用途加工、更新版本，把資料當工程，完整。"
      },
      {
        "t": "資料越多越好，先全部塞進去，品質和去重之後再說。",
        "ok": false,
        "why": "garbage in, garbage out：髒資料與重複會拖垮 RAG 與微調，品質與去重比堆量更關鍵。"
      }
    ],
    "en": [
      {
        "t": "Just dump all the documents into the vector database at once; data preparation is a one-time job.",
        "why": "Data changes, gets dirty, and carries privacy concerns; you need a repeatable, updatable, version-controlled pipeline, plus de-identification and deduplication, not a one-time job."
      },
      {
        "t": "Design it as a repeatable pipeline: collect → clean and dedup → de-identify and permissions → process per use case (RAG chunk and vectorize, fine-tuning build instruction pairs, evaluation pull a test set) → index and store → incremental update and version control. Parsing and cleaning quality is the ceiling of the whole system.",
        "why": "It covers collection and cleaning, privacy governance, per-use processing, and update and versioning, treating data as engineering; complete."
      },
      {
        "t": "More data is always better; cram it all in first and worry about quality and deduplication later.",
        "why": "Garbage in, garbage out: dirty data and duplicates drag down RAG and fine-tuning, so quality and deduplication matter more than piling up volume."
      }
    ],
    "ja": [
      {
        "t": "すべてのドキュメントを一度に vector database に流し込めばよく、データ準備は一度きりの作業だ。",
        "why": "データは変わり、汚れ、プライバシーを含む；再実行可能で更新可能、バージョン管理できるパイプラインが必要で、さらに de-identify と重複除去も要る、一度きりではない。"
      },
      {
        "t": "再実行可能なパイプラインとして設計する：収集 → クレンジングと重複除去 → de-identify と権限 → 用途に応じた加工（RAG は chunk してベクトル化、fine-tune は指示ペアを作成、評価はテストセットを抜き出す）→ index して保存 → 増分更新とバージョン管理。解析とクレンジングの品質がシステム全体の上限。",
        "why": "収集とクレンジング、プライバシーのガバナンス、用途に応じた加工、更新とバージョン管理を網羅し、データをエンジニアリングとして扱っており、完全。"
      },
      {
        "t": "データは多いほど良く、まず全部詰め込んで、品質や重複除去は後で考えればよい。",
        "why": "garbage in, garbage out（入れるものがゴミなら出てくるものもゴミ）：汚れたデータと重複は RAG と fine-tune の足を引っ張るので、品質と重複除去は量を積むことより重要。"
      }
    ]
  },
  "design-latency-scale": {
    "zh": [
      {
        "t": "要更快更能撐流量，就是一直加 GPU、開更多機器。",
        "ok": false,
        "why": "加機器是最後一層；該先減量（模型分流、量化、KV cache、快取）與藏等待（streaming、非同步、批次），否則只是燒錢。"
      },
      {
        "t": "三層一起做：先降單次成本（模型分流、量化、KV cache、精簡 context、快取）→ 藏等待（streaming、非同步佇列、批次）→ 水平擴展（多副本、負載平衡、自動擴縮、rate limit）；並先定 SLO（如 P95 延遲）再權衡延遲、吞吐、成本、品質。",
        "ok": true,
        "why": "講出減量/藏等待/擴展三層加 SLO 與取捨，還點出尾延遲，完整。"
      },
      {
        "t": "只要平均延遲夠低就代表夠快，批次能提高吞吐所以永遠該開最大批次。",
        "ok": false,
        "why": "體感在 P95/P99 尾延遲，不是平均；批次提高吞吐但增延遲，要按 SLO 權衡，不是一律最大。"
      }
    ],
    "en": [
      {
        "t": "To go faster and handle more traffic, you just keep adding GPUs and spinning up more machines.",
        "why": "Adding machines is the last layer; you should first reduce the load (model routing, quantization, KV cache, caching) and hide the wait (streaming, async, batching), otherwise you are just burning money."
      },
      {
        "t": "Do all three layers together: first lower the per-call cost (model routing, quantization, KV cache, trimmed context, caching) → hide the wait (streaming, async queues, batching) → scale horizontally (multiple replicas, load balancing, autoscale, rate limit); and set an SLO (such as P95 latency) first, then weigh latency, throughput, cost, and quality.",
        "why": "It names the three layers of reduce/hide the wait/scale plus the SLO and trade-offs, and also points out tail latency; complete."
      },
      {
        "t": "As long as average latency is low enough it means fast enough, and since batching raises throughput you should always run the largest batch.",
        "why": "The felt experience lives in P95/P99 tail latency, not the average; batching raises throughput but adds latency, so weigh it against the SLO rather than always going maximum."
      }
    ],
    "ja": [
      {
        "t": "より速く、より多くのトラフィックを捌くには、ひたすら GPU を増やし、マシンを増やせばよい。",
        "why": "マシンを増やすのは最後の層；先に量を減らし（モデルの振り分け、quantization、KV cache、キャッシュ）、待ち時間を隠す（streaming、非同期、batching）べきで、そうしなければ金を燃やすだけ。"
      },
      {
        "t": "3 層を一緒にやる：まず 1 回あたりのコストを下げ（モデルの振り分け、quantization、KV cache、context の削減、キャッシュ）→ 待ち時間を隠し（streaming、非同期キュー、batching）→ 水平スケール（複数レプリカ、load balancing、autoscale、rate limit）；さらに先に SLO（P95 latency など）を定めてから latency、throughput、コスト、品質を天秤にかける。",
        "why": "量を減らす／待ち時間を隠す／スケールの 3 層に SLO とトレードオフを加えて述べ、さらに tail latency にも触れており、完全。"
      },
      {
        "t": "平均 latency さえ十分低ければ十分速いということで、batching は throughput を上げるから常に最大の batch にすべき。",
        "why": "体感は P95/P99 の tail latency にあり、平均ではない；batching は throughput を上げるが latency も増えるので、一律で最大にするのではなく SLO に照らして天秤にかける。"
      }
    ]
  },
  "design-cost": {
    "zh": [
      {
        "t": "直接把全部請求改用最便宜的小模型，成本自然就壓到最低。",
        "ok": false,
        "why": "省過頭的假省：把難題交給小模型會答錯，導致重試、客訴、轉人工反而更貴。"
      },
      {
        "t": "先算成本來源（token 量 × 呼叫次數 × 單價，輸入 context 常是大頭）找出大頭；再模型分流（簡單任務用小模型、難的才升級，用輕量分流器）、砍 token 與快取（精簡 context、用 RAG 取代長 context、prompt caching、批次拿折扣）、設每請求或每用戶上限，但邊省邊盯品質指標。",
        "ok": true,
        "why": "從成本結構到分流、砍 token、快取與成本 vs 品質的取捨，完整命中。"
      },
      {
        "t": "把模型換成更便宜的一款就好，成本主要就是看你選哪個模型。",
        "ok": false,
        "why": "太粗：成本是 token 量乘上呼叫次數，還要靠模型分流、精簡 context 與快取多管齊下。"
      }
    ],
    "en": [
      {
        "t": "Just switch all requests to the cheapest small model, and the cost will naturally be driven to the minimum.",
        "why": "A false economy that cuts too far: handing hard problems to a small model produces wrong answers, leading to retries, complaints, and human handoff that end up more expensive."
      },
      {
        "t": "First compute where cost comes from (token volume × number of calls × unit price, where the input context is often the biggest chunk) to find the biggest driver; then route across models (small model for simple tasks, upgrade only for hard ones, using a lightweight router), cut tokens and cache (trim the context, use RAG instead of a long context, prompt caching, batch for discounts), set per-request or per-user limits, and watch quality metrics while you save.",
        "why": "From cost structure to routing, token cutting, caching, and the cost versus quality trade-off, fully on point."
      },
      {
        "t": "Just swap in a cheaper model; cost is mainly about which model you pick.",
        "why": "Too crude: cost is token volume times number of calls, and it also takes model routing, trimming the context, and caching working together."
      }
    ],
    "ja": [
      {
        "t": "全リクエストを最も安い小型モデルに切り替えれば、コストは自然と最小まで抑えられる。",
        "why": "節約しすぎのまやかしの節約です：難題を小型モデルに任せると誤答し、再試行、クレーム、有人対応を招いてかえって高くつきます。"
      },
      {
        "t": "まずコストの発生源（token量 × 呼び出し回数 × 単価、入力contextが大部分を占めることが多い）を計算して大きな要因を特定する。次にモデルを振り分け（簡単なタスクは小型モデル、難しいものだけ格上げ、軽量なルーターを使う）、tokenを削りキャッシュする（contextを簡素化、長いcontextをRAGで置き換え、prompt caching、バッチ処理で割引を得る）、リクエストごとやユーザーごとの上限を設定し、節約しながら品質指標を見張る。",
        "why": "コスト構造からモデルの振り分け、token削減、キャッシュ、コスト対品質のトレードオフまで、完全に的を射ています。"
      },
      {
        "t": "モデルをより安い1つに替えるだけでよく、コストは主にどのモデルを選ぶかで決まる。",
        "why": "大雑把すぎます：コストはtoken量に呼び出し回数を掛けたものであり、モデルの振り分け、contextの簡素化、キャッシュを組み合わせる必要もあります。"
      }
    ]
  },
  "design-eval-improve": {
    "zh": [
      {
        "t": "上線後看使用者滿不滿意就好，滿意度高就代表 AI 做得好。",
        "ok": false,
        "why": "太片面：缺離線固定測試集防回歸，也沒有把失敗案例變成改進的閉環。"
      },
      {
        "t": "跑出一個準確率數字達標，就代表 AI 做得好，不必再看別的。",
        "ok": false,
        "why": "生成任務沒有唯一正解，單一準確率脫離產品目標，也漏了線上真實回饋。"
      },
      {
        "t": "離線加線上兩條腿：離線用固定測試集每次改動都跑防回歸，線上做 A/B 與使用者回饋；指標貼齊產品目標（客服看解決率、問答看引用正確率與拒答是否得當），開放輸出用 LLM-as-judge 但先以人工標註校準；再把失敗案例回收 → 歸類 → 補進測試集 → 針對性修 → 回歸驗證，形成閉環。",
        "ok": true,
        "why": "涵蓋離線／線上兩條腿、指標對齊、LLM-judge 校準與失敗閉環，完整命中。"
      }
    ],
    "en": [
      {
        "t": "After launch, just look at whether users are satisfied; high satisfaction means the AI is doing well.",
        "why": "Too one-sided: it lacks an offline fixed test set to guard against regressions and does not turn failure cases into a closed loop of improvement."
      },
      {
        "t": "Once you produce an accuracy number that hits the target, the AI is doing well and there is no need to look at anything else.",
        "why": "Generation tasks have no single correct answer, a single accuracy figure is detached from the product goal, and it also misses real online feedback."
      },
      {
        "t": "Stand on two legs, offline and online: offline, run a fixed test set on every change to guard against regressions; online, do A/B tests and gather user feedback; align metrics with the product goal (for customer service look at resolution rate, for QA look at citation accuracy and whether refusals are appropriate), and for open-ended output use LLM-as-judge but calibrate it first with human annotation; then collect failure cases → categorize → add to the test set → fix in a targeted way → validate against regressions, forming a closed loop.",
        "why": "Covers both legs of offline and online, metric alignment, LLM-as-judge calibration, and the failure closed loop, fully on point."
      }
    ],
    "ja": [
      {
        "t": "リリース後はユーザーが満足しているかを見ればよく、満足度が高ければAIがうまくやっている証拠だ。",
        "why": "一面的すぎます：回帰を防ぐオフラインの固定テストセットが欠けており、失敗ケースを改善の閉ループに変えることもしていません。"
      },
      {
        "t": "目標を達成する正解率の数字を1つ出せば、AIがうまくやっている証拠であり、他を見る必要はない。",
        "why": "生成タスクには唯一の正解がなく、単一の正解率は製品目標から乖離しており、オンラインでの実際のフィードバックも抜けています。"
      },
      {
        "t": "オフラインとオンラインの2本足で立つ：オフラインでは固定テストセットを変更のたびに走らせて回帰を防ぎ、オンラインではA/Bテストとユーザーフィードバックを行う。指標は製品目標に合わせ（カスタマーサポートは解決率、Q&Aは引用の正確率と拒否が適切かを見る）、オープンな出力にはLLM-as-judgeを使うが、まず人手のアノテーションで校正する。さらに失敗ケースを回収 → 分類 → テストセットに追加 → 的を絞って修正 → 回帰検証し、閉ループを形成する。",
        "why": "オフラインとオンラインの2本足、指標の整合、LLM-as-judgeの校正、失敗の閉ループをカバーしており、完全に的を射ています。"
      }
    ]
  },
  "monitoring": {
    "zh": [
      {
        "t": "重點是監控品質不只可用性：系統面（延遲、錯誤率、成本、用量）、品質面（任務成功率、幻覺／拒答率、讚踩與重問率）、安全面（注入／越獄、異常行為）；線上無標準答案就偵測「變化」（趨勢與分佈對照上線基線、定期抽樣打分、異常告警），出事則告警 → 定位環節 → 回滾或灰度止血 → 復盤並回灌測試集。",
        "ok": true,
        "why": "涵蓋沉默品質下降的風險、三面監控指標與偵測退化加止血閉環，完整命中。"
      },
      {
        "t": "看系統有沒有報錯、服務有沒有掛掉就好，沒 crash 就代表一切正常。",
        "ok": false,
        "why": "漏掉最大風險：沉默的品質下降沒有 crash，卻答得越來越差，得監控品質而非只看可用性。"
      },
      {
        "t": "只要盯著使用者的負評，有人抱怨了再去處理就行。",
        "ok": false,
        "why": "太被動片面：缺系統與安全面監控、缺對照基線的變化偵測，也沒有止血與回灌的閉環。"
      }
    ],
    "en": [
      {
        "t": "The point is to monitor quality, not just availability: the system side (latency, error rate, cost, usage), the quality side (task success rate, hallucination/refusal rate, thumbs up/down and re-ask rate), and the safety side (injection/jailbreak, anomalous behavior); with no ground truth online, detect \"changes\" (compare trends and distributions against the launch baseline, sample and score periodically, alert on anomalies), and when something goes wrong: alert → locate the stage → roll back or use a canary release to stop the bleeding → do a post-mortem and feed cases back into the test set.",
        "why": "Covers the risk of silent quality decline, the three sides of monitoring metrics, and the detect-degradation-plus-stop-the-bleeding closed loop, fully on point."
      },
      {
        "t": "Just look at whether the system throws errors and whether the service goes down; no crash means everything is fine.",
        "why": "Misses the biggest risk: silent quality decline has no crash yet answers get worse and worse, so you must monitor quality rather than only availability."
      },
      {
        "t": "Just keep an eye on users' negative reviews and deal with it once someone complains.",
        "why": "Too passive and one-sided: it lacks system-side and safety-side monitoring, lacks change detection against a baseline, and has no stop-the-bleeding and feedback closed loop."
      }
    ],
    "ja": [
      {
        "t": "重要なのは可用性だけでなく品質を監視すること：システム面（レイテンシ、エラー率、コスト、利用量）、品質面（タスク成功率、hallucination/拒否率、高評価・低評価と再質問率）、安全面（インジェクション/jailbreak、異常な振る舞い）。オンラインでは正解がないので「変化」を検知する（トレンドと分布をリリース時のベースラインと照合、定期的にサンプリングして採点、異常をアラート）。問題が起きたらアラート → 箇所を特定 → ロールバックまたはカナリアリリースで止血 → 振り返って事例をテストセットに還流する。",
        "why": "静かな品質低下のリスク、3つの面の監視指標、劣化検知と止血の閉ループをカバーしており、完全に的を射ています。"
      },
      {
        "t": "システムがエラーを出していないか、サービスが落ちていないかを見ればよく、crashがなければすべて正常という証拠だ。",
        "why": "最大のリスクを見落としています：静かな品質低下はcrashを起こさないのに回答がどんどん悪化するため、可用性だけを見るのではなく品質を監視する必要があります。"
      },
      {
        "t": "ユーザーの低評価を見張り、誰かが不満を言ったら対処すればよい。",
        "why": "受動的で一面的すぎます：システム面と安全面の監視が欠け、ベースラインと照合する変化検知が欠け、止血と還流の閉ループもありません。"
      }
    ]
  }
};

/** 回傳 [{ ok, t, why }]；無題回 null。 */
export function quizFor(id, locale = 'zh') {
  const q = QUIZZES[id];
  if (!q || !q.zh) return null;
  const tr = locale !== 'zh' ? q[locale] : null;
  return q.zh.map((o, i) => ({ ok: o.ok, t: tr?.[i]?.t ?? o.t, why: tr?.[i]?.why ?? o.why }));
}
