<script>
  /* Ch · 序列模型 RNN。一次讀一個字，讀過的濃縮成 hidden state；句子一長，開頭被稀釋（健忘），
     而且一個接一個不能平行。切到 Transformer：所有字一次看、互相連結、不再變淡。亮色舞台。多語。 */
  import { onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const L = {
    zh: {
      h3: '互動：一次讀一個字，開頭會慢慢忘',
      lede: 'RNN 順著順序讀，把讀過的濃縮成一個<b>隱藏狀態</b>當記憶。句子一長，<b>開頭被稀釋</b>；而且一個接一個<b>不能平行</b>。切到 Transformer 看對比。',
      modeRnn: 'RNN：一次一個字', modeTf: 'Transformer：一次看全句',
      hidden: '隱藏狀態（記憶）', readN: '讀到第 {k} / {n} 個字',
      btnStep: '+1 讀一個字', btnAuto: '▶ 自動', btnPause: '⏸ 暫停', btnReset: '重置',
      rnnHint: '一個接一個、還會忘：開頭的字已經淡到看不清。這就是 RNN 的<b>健忘</b>與<b>慢</b>。',
      tfHint: '一次看全句，每個字直接連到所有字（<b>Attention</b>），再遠也不忘，而且能<b>平行</b>。這就是下一課的 Transformer。',
      words: ['那', '隻', '貓', '追', '老', '鼠', '跑', '走', '了'],
    },
    en: {
      h3: 'Interactive: read one word at a time, the start fades',
      lede: 'An RNN reads in order and squeezes what it has read into one <b>hidden state</b> as memory. On a long sentence the <b>start gets diluted</b>, and one-word-at-a-time <b>cannot run in parallel</b>. Flip to Transformer to compare.',
      modeRnn: 'RNN: one word at a time', modeTf: 'Transformer: whole sentence at once',
      hidden: 'Hidden state (memory)', readN: 'read word {k} / {n}',
      btnStep: '+1 word', btnAuto: '▶ Auto', btnPause: '⏸ Pause', btnReset: 'Reset',
      rnnHint: 'One after another, and forgetful: the first words have faded out of view. That is the RNN being <b>forgetful</b> and <b>slow</b>.',
      tfHint: 'It sees the whole sentence at once, each word linked to every word (<b>Attention</b>), nothing far is forgotten, and it runs in <b>parallel</b>. That is the Transformer, next lesson.',
      words: ['The', 'cat', 'chased', 'the', 'mouse', 'and', 'then', 'ran', 'away'],
    },
    ja: {
      h3: 'インタラクティブ：一語ずつ読むと、最初が薄れる',
      lede: 'RNN は順番に読み、読んだ内容を一つの<b>隠れ状態</b>に圧縮して記憶にします。文が長いと<b>最初が薄まり</b>、一語ずつなので<b>並列にできません</b>。Transformer に切り替えて比べましょう。',
      modeRnn: 'RNN：一語ずつ', modeTf: 'Transformer：一文を一度に',
      hidden: '隠れ状態（記憶）', readN: '{n} 語中 {k} 語目',
      btnStep: '+1 語', btnAuto: '▶ 自動', btnPause: '⏸ 一時停止', btnReset: 'リセット',
      rnnHint: '一つずつで、しかも忘れる：最初の語はもう見えないほど薄い。これが RNN の<b>忘れやすさ</b>と<b>遅さ</b>です。',
      tfHint: '一文を一度に見て、各語がすべての語とつながり（<b>Attention</b>）、遠くても忘れず、<b>並列</b>で動く。これが次の Transformer です。',
      words: ['ネコ', 'が', 'ネズミ', 'を', '追って', 'そのまま', '走って', 'いって', 'しまった'],
    },
  };
  let ui = $derived(L[i18n.locale] || L.zh);
  let words = $derived(ui.words);

  let mode = $state('rnn');
  let step = $state(3);
  let running = $state(false);
  let timer;

  function opacityOf(i) {
    if (mode === 'tf') return 1;
    if (i >= step) return 0.14;            // not read yet
    const age = (step - 1) - i;            // 0 = current word
    return Math.max(0.16, 1 - age * 0.13); // older fades
  }
  function add(k = 1) { step = Math.min(words.length, step + k); }
  function auto() {
    if (running) { running = false; clearTimeout(timer); return; }
    if (step >= words.length) step = 1;
    running = true;
    const tick = () => {
      if (!running) return;
      if (step >= words.length) { running = false; return; }
      add(1); timer = setTimeout(tick, 620);
    };
    tick();
  }
  function reset() { clearTimeout(timer); running = false; step = 3; }
  function setMode(m) { mode = m; if (m === 'tf') { clearTimeout(timer); running = false; } }
  onDestroy(() => clearTimeout(timer));

  let readK = $derived(mode === 'tf' ? words.length : step);
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="modes">
    <button class="mode" class:on={mode === 'rnn'} onclick={() => setMode('rnn')}>{ui.modeRnn}</button>
    <button class="mode" class:on={mode === 'tf'} onclick={() => setMode('tf')}>{ui.modeTf}</button>
  </div>

  <div class="demo-stage light">
    <div class="words" class:tf={mode === 'tf'}>
      {#each words as w, i}
        <span class="tok" class:cur={mode === 'rnn' && i === step - 1} class:tf={mode === 'tf'} style="opacity:{opacityOf(i)}">{w}</span>
      {/each}
    </div>
    <div class="hid" class:tf={mode === 'tf'}>
      <span class="hlabel">{ui.hidden}</span>
      <div class="dots">
        {#each [0, 1, 2, 3, 4] as d}<span class="d" class:on={mode === 'tf' || d < Math.min(5, readK)}></span>{/each}
      </div>
      {#if mode === 'rnn'}<span class="rc">{ui.readN.replace('{k}', step).replace('{n}', words.length)}</span>{/if}
    </div>
  </div>

  {#if mode === 'rnn'}
    <div class="btn-row">
      <button class="btn primary" onclick={() => add(1)} disabled={step >= words.length}>{ui.btnStep}</button>
      <button class="btn" onclick={auto}>{running ? ui.btnPause : ui.btnAuto}</button>
      <button class="btn ghost" onclick={reset}>{ui.btnReset}</button>
    </div>
  {/if}

  {#key mode + (mode === 'rnn' ? step : 0)}
    <p class="hint" in:fly={{ y: 6, duration: dur(D.base), easing: ease }}>{@html mode === 'tf' ? ui.tfHint : ui.rnnHint}</p>
  {/key}
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .lede :global(b) { color: var(--ink); }

  .modes { display: flex; gap: 8px; margin-bottom: 12px; }
  .mode { flex: 1; border: 1px solid var(--line); background: var(--surface); color: var(--ink-2); font-family: inherit; font-size: var(--fs-sm); font-weight: 600; padding: 9px 10px; border-radius: var(--r-sm); cursor: pointer; transition: .15s; }
  .mode:hover { border-color: var(--accent); }
  .mode.on { border-color: var(--accent); background: var(--accent); color: #3a1e00; }

  .words { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; min-height: 60px; align-items: center; }
  .tok { display: grid; place-items: center; min-width: 30px; height: 38px; padding: 0 10px; border-radius: var(--r-sm); font-size: 17px; font-family: var(--sans); background: var(--surface-2); color: var(--ink); border: 1px solid var(--line); transition: opacity .35s, background .3s, border-color .3s; }
  .tok.cur { background: var(--accent); color: #3a1e00; font-weight: 600; border-color: var(--accent); }
  .tok.tf { background: #0f8a8014; border-color: var(--teal); color: var(--ink); }

  .hid { display: flex; align-items: center; gap: 12px; justify-content: center; margin-top: 16px; padding: 10px 14px; border: 1.5px dashed var(--line-2); border-radius: var(--r); background: var(--surface); transition: .3s; }
  .hid.tf { border-style: solid; border-color: var(--teal); background: #0f8a800a; }
  .hlabel { font-family: var(--mono); font-size: var(--fs-eyebrow); letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }
  .dots { display: flex; gap: 5px; }
  .dots .d { width: 9px; height: 9px; border-radius: 50%; background: var(--line-2); transition: .3s; }
  .dots .d.on { background: var(--teal); }
  .rc { font-family: var(--mono); font-size: var(--fs-cap); color: var(--ink-2); }

  .btn-row { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
  .hint { font-size: var(--fs-sm); color: var(--muted); line-height: var(--lh-body); margin: var(--sp-3) 0 0; }
  .hint :global(b) { color: var(--accent-ink); }
</style>
