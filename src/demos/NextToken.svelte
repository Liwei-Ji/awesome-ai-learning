<script>
  /* Ch6 · LLM Next-Token（核心互動）。
     state = ctx（開頭）+ picked（已生成的字）。distribution 由目前上下文衍生，
     每按一次生成就把機率最高的字接上去——示範「一次只預測下一個 Token」。 */
  import Bars from '../components/Bars.svelte';

  const STARTS = {
    我喜歡吃: [['飯', 40], ['水果', 30], ['麵', 20], ['肉', 10]],
    今天天氣: [['很好', 45], ['晴朗', 28], ['不錯', 17], ['糟糕', 10]],
    'AI 會改變': [['世界', 42], ['未來', 31], ['生活', 18], ['工作', 9]],
  };
  const FOLLOW = {
    飯: [['。', 50], ['和', 25], ['麵', 15], ['，', 10]],
    水果: [['。', 48], ['和', 27], ['，', 15], ['跟', 10]],
    很好: [['。', 55], ['，', 25], ['呢', 12], ['！', 8]],
    世界: [['。', 46], ['的', 28], ['，', 16], ['！', 10]],
    未來: [['。', 44], ['的', 30], ['，', 16], ['會', 10]],
  };
  const KEYS = Object.keys(STARTS);

  let ctx = $state(KEYS[0]);
  let picked = $state([]);

  const curDist = () => {
    const last = picked.length ? picked[picked.length - 1] : ctx;
    return FOLLOW[last] || STARTS[ctx] || [['。', 60], ['，', 25], ['的', 15]];
  };

  let dist = $derived(picked.length ? curDist() : STARTS[ctx]);
  let rows = $derived(dist.map((d, i) => ({ nm: `"${d[0]}"`, val: d[1], win: i === 0 })));
  let seed = $derived([...ctx.replace(/[的]/g, '')]);
  let full = $derived(picked.length >= 6);

  function init(k) { ctx = k; picked = []; }
  function gen() {
    const d = picked.length ? curDist() : STARTS[ctx];
    picked.push(d[0][0]);
  }
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：一個字一個字，長出句子</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    選一個開頭，按「生成下一個字」。模型每一步都算出一整排候選字的<b>機率</b>，挑一個接上去。
  </p>

  <div class="btn-row">
    {#each KEYS as k}
      <button class="btn" class:primary={k === ctx} onclick={() => init(k)}>{k}</button>
    {/each}
  </div>

  <div class="toks">
    {#each seed as ch}<span class="mono t seed">{ch}</span>{/each}
    {#each picked as ch}<span class="mono t pick">{ch}</span>{/each}
    <span class="mono cur">▍</span>
  </div>

  <div class="eyebrow dist-h">下一個 Token 的機率</div>
  {#key picked.length}
    <Bars {rows} />
  {/key}

  <div class="btn-row acts">
    <button class="btn primary" disabled={full} onclick={gen}>{full ? '（示範到此）' : '⟳ 生成下一個字'}</button>
    <button class="btn ghost" onclick={() => init(ctx)}>重新開始</button>
  </div>
  <p class="hint">
    這就是 ChatGPT 的核心：<b>它不查答案，只是不斷預測下一個 Token</b>。挑機率最高的字接上去，重複幾百次，就成了一整段回答。
  </p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .toks { display: flex; gap: 6px; flex-wrap: wrap; margin: var(--sp-4) 0; min-height: 36px; align-items: center; }
  .t { padding: 6px 9px; border-radius: var(--r-sm); font-size: var(--fs-body); }
  .seed { background: var(--surface-3); border: 1px solid var(--line); }
  .pick { background: var(--glow); border: 1px solid var(--accent); color: var(--accent-ink); }
  .cur { color: var(--accent); }
  .dist-h { margin-bottom: var(--sp-2); }
  .acts { margin-top: var(--sp-4); }
</style>
