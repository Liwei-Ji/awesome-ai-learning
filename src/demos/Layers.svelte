<script>
  /* Ch4 · Deep Learning 逐層，引導式「親手逐層推進」（多語）。
     state = active（目前點亮到第幾層）。主按鈕「▶ 下一層」單步前進；
     「▶ 自動播放」用 setTimeout 鏈一路播到底；「重置」歸零。
     reached[i] = i<=active 決定該層是否已亮。切章由 {#key} 重掛載自動歸零。
     階段名稱與圖示（純 SVG 線條，非 emoji）跨語言共用；顯示字串依 i18n.locale。
     5 個圖示本身是一條「逐層抽象」敘事：像素→邊緣→形狀→部位→貓臉。 */
  import { onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const STAGE_NAMES = ['Input', 'Layer 1', 'Layer 2', 'Layer 3', 'Output'];

  // 低解析度「貓」點陣圖（'.'=背景，數字=亮度/10），「像素」階段用。
  // 之後每一階段都在同一個 40×40 座標、同一隻貓上逐步抽象（像素→邊緣→形狀→部位→貓臉）。
  const CAT_PX = [
    '.7....7.', '.86..68.', '58877885', '69499496',
    '69999996', '58966985', '.588885.', '..5665..',
  ];
  const PX = CAT_PX.flatMap((row, r) => [...row].map((ch, c) => ({
    x: c * 5, y: r * 5, o: ch === '.' ? 0.12 : Number(ch) / 10,
  })));

  // 「邊緣」階段直接從上面那張像素貓「算」出來，貓身與背景的交界，
  // 加上亮度落差大的內部交界（眼睛）。與 Input 是同一張圖，只是抽出了邊。
  const EDGES = (() => {
    const rows = CAT_PX.length, cols = CAT_PX[0].length, S = 5;
    const val = (r, c) => (r < 0 || r >= rows || c < 0 || c >= cols || CAT_PX[r][c] === '.') ? 0 : Number(CAT_PX[r][c]);
    const set = new Set();
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      if (val(r, c) === 0) continue;
      const v = val(r, c), x = c * S, y = r * S;
      const sides = [
        [-1, 0, x, y, x + S, y], [1, 0, x, y + S, x + S, y + S],
        [0, -1, x, y, x, y + S], [0, 1, x + S, y, x + S, y + S],
      ];
      for (const [dr, dc, x1, y1, x2, y2] of sides) {
        if (val(r + dr, c + dc) === 0 || Math.abs(v - val(r + dr, c + dc)) >= 4) set.add(`${x1} ${y1} ${x2} ${y2}`);
      }
    }
    return [...set].map((s) => s.split(' ').map(Number));
  })();

  // 「形狀」與「部位」階段：從同一張像素貓「擬合」出基本形狀（頭＝圓、耳＝三角）
  // 與部位（眼＝亮度最低的貓格）。座標鎖定同一隻貓，五格對得起來。
  const PARTS = (() => {
    const rows = CAT_PX.length, cols = CAT_PX[0].length, S = 5;
    const val = (r, c) => (r < 0 || r >= rows || c < 0 || c >= cols || CAT_PX[r][c] === '.') ? 0 : Number(CAT_PX[r][c]);
    // 頭頂列：第一個「幾乎整列都是貓」的列，往上就是耳朵
    let headTop = 0;
    for (let r = 0; r < rows; r++) { let s = 0; for (let c = 0; c < cols; c++) if (val(r, c)) s++; if (s >= cols - 1) { headTop = r; break; } }
    // 頭：身體格（headTop 以下）的形心與水平半幅 → 擬合成圓
    let sx = 0, sy = 0, n = 0, minx = cols, maxx = 0;
    for (let r = headTop; r < rows; r++) for (let c = 0; c < cols; c++) if (val(r, c)) { sx += c; sy += r; n++; minx = Math.min(minx, c); maxx = Math.max(maxx, c); }
    const head = { cx: (sx / n + 0.5) * S, cy: (sy / n + 0.5) * S, r: ((maxx - minx + 1) / 2) * S * 0.7 };
    // 耳：headTop 以上的貓格，左右分兩堆，各擬合成三角（頂點＝最高格，底＝頭頂列）
    const mid = cols / 2, eL = [], eR = [];
    for (let r = 0; r < headTop; r++) for (let c = 0; c < cols; c++) if (val(r, c)) (c < mid ? eL : eR).push([r, c]);
    const tri = (cells) => {
      let tr = rows, tc = 0, mnx = cols, mxx = 0;
      for (const [r, c] of cells) { if (r < tr) { tr = r; tc = c; } mnx = Math.min(mnx, c); mxx = Math.max(mxx, c); }
      return `M ${(tc + 0.5) * S} ${tr * S} L ${mnx * S} ${headTop * S} L ${(mxx + 1) * S} ${headTop * S} Z`;
    };
    // 眼：頭部裡亮度最低的貓格（點陣圖裡的 '4'）
    const eyes = [];
    for (let r = headTop; r < rows; r++) for (let c = 0; c < cols; c++) if (val(r, c) && val(r, c) <= 4) eyes.push([(c + 0.5) * S, (r + 0.5) * S]);
    return { head, earL: tri(eL), earR: tri(eR), eyes };
  })();

  const L = {
    zh: {
      h3: '互動：一層一層看 AI 怎麼「看」貓',
      lede: '深度學習的「深」，是指資料要<b>穿過好幾層</b>處理。每按一次「下一層」，看它如何把上一層的結果<b>再抽象一次</b>，從像素，一路長成「這是貓」。',
      subs: ['原始照片（像素）', '找出邊緣線條', '組成形狀', '認出部位：耳朵、眼睛', '判斷：這是貓'],
      descs: [
        '接收原始像素，此時 AI 只看到一堆亮暗不同的點，還不知道那是什麼。',
        '找出邊緣與線條，偵測明暗交界，把像素整理成一條條輪廓。',
        '把線條組成形狀，曲線、圓弧、三角形這些基本幾何開始浮現。',
        '認出部位，形狀被組合成有意義的零件：尖尖的耳朵、圓圓的眼睛。',
        '綜合判斷，把所有部位拼起來，得出結論：這是一隻貓。',
      ],
      finished: '完成',
      progress: '這一層在做什麼 · 第 {n} / {t} 層',
      done: '✓ 完成', next: '▶ 下一層', autoplay: '▶ 自動播放', reset: '重置',
      hint: '越前面的層看<b>細節</b>（邊緣），越後面的層看<b>整體</b>（耳朵、臉）。每層都把前一層的結果<b>再抽象一次</b>，這就是「深度」的意思。',
    },
    en: {
      h3: 'Interactive: watch, layer by layer, how AI “sees” a cat',
      lede: 'The “deep” in deep learning means data is processed as it <b>passes through many layers</b>. Each time you press “Next layer,” watch how it <b>abstracts the previous layer’s result one step further</b>, from pixels all the way to “this is a cat.”',
      subs: ['Raw photo (pixels)', 'Find edges and lines', 'Assemble shapes', 'Recognize parts: ears, eyes', 'Verdict: it’s a cat'],
      descs: [
        'Take in the raw pixels, at this point the AI only sees a bunch of light and dark dots, with no idea what they are.',
        'Find edges and lines, detect where light meets dark, organizing the pixels into contours.',
        'Assemble the lines into shapes, basic geometry like curves, arcs, and triangles starts to emerge.',
        'Recognize parts, shapes combine into meaningful pieces: pointy ears, round eyes.',
        'Put it all together, assemble every part and reach a conclusion: this is a cat.',
      ],
      finished: 'Done',
      progress: 'What this layer is doing · Layer {n} / {t}',
      done: '✓ Done', next: '▶ Next layer', autoplay: '▶ Autoplay', reset: 'Reset',
      hint: 'The earlier layers look at <b>details</b> (edges), the later layers look at the <b>whole</b> (ears, a face). Each layer <b>abstracts the previous layer’s result one step further</b>, that’s what “depth” means.',
    },
    ja: {
      h3: 'インタラクティブ：AI がどうやって猫を「見る」のか、一層ずつ見てみよう',
      lede: '深層学習の「深い」とは、データが<b>いくつもの層を通り抜けて</b>処理されることを指します。「次の層」を押すたびに、前の層の結果を<b>もう一段抽象化</b>していく様子を見てみましょう、ピクセルから、「これは猫だ」へと育っていきます。',
      subs: ['生の写真（ピクセル）', 'エッジと線を見つける', '形を組み立てる', '部位を認識：耳、目', '判断：これは猫だ'],
      descs: [
        '生のピクセルを受け取る、この時点では AI には明暗の異なる点の集まりが見えているだけで、それが何かはまだわからない。',
        'エッジと線を見つける、明暗の境目を検出し、ピクセルを一本一本の輪郭に整理する。',
        '線を組み合わせて形にする、曲線、円弧、三角形といった基本的な幾何が浮かび上がってくる。',
        '部位を認識する、形が組み合わさって意味のあるパーツになる：尖った耳、丸い目。',
        'すべてをまとめる、あらゆる部位をつなぎ合わせ、結論に至る：これは猫だ。',
      ],
      finished: '完了',
      progress: 'この層がしていること · 第 {n} / {t} 層',
      done: '✓ 完了', next: '▶ 次の層', autoplay: '▶ 自動再生', reset: 'リセット',
      hint: '前のほうの層は<b>細部</b>（エッジ）を見て、後ろのほうの層は<b>全体</b>（耳、顔）を見ます。どの層も前の層の結果を<b>もう一段抽象化</b>する、これが「深さ」の意味です。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  const LAST = STAGE_NAMES.length - 1;

  let active = $state(0);      // 初始只點亮 Input
  let playing = $state(false);
  let timer;

  let reached = $derived(STAGE_NAMES.map((_, i) => i <= active));
  let done = $derived(active >= LAST);

  function next() {
    if (playing || done) return;
    active += 1;
  }
  function autoplay() {
    clearTimeout(timer);
    active = 0; playing = true;
    const step = () => {
      if (active < LAST) { active += 1; timer = setTimeout(step, dur(650)); }
      else { playing = false; }
    };
    timer = setTimeout(step, dur(650));
  }
  function reset() { clearTimeout(timer); playing = false; active = 0; }

  onDestroy(() => clearTimeout(timer));
</script>

<!-- 逐層圖示：同一隻貓、同一個 40×40 座標，一步步被「處理」。
     0 原始像素貓 → 1 抽出邊緣 → 2 化為形狀 → 3 認出部位 → 4 判定為貓。
     耳在頂角、眼在中段、下巴在底，五格位置一致，看起來是「同一張圖在變化」。
     純 SVG，用 currentColor 隨 .cell 明暗/accent 連動。 -->
{#snippet stageIcon(i)}
  {#if i === 0}
    <!-- ① 原始像素：低解析度的一隻貓（背景暗、貓身亮）-->
    <svg class="sico" viewBox="0 0 40 40" fill="currentColor" stroke="none" aria-hidden="true">
      {#each PX as p}<rect x={p.x} y={p.y} width="5" height="5" opacity={p.o}/>{/each}
    </svg>
  {:else if i === 1}
    <!-- ② 邊緣：直接從 Input 的像素貓算出的邊（同一張圖的輪廓＋眼睛交界）-->
    <svg class="sico" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      {#each EDGES as e}<line x1={e[0]} y1={e[1]} x2={e[2]} y2={e[3]}/>{/each}
    </svg>
  {:else if i === 2}
    <!-- ③ 形狀：把 Layer 1 的邊緣歸納成基本形狀，頭＝圓、兩耳＝三角（擬合自同一隻貓）-->
    <svg class="sico" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx={PARTS.head.cx} cy={PARTS.head.cy} r={PARTS.head.r}/>
      <path d={PARTS.earL}/>
      <path d={PARTS.earR}/>
    </svg>
  {:else if i === 3}
    <!-- ④ 部位：在形狀之上「認出」有意義的零件，耳朵（實心）＋眼睛（點，位置＝像素眼）-->
    <svg class="sico" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx={PARTS.head.cx} cy={PARTS.head.cy} r={PARTS.head.r} opacity=".22"/>
      <path d={PARTS.earL} fill="currentColor" stroke="none"/>
      <path d={PARTS.earR} fill="currentColor" stroke="none"/>
      {#each PARTS.eyes as e}<circle cx={e[0]} cy={e[1]} r="2.1" fill="currentColor" stroke="none"/>{/each}
    </svg>
  {:else}
    <!-- ⑤ 判定：同一隻貓，完整貓臉（耳＋臉＋眼＋鼻＋鬍鬚），耳與眼沿用擬合位置 -->
    <svg class="sico" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d={PARTS.earL}/>
      <path d={PARTS.earR}/>
      <path d="M5 12 Q4 32 20 37 Q36 32 35 12"/>
      {#each PARTS.eyes as e}<circle cx={e[0]} cy={e[1]} r="1.8" fill="currentColor" stroke="none"/>{/each}
      <path d="M18.3 24 L21.7 24 L20 26.3 Z" fill="currentColor" stroke="none"/>
      <path d="M15 25 L6 24 M15 26.6 L6 28.5"/>
      <path d="M25 25 L34 24 M25 26.6 L34 28.5"/>
    </svg>
  {/if}
{/snippet}

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="row">
      {#each STAGE_NAMES as nm, i}
        <div class="cell" class:lit={reached[i]} class:active={i === active}>
          <div class="ico">{@render stageIcon(i)}</div>
          <div class="mono nm">{nm}</div>
          <div class="sub">{ui.subs[i]}</div>
        </div>
        {#if i < LAST}<div class="mono arrow" class:on={reached[i + 1]}>→</div>{/if}
      {/each}
    </div>

    <div class="whatbox" class:finished={done}>
      <span class="fieldk">{done ? ui.finished : ui.progress.replace('{n}', active + 1).replace('{t}', STAGE_NAMES.length)}</span>
      {#key active}
        <div class="whattext" in:fly={{ y: 6, duration: dur(D.base), easing: ease }}>
          <b class="tag">{STAGE_NAMES[active]}</b>{ui.descs[active]}
        </div>
      {/key}
    </div>

    <div class="guide-actions">
      {#if done}
        <button class="btn primary" disabled>{ui.done}</button>
      {:else}
        <button class="btn primary" disabled={playing} onclick={next}>{ui.next}</button>
      {/if}
      <span class="arrow2">→</span>
      <button class="btn sm" disabled={playing} onclick={autoplay}>{ui.autoplay}</button>
      <button class="btn ghost" onclick={reset}>{ui.reset}</button>
    </div>
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }

  .row { display: flex; gap: var(--sp-2); align-items: stretch; margin: 2px 0 var(--sp-4); flex-wrap: wrap; }
  .cell {
    flex: 1; min-width: 88px; text-align: center; padding: 14px 8px;
    border-radius: var(--r); border: 1px solid var(--line); background: var(--surface);
    opacity: .38; transition: opacity .3s, border-color .3s, background .3s, transform .3s;
  }
  .cell.lit { opacity: 1; }
  .cell.active { border-color: var(--accent); background: var(--glow); transform: translateY(-2px); }
  .ico { line-height: 0; }
  .sico { width: 30px; height: 30px; display: block; margin: 0 auto; color: var(--ink-2); }
  .cell.active .sico { color: var(--accent-ink); }
  .nm { font-size: var(--fs-micro); color: var(--accent-ink); margin-top: var(--sp-2); }
  .sub { font-size: var(--fs-micro); color: var(--muted); margin-top: 2px; }
  .arrow { align-self: center; color: var(--line-2); transition: color .3s; }
  .arrow.on { color: var(--accent); }

  .whatbox {
    background: var(--surface); border: 1px solid var(--line-2); border-radius: var(--r);
    padding: 11px 14px; margin-bottom: var(--sp-4); min-height: 58px;
    transition: border-color .3s, background .3s;
  }
  .whatbox.finished { border-color: var(--teal); background: color-mix(in srgb, var(--teal) 5%, transparent); }
  .whattext { font-size: var(--fs-body); line-height: var(--lh-body); color: var(--ink); margin-top: 4px; }
  .tag {
    display: inline-block; margin-right: var(--sp-2); padding: 1px 8px;
    border-radius: 99px; font-family: var(--mono); font-size: var(--fs-micro);
    color: var(--accent-ink); border: 1px solid var(--line-2); background: var(--surface-2);
  }
  .whatbox.finished .tag { color: var(--teal); border-color: color-mix(in srgb, var(--teal) 40%, transparent); background: color-mix(in srgb, var(--teal) 5%, transparent); }
</style>
