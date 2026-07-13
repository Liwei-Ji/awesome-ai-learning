<script>
  /* Ch · Context Window。模型一次能看多少 token＝上下文視窗。
     token 從右邊進來，視窗只留最近 N 個；超過就把最舊的擠出去（截斷/遺忘）。
     故事化教學：開頭的「密語 🍕」在視窗小時會被擠出 → 模型答不出密語；
     把視窗調大，它又回到視窗內。亮色舞台、無光暈。多語：顯示字串依 i18n.locale。 */
  import { onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const SPECIAL = 5; // 🍕 的位置（各語言的 seq 都把 🍕 放在此索引）
  // 密語訊息的顏色跨語言共用
  const SECRET_COLOR = { pending: 'var(--muted)', in: 'var(--teal)', out: 'var(--crit)' };

  const L = {
    zh: {
      // 逐 token 的一段對話（中文約一字一 token）；開頭埋入密語 🍕
      seq: ['記', '住', '密', '語', '是', '🍕', '。', '今', '天', '天', '氣', '真', '好', '，',
        '我', '們', '出', '去', '走', '走', '，', '聊', '了', '好', '多', '話', '題', '。', '那', '密', '語', '是', '？'],
      h3: '互動：視窗滿了，最舊的會被擠掉',
      lede: '模型一次只能讀進固定數量的 token＝<b>上下文視窗</b>。新內容從右邊進來，視窗只保留<b>最近 N 個</b>；一超過，<b>最舊的就被擠出去、被遺忘</b>。',
      winLabel: 'CONTEXT WINDOW · {n} tokens',
      kCap: '視窗容量', kInput: '已輸入', kForgot: '被遺忘',
      ctlLabel: '視窗大小 Context window（一次能看幾個 token）',
      scaleSmall: '小 · 便宜但健忘', scaleBig: '大 · 記得多但貴',
      btnAdd1: '+1 token', btnAuto: '▶ 自動輸入', btnPause: '⏸ 暫停', btnReset: '重置',
      secretMsg: {
        pending: '繼續輸入 token…',
        in: '🍕 密語還在視窗裡 → 模型答得出「密語是什麼」',
        out: '🍕 密語已被擠出視窗 → 模型看不到、答不出來',
      },
      hint: '這就是為什麼 AI 有時「忘了你前面說過的話」——不是它笨，是那段內容<b>掉出了視窗</b>。視窗越大能記得越多，但運算成本也越高。（想跨對話長期記得？那要靠下一站的 <b>Memory</b>。）',
    },
    en: {
      // A token-by-token snippet; the secret 🍕 sits at index SPECIAL (5)
      seq: ['Remember', 'the', 'secret', 'code', 'is', '🍕', '.', 'Today', 'the', 'weather', 'is', 'really', 'nice', ',',
        'we', 'went', 'out', 'for', 'a', 'walk', ',', 'chatting', 'about', 'lots', 'of', 'topics', '.', 'So', 'what', 'was', 'the', 'secret', '?'],
      h3: 'Interactive: when the window fills up, the oldest gets pushed out',
      lede: 'A model can only read a fixed number of tokens at once = the <b>context window</b>. New content comes in from the right, and the window keeps only the <b>most recent N</b>; go past that, and the <b>oldest gets pushed out and forgotten</b>.',
      winLabel: 'CONTEXT WINDOW · {n} tokens',
      kCap: 'Window size', kInput: 'Entered', kForgot: 'Forgotten',
      ctlLabel: 'Context window size (how many tokens it can see at once)',
      scaleSmall: 'Small · cheap but forgetful', scaleBig: 'Large · remembers more but costly',
      btnAdd1: '+1 token', btnAuto: '▶ Auto-type', btnPause: '⏸ Pause', btnReset: 'Reset',
      secretMsg: {
        pending: 'Keep adding tokens…',
        in: '🍕 The secret is still in the window → the model can answer “what’s the secret”',
        out: '🍕 The secret has been pushed out of the window → the model can’t see it and can’t answer',
      },
      hint: 'This is why AI sometimes “forgets what you said earlier”—it isn’t dumb; that content just <b>fell out of the window</b>. A bigger window remembers more, but the compute cost is higher too. (Want it to remember across conversations? That’s the job of the next stop, <b>Memory</b>.)',
    },
    ja: {
      // 一文字ずつのトークン列（日本語は中国語と同じく文字単位）；合言葉 🍕 は index SPECIAL (5)
      seq: ['合', '言', '葉', 'は', 'ね', '🍕', '。', '今', '日', 'は', 'い', 'い', '天', '気', 'で', '散', '歩', 'に', '出', 'て',
        'い', 'ろ', 'い', 'ろ', '話', 'し', 'た', '。', '合', '言', '葉', 'は', '？'],
      h3: 'インタラクティブ：ウィンドウが満杯になると、いちばん古いものが押し出される',
      lede: 'モデルが一度に読み込めるトークンの数には上限があります＝<b>コンテキストウィンドウ</b>。新しい内容は右から入ってきて、ウィンドウは<b>直近の N 個</b>だけを残します。そこを超えると、<b>いちばん古いものが押し出されて忘れられます</b>。',
      winLabel: 'コンテキストウィンドウ · {n} トークン',
      kCap: 'ウィンドウ容量', kInput: '入力済み', kForgot: '忘れられた',
      ctlLabel: 'コンテキストウィンドウの大きさ（一度に見られるトークン数）',
      scaleSmall: '小さい · 安いが忘れっぽい', scaleBig: '大きい · 多く覚えるが高い',
      btnAdd1: '+1 トークン', btnAuto: '▶ 自動入力', btnPause: '⏸ 一時停止', btnReset: 'リセット',
      secretMsg: {
        pending: 'トークンを入力し続けて…',
        in: '🍕 合言葉はまだウィンドウの中 → モデルは「合言葉は何」に答えられる',
        out: '🍕 合言葉はウィンドウから押し出された → モデルには見えず、答えられない',
      },
      hint: 'これが、AI がときどき「さっき言ったことを忘れる」理由——頭が悪いのではなく、その内容が<b>ウィンドウから外に出てしまった</b>だけ。ウィンドウが大きいほど多く覚えられますが、計算コストも高くなります。（会話をまたいで覚えてほしい？それは次の駅、<b>Memory</b> の役目です。）',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let n = $state(8);       // 視窗容量
  let count = $state(6);   // 已輸入 token 數（預設剛好露出密語）
  let running = $state(false);
  let timer;

  let lo = $derived(Math.max(0, count - n)); // 視窗內最舊的 index
  let revealed = $derived(ui.seq.slice(0, count).map((t, i) => ({ t, i, inWin: i >= lo })));
  let outTokens = $derived(revealed.filter((r) => !r.inWin));
  let inTokens = $derived(revealed.filter((r) => r.inWin));
  let forgotten = $derived(Math.max(0, count - n));

  let secret = $derived(
    count <= SPECIAL ? 'pending' : (SPECIAL >= lo ? 'in' : 'out')
  );

  function add(k = 1) { count = Math.min(ui.seq.length, count + k); }
  function auto() {
    if (running) { running = false; clearTimeout(timer); return; }
    if (count >= ui.seq.length) count = 0;
    running = true;
    const tick = () => {
      if (!running) return;
      if (count >= ui.seq.length) { running = false; return; }
      add(1); timer = setTimeout(tick, 620);
    };
    tick();
  }
  function reset() { clearTimeout(timer); running = false; count = 6; }

  onDestroy(() => clearTimeout(timer));
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="lane">
      {#if outTokens.length}
        <div class="grp faded">
          {#each outTokens as r (r.i)}
            <span class="tok out" class:special={r.i === SPECIAL}>{r.t}</span>
          {/each}
        </div>
      {/if}
      <div class="win">
        <span class="wlabel">{ui.winLabel.replace('{n}', n)}</span>
        {#each inTokens as r (r.i)}
          <span class="tok in" class:special={r.i === SPECIAL}
            in:fly={{ x: 26, duration: dur(D.base), easing: ease }}>{r.t}</span>
        {/each}
        <span class="cursor">▍</span>
      </div>
    </div>
  </div>

  <div class="stats">
    <div><span class="k">{ui.kCap}</span><span class="v mono">{n}</span></div>
    <div><span class="k">{ui.kInput}</span><span class="v mono">{count}</span></div>
    <div><span class="k">{ui.kForgot}</span><span class="v mono" class:warn={forgotten > 0}>{forgotten}</span></div>
  </div>

  <div class="ctl">
    <div class="lab"><span>{ui.ctlLabel}</span><b>{n}</b></div>
    <input type="range" min="4" max="24" step="1" bind:value={n} />
    <div class="scale"><span>{ui.scaleSmall}</span><span>{ui.scaleBig}</span></div>
  </div>

  <div class="btn-row">
    <button class="btn primary" onclick={() => add(1)} disabled={count >= ui.seq.length}>{ui.btnAdd1}</button>
    <button class="btn" onclick={() => add(5)} disabled={count >= ui.seq.length}>+5</button>
    <button class="btn" onclick={auto}>{running ? ui.btnPause : ui.btnAuto}</button>
    <button class="btn ghost" onclick={reset}>{ui.btnReset}</button>
  </div>

  <p class="status" style="color:{SECRET_COLOR[secret]}">{ui.secretMsg[secret]}</p>
  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }

  .lane {
    display: flex; align-items: center; justify-content: flex-end;
    gap: 10px; min-height: 92px; overflow: hidden;
    -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 12%);
    mask-image: linear-gradient(90deg, transparent 0, #000 12%);
  }
  .grp { display: flex; gap: 6px; flex: none; position: relative; top: 2px; }
  .faded { opacity: 1; }
  .win {
    position: relative; display: flex; gap: 6px; flex: none;
    justify-content: flex-end; min-width: 232px;
    padding: var(--sp-4) var(--sp-3) var(--sp-3); border-radius: var(--r);
    border: 1.5px solid var(--teal); background: #0f8a8010;
  }
  .wlabel {
    position: absolute; top: -9px; left: 12px; white-space: nowrap;
    font-family: var(--mono); font-size: var(--fs-eyebrow); letter-spacing: .12em;
    color: var(--teal); background: var(--surface); padding: 0 6px;
  }
  .tok {
    display: grid; place-items: center; min-width: 30px; height: 34px; padding: 0 6px;
    border-radius: var(--r-sm); font-size: 16px; font-family: var(--sans);
    transition: opacity .35s, background .35s, color .35s;
  }
  .tok.in {
    background: var(--accent);
    color: #3a1e00; font-weight: 600;
  }
  .tok.out { background: var(--surface-2); color: var(--muted); }
  .tok.special.in { box-shadow: inset 0 0 0 2px var(--teal); }
  .tok.special.out { box-shadow: inset 0 0 0 2px #d23f3f66; color: var(--crit); }
  .cursor { align-self: center; color: var(--accent); font-family: var(--mono); }

  .stats { display: flex; gap: 22px; margin: 10px 0 8px; }
  .stats .k { display: block; font-size: var(--fs-eyebrow); letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
  .stats .v { font-family: var(--mono); font-size: 22px; font-weight: 600; color: var(--ink); }
  .stats .v.warn { color: var(--crit); }

  .scale { display: flex; justify-content: space-between; font-size: var(--fs-micro); color: var(--muted); margin-top: 6px; }
  .status { font-size: var(--fs-sm); font-weight: 550; margin: var(--sp-3) 0 0; }
</style>
