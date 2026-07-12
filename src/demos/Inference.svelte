<script>
  /* Ch · 推論 Inference。訓練＝學規則（慢、一次）；推論＝用規則（快、每次）。
     每按一次「執行推論」＝一次跟 AI 對話：輸入流過「已訓練好、權重凍結」的模型，
     產生輸出，並計時延遲（Latency）。模型越大延遲越高、每次都要花算力。
     深色舞台、確定性、離線。 */
  import { onDestroy } from 'svelte';
  import { clamp } from '../lib/helpers.js';
  import { reduceMotion } from '../lib/motion.js';

  const LAT = { S: 160, M: 440, L: 920 };
  const COST = { S: 1, M: 3, L: 8 };
  const SIZEL = { S: '小模型', M: '中模型', L: '大模型' };
  const PRESETS = [
    { label: '翻譯', in: '把「我喜歡貓」翻成英文', out: ['I', ' like', ' cats', '.'] },
    { label: '算術', in: '123 × 8 = ?', out: ['9', '8', '4'] },
    { label: '寫作', in: '寫一句鼓勵的話', out: ['你', '已', '經', '做', '得', '很', '好', '了', '！'] },
  ];

  let size = $state('M');
  let inIdx = $state(0);
  let elapsed = $state(0);
  let nonce = $state(0);
  let running = $state(false);
  let done = $state(false);
  let runCount = $state(0);
  let totalCompute = $state(0);
  let snap = $state({ out: [], lat: 0, total: 1, cost: 0 });

  let pp = $derived(clamp(elapsed / (snap.total || 1), 0, 1));
  let tokensShown = $derived(snap.out.filter((_, k) => elapsed >= snap.lat + k * 80).length);
  let computing = $derived(running && elapsed < snap.lat);
  let outText = $derived(snap.out.slice(0, tokensShown).join(''));
  let latMs = $derived(Math.round(elapsed));

  function runInference() {
    if (running) return;
    const p = PRESETS[inIdx];
    snap = { out: p.out, lat: LAT[size], total: LAT[size] + p.out.length * 80, cost: COST[size] };
    elapsed = 0; done = false; running = true; nonce++;
  }
  function finish() { running = false; done = true; runCount++; totalCompute += snap.cost; }

  let raf;
  $effect(() => {
    const n = nonce;
    if (n === 0) return;
    if (reduceMotion) { elapsed = snap.total; finish(); return; }
    let base;
    const step = (t) => {
      if (base === undefined) base = t;
      elapsed = Math.min(t - base, snap.total);
      if (elapsed >= snap.total) finish();
      else raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  });
  onDestroy(() => cancelAnimationFrame(raf));

  const CONTRAST = [
    ['何時發生', '模型上線前 · 只做一次', '每一次你提問'],
    ['要花多久', '數週～數月', '毫秒～幾秒'],
    ['算力成本', '極高（一次性）', '每一次都要付'],
    ['權重', '不斷被調整', '凍結不變 🔒'],
  ];
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：跑一次推論看看</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    訓練是<b>一次性</b>的（慢、貴，把規則學進權重裡）；<b>推論</b>則是你<b>每次</b>跟 AI 對話時發生的事——
    把輸入丟進<b>已訓練好、權重凍結</b>的模型，算出輸出。這裡跑一次看它花多少<b>延遲</b>。
  </p>

  <div class="demo-stage light">
    <div class="flow">
      <div class="fcard">
        <div class="ftag">輸入 INPUT</div>
        <div class="ftext">{PRESETS[inIdx].in}</div>
      </div>
      <div class="arrow">→</div>
      <div class="fcard model" class:busy={computing}>
        <div class="ftag">模型 <span class="lock">🔒 已訓練</span></div>
        <div class="mdots">{#each Array(7) as _, i}<span class="md" class:on={computing || done}></span>{/each}</div>
        <div class="mstate">{running ? '運算中…' : done ? '✓ 完成' : '待命'}</div>
      </div>
      <div class="arrow">→</div>
      <div class="fcard">
        <div class="ftag">輸出 OUTPUT</div>
        <div class="ftext mono">{outText}{#if running}<span class="cur">▍</span>{/if}</div>
      </div>
      <div class="pulse" class:show={running} style="left:{pp * 100}%"></div>
    </div>

    <div class="clock">
      <span class="cnum">{latMs}</span><span class="cunit">ms</span>
      <span class="clabel">本次延遲 Latency</span>
      <div class="spacer"></div>
      <span class="mini">推論次數 <b>{runCount}</b></span>
      <span class="mini">累計算力 <b>{totalCompute}</b> 單位</span>
    </div>

    <div class="contrast">
      <div class="crow head"><span></span><span class="th train">訓練 Training</span><span class="th infer">推論 Inference</span></div>
      {#each CONTRAST as [k, a, b]}
        <div class="crow"><span class="rk">{k}</span><span class="ca">{a}</span><span class="cb">{b}</span></div>
      {/each}
    </div>
  </div>

  <div class="ctl-row">
    <div class="grp">
      <span class="glab">輸入</span>
      {#each PRESETS as p, i}<button class="pl" class:on={i === inIdx} disabled={running} onclick={() => (inIdx = i)}>{p.label}</button>{/each}
    </div>
    <div class="grp">
      <span class="glab">模型大小</span>
      {#each ['S', 'M', 'L'] as s}<button class="pl" class:on={s === size} disabled={running} onclick={() => (size = s)}>{SIZEL[s]}</button>{/each}
    </div>
  </div>
  <div class="btn-row">
    <button class="btn primary" disabled={running} onclick={runInference}>▶ 執行推論</button>
  </div>

  <p class="hint">
    你每一次跟 ChatGPT 對話，背後都是<b>一次推論</b>。訓練只做一次、把能力煉進權重；之後每一次使用都要<b>重新算一遍</b>，
    這就是為什麼 AI 服務要按用量收費、也為什麼<b>模型越大、回應越慢也越貴</b>。
  </p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }

  .flow { position: relative; display: flex; align-items: stretch; gap: var(--sp-2); margin-bottom: var(--sp-4); }
  .fcard { flex: 1; min-width: 0; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: var(--sp-3); }
  .fcard.model { border-color: var(--line); text-align: center; }
  .fcard.model.busy { border-color: var(--accent); box-shadow: 0 0 22px #e07f0e44; }
  .ftag { font-family: var(--mono); font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); margin-bottom: var(--sp-2); }
  .ftag .lock { color: var(--teal); }
  .ftext { font-size: var(--fs-body); color: var(--ink); line-height: var(--lh-snug); min-height: 22px; }
  .cur { color: var(--accent); }
  .arrow { align-self: center; color: var(--line-2); font-size: 16px; }
  .mdots { display: flex; gap: 5px; justify-content: center; margin: var(--sp-1) 0 var(--sp-2); }
  .md { width: 9px; height: 9px; border-radius: 50%; background: var(--line); transition: background .3s, box-shadow .3s; }
  .md.on { background: var(--accent); box-shadow: 0 0 8px #e07f0e88; }
  .mstate { font-size: var(--fs-micro); color: var(--muted); font-family: var(--mono); }
  .pulse { position: absolute; top: 50%; width: 12px; height: 12px; border-radius: 50%; margin-left: -6px;
    background: var(--teal); box-shadow: 0 0 14px var(--teal); opacity: 0; }
  .pulse.show { opacity: 1; }

  .clock { display: flex; align-items: baseline; gap: var(--sp-2); margin-bottom: var(--sp-4); }
  .cnum { font-family: var(--mono); font-size: var(--fs-display); font-weight: 700; color: var(--accent); text-shadow: 0 0 14px #e07f0e55; }
  .cunit { font-family: var(--mono); font-size: var(--fs-body); color: var(--muted); }
  .clabel { font-size: var(--fs-micro); color: var(--muted); margin-left: var(--sp-1); }
  .clock .spacer { flex: 1; }
  .mini { font-size: var(--fs-micro); color: var(--muted); margin-left: var(--sp-3); }
  .mini b { color: var(--ink-2); font-family: var(--mono); }

  .contrast { border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; background: var(--surface); }
  .crow { display: grid; grid-template-columns: 84px 1fr 1fr; align-items: center; font-size: var(--fs-cap); }
  .crow + .crow { border-top: 1px solid var(--surface-3); }
  .crow > span { padding: var(--sp-2) var(--sp-3); }
  .crow.head { background: var(--surface-2); }
  .th { font-family: var(--mono); font-size: var(--fs-micro); letter-spacing: .06em; }
  .th.train { color: #d98a9a; } .th.infer { color: var(--teal); }
  .rk { color: var(--muted); }
  .ca { color: var(--ink-2); border-left: 1px solid var(--surface-3); }
  .cb { color: var(--ink-2); border-left: 1px solid var(--surface-3); }

  .ctl-row { display: flex; flex-wrap: wrap; gap: 18px; margin: var(--sp-4) 0 var(--sp-2); }
  .grp { display: flex; align-items: center; gap: 7px; }
  .glab { font-size: var(--fs-micro); color: var(--muted); }
  .pl { font-size: var(--fs-cap); padding: 5px 11px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); }
  .pl:hover:not(:disabled) { border-color: var(--accent); color: var(--accent-ink); }
  .pl:disabled { opacity: .5; }
  .pl.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }
</style>
