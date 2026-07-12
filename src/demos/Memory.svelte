<script>
  /* Ch · Memory：AI 怎麼記住你。模型本身沒記憶，每次對話都是空白；
     「記住」是把重點存到外部記憶庫、下次對話前再塞回上下文。
     切換「沒有記憶 / 有記憶」，看它跨對話記得 vs 忘光。亮色、離線。 */
  import { fade, fly } from 'svelte/transition';
  import { dur, D } from '../lib/motion.js';

  let memOn = $state(false);
  const MEM = [['名字', '小明'], ['喜好', '貓 🐱'], ['語言', '繁體中文']];
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：AI 記得住你嗎？</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    模型本身<b>沒有記憶</b>——每次對話都是一張白紙。所謂「記住」，其實是把重點<b>存到外部記憶庫</b>，
    下次對話前再<b>塞回上下文</b>。切換看看有沒有記憶差多少。
  </p>

  <div class="demo-stage light">
    <div class="seg">
      <button class="segb" class:on={!memOn} onclick={() => (memOn = false)}>🚫 沒有記憶</button>
      <button class="segb" class:on={memOn} onclick={() => (memOn = true)}>🧠 有記憶</button>
    </div>

    <div class="grid">
      <div class="convo">
        <div class="daytag">第一次對話</div>
        <div class="msg me">我叫小明，最喜歡貓 🐱</div>
        <div class="msg bot">好的，很高興認識你！{#if memOn}<span class="wrote">（已寫入記憶）</span>{/if}</div>

        <div class="divider"><span>——— 幾天後，全新的一段對話 ———</span></div>
        {#if memOn}
          <div class="inject" in:fade={{ duration: dur(D.base) }}>↩︎ 對話開始前，先把記憶塞回上下文</div>
        {/if}
        <div class="msg me">我叫什麼？我喜歡什麼？</div>
        {#key memOn}
          <div class="msg bot ans" class:good={memOn} class:bad={!memOn} in:fly={{ y: 8, duration: dur(D.base) }}>
            {#if memOn}
              你叫<b>小明</b>，最喜歡<b>貓 🐱</b>！（我從記憶裡查到的）
            {:else}
              嗯…抱歉，我不記得你是誰，這好像是我們第一次說話 🤔
            {/if}
          </div>
        {/key}
      </div>

      <div class="memcol">
        <div class="mono k">🗄️ 記憶庫 {memOn ? '' : '（關閉）'}</div>
        {#if memOn}
          {#each MEM as [k, v], i}
            <div class="mem" in:fly={{ y: 6, duration: dur(D.fast), delay: dur(i * 70) }}>
              <span class="mk">{k}</span><span class="mv">{v}</span>
            </div>
          {/each}
          <div class="memnote">跨對話保留，下次自動帶入。</div>
        {:else}
          <div class="empty">（空的）<br>模型記不住任何事，<br>每次都從零開始。</div>
        {/if}
      </div>
    </div>
  </div>

  <p class="hint">
    所以 AI「有記憶」不是模型變聰明了，而是外面<b>幫它存檔、再塞回來</b>。
    <b>短期記憶</b>＝這一次對話的上下文；<b>長期記憶</b>＝跨對話的筆記（常用資料庫或 RAG 實作）。
    記住越多越貼心，但也越要注意隱私。
  </p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .k { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: 10px; }
  .seg { display: inline-flex; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 3px; gap: 3px; margin-bottom: var(--sp-4); }
  .segb { font-size: var(--fs-cap); padding: 7px 14px; border-radius: var(--r-sm); border: none; background: none; color: var(--muted); cursor: pointer; }
  .segb.on { background: var(--accent); color: #241500; font-weight: 600; }

  .grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
  .convo, .memcol { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 12px 14px; }

  .daytag { font-size: var(--fs-micro); font-family: var(--mono); color: var(--muted); margin-bottom: 8px; }
  .msg { max-width: 85%; padding: 8px 12px; border-radius: var(--r); font-size: var(--fs-body); line-height: 1.55; margin-bottom: 8px; }
  .msg.me { margin-left: auto; background: var(--accent); color: #241500; border-bottom-right-radius: 4px; }
  .msg.bot { background: var(--surface-2); border: 1px solid var(--line); color: var(--ink-2); border-bottom-left-radius: 4px; }
  .msg.bot.good { background: #0f8a800c; border-color: #0f8a8055; color: var(--ink); }
  .msg.bot.bad { background: #fceaea; border-color: #e8b4b4; color: #b23; }
  .wrote { font-size: var(--fs-micro); color: var(--teal); }
  .divider { text-align: center; font-size: var(--fs-micro); color: var(--muted); margin: var(--sp-3) 0 10px; }
  .inject { font-size: var(--fs-micro); color: var(--teal); background: #0f8a800c; border: 1px dashed #0f8a8055; border-radius: var(--r-sm); padding: 5px 10px; margin-bottom: 8px; display: inline-block; }

  .mem { display: flex; justify-content: space-between; gap: 10px; background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--r-sm); padding: 8px 10px; margin-bottom: 7px; font-size: var(--fs-sm); }
  .mk { color: var(--muted); }
  .mv { color: var(--teal); font-weight: 600; }
  .memnote { font-size: var(--fs-micro); color: var(--muted); margin-top: 6px; }
  .empty { font-size: var(--fs-cap); color: var(--muted); text-align: center; line-height: 1.7; padding: 16px 0; border: 1px dashed var(--line); border-radius: var(--r); }
</style>
