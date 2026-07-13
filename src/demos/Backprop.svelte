<script>
  /* Ch · 反向傳播。延續梯度下降：怎麼算出「每個權重該調多少」。
     兩階段：前向（琥珀，左→右）算出預測；後向（紅，右→左）把誤差傳回，
     每條連線依「責任（梯度）大小」發光，然後更新權重、損失下降。
     真實的 3-3-1 前向 + 反向傳播運算，損失會逐步逼近 0。 */
  import { onDestroy } from 'svelte';
  import Num from '../components/Num.svelte';
  import { clamp, sig } from '../lib/helpers.js';
  import { reduceMotion } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const L = {
    zh: {
      h3: '互動：誤差怎麼一層層傳回去',
      lede: '上一章球會滾下山，但它怎麼知道<b>每個權重</b>該往哪調？答案是<b>反向傳播</b>：先前向算出答案，再把誤差<b>從輸出往回傳</b>，每條連線算出自己該負多少<b>責任</b>，照著調。',
      tgt: '目標 {t}',
      predK: '預測（貓）', lossK: '損失 Loss', stepsK: '訓練步數',
      lrK: '學習率 Learning rate',
      train: '訓練一步', pause: '⏸ 暫停', auto: '▶ 自動訓練', reset: '重置',
      hint: '關鍵是<b>連鎖律</b>：從輸出的誤差開始，一層一層往回算「這條線改變一點，會讓誤差變多少」。這個數字就是它的<b>梯度（責任）</b>——照著往反方向調，損失就會下降。反向傳播讓深層網路第一次<b>訓練得動</b>。',
      status: {
        idle: '按「訓練一步」：先前向算答案，再反向把誤差傳回來',
        forward: '① 前向傳播：輸入一路算到輸出，得到預測',
        backward: '② 反向傳播：誤差往回傳，每條線算出自己的「責任」',
      },
    },
    en: {
      h3: 'Interactive: how the error travels back, layer by layer',
      lede: 'Last chapter the ball rolled downhill—but how does it know which way to nudge <b>each weight</b>? The answer is <b>backpropagation</b>: first run forward to get the answer, then send the error <b>back from the output</b>, so every connection works out how much <b>blame</b> it carries and adjusts accordingly.',
      tgt: 'Target {t}',
      predK: 'Prediction (cat)', lossK: 'Loss', stepsK: 'Steps',
      lrK: 'Learning rate',
      train: 'Train one step', pause: '⏸ Pause', auto: '▶ Auto-train', reset: 'Reset',
      hint: 'The key is the <b>chain rule</b>: starting from the error at the output, you work backward layer by layer to find “if this connection changes a little, how much does the error change.” That number is its <b>gradient (its blame)</b>—adjust in the opposite direction and the loss drops. Backpropagation is what first made deep networks <b>trainable at all</b>.',
      status: {
        idle: 'Press “Train one step”: first run forward to get the answer, then run backward to send the error back.',
        forward: '① Forward pass: the input is computed all the way to the output, giving a prediction.',
        backward: '② Backward pass: the error travels back, and each connection works out its own “blame.”',
      },
    },
    ja: {
      h3: 'インタラクティブ：誤差はどうやって一層ずつ戻っていくのか',
      lede: '前の章ではボールが坂を転がり落ちた——でも<b>それぞれの重み</b>をどちらに動かせばいいか、どうやって分かるの？答えは<b>誤差逆伝播</b>：まず順伝播で答えを出し、次に誤差を<b>出力から後ろへ戻し</b>、各結合が自分の<b>責任</b>の大きさを割り出して、それに従って調整する。',
      tgt: '目標 {t}',
      predK: '予測（猫）', lossK: '損失 Loss', stepsK: '学習ステップ数',
      lrK: '学習率 Learning rate',
      train: '1 ステップ学習', pause: '⏸ 一時停止', auto: '▶ 自動学習', reset: 'リセット',
      hint: '鍵は<b>連鎖律</b>：出力の誤差から出発して、一層ずつ後ろへ「この結合が少し変わると、誤差はどれだけ変わるか」を計算していく。この数字がその結合の<b>勾配（責任）</b>——反対方向へ調整すれば損失は下がる。誤差逆伝播こそ、深層ネットワークをはじめて<b>学習できるもの</b>にした立役者だ。',
      status: {
        idle: '「1 ステップ学習」を押す：まず順伝播で答えを出し、次に逆伝播で誤差を戻す。',
        forward: '① 順伝播：入力が出力まで一気に計算され、予測が出る。',
        backward: '② 逆伝播：誤差が後ろへ戻り、各結合が自分の「責任」を割り出す。',
      },
    },
  };
  let ui = $derived(L[i18n.locale] || L.zh);

  const X = [1.0, 0.7, 0.4];   // 固定輸入
  const TARGET = 1;            // 期望輸出（「這是貓」= 1）

  let W1 = $state([[0.5, -0.4, 0.3], [0.3, 0.6, -0.2], [-0.3, 0.2, 0.5]]);
  let W2 = $state([0.6, -0.5, 0.4]);
  let lr = $state(0.9);

  let phase = $state('idle');  // idle | forward | backward
  let steps = $state(0);
  let running = $state(false);
  let blame = $state(null);    // 後向時每條連線的責任（正規化 0..1）
  let clock = $state(0);
  let timer;
  const PH = 900;              // 每階段動畫時長

  // 版面（與神經網路一致）
  const IX = 70, HX = 260, OX = 450, OY = 130;
  const iy = (i) => 60 + i * 70;
  const hy = (j) => 50 + j * 80;
  const edges = [];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++)
    edges.push({ type: 'ih', i, j, x1: IX, y1: iy(i), x2: HX, y2: hy(j) });
  for (let j = 0; j < 3; j++)
    edges.push({ type: 'ho', j, x1: HX, y1: hy(j), x2: OX, y2: OY });

  // 前向傳播（衍生，供節點發光與讀數）
  let fwd = $derived.by(() => {
    const h = [0, 1, 2].map((j) => sig(W1[0][j] * X[0] + W1[1][j] * X[1] + W1[2][j] * X[2]));
    const y = sig(W2[0] * h[0] + W2[1] * h[1] + W2[2] * h[2]);
    return { h, y, loss: 0.5 * (TARGET - y) ** 2 };
  });

  function backpropGrads() {
    const { h, y } = fwd;
    const dy = (y - TARGET) * y * (1 - y);
    const gW2 = [0, 1, 2].map((j) => dy * h[j]);
    const dh = [0, 1, 2].map((j) => dy * W2[j] * h[j] * (1 - h[j]));
    const gW1 = [0, 1, 2].map((i) => [0, 1, 2].map((j) => dh[j] * X[i]));
    // 責任 = |梯度|，正規化
    const mags = {};
    let mx = 1e-6;
    for (const e of edges) {
      const g = e.type === 'ih' ? Math.abs(gW1[e.i][e.j]) : Math.abs(gW2[e.j]);
      mags[key(e)] = g; if (g > mx) mx = g;
    }
    const bl = {}; for (const k in mags) bl[k] = mags[k] / mx;
    return { gW1, gW2, blame: bl };
  }
  const key = (e) => (e.type === 'ih' ? `ih-${e.i}-${e.j}` : `ho-${e.j}`);

  function runOne() {
    if (phase !== 'idle') return;
    const g = backpropGrads();
    phase = 'forward';
    timer = setTimeout(() => {
      phase = 'backward'; blame = g.blame;
      timer = setTimeout(() => {
        // 更新權重（梯度下降一步）
        W1 = W1.map((row, i) => row.map((w, j) => w - lr * g.gW1[i][j]));
        W2 = W2.map((w, j) => w - lr * g.gW2[j]);
        steps++; phase = 'idle'; blame = null;
        if (running) {
          if (fwd.loss < 0.0025) { running = false; }
          else timer = setTimeout(runOne, 220);
        }
      }, PH + 120);
    }, PH + 120);
  }
  function train() { if (phase === 'idle' && !running) runOne(); }
  function auto() { if (running) { running = false; return; } running = true; runOne(); }
  function reset() {
    clearTimeout(timer); running = false; phase = 'idle'; blame = null; steps = 0;
    W1 = [[0.5, -0.4, 0.3], [0.3, 0.6, -0.2], [-0.3, 0.2, 0.5]];
    W2 = [0.6, -0.5, 0.4];
  }

  // 動畫時鐘：只在 forward/backward 期間跑
  $effect(() => {
    if (phase !== 'forward' && phase !== 'backward') { clock = 0; return; }
    let raf, t0;
    const loop = (t) => { if (t0 === undefined) t0 = t; clock = t - t0; raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  });
  let p = $derived(clamp(clock / PH, 0, 1)); // 本階段進度 0..1

  // 邊視覺（權重）
  const edgeVal = (e) => (e.type === 'ih' ? W1[e.i][e.j] : W2[e.j]);
  const edgeColor = (e) => (edgeVal(e) >= 0 ? '#e07f0e' : '#0f8a80');
  const edgeWidth = (e) => clamp(Math.abs(edgeVal(e)) * 3, 0.6, 5);
  const edgeOpacity = (e) => 0.22 + Math.min(0.55, Math.abs(edgeVal(e)) / 2.2);

  // 沿線彗星（頭 + 拖尾）。dir: 'fwd' 左→右 ; 'bwd' 右→左
  function comet(e) {
    if (reduceMotion) return [];
    const first = e.type === (phase === 'forward' ? 'ih' : 'ho');
    const active = p < 0.5 ? first : !first;
    if (!active) return [];
    const local = p < 0.5 ? p / 0.5 : (p - 0.5) / 0.5;
    const along = phase === 'forward' ? local : 1 - local; // 後向反方向
    const col = phase === 'forward' ? '#e07f0e' : '#d23f3f';
    const baseR = 3.2, baseOp = Math.sin(Math.PI * local) * 0.95;
    const pts = [];
    for (let k = 0; k < 4; k++) {
      const a = phase === 'forward' ? along - k * 0.05 : along + k * 0.05;
      if (a < 0 || a > 1) continue;
      pts.push({ x: e.x1 + (e.x2 - e.x1) * a, y: e.y1 + (e.y2 - e.y1) * a, r: baseR * (1 - k * 0.2), op: baseOp * (1 - k * 0.28), col });
    }
    return pts;
  }

  const STATUS_COLOR = {
    idle: 'var(--muted)',
    forward: 'var(--accent)',
    backward: 'var(--crit)',
  };

  onDestroy(() => clearTimeout(timer));
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <svg class="net" viewBox="0 0 520 260">
      <defs>
        <radialGradient id="bp-node" cx="38%" cy="30%" r="72%">
          <stop offset="0%" stop-color="#e07f0e" /><stop offset="100%" stop-color="#e07f0e" />
        </radialGradient>
        <filter id="bp-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <!-- 連線（權重）-->
      {#each edges as e}
        <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke-linecap="round"
          stroke={edgeColor(e)} stroke-width={edgeWidth(e)} opacity={edgeOpacity(e)} />
      {/each}

      <!-- 後向：責任發光（越紅＝責任越大）-->
      {#if phase === 'backward' && blame}
        {#each edges as e}
          <line x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke-linecap="round"
            stroke="#d23f3f" stroke-width={1 + blame[key(e)] * 5} opacity={blame[key(e)] * 0.5}
            filter="url(#bp-glow)" />
        {/each}
      {/if}

      <!-- 流動彗星 -->
      <g filter="url(#bp-glow)">
        {#each edges as e}
          {#each comet(e) as pt}
            <circle cx={pt.x} cy={pt.y} r={pt.r} fill={pt.col} opacity={pt.op} />
          {/each}
        {/each}
      </g>

      <!-- 節點 -->
      {#each X as xv, i}
        <circle cx={IX} cy={iy(i)} r="21" fill="#e07f0e" filter="url(#bp-glow)" opacity={0.1 + 0.6 * xv} />
        <circle cx={IX} cy={iy(i)} r="15" fill="url(#bp-node)" opacity={0.4 + 0.6 * xv} stroke="#c6cfdd" stroke-width="1.5" />
      {/each}
      {#each fwd.h as hv, j}
        <circle cx={HX} cy={hy(j)} r="20" fill="#e07f0e" filter="url(#bp-glow)" opacity={0.1 + 0.65 * hv} />
        <circle cx={HX} cy={hy(j)} r="14" fill="url(#bp-node)" opacity={0.4 + 0.6 * hv} stroke="#c6cfdd" stroke-width="1.5" />
      {/each}
      <circle cx={OX} cy={OY} r="30" fill="#e07f0e" filter="url(#bp-glow)" opacity={0.12 + 0.7 * fwd.y} />
      <circle cx={OX} cy={OY} r="22" fill="url(#bp-node)" opacity={0.45 + 0.55 * fwd.y} stroke="#c6cfdd" stroke-width="1.5" />
      <text class="olb" x={OX} y={OY + 5} text-anchor="middle">{(fwd.y).toFixed(2)}</text>
      <text class="tlb" x={OX} y={OY - 34} text-anchor="middle">{ui.tgt.replace('{t}', TARGET.toFixed(1))}</text>
    </svg>
  </div>

  <div class="stats">
    <div><span class="k">{ui.predK}</span><span class="v"><Num value={fwd.y} format={(x) => x.toFixed(2)} /></span></div>
    <div><span class="k">{ui.lossK}</span><span class="v"><Num value={fwd.loss} format={(x) => x.toFixed(3)} /></span></div>
    <div><span class="k">{ui.stepsK}</span><span class="v mono">{steps}</span></div>
  </div>

  <div class="ctl">
    <div class="lab"><span>{ui.lrK}</span><b>{lr.toFixed(2)}</b></div>
    <input type="range" min="0.1" max="2" step="0.1" bind:value={lr} disabled={running} />
  </div>

  <div class="btn-row">
    <button class="btn primary" onclick={train} disabled={phase !== 'idle' || running}>{ui.train}</button>
    <button class="btn" onclick={auto}>{running ? ui.pause : ui.auto}</button>
    <button class="btn ghost" onclick={reset}>{ui.reset}</button>
  </div>

  <p class="status" style="color:{STATUS_COLOR[phase]}">{ui.status[phase]}</p>
  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .net { width: 100%; height: auto; display: block; }
  .net .olb { font-size: var(--fs-cap); font-family: var(--mono); font-weight: 600; fill: #1a1205; }
  .net .tlb { font-size: var(--fs-micro); font-family: var(--mono); fill: var(--muted); }

  .stats { display: flex; gap: var(--sp-5); margin: 6px 0 var(--sp-2); }
  .stats .k { display: block; font-size: var(--fs-eyebrow); letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
  .stats .v { font-family: var(--mono); font-size: 22px; font-weight: 600; color: var(--ink); }
  .status { font-size: var(--fs-sm); font-weight: 550; margin: var(--sp-3) 0 0; }
</style>
