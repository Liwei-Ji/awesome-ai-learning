<script>
  /* Ch · MCP（Model Context Protocol）。每個工具各接各的很亂；MCP 是統一插座（AI 的 USB-C）。
     切換「沒有 MCP / 有 MCP」看接法差異；點任一工具，看模型透過 MCP 呼叫它、拿回結果。亮色、離線。
     工具 icon／連線顏色／座標跨語言共用；顯示字串依 i18n.locale。 */
  import { fade } from 'svelte/transition';
  import { dur, D } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const TOOL_ICONS = ['🔍', '📅', '🗄️', '📧'];
  const COLORS = ['#d23f3f', '#e07f0e', '#0f8a80', '#9a8ad9'];
  const MX = 66, MY = 130, HX = 258, TX = 452;
  const ty = (i) => 34 + i * 64;

  const L = {
    zh: {
      h3: '互動：AI 怎麼接上各種工具',
      lede: `要讓 AI 會查天氣、看行事曆、讀資料庫…每個工具都得接上模型。沒有標準時<b>各接各的、很亂</b>；
    <b>MCP</b> 就是一個<b>統一插座</b>（像 AI 世界的 USB-C），一種接法接所有東西。`,
      segNo: '🧩 沒有 MCP（各接各的）', segYes: '🔌 有 MCP（統一插座）',
      modelLabel: '模型', hubLabel: '統一插座',
      toolNames: ['搜尋', '行事曆', '資料庫', '郵件'],
      toolAsk: ['查台北天氣', '看今天行程', '查訂單 #1234', '寄出通知'],
      toolRes: ['多雲 24°C', '下午 3 點有會議', '已出貨', '已寄出 ✓'],
      noteBad: '⚠️ 每個工具都要<b>各寫一套接法</b>（不同格式、不同協定），M 個模型 × N 個工具 = 一團亂。',
      noteGood: '✓ 所有工具都插上 <b>MCP</b>，模型只要學會一種標準，就能用上全部，<b>接一次、接所有</b>。',
      callOut: '模型 → {n}{v}：{q}', viaMcp: '（透過 MCP）', viaCustom: '（自訂接法）',
      callIn: '{n} → 模型：{r}',
      tiphint: '👆 點任一個工具，看模型怎麼呼叫它、拿回結果。',
      hint: `<b>MCP（模型上下文協定）</b>由 Anthropic 提出並開源，目標是讓 AI 與各種工具/資料源<b>用同一種標準溝通</b>。
    有了它，工具能互通、可重用，Agent 要用什麼就插什麼，這也是下一章 <b>AI Agent</b> 能自主用工具的基礎。`,
    },
    en: {
      h3: 'Interactive: how AI connects to all kinds of tools',
      lede: 'To let AI check the weather, view your calendar, read a database… every tool has to connect to the model. Without a standard, you <b>wire each one up separately, a mess</b>; <b>MCP</b> is a single <b>universal socket</b> (like the USB-C of the AI world): one way to connect to everything.',
      segNo: '🧩 Without MCP (wire each one up)', segYes: '🔌 With MCP (universal socket)',
      modelLabel: 'Model', hubLabel: 'one socket',
      toolNames: ['Search', 'Calendar', 'Database', 'Email'],
      toolAsk: ['Check Taipei weather', 'See today’s schedule', 'Look up order #1234', 'Send a notification'],
      toolRes: ['Cloudy, 24°C', 'Meeting at 3 PM', 'Shipped', 'Sent ✓'],
      noteBad: '⚠️ Every tool needs <b>its own custom connector</b> (different formats, different protocols), M models × N tools = one big mess.',
      noteGood: '✓ Every tool plugs into <b>MCP</b>, so the model only learns one standard and can use them all, <b>connect once, connect to everything</b>.',
      callOut: 'Model → {n}{v}: {q}', viaMcp: ' (via MCP)', viaCustom: ' (custom connector)',
      callIn: '{n} → Model: {r}',
      tiphint: '👆 Tap any tool to see how the model calls it and gets a result back.',
      hint: '<b>MCP (Model Context Protocol)</b> is an open standard introduced by Anthropic, meant to let AI <b>talk to all kinds of tools and data sources through one common standard</b>. With it, tools become interoperable and reusable, and an Agent can plug into whatever it needs, which is the foundation for the next chapter, where an <b>AI Agent</b> uses tools on its own.',
    },
    ja: {
      h3: 'インタラクティブ：AI はどうやって色々なツールにつなぐのか',
      lede: 'AI に天気を調べさせたり、カレンダーを見せたり、データベースを読ませたり…どのツールもモデルにつなぐ必要があります。標準がないと<b>ツールごとに個別に配線する、ごちゃごちゃ</b>です。<b>MCP</b> は<b>統一ソケット</b>ひとつ（AI 界の USB-C のようなもの）で、ひとつのつなぎ方で何にでもつなげます。',
      segNo: '🧩 MCP なし（個別に配線）', segYes: '🔌 MCP あり（統一ソケット）',
      modelLabel: 'モデル', hubLabel: '統一ソケット',
      toolNames: ['検索', 'カレンダー', 'データベース', 'メール'],
      toolAsk: ['台北の天気を調べて', '今日の予定を見て', '注文 #1234 を照会', '通知を送信'],
      toolRes: ['くもり 24°C', '午後3時に会議', '発送済み', '送信済み ✓'],
      noteBad: '⚠️ ツールごとに<b>専用の接続を書く</b>必要があります（フォーマットもプロトコルもバラバラ），M 個のモデル × N 個のツール ＝ 大混乱。',
      noteGood: '✓ すべてのツールが <b>MCP</b> に差し込まれ、モデルは標準をひとつ覚えるだけで全部使えます、<b>一度つなげば、何にでもつながる</b>。',
      callOut: 'モデル → {n}{v}：{q}', viaMcp: '（MCP 経由）', viaCustom: '（専用接続）',
      callIn: '{n} → モデル：{r}',
      tiphint: '👆 どれかツールをタップすると、モデルがそれを呼び出して結果を受け取る様子が見られます。',
      hint: '<b>MCP（Model Context Protocol）</b>は Anthropic が提案・公開したオープン標準で、AI がさまざまなツールやデータソースと<b>共通の標準ひとつで対話できる</b>ようにするものです。これにより、ツールは相互に使い回せて再利用でき、Agent は必要なものを差し込むだけで使えます、次章で <b>AI Agent</b> が自分でツールを使う、その土台になります。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let mcp = $state(false);
  let active = $state(null);

  function tap(i) { active = active === i ? null : i; }
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="seg">
      <button class="segb" class:on={!mcp} onclick={() => (mcp = false)}>{ui.segNo}</button>
      <button class="segb" class:on={mcp} onclick={() => (mcp = true)}>{ui.segYes}</button>
    </div>

    <svg class="wire" viewBox="0 0 520 268">
      <!-- 連線 -->
      {#if !mcp}
        {#each TOOL_ICONS as icon, i}
          <path d={`M ${MX + 42} ${MY} C 210 ${MY} 300 ${ty(i)} ${TX - 40} ${ty(i)}`}
            fill="none" stroke={COLORS[i]} stroke-width={active === i ? 4 : 2.4}
            stroke-dasharray={i % 2 ? '6 4' : '2 5'} opacity={active === null || active === i ? 0.9 : 0.2} />
        {/each}
      {:else}
        <line x1={MX + 42} y1={MY} x2={HX - 34} y2={MY} stroke="#0f8a80" stroke-width="5" />
        {#each TOOL_ICONS as icon, i}
          <line x1={HX + 34} y1={MY} x2={TX - 40} y2={ty(i)} stroke="#c6cfdd" stroke-width={active === i ? 4 : 2.4}
            opacity={active === null || active === i ? 1 : 0.35} />
        {/each}
      {/if}

      <!-- 模型 -->
      <g><rect x={MX - 42} y={MY - 26} width="84" height="52" rx="12" fill="#e07f0e" />
        <text class="ml" x={MX} y={MY - 2} text-anchor="middle">AI</text>
        <text class="ml2" x={MX} y={MY + 13} text-anchor="middle">{ui.modelLabel}</text></g>

      <!-- MCP 樞紐 -->
      {#if mcp}
        <g in:fade={{ duration: dur(D.fast) }}>
          <rect x={HX - 34} y={MY - 26} width="68" height="52" rx="12" fill="#0f8a80" />
          <text class="hub" x={HX} y={MY - 2} text-anchor="middle">MCP</text>
          <text class="hub2" x={HX} y={MY + 13} text-anchor="middle">{ui.hubLabel}</text>
        </g>
      {/if}

      <!-- 工具 -->
      {#each TOOL_ICONS as icon, i}
        <g class="tool" class:act={active === i} onclick={() => tap(i)} role="button" tabindex="0">
          <rect x={TX - 40} y={ty(i) - 20} width="118" height="40" rx="10"
            fill={active === i ? '#fff' : 'var(--surface-2)'} stroke={active === i ? (mcp ? '#0f8a80' : COLORS[i]) : 'var(--line-2)'} stroke-width={active === i ? 2 : 1} />
          <text class="tt" x={TX - 24} y={ty(i) + 5} text-anchor="middle">{icon}</text>
          <text class="tn" x={TX - 4} y={ty(i) + 5}>{ui.toolNames[i]}</text>
        </g>
      {/each}
    </svg>

    {#if !mcp}
      <div class="note bad">{@html ui.noteBad}</div>
    {:else}
      <div class="note good">{@html ui.noteGood}</div>
    {/if}

    {#if active !== null}
      <div class="call" in:fade={{ duration: dur(D.fast) }}>
        <div class="cmsg out">{ui.callOut.replace('{n}', ui.toolNames[active]).replace('{v}', mcp ? ui.viaMcp : ui.viaCustom).replace('{q}', ui.toolAsk[active])}</div>
        <div class="cmsg in">{ui.callIn.replace('{n}', ui.toolNames[active]).replace('{r}', ui.toolRes[active])}</div>
      </div>
    {:else}
      <div class="tiphint">{ui.tiphint}</div>
    {/if}
  </div>

  <p class="hint">{@html ui.hint}</p>
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
