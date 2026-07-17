<script>
  /* Ch2 · 資料量 → 準確率（引導式實驗）。
     state = v（滑桿，0-100）；散點、分類線、準確率、判讀句皆由 v 衍生。
     三顆預設膠囊把 v 設到少量/中等/大量；目前所在區間依 n 落點自動高亮。
     canvas 為命令式繪圖，包在 $effect 裡（只讀 v、只畫圖，不寫 state），v 一變就重畫。 */
  import { clamp } from '../lib/helpers.js';
  import { i18n } from '../stores/i18n.svelte.js';
  import Num from '../components/Num.svelte';

  const L = {
    zh: {
      h3: '互動：資料量越大，模型越準',
      lede: '機器學習靠<b>資料</b>找規律。先挑一個資料量，或親手拖動滑桿，看散點圖裡的<b>分類線</b>與<b>準確率</b>怎麼變。',
      presetHint: '選一個資料量，或自己拖滑桿',
      presets: ['少量 · 100 筆', '中等 · 3,000 筆', '大量 · 10,000 筆'],
      accLabel: '準確率 Accuracy',
      sizeLabel: '資料量 Dataset size',
      unit: '筆',
      verdict: [
        '資料太少：模型抓到的是雜訊與巧合，分類線亂七八糟、被離群點牽著走。',
        '資料中等：真正的規律開始浮現，分類線大致把兩群分開了。',
        '資料充足：分類線乾淨俐落，雜訊被稀釋，規律勝出。',
      ],
      cat: '貓', dog: '狗', line: '分類線',
      hint: '資料是機器學習的<b>養分</b>：量到位，規律才學得出來。少量資料下模型記住的是巧合；資料一多，雜訊被稀釋，真正的規律就浮現、分類線也<b>乾淨俐落</b>。',
    },
    en: {
      h3: 'Interactive: more data, a more accurate model',
      lede: 'Machine learning finds patterns from <b>data</b>. Pick a dataset size, or drag the slider yourself, and watch how the <b>classification line</b> and <b>accuracy</b> change in the scatter plot.',
      presetHint: 'Pick a dataset size, or drag the slider yourself',
      presets: ['Small · 100 records', 'Medium · 3,000 records', 'Large · 10,000 records'],
      accLabel: 'Accuracy',
      sizeLabel: 'Dataset size',
      unit: 'records',
      verdict: [
        'Too little data: the model latches onto noise and coincidence, the classification line is a mess, yanked around by outliers.',
        'Moderate data: the real pattern starts to emerge, and the classification line roughly separates the two groups.',
        'Plenty of data: the classification line is crisp, noise is diluted, and the pattern wins out.',
      ],
      cat: 'Cat', dog: 'Dog', line: 'Boundary',
      hint: 'Data is the <b>nutrient</b> of machine learning: only with enough of it can the pattern be learned. With too little data the model just memorizes coincidences; with more, noise is diluted, the real pattern emerges, and the classification line turns <b>crisp and clean</b>.',
    },
    ja: {
      h3: 'インタラクティブ：データが多いほど、モデルは正確になる',
      lede: '機械学習は<b>データ</b>から規則を見つけます。データ量を選ぶか、自分でスライダーを動かして、散布図の中の<b>分類線</b>と<b>正解率</b>がどう変わるかを見てみましょう。',
      presetHint: 'データ量を選ぶか、自分でスライダーを動かそう',
      presets: ['少ない · 100 件', '中くらい · 3,000 件', '多い · 10,000 件'],
      accLabel: '正解率 Accuracy',
      sizeLabel: 'データ量 Dataset size',
      unit: '件',
      verdict: [
        'データが少なすぎる：モデルはノイズや偶然を拾ってしまい、分類線はぐちゃぐちゃで、外れ値に振り回される。',
        'データが中くらい：本当の規則が見え始め、分類線がだいたい二つのグループを分けられている。',
        'データが十分：分類線はすっきりと決まり、ノイズは薄まって、規則が勝ち残る。',
      ],
      cat: '猫', dog: '犬', line: '分類線',
      hint: 'データは機械学習の<b>栄養</b>です：量がそろって初めて規則が学べます。データが少ないとモデルは偶然を丸暗記するだけ。データが増えるとノイズが薄まり、本当の規則が浮かび上がって、分類線も<b>すっきりと決まる</b>のです。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let v = $state(15);
  let canvas;

  // 固定點雲（貓：teal 左上；狗：amber 右下）。用簡易 LCG 確保每次一致。
  const pts = [];
  let seed = 7;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let i = 0; i < 160; i++) {
    const cls = i % 2, bx = cls ? 250 : 130, by = cls ? 130 : 80;
    pts.push({ x: bx + (rnd() - 0.5) * 150, y: by + (rnd() - 0.5) * 130, c: cls });
  }

  let n = $derived(Math.round(100 * Math.pow(10, v / 50)));
  let acc = $derived(Math.round(clamp(42 + 38 * Math.log10(n / 100) / 2 + (n > 3000 ? 8 : 0), 40, 97)));
  let nLabel = $derived(n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k' : String(n));
  let accColor = $derived(acc > 85 ? 'var(--good)' : acc > 65 ? 'var(--warn)' : 'var(--ink)');

  // 區間：0 少量 · 1 中等 · 2 大量（依 n 落點自動判斷，膠囊據此高亮）
  let region = $derived(n < 550 ? 0 : n < 5500 ? 1 : 2);
  let verdict = $derived(ui.verdict[region]);
  let vColor = $derived(['var(--crit)', 'var(--accent)', 'var(--good)'][region]);

  // 預設膠囊：依現有 n=round(100·10^(v/50)) 反推的 v
  //   少量 v=0 → n≈100；中等 v=74 → n≈3020；大量 v=100（上限）→ n≈10000（該量級最接近值）
  function preset(val) { v = val; }

  function draw() {
    if (!canvas) return;
    const cx = canvas.getContext('2d');
    const shown = Math.round(clamp(v / 100, 0.06, 1) * pts.length);
    cx.clearRect(0, 0, 380, 200);
    // 分類線：資料越多，傾斜誤差越小、線越乾淨
    const err = (1 - v / 100) * 70;
    cx.strokeStyle = 'rgba(128,140,165,.5)'; cx.lineWidth = 2; cx.setLineDash([6, 5]);
    cx.beginPath(); cx.moveTo(60, 20 + err); cx.lineTo(340, 180 - err); cx.stroke(); cx.setLineDash([]);
    for (let i = 0; i < shown; i++) {
      const q = pts[i];
      cx.fillStyle = q.c ? 'rgba(224,140,20,.9)' : 'rgba(20,150,140,.9)';
      cx.beginPath(); cx.arc(q.x, q.y, 3.2, 0, 7); cx.fill();
    }
    // 標籤：兩群 + 分類線，讓圖看得懂
    cx.textBaseline = 'alphabetic';
    cx.font = '600 13px system-ui, -apple-system, sans-serif';
    cx.fillStyle = 'rgba(20,150,140,.95)'; cx.fillText(ui.cat, 74, 30);
    cx.fillStyle = 'rgba(224,140,20,.95)'; cx.fillText(ui.dog, 312, 188);
    cx.font = '600 11px system-ui, -apple-system, sans-serif';
    cx.fillStyle = 'rgba(103,116,140,.95)';
    cx.fillText(ui.line, 245, 125.7 - 0.32 * err - 7);
  }
  $effect(() => { v; draw(); });
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="presets">
      <span class="fieldk">{ui.presetHint}</span>
      <div class="pl-row">
        <button class="pl" class:on={region === 0} onclick={() => preset(0)}>{ui.presets[0]}</button>
        <button class="pl" class:on={region === 1} onclick={() => preset(74)}>{ui.presets[1]}</button>
        <button class="pl" class:on={region === 2} onclick={() => preset(100)}>{ui.presets[2]}</button>
      </div>
    </div>

    <div class="top">
      <div class="stat-wrap">
        <span class="fieldk">{ui.accLabel}</span>
        <div class="stat"><span style="color:{accColor}"><Num value={acc} duration={360} /></span><span class="u">%</span></div>
      </div>
      <canvas bind:this={canvas} width="380" height="200"></canvas>
    </div>

    <div class="ctl">
      <div class="lab"><span>{ui.sizeLabel}</span><b>{nLabel} {ui.unit}</b></div>
      <input type="range" min="0" max="100" bind:value={v} />
    </div>

    <p class="verdict" style="color:{vColor}">{verdict}</p>
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .presets { margin-bottom: var(--sp-4); }
  .top { display: flex; align-items: flex-end; gap: var(--sp-5); margin: var(--sp-2) 0 var(--sp-4); flex-wrap: wrap; }
  .stat-wrap { display: flex; flex-direction: column; gap: var(--sp-2); }
  canvas {
    width: 100%; max-width: 380px;
    border-radius: var(--r); border: 1px solid var(--line); background: var(--surface-2);
  }
  .ctl { margin-top: 2px; }
  .verdict { margin: var(--sp-3) 0 0; font-size: var(--fs-sm); font-weight: 600; line-height: var(--lh-body); }
</style>
