<script>
  /* Ch · AI 技能包（Skills）。同一任務比較「有技能」vs「沒技能」：
     有技能時 agent 平時只看到卡片的名稱＋描述，挑中對的那張才「載入完整指令」
     （漸進揭露），照著把事做到位；沒技能只能憑通用知識硬做。淺色、離線、示意。 */
  import { fade, fly } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';

  const L = {
    zh: {
      h3: '互動：agent 挑技能、載入、把事做好',
      lede: '同一個任務，比較<b>有技能</b>與<b>沒技能</b>。有技能時，agent 只先看每張卡的<b>名稱＋描述</b>，挑中對的那張才<b>載入完整指令</b>（漸進揭露），再照著把事做到位。',
      taskLabel: '選一個任務：',
      tasks: [
        { label: '把這季財報做成投影片', skillId: 'deck', generic: '產出一份格式雜亂、少了關鍵數字的投影片，還要大改。', good: '照〈財報投影片〉的版型與檢查表，產出結構完整、數字齊全的投影片。' },
        { label: '幫這個 PR 做程式碼審查', skillId: 'pr', generic: '只泛泛說「看起來還行」，漏掉測試與邊界情況。', good: '照〈PR 審查〉清單逐項檢查，指出缺測試、命名與邊界問題。' },
        { label: '生成品牌一致的社群貼文', skillId: 'brand', generic: '寫出語氣飄忽、不符品牌調性的貼文。', good: '照〈品牌貼文〉的語氣與格式規範，產出一致、可直接發的貼文。' },
      ],
      skills: [
        { id: 'brand', name: '品牌貼文', desc: '照品牌語氣與格式產出社群貼文', howto: ['用第一人稱、親切但專業的語氣', '開頭一句 hook，結尾加行動呼籲', '固定 hashtag 與字數上限'] },
        { id: 'pr', name: 'PR 審查', desc: '照團隊清單逐項檢查 PR', howto: ['先看有沒有對應的測試', '檢查命名、錯誤處理、邊界情況', '用建議語氣，標出必改與可選'] },
        { id: 'deck', name: '財報投影片', desc: '把財報數字整理成投影片', howto: ['固定版型：摘要、營收、獲利、展望', '每頁一個重點數字＋同比', '最後附上風險與假設'] },
        { id: 'sql', name: 'SQL 報表', desc: '把需求轉成查詢並輸出報表', howto: [] },
      ],
      modeSkill: '有技能', modeNone: '沒技能',
      shelfLabel: '技能書架（平時只看得到名稱＋描述）',
      matchTag: '命中',
      loadBtn: '＋ 載入完整指令',
      loadedTag: '✓ 已載入',
      loadedLabel: '已載入的完整指令',
      resultLabel: '完成結果',
      beforeLoad: 'agent 已挑中這張技能，但還沒載入細節——它現在只知道名稱與描述。按「載入」看它展開完整指令。',
      noSkillNote: '沒有可用技能，agent 只能憑通用知識硬做：',
      hint: '重點：技能的<b>名稱與描述</b>常駐可見，讓 agent 判斷該不該用；完整指令<b>用到才載入</b>，所以塞幾百個也不爆上下文。挑對＋載入，泛泛的嘗試就變成照 SOP 的到位成果。',
    },
    en: {
      h3: 'Interactive: the agent picks a skill, loads it, does the job well',
      lede: 'Same task, <b>with a skill</b> vs <b>without</b>. With skills, the agent first sees only each card’s <b>name and description</b>, picks the right one, then <b>loads its full instructions</b> (progressive disclosure) and follows them to nail the task.',
      taskLabel: 'Pick a task:',
      tasks: [
        { label: 'Turn this quarter’s report into slides', skillId: 'deck', generic: 'Produces messy slides missing key numbers that need a big rewrite.', good: 'Uses the “Report Deck” layout and checklist to produce complete, number-complete slides.' },
        { label: 'Review this pull request', skillId: 'pr', generic: 'Just says “looks fine,” missing tests and edge cases.', good: 'Walks the “PR Review” checklist item by item, flagging missing tests, naming, and edge cases.' },
        { label: 'Write an on-brand social post', skillId: 'brand', generic: 'Writes a post with a wandering tone that is off-brand.', good: 'Follows the “Brand Post” tone and format rules to produce a consistent, ready-to-publish post.' },
      ],
      skills: [
        { id: 'brand', name: 'Brand Post', desc: 'Produce social posts in the brand’s voice and format', howto: ['First person, warm but professional tone', 'Open with a hook, end with a call to action', 'Fixed hashtags and a length cap'] },
        { id: 'pr', name: 'PR Review', desc: 'Check a pull request against the team checklist', howto: ['Check there are matching tests first', 'Review naming, error handling, edge cases', 'Suggesting tone; mark must-fix vs optional'] },
        { id: 'deck', name: 'Report Deck', desc: 'Turn financial numbers into slides', howto: ['Fixed layout: summary, revenue, profit, outlook', 'One key number per slide, with year-over-year', 'End with risks and assumptions'] },
        { id: 'sql', name: 'SQL Report', desc: 'Turn a request into a query and output a report', howto: [] },
      ],
      modeSkill: 'With skills', modeNone: 'No skill',
      shelfLabel: 'Skill shelf (normally only names and descriptions are visible)',
      matchTag: 'match',
      loadBtn: '+ Load full instructions',
      loadedTag: '✓ loaded',
      loadedLabel: 'Loaded full instructions',
      resultLabel: 'Result',
      beforeLoad: 'The agent picked this skill but has not loaded the details yet — it only knows the name and description. Hit “load” to expand the full instructions.',
      noSkillNote: 'No skill available, so the agent just improvises from general knowledge:',
      hint: 'Takeaway: a skill’s <b>name and description</b> stay visible so the agent can decide whether to use it; the full instructions <b>load only when needed</b>, so hundreds fit without blowing up the context. Pick the right one and load it, and a vague attempt becomes an on-SOP result.',
    },
    ja: {
      h3: 'インタラクティブ：agent がスキルを選び、読み込み、うまくこなす',
      lede: '同じタスクを<b>スキルあり</b>と<b>なし</b>で比較。スキルありでは、agent はまず各カードの<b>名前と説明</b>だけを見て正しい一枚を選び、<b>完全な指令を読み込み</b>（段階的開示）、それに従ってタスクをこなします。',
      taskLabel: 'タスクを選ぶ：',
      tasks: [
        { label: '今期の決算をスライドにする', skillId: 'deck', generic: '書式がばらばらで重要な数字が抜けた、大幅な手直しが要るスライドを出す。', good: '〈決算スライド〉の版型とチェックリストに沿って、構成も数字もそろったスライドを出す。' },
        { label: 'この PR をコードレビューする', skillId: 'pr', generic: '「だいたい良さそう」と言うだけで、テストや境界条件を見落とす。', good: '〈PR レビュー〉のチェックリストを一項目ずつ確認し、テスト不足・命名・境界の問題を指摘する。' },
        { label: 'ブランドに合った SNS 投稿を作る', skillId: 'brand', generic: '口調がぶれ、ブランドの調子に合わない投稿を書く。', good: '〈ブランド投稿〉の口調と書式ルールに沿って、一貫した、すぐ出せる投稿を作る。' },
      ],
      skills: [
        { id: 'brand', name: 'ブランド投稿', desc: 'ブランドの口調と書式で SNS 投稿を作る', howto: ['一人称、親しみやすいが専門的な口調', '冒頭にフック、末尾に行動喚起', '固定のハッシュタグと文字数上限'] },
        { id: 'pr', name: 'PR レビュー', desc: 'チームのチェックリストで PR を確認', howto: ['まず対応するテストがあるか確認', '命名・エラー処理・境界条件を点検', '提案する口調で、必須と任意を区別'] },
        { id: 'deck', name: '決算スライド', desc: '決算の数字をスライドにまとめる', howto: ['固定版型：要約・売上・利益・見通し', '1 枚に重要数字 1 つ＋前年比', '最後にリスクと前提を添える'] },
        { id: 'sql', name: 'SQL レポート', desc: '要件をクエリに変換してレポート出力', howto: [] },
      ],
      modeSkill: 'スキルあり', modeNone: 'スキルなし',
      shelfLabel: 'スキル棚（普段は名前と説明だけ見える）',
      matchTag: '命中',
      loadBtn: '＋ 完全な指令を読み込む',
      loadedTag: '✓ 読み込み済み',
      loadedLabel: '読み込んだ完全な指令',
      resultLabel: '完成結果',
      beforeLoad: 'agent はこのスキルを選びましたが、まだ詳細は読み込んでいません。今は名前と説明しか知りません。「読み込む」を押すと完全な指令が展開します。',
      noSkillNote: '使えるスキルがなく、agent は一般知識で無理やりこなすだけ：',
      hint: 'ポイント：スキルの<b>名前と説明</b>は常に見え、agent が使うかどうかを判断できる。完全な指令は<b>必要なときだけ読み込む</b>ので、何百個あってもコンテキストは溢れない。正しく選んで読み込めば、漠然とした試みが SOP どおりの成果に変わる。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);
  let mode = $state('skills');
  let ti = $state(0);
  let opened = $state(false);

  let task = $derived(ui.tasks[ti]);
  let matched = $derived(ui.skills.find((s) => s.id === task.skillId));

  const pickTask = (i) => { ti = i; opened = false; };
  const setMode = (m) => { mode = m; opened = false; };
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="ctl-row">
    <span class="glab">{ui.taskLabel}</span>
    {#each ui.tasks as t, i}
      <button class="pl" class:on={ti === i} onclick={() => pickTask(i)}>{t.label}</button>
    {/each}
  </div>

  <div class="demo-stage light">
    <div class="mode">
      <button class="tab" class:on={mode === 'skills'} onclick={() => setMode('skills')}>{ui.modeSkill}</button>
      <button class="tab" class:on={mode === 'none'} onclick={() => setMode('none')}>{ui.modeNone}</button>
    </div>

    {#if mode === 'skills'}
      <span class="k mono">{ui.shelfLabel}</span>
      <div class="shelf">
        {#each ui.skills as s (s.id)}
          {@const isMatch = s.id === task.skillId}
          <div class="card" class:match={isMatch} class:faded={!isMatch}>
            <div class="cname">{s.name}{#if isMatch}<span class="mtag" transition:fade={{ duration: dur(D.fast) }}>{ui.matchTag}</span>{/if}</div>
            <div class="cdesc">{s.desc}</div>
            {#if isMatch}
              {#if !opened}
                <button class="loadbtn" onclick={() => (opened = true)} transition:fade={{ duration: dur(D.fast) }}>{ui.loadBtn}</button>
              {:else}
                <span class="loadedtag" transition:fade={{ duration: dur(D.fast) }}>{ui.loadedTag}</span>
              {/if}
            {/if}
          </div>
        {/each}
      </div>

      {#if opened}
        <div class="loaded" in:fly={{ y: 8, duration: dur(D.base), easing: ease }}>
          <span class="k mono">{ui.loadedLabel} · {matched.name}</span>
          <ul class="howto">
            {#each matched.howto as step, i}
              <li in:fly={{ y: 6, duration: dur(D.base), delay: dur(i * 70), easing: ease }}>{step}</li>
            {/each}
          </ul>
        </div>
        <div class="res good" in:fade={{ duration: dur(D.base) }}>
          <span class="k mono">{ui.resultLabel}</span>
          <div class="rbox">✓ {task.good}</div>
        </div>
      {:else}
        {#key ti}<p class="note" in:fade={{ duration: dur(D.fast) }}>{ui.beforeLoad}</p>{/key}
      {/if}
    {:else}
      <div class="res bad" in:fade={{ duration: dur(D.base) }}>
        <span class="note">{ui.noSkillNote}</span>
        {#key ti}<div class="rbox rbad" in:fade={{ duration: dur(D.fast) }}>✕ {task.generic}</div>{/key}
      </div>
    {/if}
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .k { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: 4px; }

  .ctl-row { display: flex; flex-wrap: wrap; gap: var(--sp-2); margin: 0 0 12px; align-items: center; }
  .glab { font-size: var(--fs-cap); color: var(--muted); }
  .pl { font-size: var(--fs-cap); padding: 5px 11px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); cursor: pointer; }
  .pl:hover { border-color: var(--accent); color: var(--accent-ink); }
  .pl.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }

  .mode { display: flex; gap: 6px; margin-bottom: var(--sp-3); }
  .tab { font-size: var(--fs-cap); padding: 4px 12px; border-radius: var(--r-sm); border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); cursor: pointer; }
  .tab.on { background: var(--surface); border-color: var(--teal); color: var(--teal-ink, #0b6b63); font-weight: 600; }

  .shelf { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: var(--sp-2); }
  @media (max-width: 720px) { .shelf { grid-template-columns: 1fr; } }
  .card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 9px 11px; transition: border-color .15s, opacity .15s; }
  .card.faded { opacity: .5; }
  .card.match { border-color: var(--teal); background: #0f8a800e; opacity: 1; }
  .cname { font-size: var(--fs-sm); font-weight: 650; color: var(--ink); display: flex; align-items: center; gap: 7px; }
  .cdesc { font-size: var(--fs-cap); color: var(--muted); margin-top: 2px; line-height: 1.5; }
  .mtag { font-size: 10px; font-weight: 600; padding: 1px 7px; border-radius: 99px; background: var(--teal); color: #fff; letter-spacing: .04em; }
  .loadbtn { margin-top: 8px; font-size: var(--fs-cap); padding: 4px 10px; border-radius: var(--r-sm); border: 1px dashed var(--teal); background: #0f8a8014; color: var(--teal-ink, #0b6b63); cursor: pointer; }
  .loadbtn:hover { background: #0f8a8026; }
  .loadedtag { display: inline-block; margin-top: 8px; font-size: var(--fs-cap); color: var(--teal-ink, #0b6b63); font-weight: 600; }

  .loaded { background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--r); padding: 10px 12px; margin: var(--sp-2) 0; }
  .howto { margin: 4px 0 0; padding-left: 18px; }
  .howto li { font-size: var(--fs-cap); color: var(--ink-2); line-height: 1.75; }

  .res { margin-top: var(--sp-2); }
  .rbox { border-radius: var(--r); padding: 10px 12px; font-size: var(--fs-sm); line-height: 1.6; background: #0f8a8012; border: 1px solid #0f8a8055; color: var(--teal-ink, #0b6b63); }
  .rbad { background: #e07f0e14; border-color: #e07f0e66; color: var(--accent-ink); }

  .note { font-size: var(--fs-cap); color: var(--muted); line-height: var(--lh-body); margin: var(--sp-2) 0 0; display: block; }

  .hint { font-size: var(--fs-cap); color: var(--muted); line-height: var(--lh-body); margin: var(--sp-3) 0 0; }
  .hint :global(b) { color: var(--ink-2); }
</style>
