/* ============================================================
   各挑戰題的「判斷題」：讀完示範答案後，換你判斷哪個回答最到位。
   提示文字用 i18n 的 iv.quizPrompt（固定），此處只放選項。
   zh 每個選項帶 ok（哪個是正解）；en/ja 只放翻譯的 t/why，ok 由 zh 提供。
   quizFor 合併：ok 取 zh、文字取該語言（缺則回退 zh）。新增題目改這裡即可。
   ============================================================ */
export const QUIZZES = {
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
  }
};

/** 回傳 [{ ok, t, why }]；無題回 null。 */
export function quizFor(id, locale = 'zh') {
  const q = QUIZZES[id];
  if (!q || !q.zh) return null;
  const tr = locale !== 'zh' ? q[locale] : null;
  return q.zh.map((o, i) => ({ ok: o.ok, t: tr?.[i]?.t ?? o.t, why: tr?.[i]?.why ?? o.why }));
}
