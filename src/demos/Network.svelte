<script>
  /* Ch · 神經網路（核心互動）。宣告式 SVG，前向傳播全衍生。
     視覺打磨：glow 濾鏡、徑向漸層節點、沿線流動的彗星拖尾脈衝。
     variant='dark' → 深色舞台 + 強發光；'light' → 亮色精緻 + 柔陰影。 */
  import Bars from '../components/Bars.svelte';
  import { clamp, sig } from '../lib/helpers.js';
  import { reduceMotion } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  let { variant = 'light' } = $props();

  const T = {
    dark:  { pos: '#e07f0e', neg: '#0f8a80', halo: '#e07f0e', coreA: '#e07f0e', coreB: '#e07f0e',
             glow: 3.4, edgeGlow: true, stroke: '#c6cfdd', tMain: '#141821', tSub: '#67748c' },
    light: { pos: '#e07f0e', neg: '#0f8a80', halo: '#e59418', coreA: '#e07f0e', coreB: '#e07f0e',
             glow: 1.5, edgeGlow: false, stroke: '#c6cfdd', tMain: '#141821', tSub: '#67748c' },
  };
  let c = $derived(T[variant]);

  const L = {
    zh: {
      h3: '互動：調整權重，看網路改變決定',
      lede: '三個線索餵進網路，判斷「這是貓還是狗」。<b>權重＝每條線索的重要程度</b>。試著把「會汪汪叫」的權重拉高，結論會翻盤。',
      inputNames: ['耳朵尖', '有鬍鬚', '會汪汪叫'],
      rowNames: ['貓 Cat', '狗 Dog'],
      cat: '貓', dog: '狗', catOrDog: '貓 or 狗',
      strengthLab: '{n}　線索強度', weight: '權重',
      output: '目前輸出：<b class="mono accent">{label}（{pct}%）</b>',
      hint2: '<b>正權重＝支持是貓，負權重＝反對</b>。「會汪汪叫」預設是負權重，越汪汪叫越像狗。把它的權重拉成正的，網路就會改口說「貓」。這就是訓練在做的事：調整每一個權重。',
    },
    en: {
      h3: 'Interactive: adjust the weights and watch the network change its decision',
      lede: 'Three clues feed into the network to judge, “is this a cat or a dog?” <b>A weight = how important each clue is</b>. Try turning up the weight on “Barks” and watch the conclusion flip.',
      inputNames: ['Pointy ears', 'Has whiskers', 'Barks'],
      rowNames: ['Cat', 'Dog'],
      cat: 'Cat', dog: 'Dog', catOrDog: 'Cat or Dog',
      strengthLab: '{n} clue strength', weight: 'Weight',
      output: 'Current output: <b class="mono accent">{label} ({pct}%)</b>',
      hint2: '<b>A positive weight = supports “cat,” a negative weight = argues against</b>. “Barks” starts out negative, the more it barks, the more it looks like a dog. Turn its weight positive and the network changes its answer to “cat.” This is exactly what training does: adjusting every single weight.',
    },
    ja: {
      h3: 'インタラクティブ：重みを調整して、ネットワークの判断が変わる様子を見よう',
      lede: '3 つの手がかりをネットワークに入れて、「これは猫か犬か」を判断します。<b>重み＝それぞれの手がかりの重要度</b>。「ワンと鳴く」の重みを上げると、結論がひっくり返るのを見てみましょう。',
      inputNames: ['耳がとがっている', 'ひげがある', 'ワンと鳴く'],
      rowNames: ['猫', '犬'],
      cat: '猫', dog: '犬', catOrDog: '猫 or 犬',
      strengthLab: '{n}　手がかりの強さ', weight: '重み',
      output: '現在の出力：<b class="mono accent">{label}（{pct}%）</b>',
      hint2: '<b>正の重み＝「猫」への賛成、負の重み＝反対</b>。「ワンと鳴く」は最初マイナスに設定されている、よく鳴くほど犬らしく見えるからです。この重みをプラスに変えると、ネットワークは答えを「猫」に変えます。これがまさに訓練のしていること：一つひとつの重みを調整するのです。',
    },
  };
  let ui = $derived(L[i18n.locale] || L.zh);

  const IN0 = [
    { v: 0.8, w: 1.6 },
    { v: 0.7, w: 1.2 },
    { v: 0.6, w: -1.8 },
  ];
  const BASE = [[1.4, -0.6, 0.3], [0.5, 1.3, -0.4], [-1.2, 0.2, 1.5]];
  const V = [1.5, 1.1, -1.6];

  let inputs = $state(IN0.map((o) => ({ ...o })));

  const IX = 70, HX = 260, OX = 450, OY = 130;
  const iy = (i) => 60 + i * 70;
  const hy = (j) => 50 + j * 80;

  const edges = [];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++)
    edges.push({ type: 'ih', i, j, x1: IX, y1: iy(i), x2: HX, y2: hy(j) });
  for (let j = 0; j < 3; j++)
    edges.push({ type: 'ho', j, x1: HX, y1: hy(j), x2: OX, y2: OY });

  let W1 = $derived(inputs.map((inp, i) => BASE[i].map((b) => b * (inp.w / IN0[i].w))));
  let x = $derived(inputs.map((o) => o.v));
  let h = $derived([0, 1, 2].map((j) => sig(W1[0][j] * x[0] + W1[1][j] * x[1] + W1[2][j] * x[2])));
  let o = $derived(sig(V[0] * h[0] + V[1] * h[1] + V[2] * h[2]));

  const edgeVal = (e) => (e.type === 'ih' ? W1[e.i][e.j] * inputs[e.i].w / 1.6 : V[e.j]);
  const edgeColor = (e) => (edgeVal(e) >= 0 ? c.pos : c.neg);
  const edgeWidth = (e) => clamp(Math.abs(edgeVal(e)) * 1.9, 0.6, 6);
  const edgeOpacity = (e) => 0.22 + Math.min(0.6, Math.abs(edgeVal(e)) / 3);

  let rows = $derived([
    { nm: ui.rowNames[0], val: Math.round(o * 100), win: o > 0.5 },
    { nm: ui.rowNames[1], val: Math.round((1 - o) * 100), win: o <= 0.5 },
  ]);

  // 訊號流動：以 rAF 時間戳驅動 phase，沿線畫出彗星（頭 + 拖尾）。
  const SPLIT = 0.55;
  let phase = $state(0);
  $effect(() => {
    if (reduceMotion) return;
    let raf, t0;
    const loop = (t) => {
      if (t0 === undefined) t0 = t;
      phase = ((t - t0) / 1500) % 1;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  });

  function comet(e) {
    const seg = phase < SPLIT ? 'ih' : 'ho';
    if (e.type !== seg) return [];
    const head = seg === 'ih' ? phase / SPLIT : (phase - SPLIT) / (1 - SPLIT);
    const baseR = 2 + edgeWidth(e) * 0.6;
    const baseOp = Math.sin(Math.PI * head) * Math.min(1, edgeOpacity(e) + 0.4);
    const pts = [];
    for (let k = 0; k < 4; k++) {
      const p = head - k * 0.05;
      if (p < 0) break;
      pts.push({
        x: e.x1 + (e.x2 - e.x1) * p,
        y: e.y1 + (e.y2 - e.y1) * p,
        r: baseR * (1 - k * 0.2),
        op: baseOp * (1 - k * 0.28),
      });
    }
    return pts;
  }
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage {variant}">
    <svg class="net" viewBox="0 0 520 260">
      <defs>
        <radialGradient id="node-{variant}" cx="38%" cy="30%" r="72%">
          <stop offset="0%" stop-color={c.coreA} />
          <stop offset="100%" stop-color={c.coreB} />
        </radialGradient>
        <filter id="glow-{variant}" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation={c.glow} result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <!-- 連線 -->
      <g filter={c.edgeGlow ? `url(#glow-${variant})` : null}>
        {#each edges as e}
          <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke-linecap="round"
            stroke={edgeColor(e)} stroke-width={edgeWidth(e)} opacity={edgeOpacity(e)} />
        {/each}
      </g>

      <!-- 流動彗星 -->
      {#if !reduceMotion}
        <g filter="url(#glow-{variant})">
          {#each edges as e}
            {#each comet(e) as pt}
              <circle cx={pt.x} cy={pt.y} r={pt.r} fill={edgeColor(e)} opacity={pt.op} />
            {/each}
          {/each}
        </g>
      {/if}

      <!-- 節點：發光暈 + 本體 -->
      {#each inputs as inp, i}
        <circle cx={IX} cy={iy(i)} r="22" fill={c.halo} filter="url(#glow-{variant})" opacity={0.12 + 0.6 * x[i]} />
        <circle class="node" cx={IX} cy={iy(i)} r="16" fill="url(#node-{variant})" opacity={0.4 + 0.6 * x[i]}
          stroke={c.stroke} stroke-width="1.5" />
        <text class="lbl-s" x={IX} y={iy(i) + 34} text-anchor="middle" fill={c.tSub}>{ui.inputNames[i]}</text>
      {/each}
      {#each [0, 1, 2] as j}
        <circle cx={HX} cy={hy(j)} r="21" fill={c.halo} filter="url(#glow-{variant})" opacity={0.1 + 0.65 * h[j]} />
        <circle class="node" cx={HX} cy={hy(j)} r="15" fill="url(#node-{variant})" opacity={0.4 + 0.6 * h[j]}
          stroke={c.stroke} stroke-width="1.5" />
      {/each}
      <text class="lbl-s" x={HX} y="28" text-anchor="middle" fill={c.tSub}>Hidden</text>

      <circle cx={OX} cy={OY} r="30" fill={c.halo} filter="url(#glow-{variant})" opacity={0.12 + 0.7 * o} />
      <circle class="node" cx={OX} cy={OY} r="22" fill="url(#node-{variant})" opacity={0.45 + 0.55 * o}
        stroke={c.stroke} stroke-width="1.5" />
      <text class="lbl" x={OX} y={OY + 5} text-anchor="middle" fill={c.tMain}>{o > 0.5 ? ui.cat : ui.dog}</text>
      <text class="lbl-s" x={OX} y={OY + 46} text-anchor="middle" fill={c.tSub}>{ui.catOrDog}</text>
    </svg>
  </div>

  <div class="ctls">
    {#each inputs as inp, i}
      <div class="ctl">
        <div class="lab"><span>{ui.strengthLab.replace('{n}', ui.inputNames[i])}</span><b>{inp.v.toFixed(2)}</b></div>
        <input type="range" min="0" max="100" value={inp.v * 100}
          oninput={(e) => (inp.v = (+e.currentTarget.value) / 100)} />
        <div class="wrow">
          <span>{ui.weight}</span>
          <input type="range" min="-30" max="30" value={inp.w * 10}
            oninput={(e) => (inp.w = (+e.currentTarget.value) / 10)} />
          <b class="mono wl">{(inp.w >= 0 ? '+' : '') + inp.w.toFixed(1)}</b>
        </div>
      </div>
    {/each}
  </div>

  <div class="out">
    <Bars {rows} />
    <p class="hint">{@html ui.output.replace('{label}', o > 0.5 ? ui.cat : ui.dog).replace('{pct}', Math.round((o > 0.5 ? o : 1 - o) * 100))}</p>
  </div>
  <p class="hint">{@html ui.hint2}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-2); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }

  .net { width: 100%; height: auto; display: block; }
  .net .lbl-s { font-size: var(--fs-micro); font-family: var(--mono); }
  .net .lbl { font-size: var(--fs-cap); font-family: var(--sans); font-weight: 600; }

  .ctls { margin-top: var(--sp-3); }
  .ctls .ctl { margin: 0 0 22px; }
  .ctls .ctl:last-child { margin-bottom: var(--sp-1); }
  .ctls .ctl input[type=range] { margin: var(--sp-1) 0; }
  .wrow { display: flex; align-items: center; gap: 10px; margin-top: 13px; font-size: var(--fs-cap); color: var(--muted); }
  .wrow span { white-space: nowrap; }
  .wrow input { flex: 1; }
  .wl { color: var(--accent-ink); width: 40px; text-align: right; }
  .out { margin-top: var(--sp-3); }
  .accent { color: var(--accent-ink); }
</style>
