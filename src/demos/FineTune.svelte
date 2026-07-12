<script>
  /* Ch · Fine-tuning。拿通用模型 + 少量你的範例再訓練，讓它學會你的語氣/格式/專業。
     LoRA：只調一小塊參數就能客製。挑一個風格，用幾個範例微調，看同一句話「微調前 vs 微調後」。
     亮色、確定性、離線。 */
  import { fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';

  const STYLES = [
    { key: 'cs', label: '親切客服', icon: '💁',
      examples: [['我要退貨', '沒問題～已為您開啟退貨流程 🙏 有問題都可以再找我！'], ['運費多少', '親～滿千免運，未滿酌收 80 元 💛']],
      test: '我的包裹還沒到',
      before: '包裹未送達，請自行洽詢物流。',
      after: '哎呀讓您久等了真不好意思 🙏 我馬上幫您查件！通常 1–2 天內會到，這是查詢連結，也隨時能再找我～' },
    { key: 'kid', label: '兒童老師', icon: '🧒',
      examples: [['什麼是雲', '雲是天空裡好多小水滴聚在一起，像棉花糖飄呀飄 ☁️'], ['為什麼會下雨', '因為雲裝不下太多水滴，就變成雨滴掉下來囉！🌧️']],
      test: '什麼是光合作用？',
      before: '光合作用是植物利用光能將二氧化碳與水合成有機物並釋放氧氣的過程。',
      after: '植物就像小廚師 🌱！用陽光當爐火，把空氣和水變成好吃的養分，還會吐出我們呼吸的新鮮氧氣，很棒吧？' },
    { key: 'law', label: '嚴謹法律', icon: '⚖️',
      examples: [['可以提前解約嗎', '依契約第 8 條，任一方得於 30 日前以書面通知終止，逾期視為續約。'], ['押金何時退', '依民法，租賃關係消滅後，出租人應於返還租賃物時無息返還押金。']],
      test: '員工遲到可以扣薪嗎？',
      before: '遲到可能會被扣錢。',
      after: '依勞動基準法，雇主不得預扣工資作為違約金；惟遲到未提供勞務之時段得按比例不予計薪，並應於工作規則明定，且不得逾越比例原則。' },
  ];

  let idx = $state(0);
  let tuned = $state(false);
  let s = $derived(STYLES[idx]);

  function pick(i) { idx = i; tuned = false; }
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：用你的範例，客製一個模型</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    <b>Fine-tuning（微調）</b>＝拿一個通用模型，再用<b>少量你的範例</b>再訓練，讓它學會你要的<b>語氣、格式、專業</b>。
    選一個風格，用幾個範例微調，看同一句話前後差多少。
  </p>

  <div class="demo-stage light">
    <div class="pills">
      {#each STYLES as st, i}
        <button class="pl" class:on={i === idx} onclick={() => pick(i)}>{st.icon} {st.label}</button>
      {/each}
    </div>

    <div class="grid">
      <div class="col">
        <div class="mono k">① 你的訓練資料（只需少量範例）</div>
        {#each s.examples as [q, a]}
          <div class="ex">
            <div class="exq">Q：{q}</div>
            <div class="exa">A：{a}</div>
          </div>
        {/each}

        <div class="model">
          <div class="mbox">通用大模型 <span class="lock">🔒 凍結</span></div>
          <div class="plus">＋</div>
          <div class="adapter" class:on={tuned}>LoRA 小調節器{tuned ? '：已用你的資料訓練 ✓' : '（待訓練）'}</div>
        </div>
      </div>

      <div class="col">
        <div class="mono k">② 拿同一句話測試</div>
        <div class="ask">{s.test}</div>
        <div class="ans before">
          <div class="atag">微調前（通用）</div>{s.before}
        </div>
        {#if tuned}
          <div class="ans after" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
            <div class="atag on">微調後（{s.label}）</div>{s.after}
          </div>
        {:else}
          <div class="hintbox">按下方「▶ 用範例微調」，看它學會這個風格。</div>
        {/if}
      </div>
    </div>

    <div class="actions">
      <button class="btn primary" disabled={tuned} onclick={() => (tuned = true)}>▶ 用你的範例微調</button>
      {#if tuned}<button class="btn ghost" onclick={() => (tuned = false)}>重置</button>{/if}
    </div>
  </div>

  <p class="hint">
    重點：<b>只用少量範例</b>，就能把通用模型調成你的專屬助手；<b>LoRA</b> 只調一小塊參數、又快又省。
    什麼時候用？當你需求穩定、量大、要固定語氣或專業術語時——微調比每次寫長提示更划算。
  </p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .k { font-size: var(--fs-eyebrow); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: var(--sp-2); }
  .pills { display: flex; gap: var(--sp-2); flex-wrap: wrap; margin-bottom: var(--sp-4); }
  .pl { font-size: var(--fs-cap); padding: 6px 13px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); }
  .pl:hover { border-color: var(--accent); color: var(--accent-ink); }
  .pl.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
  .col { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: var(--sp-3) var(--sp-4); }

  .ex { background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--r-sm); padding: var(--sp-2) 10px; margin-bottom: 7px; font-size: var(--fs-cap); }
  .exq { color: var(--ink-2); }
  .exa { color: var(--teal); margin-top: 2px; }

  .model { display: flex; align-items: center; gap: var(--sp-2); margin-top: var(--sp-3); flex-wrap: wrap; }
  .mbox { font-size: var(--fs-cap); background: var(--surface-2); border: 1px solid var(--line-2); border-radius: var(--r-sm); padding: var(--sp-2) 10px; color: var(--ink-2); }
  .mbox .lock { color: var(--muted); }
  .plus { color: var(--muted); font-weight: 700; }
  .adapter { font-size: var(--fs-cap); border-radius: var(--r-sm); padding: var(--sp-2) 10px; border: 1px dashed var(--line-2); color: var(--muted); transition: .25s; }
  .adapter.on { border-style: solid; border-color: var(--teal); background: #0f8a800c; color: var(--teal); font-weight: 600; }

  .ask { font-size: var(--fs-body); color: #241500; background: var(--accent); border-radius: var(--r); padding: var(--sp-2) var(--sp-3); display: inline-block; margin-bottom: var(--sp-2); }
  .ans { border-radius: var(--r); padding: 9px var(--sp-3); font-size: var(--fs-body); line-height: var(--lh-body); margin-bottom: var(--sp-2); }
  .ans.before { background: var(--surface-2); border: 1px solid var(--line); color: var(--muted); }
  .ans.after { background: #0f8a800c; border: 1px solid #0f8a8055; color: var(--ink); }
  .atag { font-size: var(--fs-eyebrow); font-family: var(--mono); color: var(--muted); margin-bottom: 4px; }
  .atag.on { color: var(--teal); }
  .hintbox { font-size: var(--fs-cap); color: var(--muted); border: 1px dashed var(--line); border-radius: var(--r); padding: var(--sp-3); }

  .actions { display: flex; gap: var(--sp-3); margin-top: var(--sp-4); }
</style>
