<script>
  /* Ch · 訓練：梯度下降。
     一顆球沿損失曲線往下滾＝機器調整權重讓誤差變小。
     核心互動：學習率滑桿 —— 太小龜速、剛好平滑收斂、太大 overshoot 甚至發散。
     深色舞台 + 發光（.demo-stage light）。 */
  import { onDestroy } from 'svelte';
  import Num from '../components/Num.svelte';
  import { clamp } from '../lib/helpers.js';
  import { i18n } from '../stores/i18n.svelte.js';

  // 損失地形：L(w)=0.5w²（清楚的碗），梯度 L'(w)=w。
  const L = (v) => 0.5 * v * v;
  const dL = (v) => v;

  // 座標映射（viewBox 520×280）
  const XW = (v) => 260 + v * 44;      // w:[-5,5] → x:[40,480]
  const YL = (l) => 235 - l * 15.6;    // L:[0,12.5] → y:[235,40]

  // 靜態曲線/填色路徑
  const pts = [];
  for (let v = -5; v <= 5.0001; v += 0.1) pts.push([XW(v), YL(L(v))]);
  const curveD = 'M ' + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L ');
  const areaD = curveD + ` L ${XW(5).toFixed(1)} 235 L ${XW(-5).toFixed(1)} 235 Z`;

  let eta = $state(0.35);
  let w = $state(-4.3);
  let history = $state([]);       // 走過的位置 {w,L}
  let steps = $state(0);
  let running = $state(false);
  let status = $state('idle');    // idle | running | converged | diverged
  let timer;
  const STEP_MS = 430;

  let loss = $derived(L(w));
  let nextW = $derived(w - eta * dL(w));

  let ballX = $derived(clamp(XW(w), 28, 492));
  let ballY = $derived(clamp(YL(L(clamp(w, -5, 5))), 34, 242));
  let ghostX = $derived(clamp(XW(nextW), 28, 492));
  let ghostY = $derived(clamp(YL(L(clamp(nextW, -5, 5))), 34, 242));
  let showNext = $derived(status === 'idle' || status === 'running');

  // 學習率刻度：把滑桿範圍 [0.05,2.4] 依「收斂行為」分三區
  const LPOS = (e) => ((e - 0.05) / (2.4 - 0.05)) * 100;
  const B1 = LPOS(0.5);  // 龜速 → 平滑 界線
  const B2 = LPOS(2.0);  // 平滑 → 發散 界線（L=½w² 在 η>2 發散）
  let etaZone = $derived(eta < 0.5 ? 'slow' : eta < 2 ? 'good' : 'div');

  // 狀態顏色（語言中性，跨語言共用）
  const STATUS_COLOR = {
    idle: 'var(--muted)',
    running: 'var(--accent)',
    converged: 'var(--teal)',
    diverged: 'var(--crit)',
  };

  const LOC = {
    zh: {
      h3: '互動：看機器自己「滾」到最低點',
      lede: '訓練＝調整權重讓<b>損失（錯誤）</b>變小。球沿著損失曲線往下滾，就是機器在找最好的權重。 調<b>學習率</b>看看：太小龜速、剛好平滑、<b>太大會衝過頭甚至發散</b>。',
      axX: '權重 w →', axY: '損失 Loss', goal: '最低點',
      statLoss: '損失 Loss', statW: '權重 w', steps: '步數',
      lrLabel: '學習率 Learning rate（每一步走多大）',
      zoneSlow: '太小 · 龜速', zoneGood: '剛好 · 平滑', zoneDiv: '太大 · 發散',
      pause: '⏸ 暫停', play: '▶ 自動下降', single: '單步', reset: '重置',
      status: {
        idle: '準備好了 — 按「自動下降」看它自己找最低點',
        running: '下降中…每一步都往誤差更小的方向走',
        converged: '✓ 收斂！球停在谷底＝找到讓損失最小的權重',
        diverged: '💥 發散了！學習率太大，一步跨過頭、越跳越遠',
      },
      hint: '<b>「坡度」就是梯度</b>：球感覺到腳下往哪邊低，就往那邊走一步；<b>學習率</b>決定步伐大小。 這就是訓練的本質——反覆地「往損失更小的方向，調一點點權重」，幾百萬次之後，模型就學會了。',
    },
    en: {
      h3: 'Interactive: watch the machine “roll” down to the lowest point',
      lede: 'Training = adjusting the weights to make the <b>loss (error)</b> smaller. The ball rolling down the loss curve is the machine searching for the best weights. Try the <b>learning rate</b>: too small crawls, just right is smooth, <b>too big overshoots and can even diverge</b>.',
      axX: 'Weight w →', axY: 'Loss', goal: 'Lowest point',
      statLoss: 'Loss', statW: 'Weight w', steps: 'Steps',
      lrLabel: 'Learning rate (how big each step is)',
      zoneSlow: 'Too small · crawls', zoneGood: 'Just right · smooth', zoneDiv: 'Too big · diverges',
      pause: '⏸ Pause', play: '▶ Auto descend', single: 'Step', reset: 'Reset',
      status: {
        idle: 'Ready — press “Auto descend” to watch it find the lowest point on its own',
        running: 'Descending… every step moves toward smaller error',
        converged: '✓ Converged! The ball rests at the valley floor = it found the weight that makes the loss smallest',
        diverged: '💥 Diverged! The learning rate is too big—one step overshoots and it bounces farther and farther out',
      },
      hint: '<b>The “slope” is the gradient</b>: the ball feels which way is downhill under its feet and takes a step that way; the <b>learning rate</b> sets the step size. This is the essence of training—repeatedly “nudging the weights a little toward smaller loss,” and after millions of times, the model has learned.',
    },
    ja: {
      h3: 'インタラクティブ：機械が自分で最低点まで「転がり落ちる」様子を見る',
      lede: '訓練＝<b>損失（誤差）</b>が小さくなるように重みを調整すること。ボールが損失曲線を転がり落ちるのは、機械が最適な重みを探しているところです。<b>学習率</b>を動かしてみましょう：小さすぎると遅く、ちょうどよければ滑らか、<b>大きすぎると行き過ぎて発散することさえあります</b>。',
      axX: '重み w →', axY: '損失 Loss', goal: '最低点',
      statLoss: '損失 Loss', statW: '重み w', steps: 'ステップ数',
      lrLabel: '学習率 Learning rate（一歩の大きさ）',
      zoneSlow: '小さすぎ · 遅い', zoneGood: 'ちょうどいい · 滑らか', zoneDiv: '大きすぎ · 発散',
      pause: '⏸ 一時停止', play: '▶ 自動で下降', single: '1ステップ', reset: 'リセット',
      status: {
        idle: '準備完了 —「自動で下降」を押して、自分で最低点を見つける様子を見てみましょう',
        running: '下降中…一歩ごとに誤差の小さい方向へ進んでいます',
        converged: '✓ 収束！ボールが谷底で止まった＝損失が最小になる重みを見つけた',
        diverged: '💥 発散した！学習率が大きすぎて、一歩で行き過ぎ、どんどん遠くへ跳ねていく',
      },
      hint: '<b>「坂の傾き」が勾配</b>：ボールは足元がどちらに下っているかを感じ取り、その方向へ一歩踏み出します。<b>学習率</b>が歩幅を決めます。これが訓練の本質——「損失が小さくなる方向へ、重みをほんの少し調整する」ことをくり返し、何百万回も重ねるうちに、モデルは学んでいくのです。',
    },
  };

  let ui = $derived(LOC[i18n.locale] || LOC.zh);

  function step() {
    if (status === 'diverged' || status === 'converged') return;
    history.push({ w, L: L(w) });
    if (history.length > 34) history.shift();
    w = w - eta * dL(w);
    steps++;
    if (Math.abs(w) > 5.4) { status = 'diverged'; stopTimer(); return; }
    if (Math.abs(dL(w)) < 0.02) { status = 'converged'; stopTimer(); }
  }
  function stopTimer() { running = false; clearTimeout(timer); }
  function play() {
    if (status === 'diverged' || status === 'converged') reset();
    running = true; status = 'running';
    const tick = () => { if (!running) return; step(); if (running) timer = setTimeout(tick, STEP_MS); };
    tick();
  }
  function pause() { stopTimer(); if (status === 'running') status = 'idle'; }
  function single() { if (!running) { if (status === 'converged' || status === 'diverged') reset(); status = 'idle'; step(); } }
  function reset() { clearTimeout(timer); running = false; w = -4.3; history = []; steps = 0; status = 'idle'; }

  onDestroy(() => clearTimeout(timer));
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <svg class="gd" viewBox="0 0 520 280">
      <defs>
        <radialGradient id="gd-ball" cx="36%" cy="30%" r="72%">
          <stop offset="0%" stop-color="#e07f0e" />
          <stop offset="100%" stop-color="#e07f0e" />
        </radialGradient>
        <linearGradient id="gd-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f8a80" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#0f8a80" stop-opacity="0" />
        </linearGradient>
        <filter id="gd-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <!-- 基準線 + 座標標籤 -->
      <line x1="30" y1="235" x2="494" y2="235" stroke="#d8dfea" stroke-width="1" />
      <text class="ax" x="486" y="252" text-anchor="end">{ui.axX}</text>
      <text class="ax" x="34" y="52">{ui.axY}</text>

      <!-- 損失地形 -->
      <path d={areaD} fill="url(#gd-area)" />
      <path d={curveD} fill="none" stroke="#0f8a80" stroke-width="2.4"
        stroke-linecap="round" filter="url(#gd-glow)" opacity="0.9" />

      <!-- 目標：最低點 -->
      <circle cx={XW(0)} cy={YL(0)} r="6" fill="none" stroke="#0f8a80" stroke-width="1.5"
        filter="url(#gd-glow)" opacity="0.8" />
      <text class="goal" x={XW(0)} y="258" text-anchor="middle">{ui.goal}</text>

      <!-- 走過的軌跡 -->
      {#each history as p, i}
        <circle cx={clamp(XW(p.w), 28, 492)} cy={clamp(YL(p.L), 34, 242)} r="2.6"
          fill="#e07f0e" opacity={0.12 + 0.45 * (i / Math.max(1, history.length))} />
      {/each}

      <!-- 下一步預覽（虛線 + 幽靈球） -->
      {#if showNext}
        <line x1={ballX} y1={ballY} x2={ghostX} y2={ghostY}
          stroke="#e07f0e" stroke-width="1.6" stroke-dasharray="4 4" opacity="0.55" />
        <circle cx={ghostX} cy={ghostY} r="6" fill="none" stroke="#e07f0e" stroke-width="1.4" opacity="0.5" />
      {/if}

      <!-- 現在的球（＝目前權重）-->
      <circle class="ball" cx={ballX} cy={ballY} r="9" fill="url(#gd-ball)"
        stroke="#e07f0e" stroke-width="1" filter="url(#gd-glow)" />
    </svg>
  </div>

  <div class="stats">
    <div><span class="k">{ui.statLoss}</span><span class="v"><Num value={loss} format={(x) => x.toFixed(2)} /></span></div>
    <div><span class="k">{ui.statW}</span><span class="v mono">{w.toFixed(2)}</span></div>
    <div><span class="k">{ui.steps}</span><span class="v mono">{steps}</span></div>
  </div>

  <div class="ctl">
    <div class="lab"><span>{ui.lrLabel}</span><b>{eta.toFixed(2)}</b></div>
    <div class="lrslider">
      <div class="zones">
        <div class="z slow" style="width:{B1}%"></div>
        <div class="z good" style="width:{B2 - B1}%"></div>
        <div class="z div" style="width:{100 - B2}%"></div>
      </div>
      <input type="range" min="0.05" max="2.4" step="0.05" bind:value={eta} />
    </div>
    <div class="zlabels">
      <span class="zl" class:on={etaZone === 'slow'} style="width:{B1}%">{ui.zoneSlow}</span>
      <span class="zl" class:on={etaZone === 'good'} style="width:{B2 - B1}%">{ui.zoneGood}</span>
      <span class="zl" class:on={etaZone === 'div'} style="width:{100 - B2}%">{ui.zoneDiv}</span>
    </div>
  </div>

  <div class="btn-row">
    {#if running}
      <button class="btn primary" onclick={pause}>{ui.pause}</button>
    {:else}
      <button class="btn primary" onclick={play}>{ui.play}</button>
    {/if}
    <button class="btn" onclick={single} disabled={running}>{ui.single}</button>
    <button class="btn ghost" onclick={reset}>{ui.reset}</button>
  </div>

  <p class="status" style="color:{STATUS_COLOR[status]}">{ui.status[status]}</p>
  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .gd { width: 100%; height: auto; display: block; }
  .gd .ax { font-size: var(--fs-micro); font-family: var(--mono); fill: var(--muted); }
  .gd .goal { font-size: var(--fs-micro); font-family: var(--mono); fill: var(--teal); }
  .ball { transition: cx .3s cubic-bezier(.4,.7,.3,1), cy .3s cubic-bezier(.4,.7,.3,1); }

  .stats { display: flex; gap: 22px; margin: 4px 0 10px; }
  .stats .k { display: block; font-size: var(--fs-eyebrow); letter-spacing: var(--ls-eyebrow); text-transform: uppercase; color: var(--muted); }
  .stats .v { font-family: var(--mono); font-size: 24px; font-weight: 600; color: var(--ink); }

  /* 刻度做進滑桿：三色分區＝軌道本身，拉桿在上面滑 */
  .lrslider { position: relative; display: flex; align-items: center; height: 20px; }
  .zones { position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%); height: 6px; border-radius: 99px; display: flex; overflow: hidden; }
  .z { height: 100%; }
  .z.slow { background: var(--line-2); }
  .z.good { background: var(--teal); }
  .z.div { background: var(--crit); }
  .lrslider input[type=range] { position: relative; z-index: 1; width: 100%; margin: 0; background: transparent; }
  .zlabels { display: flex; margin-top: 7px; }
  .zl { font-size: var(--fs-micro); color: var(--muted); text-align: center; white-space: nowrap; }
  .zl.on { color: var(--ink); font-weight: 600; }
  .status { font-size: var(--fs-sm); font-weight: 550; margin: var(--sp-3) 0 0; }
</style>
