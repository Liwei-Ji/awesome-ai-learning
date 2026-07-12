<script>
  /* Ch · RAG 檢索增強生成 —— 引導式三步驟：① 提問 → ② 檢索知識庫 → ③ 生成回答。
     親手走一遍「先檢索、再生成」：按檢索看它依相似度找出片段，按生成看答案照片段長出來、附來源。
     最後對照「不查資料的話會幻覺」。亮色、確定性、離線。 */
  import { fade, fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import Stepper from '../components/Stepper.svelte';

  const KB = [
    { id: 1, t: '請假規定', x: '特休假每年最多可累積 10 天，逾期未休將歸零。' },
    { id: 2, t: '退貨政策', x: '商品可於購買後 14 天內申請退貨，需保持完整包裝。' },
    { id: 3, t: '客服時間', x: '客服專線服務時間為平日 09:00–18:00。' },
    { id: 4, t: '保固條款', x: '產品提供一年保固，人為損壞不在保固範圍。' },
    { id: 5, t: '運費說明', x: '訂單滿 1000 元免運費，未滿酌收 80 元。' },
  ];
  const QS = [
    { q: '特休假最多可以累積幾天？',
      noRag: '我不確定貴公司的規定，一般可能是 30 天左右吧？（這是我猜的）',
      rag: '根據內部規定，特休假每年最多可累積 <b>10 天</b>，逾期未休會歸零。',
      sims: { 1: 92, 2: 14, 3: 8, 4: 20, 5: 6 } },
    { q: '買了東西幾天內可以退貨？',
      noRag: '通常是 7 天鑑賞期吧？不過每家不同，我其實不太確定。',
      rag: '依退貨政策，商品可於購買後 <b>14 天內</b>申請退貨，且需保持完整包裝。',
      sims: { 1: 12, 2: 90, 3: 6, 4: 22, 5: 10 } },
    { q: '客服幾點有開？滿多少免運？',
      noRag: '客服大概是上班時間吧？免運門檻我就真的不知道了。',
      rag: '客服服務時間為<b>平日 09:00–18:00</b>；訂單<b>滿 1000 元免運</b>，未滿收 80 元。',
      sims: { 1: 8, 2: 12, 3: 88, 4: 6, 5: 84 } },
  ];
  const THRESH = 60;
  const STEPS = ['提問', '檢索知識庫', '生成回答'];

  let qIdx = $state(0);
  let step = $state(0);       // 0 已提問 · 1 已檢索 · 2 已生成
  let peek = $state(false);   // 偷看「不查資料」的答案

  let q = $derived(QS[qIdx]);
  let ranked = $derived(KB.map((c) => ({ ...c, sim: q.sims[c.id] })).sort((a, b) => b.sim - a.sim));
  let retrieved = $derived(ranked.filter((c) => c.sim >= THRESH));

  function selectQ(i) { qIdx = i; step = 0; peek = false; }
  function retrieve() { step = 1; }
  function generate() { step = 2; }
  function restart() { step = 0; peek = false; }
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：讓 AI 先查資料再回答</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    LLM 不一定記得你公司的規定，硬答就容易<b>「幻覺」</b>。<b>RAG</b> 的訣竅是順序：
    <b>先檢索</b>相關片段、<b>再生成</b>答案。跟著三步驟走一遍。
  </p>

  <div class="demo-stage light">
    <!-- 步驟指示 -->
    <Stepper steps={STEPS} current={step} />

    <!-- 問題 -->
    <div class="qrow">
      <span class="mono k">① 選一個問題</span>
      <div class="pl-row">
        {#each QS as item, i}<button class="pl" class:on={i === qIdx} onclick={() => selectQ(i)}>{item.q}</button>{/each}
      </div>
    </div>

    <div class="grid">
      <div class="kb">
        <div class="mono k">知識庫 KNOWLEDGE BASE {step >= 1 ? '· 已依相似度檢索' : '· 尚未檢索'}</div>
        {#each ranked as c, r (c.id)}
          {@const used = step >= 1 && c.sim >= THRESH}
          <div class="chunk" class:used class:idle={step === 0}>
            <div class="chead">
              <b>{c.t}</b>
              {#if step >= 1}<span class="sim" transition:fade>{c.sim}%</span>{/if}
              {#if used}<span class="badge" in:fly={{ y: -4, duration: dur(D.fast) }}>✓ 取用</span>{/if}
            </div>
            <div class="ctext">{c.x}</div>
            <div class="simbar"><div class="simfill" class:hot={used} style="width:{step >= 1 ? c.sim : 0}%; transition-delay:{r * 90}ms"></div></div>
          </div>
        {/each}
      </div>

      <div class="ansside">
        <div class="mono k">AI 的回答</div>
        {#if step < 2}
          <div class="waiting">
            {#if step === 0}尚未開始——先按下方「▶ 檢索知識庫」。
            {:else}已找到 <b>{retrieved.length}</b> 段相關資料 ✓　接著按「▶ 生成回答」，讓 AI 照著它們作答。{/if}
          </div>
        {:else}
          <div class="answer good" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>{@html q.rag}</div>
          <div class="cites" in:fade={{ duration: dur(D.base), delay: dur(120) }}>
            <span class="cl">來源：</span>
            {#each retrieved as c}<span class="cite">📄 {c.t}</span>{/each}
          </div>
          <button class="peek" onclick={() => (peek = !peek)}>{peek ? '▾' : '▸'} 如果不查資料會怎樣？</button>
          {#if peek}
            <div class="answer bad" transition:fade={{ duration: dur(D.fast) }}>{q.noRag}<div class="badtag">⚠️ 憑記憶硬答＝可能是幻覺</div></div>
          {/if}
        {/if}
      </div>
    </div>

    <!-- 步驟按鈕 -->
    <div class="guide-actions">
      <button class="btn primary" disabled={step !== 0} onclick={retrieve}>▶ 檢索知識庫</button>
      <span class="arrow2">→</span>
      <button class="btn primary" disabled={step !== 1} onclick={generate}>▶ 生成回答</button>
      {#if step > 0}<button class="btn ghost" onclick={restart}>重來</button>{/if}
    </div>
  </div>

  <p class="hint">
    這就是 <b>RAG（檢索增強生成）</b>：把「<b>檢索</b>」接在「<b>生成</b>」前面。好處是能答<b>私有或最新</b>的內容、
    <b>減少幻覺</b>、還能<b>附來源</b>。檢索靠的正是上一站的<b>向量相似度</b>——把問題和每段資料變成向量，找最接近的幾段。
  </p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .k { font-size: var(--fs-eyebrow); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: var(--sp-2); }

  .qrow { margin-bottom: var(--sp-3); }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
  .kb, .ansside { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 12px 14px; }

  .chunk { border: 1px solid var(--line); border-radius: var(--r); padding: 9px 11px; margin-bottom: var(--sp-2); background: var(--surface); transition: .25s; }
  .chunk:last-child { margin-bottom: 0; }
  .chunk.idle { opacity: .85; }
  .chunk.used { border-color: var(--teal); background: #0f8a800c; box-shadow: 0 0 12px #0f8a8018; }
  .chead { display: flex; align-items: center; gap: var(--sp-2); font-size: var(--fs-sm); }
  .chead b { color: var(--ink); }
  .sim { margin-left: auto; font-family: var(--mono); font-size: var(--fs-micro); color: var(--muted); }
  .chunk.used .sim { color: var(--teal); }
  .badge { font-size: var(--fs-micro); color: var(--teal); border: 1px solid #0f8a8066; border-radius: 99px; padding: 1px 7px; }
  .ctext { font-size: var(--fs-cap); color: var(--muted); margin-top: var(--sp-1); line-height: 1.5; }
  .simbar { height: 5px; border-radius: 99px; background: var(--surface-3); overflow: hidden; margin-top: 7px; }
  .simfill { height: 100%; width: 0; background: var(--line-2); border-radius: 99px; transition: width .55s cubic-bezier(.2,.7,.2,1); }
  .simfill.hot { background: var(--teal); }

  .answer { border-radius: var(--r); padding: 12px 14px; font-size: var(--fs-body); line-height: 1.7; }
  .answer.good { background: #0f8a800c; border: 1px solid #0f8a8055; color: var(--ink); }
  .answer.good :global(b) { color: var(--teal); }
  .answer.bad { background: #fceaea; border: 1px solid #e8b4b4; color: var(--crit); margin-top: var(--sp-2); }
  .badtag { font-size: var(--fs-micro); margin-top: 6px; }
  .cites { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; margin-top: 10px; }
  .cl { font-size: var(--fs-micro); color: var(--muted); }
  .cite { font-size: var(--fs-micro); color: var(--teal); border: 1px solid #0f8a8055; border-radius: var(--r-sm); padding: 3px 8px; background: #0f8a800c; }
  .peek { margin-top: var(--sp-3); background: none; border: none; color: var(--muted); font-size: var(--fs-cap); cursor: pointer; padding: 0; }
  .peek:hover { color: var(--ink-2); }
</style>
