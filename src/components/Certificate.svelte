<script>
  /* 結業證書：走完一條路線時彈出（也可從側欄重開）。純前端、可截圖分享。
     姓名選填，存 localStorage。日期取當下。 */
  import { pathText, pathById } from '../data/paths.js';
  import { progress, pathStats, setName, closeCert } from '../stores/progress.svelte.js';
  import { goPath, hrefPath, onNav } from '../stores/state.svelte.js';
  import { t, i18n } from '../stores/i18n.svelte.js';
  import { scale, fade } from 'svelte/transition';

  let { path } = $props();
  let tx = $derived(pathText(path, i18n.locale));
  let stats = $derived(pathStats(path));
  let nextPath = $derived(path?.next ? pathById(path.next) : null);
  const today = new Date().toISOString().slice(0, 10);
  const bits = Array.from({ length: 22 }, (_, i) => i);
  const colors = ['var(--accent)', 'var(--teal)', '#3f8a5b', '#4e6e96'];
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && closeCert()} />

<div class="cx" transition:fade={{ duration: 140 }}>
  <button class="cx-bg" aria-label={t('paths.certClose')} onclick={closeCert}></button>

  <div class="confetti" aria-hidden="true">
    {#each bits as i}
      <span style="left:{(i * 4.6 + 3) % 100}%; background:{colors[i % 4]}; animation-delay:{(i % 6) * 0.13}s; animation-duration:{2.2 + (i % 4) * 0.35}s;"></span>
    {/each}
  </div>

  <div class="cert" transition:scale={{ start: 0.9, duration: 280 }} role="dialog" aria-modal="true" aria-label={t('paths.certView')}>
    <div class="seal"><img src="/emblem.png" alt="" /></div>
    <p class="ck">{t('paths.certKicker')}</p>
    <p class="cmotto">{t('home.title')}</p>
    <p class="cong">{t('paths.certCongrats')}</p>
    <p class="verb">{t('paths.certVerb')}</p>
    <h2 class="ctitle">{tx.title}</h2>
    <input class="cname" placeholder={t('paths.certName')} value={progress.name} oninput={(e) => setName(e.target.value)} maxlength="24" autocomplete="off" />
    <div class="cov">{stats.total} {t('paths.certStep')} · {stats.courses} {t('paths.certLesson')} · {stats.challenges} {t('paths.certChallenge')}</div>
    <div class="cdate">{today}</div>
    <p class="chint">{t('paths.certShareHint')}</p>
    {#if nextPath}
      <a class="cnext" href={hrefPath(nextPath.id)} onclick={(e) => onNav(e, () => { closeCert(); goPath(nextPath.id); })}>
        {t('paths.certNext')} · {pathText(nextPath, i18n.locale).title} →
      </a>
    {/if}
    <button class="cclose" onclick={closeCert}>{t('paths.certClose')}</button>
  </div>
</div>

<style>
  .cx { position: fixed; inset: 0; z-index: 200; display: grid; place-items: center; padding: 20px; }
  .cx-bg { position: absolute; inset: 0; border: none; background: rgba(16, 20, 28, .55); cursor: pointer; }

  .cert {
    position: relative; z-index: 2; width: min(440px, 100%);
    background: var(--surface); color: var(--ink);
    border: 1px solid var(--line); border-radius: 18px;
    box-shadow: 0 24px 70px rgba(10, 16, 30, .34);
    padding: 40px 34px 26px; text-align: center;
  }
  /* 內框：證書感的雙線 */
  .cert::before {
    content: ""; position: absolute; inset: 10px; border: 1px solid var(--line-2); border-radius: 12px; pointer-events: none;
  }

  .seal {
    width: 88px; height: 88px; margin: 0 auto 16px; border-radius: 50%;
    overflow: hidden; background: transparent;
  }
  .seal img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.12); display: block; }

  .ck { font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: var(--accent-ink); margin: 0 0 7px; }
  .cmotto { font-size: 13px; color: var(--ink-2); margin: 0 0 16px; text-wrap: balance; }
  .cong { font-size: 13px; color: var(--muted); margin: 0 0 4px; }
  .verb { font-size: 13px; color: var(--ink-2); margin: 0 0 8px; }
  .ctitle { font-size: 26px; font-weight: 750; letter-spacing: var(--ls-tight); line-height: 1.2; margin: 0 0 18px; text-wrap: balance; }

  .cname {
    width: 100%; max-width: 240px; text-align: center; margin: 0 auto 16px; display: block;
    background: transparent; border: none; border-bottom: 1px solid var(--line-2);
    padding: 6px 4px; font-family: inherit; font-size: 15px; color: var(--ink); outline: none;
  }
  .cname:focus { border-bottom-color: var(--accent); }
  .cname::placeholder { color: var(--muted); }

  .cov { font-family: var(--mono); font-size: 12.5px; color: var(--ink-2); }
  .cdate { font-family: var(--mono); font-size: 12px; color: var(--muted); margin-top: 4px; }
  .chint { font-size: 11.5px; color: var(--muted); margin: 18px 0 16px; }
  .cclose {
    border: 1px solid var(--line); background: var(--surface-2); color: var(--ink-2);
    font-size: 13px; font-weight: 600; padding: 8px 22px; border-radius: var(--r-sm); cursor: pointer; transition: .15s;
  }
  .cclose:hover { border-color: var(--accent); color: var(--accent-ink); }
  .cnext {
    display: block; width: fit-content; margin: 0 auto 10px; text-decoration: none;
    background: var(--accent); color: #3a1e00; font-size: 13.5px; font-weight: 700;
    padding: 9px 24px; border-radius: var(--r-sm); transition: .15s;
  }
  .cnext:hover { background: var(--accent-soft); }

  .confetti { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 1; }
  .confetti span { position: absolute; top: -12px; width: 8px; height: 12px; border-radius: 2px; opacity: .9; }

  @media (prefers-reduced-motion: no-preference) {
    .confetti span { animation-name: fall; animation-timing-function: ease-in; animation-iteration-count: infinite; }
    @keyframes fall {
      0% { transform: translateY(-12px) rotate(0deg); opacity: 0; }
      12% { opacity: .95; }
      100% { transform: translateY(90vh) rotate(560deg); opacity: 0; }
    }
    .seal { animation: stamp .5s cubic-bezier(.2, 1.4, .5, 1) both; }
    @keyframes stamp {
      0% { transform: scale(1.6) rotate(-14deg); opacity: 0; }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
  }
  @media (prefers-reduced-motion: reduce) { .confetti { display: none; } }
</style>
