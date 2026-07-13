<script>
  /* Ch · AI 的極限：幻覺與偏見。AI 常「一本正經地說錯」，而且信心很高。
     按「查證」揭露哪些答案其實是幻覺或偏見——高信心 ≠ 正確。亮色、離線。 */
  import { fade } from 'svelte/transition';
  import { dur, D } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const META = [
    { conf: 96, type: 'ok' },
    { conf: 94, type: 'halluc' },
    { conf: 91, type: 'halluc' },
    { conf: 88, type: 'bias' },
  ];
  const BADGE_CLASS = { ok: 'ok', halluc: 'bad', bias: 'warn' };

  const L = {
    zh: {
      h3: '互動：AI 有多會「自信地說錯」',
      lede: 'AI 回答時<b>幾乎總是很有信心</b>，但信心高不代表正確。它可能<b>一本正經地編造（幻覺）</b>，也可能帶著<b>偏見</b>。先看它的答案與信心，再按「查證」揭曉真相。',
      qPrefix: 'Q：',
      cl: 'AI 信心',
      badge: { ok: '✓ 正確', halluc: '✗ 幻覺', bias: '⚠ 偏見' },
      check: '🔍 查證所有答案',
      reset: '重置',
      summary: '4 題裡有 <b>{w}</b> 題其實有問題——但信心全都 88% 以上。<b>高信心 ≠ 正確。</b>',
      hint: '為什麼會這樣？因為 LLM 算的是「<b>最像的答案</b>」而不是「正確的答案」，所以會流暢、也會唬爛；偏見則來自訓練資料裡的刻板印象。<b>怎麼辦</b>：重要的事要<b>查證、要它附出處、用 RAG</b>，並且永遠保留人類判斷。',
      items: [
        { q: '台灣最高的山是？', a: '玉山，海拔約 3952 公尺。', truth: '正確——這題它真的知道。' },
        { q: '貝爾在哪一年發明電話？', a: '亞歷山大·貝爾於 1885 年發明電話。', truth: '其實是 1876 年。年份被它「編」出來了——這叫幻覺。' },
        { q: '引用一篇關於貓認知的論文', a: '《Feline Cognition》, J. Cat, Nature, 2019。', truth: '這篇論文不存在。AI 很會捏造「看起來很真」的假來源。' },
        { q: '描述一位「護理師」', a: '她溫柔細心，總是耐心照顧病人。', truth: '預設用「她」＝性別偏見：護理師不分性別，這種傾向來自訓練資料。' },
      ],
    },
    en: {
      h3: 'Interactive: how confidently AI gets things wrong',
      lede: 'When AI answers, it’s <b>almost always confident</b>—but high confidence doesn’t mean correct. It might <b>make things up with a straight face (hallucination)</b>, or carry a <b>bias</b>. Look at its answers and confidence first, then press “Fact-check” to reveal the truth.',
      qPrefix: 'Q: ',
      cl: 'AI confidence',
      badge: { ok: '✓ Correct', halluc: '✗ Hallucination', bias: '⚠ Bias' },
      check: '🔍 Fact-check all answers',
      reset: 'Reset',
      summary: 'Of the 4 answers, <b>{w}</b> actually have problems—yet every confidence is above 88%. <b>High confidence ≠ correct.</b>',
      hint: 'Why does this happen? An LLM computes the “<b>most plausible answer</b>,” not the “correct” one—so it’s fluent, and it bluffs; bias comes from stereotypes in the training data. <b>What to do</b>: for anything important, <b>verify it, ask for sources, use RAG</b>—and always keep a human in the loop.',
      items: [
        { q: 'What is Taiwan’s tallest mountain?', a: 'Yushan, about 3,952 meters above sea level.', truth: 'Correct—this one it genuinely knows.' },
        { q: 'What year did Bell invent the telephone?', a: 'Alexander Bell invented the telephone in 1885.', truth: 'It was actually 1876. The year was “made up”—that’s a hallucination.' },
        { q: 'Cite a paper on feline cognition.', a: '“Feline Cognition,” J. Cat, Nature, 2019.', truth: 'This paper doesn’t exist. AI is great at fabricating fake sources that “look real.”' },
        { q: 'Describe a “nurse.”', a: 'She is gentle and attentive, always patiently caring for patients.', truth: 'Defaulting to “she” = gender bias: nurses aren’t defined by gender, and this tendency comes from the training data.' },
      ],
    },
    ja: {
      h3: 'インタラクティブ：AI はどれほど自信満々に間違えるか',
      lede: 'AI は答えるとき、<b>ほとんどいつも自信満々</b>——でも自信が高いからといって正しいとは限りません。<b>平然と話をでっち上げる（ハルシネーション）</b>こともあれば、<b>偏見</b>を抱えていることもあります。まず答えと確信度を見て、それから「事実確認」を押して真相を確かめましょう。',
      qPrefix: 'Q：',
      cl: 'AI の確信度',
      badge: { ok: '✓ 正解', halluc: '✗ ハルシネーション', bias: '⚠ 偏見' },
      check: '🔍 すべての答えを事実確認',
      reset: 'リセット',
      summary: '4 つの答えのうち <b>{w}</b> つは実は問題あり——なのに確信度はどれも 88% 超え。<b>高い自信 ≠ 正しさ。</b>',
      hint: 'なぜこうなる？LLM が計算するのは「<b>いちばんもっともらしい答え</b>」であって「正しい答え」ではありません——だから流暢だし、平気で口から出まかせも言う。偏見は訓練データのステレオタイプに由来します。<b>どうする</b>：大事なことは<b>裏取りし、出典を求め、RAG を使う</b>——そして常に人間の判断を残しておくこと。',
      items: [
        { q: '台湾でいちばん高い山は？', a: '玉山（ユイシャン）、標高およそ 3,952 メートル。', truth: '正解——これは本当に知っている。' },
        { q: 'ベルが電話を発明したのは何年？', a: 'アレクサンダー・ベルは 1885 年に電話を発明した。', truth: '本当は 1876 年。年号を「でっち上げた」——これがハルシネーション。' },
        { q: '猫の認知に関する論文を引用して。', a: '「Feline Cognition」, J. Cat, Nature, 2019。', truth: 'この論文は存在しない。AI は「本物らしく見える」偽の出典をでっち上げるのが得意。' },
        { q: '「看護師」について説明して。', a: '彼女は優しく気配り上手で、いつも辛抱強く患者を看護する。', truth: '既定で「彼女」＝性別の偏見：看護師に性別は関係なく、この傾向は訓練データに由来する。' },
      ],
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let checked = $state(false);
  let ITEMS = $derived(META.map((m, i) => ({ ...m, ...ui.items[i] })));
  let wrong = $derived(ITEMS.filter((i) => i.type !== 'ok').length);
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="cards">
      {#each ITEMS as it, i}
        <div class="card" class:revealed={checked} class:bad={checked && it.type === 'halluc'} class:warn={checked && it.type === 'bias'} class:ok={checked && it.type === 'ok'}>
          <div class="q">{ui.qPrefix}{it.q}</div>
          <div class="a">{it.a}</div>
          <div class="confrow">
            <span class="cl">{ui.cl}</span>
            <div class="cbar"><div class="cfill" style="width:{it.conf}%"></div></div>
            <span class="cn">{it.conf}%</span>
          </div>
          {#if checked}
            <div class="verdict {BADGE_CLASS[it.type]}" in:fade={{ duration: dur(D.fast) }}>
              <b>{ui.badge[it.type]}</b> · {it.truth}
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <div class="actions">
      {#if !checked}
        <button class="btn primary" onclick={() => (checked = true)}>{ui.check}</button>
      {:else}
        <button class="btn ghost" onclick={() => (checked = false)}>{ui.reset}</button>
        <div class="summary" in:fade={{ duration: dur(D.base) }}>{@html ui.summary.replace('{w}', wrong)}</div>
      {/if}
    </div>
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-4); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .cards { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .cards { grid-template-columns: 1fr; } }
  .card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: var(--sp-3) var(--sp-4); transition: .25s; }
  .card.bad { border-color: #e8b4b4; background: #fceaea; }
  .card.warn { border-color: #e6cf8a; background: #fbf3df; }
  .card.ok { border-color: color-mix(in srgb, var(--teal) 33%, transparent); background: color-mix(in srgb, var(--teal) 5%, transparent); }
  .q { font-size: var(--fs-cap); color: var(--muted); margin-bottom: var(--sp-1); }
  .a { font-size: var(--fs-body); color: var(--ink); line-height: var(--lh-body); margin-bottom: var(--sp-2); }
  .confrow { display: flex; align-items: center; gap: var(--sp-2); }
  .cl { font-size: var(--fs-micro); color: var(--muted); white-space: nowrap; }
  .cbar { flex: 1; height: 8px; border-radius: 99px; background: var(--surface-3); overflow: hidden; }
  .cfill { height: 100%; border-radius: 99px; background: var(--accent); }
  .cn { font-family: var(--mono); font-size: var(--fs-cap); color: var(--accent-ink); }
  .verdict { font-size: var(--fs-cap); line-height: var(--lh-snug); margin-top: var(--sp-3); padding: var(--sp-2) var(--sp-3); border-radius: var(--r-sm); background: var(--surface-2); }
  .verdict.bad { color: #b23; } .verdict.warn { color: #8a6d1a; } .verdict.ok { color: var(--teal); }

  .actions { display: flex; align-items: center; gap: var(--sp-4); margin-top: var(--sp-4); flex-wrap: wrap; }
  .summary { font-size: var(--fs-sm); color: var(--ink-2); }
  .summary b { color: var(--crit); }
</style>
