<script>
  /* Ch · 推理模型。核心互動：拉動「思考預算 test-time compute」，看正確率↑、延遲↑、成本↑。
     難題：正確率隨預算明顯上升（值得）；簡單題：正確率一開始就滿（長考浪費）。亮色舞台。多語。 */
  import { fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const L = {
    zh: {
      h3: '互動：想越久，越準，但也越貴',
      lede: '推理模型的本質是一個取捨：<b>多花算力想久一點</b>，換難題的正確率。拉動預算，看正確率、延遲、成本怎麼一起變。',
      easy: '簡單題', hard: '難題',
      budget: '思考預算（test-time compute）', low: '想一下就答', high: '長考',
      think: '思考', answer: '答案', noThink: '幾乎不想，直接作答',
      mAcc: '正確率', mLat: '延遲', mCost: '成本',
      hintHard: '難題：想越久，正確率越爬得上去，這時候多花的算力才值得。',
      hintEasy: '簡單題：正確率一開始就滿了，長考只是白白多花延遲與成本。',
    },
    en: {
      h3: 'Interactive: think longer, more accurate, but pricier',
      lede: 'A reasoning model is a trade-off: <b>spend more compute to think longer</b>, buying accuracy on hard problems. Drag the budget and watch accuracy, latency, and cost move together.',
      easy: 'Easy', hard: 'Hard',
      budget: 'Thinking budget (test-time compute)', low: 'answer fast', high: 'think long',
      think: 'thinking', answer: 'answer', noThink: 'barely thinks, answers right away',
      mAcc: 'Accuracy', mLat: 'Latency', mCost: 'Cost',
      hintHard: 'Hard problem: the longer it thinks, the higher accuracy climbs, so the extra compute is worth it.',
      hintEasy: 'Easy problem: accuracy is maxed from the start, so long thinking just burns extra latency and cost.',
    },
    ja: {
      h3: 'インタラクティブ：長く考えるほど正確、でも高くつく',
      lede: '推論モデルの本質はトレードオフです：<b>計算を多く使って長く考え</b>、難問の正確さを買う。予算を動かして、正確率・遅延・コストが一緒に動くのを見てみましょう。',
      easy: '易しい', hard: '難しい',
      budget: '思考予算（test-time compute）', low: 'すぐ答える', high: '長く考える',
      think: '思考', answer: '答え', noThink: 'ほとんど考えず、すぐ答える',
      mAcc: '正確率', mLat: '遅延', mCost: 'コスト',
      hintHard: '難問：長く考えるほど正確率が上がり、その追加計算に見合う。',
      hintEasy: '易しい問題：正確率は最初から満点、長考は遅延とコストを無駄に増やすだけ。',
    },
  };
  let ui = $derived(L[i18n.locale] || L.zh);

  let difficulty = $state('hard');
  let budget = $state(35);

  let acc = $derived(Math.round(difficulty === 'hard' ? 40 + budget * 0.55 : 88 + budget * 0.05));
  let lat = $derived(+(1 + budget * 0.06).toFixed(1));
  let cost = $derived(+(1 + budget * 0.08).toFixed(1));
  let steps = $derived(Math.round(budget / 22));
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="diff">
    <button class="d" class:on={difficulty === 'easy'} onclick={() => (difficulty = 'easy')}>{ui.easy}</button>
    <button class="d" class:on={difficulty === 'hard'} onclick={() => (difficulty = 'hard')}>{ui.hard}</button>
  </div>

  <div class="demo-stage light">
    <div class="think">
      {#if steps === 0}
        <div class="none">{ui.noThink}</div>
      {:else}
        {#each Array(steps) as _, i (i)}
          <div class="trow" in:fly={{ y: 6, duration: dur(D.base), easing: ease }}>
            <span class="tdot"></span>{ui.think} {i + 1}
          </div>
        {/each}
      {/if}
      <div class="ans">{ui.answer}</div>
    </div>
  </div>

  <div class="ctl">
    <div class="lab"><span>{ui.budget}</span><b>{budget}</b></div>
    <input type="range" min="0" max="100" step="5" bind:value={budget} />
    <div class="scale"><span>{ui.low}</span><span>{ui.high}</span></div>
  </div>

  <div class="metrics">
    <div class="m"><span class="k">{ui.mAcc}</span><div class="track"><div class="fill acc" style="width:{acc}%"></div></div><span class="v">{acc}%</span></div>
    <div class="m"><span class="k">{ui.mLat}</span><div class="track"><div class="fill lat" style="width:{Math.min(100, lat / 8 * 100)}%"></div></div><span class="v">{lat}×</span></div>
    <div class="m"><span class="k">{ui.mCost}</span><div class="track"><div class="fill cost" style="width:{Math.min(100, cost / 10 * 100)}%"></div></div><span class="v">{cost}×</span></div>
  </div>

  {#key difficulty}
    <p class="hint" in:fly={{ y: 6, duration: dur(D.base), easing: ease }}>{difficulty === 'hard' ? ui.hintHard : ui.hintEasy}</p>
  {/key}
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .lede :global(b) { color: var(--ink); }

  .diff { display: flex; gap: 8px; margin-bottom: 12px; }
  .d { flex: 1; border: 1px solid var(--line); background: var(--surface); color: var(--ink-2); font-family: inherit; font-size: var(--fs-sm); font-weight: 600; padding: 9px 10px; border-radius: var(--r-sm); cursor: pointer; transition: .15s; }
  .d:hover { border-color: var(--accent); }
  .d.on { border-color: var(--accent); background: var(--accent); color: #3a1e00; }

  .think { display: flex; flex-direction: column; gap: 6px; align-items: flex-start; min-height: 88px; justify-content: center; }
  .trow { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: var(--fs-sm); color: var(--ink-2); background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-sm); padding: 6px 12px; }
  .tdot { width: 7px; height: 7px; border-radius: 50%; background: var(--teal); flex: none; }
  .none { font-size: var(--fs-sm); color: var(--muted); font-style: italic; }
  .ans { margin-top: 4px; font-weight: 700; font-size: var(--fs-lg); color: var(--ink); background: var(--accent-soft); padding: 6px 16px; border-radius: var(--r-sm); }

  .ctl { margin-top: 16px; }
  .ctl .lab { display: flex; justify-content: space-between; font-size: var(--fs-sm); color: var(--ink-2); margin-bottom: 6px; }
  .ctl .lab b { font-family: var(--mono); color: var(--accent-ink); }
  .ctl input { width: 100%; accent-color: var(--accent); }
  .scale { display: flex; justify-content: space-between; font-size: var(--fs-micro); color: var(--muted); margin-top: 4px; }

  .metrics { display: grid; gap: 9px; margin-top: 16px; }
  .m { display: grid; grid-template-columns: 5em 1fr 3.2em; align-items: center; gap: 10px; }
  .m .k { font-size: var(--fs-sm); color: var(--ink-2); }
  .m .track { height: 12px; background: var(--surface-2); border: 1px solid var(--line); border-radius: 100px; overflow: hidden; }
  .m .fill { height: 100%; border-radius: 100px; transition: width .25s ease; }
  .m .fill.acc { background: var(--teal); }
  .m .fill.lat { background: var(--accent); }
  .m .fill.cost { background: var(--crit); }
  .m .v { font-family: var(--mono); font-size: var(--fs-sm); color: var(--ink); text-align: right; }

  .hint { font-size: var(--fs-sm); color: var(--muted); line-height: var(--lh-body); margin: var(--sp-3) 0 0; }
</style>
