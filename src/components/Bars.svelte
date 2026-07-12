<script>
  // 共用長條圖：機率/信心分佈。實際動畫在 Bar.svelte（寬度+數字同步補間、進場錯開）。
  import Bar from './Bar.svelte';
  let { rows = [], stagger = true } = $props();
</script>

{#each rows as r, i}
  <Bar nm={r.nm} val={r.val} win={r.win} index={i} {stagger} />
{/each}
