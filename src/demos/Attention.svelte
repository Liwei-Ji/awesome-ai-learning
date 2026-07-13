<script>
  /* Ch13 · Transformer Attention（核心互動）—— 引導式「先想再揭曉」。
     ① 讀句子：先把代名詞用 accent 標示，讓你先猜「他/牠」指誰（不畫弧線）。
     ② 看注意力：按下才用 draw transition 畫出弧線、顯示百分比、揭曉答案。
     切換句子會回到步驟 0，重新思考。亮色、確定性、離線。 */
  import { draw } from 'svelte/transition';
  import { clamp } from '../lib/helpers.js';
  import { dur } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';
  import Stepper from '../components/Stepper.svelte';

  const L = {
    zh: {
      h3: '互動：「他」到底指誰？',
      lede: '先自己猜「他／牠」指的是誰，再按鈕看 <b>Attention</b>（注意力）怎麼從代名詞連到正確的主角。線越粗＝注意力越高。',
      steps: ['讀句子', '看注意力'],
      join: '',
      fieldk: '① 選一個句子',
      cap: '「{pron}」→ {ans}',
      waiting: '先想想：這個橘色的「<b>{pron}</b>」指的是誰？想好後按下方「▶ 顯示注意力」揭曉。',
      reveal: '▶ 顯示注意力',
      restart: '重來',
      hint: '同一個「他」，指誰要看<b>上下文</b>。Attention 讓每個字算出「該多注意句子裡的哪些字」——這是機器第一次真正讀懂句子關係的關鍵。',
      sents: [
        { toks: ['小明', '喜歡', '小華', '，', '因為', '他', '很帥'], pron: 5, att: { 小明: 0.72, 小華: 0.18, 很帥: 0.10 }, ans: '小明' },
        { toks: ['小華', '喜歡', '小明', '，', '因為', '他', '很帥'], pron: 5, att: { 小華: 0.70, 小明: 0.20, 很帥: 0.10 }, ans: '小華' },
        { toks: ['貓', '追', '老鼠', '，', '然後', '牠', '累了'], pron: 5, att: { 貓: 0.68, 老鼠: 0.22, 累了: 0.10 }, ans: '貓' },
      ],
    },
    en: {
      h3: 'Interactive: who does “he / it” really refer to?',
      lede: 'First guess who “he / it” refers to on your own, then press the button to watch <b>Attention</b> link the pronoun to the right subject. The thicker the line, the higher the attention.',
      steps: ['Read the sentence', 'See the attention'],
      join: ' ',
      fieldk: '① Pick a sentence',
      cap: '“{pron}” → {ans}',
      waiting: 'First think: who does this orange “<b>{pron}</b>” refer to? Once you have a guess, press “▶ Show attention” below to reveal it.',
      reveal: '▶ Show attention',
      restart: 'Restart',
      hint: 'The same word “he” can point to different subjects depending on <b>context</b>. Attention lets every word work out “which words in the sentence it should focus on”—this is what let machines truly read the relationships between words for the first time.',
      sents: [
        { toks: ['Ming', 'likes', 'Hua', ',', 'because', 'he', 'is handsome'], pron: 5, att: { Ming: 0.72, Hua: 0.18, 'is handsome': 0.10 }, ans: 'Ming' },
        { toks: ['Hua', 'likes', 'Ming', ',', 'because', 'he', 'is handsome'], pron: 5, att: { Hua: 0.70, Ming: 0.20, 'is handsome': 0.10 }, ans: 'Hua' },
        { toks: ['cat', 'chased', 'mouse', ',', 'then', 'it', 'got tired'], pron: 5, att: { cat: 0.68, mouse: 0.22, 'got tired': 0.10 }, ans: 'cat' },
      ],
    },
    ja: {
      h3: 'インタラクティブ：「彼」は結局だれを指す？',
      lede: 'まず自分で「彼／それ」がだれを指すか当ててみて、それからボタンを押して <b>Attention（注意）</b> が代名詞を正しい主語につなぐ様子を見てみましょう。線が太いほど注意が高い。',
      steps: ['文を読む', '注意を見る'],
      join: '',
      fieldk: '① 文を選ぶ',
      cap: '「{pron}」→ {ans}',
      waiting: 'まず考えてみて：このオレンジ色の「<b>{pron}</b>」はだれを指す？答えが決まったら、下の「▶ 注意を表示」を押して確かめよう。',
      reveal: '▶ 注意を表示',
      restart: 'やり直す',
      hint: '同じ「彼」でも、だれを指すかは<b>文脈</b>しだいで変わります。Attention は各単語に「文中のどの単語に注目すべきか」を計算させる——機械が単語どうしの関係を初めて本当に読み取れるようになった鍵です。',
      sents: [
        { toks: ['ケン', 'は', 'ヒロ', 'が好き', 'なぜなら', '彼', 'はかっこいいから'], pron: 5, att: { ケン: 0.72, ヒロ: 0.18, 'はかっこいいから': 0.10 }, ans: 'ケン' },
        { toks: ['ヒロ', 'は', 'ケン', 'が好き', 'なぜなら', '彼', 'はかっこいいから'], pron: 5, att: { ヒロ: 0.70, ケン: 0.20, 'はかっこいいから': 0.10 }, ans: 'ヒロ' },
        { toks: ['猫', 'が', 'ネズミ', 'を追った', 'そして', 'それ', 'は疲れた'], pron: 5, att: { 猫: 0.68, ネズミ: 0.22, 'は疲れた': 0.10 }, ans: '猫' },
      ],
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let sel = $state(0);
  let step = $state(0);       // 0 讀句子（先想）· 1 看注意力（揭曉）
  let s = $derived(ui.sents[sel]);

  const wd = (t) => Math.max(34, t.length * 15 + 16);

  let layout = $derived.by(() => {
    const toks = s.toks, n = toks.length;
    const gap = Math.min(80, 540 / n);
    const startX = (560 - (n - 1) * gap) / 2, y = 110;
    const pos = toks.map((_, i) => startX + i * gap);
    const px = pos[s.pron];
    const arcs = Object.entries(s.att).map(([w, a]) => {
      const ti = toks.indexOf(w);
      if (ti < 0 || ti === s.pron) return null;
      const tx = pos[ti], mx = (px + tx) / 2, hgt = 40 + a * 30;
      return {
        d: `M ${px} ${y - 16} Q ${mx} ${y - 16 - hgt} ${tx} ${y - 16}`,
        w: clamp(a * 11, 1, 9), op: clamp(0.25 + a, 0.3, 0.95),
        lx: mx, ly: y - 20 - hgt, pct: Math.round(a * 100),
      };
    }).filter(Boolean);
    return { toks, pos, y, px, arcs, pron: s.pron };
  });

  function selectSent(i) { sel = i; step = 0; }
  function reveal() { step = 1; }
  function restart() { step = 0; }
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <!-- 步驟指示 -->
    <Stepper steps={ui.steps} current={step} />

    <!-- 選句子 -->
    <div class="qrow">
      <span class="fieldk">{ui.fieldk}</span>
      <div class="pl-row">
        {#each ui.sents as st, i}
          <button class="pl" class:on={i === sel} onclick={() => selectSent(i)}>{st.toks.join(ui.join)}</button>
        {/each}
      </div>
    </div>

    <svg class="att" viewBox="0 0 560 150">
      {#if step >= 1}
        {#key sel}
          {#each layout.arcs as arc}
            <path d={arc.d} fill="none" stroke="var(--accent)" stroke-width={arc.w}
              opacity={arc.op} stroke-linecap="round" in:draw={{ duration: dur(600) }} />
            <text class="pct" x={arc.lx} y={arc.ly} text-anchor="middle">{arc.pct}%</text>
          {/each}
        {/key}
      {/if}
      {#each layout.toks as t, i}
        <rect x={layout.pos[i] - wd(t) / 2} y={layout.y - 15} width={wd(t)} height="30" rx="8"
          fill={i === layout.pron ? 'var(--accent)' : 'var(--surface-3)'}
          stroke={i === layout.pron ? 'var(--accent)' : 'var(--line-2)'} />
        <text class="tok" x={layout.pos[i]} y={layout.y + 5} text-anchor="middle"
          fill={i === layout.pron ? '#241500' : 'var(--ink-2)'}>{t}</text>
      {/each}
      {#if step >= 1}
        <text class="cap" x="280" y="145" text-anchor="middle">{ui.cap.replace('{pron}', s.toks[s.pron]).replace('{ans}', s.ans)}</text>
      {/if}
    </svg>

    {#if step === 0}
      <div class="waiting">
        {@html ui.waiting.replace('{pron}', s.toks[s.pron])}
      </div>
    {/if}

    <!-- 步驟按鈕 -->
    <div class="guide-actions">
      <button class="btn primary" disabled={step !== 0} onclick={reveal}>{ui.reveal}</button>
      {#if step > 0}<button class="btn ghost" onclick={restart}>{ui.restart}</button>{/if}
    </div>
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .qrow { margin-bottom: var(--sp-3); }
  .att { width: 100%; height: auto; }
  .att .tok { font-size: var(--fs-sm); font-family: var(--sans); }
  .att .pct { font-size: var(--fs-micro); font-family: var(--mono); fill: var(--accent-ink); }
  .att .cap { font-size: var(--fs-cap); font-family: var(--mono); fill: var(--muted); }
</style>
