<script>
  /* Ch · AI 評估 Evaluation —— 兩段互動：
     ① A/B 盲測：同一題兩個答案，先選哪個好、再揭曉（含「新模型反而錯」的反例）。
     ② Benchmark：新 vs 舊模型跨任務對照，顯示「沒有全能冠軍」。
     教學重點：好壞有客觀標準；越新越大不一定每項都贏。亮色、離線。 */
  import { fade, fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';

  const ROUNDS = [
    {
      q: '台灣最高的山是哪一座？',
      a: { text: '玉山，海拔約 3,952 公尺。', model: '較小的舊模型', good: true },
      b: { text: '應該是阿里山吧？海拔大概四千多公尺。', model: '較大的新模型', good: false },
      why: 'A 正確又明確；B 不但答錯（是玉山不是阿里山），還「不太確定」卻講得像真的——這就是<b>幻覺</b>。',
      lesson: '更大更新的模型，這題反而錯了：<b>不能只看是不是最新款</b>。',
    },
    {
      q: '「這款耳機防水嗎？」——依據沒有防水資訊的產品手冊回答。',
      a: { text: '手冊沒有提到防水規格，建議向客服確認，以免進水損壞。', model: '模型甲', good: true },
      b: { text: '有的，本款支援 IPX7 防水，可以戴著游泳。', model: '模型乙', good: false },
      why: 'A 誠實說「資料沒有」；B 直接<b>編出一個規格（IPX7）</b>——聽起來超專業，其實是幻覺，還可能害人弄壞產品。',
      lesson: '「敢承認不知道」有時比「講得很專業」更好。',
    },
    {
      q: '把「我明天想請一天假」翻成自然的英文。',
      a: { text: 'I would like to take a day off tomorrow.', model: '模型甲', good: true },
      b: { text: 'I want ask a vacation in my tomorrow.', model: '模型乙', good: false },
      why: 'A 文法自然、語氣得體；B 文法錯誤、讀起來卡。翻譯要看<b>正確與自然度</b>。',
      lesson: '好壞有客觀標準：正確、通順、切題。',
    },
  ];

  const TASKS = [
    { t: '數學推理', neu: 88, old: 72 },
    { t: '常識問答', neu: 90, old: 86 },
    { t: '創意寫作', neu: 79, old: 83 },
    { t: '程式撰寫', neu: 85, old: 70 },
    { t: '回應速度', neu: 58, old: 90 },
  ];

  let round = $state(0);
  let picked = $state(null);   // 'a' | 'b' | null
  let r = $derived(ROUNDS[round]);
  let correctKey = $derived(r.a.good ? 'a' : 'b');

  function pick(k) { if (!picked) picked = k; }
  function next() { round = (round + 1) % ROUNDS.length; picked = null; }
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：當一次 AI 評審（A/B 盲測）</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    要判斷 AI 好不好，最常用的方法是<b>比較</b>。同一個問題、兩個答案，你先選哪個好，再揭曉——
    順便看看：<b>更新更大的模型，是不是每題都比較強？</b>
  </p>

  <div class="demo-stage light">
    <div class="qbar"><span class="fieldk">第 {round + 1} / {ROUNDS.length} 題</span><div class="q">{r.q}</div></div>

    <div class="ab">
      {#each ['a', 'b'] as k}
        {@const ans = r[k]}
        <button class="ans" class:picked={picked === k}
          class:good={picked && ans.good} class:bad={picked && !ans.good}
          disabled={!!picked} onclick={() => pick(k)}>
          <div class="al mono">答案 {k.toUpperCase()}</div>
          <div class="atext">{ans.text}</div>
          {#if picked}
            <div class="ameta" in:fade={{ duration: dur(D.fast) }}>
              <span class="verdict">{ans.good ? '✓ 較好' : '✗ 有問題'}</span>
              <span class="model">來自：{ans.model}</span>
            </div>
          {/if}
        </button>
      {/each}
    </div>

    {#if !picked}
      <div class="waiting">👆 點你覺得比較好的答案</div>
    {:else}
      {#key round}
        <div class="reveal" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
          <p class="yr">{picked === correctKey ? '✓ 你選對了！' : '✗ 這次看走眼——'}</p>
          <p class="why">{@html r.why}</p>
          <p class="lesson">💡 {@html r.lesson}</p>
          <button class="btn primary" onclick={next}>下一題 →</button>
        </div>
      {/key}
    {/if}
  </div>

  <p class="hint">
    判斷好壞不是「感覺」，而是看幾個標準：<b>正確、完整、切題、有沒有幻覺</b>。
    這也是為什麼 AI 公司要用「一整套題目」來系統化比較——那就是下面的 Benchmark。
  </p>
</div>

<div class="panel">
  <div class="panel-h"><h3>Benchmark：新模型一定比較強嗎？</h3><span class="eyebrow">Interactive</span></div>
  <p class="lede">
    <b>Benchmark（基準測驗）</b>＝用一整套標準題目替模型打分，讓不同模型能公平比較。
    看看「新模型」和「舊模型」的成績單：
  </p>

  <div class="demo-stage light">
    <div class="legend">
      <span class="lg"><i class="sw new"></i>新模型</span>
      <span class="lg"><i class="sw old"></i>舊模型</span>
    </div>
    {#each TASKS as t}
      <div class="brow">
        <span class="bt">{t.t}</span>
        <div class="bars">
          <div class="track"><div class="fill new" class:win={t.neu >= t.old} style="width:{t.neu}%"></div><span class="bv">{t.neu}</span></div>
          <div class="track"><div class="fill old" class:win={t.old > t.neu} style="width:{t.old}%"></div><span class="bv">{t.old}</span></div>
        </div>
      </div>
    {/each}
  </div>

  <p class="hint">
    看到了嗎？新模型在<b>數學、常識、程式</b>更強，但<b>創意寫作</b>輸、<b>回應速度</b>更是大輸——
    <b>沒有「全能冠軍」</b>。挑模型要看<b>你的任務</b>，而不是「哪個最新」。這就是評估的意義。
  </p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-4); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }

  .qbar { margin-bottom: var(--sp-3); }
  .q { font-size: var(--fs-lg); font-weight: 600; letter-spacing: var(--ls-tight); margin-top: 4px; }

  .ab { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .ab { grid-template-columns: 1fr; } }
  .ans {
    text-align: left; padding: 14px 16px; border: 1.5px solid var(--line-2); border-radius: var(--r);
    background: var(--surface); cursor: pointer; transition: border-color .15s, box-shadow .15s, background .15s;
  }
  .ans:hover:not(:disabled) { border-color: var(--accent); box-shadow: 0 2px 10px rgba(20,30,55,.08); }
  .ans:disabled { cursor: default; }
  .ans.good { border-color: var(--good); background: color-mix(in srgb, var(--good) 7%, var(--surface)); }
  .ans.bad { border-color: var(--crit); background: color-mix(in srgb, var(--crit) 6%, var(--surface)); }
  .al { font-size: var(--fs-micro); color: var(--muted); letter-spacing: .1em; }
  .atext { font-size: var(--fs-body); color: var(--ink); line-height: var(--lh-snug); margin-top: 6px; }
  .ameta { display: flex; align-items: center; gap: 12px; margin-top: 10px; font-size: var(--fs-cap); }
  .ans.good .verdict { color: var(--good); font-weight: 600; }
  .ans.bad .verdict { color: var(--crit); font-weight: 600; }
  .ameta .model { color: var(--muted); }

  .waiting { margin-top: var(--sp-3); }
  .reveal { margin-top: var(--sp-4); background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 14px 16px; }
  .yr { font-size: var(--fs-body); font-weight: 650; margin: 0 0 6px; }
  .why { font-size: var(--fs-sm); color: var(--ink-2); line-height: var(--lh-snug); margin: 0 0 6px; }
  .why :global(b) { color: var(--crit); }
  .lesson { font-size: var(--fs-sm); color: var(--ink-2); line-height: var(--lh-snug); margin: 0 0 12px; }
  .lesson :global(b) { color: var(--accent-ink); }

  .legend { display: flex; gap: 16px; margin-bottom: var(--sp-3); font-size: var(--fs-cap); color: var(--muted); }
  .legend .sw { display: inline-block; width: 11px; height: 11px; border-radius: 3px; margin-right: 5px; vertical-align: -1px; }
  .sw.new { background: var(--accent); }
  .sw.old { background: var(--teal); }
  .brow { display: grid; grid-template-columns: 76px 1fr; align-items: center; gap: 12px; margin: 9px 0; }
  .bt { font-size: var(--fs-sm); color: var(--ink-2); }
  .bars { display: flex; flex-direction: column; gap: 5px; }
  .track { position: relative; height: 16px; background: var(--surface-3); border-radius: 5px; }
  .fill { height: 100%; border-radius: 5px; opacity: .5; transition: width .5s cubic-bezier(.2,.7,.2,1); }
  .fill.new { background: var(--accent); }
  .fill.old { background: var(--teal); }
  .fill.win { opacity: 1; }
  .bv { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); font-family: var(--mono); font-size: var(--fs-micro); color: var(--ink); }
</style>
