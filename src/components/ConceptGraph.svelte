<script>
  /* 概念關聯圖（radial）：25 個知識點成環，弦線＝前置依賴（PREREQ）。
     滑過任一點高亮它的依賴、點擊進該章。自足元件、自帶 hover。 */
  import { CH } from '../data/chapters.js';
  import { chOf } from '../data/localize.js';
  import { BRANCHES, FLOW, PREREQ } from '../data/graph.js';
  import { go } from '../stores/state.svelte.js';

  const slugToId = {};
  for (const k in CH) slugToId[CH[k].slug] = +k;
  const EDGES = Object.entries(PREREQ)
    .flatMap(([slug, pres]) => pres.map((p) => ({ from: slugToId[p], to: slugToId[slug] })))
    .filter((e) => e.from && e.to);

  let hovered = $state(null);
  let connected = $derived.by(() => {
    const s = new Set();
    if (hovered == null) return s;
    for (const e of EDGES) { if (e.from === hovered) s.add(e.to); else if (e.to === hovered) s.add(e.from); }
    return s;
  });
  const isHot = (e) => hovered != null && (e.from === hovered || e.to === hovered);

  const LAYOUT = (() => {
    const ORDER = [...BRANCHES, ...FLOW];
    const N = ORDER.reduce((n, c) => n + c.ids.length, 0);
    const R = 168, slots = N + ORDER.length, step = (2 * Math.PI) / slots, start = -Math.PI / 2;
    const nodes = [];
    let s = 0;
    for (const c of ORDER) {
      for (const id of c.ids) { const a = start + s * step; nodes.push({ id, x: Math.cos(a) * R, y: Math.sin(a) * R }); s++; }
      s++;   // 類別間留一個空位當間隔
    }
    return { nodes, posById: Object.fromEntries(nodes.map((nd) => [nd.id, nd])) };
  })();
  const cPath = (e) => { const a = LAYOUT.posById[e.from], b = LAYOUT.posById[e.to]; return a && b ? `M ${a.x} ${a.y} Q 0 0 ${b.x} ${b.y}` : ''; };
</script>

<div class="cwrap">
  <svg viewBox="-232 -232 464 464" class="cg" role="img" aria-label="AI 概念關聯圖">
    {#each EDGES as e}
      <path class="cedge" class:hot={isHot(e)} class:dim={hovered != null && !isHot(e)} d={cPath(e)} />
    {/each}
    {#each LAYOUT.nodes as nd}
      <g class="cnode" class:cur={nd.id === hovered} class:link={connected.has(nd.id)}
        role="button" tabindex="0" aria-label={chOf(nd.id).t}
        onmouseenter={() => (hovered = nd.id)} onmouseleave={() => (hovered = null)}
        onfocus={() => (hovered = nd.id)} onblur={() => (hovered = null)}
        onclick={() => go(nd.id)}
        onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(nd.id); } }}>
        <circle cx={nd.x} cy={nd.y} r="12" />
        <text x={nd.x} y={nd.y} text-anchor="middle" dominant-baseline="central">{nd.id}</text>
      </g>
    {/each}
    <text class="ccenter" x="0" y="0" text-anchor="middle" dominant-baseline="central">{hovered != null ? CH[hovered].t : 'AI'}</text>
  </svg>
</div>

<style>
  .cwrap { display: flex; justify-content: center; }
  .cg { width: 100%; max-width: 460px; height: auto; }
  .cedge { fill: none; stroke: var(--line-2); stroke-width: 1.25; opacity: .35; transition: opacity .15s, stroke .15s; }
  .cedge.hot { stroke: var(--accent); stroke-width: 1.8; opacity: .95; }
  .cedge.dim { opacity: .08; }
  .cnode { cursor: pointer; }
  .cnode circle { fill: var(--surface); stroke: var(--line-2); stroke-width: 1.5; transition: fill .15s, stroke .15s; }
  .cnode text { font-size: 11px; font-family: var(--mono); fill: var(--muted); pointer-events: none; }
  .cnode:hover circle, .cnode.cur circle { fill: var(--accent); stroke: var(--accent); }
  .cnode:hover text, .cnode.cur text { fill: #3a1e00; }
  .cnode.link circle { stroke: var(--teal); stroke-width: 2.5; }
  .cnode.link text { fill: var(--teal); }
  .ccenter { font-size: 13px; font-weight: 650; fill: var(--ink); }
</style>
