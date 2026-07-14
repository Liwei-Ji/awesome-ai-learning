<script>
  /* Ch · 推論 Inference。訓練＝學規則（慢、一次）；推論＝用規則（快、每次）。
     每按一次「執行推論」＝一次跟 AI 對話：輸入流過「已訓練好、權重凍結」的模型，
     產生輸出，並計時延遲（Latency）。模型越大延遲越高、每次都要花算力。
     深色舞台、確定性、離線。 */
  import { onDestroy } from 'svelte';
  import { clamp } from '../lib/helpers.js';
  import { reduceMotion } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const LAT = { S: 160, M: 440, L: 920 };
  const COST = { S: 1, M: 3, L: 8 };

  const L = {
    zh: {
      h3: '互動：跑一次推論看看',
      lede: '訓練是<b>一次性</b>的（慢、貴，把規則學進權重裡）；<b>推論</b>則是你<b>每次</b>跟 AI 對話時發生的事——把輸入丟進<b>已訓練好、權重凍結</b>的模型，算出輸出。這裡跑一次看它花多少<b>延遲</b>。',
      tagIn: '輸入 INPUT', tagOut: '輸出 OUTPUT',
      modelTag: '模型 <span class="lock">🔒 已訓練</span>',
      computing: '運算中…', mdone: '✓ 完成', idle: '待命',
      latencyLabel: '本次延遲 Latency',
      runsLabel: '推論次數', computeLabel: '累計算力', computeUnit: '單位',
      trainHead: '訓練 Training', inferHead: '推論 Inference',
      contrast: [
        ['何時發生', '模型上線前 · 只做一次', '每一次你提問'],
        ['要花多久', '數週～數月', '毫秒～幾秒'],
        ['算力成本', '極高（一次性）', '每一次都要付'],
        ['權重', '不斷被調整', '凍結不變 🔒'],
      ],
      glabIn: '輸入', glabSize: '模型大小',
      runBtn: '▶ 執行推論',
      hint: '你每一次跟 ChatGPT 對話，背後都是<b>一次推論</b>。訓練只做一次、把能力煉進權重；之後每一次使用都要<b>重新算一遍</b>，這就是為什麼 AI 服務要按用量收費、也為什麼<b>模型越大、回應越慢也越貴</b>。',
      sizeL: { S: '小模型', M: '中模型', L: '大模型' },
      presets: [
        { label: '翻譯', in: '把「我喜歡貓」翻成英文', out: ['I', ' like', ' cats', '.'] },
        { label: '算術', in: '123 × 8 = ?', out: ['9', '8', '4'] },
        { label: '寫作', in: '寫一句鼓勵的話', out: ['你', '已', '經', '做', '得', '很', '好', '了', '！'] },
      ],
    },
    en: {
      h3: 'Interactive: run one inference',
      lede: 'Training is a <b>one-time</b> job (slow and expensive—it bakes the rules into the weights); <b>inference</b> is what happens <b>every time</b> you chat with an AI: you feed the input into a <b>trained, weight-frozen</b> model and it computes the output. Run one here and see how much <b>latency</b> it takes.',
      tagIn: 'INPUT', tagOut: 'OUTPUT',
      modelTag: 'Model <span class="lock">🔒 trained</span>',
      computing: 'Computing…', mdone: '✓ Done', idle: 'Idle',
      latencyLabel: 'This run’s latency',
      runsLabel: 'Inferences', computeLabel: 'Total compute', computeUnit: 'units',
      trainHead: 'Training', inferHead: 'Inference',
      contrast: [
        ['When it happens', 'Before the model ships · just once', 'Every time you ask'],
        ['How long it takes', 'Weeks to months', 'Milliseconds to seconds'],
        ['Compute cost', 'Very high (one-time)', 'Paid every single time'],
        ['Weights', 'Constantly adjusted', 'Frozen 🔒'],
      ],
      glabIn: 'Input', glabSize: 'Model size',
      runBtn: '▶ Run inference',
      hint: 'Every time you chat with ChatGPT, one <b>inference</b> is running behind the scenes. Training happens just once, forging the ability into the weights; after that, every use has to <b>recompute from scratch</b>—which is why AI services bill by usage, and why <b>a bigger model is slower and more expensive to run</b>.',
      sizeL: { S: 'Small model', M: 'Medium model', L: 'Large model' },
      presets: [
        { label: 'Translate', in: 'Translate “I like cats” into French', out: ['J’', 'aime', ' les', ' chats', '.'] },
        { label: 'Arithmetic', in: '123 × 8 = ?', out: ['9', '8', '4'] },
        { label: 'Writing', in: 'Write a line of encouragement', out: ['You', '’ve', ' already', ' done', ' really', ' well', '!'] },
      ],
    },
    ja: {
      h3: 'インタラクティブ：推論を一度実行してみる',
      lede: '訓練は<b>一度きり</b>の作業です（遅くて高価——規則を重みに焼き込む）。<b>推論</b>は AI と話す<b>たびに</b>起こること：入力を<b>訓練済みで重みが凍結された</b>モデルに流し込み、出力を計算します。ここで一度実行して、どれくらい<b>遅延</b>があるか見てみましょう。',
      tagIn: '入力 INPUT', tagOut: '出力 OUTPUT',
      modelTag: 'モデル <span class="lock">🔒 訓練済み</span>',
      computing: '計算中…', mdone: '✓ 完了', idle: '待機中',
      latencyLabel: 'この推論の遅延 Latency',
      runsLabel: '推論回数', computeLabel: '累計計算量', computeUnit: '単位',
      trainHead: '訓練 Training', inferHead: '推論 Inference',
      contrast: [
        ['いつ起こる', 'モデル公開前 · 一度だけ', '質問するたびに'],
        ['どれくらいかかる', '数週間〜数か月', 'ミリ秒〜数秒'],
        ['計算コスト', '非常に高い（一度きり）', '毎回かかる'],
        ['重み', '絶えず調整される', '凍結 🔒'],
      ],
      glabIn: '入力', glabSize: 'モデルサイズ',
      runBtn: '▶ 推論を実行',
      hint: 'ChatGPT と話すたびに、その裏では<b>推論</b>が一度動いています。訓練は一度だけで、能力を重みに鍛え込む。その後は使うたびに<b>一から計算し直す</b>必要がある——だから AI サービスは使用量で課金し、<b>大きいモデルほど動かすのが遅く高価</b>なのです。',
      sizeL: { S: '小型モデル', M: '中型モデル', L: '大型モデル' },
      presets: [
        { label: '翻訳', in: '「猫が好き」を英語に翻訳して', out: ['I', ' like', ' cats', '.'] },
        { label: '計算', in: '123 × 8 = ?', out: ['9', '8', '4'] },
        { label: '作文', in: '励ましのひとことを書いて', out: ['も', 'う', '十', '分', 'よ', 'く', 'や', 'っ', 'て', 'る', 'よ', '！'] },
      ],
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

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
    const p = ui.presets[inIdx];
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
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="flow">
      <div class="fcard">
        <div class="ftag">{ui.tagIn}</div>
        <div class="ftext">{ui.presets[inIdx].in}</div>
      </div>
      <div class="arrow">→</div>
      <div class="fcard model" class:busy={computing}>
        <div class="ftag">{@html ui.modelTag}</div>
        <div class="mdots">{#each Array(7) as _, i}<span class="md" class:on={computing || done}></span>{/each}</div>
        <div class="mstate">{running ? ui.computing : done ? ui.mdone : ui.idle}</div>
      </div>
      <div class="arrow">→</div>
      <div class="fcard">
        <div class="ftag">{ui.tagOut}</div>
        <div class="ftext mono">{outText}{#if running}<span class="cur">▍</span>{/if}</div>
      </div>
      <div class="pulse" class:show={running} style="left:{pp * 100}%"></div>
    </div>

    <div class="clock">
      <span class="cnum">{latMs}</span><span class="cunit">ms</span>
      <span class="clabel">{ui.latencyLabel}</span>
      <div class="spacer"></div>
      <span class="mini">{ui.runsLabel} <b>{runCount}</b></span>
      <span class="mini">{ui.computeLabel} <b>{totalCompute}</b> {ui.computeUnit}</span>
    </div>

    <div class="contrast">
      <div class="crow head"><span></span><span class="th train">{ui.trainHead}</span><span class="th infer">{ui.inferHead}</span></div>
      {#each ui.contrast as [k, a, b]}
        <div class="crow"><span class="rk">{k}</span><span class="ca">{a}</span><span class="cb">{b}</span></div>
      {/each}
    </div>
  </div>

  <div class="ctl-row">
    <div class="grp">
      <span class="glab">{ui.glabIn}</span>
      {#each ui.presets as p, i}<button class="pl" class:on={i === inIdx} disabled={running} onclick={() => (inIdx = i)}>{p.label}</button>{/each}
    </div>
    <div class="grp">
      <span class="glab">{ui.glabSize}</span>
      {#each ['S', 'M', 'L'] as s}<button class="pl" class:on={s === size} disabled={running} onclick={() => (size = s)}>{ui.sizeL[s]}</button>{/each}
    </div>
  </div>
  <div class="btn-row">
    <button class="btn primary" disabled={running} onclick={runInference}>{ui.runBtn}</button>
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }

  .flow { position: relative; display: flex; align-items: stretch; gap: var(--sp-2); margin-bottom: var(--sp-4); }
  .fcard { flex: 1; min-width: 0; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: var(--sp-3); }
  .fcard.model { border-color: var(--line); text-align: center; }
  .fcard.model.busy { border-color: var(--accent); }
  .ftag { font-family: var(--mono); font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); margin-bottom: var(--sp-2); }
  .ftag .lock { color: var(--teal); }
  .ftext { font-size: var(--fs-body); color: var(--ink); line-height: var(--lh-snug); min-height: 22px; }
  .cur { color: var(--accent); }
  .arrow { align-self: center; color: var(--line-2); font-size: 16px; }
  .mdots { display: flex; gap: 5px; justify-content: center; margin: var(--sp-1) 0 var(--sp-2); }
  .md { width: 9px; height: 9px; border-radius: 50%; background: var(--line); transition: background .3s, box-shadow .3s; }
  .md.on { background: var(--accent); }
  .mstate { font-size: var(--fs-micro); color: var(--muted); font-family: var(--mono); }
  .pulse { position: absolute; top: 50%; width: 12px; height: 12px; border-radius: 50%; margin-left: -6px;
    background: var(--teal); opacity: 0; }
  .pulse.show { opacity: 1; }

  .clock { display: flex; align-items: baseline; gap: var(--sp-2); margin-bottom: var(--sp-4); }
  .cnum { font-family: var(--mono); font-size: var(--fs-display); font-weight: 700; color: var(--accent); }
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
