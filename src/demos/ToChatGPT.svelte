<script>
  /* Ch · 從模型到 ChatGPT。官方怎麼把一個「只會接話」的原始模型，
     練成聽話又貼心的助理，三階段：預訓練 → 指令微調(SFT) → RLHF。
     核心：同一句要求，在每個階段的回答天差地別（接話→生硬→貼心又安全）。
     深色舞台、確定性、離線。 */
  import { onDestroy } from 'svelte';
  import { dur, D } from '../lib/motion.js';
  import { reduceMotion } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  // 三階段 icon 跨語言共用
  const ICON = ['📚', '🎯', '❤️'];

  const L = {
    zh: {
      stageName: ['預訓練', '指令微調', 'RLHF'],
      stageEn: ['Pretraining', 'SFT', '人類回饋'],
      stageCap: ['只會接話', '會聽指令', '貼心助理'],
      stageData: ['海量網路文字（無人標註）', '人寫的「指令 → 示範回答」', '人類對多個回答的偏好評分 👍👎'],
      stageLearn: [
        '學會語言的規律，但只會順著往下「接話」，不會聽你的指令。',
        '學會看懂並照著指令回答，但語氣生硬、也不管安不安全。',
        '學會貼心、有禮貌、會拒絕危險或不當的要求。',
      ],
      promptQ: ['教我怎麼泡泡麵', '幫我寫幾句罵同事的話'],
      promptResp: [
        [
          '……泡麵還能拿來炒、拌，做成小點心。根據記載，速食麵最早出現在 1958 年，發明者是……',
          '步驟：1. 煮滾水 2. 放入麵體 3. 加調味包，等約 3 分鐘即可。',
          '沒問題 😊 三步驟就搞定：\n1. 把水煮滾\n2. 下麵煮約 3 分鐘\n3. 加調味包拌勻\n小提醒：小心熱水，別燙到手唷！',
        ],
        [
          '……同事之間難免有摩擦，有人說職場如戰場，也有人覺得和氣生財……',
          '好的，以下是幾句可以用來罵人的話：你這個……',
          '我懂你現在可能很受挫 🤝 但我不太適合幫你罵人。要不要我幫你想想，怎麼把問題冷靜地講清楚、真正解決它？',
        ],
      ],
      h3: '互動：一個模型怎麼變成 ChatGPT',
      lede: '剛預訓練完的模型<b>只會「接話」</b>，不會當助理。要再經過兩道加工，它才會聽指令、才會貼心。\n    點三個階段看看：<b>同一句要求</b>，模型的回答怎麼一路進化。',
      canK: '模型現在會什麼',
      dataK: '這一階段用的資料',
      testK: '拿同一句話測試',
      verdicts: ['↑ 只是順著接話，根本沒回答你', '↑ 會照指令了，但生硬、也不顧安全', '↑ 貼心、清楚，還會拒絕不當要求'],
      testLab: '測試句',
      trainBtn: '▶ 從頭依序訓練',
      resetBtn: '回到預訓練',
      hint: '所以「ChatGPT」不是一次訓練出來的：<b>預訓練</b>讓它學會語言、<b>指令微調</b>讓它聽話、<b>RLHF</b> 讓它貼心又安全。\n    每一道加工都在原本的模型上，再教它一點「怎麼跟人好好相處」。',
    },
    en: {
      stageName: ['Pretraining', 'Instruction tuning', 'RLHF'],
      stageEn: ['Base model', 'SFT', 'Human feedback'],
      stageCap: ['Just rambles on', 'Follows instructions', 'Thoughtful assistant'],
      stageData: ['A huge amount of web text (no human labels)', 'Human-written “instruction → demonstration answer” pairs', 'Human preference ratings across several answers 👍👎'],
      stageLearn: [
        'Learns the patterns of language, but only “rambles on,” continuing text instead of following your instructions.',
        'Learns to read an instruction and answer it, but the tone is stiff, and it ignores whether the request is safe.',
        'Learns to be thoughtful and polite, and to refuse dangerous or inappropriate requests.',
      ],
      promptQ: ['Teach me how to make instant noodles', 'Write me a few lines to insult a coworker'],
      promptResp: [
        [
          '…instant noodles can also be stir-fried, tossed together, or made into little snacks. Records show instant noodles first appeared in 1958, invented by…',
          'Steps: 1. Boil water 2. Add the noodles 3. Add the seasoning packet and wait about 3 minutes.',
          'No problem 😊 Three quick steps:\n1. Bring water to a boil\n2. Add the noodles and cook about 3 minutes\n3. Stir in the seasoning packet\nQuick tip: watch out for the hot water so you don’t burn yourself!',
        ],
        [
          '…friction between coworkers is inevitable; some say the workplace is a battlefield, others say harmony breeds success…',
          'Sure, here are a few lines you could use to insult someone: You total…',
          'I get that you’re probably really frustrated right now 🤝 but insulting someone isn’t something I can help with. Want me to help you figure out how to lay the problem out calmly and actually solve it?',
        ],
      ],
      h3: 'Interactive: how a model becomes ChatGPT',
      lede: 'A freshly pretrained model <b>only “rambles on”</b>, it can’t act as an assistant. It takes two more rounds of shaping before it follows instructions and becomes thoughtful.\n    Click through the three stages: watch how the model’s answer to the <b>same request</b> evolves along the way.',
      canK: 'What the model can do now',
      dataK: 'Data used in this stage',
      testK: 'Test it with the same sentence',
      verdicts: ['↑ Just continues the text, it never actually answers you', '↑ It follows the instruction now, but it’s stiff and ignores safety', '↑ Thoughtful and clear, and it refuses inappropriate requests'],
      testLab: 'Test sentence',
      trainBtn: '▶ Train in order from scratch',
      resetBtn: 'Back to pretraining',
      hint: 'So “ChatGPT” isn’t trained in one shot: <b>pretraining</b> teaches it language, <b>instruction tuning</b> makes it follow instructions, and <b>RLHF</b> makes it thoughtful and safe.\n    Each round of shaping builds on the same model, teaching it a little more about “how to get along with people.”',
    },
    ja: {
      stageName: ['事前学習', '指示チューニング', 'RLHF'],
      stageEn: ['Base model', 'SFT', 'Human feedback'],
      stageCap: ['ただ続きを書くだけ', '指示に従える', '気の利くアシスタント'],
      stageData: ['大量のウェブ上のテキスト（人手のラベルなし）', '人が書いた「指示 → お手本の答え」のペア', '複数の答えに対する人間の好みの評価 👍👎'],
      stageLearn: [
        '言語の規則を身につける、ただし指示に従うのではなく、文章の「続きを書く」だけ。',
        '指示を読み取って答えられるようになる、ただし口調はぎこちなく、要求が安全かどうかは気にしない。',
        '気が利いて丁寧になり、危険だったり不適切だったりする要求を断れるようになる。',
      ],
      promptQ: ['インスタントラーメンの作り方を教えて', '同僚をけなす言葉を何個か書いて'],
      promptResp: [
        [
          '……インスタントラーメンは炒めたり、和えたり、ちょっとしたおやつにもできる。記録によれば、インスタントラーメンが初めて登場したのは 1958 年で、発明者は……',
          '手順：1. お湯を沸かす 2. 麺を入れる 3. 粉末スープを加え、約 3 分待てば完成。',
          'いいですよ 😊 3 ステップで完成：\n1. お湯を沸かす\n2. 麺を入れて約 3 分ゆでる\n3. 粉末スープを加えて混ぜる\nひと言：熱いお湯には気をつけて、やけどしないようにね！',
        ],
        [
          '……同僚どうしの摩擦は避けられないもので、職場は戦場だと言う人もいれば、和をもって貴しとなすと考える人もいる……',
          'はい、人をけなすのに使える言葉をいくつか挙げます：お前は本当に……',
          '今かなり悔しい気持ちなのはわかります 🤝 でも、人をけなす手伝いはちょっとできません。よかったら、問題を落ち着いて整理して、ちゃんと解決する方法を一緒に考えませんか？',
        ],
      ],
      h3: 'インタラクティブ：モデルはどうやって ChatGPT になるか',
      lede: '事前学習を終えたばかりのモデルは<b>ただ「続きを書く」だけ</b>で、アシスタントにはなれません。指示に従い、気が利くようになるには、さらに二段階の仕込みが必要です。\n    三つの段階をクリックしてみましょう：<b>同じ要求</b>に対して、モデルの答えがどう進化していくかがわかります。',
      canK: 'いまモデルにできること',
      dataK: 'この段階で使うデータ',
      testK: '同じ文で試してみる',
      verdicts: ['↑ ただ続きを書いているだけで、まったく答えていない', '↑ 指示には従うが、ぎこちなく、安全性も気にしない', '↑ 気が利いて明快、しかも不適切な要求は断る'],
      testLab: 'テスト文',
      trainBtn: '▶ 最初から順に訓練',
      resetBtn: '事前学習に戻る',
      hint: 'だから「ChatGPT」は一度の訓練でできるわけではありません：<b>事前学習</b>で言語を覚え、<b>指示チューニング</b>で指示に従うようになり、<b>RLHF</b>で気が利いて安全になります。\n    どの仕込みも同じモデルの上に積み重なり、「人とうまく付き合う方法」を少しずつ教えていきます。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let stage = $state(0);
  let promptIdx = $state(0);
  let shown = $state(0);
  let auto = false;
  let timer, autoTimer;

  let full = $derived(ui.promptResp[promptIdx][stage]);
  let respText = $derived(full.slice(0, shown));

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
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <!-- 三階段 stepper -->
    <div class="stepper">
      {#each ui.stageName as name, i}
        <button class="step" class:cur={i === stage} class:done={i < stage} onclick={() => (stage = i)}>
          <span class="ico">{i < stage ? '✓' : ICON[i]}</span>
          <span class="sn">{name}</span>
          <span class="se">{ui.stageEn[i]}</span>
        </button>
        {#if i < ui.stageName.length - 1}<span class="conn" class:on={i < stage}></span>{/if}
      {/each}
    </div>

    <div class="body">
      <div class="statecard">
        <div class="mono k">{ui.canK}</div>
        <div class="capline"><span class="cico">{ICON[stage]}</span><b>{ui.stageCap[stage]}</b></div>
        <p class="learn">{ui.stageLearn[stage]}</p>
        <div class="datatag"><span class="mono k2">{ui.dataK}</span>{ui.stageData[stage]}</div>
      </div>

      <div class="chat">
        <div class="mono k">{ui.testK}</div>
        <div class="bubble me">{ui.promptQ[promptIdx]}</div>
        <div class="bubble bot" class:warn={stage < 2 && promptIdx === 1}>
          {respText}{#if shown < full.length}<span class="cur">▍</span>{/if}
        </div>
        {#if shown >= full.length}
          <div class="verdict">
            {ui.verdicts[stage]}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <div class="ctl-row">
    <div class="grp">
      <span class="glab">{ui.testLab}</span>
      {#each ui.promptQ as q, i}<button class="pl" class:on={i === promptIdx} onclick={() => (promptIdx = i)}>{q}</button>{/each}
    </div>
    <div class="grp">
      <button class="btn primary" onclick={trainFromScratch}>{ui.trainBtn}</button>
      <button class="btn ghost" onclick={reset}>{ui.resetBtn}</button>
    </div>
  </div>

  <p class="hint">{@html ui.hint}</p>
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
  .step.cur .ico { border-color: var(--accent); background: var(--accent); color: #241500; }
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
