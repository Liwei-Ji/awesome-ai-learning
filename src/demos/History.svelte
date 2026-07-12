<script>
  /* 序章 · AI 簡史 —— 互動時間軸。
     點/走過幾個關鍵轉折，看 AI「能力水位」怎麼一階一階跳上來
     （寒冬會回落）。純狀態驅動、亮色、離線。 */
  import { fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';

  const T = [
    { y: '1950', t: '圖靈測試', d: '圖靈問「機器能思考嗎？」，提出用對話分辨人與機器的「模仿遊戲」。', cap: 6 },
    { y: '1956', t: '達特茅斯會議', d: '學者齊聚，首度提出「人工智慧（AI）」一詞，AI 正式成為一門研究領域。', cap: 12 },
    { y: '1974–93', t: 'AI 寒冬', d: '期望過高、成果跟不上，資金與熱情兩度凍結，AI 沉寂了好一段時間。', cap: 8 },
    { y: '1997', t: '深藍擊敗棋王', d: 'IBM 深藍打敗西洋棋世界冠軍——但靠的是暴力計算，還不是「學習」。', cap: 22 },
    { y: '2012', t: 'AlexNet', d: '深度神經網路在影像辨識大勝，證明「大量資料＋算力＋深層網路」的威力，引爆深度學習。', cap: 46 },
    { y: '2017', t: 'Transformer', d: '一篇《Attention Is All You Need》提出 Transformer——今天所有 LLM 的架構基石。', cap: 66 },
    { y: '2022', t: 'ChatGPT', d: '會聊天、會寫作的生成式 AI 走入大眾，短短兩個月就上億人使用。', cap: 86 },
    { y: '2023+', t: '多模態與 Agent', d: 'AI 開始能看圖、聽聲、看影片，還能自己規劃、呼叫工具完成任務。', cap: 96 },
  ];

  let idx = $state(0);
  let cur = $derived(T[idx]);
  const pct = (i) => (i / (T.length - 1)) * 100;

  function prev() { if (idx > 0) idx -= 1; }
  function next() { if (idx < T.length - 1) idx += 1; }
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：AI 是怎麼一路走到今天</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    AI 不是突然出現的。走一遍幾個<b>關鍵轉折</b>，看它的能力怎麼<b>一階一階跳上來</b>（中間也跌過跤）。
  </p>

  <div class="demo-stage light">
    <div class="cap">
      <span class="fieldk">AI 能力水位</span>
      <div class="capbar"><div class="capfill" style="width:{cur.cap}%"></div></div>
    </div>

    <div class="track">
      <div class="line"></div>
      <div class="line fill" style="width:{pct(idx)}%"></div>
      {#each T as m, i}
        <button class="dot" class:on={i === idx} class:done={i < idx} style="left:{pct(i)}%"
          onclick={() => (idx = i)} aria-label="{m.y} {m.t}">
          <span class="yr mono">{m.y}</span>
        </button>
      {/each}
    </div>

    {#key idx}
      <div class="milestone" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
        <div class="mh"><span class="my mono">{cur.y}</span><b>{cur.t}</b></div>
        <p class="md">{cur.d}</p>
      </div>
    {/key}
  </div>

  <div class="guide-actions">
    <button class="btn" onclick={prev} disabled={idx === 0}>← 上一個</button>
    <button class="btn primary" onclick={next} disabled={idx === T.length - 1}>
      {idx === T.length - 1 ? '✓ 到今天了' : '下一個 →'}
    </button>
  </div>

  <p class="hint">
    看出規律了嗎？<b>2012 深度學習、2017 Transformer、2022 ChatGPT</b> 是三個大跳點——每一次都是
    <b>「架構或規模」的突破</b>，不是魔法。接下來的每一章，就是在拆解這些突破背後的原理。
  </p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-4); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }

  .cap { margin-bottom: var(--sp-5); }
  .capbar { height: 10px; border-radius: 99px; background: var(--surface-3); overflow: hidden; margin-top: 6px; }
  .capfill { height: 100%; border-radius: 99px; background: var(--teal); transition: width .45s cubic-bezier(.2,.7,.2,1); }

  .track { position: relative; height: 46px; margin: 0 14px var(--sp-2); }
  .line { position: absolute; top: 15px; left: 0; right: 0; height: 3px; border-radius: 99px; background: var(--line-2); }
  .line.fill { right: auto; background: var(--accent); transition: width .35s ease; z-index: 1; }
  .dot {
    position: absolute; top: 15px; transform: translate(-50%, -50%); z-index: 2;
    width: 15px; height: 15px; border-radius: 50%; padding: 0;
    background: var(--surface); border: 2px solid var(--line-2); cursor: pointer; transition: .18s;
  }
  .dot .yr { position: absolute; top: 16px; left: 50%; transform: translateX(-50%);
    font-size: 10px; color: var(--muted); white-space: nowrap; transition: color .18s; }
  .dot.done { border-color: var(--accent); background: var(--accent); }
  .dot.on { border-color: var(--accent); background: var(--accent); box-shadow: 0 0 0 4px var(--glow); width: 17px; height: 17px; }
  .dot.on .yr, .dot.done .yr { color: var(--accent-ink); font-weight: 600; }

  .milestone { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 14px 16px; }
  .mh { display: flex; align-items: baseline; gap: 10px; }
  .my { font-size: var(--fs-sm); color: var(--accent-ink); font-weight: 600; }
  .mh b { font-size: var(--fs-lg); letter-spacing: var(--ls-tight); }
  .md { margin: 8px 0 0; font-size: var(--fs-body); color: var(--ink-2); line-height: var(--lh-snug); }
</style>
