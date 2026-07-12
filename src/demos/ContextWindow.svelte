<script>
  /* Ch · Context Window。模型一次能看多少 token＝上下文視窗。
     token 從右邊進來，視窗只留最近 N 個；超過就把最舊的擠出去（截斷/遺忘）。
     故事化教學：開頭的「密語 🍕」在視窗小時會被擠出 → 模型答不出密語；
     把視窗調大，它又回到視窗內。亮色舞台、無光暈。 */
  import { onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';

  // 逐 token 的一段對話（中文約一字一 token）；開頭埋入密語 🍕
  const SEQ = ['記', '住', '密', '語', '是', '🍕', '。', '今', '天', '天', '氣', '真', '好', '，',
    '我', '們', '出', '去', '走', '走', '，', '聊', '了', '好', '多', '話', '題', '。', '那', '密', '語', '是', '？'];
  const SPECIAL = 5; // 🍕 的位置

  let n = $state(8);       // 視窗容量
  let count = $state(6);   // 已輸入 token 數（預設剛好露出密語）
  let running = $state(false);
  let timer;

  let lo = $derived(Math.max(0, count - n)); // 視窗內最舊的 index
  let revealed = $derived(SEQ.slice(0, count).map((t, i) => ({ t, i, inWin: i >= lo })));
  let outTokens = $derived(revealed.filter((r) => !r.inWin));
  let inTokens = $derived(revealed.filter((r) => r.inWin));
  let forgotten = $derived(Math.max(0, count - n));

  let secret = $derived(
    count <= SPECIAL ? 'pending' : (SPECIAL >= lo ? 'in' : 'out')
  );
  const SECRET_MSG = {
    pending: ['繼續輸入 token…', 'var(--muted)'],
    in: ['🍕 密語還在視窗裡 → 模型答得出「密語是什麼」', 'var(--teal)'],
    out: ['🍕 密語已被擠出視窗 → 模型看不到、答不出來', 'var(--crit)'],
  };

  function add(k = 1) { count = Math.min(SEQ.length, count + k); }
  function auto() {
    if (running) { running = false; clearTimeout(timer); return; }
    if (count >= SEQ.length) count = 0;
    running = true;
    const tick = () => {
      if (!running) return;
      if (count >= SEQ.length) { running = false; return; }
      add(1); timer = setTimeout(tick, 620);
    };
    tick();
  }
  function reset() { clearTimeout(timer); running = false; count = 6; }

  onDestroy(() => clearTimeout(timer));
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：視窗滿了，最舊的會被擠掉</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    模型一次只能讀進固定數量的 token＝<b>上下文視窗</b>。新內容從右邊進來，
    視窗只保留<b>最近 N 個</b>；一超過，<b>最舊的就被擠出去、被遺忘</b>。
  </p>

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
        <span class="wlabel">CONTEXT WINDOW · {n} tokens</span>
        {#each inTokens as r (r.i)}
          <span class="tok in" class:special={r.i === SPECIAL}
            in:fly={{ x: 26, duration: dur(D.base), easing: ease }}>{r.t}</span>
        {/each}
        <span class="cursor">▍</span>
      </div>
    </div>
  </div>

  <div class="stats">
    <div><span class="k">視窗容量</span><span class="v mono">{n}</span></div>
    <div><span class="k">已輸入</span><span class="v mono">{count}</span></div>
    <div><span class="k">被遺忘</span><span class="v mono" class:warn={forgotten > 0}>{forgotten}</span></div>
  </div>

  <div class="ctl">
    <div class="lab"><span>視窗大小 Context window（一次能看幾個 token）</span><b>{n}</b></div>
    <input type="range" min="4" max="24" step="1" bind:value={n} />
    <div class="scale"><span>小 · 便宜但健忘</span><span>大 · 記得多但貴</span></div>
  </div>

  <div class="btn-row">
    <button class="btn primary" onclick={() => add(1)} disabled={count >= SEQ.length}>+1 token</button>
    <button class="btn" onclick={() => add(5)} disabled={count >= SEQ.length}>+5</button>
    <button class="btn" onclick={auto}>{running ? '⏸ 暫停' : '▶ 自動輸入'}</button>
    <button class="btn ghost" onclick={reset}>重置</button>
  </div>

  <p class="status" style="color:{SECRET_MSG[secret][1]}">{SECRET_MSG[secret][0]}</p>
  <p class="hint">
    這就是為什麼 AI 有時「忘了你前面說過的話」——不是它笨，是那段內容<b>掉出了視窗</b>。
    視窗越大能記得越多，但運算成本也越高。（想跨對話長期記得？那要靠下一站的 <b>Memory</b>。）
  </p>
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
