<script>
  /* Ch · AI 觀測與追蹤，品質下滑偵探：儀表板上的抽樣品質分數從某天開始下滑（錯誤率卻是 0）。
     點下滑起點打開那天的 trace 回放（輸入 → 檢索 → 組 prompt → 輸出），找到肇因：prompt v2 弄丟了「附出處」的指示。
     再跑回歸測試集看 v1 vs v2 的分數對照（紅色不過的列），最後回滾、曲線恢復。
     引導式四階段（stage 0-3），資料全為示意、離線。亮色。字串依 i18n.locale。 */
  import { fade, fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';
  import { Activity, FileSearch, FlaskConical, Undo2 } from '@lucide/svelte';

  // 語言中性資料：每日抽樣品質分數（壞版 / 回滾後）、回歸測試 v1 vs v2 分數
  const SCORES_BAD = [92, 93, 91, 92, 93, 92, 91, 86, 82, 79, 77, 75, 74, 73];
  const SCORES_FIX = [92, 93, 91, 92, 93, 92, 91, 92, 91, 93, 92, 91, 92, 93];
  const DROP = 7; // prompt v2 上線的那天（index）
  const REG = [[95, 61], [93, 58], [92, 64], [90, 87], [94, 92]]; // [v1, v2]
  const PASS_AT = 80;
  const BAD_STEPS = [2, 3]; // trace 裡出問題的步驟

  const L = {
    zh: {
      h3: '互動：品質下滑偵探（上線後的一天）',
      lede: '你的 AI 客服上線兩週，儀表板上的<b>抽樣品質分數</b>從第 8 天開始往下掉，但系統沒有任何錯誤。順著觀測的線索走一遍：<b>回放 trace → 跑回歸測試 → 回滾</b>。',
      board: 'DASHBOARD · 抽樣品質分數（LLM-as-judge，每日平均）',
      deployTag: 'prompt v2 上線',
      baseline: '基準 90',
      clickHint: '分數從 D8 開始下滑，錯誤率卻是 0。點下滑起點（或按下方按鈕），打開那天的 trace。',
      openBtn: '回放 D8 的 trace',
      traceLabel: 'TRACE 回放 · D8 抽樣 #4217',
      steps: [
        { k: 'INPUT', t: '使用者輸入', x: '「退貨要在幾天內申請？」' },
        { k: 'RETRIEVAL', t: '檢索', x: '命中 3 段政策條文，含出處，正常' },
        { k: 'PROMPT', t: '組 prompt（v2）', x: 'v2 改寫時，「回答必須附上出處」這行不見了', tag: '肇因' },
        { k: 'OUTPUT', t: '輸出', x: '「7 天內。」沒有附出處，評審扣分' },
      ],
      causeMsg: '找到了：不是模型壞掉，是 <b>prompt v2</b> 把「附上出處」的指示弄丟了。每一步都有紀錄，所以幾分鐘就能定位。接著確認影響範圍：',
      runBtn: '跑回歸測試集',
      regLabel: 'REGRESSION · 固定題庫，v1 vs v2',
      thName: '測試題', thBefore: 'v1', thAfter: 'v2', thVerdict: '判定',
      pass: '通過', fail: '不過',
      regRows: ['退貨政策', '保固條款', '會員權益', '運費規則', '營業時間'],
      regMsg: '5 題裡 3 題明顯退步，全和「出處」有關。如果上線前先跑這一套，v2 根本出不了門。現在先止血：',
      rollbackBtn: '回滾到 prompt v1',
      restoredLabel: '回滾完成',
      restoredMsg: '分數回到基準。這次的教訓收進題庫：把「必須附出處」做成一題回歸測試，下次改 prompt 就會先被它擋下來。',
      restart: '重來',
      hint: '這就是觀測的完整閉環：<b>logging</b> 留下每一步、<b>tracing</b> 讓你回放定位、<b>metrics</b> 讓下滑現形，回歸測試集擋住下一次。記住：AI 壞了不報錯，<b>改 prompt 也算部署</b>。',
    },
    en: {
      h3: 'Interactive: the quality-drop detective (one day after launch)',
      lede: 'Your AI support bot has been live for two weeks. The <b>sampled quality score</b> on the dashboard starts sliding on day 8, yet the system shows zero errors. Follow the observability trail: <b>replay the trace → run the regression set → roll back</b>.',
      board: 'DASHBOARD · sampled quality score (LLM-as-judge, daily average)',
      deployTag: 'prompt v2 shipped',
      baseline: 'baseline 90',
      clickHint: 'The score starts falling at D8, yet the error rate is 0. Click the start of the drop (or the button below) to open that day’s trace.',
      openBtn: 'Replay a D8 trace',
      traceLabel: 'TRACE REPLAY · D8 sample #4217',
      steps: [
        { k: 'INPUT', t: 'User input', x: '“How many days do I have to request a return?”' },
        { k: 'RETRIEVAL', t: 'Retrieval', x: 'Hit 3 policy passages, sources included, all fine' },
        { k: 'PROMPT', t: 'Prompt assembly (v2)', x: 'The v2 rewrite dropped the line “answers must cite their source”', tag: 'root cause' },
        { k: 'OUTPUT', t: 'Output', x: '“Within 7 days.” No source attached, so the judge docks points' },
      ],
      causeMsg: 'Found it: the model is fine, <b>prompt v2</b> lost the “cite your source” instruction. Every step was logged, so locating it took minutes. Next, confirm the blast radius:',
      runBtn: 'Run the regression set',
      regLabel: 'REGRESSION · fixed test set, v1 vs v2',
      thName: 'Test case', thBefore: 'v1', thAfter: 'v2', thVerdict: 'Verdict',
      pass: 'pass', fail: 'fail',
      regRows: ['Return policy', 'Warranty terms', 'Member benefits', 'Shipping rules', 'Store hours'],
      regMsg: '3 of 5 cases clearly regressed, all citation-related. Had this run before shipping, v2 would never have left the door. Now stop the bleeding:',
      rollbackBtn: 'Roll back to prompt v1',
      restoredLabel: 'Rollback complete',
      restoredMsg: 'The score is back at baseline. File the lesson into the test set: make “must cite sources” a regression case, and the next prompt edit gets caught by it first.',
      restart: 'Restart',
      hint: 'That is the full observability loop: <b>logging</b> keeps every step, <b>tracing</b> lets you replay and localize, <b>metrics</b> make the decline visible, and the regression set blocks the next one. Remember: a broken AI throws no error, and <b>a prompt edit counts as a deployment</b>.',
    },
    ja: {
      h3: 'インタラクティブ：品質低下の探偵（公開後のある日）',
      lede: 'あなたの AI サポートは公開から 2 週間。ダッシュボードの<b>抽出品質スコア</b>が 8 日目から下がり始めたのに、システムのエラーはゼロ。観測の手がかりをたどりましょう：<b>trace を再生 → 回帰テストを回す → ロールバック</b>。',
      board: 'DASHBOARD · 抽出品質スコア（LLM-as-judge、日次平均）',
      deployTag: 'prompt v2 リリース',
      baseline: '基準 90',
      clickHint: 'スコアは D8 から下がるのに、エラー率は 0。下落の起点（または下のボタン）を押して、その日の trace を開きます。',
      openBtn: 'D8 の trace を再生',
      traceLabel: 'TRACE 再生 · D8 サンプル #4217',
      steps: [
        { k: 'INPUT', t: 'ユーザー入力', x: '「返品は何日以内に申請すればいい？」' },
        { k: 'RETRIEVAL', t: '検索', x: '政策条文 3 件に命中、出典つき、正常' },
        { k: 'PROMPT', t: 'prompt 組み立て（v2）', x: 'v2 の書き直しで「回答には必ず出典を付ける」の行が消えた', tag: '原因' },
        { k: 'OUTPUT', t: '出力', x: '「7 日以内です。」出典がなく、審査役が減点' },
      ],
      causeMsg: '見つけました：モデルは無事で、<b>prompt v2</b> が「出典を付ける」指示を失っていました。各ステップに記録があるから、数分で特定できます。次は影響範囲の確認：',
      runBtn: '回帰テストセットを回す',
      regLabel: 'REGRESSION · 固定問題集、v1 vs v2',
      thName: 'テスト項目', thBefore: 'v1', thAfter: 'v2', thVerdict: '判定',
      pass: '合格', fail: '不合格',
      regRows: ['返品ポリシー', '保証条件', '会員特典', '送料ルール', '営業時間'],
      regMsg: '5 問中 3 問がはっきり退化、すべて「出典」がらみ。リリース前にこれを回していれば、v2 は外に出られませんでした。まずは止血：',
      rollbackBtn: 'prompt v1 にロールバック',
      restoredLabel: 'ロールバック完了',
      restoredMsg: 'スコアは基準に戻りました。教訓を問題集へ：「必ず出典を付ける」を回帰テストの 1 問にすれば、次の prompt 修正はまずそこで捕まります。',
      restart: 'やり直す',
      hint: 'これが観測の完全なループです：<b>logging</b> が各ステップを残し、<b>tracing</b> が再生と特定を可能にし、<b>metrics</b> が下落を見えるようにし、回帰テストセットが次を防ぎます。忘れずに：AI は壊れてもエラーを出さない、そして <b>prompt の修正もデプロイのうち</b>。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let stage = $state(0); // 0 儀表板 → 1 trace 回放 → 2 回歸測試 → 3 回滾完成

  // 圖表座標（viewBox 560×200）
  const X0 = 30, XW = 38;
  const x = (i) => X0 + i * XW;
  const y = (s) => 170 - (s - 60) * 3.5;

  let scores = $derived(stage >= 3 ? SCORES_FIX : SCORES_BAD);
  let ptsA = $derived(scores.slice(0, DROP + 1).map((s, i) => `${x(i)},${y(s)}`).join(' '));
  let ptsB = $derived(scores.slice(DROP).map((s, i) => `${x(DROP + i)},${y(s)}`).join(' '));

  let rows = $derived(ui.regRows.map((name, i) => ({ name, before: REG[i][0], after: REG[i][1], ok: REG[i][1] >= PASS_AT })));

  function openTrace() { if (stage === 0) stage = 1; }
  function runReg() { if (stage === 1) stage = 2; }
  function rollback() { if (stage === 2) stage = 3; }
  function restart() { stage = 0; }
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="mono k"><Activity size={13} /> {ui.board}</div>

    <div class="chartwrap">
      <svg viewBox="0 0 560 200" preserveAspectRatio="xMidYMid meet">
        <!-- 基準線 -->
        <line class="base" x1={X0} y1={y(90)} x2={x(13)} y2={y(90)} />
        <text class="lbl" x={x(13)} y={y(90) - 6} text-anchor="end">{ui.baseline}</text>

        <!-- 部署標記：prompt v2 上線那天 -->
        <line class="mark" x1={x(DROP)} y1="26" x2={x(DROP)} y2="178" />
        <text class="lbl mark-lbl" x={x(DROP)} y="18" text-anchor="middle">{ui.deployTag}</text>

        <!-- 品質曲線：前段正常（藍）、後段下滑（紅）或回滾後恢復（綠） -->
        <polyline class="lineA" points={ptsA} />
        <polyline class="lineB" class:fixed={stage >= 3} points={ptsB} />

        <!-- 下滑起點：stage 0 可點，打開那天的 trace -->
        <circle
          class="dot" class:pulse={stage === 0} class:fixed={stage >= 3}
          cx={x(DROP)} cy={y(scores[DROP])} r="7"
          onclick={openTrace}
        />

        <!-- X 軸刻度 -->
        <text class="lbl" x={x(0)} y="194" text-anchor="middle">D1</text>
        <text class="lbl" x={x(DROP)} y="194" text-anchor="middle">D8</text>
        <text class="lbl" x={x(13)} y="194" text-anchor="middle">D14</text>
      </svg>
    </div>

    {#if stage === 0}
      <div class="hophint">{ui.clickHint}</div>
    {/if}

    {#if stage >= 1}
      <div class="box" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
        <div class="mono k2"><FileSearch size={13} /> {ui.traceLabel}</div>
        <div class="steps">
          {#each ui.steps as s, i}
            <div class="step" class:bad={BAD_STEPS.includes(i)}
                 in:fly={{ y: 8, duration: dur(D.base), delay: i * 90, easing: ease }}>
              <span class="sk mono">{s.k}</span>
              <div class="sbody"><b>{s.t}</b><span class="sx">{s.x}</span></div>
              {#if s.tag}<span class="stag">{s.tag}</span>{/if}
            </div>
          {/each}
        </div>
        {#if stage === 1}
          <p class="msg" in:fade={{ duration: dur(D.fast), delay: 380 }}>{@html ui.causeMsg}</p>
        {/if}
      </div>
    {/if}

    {#if stage >= 2}
      <div class="box" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
        <div class="mono k2"><FlaskConical size={13} /> {ui.regLabel}</div>
        <div class="reg">
          <div class="rrow head mono">
            <span>{ui.thName}</span><span class="num">{ui.thBefore}</span><span class="num">{ui.thAfter}</span><span class="num">{ui.thVerdict}</span>
          </div>
          {#each rows as r, i}
            <div class="rrow" class:failrow={!r.ok}
                 in:fly={{ y: 6, duration: dur(D.base), delay: i * 70, easing: ease }}>
              <span>{r.name}</span>
              <span class="num mono">{r.before}</span>
              <span class="num mono">{r.after}</span>
              <span class="num"><i class="chip" class:bad={!r.ok}>{r.ok ? ui.pass : ui.fail}</i></span>
            </div>
          {/each}
        </div>
        {#if stage === 2}
          <p class="msg" in:fade={{ duration: dur(D.fast), delay: 380 }}>{@html ui.regMsg}</p>
        {/if}
      </div>
    {/if}

    {#if stage >= 3}
      <div class="answer" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
        <div class="mono k2">{ui.restoredLabel}</div>
        {@html ui.restoredMsg}
      </div>
    {/if}

    <div class="guide-actions">
      {#if stage === 0}<button class="btn primary" onclick={openTrace}><FileSearch size={14} /> {ui.openBtn}</button>{/if}
      {#if stage === 1}<button class="btn primary" onclick={runReg}><FlaskConical size={14} /> {ui.runBtn}</button>{/if}
      {#if stage === 2}<button class="btn primary" onclick={rollback}><Undo2 size={14} /> {ui.rollbackBtn}</button>{/if}
      {#if stage > 0}<button class="btn ghost" onclick={restart}>{ui.restart}</button>{/if}
    </div>
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .k { font-size: var(--fs-eyebrow); letter-spacing: .1em; color: var(--muted); display: flex; align-items: center; gap: 6px; margin-bottom: var(--sp-2); }
  .k2 { font-size: var(--fs-eyebrow); letter-spacing: .1em; color: var(--muted); display: flex; align-items: center; gap: 6px; margin-bottom: var(--sp-2); }

  .chartwrap { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 6px 8px; }
  .chartwrap svg { display: block; width: 100%; height: auto; }
  .lbl { font-family: var(--mono); font-size: 10px; fill: var(--muted); }
  .base { stroke: var(--line-2); stroke-width: 1; stroke-dasharray: 4 4; }
  .mark { stroke: var(--crit); stroke-width: 1; stroke-dasharray: 3 4; opacity: .6; }
  .mark-lbl { fill: var(--crit); }
  .lineA { fill: none; stroke: var(--accent); stroke-width: 2.5; stroke-linejoin: round; stroke-linecap: round; }
  .lineB { fill: none; stroke: var(--crit); stroke-width: 2.5; stroke-linejoin: round; stroke-linecap: round; transition: stroke .3s; }
  .lineB.fixed { stroke: var(--teal); }
  .dot { fill: var(--crit); stroke: var(--surface); stroke-width: 2; cursor: pointer; }
  .dot.fixed { fill: var(--teal); cursor: default; }
  .dot.pulse { animation: pulse 1.4s ease-in-out infinite; }
  @keyframes pulse { 0%, 100% { r: 7; opacity: 1; } 50% { r: 10; opacity: .55; } }

  .hophint { font-size: var(--fs-cap); color: var(--muted); margin-top: var(--sp-3); line-height: 1.6; }
  .box { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 12px 14px; margin-top: var(--sp-3); }

  .steps { display: flex; flex-direction: column; gap: var(--sp-2); }
  .step { display: flex; align-items: baseline; gap: var(--sp-2); border: 1px solid var(--line); border-radius: var(--r); padding: 8px 11px; background: var(--surface); font-size: var(--fs-sm); }
  .step.bad { border-color: var(--crit); background: color-mix(in srgb, var(--crit) 5%, var(--surface)); }
  .sk { flex: none; font-size: var(--fs-micro); letter-spacing: .08em; color: var(--muted); width: 76px; }
  .step.bad .sk { color: var(--crit); }
  .sbody { display: flex; flex-direction: column; gap: 2px; }
  .sbody b { color: var(--ink); }
  .sx { font-size: var(--fs-cap); color: var(--muted); line-height: 1.5; }
  .step.bad .sx { color: var(--ink-2); }
  .stag { margin-left: auto; flex: none; font-size: var(--fs-micro); color: var(--crit); border: 1px solid color-mix(in srgb, var(--crit) 45%, transparent); border-radius: 99px; padding: 1px 8px; }

  .reg { display: flex; flex-direction: column; }
  .rrow { display: grid; grid-template-columns: 1fr 56px 56px 72px; align-items: center; gap: 8px; padding: 7px 10px; border-bottom: 1px solid var(--line); font-size: var(--fs-sm); color: var(--ink-2); }
  .rrow:last-child { border-bottom: none; }
  .rrow.head { font-size: var(--fs-micro); letter-spacing: .08em; color: var(--muted); border-bottom: 1px solid var(--line-2); }
  .rrow.failrow { background: color-mix(in srgb, var(--crit) 5%, transparent); color: var(--ink); }
  .num { text-align: right; }
  .chip { font-style: normal; font-size: var(--fs-micro); color: var(--good); border: 1px solid color-mix(in srgb, var(--good) 45%, transparent); border-radius: 99px; padding: 1px 8px; }
  .chip.bad { color: var(--crit); border-color: color-mix(in srgb, var(--crit) 45%, transparent); }

  .msg { font-size: var(--fs-cap); color: var(--ink-2); line-height: 1.65; margin: var(--sp-2) 0 0; }
  .msg :global(b) { color: var(--crit); }

  .answer { border-radius: var(--r); padding: 12px 14px; font-size: var(--fs-body); line-height: 1.7; background: #0f8a800c; border: 1px solid #0f8a8055; color: var(--ink); margin-top: var(--sp-3); }
</style>
