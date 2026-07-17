<script>
  /* Ch · 模型大小 Model Size。參數＝網路裡所有權重的總數。
     拖動「模型大小」：參數場（發光點）填滿、能力沿 scaling-law 曲線上升，
     但成本/執行門檻也跟著漲，從手機可跑到只能塞進資料中心。
     深色舞台、確定性、離線。 */
  import { clamp } from '../lib/helpers.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const COLS = 28, ROWS = 12, N = COLS * ROWS;
  const FW = 560, FH = 232, mX = 20, mY = 16;
  const cellW = (FW - 2 * mX) / (COLS - 1);
  const cellH = (FH - 2 * mY) / (ROWS - 1);
  const dots = Array.from({ length: N }, (_, i) => ({ i, cx: mX + (i % COLS) * cellW, cy: mY + Math.floor(i / COLS) * cellH }));

  const tOf = (p) => clamp(((Math.log10(p) - 7) / 5) * 100, 0, 100); // params → slider
  let t = $state(45);

  let log10p = $derived(7 + (t / 100) * 5);
  let params = $derived(10 ** log10p);
  let cap = $derived(clamp(Math.round(18 * (log10p - 6.3)), 2, 99));
  let litCount = $derived(Math.round((t / 100) * N));
  let costW = $derived(Math.round(t));          // 成本 bar（隨對數線性成長）
  let speedW = $derived(Math.round(100 - t));    // 速度 bar（越大越慢）

  function fmt(p) {
    if (p >= 1e12) return (p / 1e12).toFixed(p >= 1e13 ? 0 : 1) + 'T';
    if (p >= 1e9) return (p / 1e9).toFixed(p >= 1e10 ? 0 : 1) + 'B';
    if (p >= 1e6) return (p / 1e6).toFixed(0) + 'M';
    return Math.round(p) + '';
  }
  const TIER_ICON = ['📱', '💻', '🖥️', '🏢'];
  function tierIdx(p) {
    if (p < 3e9) return 0;
    if (p < 2e10) return 1;
    if (p < 2e11) return 2;
    return 3;
  }
  let trIdx = $derived(tierIdx(params));

  const PRESET_P = [1e9, 8e9, 7e10, 5e11];

  const L = {
    zh: {
      h3: '互動：模型越大，到底差在哪？',
      lede: '模型的「大小」＝它有多少<b>參數（權重）</b>。拖動看看：參數越多，能力越強，\n    但<b>成本與門檻也一起漲</b>，從手機跑得動，到只能塞進整座資料中心。',
      fieldCap: '參數場 · 每個亮點代表一批參數（權重）',
      unit: '參數',
      capK: '能力 Capability', costK: '運算成本', speedK: '推論速度',
      costLv: ['低', '中', '高', '極高'], speedLv: ['快', '中', '慢'],
      envK: '跑得動它的地方',
      tierEnv: ['手機也能跑', '筆電 / 單張顯卡', '多張顯卡（雲端）', '資料中心'],
      tierNote: ['即時、便宜、可離線（裝置端）', '開源模型，個人可自架', '能力強，需要不少算力', '最聰明，但也最貴、最慢'],
      curveK: 'Scaling Law · 能力 vs 參數量（對數）',
      curveSmall: '小', curveBig: '超大',
      ctlLab: '模型大小（參數量）',
      presets: ['手機小模型', '開源中模型', '大模型', '前沿超大'],
      hint: '這就是 <b>Scaling Law（縮放定律）</b>：參數每放大 10 倍，能力就穩定往上一階，所以大家一直把模型堆大。\n    但代價是<b>算力、成本、延遲同步暴增</b>，大到某個程度就只有資料中心養得起。所以「更大」不總是「更划算」，要看你的任務需不需要。',
    },
    en: {
      h3: 'Interactive: what actually changes as a model gets bigger?',
      lede: 'A model’s “size” = how many <b>parameters (weights)</b> it has. Drag to see: more parameters means more capability,\n    but <b>cost and requirements climb too</b>, from running on a phone to barely fitting inside a whole data center.',
      fieldCap: 'Parameter field · each glowing dot is a batch of parameters (weights)',
      unit: 'parameters',
      capK: 'Capability', costK: 'Compute cost', speedK: 'Inference speed',
      costLv: ['Low', 'Medium', 'High', 'Very high'], speedLv: ['Fast', 'Medium', 'Slow'],
      envK: 'Where it can run',
      tierEnv: ['Runs on a phone', 'Laptop / single GPU', 'Multiple GPUs (cloud)', 'Data center'],
      tierNote: ['Instant, cheap, works offline (on-device)', 'Open-source models you can self-host', 'Strong, but needs serious compute', 'Smartest, but also priciest and slowest'],
      curveK: 'Scaling Law · capability vs. parameter count (log)',
      curveSmall: 'Small', curveBig: 'Huge',
      ctlLab: 'Model size (parameter count)',
      presets: ['Phone-sized', 'Open mid-size', 'Large model', 'Frontier giant'],
      hint: 'This is the <b>Scaling Law</b>: every 10× jump in parameters reliably lifts capability another notch, which is why everyone keeps scaling models up.\n    But the price is <b>compute, cost, and latency all spiking together</b>, and past a certain point only a data center can afford to run it. So “bigger” isn’t always “better value”, it depends on whether your task actually needs it.',
    },
    ja: {
      h3: 'インタラクティブ：モデルが大きくなると、結局何が変わる？',
      lede: 'モデルの「大きさ」＝<b>パラメータ（重み）</b>がいくつあるか。ドラッグしてみよう：パラメータが多いほど能力は上がるが、\n    <b>コストとハードルも一緒に上がる</b>、スマホで動くものから、まるごとデータセンターにやっと収まるものまで。',
      fieldCap: 'パラメータ場 · 光る点ひとつがパラメータ（重み）のかたまり',
      unit: 'パラメータ',
      capK: '能力 Capability', costK: '計算コスト', speedK: '推論速度',
      costLv: ['低', '中', '高', '非常に高い'], speedLv: ['速い', '普通', '遅い'],
      envK: '動かせる場所',
      tierEnv: ['スマホでも動く', 'ノート PC / GPU 1 枚', 'GPU 複数枚（クラウド）', 'データセンター'],
      tierNote: ['即時・安価・オフラインで動く（端末側）', '自分でホストできるオープンソースモデル', '高性能だがそれなりの計算力が要る', '最も賢いが、最も高価で最も遅い'],
      curveK: 'スケーリング則 · 能力 vs パラメータ数（対数）',
      curveSmall: '小', curveBig: '超大',
      ctlLab: 'モデルの大きさ（パラメータ数）',
      presets: ['スマホ級', 'オープン中型', '大型モデル', 'フロンティア超大型'],
      hint: 'これが <b>スケーリング則（Scaling Law）</b>：パラメータを 10 倍にするたびに、能力が一段ずつ確実に上がる、だからみんなモデルを大きくし続ける。\n    ただし代償は<b>計算力・コスト・レイテンシがそろって跳ね上がること</b>で、ある規模を超えると動かせるのはデータセンターだけ。だから「大きい」＝「お得」とは限らない、自分のタスクに本当に必要かどうか次第だ。',
    },
  };
  let ui = $derived(L[i18n.locale] || L.zh);

  // scaling 曲線
  const CX = (l) => 30 + ((l - 7) / 5) * 500;
  const CY = (c) => 128 - (c / 100) * 108;
  const capAt = (l) => clamp(Math.round(18 * (l - 6.3)), 2, 99);
  const curve = Array.from({ length: 51 }, (_, k) => { const l = 7 + (k / 50) * 5; return `${CX(l).toFixed(1)},${CY(capAt(l)).toFixed(1)}`; }).join(' ');
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="fieldwrap">
      <div class="row1">
        <span class="mono cap">{ui.fieldCap}</span>
        <span class="pcount">{fmt(params)} <span class="u">{ui.unit}</span></span>
      </div>
      <svg class="field" viewBox="0 0 {FW} {FH}">
        <defs>
          <radialGradient id="ms-dot" cx="40%" cy="30%" r="70%"><stop offset="0%" stop-color="#e07f0e" /><stop offset="100%" stop-color="#e07f0e" /></radialGradient>
          <filter id="ms-glow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <g filter="url(#ms-glow)">
          {#each dots as d}
            <circle class="pdot" cx={d.cx} cy={d.cy} r={d.i < litCount ? 3.6 : 2.4}
              fill={d.i < litCount ? 'url(#ms-dot)' : '#f4f6fa'} opacity={d.i < litCount ? 1 : 0.5} />
          {/each}
        </g>
      </svg>
    </div>

    <div class="stats">
      <div class="stat">
        <span class="k">{ui.capK}</span>
        <div class="barwrap"><div class="bar cap-b" style="width:{cap}%"></div></div>
        <span class="v amber">{cap}%</span>
      </div>
      <div class="stat">
        <span class="k">{ui.costK}</span>
        <div class="barwrap"><div class="bar cost-b" style="width:{costW}%"></div></div>
        <span class="v cost">{ui.costLv[costW < 25 ? 0 : costW < 55 ? 1 : costW < 80 ? 2 : 3]}</span>
      </div>
      <div class="stat">
        <span class="k">{ui.speedK}</span>
        <div class="barwrap"><div class="bar speed-b" style="width:{speedW}%"></div></div>
        <span class="v teal">{ui.speedLv[speedW > 70 ? 0 : speedW > 40 ? 1 : 2]}</span>
      </div>
    </div>

    <div class="grid2">
      <div class="envbox">
        <div class="mono k">{ui.envK}</div>
        <div class="env"><span class="ico">{TIER_ICON[trIdx]}</span><div><b>{ui.tierEnv[trIdx]}</b><span class="enote">{ui.tierNote[trIdx]}</span></div></div>
      </div>
      <div class="curvebox">
        <span class="mono k">{ui.curveK}</span>
        <svg class="curve" viewBox="0 0 560 140">
          <line x1="30" y1="128" x2="530" y2="128" stroke="#d8dfea" />
          <polyline points={curve} fill="none" stroke="#0f8a80" stroke-width="2.4" stroke-linecap="round" filter="url(#ms-glow)" opacity="0.9" />
          <circle cx={CX(log10p)} cy={CY(cap)} r="6" fill="url(#ms-dot)" filter="url(#ms-glow)" />
          <text class="ct" x="30" y="139">{ui.curveSmall}</text><text class="ct" x="530" y="139" text-anchor="end">{ui.curveBig}</text>
        </svg>
      </div>
    </div>
  </div>

  <div class="ctl">
    <div class="lab"><span>{ui.ctlLab}</span><b>{fmt(params)}</b></div>
    <input type="range" min="0" max="100" step="1" bind:value={t} />
  </div>
  <div class="btn-row">
    {#each PRESET_P as p, i}<button class="pl" class:on={Math.abs(t - tOf(p)) < 3} onclick={() => (t = tOf(p))}>{ui.presets[i]}</button>{/each}
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .fieldwrap { margin-bottom: 6px; }
  .row1 { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 4px; }
  .cap { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); }
  .pcount { font-family: var(--mono); font-size: 22px; font-weight: 700; color: var(--accent); }
  .pcount .u { font-size: var(--fs-micro); color: var(--muted); font-weight: 400; }
  .field { width: 100%; height: auto; display: block; }
  .pdot { transition: r .3s, opacity .3s, fill .3s; }

  .stats { display: flex; flex-direction: column; gap: var(--sp-2); margin: var(--sp-2) 0 var(--sp-3); }
  .stat { display: grid; grid-template-columns: 96px 1fr 48px; align-items: center; gap: 10px; }
  .stat .k { font-size: var(--fs-cap); color: var(--muted); }
  .barwrap { height: 10px; border-radius: 99px; background: var(--surface-3); overflow: hidden; }
  .bar { height: 100%; border-radius: 99px; transition: width .35s cubic-bezier(.2,.7,.2,1); }
  .cap-b { background: var(--teal); }
  .cost-b { background: var(--crit); }
  .speed-b { background: var(--teal); }
  .stat .v { font-family: var(--mono); font-size: var(--fs-sm); text-align: right; }
  .v.amber { color: var(--accent); } .v.cost { color: var(--crit); } .v.teal { color: var(--teal); }

  .grid2 { display: grid; grid-template-columns: 1fr 1.3fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .grid2 { grid-template-columns: 1fr; } }
  .k { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: 6px; }
  .envbox, .curvebox { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 10px 12px; }
  .env { display: flex; align-items: center; gap: 10px; }
  .env .ico { font-size: 30px; }
  .env b { color: var(--ink); font-size: var(--fs-lede); display: block; }
  .env .enote { color: var(--muted); font-size: var(--fs-cap); }
  .curve { width: 100%; height: auto; display: block; }
  .curve .ct { font-size: var(--fs-micro); font-family: var(--mono); fill: var(--muted); }

  .pl { font-size: var(--fs-cap); padding: 5px 12px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); }
  .pl:hover { border-color: var(--accent); color: var(--accent-ink); }
  .pl.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }
</style>
