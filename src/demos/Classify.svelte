<script>
  /* ============================================================
     Ch1 · 影像分類 —— 引導式互動：親手走一遍 資料 → 模型 → 預測 → 決策。
     不再用 Tween 自動跑完，改成 stage（$state 整數）＋「▶ 下一步」逐步前進，
     每一步在舞台中央說明這一步 AI 在做什麼；走到「決策」才顯示信心長條與判斷。
     照 RAG.svelte 的手感：Stepper 步驟指示＋膠囊選項＋guide-actions 逐步 gating。
     ============================================================ */
  import { fade, fly, scale } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import Stepper from '../components/Stepper.svelte';
  import Bars from '../components/Bars.svelte';

  const FLOW = ['資料', '模型', '預測', '決策'];
  const ITEMS = [['🐱', '貓'], ['🐶', '狗'], ['🐦', '鳥'], ['🐘', '大象']];
  const DIST = {
    '🐱': [['Cat', 95], ['Dog', 3], ['Fox', 2]],
    '🐶': [['Dog', 92], ['Wolf', 5], ['Cat', 3]],
    '🐦': [['Bird', 90], ['Butterfly', 7], ['Plane', 3]],
    '🐘': [['Elephant', 97], ['Rhino', 2], ['Hippo', 1]],
  };
  // 每一步舞台中央要說的一句話（AI 這一步在做什麼）。
  const SAY = [
    { icon: '🖼️', k: '資料', t: '接收這張影像的像素，轉成一長串數字餵給模型。' },
    { icon: '🧠', k: '模型', t: '套用從大量例子學到的規則，一層層抽取特徵。' },
    { icon: '📊', k: '預測', t: '算出每個類別的信心分數（合計約 100%）。' },
    { icon: '✅', k: '決策', t: '選出信心最高的那一個，當作最終答案。' },
  ];

  let current = $state('🐱');   // 選中的動物
  let stage = $state(0);        // 0 資料 · 1 模型 · 2 預測 · 3 決策（目前步驟索引）

  let say = $derived(SAY[stage]);
  let atEnd = $derived(stage === FLOW.length - 1);
  let dist = $derived(DIST[current]);
  let rows = $derived(dist.map((d, i) => ({ nm: d[0], val: d[1], win: i === 0 })));

  function pick(emo) { current = emo; stage = 0; }   // 選圖：重置到第 0 步
  function next() { if (!atEnd) stage += 1; }
  function restart() { stage = 0; }
</script>

<div class="panel">
  <div class="panel-h">
    <h3>互動：把圖片丟給 AI</h3>
    <span class="eyebrow">★ Interactive</span>
  </div>
  <p class="lede">
    選一張圖片，再按「<b>▶ 下一步</b>」，親手帶 AI 走完
    <span class="mono">資料 → 模型 → 預測 → 決策</span>。AI 不是「知道」答案，而是<b>一步步算出</b>來的。
  </p>

  <div class="demo-stage light">
    <!-- 步驟指示 -->
    <Stepper steps={FLOW} current={stage} />

    <!-- ① 選一張圖片 -->
    <div class="qrow">
      <span class="fieldk">① 選一張圖片</span>
      <div class="pl-row">
        {#each ITEMS as [emo, name]}
          <button class="pl" class:on={current === emo} onclick={() => pick(emo)}>
            <span class="emo">{emo}</span>{name}
          </button>
        {/each}
      </div>
    </div>

    <!-- 舞台中央：目前這一步在做什麼 -->
    <div class="stageview">
      <span class="fieldk">② AI 現在正在做什麼</span>
      {#key current}
        <div class="hero" in:scale={{ start: 0.6, duration: dur(D.base), easing: ease }}>{current}</div>
      {/key}
      {#key stage}
        <div class="doing" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
          <span class="dicon">{say.icon}</span>
          <div class="dtext"><b>{say.k}</b>：{say.t}</div>
        </div>
      {/key}

      {#if atEnd}
        <div class="result" in:fade={{ duration: dur(D.base) }}>
          {#key current}
            <Bars {rows} />
          {/key}
          <p class="hint">
            AI 判斷：<b class="mono accent">{dist[0][0]} {dist[0][1]}%</b>。
            它挑出信心最高的類別當答案——這就是<b>「分類」</b>。
          </p>
        </div>
      {:else}
        <div class="waiting">尚未走到「決策」——先按下方「▶ 下一步」，看 AI 一步步算出信心分數。</div>
      {/if}
    </div>

    <!-- 步驟動作列 -->
    <div class="guide-actions">
      <button class="btn primary" disabled={atEnd} onclick={next}>
        {atEnd ? '✓ 完成' : '▶ 下一步'}
      </button>
      {#if stage > 0}<button class="btn ghost" onclick={restart}>重來</button>{/if}
    </div>
  </div>

  <p class="hint">
    每個 AI 應用背後都是這條流水線：<b>資料</b>進來、<b>模型</b>套用學到的規則、<b>預測</b>出各類別的信心、
    最後<b>決策</b>選出答案。信心是<b>機率</b>，不是絕對——所以 AI 也會答錯。
  </p>
</div>

<div class="panel">
  <div class="panel-h">
    <h3>人類 vs. AI：同一種學習</h3>
    <span class="eyebrow">Concept</span>
  </div>
  <div class="compare">
    <div>
      <div class="eyebrow col-h">人類</div>
      {#each ['眼睛看到', '大腦理解', '累積經驗', '做決定'] as x}
        <div class="crow">{x}</div>
      {/each}
    </div>
    <div>
      <div class="eyebrow col-h ai">AI</div>
      {#each ['資料', '模型', '預測', '決策'] as x}
        <div class="crow mono ai-row">{x}</div>
      {/each}
    </div>
  </div>
</div>

<style>
  .lede { margin: 0 0 var(--sp-4); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }

  .qrow { margin-bottom: var(--sp-4); }
  .pl .emo { font-size: 18px; margin-right: 6px; }

  .stageview {
    background: #fff; border: 1px solid var(--line); border-radius: var(--r);
    padding: 18px 18px 16px; margin-bottom: var(--sp-4);
  }
  .hero { font-size: 52px; text-align: center; line-height: 1.1; margin: 4px 0 14px; }

  .doing {
    display: flex; align-items: center; gap: 12px;
    border: 1px solid var(--line); border-radius: var(--r-sm);
    background: var(--surface-2); padding: 12px 14px; margin-bottom: var(--sp-3);
  }
  .dicon { font-size: 24px; flex: none; }
  .dtext { font-size: var(--fs-sm); color: var(--ink-2); line-height: var(--lh-snug); }
  .dtext b { color: var(--accent-ink); }

  .result { margin-top: 4px; }
  .accent { color: var(--accent-ink); }

  .compare {
    display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-4); font-size: var(--fs-sm);
  }
  .col-h { margin-bottom: 10px; }
  .col-h.ai { color: var(--accent-ink); }
  .crow { padding: 10px 0; border-bottom: 1px solid var(--line); }
  .crow:last-child { border-bottom: none; }
  .ai-row { color: var(--ink-2); }
</style>
