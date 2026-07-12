<script>
  /* Ch · 資料：AI 的養分。資料集、標註、品質、偏誤。
     模式一「自己當標註員」：點卡片改標註，標錯越多、模型準確率越掉（垃圾進垃圾出）。
     模式二「資料偏誤」：訓練的貓全是橘貓，遇到黑貓就失準，示範 Bias。
     深色舞台、確定性、離線。 */
  import { clamp } from '../lib/helpers.js';

  const TRAIN = [
    { emoji: '🐱', name: '橘貓', truth: '貓' },
    { emoji: '🐈‍⬛', name: '黑貓', truth: '貓' },
    { emoji: '🐈', name: '花貓', truth: '貓' },
    { emoji: '🐕', name: '柴犬', truth: '狗' },
    { emoji: '🐩', name: '貴賓', truth: '狗' },
    { emoji: '🦮', name: '拉布拉多', truth: '狗' },
  ];
  const BIAS = [
    { emoji: '🐱', name: '橘貓', truth: '貓' }, { emoji: '🐱', name: '橘貓', truth: '貓' },
    { emoji: '🐱', name: '橘貓', truth: '貓' }, { emoji: '🐱', name: '橘貓', truth: '貓' },
    { emoji: '🐕', name: '柴犬', truth: '狗' }, { emoji: '🐕', name: '柴犬', truth: '狗' },
  ];

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
  <div class="panel-h"><h3>互動：你就是 AI 的老師</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    AI 的能力天花板，是<b>資料</b>決定的。每張卡片下的「貓／狗」就是<b>標註（Label）</b>——人給的正確答案。
    試著故意標錯，看模型準確率怎麼崩；或看看<b>資料偏誤</b>如何讓它出糗。
  </p>

  <div class="demo-stage light">
    <div class="seg">
      <button class="segb" class:on={mode === 'label'} onclick={() => (mode = 'label')}>🏷️ 自己當標註員</button>
      <button class="segb" class:on={mode === 'bias'} onclick={() => (mode = 'bias')}>⚖️ 資料偏誤示範</button>
    </div>

    {#if mode === 'label'}
      <div class="mono k">訓練資料（點「標註」可以改，試著標錯看看）</div>
      <div class="cards">
        {#each TRAIN as c, i}
          {@const bad = labels[i] !== c.truth}
          <div class="card" class:bad>
            <div class="emo">{c.emoji}</div>
            <div class="nm">{c.name}</div>
            <button class="label" class:cat={labels[i] === '貓'} class:dog={labels[i] === '狗'} class:x={bad} onclick={() => flip(i)}>
              {labels[i]}{#if bad} ✗{/if}
            </button>
          </div>
        {/each}
      </div>

      <div class="result">
        <div class="rleft">
          <div class="mono k2">訓練後 · 測驗準確率</div>
          <div class="accnum" style="color:{acc > 80 ? 'var(--teal)' : acc > 60 ? 'var(--accent)' : 'var(--crit)'}">{acc}%</div>
          <div class="accbar"><div class="accfill" style="width:{acc}%; background:{acc > 80 ? 'var(--teal)' : acc > 60 ? 'var(--accent)' : 'var(--crit)'}"></div></div>
        </div>
        <div class="rright">
          <div class="mono k2">拿一張新照片測驗</div>
          <div class="test"><span class="temo">🐈‍⬛</span>
            <div>模型判斷：<b class:ok={testOk} class:no={!testOk}>{testPred}（{acc}%）</b><br>
              <span class="tv">{testOk ? '✓ 答對了，這確實是貓' : '✗ 答錯了——被標錯的資料教壞了'}</span></div>
          </div>
        </div>
      </div>
      <p class="verdict" style="color:{wrong === 0 ? 'var(--teal)' : 'var(--crit)'}">
        {wrong === 0 ? '標註全對、貓狗均衡 → 模型又準又可靠。' : `你標錯了 ${wrong} 筆 → 垃圾進、垃圾出（garbage in, garbage out），準確率直接掉。`}
      </p>
      {#if wrong > 0}<button class="btn ghost sm" onclick={reset}>把標註改回正確</button>{/if}

    {:else}
      <div class="mono k">訓練資料（貓的樣本全是「橘貓」，缺乏多樣性）</div>
      <div class="cards">
        {#each BIAS as c, i}
          <div class="card"><div class="emo">{c.emoji}</div><div class="nm">{c.name}</div>
            <span class="label" class:cat={c.truth === '貓'} class:dog={c.truth === '狗'}>{c.truth}</span></div>
        {/each}
      </div>
      <div class="biasnote">⚠️ 標註都對，但<b>貓只看過橘貓</b>——資料不均。</div>
      <div class="result">
        <div class="rleft">
          <div class="mono k2">在多樣測驗集上</div>
          <div class="accnum" style="color:var(--crit)">{BIAS_ACC}%</div>
          <div class="accbar"><div class="accfill" style="width:{BIAS_ACC}%; background:var(--crit)"></div></div>
        </div>
        <div class="rright">
          <div class="mono k2">拿一隻「黑貓」測驗</div>
          <div class="test"><span class="temo">🐈‍⬛</span>
            <div>模型判斷：<b class="no">狗（41%）</b><br>
              <span class="tv">✗ 沒看過黑貓，就把牠當成狗——這叫<b>資料偏誤 Bias</b></span></div>
          </div>
        </div>
      </div>
      <p class="verdict" style="color:var(--crit)">資料偏了，模型就跟著偏：它學到的其實是「橘色＝貓」，而不是「貓＝貓」。</p>
    {/if}
  </div>

  <p class="hint">
    所以 <b>資料就是 AI 的養分</b>：<b>標註</b>是人給的正確答案、<b>品質</b>決定它學得對不對、<b>均衡</b>決定它公不公平。
    模型再聰明，也學不出資料裡沒有的東西——這也是為什麼「洗資料」往往比調模型還重要。
  </p>
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
