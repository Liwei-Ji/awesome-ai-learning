<script>
  /* 單一長條：寬度與百分比數字「同步」逐格補間（不再瞬跳）。
     進場錯開（stagger by index）；之後值變動（拉滑桿）改用短時長即時跟隨。
     以 rAF 時間戳自行補間（cubicOut），比 CSS transition 可控，
     也避免依賴 performance.now（在無頭截圖環境不前進）。 */
  import { onDestroy } from 'svelte';
  import { dur, D } from '../lib/motion.js';

  let { nm, val = 0, win = false, index = 0, stagger = true } = $props();

  let shown = $state(0);
  let raf;

  function animate(target, duration, wait) {
    cancelAnimationFrame(raf);
    const from = shown;
    let base;
    const step = (t) => {
      if (base === undefined) base = t + wait; // 先等 stagger 延遲
      const e = t - base;
      if (e < 0) { raf = requestAnimationFrame(step); return; }
      const p = duration <= 0 ? 1 : Math.min(1, e / duration);
      const k = 1 - Math.pow(1 - p, 3); // cubicOut
      shown = from + (target - from) * k;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }

  let started = false;
  $effect(() => {
    const target = val;
    if (!started) { started = true; animate(target, dur(D.slow), stagger ? dur(index * 80) : 0); }
    else animate(target, dur(D.fast), 0);
  });

  onDestroy(() => cancelAnimationFrame(raf));
</script>

<div class="bar" class:win>
  <span class="nm">{nm}</span>
  <div class="track"><div class="fv" style="width:{shown}%; transition:none"></div></div>
  <span class="pct">{Math.round(shown)}%</span>
</div>
