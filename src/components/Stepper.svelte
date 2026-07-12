<script>
  /* 共用步驟指示器 —— 所有「引導式」demo 的統一語言。
     props：steps（字串陣列）、current（目前步驟索引，0-based）。
       · i < current  → 已完成（✓、teal）
       · i === current → 進行中（accent 實心）
       · i > current  → 未開始（灰、半透明）
     純呈現、無狀態；配色走 tokens，亮色實心、無漸層。 */
  let { steps = [], current = 0 } = $props();
</script>

<div class="steps" role="list">
  {#each steps as s, i}
    <div class="stp" class:cur={i === current} class:done={i < current} role="listitem">
      <span class="dot">{i < current ? '✓' : i + 1}</span>
      <span class="sl">{s}</span>
    </div>
    {#if i < steps.length - 1}<span class="line" class:on={i < current}></span>{/if}
  {/each}
</div>

<style>
  .steps { display: flex; align-items: center; margin-bottom: 14px; }
  .stp { display: flex; align-items: center; gap: 7px; opacity: .5; transition: opacity .25s; }
  .stp .dot {
    width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center;
    font-size: 12px; font-family: var(--mono);
    background: #fff; border: 1.5px solid var(--line-2); color: var(--muted);
    transition: background .25s, border-color .25s, color .25s;
  }
  .stp .sl { font-size: 12.5px; color: var(--ink-2); font-weight: 600; }
  .stp.cur { opacity: 1; }
  .stp.cur .dot { border-color: var(--accent); background: var(--accent); color: #241500; }
  .stp.done { opacity: 1; }
  .stp.done .dot { border-color: var(--teal); color: var(--teal); }
  .line { flex: 1; height: 2px; background: #e0e6ef; margin: 0 8px; transition: background .3s; }
  .line.on { background: var(--teal); }
  @media (max-width: 720px) {
    .stp .sl { display: none; }
    .steps { gap: 2px; }
  }
</style>
