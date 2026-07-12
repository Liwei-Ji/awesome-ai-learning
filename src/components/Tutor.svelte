<script>
  // AI 教授（示範助教）：右下角浮動圓形按鈕，點開＝對話視窗，再點＝收回。
  import { fly, scale } from 'svelte/transition';
  import { nav } from '../stores/state.svelte.js';
  import { CH } from '../data/chapters.js';
  import { knowledgeFor } from '../data/knowledge/index.js';
  import { makeChapterIndex, searchChapter, suggestChapters } from '../lib/tutorSearch.js';
  import { dur, D, ease } from '../lib/motion.js';

  let open = $state(false);
  let messages = $state([]);
  let input = $state('');
  let chatEl;

  let slug = $derived(CH[nav.current].slug);
  let chips = $derived(knowledgeFor(slug).qs);

  // 全章索引（靜態，建一次）：供範圍門檻與跨章導引
  const CHAPTERS = Object.values(CH).map((c) => ({
    slug: c.slug, title: c.t,
    index: makeChapterIndex({ kb: knowledgeFor(c.slug).kb, title: c.t, terms: c.terms }),
  }));
  let chIndex = $derived(CHAPTERS.find((c) => c.slug === slug)?.index);

  // 切章：重置對話，換上本章開場白
  $effect(() => {
    const id = nav.current;
    messages = [
      { role: 'bot', html: `嗨，我是 AI 教授 👋 這一章我們談<b>${CH[id].t}</b>。左邊的動畫可以直接動手玩，有問題隨時問我。` },
    ];
  });

  // 訊息變動 / 開啟時捲到底
  $effect(() => {
    messages.length; open;
    if (open && chatEl) chatEl.scrollTop = 1e9;
  });

  function answer(q) {
    const res = searchChapter(q, chIndex);
    if (res.confident) return res.answer;
    // 出範圍：若他章有涵蓋就導引過去
    const sug = suggestChapters(q, CHAPTERS, slug);
    if (sug.length) {
      const names = sug.map((s) => `「${s.title}」`).join('、');
      return `這一題不在本章（${CH[nav.current].t}）的範圍——不過 ${names} 有講到喔，切過去再問我，我能答得更完整。`;
    }
    return `我是這門課的助教，專門回答課綱裡的<b>AI 概念</b>——每章的<b>定義、原理、差別、應用</b>都能問。這一題我不太有把握：換個說法、試試下面的建議問題，或直接問某個關鍵名詞。若超出課程範圍，我可能就答不上來。`;
  }

  function ask(q) {
    messages.push({ role: 'me', html: q });
    const idx = messages.push({ role: 'bot', html: '<span class="think">思考中<span class="typing"><i></i><i></i><i></i></span></span>' }) - 1;
    const a = answer(q);
    setTimeout(() => { messages[idx].html = a; }, dur(450));
  }

  function submit(e) {
    e.preventDefault();
    const v = input.trim();
    if (!v) return;
    input = '';
    ask(v);
  }

  function onKey(e) { if (e.key === 'Escape' && open) open = false; }
</script>

<svelte:window onkeydown={onKey} />

<div class="tutor-fab">
  {#if open}
    <div class="tutor-card" transition:fly={{ y: 16, duration: dur(D.base), easing: ease }}>
      <div class="tutor-head">
        <span class="av">🎓</span>
        <span class="nm">AI 教授</span>
        <div class="spacer"></div>
        <button class="close" aria-label="收合" onclick={() => (open = false)}>✕</button>
      </div>
      <div class="chat" bind:this={chatEl}>
        {#each messages as m}
          <div class="msg {m.role}">{@html m.html}</div>
        {/each}
      </div>
      <div class="chips">
        {#each chips as q}
          <button class="chip" onclick={() => ask(q)}>{q}</button>
        {/each}
      </div>
      <form class="tutor-in" onsubmit={submit}>
        <div class="inwrap">
          <input bind:value={input} placeholder="問教授一個問題…" autocomplete="off" />
          <button class="send" type="submit" aria-label="送出" disabled={!input.trim()}>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none"
              stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9 22 2Z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  {/if}

  <button class="fab" class:open aria-label={open ? '收合 AI 教授' : '開啟 AI 教授'} onclick={() => (open = !open)}>
    {#if open}
      <span in:scale={{ start: 0.6, duration: dur(D.fast) }}>✕</span>
    {:else}
      <span in:scale={{ start: 0.6, duration: dur(D.fast) }}>🎓</span>
    {/if}
  </button>
</div>

<style>
  .tutor-fab {
    position: fixed; right: 22px; bottom: 22px; z-index: 60;
    display: flex; flex-direction: column; align-items: flex-end; gap: 12px;
  }

  .fab {
    width: 56px; height: 56px; border-radius: 50%; border: none; cursor: pointer;
    background: var(--teal);
    color: #fff; font-size: 24px; display: grid; place-items: center;
    box-shadow: 0 8px 24px rgba(10, 20, 40, .28), 0 0 0 4px var(--glow);
    transition: transform .15s, box-shadow .2s;
  }
  .fab:hover { transform: translateY(-2px) scale(1.04); }
  .fab.open { background: var(--surface-2); color: var(--ink-2); box-shadow: 0 6px 18px rgba(10, 20, 40, .22); }
  .fab > span { line-height: 1; }

  .tutor-card {
    width: min(384px, calc(100vw - 40px));
    height: min(520px, calc(100dvh - 130px));
    background: var(--surface); border: 1px solid var(--line); border-radius: 16px;
    box-shadow: 0 18px 50px rgba(10, 20, 40, .30);
    display: flex; flex-direction: column; overflow: hidden;
    transform-origin: bottom right;
  }

  .tutor-head .av { width: 26px; height: 26px; border-radius: 8px; display: grid; place-items: center;
    background: var(--teal); font-size: 14px; }
  .tutor-head .nm { font-weight: 600; font-size: 13.5px; }
  .tutor-head .tag { font-family: var(--mono); font-size: 10px; color: var(--muted); border: 1px solid var(--line); border-radius: 99px; padding: 2px 8px; }
  .tutor-head .spacer { flex: 1; }
  .tutor-head .ctx { font-size: 10px; }
  .tutor-head .close { border: none; background: none; color: var(--muted); font-size: 14px; cursor: pointer; padding: 2px 4px; margin-left: 6px; }
  .tutor-head .close:hover { color: var(--ink); }
</style>
