<script>
  /* Ch · MCP（Model Context Protocol）。每個工具各接各的很亂；MCP 是統一插座（AI 的 USB-C）。
     切換「沒有 MCP / 有 MCP」看接法差異；點任一工具，看模型透過 MCP 呼叫它、拿回結果。亮色、離線。 */
  import { fade } from 'svelte/transition';
  import { dur, D } from '../lib/motion.js';

  const TOOLS = [
    { icon: '🔍', name: '搜尋', ask: '查台北天氣', res: '多雲 24°C' },
    { icon: '📅', name: '行事曆', ask: '看今天行程', res: '下午 3 點有會議' },
    { icon: '🗄️', name: '資料庫', ask: '查訂單 #1234', res: '已出貨' },
    { icon: '📧', name: '郵件', ask: '寄出通知', res: '已寄出 ✓' },
  ];
  const COLORS = ['#d23f3f', '#e07f0e', '#0f8a80', '#9a8ad9'];
  const MX = 66, MY = 130, HX = 258, TX = 452;
  const ty = (i) => 34 + i * 64;

  let mcp = $state(false);
  let active = $state(null);

  function tap(i) { active = active === i ? null : i; }
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：AI 怎麼接上各種工具</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    要讓 AI 會查天氣、看行事曆、讀資料庫…每個工具都得接上模型。沒有標準時<b>各接各的、很亂</b>；
    <b>MCP</b> 就是一個<b>統一插座</b>（像 AI 世界的 USB-C），一種接法接所有東西。
  </p>

  <div class="demo-stage light">
    <div class="seg">
      <button class="segb" class:on={!mcp} onclick={() => (mcp = false)}>🧩 沒有 MCP（各接各的）</button>
      <button class="segb" class:on={mcp} onclick={() => (mcp = true)}>🔌 有 MCP（統一插座）</button>
    </div>

    <svg class="wire" viewBox="0 0 520 268">
      <!-- 連線 -->
      {#if !mcp}
        {#each TOOLS as t, i}
          <path d={`M ${MX + 42} ${MY} C 210 ${MY} 300 ${ty(i)} ${TX - 40} ${ty(i)}`}
            fill="none" stroke={COLORS[i]} stroke-width={active === i ? 4 : 2.4}
            stroke-dasharray={i % 2 ? '6 4' : '2 5'} opacity={active === null || active === i ? 0.9 : 0.2} />
        {/each}
      {:else}
        <line x1={MX + 42} y1={MY} x2={HX - 34} y2={MY} stroke="#0f8a80" stroke-width="5" />
        {#each TOOLS as t, i}
          <line x1={HX + 34} y1={MY} x2={TX - 40} y2={ty(i)} stroke="#c6cfdd" stroke-width={active === i ? 4 : 2.4}
            opacity={active === null || active === i ? 1 : 0.35} />
        {/each}
      {/if}

      <!-- 模型 -->
      <g><rect x={MX - 42} y={MY - 26} width="84" height="52" rx="12" fill="#e07f0e" />
        <text class="ml" x={MX} y={MY - 2} text-anchor="middle">AI</text>
        <text class="ml2" x={MX} y={MY + 13} text-anchor="middle">模型</text></g>

      <!-- MCP 樞紐 -->
      {#if mcp}
        <g in:fade={{ duration: dur(D.fast) }}>
          <rect x={HX - 34} y={MY - 26} width="68" height="52" rx="12" fill="#0f8a80" />
          <text class="hub" x={HX} y={MY - 2} text-anchor="middle">MCP</text>
          <text class="hub2" x={HX} y={MY + 13} text-anchor="middle">統一插座</text>
        </g>
      {/if}

      <!-- 工具 -->
      {#each TOOLS as t, i}
        <g class="tool" class:act={active === i} onclick={() => tap(i)} role="button" tabindex="0">
          <rect x={TX - 40} y={ty(i) - 20} width="118" height="40" rx="10"
            fill={active === i ? '#fff' : 'var(--surface-2)'} stroke={active === i ? (mcp ? '#0f8a80' : COLORS[i]) : 'var(--line-2)'} stroke-width={active === i ? 2 : 1} />
          <text class="tt" x={TX - 24} y={ty(i) + 5} text-anchor="middle">{t.icon}</text>
          <text class="tn" x={TX - 4} y={ty(i) + 5}>{t.name}</text>
        </g>
      {/each}
    </svg>

    {#if !mcp}
      <div class="note bad">⚠️ 每個工具都要<b>各寫一套接法</b>（不同格式、不同協定）——M 個模型 × N 個工具 = 一團亂。</div>
    {:else}
      <div class="note good">✓ 所有工具都插上 <b>MCP</b>，模型只要學會一種標準，就能用上全部——<b>接一次、接所有</b>。</div>
    {/if}

    {#if active !== null}
      <div class="call" in:fade={{ duration: dur(D.fast) }}>
        <div class="cmsg out">模型 → {TOOLS[active].name}{mcp ? '（透過 MCP）' : '（自訂接法）'}：{TOOLS[active].ask}</div>
        <div class="cmsg in">{TOOLS[active].name} → 模型：{TOOLS[active].res}</div>
      </div>
    {:else}
      <div class="tiphint">👆 點任一個工具，看模型怎麼呼叫它、拿回結果。</div>
    {/if}
  </div>

  <p class="hint">
    <b>MCP（模型上下文協定）</b>由 Anthropic 提出並開源，目標是讓 AI 與各種工具/資料源<b>用同一種標準溝通</b>。
    有了它，工具能互通、可重用，Agent 要用什麼就插什麼——這也是下一章 <b>AI Agent</b> 能自主用工具的基礎。
  </p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .seg { display: inline-flex; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 3px; gap: 3px; margin-bottom: var(--sp-3); }
  .segb { font-size: var(--fs-cap); padding: 7px 14px; border-radius: var(--r-sm); border: none; background: none; color: var(--muted); cursor: pointer; }
  .segb.on { background: var(--accent); color: #241500; font-weight: 600; }

  .wire { width: 100%; height: auto; display: block; }
  .wire .ml { font-size: 15px; font-weight: 700; fill: #241500; font-family: var(--sans); }
  .wire .ml2 { font-size: 9px; fill: #5a3a06; font-family: var(--mono); }
  .wire .hub { font-size: 13px; font-weight: 700; fill: #fff; font-family: var(--mono); }
  .wire .hub2 { font-size: 8px; fill: #d7f5f0; font-family: var(--mono); }
  .wire .tt { font-size: 16px; }
  .wire .tn { font-size: 12px; fill: var(--ink-2); font-family: var(--sans); }
  .tool { cursor: pointer; }
  .tool:hover rect { stroke: var(--accent); }

  .note { font-size: var(--fs-cap); border-radius: var(--r-sm); padding: var(--sp-2) var(--sp-3); margin-top: var(--sp-1); }
  .note.bad { background: #fceaea; border: 1px solid #e8b4b4; color: var(--crit); }
  .note.good { background: #0f8a800c; border: 1px solid #0f8a8055; color: var(--ink); }

  .call { margin-top: 10px; display: flex; flex-direction: column; gap: 6px; }
  .cmsg { font-size: var(--fs-sm); padding: 7px 11px; border-radius: var(--r); }
  .cmsg.out { background: var(--accent); color: #241500; align-self: flex-start; }
  .cmsg.in { background: var(--surface-2); border: 1px solid var(--line); color: var(--ink-2); align-self: flex-start; }
  .tiphint { font-size: var(--fs-cap); color: var(--muted); margin-top: 10px; }
</style>
