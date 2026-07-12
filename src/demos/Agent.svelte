<script>
  /* Ch22 · AI Agent —— 引導式三步驟：① 選目標 → ② 規劃執行 → ③ 完成。
     給 Agent 一個目標 → 執行 → 步驟逐條浮現（執行中…→✓）→ 完成橫幅。
     state = sel（目標）、revealed（已浮現步驟含狀態）、running、finished。
     phase 由 running / finished 推導，餵給共用 Stepper。 */
  import { onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { dur } from '../lib/motion.js';
  import Stepper from '../components/Stepper.svelte';

  const GOALS = {
    幫我安排東京旅行: [
      ['分析目標', '🎯', '拆解：需要日期、天氣、住宿、交通、行程'],
      ['搜尋資料', '🔎', '呼叫搜尋工具：東京 5 天熱門景點'],
      ['查看天氣', '🌤', '呼叫天氣 API：下週東京多雲、22°C'],
      ['比較飯店', '🏨', '查訂房 API：3 間近車站、評價 4.5★+'],
      ['安排交通', '🚄', '規劃 JR Pass + 機場快線路線'],
      ['產生行程', '🗒', '整合成 5 天逐日行程表'],
    ],
    幫我寫週報: [
      ['分析目標', '🎯', '拆解：需要本週完成事項、數據、下週計畫'],
      ['讀取資料', '🔎', '呼叫工具：抓取本週 commit 與任務紀錄'],
      ['彙整重點', '🧮', '歸納出 3 項主要進度'],
      ['產生草稿', '🗒', '整合成一頁週報草稿'],
    ],
  };
  const KEYS = Object.keys(GOALS);
  const STEPS = ['選目標', '規劃執行', '完成'];

  let sel = $state(KEYS[0]);
  let revealed = $state([]);   // [{title, ico, detail, status:'run'|'done'}]
  let running = $state(false);
  let finished = $state(false);
  let timer;

  let steps = $derived(GOALS[sel]);
  let phase = $derived(finished ? 2 : running ? 1 : 0);

  function reset() { clearTimeout(timer); revealed = []; running = false; finished = false; }
  function selectGoal(k) { sel = k; reset(); }
  function run() {
    reset(); running = true;
    let i = 0;
    const add = () => {
      if (i >= steps.length) { running = false; finished = true; return; }
      const s = steps[i];
      revealed.push({ title: s[0], ico: s[1], detail: s[2], status: 'run' });
      const idx = i;
      timer = setTimeout(() => { revealed[idx].status = 'done'; i++; add(); }, dur(700));
    };
    add();
  }

  onDestroy(() => clearTimeout(timer));
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：給 Agent 一個目標，看它自己完成</h3><span class="eyebrow">Interactive</span></div>

  <div class="demo-stage light">
    <!-- 步驟指示 -->
    <Stepper steps={STEPS} current={phase} />

    <!-- 選目標 -->
    <div class="goalrow">
      <span class="fieldk">① 選一個目標</span>
      <div class="pl-row">
        {#each KEYS as k}
          <button class="pl" class:on={k === sel} onclick={() => selectGoal(k)}>{k}</button>
        {/each}
      </div>
    </div>

    <!-- 執行動作列 -->
    <div class="guide-actions">
      <button class="btn primary" disabled={running} onclick={run}>
        {finished ? '▶ 再執行一次' : '▶ 執行 Agent'}
      </button>
      {#if running || finished}<button class="btn ghost" onclick={reset}>重來</button>{/if}
    </div>

    <div class="timeline">
      {#if phase === 0}
        <div class="waiting">尚未開始——先在上方選好目標，再按下方「▶ 執行 Agent」。</div>
      {:else}
        <div class="usr" in:fade={{ duration: dur(200) }}>
          <span class="fieldk">你交付的目標</span>
          <div class="msg me goal">{sel}</div>
        </div>
      {/if}
      {#each revealed as r}
        <div class="step" in:fade={{ duration: dur(300) }}>
          <span class="ico">{r.ico}</span>
          <div class="body">
            <div class="title">
              {r.title}
              {#if r.status === 'run'}<span class="mono st run">執行中…</span>
              {:else}<span class="mono st done">✓</span>{/if}
            </div>
            <div class="detail">{r.detail}</div>
          </div>
        </div>
      {/each}
      {#if finished}
        <div class="done-banner" in:fade={{ duration: dur(300) }}>✅ <b>目標完成</b> — Agent 自主走完全部步驟並整合出結果。</div>
      {/if}
    </div>
  </div>

  <p class="hint">
    <b>一般 AI</b>：問→答一次就結束。<b>Agent</b>：拿到<b>目標</b>後自己<b>拆步驟、呼叫工具、整合結果</b>，反覆執行直到完成——像會自己動手的助理。
  </p>
</div>

<style>
  .goalrow { margin-bottom: var(--sp-3); }
  .usr { margin: var(--sp-1) 0 var(--sp-3); }
  .goal { max-width: 100%; display: inline-block; }
  .timeline { margin-top: var(--sp-1); }
  .step { display: flex; gap: var(--sp-3); align-items: flex-start; padding: var(--sp-2) 0; border-bottom: 1px dashed var(--line); }
  .ico { font-size: 20px; }
  .body { flex: 1; }
  .title { font-weight: 600; font-size: var(--fs-body); }
  .st { font-size: var(--fs-micro); margin-left: var(--sp-1); }
  .st.run { color: var(--muted); }
  .st.done { color: var(--good); }
  .detail { font-size: var(--fs-cap); color: var(--muted); margin-top: 2px; }
  .done-banner {
    margin-top: var(--sp-3); padding: var(--sp-3) var(--sp-4); border-radius: var(--r);
    border: 1px solid var(--good); background: color-mix(in srgb, var(--good) 10%, transparent);
    font-size: var(--fs-body);
  }
</style>
