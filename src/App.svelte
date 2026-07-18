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
  import { nav, ui, toggleMenu, closeMenu, goPath, hrefPath, onNav } from './stores/state.svelte.js';
  import { t, i18n, setLocale } from './stores/i18n.svelte.js';
  import { LOCALES, messages } from './i18n/index.js';
  import { Menu, X } from '@lucide/svelte';
</script>

<Seo />

<div class="app" class:menu-open={ui.menuOpen} class:full={nav.mode === 'paths' && nav.path == null}>
  <!-- 手機頂列（桌機隱藏）：漢堡 + 品牌 -->
  <header class="topbar">
    <button class="burger" onclick={toggleMenu} aria-label="Menu" aria-expanded={ui.menuOpen}>
      {#if ui.menuOpen}<X size={22} />{:else}<Menu size={22} />{/if}
    </button>
    <a class="tb-brand" href={hrefPath(null)} onclick={(e) => onNav(e, () => goPath(null))}>
      {t('brand')}
    </a>
  </header>

  <SideNav />

  <!-- 語言切換：固定右上角（不放側邊欄），跨頁一致 -->
  <div class="langfix" role="group" aria-label="Language / 語言">
    {#each LOCALES as l}
      <button class="lgf" class:on={i18n.locale === l} onclick={() => setLocale(l)}>{messages[l].langName}</button>
    {/each}
  </div>

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

<style>
  /* 語言切換：固定在頁面右上角，跨頁一致；手機抽屜打開時被遮罩(z 90)蓋住 */
  .langfix {
    position: fixed; top: 12px; right: 16px; z-index: 80;
    display: flex; gap: 2px; padding: 3px;
    background: var(--surface); border: 1px solid var(--line);
    border-radius: var(--r-sm); box-shadow: 0 1px 5px rgba(20, 30, 55, .07);
  }
  .lgf {
    padding: 4px 9px; border: none; background: none; color: var(--muted);
    font-size: 11.5px; font-weight: 600; border-radius: 5px; cursor: pointer;
    transition: color .15s, background .15s; white-space: nowrap;
  }
  .lgf:hover { color: var(--accent-ink); background: var(--surface-2); }
  .lgf.on { color: var(--accent-ink); background: var(--surface-2); }
</style>
