<script>
  /* Ch · Fine-tuning。拿通用模型 + 少量你的範例再訓練，讓它學會你的語氣/格式/專業。
     LoRA：只調一小塊參數就能客製。挑一個風格，用幾個範例微調，看同一句話「微調前 vs 微調後」。
     亮色、確定性、離線。 */
  import { fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  // key + icon 跨語言共用；文字內容依 i18n.locale 從 L.styles 取得。
  const STYLES = [
    { key: 'cs', icon: '💁' },
    { key: 'kid', icon: '🧒' },
    { key: 'law', icon: '⚖️' },
  ];

  const L = {
    zh: {
      h3: '互動：用你的範例，客製一個模型',
      lede: '<b>Fine-tuning（微調）</b>＝拿一個通用模型，再用<b>少量你的範例</b>再訓練，讓它學會你要的<b>語氣、格式、專業</b>。選一個風格，用幾個範例微調，看同一句話前後差多少。',
      col1k: '① 你的訓練資料（只需少量範例）',
      qLabel: 'Q：', aLabel: 'A：',
      baseModel: '通用大模型', frozen: '凍結',
      adapter: 'LoRA 小調節器', adapterTrained: '：已用你的資料訓練 ✓', adapterUntrained: '（待訓練）',
      col2k: '② 拿同一句話測試',
      atagBefore: '微調前（通用）', atagAfter: '微調後（{name}）',
      hintbox: '按下方「▶ 用範例微調」，看它學會這個風格。',
      btnTune: '▶ 用你的範例微調', btnReset: '重置',
      hint: '重點：<b>只用少量範例</b>，就能把通用模型調成你的專屬助手；<b>LoRA</b> 只調一小塊參數、又快又省。什麼時候用？當你需求穩定、量大、要固定語氣或專業術語時——微調比每次寫長提示更划算。',
      styles: [
        { label: '親切客服',
          examples: [['我要退貨', '沒問題～已為您開啟退貨流程 🙏 有問題都可以再找我！'], ['運費多少', '親～滿千免運，未滿酌收 80 元 💛']],
          test: '我的包裹還沒到',
          before: '包裹未送達，請自行洽詢物流。',
          after: '哎呀讓您久等了真不好意思 🙏 我馬上幫您查件！通常 1–2 天內會到，這是查詢連結，也隨時能再找我～' },
        { label: '兒童老師',
          examples: [['什麼是雲', '雲是天空裡好多小水滴聚在一起，像棉花糖飄呀飄 ☁️'], ['為什麼會下雨', '因為雲裝不下太多水滴，就變成雨滴掉下來囉！🌧️']],
          test: '什麼是光合作用？',
          before: '光合作用是植物利用光能將二氧化碳與水合成有機物並釋放氧氣的過程。',
          after: '植物就像小廚師 🌱！用陽光當爐火，把空氣和水變成好吃的養分，還會吐出我們呼吸的新鮮氧氣，很棒吧？' },
        { label: '嚴謹法律',
          examples: [['可以提前解約嗎', '依契約第 8 條，任一方得於 30 日前以書面通知終止，逾期視為續約。'], ['押金何時退', '依民法，租賃關係消滅後，出租人應於返還租賃物時無息返還押金。']],
          test: '員工遲到可以扣薪嗎？',
          before: '遲到可能會被扣錢。',
          after: '依勞動基準法，雇主不得預扣工資作為違約金；惟遲到未提供勞務之時段得按比例不予計薪，並應於工作規則明定，且不得逾越比例原則。' },
      ],
    },
    en: {
      h3: 'Interactive: customize a model with your own examples',
      lede: '<b>Fine-tuning</b> = take a general model and train it a little more on <b>a few of your own examples</b>, so it learns the <b>tone, format, and expertise</b> you want. Pick a style, fine-tune with a few examples, and see how much the same sentence changes before vs. after.',
      col1k: '① Your training data (just a few examples)',
      qLabel: 'Q: ', aLabel: 'A: ',
      baseModel: 'General base model', frozen: 'frozen',
      adapter: 'LoRA adapter', adapterTrained: ': trained on your data ✓', adapterUntrained: ' (not trained yet)',
      col2k: '② Test with the same sentence',
      atagBefore: 'Before fine-tuning (general)', atagAfter: 'After fine-tuning ({name})',
      hintbox: 'Press “▶ Fine-tune with examples” below to watch it learn this style.',
      btnTune: '▶ Fine-tune with your examples', btnReset: 'Reset',
      hint: 'Key idea: with <b>just a few examples</b>, you can turn a general model into your own dedicated assistant; <b>LoRA</b> tunes only a small block of parameters—fast and cheap. When to use it? When your need is <b>stable, high-volume, and demands a fixed tone or professional terms</b>—fine-tuning beats writing a long prompt every time.',
      styles: [
        { label: 'Friendly Support',
          examples: [['I want a refund', 'No problem~ I’ve started the return process for you 🙏 Reach out anytime if you have questions!'], ['How much is shipping?', 'Hi there~ free shipping over NT$1,000, otherwise a small NT$80 fee 💛']],
          test: 'My package hasn’t arrived yet',
          before: 'Package not delivered. Please contact the carrier yourself.',
          after: 'Oh no, so sorry to keep you waiting 🙏 Let me track it for you right away! It usually arrives within 1–2 days—here’s the tracking link, and reach out anytime~' },
        { label: 'Kids’ Teacher',
          examples: [['What is a cloud?', 'A cloud is lots of tiny water droplets gathered in the sky, floating along like cotton candy ☁️'], ['Why does it rain?', 'Because a cloud can’t hold too many droplets, so they turn into raindrops and fall down! 🌧️']],
          test: 'What is photosynthesis?',
          before: 'Photosynthesis is the process by which plants use light energy to combine carbon dioxide and water into organic matter and release oxygen.',
          after: 'Plants are like little chefs 🌱! They use sunlight as their stove to turn air and water into yummy nutrients, and they even breathe out the fresh oxygen we need—pretty cool, right?' },
        { label: 'Formal Legal',
          examples: [['Can I terminate the contract early?', 'Under Article 8 of the contract, either party may terminate by giving 30 days’ written notice; failing that, the contract is deemed renewed.'], ['When is the deposit returned?', 'Under the Civil Code, once the lease ends, the landlord shall return the deposit without interest upon return of the leased property.']],
          test: 'Can an employee’s pay be docked for being late?',
          before: 'Being late may get money deducted.',
          after: 'Under the Labor Standards Act, an employer may not withhold wages in advance as a penalty; however, pay may be proportionally withheld for the period of lateness in which no work was performed, provided this is specified in the work rules and does not exceed the principle of proportionality.' },
      ],
    },
    ja: {
      h3: 'インタラクティブ：あなたのお手本で、モデルをカスタマイズする',
      lede: '<b>Fine-tuning（微調整）</b>＝汎用モデルを用意し、<b>ごく少量のあなたのお手本</b>でもう少しだけ訓練して、望みどおりの<b>語調・書式・専門性</b>を覚えさせること。スタイルを一つ選び、いくつかのお手本で微調整して、同じ一文が前後でどれだけ変わるか見てみましょう。',
      col1k: '① あなたの訓練データ（お手本はほんの数件でOK）',
      qLabel: 'Q：', aLabel: 'A：',
      baseModel: '汎用の大規模モデル', frozen: '凍結',
      adapter: 'LoRA 小型アダプター', adapterTrained: '：あなたのデータで訓練済み ✓', adapterUntrained: '（未訓練）',
      col2k: '② 同じ一文でテストする',
      atagBefore: '微調整前（汎用）', atagAfter: '微調整後（{name}）',
      hintbox: '下の「▶ お手本で微調整」を押すと、このスタイルを学んでいく様子が見られます。',
      btnTune: '▶ あなたのお手本で微調整', btnReset: 'リセット',
      hint: 'ポイント：<b>ごく少量のお手本</b>だけで、汎用モデルをあなた専用のアシスタントに変えられる。<b>LoRA</b> はパラメータのほんの一部だけを調整するので、速くて安い。いつ使う？ 要件が<b>安定していて、量が多く、決まった語調や専門用語が必要</b>なとき——毎回長いプロンプトを書くより、微調整のほうがお得です。',
      styles: [
        { label: '親切なカスタマー対応',
          examples: [['返品したいです', '承知しました～ 返品の手続きを開始しました 🙏 ご不明な点があればいつでもお声がけくださいね！'], ['送料はいくら？', 'お客様～ 1,000 円以上で送料無料、未満の場合は 80 円だけいただきます 💛']],
          test: '荷物がまだ届きません',
          before: '荷物は未配達です。ご自身で配送業者にお問い合わせください。',
          after: 'お待たせしてしまい本当に申し訳ありません 🙏 すぐに追跡いたしますね！ 通常 1〜2 日以内に届きます。こちらが追跡リンクです。いつでもまたお声がけください～' },
        { label: '子ども向けの先生',
          examples: [['雲ってなに？', '雲はね、空にちっちゃな水のつぶがたくさん集まったものだよ。わたあめみたいにふわふわ浮かんでるんだ ☁️'], ['どうして雨がふるの？', '雲がたくさんの水のつぶをかかえきれなくなると、雨つぶになって落ちてくるんだよ！🌧️']],
          test: '光合成ってなに？',
          before: '光合成とは、植物が光エネルギーを利用して二酸化炭素と水から有機物を合成し、酸素を放出する過程である。',
          after: '植物はちっちゃなコックさんみたいなんだ 🌱！ お日さまを火のかわりにして、空気とお水をおいしい栄養に変えちゃうんだよ。しかも、わたしたちが吸う新鮮な酸素まで出してくれるんだ。すごいでしょ？' },
        { label: '厳格な法律',
          examples: [['契約を途中で解約できますか', '契約第 8 条により、いずれの当事者も 30 日前の書面による通知をもって解約できます。これを怠った場合は契約更新とみなされます。'], ['敷金はいつ返還されますか', '民法により、賃貸借関係の消滅後、賃貸人は賃借物の返還時に敷金を無利息で返還しなければなりません。']],
          test: '従業員が遅刻したら給与を減額できますか？',
          before: '遅刻するとお金を引かれることがあります。',
          after: '労働基準法により、使用者は違約金として賃金を前もって控除することはできません。ただし、遅刻により労務が提供されなかった時間分については按分して不支給とすることができ、その旨を就業規則に明記し、かつ比例原則を超えないことが必要です。' },
      ],
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let idx = $state(0);
  let tuned = $state(false);
  let s = $derived(ui.styles[idx]);

  function pick(i) { idx = i; tuned = false; }
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="pills">
      {#each STYLES as style, i}
        <button class="pl" class:on={i === idx} onclick={() => pick(i)}>{style.icon} {ui.styles[i].label}</button>
      {/each}
    </div>

    <div class="grid">
      <div class="col">
        <div class="mono k">{ui.col1k}</div>
        {#each s.examples as [q, a]}
          <div class="ex">
            <div class="exq">{ui.qLabel}{q}</div>
            <div class="exa">{ui.aLabel}{a}</div>
          </div>
        {/each}

        <div class="model">
          <div class="mbox">{ui.baseModel} <span class="lock">🔒 {ui.frozen}</span></div>
          <div class="plus">＋</div>
          <div class="adapter" class:on={tuned}>{ui.adapter}{tuned ? ui.adapterTrained : ui.adapterUntrained}</div>
        </div>
      </div>

      <div class="col">
        <div class="mono k">{ui.col2k}</div>
        <div class="ask">{s.test}</div>
        <div class="ans before">
          <div class="atag">{ui.atagBefore}</div>{s.before}
        </div>
        {#if tuned}
          <div class="ans after" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
            <div class="atag on">{ui.atagAfter.replace('{name}', s.label)}</div>{s.after}
          </div>
        {:else}
          <div class="hintbox">{ui.hintbox}</div>
        {/if}
      </div>
    </div>

    <div class="actions">
      <button class="btn primary" disabled={tuned} onclick={() => (tuned = true)}>{ui.btnTune}</button>
      {#if tuned}<button class="btn ghost" onclick={() => (tuned = false)}>{ui.btnReset}</button>{/if}
    </div>
  </div>

  <p class="hint">{@html ui.hint}</p>
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
