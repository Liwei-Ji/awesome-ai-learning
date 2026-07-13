<script>
  // 側欄由 GROUPS + CH 自動生成；新增章節不需改這裡。
  import { GROUPS } from '../data/chapters.js';
  import { chOf } from '../data/localize.js';
  import { nav, go } from '../stores/state.svelte.js';
  import { i18n, setLocale, t } from '../stores/i18n.svelte.js';
  import { LOCALES, messages } from '../i18n/index.js';
</script>

<nav class="nav">
  <button class="brand" class:on={nav.current == null} onclick={() => go(null)}>
    <span class="blogo">🎓</span><span class="bname">{t('brand')}</span>
  </button>

  <div class="lang" role="group" aria-label="Language / 語言">
    {#each LOCALES as l}
      <button class="lg" class:on={i18n.locale === l} onclick={() => setLocale(l)}>{messages[l].langName}</button>
    {/each}
  </div>

  {#each GROUPS as g}
    <div class="group">
      <span class="eyebrow">{t(`group.${g.key}`)}</span>
      {#each g.ids as id}
        <button class="chap" aria-current={id === nav.current} onclick={() => go(id)}>
          <span class="num">{String(id).padStart(2, '0')}</span>
          <span>{chOf(id).t}</span>
        </button>
      {/each}
    </div>
  {/each}
</nav>

<style>
  .brand {
    display: flex; align-items: center; gap: 9px; width: 100%; text-align: left;
    padding: 6px 10px 8px; margin-bottom: 8px; background: none; border: none;
    color: var(--ink); font-weight: 700; font-size: 15px; letter-spacing: var(--ls-tight);
    border-radius: var(--r-sm); transition: background .15s;
  }
  .brand:hover { background: var(--surface-2); }
  .brand.on { color: var(--accent-ink); }
  .brand .blogo { font-size: 17px; }

  .lang { display: flex; gap: 4px; padding: 0 6px; margin-bottom: 10px; }
  .lg {
    flex: 1; padding: 5px 6px; border: 1px solid var(--line); border-radius: var(--r-sm);
    background: var(--surface); color: var(--muted); font-size: 11.5px; font-weight: 600;
    transition: .15s; white-space: nowrap;
  }
  .lg:hover { border-color: var(--accent); color: var(--accent-ink); }
  .lg.on { background: var(--accent); border-color: transparent; color: #3a1e00; }
</style>
