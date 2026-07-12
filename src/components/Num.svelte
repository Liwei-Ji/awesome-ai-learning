<script>
  // 數字 count-up：值一變就平滑補間到新值（準確率、統計數字用）。
  // 同樣以 rAF 時間戳補間，理由見 Bar.svelte。
  import { onDestroy } from 'svelte';
  import { dur, D } from '../lib/motion.js';

  let { value = 0, duration = D.slow, format = (v) => Math.round(v) } = $props();

  let shown = $state(value);
  let raf;

  function animate(target) {
    cancelAnimationFrame(raf);
    const from = shown;
    const ms = dur(duration);
    let base;
    const step = (t) => {
      if (base === undefined) base = t;
      const p = ms <= 0 ? 1 : Math.min(1, (t - base) / ms);
      const k = 1 - Math.pow(1 - p, 3); // cubicOut
      shown = from + (target - from) * k;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }

  let init = false;
  $effect(() => {
    const v = value;
    if (!init) { init = true; shown = v; } // 首次直接顯示，不從 0 跳
    else animate(v);
  });

  onDestroy(() => cancelAnimationFrame(raf));
</script>{format(shown)}