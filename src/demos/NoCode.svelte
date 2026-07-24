<script>
  /* Ch · 不寫程式做東西。同一個任務，比較「一次要完整成品」vs「小步迭代」。
     右欄不再是描述卡，而是「真的做出來的東西」：真標題、真輸入框、真按鈕。
     一次到位＝漂亮但洞是真的（按送出沒反應、Email 不驗證、手機寬跑版，親手踩得到）；
     小步迭代＝每一步真的長出一塊，第 3 步按鈕真的會動、第 4 步驗證真的生效。淺色、離線。 */
  import { fade, fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';
  import { Smartphone, Monitor } from '@lucide/svelte';

  const L = {
    zh: {
      h3: '互動：一次到位 vs 小步迭代',
      lede: '不會寫程式，也能用 AI 做出東西。訣竅是<b>小步迭代</b>：先要能動的最簡版，看結果再一點一點加——而不是一句話要它生出完美成品。右邊<b>就是真的做出來的頁面，可以打字、可以按</b>。',
      task: '任務：做一個活動報名網頁',
      onceName: '一次到位',
      iterName: '小步迭代',
      screenLabel: '做出來的東西（真的可以操作）',
      youSay: '你說',
      oncePrompt: '「做一個完整、漂亮的活動報名網站，功能齊全。」',
      onceTry: '看起來做好了。試試看：按「送出」、亂打 Email 再送出、切成手機寬——洞會一個個現形：',
      onceIssues: ['送出按鈕沒接任何動作', '亂打的 Email 也沒被擋', '手機寬直接跑版'],
      noReact: '（按了沒反應……）',
      steps: [
        { say: '先做一個最簡單、能顯示的活動頁骨架。' },
        { say: '加上姓名、Email 兩個報名欄位。' },
        { say: '加一個送出按鈕，送出後顯示成功訊息。' },
        { say: '調整手機版排版，並檢查 Email 格式。' },
      ],
      stepOf: '步驟',
      prev: '上一步',
      next: '下一步',
      done: '✓ 每一步都看得懂、退得回，最後長成可用的成品',
      formT: '夏日 AI 工作坊',
      formD: '8/12（六）14:00 · 免費入場 · 名額 30 人',
      nameLabel: '姓名',
      emailLabel: 'Email',
      namePh: '王小明',
      emailPh: 'you@example.com',
      submit: '送出報名',
      success: '✓ 報名成功！已為你保留名額。',
      emailErr: 'Email 格式不對，請檢查一下',
      narrow: '手機寬',
      wide: '桌機寬',
      hint: '重點：<b>一次要完整成品，容易看起來完成、其實有洞又難改</b>——上面三個洞都是真的，親手按按看。小步迭代則每步輸出小、好審、好退。你不必會寫程式，但要<b>說得清楚、看得出對不對</b>。',
    },
    en: {
      h3: 'Interactive: one-shot vs. small steps',
      lede: 'You can build things with AI without coding. The trick is <b>small-step iteration</b>: get a working minimal version first, then add bit by bit. The panel on the right <b>is the actual page that got built — you can type in it and click it</b>.',
      task: 'Task: build an event signup page',
      onceName: 'One-shot',
      iterName: 'Small steps',
      screenLabel: 'WHAT GOT BUILT (really works)',
      youSay: 'You say',
      oncePrompt: '“Build a complete, beautiful event signup site, fully featured.”',
      onceTry: 'Looks done. Now test it: click Submit, submit a garbage email, switch to phone width — the holes reveal themselves:',
      onceIssues: ['Submit is wired to nothing', 'Garbage emails sail through', 'Breaks at phone width'],
      noReact: '(nothing happened…)',
      steps: [
        { say: 'First make the simplest working skeleton of the page.' },
        { say: 'Add two signup fields: name and email.' },
        { say: 'Add a submit button that shows a success message.' },
        { say: 'Adjust the mobile layout and validate the email format.' },
      ],
      stepOf: 'Step',
      prev: 'Back',
      next: 'Next',
      done: '✓ Every step is understandable and reversible, growing into a usable result',
      formT: 'Summer AI Workshop',
      formD: 'Sat Aug 12, 2pm · Free entry · 30 seats',
      nameLabel: 'Name',
      emailLabel: 'Email',
      namePh: 'Alex Chen',
      emailPh: 'you@example.com',
      submit: 'Sign up',
      success: '✓ You are signed up! A seat is reserved for you.',
      emailErr: 'That email does not look right, please check it',
      narrow: 'Phone',
      wide: 'Desktop',
      hint: 'Takeaway: <b>asking for a whole product at once often looks done but hides holes and is hard to fix</b> — the three holes above are real, go press them. Small steps keep each output small, easy to review, and reversible. You don’t need to code, but you must <b>state it clearly and tell whether it’s right</b>.',
    },
    ja: {
      h3: 'インタラクティブ：一発 vs 小刻み',
      lede: 'コードなしでも AI で作れます。コツは<b>小刻みな反復</b>：まず動く最小版を作り、結果を見て少しずつ足す。右側は<b>実際に出来上がったページで、入力もクリックも本当にできます</b>。',
      task: 'タスク：イベント申込ページを作る',
      onceName: '一発',
      iterName: '小刻み',
      screenLabel: '出来たもの（本当に動く）',
      youSay: 'あなた',
      oncePrompt: '「完全で美しい、機能もそろったイベント申込サイトを作って。」',
      onceTry: '出来たように見える。試そう：送信を押す、でたらめなメールで送信、スマホ幅に切替——穴が次々に現れる：',
      onceIssues: ['送信ボタンは何にも接続されていない', 'でたらめなメールも素通り', 'スマホ幅で崩れる'],
      noReact: '（押しても無反応……）',
      steps: [
        { say: 'まず表示できる最小のページ骨組みを作って。' },
        { say: '名前とメールの申込項目を二つ追加。' },
        { say: '送信ボタンを追加し、送信後に成功メッセージを表示。' },
        { say: 'スマホ表示を調整し、メール形式を検証。' },
      ],
      stepOf: 'ステップ',
      prev: '戻る',
      next: '次へ',
      done: '✓ どの一歩も理解でき戻せる。最後に使える成果物へ',
      formT: 'サマー AI ワークショップ',
      formD: '8/12（土）14:00 · 入場無料 · 定員 30 名',
      nameLabel: '名前',
      emailLabel: 'メール',
      namePh: '山田太郎',
      emailPh: 'you@example.com',
      submit: '申し込む',
      success: '✓ 申込完了！お席を確保しました。',
      emailErr: 'メールの形式が正しくないようです',
      narrow: 'スマホ幅',
      wide: 'PC幅',
      hint: 'ポイント：<b>一度に完成品を求めると、出来たように見えて穴があり直しにくい</b>——上の三つの穴は本物なので、実際に押して確かめて。小刻みなら各出力が小さく、確認も差し戻しも容易。コードは書けなくてよいが、<b>明確に伝え、正誤を見抜く</b>必要はある。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);
  let mode = $state('iter');
  let step = $state(1);
  let narrow = $state(false);

  // 迷你報名頁的「真」狀態
  let name = $state('');
  let email = $state('');
  let submitted = $state(false);
  let emailBad = $state(false);
  let onceClicked = $state(false);
  // 一次到位模式：被「踩到」的洞（按過送出／亂 Email 送出／切過手機寬）
  let found = $state({ btn: false, mail: false, layout: false });

  const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const resetForm = () => { submitted = false; emailBad = false; onceClicked = false; };
  const setMode = (m) => { mode = m; resetForm(); narrow = false; found = { btn: false, mail: false, layout: false }; };
  const setStep = (n) => { step = n; resetForm(); };

  function submitIter() {
    if (step >= 4 && !EMAIL_OK.test(email)) { emailBad = true; submitted = false; return; }
    emailBad = false; submitted = true;
  }
  function submitOnce() {
    onceClicked = true; found.btn = true;              // 洞 1：按了沒反應
    if (email && !EMAIL_OK.test(email)) found.mail = true; // 洞 2：亂打也沒被擋
  }
  function toggleNarrow() {
    narrow = !narrow;
    if (narrow && (mode === 'once')) found.layout = true;   // 洞 3：手機寬跑版
  }
  // 小步迭代目前長到哪：1 骨架、2 欄位、3 按鈕、4 驗證＋手機版
  let hasFields = $derived(mode === 'once' || step >= 2);
  let hasButton = $derived(mode === 'once' || step >= 3);
  let mobileFixed = $derived(mode === 'iter' && step >= 4);
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
          <p class="try" in:fade={{ duration: dur(D.base) }}>{ui.onceTry}</p>
          <div class="issues">
            <span class="ibad" class:lit={found.btn}>✕ {ui.onceIssues[0]}</span>
            <span class="ibad" class:lit={found.mail}>✕ {ui.onceIssues[1]}</span>
            <span class="ibad" class:lit={found.layout}>✕ {ui.onceIssues[2]}</span>
          </div>
        {:else}
          {#key step}<div class="say" in:fade={{ duration: dur(D.fast) }}><b>{ui.stepOf} {step}/4</b> · {ui.steps[step - 1].say}</div>{/key}
          {#if step === 4}
            <div class="okmsg" transition:fade={{ duration: dur(D.base) }}>{ui.done}</div>
          {/if}
        {/if}
      </div>

      <div class="col">
        <div class="screenhead">
          <span class="k mono">{ui.screenLabel}</span>
          <button class="widthbtn" onclick={toggleNarrow} aria-pressed={narrow}>
            {#if narrow}<Monitor size={13} strokeWidth={2} /> {ui.wide}{:else}<Smartphone size={13} strokeWidth={2} /> {ui.narrow}{/if}
          </button>
        </div>
        <div class="frame" class:narrow>
          <div class="page">
            <!-- 步驟 1／一次到位：真的標題與說明 -->
            <div class="pt" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>{ui.formT}</div>
            <div class="pd">{ui.formD}</div>

            {#if hasFields}
              <!-- 真的輸入欄位。跑版重現：未修手機版時兩欄硬並排（窄框會爆）；修好後直向堆疊 -->
              <div class="fields" class:fixed={mobileFixed} in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
                <label class="fld"><span>{ui.nameLabel}</span><input placeholder={ui.namePh} bind:value={name} /></label>
                <label class="fld"><span>{ui.emailLabel}</span><input placeholder={ui.emailPh} bind:value={email} class:bad={emailBad} /></label>
              </div>
              {#if emailBad}
                <div class="ferr" transition:fade={{ duration: dur(D.fast) }}>{ui.emailErr}</div>
              {/if}
            {/if}

            {#if hasButton}
              <div class="btnrow" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
                {#if mode === 'once'}
                  <button class="go" onclick={submitOnce}>{ui.submit}</button>
                  {#if onceClicked}<span class="noreact" transition:fade={{ duration: dur(D.fast) }}>{ui.noReact}</span>{/if}
                {:else}
                  <button class="go" onclick={submitIter}>{ui.submit}</button>
                {/if}
              </div>
            {/if}

            {#if submitted}
              <div class="toast" transition:fly={{ y: 6, duration: dur(D.base), easing: ease }}>{ui.success}</div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="ctl-row">
    <button class="pl" class:on={mode === 'once'} onclick={() => setMode('once')}>{ui.onceName}</button>
    <button class="pl" class:on={mode === 'iter'} onclick={() => setMode('iter')}>{ui.iterName}</button>
    {#if mode === 'iter'}
      <div class="spacer"></div>
      <button class="btn ghost sm" disabled={step <= 1} onclick={() => setStep(Math.max(1, step - 1))}>← {ui.prev}</button>
      <span class="stepn mono">{step}/4</span>
      <button class="btn ghost sm" disabled={step >= 4} onclick={() => setStep(Math.min(4, step + 1))}>{ui.next} →</button>
    {/if}
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .taskbar { font-size: var(--fs-cap); font-weight: 650; color: var(--ink); margin-bottom: var(--sp-2); }
  .two { display: grid; grid-template-columns: 1fr 1.15fr; gap: var(--sp-3); }
  @media (max-width: 720px) { .two { grid-template-columns: 1fr; } }
  .k { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: 4px; }

  .say { background: #0f8a8012; border: 1px solid #0f8a8055; color: var(--teal-ink, #0b6b63); border-radius: var(--r); padding: 10px 12px; font-size: var(--fs-sm); line-height: 1.6; min-height: 60px; }
  .say :global(b) { color: var(--teal-ink, #0b6b63); }
  .try { font-size: var(--fs-cap); color: var(--ink-2); line-height: 1.6; margin: 10px 0 6px; }
  .issues { display: flex; flex-wrap: wrap; gap: 5px; }
  .ibad { font-size: 10.5px; padding: 2px 8px; border-radius: 99px; background: var(--surface-2); border: 1px solid var(--line-2); color: var(--muted); transition: all .25s; }
  .ibad.lit { background: #e07f0e1f; border-color: #e07f0e66; color: var(--accent-ink); font-weight: 600; }
  .okmsg { margin-top: 10px; font-size: var(--fs-cap); color: var(--teal-ink, #0b6b63); font-weight: 600; }

  /* 真的迷你頁面 */
  .screenhead { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .widthbtn { display: inline-flex; align-items: center; gap: 5px; font-size: 10.5px; font-family: var(--mono); padding: 2px 9px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); cursor: pointer; margin-bottom: 4px; }
  .widthbtn:hover { border-color: var(--accent); color: var(--accent-ink); }
  .frame { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 14px; min-height: 190px; transition: max-width .25s ease; overflow: hidden; }
  .frame.narrow { max-width: 240px; }
  .page { display: flex; flex-direction: column; gap: 10px; }
  .pt { font-size: 16px; font-weight: 700; color: var(--ink); letter-spacing: var(--ls-tight); }
  .pd { font-size: var(--fs-cap); color: var(--muted); margin-top: -6px; }

  /* 欄位：預設「兩欄硬並排」（未修手機版＝窄框會真的爆出去）；.fixed 之後直向堆疊 */
  .fields { display: flex; gap: 8px; }
  .fields .fld { flex: none; width: 170px; }
  .fields.fixed { flex-direction: column; }
  .fields.fixed .fld { width: 100%; }
  .fld { display: flex; flex-direction: column; gap: 3px; }
  .fld span { font-size: 10.5px; color: var(--muted); letter-spacing: .04em; }
  .fld input { border: 1px solid var(--line-2); border-radius: var(--r-sm); padding: 7px 9px; font-family: inherit; font-size: var(--fs-cap); color: var(--ink); background: var(--surface); outline: none; }
  .fld input:focus { border-color: var(--accent); }
  .fld input.bad { border-color: #d23f3f; background: #d23f3f0d; }
  .ferr { font-size: 10.5px; color: #b52f2f; }

  .btnrow { display: flex; align-items: center; gap: 10px; }
  .go { background: var(--accent); border: none; color: #3a1e00; font-weight: 700; font-size: var(--fs-cap); font-family: inherit; padding: 8px 18px; border-radius: var(--r-sm); cursor: pointer; }
  .go:hover { filter: brightness(1.05); }
  .go:active { transform: translateY(1px); }
  .noreact { font-size: 10.5px; color: var(--muted); font-style: italic; }
  .toast { background: #0f8a8014; border: 1px solid #0f8a8066; color: var(--teal-ink, #0b6b63); border-radius: var(--r-sm); padding: 8px 11px; font-size: var(--fs-cap); font-weight: 650; }

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
