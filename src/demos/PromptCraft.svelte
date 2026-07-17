<script>
  /* Ch · Prompt 怎麼跟 AI 溝通。同一個任務，提示寫得越清楚（角色/脈絡/格式/範例），
     回答品質越好。切換四個「提示成分」，看提示與回答一起進化、品質條上升。
     深色舞台、確定性、離線。 */
  import { fade } from 'svelte/transition';
  import { dur, D } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const INGR = [
    { key: 'role', icon: '🎭' },
    { key: 'ctx', icon: '📋' },
    { key: 'fmt', icon: '📐' },
    { key: 'ex', icon: '📚' },
  ];

  const L = {
    zh: {
      h3: '互動：好提示 vs 爛提示',
      lede: '同樣要 AI 做一件事，<b>提示（Prompt）寫得越清楚，回答就越好</b>。從一句隨便的要求開始，逐一加上<b>角色、脈絡、格式、範例</b>，看提示與回答怎麼一起變好。',
      base: '幫我寫一則跟主管請假的訊息。',
      labels: ['角色', '脈絡', '格式', '範例 few-shot'],
      lines: [
        '你是專業的職場溝通助理。',
        '背景：我叫小明，明天想向主管林經理請感冒病假一天，手上工作會先交接。',
        '要求：語氣有禮貌、重點條列、盡量簡潔。',
        '範例參考：「王經理您好，我因感冒想請一天假，工作已交接給同事，謝謝您。」請照這種風格。',
      ],
      promptLabel: '你的提示 PROMPT',
      answerLabel: 'AI 的回答',
      outputs: [
        '明天不來了，先說一聲。',
        '林經理您好，我明天想請假一天，謝謝。',
        '林經理您好，我是小明，明天因感冒想請病假一天，工作我會先交接，謝謝您。',
        '林經理您好：我是小明，因身體不適，明天想請一天病假，手邊工作會先交接完成，不便之處敬請見諒，謝謝您。',
        '林經理您好：\n我是小明，因感冒不適，明天想請病假一天。\n• 進行中的專案今晚先交接給小華\n• 有急事可電話聯絡我\n造成不便敬請見諒，謝謝您 🙏',
      ],
      verdict: [
        '太隨便：沒稱謂、沒原因、也不夠禮貌。',
        '有點樣子，但資訊不足、略顯生硬。',
        '像樣了：有稱謂、原因、也提到交接。',
        '很好：完整、有禮、專業。',
        '優秀：具體、條列、有禮又貼心，可直接送出。',
      ],
      qlabels: ['很陽春', '普通', '不錯', '很好', '優秀'],
      quality: '品質：',
      glab: '加入提示成分：',
      fill: '全部加上',
      clear: '清空',
      hint: '這就是 <b>提示工程</b>：把<b>角色、脈絡、格式</b>講清楚，答案立刻更準；附上一兩個<b>範例（few-shot）</b>更是大幅提升。同一個問題，換個問法，結果可以天差地遠，所以「會問」本身就是一種能力。',
    },
    en: {
      h3: 'Interactive: a good prompt vs. a bad one',
      lede: 'For the same task, <b>the clearer your prompt, the better the answer</b>. Start from one careless request, then add <b>role, context, format, and examples</b> one by one, and watch the prompt and the answer improve together.',
      base: 'Help me write a message to my manager asking for leave.',
      labels: ['Role', 'Context', 'Format', 'Examples (few-shot)'],
      lines: [
        'You are a professional workplace-communication assistant.',
        'Context: My name is Ming; tomorrow I’d like to ask my manager, Ms. Lin, for one day of sick leave for a cold, and I’ll hand off my current tasks first.',
        'Requirements: a polite tone, key points in bullets, and as concise as possible.',
        'Example to follow: “Dear Ms. Lin, I’d like to take one day off for a cold; I’ve already handed my work to a colleague. Thank you.” Please match this style.',
      ],
      promptLabel: 'YOUR PROMPT',
      answerLabel: 'THE AI’S ANSWER',
      outputs: [
        'Not coming in tomorrow, just a heads-up.',
        'Hi Ms. Lin, I’d like to take a day off tomorrow. Thanks.',
        'Hello Ms. Lin, this is Ming. I’d like to take one day of sick leave tomorrow for a cold; I’ll hand off my work first. Thank you.',
        'Dear Ms. Lin, this is Ming. As I’m feeling unwell, I’d like to take one day of sick leave tomorrow. I’ll finish handing off my current work beforehand. Apologies for any inconvenience, and thank you.',
        'Dear Ms. Lin,\nThis is Ming. I’m unwell with a cold and would like to take one day of sick leave tomorrow.\n• I’ll hand off my in-progress project to Hua tonight\n• For anything urgent, you can reach me by phone\nApologies for any inconvenience, and thank you 🙏',
      ],
      verdict: [
        'Too casual: no greeting, no reason, and not polite enough.',
        'Getting there, but short on information and a bit stiff.',
        'Presentable: it has a greeting, a reason, and mentions the handoff.',
        'Great: complete, polite, and professional.',
        'Excellent: specific, bulleted, polite, and thoughtful, ready to send as is.',
      ],
      qlabels: ['Very basic', 'Okay', 'Not bad', 'Great', 'Excellent'],
      quality: 'Quality: ',
      glab: 'Add prompt ingredients:',
      fill: 'Add all',
      clear: 'Clear',
      hint: 'This is <b>prompt engineering</b>: spell out the <b>role, context, and format</b> and the answer gets sharper right away; adding one or two <b>examples (few-shot)</b> helps even more. Ask the same question a different way and the result can differ enormously, so <b>knowing how to ask</b> is a skill in itself.',
    },
    ja: {
      h3: 'インタラクティブ：良いプロンプト vs. 悪いプロンプト',
      lede: '同じタスクでも、<b>プロンプトが明確なほど答えは良くなります</b>。雑な一言の依頼から始めて、<b>役割・文脈・形式・例</b>を一つずつ足しながら、プロンプトと答えが一緒に良くなっていく様子を見てみましょう。',
      base: '上司に休暇を申請するメッセージを書くのを手伝って。',
      labels: ['役割', '文脈', '形式', '例（few-shot）'],
      lines: [
        'あなたはプロのビジネスコミュニケーション支援アシスタントです。',
        '背景：私はミンです。明日、上司の林マネージャーに風邪で一日の病気休暇を申請したいです。今抱えている仕事は先に引き継ぎます。',
        '要求：丁寧な口調で、要点は箇条書きに、できるだけ簡潔に。',
        '参考例：「林マネージャー、風邪のため一日お休みをいただきたく存じます。仕事はすでに同僚に引き継ぎました。よろしくお願いいたします。」このスタイルに合わせてください。',
      ],
      promptLabel: 'あなたのプロンプト PROMPT',
      answerLabel: 'AI の回答',
      outputs: [
        '明日休みます、一応連絡まで。',
        '林マネージャー、明日一日お休みをいただきたいです。よろしくお願いします。',
        '林マネージャー、こんにちは。ミンです。明日、風邪で一日病気休暇をいただきたいです。仕事は先に引き継ぎます。よろしくお願いします。',
        '林マネージャー、お世話になっております。ミンです。体調が優れないため、明日一日病気休暇をいただきたく存じます。今抱えている仕事は事前に引き継ぎを済ませます。ご不便をおかけしますが、何卒よろしくお願いいたします。',
        '林マネージャー、お世話になっております。\nミンです。風邪で体調を崩したため、明日一日病気休暇をいただきたく存じます。\n• 進行中のプロジェクトは今夜のうちにハナへ引き継ぎます\n• 急ぎのご用件はお電話でご連絡ください\nご不便をおかけしますが、何卒よろしくお願いいたします 🙏',
      ],
      verdict: [
        '雑すぎ：宛名も理由もなく、礼儀も足りない。',
        'まあまあ。でも情報が足りず、少しそっけない。',
        '形になった：宛名も理由もあり、引き継ぎにも触れている。',
        'とても良い：過不足なく、丁寧で、プロらしい。',
        '完璧：具体的で、箇条書きで、丁寧かつ気配りもあり、そのまま送れる。',
      ],
      qlabels: ['とても素朴', '普通', 'なかなか', 'とても良い', '完璧'],
      quality: '品質：',
      glab: 'プロンプトの要素を追加：',
      fill: 'すべて追加',
      clear: 'クリア',
      hint: 'これが<b>プロンプトエンジニアリング</b>：<b>役割・文脈・形式</b>をはっきり伝えれば、答えはすぐに的確になります。<b>例（few-shot）</b>を一つ二つ添えれば、さらに効きます。同じ質問でも聞き方を変えれば結果は大きく変わる、だから<b>「うまく聞ける」こと</b>自体が一つの能力なのです。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let on = $state({ role: false, ctx: false, fmt: false, ex: false });
  let score = $derived(INGR.reduce((n, g) => n + (on[g.key] ? 1 : 0), 0));
  let quality = $derived(Math.round((score / 4) * 100));
  let output = $derived(ui.outputs[score]);

  function toggle(k) { on[k] = !on[k]; }
  function fill() { on = { role: true, ctx: true, fmt: true, ex: true }; }
  function clear() { on = { role: false, ctx: false, fmt: false, ex: false }; }
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="two">
      <div class="col">
        <div class="mono k">{ui.promptLabel}</div>
        <div class="promptbox">
          <div class="pline base">{ui.base}</div>
          {#each INGR as g, i}
            {#if on[g.key]}
              <div class="pline add" transition:fade={{ duration: dur(D.fast) }}>
                <span class="pi">{g.icon}</span>{ui.lines[i]}
              </div>
            {/if}
          {/each}
        </div>
      </div>

      <div class="col">
        <div class="mono k">{ui.answerLabel}</div>
        {#key score}
          <div class="outbox" in:fade={{ duration: dur(D.base) }}>{output}</div>
        {/key}
        <div class="quality">
          <div class="qbar"><div class="qfill" style="width:{quality}%"></div></div>
          <span class="qlabel">{ui.quality}<b>{ui.qlabels[score]}</b></span>
        </div>
        <p class="verdict">{ui.verdict[score]}</p>
      </div>
    </div>
  </div>

  <div class="ctl-row">
    <span class="glab">{ui.glab}</span>
    {#each INGR as g, i}
      <button class="pl" class:on={on[g.key]} onclick={() => toggle(g.key)}>{g.icon} {ui.labels[i]}</button>
    {/each}
    <div class="spacer"></div>
    <button class="btn ghost sm" onclick={fill}>{ui.fill}</button>
    <button class="btn ghost sm" onclick={clear}>{ui.clear}</button>
  </div>

  <p class="hint">{@html ui.hint}</p>
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
