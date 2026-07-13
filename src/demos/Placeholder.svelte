<script>
  // 尚未遷移章節的佔位。骨架已就緒，確認 Ch1 手感後其餘照 Scene 範式搬入。
  import { CH } from '../data/chapters.js';
  import { i18n } from '../stores/i18n.svelte.js';
  let { id } = $props();
  let ch = $derived(CH[id]);

  const L = {
    zh: {
      h3: '互動 Demo',
      eyebrow: '即將遷移',
      body: '本章「<b>{t}</b>」的互動 demo 還在製作中。<br />\n    右側的<b>重點整理</b>與<b>關鍵名詞</b>已經可以先讀；互動動畫會照同一套\n    <span class="mono">Tween + Scene</span> 範式補上。',
    },
    en: {
      h3: 'Interactive Demo',
      eyebrow: 'Coming soon',
      body: 'The interactive demo for this chapter, “<b>{t}</b>,” is still in the works.<br />\n    The <b>Key Takeaways</b> and <b>Key Terms</b> on the right are ready to read now; the interactive animation will follow the same\n    <span class="mono">Tween + Scene</span> pattern.',
    },
    ja: {
      h3: 'インタラクティブ Demo',
      eyebrow: '近日公開',
      body: 'この章「<b>{t}</b>」のインタラクティブ demo はまだ制作中です。<br />\n    右側の<b>重要ポイント</b>と<b>キーワード</b>は先に読めます。インタラクティブなアニメーションも同じ\n    <span class="mono">Tween + Scene</span> の枠組みで後から追加します。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);
</script>

<div class="panel">
  <div class="panel-h">
    <h3>{ui.h3}</h3>
    <span class="eyebrow">{ui.eyebrow}</span>
  </div>
  <p class="ph-body">{@html ui.body.replace('{t}', ch.t)}</p>
</div>

<style>
  .ph-body {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.7;
    color: var(--ink-2);
  }
</style>
