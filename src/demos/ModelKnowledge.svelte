<script>
  /* Ch · 模型的知識。教兩件事：知識凍結在「知識截止日」，且私有資料從沒讀過。
     點一個問題 → 看模型知不知道（靠參數知識）；打開「外部知識源」(RAG/上下文) → 缺口被補上。
     亮色舞台。多語：顯示字串依 i18n.locale。 */
  import { fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const L = {
    zh: {
      h3: '互動：模型知道什麼、到哪為止',
      lede: '模型的知識<b>凍結在訓練的截止日</b>，而且從沒讀過你的<b>私有資料</b>。點一個問題看它知不知道，再打開<b>外部知識源</b>把缺口補上。',
      eyebrow: '★ Interactive',
      zoneIn: '訓練資料內', zoneOut: '截止日之後', cutoff: '知識截止日', privBox: '你的私有資料',
      ask: '點一個問題：',
      facts: [
        { q: '水的化學式', src: 'in' },
        { q: 'Python 怎麼寫迴圈', src: 'in' },
        { q: '今天的頭條新聞', src: 'time' },
        { q: '貴公司的請假規定', src: 'private' },
      ],
      msg: {
        pick: '點上面任一個問題試試。',
        in: '✓ 這在<b>訓練資料</b>裡 → 靠<b>參數知識</b>直接回答（仍可能記錯，重要的請溯源）。',
        timeNo: '✗ 這在<b>知識截止日之後</b> → 模型沒讀過，會答不出或亂猜。',
        timeYes: '✓ 已接上<b>外部知識源</b> → 模型照你提供的<b>最新</b>資料回答。',
        privNo: '✗ 這是<b>私有資料</b> → 模型從沒讀過，天生不知道。',
        privYes: '✓ 已接上<b>知識庫（RAG）</b> → 模型照你的<b>私有</b>資料回答。',
      },
      srcOff: '接上外部知識源（RAG／貼上下文）',
      srcOn: '✓ 外部知識源：已連上',
      hint: '模型天生只知道「截止日之前、又在訓練資料裡」的東西。<b>最新</b>和<b>私有</b>的內容得靠 <b>RAG 或上下文</b>補上，這正是後面幾站要解決的事。',
    },
    en: {
      h3: 'Interactive: what the model knows, and where it stops',
      lede: 'A model’s knowledge is <b>frozen at its training cutoff</b>, and it has never read your <b>private data</b>. Click a question to see if it knows, then turn on an <b>external source</b> to fill the gap.',
      eyebrow: '★ Interactive',
      zoneIn: 'In training data', zoneOut: 'After cutoff', cutoff: 'Knowledge cutoff', privBox: 'Your private data',
      ask: 'Pick a question:',
      facts: [
        { q: 'The chemical formula for water', src: 'in' },
        { q: 'How to write a loop in Python', src: 'in' },
        { q: 'Today’s headline news', src: 'time' },
        { q: 'Your company’s leave policy', src: 'private' },
      ],
      msg: {
        pick: 'Click any question above to try it.',
        in: '✓ This is <b>in the training data</b> → answered from <b>parametric knowledge</b> (it may still misremember, so verify what matters).',
        timeNo: '✗ This is <b>after the knowledge cutoff</b> → the model never read it and will fail or guess.',
        timeYes: '✓ An <b>external source</b> is connected → the model answers from the <b>up-to-date</b> data you supplied.',
        privNo: '✗ This is <b>private data</b> → the model never read it and simply does not know.',
        privYes: '✓ A <b>knowledge base (RAG)</b> is connected → the model answers from your <b>private</b> data.',
      },
      srcOff: 'Connect an external source (RAG / paste into context)',
      srcOn: '✓ External source: connected',
      hint: 'A model only natively knows things that are <b>before the cutoff and in the training data</b>. <b>Fresh</b> and <b>private</b> content has to come from <b>RAG or context</b>, which is exactly what the next few stops solve.',
    },
    ja: {
      h3: 'インタラクティブ：モデルは何を、どこまで知っているか',
      lede: 'モデルの知識は<b>学習の締め切りで凍結</b>され、あなたの<b>私的データ</b>は読んだことがありません。質問を押して知っているか確かめ、<b>外部ソース</b>をつないで穴を埋めましょう。',
      eyebrow: '★ Interactive',
      zoneIn: '学習データ内', zoneOut: '締め切り後', cutoff: '知識の締め切り', privBox: 'あなたの私的データ',
      ask: '質問を選ぶ：',
      facts: [
        { q: '水の化学式', src: 'in' },
        { q: 'Python でのループの書き方', src: 'in' },
        { q: '今日のトップニュース', src: 'time' },
        { q: 'あなたの会社の休暇規定', src: 'private' },
      ],
      msg: {
        pick: '上の質問をどれか押してみて。',
        in: '✓ これは<b>学習データ</b>にある → <b>パラメータ知識</b>で直接答える（それでも覚え違いはあり得るので、大事な点は裏取りを）。',
        timeNo: '✗ これは<b>知識の締め切り後</b> → モデルは読んでおらず、答えられないか当て推量になる。',
        timeYes: '✓ <b>外部ソース</b>を接続 → 与えた<b>最新</b>データからモデルが答える。',
        privNo: '✗ これは<b>私的データ</b> → モデルは読んだことがなく、そもそも知らない。',
        privYes: '✓ <b>ナレッジベース（RAG）</b>を接続 → あなたの<b>私的</b>データからモデルが答える。',
      },
      srcOff: '外部ソースを接続（RAG／コンテキストに貼る）',
      srcOn: '✓ 外部ソース：接続済み',
      hint: 'モデルが生まれつき知っているのは「締め切り前で、かつ学習データにある」ことだけ。<b>最新</b>や<b>私的</b>な内容は <b>RAG やコンテキスト</b>で補う必要があり、これが続く駅で解く課題です。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let sourceOn = $state(false);
  let picked = $state(-1);

  let fact = $derived(picked >= 0 ? ui.facts[picked] : null);
  let verdict = $derived.by(() => {
    if (!fact) return { key: 'pick', ok: null };
    if (fact.src === 'in') return { key: 'in', ok: true };
    if (fact.src === 'time') return sourceOn ? { key: 'timeYes', ok: true } : { key: 'timeNo', ok: false };
    return sourceOn ? { key: 'privYes', ok: true } : { key: 'privNo', ok: false };
  });
  // 時間軸上的指針位置：訓練內靠左、截止後靠右；私有資料不在軸上
  let pinAt = $derived(fact && fact.src === 'in' ? 32 : fact && fact.src === 'time' ? 84 : -1);
  let privActive = $derived(!!fact && fact.src === 'private');
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">{ui.eyebrow}</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="axis-wrap">
      <div class="axis">
        <div class="zone in"><span>{ui.zoneIn}</span></div>
        <div class="zone out"><span>{ui.zoneOut}</span></div>
        <div class="cut"><span class="cut-l">{ui.cutoff}</span></div>
        {#if pinAt >= 0}
          <div class="pin" style="left:{pinAt}%" class:ok={verdict.ok} class:no={verdict.ok === false}></div>
        {/if}
      </div>
      <div class="privbox" class:active={privActive} class:on={privActive && sourceOn}>
        <span class="pb-dot"></span>{ui.privBox}
      </div>
    </div>
  </div>

  <p class="ask">{ui.ask}</p>
  <div class="chips">
    {#each ui.facts as f, i}
      <button class="chip" class:sel={picked === i} onclick={() => (picked = i)}>{f.q}</button>
    {/each}
  </div>

  {#key verdict.key + sourceOn}
    <p class="verdict" class:ok={verdict.ok === true} class:no={verdict.ok === false}
      in:fly={{ y: 6, duration: dur(D.base), easing: ease }}>{@html ui.msg[verdict.key]}</p>
  {/key}

  <button class="src" class:on={sourceOn} onclick={() => (sourceOn = !sourceOn)}>
    {sourceOn ? ui.srcOn : ui.srcOff}
  </button>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }

  .axis-wrap { display: flex; flex-direction: column; gap: 14px; padding: 8px 0 4px; }
  .axis {
    position: relative; height: 56px; border-radius: var(--r);
    display: flex; overflow: visible;
  }
  .zone { display: grid; align-items: end; justify-items: center; height: 100%; padding-bottom: 7px; border-radius: var(--r); }
  .zone span { font-family: var(--mono); font-size: var(--fs-eyebrow); letter-spacing: .1em; text-transform: uppercase; }
  .zone.in { flex: 0 0 68%; background: #0f8a8014; border: 1px solid var(--teal); }
  .zone.in span { color: var(--teal); }
  .zone.out { flex: 1; background: var(--surface-2); border: 1px dashed var(--line-2); margin-left: 8px; }
  .zone.out span { color: var(--muted); }
  .cut {
    position: absolute; left: 68%; top: -8px; bottom: -8px; width: 0;
    border-left: 2px dashed var(--crit);
  }
  .cut-l {
    position: absolute; left: 50%; top: -20px; transform: translateX(-50%); white-space: nowrap;
    font-family: var(--mono); font-size: var(--fs-micro); color: var(--crit);
  }
  .pin {
    position: absolute; top: 50%; width: 16px; height: 16px; border-radius: 50%;
    transform: translate(-50%, -50%); background: var(--ink); border: 3px solid var(--surface);
    box-shadow: 0 0 0 2px var(--ink); transition: left .4s cubic-bezier(.3,1.1,.5,1), background .3s, box-shadow .3s;
  }
  .pin.ok { background: var(--teal); box-shadow: 0 0 0 2px var(--teal); }
  .pin.no { background: var(--crit); box-shadow: 0 0 0 2px var(--crit); }

  .privbox {
    align-self: flex-start; display: inline-flex; align-items: center; gap: 8px;
    font-size: var(--fs-sm); color: var(--muted);
    border: 1px dashed var(--line-2); border-radius: var(--r-sm); padding: 7px 12px;
    background: var(--surface); transition: .3s;
  }
  .pb-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--muted); flex: none; transition: .3s; }
  .privbox.active { color: var(--crit); border-color: var(--crit); border-style: solid; }
  .privbox.active .pb-dot { background: var(--crit); }
  .privbox.on { color: var(--teal); border-color: var(--teal); }
  .privbox.on .pb-dot { background: var(--teal); }

  .ask { margin: 4px 0 8px; font-size: var(--fs-sm); color: var(--muted); }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip {
    border: 1px solid var(--line); background: var(--surface); color: var(--ink-2);
    font-size: var(--fs-sm); font-family: inherit; padding: 7px 13px; border-radius: 999px;
    cursor: pointer; transition: .15s;
  }
  .chip:hover { border-color: var(--accent); color: var(--ink); }
  .chip.sel { border-color: var(--accent); background: var(--accent); color: #3a1e00; font-weight: 600; }

  .verdict {
    margin: 14px 0 0; font-size: var(--fs-sm); line-height: var(--lh-body); font-weight: 500;
    color: var(--ink-2); padding: 11px 13px; border-radius: var(--r-sm);
    background: var(--surface-2); border: 1px solid var(--line);
  }
  .verdict.ok { color: #1c6b5a; background: #0f8a800f; border-color: var(--teal); }
  .verdict.no { color: var(--crit); background: #d23f3f0d; border-color: #d23f3f55; }
  .verdict :global(b) { color: inherit; font-weight: 700; }

  .src {
    margin-top: 12px; width: 100%; border: 1px dashed var(--line-2); background: var(--surface);
    color: var(--ink-2); font-size: var(--fs-sm); font-family: inherit; font-weight: 550;
    padding: 10px 14px; border-radius: var(--r-sm); cursor: pointer; transition: .15s;
  }
  .src:hover { border-color: var(--accent); color: var(--ink); }
  .src.on { border-style: solid; border-color: var(--teal); color: #1c6b5a; background: #0f8a800f; }

  .hint { font-size: var(--fs-sm); color: var(--muted); line-height: var(--lh-body); margin: var(--sp-3) 0 0; }
  .hint :global(b) { color: var(--ink-2); }
</style>
