<script>
  /* Ch · 從模型到 ChatGPT。官方怎麼把一個「只會接話」的原始模型，
     練成聽話又貼心的助理——三階段：預訓練 → 指令微調(SFT) → RLHF。
     核心：同一句要求，在每個階段的回答天差地別（接話→生硬→貼心又安全）。
     深色舞台、確定性、離線。 */
  import { onDestroy } from 'svelte';
  import { dur, D } from '../lib/motion.js';
  import { reduceMotion } from '../lib/motion.js';

  const STAGES = [
    { name: '預訓練', en: 'Pretraining', icon: '📚', cap: '只會接話',
      data: '海量網路文字（無人標註）', learn: '學會語言的規律——但只會順著往下「接話」，不會聽你的指令。' },
    { name: '指令微調', en: 'SFT', icon: '🎯', cap: '會聽指令',
      data: '人寫的「指令 → 示範回答」', learn: '學會看懂並照著指令回答——但語氣生硬、也不管安不安全。' },
    { name: 'RLHF', en: '人類回饋', icon: '❤️', cap: '貼心助理',
      data: '人類對多個回答的偏好評分 👍👎', learn: '學會貼心、有禮貌、會拒絕危險或不當的要求。' },
  ];

  const PROMPTS = [
    { q: '教我怎麼泡泡麵', resp: [
      '……泡麵還能拿來炒、拌，做成小點心。根據記載，速食麵最早出現在 1958 年，發明者是……',
      '步驟：1. 煮滾水 2. 放入麵體 3. 加調味包，等約 3 分鐘即可。',
      '沒問題 😊 三步驟就搞定：\n1. 把水煮滾\n2. 下麵煮約 3 分鐘\n3. 加調味包拌勻\n小提醒：小心熱水，別燙到手唷！',
    ] },
    { q: '幫我寫幾句罵同事的話', resp: [
      '……同事之間難免有摩擦，有人說職場如戰場，也有人覺得和氣生財……',
      '好的，以下是幾句可以用來罵人的話：你這個……',
      '我懂你現在可能很受挫 🤝 但我不太適合幫你罵人。要不要我幫你想想，怎麼把問題冷靜地講清楚、真正解決它？',
    ] },
  ];

  let stage = $state(0);
  let promptIdx = $state(0);
  let shown = $state(0);
  let auto = false;
  let timer, autoTimer;

  let full = $derived(PROMPTS[promptIdx].resp[stage]);
  let respText = $derived(full.slice(0, shown));
  let st = $derived(STAGES[stage]);

  function stream() {
    clearTimeout(timer);
    const target = full.length;   // 快照長度（full 依賴 stage/promptIdx，已是 effect 依賴）
    shown = 0;
    if (reduceMotion) { shown = target; return; }
    // 非同步排程首個 tick：避免 effect 內同步讀寫 shown 造成無限更新迴圈
    const tick = () => { if (shown < target) { shown++; timer = setTimeout(tick, dur(24)); } };
    timer = setTimeout(tick, dur(24));
  }
  // 換階段 / 換題目 → 重新串流回答
  $effect(() => { stage; promptIdx; stream(); });

  function trainFromScratch() {
    clearTimeout(autoTimer); auto = true; stage = 0;
    autoTimer = setTimeout(() => { stage = 1; autoTimer = setTimeout(() => { stage = 2; auto = false; }, dur(2400)); }, dur(2400));
  }
  function reset() { clearTimeout(autoTimer); auto = false; stage = 0; }

  onDestroy(() => { clearTimeout(timer); clearTimeout(autoTimer); });
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：一個模型怎麼變成 ChatGPT</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    剛預訓練完的模型<b>只會「接話」</b>，不會當助理。要再經過兩道加工，它才會聽指令、才會貼心。
    點三個階段看看：<b>同一句要求</b>，模型的回答怎麼一路進化。
  </p>

  <div class="demo-stage light">
    <!-- 三階段 stepper -->
    <div class="stepper">
      {#each STAGES as s, i}
        <button class="step" class:cur={i === stage} class:done={i < stage} onclick={() => (stage = i)}>
          <span class="ico">{i < stage ? '✓' : s.icon}</span>
          <span class="sn">{s.name}</span>
          <span class="se">{s.en}</span>
        </button>
        {#if i < STAGES.length - 1}<span class="conn" class:on={i < stage}></span>{/if}
      {/each}
    </div>

    <div class="body">
      <div class="statecard">
        <div class="mono k">模型現在會什麼</div>
        <div class="capline"><span class="cico">{st.icon}</span><b>{st.cap}</b></div>
        <p class="learn">{st.learn}</p>
        <div class="datatag"><span class="mono k2">這一階段用的資料</span>{st.data}</div>
      </div>

      <div class="chat">
        <div class="mono k">拿同一句話測試</div>
        <div class="bubble me">{PROMPTS[promptIdx].q}</div>
        <div class="bubble bot" class:warn={stage < 2 && promptIdx === 1}>
          {respText}{#if shown < full.length}<span class="cur">▍</span>{/if}
        </div>
        {#if shown >= full.length}
          <div class="verdict">
            {stage === 0 ? '↑ 只是順著接話，根本沒回答你' : stage === 1 ? '↑ 會照指令了，但生硬、也不顧安全' : '↑ 貼心、清楚，還會拒絕不當要求'}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <div class="ctl-row">
    <div class="grp">
      <span class="glab">測試句</span>
      {#each PROMPTS as p, i}<button class="pl" class:on={i === promptIdx} onclick={() => (promptIdx = i)}>{p.q}</button>{/each}
    </div>
    <div class="grp">
      <button class="btn primary" onclick={trainFromScratch}>▶ 從頭依序訓練</button>
      <button class="btn ghost" onclick={reset}>回到預訓練</button>
    </div>
  </div>

  <p class="hint">
    所以「ChatGPT」不是一次訓練出來的：<b>預訓練</b>讓它學會語言、<b>指令微調</b>讓它聽話、<b>RLHF</b> 讓它貼心又安全。
    每一道加工都在原本的模型上，再教它一點「怎麼跟人好好相處」。
  </p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }

  .stepper { display: flex; align-items: center; margin-bottom: var(--sp-4); }
  .step { flex: none; display: flex; flex-direction: column; align-items: center; gap: 2px;
    background: none; border: none; cursor: pointer; padding: var(--sp-1) var(--sp-2); opacity: .5; transition: opacity .25s, transform .25s; }
  .step .ico { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; font-size: 19px;
    background: var(--surface-2); border: 1.5px solid var(--line); transition: .25s; }
  .step .sn { font-size: var(--fs-cap); color: var(--ink-2); font-weight: 600; }
  .step .se { font-family: var(--mono); font-size: var(--fs-micro); color: var(--muted); letter-spacing: .06em; }
  .step.cur { opacity: 1; transform: translateY(-1px); }
  .step.cur .ico { border-color: var(--accent); background: var(--accent); color: #241500; box-shadow: 0 0 18px var(--glow); }
  .step.done { opacity: 1; }
  .step.done .ico { border-color: var(--teal); color: var(--teal); }
  .conn { flex: 1; height: 2px; background: var(--line); margin: 0 2px 22px; transition: background .3s; }
  .conn.on { background: var(--teal); }

  .body { display: grid; grid-template-columns: 1fr 1.15fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .body { grid-template-columns: 1fr; } }
  .statecard, .chat { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: var(--sp-3) var(--sp-4); }
  .k { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: var(--sp-2); }
  .capline { display: flex; align-items: center; gap: var(--sp-2); }
  .cico { font-size: 26px; }
  .capline b { font-size: 20px; color: var(--ink); }
  .learn { font-size: var(--fs-cap); color: var(--muted); line-height: var(--lh-body); margin: var(--sp-2) 0 var(--sp-3); }
  .datatag { font-size: var(--fs-cap); color: var(--ink-2); background: var(--surface-2); border-radius: var(--r-sm); padding: var(--sp-2) 10px; }
  .k2 { display: block; color: var(--muted); margin-bottom: 3px; }

  .bubble { font-size: var(--fs-body); line-height: var(--lh-body); padding: var(--sp-2) var(--sp-3); border-radius: var(--r); margin-bottom: var(--sp-2); white-space: pre-line; }
  .bubble.me { background: var(--accent); color: #241500; align-self: flex-end; display: inline-block; }
  .bubble.bot { background: var(--surface-2); color: var(--ink-2); border: 1px solid var(--line); min-height: 22px; }
  .bubble.bot.warn { border-color: #e8b4b4; }
  .cur { color: var(--accent); }
  .verdict { font-size: var(--fs-micro); color: var(--muted); }

  .ctl-row { display: flex; flex-wrap: wrap; gap: 18px; margin: var(--sp-4) 0 var(--sp-3); align-items: center; justify-content: space-between; }
  .grp { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; }
  .glab { font-size: var(--fs-cap); color: var(--muted); }
  .pl { font-size: var(--fs-cap); padding: 5px 11px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); }
  .pl:hover { border-color: var(--accent); color: var(--accent-ink); }
  .pl.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }
</style>
