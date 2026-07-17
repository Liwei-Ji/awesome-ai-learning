<script>
  /* Ch · AI 評估 Evaluation，兩段互動：
     ① A/B 盲測：同一題兩個答案，先選哪個好、再揭曉（含「新模型反而錯」的反例）。
     ② Benchmark：新 vs 舊模型跨任務對照，顯示「沒有全能冠軍」。
     教學重點：好壞有客觀標準；越新越大不一定每項都贏。亮色、離線。 */
  import { fade, fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  // 語言中性：每一題「哪個答案較好」的結構，以及 Benchmark 各任務分數。
  const ROUND_GOOD = [
    { a: true, b: false },
    { a: true, b: false },
    { a: true, b: false },
  ];
  const TASK_SCORES = [
    { neu: 88, old: 72 },
    { neu: 90, old: 86 },
    { neu: 79, old: 83 },
    { neu: 85, old: 70 },
    { neu: 58, old: 90 },
  ];

  const L = {
    zh: {
      rounds: [
        {
          q: '台灣最高的山是哪一座？',
          a: { text: '玉山，海拔約 3,952 公尺。', model: '較小的舊模型' },
          b: { text: '應該是阿里山吧？海拔大概四千多公尺。', model: '較大的新模型' },
          why: 'A 正確又明確；B 不但答錯（是玉山不是阿里山），還「不太確定」卻講得像真的，這就是<b>幻覺</b>。',
          lesson: '更大更新的模型，這題反而錯了：<b>不能只看是不是最新款</b>。',
        },
        {
          q: '「這款耳機防水嗎？」，依據沒有防水資訊的產品手冊回答。',
          a: { text: '手冊沒有提到防水規格，建議向客服確認，以免進水損壞。', model: '模型甲' },
          b: { text: '有的，本款支援 IPX7 防水，可以戴著游泳。', model: '模型乙' },
          why: 'A 誠實說「資料沒有」；B 直接<b>編出一個規格（IPX7）</b>，聽起來超專業，其實是幻覺，還可能害人弄壞產品。',
          lesson: '「敢承認不知道」有時比「講得很專業」更好。',
        },
        {
          q: '把「我明天想請一天假」翻成自然的英文。',
          a: { text: 'I would like to take a day off tomorrow.', model: '模型甲' },
          b: { text: 'I want ask a vacation in my tomorrow.', model: '模型乙' },
          why: 'A 文法自然、語氣得體；B 文法錯誤、讀起來卡。翻譯要看<b>正確與自然度</b>。',
          lesson: '好壞有客觀標準：正確、通順、切題。',
        },
      ],
      tasks: ['數學推理', '常識問答', '創意寫作', '程式撰寫', '回應速度'],
      h3_1: '互動：當一次 AI 評審（A/B 盲測）',
      lede1: '要判斷 AI 好不好，最常用的方法是<b>比較</b>。同一個問題、兩個答案，你先選哪個好，再揭曉，順便看看：<b>更新更大的模型，是不是每題都比較強？</b>',
      qcount: '第 {n} / {total} 題',
      answerLabel: '答案 {x}',
      verdictGood: '✓ 較好', verdictBad: '✗ 有問題',
      from: '來自：',
      waiting: '👆 點你覺得比較好的答案',
      resultRight: '✓ 你選對了！', resultWrong: '✗ 這次看走眼，',
      next: '下一題 →',
      hint1: '判斷好壞不是「感覺」，而是看幾個標準：<b>正確、完整、切題、有沒有幻覺</b>。 這也是為什麼 AI 公司要用「一整套題目」來系統化比較，那就是下面的 Benchmark。',
      h3_2: 'Benchmark：新模型一定比較強嗎？',
      lede2: '<b>Benchmark（基準測驗）</b>＝用一整套標準題目替模型打分，讓不同模型能公平比較。 看看「新模型」和「舊模型」的成績單：',
      legendNew: '新模型', legendOld: '舊模型',
      hint2: '看到了嗎？新模型在<b>數學、常識、程式</b>更強，但<b>創意寫作</b>輸、<b>回應速度</b>更是大輸，<b>沒有「全能冠軍」</b>。挑模型要看<b>你的任務</b>，而不是「哪個最新」。這就是評估的意義。',
    },
    en: {
      rounds: [
        {
          q: 'What is the tallest mountain in Taiwan?',
          a: { text: 'Yushan (Jade Mountain), about 3,952 meters.', model: 'The smaller, older model' },
          b: { text: 'Probably Alishan? Somewhere around four thousand-something meters.', model: 'The larger, newer model' },
          why: 'A is correct and precise; B not only gets it wrong (it’s Yushan, not Alishan) but sounds “unsure” while stating it like fact, that’s a <b>hallucination</b>.',
          lesson: 'The bigger, newer model actually got this one wrong: <b>don’t just go by which is newest</b>.',
        },
        {
          q: '“Are these earbuds waterproof?”, answer based on a product manual that says nothing about waterproofing.',
          a: { text: 'The manual doesn’t mention a waterproof rating; I’d check with support to avoid water damage.', model: 'Model A' },
          b: { text: 'Yes, this model has IPX7 waterproofing, so you can swim with them on.', model: 'Model B' },
          why: 'A honestly says “the info isn’t there”; B just <b>invents a spec (IPX7)</b>, it sounds super professional, but it’s a hallucination that could get someone’s product ruined.',
          lesson: 'Being willing to admit “I don’t know” is sometimes better than “sounding very professional.”',
        },
        {
          q: 'Translate “我明天想請一天假” into natural English.',
          a: { text: 'I would like to take a day off tomorrow.', model: 'Model A' },
          b: { text: 'I want ask a vacation in my tomorrow.', model: 'Model B' },
          why: 'A is grammatical and polite; B has grammar errors and reads awkwardly. Translation is judged on <b>correctness and naturalness</b>.',
          lesson: 'Good vs. bad has objective standards: correct, fluent, on-topic.',
        },
      ],
      tasks: ['Math reasoning', 'Commonsense Q&A', 'Creative writing', 'Coding', 'Response speed'],
      h3_1: 'Interactive: be an AI judge for a round (blind A/B test)',
      lede1: 'The most common way to judge whether an AI is good is to <b>compare</b>. Same question, two answers, you pick the better one first, then it’s revealed. And along the way: <b>is a newer, bigger model really stronger on every question?</b>',
      qcount: 'Question {n} of {total}',
      answerLabel: 'Answer {x}',
      verdictGood: '✓ Better', verdictBad: '✗ Has problems',
      from: 'From: ',
      waiting: '👆 Tap the answer you think is better',
      resultRight: '✓ You got it right!', resultWrong: '✗ Missed it this time, ',
      next: 'Next question →',
      hint1: 'Judging good from bad isn’t about “gut feel”, it’s about a few standards: <b>correctness, completeness, relevance, and whether it hallucinates</b>. That’s why AI companies use “a whole set of questions” to compare systematically, which is exactly the Benchmark below.',
      h3_2: 'Benchmark: is a newer model always stronger?',
      lede2: '<b>A benchmark</b> = scoring models on a whole set of standard questions so different models can be compared fairly. Take a look at the report cards for the “new model” and the “old model”:',
      legendNew: 'New model', legendOld: 'Old model',
      hint2: 'See it? The new model is stronger on <b>math, commonsense, and coding</b>, but loses on <b>creative writing</b>, and loses badly on <b>response speed</b>. There’s <b>no “all-around champion.”</b> Pick a model by <b>your task</b>, not by “which is newest.” That’s the point of evaluation.',
    },
    ja: {
      rounds: [
        {
          q: '台湾でいちばん高い山は？',
          a: { text: '玉山（ぎょくざん）、標高およそ 3,952 メートル。', model: '小さくて古いモデル' },
          b: { text: '阿里山かな？標高は四千メートルちょっとくらい。', model: '大きくて新しいモデル' },
          why: 'A は正確で明確。B は間違っている（玉山であって阿里山ではない）うえに、「自信なさげ」なのに事実のように言い切っている、これが<b>ハルシネーション</b>です。',
          lesson: '大きくて新しいモデルが、この問題ではむしろ間違えました：<b>「最新かどうか」だけで選んではいけません</b>。',
        },
        {
          q: '「このイヤホンは防水ですか？」，防水について何も書かれていない製品マニュアルにもとづいて答える。',
          a: { text: 'マニュアルに防水の記載はありません。水濡れによる故障を避けるため、サポートに確認することをおすすめします。', model: 'モデル甲' },
          b: { text: 'はい、本機は IPX7 防水対応なので、着けたまま泳げます。', model: 'モデル乙' },
          why: 'A は正直に「情報がない」と答えます。B は<b>スペック（IPX7）をでっち上げて</b>います、すごく専門的に聞こえますが、これはハルシネーションで、製品を壊してしまう恐れもあります。',
          lesson: '「知らないと認められる」ほうが、「専門的に聞こえる」よりも良いことがあります。',
        },
        {
          q: '「明日、一日休みを取りたい」を自然な英語に訳す。',
          a: { text: 'I would like to take a day off tomorrow.', model: 'モデル甲' },
          b: { text: 'I want ask a vacation in my tomorrow.', model: 'モデル乙' },
          why: 'A は文法的に正しく、丁寧で自然。B は文法が誤っていて読みづらい。翻訳は<b>正確さと自然さ</b>で評価します。',
          lesson: '良し悪しには客観的な基準がある：正確・流暢・的確。',
        },
      ],
      tasks: ['数学的推論', '常識問題', '創作ライティング', 'プログラミング', '応答速度'],
      h3_1: 'インタラクティブ：AI 審査員になってみよう（A/B ブラインドテスト）',
      lede1: 'AI の良し悪しを判断するいちばん一般的な方法は<b>比較</b>です。同じ質問に対する 2 つの答え、まず良いほうを選び、それから正解が明かされます。ついでに確かめてみましょう：<b>新しくて大きいモデルは、本当にどの問題でも強いのでしょうか？</b>',
      qcount: '{n} / {total} 問目',
      answerLabel: '答え {x}',
      verdictGood: '✓ 良い', verdictBad: '✗ 問題あり',
      from: '出典：',
      waiting: '👆 良いと思うほうの答えをタップ',
      resultRight: '✓ 正解！', resultWrong: '✗ 今回は見誤り、',
      next: '次の問題 →',
      hint1: '良し悪しの判断は「なんとなく」ではなく、いくつかの基準で決まります：<b>正確性・網羅性・的確さ・ハルシネーションの有無</b>。だからこそ AI 企業は「問題のセットまるごと」を使って体系的に比較します、それが下の Benchmark です。',
      h3_2: 'Benchmark：新しいモデルはいつでも強い？',
      lede2: '<b>ベンチマーク（基準テスト）</b>＝標準化された問題のセットでモデルを採点し、異なるモデルを公平に比較できるようにする仕組みです。「新しいモデル」と「古いモデル」の成績表を見てみましょう：',
      legendNew: '新しいモデル', legendOld: '古いモデル',
      hint2: '分かりますか？新しいモデルは<b>数学・常識・プログラミング</b>で強い一方、<b>創作ライティング</b>では負け、<b>応答速度</b>では大きく負けています。<b>「万能チャンピオン」は存在しません。</b>モデルは「どれが最新か」ではなく、<b>あなたのタスク</b>で選ぶこと。それが評価の意味です。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  const ROUNDS = $derived(ui.rounds.map((rd, i) => ({
    q: rd.q,
    a: { text: rd.a.text, model: rd.a.model, good: ROUND_GOOD[i].a },
    b: { text: rd.b.text, model: rd.b.model, good: ROUND_GOOD[i].b },
    why: rd.why,
    lesson: rd.lesson,
  })));
  const TASKS = $derived(ui.tasks.map((t, i) => ({ t, neu: TASK_SCORES[i].neu, old: TASK_SCORES[i].old })));

  let round = $state(0);
  let picked = $state(null);   // 'a' | 'b' | null
  let r = $derived(ROUNDS[round]);
  let correctKey = $derived(r.a.good ? 'a' : 'b');

  function pick(k) { if (!picked) picked = k; }
  function next() { round = (round + 1) % ROUNDS.length; picked = null; }
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3_1}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede1}</p>

  <div class="demo-stage light">
    <div class="qbar"><span class="fieldk">{ui.qcount.replace('{n}', round + 1).replace('{total}', ROUNDS.length)}</span><div class="q">{r.q}</div></div>

    <div class="ab">
      {#each ['a', 'b'] as k}
        {@const ans = r[k]}
        <button class="ans" class:picked={picked === k}
          class:good={picked && ans.good} class:bad={picked && !ans.good}
          disabled={!!picked} onclick={() => pick(k)}>
          <div class="al mono">{ui.answerLabel.replace('{x}', k.toUpperCase())}</div>
          <div class="atext">{ans.text}</div>
          {#if picked}
            <div class="ameta" in:fade={{ duration: dur(D.fast) }}>
              <span class="verdict">{ans.good ? ui.verdictGood : ui.verdictBad}</span>
              <span class="model">{ui.from}{ans.model}</span>
            </div>
          {/if}
        </button>
      {/each}
    </div>

    {#if !picked}
      <div class="waiting">{ui.waiting}</div>
    {:else}
      {#key round}
        <div class="reveal" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
          <p class="yr">{picked === correctKey ? ui.resultRight : ui.resultWrong}</p>
          <p class="why">{@html r.why}</p>
          <p class="lesson">💡 {@html r.lesson}</p>
          <button class="btn primary" onclick={next}>{ui.next}</button>
        </div>
      {/key}
    {/if}
  </div>

  <p class="hint">{@html ui.hint1}</p>
</div>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3_2}</h3><span class="eyebrow">Interactive</span></div>
  <p class="lede">{@html ui.lede2}</p>

  <div class="demo-stage light">
    <div class="legend">
      <span class="lg"><i class="sw new"></i>{ui.legendNew}</span>
      <span class="lg"><i class="sw old"></i>{ui.legendOld}</span>
    </div>
    {#each TASKS as t}
      <div class="brow">
        <span class="bt">{t.t}</span>
        <div class="bars">
          <div class="track"><div class="fill new" class:win={t.neu >= t.old} style="width:{t.neu}%"></div><span class="bv">{t.neu}</span></div>
          <div class="track"><div class="fill old" class:win={t.old > t.neu} style="width:{t.old}%"></div><span class="bv">{t.old}</span></div>
        </div>
      </div>
    {/each}
  </div>

  <p class="hint">{@html ui.hint2}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-4); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }

  .qbar { margin-bottom: var(--sp-3); }
  .q { font-size: var(--fs-lg); font-weight: 600; letter-spacing: var(--ls-tight); margin-top: 4px; }

  .ab { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .ab { grid-template-columns: 1fr; } }
  .ans {
    text-align: left; padding: 14px 16px; border: 1.5px solid var(--line-2); border-radius: var(--r);
    background: var(--surface); cursor: pointer; transition: border-color .15s, box-shadow .15s, background .15s;
  }
  .ans:hover:not(:disabled) { border-color: var(--accent); box-shadow: 0 2px 10px rgba(20,30,55,.08); }
  .ans:disabled { cursor: default; }
  .ans.good { border-color: var(--good); background: color-mix(in srgb, var(--good) 7%, var(--surface)); }
  .ans.bad { border-color: var(--crit); background: color-mix(in srgb, var(--crit) 6%, var(--surface)); }
  .al { font-size: var(--fs-micro); color: var(--muted); letter-spacing: .1em; }
  .atext { font-size: var(--fs-body); color: var(--ink); line-height: var(--lh-snug); margin-top: 6px; }
  .ameta { display: flex; align-items: center; gap: 12px; margin-top: 10px; font-size: var(--fs-cap); }
  .ans.good .verdict { color: var(--good); font-weight: 600; }
  .ans.bad .verdict { color: var(--crit); font-weight: 600; }
  .ameta .model { color: var(--muted); }

  .waiting { margin-top: var(--sp-3); }
  .reveal { margin-top: var(--sp-4); background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 14px 16px; }
  .yr { font-size: var(--fs-body); font-weight: 650; margin: 0 0 6px; }
  .why { font-size: var(--fs-sm); color: var(--ink-2); line-height: var(--lh-snug); margin: 0 0 6px; }
  .why :global(b) { color: var(--crit); }
  .lesson { font-size: var(--fs-sm); color: var(--ink-2); line-height: var(--lh-snug); margin: 0 0 12px; }
  .lesson :global(b) { color: var(--accent-ink); }

  .legend { display: flex; gap: 16px; margin-bottom: var(--sp-3); font-size: var(--fs-cap); color: var(--muted); }
  .legend .sw { display: inline-block; width: 11px; height: 11px; border-radius: 3px; margin-right: 5px; vertical-align: -1px; }
  .sw.new { background: var(--accent); }
  .sw.old { background: var(--teal); }
  .brow { display: grid; grid-template-columns: 76px 1fr; align-items: center; gap: 12px; margin: 9px 0; }
  .bt { font-size: var(--fs-sm); color: var(--ink-2); }
  .bars { display: flex; flex-direction: column; gap: 5px; }
  .track { position: relative; height: 16px; background: var(--surface-3); border-radius: 5px; }
  .fill { height: 100%; border-radius: 5px; opacity: .5; transition: width .5s cubic-bezier(.2,.7,.2,1); }
  .fill.new { background: var(--accent); }
  .fill.old { background: var(--teal); }
  .fill.win { opacity: 1; }
  .bv { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); font-family: var(--mono); font-size: var(--fs-micro); color: var(--ink); }
</style>
