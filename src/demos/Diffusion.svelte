<script>
  /* Ch · 生成式 AI：AI 怎麼畫圖（Diffusion）。
     先把圖加噪破壞、再學會反過來去噪；生成時從一團純雜訊一步步去噪成圖，
     文字提示決定畫出什麼。拖「去噪進度」或按 ▶ 生成，看雜訊變成圖。亮色、離線。 */
  import { onDestroy } from 'svelte';
  import { clamp } from '../lib/helpers.js';
  import { reduceMotion } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const N = 16;
  // 目標圖案（以函式定義，確定性、免手繪）：回傳 0/1
  function heart(gx, gy) {
    const u = ((gx + 0.5) / N) * 2 - 1;
    const v = 1 - ((gy + 0.5) / N) * 2;
    const x = u * 1.1, y = v * 1.1 - 0.15;
    return (x * x + y * y - 1) ** 3 - x * x * y * y * y <= 0 ? 1 : 0;
  }
  function house(gx, gy) {
    const mid = N / 2 - 0.5;
    if (gy >= N * 0.5) return gx >= N * 0.22 && gx <= N * 0.78 ? 1 : 0; // 屋身
    const half = (gy / (N * 0.5)) * (N * 0.42);                          // 屋頂三角
    return Math.abs(gx - mid) <= half ? 1 : 0;
  }
  function smiley(gx, gy) {
    const cx = N / 2 - 0.5, cy = N / 2 - 0.5, dx = gx - cx, dy = gy - cy, r = Math.hypot(dx, dy);
    if (r > N * 0.46) return 0;
    if (Math.hypot(dx + 2.5, dy + 1.5) < 1.3) return 0;   // 左眼
    if (Math.hypot(dx - 2.5, dy + 1.5) < 1.3) return 0;   // 右眼
    if (dy > 1.4 && dy < 3.2 && Math.abs(dx) < 3.4 && r > N * 0.28) return 0; // 嘴
    return 1;
  }
  const PROMPTS = [
    { key: 'heart', fn: heart },
    { key: 'smiley', fn: smiley },
    { key: 'house', fn: house },
  ];

  const L = {
    zh: {
      h3: '互動：從雜訊畫出一張圖',
      lede: '生成式 AI 畫圖的秘密是<b>去噪</b>：模型先學會「把加了雜訊的圖還原」，生成時就<b>從一團純雜訊一步步去噪</b>成圖，而<b>文字提示</b>決定它往哪個方向還原。選一個提示，拖進度或按生成看看。',
      labels: ['一顆愛心 ♥', '一個笑臉 ☺', '一間房子 ⌂'],
      kPrompt: '文字提示：畫',
      kProgress: '去噪進度',
      status: ['純雜訊（什麼都還沒有）', '去噪中…輪廓開始浮現', '快好了…細節收斂中', '完成！雜訊變成圖了'],
      ctlLab: '去噪進度 Denoising（純雜訊 → 圖）',
      btnGen: '▶ 從雜訊生成',
      btnReset: '回到純雜訊',
      hint: '這就是 <b>擴散模型（Diffusion）</b>：訓練時學「去噪」，生成時把純雜訊一步步變清晰。同一團雜訊，換個提示就會還原成不同的圖，所以「提示」是在<b>引導去噪的方向</b>。同類技術也能生成音樂、影片。',
    },
    en: {
      h3: 'Interactive: paint an image out of noise',
      lede: 'The secret behind generative image AI is <b>denoising</b>: the model first learns to “restore an image that noise was added to,” so to generate it <b>denoises a patch of pure noise step by step</b> into a picture, while the <b>text prompt</b> decides which direction it restores toward. Pick a prompt, then drag the slider or hit generate.',
      labels: ['A heart ♥', 'A smiley ☺', 'A house ⌂'],
      kPrompt: 'Text prompt: paint',
      kProgress: 'Denoising progress',
      status: ['Pure noise (nothing yet)', 'Denoising… the outline starts to emerge', 'Almost there… details are converging', 'Done! The noise became an image'],
      ctlLab: 'Denoising progress (pure noise → image)',
      btnGen: '▶ Generate from noise',
      btnReset: 'Back to pure noise',
      hint: 'This is a <b>diffusion model</b>: during training it learns to “denoise,” and to generate it turns pure noise into a clear image step by step. The same noise, given a different prompt, restores into a different image, so the “prompt” <b>steers the direction of denoising</b>. The same kind of technique can also generate music and video.',
    },
    ja: {
      h3: 'インタラクティブ：ノイズから 1 枚の絵を描く',
      lede: '生成 AI が画像を描く秘密は<b>ノイズ除去</b>です：モデルはまず「ノイズを足した画像を復元する」ことを学び、生成時には<b>純粋なノイズのかたまりを一歩ずつノイズ除去</b>して 1 枚の絵にします。そして<b>プロンプト（文字の説明）</b>が、どの方向へ復元するかを決めます。プロンプトを選んで、スライダーをドラッグするか生成を押してみましょう。',
      labels: ['ハート ♥', 'スマイル ☺', '家 ⌂'],
      kPrompt: 'プロンプト：描くもの',
      kProgress: 'ノイズ除去の進み具合',
      status: ['純粋なノイズ（まだ何もない）', 'ノイズ除去中…輪郭が浮かび上がってきた', 'もう少し…細部が定まってきた', '完成！ノイズが画像になった'],
      ctlLab: 'ノイズ除去の進行 Denoising（純粋なノイズ → 画像）',
      btnGen: '▶ ノイズから生成',
      btnReset: '純粋なノイズに戻す',
      hint: 'これが<b>拡散モデル（Diffusion）</b>です：学習時に「ノイズ除去」を覚え、生成時には純粋なノイズを一歩ずつ鮮明な画像へと変えていきます。同じノイズでも、プロンプトが違えば別の画像に復元される、つまり「プロンプト」は<b>ノイズ除去の方向を導いている</b>のです。同じ仕組みの技術は、音楽や動画の生成にも使えます。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  // 每格固定雜訊（LCG 種子，確定性）
  const noise = [];
  let seed = 20260712;
  for (let i = 0; i < N * N; i++) { seed = (seed * 9301 + 49297) % 233280; noise.push(seed / 233280); }

  let promptIdx = $state(0);
  let step = $state(0);       // 0..100 去噪進度
  let playNonce = $state(0);
  let raf;

  let p = $derived(step / 100);
  let target = $derived(PROMPTS[promptIdx].fn);
  let cells = $derived(
    Array.from({ length: N * N }, (_, i) => {
      const gx = i % N, gy = (i / N) | 0;
      const t = target(gx, gy);
      const v = clamp(noise[i] * (1 - p) + t * p, 0, 1);
      const r = Math.round(244 + (224 - 244) * v);
      const g = Math.round(246 + (127 - 246) * v);
      const b = Math.round(250 + (14 - 250) * v);
      return { x: gx * 16, y: gy * 16, fill: `rgb(${r},${g},${b})` };
    })
  );
  let statusText = $derived(step < 3 ? ui.status[0] : step < 60 ? ui.status[1] : step < 99 ? ui.status[2] : ui.status[3]);

  function play() { step = 0; playNonce++; }

  $effect(() => {
    playNonce;
    if (playNonce === 0) return;              // 掛載時不自動跑
    if (reduceMotion) { step = 100; return; }
    let t0;
    const loop = (t) => {
      if (t0 === undefined) t0 = t;
      step = Math.min(100, ((t - t0) / 1800) * 100);
      if (step < 100) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  });
  onDestroy(() => cancelAnimationFrame(raf));

  function pick(i) { promptIdx = i; step = 0; }
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="pills">
      <span class="mono k">{ui.kPrompt}</span>
      {#each PROMPTS as pr, i}<button class="pl" class:on={i === promptIdx} onclick={() => pick(i)}>{ui.labels[i]}</button>{/each}
    </div>

    <div class="stagewrap">
      <svg class="canvas" viewBox="0 0 256 256">
        {#each cells as c}<rect x={c.x} y={c.y} width="16" height="16" fill={c.fill} />{/each}
      </svg>
      <div class="side">
        <div class="mono k">{ui.kProgress}</div>
        <div class="pct">{step | 0}%</div>
        <div class="status">{statusText}</div>
      </div>
    </div>

    <div class="ctl">
      <div class="lab"><span>{ui.ctlLab}</span><b>{step | 0}%</b></div>
      <input type="range" min="0" max="100" step="1" bind:value={step} />
    </div>
    <div class="btn-row">
      <button class="btn primary" onclick={play}>{ui.btnGen}</button>
      <button class="btn ghost" onclick={() => (step = 0)}>{ui.btnReset}</button>
    </div>
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .k { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); }
  .pills { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; margin-bottom: var(--sp-4); }
  .pl { font-size: var(--fs-cap); padding: 6px 13px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); }
  .pl:hover { border-color: var(--accent); color: var(--accent-ink); }
  .pl.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }

  .stagewrap { display: flex; gap: var(--sp-4); align-items: center; }
  @media (max-width: 720px) { .stagewrap { flex-direction: column; align-items: flex-start; } }
  .canvas { width: 256px; max-width: 60%; height: auto; border-radius: var(--r); border: 1px solid var(--line); background: var(--surface-2); image-rendering: pixelated; }
  .side { flex: 1; }
  .pct { font-family: var(--mono); font-size: 40px; font-weight: 700; color: var(--accent); line-height: 1; }
  .status { font-size: var(--fs-sm); color: var(--ink-2); margin-top: var(--sp-2); }
</style>
