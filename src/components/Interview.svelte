<script>
  /* 面試演練主區：題目 → 考點三維 → 先想 → 揭曉核心答 → 加分／地雷 → 關聯章節。
     刻意不掛 AI 教授（靠「想→揭曉」自學）。nav.iv == null 時顯示題庫落地頁。 */
  import { fly } from 'svelte/transition';
  import { nav, go, goIv } from '../stores/state.svelte.js';
  import { IV_CATS, ivByCat, ivOf, ivLabel, catNameOf } from '../data/interviews.js';
  import { quizFor } from '../data/quizzes.js';
  import { CH } from '../data/chapters.js';
  import { chOf } from '../data/localize.js';
  import { t, i18n } from '../stores/i18n.svelte.js';
  import { dur, D, ease } from '../lib/motion.js';
  import { Atom, Scale, Network } from '@lucide/svelte';

  // 考點圖標（Lucide）：底層原理→atom、工程權衡→scale、系統化→network
  const IV_ICONS = { atom: Atom, scale: Scale, network: Network };

  let stageEl;
  let revealed = $state(false);
  let more = $state(false);
  // 互動：自評（勾選講到的重點）＋ 判斷題
  let covered = $state({});
  let pick = $state(null);
  let coveredCount = $derived(Object.values(covered).filter(Boolean).length);

  let item = $derived(nav.iv ? ivOf(nav.iv, i18n.locale) : null);
  let quiz = $derived(nav.iv ? quizFor(nav.iv, i18n.locale) : null);
  let catName = $derived(item ? catNameOf(item.cat, i18n.locale) : '');
  let sep = $derived(i18n.locale === 'en' ? ': ' : '：'); // beat 分隔（不用破折號）

  // slug → 章號，用來把「關聯章節」連回課程
  const slugToId = {};
  for (const id in CH) slugToId[CH[id].slug] = +id;
  let related = $derived(
    (item?.related ?? [])
      .map((s) => ({ id: slugToId[s], t: slugToId[s] != null ? chOf(slugToId[s]).t : null }))
      .filter((r) => r.id != null),
  );

  // 換題時收起解答、捲回頂端
  $effect(() => {
    nav.iv;
    revealed = false;
    more = false;
    covered = {};
    pick = null;
    if (stageEl) stageEl.scrollTop = 0;
  });
</script>

<main class="stage" bind:this={stageEl}>
  {#if !item}
    <!-- 題庫落地頁 -->
    <div class="stage-head">
      <div class="kicker"><span class="eyebrow">{t('iv.interview')}</span></div>
      <h1>{t('iv.landingTitle')}</h1>
      <p class="lede">{t('iv.landingLede')}</p>
    </div>
    <div class="canvas-wrap">
      <div class="cats">
        {#each IV_CATS as c}
          {@const ids = ivByCat(c.key)}
          <button class="catcard" disabled={!ids.length} onclick={() => ids.length && goIv(ids[0])}>
            <b>{catNameOf(c.key, i18n.locale)}</b>
            <span class="cc">{ids.length ? ids.length : t('iv.soon')}</span>
          </button>
        {/each}
      </div>
    </div>
  {:else}
    <div class="stage-head">
      {#key nav.iv}
        <div in:fly={{ y: 10, duration: dur(D.base), easing: ease }}>
          <div class="kicker"><span class="eyebrow">{t('iv.interview')} · {catName}</span></div>
          <h1>{item.q}</h1>
        </div>
      {/key}
    </div>

    <div class="canvas-wrap">
      {#key nav.iv}
        <div in:fly={{ y: 16, duration: dur(D.slow), delay: dur(90), easing: ease }}>
          <!-- 陷阱提示 -->
          <p class="trap">{@html item.trap}</p>

          <!-- 考點三維 -->
          <div class="panel">
            <div class="panel-h"><h3>{t('iv.tested')}</h3></div>
            <div class="pts">
              {#each item.points as p}
                {@const Icon = IV_ICONS[p.icon]}
                <div class="pt">
                  <span class="pi">{#if Icon}<Icon size={19} strokeWidth={2} />{/if}</span>
                  <div class="ptx"><b>{p.title}</b><p>{@html p.desc}</p></div>
                </div>
              {/each}
            </div>
          </div>

          <!-- 先想 → 揭曉 -->
          {#if !revealed}
            <div class="think">
              <span>{t('iv.think')}</span>
              <button class="btn primary" onclick={() => (revealed = true)}>{t('iv.reveal')}</button>
            </div>
          {:else}
            <div class="panel" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
              <div class="panel-h"><h3>{t('iv.answer')}</h3><span class="eyebrow">Core</span></div>
              <p class="selfhint">{t('iv.selfCheck')}</p>
              {#each item.core as c, i}
                <div class="beat">
                  <button class="bn chk" class:on={covered[i]} aria-pressed={!!covered[i]} title={t('iv.coverTip')} onclick={() => (covered[i] = !covered[i])}>{covered[i] ? '✓' : ''}</button>
                  <div><b>{c.h}</b>{sep}{@html c.d}</div>
                </div>
              {/each}
              <div class="selfscore">{@html t('iv.covered').replace('{n}', coveredCount).replace('{total}', item.core.length)}</div>

              {#if !more}
                <button class="btn ghost more" onclick={() => (more = true)}>{t('iv.more')}</button>
              {:else}
                <div class="extra" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
                  <div class="ex">
                    <span class="eyebrow">{t('iv.plus')}</span>
                    <ul>{#each item.plus as x}<li>{@html x}</li>{/each}</ul>
                  </div>
                  <div class="ex traps">
                    <span class="eyebrow">{t('iv.traps')}</span>
                    <ul>{#each item.traps as x}<li>{@html x}</li>{/each}</ul>
                  </div>
                </div>
              {/if}
            </div>
          {/if}

          <!-- 判斷題（互動）：讀完答案，換你判斷哪個回答最到位 -->
          {#if revealed && quiz}
            <div class="panel quiz" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
              <div class="panel-h"><h3>{t('iv.quizPrompt')}</h3><span class="eyebrow">Quiz</span></div>
              <div class="qopts">
                {#each quiz as o, i}
                  <button class="qopt" class:picked={pick === i} class:correct={pick != null && o.ok} class:wrong={pick === i && !o.ok}
                    onclick={() => { if (pick == null) pick = i; }}>
                    <span class="qmark">{#if pick != null}{#if o.ok}✓{:else if pick === i}✗{/if}{/if}</span>
                    <span class="qt">{@html o.t}</span>
                  </button>
                {/each}
              </div>
              {#if pick != null}
                <p class="qwhy" in:fly={{ y: 6, duration: dur(D.base), easing: ease }}>{@html quiz[pick].why}</p>
              {/if}
            </div>
          {/if}

          <!-- 關聯章節 -->
          {#if related.length}
            <div class="rel">
              <span class="eyebrow">{t('iv.related')}</span>
              <div class="rchips">
                {#each related as r}<button class="chip" onclick={() => go(r.id)}>{r.t}</button>{/each}
              </div>
            </div>
          {/if}
        </div>
      {/key}
    </div>
  {/if}
</main>

<style>
  .kicker { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }

  .trap {
    max-width: 960px; margin: 0 auto var(--sp-4); color: var(--ink-2);
    font-size: var(--fs-body); line-height: var(--lh-body);
    border-left: 3px solid var(--accent); padding: 4px 0 4px 14px; background: none;
  }

  .pts { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-3); }
  .pt { display: flex; gap: 10px; }
  .pi { color: var(--accent-ink); flex: none; display: flex; align-self: flex-start; margin-top: 1px; }
  .ptx b { display: block; font-size: var(--fs-sm); margin-bottom: 4px; }
  .ptx p { font-size: var(--fs-cap); color: var(--ink-2); line-height: var(--lh-snug); }

  .think {
    max-width: 960px; margin: var(--sp-5) auto var(--sp-4); display: flex; align-items: center;
    justify-content: space-between; gap: var(--sp-3); flex-wrap: wrap;
    padding: 14px 16px; border: 1px dashed var(--line-2); border-radius: var(--r);
    background: var(--surface-2); color: var(--ink-2); font-size: var(--fs-sm);
  }

  .beat { display: flex; gap: 12px; margin: 10px 0; font-size: var(--fs-body); line-height: var(--lh-body); }
  .beat b { color: var(--accent-ink); }
  .bn {
    font-family: var(--mono); font-size: 12px; color: var(--accent-ink);
    border: 1px solid var(--line-2); border-radius: 99px; width: 22px; height: 22px;
    display: grid; place-items: center; flex: none; margin-top: 1px;
  }
  .more { margin-top: 10px; }

  .extra { margin-top: var(--sp-3); padding-top: var(--sp-3); border-top: 1px solid var(--line); display: grid; gap: var(--sp-3); }
  .ex ul { margin: 6px 0 0; padding-left: 18px; }
  .ex li { font-size: var(--fs-sm); color: var(--ink-2); line-height: var(--lh-snug); margin: 4px 0; }
  .ex.traps li { color: var(--crit, #b23); }

  .rel { max-width: 960px; margin: var(--sp-4) auto 0; }
  .rchips { display: flex; gap: 7px; flex-wrap: wrap; margin-top: 8px; }

  .cats { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--sp-3); max-width: 960px; margin: 0 auto; }
  .catcard {
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    padding: 16px 18px; border: 1px solid var(--line); border-radius: var(--r);
    background: var(--surface); color: var(--ink); text-align: left; transition: border-color .15s, background .15s;
  }
  .catcard:hover:not(:disabled) { border-color: var(--accent); background: var(--surface-2); }
  .catcard:disabled { opacity: .5; }
  .catcard .cc { font-size: var(--fs-cap); color: var(--muted); font-family: var(--mono); flex: none; }

  /* 互動：自評 */
  .selfhint { margin: 2px 0 12px; font-size: var(--fs-sm); color: var(--muted); }
  .bn.chk { cursor: pointer; background: var(--surface); color: var(--accent-ink); padding: 0; transition: background .15s, border-color .15s; }
  .bn.chk:hover { border-color: var(--accent); }
  .bn.chk.on { background: var(--accent); border-color: var(--accent); color: #fff; }
  .selfscore { margin: 12px 0 2px; font-size: var(--fs-sm); color: var(--ink-2); }
  .selfscore b { color: var(--accent-ink); }

  /* 互動：判斷題 */
  .quiz { margin-top: var(--sp-4); }
  .qopts { display: flex; flex-direction: column; gap: 10px; }
  .qopt {
    display: flex; gap: 10px; align-items: flex-start; text-align: left; width: 100%;
    padding: 12px 14px; border: 1px solid var(--line-2); border-radius: var(--r-sm);
    background: var(--surface); color: var(--ink-2); font-size: var(--fs-sm); line-height: var(--lh-snug);
    cursor: pointer; transition: border-color .15s, background .15s;
  }
  .qopt:hover { border-color: var(--accent); }
  .qopt .qmark { flex: none; width: 16px; font-weight: 700; color: var(--muted); }
  .qopt.correct { border-color: var(--teal); background: color-mix(in srgb, var(--teal) 8%, var(--surface)); }
  .qopt.correct .qmark { color: var(--teal); }
  .qopt.wrong { border-color: var(--crit, #b23); background: color-mix(in srgb, var(--crit, #b23) 8%, var(--surface)); }
  .qopt.wrong .qmark { color: var(--crit, #b23); }
  .qwhy { margin: 12px 0 0; font-size: var(--fs-sm); color: var(--ink-2); line-height: var(--lh-body);
    border-left: 3px solid var(--line-2); padding-left: 12px; }

  @media (max-width: 720px) {
    .pts { grid-template-columns: 1fr; }
    .cats { grid-template-columns: 1fr; }
  }
</style>
