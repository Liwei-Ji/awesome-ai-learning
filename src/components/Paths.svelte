<script>
  /* 學習路線：
     - nav.path == null → 落地頁（hero + 知識地圖 + 路線卡片），全寬無側欄。
     - nav.path 有值   → 引導播放器：側邊欄放這條路線的步驟目錄（見 SideNav），
       右側直接播放「目前步驟」的內容（課程頁 Stage 或挑戰頁 Interview），單一來源重用。 */
  import { PATHS, pathById, pathSteps, pathText, locText } from '../data/paths.js';
  import { idOf, CH } from '../data/chapters.js';
  import { IV_ORDER } from '../data/interviews.js';
  import { nav, go, goPath, setMode, hrefPath, hrefCourse, hrefIv, onNav } from '../stores/state.svelte.js';
  import { i18n, t } from '../stores/i18n.svelte.js';
  import HomeContent from './HomeContent.svelte';
  import Stage from './Stage.svelte';
  import Interview from './Interview.svelte';
  import Certificate from './Certificate.svelte';
  import { progress, markDone, pathStats } from '../stores/progress.svelte.js';

  let locale = $derived(i18n.locale);
  let path = $derived(nav.path ? pathById(nav.path) : null);
  const journeys = PATHS.filter((p) => p.group === 'journey');
  const tracks = PATHS.filter((p) => p.group === 'track');
  const courseCount = Object.keys(CH).length;     // 課程頁數（動態，不寫死）
  const challengeCount = IV_ORDER.length;          // 挑戰題數（動態，不寫死）
  const countLabel = (p) => `${pathSteps(p).length} ${t('paths.steps')}`;

  // 目前步驟：依 nav.step（ref）挑；沒有就落在第一步
  let curStep = $derived.by(() => {
    if (!path) return null;
    const steps = pathSteps(path);
    const chosen = (nav.step && steps.find((x) => x.ref === nav.step)) || steps[0];
    if (!chosen) return null;
    return chosen.k === 'course'
      ? { k: 'course', ref: chosen.ref, chId: idOf(chosen.ref) }
      : { k: 'iv', ref: chosen.ref };
  });

  // 走到某步就記為完成（跨路線共用）。導覽走側邊欄目錄；證書由側欄「結業證書」按鈕領取。
  $effect(() => { if (curStep) markDone(curStep.k, curStep.ref); });
</script>

{#if !path}
  <main class="stage">
    <!-- 落地頁：首頁內容（hero + 知識地圖）在上，學習路線在下 -->
    <HomeContent />
    <div class="phead psep">
      <h1>{t('paths.landingTitle')}</h1>
      <p class="lede">{t('paths.landingLede')}</p>
    </div>

    <section class="pgroup">
      <div class="grouphead"><h2>{t('paths.journeys')}</h2><span class="ghint">{t('paths.journeysHint')}</span></div>
      <div class="grid grid-j">
        {#each journeys as p}
          {@const tx = pathText(p, locale)}
          {@const st = pathStats(p)}
          <a class="pcard j" class:complete={st.complete} href={hrefPath(p.id)} onclick={(e) => onNav(e, () => goPath(p.id))}>
            <div class="pc-title"><h3>{tx.title}</h3><span class="pc-time">{locText(p.time, locale)}</span></div>
            <p class="pc-line">{tx.tagline}</p>
            <p class="pc-who"><span>{t('paths.forWho')}</span>{tx.who}</p>
            <div class="pc-foot">
              {#if st.complete}<span class="pc-done">✓ {t('paths.done')}</span>{:else}<span>{st.done} / {st.total}</span>{/if}
              <span class="arrow">→</span>
            </div>
          </a>
        {/each}
      </div>
    </section>

    <section class="pgroup">
      <div class="grouphead"><h2>{t('paths.tracks')}</h2><span class="ghint">{t('paths.tracksHint')}</span></div>
      <div class="grid grid-t">
        {#each tracks as p}
          {@const tx = pathText(p, locale)}
          {@const st = pathStats(p)}
          <a class="pcard t" class:complete={st.complete} href={hrefPath(p.id)} onclick={(e) => onNav(e, () => goPath(p.id))}>
            <div class="pc-title"><h3>{tx.title}</h3><span class="pc-time">{locText(p.time, locale)}</span></div>
            <p class="pc-line">{tx.tagline}</p>
            <div class="pc-foot">
              {#if st.complete}<span class="pc-done">✓ {t('paths.done')}</span>{:else}<span>{st.done} / {st.total}</span>{/if}
              <span class="arrow">→</span>
            </div>
          </a>
        {/each}
      </div>
    </section>

    <section class="pgroup">
      <div class="grouphead"><h2>{t('paths.browseTitle')}</h2><span class="ghint">{t('paths.browseHint')}</span></div>
      <div class="grid grid-t">
        <a class="pcard t" href={hrefCourse(0)} onclick={(e) => onNav(e, () => go(0))}>
          <div class="pc-title"><h3>{t('iv.course')}</h3><span class="pc-time">{courseCount} {t('paths.certLesson')}</span></div>
          <p class="pc-line">{t('paths.courseLede')}</p>
          <div class="pc-foot">{t('paths.courseFoot')} <span class="arrow">→</span></div>
        </a>
        <a class="pcard t" href={hrefIv(null)} onclick={(e) => onNav(e, () => setMode('interview'))}>
          <div class="pc-title"><h3>{t('iv.interview')}</h3><span class="pc-time">{challengeCount} {t('paths.certChallenge')}</span></div>
          <p class="pc-line">{t('paths.challengeLede')}</p>
          <div class="pc-foot">{t('paths.challengeFoot')} <span class="arrow">→</span></div>
        </a>
      </div>
    </section>
  </main>
{:else if curStep?.k === 'course'}
  <Stage id={curStep.chId} />
{:else if curStep}
  <Interview id={curStep.ref} />
{/if}

{#if progress.certFor && pathById(progress.certFor)}
  <Certificate path={pathById(progress.certFor)} />
{/if}

<style>
  .phead, .pgroup { max-width: 960px; margin-left: auto; margin-right: auto; }

  .phead { padding-bottom: 22px; margin-bottom: 28px; border-bottom: 1px solid var(--line); }
  .phead.psep { margin-top: 40px; padding-top: 34px; border-top: 1px solid var(--line); }
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
  .pc-done { color: var(--teal); font-weight: 700; }
  .pcard.complete { border-color: color-mix(in srgb, var(--teal) 45%, var(--line)); }
</style>
