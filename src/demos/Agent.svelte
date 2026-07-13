<script>
  /* Ch22 · AI Agent —— 引導式三步驟：① 選目標 → ② 規劃執行 → ③ 完成。
     給 Agent 一個目標 → 執行 → 步驟逐條浮現（執行中…→✓）→ 完成橫幅。
     state = sel（目標）、revealed（已浮現步驟含狀態）、running、finished。
     phase 由 running / finished 推導，餵給共用 Stepper。 */
  import { onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { dur } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';
  import Stepper from '../components/Stepper.svelte';

  // Neutral, shared across locales: goal ids + the emoji icon for each step.
  const GOAL_IDS = ['trip', 'report'];
  const STEP_ICONS = {
    trip: ['🎯', '🔎', '🌤', '🏨', '🚄', '🗒'],
    report: ['🎯', '🔎', '🧮', '🗒'],
  };

  const L = {
    zh: {
      h3: '互動：給 Agent 一個目標，看它自己完成',
      flow: ['選目標', '規劃執行', '完成'],
      pick: '① 選一個目標',
      runAgent: '▶ 執行 Agent',
      runAgain: '▶ 再執行一次',
      restart: '重來',
      waiting: '尚未開始——先在上方選好目標，再按下方「▶ 執行 Agent」。',
      deliveredGoal: '你交付的目標',
      running: '執行中…',
      doneBanner: '✅ <b>目標完成</b> — Agent 自主走完全部步驟並整合出結果。',
      hint: '<b>一般 AI</b>：問→答一次就結束。<b>Agent</b>：拿到<b>目標</b>後自己<b>拆步驟、呼叫工具、整合結果</b>，反覆執行直到完成——像會自己動手的助理。',
      goalName: { trip: '幫我安排東京旅行', report: '幫我寫週報' },
      goalSteps: {
        trip: [
          ['分析目標', '拆解：需要日期、天氣、住宿、交通、行程'],
          ['搜尋資料', '呼叫搜尋工具：東京 5 天熱門景點'],
          ['查看天氣', '呼叫天氣 API：下週東京多雲、22°C'],
          ['比較飯店', '查訂房 API：3 間近車站、評價 4.5★+'],
          ['安排交通', '規劃 JR Pass + 機場快線路線'],
          ['產生行程', '整合成 5 天逐日行程表'],
        ],
        report: [
          ['分析目標', '拆解：需要本週完成事項、數據、下週計畫'],
          ['讀取資料', '呼叫工具：抓取本週 commit 與任務紀錄'],
          ['彙整重點', '歸納出 3 項主要進度'],
          ['產生草稿', '整合成一頁週報草稿'],
        ],
      },
    },
    en: {
      h3: 'Interactive: give the Agent a goal, watch it finish on its own',
      flow: ['Pick a goal', 'Plan & execute', 'Done'],
      pick: '① Pick a goal',
      runAgent: '▶ Run the Agent',
      runAgain: '▶ Run again',
      restart: 'Restart',
      waiting: 'Not started yet—pick a goal above, then press “▶ Run the Agent” below.',
      deliveredGoal: 'The goal you handed over',
      running: 'Running…',
      doneBanner: '✅ <b>Goal complete</b> — the Agent worked through every step on its own and pulled the results together.',
      hint: '<b>Regular AI</b>: ask → answer, once and done. An <b>Agent</b>: given a <b>goal</b>, it <b>breaks it into steps, calls tools, and pulls the results together</b> on its own, repeating until it’s done—like an assistant that takes action itself.',
      goalName: { trip: 'Plan me a trip to Tokyo', report: 'Write my weekly report' },
      goalSteps: {
        trip: [
          ['Analyze the goal', 'Break it down: need dates, weather, lodging, transport, itinerary'],
          ['Search for info', 'Call the search tool: top sights for 5 days in Tokyo'],
          ['Check the weather', 'Call the weather API: Tokyo next week, cloudy, 22°C'],
          ['Compare hotels', 'Query the booking API: 3 near the station, rated 4.5★+'],
          ['Arrange transport', 'Plan a JR Pass + airport express route'],
          ['Generate the itinerary', 'Combine it into a day-by-day 5-day plan'],
        ],
        report: [
          ['Analyze the goal', 'Break it down: need this week’s completed items, numbers, next week’s plan'],
          ['Read the data', 'Call a tool: pull this week’s commits and task logs'],
          ['Summarize highlights', 'Boil it down to 3 main updates'],
          ['Generate a draft', 'Combine it into a one-page weekly-report draft'],
        ],
      },
    },
    ja: {
      h3: 'インタラクティブ：Agent に目標を与えて、自分で完成させる様子を見る',
      flow: ['目標を選ぶ', '計画・実行', '完了'],
      pick: '① 目標を選ぶ',
      runAgent: '▶ Agent を実行',
      runAgain: '▶ もう一度実行',
      restart: 'やり直す',
      waiting: 'まだ始まっていません——上で目標を選んでから、下の「▶ Agent を実行」を押してください。',
      deliveredGoal: 'あなたが渡した目標',
      running: '実行中…',
      doneBanner: '✅ <b>目標達成</b> — Agent がすべての手順を自分でこなし、結果をまとめ上げました。',
      hint: '<b>普通の AI</b>：問い→答え、一度きりで終わり。<b>Agent</b>：<b>目標</b>を与えられると、自分で<b>手順に分解し、ツールを呼び、結果をまとめる</b>——完了まで繰り返す、自分で手を動かすアシスタントのような存在です。',
      goalName: { trip: '東京旅行を計画して', report: '週報を書いて' },
      goalSteps: {
        trip: [
          ['目標を分析', '分解：日程・天気・宿泊・交通・行程が必要'],
          ['情報を検索', '検索ツールを呼ぶ：東京 5 日間の人気スポット'],
          ['天気を確認', '天気 API を呼ぶ：来週の東京はくもり、22°C'],
          ['ホテルを比較', '予約 API を照会：駅近 3 軒、評価 4.5★ 以上'],
          ['交通を手配', 'JR パス＋空港特急のルートを計画'],
          ['行程を作成', '5 日間の日別プランにまとめる'],
        ],
        report: [
          ['目標を分析', '分解：今週の完了事項・数値・来週の計画が必要'],
          ['データを読み取る', 'ツールを呼ぶ：今週の commit とタスク記録を取得'],
          ['要点をまとめる', '主な進捗 3 点に絞る'],
          ['草稿を作成', '1 ページの週報草稿にまとめる'],
        ],
      },
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  const KEYS = GOAL_IDS;

  let sel = $state(GOAL_IDS[0]);
  let revealed = $state([]);   // [{title, ico, detail, status:'run'|'done'}]
  let running = $state(false);
  let finished = $state(false);
  let timer;

  let steps = $derived(ui.goalSteps[sel].map((s, i) => [s[0], STEP_ICONS[sel][i], s[1]]));
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
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">Interactive</span></div>

  <div class="demo-stage light">
    <!-- 步驟指示 -->
    <Stepper steps={ui.flow} current={phase} />

    <!-- 選目標 -->
    <div class="goalrow">
      <span class="fieldk">{ui.pick}</span>
      <div class="pl-row">
        {#each KEYS as k}
          <button class="pl" class:on={k === sel} onclick={() => selectGoal(k)}>{ui.goalName[k]}</button>
        {/each}
      </div>
    </div>

    <!-- 執行動作列 -->
    <div class="guide-actions">
      <button class="btn primary" disabled={running} onclick={run}>
        {finished ? ui.runAgain : ui.runAgent}
      </button>
      {#if running || finished}<button class="btn ghost" onclick={reset}>{ui.restart}</button>{/if}
    </div>

    <div class="timeline">
      {#if phase === 0}
        <div class="waiting">{ui.waiting}</div>
      {:else}
        <div class="usr" in:fade={{ duration: dur(200) }}>
          <span class="fieldk">{ui.deliveredGoal}</span>
          <div class="msg me goal">{ui.goalName[sel]}</div>
        </div>
      {/if}
      {#each revealed as r}
        <div class="step" in:fade={{ duration: dur(300) }}>
          <span class="ico">{r.ico}</span>
          <div class="body">
            <div class="title">
              {r.title}
              {#if r.status === 'run'}<span class="mono st run">{ui.running}</span>
              {:else}<span class="mono st done">✓</span>{/if}
            </div>
            <div class="detail">{r.detail}</div>
          </div>
        </div>
      {/each}
      {#if finished}
        <div class="done-banner" in:fade={{ duration: dur(300) }}>{@html ui.doneBanner}</div>
      {/if}
    </div>
  </div>

  <p class="hint">{@html ui.hint}</p>
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
