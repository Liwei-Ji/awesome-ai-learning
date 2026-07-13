<script>
  /* Ch · Tokenizer 分詞器。看一句話如何被切成 token。
     光刀由左掃到右，token 晶片依序點亮飛入，依類型上色：
       完整詞（琥珀）· 子詞 Subword（青綠，同字共用一圈框）· 位元組 Byte（灰紫 hex）· 符號（冷藍）。
     右下 CHARS → TOKENS 壓縮讀數。可切 preset，也可自己打字（離線規則式假分詞器，確定性）。
     深色舞台。教學誠實標註：示意用假分詞器，真實模型切法略有不同。 */
  import { onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import { dur, D, ease, reduceMotion } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const cp = (s) => [...s];                         // 以字元（code point）計
  const isCJK = (ch) => /[㐀-鿿]/u.test(ch);
  const isWord = (ch) => /[\p{L}\p{N}]/u.test(ch) && !isCJK(ch);
  const hashId = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return 10000 + (h % 90000); };

  // 手寫策展 preset（token 切法固定、正確、可控）
  const PRESETS = [
    { key: 'en', label: '英文常見句', text: 'I like to eat pizza.',
      toks: [ ['I','word'],['␣like','word'],['␣to','word'],['␣eat','word'],['␣pizza','word'],['.','symbol'] ],
      status: '5 個常見英文詞 → 5 個 token，乾淨俐落。' },
    { key: 'rare', label: '罕見長詞', text: 'Tokenization feels unbelievable.',
      toks: [ ['Token','subword',1],['ization','subword',1],['␣feels','word'],['␣un','subword',2],['bel','subword',2],['iev','subword',2],['able','subword',2],['.','symbol'] ],
      status: 'unbelievable 不在詞表裡 → 被拆成 un·bel·iev·able 四個子詞。' },
    { key: 'zh', label: '中文', text: '我正在學習人工智慧',
      toks: [ ['我','cjk'],['正在','cjk'],['學習','cjk'],['人工','cjk'],['智慧','cjk'] ],
      status: '中文沒有空格，模型多半一到兩個字就切一塊。' },
    { key: 'code', label: '程式碼', text: 'print("Hi!")',
      toks: [ ['print','word'],['(','symbol'],['"','symbol'],['Hi','word'],['!','symbol'],['"','symbol'],[')','symbol'] ],
      status: '程式碼裡，每個括號、引號、符號幾乎都各自是一個 token。' },
    { key: 'emoji', label: 'Emoji', text: 'café 🎉',
      toks: [ ['café','word'],['␣','symbol'],['F0','byte',9],['9F','byte',9],['8E','byte',9],['89','byte',9] ],
      status: '看起來只是一個 🎉，在模型眼中其實是 4 個位元組 token！' },
  ];

  // UI 字串與 preset 標籤／說明（多語）；preset 的 text/toks 是示範內容，跨語言共用。
  const L = {
    zh: {
      h3: '互動：看一句話如何被切成 token',
      lede: '模型讀文字時，不是一個字母一個字母看，而是先把文字切成一塊塊 <b>token</b>。常見的詞是一個 token；罕見的長字會被拆成幾個<b>子詞（Subword）</b>。切換範例，或自己改寫文字試試。',
      rawCap: '原始文字 RAW TEXT', tokCap: '模型讀到的 TOKENS', chars: '字元 CHARS',
      bd: '完整詞 {w} · 子詞 {sw} · 位元組 {b} · 符號 {sym}　|　每 token 平均 {avg} 字元',
      legend: ['完整詞', '子詞 Subword', '位元組 Byte', '符號'],
      glabelWord: '＝1 個詞', glabelChar: '＝1 字元',
      editLabel: '或自己輸入試試', placeholder: '打點字看看怎麼被切…',
      recut: '✂ 重新切分', showId: '顯示 token ID',
      trunc: '文字太長，已截斷到 60 字元。', live: '即時切分中（示意用假分詞器，實際切法依模型而異）。',
      hint: '這就是 <b>Tokenizer 分詞器</b>：它決定模型眼中「一句話有多長」。同樣的意思，用英文、中文還是程式碼寫，token 數可能天差地遠——這也是為什麼有些寫法「比較貴」。（註：本示範用手寫規則的假分詞器，真實模型的切法會略有不同。）',
      presets: {
        en: { label: '英文常見句', status: '5 個常見英文詞 → 5 個 token，乾淨俐落。' },
        rare: { label: '罕見長詞', status: 'unbelievable 不在詞表裡 → 被拆成 un·bel·iev·able 四個子詞。' },
        zh: { label: '中文', status: '中文沒有空格，模型多半一到兩個字就切一塊。' },
        code: { label: '程式碼', status: '程式碼裡，每個括號、引號、符號幾乎都各自是一個 token。' },
        emoji: { label: 'Emoji', status: '看起來只是一個 🎉，在模型眼中其實是 4 個位元組 token！' },
      },
    },
    en: {
      h3: 'Interactive: watch a sentence get split into tokens',
      lede: 'When a model reads text, it doesn’t go letter by letter—it first splits text into chunks called <b>tokens</b>. Common words are one token; rare long words get split into several <b>subwords</b>. Switch examples, or edit the text yourself.',
      rawCap: 'RAW TEXT', tokCap: 'TOKENS THE MODEL READS', chars: 'CHARS',
      bd: 'Words {w} · Subwords {sw} · Bytes {b} · Symbols {sym}　|　avg {avg} chars/token',
      legend: ['Words', 'Subword', 'Byte', 'Symbol'],
      glabelWord: '= 1 word', glabelChar: '= 1 char',
      editLabel: 'Or type your own', placeholder: 'Type something and see how it splits…',
      recut: '✂ Re-tokenize', showId: 'Show token IDs',
      trunc: 'Too long—truncated to 60 characters.', live: 'Tokenizing live (a demo pseudo-tokenizer; real models split a bit differently).',
      hint: 'That’s the <b>tokenizer</b>: it decides how “long” a sentence is to the model. The same meaning in English, Chinese, or code can take wildly different token counts—which is why some phrasings “cost more.” (Note: this demo uses a hand-written pseudo-tokenizer; real models split a bit differently.)',
      presets: {
        en: { label: 'Common English', status: '5 common English words → 5 tokens, clean and simple.' },
        rare: { label: 'Rare long word', status: '“unbelievable” isn’t in the vocab → split into un·bel·iev·able (4 subwords).' },
        zh: { label: 'Chinese', status: 'Chinese has no spaces; models usually chunk one or two characters at a time.' },
        code: { label: 'Code', status: 'In code, nearly every bracket, quote, and symbol is its own token.' },
        emoji: { label: 'Emoji', status: 'It looks like just one 🎉, but to the model it’s 4 byte-tokens!' },
      },
    },
    ja: {
      h3: 'インタラクティブ：一文がトークンに切られる様子',
      lede: 'モデルは文字を 1 つずつではなく、まず文章を <b>トークン</b> という塊に切ります。よく使う語は 1 トークン、まれな長い語は複数の <b>サブワード</b> に分かれます。例を切り替えるか、自分で書き換えてみましょう。',
      rawCap: '原文 RAW TEXT', tokCap: 'モデルが読む TOKENS', chars: '文字 CHARS',
      bd: '完全語 {w} · サブワード {sw} · バイト {b} · 記号 {sym}　|　1 トークン平均 {avg} 文字',
      legend: ['完全語', 'サブワード', 'バイト', '記号'],
      glabelWord: '＝1 語', glabelChar: '＝1 文字',
      editLabel: '自分で入力してみる', placeholder: '入力して分かれ方を見てみよう…',
      recut: '✂ 再分割', showId: 'トークン ID を表示',
      trunc: '長すぎるため 60 文字に切り詰めました。', live: 'リアルタイム分割中（デモ用の簡易トークナイザ。実際のモデルとは少し異なります）。',
      hint: 'これが <b>トークナイザ</b>：モデルにとって「一文がどれだけ長いか」を決めます。同じ意味でも英語・中国語・コードでトークン数は大きく変わり——だから「割高」な書き方もあるのです。（注：このデモは手書き規則の簡易トークナイザで、実際のモデルとは少し異なります。）',
      presets: {
        en: { label: '英語のよくある文', status: 'よく使う英単語 5 つ → 5 トークン、すっきり。' },
        rare: { label: 'まれな長い語', status: '「unbelievable」は語彙になく → un·bel·iev·able の 4 サブワードに分割。' },
        zh: { label: '中国語', status: '中国語には空白がなく、モデルは 1〜2 文字ずつ区切ることが多い。' },
        code: { label: 'コード', status: 'コードでは、括弧・引用符・記号のほぼすべてが 1 トークン。' },
        emoji: { label: 'Emoji', status: '1 つの 🎉 に見えても、モデルには 4 つのバイトトークン！' },
      },
    },
  };
  let ui = $derived(L[i18n.locale] || L.zh);

  // 由顯示 token 還原 raw 字串（去掉前導 ␣ 記號）
  const rawOf = (t, ty) => (t.startsWith('␣') ? ' ' + t.slice(1) : t);

  // 把策展 token 陣列 → 完整物件（含 raw 字元範圍、type、group、id）
  function buildFromPreset(p) {
    const toks = p.toks.map(([t, ty, g]) => ({ t, ty, g: g ?? null, id: hashId(t + ty) }));
    return withRanges(toks, p.text);
  }

  // 離線規則式假分詞器（自由輸入用；確定性）
  function tokenize(str) {
    const norm = str.normalize('NFC');           // 先正規化，避免 NFD 分解字被拆成位元組
    const s = cp(norm); const out = []; let k = 0, g = 100;
    while (k < s.length) {
      const ch = s[k];
      if (ch === ' ') {
        let j = k + 1, w = '';
        while (j < s.length && isWord(s[j])) { w += s[j]; j++; }
        if (w) { out.push({ t: '␣' + w, ty: 'word', g: null }); k = j; }
        else { out.push({ t: '␣', ty: 'symbol', g: null }); k++; }
      } else if (isCJK(ch)) { out.push({ t: ch, ty: 'cjk', g: null }); k++; }
      else if (isWord(ch)) { let w = ch, j = k + 1; while (j < s.length && isWord(s[j])) { w += s[j]; j++; } out.push({ t: w, ty: 'word', g: null }); k = j; }
      else if (ch.codePointAt(0) <= 0x7e) { out.push({ t: ch, ty: 'symbol', g: null }); k++; }
      else { const grp = ++g; for (const b of new TextEncoder().encode(ch)) out.push({ t: b.toString(16).toUpperCase().padStart(2, '0'), ty: 'byte', g: grp }); k++; }
    }
    for (const tk of out) tk.id = hashId(tk.t + tk.ty);
    return withRanges(out, norm);
  }

  // 指派每個 token 對應的原文字元範圍 [start,end)
  function withRanges(toks, text) {
    let p = 0, ls = 0, le = 0, prevG = null;
    for (const tk of toks) {
      // byte token 對應的是「一個原始字元」（如 🎉），不是 hex 文字本身的長度
      const len = tk.ty === 'byte' ? 1 : cp(rawOf(tk.t, tk.ty)).length;
      if (tk.ty === 'byte' && tk.g != null && tk.g === prevG) { tk.start = ls; tk.end = le; }
      else { tk.start = p; tk.end = p + len; p += len; ls = tk.start; le = tk.end; }
      prevG = tk.g;
    }
    return toks;
  }

  let presetKey = $state(PRESETS[0].key);
  let text = $state(PRESETS[0].text);
  let toks = $state(buildFromPreset(PRESETS[0]));
  let editStatus = $state(null);   // 自訂輸入時的訊息；null＝顯示目前 preset 的說明
  let statusMsg = $derived(editStatus ?? (ui.presets[presetKey]?.status ?? ''));
  let showIds = $state(false);
  let hoverTok = $state(null);
  let playNonce = $state(0);
  let scan = $state(1);
  let editTimer;

  let chars = $derived(cp(text));
  let M = $derived(chars.length);
  let N = $derived(toks.length);
  let thresh = $derived(toks.map((tk) => (M ? tk.start / M : 0)));
  let revealed = $derived(toks.map((_, i) => scan >= thresh[i] - 1e-6));
  let revealedCount = $derived(revealed.filter(Boolean).length);
  let charsShown = $derived(Math.round(scan * M));

  // 連續同 group 的 token 併成一個視覺群組（子詞/位元組共用一圈框）
  let groups = $derived.by(() => {
    const gs = []; let cur = null;
    toks.forEach((tk, i) => {
      if (tk.g != null && cur && cur.g === tk.g) cur.ids.push(i);
      else { cur = { g: tk.g, ty: tk.ty, ids: [i] }; gs.push(cur); }
    });
    return gs.map((gr) => ({ ...gr, multi: gr.ids.length > 1 && gr.g != null }));
  });

  let breakdown = $derived.by(() => {
    const b = { word: 0, subword: 0, byte: 0, symbol: 0 };
    for (const tk of toks) b[tk.ty === 'cjk' ? 'word' : tk.ty]++;
    return b;
  });
  let avg = $derived(N ? (M / N).toFixed(1) : '0');
  let compress = $derived(M ? Math.round((N / M) * 100) : 100);

  // hover：晶片 ↔ 原文字元雙向高亮（含同 group 兄弟）
  let hiToks = $derived.by(() => {
    if (hoverTok == null) return new Set();
    const g = toks[hoverTok]?.g;
    const set = new Set([hoverTok]);
    if (g != null) toks.forEach((tk, i) => { if (tk.g === g) set.add(i); });
    return set;
  });
  let hiChars = $derived.by(() => {
    const set = new Set();
    for (const i of hiToks) for (let c = toks[i].start; c < toks[i].end; c++) set.add(c);
    return set;
  });
  const tokAtChar = (ci) => { for (let i = 0; i < toks.length; i++) if (ci >= toks[i].start && ci < toks[i].end) return i; return null; };

  const TYPE_LABEL = { word: '完整詞', cjk: '完整詞', subword: '子詞', byte: '位元組', symbol: '符號' };

  function play() { hoverTok = null; playNonce++; } // 每次重掃都清掉殘留高亮
  function selectPreset(p) {
    clearTimeout(editTimer); // 取消進行中的 debounce 編輯，避免它稍後覆蓋剛選的 preset
    editStatus = null; presetKey = p.key; text = p.text; toks = buildFromPreset(p); play();
  }
  function onEdit(e) {
    const el = e.currentTarget;
    clearTimeout(editTimer);
    editTimer = setTimeout(() => {
      let v = el.value.normalize('NFC');
      const trimmed = cp(v).length > 60;
      // 截斷時直接同步 DOM（相等字串賦值不會觸發更新，故手動寫回）
      if (trimmed) { v = cp(v).slice(0, 60).join(''); el.value = v; }
      presetKey = ''; text = v; toks = tokenize(v);
      editStatus = trimmed ? ui.trunc : ui.live;
      play();
    }, 250);
  }

  // 光刀掃描：rAF 時間戳補間 scan 0→1（cubicOut）
  $effect(() => {
    playNonce;
    if (reduceMotion) { scan = 1; return; }
    scan = 0; let raf, base; const ms = dur(D.slow) || 1;
    const step = (t) => { if (base === undefined) base = t; const p = Math.min(1, (t - base) / ms); scan = 1 - (1 - p) ** 3; if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  });

  onDestroy(() => clearTimeout(editTimer));
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="pills">
    {#each PRESETS as p}
      <button class="pl" class:on={presetKey === p.key} onclick={() => selectPreset(p)}>{ui.presets[p.key].label}</button>
    {/each}
  </div>

  <div class="demo-stage light">
    <!-- 原始文字（字元，可與晶片雙向高亮）-->
    <div class="mono cap">{ui.rawCap}</div>
    <div class="raw">
      {#each chars as c, ci}
        <span class="ch" class:hi={hiChars.has(ci)}
          onmouseenter={() => (hoverTok = tokAtChar(ci))} onmouseleave={() => (hoverTok = null)} role="presentation"
        >{c === ' ' ? '␣' : c}</span>
      {/each}
    </div>

    <!-- 光刀切軌 -->
    <div class="track"><div class="blade" style="left:{scan * 100}%"></div></div>

    <!-- token 晶片 -->
    <div class="mono cap">{ui.tokCap}</div>
    <div class="chips">
      {#each groups as gr}
        <span class="grp" class:ring={gr.multi} class:byte={gr.ty === 'byte'}>
          {#each gr.ids as i}
            {#if revealed[i]}
              <span class="tok {toks[i].ty}" class:hi={hiToks.has(i)}
                in:fly={{ y: -10, duration: dur(D.base), easing: ease }}
                onmouseenter={() => (hoverTok = i)} onmouseleave={() => (hoverTok = null)} role="presentation">
                <span class="tt">{toks[i].t}</span>
                {#if showIds}<span class="tid">#{toks[i].id}</span>{/if}
              </span>
            {/if}
          {/each}
          {#if gr.multi && revealed[gr.ids[0]]}<span class="glabel">{gr.ty === 'byte' ? ui.glabelChar : ui.glabelWord}</span>{/if}
        </span>
      {/each}
    </div>

    <!-- 讀數：CHARS → TOKENS 壓縮 -->
    <div class="meter">
      <div class="big"><span class="k">{ui.chars}</span><span class="v muted">{charsShown}</span></div>
      <div class="arrow">→</div>
      <div class="big"><span class="k">TOKENS</span><span class="v amber">{revealedCount}</span></div>
      <div class="bar"><div class="fill" style="width:{compress}%"></div></div>
    </div>
    <div class="mono breakdown">
      {ui.bd.replace('{w}', breakdown.word).replace('{sw}', breakdown.subword).replace('{b}', breakdown.byte).replace('{sym}', breakdown.symbol).replace('{avg}', avg)}
    </div>

    <!-- 圖例 -->
    <div class="legend">
      <span><i class="d word"></i>{ui.legend[0]}</span>
      <span><i class="d subword"></i>{ui.legend[1]}</span>
      <span><i class="d byte"></i>{ui.legend[2]}</span>
      <span><i class="d symbol"></i>{ui.legend[3]}</span>
    </div>
  </div>

  <div class="edit">
    <span class="mono cap2">{ui.editLabel}</span>
    <input value={text} oninput={onEdit} placeholder={ui.placeholder} />
  </div>

  <div class="btn-row">
    <button class="btn primary" onclick={play}>{ui.recut}</button>
    <label class="toggle"><input type="checkbox" bind:checked={showIds} /> {ui.showId}</label>
  </div>

  <p class="status">{statusMsg}</p>
  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }

  .pills { display: flex; gap: var(--sp-2); flex-wrap: wrap; margin-bottom: 10px; }
  .pl { font-size: var(--fs-cap); padding: 6px 13px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); }
  .pl:hover { border-color: var(--accent); color: var(--accent-ink); }
  .pl.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }

  .cap { font-size: var(--fs-eyebrow); letter-spacing: .14em; color: var(--muted); margin: 2px 0 6px; }
  .raw { display: flex; flex-wrap: wrap; font-size: 18px; font-family: var(--sans); margin-bottom: var(--sp-3); min-height: 28px; }
  .raw .ch { padding: 1px 1px; border-radius: 4px; color: var(--ink-2); transition: background .2s, color .2s; }
  .raw .ch.hi { background: var(--accent); color: #241500; }

  .track { position: relative; height: 6px; border-radius: 99px; background: var(--surface-3); margin: 0 0 14px; overflow: visible; }
  .blade { position: absolute; top: -6px; width: 2px; height: 18px; background: var(--teal); box-shadow: 0 0 14px 3px #0f8a80aa; transform: translateX(-1px); }

  .chips { display: flex; flex-wrap: wrap; gap: 7px; min-height: 40px; margin-bottom: 14px; align-items: flex-start; }
  .grp { display: inline-flex; gap: 5px; padding: 3px; border-radius: var(--r); position: relative; min-width: 0; flex-wrap: wrap; }
  .grp.ring { border: 1px dashed #0f8a8077; background: #0f8a800c; margin-bottom: 12px; }
  .grp .glabel { position: absolute; bottom: -13px; left: 4px; font-family: var(--mono); font-size: 10px; color: var(--teal); }
  .tok { display: inline-flex; flex-direction: column; align-items: center; min-width: 0; max-width: 100%; padding: 4px 8px; border-radius: var(--r-sm); font-size: 15px; line-height: 1.1; transition: transform .15s, box-shadow .2s; }
  .tok .tt { overflow-wrap: anywhere; }
  .tok .tid { font-family: var(--mono); font-size: 10px; margin-top: 2px; opacity: .8; }
  .tok.hi { transform: translateY(-2px) scale(1.06); }
  .tok.word, .tok.cjk { background: var(--accent); color: #241500; box-shadow: 0 0 12px #e07f0e55; font-weight: 600; }
  .tok.subword { background: #0f8a801a; border: 1px solid var(--teal); color: var(--teal); box-shadow: 0 0 10px #0f8a8044; }
  .tok.byte { background: var(--surface-2); color: var(--muted); font-family: var(--mono); font-size: var(--fs-cap); border: 1px solid var(--line); }
  .tok.symbol { background: var(--surface-2); color: var(--muted); }
  .tok.hi.subword { box-shadow: 0 0 16px #0f8a80aa; }

  .meter { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .big { display: flex; flex-direction: column; }
  .big .k { font-size: var(--fs-eyebrow); letter-spacing: .12em; color: var(--muted); }
  .big .v { font-family: var(--mono); font-size: 26px; font-weight: 600; }
  .big .v.muted { color: var(--muted); }
  .big .v.amber { color: var(--accent); text-shadow: 0 0 12px #e07f0e66; }
  .meter .arrow { color: var(--muted); font-size: 18px; }
  .meter .bar { flex: 1; min-width: 80px; height: 8px; border-radius: 99px; background: var(--surface-3); overflow: hidden; }
  .meter .bar .fill { height: 100%; background: var(--accent); transition: width .5s cubic-bezier(.2,.7,.2,1); }
  .breakdown { font-size: var(--fs-micro); color: var(--muted); margin-top: var(--sp-2); }

  .legend { display: flex; gap: var(--sp-4); flex-wrap: wrap; margin-top: var(--sp-3); font-size: var(--fs-micro); color: var(--muted); }
  .legend i { display: inline-block; width: 9px; height: 9px; border-radius: 3px; margin-right: 5px; vertical-align: middle; }
  .legend .d.word { background: var(--accent); }
  .legend .d.subword { background: var(--teal); }
  .legend .d.byte { background: var(--line); }
  .legend .d.symbol { background: var(--muted); }

  .edit { display: flex; align-items: center; gap: 10px; margin: var(--sp-3) 0 var(--sp-1); }
  .cap2 { font-size: var(--fs-micro); color: var(--muted); white-space: nowrap; }
  .edit input { flex: 1; background: var(--surface-2); border: 1px solid var(--line-2); border-radius: var(--r); padding: var(--sp-2) var(--sp-3); color: var(--ink); font-family: inherit; font-size: var(--fs-body); outline: none; }
  .edit input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--glow); }

  .toggle { display: inline-flex; align-items: center; gap: 6px; font-size: var(--fs-cap); color: var(--ink-2); cursor: pointer; }
  .status { font-size: var(--fs-sm); font-weight: 550; color: var(--accent-ink); margin: var(--sp-3) 0 0; }
</style>
