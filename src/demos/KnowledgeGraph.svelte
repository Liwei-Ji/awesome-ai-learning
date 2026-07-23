<script>
  /* Ch · 知識圖譜與 GraphRAG，對照式演示：同一個「多跳問題」交給兩種檢索。
     左邊平面 RAG 用關鍵字撈片段，每段都相關卻彼此無關，湊不出因果、答不出「為什麼」。
     右邊 GraphRAG 從問題的實體出發，沿著「肇因於」的關係邊一路追蹤，把鏈條走出來，得到根本原因。
     按「追蹤關係」一跳一跳走。亮色、確定性、離線。字串依 i18n.locale。 */
  import { fade, fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const L = {
    zh: {
      h3: '互動：多跳問題，兩種檢索的差別',
      lede: '問一個答案<b>散在多份文件</b>的問題：平面 <b>RAG</b> 靠關鍵字撈片段，每段都「相關」卻串不起來；<b>GraphRAG</b> 沿著<b>關係</b>一路追蹤，把因果鏈走出來。',
      q: '「為什麼上一季的轉換率掉了 23%？」',
      flatLabel: 'FLAT RAG · 比對關鍵字',
      graphLabel: 'GRAPHRAG · 沿關係走',
      matched: '命中',
      chunks: [
        { t: 'Q3 營運週報', x: '本季轉換率較上季下滑 23%。', tag: '轉換率 · 23%' },
        { t: '客服工單摘要', x: '多位使用者反映結帳過程卡卡的、要等很久。', tag: '結帳' },
        { t: '供應商往來紀錄', x: '供應商 X 於 8 月通報一批出貨延遲。', tag: '供應商' },
        { t: '維運事件日誌', x: '8/12 倉庫管理系統發生停機事故。', tag: '倉庫' },
      ],
      flatVerdict: '✗ 四段都「相關」，卻彼此無關聯 → 湊不出因果，答不出「為什麼」。',
      nodes: ['轉換率 −23%', '結帳延遲', '供應商出貨延遲', '倉庫系統故障'],
      startTag: '問題的實體',
      rootTag: '根本原因',
      edge: '肇因於',
      trace: '▶ 追蹤關係',
      next: '▶ 再走一跳',
      restart: '重來',
      hopHint: '從問題的實體出發，按下方按鈕沿「肇因於」的邊一路往回走。',
      answerLabel: 'GraphRAG 的答案',
      answer: '轉換率 −23% ← 結帳延遲 ← 供應商出貨延遲 ← <b>倉庫系統故障</b>。<b>根本原因是那次倉庫系統停機</b>，這條鏈沒有任何一段文字單獨講得清楚。',
      hint: '差別在<b>檢索方式</b>：平面 RAG <b>比對文字</b>，只能各自撈出相關片段；GraphRAG <b>沿關係走</b>，把散在多份文件的事實串成一條路徑。這正是它擅長<b>多跳問題</b>的原因，也因此更省 token、幻覺更少。訣竅是：<b>圖的品質比模型大小更關鍵</b>。',
    },
    en: {
      h3: 'Interactive: one multi-hop question, two ways to retrieve',
      lede: 'Ask a question whose answer is <b>scattered across documents</b>: flat <b>RAG</b> pulls chunks by keyword, each “relevant” yet unconnected; <b>GraphRAG</b> follows the <b>relationships</b> to trace the causal chain.',
      q: '“Why did conversion drop 23% last quarter?”',
      flatLabel: 'FLAT RAG · match keywords',
      graphLabel: 'GRAPHRAG · follow relationships',
      matched: 'match',
      chunks: [
        { t: 'Q3 ops weekly', x: 'Conversion fell 23% versus the prior quarter.', tag: 'conversion · 23%' },
        { t: 'Support ticket digest', x: 'Several users report checkout felt sluggish and slow to load.', tag: 'checkout' },
        { t: 'Supplier records', x: 'Supplier X flagged a batch shipping delay in August.', tag: 'supplier' },
        { t: 'Ops incident log', x: 'Warehouse management system outage on Aug 12.', tag: 'warehouse' },
      ],
      flatVerdict: '✗ All four are “relevant” yet unrelated to each other → no causal chain, so it can’t answer “why.”',
      nodes: ['Conversion −23%', 'Checkout delay', 'Supplier shipping delay', 'Warehouse system outage'],
      startTag: 'the question’s entity',
      rootTag: 'root cause',
      edge: 'caused by',
      trace: '▶ Trace relationships',
      next: '▶ One more hop',
      restart: 'Restart',
      hopHint: 'Start from the question’s entity and press the button to walk back along the “caused by” edges.',
      answerLabel: 'GraphRAG’s answer',
      answer: 'Conversion −23% ← checkout delay ← supplier shipping delay ← <b>warehouse system outage</b>. <b>The root cause is that warehouse outage</b>, a chain no single passage spells out on its own.',
      hint: 'The difference is the <b>retrieval method</b>: flat RAG <b>matches text</b> and can only surface relevant chunks in isolation; GraphRAG <b>follows relationships</b> and threads facts from many documents into one path. That is why it shines on <b>multi-hop questions</b>, and why it uses fewer tokens with fewer hallucinations. The knack: <b>graph quality matters more than model size</b>.',
    },
    ja: {
      h3: 'インタラクティブ：一つのマルチホップ質問、二つの検索',
      lede: '答えが<b>複数の文書に散らばる</b>質問をします：平面的な <b>RAG</b> はキーワードで断片を撈い、どれも「関連」するのにつながりません；<b>GraphRAG</b> は<b>関係</b>をたどり、因果の鎖を追います。',
      q: '「前四半期に転換率が 23% 下がったのはなぜ？」',
      flatLabel: 'FLAT RAG · キーワード照合',
      graphLabel: 'GRAPHRAG · 関係をたどる',
      matched: '命中',
      chunks: [
        { t: 'Q3 運用週報', x: '当四半期の転換率は前四半期比で 23% 低下。', tag: '転換率 · 23%' },
        { t: 'サポート問い合わせ要約', x: '複数のユーザーが決済がもたつき、待たされると報告。', tag: '決済' },
        { t: 'サプライヤー取引記録', x: 'サプライヤー X が 8 月に一括出荷の遅延を報告。', tag: 'サプライヤー' },
        { t: '運用インシデント記録', x: '8/12 に倉庫管理システムの停止が発生。', tag: '倉庫' },
      ],
      flatVerdict: '✗ 四つとも「関連」するのに互いに無関係 → 因果がつながらず、「なぜ」に答えられない。',
      nodes: ['転換率 −23%', '決済の遅延', 'サプライヤー出荷遅延', '倉庫システム停止'],
      startTag: '質問の実体',
      rootTag: '根本原因',
      edge: 'の原因',
      trace: '▶ 関係をたどる',
      next: '▶ もう一ホップ',
      restart: 'やり直す',
      hopHint: '質問の実体から出発し、ボタンで「の原因」のエッジをたどって戻ります。',
      answerLabel: 'GraphRAG の答え',
      answer: '転換率 −23% ← 決済の遅延 ← サプライヤー出荷遅延 ← <b>倉庫システム停止</b>。<b>根本原因はあの倉庫システムの停止</b>で、どの一段落も単独では語れない鎖です。',
      hint: '違いは<b>検索の方法</b>です：平面的な RAG は<b>テキストを照合し</b>、関連する断片を個別に出すだけ；GraphRAG は<b>関係をたどり</b>、複数文書の事実を一本の経路につなぎます。だから<b>マルチホップの質問</b>に強く、トークンも少なく幻覚も減ります。コツは：<b>グラフの品質はモデルの大きさより重要</b>。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let hop = $state(0); // 0 = 只顯示起點；每按一次前進一跳
  let last = $derived(ui.nodes.length - 1);
  let done = $derived(hop >= last);

  function trace() { if (hop < last) hop += 1; }
  function restart() { hop = 0; }
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="qbar">{ui.q}</div>

    <div class="grid">
      <!-- 平面 RAG：關鍵字撈片段 -->
      <div class="side flat">
        <div class="mono k">{ui.flatLabel}</div>
        {#each ui.chunks as c}
          <div class="chunk">
            <div class="chead"><b>{c.t}</b><span class="mtag">{ui.matched}: {c.tag}</span></div>
            <div class="ctext">{c.x}</div>
          </div>
        {/each}
        <div class="verdict bad">{ui.flatVerdict}</div>
      </div>

      <!-- GraphRAG：沿關係走 -->
      <div class="side graph">
        <div class="mono k">{ui.graphLabel}</div>
        <div class="chain">
          {#each ui.nodes as label, i}
            {#if i <= hop}
              {#if i > 0}
                <div class="edge" in:fade={{ duration: dur(D.fast) }}>
                  <span class="earrow">↑</span><span class="elabel">{ui.edge}</span>
                </div>
              {/if}
              <div class="node" class:start={i === 0} class:root={i === last && done}
                   in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
                <span class="ndot"></span>
                <span class="nlabel">{label}</span>
                {#if i === 0}<span class="ntag">{ui.startTag}</span>{/if}
                {#if i === last && done}<span class="ntag root">{ui.rootTag}</span>{/if}
              </div>
            {/if}
          {/each}
        </div>

        {#if !done}
          <div class="hophint">{ui.hopHint}</div>
        {:else}
          <div class="answer" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
            <div class="mono k2">{ui.answerLabel}</div>
            {@html ui.answer}
          </div>
        {/if}
      </div>
    </div>

    <div class="guide-actions">
      <button class="btn primary" disabled={done} onclick={trace}>{hop === 0 ? ui.trace : ui.next}</button>
      {#if hop > 0}<button class="btn ghost" onclick={restart}>{ui.restart}</button>{/if}
    </div>
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .k { font-size: var(--fs-eyebrow); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: var(--sp-2); }
  .k2 { font-size: var(--fs-eyebrow); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: var(--sp-1); }

  .qbar { background: var(--surface-3); border: 1px solid var(--line); border-radius: var(--r); padding: 10px 14px; font-size: var(--fs-body); color: var(--ink); margin-bottom: var(--sp-3); }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
  .side { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 12px 14px; }

  .chunk { border: 1px solid var(--line); border-radius: var(--r); padding: 9px 11px; margin-bottom: var(--sp-2); background: var(--surface); opacity: .9; }
  .chead { display: flex; align-items: center; gap: var(--sp-2); font-size: var(--fs-sm); }
  .chead b { color: var(--ink); }
  .mtag { margin-left: auto; font-family: var(--mono); font-size: var(--fs-micro); color: var(--muted); border: 1px solid var(--line); border-radius: 99px; padding: 1px 7px; }
  .ctext { font-size: var(--fs-cap); color: var(--muted); margin-top: var(--sp-1); line-height: 1.5; }
  .verdict { border-radius: var(--r); padding: 9px 11px; font-size: var(--fs-cap); line-height: 1.6; margin-top: var(--sp-1); }
  .verdict.bad { background: #fceaea; border: 1px solid #e8b4b4; color: var(--crit); }

  .chain { display: flex; flex-direction: column; align-items: stretch; }
  .node { display: flex; align-items: center; gap: var(--sp-2); border: 1px solid var(--line); border-radius: var(--r); padding: 9px 11px; background: var(--surface); font-size: var(--fs-sm); }
  .node.start { border-color: var(--line-2); }
  .node.root { border-color: var(--teal); background: #0f8a800c; }
  .ndot { width: 9px; height: 9px; border-radius: 99px; background: var(--line-2); flex: none; }
  .node.root .ndot { background: var(--teal); }
  .nlabel { color: var(--ink); }
  .node.root .nlabel { color: var(--teal); font-weight: 600; }
  .ntag { margin-left: auto; font-size: var(--fs-micro); color: var(--muted); border: 1px solid var(--line); border-radius: 99px; padding: 1px 7px; }
  .ntag.root { color: var(--teal); border-color: #0f8a8066; }
  .edge { display: flex; align-items: center; gap: 6px; padding: 4px 0 4px 10px; }
  .earrow { color: var(--teal); font-weight: 700; }
  .elabel { font-size: var(--fs-micro); color: var(--muted); }

  .hophint { font-size: var(--fs-cap); color: var(--muted); margin-top: var(--sp-3); line-height: 1.6; }
  .answer { border-radius: var(--r); padding: 12px 14px; font-size: var(--fs-body); line-height: 1.7; background: #0f8a800c; border: 1px solid #0f8a8055; color: var(--ink); margin-top: var(--sp-3); }
  .answer :global(b) { color: var(--teal); }
</style>
