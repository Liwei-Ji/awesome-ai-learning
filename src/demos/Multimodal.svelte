<script>
  /* Ch · 多模態 Multimodal —— 互動：選輸入型態 → 都編碼成「同一個意義向量」
     （共用理解空間）→ 選輸出型態 → 看這組跨模態對應到哪個真實應用。
     核心概念：不同型態、同一個意思；有了共用空間就能自由轉換。亮色、離線。 */
  import { fade } from 'svelte/transition';
  import { dur, D } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  // 型態圖示跨語言共用（emoji）
  const ICONS = ['📝', '🖼️', '🔊', '🎬'];

  const L = {
    zh: {
      h3: '互動：不同型態，同一個意思',
      lede: '多模態模型能同時處理<b>文字、圖片、聲音、影片</b>。訣竅是把每一種型態都編碼成\n    <b>同一種「意義向量」</b>——放進共用空間後，就能<b>在型態之間自由轉換</b>。',
      labels: ['文字', '圖片', '聲音', '影片'],
      ex: ['「一隻橘貓在陽台曬太陽」', '一張貓咪照片 🐱', '「喵～」＋環境音', '貓伸懶腰的短片'],
      field1: '① 選輸入型態',
      flowEnc: '↓ 編碼器 Encoder',
      sk: '共用理解空間 · 同一個意義向量',
      concept: '🐱☀️ 一隻貓在陽台曬太陽',
      snote: '不管從哪種型態進來，都變成<b>同一個意思</b>',
      flowDec: '↓ 解碼器 Decoder',
      field2: '② 選輸出型態',
      apps: {
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
      },
      appFallback: '跨模態理解與生成',
      hint: '看懂了嗎？<b>「模態」＝一種資料型態</b>（文字/圖/聲/影）。多模態的關鍵不是四個模型拼在一起，\n    而是<b>一個共用的意義空間</b>——所以它能看圖說話、文字生圖、語音轉字……全都是同一招的變化。',
    },
    en: {
      h3: 'Interactive: different types, same meaning',
      lede: 'Multimodal models can handle <b>text, images, sound, and video</b> all at once. The trick is to encode every type into\n    <b>the same kind of “meaning vector”</b>—once they’re in a shared space, you can <b>convert freely between types</b>.',
      labels: ['Text', 'Image', 'Sound', 'Video'],
      ex: ['“An orange cat basking in the sun on a balcony”', 'A photo of a cat 🐱', '“Meow~” + ambient sound', 'A short clip of a cat stretching'],
      field1: '① Pick an input type',
      flowEnc: '↓ Encoder',
      sk: 'Shared understanding space · one meaning vector',
      concept: '🐱☀️ A cat basking in the sun on a balcony',
      snote: 'No matter which type comes in, it becomes <b>the same meaning</b>',
      flowDec: '↓ Decoder',
      field2: '② Pick an output type',
      apps: {
        'Text→Image': 'Text-to-image (like Midjourney, DALL·E)',
        'Text→Sound': 'Text-to-speech (TTS) (reads the text aloud)',
        'Text→Video': 'Text-to-video (like Sora)',
        'Text→Text': 'Translation, rewriting, Q&A',
        'Image→Text': 'Image captioning / describing pictures (includes OCR)',
        'Image→Image': 'Style transfer, photo editing, background removal',
        'Sound→Text': 'Speech recognition (like Whisper)',
        'Sound→Sound': 'Voice conversion, music generation',
        'Video→Text': 'Video summaries, auto-subtitles',
        'Image→Video': 'Bring a picture to life',
      },
      appFallback: 'Cross-modal understanding and generation',
      hint: 'Get it? <b>A “modality” = one type of data</b> (text/image/sound/video). The key to multimodal isn’t four models bolted together,\n    but <b>one shared meaning space</b>—so it can caption images, generate images from text, turn speech into text… all variations on the same trick.',
    },
    ja: {
      h3: 'インタラクティブ：種類は違っても、意味は同じ',
      lede: 'マルチモーダルモデルは<b>テキスト・画像・音声・動画</b>を同時に扱えます。コツは、どの種類も\n    <b>同じ形式の「意味ベクトル」</b>にエンコードすること——共有空間に入れてしまえば、<b>種類のあいだを自由に変換</b>できます。',
      labels: ['テキスト', '画像', '音声', '動画'],
      ex: ['「オレンジ色の猫がバルコニーで日なたぼっこ」', '猫の写真 🐱', '「ニャー」＋環境音', '猫が伸びをする短い動画'],
      field1: '① 入力の種類を選ぶ',
      flowEnc: '↓ エンコーダ Encoder',
      sk: '共有された理解空間 · 一つの意味ベクトル',
      concept: '🐱☀️ 猫がバルコニーで日なたぼっこ',
      snote: 'どの種類から入ってきても、<b>同じ意味</b>になる',
      flowDec: '↓ デコーダ Decoder',
      field2: '② 出力の種類を選ぶ',
      apps: {
        'テキスト→画像': 'テキストから画像生成（Midjourney や DALL·E など）',
        'テキスト→音声': '音声合成 TTS（文字を読み上げる）',
        'テキスト→動画': 'テキストから動画生成（Sora など）',
        'テキスト→テキスト': '翻訳・書き換え・質問応答',
        '画像→テキスト': '画像のキャプション生成／説明（OCR も含む）',
        '画像→画像': 'スタイル転送・写真編集・背景除去',
        '音声→テキスト': '音声認識（Whisper など）',
        '音声→音声': '声質変換・音楽生成',
        '動画→テキスト': '動画の要約・自動字幕',
        '画像→動画': '画像を動かす',
      },
      appFallback: '種類をまたぐ理解と生成',
      hint: 'わかったかな？<b>「モダリティ」＝データの種類</b>（テキスト／画像／音声／動画）。マルチモーダルのカギは 4 つのモデルを寄せ集めることではなく、\n    <b>1 つの共有された意味空間</b>——だから画像の説明も、テキストからの画像生成も、音声のテキスト化も…すべて同じ仕組みの応用なんだ。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let inMod = $state(0);
  let outMod = $state(1);

  let ci = $derived({ icon: ICONS[inMod], label: ui.labels[inMod], ex: ui.ex[inMod] });
  let co = $derived({ icon: ICONS[outMod], label: ui.labels[outMod] });
  let app = $derived(ui.apps[`${ci.label}→${co.label}`] || ui.appFallback);
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <span class="fieldk">{ui.field1}</span>
    <div class="mods">
      {#each ui.labels as label, i}
        <button class="mod" class:on={i === inMod} onclick={() => (inMod = i)}>
          <span class="mi">{ICONS[i]}</span>{label}
        </button>
      {/each}
    </div>
    {#key inMod}
      <div class="sample" in:fade={{ duration: dur(D.fast) }}>{ci.ex}</div>
    {/key}

    <div class="flow mono">{ui.flowEnc}</div>

    <div class="space">
      <span class="sk mono">{ui.sk}</span>
      <div class="concept">{ui.concept}</div>
      <span class="snote">{@html ui.snote}</span>
    </div>

    <div class="flow mono">{ui.flowDec}</div>

    <span class="fieldk">{ui.field2}</span>
    <div class="mods">
      {#each ui.labels as label, i}
        <button class="mod" class:on={i === outMod} onclick={() => (outMod = i)}>
          <span class="mi">{ICONS[i]}</span>{label}
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

  <p class="hint">{@html ui.hint}</p>
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
