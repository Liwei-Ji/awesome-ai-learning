<script>
  // App shell：grid 佈局。桌機為「側欄 + 內容」兩欄；手機為頂列 + 內容，
  // 側欄改成可滑入的抽屜（.nav 於 global.css 內用 @media 切換）。
  import SideNav from './components/SideNav.svelte';
  import Stage from './components/Stage.svelte';
  import Tutor from './components/Tutor.svelte';
  import Home from './components/Home.svelte';
  import Interview from './components/Interview.svelte';
  import Paths from './components/Paths.svelte';
  import Seo from './components/Seo.svelte';
  import { nav, ui, toggleMenu, closeMenu, go, hrefCourse, onNav } from './stores/state.svelte.js';
  import { t } from './stores/i18n.svelte.js';
  import { Menu, X } from '@lucide/svelte';
</script>

<Seo />

<div class="app" class:menu-open={ui.menuOpen}>
  <!-- 手機頂列（桌機隱藏）：漢堡 + 品牌 -->
  <header class="topbar">
    <button class="burger" onclick={toggleMenu} aria-label="Menu" aria-expanded={ui.menuOpen}>
      {#if ui.menuOpen}<X size={22} />{:else}<Menu size={22} />{/if}
    </button>
    <a class="tb-brand" href={hrefCourse(null)} onclick={(e) => onNav(e, () => go(null))}>
      <span class="tb-logo">🎓</span>{t('brand')}
    </a>
  </header>

  <SideNav />

  <!-- 手機抽屜背景遮罩（點擊關閉）；桌機隱藏 -->
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="scrim" onclick={closeMenu} aria-hidden="true"></div>

  {#if nav.mode === 'paths'}
    <Paths />
  {:else if nav.mode === 'interview'}
    <Interview />
  {:else if nav.current == null}
    <Home />
  {:else}
    <Stage />
    <Tutor />
  {/if}
</div>
