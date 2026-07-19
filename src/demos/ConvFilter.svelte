<script>
  /* Ch · CNN。3×3 濾鏡在整張圖上滑動，算出右邊的特徵圖；換濾鏡看它抓什麼（直邊/橫邊/模糊）。
     下面一條「邊緣→形狀→物件」示意疊層階層。亮色舞台。多語。 */
  import { onDestroy } from 'svelte';
  import { i18n } from '../stores/i18n.svelte.js';

  const N = 9, M = N - 2; // 輸出 7×7
  const IMG = (() => { const a = []; for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) { const d = Math.hypot(r - 4, c - 4); a.push(d <= 3.3 ? 1 : 0); } return a; })();
  const FILTERS = { ev: [1, 0, -1, 1, 0, -1, 1, 0, -1], eh: [1, 1, 1, 0, 0, 0, -1, -1, -1], blur: [1, 1, 1, 1, 1, 1, 1, 1, 1] };

  const L = {
    zh: {
      h3: '互動：小濾鏡滑過整張圖，抓出邊緣',
      lede: 'CNN 用一個 <b>3×3 濾鏡</b>在整張圖上一格格滑，算出右邊的<b>特徵圖</b>：濾鏡對上的花樣就會亮。換濾鏡看它各自抓什麼。',
      fev: '直邊', feh: '橫邊', fblur: '模糊', image: '輸入圖', feat: '特徵圖',
      btnAuto: '▶ 自動掃', btnPause: '⏸ 暫停', btnReset: '重置',
      hier: '邊緣 → 形狀 → 物件',
      hierNote: '疊很多層，就從邊緣一路認到整張臉。',
      hints: { ev: '<b>直邊濾鏡</b>：在垂直邊緣（左右輪廓）最亮。', eh: '<b>橫邊濾鏡</b>：在水平邊緣（上下輪廓）最亮。', blur: '<b>模糊濾鏡</b>：把鄰近像素平均，邊緣被抹平、只剩大致的塊。' },
    },
    en: {
      h3: 'Interactive: a small filter slides over the image and finds edges',
      lede: 'A CNN slides one <b>3×3 filter</b> across the whole image to compute the <b>feature map</b> on the right: it lights up where the filter matches a pattern. Switch filters to see what each one catches.',
      fev: 'Vertical edge', feh: 'Horizontal edge', fblur: 'Blur', image: 'Input', feat: 'Feature map',
      btnAuto: '▶ Auto-scan', btnPause: '⏸ Pause', btnReset: 'Reset',
      hier: 'edges → shapes → objects',
      hierNote: 'Stack many layers and it goes from edges all the way to a whole face.',
      hints: { ev: '<b>Vertical-edge filter</b>: brightest on vertical edges (the left and right rim).', eh: '<b>Horizontal-edge filter</b>: brightest on horizontal edges (the top and bottom rim).', blur: '<b>Blur filter</b>: averages neighboring pixels, so edges wash out and only the rough blob remains.' },
    },
    ja: {
      h3: 'インタラクティブ：小さなフィルタが画像を滑り、輪郭を見つける',
      lede: 'CNN は一つの <b>3×3 フィルタ</b>を画像全体に滑らせ、右の<b>特徴マップ</b>を計算します。フィルタが模様に一致した場所が光ります。フィルタを切り替えて、それぞれが何を捉えるか見てみましょう。',
      fev: '縦エッジ', feh: '横エッジ', fblur: 'ぼかし', image: '入力', feat: '特徴マップ',
      btnAuto: '▶ 自動スキャン', btnPause: '⏸ 一時停止', btnReset: 'リセット',
      hier: 'エッジ → 形 → 物体',
      hierNote: '層を重ねると、エッジから顔全体まで認識できるようになります。',
      hints: { ev: '<b>縦エッジフィルタ</b>：縦の輪郭（左右の縁）で最も明るい。', eh: '<b>横エッジフィルタ</b>：横の輪郭（上下の縁）で最も明るい。', blur: '<b>ぼかしフィルタ</b>：近くの画素を平均し、エッジが消えて大まかな塊だけが残る。' },
    },
  };
  let ui = $derived(L[i18n.locale] || L.zh);

  let filter = $state('ev');
  let pos = $state(24);
  let running = $state(false);
  let timer;

  let out = $derived.by(() => {
    const k = FILTERS[filter], blur = filter === 'blur', raw = [];
    for (let r = 0; r < M; r++) for (let c = 0; c < M; c++) {
      let s = 0;
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) s += IMG[(r + i) * N + (c + j)] * k[i * 3 + j];
      raw.push(blur ? s / 9 : s);
    }
    if (blur) return raw;
    const mx = Math.max(1, ...raw.map((v) => Math.abs(v)));
    return raw.map((v) => Math.abs(v) / mx);
  });
  let or = $derived(Math.floor(pos / M));
  let oc = $derived(pos % M);

  function scan() {
    if (running) { running = false; clearTimeout(timer); return; }
    running = true;
    const tick = () => { if (!running) return; pos = (pos + 1) % (M * M); timer = setTimeout(tick, 240); };
    tick();
  }
  function reset() { clearTimeout(timer); running = false; pos = 24; }
  function setFilter(f) { filter = f; }
  onDestroy(() => clearTimeout(timer));
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="filters">
    <button class="ftr" class:on={filter === 'ev'} onclick={() => setFilter('ev')}>{ui.fev}</button>
    <button class="ftr" class:on={filter === 'eh'} onclick={() => setFilter('eh')}>{ui.feh}</button>
    <button class="ftr" class:on={filter === 'blur'} onclick={() => setFilter('blur')}>{ui.fblur}</button>
  </div>

  <div class="demo-stage light">
    <div class="conv">
      <div class="col">
        <span class="clab">{ui.image}</span>
        <div class="grid img">
          {#each IMG as v, idx}
            {@const r = Math.floor(idx / N)}{@const c = idx % N}
            <span class="px" class:hl={r >= or && r < or + 3 && c >= oc && c < oc + 3} style="background:rgba(20,24,33,{(v * 0.9).toFixed(2)})"></span>
          {/each}
        </div>
      </div>
      <span class="arrow">→</span>
      <div class="col">
        <span class="clab">{ui.feat}</span>
        <div class="grid feat">
          {#each out as v, idx}
            <span class="oc" class:cur={idx === pos} style="background:rgba(15,138,128,{(0.1 + v * 0.85).toFixed(3)})"></span>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <div class="btn-row">
    <button class="btn primary" onclick={scan}>{running ? ui.btnPause : ui.btnAuto}</button>
    <button class="btn ghost" onclick={reset}>{ui.btnReset}</button>
  </div>

  <p class="hint">{@html ui.hints[filter]}</p>

  <div class="hier">
    <span class="he">{ui.hier}</span>
    <span class="hn">{ui.hierNote}</span>
  </div>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .lede :global(b) { color: var(--ink); }

  .filters { display: flex; gap: 8px; margin-bottom: 12px; }
  .ftr { flex: 1; border: 1px solid var(--line); background: var(--surface); color: var(--ink-2); font-family: inherit; font-size: var(--fs-sm); font-weight: 600; padding: 9px 8px; border-radius: var(--r-sm); cursor: pointer; transition: .15s; }
  .ftr:hover { border-color: var(--accent); }
  .ftr.on { border-color: var(--accent); background: var(--accent); color: #3a1e00; }

  .conv { display: flex; align-items: center; justify-content: center; gap: 18px; }
  .col { display: grid; justify-items: center; gap: 8px; }
  .clab { font-family: var(--mono); font-size: var(--fs-eyebrow); letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }
  .grid { display: grid; gap: 2px; background: var(--line); padding: 2px; border-radius: 6px; }
  .grid.img { grid-template-columns: repeat(9, 24px); }
  .grid.feat { grid-template-columns: repeat(7, 24px); }
  .px, .oc { width: 24px; height: 24px; border-radius: 2px; background: var(--surface); }
  .px { transition: box-shadow .12s; }
  .px.hl { box-shadow: inset 0 0 0 2px var(--accent); }
  .oc.cur { box-shadow: 0 0 0 2px var(--accent); }
  .arrow { color: var(--accent-ink); font-size: 24px; font-weight: 700; }

  .btn-row { display: flex; gap: 8px; margin-top: 14px; }
  .hint { font-size: var(--fs-sm); color: var(--muted); line-height: var(--lh-body); margin: var(--sp-3) 0 0; }
  .hint :global(b) { color: var(--accent-ink); }
  .hier { margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--line); display: flex; flex-direction: column; gap: 3px; }
  .hier .he { font-family: var(--mono); font-size: var(--fs-sm); color: var(--teal); font-weight: 600; letter-spacing: .04em; }
  .hier .hn { font-size: var(--fs-cap); color: var(--muted); }
</style>
