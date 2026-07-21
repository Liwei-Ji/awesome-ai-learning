<script>
  /* Ch · System Prompt 與提示範本。兩段互動：
     (1) 同一句使用者問題，切換「系統提示（人設）」，看回答的角色與語氣整段變化；
     (2) 提示範本：點擊 {變數} 循環選項，即時組出可重用的具體提示。
     淺色舞台、確定性、離線。 */
  import { fade } from 'svelte/transition';
  import { dur, D } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const L = {
    zh: {
      h3: '互動：一句話，換個系統提示就變了',
      lede: '<b>System Prompt（系統提示）</b>設定 AI 的角色與語氣，套用整段對話。你的問題不變，換一個系統提示，回答的口吻就整個不一樣。',
      seg1: '① 同一個問題，換系統提示',
      seg2: '② 提示範本：換掉 {變數} 就重用',
      sysLabel: 'SYSTEM PROMPT（幕後）',
      usrLabel: '你的問題（不變）',
      ansLabel: 'AI 的回答',
      persLabel: '選一個系統提示：',
      question: '我睡不著，給我一個建議。',
      personas: [
        { icon: '⚪', name: '（無）預設', sys: '（沒有系統提示）', ans: '試著放下手機，做幾次深呼吸，讓身體慢慢放鬆下來。' },
        { icon: '🫶', name: '溫柔睡眠教練', sys: '你是溫柔體貼的睡眠教練，語氣安撫、給具體步驟。', ans: '先別急，這很常見。把燈調暗、手機放遠，跟我做 4-7-8 呼吸：吸 4 秒、憋 7 秒、慢慢吐 8 秒，重複幾輪，你會慢慢放鬆下來的。' },
        { icon: '🎖️', name: '簡潔教官（一句話）', sys: '你是簡潔的教官，只用一句話、直接下指令。', ans: '放下手機，關燈，閉眼，專注呼吸——現在。' },
        { icon: '🪶', name: '愛比喻的詩人', sys: '你是愛用比喻的詩人，用意象回答。', ans: '讓思緒像退潮的海，一波一波退去；把今天輕輕放回岸上，明天自會醒來。' },
      ],
      tplParts: ['把 ', ' 摘成 ', ' 個重點，寫給 ', ' 看。'],
      topics: ['這篇文章', '這份財報', '這場會議'],
      nums: ['3', '5'],
      auds: ['同事', '主管', '小學生'],
      filledLabel: '組好的提示',
      varHint: '（點大括號換選項）',
      hint: '重點：<b>系統提示是一次設定、整段生效</b>的幕後指令；<b>範本</b>則把好用的問法變成填空模板，換掉 {變數} 就能無限重用。兩者都讓輸出從碰運氣變得穩定、可預期。',
    },
    en: {
      h3: 'Interactive: same question, swap the system prompt',
      lede: 'A <b>system prompt</b> sets the AI’s role and tone for the whole conversation. Your question stays the same; swap the system prompt and the whole voice of the answer changes.',
      seg1: '① Same question, different system prompt',
      seg2: '② Prompt template: swap the {variables} to reuse',
      sysLabel: 'SYSTEM PROMPT (behind the scenes)',
      usrLabel: 'YOUR QUESTION (unchanged)',
      ansLabel: 'THE AI’S ANSWER',
      persLabel: 'Pick a system prompt:',
      question: 'I can’t sleep. Give me one tip.',
      personas: [
        { icon: '⚪', name: '(none) default', sys: '(no system prompt)', ans: 'Try putting your phone down and taking a few deep breaths to let your body relax.' },
        { icon: '🫶', name: 'Gentle sleep coach', sys: 'You are a warm, caring sleep coach; soothing tone, concrete steps.', ans: 'It’s okay, this is common. Dim the lights, move your phone away, and try 4-7-8 breathing with me: in for 4, hold for 7, out slowly for 8. A few rounds and you’ll ease down.' },
        { icon: '🎖️', name: 'Terse instructor (one line)', sys: 'You are a terse drill instructor; one line, direct orders only.', ans: 'Phone down. Lights off. Eyes closed. Focus on your breath — now.' },
        { icon: '🪶', name: 'Metaphor-loving poet', sys: 'You are a poet who loves metaphors; answer in imagery.', ans: 'Let your thoughts ebb like a tide going out, wave by wave; set today gently back on the shore, and tomorrow will wake on its own.' },
      ],
      tplParts: ['Summarize ', ' into ', ' key points for ', '.'],
      topics: ['this article', 'this report', 'this meeting'],
      nums: ['3', '5'],
      auds: ['a coworker', 'my manager', 'a grade-schooler'],
      filledLabel: 'Assembled prompt',
      varHint: '(click the braces to change)',
      hint: 'Takeaway: a <b>system prompt is set once and applies throughout</b>, behind the scenes; a <b>template</b> turns a phrasing that works into a fill-in-the-blank pattern you reuse endlessly by swapping the {variables}. Both make output stable and predictable instead of luck.',
    },
    ja: {
      h3: 'インタラクティブ：同じ質問、システムプロンプトを替えるだけ',
      lede: '<b>システムプロンプト</b>は AI の役割と口調を会話全体に設定します。質問は同じでも、システムプロンプトを替えると答えの語り口がまるごと変わります。',
      seg1: '① 同じ質問、違うシステムプロンプト',
      seg2: '② プロンプトテンプレート：{変数} を替えて再利用',
      sysLabel: 'SYSTEM PROMPT（裏側）',
      usrLabel: 'あなたの質問（不変）',
      ansLabel: 'AI の回答',
      persLabel: 'システムプロンプトを選ぶ：',
      question: '眠れません。アドバイスを一つ。',
      personas: [
        { icon: '⚪', name: '（なし）既定', sys: '（システムプロンプトなし）', ans: 'スマホを置いて、深呼吸を数回して、体をゆっくりほぐしてみましょう。' },
        { icon: '🫶', name: '優しい睡眠コーチ', sys: 'あなたは優しく思いやりのある睡眠コーチ。落ち着いた口調で具体的な手順を。', ans: '大丈夫、よくあることです。照明を落とし、スマホを遠ざけ、4-7-8 呼吸を一緒に：4 秒吸って、7 秒止めて、8 秒かけて吐く。数回でだんだん落ち着きますよ。' },
        { icon: '🎖️', name: '簡潔な教官（一言）', sys: 'あなたは簡潔な教官。一言だけ、直接的な指示を。', ans: 'スマホを置け。消灯。目を閉じろ。呼吸に集中——今すぐ。' },
        { icon: '🪶', name: '比喩好きの詩人', sys: 'あなたは比喩を好む詩人。イメージで答える。', ans: '思考を引き潮の海のように、波ごとに引かせよう。今日をそっと岸へ返せば、明日はひとりでに目を覚ます。' },
      ],
      tplParts: ['', ' を ', ' 点にまとめて、', ' 向けに。'],
      topics: ['この記事', 'この決算書', 'この会議'],
      nums: ['3', '5'],
      auds: ['同僚', '上司', '小学生'],
      filledLabel: '組み上がったプロンプト',
      varHint: '（波括弧をクリックで切替）',
      hint: 'ポイント：<b>システムプロンプトは一度設定すれば全体に効く</b>裏側の指示。<b>テンプレート</b>はうまくいく問い方を穴埋め型にし、{変数} を替えるだけで無限に再利用できる。どちらも出力を運任せから安定・予測可能へ。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);
  let p = $state(1);
  let ti = $state(0), ni = $state(0), ai = $state(0);
  let filled = $derived(
    ui.tplParts[0] + ui.topics[ti] + ui.tplParts[1] + ui.nums[ni] + ui.tplParts[2] + ui.auds[ai] + ui.tplParts[3]
  );
  const cyc = (v, n) => (v + 1) % n;
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="seg">{ui.seg1}</div>
  <div class="demo-stage light">
    <div class="stack">
      <div class="layer sys">
        <span class="k mono">{ui.sysLabel}</span>
        {#key p}<div class="box sysbox" in:fade={{ duration: dur(D.fast) }}>{ui.personas[p].sys}</div>{/key}
      </div>
      <div class="layer">
        <span class="k mono">{ui.usrLabel}</span>
        <div class="box usrbox">{ui.question}</div>
      </div>
      <div class="layer">
        <span class="k mono">{ui.ansLabel}</span>
        {#key p}<div class="box ansbox" in:fade={{ duration: dur(D.base) }}>{ui.personas[p].ans}</div>{/key}
      </div>
    </div>
  </div>
  <div class="ctl-row">
    <span class="glab">{ui.persLabel}</span>
    {#each ui.personas as per, i}
      <button class="pl" class:on={p === i} onclick={() => (p = i)}>{per.icon} {per.name}</button>
    {/each}
  </div>

  <div class="seg">{ui.seg2} <span class="vh">{ui.varHint}</span></div>
  <div class="demo-stage light">
    <div class="tpl">
      <span>{ui.tplParts[0]}</span><button class="var" onclick={() => (ti = cyc(ti, ui.topics.length))}>{`{${ui.topics[ti]}}`}</button
      ><span>{ui.tplParts[1]}</span><button class="var" onclick={() => (ni = cyc(ni, ui.nums.length))}>{`{${ui.nums[ni]}}`}</button
      ><span>{ui.tplParts[2]}</span><button class="var" onclick={() => (ai = cyc(ai, ui.auds.length))}>{`{${ui.auds[ai]}}`}</button
      ><span>{ui.tplParts[3]}</span>
    </div>
    <div class="layer">
      <span class="k mono">{ui.filledLabel}</span>
      {#key filled}<div class="box filledbox" in:fade={{ duration: dur(D.fast) }}>{filled}</div>{/key}
    </div>
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .seg { font-size: var(--fs-cap); font-weight: 650; color: var(--ink); margin: var(--sp-3) 0 var(--sp-2); }
  .seg .vh { font-weight: 400; color: var(--muted); }

  .stack { display: flex; flex-direction: column; gap: var(--sp-2); }
  .layer { position: relative; }
  .k { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: 4px; }
  .box { border-radius: var(--r); padding: 10px 12px; font-size: var(--fs-sm); line-height: 1.6; }
  .sysbox { background: var(--accent-soft, #f6a940)22; border: 1px solid var(--accent); color: var(--accent-ink); }
  .usrbox { background: var(--surface-2); border: 1px solid var(--line); color: var(--ink-2); }
  .ansbox { background: var(--surface); border: 1px solid var(--line); color: var(--ink); min-height: 44px; }

  .ctl-row { display: flex; flex-wrap: wrap; gap: var(--sp-2); margin: 12px 0 4px; align-items: center; }
  .glab { font-size: var(--fs-cap); color: var(--muted); }
  .pl { font-size: var(--fs-cap); padding: 5px 11px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); cursor: pointer; }
  .pl:hover { border-color: var(--accent); color: var(--accent-ink); }
  .pl.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }

  .tpl { font-size: var(--fs-body); line-height: 2; color: var(--ink-2); }
  .var { display: inline-block; font-family: var(--mono); font-size: var(--fs-sm); padding: 2px 8px; border-radius: var(--r-sm);
    border: 1px dashed var(--teal); background: #0f8a8014; color: var(--teal-ink, #0b6b63); cursor: pointer; margin: 0 1px; transition: background .12s; }
  .var:hover { background: #0f8a8026; }
  .filledbox { background: var(--surface); border: 1px solid var(--line); color: var(--ink); margin-top: 4px; }

  .hint { font-size: var(--fs-cap); color: var(--muted); line-height: var(--lh-body); margin: var(--sp-3) 0 0; }
  .hint :global(b) { color: var(--ink-2); }
</style>
