<script>
  /* 學習路線：右側內容區。nav.path == null → 路線卡片格；否則 → 該路線的路線圖。
     路線只做「策展」：每一步連進既有的課程章／挑戰題，文字取自 data 層。 */
  import { PATHS, pathById, pathSteps, pathText, locText } from '../data/paths.js';
  import { idOf } from '../data/chapters.js';
  import { chOf } from '../data/localize.js';
  import { ivLabel } from '../data/interviews.js';
  import { nav, goPath, go, goIv, hrefPath, hrefCourse, hrefIv, onNav } from '../stores/state.svelte.js';
  import { i18n, t } from '../stores/i18n.svelte.js';
  import { Compass, Wrench, Cpu, PenLine, Library, Bot, ShieldCheck } from '@lucide/svelte';

  const ICONS = { Compass, Wrench, Cpu, PenLine, Library, Bot, ShieldCheck };

  let locale = $derived(i18n.locale);
  let path = $derived(nav.path ? pathById(nav.path) : null);
  const journeys = PATHS.filter((p) => p.group === 'journey');
  const tracks = PATHS.filter((p) => p.group === 'track');

  const countLabel = (p) => `${pathSteps(p).length} ${t('paths.steps')}`;

  // 單一步驟：回傳顯示文字、連結、類別徽章與導覽動作
  function stepInfo(s) {
    if (s.k === 'course') {
      const id = idOf(s.ref);
      return { label: id >= 0 ? chOf(id).t : s.ref, href: hrefCourse(id), badge: t('paths.lesson'), kind: 'course', act: () => go(id) };
    }
    return { label: ivLabel(s.ref, locale), href: hrefIv(s.ref), badge: t('paths.challenge'), kind: 'iv', act: () => goIv(s.ref) };
  }

  // 展開成帶連續編號的階段清單
  let plan = $derived.by(() => {
    if (!path) return null;
    let n = 0;
    return path.phases.map((ph) => ({
      label: locText(ph.t, locale),
      steps: ph.steps.map((s) => { n += 1; return { ...stepInfo(s), n }; }),
    }));
  });
</script>

<main class="stage">
  {#if !path}
    <!-- 落地頁：路線卡片格 -->
    <div class="phead">
      <span class="eyebrow">{t('paths.landingTitle')}</span>
      <h1>{t('paths.landingTitle')}</h1>
      <p class="lede">{t('paths.landingLede')}</p>
    </div>

    <section class="pgroup">
      <div class="grouphead"><h2>{t('paths.journeys')}</h2><span class="ghint">{t('paths.journeysHint')}</span></div>
      <div class="grid grid-j">
        {#each journeys as p}
          {@const tx = pathText(p, locale)}
          <a class="pcard j" href={hrefPath(p.id)} onclick={(e) => onNav(e, () => goPath(p.id))}>
            <div class="pc-title"><h3>{tx.title}</h3><span class="pc-time">{locText(p.time, locale)}</span></div>
            <p class="pc-line">{tx.tagline}</p>
            <p class="pc-who"><span>{t('paths.forWho')}</span>{tx.who}</p>
            <div class="pc-foot">{countLabel(p)} <span class="arrow">→</span></div>
          </a>
        {/each}
      </div>
    </section>

    <section class="pgroup">
      <div class="grouphead"><h2>{t('paths.tracks')}</h2><span class="ghint">{t('paths.tracksHint')}</span></div>
      <div class="grid grid-t">
        {#each tracks as p}
          {@const tx = pathText(p, locale)}
          <a class="pcard t" href={hrefPath(p.id)} onclick={(e) => onNav(e, () => goPath(p.id))}>
            <div class="pc-title"><h3>{tx.title}</h3><span class="pc-time">{locText(p.time, locale)}</span></div>
            <p class="pc-line">{tx.tagline}</p>
            <div class="pc-foot">{countLabel(p)} <span class="arrow">→</span></div>
          </a>
        {/each}
      </div>
    </section>
  {:else}
    <!-- 路線圖 -->
    {@const tx = pathText(path, locale)}
    {@const Icon = ICONS[path.icon]}
    <a class="back" href={hrefPath(null)} onclick={(e) => onNav(e, () => goPath(null))}>{t('paths.back')}</a>
    <div class="rhead">
      <span class="r-icon"><Icon size={34} strokeWidth={1.6} /></span>
      <div>
        <div class="kicker"><span class="eyebrow">{path.group === 'journey' ? t('paths.journeys') : t('paths.tracks')}</span><span class="dotsep">·</span><span class="r-count">{countLabel(path)}</span></div>
        <h1>{tx.title}</h1>
        <p class="lede">{tx.tagline}</p>
        <p class="r-who"><span>{t('paths.forWho')}</span>{tx.who}</p>
      </div>
    </div>

    <div class="roadmap">
      {#each plan as ph, i}
        <section class="phase">
          <div class="phase-head"><span class="phase-n">{String(i + 1).padStart(2, '0')}</span><h2>{ph.label}</h2></div>
          <ol class="steps">
            {#each ph.steps as s}
              <li>
                <a class="step" href={s.href} onclick={(e) => onNav(e, s.act)}>
                  <span class="s-n">{String(s.n).padStart(2, '0')}</span>
                  <span class="s-badge {s.kind}">{s.badge}</span>
                  <span class="s-label">{s.label}</span>
                  <span class="s-go">→</span>
                </a>
              </li>
            {/each}
          </ol>
        </section>
      {/each}
    </div>
  {/if}
</main>

<style>
  .phead, .rhead, .roadmap, .pgroup { max-width: 960px; margin-left: auto; margin-right: auto; }

  .phead { padding-bottom: 22px; margin-bottom: 28px; border-bottom: 1px solid var(--line); }
  .phead .eyebrow { display: block; margin-bottom: 12px; }
  .phead h1 { font-size: var(--fs-display); line-height: var(--lh-tight); letter-spacing: var(--ls-tight); font-weight: 680; margin-bottom: 10px; }
  .phead .lede { color: var(--ink-2); max-width: 60ch; font-size: var(--fs-lede); line-height: var(--lh-snug); }

  .pgroup { margin-bottom: 38px; }
  .grouphead { display: flex; align-items: baseline; gap: 12px; margin-bottom: 14px; }
  .grouphead h2 { font-size: 15px; font-weight: 700; letter-spacing: var(--ls-tight); }
  .ghint { font-size: 12.5px; color: var(--muted); }

  .grid { display: grid; gap: 14px; }
  .grid-j { grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); }
  .grid-t { grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); }

  .pcard {
    display: flex; flex-direction: column; text-decoration: none; color: var(--ink);
    background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-md, 14px);
    padding: 18px 18px 16px; transition: border-color .15s, box-shadow .15s, transform .15s;
    position: relative;
  }
  .pcard:hover { border-color: var(--accent); box-shadow: 0 6px 22px rgba(20, 30, 50, .09); transform: translateY(-2px); }
  .pcard:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .pc-title { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-bottom: 6px; }
  .pcard h3 { font-size: 18px; font-weight: 700; letter-spacing: var(--ls-tight); }
  .pc-time { font-family: var(--mono); font-size: 11.5px; color: var(--muted); white-space: nowrap; flex: none; }
  .pc-line { font-size: 13.5px; color: var(--ink-2); line-height: 1.5; }
  .pc-who { font-size: 12.5px; color: var(--muted); margin-top: 12px; line-height: 1.5; }
  .pc-who span { color: var(--accent-ink); font-weight: 600; margin-right: 6px; }
  .pc-foot { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 12px; border-top: 1px solid var(--line); font-family: var(--mono); font-size: 12px; color: var(--muted); }
  .arrow { color: var(--accent-ink); font-weight: 700; }

  /* ---- 路線圖 ---- */
  .back { display: inline-block; font-family: var(--mono); font-size: 12.5px; color: var(--muted); text-decoration: none; margin-bottom: 18px; transition: color .15s; }
  .back:hover { color: var(--accent-ink); }
  .rhead { display: flex; gap: 18px; align-items: flex-start; padding-bottom: 24px; margin-bottom: 26px; border-bottom: 1px solid var(--line); }
  .r-icon { display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 14px; background: var(--surface-2); border: 1px solid var(--line); color: var(--accent-ink); flex: none; }
  .kicker { display: flex; align-items: center; gap: 9px; margin-bottom: 12px; }
  .dotsep { color: var(--muted); }
  .r-count { font-family: var(--mono); font-size: 12px; color: var(--muted); }
  .rhead h1 { font-size: var(--fs-display); line-height: var(--lh-tight); letter-spacing: var(--ls-tight); font-weight: 680; margin-bottom: 8px; }
  .rhead .lede { color: var(--ink-2); max-width: 60ch; font-size: var(--fs-lede); line-height: var(--lh-snug); }
  .r-who { font-size: 13px; color: var(--muted); margin-top: 12px; }
  .r-who span { color: var(--accent-ink); font-weight: 600; margin-right: 6px; }

  .roadmap { display: flex; flex-direction: column; gap: 26px; }
  .phase-head { display: flex; align-items: baseline; gap: 12px; margin-bottom: 12px; }
  .phase-n { font-family: var(--mono); font-size: 12px; color: var(--accent-ink); font-weight: 700; }
  .phase-head h2 { font-size: 15px; font-weight: 700; letter-spacing: var(--ls-tight); }
  .steps { list-style: none; display: flex; flex-direction: column; gap: 7px; padding-left: 0; }

  .step {
    display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--ink);
    background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-sm);
    padding: 10px 14px; transition: border-color .15s, background .15s;
  }
  .step:hover { border-color: var(--accent); background: var(--surface-2); }
  .step:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .s-n { font-family: var(--mono); font-size: 11px; color: var(--muted); width: 20px; flex: none; }
  .s-badge { font-family: var(--mono); font-size: 10px; letter-spacing: .04em; padding: 2px 7px; border-radius: 999px; flex: none; border: 1px solid var(--line); }
  .s-badge.course { color: var(--accent-ink); background: var(--surface-2); }
  .s-badge.iv { color: var(--ink-2); background: var(--surface); }
  .s-label { flex: 1; font-size: 14px; }
  .s-go { color: var(--muted); font-family: var(--mono); }
  .step:hover .s-go { color: var(--accent-ink); }

  @media (max-width: 640px) {
    .rhead { gap: 12px; }
    .r-icon { font-size: 34px; }
  }
</style>
