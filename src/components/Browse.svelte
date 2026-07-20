<script>
  /* 課程目錄（Browse）：全寬的卡片式陳列層，補上「逛」的入口。
     - lessons  依 GROUPS（主題）陳列所有課程卡，連到 /course/<slug>
     - challenges 依 IV_CATS（分類）陳列所有挑戰題，連到 /challenge/<id>
     一個輕量頁首（回首頁 + 兩個分頁 + 搜尋），單頁自足，不依賴側欄。 */
  import { GROUPS, TOTAL } from '../data/chapters.js';
  import { chOf } from '../data/localize.js';
  import { IV_CATS, IV_ORDER, ivByCat, ivLabel, ivOf, catNameOf } from '../data/interviews.js';
  import { nav, go, goIv, goBrowse, goPath, hrefCourse, hrefIv, hrefPath, hrefBrowse, onNav } from '../stores/state.svelte.js';
  import { t, i18n } from '../stores/i18n.svelte.js';
  import { fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';

  let q = $state('');
  let needle = $derived(q.trim().toLowerCase());
  let locale = $derived(i18n.locale);

  // 課程：依主題群組，過濾標題/副標
  let lessonGroups = $derived(
    GROUPS.map((g) => ({
      key: g.key,
      ids: g.ids.filter((id) => {
        if (!needle) return true;
        const c = chOf(id);
        return (c.t + ' ' + (c.sub || '')).toLowerCase().includes(needle);
      }),
    })).filter((g) => g.ids.length),
  );

  // 挑戰：依分類，過濾題目 label + 題幹
  let challengeCats = $derived(
    IV_CATS.map((c) => ({
      key: c.key,
      name: catNameOf(c.key, locale),
      ids: ivByCat(c.key).filter((id) => {
        if (!needle) return true;
        return (ivLabel(id, locale) + ' ' + ivOf(id, locale).q).toLowerCase().includes(needle);
      }),
    })).filter((c) => c.ids.length),
  );

  const isLessons = $derived(nav.browse !== 'challenges');
</script>

<main class="stage browse">
  <header class="bhead">
    <a class="bh-home" href={hrefPath(null)} onclick={(e) => onNav(e, () => goPath(null))}>
      <span class="bh-arrow">←</span>{t('brand')}
    </a>
    <div class="tabs" role="tablist">
      <a class="tab" class:on={isLessons} role="tab" aria-selected={isLessons}
        href={hrefBrowse('lessons')} onclick={(e) => onNav(e, () => goBrowse('lessons'))}>
        {t('browse.lessonsTab')}<span class="tn">{TOTAL}</span>
      </a>
      <a class="tab" class:on={!isLessons} role="tab" aria-selected={!isLessons}
        href={hrefBrowse('challenges')} onclick={(e) => onNav(e, () => goBrowse('challenges'))}>
        {t('browse.challengesTab')}<span class="tn">{IV_ORDER.length}</span>
      </a>
    </div>
  </header>

  {#key isLessons}
    <div class="bwrap" in:fly={{ y: 10, duration: dur(D.base), easing: ease }}>
      <div class="bhero">
        <h1>{isLessons ? t('browse.lessonsTitle') : t('browse.challengesTitle')}</h1>
        <p class="lede">{t('browse.lede')}</p>
        <div class="searchbar">
          <input placeholder={isLessons ? t('browse.searchLessons') : t('browse.searchChallenges')} bind:value={q} autocomplete="off" />
        </div>
      </div>

      {#if isLessons}
        {#if lessonGroups.length}
          {#each lessonGroups as g}
            <section class="topic">
              <div class="topic-h">
                <span class="eyebrow">{t('group.' + g.key)}</span>
                <span class="topic-n">{g.ids.length} {t('browse.lessonsUnit')}</span>
              </div>
              <div class="lgrid">
                {#each g.ids as id}
                  {@const c = chOf(id)}
                  <a class="lcard" href={hrefCourse(id)} onclick={(e) => onNav(e, () => go(id))}>
                    <span class="ln">{String(id).padStart(2, '0')}</span>
                    <span class="lt">{c.t}</span>
                    <span class="ls">{c.sub}</span>
                  </a>
                {/each}
              </div>
            </section>
          {/each}
        {:else}
          <p class="empty">{t('browse.noMatch')}</p>
        {/if}
      {:else if challengeCats.length}
        <div class="cgrid">
          {#each challengeCats as c}
            <section class="ccard">
              <div class="cc-h">
                <h3>{c.name}</h3><span class="cc-count">{c.ids.length}</span>
              </div>
              <ul class="cc-list">
                {#each c.ids as id}
                  <li>
                    <a href={hrefIv(id)} onclick={(e) => onNav(e, () => goIv(id))}>
                      <span class="cdot">◦</span><span>{ivLabel(id, locale)}</span>
                    </a>
                  </li>
                {/each}
              </ul>
            </section>
          {/each}
        </div>
      {:else}
        <p class="empty">{t('browse.noMatch')}</p>
      {/if}
    </div>
  {/key}
</main>

<style>
  .browse { max-width: none; }
  .bwrap { max-width: 1040px; margin: 0 auto; }

  /* 頁首：回首頁 + 分頁 */
  .bhead {
    max-width: 1040px; margin: 0 auto 8px; display: flex; align-items: center;
    justify-content: space-between; gap: 16px; flex-wrap: wrap;
  }
  .bh-home {
    display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px;
    color: var(--ink); text-decoration: none; letter-spacing: var(--ls-tight);
    padding: 6px 0; transition: color .15s;
  }
  .bh-home:hover { color: var(--accent-ink); }
  .bh-arrow { font-family: var(--mono); color: var(--muted); }
  .bh-home:hover .bh-arrow { color: var(--accent-ink); }

  .tabs { display: flex; gap: 4px; }
  .tab {
    display: inline-flex; align-items: center; gap: 8px; padding: 8px 15px; border-radius: var(--r-sm);
    font-size: 14px; font-weight: 650; color: var(--muted); text-decoration: none;
    border: 1px solid transparent; transition: color .15s, background .15s, border-color .15s;
  }
  .tab:hover { color: var(--ink); background: var(--surface-2); }
  .tab.on { color: var(--ink); background: var(--surface); border-color: var(--line); box-shadow: 0 1px 2px rgba(10,20,40,.05); }
  .tab .tn { font-family: var(--mono); font-size: 11px; font-weight: 600; color: var(--muted); }
  .tab.on .tn { color: var(--accent-ink); }

  .bhero { padding: 14px 0 22px; border-bottom: 1px solid var(--line); margin-bottom: 26px; }
  .bhero h1 { font-size: var(--fs-display); line-height: var(--lh-tight); letter-spacing: var(--ls-tight); font-weight: 680; margin: 0 0 10px; }
  .bhero .lede { color: var(--ink-2); max-width: 62ch; font-size: var(--fs-lede); line-height: var(--lh-snug); margin: 0 0 18px; }
  .searchbar input {
    width: 100%; max-width: 380px; padding: 9px 13px; border-radius: var(--r-sm);
    border: 1px solid var(--line-2); background: var(--surface); color: var(--ink);
    font-family: inherit; font-size: 13.5px; outline: none; transition: border-color .15s;
  }
  .searchbar input:focus { border-color: var(--accent); }

  /* 課程：主題分區 + 卡片 */
  .topic { margin-bottom: 30px; }
  .topic-h {
    display: flex; align-items: baseline; justify-content: space-between; gap: 12px;
    margin-bottom: 13px; padding-bottom: 9px; border-bottom: 1px solid var(--line);
  }
  .topic-n { font-family: var(--mono); font-size: 11px; color: var(--muted); }
  .lgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 11px; }
  .lcard {
    position: relative; display: block; padding: 14px 15px 15px 18px; text-decoration: none;
    background: var(--surface); border: 1px solid var(--line); border-radius: var(--r);
    box-shadow: 0 1px 2px rgba(10,20,40,.04); transition: transform .13s, box-shadow .15s, border-color .15s;
  }
  .lcard::before { content: ""; position: absolute; left: 0; top: 12px; bottom: 12px; width: 3px; border-radius: 3px; background: var(--accent); opacity: .75; }
  .lcard:hover { transform: translateY(-2px); box-shadow: 0 6px 22px rgba(20,30,50,.09); border-color: var(--line-2); }
  .lcard:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .lcard .ln { font-family: var(--mono); font-size: 11px; color: var(--muted); font-variant-numeric: tabular-nums; }
  .lcard .lt { display: block; font-size: 14.5px; font-weight: 660; color: var(--ink); letter-spacing: var(--ls-tight); margin: 3px 0; }
  .lcard .ls { display: block; font-size: 12px; color: var(--muted); line-height: 1.45; }

  /* 挑戰：分類卡片 + 題目清單 */
  .cgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 14px; align-items: start; }
  .ccard { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); box-shadow: 0 1px 2px rgba(10,20,40,.04); padding: 16px 18px; }
  .cc-h { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .cc-h h3 { font-size: 15px; font-weight: 700; letter-spacing: var(--ls-tight); margin: 0; }
  .cc-count { font-family: var(--mono); font-size: 11px; font-weight: 600; color: var(--teal); background: var(--surface-2); border: 1px solid var(--line); padding: 2px 9px; border-radius: 20px; }
  .cc-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  .cc-list a { display: flex; align-items: baseline; gap: 8px; padding: 6px 8px; margin: 0 -8px; border-radius: var(--r-sm); font-size: 13px; color: var(--ink-2); text-decoration: none; transition: background .13s, color .13s; }
  .cc-list a:hover { background: var(--surface-2); color: var(--accent-ink); }
  .cdot { font-family: var(--mono); font-size: 11px; color: var(--muted); flex: none; }
  .cc-list a:hover .cdot { color: var(--accent-ink); }

  .empty { color: var(--muted); font-size: 14px; padding: 20px 0; }

  @media (max-width: 720px) {
    .bhero h1 { font-size: 28px; }
    .lgrid, .cgrid { grid-template-columns: 1fr; }
  }
</style>
