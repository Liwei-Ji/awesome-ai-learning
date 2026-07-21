<script>
  /* Ch · 不寫程式做東西。同一個任務，比較「一次要完整成品」vs「小步迭代」：
     一次到位看起來完成、其實有洞；小步迭代逐塊長出可用成品。淺色、離線、示意。 */
  import { fade, fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const L = {
    zh: {
      h3: '互動：一次到位 vs 小步迭代',
      lede: '不會寫程式，也能用 AI 做出東西。訣竅是<b>小步迭代</b>：先要能動的最簡版，看結果再一點一點加——而不是一句話要它生出完美成品。',
      task: '任務：做一個活動報名網頁',
      onceName: '一次到位',
      iterName: '小步迭代',
      screenLabel: '做出來的東西',
      youSay: '你說',
      oncePrompt: '「做一個完整、漂亮的活動報名網站，功能齊全。」',
      onceResult: '看起來做好了……但一測就發現洞：',
      onceIssues: ['手機版跑版', '送出按鈕沒接後端', 'Email 沒驗證'],
      onceBlocks: ['活動標題與說明', '報名欄位', '送出按鈕', '（樣式塞滿但有問題）'],
      steps: [
        { say: '先做一個最簡單、能顯示的活動頁骨架。', block: '活動標題與說明' },
        { say: '加上姓名、Email 兩個報名欄位。', block: '報名欄位' },
        { say: '加一個送出按鈕，送出後顯示成功訊息。', block: '送出按鈕 ＋ 成功提示' },
        { say: '調整手機版排版，並檢查 Email 格式。', block: '手機版微調 ＋ Email 驗證' },
      ],
      stepOf: '步驟',
      prev: '上一步',
      next: '下一步',
      done: '✓ 每一步都看得懂、退得回，最後長成可用的成品',
      hint: '重點：<b>一次要完整成品，容易看起來完成、其實有洞又難改</b>；小步迭代則每步輸出小、好審、好退。你不必會寫程式，但要<b>說得清楚、看得出對不對</b>。',
    },
    en: {
      h3: 'Interactive: one-shot vs. small steps',
      lede: 'You can build things with AI without coding. The trick is <b>small-step iteration</b>: get a working minimal version first, then add bit by bit — not asking for a perfect product in one line.',
      task: 'Task: build an event signup page',
      onceName: 'One-shot',
      iterName: 'Small steps',
      screenLabel: 'WHAT GOT BUILT',
      youSay: 'You say',
      oncePrompt: '“Build a complete, beautiful event signup site, fully featured.”',
      onceResult: 'Looks done… but testing reveals holes:',
      onceIssues: ['breaks on mobile', 'submit button not wired', 'no email validation'],
      onceBlocks: ['Title & description', 'Signup fields', 'Submit button', '(styled but buggy)'],
      steps: [
        { say: 'First make the simplest working skeleton of the page.', block: 'Title & description' },
        { say: 'Add two signup fields: name and email.', block: 'Signup fields' },
        { say: 'Add a submit button that shows a success message.', block: 'Submit button + success' },
        { say: 'Adjust the mobile layout and validate the email format.', block: 'Mobile tweaks + email check' },
      ],
      stepOf: 'Step',
      prev: 'Back',
      next: 'Next',
      done: '✓ Every step is understandable and reversible, growing into a usable result',
      hint: 'Takeaway: <b>asking for a whole product at once often looks done but hides holes and is hard to fix</b>; small steps keep each output small, easy to review, and reversible. You don’t need to code, but you must <b>state it clearly and tell whether it’s right</b>.',
    },
    ja: {
      h3: 'インタラクティブ：一発 vs 小刻み',
      lede: 'コードなしでも AI で作れます。コツは<b>小刻みな反復</b>：まず動く最小版を作り、結果を見て少しずつ足す——完璧な成果物を一言で求めない。',
      task: 'タスク：イベント申込ページを作る',
      onceName: '一発',
      iterName: '小刻み',
      screenLabel: '出来たもの',
      youSay: 'あなた',
      oncePrompt: '「完全で美しい、機能もそろったイベント申込サイトを作って。」',
      onceResult: '出来たように見えて……試すと穴が：',
      onceIssues: ['スマホで崩れる', '送信ボタン未接続', 'メール未検証'],
      onceBlocks: ['タイトルと説明', '申込項目', '送信ボタン', '（体裁は満載だが不具合）'],
      steps: [
        { say: 'まず表示できる最小のページ骨組みを作って。', block: 'タイトルと説明' },
        { say: '名前とメールの申込項目を二つ追加。', block: '申込項目' },
        { say: '送信ボタンを追加し、送信後に成功メッセージを表示。', block: '送信ボタン ＋ 成功表示' },
        { say: 'スマホ表示を調整し、メール形式を検証。', block: 'スマホ調整 ＋ メール検証' },
      ],
      stepOf: 'ステップ',
      prev: '戻る',
      next: '次へ',
      done: '✓ どの一歩も理解でき戻せる。最後に使える成果物へ',
      hint: 'ポイント：<b>一度に完成品を求めると、出来たように見えて穴があり直しにくい</b>。小刻みなら各出力が小さく、確認も差し戻しも容易。コードは書けなくてよいが、<b>明確に伝え、正誤を見抜く</b>必要はある。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);
  let mode = $state('iter');
  let step = $state(1);
  let blocks = $derived(mode === 'once' ? ui.onceBlocks : ui.steps.slice(0, step).map((s) => s.block));
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="taskbar">{ui.task}</div>
    <div class="two">
      <div class="col">
        <span class="k mono">{ui.youSay}</span>
        {#if mode === 'once'}
          <div class="say" transition:fade={{ duration: dur(D.fast) }}>{ui.oncePrompt}</div>
        {:else}
          {#key step}<div class="say" in:fade={{ duration: dur(D.fast) }}><b>{ui.stepOf} {step}/4</b> · {ui.steps[step - 1].say}</div>{/key}
        {/if}
      </div>

      <div class="col">
        <span class="k mono">{ui.screenLabel}</span>
        <div class="screen">
          {#each blocks as bl, i (mode + '-' + i)}
            <div class="blk" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>{bl}</div>
          {/each}
          {#if mode === 'once'}
            <div class="issues" transition:fade={{ duration: dur(D.base) }}>
              <span class="ir">{ui.onceResult}</span>
              {#each ui.onceIssues as iss}<span class="ibad">✕ {iss}</span>{/each}
            </div>
          {:else if step === 4}
            <div class="okmsg" transition:fade={{ duration: dur(D.base) }}>{ui.done}</div>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <div class="ctl-row">
    <button class="pl" class:on={mode === 'once'} onclick={() => (mode = 'once')}>{ui.onceName}</button>
    <button class="pl" class:on={mode === 'iter'} onclick={() => { mode = 'iter'; }}>{ui.iterName}</button>
    {#if mode === 'iter'}
      <div class="spacer"></div>
      <button class="btn ghost sm" disabled={step <= 1} onclick={() => (step = Math.max(1, step - 1))}>← {ui.prev}</button>
      <span class="stepn mono">{step}/4</span>
      <button class="btn ghost sm" disabled={step >= 4} onclick={() => (step = Math.min(4, step + 1))}>{ui.next} →</button>
    {/if}
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .taskbar { font-size: var(--fs-cap); font-weight: 650; color: var(--ink); margin-bottom: var(--sp-2); }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .two { grid-template-columns: 1fr; } }
  .k { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: 4px; }

  .say { background: #0f8a8012; border: 1px solid #0f8a8055; color: var(--teal-ink, #0b6b63); border-radius: var(--r); padding: 10px 12px; font-size: var(--fs-sm); line-height: 1.6; min-height: 60px; }
  .say :global(b) { color: var(--teal-ink, #0b6b63); }

  .screen { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 10px; min-height: 120px; display: flex; flex-direction: column; gap: 6px; }
  .blk { background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--r-sm); padding: 8px 10px; font-size: var(--fs-cap); color: var(--ink-2); }
  .issues { margin-top: 4px; display: flex; flex-wrap: wrap; gap: 5px; align-items: center; }
  .ir { font-size: var(--fs-cap); color: var(--accent-ink); width: 100%; }
  .ibad { font-size: 10.5px; padding: 2px 8px; border-radius: 99px; background: #e07f0e1f; border: 1px solid #e07f0e66; color: var(--accent-ink); }
  .okmsg { margin-top: 4px; font-size: var(--fs-cap); color: var(--teal-ink, #0b6b63); font-weight: 600; }

  .ctl-row { display: flex; flex-wrap: wrap; gap: var(--sp-2); margin: 12px 0 4px; align-items: center; }
  .ctl-row .spacer { flex: 1; }
  .pl { font-size: var(--fs-cap); padding: 5px 11px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); cursor: pointer; }
  .pl:hover { border-color: var(--accent); color: var(--accent-ink); }
  .pl.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }
  .btn.sm { padding: 5px 11px; font-size: var(--fs-cap); }
  .btn.sm:disabled { opacity: .4; cursor: not-allowed; }
  .stepn { font-size: var(--fs-cap); color: var(--muted); }

  .hint { font-size: var(--fs-cap); color: var(--muted); line-height: var(--lh-body); margin: var(--sp-3) 0 0; }
  .hint :global(b) { color: var(--ink-2); }
</style>
