<script>
  // 主舞台：章節抬頭 + 互動 demo + 重點整理 + 關鍵名詞（皆置於中央內容下方）。
  import { fly } from 'svelte/transition';
  import { nav } from '../stores/state.svelte.js';
  import { CH } from '../data/chapters.js';
  import { demoFor } from '../demos/registry.js';
  import { knowledgeFor } from '../data/knowledge/index.js';
  import { dur, D, ease } from '../lib/motion.js';

  let stageEl;
  let ch = $derived(CH[nav.current]);
  let Demo = $derived(demoFor(ch.slug));
  let notes = $derived(knowledgeFor(ch.slug).notes);

  $effect(() => { nav.current; if (stageEl) stageEl.scrollTop = 0; });
</script>

<main class="stage" bind:this={stageEl}>
  <div class="stage-head">
    {#key nav.current}
      <div in:fly={{ y: 10, duration: dur(D.base), easing: ease }}>
        <h1>{ch.t}</h1>
        <p class="lede">{ch.sub}</p>
      </div>
    {/key}
  </div>
  <div class="canvas-wrap">
    {#key nav.current}
      <div in:fly={{ y: 16, duration: dur(D.slow), delay: dur(90), easing: ease }}>
        <Demo id={nav.current} />

        <div class="learn">
          <section class="lbox">
            <h4>重點整理</h4>
            {#each ch.key as [n, t]}
              <div class="kp"><span class="kn">{n}</span><span>{t}</span></div>
            {/each}
          </section>
          {#if ch.terms?.length}
            <section class="lbox">
              <h4>關鍵名詞</h4>
              {#each ch.terms as [t, d]}
                <div class="term"><div class="tt">{t}</div><div class="td">{d}</div></div>
              {/each}
            </section>
          {/if}
        </div>

        {#if notes?.length}
          <section class="lbox kbase">
            <h4>知識庫 · 延伸知識點</h4>
            <div class="notes">
              {#each notes as n}<div class="note"><span class="nb">▹</span><span>{n}</span></div>{/each}
            </div>
          </section>
        {/if}
      </div>
    {/key}
  </div>
</main>

<style>
  .learn { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 18px; }
  @media (max-width: 720px) { .learn { grid-template-columns: 1fr; } }
  .lbox {
    background: var(--surface); border: 1px solid var(--line); border-radius: var(--r);
    padding: 16px 18px; box-shadow: 0 1px 2px rgba(10, 20, 40, .04);
  }
  .lbox h4 { font-size: 13px; margin: 0 0 10px; display: flex; align-items: center; gap: 8px; }
  .lbox h4::before { content: ""; width: 8px; height: 8px; border-radius: 3px; background: var(--accent); }
  .kp { display: flex; gap: 10px; font-size: 13.5px; color: var(--ink-2); padding: 8px 0; border-bottom: 1px dashed var(--line); }
  .kp:last-child { border-bottom: none; }
  .kn { color: var(--teal); font-family: var(--mono); flex: none; }
  .term { background: var(--surface-2); border: 1px solid var(--line); border-radius: 10px; padding: 11px 13px; margin-bottom: 9px; }
  .term:last-child { margin-bottom: 0; }
  .tt { font-family: var(--mono); font-size: 12.5px; color: var(--accent-ink); font-weight: 600; }
  .td { font-size: 12.5px; color: var(--muted); margin-top: 3px; line-height: 1.5; }

  .kbase { margin-top: 16px; }
  .kbase h4::before { background: var(--teal); }
  .notes { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; }
  @media (max-width: 720px) { .notes { grid-template-columns: 1fr; } }
  .note { display: flex; gap: 8px; font-size: 13px; color: var(--ink-2); line-height: 1.5; }
  .note .nb { color: var(--teal); flex: none; }
</style>
