<script>
  /* Ch · 總結：你能用 AI 做什麼。把整條課程的積木組成真實方案。
     選一個目標，看要用到哪些概念（點積木可跳回該章複習）——把地圖變成行動。亮色、離線。 */
  import { CH } from '../data/chapters.js';
  import { go } from '../stores/state.svelte.js';

  const BLOCKS = [
    { slug: 'data', label: '資料' }, { slug: 'llm', label: '大型語言模型' }, { slug: 'prompt', label: 'Prompt' },
    { slug: 'rag', label: 'RAG 檢索' }, { slug: 'fine-tuning', label: 'Fine-tuning' }, { slug: 'memory', label: 'Memory' },
    { slug: 'agent', label: 'AI Agent' }, { slug: 'mcp', label: 'MCP' }, { slug: 'generative', label: '生成式 AI' },
  ];
  const GOALS = [
    { label: '公司知識問答機器人', need: { data: '公司內部文件＝知識來源', llm: '理解問題、生成回答', rag: '查公司內部文件並附來源', prompt: '設定角色與回答格式', memory: '記住使用者的情境' } },
    { label: '品牌客服助手', need: { data: 'FAQ、訂單、對話當語料', llm: '對話核心', 'fine-tuning': '學會品牌專屬語氣', rag: '查 FAQ 與訂單資料', prompt: '禮貌用語與處理流程', memory: '記住這位客戶' } },
    { label: '幫我安排行程的助理', need: { data: '你的行事曆與偏好', llm: '理解你的目標', agent: '自己拆步驟、呼叫工具', mcp: '用標準接上行事曆／地圖', memory: '記住你的偏好' } },
    { label: 'AI 生圖工具', need: { data: '模型背後的海量訓練圖像', generative: '從雜訊去噪成圖', prompt: '描述你想要的畫面' } },
  ];

  let idx = $state(0);
  let goal = $derived(GOALS[idx]);
  const idOf = (slug) => Number(Object.keys(CH).find((k) => CH[k].slug === slug));
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：組裝你的 AI 方案</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    恭喜你走完整條路 🎓 從資料、模型、LLM 到 Agent，每一章都是一塊積木。
    挑一個真實目標，看它需要用到哪些積木——這就是<b>設計 AI 應用</b>的思路。（點積木可跳回該章複習）
  </p>

  <div class="demo-stage light">
    <div class="pills">
      <span class="mono k">我想做：</span>
      {#each GOALS as g, i}<button class="pl" class:on={i === idx} onclick={() => (idx = i)}>{g.label}</button>{/each}
    </div>

    <div class="mono k blab">課程積木（亮起＝這個方案會用到）</div>
    <div class="blocks">
      {#each BLOCKS as b}
        {@const need = goal.need[b.slug]}
        <button class="block" class:on={need} onclick={() => go(idOf(b.slug))} title="跳到該章複習">
          {b.label}
        </button>
      {/each}
    </div>

    <div class="recipe">
      <div class="mono k">方案配方 · {goal.label}</div>
      {#each BLOCKS.filter((b) => goal.need[b.slug]) as b, i}
        <div class="step">
          <span class="sn">{i + 1}</span>
          <span class="sb">{b.label}</span>
          <span class="sw">{goal.need[b.slug]}</span>
        </div>
      {/each}
    </div>
  </div>

  <p class="hint">
    看出來了嗎？大多數 AI 產品，都是這些積木的<b>組合</b>。開始的訣竅：先用<b>現成模型 + 好提示</b>解決八成問題，
    需要私有資料就加 <b>RAG</b>、要固定風格再 <b>微調</b>、要自動執行才上 <b>Agent</b>。
    最後一件事——<b>永遠驗證 AI 的輸出</b>。你已經有整張地圖了，去做點東西吧！
  </p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .k { font-size: var(--fs-eyebrow); letter-spacing: .1em; color: var(--muted); }
  .blab { display: block; margin: var(--sp-1) 0 var(--sp-2); }
  .pills { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; margin-bottom: var(--sp-3); }
  .pl { font-size: var(--fs-cap); padding: 6px 13px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); }
  .pl:hover { border-color: var(--accent); color: var(--accent-ink); }
  .pl.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }

  .blocks { display: flex; flex-wrap: wrap; gap: var(--sp-2); margin-bottom: var(--sp-4); }
  .block { font-size: var(--fs-cap); padding: 8px 14px; border-radius: var(--r); border: 1px solid var(--line); background: var(--surface-2); color: var(--muted); cursor: pointer; transition: .2s; opacity: .55; }
  .block:hover { border-color: var(--accent); }
  .block.on { opacity: 1; background: #0f8a800c; border-color: var(--teal); color: var(--teal); font-weight: 600; box-shadow: 0 0 12px #0f8a8018; }

  .recipe { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 12px 14px; }
  .step { display: grid; grid-template-columns: 22px 96px 1fr; align-items: center; gap: var(--sp-2); padding: 7px 0; border-bottom: 1px dashed var(--line); font-size: var(--fs-sm); }
  .step:last-child { border-bottom: none; }
  .sn { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; background: var(--accent); color: #241500; font-family: var(--mono); font-size: var(--fs-micro); }
  .sb { color: var(--teal); font-weight: 600; }
  .sw { color: var(--ink-2); }
</style>
