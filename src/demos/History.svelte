<script>
  /* 序章 · AI 簡史 —— 互動時間軸（多語）。
     里程碑的年份與「能力水位」跨語言共用；標題/說明與 UI 字串依 i18n.locale 取用。 */
  import { fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const YEARS = ['1950', '1956', '1974–93', '1997', '2012', '2017', '2022', '2023+'];
  const CAPS = [6, 12, 8, 22, 46, 66, 86, 96];

  // 每個里程碑的 [標題, 說明]（依語言）
  const TX = {
    zh: [
      ['圖靈測試', '圖靈問「機器能思考嗎？」，提出用對話分辨人與機器的「模仿遊戲」。'],
      ['達特茅斯會議', '學者齊聚，首度提出「人工智慧（AI）」一詞，AI 正式成為一門研究領域。'],
      ['AI 寒冬', '期望過高、成果跟不上，資金與熱情兩度凍結，AI 沉寂了好一段時間。'],
      ['深藍擊敗棋王', 'IBM 深藍打敗西洋棋世界冠軍——但靠的是暴力計算，還不是「學習」。'],
      ['AlexNet', '深度神經網路在影像辨識大勝，證明「大量資料＋算力＋深層網路」的威力，引爆深度學習。'],
      ['Transformer', '一篇《Attention Is All You Need》提出 Transformer——今天所有 LLM 的架構基石。'],
      ['ChatGPT', '會聊天、會寫作的生成式 AI 走入大眾，短短兩個月就上億人使用。'],
      ['多模態與 Agent', 'AI 開始能看圖、聽聲、看影片，還能自己規劃、呼叫工具完成任務。'],
    ],
    en: [
      ['Turing Test', 'Turing asked “can machines think?” and proposed the “imitation game”—telling human from machine by conversation.'],
      ['Dartmouth Workshop', 'Researchers gathered and first coined “Artificial Intelligence (AI)”; AI became a field of study.'],
      ['AI Winter', 'Hype outran results; funding and enthusiasm froze twice, and AI went quiet for years.'],
      ['Deep Blue beats champion', 'IBM’s Deep Blue beat the world chess champion—but by brute-force calculation, not “learning.”'],
      ['AlexNet', 'A deep neural net dominated image recognition, proving the power of “big data + compute + deep networks,” igniting deep learning.'],
      ['Transformer', 'The paper “Attention Is All You Need” introduced the Transformer—the architectural foundation of every LLM today.'],
      ['ChatGPT', 'Generative AI that chats and writes reached the public—hundreds of millions of users in just two months.'],
      ['Multimodal & Agents', 'AI began to see images, hear audio, and watch video—and to plan and use tools to finish tasks on its own.'],
    ],
    ja: [
      ['チューリングテスト', 'チューリングは「機械は考えられるか」と問い、会話で人と機械を見分ける「模倣ゲーム」を提案した。'],
      ['ダートマス会議', '研究者が集まり、初めて「人工知能（AI）」という言葉を用い、AI が研究分野になった。'],
      ['AI の冬', '期待が成果を上回り、資金も熱意も二度凍りつき、AI は長く沈黙した。'],
      ['ディープブルーが王者に勝利', 'IBM のディープブルーがチェス世界王者を破った——ただし力任せの計算で、まだ「学習」ではない。'],
      ['AlexNet', '深いニューラルネットが画像認識で圧勝し、「大量データ＋計算力＋深い層」の威力を証明、深層学習に火をつけた。'],
      ['Transformer', '論文「Attention Is All You Need」が Transformer を提案——今日のあらゆる LLM の構造的基盤。'],
      ['ChatGPT', '会話も執筆もできる生成 AI が一般に普及——わずか 2 か月で数億人が利用。'],
      ['マルチモーダルとエージェント', 'AI は画像を見て、音を聞き、動画を見られるようになり、自ら計画しツールを使ってタスクを完了するように。'],
    ],
  };

  const UI = {
    zh: {
      h3: '互動：AI 是怎麼一路走到今天',
      lede: 'AI 不是突然出現的。走一遍幾個<b>關鍵轉折</b>，看它的能力怎麼<b>一階一階跳上來</b>（中間也跌過跤）。',
      cap: 'AI 能力水位', prev: '← 上一個', next: '下一個 →', done: '✓ 到今天了',
      hint: '看出規律了嗎？<b>2012 深度學習、2017 Transformer、2022 ChatGPT</b> 是三個大跳點——每一次都是<b>「架構或規模」的突破</b>，不是魔法。接下來的每一章，就是在拆解這些突破背後的原理。',
    },
    en: {
      h3: 'Interactive: how AI got to today',
      lede: 'AI didn’t appear overnight. Walk through a few <b>key turning points</b> and watch its ability <b>jump up, step by step</b> (with a stumble along the way).',
      cap: 'AI capability level', prev: '← Prev', next: 'Next →', done: '✓ Reached today',
      hint: 'See the pattern? <b>2012 deep learning, 2017 Transformer, 2022 ChatGPT</b> are the three big jumps—each a breakthrough in <b>architecture or scale</b>, not magic. Every chapter ahead unpacks the ideas behind them.',
    },
    ja: {
      h3: 'インタラクティブ：AI が今日に至るまで',
      lede: 'AI は突然現れたのではありません。いくつかの<b>重要な転換点</b>をたどり、その能力が<b>一段ずつ跳ね上がる</b>様子を見てみましょう（途中でつまずきもあります）。',
      cap: 'AI の能力レベル', prev: '← 前へ', next: '次へ →', done: '✓ 今日まで来た',
      hint: 'パターンが見えましたか？<b>2012 深層学習、2017 Transformer、2022 ChatGPT</b> が三つの大きな飛躍——いずれも<b>「構造や規模」の突破</b>で、魔法ではありません。この先の各章で、その裏にある原理を解き明かします。',
    },
  };

  let ui = $derived(UI[i18n.locale] || UI.zh);
  let tx = $derived(TX[i18n.locale] || TX.zh);
  let T = $derived(YEARS.map((y, i) => ({ y, cap: CAPS[i], t: tx[i][0], d: tx[i][1] })));

  let idx = $state(0);
  let cur = $derived(T[idx]);
  const pct = (i) => (i / (T.length - 1)) * 100;

  function prev() { if (idx > 0) idx -= 1; }
  function next() { if (idx < T.length - 1) idx += 1; }
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="cap">
      <span class="fieldk">{ui.cap}</span>
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

    {#key idx + '-' + i18n.locale}
      <div class="milestone" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
        <div class="mh"><span class="my mono">{cur.y}</span><b>{cur.t}</b></div>
        <p class="md">{cur.d}</p>
      </div>
    {/key}
  </div>

  <div class="guide-actions">
    <button class="btn" onclick={prev} disabled={idx === 0}>{ui.prev}</button>
    <button class="btn primary" onclick={next} disabled={idx === T.length - 1}>
      {idx === T.length - 1 ? ui.done : ui.next}
    </button>
  </div>

  <p class="hint">{@html ui.hint}</p>
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
