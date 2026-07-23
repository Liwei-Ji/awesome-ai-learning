<script>
  /* Ch · AI 技能包（Skills）。重點：讓「技能包到底是什麼」一眼看懂。
     技能包＝一個自成一包的資料夾：外面只有名稱＋一句描述（agent 平時只看這個），
     裡面是完整手冊（SKILL.md）＋範本／腳本。平時只看得到名稱＋描述，用到才整包載入（漸進揭露）。
     互動：點開任一個技能，看它裡面裝了什麼。淺色、離線、示意。 */
  import { slide, fade } from 'svelte/transition';
  import { dur, D, ease } from '../lib/motion.js';
  import { i18n } from '../stores/i18n.svelte.js';
  import { Folder, FolderOpen, FileText, FileCode } from '@lucide/svelte';

  const L = {
    zh: {
      h3: '互動：打開一個技能包，看它裡面裝什麼',
      lede: '技能包不是「幾句提示」，而是一個<b>自成一包的資料夾</b>。平時 agent 只看得到每個技能的<b>名稱＋一句描述</b>；<b>用到時才整包載入</b>裡面的完整手冊與檔案。點開下面任一個看看。',
      shelfLabel: '平時 agent 只看得到這些（名稱＋描述）· 點開看裡面',
      instr: '指令',
      skills: [
        { id: 'brand', name: '品牌貼文', desc: '用品牌語氣寫社群貼文',
          steps: ['用第一人稱、親切但專業的語氣', '開頭一句 hook，結尾加行動呼籲', '固定 hashtag，字數上限 ≤200'],
          files: [{ name: 'post-template.md', note: '貼文範本' }, { name: 'brand-voice.md', note: '語氣參考' }] },
        { id: 'pr', name: 'PR 審查', desc: '照團隊清單逐項檢查 PR',
          steps: ['先確認有沒有對應的測試', '檢查命名、錯誤處理、邊界情況', '用建議語氣，標出「必改」與「可選」'],
          files: [{ name: 'review-checklist.md', note: '審查清單' }, { name: 'run-checks.sh', note: '自動檢查腳本', code: true }] },
        { id: 'deck', name: '財報投影片', desc: '把財報數字整理成投影片',
          steps: ['固定版型：摘要、營收、獲利、展望', '每頁一個重點數字＋同比', '最後附上風險與假設'],
          files: [{ name: 'deck-template.pptx', note: '投影片範本' }, { name: 'pull-figures.py', note: '抓數字腳本', code: true }] },
      ],
      anat: '<b>技能包＝一個資料夾</b>：外面一句<b>描述</b>（agent 平時只看這個），裡面是<b>完整手冊（SKILL.md）＋範本／腳本</b>。整包可分享、可版本控管。',
      hint: '重點：名稱＋描述<b>常駐可見</b>，讓 agent 判斷「這任務該用哪個技能」；<b>完整內容用到才載入</b>，所以塞幾百個技能也不爆上下文。改能力＝<b>換一個資料夾</b>，不用重新訓練。',
    },
    en: {
      h3: 'Interactive: open a skill and see what is inside',
      lede: 'A skill is not “a few prompts”, it is a <b>self-contained folder</b>. Normally the agent sees only each skill’s <b>name and one-line description</b>; it <b>loads the whole package</b> (the full playbook and files) only when a task needs it. Open any one below.',
      shelfLabel: 'Normally the agent only sees these (name + description) · open one to look inside',
      instr: 'instructions',
      skills: [
        { id: 'brand', name: 'Brand Post', desc: 'Write social posts in the brand voice',
          steps: ['First person, warm but professional tone', 'Open with a hook, end with a call to action', 'Fixed hashtags, length cap ≤200 chars'],
          files: [{ name: 'post-template.md', note: 'post template' }, { name: 'brand-voice.md', note: 'voice reference' }] },
        { id: 'pr', name: 'PR Review', desc: 'Check a PR against the team checklist',
          steps: ['Confirm there are matching tests first', 'Check naming, error handling, edge cases', 'Suggesting tone; mark “must-fix” vs “optional”'],
          files: [{ name: 'review-checklist.md', note: 'review checklist' }, { name: 'run-checks.sh', note: 'auto-check script', code: true }] },
        { id: 'deck', name: 'Report Deck', desc: 'Turn financial numbers into slides',
          steps: ['Fixed layout: summary, revenue, profit, outlook', 'One key number per slide, with year-over-year', 'End with risks and assumptions'],
          files: [{ name: 'deck-template.pptx', note: 'slide template' }, { name: 'pull-figures.py', note: 'figure-pulling script', code: true }] },
      ],
      anat: '<b>A skill = a folder</b>: a one-line <b>description</b> on the outside (all the agent normally sees), and inside the <b>full playbook (SKILL.md) plus templates / scripts</b>. The whole folder is shareable and version-controlled.',
      hint: 'Takeaway: name + description <b>stay visible</b> so the agent can judge “which skill fits this task”; the <b>full contents load only when needed</b>, so hundreds of skills fit without blowing up the context. To change a capability you <b>swap a folder</b>, no retraining.',
    },
    ja: {
      h3: 'インタラクティブ：スキルを開いて中身を見る',
      lede: 'スキルは「数個のプロンプト」ではなく、<b>自己完結したフォルダ</b>。普段 agent は各スキルの<b>名前と一行の説明</b>しか見ません。タスクで必要になったときだけ<b>まるごと読み込みます</b>（完全な手順書とファイル）。下のどれか開いてみてください。',
      shelfLabel: '普段 agent はこれだけ見える（名前＋説明）· 開いて中を見る',
      instr: '指令',
      skills: [
        { id: 'brand', name: 'ブランド投稿', desc: 'ブランドの声で SNS 投稿を書く',
          steps: ['一人称、親しみやすいが専門的な口調', '冒頭にフック、末尾に行動喚起', '固定ハッシュタグ、文字数上限 ≤200'],
          files: [{ name: 'post-template.md', note: '投稿テンプレ' }, { name: 'brand-voice.md', note: '口調の参考' }] },
        { id: 'pr', name: 'PR レビュー', desc: 'チームのチェックリストで PR を確認',
          steps: ['まず対応するテストがあるか確認', '命名・エラー処理・境界条件を点検', '提案する口調で「必須」と「任意」を区別'],
          files: [{ name: 'review-checklist.md', note: 'レビュー表' }, { name: 'run-checks.sh', note: '自動チェック', code: true }] },
        { id: 'deck', name: '決算スライド', desc: '決算の数字をスライドにまとめる',
          steps: ['固定版型：要約・売上・利益・見通し', '1 枚に重要数字 1 つ＋前年比', '最後にリスクと前提を添える'],
          files: [{ name: 'deck-template.pptx', note: 'スライド雛形' }, { name: 'pull-figures.py', note: '数字抽出スクリプト', code: true }] },
      ],
      anat: '<b>スキル＝フォルダ</b>：外側に一行の<b>説明</b>（agent が普段見るのはこれだけ）、中に<b>完全な手順書（SKILL.md）＋テンプレ／スクリプト</b>。フォルダごと共有でき、バージョン管理できる。',
      hint: 'ポイント：名前と説明は<b>常に見え</b>、agent が「このタスクにどのスキルか」を判断できる。<b>中身は必要なときだけ読み込む</b>ので、何百個あってもコンテキストは溢れない。能力を変える＝<b>フォルダを差し替える</b>だけ、再学習は不要。',
    },
  };

  let ui = $derived(L[i18n.locale] || L.zh);
  let open = $state(0); // 預設打開第一個，讓讀者立刻看到「裡面長什麼」
  const toggle = (i) => { open = open === i ? -1 : i; };
</script>

<div class="panel">
  <div class="panel-h"><h3>{ui.h3}</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">{@html ui.lede}</p>

  <div class="demo-stage light">
    <span class="k mono">{ui.shelfLabel}</span>
    <div class="shelf">
      {#each ui.skills as s, i (s.id)}
        {@const isOpen = open === i}
        <div class="folder" class:open={isOpen}>
          <button class="fhead" onclick={() => toggle(i)} aria-expanded={isOpen}>
            <span class="ficon">
              {#if isOpen}<FolderOpen size={17} strokeWidth={2} />{:else}<Folder size={17} strokeWidth={2} />{/if}
            </span>
            <span class="ftitle">
              <span class="fname">{s.name}</span>
              <span class="fdesc">{s.desc}</span>
            </span>
            <span class="caret" class:up={isOpen}>›</span>
          </button>

          {#if isOpen}
            <div class="fbody" transition:slide={{ duration: dur(D.base), easing: ease }}>
              <div class="skillmd">
                <span class="fline"><FileText size={14} strokeWidth={2} /><b class="fn">SKILL.md</b><span class="fnote">· {ui.instr}</span></span>
                <ol class="steps">
                  {#each s.steps as st, k}
                    <li in:fade={{ duration: dur(D.fast), delay: dur(k * 60) }}>{st}</li>
                  {/each}
                </ol>
              </div>
              <div class="files">
                {#each s.files as f}
                  <span class="file">
                    {#if f.code}<FileCode size={14} strokeWidth={2} />{:else}<FileText size={14} strokeWidth={2} />{/if}
                    <b class="fn">{f.name}</b><span class="fnote">{f.note}</span>
                  </span>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
    <p class="anat">{@html ui.anat}</p>
  </div>

  <p class="hint">{@html ui.hint}</p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .k { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: 8px; }

  .shelf { display: flex; flex-direction: column; gap: 8px; }
  .folder { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; transition: border-color .15s; }
  .folder.open { border-color: var(--teal); }

  .fhead { width: 100%; display: flex; align-items: center; gap: 10px; padding: 11px 13px; background: none; border: 0; cursor: pointer; text-align: left; }
  .fhead:hover { background: var(--surface-2); }
  .ficon { flex: none; color: var(--teal, #0f8a80); display: inline-flex; }
  .ftitle { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
  .fname { font-size: var(--fs-sm); font-weight: 650; color: var(--ink); }
  .fdesc { font-size: var(--fs-cap); color: var(--muted); line-height: 1.4; }
  .caret { flex: none; color: var(--muted); font-size: 18px; transition: transform .18s; transform: rotate(90deg); }
  .caret.up { transform: rotate(-90deg); }

  .fbody { border-top: 1px dashed var(--line-2); padding: 11px 13px 13px; background: var(--surface-2); }
  .skillmd { }
  .fline { display: flex; align-items: center; gap: 6px; font-size: var(--fs-cap); color: var(--ink-2); }
  .fline :global(svg) { color: var(--accent-ink); flex: none; }
  .fn { font-family: var(--mono); font-size: var(--fs-cap); font-weight: 600; color: var(--ink); }
  .fnote { color: var(--muted); font-weight: 400; }
  .steps { margin: 6px 0 0; padding-left: 30px; }
  .steps li { font-size: var(--fs-cap); color: var(--ink-2); line-height: 1.7; }

  .files { display: flex; flex-wrap: wrap; gap: 6px 14px; margin-top: 11px; padding-top: 10px; border-top: 1px solid var(--line); }
  .file { display: inline-flex; align-items: center; gap: 6px; font-size: var(--fs-cap); }
  .file :global(svg) { color: var(--muted); flex: none; }

  .anat { font-size: var(--fs-cap); color: var(--ink-2); line-height: var(--lh-body); margin: var(--sp-3) 0 0; padding-top: var(--sp-2); border-top: 1px solid var(--line); }
  .anat :global(b) { color: var(--ink); }

  .hint { font-size: var(--fs-cap); color: var(--muted); line-height: var(--lh-body); margin: var(--sp-3) 0 0; }
  .hint :global(b) { color: var(--ink-2); }
</style>
