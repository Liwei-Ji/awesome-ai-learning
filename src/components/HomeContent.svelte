<script>
  /* 首頁內容（hero + AI 知識地圖），不含 <main class="stage"> 外框。
     課程模式的 fallback 首頁（Home.svelte）用；學習路線落地頁改用新版目標優先版面。 */
  import KnowledgeMap from './KnowledgeMap.svelte';
  import { go, hrefCourse, onNav } from '../stores/state.svelte.js';
  import { t } from '../stores/i18n.svelte.js';
  import { fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
</script>

<div class="home">
  <header class="hero" in:fly={{ y: 12, duration: dur(D.base), easing: ease }}>
    <h1>{t('home.title')}</h1>
    <p class="lede">{@html t('home.lede')}</p>
    <p class="lede">{@html t('home.lede2')}</p>
    <div class="cta">
      <a class="btn primary lg" href={hrefCourse(0)} onclick={(e) => onNav(e, () => go(0))}>{t('home.start')}</a>
    </div>
  </header>

  <section class="archmap">
    <div class="amh"><span class="eyebrow">{t('home.mapTitle')}</span></div>
    <KnowledgeMap />
  </section>
</div>

<style>
  .home { max-width: 900px; margin: 0 auto; }

  .hero { padding: 20px 0 32px; border-bottom: 1px solid var(--line); margin-bottom: 28px; }
  .hero h1 { font-size: 40px; line-height: 1.16; letter-spacing: var(--ls-tight); font-weight: 720; margin: 0 0 16px; }
  .hero .lede { font-size: var(--fs-lede); color: var(--ink-2); max-width: 78ch; line-height: 1.85; margin: 0; }
  .hero .lede + .lede { margin-top: 18px; }
  .cta { display: flex; align-items: center; gap: 18px; margin-top: 24px; flex-wrap: wrap; }
  .btn.lg { padding: 11px 22px; font-size: var(--fs-body); border-radius: var(--r-sm); }

  .amh { display: flex; align-items: baseline; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }

  @media (max-width: 720px) {
    .hero { padding: 12px 0 26px; margin-bottom: 22px; }
    .hero h1 { font-size: 29px; }
  }
</style>
