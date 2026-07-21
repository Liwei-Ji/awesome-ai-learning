<script>
  /* Ch · AI 當思考夥伴。同一個想法，換「你怎麼問」——求認同會拿到附和，
     中立問法／指定挑剔角色才逼出真話。演出 sycophancy 與破解法。淺色、離線。 */
  import { fade } from 'svelte/transition';
  import { dur, D } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const L = {
    zh: {
      h3: '互動：它在附和你，還是說真話？',
      lede: '同一個想法，<b>你怎麼問，決定它給你讚美還是真話</b>。AI 天生傾向附和（sycophancy），要真正的回饋，得把問題設計成「逼它反對」。',
      ideaLabel: '你的想法（不變）',
      askLabel: '你怎麼問',
      ansLabel: 'AI 的回答',
      pick: '換個問法：',
      idea: '我想開一家 24 小時營業的實體書店。',
      framings: [
        { icon: '👍', name: '求認同', ask: '…很讚吧？你覺得呢？', kind: 'warn', tag: '多半是附和', ans: '很棒的想法！24 小時書店很有特色，能營造獨特的城市文化感，一定會吸引不少愛書人，放手去做吧！' },
        { icon: '⚖️', name: '中立問法', ask: '…請幫我找出這計畫最大的問題。', kind: 'ok', tag: '開始給真話', ans: '最大的問題是錢：① 深夜人流低、但人力照付，坪效難撐租金；② 書店毛利本就薄，24 小時放大固定成本；③ 深夜的安全與管理成本。' },
        { icon: '🧐', name: '指定挑剔角色', ask: '你是挑剔的創投，用最嚴格的角度打槍我。', kind: 'ok', tag: '最犀利', ans: '恕我直言，這財務上很難成立：夜間營收撐不起 24 小時的人力與能源。除非書只是引流、真正靠餐飲或活動，否則現金流會先燒垮你。先證明夜間需求再談。' },
      ],
      hint: '看出來了嗎？<b>「很讚吧？」這種求認同的問法只會拿到附和</b>；改成中立問法、或叫它<b>扮演挑剔的角色</b>，才逼得出真正有用的回饋。越重要的決定，越要主動要它講你不想聽的。',
    },
    en: {
      h3: 'Interactive: is it agreeing, or telling the truth?',
      lede: 'Same idea — <b>how you ask decides whether you get praise or the truth</b>. AI leans toward agreeing (sycophancy); for real feedback you must design the question to make it push back.',
      ideaLabel: 'YOUR IDEA (unchanged)',
      askLabel: 'HOW YOU ASK',
      ansLabel: 'THE AI’S ANSWER',
      pick: 'Change how you ask:',
      idea: 'I want to open a 24-hour physical bookstore.',
      framings: [
        { icon: '👍', name: 'Seek approval', ask: '…great idea, right? What do you think?', kind: 'warn', tag: 'mostly agreeing', ans: 'Great idea! A 24-hour bookstore is so distinctive, it would create a unique city-culture vibe and surely draw book lovers. Go for it!' },
        { icon: '⚖️', name: 'Neutral framing', ask: '…find the biggest problems with this plan.', kind: 'ok', tag: 'starting to be honest', ans: 'The biggest problem is money: ① low foot traffic at night but you still pay staff, so the space can’t cover rent; ② bookstore margins are thin and 24h magnifies fixed costs; ③ overnight safety and management costs.' },
        { icon: '🧐', name: 'Assign a critic', ask: 'You’re a skeptical VC — tear my plan apart.', kind: 'ok', tag: 'sharpest', ans: 'Frankly, the finances barely work: night revenue can’t cover 24h staffing and energy. Unless books are just a draw and you really live on food or events, cash flow burns you first. Prove night demand before anything.' },
      ],
      hint: 'See it? <b>An approval-seeking question ("great, right?") only gets agreement</b>; switch to neutral framing or tell it to <b>play a critical role</b>, and you force out feedback that actually helps. The bigger the decision, the more you should make it say what you don’t want to hear.',
    },
    ja: {
      h3: 'インタラクティブ：同調か、本音か？',
      lede: '同じ考えでも、<b>聞き方が、称賛か本音かを決めます</b>。AI は同調しがち（sycophancy）。本当の意見には、反対せざるを得ない問いに設計すること。',
      ideaLabel: 'あなたの考え（不変）',
      askLabel: '聞き方',
      ansLabel: 'AI の回答',
      pick: '聞き方を変える：',
      idea: '24 時間営業の実店舗の書店を開きたい。',
      framings: [
        { icon: '👍', name: '同意を求める', ask: '…いいでしょ？どう思う？', kind: 'warn', tag: 'ほぼ同調', ans: '素晴らしいアイデア！24 時間書店は独特で、街の文化的な雰囲気を作れて、本好きをきっと惹きつけます。ぜひやりましょう！' },
        { icon: '⚖️', name: '中立に聞く', ask: '…この計画の最大の問題を挙げて。', kind: 'ok', tag: '本音が出始める', ans: '最大の問題はお金：① 深夜は客足が少ないのに人件費はかかり、坪効率が家賃を支えられない；② 書店の粗利は薄く、24 時間が固定費を拡大；③ 深夜の安全・管理コスト。' },
        { icon: '🧐', name: '批判役を指定', ask: 'あなたは辛口の VC。最も厳しく論破して。', kind: 'ok', tag: '最も鋭い', ans: '率直に言うと財務的に厳しい：夜間売上が 24 時間の人件費と電力を賄えない。本が集客で、実は飲食やイベントで稼ぐのでなければ、資金繰りが先に尽きます。まず夜間需要を証明してから。' },
      ],
      hint: '分かりましたか？<b>「いいでしょ？」という同意を求める問いは同調しか得られません</b>。中立に聞く、あるいは<b>批判役を演じさせる</b>と、本当に役立つ回答が引き出せます。重要な決定ほど、聞きたくないことを言わせましょう。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);
  let f = $state(0);
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="stack">
      <div class="layer">
        <span class="k mono">{ui.ideaLabel}</span>
        <div class="box ideabox">{ui.idea}</div>
      </div>
      <div class="layer">
        <span class="k mono">{ui.askLabel}</span>
        {#key f}<div class="box askbox" in:fade={{ duration: dur(D.fast) }}>{ui.framings[f].ask}</div>{/key}
      </div>
      <div class="layer">
        <span class="k mono">{ui.ansLabel} <span class="tag {ui.framings[f].kind}">{ui.framings[f].tag}</span></span>
        {#key f}<div class="box ansbox" in:fade={{ duration: dur(D.base) }}>{ui.framings[f].ans}</div>{/key}
      </div>
    </div>
  </div>

  <div class="ctl-row">
    <span class="glab">{ui.pick}</span>
    {#each ui.framings as fr, i}
      <button class="pl" class:on={f === i} onclick={() => (f = i)}>{fr.icon} {fr.name}</button>
    {/each}
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .stack { display: flex; flex-direction: column; gap: var(--sp-2); }
  .k { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: 4px; }
  .box { border-radius: var(--r); padding: 10px 12px; font-size: var(--fs-sm); line-height: 1.6; }
  .ideabox { background: var(--surface-2); border: 1px solid var(--line); color: var(--ink-2); }
  .askbox { background: #0f8a8012; border: 1px solid #0f8a8055; color: var(--teal-ink, #0b6b63); }
  .ansbox { background: var(--surface); border: 1px solid var(--line); color: var(--ink); min-height: 44px; }
  .tag { font-family: var(--mono); font-size: 9.5px; padding: 1px 7px; border-radius: 99px; margin-left: 6px; vertical-align: middle; }
  .tag.warn { background: #e07f0e22; color: var(--accent-ink); }
  .tag.ok { background: #0f8a8022; color: var(--teal-ink, #0b6b63); }

  .ctl-row { display: flex; flex-wrap: wrap; gap: var(--sp-2); margin: 12px 0 4px; align-items: center; }
  .glab { font-size: var(--fs-cap); color: var(--muted); }
  .pl { font-size: var(--fs-cap); padding: 5px 11px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); cursor: pointer; }
  .pl:hover { border-color: var(--accent); color: var(--accent-ink); }
  .pl.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }

  .hint { font-size: var(--fs-cap); color: var(--muted); line-height: var(--lh-body); margin: var(--sp-3) 0 0; }
  .hint :global(b) { color: var(--ink-2); }
</style>
