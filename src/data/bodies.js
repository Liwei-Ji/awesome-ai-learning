/* ============================================================
   各章「課文」：先讀再玩，放在互動 Demo 之前。
   每章約 4-6 小段（核心概念 → 機制 → 具體數字/例子 → 為什麼重要 → 常見誤解），
   白話、零公式、不用破折號；關鍵詞以 <b> 標示。
   依語言分 zh / en / ja；缺該語言時 bodyFor 會 fallback 回 zh。
   此檔由 scratchpad/merge-bodies.mjs 產生；改內容請改來源 JSON 後重跑合併。
   ============================================================ */
export const BODIES = {
  "history": {
    "zh": [
      {
        "h": "不是憑空出現",
        "p": "AI 不是這幾年才冒出來的。從 1950 年代起，科學家就在問：機器能不能像人一樣思考？它的今天是七十年起伏累積的成果。"
      },
      {
        "h": "起點與寒冬",
        "p": "數學家圖靈提出 <b>Turing Test</b>：隔著螢幕聊天，若分不出對面是人是機器，就算會思考。但早期電腦太弱、承諾跳票，經費多次凍結，稱為 <b>AI Winter</b>。"
      },
      {
        "h": "三個大跳點",
        "p": "真正的轉折有三個：2012 年深度學習在影像辨識比賽大勝，2017 年 Transformer 架構問世，2022 年底 ChatGPT 上線，兩個月就突破上億用戶。"
      },
      {
        "h": "突破的共通點",
        "p": "每次跳躍靠的不是魔法，而是更好的架構或更大的規模：更多資料、更多運算。同一個想法，常要等硬體夠強才突然可行。"
      },
      {
        "h": "常見誤解",
        "p": "最常見的誤解，是把 ChatGPT 當成 AI 的起點。它其實站在無數失敗與寒冬的肩膀上，是七十年研究的成果，而非一夜爆紅的發明。"
      }
    ],
    "en": [
      {
        "h": "Not out of nowhere",
        "p": "AI did not appear just in the last few years. Since the 1950s, scientists have asked the same question: can a machine think like a person? Today's AI is the payoff of about seventy years of ups and downs."
      },
      {
        "h": "The start, and the winters",
        "p": "The mathematician Alan Turing proposed the <b>Turing Test</b>: if you chat by text through a screen and cannot tell whether the other side is a human or a machine, we can say it thinks. But early computers were weak and many promises fell through, so funding froze more than once, a slump known as an <b>AI Winter</b>."
      },
      {
        "h": "Three big leaps",
        "p": "Three turning points really pushed AI forward: in 2012 deep learning won an image recognition contest by a wide margin, in 2017 the Transformer architecture arrived, and in late 2022 ChatGPT launched and passed a hundred million users in about two months."
      },
      {
        "h": "What the breakthroughs share",
        "p": "Every leap came not from magic but from a better architecture or a bigger scale: more data and more computing. The same idea often had to wait until hardware was strong enough before it suddenly became workable."
      },
      {
        "h": "A common misconception",
        "p": "The most common misconception is treating ChatGPT as the starting point of AI. It actually stands on the shoulders of countless failures and winters, the fruit of seventy years of research rather than an overnight invention."
      }
    ],
    "ja": [
      {
        "h": "突然現れたのではない",
        "p": "AI はここ数年で急に現れたものではありません。1950 年代から科学者は「機械は人のように考えられるか」を問い続けてきました。今日の AI は、約七十年の浮き沈みが積み重なった成果です。"
      },
      {
        "h": "出発点と冬の時代",
        "p": "数学者チューリングは <b>Turing Test</b> を提案しました。画面越しに文字で会話し、相手が人か機械か見分けられなければ思考していると見なせる、という考えです。しかし初期のコンピューターは非力で約束も果たせず、資金が何度も凍結しました。この低迷を <b>AI Winter</b> と呼びます。"
      },
      {
        "h": "三つの大きな飛躍",
        "p": "AI を今へ押し上げた転換点は三つあります。2012 年に deep learning が画像認識コンテストで圧勝し、2017 年に Transformer という構造が登場し、2022 年末には ChatGPT が公開され、約二か月で利用者が一億人を超えました。"
      },
      {
        "h": "飛躍に共通すること",
        "p": "どの飛躍も魔法ではなく、より優れた構造か、より大きな規模、つまりより多くのデータと計算から生まれました。同じ発想でも、ハードウェアが十分に強くなって初めて急に実用的になることが多いのです。"
      },
      {
        "h": "よくある誤解",
        "p": "最もよくある誤解は、ChatGPT を AI の出発点だと考えることです。実際には数えきれない失敗と冬の時代の上に立つ、七十年の研究の成果であり、一夜で生まれた発明ではありません。"
      }
    ]
  },
  "ai-intro": {
    "zh": [
      {
        "h": "AI 是什麼",
        "p": "AI 是讓機器模仿人類的「看、想、決定」：認出照片裡的貓、判斷郵件是不是垃圾信、推薦你可能想看的影片。"
      },
      {
        "h": "和一般程式差在哪",
        "p": "關鍵差別在：一般程式是人把規則寫死，例如「金額大於一萬就示警」；AI 則是餵大量例子，讓它自己從資料歸納出規則。"
      },
      {
        "h": "從資料到決策",
        "p": "整套流程分四步：先蒐集資料，訓練出一個 <b>Model</b>（模型），模型對新資料做出 <b>Prediction</b>（預測），再根據預測採取決策。"
      },
      {
        "h": "預測帶著信心度",
        "p": "預測不是斬釘截鐵的答案，而是帶著信心度的猜測，例如「這封信有 95% 像垃圾信」。所以 AI 會出錯，看到的其實是機率最高的選項。"
      },
      {
        "h": "常見誤解",
        "p": "常見誤解是以為 AI「真的懂」或永遠正確。它其實沒有理解，只是從資料學到的規律去猜最可能的答案，因此可能自信地猜錯。"
      }
    ],
    "en": [
      {
        "h": "What AI is",
        "p": "AI is about letting machines imitate how humans see, think, and decide: recognizing the cat in a photo, judging whether an email is spam, or recommending a video you might want to watch."
      },
      {
        "h": "How it differs from ordinary software",
        "p": "The key difference: ordinary software has its rules hand written by people, for example \"warn if the amount is over ten thousand\". AI instead is fed many examples and works out the rules from the data by itself."
      },
      {
        "h": "From data to decision",
        "p": "The whole flow has four steps: first collect data, train a <b>Model</b>, let the model make a <b>Prediction</b> about new data, and then take a decision based on that prediction."
      },
      {
        "h": "Predictions carry confidence",
        "p": "A prediction is not a flat, certain answer but a guess that carries a confidence level, for example \"this email is 95% likely to be spam\". So AI can be wrong, and what you see is really the most probable option."
      },
      {
        "h": "A common misconception",
        "p": "A common misconception is thinking AI truly understands or is always right. It does not really understand, it only uses patterns learned from data to guess the most likely answer, so it can be confidently wrong."
      }
    ],
    "ja": [
      {
        "h": "AI とは何か",
        "p": "AI とは、人間の「見る・考える・決める」を機械にまねさせることです。写真の中の猫を見分ける、メールが迷惑メールかを判断する、あなたが見たそうな動画をおすすめする、といった具合です。"
      },
      {
        "h": "普通のプログラムとの違い",
        "p": "決定的な違いはこうです。普通のプログラムは人がルールを書き込みます。たとえば「金額が一万を超えたら警告する」といった具合です。AI は大量の例を与えられ、データから自分でルールを導き出します。"
      },
      {
        "h": "データから決定まで",
        "p": "全体の流れは四段階です。まずデータを集め、<b>Model</b>（モデル）を訓練し、モデルが新しいデータについて <b>Prediction</b>（予測）を出し、その予測をもとに判断を下します。"
      },
      {
        "h": "予測には確信度がある",
        "p": "予測は言い切りの答えではなく、確信度をともなう推測です。たとえば「このメールは 95% の確率で迷惑メール」のように。だから AI は間違えることがあり、目にするのは最も確率の高い選択肢なのです。"
      },
      {
        "h": "よくある誤解",
        "p": "よくある誤解は、AI が「本当に理解している」あるいは常に正しい、と思うことです。実際には理解しておらず、データから学んだ規則で最もありそうな答えを推測するだけなので、自信たっぷりに間違えることもあります。"
      }
    ]
  },
  "ml": {
    "zh": [
      {
        "h": "從例子中找規律",
        "p": "機器學習是讓電腦從大量例子裡自己找出規律。看過夠多貓的照片，它就慢慢抓到「貓長什麼樣」的共同特徵。"
      },
      {
        "h": "訓練是怎麼一回事",
        "p": "這批用來學習的例子叫 <b>Dataset</b>（資料集）。訓練就是模型先猜，猜錯就微調內部設定，一輪一輪反覆修正，直到猜對的比例越來越高。"
      },
      {
        "h": "用沒看過的資料驗收",
        "p": "猜對的比例就是 <b>Accuracy</b>（準確率）。關鍵是評估時要用模型沒看過的資料來算，才知道它是真的學會，還是只是把訓練題目背了起來。"
      },
      {
        "h": "為什麼資料量重要",
        "p": "所以例子越多、越有代表性，模型通常越準。這也是為什麼強大的 AI 背後，往往是巨量而多樣的訓練資料。"
      },
      {
        "h": "常見誤解",
        "p": "常見誤解是「訓練時準確率很高就等於好模型」。若它只是背下考古題，遇到新狀況照樣會錯，這叫過度擬合。"
      }
    ],
    "en": [
      {
        "h": "Finding patterns from examples",
        "p": "Machine learning lets a computer find patterns from many examples by itself. After seeing enough photos of cats, it gradually picks up the shared features of what a cat looks like."
      },
      {
        "h": "What training actually is",
        "p": "The batch of examples used for learning is called a <b>Dataset</b>. Training means the model guesses, and when it guesses wrong it nudges its internal settings, correcting round after round until it gets more and more answers right."
      },
      {
        "h": "Checking with unseen data",
        "p": "The share of correct guesses is the <b>Accuracy</b>. The key point is that evaluation must use data the model has never seen, so you know whether it truly learned or just memorized the training questions."
      },
      {
        "h": "Why the amount of data matters",
        "p": "So the more examples there are, and the more representative they are, the more accurate the model usually is. That is why powerful AI is often backed by huge and diverse training data."
      },
      {
        "h": "A common misconception",
        "p": "A common misconception is that high accuracy during training equals a good model. If it merely memorized past questions, it will still fail on new situations, which is called overfitting."
      }
    ],
    "ja": [
      {
        "h": "例からパターンを見つける",
        "p": "機械学習は、コンピューターが大量の例から自分でパターンを見つけることです。十分な数の猫の写真を見れば、「猫とはどんな見た目か」という共通の特徴を少しずつつかんでいきます。"
      },
      {
        "h": "訓練とは何か",
        "p": "学習に使うこの例のまとまりを <b>Dataset</b>（データセット）と呼びます。訓練とは、モデルがまず推測し、外れたら内部の設定を少し調整し、何度も繰り返し直しながら、正解の割合を上げていくことです。"
      },
      {
        "h": "見たことのないデータで検証する",
        "p": "正解した割合が <b>Accuracy</b>（正解率）です。大切なのは、評価にはモデルが見たことのないデータを使うことです。そうして初めて、本当に学べたのか、訓練問題を丸暗記しただけかが分かります。"
      },
      {
        "h": "なぜデータ量が大切か",
        "p": "だから例が多く、より代表的であるほど、モデルはふつうより正確になります。強力な AI の裏側に、膨大で多様な訓練データがあることが多いのはこのためです。"
      },
      {
        "h": "よくある誤解",
        "p": "よくある誤解は、訓練時の正解率が高ければ良いモデルだ、というものです。過去問を丸暗記しただけなら、新しい状況では相変わらず間違えます。これを過学習と呼びます。"
      }
    ]
  },
  "data": {
    "zh": [
      {
        "h": "資料是養分",
        "p": "資料是 AI 的養分。模型的能力上限幾乎由它學過的資料決定：模型很難學會資料裡從沒出現過的東西，也不該指望它憑空生出正確知識。"
      },
      {
        "h": "標註：告訴 AI 正確答案",
        "p": "要讓 AI 學會分辨，通常得先做標註：由人替每筆資料標上正確答案，這個答案叫 <b>Label</b>（標籤），例如在照片上寫明「這是貓」。"
      },
      {
        "h": "髒資料進，錯結論出",
        "p": "資料品質比想像中更關鍵，業界常說「garbage in, garbage out」：餵進去的是髒資料（標錯、重複、雜訊），學出來的結論也會跟著錯。"
      },
      {
        "h": "資料偏誤",
        "p": "如果資料本身不均衡，就會造成 <b>Bias</b>（資料偏誤）。例如訓練照片多半是某一膚色的人，模型換張臉就容易變差，甚至造成不公平。"
      },
      {
        "h": "常見誤解",
        "p": "常見誤解是「資料越多越好」。其實數量不能取代品質：一批乾淨、平衡又標註正確的資料，往往勝過大量卻雜亂的資料。"
      }
    ],
    "en": [
      {
        "h": "Data is the nutrition",
        "p": "Data is the nutrition of AI. A model's ceiling is set almost entirely by the data it has learned from: a model struggles to learn what never appears in its data, and you should not expect it to conjure correct knowledge from nothing."
      },
      {
        "h": "Labeling: telling AI the right answer",
        "p": "To teach AI to tell things apart, you usually have to label the data first: a person marks the correct answer on each item, and that answer is called a <b>Label</b>, for example writing \"this is a cat\" on a photo."
      },
      {
        "h": "Garbage in, garbage out",
        "p": "Data quality matters more than people expect, and the field often says \"garbage in, garbage out\": if what you feed in is dirty data (mislabeled, duplicated, noisy), the conclusions learned from it come out wrong too."
      },
      {
        "h": "Data bias",
        "p": "If the data itself is unbalanced, it creates <b>Bias</b>. For example, if the training photos are mostly of people with one skin tone, the model tends to do worse on other faces, and can even become unfair."
      },
      {
        "h": "A common misconception",
        "p": "A common misconception is that more data is always better. In reality quantity cannot replace quality: a clean, balanced, and correctly labeled dataset often beats a large but messy one."
      }
    ],
    "ja": [
      {
        "h": "データは栄養",
        "p": "データは AI の栄養です。モデルの能力の上限は、学んできたデータでほぼ決まります。データに一度も現れないものをモデルが学ぶのは難しく、正しい知識を何もないところから生み出すことを期待すべきではありません。"
      },
      {
        "h": "ラベル付け：正解を AI に教える",
        "p": "AI に区別を学ばせるには、まずラベル付けが必要です。人が一つ一つのデータに正しい答えを付け、その答えを <b>Label</b>（ラベル）と呼びます。たとえば写真に「これは猫」と記します。"
      },
      {
        "h": "ゴミを入れればゴミが出る",
        "p": "データの品質は思う以上に重要で、業界では「garbage in, garbage out」とよく言います。入れるのが汚いデータ（誤ったラベル、重複、ノイズ）なら、そこから学ぶ結論も間違ってしまいます。"
      },
      {
        "h": "データの偏り",
        "p": "データそのものが偏っていると、<b>Bias</b>（データの偏り）が生じます。たとえば訓練用の写真がある肌の色の人に偏っていると、モデルは他の顔でうまくいかなくなり、不公平にもなりかねません。"
      },
      {
        "h": "よくある誤解",
        "p": "よくある誤解は「データは多いほど良い」というものです。実際には量は質の代わりになりません。きれいで、バランスがとれ、正しくラベル付けされたデータは、大量でも雑然としたデータに勝ることが多いのです。"
      }
    ]
  },
  "deep-learning": {
    "zh": [
      {
        "h": "什麼是「深」",
        "p": "深度學習是把很多層神經元疊起來的機器學習。「深」不是指難，而是<b>層</b>數多：資料從第一層進去，一層層往後傳，每過一層就被重新整理一次。"
      },
      {
        "h": "一層抽象一次",
        "p": "關鍵是每一層都把前一層的結果再抽象一次。淺層只看得到最基本的細節，像邊緣和顏色塊；越往深層，抓到的東西越完整、越有意義。"
      },
      {
        "h": "以認臉為例",
        "p": "以辨識人臉為例：第一層抓邊緣，中間層把邊緣拼成眼睛、鼻子這類<b>特徵</b>，最深層才組成一張完整的臉。現代網路常疊到幾十層，深的甚至破百層。"
      },
      {
        "h": "特徵不用人教",
        "p": "這正是深度學習厲害的地方：以前要靠工程師手工設計該看哪些特徵，現在網路自己從資料裡學出來，不必有人教它眼睛長什麼樣。"
      },
      {
        "h": "常見誤解",
        "p": "別以為層數越多就越聰明。層太多更難訓練、更吃資料和算力，也更容易學過頭。要疊多深得看任務，不是越深越好。"
      }
    ],
    "en": [
      {
        "h": "What \"deep\" means",
        "p": "Deep learning is machine learning that stacks many <b>layers</b> of neurons. \"Deep\" does not mean difficult; it means there are lots of layers: data enters the first layer and is passed backward one layer at a time, getting reorganized at every step."
      },
      {
        "h": "Each layer adds a level of abstraction",
        "p": "The key idea is that every layer abstracts the previous layer's output one step further. Shallow layers only pick up the most basic details, like edges and blocks of color; the deeper you go, the more complete and meaningful the things they detect become."
      },
      {
        "h": "Recognizing a face",
        "p": "Take face recognition: the first layer catches edges, middle layers assemble those edges into <b>features</b> like eyes and a nose, and only the deepest layers combine those parts into a whole face. Modern networks routinely stack dozens of layers, and deep ones go past a hundred."
      },
      {
        "h": "Features are learned, not hand-coded",
        "p": "This is exactly what makes deep learning powerful: engineers used to design by hand which features to look at, but now the network learns them straight from the data. You never have to tell it what an eye looks like; it figures that out itself."
      },
      {
        "h": "A common misconception",
        "p": "Do not assume more layers always means smarter. Too many layers are harder to train, hungrier for data and compute, and more prone to overfitting. How deep to go depends on the task; deeper is not always better."
      }
    ],
    "ja": [
      {
        "h": "「深い」とは何か",
        "p": "ディープラーニングは、ニューロンの<b>層</b>を何枚も積み重ねた機械学習です。「深い」は難しさではなく層の多さを指します。データは最初の層から入り、一層ずつ後ろへ送られ、層を通るたびに整理し直されます。"
      },
      {
        "h": "一層ごとに抽象化する",
        "p": "肝心なのは、どの層も前の層の結果をもう一段だけ抽象化する点です。浅い層はエッジや色のかたまりといった最も基本的な細部しか捉えませんが、深くなるほど、捉えるものはより完全で意味のあるものになります。"
      },
      {
        "h": "顔認識を例に",
        "p": "顔認識で言えば、最初の層はエッジを捉え、中間の層はそれを目や鼻といった<b>特徴</b>に組み立て、最も深い層がそれらの部品を一つの顔にまとめます。今のネットワークは数十層、深いものでは百層を超えます。"
      },
      {
        "h": "特徴は教えなくていい",
        "p": "ここがディープラーニングの強みです。かつては「どの特徴を見るか」を技術者が手作業で設計していましたが、今はネットワークがデータから自分で学びます。目がどんな形かを教える必要はなく、自分で見つけ出します。"
      },
      {
        "h": "よくある誤解",
        "p": "層が多いほど賢いとは限りません。層が多すぎると学習は難しくなり、データも計算資源もより多く必要になり、学びすぎ（過学習）も起きやすくなります。どこまで深くするかは課題しだいで、深ければよいわけではありません。"
      }
    ]
  },
  "neural-network": {
    "zh": [
      {
        "h": "節點與連結",
        "p": "神經網路是一堆「節點」用「連結」串起來的運算結構，靈感來自大腦神經元。每個節點很單純：收下上一層的數字，算一算，再送給下一層。"
      },
      {
        "h": "權重決定重要性",
        "p": "重點在連結上的<b>權重</b>，它代表這條線有多重要。節點會把每個輸入各自乘上權重再全部加起來，權重大的輸入，影響力就大。"
      },
      {
        "h": "正支持、負反對",
        "p": "權重可正可負：正權重像在說「這個線索支持我點亮」，負權重則要它冷靜。拉扯後的總分會再經過一道轉換，變成一個代表亮度的數字，這一步就叫<b>活化</b>。"
      },
      {
        "h": "一路匯聚成決定",
        "p": "訊號就這樣一層層相加、擠壓、往前傳。前面每個節點的亮或暗一路匯聚，到最後一層才變成明確答案，例如「這張圖有九成像貓」。"
      },
      {
        "h": "常見誤解",
        "p": "別把它當成真的大腦。這裡的「神經元」沒有生命，只是數字的乘法和加總；它像大腦的地方，僅止於很多簡單單元連在一起，不代表它真在思考。"
      }
    ],
    "en": [
      {
        "h": "Nodes and connections",
        "p": "A neural network is a computing structure of \"nodes\" wired together by \"connections,\" loosely inspired by the brain's neurons. Each node is simple: it takes in the numbers from the previous layer, does a quick calculation, and passes the result to the next layer."
      },
      {
        "h": "Weights set the importance",
        "p": "What matters is the <b>weight</b> on each connection, which represents how important that line is. A node multiplies every input by its own weight and adds them all up, so inputs with larger weights have more influence."
      },
      {
        "h": "Positive supports, negative opposes",
        "p": "Weights can be positive or negative: a positive weight is like saying \"this clue supports lighting me up,\" while a negative one tells the node to stay calm. The pushed-and-pulled total then passes through a transform that turns it into a number standing for brightness, and that step is called the <b>activation</b>."
      },
      {
        "h": "Converging into a decision",
        "p": "Signals get added, squeezed, and passed forward like this, layer after layer. Whether each earlier node is bright or dim all converges, and only at the final layer does it turn into a clear answer, such as \"this image is 90% likely a cat.\""
      },
      {
        "h": "A common misconception",
        "p": "Do not treat it as a real brain. The \"neurons\" here are not alive; they are just multiplication and addition of numbers. The only way it resembles a brain is that many simple units are wired together, which does not mean it is actually thinking."
      }
    ],
    "ja": [
      {
        "h": "ノードとつながり",
        "p": "ニューラルネットワークは、「ノード」を「つながり」で結んだ計算の仕組みで、脳のニューロンから発想を得ています。各ノードはとても単純で、前の層から来た数値を受け取り、少し計算して、結果を次の層へ渡します。"
      },
      {
        "h": "重みが重要度を決める",
        "p": "大事なのはつながりにある<b>重み</b>で、その線がどれだけ重要かを表します。ノードは各入力にそれぞれの重みを掛けてすべて足し合わせるので、重みが大きい入力ほど影響力が大きくなります。"
      },
      {
        "h": "正は賛成、負は反対",
        "p": "重みは正にも負にもなります。正の重みは「この手がかりは点灯に賛成」と言うようなもので、負の重みはノードに落ち着けと伝えます。引っ張り合った合計はもう一段の変換を通り、明るさを表す数値になります。この段階を<b>活性（activation）</b>と呼びます。"
      },
      {
        "h": "集まって決定になる",
        "p": "信号はこうして一層ずつ足され、押し込められ、前へ送られます。前のノードが明るいか暗いかがすべて集まり、最後の層でようやく「この画像は九割がた猫」といった明確な答えになります。"
      },
      {
        "h": "よくある誤解",
        "p": "本物の脳と思ってはいけません。ここでの「ニューロン」は生きておらず、数の掛け算と足し算にすぎません。脳に似ているのは多くの単純な部品がつながっている点だけで、本当に考えているわけではありません。"
      }
    ]
  },
  "training": {
    "zh": [
      {
        "h": "訓練在做什麼",
        "p": "一開始網路的權重全是隨機的，答案自然是亂猜。訓練就是拿正確答案來對照，反覆微調每個權重，讓模型犯的錯整體上越來越小。"
      },
      {
        "h": "先量出錯多大",
        "p": "要改進，得先知道錯多少。<b>損失</b>就是把「答案和正解差多遠」濃縮成一個分數：分數越高，錯得越離譜，訓練的目標就是把它壓到最低。"
      },
      {
        "h": "沿著坡度往下走",
        "p": "把損失想成一片有高有低的山谷，模型站在某一點。<b>梯度下降</b>就是每次都朝最陡的下坡踏一小步，一步步走向谷底，也就是錯最少的那組權重。"
      },
      {
        "h": "步伐大小很關鍵",
        "p": "每步跨多大由<b>學習率</b>決定。太大會一腳跨過谷底、來回震盪；太小又慢得要命。真實訓練常要走上幾十萬步，才慢慢收斂到不錯的權重。"
      },
      {
        "h": "常見誤解",
        "p": "別以為模型會一步找到最完美的答案。它大方向是往低處走，未必是全世界最低點；能走到夠好、夠穩的位置，訓練就算成功。"
      }
    ],
    "en": [
      {
        "h": "What training does",
        "p": "At the start a network's weights are all random, so its answers are pure guesses. Training means comparing against the correct answers and repeatedly nudging every weight so the model's mistakes get smaller overall."
      },
      {
        "h": "First measure how wrong",
        "p": "To improve, you first have to know how wrong you are. <b>Loss</b> boils \"how far the answer is from the correct one\" down into a single score: the higher the score, the more badly wrong, and the goal of training is to push it as low as possible."
      },
      {
        "h": "Walking down the slope",
        "p": "Picture loss as a valley with highs and lows, with the model standing somewhere on it. <b>Gradient descent</b> takes a small step in the steepest downhill direction each time, working its way toward the bottom, which is the set of weights with the fewest errors."
      },
      {
        "h": "Step size is critical",
        "p": "How big each step is comes down to the <b>learning rate</b>. Too large and you overshoot the bottom and oscillate back and forth; too small and it is painfully slow. Real training often takes hundreds of thousands of steps before it slowly converges on decent weights."
      },
      {
        "h": "A common misconception",
        "p": "Do not assume the model finds the single perfect answer in one shot. Its general direction is downhill, though not necessarily the lowest point in the whole world; reaching a spot that is good enough and stable enough already counts as success."
      }
    ],
    "ja": [
      {
        "h": "学習とは何をすること",
        "p": "最初、ネットワークの重みはすべてランダムで、答えは当てずっぽうです。学習とは、正解と照らし合わせて一つ一つの重みを繰り返し微調整し、モデルの間違いを全体として小さくしていくことです。"
      },
      {
        "h": "まず誤りの大きさを測る",
        "p": "改善するには、まずどれだけ間違っているかを知る必要があります。<b>損失（loss）</b>は「答えと正解がどれだけ離れているか」を一つのスコアにまとめたもので、スコアが高いほど大きく外しており、学習の目標はこれを最小まで下げることです。"
      },
      {
        "h": "坂を下っていく",
        "p": "損失を高低のある谷だと思い、モデルがそのどこかに立っていると考えます。<b>勾配降下法（gradient descent）</b>は、毎回いちばん急な下り方向へ一歩ずつ進み、谷底、つまり誤りが最も少ない重みの組へ近づいていきます。"
      },
      {
        "h": "歩幅の大きさが肝心",
        "p": "一歩の大きさは<b>学習率（learning rate）</b>が決めます。大きすぎると谷底を飛び越えて行き来し、小さすぎると遅すぎます。実際の学習では、まともな重みに落ち着くまで何十万歩も進むことが珍しくありません。"
      },
      {
        "h": "よくある誤解",
        "p": "モデルが一度で「完璧な答え」を見つけると思ってはいけません。大まかには低い方へ向かいますが、世界全体の最低点とは限りません。十分によく、十分に安定した場所にたどり着けば、学習は成功です。"
      }
    ]
  },
  "backprop": {
    "zh": [
      {
        "h": "先前向、再回頭",
        "p": "網路先把輸入往前算出答案（前向傳播），答案和正解一比就有了誤差。<b>反向傳播</b>做的，是把誤差從最後一層往回送，清算每個權重的責任。"
      },
      {
        "h": "誰該負多少責任",
        "p": "對答案影響越大的權重，要負的責任就越大。反向傳播會替每個權重算出「它把誤差推高了多少」，正好告訴訓練該往哪調、調多少。"
      },
      {
        "h": "一層扣一層回推",
        "p": "它能一層層回算，靠的是<b>連鎖律</b>：把整體誤差對某權重的影響，拆成相鄰層間的小影響逐層相乘，再深的網路也推得到第一層。"
      },
      {
        "h": "深層網路才可行",
        "p": "少了它幾乎做不到。網路動輒上億個權重，逐一去試怎麼調會慢到不可能；反向傳播只要一次前向、一次回推，就算出所有權重的調整方向。"
      },
      {
        "h": "常見誤解",
        "p": "反向傳播只算出每個權重該往哪調、調多少，本身不動權重。真正動手調整的是上一章的梯度下降：一個負責算、一個負責走，搭起來才完整。"
      }
    ],
    "en": [
      {
        "h": "Forward first, then back",
        "p": "The network first runs the input forward to produce an answer (the forward pass), and comparing that answer with the correct one gives an error. What <b>backpropagation</b> does is send this error back from the last layer, settling the responsibility of every weight."
      },
      {
        "h": "Who is to blame, and how much",
        "p": "Weights that affect the answer more carry more of the blame. Backpropagation works out, for each weight, how much it pushed the error up, and that number tells training exactly which way to adjust it and by how much."
      },
      {
        "h": "Pushing back layer by layer",
        "p": "It can compute backward layer by layer thanks to the <b>chain rule</b>: it breaks the effect of the overall error on one weight into small effects between neighboring layers and multiplies them together step by step, so even very deep networks reach all the way to the first layer."
      },
      {
        "h": "What makes deep networks feasible",
        "p": "Without it this is nearly impossible. A network can easily have hundreds of millions of weights, and testing one by one how to adjust each would be impossibly slow; backpropagation needs just one forward pass and one backward pass to work out the adjustment direction for every weight."
      },
      {
        "h": "A common misconception",
        "p": "Backpropagation only computes which way and how much each weight should move; it does not change the weights itself. What actually does the adjusting is the gradient descent from the last chapter: one is in charge of calculating, the other of stepping, and only together are they complete."
      }
    ],
    "ja": [
      {
        "h": "まず前向き、それから後ろ向き",
        "p": "ネットワークはまず入力を前へ計算して答えを出します（前向き計算）。その答えを正解と比べると誤差が出ます。<b>誤差逆伝播（backpropagation）</b>がするのは、この誤差を最後の層から後ろへ送り返し、各重みの責任を清算することです。"
      },
      {
        "h": "誰がどれだけ悪いのか",
        "p": "答えへの影響が大きい重みほど、負う責任も大きくなります。誤差逆伝播は重みごとに「どれだけ誤差を押し上げたか」を計算し、その数値が学習に、どちらへどれだけ調整すべきかを正確に教えます。"
      },
      {
        "h": "一層ずつ後ろへ押し戻す",
        "p": "一層ずつ後ろへ計算できるのは<b>連鎖律（chain rule）</b>のおかげです。「全体の誤差がある重みに与える影響」を、隣り合う層どうしの小さな影響に分け、一段ずつ掛け合わせていくので、どれほど深いネットワークでも最初の層まで届きます。"
      },
      {
        "h": "深いネットワークが実現できる理由",
        "p": "これがなければほぼ不可能です。ネットワークは数億個の重みを持つこともあり、一つずつどう調整するか試していては遅すぎます。誤差逆伝播なら前向き一回と後ろ向き一回だけで、すべての重みの調整方向を一気に求められます。"
      },
      {
        "h": "よくある誤解",
        "p": "誤差逆伝播は「各重みをどちらへどれだけ動かすか」を計算するだけで、それ自体は重みを変えません。実際に調整するのは前章の勾配降下法です。一方が計算し、もう一方が進む。両者が組み合わさって初めて完成します。"
      }
    ]
  },
  "cnn": {
    "en": [
      {
        "h": "To a computer, an image is a pile of numbers",
        "p": "Inside a computer, an image is just a grid of pixel numbers. Feeding a whole image straight into an ordinary fully connected network makes the parameters explode, and it never learns that 'the same thing in a different position is still the same thing'. Seeing images needs a smarter approach."
      },
      {
        "h": "CNN: scanning everywhere with a small filter",
        "p": "The key to a <b>CNN (convolutional neural network)</b> is a tiny <b>filter</b>, for example 3×3, that <b>slides across the whole image cell by cell</b>, specialized to detect some local pattern (edges, corners). The same filter is reused across the entire image, so it recognizes a cat whether it is in the top left or the bottom right. This is called <b>weight sharing</b> and <b>positional invariance</b>, and as a bonus it makes the parameters far fewer."
      },
      {
        "h": "From edges to a face: abstraction layer by layer",
        "p": "A single layer of filters can only see simple patterns. Stack many layers together: <b>shallow layers see edges → middle layers see shapes and textures → deep layers see eyes, faces, whole objects</b>. This is exactly the 'layer-by-layer abstraction' from the deep learning lesson, and a CNN is what it looks like in concrete form for images. In between, <b>pooling</b> is also used to shrink the image and keep the strongest signals, which saves compute and makes it more robust to shifts in position."
      },
      {
        "h": "It ignited this wave of AI",
        "p": "In 2012, a CNN called AlexNet left its rivals far behind in the image recognition contest (ImageNet), proving that 'enough data and a deep enough network' really works, and directly ignited this wave of deep learning (the turning point mentioned in Lesson 0). Later, face recognition, medical imaging, and self-driving vision mostly have a CNN underneath."
      },
      {
        "h": "Common misconceptions",
        "p": "A CNN is not the kind of 'filter effect' you get in photo editing. Its filters are not designed by people; they are <b>learned by the model itself from data</b>. In recent years Transformer has also been brought to images (Vision Transformer), but in many settings CNN is still fast and accurate. And when a <b>multimodal model looks at an image</b>, the front-end image encoder is often a CNN too."
      }
    ],
    "ja": [
      {
        "h": "画像はコンピュータにとって数字の集まり",
        "p": "一枚の画像はコンピュータの中では升目状のピクセルの数字にすぎません。普通の全結合ネットワークで画像全体をそのまま入力すると、パラメータが爆発的に増え、しかも「同じものが位置を変えても同じものだ」ということを学べません。画像を見るには、もっと賢いやり方が必要です。"
      },
      {
        "h": "CNN：小さなフィルタであちこちを走査する",
        "p": "<b>CNN（畳み込みニューラルネットワーク）</b>の要は、例えば 3×3 の小さな<b>フィルタ（filter）</b>で、画像全体を<b>一マスずつ滑らせ</b>、ある局所的な模様（エッジ、角）を専門に検出します。同じフィルタを画像全体で繰り返し使うので、猫が左上にいても右下にいても認識できます。これを<b>重み共有</b>と<b>位置不変性</b>と呼び、ついでにパラメータも大幅に減らします。"
      },
      {
        "h": "エッジから顔へ：一層ずつ抽象化する",
        "p": "一層のフィルタは単純な模様しか見られません。たくさんの層を重ねると、<b>浅い層はエッジを見て → 中間の層は形や質感を見て → 深い層は目、顔、物体全体を見ます</b>。これこそ深層学習の課で述べた「一層ずつの抽象化」であり、CNN はそれが画像上で具体化した姿です。途中では<b>プーリング（pooling）</b>を使って画像を縮小し、最も強い信号を残すことで、計算を節約し、位置の変化にもより強くなります。"
      },
      {
        "h": "それがこの AI の波に火をつけた",
        "p": "2012 年、AlexNet という CNN が画像認識コンテスト（ImageNet）で競合を大きく引き離し、「データが十分に多く、ネットワークが十分に深ければ」本当に効くことを証明し、この深層学習ブームに直接火をつけました（第 0 課で触れたあの転換点です）。その後の顔認識、医療画像、自動運転の視覚は、下層の多くに CNN があります。"
      },
      {
        "h": "よくある誤解",
        "p": "CNN は写真加工でいう「フィルタ効果」ではありません。そのフィルタは人が設計するのではなく、<b>モデル自身がデータから学習した</b>ものです。近年は Transformer も画像に持ち込まれていますが（Vision Transformer）、多くの場面で CNN は今なお速く正確です。さらに<b>マルチモーダルモデルが画像を見る</b>とき、フロントの画像エンコーダも CNN であることがよくあります。"
      }
    ],
    "zh": [
      {
        "h": "圖片對電腦是一堆數字",
        "p": "一張圖在電腦裡就是一格格像素的數字。用一般的全連接網路直接吃整張圖，參數會爆炸，而且它學不會「同一個東西換個位置還是同一個東西」。看圖需要更聰明的做法。"
      },
      {
        "h": "CNN：用小濾鏡到處掃",
        "p": "<b>CNN（卷積神經網路）</b>的關鍵是一個小小的<b>濾鏡（filter）</b>，例如 3×3，在整張圖上<b>一格格滑過去</b>，專門偵測某種局部花樣（邊緣、角落）。同一個濾鏡在整張圖重複使用，所以不管貓在左上還右下都認得，這叫<b>權重共享</b>與<b>位置不變</b>，順帶讓參數少很多。"
      },
      {
        "h": "從邊緣到臉：一層層抽象",
        "p": "一層濾鏡只看得到簡單花樣。把很多層疊起來：<b>淺層看邊緣 → 中層看形狀、紋理 → 深層看到眼睛、臉、整個物件</b>。這正是深度學習那課說的「逐層抽象」，CNN 就是它在影像上的具體長相。中間還會用<b>池化（pooling）</b>把圖縮小、留下最強訊號，省算力也更耐位置變化。"
      },
      {
        "h": "它點燃了這波 AI",
        "p": "2012 年，一個叫 AlexNet 的 CNN 在影像辨識大賽（ImageNet）遠遠甩開對手，證明「資料夠多、網路夠深」真的管用，直接點燃這波深度學習熱潮（第 0 課提過的那個轉折）。之後的人臉辨識、醫療影像、自駕視覺，底層大多有 CNN。"
      },
      {
        "h": "常見誤解",
        "p": "CNN 不是修圖那種「濾鏡效果」。它的濾鏡不是人設計的，是<b>自己從資料學出來</b>的。近年 Transformer 也被搬到影像（Vision Transformer），但很多場景 CNN 仍又快又準；而且<b>多模態模型看圖</b>時，前端影像編碼器也常是 CNN。"
      }
    ]
  },
  "tokenizer": {
    "zh": [
      {
        "h": "核心概念",
        "p": "模型讀文字不是一個字一個字讀，而是先把文字切成一塊塊叫 <b>token</b> 的單位。你可以把 token 想成「模型字典裡的一個詞條」，這本字典常見規模在 10 萬條上下，裡面既有完整的常見詞，也有大量詞的碎片。"
      },
      {
        "h": "它怎麼切",
        "p": "常見詞多半自己就是一個 token（像 the、貓、is）；罕見或很長的詞會被拆成碎片，也就是 <b>subword</b>，例如 unbelievable 會切成 un ＋ believ ＋ able。這樣就算遇到沒看過的詞，也能用碎片拼出來，不會整個卡住。"
      },
      {
        "h": "感受一下數字",
        "p": "英文大約 4 個字元＝1 個 token，也就是 1 個 token 約等於 0.75 個單字；中文更耗，常見字多半 1 字就是 1 個 token，不少字甚至要 2 個以上。所以同一句話的意思，用中文表達往往要花上英文一到兩倍左右的 token。"
      },
      {
        "h": "為什麼你該在意",
        "p": "你付給 API 的費用、模型一次能讀進多少內容（<b>context window</b>）、回應有多快，全都是用 token 計算，而不是用「字數」。這也是為什麼有時候換個說法、或改用英文寫 prompt，會明顯比較省、比較快。"
      },
      {
        "h": "常見誤解",
        "p": "「1 個 token 等於 1 個字」是最常見的誤會。token 可長可短：可能是一個完整單字、一個詞的碎片、一個標點，甚至一個 emoji 就佔掉好幾個 token。真正決定長度的，是模型的字典怎麼切，不是你數了幾個字。"
      }
    ],
    "en": [
      {
        "h": "The core idea",
        "p": "A model does not read text one character at a time. It first chops the text into chunks called <b>tokens</b>. Think of a token as one entry in the model's dictionary, a dictionary that is often around 100,000 entries, holding both whole common words and a large number of word fragments."
      },
      {
        "h": "How it splits words",
        "p": "Common words are usually a single token on their own (like the, cat, is), while rare or very long words get broken into fragments, known as <b>subwords</b>. For example, unbelievable is split into un ＋ believ ＋ able. That way, even a word it has never seen can be pieced together from fragments instead of stopping the model cold."
      },
      {
        "h": "Getting a feel for the numbers",
        "p": "In English, roughly 4 characters make one token, so one token is about 0.75 of a word. Chinese costs more: a common character is often a token by itself, and quite a few characters take two or more. So expressing the same meaning in Chinese often spends one to two times as many tokens as English."
      },
      {
        "h": "Why it matters to you",
        "p": "What you pay the API, how much a model can read in one go (its <b>context window</b>), and how fast it replies are all counted in tokens, not in number of words. That is why rephrasing something, or writing your prompt in English, can sometimes be noticeably cheaper and faster."
      },
      {
        "h": "A common misconception",
        "p": "The belief that one token equals one word is the most common mistake. A token can be long or short: a whole word, a fragment of a word, a punctuation mark, or even a single emoji that eats up several tokens. What really sets the length is how the model's dictionary splits things, not how many words you counted."
      }
    ],
    "ja": [
      {
        "h": "核心となる考え方",
        "p": "モデルは文章を一文字ずつ読むのではなく、まず文章を <b>token</b> と呼ばれる小さなまとまりに切り分けます。token は「モデルの辞書に載っている一項目」だと考えてください。この辞書はよく10万項目ほどの規模で、よく使う単語まるごとも、大量の単語の断片も収められています。"
      },
      {
        "h": "どう切り分けるか",
        "p": "よく使う単語はたいてい単体で1つの token になります（the、猫、is など）。珍しい単語や長い単語は断片、つまり <b>subword</b> に分割されます。たとえば unbelievable は un ＋ believ ＋ able に切られます。こうすれば、見たことのない単語でも断片を組み合わせて表せるので、途中で行き詰まりません。"
      },
      {
        "h": "数字で感じてみる",
        "p": "英語ではおよそ4文字で1 token、つまり1 token は単語約0.75個ぶんです。中国語はもっとかかり、よく使う漢字は多くが1文字で1 token、2つ以上になる字も少なくありません。だから同じ意味でも、中国語で書くと英語の1〜2倍ほどの token を使うことがよくあります。"
      },
      {
        "h": "なぜ気にすべきか",
        "p": "API に払う料金、モデルが一度に読み込める量（<b>context window</b>）、返事の速さは、すべて「文字数」ではなく token で数えられます。だからこそ、言い回しを変えたり、prompt を英語で書いたりすると、はっきり安く速くなることがあるのです。"
      },
      {
        "h": "よくある誤解",
        "p": "「1 token＝1単語」は最もよくある勘違いです。token は長くも短くもなり、まるごと1単語のことも、単語の断片のことも、句読点1つのことも、絵文字1つで token をいくつも消費することもあります。長さを本当に決めるのは、モデルの辞書がどう切るかであって、あなたが数えた文字数ではありません。"
      }
    ]
  },
  "embedding": {
    "zh": [
      {
        "h": "核心概念",
        "p": "電腦看不懂文字，只認得數字。tokenizer 切出 token 後，每個 token 會被換成一長串數字，這串數字就是它的 <b>embedding</b>（詞嵌入）。可以想成把這個詞放進一個多維空間，給它一組座標，也就是一個 <b>向量</b>。"
      },
      {
        "h": "它怎麼運作",
        "p": "這些數字不是亂給的。訓練時模型反覆調整它們，讓常出現在相似上下文的詞，最後拿到相近的數字，在空間裡靠得很近。所以向量記的是意義，而不是字的拼法或外形。"
      },
      {
        "h": "具體例子",
        "p": "一個向量常有幾百到幾千個維度。有個著名現象：把「國王」的向量減去「男人」、再加上「女人」，會落在很接近「王后」的位置；「貓」和「狗」相鄰，離「汽車」則很遠。"
      },
      {
        "h": "為什麼你該在意",
        "p": "有了向量，電腦就能用「距離」算出兩段文字有多像。這正是搜尋、推薦和 RAG 的核心：找得到「意思相近」的內容，而不只是「字面一樣」的內容。"
      },
      {
        "h": "常見誤解",
        "p": "別以為每個維度都對應一個看得懂的屬性（例如第三維＝可愛度）。單看一個數字幾乎沒有意義；意義要看整串向量相對於其他詞的位置，才會浮現。"
      }
    ],
    "en": [
      {
        "h": "The core idea",
        "p": "Computers cannot read text, only numbers. Once the tokenizer produces tokens, each token is turned into a long list of numbers. That list is its <b>embedding</b>, and you can picture it as placing the word inside a many-dimensional space and giving it coordinates, that is, a <b>vector</b>."
      },
      {
        "h": "How it works",
        "p": "These numbers are not handed out at random. During training the model adjusts them again and again so that words that tend to appear in similar contexts end up with similar numbers, sitting close together in the space. So a vector records meaning, not how a word is spelled or shaped."
      },
      {
        "h": "A concrete example",
        "p": "A single vector often has a few hundred to a few thousand dimensions. In a famous result, if you take the vector for king, subtract man and add woman, you land very close to queen. In the same way cat sits next to dog, while car is far away."
      },
      {
        "h": "Why it matters to you",
        "p": "With vectors, a computer can use distance to measure how alike two pieces of text are. This is the heart of search, recommendations, and RAG: they can find content that is close in meaning, not just content with the same words on the page."
      },
      {
        "h": "A common misconception",
        "p": "Do not assume each dimension maps to a readable property (say, dimension three equals cuteness). A single number on its own means almost nothing; the meaning only emerges from where the whole vector sits relative to other words."
      }
    ],
    "ja": [
      {
        "h": "核心となる考え方",
        "p": "コンピュータは文字を読めず、数字しか扱えません。tokenizer が token を切り出すと、その token 一つひとつが長い数字の並びに変換されます。この並びが <b>embedding</b>（埋め込み）で、その語を多次元の空間に置いて座標を与えた <b>ベクトル</b>だと考えられます。"
      },
      {
        "h": "どう動くのか",
        "p": "この数字はでたらめに与えられるのではありません。学習中、モデルはそれらを何度も調整し、似た文脈に現れやすい語どうしが似た数字を持つ、つまり空間内で近くに並ぶようにします。だからベクトルが記録しているのは意味であって、綴りや見た目ではありません。"
      },
      {
        "h": "具体的な例",
        "p": "1つのベクトルは、数百から数千の次元を持つことがよくあります。有名な例として、「王」のベクトルから「男」を引き「女」を足すと、「女王」のすぐ近くに着きます。同じように「猫」は「犬」の隣にあり、「車」は遠くにあります。"
      },
      {
        "h": "なぜ気にすべきか",
        "p": "ベクトルがあれば、コンピュータは「距離」を使って2つの文章がどれくらい似ているかを測れます。これが検索、レコメンド、そして RAG の核心です。文字が同じ内容だけでなく、意味が近い内容を見つけられるのです。"
      },
      {
        "h": "よくある誤解",
        "p": "それぞれの次元が読み取れる属性に対応している（たとえば第3次元＝かわいさ）と思い込まないでください。1つの数字だけを見てもほとんど意味はなく、意味は、ベクトル全体が他の語に対してどこに位置するかから初めて立ち現れます。"
      }
    ]
  },
  "rnn": {
    "en": [
      {
        "h": "Language has an order",
        "p": "Text is not just a bag of independent words; order changes meaning. 'Dog bites man' and 'man bites dog' use the same words but mean opposite things. So a model that reads language has to read <b>in order</b>, one word at a time, and remember what came before. Models like this are called <b>sequence models</b>."
      },
      {
        "h": "RNN: reading and remembering at once",
        "p": "The classic sequence model is the <b>RNN (recurrent neural network)</b>. It reads one word at a time, compressing 'what it understands so far' into a single <b>hidden state</b>, and carries that state forward to read the next word. It is like listening to someone talk while continuously updating, in your head, 'what they are saying so far'. This constantly passed-along state is its <b>memory</b>."
      },
      {
        "h": "Two built-in flaws",
        "p": "Reading one step after another has two serious weaknesses. <b>① Forgetfulness</b>: as a sentence gets longer, the information at the start is diluted through all that compression, so by the end of the sentence the model has often forgotten the beginning. <b>② No parallelism</b>: the 10th word cannot be computed until the first 9 are done, which makes training slow. Improved versions like <b>LSTM</b> add 'gates' to help it remember longer, but these two limits never truly go away."
      },
      {
        "h": "And so Transformer arrived",
        "p": "The 2017 <b>Transformer</b> took a different approach: instead of going one step after another, it uses <b>Attention</b> to let every word <b>see the whole sentence at once</b> and directly work out what to pay attention to. This solves both forgetfulness (even distant words can connect directly) and the lack of parallelism (all words are computed together), which is what made today's large language models possible. The next lesson covers it."
      },
      {
        "h": "Common misconceptions",
        "p": "Do not assume RNNs are useless now. They are <b>small and resource-efficient</b>, and remain practical for <b>short sequences, real-time work, and on-device use</b> (some speech and sensor signals). It is only when you need to handle long text quickly and powerfully that Transformer becomes the current mainstream."
      }
    ],
    "ja": [
      {
        "h": "言語には順序がある",
        "p": "文章は独立した単語の寄せ集めではなく、順序が意味を変えます。「犬が人を噛む」と「人が犬を噛む」は同じ単語を使っていても意味は正反対です。だから言語を読むモデルは<b>順番どおりに</b>一語ずつ読み、前に出てきた内容も覚えておく必要があります。こうしたモデルを<b>シーケンスモデル</b>と呼びます。"
      },
      {
        "h": "RNN：読みながら覚える",
        "p": "最も代表的なシーケンスモデルが <b>RNN（循環ニューラルネットワーク）</b>です。一語ずつ読み、「ここまでの理解」を一つの<b>隠れ状態（hidden state）</b>に凝縮して、それを持ったまま次の語を読みます。人の話を聞きながら、心の中で「今この人が何を話しているか」を更新し続けるようなものです。この絶えず受け渡される状態こそが、その<b>記憶</b>です。"
      },
      {
        "h": "生まれつきの二つの弱点",
        "p": "一つずつ処理するやり方には二つの致命的な弱点があります。<b>①健忘</b>：文が長くなると、冒頭の情報が凝縮を重ねるうちに薄まり、文末まで読むころには最初を忘れがちです。<b>②並列化できない</b>：10 番目の語は前の 9 語を計算し終えないと計算できず、学習が遅くなります。<b>LSTM</b> のような改良版は「ゲート」を加えて記憶を少し長持ちさせますが、この二つの制約が本当に消えるわけではありません。"
      },
      {
        "h": "そこで Transformer が登場した",
        "p": "2017 年の <b>Transformer</b> は発想を変えました。一つずつではなく、<b>Attention</b> によって各語が<b>一度に文全体を見て</b>、誰に注目すべきかを直接計算します。これにより健忘（どれだけ離れた語でも直接つながる）と並列化できない問題（すべての語を一緒に計算する）を同時に解決し、その後の大規模言語モデルが生まれました。次の課で扱います。"
      },
      {
        "h": "よくある誤解",
        "p": "RNN がもう役に立たないと思わないでください。<b>構造が小さく、省リソース</b>で、<b>短いシーケンス、リアルタイム、デバイス側</b>（一部の音声やセンサー信号）では今も実用的です。長い文章を速く強力に扱いたいときにこそ、Transformer が現在の主流になるのです。"
      }
    ],
    "zh": [
      {
        "h": "語言是有順序的",
        "p": "文字不是一堆獨立的詞，順序會改變意思：「狗咬人」和「人咬狗」用的字一樣，意思卻相反。所以讀語言的模型得能<b>順著順序</b>一個字一個字讀，還要記住前面講過什麼。這類模型就叫<b>序列模型</b>。"
      },
      {
        "h": "RNN：邊讀邊記",
        "p": "最經典的序列模型是 <b>RNN（循環神經網路）</b>。它一次讀一個字，把「目前為止的理解」濃縮成一個<b>隱藏狀態（hidden state）</b>，帶著它去讀下一個字。像一邊聽人講話、一邊在心裡更新「他到現在在說什麼」。這個不斷傳遞的狀態就是它的<b>記憶</b>。"
      },
      {
        "h": "兩個天生的毛病",
        "p": "一個接一個的做法有兩個硬傷：<b>①健忘</b>，句子一長，開頭的資訊在一路濃縮中被稀釋，讀到句尾常常忘了開頭；<b>②不能平行</b>，第 10 個字要等前 9 個字算完才能算，訓練很慢。<b>LSTM</b> 這類改良版加了「閘門」讓它記得久一點，但這兩個限制沒有真正消失。"
      },
      {
        "h": "於是有了 Transformer",
        "p": "2017 年的 <b>Transformer</b> 換了思路：不再一個接一個，而是用 <b>Attention</b> 讓每個字<b>一次看到全句</b>，直接算出該注意誰。這同時解掉了健忘（再遠的字都能直接連上）和不能平行（所有字一起算），才有了後來的大型語言模型。下一課就講它。"
      },
      {
        "h": "常見誤解",
        "p": "別以為 RNN 沒用了。它<b>結構小、省資源</b>，在<b>短序列、即時、裝置端</b>（部分語音、感測器訊號）仍然實用。只是要處理長文字又要又快又強，Transformer 才是現在的主流。"
      }
    ]
  },
  "transformer": {
    "zh": [
      {
        "h": "核心概念",
        "p": "上一章我們把每個詞變成向量，但同一個詞在不同句子裡意思會變：「他」指誰、bank 是「銀行」還是「河岸」，都得看旁邊的字。Transformer 的任務，就是讓每個 token 去讀句中其他 token，再依<b>上下文</b>調整自己的意思。"
      },
      {
        "h": "Attention 怎麼運作",
        "p": "這個做法叫 <b>attention</b>（注意力）。對每個字，模型會問：「句子裡哪些字跟我有關？」再給每個字一個權重，越相關權重越高，然後按權重把這些字的資訊混進來。它能一次衡量整句的關係，不必像舊方法那樣一個字一個字慢慢傳。"
      },
      {
        "h": "具體例子",
        "p": "看這句：「動物沒穿過馬路，因為牠太累了。」這裡的「牠」指誰？attention 會拉高「牠」和「動物」之間的權重，把兩者連起來。若把「太累」改成「太寬」，模型就會改把「牠」連向「馬路」。"
      },
      {
        "h": "為什麼你該在意",
        "p": "這就是 GPT 裡的那個 T（Transformer）。2017 年這個設計出現後，機器才第一次能穩穩處理長句、追蹤「誰對誰做了什麼」。今天的 ChatGPT、Claude 全都建立在它之上。"
      },
      {
        "h": "常見誤解",
        "p": "attention 不是模型像人一樣「用心專注」或真的懂了。它只是訓練學到的一組數字權重，替句中每一對字算出該連多緊。它也不是一個字一個字慢慢往下傳，而是把當下看得到的字一次全部衡量。"
      }
    ],
    "en": [
      {
        "h": "The core idea",
        "p": "In the last chapter we turned each word into a vector, but the same word can mean different things in different sentences: who he refers to, or whether bank means a riverbank or a place for money, depends on the words around it. The job of a Transformer is to let every token look at the other tokens in the sentence and adjust its meaning based on <b>context</b>."
      },
      {
        "h": "How attention works",
        "p": "The method is called <b>attention</b>. For each word, the model asks which other words in the sentence are relevant to it, gives each word a weight (higher for the more relevant ones), and then mixes in their information according to those weights. It can weigh the relationships across the whole sentence at once, instead of passing information along one word at a time like older methods."
      },
      {
        "h": "A concrete example",
        "p": "Take the sentence, The animal did not cross the street because it was too tired. Who is it? Attention raises the weight between it and animal and links the two. Change too tired to too wide, and the model instead links it to street."
      },
      {
        "h": "Why it matters to you",
        "p": "This is the T in GPT (Transformer). After this design appeared in 2017, machines could for the first time reliably handle long sentences and keep track of who is doing what to whom. Today's ChatGPT and Claude are all built on top of it."
      },
      {
        "h": "A common misconception",
        "p": "Attention is not the model concentrating like a person, or truly understanding. It is just a set of learned numeric weights that decide, for every pair of words, how tightly they should be linked. And it does not pass information along one word at a time; it weighs all the words it can currently see at once."
      }
    ],
    "ja": [
      {
        "h": "核心となる考え方",
        "p": "前章では各語をベクトルに変えましたが、同じ語でも文によって意味が変わります。「彼」が誰を指すのか、bank が「銀行」か「川岸」かは、まわりの語しだいです。Transformer の役割は、各 token に文中の他の token を見させ、<b>文脈</b>に応じて自分の意味を調整させることです。"
      },
      {
        "h": "attention のしくみ",
        "p": "その方法が <b>attention</b>（注意）です。モデルは各語について、文中のどの語が自分に関係するかを問い、語ごとに重みを与え（関係が深いほど重みは高い）、その重みに従って各語の情報を混ぜ込みます。古い方法のように情報を一語ずつ順に送るのではなく、文全体の関係を一度に秤にかけられます。"
      },
      {
        "h": "具体的な例",
        "p": "英語の文「The animal did not cross the street because it was too tired（その動物は疲れすぎて道路を渡らなかった）」で、「it」は何を指すでしょうか。attention は「it」と「animal」の重みを高めて両者を結びつけます。「too tired」を「too wide（広すぎる）」に変えると、モデルは「it」を「street」に結びつけ直します。"
      },
      {
        "h": "なぜ気にすべきか",
        "p": "これが GPT の「T」（Transformer）です。2017年にこの設計が登場して以降、機械は初めて長い文を安定して扱い、「誰が誰に何をしているか」を追えるようになりました。今の ChatGPT も Claude も、すべてこの上に築かれています。"
      },
      {
        "h": "よくある誤解",
        "p": "attention は、モデルが人のように「集中している」わけでも、本当に理解しているわけでもありません。それは学習で得た数字の重みの集まりにすぎず、文中のあらゆる語の組について、どれだけ強く結ぶべきかを決めているだけです。また、情報を一語ずつ順に送るのではなく、いま見えている語をまとめて一度に秤にかけます。"
      }
    ]
  },
  "llm": {
    "zh": [
      {
        "h": "核心概念",
        "p": "像 ChatGPT 這樣的大型語言模型，並不是去資料庫查一個現成答案。它骨子裡只做一件事：看著目前為止的文字，預測<b>下一個 token</b>（大約是一個字或詞）最可能是什麼。"
      },
      {
        "h": "它怎麼運作",
        "p": "每走一步，模型會替字典裡數萬到十萬個候選 token 各算一個<b>機率</b>，再挑一個出來（通常挑機率高的，也帶點隨機）。把選中的字接到後面，重新讀一次整串文字，預測再下一個。就這樣一個 token 接一個，直到冒出「結束」的訊號。"
      },
      {
        "h": "具體例子",
        "p": "給它「天空是」，模型可能給「藍色」很高的機率、「晴朗」低一點、「香蕉」幾乎是零。因為每次挑選都帶一點隨機，所以同一句提問，重問一次，答案往往不完全一樣。"
      },
      {
        "h": "為什麼你該在意",
        "p": "這解釋了為什麼回答是一個字一個字「流」出來的；也說明它為何會自信地說錯：它一路優化的是「下一個字順不順」，不是「這件事對不對」。按「重新生成」會得到不同版本，也是同個道理。"
      },
      {
        "h": "常見誤解",
        "p": "它不是先想好整篇答案再打字，也不是在背一本大 FAQ。所謂「大型」，是它訓練時從海量文字學會了這些機率，而不是把答案存起來等你查。答案是當場一個字一個字長出來的。"
      }
    ],
    "en": [
      {
        "h": "The core idea",
        "p": "A large language model like ChatGPT is not looking up a ready-made answer in a database. At its core it does just one thing: it looks at the text so far and predicts what the <b>next token</b> (roughly a word or part of a word) is most likely to be."
      },
      {
        "h": "How it works",
        "p": "At each step, the model computes a <b>probability</b> for each of the tens of thousands to a hundred thousand candidate tokens in its vocabulary, then picks one (usually a high-probability one, with a bit of randomness). It attaches the chosen token to the end, reads the whole string again, and predicts the next one. Token by token it continues until a stop signal appears."
      },
      {
        "h": "A concrete example",
        "p": "Given the words The sky is, the model might give blue a high probability, clear a lower one, and banana almost zero. Because each pick carries a little randomness, asking the same question again often gives a slightly different answer."
      },
      {
        "h": "Why it matters to you",
        "p": "This explains why answers stream out one word at a time. It also explains why the model can be confidently wrong: all along it is optimizing for which word sounds right next, not for whether the claim is true. Hitting regenerate gives a different version for the same reason."
      },
      {
        "h": "A common misconception",
        "p": "It does not think out the whole answer first and then type it, nor is it reciting a giant FAQ. Large means that during training it learned these probabilities from a huge amount of text, not that it stored answers away for you to look up. The answer is grown on the spot, one word at a time."
      }
    ],
    "ja": [
      {
        "h": "核心となる考え方",
        "p": "ChatGPT のような大規模言語モデルは、データベースから出来合いの答えを探しているのではありません。その本質はたった1つ、これまでの文章を見て、<b>次の token</b>（おおよそ1文字か1単語）として何が最も来そうかを予測することです。"
      },
      {
        "h": "どう動くのか",
        "p": "一歩ごとに、モデルは語彙にある数万から十万個の候補 token それぞれに<b>確率</b>を計算し、そこから1つを選びます（ふつうは確率の高いものを、少し乱数も交えて）。選んだ token を末尾につなげ、文章全体をもう一度読み、次の1つを予測します。こうして token を1つずつ、「終わり」の合図が出るまで続けます。"
      },
      {
        "h": "具体的な例",
        "p": "「空は」と与えると、モデルは「青い」に高い確率を、「晴れ」に低めを、「バナナ」にはほぼゼロを与えるかもしれません。選ぶたびに少し乱数が入るので、同じ質問でも、もう一度聞くと答えが少し変わることがよくあります。"
      },
      {
        "h": "なぜ気にすべきか",
        "p": "これが、答えが1単語ずつ「流れ」出てくる理由です。そして、モデルが自信たっぷりに間違える理由でもあります。ずっと最適化しているのは「次の語として自然かどうか」であって、「その内容が正しいかどうか」ではないからです。「再生成」を押すと別の版が出るのも同じ理屈です。"
      },
      {
        "h": "よくある誤解",
        "p": "モデルは、答え全体を先に考えてから打ち出すのでも、巨大な FAQ を暗唱しているのでもありません。「大規模」とは、学習時に膨大な文章からこれらの確率を身につけたという意味で、答えをどこかに保存してあなたの照会を待っているわけではありません。答えはその場で、1単語ずつ育っていくのです。"
      }
    ]
  },
  "model-size": {
    "zh": [
      {
        "h": "參數是什麼",
        "p": "模型的「大小」指的是它裡面<b>參數（parameter）</b>的數量。參數就是網路裡每條連結的權重，也就是訓練時被反覆微調的數字。"
      },
      {
        "h": "為什麼越大越強",
        "p": "參數越多，模型能塞進去的規律就越細、越複雜，記得的知識也越多，因此通常更會推理、更少犯錯。"
      },
      {
        "h": "感受一下規模",
        "p": "GPT-3 有 1750 億個參數，如今主流模型從數十億到數千億不等。光把這些數字放進記憶體就得用好幾張高階顯卡，訓練一次也很燒錢。"
      },
      {
        "h": "更大不一定更划算",
        "p": "<b>縮放定律（scaling law）</b>指出：模型、資料、算力一起放大，能力會穩定提升。但越大也越貴、越慢，而且資料同樣關鍵。"
      },
      {
        "h": "常見誤解",
        "p": "「參數越多一定越聰明」是常見迷思。很多任務用小模型就夠，還更快更省；重點是模型和任務合不合拍，不是一味比大。"
      }
    ],
    "en": [
      {
        "h": "What a parameter is",
        "p": "A model's size means how many <b>parameters</b> it has. A parameter is the weight on one connection in the network, one of the numbers that training keeps nudging up and down."
      },
      {
        "h": "Why bigger tends to be stronger",
        "p": "More parameters let the model store finer, more complex patterns and more knowledge, so a larger model usually reasons better and makes fewer mistakes."
      },
      {
        "h": "A sense of the scale",
        "p": "GPT-3 has 175 billion parameters, and today's mainstream models range from a few billion to hundreds of billions. Just holding those numbers in memory takes several high-end GPUs, and one training run is very expensive."
      },
      {
        "h": "Bigger is not always worth it",
        "p": "<b>Scaling laws</b> say that growing the model, the data, and the compute together improves ability in a predictable way. But bigger also means slower and pricier, and the data matters just as much."
      },
      {
        "h": "A common misconception",
        "p": "The idea that more parameters always means smarter is a common myth. For many tasks a small model is enough, and it is faster and cheaper. What matters is fitting the model to the task, not just going big."
      }
    ],
    "ja": [
      {
        "h": "パラメータとは",
        "p": "モデルの「大きさ」とは、中にある<b>パラメータ（parameter）</b>の数のことです。パラメータはネットワーク内の一つ一つの結合の重みで、学習中に少しずつ調整される数値です。"
      },
      {
        "h": "なぜ大きいほど強いのか",
        "p": "パラメータが多いほど、モデルはより細かく複雑な規則や多くの知識を詰め込めます。そのため大きなモデルは推論が得意で、間違いも少なくなる傾向があります。"
      },
      {
        "h": "規模を体感する",
        "p": "GPT-3 のパラメータは 1750 億個で、今の主流モデルは数十億から数千億まで幅があります。この数値をメモリに載せるだけで高性能な GPU が何枚も必要で、一度の学習にも莫大な費用がかかります。"
      },
      {
        "h": "大きければ得とは限らない",
        "p": "<b>スケーリング則（scaling law）</b>によれば、モデル・データ・計算資源を一緒に増やすほど性能は着実に上がります。ただし大きいほど遅く高価になり、データの質と量も同じくらい重要です。"
      },
      {
        "h": "よくある誤解",
        "p": "「パラメータが多いほど賢い」は典型的な誤解です。多くの用途では小さなモデルで十分で、速くて安上がりです。大事なのはモデルと課題の相性で、ただ大きくすることではありません。"
      }
    ]
  },
  "model-knowledge": {
    "en": [
      {
        "h": "Knowledge is \"read\" in",
        "p": "A model's knowledge is not typed in one fact at a time. During <b>pretraining</b> it reads through enormous amounts of text and <b>compresses recurring patterns and facts into billions of parameters (weights)</b>. What it learns is \"which words tend to follow which,\" and along the way it also absorbs a great deal of common knowledge."
      },
      {
        "h": "It lives in parameters, not a database",
        "p": "This knowledge is <b>spread</b> across the weights of the whole network; no single cell explicitly says \"Paris is the capital of France.\" When answering, it rebuilds knowledge by <b>predicting the next word over and over</b>, which is more like \"speaking from impression\" than \"looking up a table.\" So it may be <b>incomplete or simply wrong</b>, and it can still sound very confident."
      },
      {
        "h": "Knowledge has a cutoff",
        "p": "Once training stops, knowledge <b>freezes</b> at that moment, which is called the <b>knowledge cutoff</b>. Anything that happens after the cutoff, along with your company's internal or personal <b>private data</b>, is something the model has never read, so of course it does not know it. Asking it about the \"latest\" news and believing every word is an easy way to get burned."
      },
      {
        "h": "How to fill the gaps",
        "p": "There are three ways to let a model use knowledge it does not already have: <b>①</b> paste it straight <b>into the context</b> (put the data into the prompt: fastest for a one-off); <b>②</b> <b>RAG</b>, which retrieves from an external knowledge base in real time and can even cite sources, ideal for facts that change often or are private; <b>③</b> <b>fine-tuning</b>, which writes tone, format, and workflow into the weights, but is <b>not suited for loading in facts</b>."
      },
      {
        "h": "Common misconceptions",
        "p": "Do not assume \"the model is smart, so it knows everything.\" What it knows is <b>what is common in the training data</b>; niche, recent, or private content is often a blank. And do not count on <b>fine-tuning</b> to cram in the latest facts and make them stick. For facts that keep changing, <b>RAG is more reliable</b>."
      }
    ],
    "ja": [
      {
        "h": "知識は「読んで」身につく",
        "p": "モデルの知識は、誰かが一つずつ入力したものではありません。<b>事前学習</b>のときに膨大なテキストを読ませ、繰り返し現れる規則性や事実を<b>数十億個のパラメータ（重み）に圧縮</b>します。学ぶのは「ある単語の後にどんな単語が続きやすいか」であり、そのついでに大量の一般常識も覚えていきます。"
      },
      {
        "h": "パラメータの中にあり、データベースではない",
        "p": "こうした知識はネットワーク全体の重みに<b>分散</b>しており、「パリはフランスの首都」とはっきり書かれたマスは一つもありません。回答するときは<b>次の単語を一つずつつなげて</b>知識を再構築するので、「表を引く」というより「印象で語る」に近く、そのため<b>抜けたり、間違えたり</b>することがあり、しかも自信たっぷりに話します。"
      },
      {
        "h": "知識には締め切りがある",
        "p": "学習が止まると、知識はその時点で<b>凍結</b>します。これを<b>知識の締め切り（knowledge cutoff）</b>と呼びます。締め切り後に起きた出来事や、あなたの会社内部・個人の<b>非公開データ</b>は、モデルが一度も読んでいないので当然知りません。「最新」の話を尋ねて丸ごと信じると、地雷を踏みやすくなります。"
      },
      {
        "h": "足りないとき、どう補うか",
        "p": "モデルに、もともと知らない知識を使わせる道は三つあります：<b>①</b>そのまま<b>コンテキストに貼る</b>（データを prompt に入れる：一回きりなら最速）；<b>②</b><b>RAG</b>、外部の知識ベースからリアルタイムに検索し、出典も付けられる。頻繁に変わる事実や非公開の事実に向く；<b>③</b><b>ファインチューニング</b>、口調・書式・手順を重みに書き込むが、<b>事実を詰め込む用途には向かない</b>。"
      },
      {
        "h": "よくある誤解",
        "p": "「モデルは賢いから何でも知っている」と思い込まないでください。知っているのは<b>学習データの中でありふれたこと</b>であり、マイナー・最新・非公開の内容はしばしば空白です。また<b>ファインチューニング</b>で最新の事実を詰め込んでしっかり覚えさせようと期待しないこと。変動する事実につなぐなら、<b>RAG のほうが信頼できます</b>。"
      }
    ],
    "zh": [
      {
        "h": "知識是「讀」出來的",
        "p": "模型的知識不是有人一條條輸入的，而是在<b>預訓練</b>時讓它讀過海量文字，把反覆出現的規律和事實<b>壓進幾十億個參數（權重）</b>裡。它學的是「什麼字後面常接什麼」，順帶把大量常識也記了下來。"
      },
      {
        "h": "存在參數裡，不是資料庫",
        "p": "這些知識<b>分散</b>在整個網路的權重中，沒有一格明確寫著「巴黎是法國首都」。回答時它靠<b>一路接下一個字</b>把知識重建出來，比較像「憑印象說」而不是「查表」，所以可能<b>記不全、也可能記錯</b>，還會講得很有信心。"
      },
      {
        "h": "知識有截止日",
        "p": "訓練一停，知識就<b>凍結</b>在那個時間點，稱為<b>知識截止日（knowledge cutoff）</b>。截止日之後發生的事，以及你公司內部或個人的<b>私有資料</b>，模型從沒讀過，自然不知道。問它「最新」的事還全信，很容易踩雷。"
      },
      {
        "h": "不夠時，怎麼補",
        "p": "要讓模型用它本來不知道的知識有三條路：<b>①</b>直接<b>貼進上下文</b>（把資料放進 prompt，一次性最快）；<b>②</b><b>RAG</b>，從外部知識庫即時檢索、還能附來源，適合常變動或私有的事實；<b>③</b><b>微調</b>，把語氣、格式、流程寫進權重，但<b>不適合用來灌事實</b>。"
      },
      {
        "h": "常見誤解",
        "p": "別以為「模型很聰明所以什麼都知道」。它知道的是<b>訓練資料裡的常態</b>，冷門、最新、私有的內容常常是空白。也別指望<b>微調</b>把最新事實塞進去記牢，要接會變動的事實，<b>RAG 更可靠</b>。"
      }
    ]
  },
  "context-window": {
    "zh": [
      {
        "h": "什麼是上下文視窗",
        "p": "模型一次能讀進的內容有上限，這個上限叫<b>上下文視窗（context window）</b>，以 token 計算。你的提問、貼上的文件、加上它的回答，都要擠進這個視窗。"
      },
      {
        "h": "超過上限會怎樣",
        "p": "一旦超過上限，系統會做<b>截斷（truncation）</b>，把最早的內容丟掉來塞進新的。所以長對話裡模型會「忘記」開頭，是舊內容被擠出去了。"
      },
      {
        "h": "感受一下數字",
        "p": "早期 GPT-3.5 約 4 千 token，如今主流模型多在 12.8 萬 token 上下，有些甚至到 100 萬 token，相當於好幾本書。"
      },
      {
        "h": "為什麼你該在意",
        "p": "視窗越大，就能一次讀進整份合約或整個專案再回答；但 token 越多，速度越慢、費用越高，全部貼進去不一定最好。"
      },
      {
        "h": "常見誤解",
        "p": "視窗大不等於「永久記得」。內容被擠出視窗、或關掉對話後，模型就再也看不到，長期記憶得靠外部另存。"
      }
    ],
    "en": [
      {
        "h": "What the context window is",
        "p": "There is a limit on how much a model can read at once, and that limit is called the <b>context window</b>, measured in tokens. Your question, any files you paste, and the model's own reply all have to fit inside it."
      },
      {
        "h": "What happens when you exceed it",
        "p": "Once the content goes over the limit, the system does <b>truncation</b>: it drops the oldest part to make room for new text. That is why, in a long chat, the model seems to forget the beginning; the old content was pushed out."
      },
      {
        "h": "A sense of the numbers",
        "p": "Early GPT-3.5 held about 4 thousand tokens. Today's mainstream models usually sit around 128 thousand, and some reach a million tokens, roughly several books at once."
      },
      {
        "h": "Why you should care",
        "p": "A larger window lets the model read a whole contract or an entire project before answering. But more tokens mean slower and pricier responses, so pasting everything in is not always best."
      },
      {
        "h": "A common misconception",
        "p": "A big window does not mean the model remembers forever. Once content is pushed out of the window, or you close the chat, the model can no longer see it, so lasting memory has to be stored outside."
      }
    ],
    "ja": [
      {
        "h": "コンテキストウィンドウとは",
        "p": "モデルが一度に読み込める量には上限があり、これを<b>コンテキストウィンドウ（context window）</b>と呼び、token 単位で数えます。あなたの質問、貼り付けた文書、モデル自身の返答が、すべてこの中に収まる必要があります。"
      },
      {
        "h": "上限を超えるとどうなるか",
        "p": "内容が上限を超えると、システムは<b>切り捨て（truncation）</b>を行い、古い部分を捨てて新しい文を入れます。だから長い会話では最初の話を「忘れた」ように見えますが、古い内容が押し出されただけです。"
      },
      {
        "h": "数字を体感する",
        "p": "初期の GPT-3.5 は約 4 千 token でした。今の主流モデルはおおむね 12.8 万 token 前後で、100 万 token に達するものもあり、本を数冊まとめて読む量に相当します。"
      },
      {
        "h": "なぜ気にすべきか",
        "p": "ウィンドウが大きいほど、契約書一式やプロジェクト全体を一度に読んでから答えられます。ただし token が増えるほど遅く高価になるので、全部貼れば良いとは限りません。"
      },
      {
        "h": "よくある誤解",
        "p": "ウィンドウが大きくても「ずっと覚えている」わけではありません。内容がウィンドウから押し出されたり、会話を閉じたりすると、モデルはもう見られません。長期の記憶は外部に保存する必要があります。"
      }
    ]
  },
  "inference": {
    "zh": [
      {
        "h": "什麼是推論",
        "p": "模型的一生分兩段：<b>訓練</b>是學規則，很慢、通常只做一次；<b>推論（inference）</b>是把學好的模型拿來用，對每個新輸入算出答案，快又要重複做。"
      },
      {
        "h": "推論時發生什麼",
        "p": "推論時權重全部固定、不再改動，模型只是把你的輸入跑過一遍網路，一個 token 接一個產生回答，所以不會在對話中「學到」新東西。"
      },
      {
        "h": "你每次對話都是推論",
        "p": "你每按一次送出、每讓 AI 生一張圖，都是一次推論。訓練一個模型可能花好幾個月，一次推論卻只要幾秒。"
      },
      {
        "h": "為什麼你該在意",
        "p": "每次推論都要動用昂貴的 GPU，於是有兩個代價：<b>延遲（latency）</b>，你要等多久才看到字；以及成本，每個 token 都在花錢。回答越長，兩者越高。"
      },
      {
        "h": "常見誤解",
        "p": "別以為「多聊它就會越懂我」。推論時模型不會被改動，對話不會更新它的權重；它記住你是靠把資訊塞回輸入，不是靠學習。"
      }
    ],
    "en": [
      {
        "h": "What inference is",
        "p": "A model's life has two phases. <b>Training</b> is learning the rules: slow, and usually done once. <b>Inference</b> is putting the trained model to work, computing an answer for each new input: fast, and done again and again."
      },
      {
        "h": "What happens during inference",
        "p": "During inference the weights are frozen and never change. The model simply runs your input through the network once and produces the reply one token at a time, so it does not learn anything new during a chat."
      },
      {
        "h": "Every chat is an inference",
        "p": "Every time you hit send, and every time you have an AI make an image, that is one inference. Training a model can take months, while a single inference has to finish in seconds."
      },
      {
        "h": "Why you should care",
        "p": "Each inference uses expensive GPU power, which brings two costs: <b>latency</b>, how long you wait to see text, and money, since every token costs something. The longer the answer, the higher both go."
      },
      {
        "h": "A common misconception",
        "p": "Do not assume that the more you chat, the more it learns about you. During inference the model is never changed and your chat does not update its weights. It remembers you by feeding the information back into the input, not by learning."
      }
    ],
    "ja": [
      {
        "h": "推論とは",
        "p": "モデルの一生は二段階です。<b>訓練（training）</b>は規則を学ぶ段階で、遅く、普通は一度だけ行います。<b>推論（inference）</b>は学び終えたモデルを使う段階で、新しい入力ごとに答えを計算し、速く、何度も繰り返します。"
      },
      {
        "h": "推論中に起きること",
        "p": "推論中は重みがすべて固定され、変わりません。モデルはあなたの入力をネットワークに一度通し、token を一つずつ出して返答を作るだけです。だから会話の中で新しいことを「学ぶ」わけではありません。"
      },
      {
        "h": "会話は毎回が推論",
        "p": "送信を押すたび、AI に画像を作らせるたびに、裏では一回の推論が走っています。モデルの訓練は数か月かかることもありますが、一回の推論は数秒で終える必要があります。"
      },
      {
        "h": "なぜ気にすべきか",
        "p": "推論のたびに高価な GPU を使うため、二つのコストが生じます。<b>レイテンシ（latency）</b>、つまり文字が見えるまでの待ち時間と、token ごとにかかるお金です。返答が長いほど、どちらも大きくなります。"
      },
      {
        "h": "よくある誤解",
        "p": "「たくさん話せば自分をどんどん理解してくれる」と思わないでください。推論中モデルは一切変わらず、会話が重みを更新することはありません。あなたを覚えているのは情報を入力に戻しているからで、学習ではありません。"
      }
    ]
  },
  "pretraining": {
    "zh": [
      {
        "h": "第一步：預訓練",
        "p": "每個像 ChatGPT 的模型，第一步都是<b>預訓練（pretraining）</b>：讀進海量文字（大半個公開網路加上大量書籍），唯一任務就是猜下一個 token。"
      },
      {
        "h": "它怎麼學會語言",
        "p": "這叫自監督：不必人工標答案，因為正解就是原文的下一個字。反覆猜上兆次、不斷被糾正，模型就把語法、常識、風格甚至推理都學進權重。"
      },
      {
        "h": "感受一下規模",
        "p": "這階段規模驚人：訓練資料常達數兆個 token，要在上千張 GPU 上跑好幾週，花費可達數百萬甚至上千萬美元。"
      },
      {
        "h": "練出來的是基礎模型",
        "p": "成果是<b>基礎模型（base model）</b>：知識淵博，卻只會「接話」。你問它問題，它可能繼續多列幾個問題，而不是回答，因為它還沒學會當個聽話的助理。"
      },
      {
        "h": "所以還不是 ChatGPT",
        "p": "所以「模型」還不等於 ChatGPT：要它照指令好好回話，得再經過下一步調教（見下章）。而且它的知識停在訓練資料截止日，之後的事並不知道。"
      }
    ],
    "en": [
      {
        "h": "Step one: pretraining",
        "p": "Every model like ChatGPT starts with <b>pretraining</b>: it reads a huge amount of text (much of the public internet plus many books), with a single task, to guess the next token."
      },
      {
        "h": "How it learns language",
        "p": "This is self-supervised: no human has to label the answers, because the correct answer is simply the next word in the text. By guessing trillions of times and being corrected each time, the model is forced to bake grammar, facts, style, and even reasoning into its weights."
      },
      {
        "h": "A sense of the scale",
        "p": "The scale is staggering: the training data often reaches trillions of tokens, it runs for weeks on thousands of GPUs, and the cost can reach millions or even tens of millions of dollars."
      },
      {
        "h": "The result is a base model",
        "p": "What you get is a <b>base model</b>: rich in knowledge, but it only continues text. Ask it a question and it might keep listing more questions instead of answering, because it has not yet learned to be an obedient assistant."
      },
      {
        "h": "So it is not ChatGPT yet",
        "p": "A raw model is not ChatGPT yet. To make it follow instructions and answer properly, it needs the next step of training (see the next chapter). Its knowledge also stops at the training cutoff date, so it does not know what happened after."
      }
    ],
    "ja": [
      {
        "h": "第一段階：事前学習",
        "p": "ChatGPT のようなモデルは、まず<b>事前学習（pretraining）</b>から始まります。膨大な文章（公開ウェブの大部分と多数の書籍）を読み込み、唯一の課題は次の token を当てることです。"
      },
      {
        "h": "どうやって言語を覚えるか",
        "p": "これは自己教師あり学習です。正解は原文の次の単語そのものなので、人が答えを付ける必要はありません。何兆回も予測しては訂正されるうちに、モデルは文法・常識・文体、さらには推論まで重みに刻み込みます。"
      },
      {
        "h": "規模を体感する",
        "p": "規模は桁違いです。学習データはしばしば数兆 token に達し、数千枚の GPU で何週間も回し、費用は数百万から数千万ドルに及ぶこともあります。"
      },
      {
        "h": "できあがるのは基盤モデル",
        "p": "できあがるのは<b>基盤モデル（base model）</b>です。知識は豊富ですが、文章を「続ける」ことしかできません。質問しても答えず、さらに質問を並べ続けることもあります。まだ従順なアシスタントになる訓練を受けていないからです。"
      },
      {
        "h": "だからまだ ChatGPT ではない",
        "p": "素のモデルはまだ ChatGPT ではありません。指示に従ってきちんと答えさせるには、次の段階の調整が必要です（次章）。知識も学習データの締め切りで止まっており、それ以降の出来事は知りません。"
      }
    ]
  },
  "fine-tuning": {
    "zh": [
      {
        "h": "什麼是微調",
        "p": "上一章的基礎模型知識淵博卻不聽話。<b>微調（fine-tuning）</b>就是在既有模型上再做一輪較小的訓練，把它從「會接話」變成「會幫忙」。"
      },
      {
        "h": "第一步：指令微調",
        "p": "先做<b>指令微調（SFT）</b>：拿人類寫的大量「問題加理想回答」範例餵給它，讓它學會被問就給出直接、有用的答案，而不是繼續接話。"
      },
      {
        "h": "第二步：RLHF",
        "p": "再做<b>RLHF（人類回饋強化學習）</b>：讓人替同一問題的多個答案排名，訓練出一個偏好模型，再用它把主模型推向人更喜歡的答法，更有用也更安全。"
      },
      {
        "h": "為什麼你該在意",
        "p": "ChatGPT 會有禮貌、會拒絕危險要求、照格式回答，多半靠這一步，不是靠原始知識。微調用的資料和算力也比預訓練少很多。"
      },
      {
        "h": "常見誤解",
        "p": "微調主要是調「行為和語氣」，比較不適合用來灌入新知識。想讓模型掌握最新或私有資料，靠外部檢索（RAG）更可靠，別指望微調把事實記牢。"
      }
    ],
    "en": [
      {
        "h": "What fine-tuning is",
        "p": "The base model from the last chapter knows a lot but does not obey. <b>Fine-tuning</b> is a smaller, second round of training on that existing model, turning it from continuing text into actually helping."
      },
      {
        "h": "Step one: instruction tuning",
        "p": "First comes <b>supervised fine-tuning (SFT)</b>: the model is fed many human-written examples of a question paired with an ideal answer, so it learns that when asked, it should give a direct, useful reply instead of continuing the text."
      },
      {
        "h": "Step two: RLHF",
        "p": "Next is <b>RLHF (reinforcement learning from human feedback)</b>: people rank several answers to the same question, that trains a preference model, and it nudges the main model toward the answers humans prefer, making it more useful and safer."
      },
      {
        "h": "Why you should care",
        "p": "The reason ChatGPT is polite, refuses dangerous requests, and answers in the format you asked for is mostly this step, not its raw knowledge. And fine-tuning uses far less data and compute than pretraining."
      },
      {
        "h": "A common misconception",
        "p": "Fine-tuning mainly adjusts behavior and tone, and is not the reliable way to add new knowledge. To give a model fresh or private information, external retrieval (RAG) is usually more reliable, so do not expect fine-tuning to memorize facts."
      }
    ],
    "ja": [
      {
        "h": "ファインチューニングとは",
        "p": "前章の基盤モデルは知識豊富でも指示に従いません。<b>ファインチューニング（fine-tuning）</b>は、その既存モデルにもう一度小規模な学習を加え、「文章を続ける」だけの状態から「実際に役立つ」状態へ調整することです。"
      },
      {
        "h": "第一段階：指示チューニング",
        "p": "まず<b>教師ありファインチューニング（SFT）</b>を行います。人が書いた「質問と理想的な回答」の例を大量に与え、問われたら文章を続けるのではなく、直接で有用な答えを返すことを学ばせます。"
      },
      {
        "h": "第二段階：RLHF",
        "p": "次に<b>RLHF（人間のフィードバックによる強化学習）</b>を行います。同じ質問への複数の回答に人が順位を付け、そこから好みを表すモデルを作り、それを使って本体モデルを人が好む答え方へ導き、より有用で安全にします。"
      },
      {
        "h": "なぜ気にすべきか",
        "p": "ChatGPT が礼儀正しく、危険な依頼を断り、指定した形式で答えるのは、多くがこの段階のおかげで、元の知識のおかげではありません。しかもファインチューニングは事前学習よりデータも計算資源もはるかに少なくて済みます。"
      },
      {
        "h": "よくある誤解",
        "p": "ファインチューニングが主に調整するのは「振る舞いや口調」であり、新しい知識を入れる用途にはあまり向きません。最新情報や社内情報を扱わせたいなら、外部検索（RAG）のほうが信頼でき、事実の暗記を期待すべきではありません。"
      }
    ]
  },
  "reasoning": {
    "en": [
      {
        "h": "Think First, Then Answer",
        "p": "A standard LLM starts spitting out its answer word by word the moment it finishes reading the question, with no step where it first 'works things out on scratch paper'. On hard problems like math or multi-step reasoning, this is often exactly where it goes wrong: it is already talking before it has thought things through."
      },
      {
        "h": "CoT: A Prompting Technique",
        "p": "Early on, people found that simply adding a line like 'think step by step' to the prompt, getting the model to first write out a <b>Chain of Thought</b> and lay its reasoning out in the open, clearly raised accuracy, because a hard problem gets broken into a series of easier little steps. But keep in mind: CoT is <b>a prompt technique</b>. It relies on you asking for it in your input; the model itself has not changed."
      },
      {
        "h": "Reasoning Models: Training the Thinking In",
        "p": "A new generation of <b>reasoning models</b> (such as o1) goes a step further: they use <b>post-training (reinforcement learning)</b> to build 'think long first, then answer' directly into the model itself. It produces a long stretch of internal thinking, checks, backtracks, tries different paths, and only then gives an answer, so you no longer have to teach it to think step by step. The difference is this: <b>CoT relies on prompting, reasoning models rely on training</b>."
      },
      {
        "h": "Trading Compute for Accuracy",
        "p": "At its core this is not 'smarter magic' but a trade-off: <b>test-time compute</b>. The longer it thinks (the more thinking token it generates), the slower and more expensive it gets, but the better it does on hard problems. Simple questions do not need long thinking; thinking long there just wastes time and money. <b>Only hard problems are worth</b> spending compute to buy those few points of accuracy."
      },
      {
        "h": "Common Misconceptions",
        "p": "Two things to remember. First, it is <b>not getting smarter</b>; it just spends more compute to think a few more steps, and it will still make mistakes and hallucinate. Second, the 'thinking process' it prints out is <b>not necessarily its real internal computation</b>; it is more like an after-the-fact explanation shown to you, so do not treat it as a reliable explanation or basis for audit. And you should not use it on every problem: for everyday tasks a standard model is both fast and good enough."
      }
    ],
    "ja": [
      {
        "h": "考えてから答える",
        "p": "通常の LLM は問題を読み終えるとすぐ一語ずつ答えを吐き出し始め、途中に「まず紙の上で計算する」というステップがない。数学や多段の推論といった難問では、たいていここで間違える。考えがまとまる前に、もう話し始めているのだ。"
      },
      {
        "h": "CoT：ひとつのプロンプト技法",
        "p": "初期に人々は、プロンプトに「一歩ずつ考えて」と一言加え、モデルにまず<b>思考の連鎖（Chain of Thought）</b>を書き出させて推論の過程を表に出させるだけで、正答率がはっきり上がることに気づいた。難問が一連のやさしい小さなステップに分解されるからだ。ただし覚えておきたい。CoT は<b>ひとつの prompt の技法</b>で、入力時にあなたがそう求めることに頼っており、モデル自体は変わっていない。"
      },
      {
        "h": "推論モデル：「考える力」を組み込む",
        "p": "新世代の<b>推論モデル</b>（o1 など）はさらに一歩進む。<b>後訓練（強化学習）</b>によって「まず長く考えてから答える」をモデル自体に直接組み込むのだ。まず長い内部思考を生成し、確認し、戻り、異なる経路を試して、最後に答えを出す。もう一歩ずつ考えるよう教える必要はない。違いはここにある。<b>CoT はプロンプトに頼り、推論モデルは訓練に頼る</b>。"
      },
      {
        "h": "計算で正確さを買う",
        "p": "その本質は「より賢い魔法」ではなく、ひとつの取捨だ。<b>test-time compute（推論時の計算）</b>である。長く考えるほど（思考の token を多く生成するほど）遅く、高コストになるが、難問はより良く解ける。簡単な問題に長考は要らず、そこで長く考えても時間とコストを無駄にするだけだ。<b>難問だけが</b>、計算を使って数ポイントの正確さを買う価値がある。"
      },
      {
        "h": "よくある誤解",
        "p": "二点を覚えておきたい。ひとつ、それは<b>賢くなっているわけではない</b>。ただより多くの計算を使って数ステップ多く考えるだけで、依然として間違えるし幻覚も起こす。ふたつ、印字される「思考過程」は<b>必ずしもその本当の内部計算ではない</b>。むしろ事後にあなたへ見せる説明に近いので、信頼できる説明や監査の根拠にしてはいけない。そして毎回それを使うべきでもない。日常のタスクなら通常のモデルが速くて十分だ。"
      }
    ],
    "zh": [
      {
        "h": "先想再答",
        "p": "一般 LLM 讀完題目就開始一個字一個字吐答案，中間沒有「先在草稿紙上算」的步驟。碰到數學、多步推理這種難題，常常就錯在這：它還沒想清楚，就已經在講了。"
      },
      {
        "h": "CoT：一種提示技巧",
        "p": "早期大家發現，只要在提示裡加一句「一步步想」，讓模型先寫出<b>思維鏈（Chain of Thought）</b>、把推理過程攤開，答對率就明顯上升，因為難題被拆成一連串比較容易的小步。但要記住：CoT 是<b>一種 prompt 技巧</b>，靠你在輸入時要求它這麼做，模型本身沒有改變。"
      },
      {
        "h": "推理模型：把「會想」練進去",
        "p": "新一代<b>推理模型</b>（如 o1）更進一步：用<b>後訓練（強化學習）</b>把「先長考、再作答」直接練進模型本身。它會先產生一大段內部思考，檢查、回頭、嘗試不同路徑，最後才給答案，你不用再教它一步步想。差別就在：<b>CoT 靠提示，推理模型靠訓練</b>。"
      },
      {
        "h": "用算力換正確率",
        "p": "它的本質不是「更聰明的魔法」，而是一個取捨：<b>test-time compute（推論期算力）</b>。想越久（生成越多思考 token）就越慢、越貴，但難題答得越好。簡單問題不需要長考，長考只是白花時間與成本；<b>難問題才值得</b>用算力換那幾分正確率。"
      },
      {
        "h": "常見誤解",
        "p": "兩點要記住：一，它<b>不是變聰明</b>，只是花更多算力多想幾步，仍會錯、會幻覺；二，它印出來的那段「思考過程」<b>不一定是它真正的內部計算</b>，比較像事後給你看的說明，別當成可靠的解釋或稽核依據。也不是每題都該用它，日常任務一般模型又快又夠好。"
      }
    ]
  },
  "prompt": {
    "zh": [
      {
        "h": "什麼是提示",
        "p": "你打進去的每句話就是一個 <b>prompt</b>（提示）：給模型的輸入指令。模型不會讀心，眼裡只有你給的文字，所以你怎麼寫，幾乎決定它怎麼答。"
      },
      {
        "h": "提示是預測的起點",
        "p": "模型會根據前面的文字接下一個字，而提示就是這段前文。把脈絡、角色、想要的輸出格式寫清楚，等於幫它縮小接下來的方向，答案自然更準。"
      },
      {
        "h": "給例子最有效",
        "p": "與其空講「幫我分類」，不如附上兩三組「輸入→輸出」，這叫 <b>few-shot</b>（少樣本）。模型照著範例做，格式和語氣都會穩定得多。"
      },
      {
        "h": "為什麼你該在意",
        "p": "這就是為什麼同一問題換個問法，結果天差地遠。在 ChatGPT 裡加一句「一步一步想」、指定角色或要求表格，品質常常立刻不同。"
      },
      {
        "h": "常見誤解",
        "p": "最常見的誤會是以為講得越長、越客氣答案越好。與其講得客氣，不如講得清楚：模型不會猜你沒說出口的意思；真正有用的是清楚、具體、有結構。"
      }
    ],
    "en": [
      {
        "h": "What a prompt is",
        "p": "Every line you type in is a <b>prompt</b>: the input instruction you give the model. The model cannot read your mind; all it sees is the text you provide, so how you write it largely decides how it answers."
      },
      {
        "h": "The prompt is the starting point for prediction",
        "p": "The model produces text by predicting the next token from what comes before, and your prompt is that lead-in. Spelling out the context, the role you want it to play, and the output format you need narrows down where it goes next, so the answer comes out sharper."
      },
      {
        "h": "Examples work best",
        "p": "Instead of vaguely saying \"sort this for me,\" add two or three pairs of \"input to output\" right in the prompt. This is called <b>few-shot</b> prompting. The model copies the examples, and its format and tone become far more consistent than a long list of rules."
      },
      {
        "h": "Why it matters",
        "p": "This is why the same question, phrased differently, gives wildly different results. In ChatGPT, adding \"think step by step,\" assigning a role, or asking for a table often changes the quality instantly. Writing good prompts is the cheapest way to get more out of AI."
      },
      {
        "h": "A common misconception",
        "p": "The most common myth is that longer or more polite prompts get better answers. Being clear matters far more than being polite, and the model will not guess what you left unsaid. What actually helps is being clear, specific, and structured."
      }
    ],
    "ja": [
      {
        "h": "プロンプトとは",
        "p": "あなたが打ち込む一文一文が <b>prompt</b>（プロンプト）、つまりモデルへの入力指示です。モデルは心を読めず、見えているのはあなたが渡したテキストだけ。だから書き方がほぼそのまま答え方を決めます。"
      },
      {
        "h": "プロンプトは予測の出発点",
        "p": "モデルは前にある文章から次のトークンを予測して文を作ります。プロンプトはその「前文」です。文脈、演じてほしい役割、欲しい出力形式まで書くと、次に進む方向が絞られ、答えは自然と的確になります。"
      },
      {
        "h": "例を見せるのが一番効く",
        "p": "「分類して」と漠然と言うより、「入力→出力」の組を二、三個プロンプトに添えましょう。これを <b>few-shot</b>（少数例）と呼びます。モデルは例をまねするので、形式や口調が長い説明よりずっと安定します。"
      },
      {
        "h": "なぜ大切か",
        "p": "同じ質問でも聞き方を変えると結果が大きく変わるのはこのためです。ChatGPT で「順を追って考えて」と足す、役割を指定する、表で出してと頼むだけで、品質がすぐ変わります。プロンプト上達は AI 活用の一番手軽な一歩です。"
      },
      {
        "h": "よくある誤解",
        "p": "最もよくある誤解は、長く丁寧に書くほど良い答えが返るという思い込みです。丁寧さより明確さのほうがずっと大切で、モデルは言わなかった意図を汲みません。効くのは明確さ、具体性、そして構造です。"
      }
    ]
  },
  "generative": {
    "zh": [
      {
        "h": "AI 畫圖是什麼",
        "p": "AI 畫圖的主流方法叫 <b>Diffusion</b>（擴散模型），訓練點子很反直覺：先拿大量真實圖片，一步步加上雜訊，直到整張變成純雜訊。"
      },
      {
        "h": "學會反過來還原",
        "p": "模型真正學的是這個過程的倒帶：看著有雜訊的圖，去猜原本乾淨的樣子。學會後，就能從一張純雜訊開始，一步步 <b>去噪</b>，還原出清晰的新圖。"
      },
      {
        "h": "要跑很多步",
        "p": "去噪不是一次到位，而是重複很多次。早期模型常要跑上千步，後來優化到幾十步就能出圖，每一步都把畫面修得更清楚一點。"
      },
      {
        "h": "文字提示怎麼引導",
        "p": "你打的文字提示，作用是在每一步告訴模型「該往哪個方向修」。同一片雜訊配上不同描述，就會被導向貓、狗或風景，這就是文字生圖的關鍵。"
      },
      {
        "h": "常見誤解",
        "p": "常見誤會是以為 AI 像人一樣憑空畫出一張圖。其實它不是從白紙下筆，而是從雜訊裡逐步清理出圖，比較像把模糊慢慢對焦成畫面。"
      }
    ],
    "en": [
      {
        "h": "What generative image AI is",
        "p": "The mainstream method AI uses to draw is called <b>Diffusion</b>. Its training idea is counterintuitive: take a huge set of real images and add noise step by step, until each picture turns into pure static."
      },
      {
        "h": "Learning to run it in reverse",
        "p": "What the model actually learns is the rewind of that process: looking at a noisy image and guessing the clean version behind it. Once trained, it can start from pure noise and, step by step, <b>denoise</b> its way to a clear new image."
      },
      {
        "h": "It takes many steps",
        "p": "This denoising is not done in one shot but repeated many times. Early models often needed thousands of steps; later ones were tuned down to a few dozen. Each step cleans the picture up a little more."
      },
      {
        "h": "How the text prompt steers it",
        "p": "Your text prompt tells the model, at every step, which direction to clean toward. The same patch of noise, given different descriptions, gets steered into a cat, a dog, or a landscape. That is the key to text to image generation."
      },
      {
        "h": "A common misconception",
        "p": "A common myth is that the AI paints a picture out of thin air, like a person. It does not start from a blank page; it gradually cleans an image out of noise, more like bringing a blur slowly into focus."
      }
    ],
    "ja": [
      {
        "h": "生成AIの作画とは",
        "p": "AI が絵を描く主流の方法は <b>Diffusion</b>（拡散モデル）と呼ばれます。学習のアイデアは直感に反します。まず大量の本物の画像に少しずつノイズを足し、絵をどんどんぼかして、最後は一面のノイズにしてしまいます。"
      },
      {
        "h": "逆再生を学ぶ",
        "p": "モデルが本当に学ぶのは、この過程の「巻き戻し」です。ノイズの乗った画像を見て、元のきれいな姿を推測します。覚えたら、純粋なノイズから始めて一歩ずつ <b>ノイズ除去</b>し、鮮明な新しい絵を復元できます。"
      },
      {
        "h": "何ステップも必要",
        "p": "このノイズ除去は一発では終わらず、何度も繰り返します。初期のモデルは千ステップ以上必要でしたが、後の改良で数十ステップまで減りました。各ステップで画面が少しずつ鮮明になります。"
      },
      {
        "h": "テキストの指示がどう導くか",
        "p": "あなたが打つテキストの指示は、各ステップで「どの方向に整えるか」をモデルに伝えます。同じノイズでも説明が違えば、猫にも犬にも風景にも導かれます。これがテキストから画像を生む鍵です。"
      },
      {
        "h": "よくある誤解",
        "p": "よくある誤解は、AI が人のように無から絵を描くという思い込みです。白紙から描き始めるのではなく、ノイズの中から少しずつ画像を「掃除」して取り出す。ぼやけを少しずつピントに合わせる感覚に近いのです。"
      }
    ]
  },
  "multimodal": {
    "zh": [
      {
        "h": "多模態是什麼",
        "p": "<b>多模態</b>（Multimodal）指的是一個模型能同時處理好幾種資料型態：文字、圖片、聲音，甚至影片。每一種型態就叫一個 <b>modality</b>（模態）。"
      },
      {
        "h": "共用一個意義空間",
        "p": "訣竅是把每種型態都編碼成同一種意義向量。不管是「貓」這個字或一張貓的照片，都落在意義空間裡相近的位置，文字和影像因此像同一種語言。"
      },
      {
        "h": "具體例子",
        "p": "所以你可以拍冰箱照片問「能做什麼菜」，模型看懂畫面再用文字回答；GPT-4o 這類模型就是同時吃文字和影像的例子。"
      },
      {
        "h": "為什麼你該在意",
        "p": "有了共用空間，型態之間就能自由轉換：看圖說話、聽聲寫字幕、文字生圖都行。這也是為什麼現在的 AI 助理不只會聊天，還能「看」你上傳的東西。"
      },
      {
        "h": "常見誤解",
        "p": "常見誤會是把多模態想成幾個各管一種的模型硬湊在一起。常見的做法是讓不同型態對應到相近的表示，模型才能把圖和字對起來，而不是各說各話。"
      }
    ],
    "en": [
      {
        "h": "What multimodal means",
        "p": "<b>Multimodal</b> means one model can handle several kinds of data at once: text, images, sound, even video. Each of these kinds is called a <b>modality</b>."
      },
      {
        "h": "One shared space of meaning",
        "p": "The trick is to turn every modality into the same kind of number vector. Whether the input is the word for cat or a photo of a cat, both get encoded to nearby spots in a space of meaning, so text and images end up speaking one language."
      },
      {
        "h": "A concrete example",
        "p": "So you can snap a photo of your fridge and ask \"what can I cook,\" and the model reads the picture and answers in words. Models like GPT-4o are exactly this kind, taking in text and images together."
      },
      {
        "h": "Why it matters",
        "p": "With a shared space, you can move freely between modalities: describe an image, caption a sound, generate a picture from text. This is why today's AI assistants no longer just chat but can also \"see\" what you upload."
      },
      {
        "h": "A common misconception",
        "p": "A common myth is that multimodal just means bolting together several single purpose models. A common approach is to map different modalities to nearby representations, so the model can truly line up an image with words instead of talking past each other."
      }
    ],
    "ja": [
      {
        "h": "マルチモーダルとは",
        "p": "<b>マルチモーダル</b>（Multimodal）とは、一つのモデルがテキスト、画像、音声、さらには動画まで、何種類ものデータを同時に扱えることです。この一つ一つの種類を <b>モダリティ</b>（modality）と呼びます。"
      },
      {
        "h": "意味を共有する一つの空間",
        "p": "コツは、どの種類も同じ数字ベクトルに変えることです。入力が「猫」という文字でも猫の写真でも、意味の空間の近い位置に符号化されます。こうして文字と画像が一つの言語のようになります。"
      },
      {
        "h": "具体例",
        "p": "だから冷蔵庫の写真を撮って「何が作れる」と聞けば、モデルは画面を読み取り言葉で答えます。GPT-4o のようなモデルは、まさに文字と画像を同時に受け取る例です。"
      },
      {
        "h": "なぜ大切か",
        "p": "共有の空間があれば、種類の間を自由に行き来できます。画像を説明する、音に字幕をつける、文字から絵を生む、どれも可能です。だから今の AI アシスタントは会話だけでなく、あなたがアップした物を「見る」こともできます。"
      },
      {
        "h": "よくある誤解",
        "p": "よくある誤解は、マルチモーダルを一種類ずつ担当する小さなモデルの寄せ集めだと思うことです。よくある手法は、異なるモダリティを近い表現に対応づけることです。だからこそ画像と文字を本当に対応づけられ、ばらばらになりません。"
      }
    ]
  },
  "rag": {
    "zh": [
      {
        "h": "RAG 是什麼",
        "p": "LLM 把知識壓在參數裡，可能記不全、也可能記錯。<b>RAG</b>（檢索增強生成）的做法是：回答前先到外部知識庫找相關資料，再讓模型根據找到的內容作答。"
      },
      {
        "h": "它怎麼運作",
        "p": "第一步是 <b>檢索</b>（retrieval）：把問題轉成向量，到知識庫找語意最接近的幾段文字。第二步才生成：把這些段落連同問題交給模型，要它照著內容回答。"
      },
      {
        "h": "具體例子",
        "p": "比方公司內部手冊模型原本沒讀過。用 RAG，你問「請假流程」時，系統先撈出相關那幾段，模型就能依據真實條文回答，而不是自己編。"
      },
      {
        "h": "為什麼你該在意",
        "p": "這帶來兩個好處：答案有依據，幻覺明顯變少；而且能標出「出自哪份文件」，方便你查證。很多客服機器人和文件問答，背後都是 RAG。"
      },
      {
        "h": "常見誤解",
        "p": "常見誤會是以為 RAG 把新知識「教進」模型裡。其實模型參數完全沒變，它只是每次臨時讀你塞進來的資料；換掉知識庫，同一個模型就能答新領域。"
      }
    ],
    "en": [
      {
        "h": "What RAG is",
        "p": "An LLM packs its knowledge into its parameters, so it may not recall everything and may recall it wrong. <b>RAG</b> (retrieval augmented generation) works like this: before answering, it first looks in an outside knowledge base for relevant material, then has the model answer based on what it found."
      },
      {
        "h": "How it works",
        "p": "The first step is <b>retrieval</b>: your question is turned into a vector, and the system finds the passages closest in meaning in the knowledge base. Only then comes generation: those passages and the question go to the model together, with the instruction to answer from this content."
      },
      {
        "h": "A concrete example",
        "p": "Take a company handbook the model never read. With RAG, when you ask about the leave policy, the system first pulls out the relevant passages, and the model answers from the actual text instead of making things up."
      },
      {
        "h": "Why it matters",
        "p": "This brings two wins: answers have a basis, so hallucination drops sharply, and it can mark which document a line came from, making it easy to verify. Many support bots and document Q and A systems run on RAG underneath."
      },
      {
        "h": "A common misconception",
        "p": "A common myth is that RAG teaches the new knowledge into the model. In fact the parameters do not change at all; the model simply reads, each time, the material you fed in. Swap the knowledge base and the same model can answer a new field right away."
      }
    ],
    "ja": [
      {
        "h": "RAGとは",
        "p": "LLM は知識をパラメータに詰め込んでいるので、覚えきれないことも、間違って覚えていることもあります。<b>RAG</b>（検索拡張生成）のやり方はこうです。答える前にまず外部の知識ベースから関連資料を探し、見つけた内容に基づいてモデルに答えさせます。"
      },
      {
        "h": "仕組み",
        "p": "最初のステップは <b>検索</b>（retrieval）です。質問をベクトルに変え、知識ベースで意味が最も近い数段落を探します。次が生成です。その段落と質問をまとめてモデルに渡し、「この内容に沿って答えて」と指示します。"
      },
      {
        "h": "具体例",
        "p": "モデルが読んだことのない社内マニュアルを考えます。RAG なら「休暇の手続き」と聞いたとき、システムがまず関連する数段落を取り出し、モデルは実際の条文に基づいて答えます。作り話ではありません。"
      },
      {
        "h": "なぜ大切か",
        "p": "利点は二つ。答えに根拠ができ、幻覚が明らかに減ります。さらに「どの文書から来た一文か」を示せるので、確認が簡単です。多くのカスタマーサポートや文書のQ&Aは、裏でRAGが動いています。"
      },
      {
        "h": "よくある誤解",
        "p": "よくある誤解は、RAG が新しい知識をモデルに「教え込む」というものです。実際にはパラメータはまったく変わらず、モデルは毎回あなたが差し込んだ資料を読むだけ。知識ベースを入れ替えれば、同じモデルがすぐ別分野に答えられます。"
      }
    ]
  },
  "memory": {
    "zh": [
      {
        "h": "模型本身沒有記憶",
        "p": "模型本身其實沒有 <b>記憶</b>（memory）。每次送出訊息，它都像一張白紙，記不住上一句，更別說昨天聊過什麼；所謂 AI「記得你」是外面另做的手腳。"
      },
      {
        "h": "短期：這場對話的狀態",
        "p": "單場對話裡的「記得」，靠的是把整串來回累積起來一起送進去，這包內容就是這場對話的 <b>state</b>（狀態）。它不是真記住，而是每次把舊訊息重讀。"
      },
      {
        "h": "長期：跨對話的筆記",
        "p": "跨對話的長期記憶要另外存：把「你的名字、偏好」寫成筆記存進資料庫，下次開新對話再撈出相關幾條放進開頭。ChatGPT 的記憶功能就是這樣。"
      },
      {
        "h": "為什麼你該在意",
        "p": "這也解釋了對話太長時 AI 為何忘記前面：能塞回去的空間有上限，最舊的會被擠掉。想讓它記牢的重點，直接再講一次最可靠。"
      },
      {
        "h": "常見誤解",
        "p": "最大的誤會是把它想成人腦記憶，以為它會「自然記住」。其實模型每輪都從零開始，所有「記得」都是外部先存好、再原封不動貼回輸入的結果。"
      }
    ],
    "en": [
      {
        "h": "The model has no memory of its own",
        "p": "The model itself has no <b>memory</b>. Every time you hit send, it is a blank page: it cannot hold on to your last line, let alone what you talked about yesterday. When an AI seems to \"remember you,\" something outside it is doing the work."
      },
      {
        "h": "Short term: the conversation's state",
        "p": "Within a single chat, the remembering comes from piling up the whole back and forth and sending it all in again. That accumulated bundle is the <b>state</b> of the conversation. It does not truly remember; it rereads the old messages every time."
      },
      {
        "h": "Long term: cross conversation notes",
        "p": "Long term memory across chats has to be stored separately: your name and preferences get written as notes into a database, and when you open a new chat, the relevant few are pulled out and placed at the start. That is how the ChatGPT memory feature works."
      },
      {
        "h": "Why it matters",
        "p": "This also explains why, when a chat gets too long, the AI starts forgetting the beginning: the space you can feed back in has a limit, and the oldest content gets pushed out. To make a point stick, just say it again; that beats hoping it remembers."
      },
      {
        "h": "A common misconception",
        "p": "The biggest myth is picturing it like a human brain that \"just remembers.\" In reality the model starts from zero on every turn, and all remembering is an outside program saving things and pasting them back into the input, unchanged."
      }
    ],
    "ja": [
      {
        "h": "モデル自身は記憶を持たない",
        "p": "モデルそのものには <b>記憶</b>（memory）がありません。送信するたびに真っ白な紙のようで、前の一言も、まして昨日話した内容も覚えていません。AI が「あなたを覚えている」ように見えるのは、外側が細工をしているからです。"
      },
      {
        "h": "短期：この会話のstate",
        "p": "一回の会話での「覚えている」は、やり取り全体を積み上げて丸ごと送り直すことで成り立ちます。この積み上がった中身が、その会話の <b>state</b>（状態）です。本当に記憶しているのではなく、毎回古いメッセージを読み直しています。"
      },
      {
        "h": "長期：会話をまたぐメモ",
        "p": "会話をまたぐ長期記憶は別に保存します。名前や好みをメモとしてデータベースに書き込み、新しい会話を始めるとき関連する数件を取り出して冒頭に置きます。ChatGPT の記憶機能はこの仕組みです。"
      },
      {
        "h": "なぜ大切か",
        "p": "これは、会話が長くなると AI が最初のほうを忘れ始める理由も説明します。送り直せる空間には上限があり、最も古い内容が押し出されるからです。覚えてほしい要点は、もう一度言うのが一番確実です。"
      },
      {
        "h": "よくある誤解",
        "p": "最大の誤解は、人の脳のように「自然に覚える」と思うことです。実際にはモデルは毎ターンゼロから始まり、あらゆる「記憶」は外部プログラムが保存し、そのまま入力に貼り戻した結果にすぎません。"
      }
    ]
  },
  "mcp": {
    "zh": [
      {
        "h": "它是什麼",
        "p": "<b>MCP</b>（Model Context Protocol）是一套讓 AI 模型接上外部工具與資料的公開標準，由 Anthropic 在 2024 年底提出。有了它，模型不只靠訓練記住的知識，還能即時讀檔案、查資料庫。"
      },
      {
        "h": "一端提供、一端使用",
        "p": "MCP 分成兩邊：一邊是 <b>Server</b>（伺服器），把工具或資料源包好、對外提供；另一邊是用模型的程式去連接它。兩邊講同一套格式，任何支援 MCP 的模型都能接上任何 MCP 伺服器。"
      },
      {
        "h": "AI 世界的 USB-C",
        "p": "可以把它想成 AI 的 USB-C。以前每接一個工具都得各寫各的，十個工具就有十種寫法；現在工具做成一個 MCP 伺服器，任何支援的模型插上就能用。"
      },
      {
        "h": "為什麼你會遇到它",
        "p": "你在 Claude 或各種 AI 編輯器看到的「連接器」，背後很多就是 MCP。它讓 AI 的能力像積木一樣擴充，也是 2025 年各家爭相支援的原因。"
      },
      {
        "h": "它不是模型本身",
        "p": "常見誤會是把 MCP 當成一種模型。其實它只是溝通規格，本身不會思考，就像 USB 規格不等於隨身碟；真正做事的是模型和工具。"
      }
    ],
    "en": [
      {
        "h": "What it is",
        "p": "<b>MCP</b> (Model Context Protocol) is an open standard for connecting AI models to outside tools and data. Anthropic introduced it in late 2024. With it, a model relies not only on what it memorized during training, but can also read your files, query databases, and call other services in real time."
      },
      {
        "h": "One side offers, one side uses",
        "p": "MCP has two sides. One is the <b>Server</b>, which wraps a tool or data source and offers it outward. The other is the program using the model, which connects to those servers. Both speak the same format, so any MCP-supporting model can plug into any MCP server."
      },
      {
        "h": "USB-C for AI",
        "p": "Think of it as USB-C for AI. Before, every tool you connected needed its own custom wiring: ten tools meant ten different ways. Now, once a tool is built as an MCP server, any model that supports MCP can just plug in and use it, no rewriting needed."
      },
      {
        "h": "Why you will run into it",
        "p": "The connectors you see in Claude and various AI editors are often MCP underneath. It lets AI capabilities expand like building blocks, which is why vendors raced to support it in 2025."
      },
      {
        "h": "It is not the model itself",
        "p": "A common misunderstanding is to treat MCP as a kind of model or AI. It is only a communication spec: it does not think, just as the USB standard is not the same as a flash drive. The real work is still done by the model and the tools."
      }
    ],
    "ja": [
      {
        "h": "MCPとは",
        "p": "<b>MCP</b>（Model Context Protocol）は、AIモデルを外部のツールやデータにつなぐための公開標準で、Anthropicが2024年末に提唱しました。これにより、モデルは学習時に覚えた知識だけでなく、ファイルを読んだりデータベースを調べたりをその場で行えます。"
      },
      {
        "h": "提供する側と使う側",
        "p": "MCPには二つの側があります。一方は<b>Server</b>（サーバー）で、あるツールやデータ源を包んで外に提供します。もう一方はモデルを使うプログラムで、そのサーバーに接続します。両者が同じ形式で話すので、MCP に対応したどのモデルも、どの MCP サーバーにもつなげます。"
      },
      {
        "h": "AI版のUSB-C",
        "p": "これはAI版のUSB-Cだと考えるとよいです。以前はツールを一つつなぐたびに独自の配線が必要で、十個のツールには十通りの方法がありました。今はツールをMCPサーバーとして作れば、対応するモデルは差し込むだけで使えます。"
      },
      {
        "h": "どこで出会うか",
        "p": "ClaudeやさまざまなAIエディタで見かける「コネクタ」は、その裏側の多くがMCPです。AIの能力を積み木のように拡張でき、これが2025年に各社が競って対応した理由です。"
      },
      {
        "h": "モデルそのものではない",
        "p": "よくある誤解は、MCPをモデルやAIの一種だと思うことです。実際にはただの通信規格で、それ自体は考えません。USB規格が実際のUSBメモリと違うのと同じです。実際に働くのはモデルとツールです。"
      }
    ]
  },
  "agent": {
    "zh": [
      {
        "h": "從回答到行動",
        "p": "一般的 AI 是你問一句、它答一句。<b>AI Agent</b>（智慧代理）不一樣：你給它一個目標，它會自己規劃步驟、動手去完成，中間不需要你一步步下指令。"
      },
      {
        "h": "想一步、做一步、看結果",
        "p": "Agent 靠一個循環運作：先<b>規劃</b>下一步該做什麼，接著呼叫工具去做，再看回傳的結果決定下一步。這個「想→做→看」的圈會一直跑，直到任務完成。"
      },
      {
        "h": "會用工具的 AI",
        "p": "關鍵在於它能<b>用工具</b>：搜尋網路、查天氣、讀寫檔案、執行程式碼。模型本身只會產生文字，工具讓它真的能對外界採取行動，再把結果整合回答案裡。"
      },
      {
        "h": "你已經在用了",
        "p": "會自己上網查資料再回答、能操作你電腦的 AI 助理，背後都是 agent。2025 年這類「能動手做事」的 AI 成為產品主流。"
      },
      {
        "h": "它不是萬能自動駕駛",
        "p": "常見誤解是以為給了目標就一定辦到。其實它每步都可能判斷錯、用錯工具，步驟越多越容易累積失誤，重要任務仍需人盯著、驗證。"
      }
    ],
    "en": [
      {
        "h": "From answering to acting",
        "p": "An ordinary AI answers one question at a time. An <b>AI Agent</b> is different: you give it a goal, and it plans the steps and carries them out on its own, without you issuing every command."
      },
      {
        "h": "Think, act, observe",
        "p": "An agent runs on a loop. First it does <b>planning</b>, deciding the next step; then it calls a tool to do it; then it looks at the result to decide what comes next. This think, act, observe circle keeps going until the goal is met."
      },
      {
        "h": "An AI that uses tools",
        "p": "The key is <b>tool use</b>: searching the web, checking weather, reading and writing files, running code. The model alone only produces text; tools let it actually act on the outside world and fold the results back into its answer."
      },
      {
        "h": "You are already using it",
        "p": "AI assistants that search the web before answering, or that operate your computer, are agents underneath. In 2025 this kind of AI that can do things became a main direction for products."
      },
      {
        "h": "Not an all-powerful autopilot",
        "p": "A common misconception is that an agent, once given a goal, will surely reach it. In reality it can misjudge or pick the wrong tool at any step, and errors pile up as steps grow, so important tasks still need a human watching and verifying."
      }
    ],
    "ja": [
      {
        "h": "答えることから行動へ",
        "p": "普通のAIは、あなたが尋ねると一つ答えます。<b>AI Agent</b>（エージェント）は違います。目標を与えると、自分で手順を計画し、実行まで進めます。途中で一つずつ指示を出す必要はありません。"
      },
      {
        "h": "考え、実行し、結果を見る",
        "p": "エージェントはループで動きます。まず次に何をするか<b>Planning</b>（計画）し、次にツールを呼んで実行し、その結果を見て次を決めます。この「考える→実行→見る」の輪が、目標が達成されるまで回り続けます。"
      },
      {
        "h": "ツールを使えるAI",
        "p": "鍵は<b>Tool Use</b>（ツール利用）です。ウェブ検索、天気の確認、ファイルの読み書き、コードの実行など。モデル単体は文字を出すだけですが、ツールがあると外の世界に実際に働きかけ、その結果を答えに取り込めます。"
      },
      {
        "h": "すでに使っている",
        "p": "答える前にウェブを調べるAIアシスタントや、あなたのパソコンを操作するものは、裏側ではエージェントです。2025年、この「実際に手を動かせる」AIが製品の主要な方向になりました。"
      },
      {
        "h": "万能の自動操縦ではない",
        "p": "よくある誤解は、目標さえ与えればエージェントが必ず達成すると思うことです。実際には各ステップで判断を誤ったり間違ったツールを選んだりし、手順が増えるほど失敗が積み重なります。重要な作業では人が見張り、検証する必要があります。"
      }
    ]
  },
  "integration": {
    "zh": [
      {
        "h": "把每一章串起來",
        "p": "前面學的每個概念，其實都是同一條<b>管線</b>（pipeline）上的一段：資料、訓練、token、embedding、Transformer，到最後的對話與工具。整合，就是看懂它們怎麼接成一個系統。"
      },
      {
        "h": "從底層到頂層",
        "p": "這條管線由下往上疊：最底層是資料，往上是模型的訓練與運作，再上面是 prompt、RAG、記憶、agent 這些用法，最頂端是使用者實際碰到的<b>應用</b>（application）。"
      },
      {
        "h": "一個實際例子",
        "p": "以一個客服機器人為例：底層放公司文件，用 RAG 檢索相關段落，交給 LLM 生成回答，外面再包一層對話介面。每一段都是前面某一章的內容。"
      },
      {
        "h": "為什麼要看全景",
        "p": "單獨懂一個零件不夠，懂它們怎麼串起來，你才知道問題出在哪一段、該從哪裡改進，也才有能力自己設計一個 AI 應用。"
      },
      {
        "h": "沒有一步是魔法",
        "p": "常見誤解是把整個系統當成一個神祕的黑盒子。其實它是一段段可理解、可替換的處理階段組起來的，任何一段都能拆開檢查與優化。"
      }
    ],
    "en": [
      {
        "h": "Connecting every chapter",
        "p": "Every concept you have learned is really one segment of the same <b>pipeline</b>: data, training, tokens, embeddings, Transformer, and finally conversation and tools. Integration means seeing how they join into one system."
      },
      {
        "h": "From bottom to top",
        "p": "The pipeline stacks upward. At the bottom is data; above it, the training and running of the model; above that, uses like prompt, RAG, memory, and agents; and at the very top, the <b>application</b> the user actually touches."
      },
      {
        "h": "A concrete example",
        "p": "Take a customer-service bot: company documents sit at the bottom, RAG retrieves the relevant passages, an LLM generates the reply, and a chat interface wraps it all. Each piece is the content of an earlier chapter."
      },
      {
        "h": "Why see the whole picture",
        "p": "Understanding one part alone is not enough. Only when you see how they connect do you know which segment a problem lies in and where to improve, and only then can you design an AI application yourself."
      },
      {
        "h": "No step is magic",
        "p": "A common misconception is to treat the whole system as a mysterious black box. In fact it is built from understandable, replaceable processing stages, and any stage can be opened up, inspected, and optimized."
      }
    ],
    "ja": [
      {
        "h": "各章をつなげる",
        "p": "これまで学んだ概念は、実はどれも同じ<b>Pipeline</b>（パイプライン）の一区間です。データ、学習、token、embedding、Transformer、そして最後の対話とツール。統合とは、それらがどう一つのシステムに組み合わさるかを見ることです。"
      },
      {
        "h": "下から上へ",
        "p": "このパイプラインは下から上へ積み重なります。最下層はデータ、その上はモデルの学習と動作、さらに上はprompt、RAG、記憶、エージェントといった使い方、最上部は利用者が実際に触れる<b>Application</b>（アプリ）です。"
      },
      {
        "h": "具体的な例",
        "p": "カスタマーサポートのボットを例にすると、最下層に社内文書を置き、RAGで関連箇所を取り出し、LLMが返答を生成し、外側を対話画面で包みます。どの部分も前の章の内容です。"
      },
      {
        "h": "なぜ全体像を見るのか",
        "p": "部品を一つだけ理解しても足りません。それらがどうつながるかを見て初めて、問題がどの区間にあるか、どこを改善すべきかが分かり、自分でAIアプリを設計できるようになります。"
      },
      {
        "h": "魔法の工程はない",
        "p": "よくある誤解は、システム全体を謎めいたブラックボックスと見ることです。実際には理解でき、取り替えもできる処理段階の積み重ねで、どの段階も開けて調べ、最適化できます。"
      }
    ]
  },
  "limits": {
    "zh": [
      {
        "h": "自信不等於正確",
        "p": "AI 最需要小心的一點：它答得再流暢、再有把握，也不代表是對的。模型追求的是「讀起來合理」，不是「事實正確」，兩者常常一致，但不保證一致。"
      },
      {
        "h": "一本正經地編造",
        "p": "當模型不知道答案時，往往不會直接說「我不知道」，而是照語言慣性掰出一個看似合理的答案，這叫<b>幻覺</b>（hallucination）：捏造的引用、不存在的函式、假的日期都屬於此。"
      },
      {
        "h": "偏見來自資料",
        "p": "另一個限制是<b>偏見</b>（bias）。模型從網路資料學習，資料裡有的刻板印象與不公平，它會照單學起來，有時還會在輸出時放大。"
      },
      {
        "h": "你會在哪看到",
        "p": "問冷門人物的生平、要它列參考文獻、算稍複雜的數字時，最容易出現幻覺。這也是為什麼正式用途一定要人工核對。"
      },
      {
        "h": "它不是搜尋引擎",
        "p": "常見誤解是把它當成會查證的搜尋引擎。其實純語言模型沒有連網、沒有事實資料庫，它是在「憑印象」回答，除非另外接上檢索或工具。"
      }
    ],
    "en": [
      {
        "h": "Confidence is not correctness",
        "p": "The thing to watch most with AI: no matter how fluent or sure it sounds, that does not mean it is right. The model aims for what reads as plausible, not for what is factually true. The two often agree, but that is not guaranteed."
      },
      {
        "h": "Making things up with a straight face",
        "p": "When the model does not know the answer, it often will not simply admit it; instead it tends to follow language habit and invent something that looks reasonable. This is <b>hallucination</b>: fake citations, functions that do not exist, and made-up dates all count."
      },
      {
        "h": "Bias comes from the data",
        "p": "Another limit is <b>bias</b>. The model learns from web data, and whatever stereotypes and unfairness the data contains, it learns them too, sometimes even amplifying them in its output."
      },
      {
        "h": "Where you will see it",
        "p": "Hallucination shows up most when you ask about obscure people, request a reference list, or ask for slightly complex numbers. This is exactly why serious uses always need a human to check."
      },
      {
        "h": "It is not a search engine",
        "p": "A common misconception is to treat it as a search engine that verifies facts. A pure language model has no internet and no factual database; it answers from impression, unless you connect it to retrieval or tools."
      }
    ],
    "ja": [
      {
        "h": "自信は正しさではない",
        "p": "AIで最も注意すべき点です。どれだけ流暢に、確信ありげに答えても、正しいとは限りません。モデルが目指すのは「読んで自然なこと」であって「事実として正しいこと」ではありません。両者はよく一致しますが、保証はありません。"
      },
      {
        "h": "堂々と作り話をする",
        "p": "モデルは答えを知らないとき、「分かりません」と素直に言わないことが多く、言葉の流れに沿ってもっともらしいものをでっち上げがちです。これが<b>Hallucination</b>（幻覚）です。架空の出典、存在しない関数、でたらめな日付などが該当します。"
      },
      {
        "h": "偏りはデータから来る",
        "p": "もう一つの限界は<b>Bias</b>（偏見）です。モデルはウェブのデータから学ぶため、データにある固定観念や不公平をそのまま身につけ、出力時にはさらに強めてしまうこともあります。"
      },
      {
        "h": "どこで見かけるか",
        "p": "幻覚は、マイナーな人物の経歴を尋ねたり、参考文献を挙げさせたり、少し複雑な数字を計算させたりするときに最も出やすいです。だからこそ、正式な用途では必ず人の確認が要ります。"
      },
      {
        "h": "検索エンジンではない",
        "p": "よくある誤解は、事実を確かめてくれる検索エンジンだと思うことです。純粋な言語モデルにはネット接続も事実データベースもなく、検索やツールを別につながない限り、印象で答えています。"
      }
    ]
  },
  "evaluation": {
    "zh": [
      {
        "h": "好壞是可以判斷的",
        "p": "AI 的回答不是只能憑感覺說好或不好。<b>評估</b>（evaluation）就是用明確標準來檢查：答得正不正確、完不完整、有沒有切題、有沒有幻覺。"
      },
      {
        "h": "怎麼比較不同模型",
        "p": "要比較兩個模型誰強，得讓它們考同一份考卷，這份標準化考卷就叫 <b>Benchmark</b>（基準測驗）：一整套固定的題目和答案，算出分數就能公平比較。"
      },
      {
        "h": "一個實際數字",
        "p": "例如常見的 MMLU 測驗涵蓋數十個學科的選擇題，滿分 100。頂尖模型多半落在 85 分以上，但分數再高，也只代表這份題目上的表現。"
      },
      {
        "h": "為什麼你該在意",
        "p": "排行榜分數高，不代表在你的任務上就好用。真正該做的，是拿你自己的真實案例去測，看它在你要用的場景下表現如何。"
      },
      {
        "h": "最新最大不一定最好",
        "p": "常見誤解是「越新、越大的模型一定全面勝出」。其實不同模型各有專長，貴的大模型在簡單任務上可能又慢又不划算，要看任務挑工具。"
      }
    ],
    "en": [
      {
        "h": "Good or bad can be judged",
        "p": "An AI answer is not something you can only judge by feel. <b>Evaluation</b> means checking against clear standards: is it correct, is it complete, does it stay on point, does it hallucinate."
      },
      {
        "h": "Comparing different models",
        "p": "To compare which of two models is stronger, you make them sit the same exam. That standardized exam is a <b>Benchmark</b>: a fixed set of questions and answers, so the scores let you compare fairly."
      },
      {
        "h": "A concrete number",
        "p": "For example, the well-known MMLU test covers multiple-choice questions across dozens of subjects, out of 100. Top models usually score above 85, but even a high score only reflects performance on that particular test."
      },
      {
        "h": "Why you should care",
        "p": "A high leaderboard score does not mean it works well for your task. What you should really do is test it on your own real cases and see how it performs in the setting you actually use."
      },
      {
        "h": "Newest and biggest is not always best",
        "p": "A common misconception is that a newer, bigger model always wins across the board. In fact different models have different strengths; an expensive large model can be slow and wasteful on simple tasks, so pick the tool to fit the task."
      }
    ],
    "ja": [
      {
        "h": "良し悪しは判断できる",
        "p": "AIの回答は、感覚だけで良い悪いを言うものではありません。<b>Evaluation</b>（評価）とは、明確な基準で確かめることです。正確か、完全か、的を射ているか、幻覚がないか。"
      },
      {
        "h": "異なるモデルの比べ方",
        "p": "二つのモデルのどちらが強いかを比べるには、同じ試験を受けさせます。この標準化された試験が<b>Benchmark</b>（基準テスト）です。固定の問題と答えの一式で、点数を出せば公平に比較できます。"
      },
      {
        "h": "具体的な数字",
        "p": "たとえば有名なMMLUは、数十の科目にわたる選択問題を扱い、満点は100です。トップのモデルはたいてい85点以上ですが、点数が高くても、その問題での成績を表すだけです。"
      },
      {
        "h": "なぜ気にすべきか",
        "p": "順位表の点数が高くても、あなたの用途で使いやすいとは限りません。本当にすべきは、自分の実際の事例で試し、実際に使う場面でどう振る舞うかを見ることです。"
      },
      {
        "h": "最新最大が最良とは限らない",
        "p": "よくある誤解は「新しく大きいモデルほど全面的に勝つ」というものです。実際にはモデルごとに得意分野が違い、高価な大型モデルは簡単な作業では遅くて割に合わないこともあります。用途に合わせて選びましょう。"
      }
    ]
  },
  "capstone": {
    "zh": [
      {
        "h": "你手上的全景地圖",
        "p": "走到這裡，你已經有一張從資料、訓練、模型到 prompt、RAG、agent 的全景地圖。你不必會寫程式，也已經看懂 AI 這台機器大致怎麼運轉。"
      },
      {
        "h": "從一個真實問題開始",
        "p": "下一步不是學更多名詞，而是挑一個你自己的<b>應用場景</b>（use case）：一件重複、煩人、要處理很多文字的小事，想想能不能套上前面那條管線。"
      },
      {
        "h": "用學過的零件拼",
        "p": "把它拆開想：需要查自己的資料嗎（RAG）？要它自己動手嗎（agent）？怎麼問最有效（prompt）？你學過的每個概念，都是可以拿來組裝的零件。"
      },
      {
        "h": "永遠保持懷疑",
        "p": "最重要的習慣是<b>驗證</b>（verification）：AI 的輸出一律先當草稿，重要的內容自己查證過再用。它是很強的助手，但最後把關的人是你。"
      }
    ],
    "en": [
      {
        "h": "The map in your hands",
        "p": "By now you hold a full map, from data, training, and models to prompt, RAG, and agents. You do not need to code, yet you already understand roughly how this machine called AI runs."
      },
      {
        "h": "Start from a real problem",
        "p": "The next step is not to learn more terms, but to pick your own <b>use case</b>: a small, repetitive, annoying chore that involves a lot of text, and ask whether the pipeline above can be applied to it."
      },
      {
        "h": "Assemble from parts you learned",
        "p": "Break it down: does it need to look up your own data (RAG)? Should it act on its own (agent)? How do you ask most effectively (prompt)? Every concept you learned is a part you can assemble."
      },
      {
        "h": "Always stay skeptical",
        "p": "The most important habit is <b>verification</b>: treat every AI output as a draft first, and check anything important before you use it. It is a powerful assistant, but the final gatekeeper is you."
      }
    ],
    "ja": [
      {
        "h": "手元にある全体地図",
        "p": "ここまで来て、あなたはデータ、学習、モデルからprompt、RAG、エージェントまでの全体地図を手にしています。コードを書けなくても、AIという機械がおおよそどう動くかはもう分かっています。"
      },
      {
        "h": "現実の問題から始める",
        "p": "次の一歩は、用語を増やすことではなく、自分の<b>Use Case</b>（応用場面）を一つ選ぶことです。繰り返しが多く、面倒で、大量の文字を扱う小さな用事に、上のパイプラインを当てはめられるか考えてみましょう。"
      },
      {
        "h": "学んだ部品で組み立てる",
        "p": "分解して考えます。自分のデータを調べる必要は（RAG）？自分で動いてほしい（エージェント）？どう尋ねれば効果的か（prompt）？学んだ概念はどれも、組み立てに使える部品です。"
      },
      {
        "h": "つねに懐疑を持つ",
        "p": "最も大切な習慣は<b>Verification</b>（検証）です。AIの出力はまず下書きとして扱い、重要な内容は使う前に自分で確かめましょう。強力な助手ですが、最後に関門を守るのはあなたです。"
      }
    ]
  }
};

/** 取某章某語言的課文；缺該語言時 fallback 回 zh；沒有就回 null。 */
export function bodyFor(slug, locale = 'zh') {
  const b = BODIES[slug];
  if (!b) return null;
  return b[locale] || b.zh || null;
}
