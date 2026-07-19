<script>
  // 側欄：頂部 [課程 | 面試] 切換（主導覽），語言切換降級到底部 footer。
  // 課程 mode → GROUPS + CH 自動生成章節清單；
  // 面試 mode → 題庫（搜尋 + 分類 + 題目 label），沿用同一套 .group/.chap 樣式。
  import { GROUPS, idOf } from '../data/chapters.js';
  import { IV_CATS, ivByCat, ivOf, ivLabel, catNameOf } from '../data/interviews.js';
  import { PATHS, pathById, pathSteps, pathText, locText } from '../data/paths.js';
  import { chOf } from '../data/localize.js';
  import { nav, go, goIv, goPath, goPathStep, setMode, hrefCourse, hrefIv, hrefPath, hrefPathStep, onNav } from '../stores/state.svelte.js';
  import { i18n, t } from '../stores/i18n.svelte.js';
  import { isDone, pathStats, openCert } from '../stores/progress.svelte.js';

  const pathGroups = [
    { key: 'journeys', list: PATHS.filter((p) => p.group === 'journey') },
    { key: 'tracks', list: PATHS.filter((p) => p.group === 'track') },
  ];

  // 路線播放器：目前選中的路線 + 步驟目錄（帶連續編號）
  let curPath = $derived(nav.path ? pathById(nav.path) : null);
  let curRef = $derived.by(() => {
    if (!curPath) return null;
    const steps = pathSteps(curPath);
    return nav.step && steps.some((x) => x.ref === nav.step) ? nav.step : steps[0]?.ref;
  });
  function stepInfo(s) {
    if (s.k === 'course') { const id = idOf(s.ref); return { kind: 'course', badge: t('paths.lesson'), label: id >= 0 ? chOf(id).t : s.ref }; }
    return { kind: 'iv', badge: t('paths.challenge'), label: ivLabel(s.ref, i18n.locale) };
  }
  let plan = $derived.by(() => {
    if (!curPath) return [];
    let n = 0;
    return curPath.phases.map((ph) => ({
      label: locText(ph.t, i18n.locale),
      steps: ph.steps.map((s) => { n += 1; return { ...stepInfo(s), n, ref: s.ref, done: isDone(s.k, s.ref) }; }),
    }));
  });

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
    <a class="brand" class:on={nav.mode === 'paths' && nav.path == null} href={hrefPath(null)} onclick={(e) => onNav(e, () => goPath(null))}>
      <span class="bname">{t('brand')}</span>
    </a>


    {#if nav.mode === 'paths'}
      {#if curPath}
        {@const st = pathStats(curPath)}
        <div class="pathtitle">{pathText(curPath, i18n.locale).title}</div>
        <div class="pathprog">{st.done} / {st.total} {t('paths.certStep')}</div>
        {#each plan as ph, i}
          <div class="group">
            <span class="eyebrow">{String(i + 1).padStart(2, '0')} · {ph.label}</span>
            {#each ph.steps as s}
              <a class="chap pstep" class:sdone={s.done} aria-current={s.ref === curRef} href={hrefPathStep(nav.path, s.ref)} onclick={(e) => onNav(e, () => goPathStep(nav.path, s.ref))}>
                <span class="snum">{#if s.done}<span class="chk">✓</span>{:else}{String(s.n).padStart(2, '0')}{/if}</span>
                <span class="stype {s.kind}">{s.badge}</span>
                <span class="slabel">{s.label}</span>
              </a>
            {/each}
          </div>
        {/each}
        <!-- 終點：結業證書，完成全部步驟才解鎖（仿課程平台把證書放在大綱最後） -->
        <div class="group certgoal">
          {#if st.complete}
            <button class="certrow done" onclick={() => openCert(curPath.id)}>
              <span class="cseal">✓</span><span class="cglabel">{t('paths.certView')}</span><span class="carr">→</span>
            </button>
          {:else}
            <div class="certrow locked">
              <span class="cseal">✓</span><span class="cglabel">{t('paths.certView')}</span>
            </div>
          {/if}
        </div>
      {:else}
        {#each pathGroups as pg}
          <div class="group">
            <span class="eyebrow">{t(`paths.${pg.key}`)}</span>
            {#each pg.list as p}
              <a class="chap ptext" aria-current={p.id === nav.path} href={hrefPath(p.id)} onclick={(e) => onNav(e, () => goPath(p.id))}>
                <span>{pathText(p, i18n.locale).title}</span>
              </a>
            {/each}
          </div>
        {/each}
      {/if}
    {:else if nav.mode === 'interview'}
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


  .ivsearch { padding: 0 6px; margin-bottom: 4px; }
  .ivsearch input {
    width: 100%; background: var(--surface-2); border: 1px solid var(--line-2);
    border-radius: var(--r-sm); padding: 7px 10px; color: var(--ink);
    font-family: inherit; font-size: 12.5px; outline: none;
  }
  .ivsearch input:focus { border-color: var(--accent); }
  .ivdot { font-family: var(--mono); font-size: 11px; color: var(--muted); width: 24px; flex: none; text-align: center; }
  .ptext > span { padding-left: 24px; }

  /* 路線步驟目錄 */
  .pathback { display: inline-block; font-family: var(--mono); font-size: 12px; color: var(--muted); text-decoration: none; padding: 2px 10px 6px; transition: color .15s; }
  .pathback:hover { color: var(--accent-ink); }
  .pathtitle { padding: 0 10px 8px; font-weight: 700; font-size: 14px; letter-spacing: var(--ls-tight); color: var(--ink); }
  .pstep { align-items: flex-start; gap: 8px; }
  .pstep .snum { font-family: var(--mono); font-size: 10.5px; color: var(--muted); flex: none; width: 16px; padding-top: 2px; }
  .pstep .stype { font-family: var(--mono); font-size: 9px; letter-spacing: .03em; flex: none; padding: 2px 5px; border-radius: 5px; border: 1px solid var(--line); margin-top: 1px; white-space: nowrap; }
  .pstep .stype.course { color: var(--accent-ink); background: var(--surface-2); }
  .pstep .stype.iv { color: var(--muted); }
  .pstep .slabel { flex: 1; min-width: 0; line-height: 1.4; }
  .chap[aria-current="true"] .snum { color: var(--accent-ink); }
  .pathprog { padding: 0 10px 12px; font-family: var(--mono); font-size: 11px; color: var(--muted); }
  .certgoal { margin-top: 22px; padding: 0 6px; }
  .certrow { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: var(--r-sm); font-size: 13px; text-align: left; border: 1px dashed var(--line-2); background: none; }
  .certrow .cseal { width: 22px; height: 22px; flex: none; border-radius: 50%; display: grid; place-items: center; font-size: 12px; border: 1px solid var(--line-2); color: var(--muted); }
  .certrow .cglabel { flex: 1; }
  .certrow .carr { color: inherit; }
  .certrow.locked { color: var(--muted); cursor: default; }
  .certrow.done { border-style: solid; border-color: var(--accent); background: var(--accent-soft, rgba(194,102,26,.1)); color: var(--accent-ink); font-weight: 700; cursor: pointer; transition: background .15s, color .15s; }
  .certrow.done:hover { background: var(--accent); color: #fff; }
  .certrow.done .cseal { border-color: currentColor; color: inherit; background: var(--surface); }
  .certrow.done:hover .cseal { background: transparent; }
  .pstep .chk { color: var(--teal); font-weight: 700; }
  .pstep.sdone .slabel { color: var(--muted); }
  .chap[aria-current="true"] .ivdot { color: var(--accent-ink); }
  .soon { display: block; padding: 4px 10px 2px; font-size: 11px; color: var(--muted); font-style: italic; }

</style>
