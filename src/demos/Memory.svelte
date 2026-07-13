<script>
  /* Ch · Memory：AI 怎麼記住你。模型本身沒記憶，每次對話都是空白；
     「記住」是把重點存到外部記憶庫、下次對話前再塞回上下文。
     切換「沒有記憶 / 有記憶」，看它跨對話記得 vs 忘光。亮色、離線。 */
  import { fade, fly } from 'svelte/transition';
  import { dur, D } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const L = {
    zh: {
      h3: '互動：AI 記得住你嗎？',
      lede: '模型本身<b>沒有記憶</b>——每次對話都是一張白紙。所謂「記住」，其實是把重點<b>存到外部記憶庫</b>，下次對話前再<b>塞回上下文</b>。切換看看有沒有記憶差多少。',
      noMem: '🚫 沒有記憶', withMem: '🧠 有記憶',
      day1: '第一次對話',
      meIntro: '我叫小明，最喜歡貓 🐱',
      botHi: '好的，很高興認識你！', wrote: '（已寫入記憶）',
      divider: '——— 幾天後，全新的一段對話 ———',
      inject: '↩︎ 對話開始前，先把記憶塞回上下文',
      meAsk: '我叫什麼？我喜歡什麼？',
      ansGood: '你叫<b>小明</b>，最喜歡<b>貓 🐱</b>！（我從記憶裡查到的）',
      ansBad: '嗯…抱歉，我不記得你是誰，這好像是我們第一次說話 🤔',
      memBank: '🗄️ 記憶庫', memOff: '（關閉）',
      mem: [['名字', '小明'], ['喜好', '貓 🐱'], ['語言', '繁體中文']],
      memnote: '跨對話保留，下次自動帶入。',
      empty: '（空的）<br>模型記不住任何事，<br>每次都從零開始。',
      hint: '所以 AI「有記憶」不是模型變聰明了，而是外面<b>幫它存檔、再塞回來</b>。<b>短期記憶</b>＝這一次對話的上下文；<b>長期記憶</b>＝跨對話的筆記（常用資料庫或 RAG 實作）。記住越多越貼心，但也越要注意隱私。',
    },
    en: {
      h3: 'Interactive: can the AI remember you?',
      lede: 'The model itself <b>has no memory</b>—every conversation is a blank slate. So-called “remembering” really means <b>saving the key points to an external memory store</b>, then <b>slipping them back into the context</b> before the next conversation. Toggle to see how much difference memory makes.',
      noMem: '🚫 No memory', withMem: '🧠 With memory',
      day1: 'First conversation',
      meIntro: 'My name is Sam, and I love cats 🐱',
      botHi: 'Great, nice to meet you!', wrote: '(saved to memory)',
      divider: '——— A few days later, a brand-new conversation ———',
      inject: '↩︎ Before the conversation starts, slip the memory back into the context',
      meAsk: 'What’s my name? What do I like?',
      ansGood: 'Your name is <b>Sam</b>, and you love <b>cats 🐱</b>! (I looked it up in memory)',
      ansBad: 'Hmm… sorry, I don’t remember who you are. This seems to be the first time we’ve talked 🤔',
      memBank: '🗄️ Memory store', memOff: '(off)',
      mem: [['Name', 'Sam'], ['Likes', 'Cats 🐱'], ['Language', 'Traditional Chinese']],
      memnote: 'Kept across conversations, brought in automatically next time.',
      empty: '(empty)<br>The model can’t hold onto anything;<br>every time it starts from zero.',
      hint: 'So an AI “having memory” doesn’t mean the model got smarter—something outside <b>saves its file and slips it back in</b>. <b>Short-term memory</b> = the context of this one conversation; <b>long-term memory</b> = notes kept across conversations (often built with a database or RAG). The more it remembers, the more helpful it feels—but the more you have to mind privacy.',
    },
    ja: {
      h3: 'インタラクティブ：AI はあなたを覚えていられる？',
      lede: 'モデル自体には<b>記憶がありません</b>——会話のたびに白紙です。いわゆる「覚える」とは、実は<b>要点を外部の記憶庫に保存</b>しておき、次の会話の前に<b>コンテキストに入れ直す</b>ことです。切り替えて、記憶があるとどれだけ違うか見てみましょう。',
      noMem: '🚫 記憶なし', withMem: '🧠 記憶あり',
      day1: '最初の会話',
      meIntro: '私の名前はサム、猫が大好きです 🐱',
      botHi: 'いいですね、はじめまして！', wrote: '（記憶に保存しました）',
      divider: '——— 数日後、まったく新しい会話 ———',
      inject: '↩︎ 会話が始まる前に、記憶をコンテキストに入れ直す',
      meAsk: '私の名前は？私は何が好き？',
      ansGood: 'あなたの名前は<b>サム</b>、<b>猫 🐱</b>が大好きですね！（記憶から調べました）',
      ansBad: 'うーん…ごめんなさい、あなたが誰か覚えていません。話すのは今回が初めてみたいです 🤔',
      memBank: '🗄️ 記憶庫', memOff: '（オフ）',
      mem: [['名前', 'サム'], ['好み', '猫 🐱'], ['言語', '日本語']],
      memnote: '会話をまたいで保持され、次回は自動で読み込まれます。',
      empty: '（空っぽ）<br>モデルは何も保持できず、<br>毎回ゼロから始まります。',
      hint: 'つまり AI に「記憶がある」のは、モデルが賢くなったからではなく、外側の何かが<b>保存して入れ直している</b>からです。<b>短期記憶</b>＝この一回の会話のコンテキスト；<b>長期記憶</b>＝会話をまたいで保存するメモ（データベースや RAG で実装されることが多い）。覚えるほど気が利くようになりますが、その分プライバシーにも気を配る必要があります。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);

  let memOn = $state(false);
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="seg">
      <button class="segb" class:on={!memOn} onclick={() => (memOn = false)}>{ui.noMem}</button>
      <button class="segb" class:on={memOn} onclick={() => (memOn = true)}>{ui.withMem}</button>
    </div>

    <div class="grid">
      <div class="convo">
        <div class="daytag">{ui.day1}</div>
        <div class="msg me">{ui.meIntro}</div>
        <div class="msg bot">{ui.botHi}{#if memOn}<span class="wrote">{ui.wrote}</span>{/if}</div>

        <div class="divider"><span>{ui.divider}</span></div>
        {#if memOn}
          <div class="inject" in:fade={{ duration: dur(D.base) }}>{ui.inject}</div>
        {/if}
        <div class="msg me">{ui.meAsk}</div>
        {#key memOn}
          <div class="msg bot ans" class:good={memOn} class:bad={!memOn} in:fly={{ y: 8, duration: dur(D.base) }}>
            {#if memOn}
              {@html ui.ansGood}
            {:else}
              {ui.ansBad}
            {/if}
          </div>
        {/key}
      </div>

      <div class="memcol">
        <div class="mono k">{ui.memBank} {memOn ? '' : ui.memOff}</div>
        {#if memOn}
          {#each ui.mem as [k, v], i}
            <div class="mem" in:fly={{ y: 6, duration: dur(D.fast), delay: dur(i * 70) }}>
              <span class="mk">{k}</span><span class="mv">{v}</span>
            </div>
          {/each}
          <div class="memnote">{ui.memnote}</div>
        {:else}
          <div class="empty">{@html ui.empty}</div>
        {/if}
      </div>
    </div>
  </div>

  <p class="hint">{@html ui.hint}</p>
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
