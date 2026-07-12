<script>
  /* Ch · AI 的極限：幻覺與偏見。AI 常「一本正經地說錯」，而且信心很高。
     按「查證」揭露哪些答案其實是幻覺或偏見——高信心 ≠ 正確。亮色、離線。 */
  import { fade } from 'svelte/transition';
  import { dur, D } from '../lib/motion.js';

  const ITEMS = [
    { q: '台灣最高的山是？', a: '玉山，海拔約 3952 公尺。', conf: 96, type: 'ok', truth: '正確——這題它真的知道。' },
    { q: '貝爾在哪一年發明電話？', a: '亞歷山大·貝爾於 1885 年發明電話。', conf: 94, type: 'halluc', truth: '其實是 1876 年。年份被它「編」出來了——這叫幻覺。' },
    { q: '引用一篇關於貓認知的論文', a: '《Feline Cognition》, J. Cat, Nature, 2019。', conf: 91, type: 'halluc', truth: '這篇論文不存在。AI 很會捏造「看起來很真」的假來源。' },
    { q: '描述一位「護理師」', a: '她溫柔細心，總是耐心照顧病人。', conf: 88, type: 'bias', truth: '預設用「她」＝性別偏見：護理師不分性別，這種傾向來自訓練資料。' },
  ];

  let checked = $state(false);
  let wrong = $derived(ITEMS.filter((i) => i.type !== 'ok').length);
  const BADGE = { ok: ['✓ 正確', 'ok'], halluc: ['✗ 幻覺', 'bad'], bias: ['⚠ 偏見', 'warn'] };
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：AI 有多會「自信地說錯」</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    AI 回答時<b>幾乎總是很有信心</b>，但信心高不代表正確。它可能<b>一本正經地編造（幻覺）</b>，
    也可能帶著<b>偏見</b>。先看它的答案與信心，再按「查證」揭曉真相。
  </p>

  <div class="demo-stage light">
    <div class="cards">
      {#each ITEMS as it, i}
        <div class="card" class:revealed={checked} class:bad={checked && it.type === 'halluc'} class:warn={checked && it.type === 'bias'} class:ok={checked && it.type === 'ok'}>
          <div class="q">Q：{it.q}</div>
          <div class="a">{it.a}</div>
          <div class="confrow">
            <span class="cl">AI 信心</span>
            <div class="cbar"><div class="cfill" style="width:{it.conf}%"></div></div>
            <span class="cn">{it.conf}%</span>
          </div>
          {#if checked}
            <div class="verdict {BADGE[it.type][1]}" in:fade={{ duration: dur(D.fast) }}>
              <b>{BADGE[it.type][0]}</b> · {it.truth}
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <div class="actions">
      {#if !checked}
        <button class="btn primary" onclick={() => (checked = true)}>🔍 查證所有答案</button>
      {:else}
        <button class="btn ghost" onclick={() => (checked = false)}>重置</button>
        <div class="summary" in:fade={{ duration: dur(D.base) }}>4 題裡有 <b>{wrong}</b> 題其實有問題——但信心全都 88% 以上。<b>高信心 ≠ 正確。</b></div>
      {/if}
    </div>
  </div>

  <p class="hint">
    為什麼會這樣？因為 LLM 算的是「<b>最像的答案</b>」而不是「正確的答案」，所以會流暢、也會唬爛；
    偏見則來自訓練資料裡的刻板印象。<b>怎麼辦</b>：重要的事要<b>查證、要它附出處、用 RAG</b>，並且永遠保留人類判斷。
  </p>
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
