<script>
  /* Ch · Prompt 怎麼跟 AI 溝通。同一個任務，提示寫得越清楚（角色/脈絡/格式/範例），
     回答品質越好。切換四個「提示成分」，看提示與回答一起進化、品質條上升。
     深色舞台、確定性、離線。 */
  import { fade } from 'svelte/transition';
  import { dur, D } from '../lib/motion.js';

  const BASE = '幫我寫一則跟主管請假的訊息。';
  const INGR = [
    { key: 'role', icon: '🎭', label: '角色', line: '你是專業的職場溝通助理。' },
    { key: 'ctx', icon: '📋', label: '脈絡', line: '背景：我叫小明，明天想向主管林經理請感冒病假一天，手上工作會先交接。' },
    { key: 'fmt', icon: '📐', label: '格式', line: '要求：語氣有禮貌、重點條列、盡量簡潔。' },
    { key: 'ex', icon: '📚', label: '範例 few-shot', line: '範例參考：「王經理您好，我因感冒想請一天假，工作已交接給同事，謝謝您。」請照這種風格。' },
  ];
  const OUTPUTS = [
    '明天不來了，先說一聲。',
    '林經理您好，我明天想請假一天，謝謝。',
    '林經理您好，我是小明，明天因感冒想請病假一天，工作我會先交接，謝謝您。',
    '林經理您好：我是小明，因身體不適，明天想請一天病假，手邊工作會先交接完成，不便之處敬請見諒，謝謝您。',
    '林經理您好：\n我是小明，因感冒不適，明天想請病假一天。\n• 進行中的專案今晚先交接給小華\n• 有急事可電話聯絡我\n造成不便敬請見諒，謝謝您 🙏',
  ];
  const VERDICT = [
    '太隨便：沒稱謂、沒原因、也不夠禮貌。',
    '有點樣子，但資訊不足、略顯生硬。',
    '像樣了：有稱謂、原因、也提到交接。',
    '很好：完整、有禮、專業。',
    '優秀：具體、條列、有禮又貼心，可直接送出。',
  ];
  const LABEL = ['很陽春', '普通', '不錯', '很好', '優秀'];

  let on = $state({ role: false, ctx: false, fmt: false, ex: false });
  let score = $derived(INGR.reduce((n, g) => n + (on[g.key] ? 1 : 0), 0));
  let quality = $derived(Math.round((score / 4) * 100));
  let output = $derived(OUTPUTS[score]);

  function toggle(k) { on[k] = !on[k]; }
  function fill() { on = { role: true, ctx: true, fmt: true, ex: true }; }
  function clear() { on = { role: false, ctx: false, fmt: false, ex: false }; }
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：好提示 vs 爛提示</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    同樣要 AI 做一件事，<b>提示（Prompt）寫得越清楚，回答就越好</b>。從一句隨便的要求開始，
    逐一加上<b>角色、脈絡、格式、範例</b>，看提示與回答怎麼一起變好。
  </p>

  <div class="demo-stage light">
    <div class="two">
      <div class="col">
        <div class="mono k">你的提示 PROMPT</div>
        <div class="promptbox">
          <div class="pline base">{BASE}</div>
          {#each INGR as g}
            {#if on[g.key]}
              <div class="pline add" transition:fade={{ duration: dur(D.fast) }}>
                <span class="pi">{g.icon}</span>{g.line}
              </div>
            {/if}
          {/each}
        </div>
      </div>

      <div class="col">
        <div class="mono k">AI 的回答</div>
        {#key score}
          <div class="outbox" in:fade={{ duration: dur(D.base) }}>{output}</div>
        {/key}
        <div class="quality">
          <div class="qbar"><div class="qfill" style="width:{quality}%"></div></div>
          <span class="qlabel">品質：<b>{LABEL[score]}</b></span>
        </div>
        <p class="verdict">{VERDICT[score]}</p>
      </div>
    </div>
  </div>

  <div class="ctl-row">
    <span class="glab">加入提示成分：</span>
    {#each INGR as g}
      <button class="pl" class:on={on[g.key]} onclick={() => toggle(g.key)}>{g.icon} {g.label}</button>
    {/each}
    <div class="spacer"></div>
    <button class="btn ghost sm" onclick={fill}>全部加上</button>
    <button class="btn ghost sm" onclick={clear}>清空</button>
  </div>

  <p class="hint">
    這就是 <b>提示工程</b>：把<b>角色、脈絡、格式</b>講清楚，答案立刻更準；
    附上一兩個<b>範例（few-shot）</b>更是大幅提升。同一個問題，換個問法，結果可以天差地遠——
    所以「會問」本身就是一種能力。
  </p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .two { grid-template-columns: 1fr; } }
  .k { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: var(--sp-2); }

  .promptbox { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: var(--sp-3); min-height: 150px; }
  .pline { font-size: var(--fs-sm); line-height: 1.6; padding: 6px 8px; border-radius: var(--r-sm); margin-bottom: 6px; }
  .pline.base { color: var(--ink-2); background: var(--surface-2); }
  .pline.add { color: var(--teal); background: #0f8a8015; border: 1px solid #0f8a8055; }
  .pline .pi { margin-right: 6px; }

  .outbox { background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--r); padding: var(--sp-3); font-size: var(--fs-body);
    line-height: 1.7; color: var(--ink); white-space: pre-line; min-height: 100px; }
  .quality { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
  .qbar { flex: 1; height: 10px; border-radius: 99px; background: var(--surface-3); overflow: hidden; }
  .qfill { height: 100%; border-radius: 99px; background: var(--teal); transition: width .4s cubic-bezier(.2,.7,.2,1); }
  .qlabel { font-size: var(--fs-cap); color: var(--muted); white-space: nowrap; }
  .qlabel b { color: var(--accent); }
  .verdict { font-size: var(--fs-cap); color: var(--muted); margin: var(--sp-2) 0 0; }

  .ctl-row { display: flex; flex-wrap: wrap; gap: var(--sp-2); margin: 14px 0 10px; align-items: center; }
  .glab { font-size: var(--fs-cap); color: var(--muted); }
  .ctl-row .spacer { flex: 1; }
  .pl { font-size: var(--fs-cap); padding: 5px 11px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); }
  .pl:hover { border-color: var(--accent); color: var(--accent-ink); }
  .pl.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }
  .btn.sm { padding: 5px 11px; font-size: var(--fs-cap); }
</style>
