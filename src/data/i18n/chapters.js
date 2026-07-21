/* ============================================================
   章節「顯示欄位」的翻譯（t 標題、sub 副標、key 重點、terms 名詞）。
   以 slug 為鍵，只放已翻譯的章節；缺的自動 fallback 回中文（chapters.js DATA）。
   ============================================================ */
export const CH_TR = {
  en: {
    "reasoning": {
      t: "Reasoning Models: Letting AI Think Longer", sub: "Why thinking a few more steps makes answers better",
      key: [
        ["01", "A standard LLM answers as soon as it finishes reading; a reasoning model first produces a long stretch of thinking, checks and backtracks, and only then gives an answer"],
        ["02", "CoT uses the prompt to encourage it to write out the intermediate steps; a reasoning model uses post-training to build the ability to think into the model itself"],
        ["03", "The core trade-off is test-time compute: the longer it thinks the more accurate it gets, but also the slower and more expensive, so only hard problems are worth it"],
      ],
      terms: [
        ["Chain of Thought", "A prompt technique that encourages the model to write out its intermediate reasoning steps, which raises accuracy on hard problems"],
        ["Test-time Compute", "Spending more compute at answer time to think a bit longer, trading speed and cost for accuracy"],
      ],
    },
    "rnn": {
      t: "Sequence Models: Reading One Word at a Time", sub: "Before Transformer, how AI made sense of a sentence",
      key: [
        ["01", "Sequence models read in order, using a 'hidden state' to compress what came before into memory"],
        ["02", "RNN's two big limits: it forgets over long inputs (forgetful), and it runs one step at a time so it cannot parallelize (slow)"],
        ["03", "Transformer uses Attention to see the whole sentence at once, solving both forgetfulness and the parallelism problem, which is what made LLMs possible"],
      ],
      terms: [
        ["RNN", "a sequence model that reads one word at a time, carrying memory forward through a hidden state"],
        ["Hidden State", "the RNN's compressed memory of 'what it has read so far', passed along word by word"],
      ],
    },
    "cnn": {
      t: "CNN: How AI Sees Images", sub: "With one small filter, from edges to a whole face",
      key: [
        ["01", "CNN slides a small filter across the whole image to detect local patterns that can appear anywhere"],
        ["02", "The same filter is reused (weight sharing): it recognizes patterns wherever they move, with fewer parameters"],
        ["03", "Stack many layers: edges → shapes → objects; the filters are learned, not designed by hand"],
      ],
      terms: [
        ["Convolution", "the operation of sliding a small filter across the whole image to detect local patterns region by region"],
        ["Filter", "a small block of weights that a CNN uses to detect a certain pattern, learned from data"],
      ],
    },
    "model-knowledge": {
      t: "A Model's Knowledge", sub: "What it knows, where it lives, and how far it goes",
      key: [
        ["01", "Knowledge is compressed into parameters during pretraining, not stored as a lookup database"],
        ["02", "It has a cutoff: anything after training, plus your private data, the model simply does not know"],
        ["03", "Memory is a fuzzy reconstruction, so it can be incomplete or wrong; add fresh knowledge via RAG or context, not fine-tuning"],
      ],
      terms: [
        ["Knowledge Cutoff", "The endpoint of the training data in time: the model does not know what happened afterward"],
        ["Parametric Knowledge", "Knowledge compressed into the weights and rebuilt through generation, as opposed to external data retrieved on the fly"],
      ],
    },
    "history": {
      t: "A Brief History of AI", sub: "How AI got to where it is today",
      key: [
        ["01", "AI didn’t appear overnight, it’s 70+ years of ups and downs"],
        ["02", "Three big jumps: deep learning (2012), Transformer (2017), ChatGPT (2022)"],
        ["03", "Each breakthrough came from architecture or scale, not magic"],
      ],
      terms: [
        ["Turing Test", "Telling human from machine through conversation"],
        ["AI Winter", "A downturn when hype outran results and funding froze"],
      ],
    },
    "ai-intro": {
      t: "What Is AI?", sub: "From human learning to machine decisions",
      key: [
        ["01", "AI makes machines imitate how humans “see, think, decide”"],
        ["02", "Regular software: rules written by hand. AI: rules learned from data"],
        ["03", "The flow: data → model → prediction → decision"],
      ],
      terms: [
        ["Model", "A learned set of rules that turns input into a prediction"],
        ["Prediction", "The model’s guess about new data, with a confidence level"],
      ],
    },
    "tokenizer": {
      t: "Tokenizer", sub: "Splitting text into tokens the model can read",
      key: [
        ["01", "The model processes tokens, not individual characters"],
        ["02", "Common words are one token; rare words get split up"],
        ["03", "Chinese, English, and code are all tokenized differently"],
      ],
      terms: [
        ["Tokenizer", "The component that splits text into tokens"],
        ["Subword", "A unit smaller than a whole word"],
      ],
    },
    "ml": {
      t: "Machine Learning", sub: "Letting computers find patterns in data",
      key: [
        ["01", "The more examples you give, the more accurate the patterns the model captures"],
        ["02", "Training = adjusting over and over until the hit rate climbs"],
        ["03", "Data quality and quantity directly determine accuracy"],
      ],
      terms: [
        ["Dataset", "A whole batch of examples used for training; supervised ones come with answers"],
        ["Accuracy", "The share of correct guesses; measured on data the model has never seen"],
      ],
    },
    "data": {
      t: "Data: The Nutrient of AI", sub: "Datasets, labeling, and quality",
      key: [
        ["01", "An AI’s ceiling is set by its data"],
        ["02", "Labeling = the correct answer that tells AI “what this is”"],
        ["03", "Dirty data in, wrong conclusions out (garbage in, garbage out)"],
      ],
      terms: [
        ["Label", "A correct answer added by a human"],
        ["Bias", "A systematic skew caused by uneven data"],
      ],
    },
    "deep-learning": {
      t: "Deep Learning", sub: "Many layers, pulling out features step by step",
      key: [
        ["01", "Shallow layers see details (edges), deep layers see the whole (a face)"],
        ["02", "Each layer abstracts the previous layer’s result one step further"],
        ["03", "No hand-designed features, the network learns them itself"],
      ],
      terms: [
        ["Layer", "A group of neurons that compute at the same time"],
        ["Feature", "A judgment clue the model picks up automatically"],
      ],
    },
    "neural-network": {
      t: "Neural Networks", sub: "Nodes, connections, weights",
      key: [
        ["01", "A weight = how important this connection is"],
        ["02", "A positive weight = support, a negative weight = opposition"],
        ["03", "Signals are summed and squashed layer by layer until they become a single decision"],
      ],
      terms: [
        ["Weight", "The strength of a connection; it can be positive or negative"],
        ["Activation", "How brightly a node is lit up (0-1)"],
      ],
    },
    "training": {
      t: "Training: Gradient Descent", sub: "How a machine finds the weights on its own",
      key: [
        ["01", "Training = constantly fine-tuning the weights to shrink the error"],
        ["02", "Walk down the “error slope” to find the lowest point"],
        ["03", "The learning rate = how big each step is"],
      ],
      terms: [
        ["Loss", "A score for how badly the model is getting things wrong"],
        ["Gradient Descent", "A method that descends the slope to find the smallest loss"],
      ],
    },
    "backprop": {
      t: "Backpropagation", sub: "How error gets corrected back, layer by layer",
      key: [
        ["01", "First run forward to get the answer, then go back and hand out the blame"],
        ["02", "How much blame each weight should carry gets computed"],
        ["03", "Backpropagation is what makes training deep networks feasible"],
      ],
      terms: [
        ["Backpropagation", "An algorithm that distributes the error from back to front"],
        ["Chain Rule", "The mathematical basis for computing blame layer by layer"],
      ],
    },
    "embedding": {
      t: "Embedding", sub: "Turning tokens and meaning into vectors",
      key: [
        ["01", "Computers don’t understand words, only number vectors"],
        ["02", "Words with similar meanings sit close together as vectors"],
        ["03", "Once you have vectors, “similarity” can be calculated"],
      ],
      terms: [
        ["Embedding", "Mapping symbols into a vector space"],
        ["Vector", "A string of numbers that represent meaning as coordinates"],
      ],
    },
    "transformer": {
      t: "Transformer", sub: "Understanding context with Attention",
      key: [
        ["01", "For a word like “it,” who it refers to depends on the context"],
        ["02", "Attention = how much each word should pay attention to the others"],
        ["03", "This is the first time machines truly “read” the relationships in a sentence"],
      ],
      terms: [
        ["Attention", "The relevance weights between one word and another"],
        ["Context", "The surrounding words that decide a word’s meaning"],
      ],
    },
    "llm": {
      t: "Large Language Models", sub: "Constantly predicting the next token",
      key: [
        ["01", "ChatGPT doesn’t look up answers, it guesses the next word"],
        ["02", "At every step it computes a probability for a whole row of candidate words"],
        ["03", "One word after another, it grows a whole answer"],
      ],
      terms: [
        ["Token", "The smallest unit of text, roughly one character or word"],
        ["Probability", "The likelihood of each candidate token being chosen"],
      ],
    },
    "model-size": {
      t: "Model Size", sub: "Parameter count, and why bigger is stronger",
      key: [
        ["01", "Parameters = the total number of weights in the network"],
        ["02", "More parameters means more complex patterns it can store"],
        ["03", "But bigger = pricier and slower, not always worth it"],
      ],
      terms: [
        ["Parameter", "A single adjustable weight inside the model"],
        ["Scaling Law", "The empirical relationship between scale and capability"],
      ],
    },
    "context-window": {
      t: "Context Window", sub: "How much content a model can see at once",
      key: [
        ["01", "A model has a memory limit = the number of tokens it can read at once"],
        ["02", "Go over the limit and the earliest content gets pushed out"],
        ["03", "A bigger window means more context it can consider (and more cost)"],
      ],
      terms: [
        ["Context Window", "The token limit a model can process at once"],
        ["Truncation", "Discarding older content when it exceeds the window"],
      ],
    },
    "inference": {
      t: "Inference", sub: "How the model actually works after training",
      key: [
        ["01", "Training = learning the rules (slow, one-time); inference = using the rules (fast, every time)"],
        ["02", "Every conversation you have with an AI is one inference"],
        ["03", "Inference costs compute, so it has speed and cost"],
      ],
      terms: [
        ["Inference", "Using a trained model to produce output"],
        ["Latency", "The waiting time from input to output"],
      ],
    },
    "pretraining": {
      t: "From Model to ChatGPT", sub: "How an assistant is actually trained",
      key: [
        ["01", "Pretraining: read massively first, and learn language itself"],
        ["02", "Instruction tuning: teach it to answer the way humans ask"],
        ["03", "RLHF: use human preferences to make answers more useful and safer"],
      ],
      terms: [
        ["Pretraining", "The large-scale, unsupervised learning stage"],
        ["RLHF (Reinforcement Learning from Human Feedback)", "Tuning the model’s behavior using human ratings"],
      ],
    },
    "fine-tuning": {
      t: "Fine-tuning", sub: "Customize a model with your own data",
      key: [
        ["01", "Take a general model and train it further on domain-specific data"],
        ["02", "Teach the model your tone, format, and expertise"],
        ["03", "Far cheaper than training from scratch (standing on the shoulders of giants)"],
      ],
      terms: [
        ["Fine-tuning", "Small-scale retraining on top of an existing model"],
        ["LoRA", "An efficient fine-tuning method that adjusts only a small subset of parameters"],
      ],
    },
    "prompt": {
      t: "Prompt: How to Talk to AI", sub: "Your prompt decides the output quality",
      key: [
        ["01", "Spell out context, role, and format, and the answer gets more accurate"],
        ["02", "Giving examples (few-shot) works better than just describing"],
        ["03", "Same question, different phrasing, very different results"],
      ],
      terms: [
        ["Prompt", "The input instruction you give the model"],
        ["Few-shot", "Including a few examples in the prompt"],
      ],
    },
    "thought-partner": {
      t: "AI as a Thought Partner", sub: "Not just answers — think better with it",
      key: [
        ["01", "Give enough context: your role, goal, audience, and constraints"],
        ["02", "Ask it to poke holes and argue the other side, not just agree with you"],
        ["03", "The value is in the back-and-forth, not a single question"],
      ],
      terms: [
        ["Sycophancy", "AI's tendency to go along with you and say what you want to hear, rather than the truth"],
        ["Context", "The background you provide, which decides the quality of the answer"],
      ],
    },
    "generative": {
      t: "Generative AI: How AI Draws", sub: "Denoising from static into an image, step by step (diffusion)",
      key: [
        ["01", "First add noise to destroy an image, then learn to reverse it"],
        ["02", "Generating = denoising step by step, starting from pure noise"],
        ["03", "The text prompt guides which direction the denoising goes"],
      ],
      terms: [
        ["Diffusion", "A method that generates by adding and then removing noise"],
        ["Denoising", "Recovering an image from noise"],
      ],
    },
    "multimodal": {
      t: "Multimodal", sub: "AI doesn’t just read text, it can see, hear, and generate too",
      key: [
        ["01", "Multimodal = handling text, images, sound, and video all at once"],
        ["02", "The trick: encode every type into “the same kind of meaning vector”"],
        ["03", "With a shared space, you can freely convert between types"],
      ],
      terms: [
        ["Multimodal", "A model that can handle several data types (text / image / sound / video)"],
        ["Modality", "One type of data, such as text, image, or sound"],
      ],
    },
    "rag": {
      t: "RAG: Let AI Look Things Up", sub: "Retrieve first, then generate",
      key: [
        ["01", "An LLM may not remember, and can misremember"],
        ["02", "First find relevant passages in a knowledge base, then let the LLM answer"],
        ["03", "It reduces hallucinations and can cite sources"],
      ],
      terms: [
        ["RAG (Retrieval-Augmented Generation)", "Retrieve external knowledge, then generate"],
        ["Retrieval", "Finding relevant data by vector similarity"],
      ],
    },
    "memory": {
      t: "Memory: How AI Remembers You", sub: "Short-term and long-term memory across conversations",
      key: [
        ["01", "The model itself has no memory; every conversation starts blank"],
        ["02", "“Remembering” means an external system stores it and slips it back into the context next time"],
        ["03", "Short-term = this conversation; long-term = notes kept across conversations"],
      ],
      terms: [
        ["Memory", "Information kept persistently outside the conversation"],
        ["State", "Everything a conversation has accumulated so far"],
      ],
    },
    "mcp": {
      t: "MCP: Connecting AI to Tools and Data", sub: "Model Context Protocol, AI’s universal socket",
      key: [
        ["01", "Wiring each tool separately is messy; MCP is one unified standard"],
        ["02", "Like the USB-C of the AI world: one way to connect to everything"],
        ["03", "The model reads data and uses tools through MCP, with no per-tool wiring"],
      ],
      terms: [
        ["MCP (Model Context Protocol)", "An open standard for connecting a model to tools and data"],
        ["Server", "The side that provides data or tools through MCP"],
      ],
    },
    "agent": {
      t: "AI Agent", sub: "Plans, uses tools, and gets the goal done on its own",
      key: [
        ["01", "Regular AI: ask → answer. Agent: goal → gets it done itself"],
        ["02", "Breaks tasks apart and decides what to do first"],
        ["03", "Can call tools (search, weather…) then combine the results"],
      ],
      terms: [
        ["Planning", "Breaking a big goal into executable steps"],
        ["Tool Use", "The actions an Agent takes in the outside world"],
      ],
    },
    "integration": {
      t: "AI System Integration", sub: "The full picture, from data to application",
      key: [
        ["01", "Every earlier chapter is one segment of this pipeline"],
        ["02", "Data sits at the bottom, the application at the top"],
        ["03", "Understand the whole picture and you can start designing AI apps"],
      ],
      terms: [
        ["Pipeline", "The series of processing stages that data flows through"],
        ["Application", "The end product the user actually interacts with"],
      ],
    },
    "limits": {
      t: "The Limits of AI: Hallucination and Bias", sub: "It will confidently tell you something wrong",
      key: [
        ["01", "High confidence ≠ correct"],
        ["02", "Hallucination: confidently making up things that don’t exist"],
        ["03", "Bias comes from data, and gets amplified by the model"],
      ],
      terms: [
        ["Hallucination", "When a model fabricates plausible-looking errors"],
        ["Bias", "A systematic, unfair tendency"],
      ],
    },
    "evaluation": {
      t: "AI Evaluation", sub: "How to judge whether an AI answer is good",
      key: [
        ["01", "Good vs. bad has standards: correct, complete, relevant, no hallucination"],
        ["02", "A benchmark is a standardized test that lets models be compared"],
        ["03", "Newer and bigger doesn’t win at everything, it depends on your task"],
      ],
      terms: [
        ["Benchmark", "A set of standard questions used to compare model abilities"],
        ["Evaluation", "Judging whether an output is good using clear criteria"],
      ],
    },
    "capstone": {
      t: "What Can You Do with AI?", sub: "Turning the map into action (wrap-up)",
      key: [
        ["01", "You now have the full map from data to application"],
        ["02", "Pick one real problem and run it through this pipeline"],
        ["03", "Stay skeptical: always verify AI’s output"],
      ],
      terms: [
        ["Use Case", "Applying AI to a concrete problem"],
        ["Verification", "Checking whether AI’s output is trustworthy"],
      ],
    },
  },
  ja: {
    "reasoning": {
      t: "推論モデル：AI にもっと長く考えさせる", sub: "なぜ「もう数ステップ考える」と答えが良くなるのか",
      key: [
        ["01", "通常の LLM は読み終えるとすぐ答える。推論モデルはまず長い思考を生成し、確認して戻り、それから答えを出す"],
        ["02", "CoT は prompt で中間ステップを書き出させる。推論モデルは後訓練で「考える力」をモデル自体に組み込む"],
        ["03", "核心のトレードオフは test-time compute。長く考えるほど正確になるが、遅く高コストにもなるので、難問だけが価値に見合う"],
      ],
      terms: [
        ["Chain of Thought 思考の連鎖", "モデルに中間の推論ステップを書き出させる prompt の技法。難問の正答率が上がる"],
        ["Test-time Compute 推論時の計算", "回答時により多くの計算を使って少し長く考えること。速度とコストを正確さと交換する"],
      ],
    },
    "rnn": {
      t: "シーケンスモデル：一度に一語ずつ読む", sub: "Transformer 以前、AI はどうやって文を理解したのか",
      key: [
        ["01", "シーケンスモデルは順番どおりに読み、「隠れ状態」で前に読んだ内容を記憶として凝縮する"],
        ["02", "RNN の二大制約：長いと忘れる（健忘）、一つずつ処理するので並列化できない（遅い）"],
        ["03", "Transformer は Attention で一度に文全体を見て、健忘と並列化を同時に解決し、LLM が生まれた"],
      ],
      terms: [
        ["RNN 循環ニューラルネットワーク", "一語ずつ読み、隠れ状態で記憶を持ちながら先へ読み進めるシーケンスモデル"],
        ["Hidden State 隠れ状態", "RNN が「ここまでに何を読んだか」を凝縮した記憶で、一語ずつ伝えられる"],
      ],
    },
    "cnn": {
      t: "CNN：AI はどうやって画像を見るのか", sub: "小さなフィルタ一つで、エッジから顔全体まで見る",
      key: [
        ["01", "CNN は小さなフィルタを画像全体でスライドさせ、どこにでも現れうる局所的な模様を検出する"],
        ["02", "同じフィルタを繰り返し使う（重み共有）：位置が変わっても認識でき、パラメータが少ない"],
        ["03", "たくさんの層を重ねる：エッジ → 形 → 物体；フィルタは人が設計するのではなく学習される"],
      ],
      terms: [
        ["Convolution 畳み込み", "小さなフィルタを画像全体でスライドさせ、領域ごとに局所的な模様を検出する演算"],
        ["Filter フィルタ", "CNN がある模様を検出するために使う小さな重みのブロックで、データから学習される"],
      ],
    },
    "model-knowledge": {
      t: "モデルの知識", sub: "何を知っていて、どこにあり、どこまでか",
      key: [
        ["01", "知識は事前学習の段階でパラメータに圧縮される。参照できるデータベースとして保存されるわけではない"],
        ["02", "締め切りがある：学習後の出来事やあなたの非公開データを、モデルは生まれつき知らない"],
        ["03", "記憶はあいまいな再構築なので、抜けたり間違えたりする。新しい知識を補うのは RAG かコンテキストであり、ファインチューニングではない"],
      ],
      terms: [
        ["Knowledge Cutoff 知識の締め切り", "学習データの時間的な終点：それ以降に起きたことをモデルは知らない"],
        ["Parametric Knowledge パラメータ知識", "重みに圧縮され、生成によって再構築される知識。その場で検索する外部データとは対照的なもの"],
      ],
    },
    "history": {
      t: "AI の歴史", sub: "AI が今日に至るまでの歩み",
      key: [
        ["01", "AI は突然現れたのではなく、70 年以上の浮き沈みの積み重ね"],
        ["02", "3 つの大きな飛躍：深層学習(2012)、Transformer(2017)、ChatGPT(2022)"],
        ["03", "どの突破も「構造や規模」によるもの、魔法ではない"],
      ],
      terms: [
        ["チューリングテスト", "会話で相手が人か機械かを見分ける"],
        ["AI の冬", "期待が成果を上回り、資金が凍結した停滞期"],
      ],
    },
    "ai-intro": {
      t: "AI とは何か？", sub: "人の学習から機械の判断へ",
      key: [
        ["01", "AI は人間の「見る・考える・決める」を機械に真似させる"],
        ["02", "普通のプログラム：規則を書き込む。AI：データから規則を学ぶ"],
        ["03", "流れ：データ → モデル → 予測 → 判断"],
      ],
      terms: [
        ["Model モデル", "入力を予測に変える、学習された規則のまとまり"],
        ["Prediction 予測", "新しいデータに対するモデルの推測（確信度つき）"],
      ],
    },
    "tokenizer": {
      t: "Tokenizer（トークナイザ）", sub: "文章をモデルが読めるトークンに分ける",
      key: [
        ["01", "モデルは一文字ずつではなく、トークン単位で処理する"],
        ["02", "よく使う語は 1 トークン、まれな語は分割される"],
        ["03", "中国語・英語・コードで分け方が異なる"],
      ],
      terms: [
        ["Tokenizer トークナイザ", "文章をトークンに分ける部品"],
        ["Subword サブワード", "語より小さい分割単位"],
      ],
    },
    "ml": {
      t: "機械学習", sub: "コンピュータがデータから規則を見つける",
      key: [
        ["01", "例を多く与えるほど、モデルがつかむ規則は正確になる"],
        ["02", "訓練＝正解率が上がるまで繰り返し調整すること"],
        ["03", "データの品質と量が、Accuracy をそのまま決める"],
      ],
      terms: [
        ["Dataset データセット", "訓練に使う例のひとまとまり。教師あり学習では答えが添えられる"],
        ["Accuracy 正解率", "当てた割合。評価には見たことのないデータを使って測る"],
      ],
    },
    "data": {
      t: "データ：AI の栄養", sub: "データセット、アノテーションと品質",
      key: [
        ["01", "AI の能力の天井は、データで決まる"],
        ["02", "アノテーション＝AI に「これは何か」の正解を教えること"],
        ["03", "汚いデータを入れれば、間違った結論が出る（garbage in, garbage out）"],
      ],
      terms: [
        ["Label ラベル", "人が付けた正解"],
        ["Bias データバイアス", "データの偏りが生む系統的なずれ"],
      ],
    },
    "deep-learning": {
      t: "深層学習", sub: "多層ネットワークで、層ごとに特徴を抽出する",
      key: [
        ["01", "浅い層は細部（エッジ）を、深い層は全体（顔）を見る"],
        ["02", "各層が前の層の結果をもう一段抽象化する"],
        ["03", "人が特徴を設計する必要はなく、ネットワークが自分で学ぶ"],
      ],
      terms: [
        ["Layer 層", "同時に計算を行うニューロンの集まり"],
        ["Feature 特徴", "モデルが自動でつかむ判断の手がかり"],
      ],
    },
    "neural-network": {
      t: "ニューラルネットワーク", sub: "ノード、つながり、重み",
      key: [
        ["01", "重み＝この線の重要度"],
        ["02", "正の重み＝賛成、負の重み＝反対"],
        ["03", "信号は層ごとに足し合わされ、押し込められ、最後に一つの判断になる"],
      ],
      terms: [
        ["Weight 重み", "つながりの強さ。正にも負にもなる"],
        ["Activation 活性化", "あるノードが点灯している度合い (0-1)"],
      ],
    },
    "training": {
      t: "訓練：勾配降下法", sub: "機械はどうやって自分で重みを見つけるのか",
      key: [
        ["01", "訓練＝重みを繰り返し微調整し、誤差を小さくすること"],
        ["02", "「誤差の坂」を下って最低点を探す"],
        ["03", "学習率＝一歩でどれだけ進むか"],
      ],
      terms: [
        ["Loss 損失", "モデルがどれくらいひどく間違えているかを表すスコア"],
        ["Gradient Descent 勾配降下法", "坂を下って損失が最小の場所を探す方法"],
      ],
    },
    "backprop": {
      t: "誤差逆伝播", sub: "誤差をどう一層ずつ逆向きに修正していくか",
      key: [
        ["01", "まず順伝播で答えを出し、後ろから責任を分担する"],
        ["02", "各重みが「どれだけ責任を負うべきか」が算出される"],
        ["03", "誤差逆伝播が深層ネットワークの学習を可能にした"],
      ],
      terms: [
        ["Backpropagation 誤差逆伝播", "誤差を後ろから前へ分配していくアルゴリズム"],
        ["Chain Rule 連鎖律", "責任を一層ずつ計算する数学的基盤"],
      ],
    },
    "embedding": {
      t: "Embedding", sub: "トークンと意味をベクトルに変える",
      key: [
        ["01", "コンピュータは文字が分からず、数字ベクトルしか分からない"],
        ["02", "意味が近い語は、ベクトルの位置も近い"],
        ["03", "ベクトルがあれば「類似度」を計算できる"],
      ],
      terms: [
        ["Embedding 埋め込み", "記号をベクトル空間へ写像すること"],
        ["Vector ベクトル", "意味を表す数字座標の並び"],
      ],
    },
    "transformer": {
      t: "Transformer", sub: "Attention で文脈を理解する",
      key: [
        ["01", "同じ「彼」が誰を指すかは文脈しだい"],
        ["02", "Attention ＝各単語が他のどの単語に注目すべきか"],
        ["03", "これで機械が初めて文の関係を本当に「読み取れる」ように"],
      ],
      terms: [
        ["Attention 注意", "単語と単語の間の関連の重み"],
        ["Context 文脈", "単語の意味を決める周りの言葉"],
      ],
    },
    "llm": {
      t: "大規模言語モデル", sub: "ひたすら次のトークンを予測する",
      key: [
        ["01", "ChatGPT は答えを調べているのではなく、次の文字を推測している"],
        ["02", "各ステップで候補文字の一覧全体の確率を計算する"],
        ["03", "一文字ずつつないで、まとまった回答を育てていく"],
      ],
      terms: [
        ["Token トークン", "文字の最小単位。だいたい一文字か一語にあたる"],
        ["Probability 確率", "各候補トークンが選ばれる可能性の高さ"],
      ],
    },
    "model-size": {
      t: "モデルの大きさ Model Size", sub: "パラメータ数、そしてなぜ大きいほど強いのか",
      key: [
        ["01", "パラメータ＝ネットワーク内のすべての重みの総数"],
        ["02", "パラメータが多いほど、覚えられる規則も複雑になる"],
        ["03", "ただし大きい＝高価・遅い、いつも割に合うわけではない"],
      ],
      terms: [
        ["Parameter パラメータ", "モデル内の調整できる重み 1 つ"],
        ["Scaling Law スケーリング則", "規模と能力のあいだの経験的な関係"],
      ],
    },
    "context-window": {
      t: "Context Window", sub: "モデルが一度に見られる内容の量",
      key: [
        ["01", "モデルには記憶の上限がある＝一度に読めるトークン数"],
        ["02", "上限を超えると、いちばん古い内容から押し出される"],
        ["03", "ウィンドウが大きいほど考慮できる文脈が増える（その分高い）"],
      ],
      terms: [
        ["Context Window コンテキストウィンドウ", "一度に処理できるトークンの上限"],
        ["Truncation 切り捨て", "ウィンドウを超えたとき古い内容を捨てること"],
      ],
    },
    "inference": {
      t: "推論 Inference", sub: "訓練の後、モデルは実際にどう動くのか",
      key: [
        ["01", "訓練＝規則を学ぶ（遅い、一度きり）；推論＝規則を使う（速い、毎回）"],
        ["02", "AI と対話するたびに、それは一度の推論"],
        ["03", "推論は計算力を消費するので、速度とコストが生じる"],
      ],
      terms: [
        ["Inference 推論", "訓練済みのモデルを使って出力を生み出すこと"],
        ["Latency 遅延", "入力から出力までの待ち時間"],
      ],
    },
    "pretraining": {
      t: "モデルから ChatGPT へ", sub: "公式はどうやってアシスタントを作るのか",
      key: [
        ["01", "事前学習：まず大量に読んで、言語そのものを習得する"],
        ["02", "指示チューニング：人間の指示どおり答えるよう教える"],
        ["03", "RLHF：人間の好みで答えをより役立ち、より安全にする"],
      ],
      terms: [
        ["Pretraining 事前学習", "大規模かつ教師なしの学習段階"],
        ["RLHF 人間のフィードバックによる強化学習", "人間の採点でモデルの振る舞いをチューニングする手法"],
      ],
    },
    "fine-tuning": {
      t: "Fine-tuning", sub: "自分のデータでモデルをカスタマイズする",
      key: [
        ["01", "汎用モデルを、特定分野のデータでもう一度訓練する"],
        ["02", "あなたの語調・書式・専門知識をモデルに覚えさせる"],
        ["03", "ゼロから訓練するよりずっと安い（巨人の肩の上に立つ）"],
      ],
      terms: [
        ["Fine-tuning ファインチューニング", "既存のモデルに小幅な再訓練を加えること"],
        ["LoRA", "一部のパラメータだけを調整する高効率な微調整法"],
      ],
    },
    "prompt": {
      t: "プロンプト：AI との対話のしかた", sub: "プロンプトが出力の品質を決める",
      key: [
        ["01", "文脈・役割・形式をはっきり伝えると、答えはより正確になる"],
        ["02", "例を出す（few-shot）ほうが、口で言うより効果的"],
        ["03", "同じ質問でも、聞き方を変えると結果が大きく変わる"],
      ],
      terms: [
        ["Prompt プロンプト", "モデルに渡す入力・指示"],
        ["Few-shot 少数事例", "プロンプトにいくつか例を添えること"],
      ],
    },
    "thought-partner": {
      t: "AI を思考のパートナーに", sub: "答えだけでなく、より良く考えるために",
      key: [
        ["01", "十分な文脈を与える：役割・目標・読み手・制約"],
        ["02", "同調させず、粗を突かせ反対の立場も言わせる"],
        ["03", "価値は一問一答でなく、往復のやり取りにある"],
      ],
      terms: [
        ["Sycophancy おべっか・同調", "AI が本音より、あなたに合わせて聞きたいことを言う傾向"],
        ["Context 文脈", "あなたが与える背景情報。回答の品質を左右する"],
      ],
    },
    "generative": {
      t: "生成 AI：AI はどう絵を描くか", sub: "ノイズから一歩ずつノイズ除去して画像にする（Diffusion）",
      key: [
        ["01", "まず画像にノイズを足して破壊し、次にそれを逆向きに復元することを学ぶ"],
        ["02", "生成＝純粋なノイズから一歩ずつノイズを除いていく"],
        ["03", "文字プロンプトがノイズ除去をどの方向へ進めるか誘導する"],
      ],
      terms: [
        ["Diffusion 拡散モデル", "ノイズの付加／除去によって生成する手法"],
        ["Denoising ノイズ除去", "ノイズから画像を復元すること"],
      ],
    },
    "multimodal": {
      t: "マルチモーダル Multimodal", sub: "AI は文字を読むだけでなく、見て、聞いて、生成できる",
      key: [
        ["01", "マルチモーダル＝文字・画像・音声・動画を同時に扱う"],
        ["02", "コツ：どの種類も「同じ意味ベクトル」にエンコードする"],
        ["03", "共有空間があれば、種類のあいだを自由に変換できる"],
      ],
      terms: [
        ["Multimodal マルチモーダル", "複数の種類（文字/画像/音声/動画）を扱えるモデル"],
        ["Modality モダリティ", "1 種類のデータ形式、例えば文字・画像・音声"],
      ],
    },
    "rag": {
      t: "RAG：AI に資料を調べさせる", sub: "先に検索、あとで生成",
      key: [
        ["01", "LLM は覚えているとは限らず、間違って覚えていることもある"],
        ["02", "まず知識ベースから関連断片を探し、それから LLM に答えさせる"],
        ["03", "ハルシネーションを減らせるうえ、出典も引用できる"],
      ],
      terms: [
        ["RAG 検索拡張生成", "外部知識を検索してから生成する"],
        ["Retrieval 検索", "ベクトル類似度で関連資料を見つける"],
      ],
    },
    "memory": {
      t: "Memory：AI はどうやってあなたを覚えるか", sub: "会話をまたぐ短期記憶と長期記憶",
      key: [
        ["01", "モデル自体に記憶はなく、毎回の会話は白紙"],
        ["02", "「覚える」のは外部が保存し、次回文脈に入れ直すこと"],
        ["03", "短期＝この会話；長期＝会話をまたぐメモ"],
      ],
      terms: [
        ["Memory 記憶", "会話の外に持続的に保存される情報"],
        ["State 状態", "ある会話で現在までに積み上がった内容"],
      ],
    },
    "mcp": {
      t: "MCP：AI をツールとデータにつなぐ", sub: "Model Context Protocol、AI の万能ソケット",
      key: [
        ["01", "ツールごとに個別につなぐと煩雑；MCP は統一規格"],
        ["02", "AI 界の USB-C のように：ひとつのつなぎ方で何でもつなげる"],
        ["03", "モデルは MCP を通じてデータを読みツールを使う、個別に書く必要なし"],
      ],
      terms: [
        ["MCP モデルコンテキストプロトコル", "モデルとツール／データをつなぐオープン標準"],
        ["Server サーバー", "MCP を通じてデータやツールを提供する側"],
      ],
    },
    "agent": {
      t: "AI Agent", sub: "自分で計画し、ツールを使い、目標を達成する",
      key: [
        ["01", "普通の AI は問い→答え。Agent は目標→自分で完成"],
        ["02", "タスクを分解し、何から手をつけるかを決める"],
        ["03", "ツール（検索、天気の確認…）を呼び出し、結果を統合できる"],
      ],
      terms: [
        ["Planning 計画", "大きな目標を実行可能な手順に分解すること"],
        ["Tool Use ツール", "Agent が外界に対して起こす行動"],
      ],
    },
    "integration": {
      t: "AI システム統合", sub: "データからアプリまでの全体像",
      key: [
        ["01", "前のどの章も、このパイプラインの一段"],
        ["02", "データが最下層、アプリケーションが最上層"],
        ["03", "全体像を理解すれば、AI アプリの設計を始められる"],
      ],
      terms: [
        ["Pipeline パイプライン", "データが流れていく一連の処理段階"],
        ["Application アプリケーション", "最終的にユーザーが実際に触れる製品"],
      ],
    },
    "limits": {
      t: "AI の限界：ハルシネーションと偏見", sub: "自信たっぷりに間違える",
      key: [
        ["01", "高い自信 ≠ 正確さ"],
        ["02", "ハルシネーション：存在しないことを堂々とでっち上げる"],
        ["03", "偏見はデータに由来し、モデルに増幅される"],
      ],
      terms: [
        ["Hallucination ハルシネーション", "モデルがもっともらしい誤りをでっち上げること"],
        ["Bias バイアス", "体系的で不公平な傾向"],
      ],
    },
    "evaluation": {
      t: "AI 評価 Evaluation", sub: "AI の回答の良し悪しをどう判断するか",
      key: [
        ["01", "良し悪しには基準がある：正確・網羅・的確・ハルシネーションなし"],
        ["02", "ベンチマーク＝標準化されたテストで、モデルを比較できるようにする"],
        ["03", "新しく大きいほど全勝とは限らない、あなたのタスク次第"],
      ],
      terms: [
        ["Benchmark ベンチマーク", "標準化された問題のセットで、モデルの能力を比較するために使う"],
        ["Evaluation 評価", "明確な基準を使って出力の良し悪しを判断すること"],
      ],
    },
    "capstone": {
      t: "AI で何ができるか", sub: "マップを行動に変える（総まとめ）",
      key: [
        ["01", "データから応用までの全体像マップがもう手元にある"],
        ["02", "身近な課題を 1 つ選び、このパイプラインに乗せる"],
        ["03", "疑う姿勢を保つ：AI の出力は必ず検証する"],
      ],
      terms: [
        ["Use Case 応用場面", "AI を具体的な課題に当てはめること"],
        ["Verification 検証", "AI の出力が信頼できるかをチェックすること"],
      ],
    },
  },
};
