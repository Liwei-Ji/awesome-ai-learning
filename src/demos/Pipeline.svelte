<script>
  /* Ch23 · 系統整合。
     一條由下而上的管線；點任一段展開它的角色，按「送出資料」讓
     highlight 依序流過每一段。state = expanded（展開集合）、hi（目前高亮段）、
     sending（送出進行中）、arrived（抵達頂層的短暫提示）。 */
  import { onDestroy } from 'svelte';
  import { SvelteSet } from 'svelte/reactivity';
  import { dur } from '../lib/motion.js';
  import ConceptGraph from '../components/ConceptGraph.svelte';

  const STACK = [
    ['Data', '資料', '原始素材：文字、圖片、紀錄'],
    ['Machine Learning', '從資料找規律', '訓練模型抓出模式'],
    ['Deep Learning', '多層抽特徵', '逐層把資料抽象化'],
    ['Neural Network', '節點與權重', '運算的實際載體'],
    ['Transformer', '理解上下文', '用 Attention 讀懂關係'],
    ['LLM', '預測下一個 Token', '生成語言的引擎'],
    ['AI Agent', '規劃＋工具', '自主完成目標'],
    ['Application', '應用', '使用者實際接觸的產品'],
  ];

  let expanded = new SvelteSet();
  let hi = $state(-1);
  let sending = $state(false);
  let arrived = $state(false);
  let timer;

  let hiName = $derived(hi >= 0 ? STACK[hi][0] : '');

  function toggle(i) { expanded.has(i) ? expanded.delete(i) : expanded.add(i); }

  function send() {
    clearTimeout(timer); sending = true; arrived = false; hi = -1;
    let i = 0;
    const step = () => {
      if (i < STACK.length) { hi = i; i++; timer = setTimeout(step, dur(400)); }
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
  <div class="panel-h"><h3>互動：AI 的完整管線</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    你學過的每一章，都是這條管線的一段。按「送出資料」看訊號從底層流到應用；點任一段看它的角色。
  </p>

  <div class="demo-stage light">
    <p class="cue">👆 點任一段看它的角色，或按「送出資料」看訊號從底層流到應用。</p>

    <div class="col">
      {#each STACK as s, i}
        {@const isOpen = expanded.has(i)}
        <button class="cell" class:hi={i === hi} class:open={isOpen} onclick={() => toggle(i)}>
          <div class="head">
            <span class="mono idx">0{i + 1}</span>
            <b class="mono name">{s[0]}</b>
            <span class="role">{s[1]}</span>
            <span class="mono chev">{isOpen ? '▾' : '▸'}</span>
          </div>
          <div class="det" class:open={isOpen}>{s[2]}</div>
        </button>
        {#if i < STACK.length - 1}<div class="mono arrow">↓</div>{/if}
      {/each}
    </div>

    <div class="guide-actions">
      <button class="btn primary" disabled={sending} onclick={send}>▶ 送出資料</button>
      {#if sending && !arrived}
        <span class="fieldk sig">訊號位置：<b>{hiName}</b></span>
      {:else if arrived}
        <span class="fieldk done">✓ 抵達應用層</span>
      {/if}
      <button class="btn ghost" onclick={reset}>重來</button>
    </div>
  </div>

  <p class="hint">
    由下而上：資料在底層，應用在頂層。看懂這條管線，你就有了<b>設計 AI 應用的地圖</b>——接下來就是挑一個真實問題套進去。
  </p>
</div>

<div class="panel">
  <div class="panel-h"><h3>課程全景：25 個知識點怎麼互相依賴</h3><span class="eyebrow">Interactive</span></div>
  <p class="lede">
    整門課其實是一張網。滑過任一個知識點，看它<b>依賴哪些前置概念</b>、又被哪些後續應用用到；點擊可跳到該章。
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
