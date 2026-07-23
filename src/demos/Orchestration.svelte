<script>
  /* Ch · Agent 編排：把一個任務餵進一張小圖，一步步看它流過各節點。
     router 分支 → orchestrator 分派 → 兩個 worker 平行 → gather 彙整 →
     loop 節點加 guard（最多兩次）重試一次 → output。
     可切換對照「單一 agent 黑盒」：同樣任務，全塞進一坨看不見的迴圈。
     state = idx（目前節點）、started、mode（'graph' | 'blob'）。 */
  import { fade, fly } from 'svelte/transition';
  import { dur } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';
  import Stepper from '../components/Stepper.svelte';

  // Neutral across locales: node ids + an emoji per node.
  const NODE_IDS = ['router', 'orchestrator', 'workers', 'gather', 'loop', 'output'];
  const NODE_ICON = {
    router: '🔀', orchestrator: '🧭', workers: '👥', gather: '📥', loop: '🔁', output: '✅',
  };

  const L = {
    zh: {
      h3: '互動：把任務餵進一張編排圖，一步步看它流過各節點',
      flow: ['路由', '協調', '平行', '彙整', '迴圈', '輸出'],
      task: '任務：整理一份「競品比較」報告',
      modeGraph: '編排圖',
      modeBlob: '單一 agent 黑盒',
      step: '▶ 下一個節點',
      run: '▶ 開始',
      restart: '重來',
      waiting: '按「▶ 開始」，讓任務從第一個節點流起。',
      guard: 'guard：最多 2 次',
      done: '✅ <b>流程走完</b>：每個節點都看得見、可單獨測，哪一步出錯一目了然。',
      blobDesc: '單一 agent：把整份任務丟進一個「想→做→看」的迴圈，自己決定一切。跑得出來，但你<b>看不到它怎麼分工、哪一步卡住</b>，難控制也難除錯。',
      blobRun: '（黑盒運轉中…你只看得到最後結果）',
      hint: '<b>編排＝把系統畫成圖</b>：節點是步驟或子 agent，邊是流向。比起一個大 agent 黑盒，圖換到<b>可控、可測、可追蹤、可重用</b>，代價是別過度設計、迴圈要加 guard。',
      nodes: {
        router: ['路由 Router', '看輸入，決定走哪條分支', '判定：這是「需要多來源查證」的任務 → 走協調者路線'],
        orchestrator: ['協調者 Orchestrator', '拆任務、分派給工人', '拆成兩塊：A 查產品規格、B 查使用者評價'],
        workers: ['工人 Worker ×2（平行）', '兩個 worker 同時各做一塊', 'A：抓三家規格表 ‖ B：抓評價與評分'],
        gather: ['彙整 Gather', '把平行結果合併成一份', '合併規格＋評價，寫進共享狀態'],
        loop: ['迴圈 Loop（帶 guard）', '不通過就重試，最多 2 次', '第 1 次缺價格 → 重試補齊；第 2 次通過 ✓'],
        output: ['輸出 Output', '交付最終結果', '產出一頁競品比較報告'],
      },
    },
    en: {
      h3: 'Interactive: feed a task into an orchestration graph, step through the nodes',
      flow: ['Route', 'Orchestrate', 'Parallel', 'Gather', 'Loop', 'Output'],
      task: 'Task: compile a competitor-comparison report',
      modeGraph: 'Orchestration graph',
      modeBlob: 'Single-agent blob',
      step: '▶ Next node',
      run: '▶ Start',
      restart: 'Restart',
      waiting: 'Press “▶ Start” to let the task flow in from the first node.',
      guard: 'guard: max 2 tries',
      done: '✅ <b>Flow complete</b>: every node is visible and testable on its own, so it’s obvious which step went wrong.',
      blobDesc: 'A single agent drops the whole task into one think, act, observe loop and decides everything itself. It can work, but you <b>can’t see how it split the work or where it stalled</b>, so it’s hard to control and debug.',
      blobRun: '(black box running… you only see the final result)',
      hint: '<b>Orchestration = drawing the system as a graph</b>: nodes are steps or sub-agents, edges are the flow. Versus one big agent blob, a graph buys you <b>control, testability, traceability, and reuse</b>, as long as you don’t over-engineer and you guard your loops.',
      nodes: {
        router: ['Router', 'Inspects input, picks a branch', 'Verdict: this needs multi-source verification → take the orchestrator route'],
        orchestrator: ['Orchestrator', 'Splits the task, delegates to workers', 'Split into two: A checks specs, B checks user reviews'],
        workers: ['Worker ×2 (parallel)', 'Two workers each do a piece at once', 'A: pull 3 spec sheets ‖ B: pull reviews and ratings'],
        gather: ['Gather', 'Merges the parallel results', 'Merge specs + reviews, write to shared state'],
        loop: ['Loop (with guard)', 'Retry if it fails the check, max 2', 'Try 1 missing price → retry to fill; try 2 passes ✓'],
        output: ['Output', 'Deliver the final result', 'Produce a one-page competitor comparison'],
      },
    },
    ja: {
      h3: 'インタラクティブ：タスクをオーケストレーショングラフに流し、ノードを 1 つずつ辿る',
      flow: ['ルート', '協調', '並列', '集約', 'ループ', '出力'],
      task: 'タスク：競合比較レポートをまとめる',
      modeGraph: 'オーケストレーショングラフ',
      modeBlob: '単一 agent のブラックボックス',
      step: '▶ 次のノード',
      run: '▶ 開始',
      restart: 'やり直す',
      waiting: '「▶ 開始」を押すと、最初のノードからタスクが流れ始めます。',
      guard: 'guard：最大 2 回',
      done: '✅ <b>フロー完了</b>：どのノードも見えて単独でテストでき、どの手順で失敗したか一目瞭然です。',
      blobDesc: '単一 agent はタスク全体を「考える→実行→見る」のループに放り込み、すべてを自分で決めます。動きはしますが、<b>どう分担したか・どこで止まったかが見えず</b>、制御もデバッグも難しい。',
      blobRun: '（ブラックボックス稼働中…見えるのは最終結果だけ）',
      hint: '<b>オーケストレーション＝システムをグラフとして描くこと</b>：ノードは手順や子 agent、エッジは流れ。大きな agent のブラックボックスに比べ、グラフは<b>可制御・テスト可能・追跡可能・再利用可能</b>を得られます。ただし過剰設計を避け、ループにはガードを。',
      nodes: {
        router: ['ルーター Router', '入力を見て分岐を選ぶ', '判定：多来源の照合が必要 → 協調者ルートへ'],
        orchestrator: ['オーケストレーター', 'タスクを分割しワーカーに委任', '2 つに分割：A は仕様、B はユーザー評価'],
        workers: ['ワーカー ×2（並列）', '2 つのワーカーが同時に 1 部分ずつ', 'A：3 社の仕様表を取得 ‖ B：評価とレビューを取得'],
        gather: ['集約 Gather', '並列結果を 1 つに統合', '仕様＋評価を統合し、共有状態に書き込む'],
        loop: ['ループ Loop（ガード付き）', 'チェック不合格なら再試行、最大 2 回', '1 回目は価格欠落 → 補完で再試行、2 回目で合格 ✓'],
        output: ['出力 Output', '最終結果を交付', '1 ページの競合比較レポートを生成'],
      },
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let mode = $state('graph');   // 'graph' | 'blob'
  let idx = $state(-1);          // -1 = not started; 0..5 = current node; 6 = done
  let blobRunning = $state(false);
  let blobDone = $state(false);
  let timer;

  let started = $derived(idx >= 0);
  let phase = $derived(idx < 0 ? 0 : Math.min(idx, NODE_IDS.length - 1));

  function reset() {
    clearTimeout(timer);
    idx = -1; blobRunning = false; blobDone = false;
  }
  function setMode(m) { mode = m; reset(); }
  function advance() {
    if (idx < NODE_IDS.length) idx += 1;
  }
  function runBlob() {
    reset(); blobRunning = true;
    timer = setTimeout(() => { blobRunning = false; blobDone = true; }, dur(1400));
  }
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>

  <div class="demo-stage light">
    <!-- 模式切換 -->
    <div class="pl-row modes">
      <button class="pl" class:on={mode === 'graph'} onclick={() => setMode('graph')}>{ui.modeGraph}</button>
      <button class="pl" class:on={mode === 'blob'} onclick={() => setMode('blob')}>{ui.modeBlob}</button>
    </div>

    <div class="taskline">{ui.task}</div>

    {#if mode === 'graph'}
      <Stepper steps={ui.flow} current={phase} />

      <div class="guide-actions">
        <button class="btn primary" disabled={idx >= NODE_IDS.length} onclick={advance}>
          {started ? ui.step : ui.run}
        </button>
        {#if started}<button class="btn ghost" onclick={reset}>{ui.restart}</button>{/if}
      </div>

      <div class="graph">
        {#if !started}
          <div class="waiting">{ui.waiting}</div>
        {/if}
        {#each NODE_IDS as id, i}
          {#if i <= idx}
            {@const n = ui.nodes[id]}
            <div class="node" class:cur={i === idx} in:fly={{ y: 8, duration: dur(300) }}>
              <span class="ico">{NODE_ICON[id]}</span>
              <div class="body">
                <div class="title">
                  {n[0]}
                  {#if id === 'loop'}<span class="mono guard">{ui.guard}</span>{/if}
                </div>
                <div class="role">{n[1]}</div>
                <div class="detail">{n[2]}</div>
              </div>
            </div>
          {/if}
        {/each}
        {#if idx >= NODE_IDS.length}
          <div class="done-banner" in:fade={{ duration: dur(300) }}>{@html ui.done}</div>
        {/if}
      </div>
    {:else}
      <div class="guide-actions">
        <button class="btn primary" disabled={blobRunning} onclick={runBlob}>{ui.run}</button>
        {#if blobRunning || blobDone}<button class="btn ghost" onclick={reset}>{ui.restart}</button>{/if}
      </div>
      <div class="blob" class:run={blobRunning}>
        <span class="ico">🤖</span>
        <div class="body">
          <p class="role">{@html ui.blobDesc}</p>
          {#if blobRunning}<div class="detail run" in:fade={{ duration: dur(200) }}>{ui.blobRun}</div>{/if}
          {#if blobDone}<div class="done-banner blobout" in:fade={{ duration: dur(300) }}>{@html ui.done}</div>{/if}
        </div>
      </div>
    {/if}
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .modes { margin-bottom: var(--sp-3); }
  .taskline {
    font-weight: 600; font-size: var(--fs-body); margin-bottom: var(--sp-3);
    padding: var(--sp-2) var(--sp-3); border-radius: var(--r);
    background: color-mix(in srgb, var(--accent) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  }
  .graph { margin-top: var(--sp-1); }
  .node {
    display: flex; gap: var(--sp-3); align-items: flex-start;
    padding: var(--sp-2) var(--sp-3); margin-bottom: var(--sp-2);
    border: 1px solid var(--line); border-radius: var(--r);
    border-left: 3px solid var(--line-2);
  }
  .node.cur { border-left-color: var(--accent); background: color-mix(in srgb, var(--accent) 6%, transparent); }
  .ico { font-size: 22px; }
  .body { flex: 1; }
  .title { font-weight: 600; font-size: var(--fs-body); }
  .guard { font-size: var(--fs-micro); margin-left: var(--sp-2); color: var(--muted); border: 1px dashed var(--line-2); border-radius: 999px; padding: 1px 8px; }
  .role { font-size: var(--fs-cap); color: var(--ink-2); margin-top: 2px; }
  .detail { font-size: var(--fs-cap); color: var(--muted); margin-top: 4px; }
  .detail.run { font-family: var(--mono); }
  .blob {
    display: flex; gap: var(--sp-3); align-items: flex-start;
    padding: var(--sp-3) var(--sp-4); border-radius: var(--r);
    border: 1px dashed var(--line-2); background: color-mix(in srgb, var(--muted) 6%, transparent);
  }
  .blob.run { border-style: solid; }
  .done-banner {
    margin-top: var(--sp-3); padding: var(--sp-3) var(--sp-4); border-radius: var(--r);
    border: 1px solid var(--good); background: color-mix(in srgb, var(--good) 10%, transparent);
    font-size: var(--fs-body);
  }
  .done-banner.blobout { margin-top: var(--sp-2); }
</style>
