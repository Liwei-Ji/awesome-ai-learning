<script>
  /* Ch · 影像分類 —— 引導式互動（多語）：親手走一遍 資料→模型→預測→決策。
     動物 emoji 與各類別信心（DIST）跨語言共用；顯示字串依 i18n.locale。 */
  import { fade, fly, scale } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';
  import Stepper from '../components/Stepper.svelte';
  import Bars from '../components/Bars.svelte';

  const EMOJI = ['🐱', '🐶', '🐦', '🐘'];
  const SAY_ICON = ['🖼️', '🧠', '📊', '✅'];
  const DIST = {
    '🐱': [['Cat', 95], ['Dog', 3], ['Fox', 2]],
    '🐶': [['Dog', 92], ['Wolf', 5], ['Cat', 3]],
    '🐦': [['Bird', 90], ['Butterfly', 7], ['Plane', 3]],
    '🐘': [['Elephant', 97], ['Rhino', 2], ['Hippo', 1]],
  };

  const L = {
    zh: {
      h3: '互動：把圖片丟給 AI',
      lede: '選一張圖片，再按「<b>▶ 下一步</b>」，親手帶 AI 走完 <span class="mono">資料 → 模型 → 預測 → 決策</span>。AI 不是「知道」答案，而是<b>一步步算出</b>來的。',
      flow: ['資料', '模型', '預測', '決策'], names: ['貓', '狗', '鳥', '大象'], sep: '：',
      pick: '① 選一張圖片', doing: '② AI 現在正在做什麼',
      say: ['接收這張影像的像素，轉成一長串數字餵給模型。', '套用從大量例子學到的規則，一層層抽取特徵。', '算出每個類別的信心分數（合計約 100%）。', '選出信心最高的那一個，當作最終答案。'],
      verdict: 'AI 判斷：<b class="mono accent">{c} {p}%</b>。它挑出信心最高的類別當答案——這就是<b>「分類」</b>。',
      waiting: '尚未走到「決策」——先按下方「▶ 下一步」，看 AI 一步步算出信心分數。',
      next: '▶ 下一步', done: '✓ 完成', restart: '重來',
      hint: '每個 AI 應用背後都是這條流水線：<b>資料</b>進來、<b>模型</b>套用學到的規則、<b>預測</b>出各類別的信心、最後<b>決策</b>選出答案。信心是<b>機率</b>，不是絕對——所以 AI 也會答錯。',
      cmpH3: '人類 vs. AI：同一種學習', human: '人類',
      humanRows: ['眼睛看到', '大腦理解', '累積經驗', '做決定'], aiRows: ['資料', '模型', '預測', '決策'],
    },
    en: {
      h3: 'Interactive: hand an image to the AI',
      lede: 'Pick an image, then press “<b>▶ Next</b>” to walk the AI through <span class="mono">data → model → prediction → decision</span>. AI doesn’t “know” the answer—it <b>computes it step by step</b>.',
      flow: ['Data', 'Model', 'Prediction', 'Decision'], names: ['Cat', 'Dog', 'Bird', 'Elephant'], sep: ' — ',
      pick: '① Pick an image', doing: '② What the AI is doing now',
      say: ['Take in this image’s pixels and turn them into a long list of numbers for the model.', 'Apply the rules learned from many examples, extracting features layer by layer.', 'Compute a confidence score for each class (summing to about 100%).', 'Pick the highest-confidence one as the final answer.'],
      verdict: 'AI’s call: <b class="mono accent">{c} {p}%</b>. It picks the highest-confidence class as the answer—that’s <b>“classification.”</b>',
      waiting: 'Not at “Decision” yet—press “▶ Next” below to watch the AI compute confidence step by step.',
      next: '▶ Next', done: '✓ Done', restart: 'Restart',
      hint: 'Every AI app is this pipeline: <b>data</b> comes in, the <b>model</b> applies learned rules, it <b>predicts</b> each class’s confidence, and finally <b>decides</b> on an answer. Confidence is a <b>probability</b>, not certainty—so AI can be wrong.',
      cmpH3: 'Human vs. AI: the same kind of learning', human: 'Human',
      humanRows: ['Eyes see', 'Brain understands', 'Experience builds up', 'Make a decision'], aiRows: ['Data', 'Model', 'Prediction', 'Decision'],
    },
    ja: {
      h3: 'インタラクティブ：画像を AI に渡す',
      lede: '画像を選び、「<b>▶ 次へ</b>」を押して AI に <span class="mono">データ → モデル → 予測 → 判断</span> をたどらせましょう。AI は答えを「知っている」のではなく、<b>一歩ずつ計算</b>しています。',
      flow: ['データ', 'モデル', '予測', '判断'], names: ['猫', '犬', '鳥', 'ゾウ'], sep: '：',
      pick: '① 画像を選ぶ', doing: '② いま AI がしていること',
      say: ['この画像のピクセルを受け取り、長い数字の並びに変えてモデルに渡す。', '大量の例から学んだ規則を当てはめ、層ごとに特徴を抽出する。', '各クラスの確信度を計算する（合計およそ 100%）。', '最も確信度の高いものを最終的な答えに選ぶ。'],
      verdict: 'AI の判断：<b class="mono accent">{c} {p}%</b>。最も確信度の高いクラスを答えに選ぶ——これが<b>「分類」</b>です。',
      waiting: 'まだ「判断」まで来ていません——下の「▶ 次へ」を押して、AI が一歩ずつ確信度を計算する様子を見てみましょう。',
      next: '▶ 次へ', done: '✓ 完了', restart: 'やり直す',
      hint: 'どの AI アプリもこの流れ：<b>データ</b>が入り、<b>モデル</b>が学んだ規則を当てはめ、各クラスの<b>確信度を予測</b>し、最後に答えを<b>判断</b>する。確信度は<b>確率</b>であって絶対ではない——だから AI も間違える。',
      cmpH3: '人間 vs. AI：同じ学び方', human: '人間',
      humanRows: ['目で見る', '脳で理解', '経験を積む', '判断する'], aiRows: ['データ', 'モデル', '予測', '判断'],
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let current = $state('🐱');
  let stage = $state(0);

  let atEnd = $derived(stage === 3);
  let dist = $derived(DIST[current]);
  let rows = $derived(dist.map((d, i) => ({ nm: d[0], val: d[1], win: i === 0 })));

  function pick(emo) { current = emo; stage = 0; }
  function next() { if (!atEnd) stage += 1; }
  function restart() { stage = 0; }
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <Stepper steps={ui.flow} current={stage} />

    <div class="qrow">
      <span class="fieldk">{ui.pick}</span>
      <div class="pl-row">
        {#each EMOJI as emo, i}
          <button class="pl" class:on={current === emo} onclick={() => pick(emo)}>
            <span class="emo">{emo}</span>{ui.names[i]}
          </button>
        {/each}
      </div>
    </div>

    <div class="stageview">
      <span class="fieldk">{ui.doing}</span>
      {#key current}
        <div class="hero" in:scale={{ start: 0.6, duration: dur(D.base), easing: ease }}>{current}</div>
      {/key}
      <div class="doing">
        <span class="dicon">{SAY_ICON[stage]}</span>
        <div class="dtext"><b>{ui.flow[stage]}</b>{ui.sep}{ui.say[stage]}</div>
      </div>

      {#if atEnd}
        <div class="result" in:fade={{ duration: dur(D.base) }}>
          {#key current}
            <Bars {rows} />
          {/key}
          <p class="hint">{@html ui.verdict.replace('{c}', dist[0][0]).replace('{p}', dist[0][1])}</p>
        </div>
      {:else}
        <div class="waiting">{ui.waiting}</div>
      {/if}
    </div>

    <div class="guide-actions">
      <button class="btn primary" disabled={atEnd} onclick={next}>{atEnd ? ui.done : ui.next}</button>
      {#if stage > 0}<button class="btn ghost" onclick={restart}>{ui.restart}</button>{/if}
    </div>
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<div class="panel">
  <div class="panel-h"><h3>{ui.cmpH3}</h3><span class="eyebrow">Concept</span></div>
  <div class="compare">
    <div>
      <div class="eyebrow col-h">{ui.human}</div>
      {#each ui.humanRows as x}<div class="crow">{x}</div>{/each}
    </div>
    <div>
      <div class="eyebrow col-h ai">AI</div>
      {#each ui.aiRows as x}<div class="crow mono ai-row">{x}</div>{/each}
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
