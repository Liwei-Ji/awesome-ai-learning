<script>
  /* Ch · 向量檢索，語意空間演示：12 段文件散在 2D 語意空間，意思相近的靠得近。
     選一個問題 → 問題向量落進同一個空間，最近的 k 段亮起並連線（字面不同也找得到）；
     切到關鍵字模式 → 只有字面命中的被圈起來（換句話說的全漏掉）。
     向量模式畫出「鄰域圈」傳達 ANN 直覺：跳到問題附近，不必全掃。
     亮色、確定性、離線。字串依 i18n.locale。 */
  import { fade, fly } from 'svelte/transition';
  import { Search, Hash } from '@lucide/svelte';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const L = {
    zh: {
      h3: '互動：在語意空間裡找最近的 k 段',
      lede: '下面是 12 段公司文件在<b>語意空間</b>裡的位置：意思相近的段落靠得近。選一個問題，看它落在哪裡、<b>最近的 k 段</b>是誰；再切到關鍵字模式，看字面比對漏掉了什麼。',
      pick: '選一個問題',
      pickHint: '先選一個問題，看它落進語意空間的哪裡。',
      modeVec: '向量模式',
      modeKw: '關鍵字模式',
      legendDoc: '文件段落',
      legendQ: '問題向量',
      legendHit: '最近的 k=3 段',
      legendKw: '關鍵字命中',
      passages: ['年假規定 7 天', '請假單流程', '病假要診斷證明', '報帳月底前送出', '出差交通費標準', '發票遺失補救', '忘記密碼重設', 'VPN 連線設定', '新人帳號開通', '會議室預約', '門禁刷卡規則', 'v2.3.1 發行說明'],
      questions: [
        { q: '「我可以休幾天假？」', kwText: '關鍵字「休假」<b>一段都沒中</b>：相關三段寫的是「年假」「請假」「病假」，字不同、意思同，字面比對全漏掉。' },
        { q: '「電腦登不進去怎麼辦？」', kwText: '關鍵字「登入」<b>只中了 v2.3.1 發行說明</b>（裡面剛好有「登入」二字），真正能解決問題的「密碼重設」「VPN」「帳號開通」全漏掉。' },
        { q: '「出差的錢怎麼拿回來？」', kwText: '關鍵字「錢」<b>一段都沒中</b>：相關三段寫的是「報帳」「交通費」「發票」，照字面找等於白找。' },
      ],
      vecNote: '問題落進<b>和段落同一個空間</b>，取距離最近的 3 段（top-k）：字面不同、意思相近，一樣找得到。',
      annNote: 'ANN 的直覺：不必逐一掃過全部段落，先<b>跳到問題附近的鄰域</b>（虛線圈），只細看那一小區。犧牲一點點準確，換來快上幾個數量級。',
      hint: '這就是<b>向量檢索</b>：問題和段落進<b>同一個向量空間</b>，搜尋＝找最近鄰（常用 cosine 相似度＋top-k）。但別忘了關鍵字模式那一幕反過來也成立：<b>精確字串（代號、版本號）是關鍵字檢索的強項</b>，所以實務上預設<b>混合檢索＋重排</b>。',
    },
    en: {
      h3: 'Interactive: find the k nearest in semantic space',
      lede: 'Below are 12 company-document passages placed in a <b>semantic space</b>: passages close in meaning sit close together. Pick a question, see where it lands and which <b>k nearest passages</b> light up; then switch to keyword mode to see what literal matching misses.',
      pick: 'Pick a question',
      pickHint: 'Pick a question first and watch where it lands in the semantic space.',
      modeVec: 'Vector mode',
      modeKw: 'Keyword mode',
      legendDoc: 'Document passage',
      legendQ: 'Query vector',
      legendHit: 'k=3 nearest',
      legendKw: 'Keyword hit',
      passages: ['Annual leave: 7 days', 'Leave request form', 'Sick leave: doctor’s note', 'Expenses due month-end', 'Travel fare limits', 'Lost receipt fix', 'Password reset', 'VPN setup', 'New account request', 'Meeting room booking', 'Door badge rules', 'v2.3.1 release notes'],
      questions: [
        { q: '“How many days off do I get?”', kwText: 'The keyword “days off” <b>hits nothing</b>: the three relevant passages say “annual leave”, “leave request”, “sick leave”. Same meaning, different words, all missed.' },
        { q: '“I can’t log in to my computer”', kwText: 'The keyword “log in” <b>hits only the v2.3.1 release notes</b> (they happen to mention a login page), while “password reset”, “VPN setup”, and “account request”, the passages that actually help, are all missed.' },
        { q: '“How do I get my travel money back?”', kwText: 'The keyword “money” <b>hits nothing</b>: the relevant passages say “expenses”, “fares”, “receipt”. A literal match finds none of them.' },
      ],
      vecNote: 'The question lands in <b>the same space as the passages</b>, and the 3 closest are taken (top-k): different wording, close meaning, still found.',
      annNote: 'The ANN intuition: no need to scan every passage one by one, first <b>jump to the neighborhood around the question</b> (dashed circle) and only inspect that small region. A tiny bit of accuracy traded for orders-of-magnitude speed.',
      hint: 'This is <b>vector search</b>: the question and the passages share <b>one vector space</b>, and searching = finding nearest neighbors (usually cosine similarity plus top-k). But keyword mode cuts both ways: <b>exact strings (codes, version numbers) are where keyword search shines</b>, which is why practice defaults to <b>hybrid retrieval plus rerank</b>.',
    },
    ja: {
      h3: 'インタラクティブ：意味空間で最も近い k 段落を探す',
      lede: '下は 12 段の社内文書を<b>意味空間</b>に置いたものです。意味が近い段落は近くに集まります。質問を選び、どこに落ちるか、<b>最も近い k 段落</b>はどれかを見てください。次にキーワードモードに切り替え、字面照合が何を取りこぼすかを確かめましょう。',
      pick: '質問を選ぶ',
      pickHint: 'まず質問を選び、意味空間のどこに落ちるかを見ましょう。',
      modeVec: 'ベクトルモード',
      modeKw: 'キーワードモード',
      legendDoc: '文書の段落',
      legendQ: '質問のベクトル',
      legendHit: '最も近い k=3 段落',
      legendKw: 'キーワード命中',
      passages: ['年休は 7 日', '休暇申請の手順', '病欠は診断書', '経費は月末まで', '出張交通費の上限', '領収書紛失の対処', 'パスワード再設定', 'VPN 接続設定', 'アカウント開設申請', '会議室の予約', '入館カード規則', 'v2.3.1 リリースノート'],
      questions: [
        { q: '「何日休めますか？」', kwText: 'キーワード「休める」は<b>どれにも当たりません</b>。関連する三つは「年休」「休暇申請」「病欠」と別の言葉で書かれており、字面の照合ではすべて取りこぼします。' },
        { q: '「パソコンにログインできない」', kwText: 'キーワード「ログイン」が当たるのは <b>v2.3.1 リリースノートだけ</b>（たまたま「ログイン」の文字がある）。本当に役立つ「パスワード再設定」「VPN」「アカウント開設」はすべて漏れます。' },
        { q: '「出張のお金はどう戻る？」', kwText: 'キーワード「お金」は<b>どれにも当たりません</b>。関連する三つは「経費」「交通費」「領収書」と書かれており、字面どおりに探しても見つかりません。' },
      ],
      vecNote: '質問は<b>段落と同じ空間</b>に落ち、距離が最も近い 3 段落を取ります（top-k）。字面が違っても、意味が近ければ見つかります。',
      annNote: 'ANN の直覚：全段落を一つずつ走査せず、まず<b>質問の近所（点線の円）へ跳び</b>、その小さな領域だけを細かく見ます。ほんの少しの精度と引き換えに、桁違いの速さを得ます。',
      hint: 'これが<b>ベクトル検索</b>です。質問と段落は<b>同じベクトル空間</b>に入り、検索＝最近傍探し（定番はコサイン類似度＋top-k）。ただしキーワードモードの一幕は逆向きにも成り立ちます。<b>正確な文字列（コード、バージョン番号）はキーワード検索の得意分野</b>。だから実務の既定は<b>ハイブリッド検索＋リランク</b>です。',
    },
  };

  // 語意空間座標（viewBox 0 0 100 64）：休假群（左上）、報帳群（右上）、IT 群（下中）、零散三段
  const PTS = [
    { x: 14, y: 14 }, { x: 27, y: 10 }, { x: 22, y: 22 },   // 0-2 休假
    { x: 70, y: 12 }, { x: 84, y: 18 }, { x: 75, y: 26 },   // 3-5 報帳
    { x: 43, y: 44 }, { x: 57, y: 41 }, { x: 50, y: 53 },   // 6-8 IT
    { x: 38, y: 28 }, { x: 62, y: 31 }, { x: 88, y: 46 },   // 9-11 零散（11 = v2.3.1）
  ];
  const QPOS = [{ x: 20, y: 15 }, { x: 50, y: 46 }, { x: 78, y: 17 }]; // 各問題落點
  const KW = [[], [11], []]; // 各問題「字面命中」的段落
  const K = 3;

  let ui = $derived(L[i18n.locale] || L.zh);

  let qi = $state(-1);        // -1 = 尚未選問題
  let mode = $state('vec');   // 'vec' | 'kw'

  let near = $derived.by(() => {
    if (qi < 0) return [];
    const q = QPOS[qi];
    return PTS.map((p, i) => ({ i, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 }))
      .sort((a, b) => a.d - b.d).slice(0, K).map((o) => o.i);
  });
  let ring = $derived(qi < 0 ? 0 : Math.sqrt(Math.max(...near.map((i) => (PTS[i].x - QPOS[qi].x) ** 2 + (PTS[i].y - QPOS[qi].y) ** 2))) + 4);
  let kwHits = $derived(qi < 0 ? [] : KW[qi]);

  const anchor = (x) => (x > 78 ? 'end' : x < 12 ? 'start' : 'middle');
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="qrow">
      <span class="mono k">{ui.pick}</span>
      {#each ui.questions as item, i}
        <button class="btn chip" class:primary={qi === i} onclick={() => (qi = i)}>{item.q}</button>
      {/each}
    </div>

    <div class="mrow">
      <button class="btn mode" class:primary={mode === 'vec'} onclick={() => (mode = 'vec')}><Search size={14} /> {ui.modeVec}</button>
      <button class="btn mode" class:primary={mode === 'kw'} onclick={() => (mode = 'kw')}><Hash size={14} /> {ui.modeKw}</button>
    </div>

    <svg viewBox="0 0 100 64" class="space" role="img" aria-label={ui.h3}>
      {#if qi >= 0 && mode === 'vec'}
        <!-- ANN 鄰域圈：跳到問題附近，只細看這一區 -->
        <circle cx={QPOS[qi].x} cy={QPOS[qi].y} r={ring} class="hood" in:fade={{ duration: dur(D.base) }} />
        {#each near as i (qi + '-' + i)}
          <line x1={QPOS[qi].x} y1={QPOS[qi].y} x2={PTS[i].x} y2={PTS[i].y} class="link" in:fade={{ duration: dur(D.base) }} />
        {/each}
      {/if}

      {#each PTS as p, i}
        <circle cx={p.x} cy={p.y} r="1.6" class="dot"
                class:hit={qi >= 0 && mode === 'vec' && near.includes(i)}
                class:kwhit={qi >= 0 && mode === 'kw' && kwHits.includes(i)} />
        {#if qi >= 0 && mode === 'kw' && kwHits.includes(i)}
          <circle cx={p.x} cy={p.y} r="3.4" class="kwring" in:fade={{ duration: dur(D.fast) }} />
        {/if}
        {#if qi >= 0 && mode === 'kw' && near.includes(i)}
          <circle cx={p.x} cy={p.y} r="3.4" class="missring" in:fade={{ duration: dur(D.fast) }} />
        {/if}
        <text x={p.x} y={p.y + 4.6} text-anchor={anchor(p.x)} class="lbl">{ui.passages[i]}</text>
      {/each}

      {#if qi >= 0}
        <g in:fade={{ duration: dur(D.base) }}>
          <circle cx={QPOS[qi].x} cy={QPOS[qi].y} r="2.2" class="q" />
          <circle cx={QPOS[qi].x} cy={QPOS[qi].y} r="0.8" class="qcore" />
        </g>
      {/if}
    </svg>

    <div class="legend mono">
      <span class="li"><span class="sw dot-sw"></span>{ui.legendDoc}</span>
      <span class="li"><span class="sw q-sw"></span>{ui.legendQ}</span>
      {#if mode === 'vec'}<span class="li"><span class="sw hit-sw"></span>{ui.legendHit}</span>
      {:else}<span class="li"><span class="sw kw-sw"></span>{ui.legendKw}</span>{/if}
    </div>

    {#if qi < 0}
      <div class="note">{ui.pickHint}</div>
    {:else if mode === 'vec'}
      <div class="note ok" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>{@html ui.vecNote}</div>
      <div class="note ann" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>{@html ui.annNote}</div>
    {:else}
      <div class="note bad" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>{@html ui.questions[qi].kwText}</div>
    {/if}
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .k { font-size: var(--fs-eyebrow); letter-spacing: .1em; color: var(--muted); margin-right: var(--sp-1); }

  .qrow { display: flex; flex-wrap: wrap; align-items: center; gap: var(--sp-2); margin-bottom: var(--sp-2); }
  .mrow { display: flex; gap: var(--sp-2); margin-bottom: var(--sp-2); }
  .btn.chip { font-size: var(--fs-sm); }
  .btn.mode { display: inline-flex; align-items: center; gap: 6px; font-size: var(--fs-sm); }

  .space { display: block; width: 100%; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); }
  .dot { fill: var(--line-2); }
  .dot.hit { fill: var(--teal); }
  .dot.kwhit { fill: var(--crit); }
  .lbl { font-size: 2.6px; fill: var(--muted); }
  .q { fill: none; stroke: var(--teal); stroke-width: .5; }
  .qcore { fill: var(--teal); }
  .link { stroke: var(--teal); stroke-width: .4; opacity: .7; }
  .hood { fill: #0f8a800c; stroke: var(--teal); stroke-width: .3; stroke-dasharray: 1.4 1.2; opacity: .8; }
  .kwring { fill: none; stroke: var(--crit); stroke-width: .5; }
  .missring { fill: none; stroke: var(--line-2); stroke-width: .35; stroke-dasharray: 1 1; }

  .legend { display: flex; flex-wrap: wrap; gap: var(--sp-3); margin-top: var(--sp-2); font-size: var(--fs-micro); color: var(--muted); }
  .li { display: inline-flex; align-items: center; gap: 6px; }
  .sw { width: 9px; height: 9px; border-radius: 99px; flex: none; }
  .dot-sw { background: var(--line-2); }
  .q-sw { background: var(--teal); }
  .hit-sw { background: var(--teal); opacity: .55; }
  .kw-sw { background: var(--crit); }

  .note { border-radius: var(--r); padding: 9px 11px; font-size: var(--fs-cap); line-height: 1.6; margin-top: var(--sp-2); color: var(--muted); background: var(--surface-3); border: 1px solid var(--line); }
  .note.ok { background: #0f8a800c; border-color: #0f8a8055; color: var(--ink); }
  .note.ok :global(b) { color: var(--teal); }
  .note.ann { color: var(--ink-2); }
  .note.bad { background: #fceaea; border-color: #e8b4b4; color: var(--crit); }
</style>
