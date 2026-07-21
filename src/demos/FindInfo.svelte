<script>
  /* Ch · 用 AI 找對資訊。同一個時效性問題，切換「憑記憶／先搜尋／深度研究」，
     看回答從可能過時‧無來源，變成有查證‧附來源。淺色、離線、示意。 */
  import { fade } from 'svelte/transition';
  import { dur, D } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const L = {
    zh: {
      h3: '互動：它是憑記憶，還是真的查了？',
      lede: '同一個<b>會過時</b>的問題，AI 可能<b>憑訓練記憶</b>回答（快，但可能過時、編造），也可能<b>先上網搜尋</b>再答（有憑有據）。分清楚，才不會把「背出來的」當「查到的」。',
      qLabel: '你的問題（時效性）',
      ansLabel: 'AI 的回答',
      pick: '選一種模式：',
      question: '現在最新、最強的 AI 模型是哪一個？',
      modes: [
        { icon: '🧠', name: '憑記憶答', kind: 'warn', badge: '快，但可能過時／編造', ans: '就我所知，目前領先的大概是〔某個模型〕……', note: '⚠️ 這來自我的訓練記憶，停在截止日；之後出的新模型我並不知道，還可能自信地講錯。', sources: [] },
        { icon: '🔎', name: '先上網搜尋', kind: 'ok', badge: '有查證、附來源', ans: '（已搜尋）根據最近的報導與排行榜，目前討論度最高的是〔近期模型〕，各家互有領先。', note: '來源仍要自己點進去確認：是否可信、是否夠新。', sources: ['官方部落格', '科技媒體', '公開排行榜'] },
        { icon: '📚', name: '深度研究', kind: 'ok', badge: '多來源交叉比對，產出報告', ans: '（深度研究：讀了 20+ 來源、交叉比對）整理成一份帶引用的比較：推理、成本、開源程度上各有領先者……', note: '適合值得等的大問題；日常小問題用一般搜尋就好。', sources: ['論文', '官方文件', '多家評測', '排行榜'] },
      ],
      srcLabel: '來源',
      hint: '訣竅：<b>會過時、具體到容易編的問題，明講「先搜尋再回答、附來源」</b>。深度研究適合值得等的大題目。而不管哪種，<b>它給的來源都要自己核對</b>——AI 也會讀錯、引錯。',
    },
    en: {
      h3: 'Interactive: is it from memory, or did it actually search?',
      lede: 'For the same <b>time-sensitive</b> question, AI might answer <b>from training memory</b> (fast, but possibly stale or fabricated) or <b>search the web first</b> (grounded). Tell them apart so you don’t treat "recited" as "verified."',
      qLabel: 'YOUR QUESTION (time-sensitive)',
      ansLabel: 'THE AI’S ANSWER',
      pick: 'Pick a mode:',
      question: 'What’s the newest, strongest AI model right now?',
      modes: [
        { icon: '🧠', name: 'From memory', kind: 'warn', badge: 'fast, but maybe stale / made-up', ans: 'As far as I know, the leader is probably [some model]…', note: '⚠️ This is from my training memory, frozen at a cutoff; I don’t know about newer models released since, and may state it confidently wrong.', sources: [] },
        { icon: '🔎', name: 'Search first', kind: 'ok', badge: 'grounded, with sources', ans: '(searched) Based on recent reports and leaderboards, the most-discussed is [a recent model], with different labs leading on different things.', note: 'Still open the sources yourself: are they credible, are they fresh?', sources: ['official blog', 'tech media', 'public leaderboard'] },
        { icon: '📚', name: 'Deep research', kind: 'ok', badge: 'many sources cross-checked, a report', ans: '(deep research: read 20+ sources, cross-checked) a cited comparison: different leaders on reasoning, cost, and openness…', note: 'Best for questions worth the wait; use plain search for everyday ones.', sources: ['papers', 'official docs', 'several evals', 'leaderboards'] },
      ],
      srcLabel: 'Sources',
      hint: 'The trick: <b>for anything that dates or is easy to fabricate, say "search first, then answer, with sources."</b> Deep research suits big questions worth the wait. And whichever mode, <b>verify the sources it gives yourself</b> — AI can misread and miscite too.',
    },
    ja: {
      h3: 'インタラクティブ：記憶か、実際に検索したか？',
      lede: '同じ<b>古くなりうる</b>質問でも、AI は<b>訓練記憶</b>で答えることも（速いが古い・捏造の恐れ）、<b>まず検索</b>して答えることもある（根拠つき）。見分ければ「暗唱」を「検証済み」と誤解せずに済みます。',
      qLabel: 'あなたの質問（時効性）',
      ansLabel: 'AI の回答',
      pick: 'モードを選ぶ：',
      question: '今いちばん新しく強い AI モデルはどれ？',
      modes: [
        { icon: '🧠', name: '記憶で答える', kind: 'warn', badge: '速いが古い／捏造の恐れ', ans: '私の知る限り、先頭はたぶん〔あるモデル〕……', note: '⚠️ これは訓練記憶で締切時点まで。以降の新モデルは知らず、自信満々に誤ることも。', sources: [] },
        { icon: '🔎', name: 'まず検索', kind: 'ok', badge: '根拠つき、出典あり', ans: '（検索済み）最近の報道とランキングでは、話題性が最も高いのは〔最近のモデル〕で、項目ごとに各社が先行。', note: '出典は自分で開いて確認を：信頼できるか、十分新しいか。', sources: ['公式ブログ', 'テック媒体', '公開ランキング'] },
        { icon: '📚', name: '深層リサーチ', kind: 'ok', badge: '多ソース照合、レポート化', ans: '（深層リサーチ：20+ ソースを読み照合）引用つき比較：推論・コスト・オープン度で先行者が異なる……', note: '待つ価値のある大きな問い向け。日常は通常検索で十分。', sources: ['論文', '公式文書', '複数の評価', 'ランキング'] },
      ],
      srcLabel: '出典',
      hint: 'コツ：<b>古くなる・捏造しやすい問いは「まず検索、出典つきで答えて」と明言</b>。深層リサーチは待つ価値のある大問題向け。どのモードでも<b>示された出典は自分で確認</b>を——AI も読み違い・誤引用をします。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);
  let m = $state(0);
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <div class="stack">
      <div class="layer">
        <span class="k mono">{ui.qLabel}</span>
        <div class="box qbox">{ui.question}</div>
      </div>
      <div class="layer">
        <span class="k mono">{ui.ansLabel} <span class="tag {ui.modes[m].kind}">{ui.modes[m].badge}</span></span>
        {#key m}
          <div class="box ansbox" in:fade={{ duration: dur(D.base) }}>
            <p class="atext">{ui.modes[m].ans}</p>
            {#if ui.modes[m].sources.length}
              <div class="srcs"><span class="srcl">{ui.srcLabel}</span>{#each ui.modes[m].sources as s}<span class="chip">{s}</span>{/each}</div>
            {/if}
            <p class="note">{ui.modes[m].note}</p>
          </div>
        {/key}
      </div>
    </div>
  </div>

  <div class="ctl-row">
    <span class="glab">{ui.pick}</span>
    {#each ui.modes as md, i}
      <button class="pl" class:on={m === i} onclick={() => (m = i)}>{md.icon} {md.name}</button>
    {/each}
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .stack { display: flex; flex-direction: column; gap: var(--sp-2); }
  .k { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: 4px; }
  .box { border-radius: var(--r); padding: 10px 12px; font-size: var(--fs-sm); line-height: 1.6; }
  .qbox { background: var(--surface-2); border: 1px solid var(--line); color: var(--ink-2); }
  .ansbox { background: var(--surface); border: 1px solid var(--line); color: var(--ink); min-height: 44px; }
  .atext { margin: 0; }
  .note { margin: 8px 0 0; font-size: var(--fs-cap); color: var(--muted); line-height: 1.5; }
  .srcs { display: flex; flex-wrap: wrap; align-items: center; gap: 5px; margin-top: 8px; }
  .srcl { font-family: var(--mono); font-size: 9.5px; letter-spacing: .08em; color: var(--muted); margin-right: 2px; }
  .chip { font-size: 10.5px; padding: 2px 8px; border-radius: 99px; background: #0f8a8014; border: 1px solid #0f8a8055; color: var(--teal-ink, #0b6b63); }
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
