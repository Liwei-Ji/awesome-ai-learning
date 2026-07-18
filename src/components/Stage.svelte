<script>
  // 主舞台：章節抬頭 + 互動 demo + 重點整理 + 關鍵名詞（皆置於中央內容下方）。
  import { fly } from 'svelte/transition';
  import { nav } from '../stores/state.svelte.js';
  import { chOf } from '../data/localize.js';
  import { demoFor } from '../demos/registry.js';
  import { knowledgeFor } from '../data/knowledge/index.js';
  import { bodyFor } from '../data/bodies.js';
  import { practicalFor, decisionFor } from '../data/practice.js';
  import { t, i18n } from '../stores/i18n.svelte.js';
  import { dur, D, ease } from '../lib/motion.js';

  // 可傳 id 覆寫（學習路線播放器用）；不傳則跟隨 nav.current（課程模式）
  let { id = undefined } = $props();
  let cur = $derived(id ?? nav.current);

  let stageEl;
  let ch = $derived(chOf(cur));
  let Demo = $derived(demoFor(ch.slug));
  let body = $derived(bodyFor(ch.slug, i18n.locale));
  let practical = $derived(practicalFor(ch.slug, i18n.locale));
  let decision = $derived(decisionFor(ch.slug, i18n.locale));
  let notes = $derived(knowledgeFor(ch.slug, i18n.locale).notes);

  $effect(() => { cur; if (stageEl) stageEl.scrollTop = 0; });
</script>

<main class="stage" bind:this={stageEl}>
  <div class="stage-head">
    {#key cur}
      <div in:fly={{ y: 10, duration: dur(D.base), easing: ease }}>
        <h1>{ch.t}</h1>
        <p class="lede">{ch.sub}</p>
      </div>
    {/key}
  </div>
  <div class="canvas-wrap">
    {#key cur}
      <div in:fly={{ y: 16, duration: dur(D.slow), delay: dur(90), easing: ease }}>
        {#if body?.length}
          <section class="lesson">
            {#each body as sec}
              <div class="lsec">
                <h3>{sec.h}</h3>
                <p>{@html sec.p}</p>
              </div>
            {/each}
          </section>
        {/if}

        <Demo id={cur} />

        {#if practical?.length}
          <section class="lbox practical">
            <h4>{t('stage.practical')}</h4>
            <ul>{#each practical as p}<li>{@html p}</li>{/each}</ul>
          </section>
        {/if}

        {#if decision}
          <section class="lbox guide">
            <h4>{t('stage.decision')}</h4>
            {#if decision.q}<p class="gq">{decision.q}</p>{/if}
            {#each decision.rows as r}
              <div class="grow">
                <div class="gtop"><span class="gwhen">{r.when}</span><span class="garr">→</span><b class="guse">{r.use}</b></div>
                {#if r.why}<p class="gwhy">{r.why}</p>{/if}
              </div>
            {/each}
          </section>
        {/if}

        <div class="learn">
          <section class="lbox">
            <h4>{t('stage.keyPoints')}</h4>
            {#each ch.key as [n, t]}
              <div class="kp"><span class="kn">{n}</span><span>{t}</span></div>
            {/each}
          </section>
          {#if ch.terms?.length}
            <section class="lbox">
              <h4>{t('stage.keyTerms')}</h4>
              {#each ch.terms as [t, d]}
                <div class="term"><div class="tt">{t}</div><div class="td">{d}</div></div>
              {/each}
            </section>
          {/if}
        </div>

        {#if notes?.length}
          <section class="lbox kbase">
            <h4>{t('stage.knowledge')}</h4>
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
  .lesson { margin: 0 0 28px; }
  .lsec { margin: 0 0 17px; }
  .lsec:last-child { margin-bottom: 0; }
  .lsec h3 { font-size: 15px; font-weight: 650; color: var(--ink); margin: 0 0 6px;
    display: flex; align-items: center; gap: 8px; }
  .lsec h3::before { content: ""; width: 6px; height: 6px; border-radius: 2px; background: var(--accent); flex: none; }
  .lsec p { font-size: var(--fs-body); line-height: var(--lh-body); color: var(--ink-2); margin: 0; max-width: 70ch; }
  .lsec :global(b) { color: var(--ink); font-weight: 600; }

  .practical { margin-top: 16px; }
  .practical ul { margin: 0; padding-left: 18px; }
  .practical li { font-size: var(--fs-sm); color: var(--ink-2); line-height: var(--lh-body); margin: 7px 0; }
  .practical li :global(b) { color: var(--ink); }

  .guide { margin-top: 16px; }
  .guide .gq { font-size: var(--fs-sm); color: var(--muted); margin: 0 0 10px; }
  .grow { padding: 9px 0; border-bottom: 1px dashed var(--line); }
  .grow:last-child { border-bottom: none; }
  .gtop { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .gwhen { font-size: var(--fs-sm); color: var(--ink-2); }
  .garr { color: var(--muted); }
  .guse { color: var(--accent-ink); font-family: var(--mono); font-size: var(--fs-sm); }
  .gwhy { font-size: var(--fs-cap); color: var(--muted); margin: 3px 0 0; line-height: var(--lh-snug); }

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
