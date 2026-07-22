<script>
  /* 學習路線：
     - nav.path == null → 落地頁（hero + 知識地圖 + 路線卡片），全寬無側欄。
     - nav.path 有值   → 引導播放器：側邊欄放這條路線的步驟目錄（見 SideNav），
       右側直接播放「目前步驟」的內容（課程頁 Stage 或挑戰頁 Interview），單一來源重用。 */
  import { PATHS, pathById, pathSteps, pathText, locText, pathOutcomes } from '../data/paths.js';
  import { idOf, CH } from '../data/chapters.js';
  import { chOf } from '../data/localize.js';
  import { IV_ORDER, IV_CATS, ivLabel } from '../data/interviews.js';
  import { nav, goPath, goPathStep, goBrowse, hrefPath, hrefBrowse, onNav } from '../stores/state.svelte.js';
  import { i18n, t } from '../stores/i18n.svelte.js';
  import KnowledgeMap from './KnowledgeMap.svelte';
  import Stage from './Stage.svelte';
  import Interview from './Interview.svelte';
  import Certificate from './Certificate.svelte';
  import { progress, markDone, pathStats, isDone } from '../stores/progress.svelte.js';
  import { slide } from 'svelte/transition';

  let locale = $derived(i18n.locale);
  let path = $derived(nav.path ? pathById(nav.path) : null);
  const journeys = PATHS.filter((p) => p.group === 'journey');
  const tracks = PATHS.filter((p) => p.group === 'track');
  const courseCount = Object.keys(CH).length;     // 課程頁數（動態，不寫死）
  const challengeCount = IV_ORDER.length;          // 挑戰題數（動態，不寫死）
  const catCount = IV_CATS.length;                 // 挑戰題分類數（動態，不寫死）
  const countLabel = (p) => `${pathSteps(p).length} ${t('paths.steps')}`;
  const pathCount = PATHS.length;
  function scrollToId(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

  // 知識地圖：預設收合，點按鈕才展開（避免整張圖霸佔頁尾）
  let showMap = $state(false);
  function toggleMap() {
    showMap = !showMap;
    if (showMap) setTimeout(() => scrollToId('knowledge-map'), 90);
  }

  // 目前步驟：只在 nav.step 有指定時才進播放器；沒有 step＝停在路線總覽（先看「你將學到什麼」）
  let curStep = $derived.by(() => {
    if (!path || !nav.step) return null;
    const chosen = pathSteps(path).find((x) => x.ref === nav.step);
    if (!chosen) return null;
    return chosen.k === 'course'
      ? { k: 'course', ref: chosen.ref, chId: idOf(chosen.ref) }
      : { k: 'iv', ref: chosen.ref };
  });

  // 走到某步就記為完成（跨路線共用）。導覽走側邊欄目錄；證書由側欄「結業證書」按鈕領取。
  $effect(() => { if (curStep) markDone(curStep.k, curStep.ref); });

  // 路線總覽：分階段列出步驟（含編號、類型徽章、完成狀態）
  function stepInfo(s) {
    if (s.k === 'course') { const id = idOf(s.ref); return { kind: 'course', badge: t('paths.lesson'), label: id >= 0 ? chOf(id).t : s.ref }; }
    return { kind: 'iv', badge: t('paths.challenge'), label: ivLabel(s.ref, locale) };
  }
  let overviewPlan = $derived.by(() => {
    if (!path) return [];
    let n = 0;
    return path.phases.map((ph) => ({
      label: locText(ph.t, locale),
      steps: ph.steps.map((s) => { n += 1; return { ...stepInfo(s), n, ref: s.ref, done: isDone(s.k, s.ref) }; }),
    }));
  });
  // 起點：第一個未完成的步驟（沒有進度就第一步）→ 決定「開始／繼續」
  let startRef = $derived.by(() => {
    if (!path) return null;
    const steps = pathSteps(path);
    return (steps.find((s) => !isDone(s.k, s.ref)) || steps[0])?.ref;
  });

  // 大綱手風琴：一次開一個；切換路線時重置回第一個
  let openPhase = $state(0);
  $effect(() => { nav.path; openPhase = 0; });
  const togglePhase = (i) => { openPhase = openPhase === i ? -1 : i; };
</script>

{#if !path}
  <main class="stage phome">
    <!-- 目標優先落地頁：hero → 完整路線 → 主題深潛 → 目錄 → 知識地圖（降級到頁尾）-->
    <header class="lhero">
      <div class="hero-art">
        <div class="hero-copy">
          <h1>{t('home.title')}</h1>
          <p class="lede">{t('paths.landingLede')}</p>
        </div>
      </div>
    </header>

    <!-- 副英雄區（第二屏）：概覽數據滿版置中，看不到上方 hero 與下方課程；下接主要行動按鈕 -->
    <section class="statspage">
      <div class="sp-inner">
        <div class="sp-row">
          <div class="sp-stat"><b class="sp-num">{courseCount}</b><span class="sp-label">{t('home.statLessons')}</span></div>
          <div class="sp-stat"><b class="sp-num">{challengeCount}</b><span class="sp-label">{t('home.statChallenges')}</span></div>
          <div class="sp-stat"><b class="sp-num">{pathCount}</b><span class="sp-label">{t('home.statPaths')}</span></div>
          <div class="sp-stat"><b class="sp-num">3</b><span class="sp-label">{t('home.statLangs')}</span></div>
        </div>
        <div class="lcta sp-cta">
          <button class="btn primary" onclick={() => scrollToId('journeys')}>{t('home.ctaPath')} ↓</button>
          <a class="btn ghost" href={hrefBrowse('lessons')} onclick={(e) => onNav(e, () => goBrowse('lessons'))}>{t('home.ctaBrowse')}</a>
        </div>
      </div>
    </section>

    <section class="pgroup" id="journeys">
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
            {#if p.deepens && pathById(p.deepens)}
              <p class="pc-deep"><span>{t('paths.deepens')}</span>{pathText(pathById(p.deepens), locale).title}</p>
            {/if}
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
        <a class="pcard t" href={hrefBrowse('lessons')} onclick={(e) => onNav(e, () => goBrowse('lessons'))}>
          <div class="pc-title"><h3>{t('iv.course')}</h3><span class="pc-time">{courseCount} {t('paths.certLesson')}</span></div>
          <p class="pc-line">{t('paths.courseLede')}</p>
          <div class="pc-foot">{t('paths.courseFoot')} <span class="arrow">→</span></div>
        </a>
        <a class="pcard t" href={hrefBrowse('challenges')} onclick={(e) => onNav(e, () => goBrowse('challenges'))}>
          <div class="pc-title"><h3>{t('iv.interview')}</h3><span class="pc-time">{challengeCount} {t('paths.certChallenge')}</span></div>
          <p class="pc-line">{t('paths.challengeLede')}</p>
          <div class="pc-foot">{catCount} {t('paths.challengeFoot')} <span class="arrow">→</span></div>
        </a>
      </div>
    </section>

    <section class="pgroup mapsection" id="knowledge-map">
      <button class="mapband" onclick={toggleMap} aria-expanded={showMap}>
        <div class="mb-t">
          <h2>{t('home.mapExplore')}</h2>
          <p>{t('home.mapExploreHint')}</p>
        </div>
        <span class="mb-cta">{showMap ? t('home.mapHide') : t('home.mapOpen')} <span class="mb-caret" class:open={showMap}>↓</span></span>
      </button>
      {#if showMap}
        <div class="mapreveal" transition:slide={{ duration: 260 }}>
          <KnowledgeMap />
        </div>
      {/if}
    </section>

    <!-- 頁尾：一條灰線，其下靠右顯示資料來源（短句）與作者 -->
    <footer class="lfoot">
      <p class="lf-src">{t('home.footSource')}</p>
      <p class="lf-by">{t('home.footBy')} <span>Liwei Ji</span></p>
    </footer>
  </main>
{:else if !nav.step}
  <!-- 路線總覽：進入某條路線先看「你將學到什麼」，再按開始進第一課（全寬、無側欄）-->
  {@const tx = pathText(path, locale)}
  {@const st = pathStats(path)}
  {@const outcomes = pathOutcomes(path, locale)}
  <main class="stage poverview">
    <header class="pv-head">
      <h1>{tx.title}</h1>
      <p class="lede">{tx.tagline}</p>
      <p class="pv-who"><span>{t('paths.forWho')}</span>{tx.who}</p>
      <div class="pv-meta">
        <span>{locText(path.time, locale)}</span>
        <span>{pathSteps(path).length} {t('paths.certStep')}</span>
        {#if st.done > 0}<span class="pv-prog">{t('paths.progress')} {st.done} / {st.total}</span>{/if}
      </div>
    </header>

    {#if outcomes.length}
      <section class="pv-learn">
        <h2>{t('paths.learnTitle')}</h2>
        <ul class="pv-outcomes">
          {#each outcomes as o}<li>{o}</li>{/each}
        </ul>
      </section>
    {/if}

    <div class="pv-cta">
      <button class="btn primary" onclick={() => goPathStep(path.id, startRef)}>
        {st.done > 0 ? t('paths.continuePath') : t('paths.startPath')} →
      </button>
      <button class="btn ghost" onclick={() => goPath(null)}>{t('paths.chooseOther')}</button>
    </div>

    <section class="pv-plan">
      <h2>{t('paths.contains')}</h2>
      <div class="acc">
        {#each overviewPlan as ph, i}
          <div class="acc-item" class:open={openPhase === i}>
            <button class="acc-h" onclick={() => togglePhase(i)} aria-expanded={openPhase === i}>
              <span class="acc-n">{String(i + 1).padStart(2, '0')}</span>
              <span class="acc-t">{ph.label}</span>
              <span class="acc-caret" class:open={openPhase === i}>↓</span>
            </button>
            {#if openPhase === i}
              <ul class="acc-body" transition:slide={{ duration: 220 }}>
                {#each ph.steps as s}
                  <li><span class="acc-badge {s.kind}">{s.badge}</span><span class="acc-label">{s.label}</span></li>
                {/each}
              </ul>
            {/if}
          </div>
        {/each}
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
  .phead, .pgroup, .lhero { max-width: 960px; margin-left: auto; margin-right: auto; }
  /* 首頁採整頁式英雄／副英雄（各滿一屏）：移除 stage 上緣留白，讓第一屏貼齊視窗頂端 */
  .phome { padding-top: 0; }

  .phead { padding-bottom: 22px; margin-bottom: 28px; border-bottom: 1px solid var(--line); }
  .phead.psep { margin-top: 40px; padding-top: 34px; border-top: 1px solid var(--line); }
  .phead h1 { font-size: var(--fs-display); line-height: var(--lh-tight); letter-spacing: var(--ls-tight); font-weight: 680; margin-bottom: 10px; }
  .phead .lede { color: var(--ink-2); max-width: 60ch; font-size: var(--fs-lede); line-height: var(--lh-snug); }

  /* 目標優先 hero：滿版第一屏，垂直置中；下一段（路線）落在折線外，無區隔線 */
  .lhero {
    min-height: 100vh; box-sizing: border-box;
    display: flex; flex-direction: column; justify-content: center;
    padding: 48px 0;
  }
  .lhero .eyebrow { display: block; margin-bottom: 16px; }

  /* 抽象花瓣光暈橫幅（純 CSS 漸層繪製）：柔粉為主，邊緣過渡薰衣草／淺藍，中心暖金橘光暈，柔焦夢幻。
     標題＋導言疊在圖上、錨定左下；上半留白讓光暈盡情發散。文字落在較冷的粉／紫角落（避開金橘熱區），
     再以一層「暖白角落柔光」（非陰影，是內層漸層）把該角提亮，確保粉彩上的小字仍清晰。整體無 box-shadow。 */
  .hero-art {
    position: relative; box-sizing: border-box;
    min-height: clamp(380px, 40vw, 460px); border-radius: 22px; margin: 0 0 26px; overflow: hidden;
    display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end;
    padding: clamp(36px, 5vw, 52px) clamp(28px, 5vw, 52px) clamp(32px, 4.5vw, 44px);
    background:
      /* 暖白角落柔光：只提亮左下文字區，右上光暈維持純淨夢幻 */
      radial-gradient(132% 120% at 0% 100%, rgba(255, 251, 253, .54), rgba(255, 251, 253, .14) 44%, rgba(255, 251, 253, 0) 66%),
      linear-gradient(to top, rgba(255, 252, 253, .30), rgba(255, 252, 253, 0) 44%),
      /* 原始花瓣光暈（位置不動） */
      radial-gradient(65% 85% at 47% 58%, rgba(255, 180, 96, .70), rgba(255, 180, 96, 0) 48%),
      radial-gradient(75% 80% at 24% 28%, rgba(198, 182, 255, .72), transparent 60%),
      radial-gradient(80% 85% at 82% 74%, rgba(150, 201, 255, .66), transparent 58%),
      radial-gradient(90% 55% at 68% 16%, rgba(255, 255, 255, .42), transparent 62%),
      linear-gradient(120deg, #ffd8e7 0%, #f4cce4 32%, #e7caf0 62%, #d5d7f3 84%, #d0e3f7 100%);
  }
  .hero-copy { position: relative; max-width: 30rem; }
  /* 以 .lhero .hero-art 前綴（0,2,1）穩定勝過既有的 .lhero h1／.lede（0,1,1），純加成不刪舊規則 */
  .lhero .hero-art h1 { margin: 0 0 13px; }
  .lhero .hero-art .lede { margin: 0; max-width: 26rem; color: var(--ink-2); text-shadow: 0 1px 1px rgba(255, 255, 255, .5); }
  @media (max-width: 560px) {
    .hero-art { min-height: 340px; border-radius: 18px; padding: 30px 22px 28px; }
    .hero-copy { max-width: 100%; }
    .lhero .hero-art .lede { max-width: 34ch; }
  }
  .lhero h1 { font-size: clamp(30px, 4.2vw, 44px); line-height: 1.1; letter-spacing: -.02em; font-weight: 740; margin: 0 0 16px; max-width: 18ch; text-wrap: balance; }
  .lhero .lede { color: var(--ink-2); max-width: 58ch; font-size: var(--fs-lede); line-height: var(--lh-snug); margin: 0; }
  .lcta { display: flex; align-items: center; gap: 12px; margin-top: 24px; flex-wrap: wrap; }
  .lcta .btn { padding: 11px 20px; font-size: var(--fs-body); border-radius: var(--r-sm); }
  .lcta .btn.ghost { background: var(--surface); color: var(--ink); border: 1px solid var(--line-2); }
  .lcta .btn.ghost:hover { border-color: var(--accent); color: var(--accent-ink); }
  /* PAGE 2 · 副英雄區：概覽數據滿版第二屏（垂直＋水平置中，看不到上方 hero 與下方課程）。
     四個超大數字排一列、數字後帶一抹 hero 粉彩光暈（粉／紫／藍／金），下接主要行動按鈕。
     背景極淡回應 hero 光暈，無 box-shadow。 */
  .statspage {
    min-height: 100vh; box-sizing: border-box;
    display: flex; flex-direction: column; justify-content: center;
    padding: clamp(64px, 10vh, 120px) 0; margin-bottom: 40px;
    background:
      radial-gradient(58% 62% at 50% 22%, rgba(255, 180, 96, .055), transparent 60%),
      radial-gradient(70% 80% at 10% 92%, rgba(198, 182, 255, .06), transparent 62%),
      radial-gradient(72% 82% at 92% 10%, rgba(150, 201, 255, .06), transparent 60%);
  }
  .sp-inner { max-width: 960px; width: 100%; margin: 0 auto; padding: 0 clamp(20px, 5vw, 40px); box-sizing: border-box; }
  .sp-row { display: grid; grid-template-columns: repeat(4, 1fr); align-items: center; }
  .sp-stat { position: relative; text-align: center; padding: clamp(6px, 1.5vw, 14px) clamp(8px, 2.4vw, 26px); }
  /* 數字後方粉彩光暈（依序 粉／紫／藍／金，呼應 hero） */
  .sp-stat::after {
    content: ""; position: absolute; z-index: 0; left: 50%; top: 40%; transform: translate(-50%, -50%);
    width: clamp(96px, 12vw, 162px); height: clamp(96px, 12vw, 162px); border-radius: 50%; filter: blur(4px); opacity: .55;
  }
  .sp-stat:nth-child(1)::after { background: radial-gradient(circle, rgba(255, 172, 204, .60), transparent 68%); }
  .sp-stat:nth-child(2)::after { background: radial-gradient(circle, rgba(198, 182, 255, .55), transparent 68%); }
  .sp-stat:nth-child(3)::after { background: radial-gradient(circle, rgba(150, 201, 255, .55), transparent 68%); }
  .sp-stat:nth-child(4)::after { background: radial-gradient(circle, rgba(255, 190, 110, .58), transparent 68%); }
  /* 髮絲垂直分隔（第 2/3/4 欄左側，上下淡出） */
  .sp-stat::before {
    content: ""; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
    width: 1px; height: 56%; opacity: 0;
    background: linear-gradient(to bottom, transparent, var(--line-2) 16%, var(--line-2) 84%, transparent);
  }
  .sp-stat:not(:first-child)::before { opacity: 1; }
  .sp-num { position: relative; z-index: 1; display: block; font-size: clamp(52px, 8vw, 104px); line-height: 1; font-weight: 720; color: var(--ink); letter-spacing: var(--ls-tight); font-variant-numeric: tabular-nums; }
  .sp-label { position: relative; z-index: 1; display: block; margin-top: clamp(10px, 1.6vw, 18px); font-size: clamp(10.5px, 1.3vw, 12.5px); font-weight: 600; letter-spacing: .12em; text-transform: uppercase; line-height: 1.35; color: var(--muted); }
  .sp-cta { justify-content: center; margin-top: clamp(40px, 6vh, 72px); }

  /* 頁尾：一條灰線，其下靠右顯示資料來源（短句）＋作者 */
  .lfoot {
    max-width: 960px; margin: 44px auto 0; box-sizing: border-box;
    border-top: 1px solid var(--line);
    padding: 18px 0 4px; text-align: right;
  }
  .lf-src { margin: 0; color: var(--muted); font-size: 12.5px; line-height: var(--lh-snug); }
  .lf-by { margin: 6px 0 0; color: var(--ink-2); font-size: 12.5px; }
  .lf-by span { color: var(--ink); font-weight: 600; }
  @media (max-width: 560px) {
    .statspage { padding: clamp(56px, 12vh, 88px) 0; }
    .sp-row { grid-template-columns: repeat(2, 1fr); row-gap: clamp(36px, 10vw, 56px); }
    .sp-stat:not(:first-child)::before { opacity: 0; }
    .sp-num { font-size: clamp(44px, 13vw, 72px); }
    .sp-cta { margin-top: clamp(32px, 8vw, 48px); }
  }

  /* 路線總覽（你將學到什麼）：全寬、內容置中在可讀欄寬 */
  .pv-head, .pv-learn, .pv-cta, .pv-plan { max-width: 720px; margin-left: auto; margin-right: auto; }
  .pv-head { margin-bottom: 30px; padding-bottom: 26px; border-bottom: 1px solid var(--line); }
  .pv-head .eyebrow { display: block; margin-bottom: 12px; }
  .pv-head h1 { font-size: var(--fs-display); line-height: var(--lh-tight); letter-spacing: var(--ls-tight); font-weight: 700; margin: 0 0 12px; }
  .pv-head .lede { font-size: var(--fs-lede); color: var(--ink-2); line-height: var(--lh-snug); margin: 0 0 14px; }
  .pv-who { font-size: 13px; color: var(--muted); margin: 0 0 18px; line-height: 1.55; }
  .pv-who span { color: var(--accent-ink); font-weight: 600; margin-right: 6px; }
  .pv-meta { display: flex; gap: 18px; flex-wrap: wrap; font-family: var(--mono); font-size: 12px; color: var(--muted); }
  .pv-prog { color: var(--teal); }

  /* 學習成果 */
  .pv-learn { margin-bottom: 26px; }
  .pv-learn h2 { font-size: 15px; font-weight: 700; letter-spacing: var(--ls-tight); margin: 0 0 14px; }
  .pv-outcomes { list-style: none; margin: 0; padding: 0; display: grid; gap: 11px; }
  .pv-outcomes li { position: relative; padding-left: 26px; font-size: 14px; color: var(--ink-2); line-height: var(--lh-snug); }
  .pv-outcomes li::before { content: "✓"; position: absolute; left: 0; top: 0; color: var(--teal); font-weight: 700; font-size: 13px; }

  /* 動作：繼續學習 / 選擇其他 */
  .pv-cta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; padding-bottom: 34px; border-bottom: 1px solid var(--line); }
  .pv-cta .btn { padding: 11px 22px; font-size: var(--fs-body); border-radius: var(--r-sm); }
  .pv-cta .btn.ghost { background: var(--surface); border: 1px solid var(--line-2); color: var(--ink); }
  .pv-cta .btn.ghost:hover { border-color: var(--accent); color: var(--accent-ink); }

  .pv-plan h2 { font-size: 15px; font-weight: 700; letter-spacing: var(--ls-tight); margin: 0 0 16px; }
  .acc { display: flex; flex-direction: column; gap: 8px; }
  .acc-item { border: 1px solid var(--line); border-radius: var(--r); background: var(--surface); overflow: hidden; transition: border-color .15s; }
  .acc-item.open { border-color: var(--line-2); }
  .acc-h { display: flex; align-items: center; gap: 12px; width: 100%; padding: 14px 16px; background: none; border: none; cursor: pointer; font-family: inherit; text-align: left; color: var(--ink); transition: background .13s; }
  .acc-h:hover { background: var(--surface-2); }
  .acc-n { font-family: var(--mono); font-size: 12px; color: var(--accent-ink); flex: none; }
  .acc-t { flex: 1; min-width: 0; font-size: 14.5px; font-weight: 680; letter-spacing: var(--ls-tight); }
  .acc-caret { flex: none; color: var(--muted); font-size: 13px; transition: transform .2s; }
  .acc-caret.open { transform: rotate(180deg); }
  .acc-body { list-style: none; margin: 0; padding: 4px 16px 15px 44px; display: flex; flex-direction: column; gap: 9px; }
  .acc-body li { display: flex; align-items: center; gap: 10px; }
  .acc-badge { font-family: var(--mono); font-size: 9px; letter-spacing: .03em; flex: none; padding: 2px 6px; border-radius: 5px; border: 1px solid var(--line); }
  .acc-badge.course { color: var(--accent-ink); background: var(--surface-2); }
  .acc-badge.iv { color: var(--muted); }
  .acc-label { font-size: 13.5px; color: var(--ink-2); }

  /* 知識地圖：降級到頁尾（無分隔線，靠間距分段）*/
  .mapsection { margin-top: 30px; }
  .mapband {
    display: flex; align-items: center; justify-content: space-between; gap: 20px; width: 100%;
    text-align: left; padding: 20px 24px; border-radius: var(--r-lg, 16px); cursor: pointer;
    background: radial-gradient(120% 160% at 88% 0%, var(--accent-soft-wash, rgba(224,127,14,.10)), transparent 62%), var(--surface);
    border: 1px solid var(--line); transition: border-color .15s, box-shadow .15s, transform .15s;
  }
  .mapband:hover { border-color: var(--accent); box-shadow: 0 6px 22px rgba(20,30,50,.09); transform: translateY(-1px); }
  .mapband:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .mapband .mb-t h2 { font-size: 17px; font-weight: 700; letter-spacing: var(--ls-tight); margin: 0 0 4px; }
  .mapband .mb-t p { font-size: 13px; color: var(--ink-2); margin: 0; }
  .mapband .mb-cta { display: inline-flex; align-items: center; gap: 8px; flex: none; font-family: var(--mono); font-size: 12.5px; font-weight: 600; color: var(--accent-ink); white-space: nowrap; }
  .mapband .mb-caret { display: inline-block; transition: transform .2s; }
  .mapband .mb-caret.open { transform: rotate(180deg); }
  .mapreveal { margin-top: 22px; }
  @media (max-width: 560px) {
    .mapband { flex-direction: column; align-items: flex-start; gap: 12px; }
  }

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
  .pc-deep { font-size: 12px; color: var(--muted); margin-top: 10px; }
  .pc-deep span { color: var(--teal); font-weight: 600; margin-right: 6px; }
  .pc-foot { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 12px; border-top: 1px solid var(--line); font-family: var(--mono); font-size: 12px; color: var(--muted); }
  .arrow { color: var(--accent-ink); font-weight: 700; }
  .pc-done { color: var(--teal); font-weight: 700; }
  .pcard.complete { border-color: color-mix(in srgb, var(--teal) 45%, var(--line)); }
</style>
