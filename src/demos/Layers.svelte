<script>
  /* Ch4 · Deep Learning 逐層 —— 引導式「親手逐層推進」（多語）。
     state = active（目前點亮到第幾層）。主按鈕「▶ 下一層」單步前進；
     「▶ 自動播放」用 setTimeout 鏈一路播到底；「重置」歸零。
     reached[i] = i<=active 決定該層是否已亮。切章由 {#key} 重掛載自動歸零。
     階段名稱與 emoji 跨語言共用；顯示字串依 i18n.locale。 */
  import { onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const STAGE_NAMES = ['Input', 'Layer 1', 'Layer 2', 'Layer 3', 'Output'];
  const EMOJI = ['🐱', '✏️', '🔷', '👀', '✅'];

  const L = {
    zh: {
      h3: '互動：一層一層看 AI 怎麼「看」貓',
      lede: '深度學習的「深」，是指資料要<b>穿過好幾層</b>處理。每按一次「下一層」，看它如何把上一層的結果<b>再抽象一次</b>——從像素，一路長成「這是貓」。',
      subs: ['原始照片（像素）', '找出邊緣線條', '組成形狀', '認出部位：耳朵、眼睛', '判斷：這是貓'],
      descs: [
        '接收原始像素——此時 AI 只看到一堆亮暗不同的點，還不知道那是什麼。',
        '找出邊緣與線條——偵測明暗交界，把像素整理成一條條輪廓。',
        '把線條組成形狀——曲線、圓弧、三角形這些基本幾何開始浮現。',
        '認出部位——形狀被組合成有意義的零件：尖尖的耳朵、圓圓的眼睛。',
        '綜合判斷——把所有部位拼起來，得出結論：這是一隻貓。',
      ],
      finished: '完成',
      progress: '這一層在做什麼 · 第 {n} / {t} 層',
      done: '✓ 完成', next: '▶ 下一層', autoplay: '▶ 自動播放', reset: '重置',
      hint: '越前面的層看<b>細節</b>（邊緣），越後面的層看<b>整體</b>（耳朵、臉）。每層都把前一層的結果<b>再抽象一次</b>——這就是「深度」的意思。',
    },
    en: {
      h3: 'Interactive: watch, layer by layer, how AI “sees” a cat',
      lede: 'The “deep” in deep learning means data is processed as it <b>passes through many layers</b>. Each time you press “Next layer,” watch how it <b>abstracts the previous layer’s result one step further</b>—from pixels all the way to “this is a cat.”',
      subs: ['Raw photo (pixels)', 'Find edges and lines', 'Assemble shapes', 'Recognize parts: ears, eyes', 'Verdict: it’s a cat'],
      descs: [
        'Take in the raw pixels—at this point the AI only sees a bunch of light and dark dots, with no idea what they are.',
        'Find edges and lines—detect where light meets dark, organizing the pixels into contours.',
        'Assemble the lines into shapes—basic geometry like curves, arcs, and triangles starts to emerge.',
        'Recognize parts—shapes combine into meaningful pieces: pointy ears, round eyes.',
        'Put it all together—assemble every part and reach a conclusion: this is a cat.',
      ],
      finished: 'Done',
      progress: 'What this layer is doing · Layer {n} / {t}',
      done: '✓ Done', next: '▶ Next layer', autoplay: '▶ Autoplay', reset: 'Reset',
      hint: 'The earlier layers look at <b>details</b> (edges), the later layers look at the <b>whole</b> (ears, a face). Each layer <b>abstracts the previous layer’s result one step further</b>—that’s what “depth” means.',
    },
    ja: {
      h3: 'インタラクティブ：AI がどうやって猫を「見る」のか、一層ずつ見てみよう',
      lede: '深層学習の「深い」とは、データが<b>いくつもの層を通り抜けて</b>処理されることを指します。「次の層」を押すたびに、前の層の結果を<b>もう一段抽象化</b>していく様子を見てみましょう——ピクセルから、「これは猫だ」へと育っていきます。',
      subs: ['生の写真（ピクセル）', 'エッジと線を見つける', '形を組み立てる', '部位を認識：耳、目', '判断：これは猫だ'],
      descs: [
        '生のピクセルを受け取る——この時点では AI には明暗の異なる点の集まりが見えているだけで、それが何かはまだわからない。',
        'エッジと線を見つける——明暗の境目を検出し、ピクセルを一本一本の輪郭に整理する。',
        '線を組み合わせて形にする——曲線、円弧、三角形といった基本的な幾何が浮かび上がってくる。',
        '部位を認識する——形が組み合わさって意味のあるパーツになる：尖った耳、丸い目。',
        'すべてをまとめる——あらゆる部位をつなぎ合わせ、結論に至る：これは猫だ。',
      ],
      finished: '完了',
      progress: 'この層がしていること · 第 {n} / {t} 層',
      done: '✓ 完了', next: '▶ 次の層', autoplay: '▶ 自動再生', reset: 'リセット',
      hint: '前のほうの層は<b>細部</b>（エッジ）を見て、後ろのほうの層は<b>全体</b>（耳、顔）を見ます。どの層も前の層の結果を<b>もう一段抽象化</b>する——これが「深さ」の意味です。',
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

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="row">
      {#each STAGE_NAMES as nm, i}
        <div class="cell" class:lit={reached[i]} class:active={i === active}>
          <div class="ico">{EMOJI[i]}</div>
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
  .ico { font-size: 30px; line-height: 1.2; }
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
