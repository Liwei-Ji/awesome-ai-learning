<script>
  /* Ch23 · 系統整合。
     一條由下而上的管線；點任一段展開它的角色，按「送出資料」讓
     highlight 依序流過每一段。state = expanded（展開集合）、hi（目前高亮段）、
     sending（送出進行中）、arrived（抵達頂層的短暫提示）。 */
  import { onDestroy } from 'svelte';
  import { SvelteSet } from 'svelte/reactivity';
  import { dur } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';
  import ConceptGraph from '../components/ConceptGraph.svelte';

  const NAMES = ['Data', 'Machine Learning', 'Deep Learning', 'Neural Network', 'Transformer', 'LLM', 'AI Agent', 'Application'];

  const L = {
    zh: {
      h3a: '互動：AI 的完整管線',
      lede1: '你學過的每一章，都是這條管線的一段。按「送出資料」看訊號從底層流到應用；點任一段看它的角色。',
      cue: '點任一段看它的角色，或按「送出資料」看訊號從底層流到應用。',
      roles: ['資料', '從資料找規律', '多層抽特徵', '節點與權重', '理解上下文', '預測下一個 Token', '規劃＋工具', '應用'],
      details: ['原始素材：文字、圖片、紀錄', '訓練模型抓出模式', '逐層把資料抽象化', '運算的實際載體', '用 Attention 讀懂關係', '生成語言的引擎', '自主完成目標', '使用者實際接觸的產品'],
      send: '▶ 送出資料',
      sig: '訊號位置：',
      arrived: '✓ 抵達應用層',
      restart: '重來',
      hint: '由下而上：資料在底層，應用在頂層。看懂這條管線，你就有了<b>設計 AI 應用的地圖</b>，接下來就是挑一個真實問題套進去。',
      h3b: '課程全景：25 個知識點怎麼互相依賴',
      lede2: '整門課其實是一張網。滑過任一個知識點，看它<b>依賴哪些前置概念</b>、又被哪些後續應用用到；點擊可跳到該章。',
    },
    en: {
      h3a: 'Interactive: the full AI pipeline',
      lede1: 'Every chapter you’ve learned is one segment of this pipeline. Press “Send data” to watch the signal flow from the bottom layer up to the application; tap any segment to see its role.',
      cue: 'Tap any segment to see its role, or press “Send data” to watch the signal flow from the bottom up to the application.',
      roles: ['Raw material', 'Finds patterns in data', 'Extracts features in layers', 'Nodes and weights', 'Understands context', 'Predicts the next token', 'Planning + tools', 'Application'],
      details: ['The raw stuff: text, images, records', 'Trains a model to catch patterns', 'Abstracts the data layer by layer', 'The actual engine that runs the computation', 'Uses Attention to read relationships', 'The engine that generates language', 'Completes goals on its own', 'The product users actually touch'],
      send: '▶ Send data',
      sig: 'Signal at: ',
      arrived: '✓ Reached the application layer',
      restart: 'Restart',
      hint: 'Bottom-up: data sits at the base, the application at the top. Once you understand this pipeline, you’ve got a <b>map for designing AI apps</b>, next, just pick a real problem and drop it in.',
      h3b: 'Course map: how the 25 concepts depend on one another',
      lede2: 'The whole course is really a web. Hover over any concept to see <b>which prerequisite concepts it depends on</b> and which later applications use it; click to jump to that chapter.',
    },
    ja: {
      h3a: 'インタラクティブ：AI の完全なパイプライン',
      lede1: 'これまで学んだ各章は、このパイプラインの一段です。「データを送る」を押すと、信号が最下層からアプリケーションまで流れていきます。どの段でもタップすると、その役割が見られます。',
      cue: 'どの段でもタップすると役割が見られます。または「データを送る」を押して、信号が下から上のアプリケーションまで流れる様子を見てみましょう。',
      roles: ['生の素材', 'データから規則を見つける', '層ごとに特徴を抽出', 'ノードと重み', '文脈を理解する', '次のトークンを予測', '計画＋ツール', 'アプリケーション'],
      details: ['生の材料：テキスト・画像・記録', 'モデルを学習させてパターンを捉える', 'データを層ごとに抽象化していく', '計算を実際に動かす土台', 'Attention で関係性を読み取る', '言語を生成するエンジン', '目標を自律的に達成する', 'ユーザーが実際に触れる製品'],
      send: '▶ データを送る',
      sig: '信号の位置：',
      arrived: '✓ アプリケーション層に到達',
      restart: 'やり直す',
      hint: '下から上へ：データが最下層、アプリケーションが最上層です。このパイプラインが分かれば、<b>AI アプリを設計するための地図</b>が手に入ります、あとは現実の問題を 1 つ選んで、そこに当てはめるだけです。',
      h3b: 'コース全体像：25 個の概念はどう依存し合うか',
      lede2: 'コース全体は、実は 1 枚の網です。どの概念でもマウスを乗せると、<b>どの前提概念に依存しているか</b>、そしてどの後続の応用で使われるかが見られます。クリックするとその章に移動します。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let expanded = new SvelteSet();
  let hi = $state(-1);
  let sending = $state(false);
  let arrived = $state(false);
  let timer;

  let hiName = $derived(hi >= 0 ? NAMES[hi] : '');

  function toggle(i) { expanded.has(i) ? expanded.delete(i) : expanded.add(i); }

  function send() {
    clearTimeout(timer); sending = true; arrived = false; hi = -1;
    let i = 0;
    const step = () => {
      if (i < NAMES.length) { hi = i; i++; timer = setTimeout(step, dur(400)); }
      else {
        arrived = true;
        timer = setTimeout(() => {
          hi = -1; sending = false;
          timer = setTimeout(() => { arrived = false; }, dur(1400));
        }, dur(600));
      }
    };
    step();
  }

  function reset() {
    clearTimeout(timer);
    sending = false; arrived = false; hi = -1;
    expanded.clear();
  }

  onDestroy(() => clearTimeout(timer));
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3a}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    {ui.lede1}
  </p>

  <div class="demo-stage light">
    <p class="cue">{ui.cue}</p>

    <div class="col">
      {#each NAMES as name, i}
        {@const isOpen = expanded.has(i)}
        <button class="cell" class:hi={i === hi} class:open={isOpen} onclick={() => toggle(i)}>
          <div class="head">
            <span class="mono idx">0{i + 1}</span>
            <b class="mono name">{name}</b>
            <span class="role">{ui.roles[i]}</span>
            <span class="mono chev">{isOpen ? '▾' : '▸'}</span>
          </div>
          <div class="det" class:open={isOpen}>{ui.details[i]}</div>
        </button>
        {#if i < NAMES.length - 1}<div class="mono arrow">↓</div>{/if}
      {/each}
    </div>

    <div class="guide-actions">
      <button class="btn primary" disabled={sending} onclick={send}>{ui.send}</button>
      {#if sending && !arrived}
        <span class="fieldk sig">{ui.sig}<b>{hiName}</b></span>
      {:else if arrived}
        <span class="fieldk done">{ui.arrived}</span>
      {/if}
      <button class="btn ghost" onclick={reset}>{ui.restart}</button>
    </div>
  </div>

  <p class="hint">
    {@html ui.hint}
  </p>
</div>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3b}</h3><span class="eyebrow">Interactive</span></div>
  <p class="lede">
    {@html ui.lede2}
  </p>
  <div class="demo-stage light">
    <ConceptGraph />
  </div>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .cue { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-cap); }

  .col { display: flex; flex-direction: column; gap: 0; }
  .cell {
    position: relative; width: 100%; text-align: left;
    padding: var(--sp-3) var(--sp-4); border: 1px solid var(--line); border-radius: var(--r);
    background: var(--surface-2); cursor: pointer; transition: .25s; margin-bottom: var(--sp-1);
  }
  .cell.open { border-color: var(--line-2); }
  .cell.hi { border-color: var(--accent); background: var(--glow); transform: translateX(6px); }
  .head { display: flex; align-items: center; gap: var(--sp-3); }
  .idx { font-size: var(--fs-micro); color: var(--muted); width: 20px; }
  .name { font-size: var(--fs-sm); color: var(--accent-ink); }
  .role { font-size: var(--fs-cap); color: var(--ink-2); }
  .chev { margin-left: auto; font-size: var(--fs-cap); color: var(--muted); transition: color .25s; }
  .cell.open .chev, .cell:hover .chev { color: var(--accent-ink); }
  .det { font-size: var(--fs-cap); color: var(--muted); margin-top: 0; max-height: 0; overflow: hidden; transition: .25s; }
  .det.open { max-height: 40px; margin-top: var(--sp-1); }
  .arrow { text-align: center; color: var(--muted); font-size: var(--fs-sm); margin: 1px 0; }

  .sig, .done { font-size: var(--fs-cap); }
  .sig b { color: var(--accent-ink); }
  .done { color: var(--good); }
</style>
