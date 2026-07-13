<script>
  /* Ch · 資料：AI 的養分。資料集、標註、品質、偏誤。
     模式一「自己當標註員」：點卡片改標註，標錯越多、模型準確率越掉（垃圾進垃圾出）。
     模式二「資料偏誤」：訓練的貓全是橘貓，遇到黑貓就失準，示範 Bias。
     深色舞台、確定性、離線。 */
  import { clamp } from '../lib/helpers.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const TRAIN = [
    { emoji: '🐱', truth: '貓' },
    { emoji: '🐈‍⬛', truth: '貓' },
    { emoji: '🐈', truth: '貓' },
    { emoji: '🐕', truth: '狗' },
    { emoji: '🐩', truth: '狗' },
    { emoji: '🦮', truth: '狗' },
  ];
  const BIAS = [
    { emoji: '🐱', truth: '貓' }, { emoji: '🐱', truth: '貓' },
    { emoji: '🐱', truth: '貓' }, { emoji: '🐱', truth: '貓' },
    { emoji: '🐕', truth: '狗' }, { emoji: '🐕', truth: '狗' },
  ];

  const L = {
    zh: {
      h3: '互動：你就是 AI 的老師',
      lede: 'AI 的能力天花板，是<b>資料</b>決定的。每張卡片下的「貓／狗」就是<b>標註（Label）</b>——人給的正確答案。試著故意標錯，看模型準確率怎麼崩；或看看<b>資料偏誤</b>如何讓它出糗。',
      tabLabel: '🏷️ 自己當標註員', tabBias: '⚖️ 資料偏誤示範',
      trainHint: '訓練資料（點「標註」可以改，試著標錯看看）',
      trainNames: ['橘貓', '黑貓', '花貓', '柴犬', '貴賓', '拉布拉多'],
      cat: '貓', dog: '狗',
      accK: '訓練後 · 測驗準確率', testK: '拿一張新照片測驗',
      modelSays: '模型判斷：', pred: '{c}（{p}%）',
      testRight: '✓ 答對了，這確實是貓', testWrong: '✗ 答錯了——被標錯的資料教壞了',
      verdictOk: '標註全對、貓狗均衡 → 模型又準又可靠。',
      verdictBad: '你標錯了 {n} 筆 → 垃圾進、垃圾出（garbage in, garbage out），準確率直接掉。',
      resetBtn: '把標註改回正確',
      biasTrainHint: '訓練資料（貓的樣本全是「橘貓」，缺乏多樣性）',
      biasNames: ['橘貓', '橘貓', '橘貓', '橘貓', '柴犬', '柴犬'],
      biasNote: '⚠️ 標註都對，但<b>貓只看過橘貓</b>——資料不均。',
      biasAccK: '在多樣測驗集上', biasTestK: '拿一隻「黑貓」測驗', biasPred: '狗（41%）',
      biasTestNote: '✗ 沒看過黑貓，就把牠當成狗——這叫<b>資料偏誤 Bias</b>',
      biasVerdict: '資料偏了，模型就跟著偏：它學到的其實是「橘色＝貓」，而不是「貓＝貓」。',
      hint: '所以 <b>資料就是 AI 的養分</b>：<b>標註</b>是人給的正確答案、<b>品質</b>決定它學得對不對、<b>均衡</b>決定它公不公平。模型再聰明，也學不出資料裡沒有的東西——這也是為什麼「洗資料」往往比調模型還重要。',
    },
    en: {
      h3: 'Interactive: you are the AI’s teacher',
      lede: 'An AI’s ceiling is set by its <b>data</b>. The “cat / dog” under each card is its <b>label</b>—the correct answer a human provides. Try mislabeling one on purpose and watch the model’s accuracy collapse; or see how <b>data bias</b> trips it up.',
      tabLabel: '🏷️ Be the labeler', tabBias: '⚖️ Data-bias demo',
      trainHint: 'Training data (click a label to change it—try mislabeling)',
      trainNames: ['Ginger Cat', 'Black Cat', 'Tabby Cat', 'Shiba', 'Poodle', 'Labrador'],
      cat: 'Cat', dog: 'Dog',
      accK: 'After training · test accuracy', testK: 'Test it on a new photo',
      modelSays: 'The model says: ', pred: '{c} ({p}%)',
      testRight: '✓ Correct—this really is a cat', testWrong: '✗ Wrong—the mislabeled data taught it badly',
      verdictOk: 'Labels all correct and cats/dogs balanced → the model is accurate and reliable.',
      verdictBad: 'You mislabeled {n} → garbage in, garbage out, so accuracy drops right away.',
      resetBtn: 'Reset labels to correct',
      biasTrainHint: 'Training data (the cat samples are all “ginger cats”—no diversity)',
      biasNames: ['Ginger Cat', 'Ginger Cat', 'Ginger Cat', 'Ginger Cat', 'Shiba', 'Shiba'],
      biasNote: '⚠️ The labels are all correct, but <b>the model has only seen ginger cats</b>—the data is imbalanced.',
      biasAccK: 'On a diverse test set', biasTestK: 'Test it on a “black cat”', biasPred: 'Dog (41%)',
      biasTestNote: '✗ It has never seen a black cat, so it calls it a dog—this is <b>data bias</b>',
      biasVerdict: 'Biased data makes a biased model: what it actually learned is “orange = cat,” not “cat = cat.”',
      hint: 'So <b>data is the nutrient of AI</b>: <b>labels</b> are the correct answers people provide, <b>quality</b> decides whether it learns the right thing, and <b>balance</b> decides whether it’s fair. However clever the model, it can’t learn what isn’t in the data—which is why “cleaning the data” often matters more than tuning the model.',
    },
    ja: {
      h3: 'インタラクティブ：あなたが AI の先生',
      lede: 'AI の能力の上限は<b>データ</b>で決まります。各カードの下にある「猫／犬」が<b>ラベル（Label）</b>——人が与える正解です。わざと間違ったラベルをつけて、モデルの精度がどう崩れるか見てみましょう。あるいは<b>データバイアス</b>がどう足を引っ張るかも試せます。',
      tabLabel: '🏷️ アノテーターになる', tabBias: '⚖️ データバイアスのデモ',
      trainHint: '学習データ（「ラベル」をクリックすると変えられます。わざと間違えてみて）',
      trainNames: ['茶トラ', '黒猫', 'キジトラ', '柴犬', 'プードル', 'ラブラドール'],
      cat: '猫', dog: '犬',
      accK: '学習後 · テスト精度', testK: '新しい写真でテスト',
      modelSays: 'モデルの判断：', pred: '{c}（{p}%）',
      testRight: '✓ 正解——これは確かに猫です', testWrong: '✗ 不正解——間違ったラベルのデータで悪く学んでしまった',
      verdictOk: 'ラベルはすべて正しく、猫と犬もバランスが取れている → モデルは正確で信頼できます。',
      verdictBad: 'ラベルを {n} 件間違えました → ゴミを入れればゴミが出る（garbage in, garbage out）で、精度がすぐに落ちます。',
      resetBtn: 'ラベルを正しく戻す',
      biasTrainHint: '学習データ（猫のサンプルがすべて「茶トラ」で、多様性がありません）',
      biasNames: ['茶トラ', '茶トラ', '茶トラ', '茶トラ', '柴犬', '柴犬'],
      biasNote: '⚠️ ラベルはすべて正しいのに、<b>モデルは茶トラしか見たことがありません</b>——データが偏っています。',
      biasAccK: '多様なテストセットでの精度', biasTestK: '「黒猫」でテスト', biasPred: '犬（41%）',
      biasTestNote: '✗ 黒猫を見たことがないので犬だと判断——これが<b>データバイアス（Bias）</b>です',
      biasVerdict: 'データが偏れば、モデルも偏ります：実際に学んだのは「猫＝猫」ではなく「オレンジ色＝猫」だったのです。',
      hint: 'つまり<b>データは AI の栄養</b>です：<b>ラベル</b>は人が与える正解、<b>品質</b>は正しく学べるかを、<b>バランス</b>は公平かどうかを左右します。どれだけ賢いモデルでも、データにないものは学べません——だから「データを洗う」ことが、モデルの調整より重要になることがよくあるのです。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let mode = $state('label');
  let labels = $state(TRAIN.map((t) => t.truth));

  let wrong = $derived(labels.filter((l, i) => l !== TRAIN[i].truth).length);
  let acc = $derived(clamp(Math.round(96 - wrong * 15), 20, 96));
  let testPred = $derived(wrong < 3 ? '貓' : '狗');
  let testOk = $derived(testPred === '貓');

  function flip(i) { labels[i] = labels[i] === '貓' ? '狗' : '貓'; }
  function reset() { labels = TRAIN.map((t) => t.truth); }

  // 偏誤模式固定結果
  const BIAS_ACC = 52;
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="seg">
      <button class="segb" class:on={mode === 'label'} onclick={() => (mode = 'label')}>{ui.tabLabel}</button>
      <button class="segb" class:on={mode === 'bias'} onclick={() => (mode = 'bias')}>{ui.tabBias}</button>
    </div>

    {#if mode === 'label'}
      <div class="mono k">{ui.trainHint}</div>
      <div class="cards">
        {#each TRAIN as c, i}
          {@const bad = labels[i] !== c.truth}
          <div class="card" class:bad>
            <div class="emo">{c.emoji}</div>
            <div class="nm">{ui.trainNames[i]}</div>
            <button class="label" class:cat={labels[i] === '貓'} class:dog={labels[i] === '狗'} class:x={bad} onclick={() => flip(i)}>
              {labels[i] === '貓' ? ui.cat : ui.dog}{#if bad} ✗{/if}
            </button>
          </div>
        {/each}
      </div>

      <div class="result">
        <div class="rleft">
          <div class="mono k2">{ui.accK}</div>
          <div class="accnum" style="color:{acc > 80 ? 'var(--teal)' : acc > 60 ? 'var(--accent)' : 'var(--crit)'}">{acc}%</div>
          <div class="accbar"><div class="accfill" style="width:{acc}%; background:{acc > 80 ? 'var(--teal)' : acc > 60 ? 'var(--accent)' : 'var(--crit)'}"></div></div>
        </div>
        <div class="rright">
          <div class="mono k2">{ui.testK}</div>
          <div class="test"><span class="temo">🐈‍⬛</span>
            <div>{ui.modelSays}<b class:ok={testOk} class:no={!testOk}>{ui.pred.replace('{c}', testOk ? ui.cat : ui.dog).replace('{p}', acc)}</b><br>
              <span class="tv">{testOk ? ui.testRight : ui.testWrong}</span></div>
          </div>
        </div>
      </div>
      <p class="verdict" style="color:{wrong === 0 ? 'var(--teal)' : 'var(--crit)'}">
        {wrong === 0 ? ui.verdictOk : ui.verdictBad.replace('{n}', wrong)}
      </p>
      {#if wrong > 0}<button class="btn ghost sm" onclick={reset}>{ui.resetBtn}</button>{/if}

    {:else}
      <div class="mono k">{ui.biasTrainHint}</div>
      <div class="cards">
        {#each BIAS as c, i}
          <div class="card"><div class="emo">{c.emoji}</div><div class="nm">{ui.biasNames[i]}</div>
            <span class="label" class:cat={c.truth === '貓'} class:dog={c.truth === '狗'}>{c.truth === '貓' ? ui.cat : ui.dog}</span></div>
        {/each}
      </div>
      <div class="biasnote">{@html ui.biasNote}</div>
      <div class="result">
        <div class="rleft">
          <div class="mono k2">{ui.biasAccK}</div>
          <div class="accnum" style="color:var(--crit)">{BIAS_ACC}%</div>
          <div class="accbar"><div class="accfill" style="width:{BIAS_ACC}%; background:var(--crit)"></div></div>
        </div>
        <div class="rright">
          <div class="mono k2">{ui.biasTestK}</div>
          <div class="test"><span class="temo">🐈‍⬛</span>
            <div>{ui.modelSays}<b class="no">{ui.biasPred}</b><br>
              <span class="tv">{@html ui.biasTestNote}</span></div>
          </div>
        </div>
      </div>
      <p class="verdict" style="color:var(--crit)">{ui.biasVerdict}</p>
    {/if}
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .k { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: 10px; }
  .k2 { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: 6px; }

  .seg { display: inline-flex; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 3px; gap: 3px; margin-bottom: var(--sp-4); }
  .segb { font-size: var(--fs-cap); padding: 7px 14px; border-radius: var(--r-sm); border: none; background: none; color: var(--muted); cursor: pointer; }
  .segb.on { background: var(--accent); color: #241500; font-weight: 600; }

  .cards { display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--sp-2); margin-bottom: var(--sp-4); }
  @media (max-width: 720px) { .cards { grid-template-columns: repeat(3, 1fr); } }
  .card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 10px 6px; text-align: center; transition: .2s; }
  .card.bad { border-color: #e8b4b4; background: #fceaea; }
  .emo { font-size: 30px; line-height: 1.1; }
  .nm { font-size: var(--fs-micro); color: var(--muted); margin: 4px 0 6px; }
  .label { font-size: var(--fs-cap); font-weight: 600; border-radius: 99px; padding: 3px 10px; border: 1px solid transparent; cursor: pointer; }
  button.label { cursor: pointer; } span.label { cursor: default; }
  .label.cat { background: #0f8a801a; color: var(--teal); border-color: #0f8a8055; }
  .label.dog { background: #e07f0e1a; color: var(--accent); border-color: #e07f0e55; }
  .label.x { background: #d23f3f18; color: var(--crit); border-color: var(--crit); }

  .result { display: grid; grid-template-columns: 200px 1fr; gap: var(--sp-4); background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 12px 14px; }
  @media (max-width: 720px) { .result { grid-template-columns: 1fr; } }
  .accnum { font-family: var(--mono); font-size: 34px; font-weight: 700; line-height: 1; }
  .accbar { height: 8px; border-radius: 99px; background: var(--surface-3); overflow: hidden; margin-top: 8px; }
  .accfill { height: 100%; border-radius: 99px; transition: width .4s cubic-bezier(.2,.7,.2,1); }
  .test { display: flex; align-items: center; gap: 12px; font-size: var(--fs-sm); color: var(--ink-2); }
  .temo { font-size: 34px; }
  .test b.ok { color: var(--teal); } .test b.no { color: var(--crit); }
  .tv { font-size: var(--fs-cap); color: var(--muted); }

  .biasnote { font-size: var(--fs-cap); color: var(--crit); background: #fceaea; border: 1px solid #e8b4b4; border-radius: var(--r-sm); padding: 8px 12px; margin-bottom: var(--sp-3); }
  .verdict { font-size: var(--fs-cap); margin: var(--sp-3) 0 6px; }
  .btn.sm { padding: 5px 11px; font-size: var(--fs-cap); }
</style>
