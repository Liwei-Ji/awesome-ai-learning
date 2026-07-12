<script>
  // 側欄由 GROUPS + CH 自動生成；新增章節不需改這裡。
  import { GROUPS, CH } from '../data/chapters.js';
  import { nav, go } from '../stores/state.svelte.js';
</script>

<nav class="nav">
  <button class="brand" class:on={nav.current == null} onclick={() => go(null)}>
    <span class="blogo">🎓</span><span class="bname">AI 學院</span>
  </button>
  {#each GROUPS as g}
    <div class="group">
      <span class="eyebrow">{g.t}</span>
      {#each g.ids as id}
        <button
          class="chap"
          aria-current={id === nav.current}
          onclick={() => go(id)}
        >
          <span class="num">{String(id).padStart(2, '0')}</span>
          <span>{CH[id].t}</span>
        </button>
      {/each}
    </div>
  {/each}
</nav>

<style>
  .brand {
    display: flex; align-items: center; gap: 9px; width: 100%; text-align: left;
    padding: 6px 10px 8px; margin-bottom: 6px; background: none; border: none;
    color: var(--ink); font-weight: 700; font-size: 15px; letter-spacing: var(--ls-tight);
    border-radius: var(--r-sm); transition: background .15s;
  }
  .brand:hover { background: var(--surface-2); }
  .brand.on { color: var(--accent-ink); }
  .brand .blogo { font-size: 17px; }
</style>
