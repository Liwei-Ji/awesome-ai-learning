<script>
  /* Ch · 多模態 Multimodal —— 互動：選輸入型態 → 都編碼成「同一個意義向量」
     （共用理解空間）→ 選輸出型態 → 看這組跨模態對應到哪個真實應用。
     核心概念：不同型態、同一個意思；有了共用空間就能自由轉換。亮色、離線。 */
  import { fade } from 'svelte/transition';
  import { dur, D } from '../lib/motion.js';

  const MODS = [
    { icon: '📝', label: '文字', ex: '「一隻橘貓在陽台曬太陽」' },
    { icon: '🖼️', label: '圖片', ex: '一張貓咪照片 🐱' },
    { icon: '🔊', label: '聲音', ex: '「喵～」＋環境音' },
    { icon: '🎬', label: '影片', ex: '貓伸懶腰的短片' },
  ];

  // 常見跨模態應用（輸入→輸出）
  const APPS = {
    '文字→圖片': '文字生圖（像 Midjourney、DALL·E）',
    '文字→聲音': '語音合成 TTS（把字唸出來）',
    '文字→影片': '文字生影片（像 Sora）',
    '文字→文字': '翻譯、改寫、問答',
    '圖片→文字': '看圖說話 / 影像描述（也含 OCR）',
    '圖片→圖片': '風格轉換、修圖、去背',
    '聲音→文字': '語音辨識（像 Whisper）',
    '聲音→聲音': '變聲、音樂生成',
    '影片→文字': '影片摘要、自動字幕',
    '圖片→影片': '讓圖片動起來',
  };

  let inMod = $state(0);
  let outMod = $state(1);

  let ci = $derived(MODS[inMod]);
  let co = $derived(MODS[outMod]);
  let app = $derived(APPS[`${ci.label}→${co.label}`] || '跨模態理解與生成');
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：不同型態，同一個意思</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    多模態模型能同時處理<b>文字、圖片、聲音、影片</b>。訣竅是把每一種型態都編碼成
    <b>同一種「意義向量」</b>——放進共用空間後，就能<b>在型態之間自由轉換</b>。
  </p>

  <div class="demo-stage light">
    <span class="fieldk">① 選輸入型態</span>
    <div class="mods">
      {#each MODS as m, i}
        <button class="mod" class:on={i === inMod} onclick={() => (inMod = i)}>
          <span class="mi">{m.icon}</span>{m.label}
        </button>
      {/each}
    </div>
    {#key inMod}
      <div class="sample" in:fade={{ duration: dur(D.fast) }}>{ci.ex}</div>
    {/key}

    <div class="flow mono">↓ 編碼器 Encoder</div>

    <div class="space">
      <span class="sk mono">共用理解空間 · 同一個意義向量</span>
      <div class="concept">🐱☀️ 一隻貓在陽台曬太陽</div>
      <span class="snote">不管從哪種型態進來，都變成<b>同一個意思</b></span>
    </div>

    <div class="flow mono">↓ 解碼器 Decoder</div>

    <span class="fieldk">② 選輸出型態</span>
    <div class="mods">
      {#each MODS as m, i}
        <button class="mod" class:on={i === outMod} onclick={() => (outMod = i)}>
          <span class="mi">{m.icon}</span>{m.label}
        </button>
      {/each}
    </div>

    {#key `${inMod}-${outMod}`}
      <div class="result" in:fade={{ duration: dur(D.base) }}>
        <span class="rpair">{ci.icon} {ci.label} → {co.icon} {co.label}</span>
        <b class="rapp">{app}</b>
      </div>
    {/key}
  </div>

  <p class="hint">
    看懂了嗎？<b>「模態」＝一種資料型態</b>（文字/圖/聲/影）。多模態的關鍵不是四個模型拼在一起，
    而是<b>一個共用的意義空間</b>——所以它能看圖說話、文字生圖、語音轉字……全都是同一招的變化。
  </p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-4); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }

  .mods { display: flex; flex-wrap: wrap; gap: var(--sp-2); margin: var(--sp-2) 0; }
  .mod {
    display: inline-flex; align-items: center; gap: 7px; padding: 9px 15px;
    border: 1px solid var(--line-2); border-radius: var(--r-sm); background: var(--surface);
    color: var(--ink-2); font-size: var(--fs-sm); transition: .15s;
  }
  .mod:hover { border-color: var(--accent); color: var(--accent-ink); }
  .mod.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }
  .mod .mi { font-size: 17px; }
  .sample { font-size: var(--fs-cap); color: var(--muted); padding: 2px 2px 0; }

  .flow { text-align: center; color: var(--muted); font-size: var(--fs-cap); margin: var(--sp-3) 0; }

  .space {
    text-align: center; border: 1.5px dashed var(--teal); border-radius: var(--r);
    background: color-mix(in srgb, var(--teal) 5%, var(--surface)); padding: 14px;
  }
  .space .sk { display: block; font-size: var(--fs-eyebrow); letter-spacing: .1em; color: var(--teal); }
  .space .concept { font-size: var(--fs-lg); font-weight: 650; color: var(--ink); margin: 8px 0 6px; letter-spacing: var(--ls-tight); }
  .space .snote { font-size: var(--fs-cap); color: var(--muted); }
  .space .snote b { color: var(--teal); }

  .result { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-top: var(--sp-4);
    background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 12px 14px; }
  .rpair { font-size: var(--fs-sm); color: var(--ink-2); }
  .rapp { font-size: var(--fs-body); color: var(--accent-ink); }
</style>
