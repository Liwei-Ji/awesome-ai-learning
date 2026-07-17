<script>
  /* Ch6 · LLM Next-Token（核心互動）。
     state = ctx（開頭）+ picked（已生成的字）。distribution 由目前上下文衍生，
     每按一次生成就把機率最高的字接上去，示範「一次只預測下一個 Token」。 */
  import Bars from '../components/Bars.svelte';
  import { i18n } from '../stores/i18n.svelte.js';

  /* Token 示範資料依語言而異：中文以「字」為 token（逐字切），英文以「詞」為 token（依空白切）。
     結構相同（starts / follow / def / seed），只是切法與內容不同。 */
  const DATA = {
    zh: {
      starts: {
        我喜歡吃: [['飯', 40], ['水果', 30], ['麵', 20], ['肉', 10]],
        今天天氣: [['很好', 45], ['晴朗', 28], ['不錯', 17], ['糟糕', 10]],
        'AI 會改變': [['世界', 42], ['未來', 31], ['生活', 18], ['工作', 9]],
      },
      follow: {
        飯: [['。', 50], ['和', 25], ['麵', 15], ['，', 10]],
        水果: [['。', 48], ['和', 27], ['，', 15], ['跟', 10]],
        很好: [['。', 55], ['，', 25], ['呢', 12], ['！', 8]],
        世界: [['。', 46], ['的', 28], ['，', 16], ['！', 10]],
        未來: [['。', 44], ['的', 30], ['，', 16], ['會', 10]],
      },
      def: [['。', 60], ['，', 25], ['的', 15]],
      seed: (s) => [...s],
    },
    en: {
      starts: {
        'I like to eat': [['pizza', 38], ['rice', 27], ['fruit', 22], ['noodles', 13]],
        'The weather is': [['nice', 45], ['sunny', 28], ['warm', 17], ['cold', 10]],
        'AI will change': [['the', 48], ['our', 30], ['how', 12], ['everything', 10]],
      },
      follow: {
        pizza: [['and', 34], ['every', 26], ['.', 25], ['with', 15]],
        nice: [['and', 40], ['today', 30], ['.', 20], [',', 10]],
        the: [['world', 46], ['future', 28], ['way', 16], ['game', 10]],
        world: [['and', 38], ['.', 30], [',', 20], ['forever', 12]],
        and: [['more', 40], ['better', 30], ['faster', 18], ['.', 12]],
      },
      def: [['.', 60], [',', 25], ['and', 15]],
      seed: (s) => s.split(' '),
    },
    ja: {
      starts: {
        'わたしが好きなのは': [['寿司', 38], ['ごはん', 27], ['果物', 22], ['麺', 13]],
        '今日の天気は': [['いい', 45], ['晴れ', 28], ['暖かい', 17], ['寒い', 10]],
        'AI は世界を': [['変える', 42], ['変えて', 31], ['動かす', 18], ['広げる', 9]],
      },
      follow: {
        寿司: [['と', 34], ['が', 26], ['。', 25], ['も', 15]],
        いい: [['ね', 40], ['です', 30], ['。', 20], ['、', 10]],
        変える: [['。', 46], ['力', 28], ['、', 16], ['だろう', 10]],
        と: [['刺身', 40], ['天ぷら', 30], ['ごはん', 18], ['。', 12]],
        ね: [['。', 40], ['！', 30], ['、', 18], ['〜', 12]],
      },
      def: [['。', 60], ['、', 25], ['と', 15]],
      seed: (s) => [...s],
    },
  };

  const L = {
    zh: {
      h3: '互動：一個字一個字，長出句子',
      lede: '選一個開頭，按「生成下一個字」。模型每一步都算出一整排候選字的<b>機率</b>，挑一個接上去。',
      distH: '下一個 Token 的機率',
      gen: '⟳ 生成下一個字',
      done: '（示範到此）',
      restart: '重新開始',
      hint: '這就是 ChatGPT 的核心：<b>它不查答案，只是不斷預測下一個 Token</b>。挑機率最高的字接上去，重複幾百次，就成了一整段回答。',
    },
    en: {
      h3: 'Interactive: grow a sentence one word at a time',
      lede: 'Pick a starting phrase, then press “Generate next word.” At every step the model computes the <b>probability</b> of a whole row of candidate words and picks one to add on.',
      distH: 'Probability of the next token',
      gen: '⟳ Generate next word',
      done: '(End of demo)',
      restart: 'Start over',
      hint: 'This is the core of ChatGPT: <b>it doesn’t look things up, it just keeps predicting the next token</b>. Add on the highest-probability word, repeat a few hundred times, and a whole answer grows out.',
    },
    ja: {
      h3: 'インタラクティブ：一文字ずつ、文を育てる',
      lede: '書き出しを一つ選び、「次の文字を生成」を押してみましょう。モデルは毎ステップ、候補となる文字の一覧全体の<b>確率</b>を計算し、一つ選んでつなげます。',
      distH: '次のトークンの確率',
      gen: '⟳ 次の文字を生成',
      done: '（デモはここまで）',
      restart: '最初から',
      hint: 'これが ChatGPT の核心：<b>答えを調べているのではなく、ひたすら次のトークンを予測しているだけ</b>。最も確率の高い文字をつなげ、それを数百回くり返すと、まとまった回答が育ちます。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);
  let data = $derived(DATA[i18n.locale] || DATA.zh);
  let KEYS = $derived(Object.keys(data.starts));

  let ctx = $state(Object.keys((DATA[i18n.locale] || DATA.zh).starts)[0]);
  let picked = $state([]);

  // 切換語言時，重設為該語言的第一個開頭（中文 key 在英文資料裡不存在）。
  $effect(() => {
    const first = Object.keys((DATA[i18n.locale] || DATA.zh).starts)[0];
    if (!(DATA[i18n.locale] || DATA.zh).starts[ctx]) { ctx = first; picked = []; }
  });

  const curDist = () => {
    const last = picked.length ? picked[picked.length - 1] : ctx;
    return data.follow[last] || data.starts[ctx] || data.def;
  };

  let dist = $derived(picked.length ? curDist() : (data.starts[ctx] || data.def));
  let rows = $derived(dist.map((d, i) => ({ nm: `"${d[0]}"`, val: d[1], win: i === 0 })));
  let seed = $derived(data.seed(ctx));
  let full = $derived(picked.length >= 6);

  function init(k) { ctx = k; picked = []; }
  function gen() {
    const d = picked.length ? curDist() : (data.starts[ctx] || data.def);
    picked.push(d[0][0]);
  }
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="btn-row">
    {#each KEYS as k}
      <button class="btn" class:primary={k === ctx} onclick={() => init(k)}>{k}</button>
    {/each}
  </div>

  <div class="toks">
    {#each seed as ch}<span class="mono t seed">{ch}</span>{/each}
    {#each picked as ch}<span class="mono t pick">{ch}</span>{/each}
    <span class="mono cur">▍</span>
  </div>

  <div class="eyebrow dist-h">{ui.distH}</div>
  {#key picked.length}
    <Bars {rows} />
  {/key}

  <div class="btn-row acts">
    <button class="btn primary" disabled={full} onclick={gen}>{full ? ui.done : ui.gen}</button>
    <button class="btn ghost" onclick={() => init(ctx)}>{ui.restart}</button>
  </div>
  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .toks { display: flex; gap: 6px; flex-wrap: wrap; margin: var(--sp-4) 0; min-height: 36px; align-items: center; }
  .t { padding: 6px 9px; border-radius: var(--r-sm); font-size: var(--fs-body); }
  .seed { background: var(--surface-3); border: 1px solid var(--line); }
  .pick { background: var(--glow); border: 1px solid var(--accent); color: var(--accent-ink); }
  .cur { color: var(--accent); }
  .dist-h { margin-bottom: var(--sp-2); }
  .acts { margin-top: var(--sp-4); }
</style>
