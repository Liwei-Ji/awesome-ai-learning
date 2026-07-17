<script>
  /* Ch · 總結：你能用 AI 做什麼。把整條課程的積木組成真實方案。
     選一個目標，看要用到哪些概念（點積木可跳回該章複習），把地圖變成行動。亮色、離線。 */
  import { CH } from '../data/chapters.js';
  import { go } from '../stores/state.svelte.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const BLOCKS = ['data', 'llm', 'prompt', 'rag', 'fine-tuning', 'memory', 'agent', 'mcp', 'generative'];
  const GOALS = [
    ['data', 'llm', 'rag', 'prompt', 'memory'],
    ['data', 'llm', 'fine-tuning', 'rag', 'prompt', 'memory'],
    ['data', 'llm', 'agent', 'mcp', 'memory'],
    ['data', 'generative', 'prompt'],
  ];

  const L = {
    zh: {
      h3: '互動：組裝你的 AI 方案',
      lede: '恭喜你走完整條路 🎓 從資料、模型、LLM 到 Agent，每一章都是一塊積木。 挑一個真實目標，看它需要用到哪些積木，這就是<b>設計 AI 應用</b>的思路。（點積木可跳回該章複習）',
      wantLabel: '我想做：',
      blocksLabel: '課程積木（亮起＝這個方案會用到）',
      blockTitle: '跳到該章複習',
      recipeLabel: '方案配方',
      hint: '看出來了嗎？大多數 AI 產品，都是這些積木的<b>組合</b>。開始的訣竅：先用<b>現成模型 + 好提示</b>解決八成問題， 需要私有資料就加 <b>RAG</b>、要固定風格再 <b>微調</b>、要自動執行才上 <b>Agent</b>。 最後一件事，<b>永遠驗證 AI 的輸出</b>。你已經有整張地圖了，去做點東西吧！',
      goals: ['公司知識問答機器人', '品牌客服助手', '幫我安排行程的助理', 'AI 生圖工具'],
      blocks: { data: '資料', llm: '大型語言模型', prompt: 'Prompt', rag: 'RAG 檢索', 'fine-tuning': 'Fine-tuning', memory: 'Memory', agent: 'AI Agent', mcp: 'MCP', generative: '生成式 AI' },
      need: [
        { data: '公司內部文件＝知識來源', llm: '理解問題、生成回答', rag: '查公司內部文件並附來源', prompt: '設定角色與回答格式', memory: '記住使用者的情境' },
        { data: 'FAQ、訂單、對話當語料', llm: '對話核心', 'fine-tuning': '學會品牌專屬語氣', rag: '查 FAQ 與訂單資料', prompt: '禮貌用語與處理流程', memory: '記住這位客戶' },
        { data: '你的行事曆與偏好', llm: '理解你的目標', agent: '自己拆步驟、呼叫工具', mcp: '用標準接上行事曆／地圖', memory: '記住你的偏好' },
        { data: '模型背後的海量訓練圖像', generative: '從雜訊去噪成圖', prompt: '描述你想要的畫面' },
      ],
    },
    en: {
      h3: 'Interactive: assemble your AI solution',
      lede: 'Congrats on making it all the way through 🎓 From data and models to LLMs and Agents, every chapter is a building block. Pick a real goal and see which blocks it needs, that’s how you <b>design an AI application</b>. (Click a block to jump back and review that chapter.)',
      wantLabel: 'I want to build:',
      blocksLabel: 'Course blocks (lit = used by this solution)',
      blockTitle: 'Jump to that chapter to review',
      recipeLabel: 'Solution recipe',
      hint: 'See the pattern? Most AI products are just <b>combinations</b> of these blocks. The trick to starting: first solve 80% of the problem with an <b>off-the-shelf model + a good prompt</b>, add <b>RAG</b> when you need private data, <b>fine-tune</b> for a fixed style, and bring in an <b>Agent</b> only when you need automatic execution. One last thing, <b>always verify AI’s output</b>. You’ve got the whole map now, so go build something!',
      goals: ['Company knowledge Q&A bot', 'Brand customer-service assistant', 'A scheduling assistant', 'AI image generator'],
      blocks: { data: 'Data', llm: 'LLM', prompt: 'Prompt', rag: 'RAG', 'fine-tuning': 'Fine-tuning', memory: 'Memory', agent: 'AI Agent', mcp: 'MCP', generative: 'Generative AI' },
      need: [
        { data: 'Internal company documents = knowledge source', llm: 'Understand the question, generate the answer', rag: 'Search internal docs and cite sources', prompt: 'Set the role and answer format', memory: 'Remember the user’s context' },
        { data: 'FAQs, orders, and chats as training data', llm: 'The conversation core', 'fine-tuning': 'Learn the brand’s signature tone', rag: 'Look up FAQ and order data', prompt: 'Polite wording and handling steps', memory: 'Remember this customer' },
        { data: 'Your calendar and preferences', llm: 'Understand your goal', agent: 'Break down steps and call tools on its own', mcp: 'Connect to calendar/maps via a standard', memory: 'Remember your preferences' },
        { data: 'The huge trove of training images behind the model', generative: 'Denoise from noise into an image', prompt: 'Describe the picture you want' },
      ],
    },
    ja: {
      h3: 'インタラクティブ：あなたの AI ソリューションを組み立てる',
      lede: 'ここまで走り抜けておめでとうございます 🎓 データやモデルから LLM、Agent まで、どの章も一つの積み木です。 身近な目標を一つ選び、それにどの積み木が必要かを見てみましょう、これが<b>AI アプリを設計する</b>という考え方です。（積み木をクリックすると、その章に戻って復習できます。）',
      wantLabel: '作りたいもの：',
      blocksLabel: 'コースの積み木（点灯＝このソリューションで使う）',
      blockTitle: 'その章に飛んで復習する',
      recipeLabel: 'ソリューションのレシピ',
      hint: 'パターンが見えましたか？たいていの AI プロダクトは、これらの積み木の<b>組み合わせ</b>にすぎません。 始めるコツは、まず<b>既製モデル＋良いプロンプト</b>で 8 割の問題を片づけ、 自分のデータが要るときに <b>RAG</b>、決まった作風にしたいときに<b>ファインチューニング</b>、 自動で実行させたいときだけ <b>Agent</b> を持ち込むこと。 最後にもう一つ、<b>AI の出力は必ず検証する</b>。もう地図は全部そろっています。さあ、何か作ってみましょう！',
      goals: ['社内ナレッジ Q&A ボット', 'ブランドのカスタマーサポートアシスタント', '予定を組んでくれるアシスタント', 'AI 画像生成ツール'],
      blocks: { data: 'データ', llm: 'LLM', prompt: 'プロンプト', rag: 'RAG', 'fine-tuning': 'ファインチューニング', memory: 'メモリ', agent: 'AI エージェント', mcp: 'MCP', generative: '生成 AI' },
      need: [
        { data: '社内文書＝知識のもと', llm: '質問を理解し、答えを生成する', rag: '社内文書を調べて出典を添える', prompt: '役割と回答フォーマットを決める', memory: 'ユーザーの状況を覚えておく' },
        { data: 'FAQ・注文・対話を学習データにする', llm: '会話の中核', 'fine-tuning': 'ブランド独自の口調を身につける', rag: 'FAQ と注文データを調べる', prompt: '丁寧な言い回しと対応手順', memory: 'この顧客を覚えておく' },
        { data: 'あなたのカレンダーと好み', llm: 'あなたの目的を理解する', agent: '自分で手順に分けてツールを呼ぶ', mcp: '標準規格でカレンダー／地図につなぐ', memory: 'あなたの好みを覚えておく' },
        { data: 'モデルの背後にある膨大な訓練画像', generative: 'ノイズから画像へとノイズ除去する', prompt: '欲しい絵柄を言葉で描写する' },
      ],
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let idx = $state(0);
  let goal = $derived(GOALS[idx]);
  const idOf = (slug) => Number(Object.keys(CH).find((k) => CH[k].slug === slug));
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="pills">
      <span class="mono k">{ui.wantLabel}</span>
      {#each GOALS as g, i}<button class="pl" class:on={i === idx} onclick={() => (idx = i)}>{ui.goals[i]}</button>{/each}
    </div>

    <div class="mono k blab">{ui.blocksLabel}</div>
    <div class="blocks">
      {#each BLOCKS as b}
        {@const need = goal.includes(b)}
        <button class="block" class:on={need} onclick={() => go(idOf(b))} title={ui.blockTitle}>
          {ui.blocks[b]}
        </button>
      {/each}
    </div>

    <div class="recipe">
      <div class="mono k">{ui.recipeLabel} · {ui.goals[idx]}</div>
      {#each BLOCKS.filter((b) => goal.includes(b)) as b, i}
        <div class="step">
          <span class="sn">{i + 1}</span>
          <span class="sb">{ui.blocks[b]}</span>
          <span class="sw">{ui.need[idx][b]}</span>
        </div>
      {/each}
    </div>
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .k { font-size: var(--fs-eyebrow); letter-spacing: .1em; color: var(--muted); }
  .blab { display: block; margin: var(--sp-1) 0 var(--sp-2); }
  .pills { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; margin-bottom: var(--sp-3); }
  .pl { font-size: var(--fs-cap); padding: 6px 13px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); }
  .pl:hover { border-color: var(--accent); color: var(--accent-ink); }
  .pl.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }

  .blocks { display: flex; flex-wrap: wrap; gap: var(--sp-2); margin-bottom: var(--sp-4); }
  .block { font-size: var(--fs-cap); padding: 8px 14px; border-radius: var(--r); border: 1px solid var(--line); background: var(--surface-2); color: var(--muted); cursor: pointer; transition: .2s; opacity: .55; }
  .block:hover { border-color: var(--accent); }
  .block.on { opacity: 1; background: #0f8a800c; border-color: var(--teal); color: var(--teal); font-weight: 600; }

  .recipe { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 12px 14px; }
  .step { display: grid; grid-template-columns: 22px 96px 1fr; align-items: center; gap: var(--sp-2); padding: 7px 0; border-bottom: 1px dashed var(--line); font-size: var(--fs-sm); }
  .step:last-child { border-bottom: none; }
  .sn { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; background: var(--accent); color: #241500; font-family: var(--mono); font-size: var(--fs-micro); }
  .sb { color: var(--teal); font-weight: 600; }
  .sw { color: var(--ink-2); }
</style>
