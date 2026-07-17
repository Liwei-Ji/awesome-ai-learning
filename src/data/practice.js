/* ============================================================
   借鑑 Andrew Ng 教法的「行家層」，放在 Demo 之後、重點之前：
   practical（實務上）：真正在用時的經驗法則（2-4 條）。
   decision（怎麼選）：何時用 A、何時用 B 的極簡決策指引。
   依語言分；缺該語言時「不顯示」（不 fallback）。
   ============================================================ */
export const PRACTICE = {
  "ml": {
    "practical": {
      "zh": [
        "<b>先建一個笨基準線</b>：做複雜模型前，先量「全猜最常見答案」或簡單規則的分數。連基準都贏不了，代表方向或資料有問題。",
        "<b>過擬合看訓練與驗證的差距</b>：訓練分數很高、驗證分數掉下來，就是在背答案。這時該加資料或簡化模型，而不是繼續硬訓練。",
        "<b>準確率不是萬用指標</b>：資料不平衡時，看 precision、recall 或混淆矩陣才知道錯在哪。詐騙、疾病這類「抓到少數」比「整體對」更重要。",
        "<b>先簡單模型，不夠再加深</b>：很多表格類問題，梯度提升樹（如 XGBoost）就打贏深度網路，還更快更好調。別一開始就上大模型。"
      ],
      "en": [
        "<b>Start with a dumb baseline</b>: before any fancy model, measure what \"always guess the most common answer\" or a simple rule scores. If you cannot beat that, your data or framing is the problem.",
        "<b>Read overfitting from the train vs validation gap</b>: a high training score with a falling validation score means it is memorizing. Add data or simplify the model instead of training longer.",
        "<b>Accuracy is not a universal metric</b>: on imbalanced data, look at precision, recall, or the confusion matrix to see where it fails. For fraud or disease, catching the rare case matters more than overall correctness.",
        "<b>Try simple before going deep</b>: on many tabular problems a gradient boosted tree (like XGBoost) beats a deep network, and is faster to tune. Do not reach for a big model first."
      ],
      "ja": [
        "<b>まず素朴なベースラインを引く</b>：凝ったモデルの前に、「常に最頻値を答える」や単純ルールの点数を測る。それに勝てないなら、データか問題設定の方に原因がある。",
        "<b>過学習は学習と検証の差で見る</b>：学習の点数が高いのに検証が落ちるのは丸暗記の兆候。訓練を延ばすのではなく、データを足すかモデルを単純にする。",
        "<b>精度は万能な指標ではない</b>：不均衡データでは適合率、再現率、混同行列でどこを外すか見る。詐欺や疾病では、全体の正しさより稀なケースを取りこぼさない方が大事。",
        "<b>深くする前に単純に試す</b>：表形式の問題では、勾配ブースティング木（XGBoost など）が深層網に勝つことも多く、調整も速い。最初から大きなモデルに手を出さない。"
      ]
    }
  },
  "data": {
    "practical": {
      "zh": [
        "<b>先清資料，再換模型</b>：品質差時，花時間清出一批乾淨資料，往往比換更大的模型更有效。先處理重複、標錯與缺值。",
        "<b>標註前先寫「標註準則」</b>：多人標同一批，沒有明確規則就會各標各的。先定義判準、跑一小批校準一致性，再大規模標。",
        "<b>切分資料要防「洩漏」</b>：訓練集混進測試集，準確率會虛高、上線就露餡。切分最好在來源或使用者層級做，別隨機打散後才切。",
        "<b>資料偏誤要在收集端看</b>：模型只會複製你餵的分布。上線前先檢查各族群、各情境的樣本比例，缺的補、歪的修。"
      ],
      "en": [
        "<b>Clean the data before swapping models</b>: when quality is poor, cleaning up a solid dataset usually beats reaching for a bigger model. Kill duplicates, fix mislabels, and handle missing values first.",
        "<b>Write labeling guidelines before you label</b>: hand the same batch to several people with no clear rules and everyone labels differently. Define the criteria, run a small calibration batch to check agreement, then scale up.",
        "<b>Split data to prevent leakage</b>: if training data leaks into the test set, accuracy looks great and then collapses in production. Split at the source or user level, not by shuffling everything first.",
        "<b>Check bias at collection time</b>: a model only copies the distribution you feed it. Before shipping, inspect sample ratios across groups and scenarios, then fill the gaps and correct the skew."
      ],
      "ja": [
        "<b>モデルを替える前にデータを洗う</b>：品質が低いときは、大きいモデルに手を伸ばすより、きれいなデータを整える方が効くことが多い。重複、ラベル誤り、欠損をまず処理する。",
        "<b>ラベル付けの前に基準書を作る</b>：同じデータを複数人で付けると、明確なルールがなければ各自バラバラになる。判断基準を定義し、小さな一致確認バッチを回してから大規模に付ける。",
        "<b>リークを防ぐ分割にする</b>：学習データがテストに混ざると精度が水増しされ、本番で崩れる。ランダムに混ぜてから切るのではなく、ソースやユーザー単位で分割する。",
        "<b>偏りは収集の段階で見る</b>：モデルは与えた分布をそのまま写すだけ。公開前に属性や状況ごとのサンプル比率を確認し、足りない分を補い、歪みを直す。"
      ]
    }
  },
  "training": {
    "practical": {
      "zh": [
        "<b>學習率是第一個要調的</b>：太大會發散（loss 跳來跳去或變 NaN），太小則慢到天荒地老。實務常從 1e-3 到 1e-4 起手，再看曲線微調。",
        "<b>盯著 loss 曲線</b>：loss 不降代表學習率或資料有問題；驗證 loss 開始回升，就是該早停的訊號。",
        "<b>用現成的 Adam，別手刻</b>：多數情況 AdamW 收斂穩又省心，加上 warmup 更保險。純 SGD 要花很多力氣才調得動。",
        "<b>batch size 與學習率一起調</b>：放大 batch 通常要同步放大學習率。batch 太小梯度很吵，太大則吃滿記憶體、泛化有時反而變差。"
      ],
      "en": [
        "<b>Learning rate is the first knob to turn</b>: too high and it diverges (loss bounces around or goes NaN), too low and it crawls. In practice start around 1e-3 to 1e-4 and adjust by watching the curve.",
        "<b>Watch the loss curve</b>: a loss that will not drop points to the learning rate or the data; a validation loss that starts rising is your cue to stop early.",
        "<b>Use a ready made Adam, do not hand roll it</b>: AdamW converges reliably with little fuss in most cases, and a warmup makes it safer. Plain SGD takes a lot of tuning to match.",
        "<b>Tune batch size and learning rate together</b>: scaling up the batch usually means scaling up the learning rate too. Too small a batch gives noisy gradients, too large fills memory and can even hurt generalization."
      ],
      "ja": [
        "<b>まず学習率から調整する</b>：大きすぎると発散し（loss が跳ねる、NaN になる）、小さすぎると遅すぎる。実務では 1e-3 から 1e-4 あたりで始め、曲線を見て微調整する。",
        "<b>loss 曲線を見張る</b>：loss が下がらないなら学習率かデータの問題、検証 loss が上がり始めたら早期終了の合図。",
        "<b>既製の Adam を使い、自作しない</b>：多くの場合 AdamW は安定して収束し手間も少なく、warmup を足すとより安全。素の SGD は同等にするのに多大な調整が要る。",
        "<b>バッチサイズと学習率は一緒に調整する</b>：バッチを大きくするなら学習率も上げるのが普通。小さすぎると勾配が雑音まみれ、大きすぎるとメモリを食い、汎化がかえって悪化することもある。"
      ]
    }
  },
  "tokenizer": {
    "practical": {
      "zh": [
        "<b>Token 數＝成本與長度上限</b>：計費和 context window 都以 token 算，不是字數。中文一個字常吃 1 到 3 個 token，估長度別用字數換算。",
        "<b>非英文更「吃 token」</b>：同一句話，中文、日文的 token 數常比英文多出不少（約一到兩倍），等於更貴、更容易撐爆視窗。多語系服務要把這算進成本。",
        "<b>換模型就要換 tokenizer</b>：每個模型的切法和詞表都不同，token 數不能跨模型套用。要精算就用該模型官方的 tokenizer（如 tiktoken）實際數。",
        "<b>怪 bug 常出在切分邊界</b>：數字、空白、emoji、程式碼會被拆得很意外，導致模型算錯數或漏字。debug 時先把輸入 tokenize 出來看實際切法。"
      ],
      "en": [
        "<b>Token count is your cost and length limit</b>: billing and the context window are counted in tokens, not characters. One Chinese character often eats 1 to 3 tokens, so do not estimate length from character count.",
        "<b>Non English text burns more tokens</b>: for the same sentence, Chinese and Japanese often take noticeably more tokens than English (roughly one to two times more), meaning higher cost and a window that fills faster. Factor this into multilingual services.",
        "<b>Change the model, change the tokenizer</b>: every model splits text differently and has its own vocabulary, so token counts do not carry across models. For exact numbers, count with that model's official tokenizer (like tiktoken).",
        "<b>Odd bugs hide at split boundaries</b>: numbers, whitespace, emoji, and code get split in surprising ways, making the model miscount or drop characters. When debugging, tokenize the input first and look at the actual split."
      ],
      "ja": [
        "<b>トークン数がコストと長さの上限</b>：課金も context window も文字数ではなくトークンで数える。中国語は 1 文字で 1 から 3 トークン食うことも多く、文字数から長さを見積もらない。",
        "<b>非英語ほどトークンを食う</b>：同じ文でも中国語や日本語は英語より多くのトークン（およそ1〜2倍）になりがちで、コスト高になり視窗も早く埋まる。多言語サービスではこれを費用に織り込む。",
        "<b>モデルを替えたら tokenizer も替える</b>：モデルごとに分け方も語彙も違い、トークン数は使い回せない。正確に知るにはそのモデル公式の tokenizer（tiktoken など）で実際に数える。",
        "<b>妙なバグは分割の境界に潜む</b>：数字、空白、emoji、コードは意外な形に分割され、モデルが数え違えたり字を落としたりする。デバッグ時はまず入力を tokenize して実際の分け方を見る。"
      ]
    }
  },
  "embedding": {
    "practical": {
      "zh": [
        "<b>用專門的嵌入模型</b>：別拿聊天模型硬算向量。用專用嵌入模型（OpenAI text-embedding-3、開源的 BGE／E5），檢索品質差很多。",
        "<b>維度不是越高越好</b>：常見 384 到 3072 維。text-embedding-3 可以把 3072 維截短到 512 甚至 256，省下大量儲存與查詢成本，品質只掉一點點。",
        "<b>相似度算法要對齊訓練方式</b>：多數嵌入模型是用 cosine 相似度訓練的，比較前記得先把向量正規化。",
        "<b>別混用不同模型的向量</b>：換了嵌入模型，整個向量庫都要重新編碼；查詢和文件也必須用同一個模型。有些模型（例如 E5）還要求在查詢／文件前加特定前綴，用之前先看該模型說明。"
      ],
      "en": [
        "<b>Use a dedicated embedding model</b>: don't force your chat model to produce vectors. A purpose-built embedder (OpenAI text-embedding-3, or open-source BGE/E5) gives far better retrieval.",
        "<b>Higher dimensions aren't always better</b>: common sizes run 384 to 3072. text-embedding-3 lets you truncate 3072 down to 512 or even 256, saving a lot of storage and query cost for only a small quality drop.",
        "<b>Match the similarity metric to how the model was trained</b>: most embedders are trained for cosine similarity, so normalize your vectors before comparing.",
        "<b>Never mix vectors from different models</b>: switching embedders means re-encoding your whole store, and queries and documents must use the same model. Some models (such as E5) also expect specific prefixes on queries and documents, so check the model's own instructions first."
      ],
      "ja": [
        "<b>専用の埋め込みモデルを使う</b>：チャットモデルで無理にベクトルを作らない。専用の埋め込みモデル（OpenAI text-embedding-3、オープンソースの BGE／E5 など）の方が検索精度が段違いに良い。",
        "<b>次元は高いほど良いとは限らない</b>：よくあるのは 384 から 3072 次元。text-embedding-3 なら 3072 次元を 512 や 256 に切り詰められ、品質の低下はわずかで保存量とクエリコストを大きく節約できる。",
        "<b>類似度の計算は学習方法に合わせる</b>：多くの埋め込みモデルは cosine 類似度で学習されているので、比較の前にベクトルを正規化する。",
        "<b>異なるモデルのベクトルを混ぜない</b>：埋め込みモデルを変えたらベクトル全体を再エンコードする必要があり、クエリと文書も同じモデルを使う。E5 など、クエリや文書に特定の接頭辞を求めるモデルもあるので、使う前に説明を確認する。"
      ]
    }
  },
  "llm": {
    "practical": {
      "zh": [
        "<b>Temperature 看任務調</b>：要穩定、要抽資料、要寫程式，就調低（0 到 0.3）；要發想、要多樣化，才調高（0.7 以上）。",
        "<b>就算 temperature 設 0 也不保證每次一樣</b>：受批次運算與浮點誤差影響，輸出仍會浮動，別把它當成可完全重現的函式。",
        "<b>它是在「猜」下一個字，不是在算</b>：算數、精確計數常出錯，這類工作交給工具（計算機、程式）更可靠。",
        "<b>要被程式接手就用結構化輸出</b>：需要 JSON 或固定格式時，開結構化輸出／JSON 模式，別靠事後用正則去硬解自由文字。"
      ],
      "en": [
        "<b>Tune temperature to the task</b>: keep it low (0 to 0.3) when you want stable output, extraction, or code; raise it (0.7 and up) only for brainstorming and variety.",
        "<b>Even temperature 0 isn't fully deterministic</b>: batching and floating-point effects mean output can still vary, so don't treat it as a perfectly reproducible function.",
        "<b>It's guessing the next token, not calculating</b>: arithmetic and exact counting often go wrong, so hand those jobs to tools (a calculator or code) for reliable results.",
        "<b>Use structured output when code consumes the result</b>: when you need JSON or a fixed format, turn on structured output or JSON mode instead of regex-parsing free text afterward."
      ],
      "ja": [
        "<b>Temperature はタスクに合わせて調整</b>：安定した出力、抽出、コード生成なら低め（0 から 0.3）。発想や多様性が欲しいときだけ高め（0.7 以上）にする。",
        "<b>temperature を 0 にしても毎回同じとは限らない</b>：バッチ処理や浮動小数点の影響で出力はぶれるので、完全に再現できる関数だと思わない。",
        "<b>次の語を「推測」しているだけで計算はしていない</b>：算数や正確な数え上げはよく間違えるので、その手の作業は計算機やコードなどのツールに任せる方が確実。",
        "<b>プログラムで受け取るなら構造化出力を使う</b>：JSON や固定フォーマットが必要なときは、後から正規表現で無理に解析せず、構造化出力／JSON モードを使う。"
      ]
    }
  },
  "model-size": {
    "practical": {
      "zh": [
        "<b>先問「這任務需要多大」</b>：分類、抽取、路由這種簡單活，小模型又快又便宜；把大模型留給真的需要推理的難題。",
        "<b>參數量不是唯一指標</b>：訓練資料品質與後訓練同樣關鍵。一個較新的小模型，常常打得贏更舊的大模型。",
        "<b>跑不動就用量化</b>：把模型壓成 4-bit 或 8-bit，能塞進較小的顯卡或本機跑，品質通常只掉一點點。",
        "<b>估顯存看參數量</b>：粗抓「參數量 × 每參數位元組」。7B 模型在 fp16 約要 14GB，量化成 4-bit 只要 4 到 5GB 左右。"
      ],
      "en": [
        "<b>First ask how big the task really needs</b>: for simple jobs like classification, extraction, or routing a small model is faster and cheaper; save the large model for problems that truly need reasoning.",
        "<b>Parameter count isn't the only measure</b>: training-data quality and post-training matter just as much, and a newer small model often beats an older larger one.",
        "<b>Quantize when it won't fit</b>: compressing a model to 4-bit or 8-bit lets it run on a smaller GPU or locally, usually with only a small quality drop.",
        "<b>Estimate VRAM from parameter count</b>: a rough guide is parameters times bytes per parameter. A 7B model needs about 14GB at fp16, or only 4 to 5GB once quantized to 4-bit."
      ],
      "ja": [
        "<b>まず「どれだけ大きさが要るか」を問う</b>：分類、抽出、ルーティングのような簡単な作業は小さいモデルの方が速くて安い。大きいモデルは本当に推論が要る難問に取っておく。",
        "<b>パラメータ数だけが指標ではない</b>：学習データの品質と後訓練も同じくらい重要で、新しい小さなモデルが古い大きなモデルに勝つことはよくある。",
        "<b>載らないなら量子化する</b>：モデルを 4-bit や 8-bit に圧縮すれば、小さな GPU やローカルでも動かせて、品質の低下はたいてい少しだけ。",
        "<b>VRAM はパラメータ数から見積もる</b>：目安は「パラメータ数 × 1パラメータあたりのバイト数」。7B モデルは fp16 で約 14GB、4-bit に量子化すれば 4 から 5GB 程度で済む。"
      ]
    },
    "decision": {
      "zh": {
        "q": "任務該配大模型還是小模型？",
        "rows": [
          {
            "when": "任務單純、量大、要便宜快",
            "use": "小模型",
            "why": "夠用就好，還能微調／量化壓成本"
          },
          {
            "when": "需要複雜推理、最高品質",
            "use": "大模型",
            "why": "能力上限高，但貴又慢"
          },
          {
            "when": "想兼顧",
            "use": "中型或蒸餾",
            "why": "用大模型產資料訓小模型，接近大的品質、跑小的成本"
          }
        ]
      },
      "en": {
        "q": "Big model or small model for the task?",
        "rows": [
          {
            "when": "Simple task, high volume, must be cheap and fast",
            "use": "Small model",
            "why": "Good enough is fine, and you can fine-tune or quantize to cut cost"
          },
          {
            "when": "Needs complex reasoning or top quality",
            "use": "Large model",
            "why": "Higher ceiling, but expensive and slow"
          },
          {
            "when": "Want a balance",
            "use": "Mid-size or distillation",
            "why": "Use a big model to generate data to train a small one: near-big quality at small-model cost"
          }
        ]
      },
      "ja": {
        "q": "タスクに大きいモデルか小さいモデルか？",
        "rows": [
          {
            "when": "単純・大量・安く速く",
            "use": "小さいモデル",
            "why": "十分なら十分。ファインチューニングや量子化でコストも下げられる"
          },
          {
            "when": "複雑な推論や最高品質が要る",
            "use": "大きいモデル",
            "why": "上限は高いが高価で遅い"
          },
          {
            "when": "両立したい",
            "use": "中規模／蒸留",
            "why": "大モデルでデータを作り小モデルを訓練。大に近い品質を小のコストで"
          }
        ]
      }
    }
  },
  "context-window": {
    "practical": {
      "zh": [
        "<b>視窗大不代表要塞滿</b>：現在動輒 128K 甚至上百萬 token，但成本隨輸入長度增加，塞越多越貴也越慢。",
        "<b>當心「中間被忽略」</b>：內容太長時，模型對正中間資訊的注意力最弱，重要指令與關鍵資料放開頭或結尾。",
        "<b>長視窗不能完全取代 RAG</b>：每次都塞十萬 token 又慢又貴，不如先檢索出相關片段，只餵真正需要的內容。",
        "<b>重複的前文用快取省錢</b>：系統提示、長文件這類每次都一樣的前綴，開 prompt caching 可大幅降低重複成本。"
      ],
      "en": [
        "<b>A big window doesn't mean fill it</b>: windows now reach 128K or even over a million tokens, but cost rises with input length, so more content means slower and pricier calls.",
        "<b>Watch out for \"lost in the middle\"</b>: when the input gets long, the model pays least attention to what sits right in the middle, so put key instructions and data at the start or the end.",
        "<b>Long context doesn't fully replace RAG</b>: stuffing 100K tokens every call is slow and expensive, so retrieve the relevant passages first and feed only what you actually need.",
        "<b>Cache repeated context to save money</b>: for prefixes that stay the same each call, such as a system prompt or a long document, turning on prompt caching cuts the repeated cost sharply."
      ],
      "ja": [
        "<b>ウィンドウが大きくても埋め尽くさない</b>：今や 128K どころか百万トークン超もあるが、コストは入力の長さに比例して増えるので、詰め込むほど遅く高くなる。",
        "<b>「中間の見落とし」に注意</b>：入力が長くなると、モデルはちょうど真ん中にある情報への注意が最も弱くなるので、重要な指示や肝心のデータは先頭か末尾に置く。",
        "<b>長いコンテキストは RAG を完全には置き換えない</b>：毎回 10 万トークン詰めるのは遅く高くつくので、まず関連する断片を検索し、本当に必要な内容だけを渡す。",
        "<b>繰り返す前文はキャッシュで節約</b>：システムプロンプトや長い文書のように毎回同じ前置きは、prompt caching を有効にすると繰り返し分のコストを大きく減らせる。"
      ]
    },
    "decision": {
      "zh": {
        "q": "內容太長，塞不進或太貴，怎麼辦？",
        "rows": [
          {
            "when": "一次性、內容不算太大",
            "use": "直接塞長視窗",
            "why": "最簡單，但整段都付費，中間也可能被忽略"
          },
          {
            "when": "資料量大、會重複查詢",
            "use": "RAG",
            "why": "只取相關片段，省 token 又能擴充"
          },
          {
            "when": "對話越來越長",
            "use": "摘要舊訊息",
            "why": "把前面壓成摘要，留重點、騰空間"
          }
        ]
      },
      "en": {
        "q": "Content too long to fit or too costly, what now?",
        "rows": [
          {
            "when": "One-off and not too large",
            "use": "Just use a long window",
            "why": "Simplest, but you pay for the whole thing and the middle may get ignored"
          },
          {
            "when": "Large corpus, queried repeatedly",
            "use": "RAG",
            "why": "Pull only the relevant pieces, saves tokens and scales"
          },
          {
            "when": "A conversation that keeps growing",
            "use": "Summarize old turns",
            "why": "Compress earlier messages to keep the key points and free up space"
          }
        ]
      },
      "ja": {
        "q": "内容が長すぎて入らない／高すぎる、どうする？",
        "rows": [
          {
            "when": "一度きりで、そこまで大きくない",
            "use": "長い視窗にそのまま",
            "why": "最も簡単。ただし全体に課金され、中間が無視されることも"
          },
          {
            "when": "大量で、繰り返し検索する",
            "use": "RAG",
            "why": "関連部分だけ取り出し、トークンを節約し拡張もできる"
          },
          {
            "when": "会話がどんどん長くなる",
            "use": "古い発言を要約",
            "why": "前半を要約に圧縮し、要点を残して空きを作る"
          }
        ]
      }
    }
  },
  "inference": {
    "practical": {
      "zh": [
        "<b>先看首字延遲，不是總時間</b>：開串流(streaming)，讓字一個個冒出來，使用者的體感延遲會大幅下降，就算總耗時一樣。",
        "<b>成本按 token 計，輸出比輸入貴</b>：長的系統提示每次呼叫都在燒錢，設好 max output、砍掉沒用的上下文，帳單立刻降。",
        "<b>別預設用最大的模型</b>：先挑能過你評測的最小、最快模型，簡單任務用小模型，難的再路由到大模型，速度和成本差好幾倍。",
        "<b>要穩定就把 temperature 調低</b>：抽取、分類、要 JSON 這種任務設 0 到 0.3，同樣輸入才會得到幾乎一樣的輸出，創意寫作才調高。"
      ],
      "en": [
        "<b>Watch time to first token, not total time</b>: turn on streaming so tokens appear one by one, and perceived latency drops a lot even when total time is the same.",
        "<b>You pay per token, and output costs more than input</b>: a long system prompt burns money on every call, so cap the max output and trim dead context to cut the bill.",
        "<b>Do not default to the biggest model</b>: pick the smallest fast model that passes your eval, run simple tasks on it, and route only the hard ones to a big model.",
        "<b>Turn temperature down for consistency</b>: for extraction, classification, or JSON output set it around 0 to 0.3 so the same input gives nearly the same output, and save high values for creative writing."
      ],
      "ja": [
        "<b>合計時間より最初の1文字までの速さ</b>：ストリーミングを有効にして文字を1つずつ表示すれば、合計時間が同じでも体感の遅さは大きく減ります。",
        "<b>課金はトークン単位、出力は入力より高い</b>：長いシステムプロンプトは毎回の呼び出しで費用がかさむので、最大出力を制限し不要な文脈を削ると請求額がすぐ下がります。",
        "<b>いきなり最大のモデルを選ばない</b>：評価に通る一番小さく速いモデルを選び、簡単なタスクは小さいモデルで、難しいものだけ大きいモデルに振り分けます。",
        "<b>安定させたいなら temperature を下げる</b>：抽出、分類、JSON 出力では 0 から 0.3 くらいにすると同じ入力でほぼ同じ出力になり、高い値は創作向けに残します。"
      ]
    }
  },
  "fine-tuning": {
    "practical": {
      "zh": [
        "<b>先用完提示和 RAG 再談微調</b>：2024 到 2025 的共識是微調是最後手段，八成需求靠更好的提示或 RAG 就解決了，別一開始就跳進去。",
        "<b>微調改的是風格與格式，不是知識</b>：要它學新事實請用 RAG，想把知識灌進微調通常學不進去，還會讓幻覺更嚴重。",
        "<b>資料是拚品質不是拚數量</b>：50 到 100 筆乾淨、一致的範例，常勝過上千筆雜訊資料，先清資料再訓練。",
        "<b>優先用 LoRA</b>：只調一小部分參數，便宜又快，還能存成多個 adapter 隨插隨換，全參數微調多數情況用不到。"
      ],
      "en": [
        "<b>Try prompting and RAG before fine-tuning</b>: the 2024 to 2025 consensus is that fine-tuning is a last resort, and most needs are solved by a better prompt or RAG, so do not jump to it first.",
        "<b>Fine-tuning changes style and format, not knowledge</b>: use RAG to add new facts, because trying to cram knowledge in by fine-tuning usually fails to stick and makes hallucination worse.",
        "<b>Quality of data beats quantity</b>: 50 to 100 clean, consistent examples often beat thousands of noisy ones, so clean the data before you train.",
        "<b>Reach for LoRA first</b>: it tunes only a small slice of parameters, is cheap and fast, and lets you save several adapters to swap in and out, while full fine-tuning is rarely needed."
      ],
      "ja": [
        "<b>微調整の前にプロンプトと RAG を試す</b>：2024 から 2025 年の共通見解では微調整は最後の手段で、多くはより良いプロンプトや RAG で解決するので、いきなり飛びつかないこと。",
        "<b>微調整で変わるのは文体と形式、知識ではない</b>：新しい事実の追加には RAG を使う。微調整で知識を詰め込もうとしても定着せず、幻覚がむしろ増えます。",
        "<b>データは量より質</b>：きれいで一貫した 50 から 100 件の例が、雑音だらけの数千件に勝つことが多いので、学習前にデータを整えます。",
        "<b>まず LoRA を使う</b>：ごく一部のパラメータだけを調整するので安く速く、複数の adapter を保存して差し替えられます。全パラメータの微調整は多くの場合不要です。"
      ]
    },
    "decision": {
      "zh": {
        "q": "要客製模型行為，先從哪一步試？",
        "rows": [
          {
            "when": "能用講清楚指令解決",
            "use": "Prompt",
            "why": "幾乎免費、馬上可改，先試這個"
          },
          {
            "when": "需要最新或私有的「事實」",
            "use": "RAG",
            "why": "外部檢索比微調更可靠、更好更新"
          },
          {
            "when": "要穩定語氣／格式，且前兩者都不夠",
            "use": "微調",
            "why": "把行為練進去，但要備好資料與成本"
          }
        ]
      },
      "en": {
        "q": "To customize model behavior, which do you try first?",
        "rows": [
          {
            "when": "A clear instruction can solve it",
            "use": "Prompt",
            "why": "Almost free and instantly changeable, try this first"
          },
          {
            "when": "You need fresh or private facts",
            "use": "RAG",
            "why": "External retrieval is more reliable and easier to update than fine-tuning"
          },
          {
            "when": "You need a stable tone/format and the first two fall short",
            "use": "Fine-tuning",
            "why": "Trains the behavior in, but budget for the data and the cost"
          }
        ]
      },
      "ja": {
        "q": "モデルの振る舞いを調整したい、まずどれ？",
        "rows": [
          {
            "when": "明確な指示で解決できる",
            "use": "Prompt",
            "why": "ほぼ無料で即修正できる。まずこれ"
          },
          {
            "when": "最新または非公開の「事実」が要る",
            "use": "RAG",
            "why": "外部検索の方がファインチューニングより確実で更新も容易"
          },
          {
            "when": "安定した口調／形式が要り、前二つでは足りない",
            "use": "ファインチューニング",
            "why": "振る舞いを覚えさせるが、データとコストの準備を"
          }
        ]
      }
    }
  },
  "prompt": {
    "practical": {
      "zh": [
        "<b>給例子勝過長篇說明</b>：與其寫一大段規則，不如附 2 到 3 個好範例(few-shot)，尤其要固定輸出格式時特別有效。",
        "<b>要結構化就把格式寫死</b>：需要 JSON 或表格，直接把欄位和範例貼給它，比含糊說「請條列」穩定得多。",
        "<b>複雜推理讓它先想再答</b>：加一句「一步步想」通常更準，但 2024 到 2025 的推理模型已內建思考，反而不用再加。",
        "<b>長提示會「中間被忽略」</b>：把最重要的指令放開頭，並在結尾再講一次，長文件塞中間，避免關鍵指令被埋沒。"
      ],
      "en": [
        "<b>Show examples instead of long instructions</b>: rather than a page of rules, attach 2 to 3 good examples (few-shot), which works especially well when you need a fixed output format.",
        "<b>For structure, pin the format down</b>: if you need JSON or a table, paste the exact fields and a sample, which is far more stable than vaguely asking for a list.",
        "<b>Let it think before answering hard problems</b>: adding \"think step by step\" usually improves accuracy, though the 2024 to 2025 reasoning models think internally and no longer need it.",
        "<b>Long prompts get ignored in the middle</b>: put the most important instruction at the start and repeat it at the end, with the long document in between, so key instructions are not buried."
      ],
      "ja": [
        "<b>長い説明より例を見せる</b>：たくさんの規則を書くより、良い例を 2 から 3 個添える(few-shot)方がよく、特に出力形式を固定したいときに効果的です。",
        "<b>構造化したいなら形式を固定する</b>：JSON や表が必要なら、項目と見本をそのまま貼る方が、ぼんやり「箇条書きで」と言うよりずっと安定します。",
        "<b>難しい推論は先に考えさせる</b>：「一歩ずつ考えて」と加えると精度が上がることが多いですが、2024 から 2025 年の推論モデルは内部で考えるので不要になっています。",
        "<b>長いプロンプトは中間が無視される</b>：最も重要な指示を冒頭に置き、末尾でもう一度述べ、長い文書はその間に挟むと、肝心の指示が埋もれません。"
      ]
    },
    "decision": {
      "zh": {
        "q": "同一個任務，怎麼問最有效？",
        "rows": [
          {
            "when": "任務單純、講清楚就好",
            "use": "直接說（zero-shot）",
            "why": "現在的模型零樣本已很強，先別複雜化"
          },
          {
            "when": "要固定輸出格式或風格",
            "use": "給範例（few-shot）",
            "why": "附 2 到 3 個「輸入→輸出」，比長篇說明更穩"
          },
          {
            "when": "多步推理、容易算錯",
            "use": "拆步驟／用推理模型",
            "why": "讓它一步步想，或改用內建思考的模型"
          }
        ]
      },
      "en": {
        "q": "For the same task, how do you ask most effectively?",
        "rows": [
          {
            "when": "Simple task, just be clear",
            "use": "Say it directly (zero-shot)",
            "why": "Modern models are strong zero-shot, do not overcomplicate"
          },
          {
            "when": "You need a fixed output format or style",
            "use": "Give examples (few-shot)",
            "why": "Attach 2 to 3 input to output pairs, steadier than a long explanation"
          },
          {
            "when": "Multi-step reasoning, error-prone",
            "use": "Break down steps / use a reasoning model",
            "why": "Have it think step by step, or switch to a model with built-in reasoning"
          }
        ]
      },
      "ja": {
        "q": "同じタスク、どう聞くのが一番効く？",
        "rows": [
          {
            "when": "単純で、明確に言えばよい",
            "use": "そのまま言う（zero-shot）",
            "why": "今のモデルはゼロショットでも強い。複雑にしすぎない"
          },
          {
            "when": "出力の形式やスタイルを固定したい",
            "use": "例を見せる（few-shot）",
            "why": "「入力→出力」を2〜3組付けると、長い説明より安定"
          },
          {
            "when": "多段の推論で間違えやすい",
            "use": "手順を分けさせる／推論モデル",
            "why": "一歩ずつ考えさせるか、思考が組み込まれたモデルに切り替える"
          }
        ]
      }
    }
  },
  "generative": {
    "practical": {
      "zh": [
        "<b>加「負面提示」清掉爛東西</b>：明確列出不要的(多手指、模糊、浮水印)，比只描述想要的更能救回畫面。",
        "<b>步數和引導強度有甜蜜點</b>：步數不是越多越好，常見 20 到 40 步就夠，引導(CFG)調太高會過曝、顏色死掉。",
        "<b>固定 seed 才能重現和微調</b>：同一個 seed 加同樣提示會得到同一張圖，想只改一點細節就鎖住 seed 再改字。",
        "<b>手指與文字仍是弱點</b>：模型畫手指、以及較舊模型排清楚的文字，還是常出錯，實務上多生幾張挑，或用局部重繪(inpainting)修掉。"
      ],
      "en": [
        "<b>Add a negative prompt to remove junk</b>: listing what you do not want (extra fingers, blur, watermark) rescues the image more than only describing what you do want.",
        "<b>Steps and guidance have a sweet spot</b>: more steps is not always better, and 20 to 40 steps is often enough, while a too high guidance (CFG) burns the colors out and looks oversaturated.",
        "<b>Fix the seed to reproduce and tweak</b>: the same seed with the same prompt gives the same image, so lock the seed and edit only the words when you want to change one small detail.",
        "<b>Fingers and text are still weak spots</b>: models still get fingers wrong, and older models struggle with legible text, so in practice you generate several and pick, or fix them with inpainting."
      ],
      "ja": [
        "<b>ネガティブプロンプトでゴミを消す</b>：欲しくないもの(指の増殖、ぼやけ、透かし)を明示する方が、欲しいものだけを説明するより画面を立て直せます。",
        "<b>ステップ数と誘導強度には最適点がある</b>：ステップは多いほど良いわけではなく 20 から 40 で足りることが多く、誘導(CFG)を上げすぎると色が飛んで過飽和になります。",
        "<b>seed を固定すれば再現と微調整ができる</b>：同じ seed と同じプロンプトなら同じ画像になるので、細部だけ変えたいときは seed を固定して言葉だけ直します。",
        "<b>指と文字はまだ弱点</b>：モデルは指を、また古いモデルは読める文字を、いまだに間違えるので、実務では複数生成して選ぶか、inpainting で修正します。"
      ]
    }
  },
  "multimodal": {
    "practical": {
      "zh": [
        "<b>圖片會吃掉大量 token</b>：高解析度圖片轉成 token 又貴又慢。實務上先把圖縮到「剛好看得清問題細節」的尺寸，別直接丟原圖。",
        "<b>要它看哪裡就講明白</b>：模型常漏掉圖裡的小字、角落、細節。與其丟整張圖問「這是什麼」，不如裁切到重點區域，並指定要看的地方。",
        "<b>圖裡的文字別全信</b>：表格、小字、手寫的辨識常出錯。關鍵數字（金額、日期、型號）要另外用 OCR 或人工再核對一次。",
        "<b>把圖和問題一起給</b>：先貼圖、下一輪才問，模型容易「忘了細看」。同一則訊息裡圖文一起送，答案更貼題。"
      ],
      "en": [
        "<b>Images eat a lot of tokens</b>: High-resolution pictures turn into expensive, slow token counts. In practice, downscale each image to just clear enough to see the detail you care about, instead of sending the raw file.",
        "<b>Say exactly where to look</b>: Models often miss small text, corners, and fine details. Rather than dropping in a whole image and asking \"what is this\", crop to the key region and point at what it should examine.",
        "<b>Do not trust text inside images</b>: Reading tables, tiny fonts, and handwriting often goes wrong. Double-check critical values (amounts, dates, model numbers) with a real OCR step or a human.",
        "<b>Send the image and the question together</b>: If you paste the image first and only ask in a later turn, the model tends to skim it. Put the picture and the question in the same message for answers that stay on point."
      ],
      "ja": [
        "<b>画像はトークンを大量に消費する</b>：高解像度の画像はトークンに変換するとコストも時間もかさみます。実務では元画像をそのまま送らず、見たい細部が判別できる程度まで縮小します。",
        "<b>どこを見るかを明確に伝える</b>：モデルは小さな文字や隅、細部を見落としがちです。画像全体を渡して「これは何」と聞くより、重要な領域を切り出し、見るべき箇所を指定しましょう。",
        "<b>画像内の文字を鵜呑みにしない</b>：表や小さな文字、手書きの読み取りはよく間違えます。金額、日付、型番などの重要な値は、別途 OCR や人の目でもう一度照合します。",
        "<b>画像と質問は一緒に送る</b>：先に画像を貼り、次のターンで質問すると、モデルはよく読み飛ばします。同じメッセージに画像と質問をまとめて送ると、答えが的を外しにくくなります。"
      ]
    }
  },
  "rag": {
    "practical": {
      "zh": [
        "<b>檢索品質決定一切</b>：RAG 答不好，八成是「沒找到對的段落」，不是模型笨。先把檢索調好，再怪模型。",
        "<b>切塊要適中</b>：一塊太大會塞進無關內容、太小會切斷語意。常見做法是一塊 200 到 500 字，並讓相鄰塊稍微重疊。",
        "<b>強制「依據找到的內容回答並附出處」</b>：找不到就讓它說找不到，這樣才壓得住幻覺。",
        "<b>純向量會漏關鍵字</b>（人名、代號、型號），實務上常用「向量＋關鍵字」混合檢索更穩。"
      ],
      "en": [
        "<b>Retrieval quality is everything</b>: when RAG answers badly, eight times out of ten it failed to find the right passage, not because the model is dumb. Fix retrieval first, then blame the model.",
        "<b>Get chunk size right</b>: chunks that are too big pull in irrelevant text, too small cut off the meaning. A common approach is 200 to 500 words per chunk, with a little overlap between neighboring chunks.",
        "<b>Force it to answer only from what was found, and cite sources</b>: if nothing is found, let it say so. That is what keeps hallucination under control.",
        "<b>Pure vector search misses keywords</b> (names, codes, model numbers), so in practice a hybrid of vector plus keyword search is more reliable."
      ],
      "ja": [
        "<b>検索品質がすべてを決める</b>：RAG の答えが悪いときは、8 割方「正しい段落を見つけられていない」のであって、モデルが馬鹿なわけではありません。まず検索を整えてから、モデルを疑いましょう。",
        "<b>チャンクの大きさは適度に</b>：大きすぎると無関係な内容が混ざり、小さすぎると意味が途切れます。よくあるやり方は 1 チャンク 200 から 500 文字で、隣り合うチャンクを少し重ねることです。",
        "<b>「見つけた内容だけを根拠に答え、出典を付ける」を強制する</b>：見つからなければ「見つからない」と言わせます。これが幻覚を抑える決め手です。",
        "<b>ベクトルだけではキーワードを取りこぼす</b>（人名、コード、型番）ので、実務ではベクトルとキーワードのハイブリッド検索の方が安定します。"
      ]
    },
    "decision": {
      "zh": {
        "q": "要讓模型「用上」它本來不知道的資料，該用哪個？",
        "rows": [
          {
            "when": "要最新／私有／可查證的資料",
            "use": "RAG",
            "why": "把資料臨時讀進上下文，不動模型，還能附來源"
          },
          {
            "when": "要固定的語氣、格式或風格",
            "use": "微調",
            "why": "把行為練進模型，但不適合用來灌事實"
          },
          {
            "when": "只是一次性的小調整",
            "use": "Prompt",
            "why": "直接在提示裡講清楚，最快也最省"
          }
        ]
      },
      "en": {
        "q": "How do you get the model to use data it does not already know?",
        "rows": [
          {
            "when": "You need fresh, private, or verifiable data",
            "use": "RAG",
            "why": "Read the data into the context on the fly, no retraining, and you can cite sources"
          },
          {
            "when": "You need a fixed tone, format, or style",
            "use": "Fine-tuning",
            "why": "Trains the behavior into the model, but is not for injecting facts"
          },
          {
            "when": "It is just a one-off tweak",
            "use": "Prompt",
            "why": "Just say it clearly in the prompt, fastest and cheapest"
          }
        ]
      },
      "ja": {
        "q": "モデルに、もともと知らないデータを使わせるにはどれ？",
        "rows": [
          {
            "when": "最新／非公開／出典を示せるデータが要る",
            "use": "RAG",
            "why": "データをその場で文脈に読み込み、モデルは変えず、出典も付けられる"
          },
          {
            "when": "口調・形式・スタイルを固定したい",
            "use": "ファインチューニング",
            "why": "振る舞いをモデルに覚えさせる。ただし事実の注入には向かない"
          },
          {
            "when": "一度きりの小さな調整だけ",
            "use": "Prompt",
            "why": "プロンプトで明確に伝えるのが最も速く安い"
          }
        ]
      }
    }
  },
  "memory": {
    "practical": {
      "zh": [
        "<b>別什麼都存</b>：把每句話都記下來只會越塞越亂。實務上只存「穩定又有用」的：使用者偏好、關鍵決定、長期事實，臨時閒聊就讓它過去。",
        "<b>對話太長就先摘要</b>：接近上下文上限時，把前面內容濃縮成一段重點再往下接，比硬塞整段歷史更省，也更準。",
        "<b>記錯比不記更糟</b>：舊筆記會過期，也可能一開始就記錯。讓使用者看得到、也能改能刪存了什麼，別讓錯誤資訊一直被翻出來。",
        "<b>記憶多了就得用「找」的</b>：長期筆記一多，不可能每次全塞回去。實務上是存起來，要用時再依相關性檢索（其實就是對筆記做 RAG）。"
      ],
      "en": [
        "<b>Do not store everything</b>: Saving every message just piles up noise. In practice, keep only what is stable and useful: user preferences, key decisions, and long-term facts, and let idle chatter go.",
        "<b>Summarize before the chat gets long</b>: As you approach the context limit, compress the earlier content into a short recap and continue from there. It is cheaper and more accurate than stuffing in the whole history.",
        "<b>Wrong memory is worse than none</b>: Old notes go stale and can be wrong from the start. Let users see, edit, and delete what was stored so bad facts do not keep resurfacing.",
        "<b>Once memory grows, you have to search it</b>: With many long-term notes you cannot cram them all back in every time. In practice you store them and retrieve by relevance when needed, which is really RAG over your notes."
      ],
      "ja": [
        "<b>何でも保存しない</b>：発言をすべて記録すると雑音がたまるだけです。実務では「安定して役に立つもの」だけ残します：ユーザーの好み、重要な決定、長期的な事実。その場限りの雑談は流します。",
        "<b>会話が長くなる前に要約する</b>：コンテキスト上限に近づいたら、前半を短い要点にまとめてから続けます。履歴を丸ごと詰め込むより安く、精度も上がります。",
        "<b>間違った記憶は無いより悪い</b>：古いメモは陳腐化し、最初から間違っていることもあります。何を保存したかをユーザーが見て、直して、消せるようにし、誤情報が何度も出てこないようにします。",
        "<b>記憶が増えたら「検索」で使う</b>：長期メモが増えると毎回すべて戻すのは無理です。実務では保存しておき、必要なときに関連度で検索します（要はメモに対する RAG です）。"
      ]
    }
  },
  "mcp": {
    "practical": {
      "zh": [
        "<b>接的工具越少越好用</b>：一次掛上一堆 MCP server，工具太多反而讓模型選錯，又佔滿上下文。只接這個任務真正用得到的。",
        "<b>把 server 當外人看待</b>：它看得到你送的內容，也能實際執行動作。只連信得過的來源，小心憑證與權限，也提防工具回傳的內容藏著惡意指令。",
        "<b>工具描述寫清楚，模型才會用對</b>：模型是靠名稱和說明來挑工具。描述含糊，它就會呼叫錯的或亂帶參數。名稱直白、說明寫清用途與輸入。",
        "<b>先找現成的，別急著自己做</b>：很多常見服務（檔案、資料庫、Git）已有官方或社群的 MCP server。先接現成的來試，真的缺才自己寫。"
      ],
      "en": [
        "<b>Fewer connected tools work better</b>: Hooking up many MCP servers at once floods the model with tools it picks wrong from and fills the context. Connect only what this task actually needs.",
        "<b>Treat a server as an outsider</b>: It can see what you send and can take real actions. Connect only sources you trust, watch credentials and permissions, and beware of malicious instructions hidden in tool results.",
        "<b>Clear tool descriptions make the model call the right one</b>: The model chooses tools by their name and description. Vague wording leads to wrong calls or bad arguments, so keep names plain and describe the purpose and inputs.",
        "<b>Reuse an existing server before building one</b>: Many common services (files, databases, Git, and more) already have official or community MCP servers. Try those first and only build your own when something is truly missing."
      ],
      "ja": [
        "<b>つなぐツールは少ないほど使いやすい</b>：一度に多くの MCP サーバーを接続すると、ツールが多すぎてモデルが選び間違え、コンテキストも埋まります。この任務で本当に必要なものだけつなぎます。",
        "<b>サーバーは他人だと思って扱う</b>：送った内容を見られ、実際に動作も実行できます。信頼できる相手だけつなぎ、認証情報と権限に注意し、ツールの戻り値に潜む悪意ある指示にも警戒します。",
        "<b>ツールの説明を明確にすればモデルは正しく使う</b>：モデルは名前と説明でツールを選びます。曖昧だと誤った呼び出しや引数になるので、名前は分かりやすく、用途と入力をはっきり書きます。",
        "<b>自作の前に既存のサーバーを探す</b>：ファイル、データベース、Git など、よく使うサービスには公式やコミュニティの MCP サーバーが既にあります。まずそれを試し、本当に足りないときだけ自作します。"
      ]
    }
  },
  "agent": {
    "practical": {
      "zh": [
        "<b>先從最簡單的做起</b>：別一上來就搞多 Agent 大架構。多數任務，一個講清楚的模型加幾個工具就夠了，真的不夠再加複雜度。",
        "<b>一定要設步數上限</b>：Agent 會卡在迴圈，或越跑越偏。設好最多幾步、加上逾時，跑不完就停，別讓它無限繞下去。",
        "<b>設花費上限</b>：每一步都是一次模型呼叫，失控的迴圈燒錢很快。先設好 token 或金額預算，超過就中斷。",
        "<b>危險動作留人來把關</b>：唯讀查詢可以放手，但寄信、刪檔、花錢、寫進正式環境這種不可逆的動作，讓人先確認再執行。"
      ],
      "en": [
        "<b>Start with the simplest thing</b>: Do not jump straight to a big multi-agent architecture. For most tasks, one well-briefed model with a few tools is enough, and you add complexity only when that falls short.",
        "<b>Always cap the number of steps</b>: Agents get stuck in loops or drift further off course. Set a maximum number of steps plus a timeout so it stops when it cannot finish, instead of spinning forever.",
        "<b>Set a spending cap</b>: Every step is another model call, and a runaway loop burns money fast. Set a token or dollar budget up front and cut it off when exceeded.",
        "<b>Keep a human on risky actions</b>: Read-only lookups can run freely, but irreversible actions like sending email, deleting files, spending money, or writing to production should get a human sign-off first."
      ],
      "ja": [
        "<b>まずは一番シンプルな形から</b>：いきなり大がかりなマルチエージェント構成に飛びつかないこと。多くの任務は、きちんと指示した 1 つのモデルと少数のツールで足ります。足りないときだけ複雑にします。",
        "<b>必ずステップ数の上限を設ける</b>：エージェントはループにはまったり、どんどん脱線したりします。最大ステップ数とタイムアウトを設定し、終わらなければ止め、無限に回さないようにします。",
        "<b>費用の上限を設定する</b>：一歩ごとにモデル呼び出しが発生し、暴走したループはあっという間にコストを食います。先にトークンや金額の予算を決め、超えたら中断します。",
        "<b>危険な操作は人が確認する</b>：読み取りだけの照会は自由に走らせてよいですが、メール送信、ファイル削除、支払い、本番環境への書き込みなど不可逆な操作は、人の承認を得てから実行します。"
      ]
    },
    "decision": {
      "zh": {
        "q": "這個任務要不要做成 Agent？",
        "rows": [
          {
            "when": "一步就能答完",
            "use": "單次 Prompt",
            "why": "最簡單可靠，別為了用而用"
          },
          {
            "when": "步驟固定、可預測",
            "use": "寫死的工作流",
            "why": "照流程串起來，好測試、好除錯、可控"
          },
          {
            "when": "步驟要看情況動態決定、要用工具",
            "use": "Agent",
            "why": "最靈活，但最貴也最容易失控，要限制步數並加人審"
          }
        ]
      },
      "en": {
        "q": "Should this task be built as an agent?",
        "rows": [
          {
            "when": "It can be answered in one step",
            "use": "Single prompt",
            "why": "Simplest and most reliable, do not use an agent just to use one"
          },
          {
            "when": "The steps are fixed and predictable",
            "use": "A hard-coded workflow",
            "why": "Chain the steps in order: easy to test, debug, and control"
          },
          {
            "when": "Steps must be decided dynamically and use tools",
            "use": "Agent",
            "why": "Most flexible, but priciest and easiest to run away, so cap the steps and add human review"
          }
        ]
      },
      "ja": {
        "q": "このタスクを Agent にすべき？",
        "rows": [
          {
            "when": "一手で答えられる",
            "use": "単発の Prompt",
            "why": "最も簡単で確実。使うために使わない"
          },
          {
            "when": "手順が固定で予測できる",
            "use": "固定のワークフロー",
            "why": "手順どおりに繋ぐ。テストもデバッグも制御も容易"
          },
          {
            "when": "手順を状況で動的に決め、ツールも使う",
            "use": "Agent",
            "why": "最も柔軟だが最も高価で暴走しやすい。ステップ数を制限し人の確認を入れる"
          }
        ]
      }
    }
  },
  "integration": {
    "practical": {
      "zh": [
        "<b>先跑通再優化</b>：別一開始就追求完美架構。先用最陽春的版本把整條管線接通、能出結果，再回頭找真正的瓶頸下手。",
        "<b>每一段都要留後路</b>：任一環節（API、檢索、工具）都可能掛掉。實務上一定要設超時、重試、和退而求其次的備援回應，別讓單點故障拖垮整個系統。",
        "<b>上線後要盯著看</b>：記錄輸入、輸出、延遲、成本，沒有監控你根本不知道它悄悄變差，而多數問題都是真實流量進來後才浮現。",
        "<b>最弱的一環決定品質</b>：管線是串起來的，資料髒、切塊爛、檢索差，後面再強的模型也救不回來。先找最弱那段補。"
      ],
      "en": [
        "<b>Get it working before optimizing</b>: do not chase the perfect architecture on day one. Wire the whole pipeline end to end with the simplest version that produces output, then go back and attack the real bottleneck.",
        "<b>Leave an escape hatch at every stage</b>: any step (an API, retrieval, a tool call) can fail. In practice you set timeouts, retries, and a fallback response so one failure does not take down the whole system.",
        "<b>Watch it after launch</b>: log inputs, outputs, latency, and cost. Without monitoring you will not notice it quietly getting worse, and most problems only surface once real traffic arrives.",
        "<b>The weakest link caps quality</b>: the pipeline is a chain, so dirty data, bad chunking, or weak retrieval will sink even the strongest model downstream. Fix the worst stage first."
      ],
      "ja": [
        "<b>まず動かしてから最適化</b>：最初から完璧な構成を狙わないこと。いちばん簡素な版で全体のパイプラインを端から端までつなぎ、結果が出せるようにしてから、本当のボトルネックに手をつけます。",
        "<b>各段に逃げ道を用意する</b>：どの段（API、検索、ツール呼び出し）も落ちる可能性があります。実務ではタイムアウト、リトライ、代替の応答を用意し、一箇所の故障がシステム全体を止めないようにします。",
        "<b>公開後こそ監視する</b>：入力、出力、遅延、コストを記録します。監視がなければ、静かに品質が落ちても気づけませんし、多くの問題は実トラフィックが流れ始めてから表面化します。",
        "<b>最も弱い環が品質を決める</b>：パイプラインは鎖なので、データが汚い、チャンクが雑、検索が弱いと、後段のモデルがどれだけ強くても挽回できません。まず一番弱い段から直しましょう。"
      ]
    }
  },
  "limits": {
    "practical": {
      "zh": [
        "<b>高風險場景一定要人把關</b>：醫療、法律、財務、任何錯了要有人負責的決定，AI 只當草稿或第二意見，最後拍板一定是人。",
        "<b>越具體的細節越要查</b>：數字、日期、引用、人名、法條，這些正是最容易被編造的。凡是可查證的事實，都要回原始來源核對。",
        "<b>它不會主動說「我不確定」</b>：模型答錯時語氣一樣篤定，信心度不等於正確率。要靠問法（要它附出處、允許它說不知道）逼它露出破綻。",
        "<b>偏見不會自己消失</b>：資料裡的刻板印象會被模型延續甚至放大，凡涉及人（招募、評分、審核）時，要特別測不同族群的結果差異。"
      ],
      "en": [
        "<b>Keep a human in the loop for high stakes</b>: for medical, legal, or financial calls, and any decision someone is accountable for, treat AI output as a draft or second opinion and let a person make the final call.",
        "<b>Double-check the specific details</b>: numbers, dates, quotes, names, and legal clauses are exactly what gets fabricated. Verify any checkable fact against the original source.",
        "<b>It will not volunteer that it is unsure</b>: a model sounds just as confident when it is wrong, and confidence is not accuracy. Use the prompt to make it cite sources and allow it to say it does not know.",
        "<b>Bias does not go away on its own</b>: stereotypes in the data get carried through and even amplified, so whenever people are involved (hiring, scoring, moderation) test for outcome gaps across different groups."
      ],
      "ja": [
        "<b>高リスクな場面では必ず人が確認</b>：医療、法律、金融、そして誰かが責任を負う判断では、AI の出力は下書きか第二の意見として扱い、最終判断は人が下します。",
        "<b>具体的な細部ほど裏取りを</b>：数字、日付、引用、人名、条文こそ、最も捏造されやすい部分です。確認できる事実はすべて一次情報と照合しましょう。",
        "<b>「自信がない」とは自分から言わない</b>：モデルは間違っているときも同じように断定的で、自信度は正確さではありません。出典を付けさせる、知らないと言うのを許すといった問い方で、ぼろを出させます。",
        "<b>バイアスは勝手には消えない</b>：データ内の固定観念はモデルに引き継がれ、増幅すらされます。人が関わる場面（採用、採点、審査）では、集団ごとの結果の差を必ず検証しましょう。"
      ]
    }
  },
  "evaluation": {
    "practical": {
      "zh": [
        "<b>先定「什麼叫好」再開測</b>：沒有明確標準，評估只會變成各說各話。動手前先寫下這個任務要的是正確、切題、格式對，還是不能幻覺。",
        "<b>用你自己的真實任務測</b>：公開 benchmark 分數高，不代表在你的資料上好用，何況熱門題目常已混進訓練資料。準備幾十題自己的真實案例當考卷更準。",
        "<b>盲測＋固定題庫才比得準</b>：換模型時用同一批題目、遮住模型名稱來評分，才不會被「聽說很強」的印象帶著走。",
        "<b>用大模型當評審要小心</b>：讓 AI 評 AI 省時省力，但評審有偏好（偏長答案、偏第一個選項），關鍵決策仍要抽樣人工複核。"
      ],
      "en": [
        "<b>Define what \"good\" means before testing</b>: without clear criteria, evaluation just turns into everyone arguing. Before you start, write down whether this task needs accuracy, relevance, the right format, or no hallucination.",
        "<b>Test on your own real tasks</b>: a high score on a public benchmark does not mean it works on your data, and popular benchmarks often leak into training data anyway. A few dozen of your own real cases make a far better exam.",
        "<b>Blind tests on a fixed set compare fairly</b>: when switching models, score the same batch of questions with the model name hidden, so you are not swayed by the reputation of whichever model is hyped.",
        "<b>Be careful using a big model as the judge</b>: letting AI grade AI saves time, but judges have biases (they favor longer answers and the first option), so still spot-check the important calls by hand."
      ],
      "ja": [
        "<b>テスト前に「良い」の定義を決める</b>：明確な基準がなければ、評価はただの水掛け論になります。始める前に、この課題で求めるのは正確さか、関連性か、正しい形式か、幻覚がないことか、を書き出しましょう。",
        "<b>自分の実タスクで評価する</b>：公開ベンチマークの高得点は、自分のデータで使えることを意味しませんし、人気の問題は訓練データに混入していることもよくあります。自前の実例を数十問用意する方が、はるかに正確な試験になります。",
        "<b>盲検＋固定の問題セットで公平に比べる</b>：モデルを乗り換えるときは、同じ問題群をモデル名を隠して採点します。そうすれば「強いらしい」という評判に流されません。",
        "<b>大きなモデルを審査役にするときは慎重に</b>：AI に AI を採点させると省力ですが、審査役には偏り（長い回答を好む、最初の選択肢を好む）があるので、重要な判断は人手で抜き取り確認しましょう。"
      ]
    }
  }
};

/** 實務上要點陣列；缺該語言回 null（不 fallback）。 */
export function practicalFor(slug, locale = 'zh') {
  return PRACTICE[slug]?.practical?.[locale] ?? null;
}
/** 決策指引物件 { q, rows:[{when,use,why}] }；缺該語言回 null（不 fallback）。 */
export function decisionFor(slug, locale = 'zh') {
  return PRACTICE[slug]?.decision?.[locale] ?? null;
}
