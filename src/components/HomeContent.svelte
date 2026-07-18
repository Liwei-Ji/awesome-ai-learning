<script>
  /* 首頁內容（hero + AI 知識地圖），不含 <main class="stage"> 外框，
     好讓「課程首頁」與「學習路線」頁都能重用同一份、不重複地圖邏輯。 */
  import { CH } from '../data/chapters.js';
  import { chOf } from '../data/localize.js';
  import { BRANCHES, FLOW, SUB, PREREQ } from '../data/graph.js';
  import { go, hrefCourse, onNav } from '../stores/state.svelte.js';
  import { t } from '../stores/i18n.svelte.js';
  import { fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';

  // ── 依賴連線：用 PREREQ 畫出章與章的「前置知識」關係 ──
  const slugToId = {};
  for (const k in CH) slugToId[CH[k].slug] = +k;
  const EDGES = Object.entries(PREREQ)
    .flatMap(([slug, pres]) => pres.map((p) => ({ from: slugToId[p], to: slugToId[slug] })))
    .filter((e) => e.from && e.to);

  let treeEl;
  let nodeEls = {};             // id -> DOM
  let pos = $state({});         // id -> {x,y}（相對 treeEl 的中心）
  let size = $state({ w: 0, h: 0 });
  let hovered = $state(null);

  let connected = $derived.by(() => {
    const s = new Set();
    if (hovered == null) return s;
    for (const e of EDGES) {
      if (e.from === hovered) s.add(e.to);
      else if (e.to === hovered) s.add(e.from);
    }
    return s;
  });

  function measure() {
    if (!treeEl) return;
    const c = treeEl.getBoundingClientRect();
    const p = {};
    for (const id in nodeEls) {
      const el = nodeEls[id];
      if (el) { const r = el.getBoundingClientRect(); p[id] = { x: r.left - c.left + r.width / 2, y: r.top - c.top + r.height / 2 }; }
    }
    pos = p; size = { w: c.width, h: c.height };
  }
  $effect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (treeEl) ro.observe(treeEl);
    return () => ro.disconnect();
  });

  function edgePath(e) {
    const a = pos[e.from], b = pos[e.to];
    if (!a || !b) return '';
    const my = (a.y + b.y) / 2;
    return `M ${a.x} ${a.y} C ${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
  }
  const isHot = (e) => hovered != null && (e.from === hovered || e.to === hovered);
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

  {#snippet nodeBtn(id)}
    <a class="node" class:cur={id === hovered} class:link={connected.has(id)}
      bind:this={nodeEls[id]}
      href={hrefCourse(id)}
      onclick={(e) => onNav(e, () => go(id))}
      onmouseenter={() => (hovered = id)} onmouseleave={() => (hovered = null)}
      onfocus={() => (hovered = id)} onblur={() => (hovered = null)}>
      <span class="nn mono">{String(id).padStart(2, '0')}</span><span class="nt">{chOf(id).t}</span>
      {#if SUB[CH[id].slug]}<span class="subs">{#each SUB[CH[id].slug] as s}<span class="subtag">{s}</span>{/each}</span>{/if}
    </a>
  {/snippet}

  <section class="archmap">
    <div class="amh">
      <span class="eyebrow">{t('home.mapTitle')}</span>
    </div>

    <div class="tree" bind:this={treeEl}>
      <svg class="edges" width={size.w} height={size.h} aria-hidden="true">
        {#each EDGES as e}
          <path d={edgePath(e)} class:hot={isHot(e)} class:dim={hovered != null && !isHot(e)} />
        {/each}
      </svg>

      <div class="root">{t('home.mapRoot')}</div>
      <div class="stem" aria-hidden="true"></div>

      <div class="branches">
        {#each BRANCHES as b}
          <div class="cat">
            <div class="cathead">{t('group.' + b.key)}</div>
            <div class="items">
              {#each b.ids as id}{@render nodeBtn(id)}{/each}
            </div>
          </div>
        {/each}
      </div>

      {#each FLOW as f}
        <div class="cat wide">
          <div class="cathead">{t('group.' + f.key)}</div>
          <div class="items row">
            {#each f.ids as id}{@render nodeBtn(id)}{/each}
          </div>
        </div>
      {/each}
    </div>
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

  .tree { position: relative; }
  .edges { position: absolute; inset: 0; pointer-events: none; z-index: 1; overflow: visible; }
  .edges path { fill: none; stroke: var(--line-2); stroke-width: 1.5; opacity: .4; transition: opacity .15s, stroke .15s; }
  .edges path.hot { stroke: var(--accent); stroke-width: 2; opacity: .95; }
  .edges path.dim { opacity: .1; }

  .root { position: relative; z-index: 2; width: max-content; margin: 0 auto;
    padding: 8px 18px; border-radius: 99px; background: var(--ink); color: #fff;
    font-weight: 650; font-size: var(--fs-sm); letter-spacing: var(--ls-tight); }
  .stem { position: relative; z-index: 2; width: 2px; height: 18px; background: var(--line-2); margin: 0 auto; }

  .branches { position: relative; z-index: 2; display: flex; gap: 18px; align-items: flex-start; }
  .cat { flex: 1; min-width: 0; }
  .cat.wide { margin-top: 24px; }
  .cathead { font-size: var(--fs-sm); font-weight: 650; color: var(--ink); margin-bottom: 10px; letter-spacing: var(--ls-tight); }
  .items { display: flex; flex-direction: column; gap: 8px; }
  .items.row { flex-direction: row; flex-wrap: wrap; }

  .node { position: relative; z-index: 2; display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 12px; border: 1px solid var(--line); border-radius: var(--r-sm);
    background: var(--surface); color: var(--ink-2); font-size: var(--fs-sm); text-align: left;
    text-decoration: none; cursor: pointer;
    transition: border-color .15s, color .15s, box-shadow .15s; }
  .node:hover, .node.cur { border-color: var(--accent); color: var(--accent-ink); box-shadow: 0 2px 8px rgba(20,30,55,.08); }
  .node.link { border-color: var(--teal); color: var(--teal); }
  .node .nn { font-size: var(--fs-micro); color: var(--muted); flex: none; }
  .node.cur .nn, .node:hover .nn { color: var(--accent-ink); }
  .subs { display: inline-flex; flex-wrap: wrap; gap: 3px; margin-left: 6px; }
  .subtag { font-size: 10px; color: var(--muted); background: var(--surface-2); border-radius: 5px; padding: 1px 5px; }

  @media (max-width: 720px) {
    .branches { flex-wrap: wrap; }
    .cat { flex-basis: 44%; }
    .hero { padding: 12px 0 26px; margin-bottom: 22px; }
    .hero h1 { font-size: 29px; }
  }
</style>
