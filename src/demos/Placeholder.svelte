<script>
  // 尚未遷移章節的佔位。骨架已就緒，確認 Ch1 手感後其餘照 Scene 範式搬入。
  import { CH } from '../data/chapters.js';
  let { id } = $props();
  let ch = $derived(CH[id]);
</script>

<div class="panel">
  <div class="panel-h">
    <h3>互動 Demo</h3>
    <span class="eyebrow">即將遷移</span>
  </div>
  <p class="ph-body">
    本章「<b>{ch.t}</b>」的互動 demo 還在製作中。<br />
    右側的<b>重點整理</b>與<b>關鍵名詞</b>已經可以先讀；互動動畫會照同一套
    <span class="mono">Tween + Scene</span> 範式補上。
  </p>
</div>

<style>
  .ph-body {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.7;
    color: var(--ink-2);
  }
</style>
