<script>
  // 側欄：頂部 [課程 | 面試] 切換（主導覽），語言切換降級到底部 footer。
  // 課程 mode → GROUPS + CH 自動生成章節清單；
  // 面試 mode → 題庫（搜尋 + 分類 + 題目 label），沿用同一套 .group/.chap 樣式。
  import { GROUPS } from '../data/chapters.js';
  import { IV_CATS, ivByCat, ivOf, ivLabel, catNameOf } from '../data/interviews.js';
  import { chOf } from '../data/localize.js';
  import { nav, go, goIv, setMode, hrefCourse, hrefIv, onNav } from '../stores/state.svelte.js';
  import { i18n, setLocale, t } from '../stores/i18n.svelte.js';
  import { LOCALES, messages } from '../i18n/index.js';

  let q = $state('');
  let cats = $derived(
    IV_CATS.map((c) => {
      let ids = ivByCat(c.key);
      const needle = q.trim().toLowerCase();
      if (needle) ids = ids.filter((id) => (ivLabel(id, i18n.locale) + ivOf(id, i18n.locale).q).toLowerCase().includes(needle));
      return { key: c.key, name: catNameOf(c.key, i18n.locale), ids };
    }),
  );
</script>

<nav class="nav">
  <div class="nav-scroll">
    <a class="brand" class:on={nav.mode === 'course' && nav.current == null} href={hrefCourse(null)} onclick={(e) => onNav(e, () => go(null))}>
      <span class="blogo">🎓</span><span class="bname">{t('brand')}</span>
    </a>

    <div class="modesw" role="group" aria-label="Course / Interview">
      <a class="ms" class:on={nav.mode === 'course'} href={hrefCourse(null)} onclick={(e) => onNav(e, () => setMode('course'))}>{t('iv.course')}</a>
      <a class="ms" class:on={nav.mode === 'interview'} href={hrefIv(null)} onclick={(e) => onNav(e, () => setMode('interview'))}>{t('iv.interview')}</a>
    </div>

    {#if nav.mode === 'interview'}
      <div class="ivsearch"><input placeholder={t('iv.search')} bind:value={q} autocomplete="off" /></div>
      {#each cats as c}
        {#if !q.trim() || c.ids.length}
          <div class="group">
            <span class="eyebrow">{c.name}{#if c.ids.length} · {c.ids.length}{/if}</span>
            {#if c.ids.length}
              {#each c.ids as id}
                <a class="chap" aria-current={id === nav.iv} href={hrefIv(id)} onclick={(e) => onNav(e, () => goIv(id))}>
                  <span class="ivdot">◦</span><span>{ivLabel(id, i18n.locale)}</span>
                </a>
              {/each}
            {:else}
              <span class="soon">{t('iv.soon')}</span>
            {/if}
          </div>
        {/if}
      {/each}
    {:else}
      {#each GROUPS as g}
        <div class="group">
          <span class="eyebrow">{t(`group.${g.key}`)}</span>
          {#each g.ids as id}
            <a class="chap" aria-current={id === nav.current} href={hrefCourse(id)} onclick={(e) => onNav(e, () => go(id))}>
              <span class="num">{String(id).padStart(2, '0')}</span>
              <span>{chOf(id).t}</span>
            </a>
          {/each}
        </div>
      {/each}
    {/if}
  </div>

  <div class="navfoot">
    <div class="lang" role="group" aria-label="Language / 語言">
      {#each LOCALES as l}
        <button class="lg" class:on={i18n.locale === l} onclick={() => setLocale(l)}>{messages[l].langName}</button>
      {/each}
    </div>
  </div>
</nav>

<style>
  /* 覆蓋全域 .nav：改成上捲動 + 底部固定 footer */
  .nav { display: flex; flex-direction: column; overflow: hidden; padding: 0; }
  .nav-scroll { flex: 1; min-height: 0; overflow-y: auto; padding: 18px 12px 20px; scrollbar-width: none; }
  .nav-scroll::-webkit-scrollbar { width: 0; height: 0; background: transparent; }

  .brand {
    display: flex; align-items: center; gap: 9px; width: 100%; text-align: left;
    padding: 6px 10px 8px; margin-bottom: 10px; background: none; border: none;
    color: var(--ink); font-weight: 700; font-size: 15px; letter-spacing: var(--ls-tight);
    border-radius: var(--r-sm); transition: background .15s; text-decoration: none;
  }
  .brand:hover { background: var(--surface-2); }
  .brand.on { color: var(--accent-ink); }
  .brand .blogo { font-size: 17px; }

  /* 主導覽：mode 切換（唯一的強控制，深色選中） */
  .modesw { display: flex; gap: 4px; padding: 0 6px; margin-bottom: 12px; }
  .ms {
    flex: 1; padding: 7px 6px; border: 1px solid var(--line); border-radius: var(--r-sm);
    background: var(--surface); color: var(--muted); font-size: 12.5px; font-weight: 600; transition: .15s;
    text-align: center; text-decoration: none; cursor: pointer;
  }
  .ms:hover { border-color: var(--accent); color: var(--accent-ink); }
  .ms.on { background: var(--ink); border-color: transparent; color: var(--surface); }

  .ivsearch { padding: 0 6px; margin-bottom: 4px; }
  .ivsearch input {
    width: 100%; background: var(--surface-2); border: 1px solid var(--line-2);
    border-radius: var(--r-sm); padding: 7px 10px; color: var(--ink);
    font-family: inherit; font-size: 12.5px; outline: none;
  }
  .ivsearch input:focus { border-color: var(--accent); }
  .ivdot { font-family: var(--mono); font-size: 11px; color: var(--muted); width: 24px; flex: none; text-align: center; }
  .chap[aria-current="true"] .ivdot { color: var(--accent-ink); }
  .soon { display: block; padding: 4px 10px 2px; font-size: 11px; color: var(--muted); font-style: italic; }

  /* 底部：語言切換（次要，輕量文字鈕，不用實心膠囊） */
  .navfoot { flex: none; border-top: 1px solid var(--line); padding: 9px 12px; background: var(--surface); }
  .lang { display: flex; gap: 2px; }
  .lg {
    flex: 1; padding: 5px 4px; border: none; background: none; color: var(--muted);
    font-size: 11.5px; font-weight: 600; border-radius: var(--r-sm); transition: .15s; white-space: nowrap;
  }
  .lg:hover { color: var(--accent-ink); background: var(--surface-2); }
  .lg.on { color: var(--accent-ink); background: var(--surface-2); }
</style>
