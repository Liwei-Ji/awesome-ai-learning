<script>
  /* Ch · RAG 檢索增強生成 —— 引導式三步驟：① 提問 → ② 檢索知識庫 → ③ 生成回答。
     親手走一遍「先檢索、再生成」：按檢索看它依相似度找出片段，按生成看答案照片段長出來、附來源。
     最後對照「不查資料的話會幻覺」。亮色、確定性、離線。
     相似度（sims）、門檻（THRESH）跨語言共用；顯示字串依 i18n.locale。 */
  import { fade, fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';
  import Stepper from '../components/Stepper.svelte';

  const QS_SIMS = [
    { 1: 92, 2: 14, 3: 8, 4: 20, 5: 6 },
    { 1: 12, 2: 90, 3: 6, 4: 22, 5: 10 },
    { 1: 8, 2: 12, 3: 88, 4: 6, 5: 84 },
  ];
  const THRESH = 60;

  const L = {
    zh: {
      h3: '互動：讓 AI 先查資料再回答',
      lede: 'LLM 不一定記得你公司的規定，硬答就容易<b>「幻覺」</b>。<b>RAG</b> 的訣竅是順序： <b>先檢索</b>相關片段、<b>再生成</b>答案。跟著三步驟走一遍。',
      flow: ['提問', '檢索知識庫', '生成回答'],
      pick: '① 選一個問題',
      kbLabel: '知識庫 KNOWLEDGE BASE',
      kbRetrieved: '· 已依相似度檢索',
      kbNotYet: '· 尚未檢索',
      used: '✓ 取用',
      aiAnswer: 'AI 的回答',
      waiting0: '尚未開始——先按下方「▶ 檢索知識庫」。',
      waiting1: '已找到 <b>{n}</b> 段相關資料 ✓　接著按「▶ 生成回答」，讓 AI 照著它們作答。',
      sources: '來源：',
      peekQ: '如果不查資料會怎樣？',
      badtag: '⚠️ 憑記憶硬答＝可能是幻覺',
      retrieve: '▶ 檢索知識庫',
      generate: '▶ 生成回答',
      restart: '重來',
      hint: '這就是 <b>RAG（檢索增強生成）</b>：把「<b>檢索</b>」接在「<b>生成</b>」前面。好處是能答<b>私有或最新</b>的內容、<b>減少幻覺</b>、還能<b>附來源</b>。檢索靠的正是上一站的<b>向量相似度</b>——把問題和每段資料變成向量，找最接近的幾段。',
      kbT: ['請假規定', '退貨政策', '客服時間', '保固條款', '運費說明'],
      kbX: [
        '特休假每年最多可累積 10 天，逾期未休將歸零。',
        '商品可於購買後 14 天內申請退貨，需保持完整包裝。',
        '客服專線服務時間為平日 09:00–18:00。',
        '產品提供一年保固，人為損壞不在保固範圍。',
        '訂單滿 1000 元免運費，未滿酌收 80 元。',
      ],
      qs: [
        '特休假最多可以累積幾天？',
        '買了東西幾天內可以退貨？',
        '客服幾點有開？滿多少免運？',
      ],
      noRag: [
        '我不確定貴公司的規定，一般可能是 30 天左右吧？（這是我猜的）',
        '通常是 7 天鑑賞期吧？不過每家不同，我其實不太確定。',
        '客服大概是上班時間吧？免運門檻我就真的不知道了。',
      ],
      rag: [
        '根據內部規定，特休假每年最多可累積 <b>10 天</b>，逾期未休會歸零。',
        '依退貨政策，商品可於購買後 <b>14 天內</b>申請退貨，且需保持完整包裝。',
        '客服服務時間為<b>平日 09:00–18:00</b>；訂單<b>滿 1000 元免運</b>，未滿收 80 元。',
      ],
    },
    en: {
      h3: 'Interactive: let the AI look things up before it answers',
      lede: 'An LLM doesn’t always remember your company’s rules, and forcing an answer easily leads to <b>“hallucination.”</b> The knack of <b>RAG</b> is the order: <b>retrieve</b> the relevant passages first, <b>then generate</b> the answer. Walk through the three steps.',
      flow: ['Ask', 'Retrieve from KB', 'Generate answer'],
      pick: '① Pick a question',
      kbLabel: 'KNOWLEDGE BASE',
      kbRetrieved: '· retrieved by similarity',
      kbNotYet: '· not retrieved yet',
      used: '✓ Used',
      aiAnswer: 'The AI’s answer',
      waiting0: 'Not started yet—press “▶ Retrieve from KB” below first.',
      waiting1: 'Found <b>{n}</b> relevant passages ✓　Now press “▶ Generate answer” to have the AI answer based on them.',
      sources: 'Sources:',
      peekQ: 'What if it didn’t look anything up?',
      badtag: '⚠️ Answering from memory = possibly a hallucination',
      retrieve: '▶ Retrieve from KB',
      generate: '▶ Generate answer',
      restart: 'Restart',
      hint: 'That’s <b>RAG (Retrieval-Augmented Generation)</b>: putting “<b>retrieve</b>” before “<b>generate</b>.” The payoff is answering <b>private or up-to-date</b> content, <b>fewer hallucinations</b>, and being able to <b>cite sources</b>. Retrieval relies on the <b>vector similarity</b> from the previous stop—turn the question and each passage into vectors, then find the few closest.',
      kbT: ['Leave policy', 'Return policy', 'Support hours', 'Warranty terms', 'Shipping fees'],
      kbX: [
        'Annual leave accrues up to 10 days per year; unused days expire and reset to zero.',
        'Items can be returned within 14 days of purchase, and must keep their original packaging intact.',
        'The support hotline is open on weekdays, 09:00–18:00.',
        'Products come with a one-year warranty; accidental damage is not covered.',
        'Orders of NT$1,000 or more ship free; below that, an NT$80 fee applies.',
      ],
      qs: [
        'How many days of annual leave can I accrue at most?',
        'How many days do I have to return something I bought?',
        'What hours is support open? How much for free shipping?',
      ],
      noRag: [
        'I’m not sure about your company’s rules—usually maybe around 30 days? (I’m just guessing.)',
        'Usually there’s a 7-day trial period? But it varies by company, so I’m honestly not sure.',
        'Support is probably during business hours? As for the free-shipping threshold, I really have no idea.',
      ],
      rag: [
        'Per internal policy, annual leave accrues up to <b>10 days</b> per year, and unused days reset to zero.',
        'Per the return policy, items can be returned <b>within 14 days</b> of purchase, and must keep their original packaging.',
        'Support hours are <b>weekdays 09:00–18:00</b>; orders <b>over NT$1,000 ship free</b>, and below that an NT$80 fee applies.',
      ],
    },
    ja: {
      h3: 'インタラクティブ：AI に答える前に資料を調べさせる',
      lede: 'LLM はあなたの会社の規定を必ずしも覚えているとは限らず、無理に答えさせると<b>「幻覚」</b>を起こしがちです。<b>RAG</b> のコツは順序にあります：<b>まず</b>関連する断片を<b>検索</b>し、<b>それから</b>答えを<b>生成</b>する。3 つのステップをたどってみましょう。',
      flow: ['質問', '知識ベースを検索', '回答を生成'],
      pick: '① 質問を選ぶ',
      kbLabel: '知識ベース KNOWLEDGE BASE',
      kbRetrieved: '· 類似度で検索済み',
      kbNotYet: '· まだ検索していない',
      used: '✓ 使用',
      aiAnswer: 'AI の回答',
      waiting0: 'まだ始めていません——先に下の「▶ 知識ベースを検索」を押してください。',
      waiting1: '関連する資料を <b>{n}</b> 件見つけました ✓　次に「▶ 回答を生成」を押して、AI にそれらをもとに答えさせましょう。',
      sources: '出典：',
      peekQ: '資料を調べなかったらどうなる？',
      badtag: '⚠️ 記憶だけで答える＝幻覚の可能性あり',
      retrieve: '▶ 知識ベースを検索',
      generate: '▶ 回答を生成',
      restart: 'やり直す',
      hint: 'これが <b>RAG（検索拡張生成）</b>です：「<b>生成</b>」の前に「<b>検索</b>」を差し込みます。うれしいのは、<b>社内・最新</b>の内容にも答えられ、<b>幻覚が減り</b>、しかも<b>出典を添えられる</b>こと。検索が頼りにするのは前の章で見た<b>ベクトル類似度</b>です——質問と各断片をベクトルに変え、最も近いものをいくつか見つけます。',
      kbT: ['休暇規定', '返品ポリシー', 'サポート受付時間', '保証条件', '送料について'],
      kbX: [
        '特別休暇は年間最大 10 日まで繰り越せます。期限内に消化しないと 0 にリセットされます。',
        '商品は購入後 14 日以内であれば返品を申請できます。パッケージは完全な状態を保つ必要があります。',
        'サポート専用ダイヤルの受付時間は平日 09:00–18:00 です。',
        '製品には 1 年間の保証が付きます。人為的な破損は保証の対象外です。',
        'ご注文が 1,000 円以上で送料無料、それ未満は 80 円をいただきます。',
      ],
      qs: [
        '特別休暇って最大で何日ためられる？',
        '買ったものは何日以内なら返品できる？',
        'サポートは何時から開いてる？いくらで送料無料になる？',
      ],
      noRag: [
        '御社の規定はよく分かりませんが、普通は 30 日くらいでしょうか？（これは私の推測です）',
        '普通は 7 日間のクーリングオフでしょうか？ただ会社によって違うので、正直よく分かりません。',
        'サポートはたぶん営業時間内ですよね？送料無料の条件については、本当に分かりません。',
      ],
      rag: [
        '社内規定によると、特別休暇は年間最大 <b>10 日</b>まで繰り越せ、期限内に消化しないと 0 にリセットされます。',
        '返品ポリシーによると、商品は購入後 <b>14 日以内</b>であれば返品でき、パッケージは完全な状態を保つ必要があります。',
        'サポートの受付時間は<b>平日 09:00–18:00</b>です。ご注文が<b>1,000 円以上で送料無料</b>、それ未満は 80 円をいただきます。',
      ],
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let KB = $derived(ui.kbT.map((t, i) => ({ id: i + 1, t, x: ui.kbX[i] })));
  let QS = $derived(ui.qs.map((qt, i) => ({ q: qt, noRag: ui.noRag[i], rag: ui.rag[i], sims: QS_SIMS[i] })));

  let qIdx = $state(0);
  let step = $state(0);       // 0 已提問 · 1 已檢索 · 2 已生成
  let peek = $state(false);   // 偷看「不查資料」的答案

  let q = $derived(QS[qIdx]);
  let ranked = $derived(KB.map((c) => ({ ...c, sim: q.sims[c.id] })).sort((a, b) => b.sim - a.sim));
  let retrieved = $derived(ranked.filter((c) => c.sim >= THRESH));

  function selectQ(i) { qIdx = i; step = 0; peek = false; }
  function retrieve() { step = 1; }
  function generate() { step = 2; }
  function restart() { step = 0; peek = false; }
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <!-- 步驟指示 -->
    <Stepper steps={ui.flow} current={step} />

    <!-- 問題 -->
    <div class="qrow">
      <span class="mono k">{ui.pick}</span>
      <div class="pl-row">
        {#each QS as item, i}<button class="pl" class:on={i === qIdx} onclick={() => selectQ(i)}>{item.q}</button>{/each}
      </div>
    </div>

    <div class="grid">
      <div class="kb">
        <div class="mono k">{ui.kbLabel} {step >= 1 ? ui.kbRetrieved : ui.kbNotYet}</div>
        {#each ranked as c, r (c.id)}
          {@const used = step >= 1 && c.sim >= THRESH}
          <div class="chunk" class:used class:idle={step === 0}>
            <div class="chead">
              <b>{c.t}</b>
              {#if step >= 1}<span class="sim" transition:fade>{c.sim}%</span>{/if}
              {#if used}<span class="badge" in:fly={{ y: -4, duration: dur(D.fast) }}>{ui.used}</span>{/if}
            </div>
            <div class="ctext">{c.x}</div>
            <div class="simbar"><div class="simfill" class:hot={used} style="width:{step >= 1 ? c.sim : 0}%; transition-delay:{r * 90}ms"></div></div>
          </div>
        {/each}
      </div>

      <div class="ansside">
        <div class="mono k">{ui.aiAnswer}</div>
        {#if step < 2}
          <div class="waiting">
            {#if step === 0}{ui.waiting0}
            {:else}{@html ui.waiting1.replace('{n}', retrieved.length)}{/if}
          </div>
        {:else}
          <div class="answer good" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>{@html q.rag}</div>
          <div class="cites" in:fade={{ duration: dur(D.base), delay: dur(120) }}>
            <span class="cl">{ui.sources}</span>
            {#each retrieved as c}<span class="cite">📄 {c.t}</span>{/each}
          </div>
          <button class="peek" onclick={() => (peek = !peek)}>{peek ? '▾' : '▸'} {ui.peekQ}</button>
          {#if peek}
            <div class="answer bad" transition:fade={{ duration: dur(D.fast) }}>{q.noRag}<div class="badtag">{ui.badtag}</div></div>
          {/if}
        {/if}
      </div>
    </div>

    <!-- 步驟按鈕 -->
    <div class="guide-actions">
      <button class="btn primary" disabled={step !== 0} onclick={retrieve}>{ui.retrieve}</button>
      <span class="arrow2">→</span>
      <button class="btn primary" disabled={step !== 1} onclick={generate}>{ui.generate}</button>
      {#if step > 0}<button class="btn ghost" onclick={restart}>{ui.restart}</button>{/if}
    </div>
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .k { font-size: var(--fs-eyebrow); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: var(--sp-2); }

  .qrow { margin-bottom: var(--sp-3); }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
  .kb, .ansside { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 12px 14px; }

  .chunk { border: 1px solid var(--line); border-radius: var(--r); padding: 9px 11px; margin-bottom: var(--sp-2); background: var(--surface); transition: .25s; }
  .chunk:last-child { margin-bottom: 0; }
  .chunk.idle { opacity: .85; }
  .chunk.used { border-color: var(--teal); background: #0f8a800c; }
  .chead { display: flex; align-items: center; gap: var(--sp-2); font-size: var(--fs-sm); }
  .chead b { color: var(--ink); }
  .sim { margin-left: auto; font-family: var(--mono); font-size: var(--fs-micro); color: var(--muted); }
  .chunk.used .sim { color: var(--teal); }
  .badge { font-size: var(--fs-micro); color: var(--teal); border: 1px solid #0f8a8066; border-radius: 99px; padding: 1px 7px; }
  .ctext { font-size: var(--fs-cap); color: var(--muted); margin-top: var(--sp-1); line-height: 1.5; }
  .simbar { height: 5px; border-radius: 99px; background: var(--surface-3); overflow: hidden; margin-top: 7px; }
  .simfill { height: 100%; width: 0; background: var(--line-2); border-radius: 99px; transition: width .55s cubic-bezier(.2,.7,.2,1); }
  .simfill.hot { background: var(--teal); }

  .answer { border-radius: var(--r); padding: 12px 14px; font-size: var(--fs-body); line-height: 1.7; }
  .answer.good { background: #0f8a800c; border: 1px solid #0f8a8055; color: var(--ink); }
  .answer.good :global(b) { color: var(--teal); }
  .answer.bad { background: #fceaea; border: 1px solid #e8b4b4; color: var(--crit); margin-top: var(--sp-2); }
  .badtag { font-size: var(--fs-micro); margin-top: 6px; }
  .cites { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; margin-top: 10px; }
  .cl { font-size: var(--fs-micro); color: var(--muted); }
  .cite { font-size: var(--fs-micro); color: var(--teal); border: 1px solid #0f8a8055; border-radius: var(--r-sm); padding: 3px 8px; background: #0f8a800c; }
  .peek { margin-top: var(--sp-3); background: none; border: none; color: var(--muted); font-size: var(--fs-cap); cursor: pointer; padding: 0; }
  .peek:hover { color: var(--ink-2); }
</style>
