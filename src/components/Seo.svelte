<script>
  /* SEO head 管理器：依目前路由（課程章／挑戰題／首頁）＋語言，
     就地更新 <title>、description、canonical、OG／Twitter 標籤。
     用 $effect 更新既有標籤（不新增重複節點）；純 client-side、無後端。
     元件本身不輸出任何畫面。 */
  import { nav } from '../stores/state.svelte.js';
  import { chOf } from '../data/localize.js';
  import { INTERVIEWS, ivOf } from '../data/interviews.js';
  import { pathById, pathText } from '../data/paths.js';
  import { t, i18n } from '../stores/i18n.svelte.js';
  import { buildPath } from '../lib/router.js';

  const strip = (s) => (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const OG_LOCALE = { en: 'en_US', ja: 'ja_JP', zh: 'zh_TW' };
  const HTML_LANG = { en: 'en', ja: 'ja', zh: 'zh-Hant' };
  // hreflang：[內部 locale, hreflang 代碼]
  const HREFLANG = [['en', 'en'], ['ja', 'ja'], ['zh', 'zh-Hant']];

  let brand = $derived(t('brand'));

  // 依路由＋語言算出本頁的 title / description
  let meta = $derived.by(() => {
    const loc = i18n.locale;
    if (nav.mode === 'interview') {
      if (nav.iv && INTERVIEWS[nav.iv]) {
        const c = ivOf(nav.iv, loc);
        return { title: `${c.q} · ${brand}`, desc: strip(c.trap) };
      }
      return { title: `${t('iv.interview')} · ${brand}`, desc: strip(t('iv.landingLede')) };
    }
    if (nav.mode === 'browse') {
      const key = nav.browse === 'challenges' ? 'browse.challengesTitle' : 'browse.lessonsTitle';
      return { title: `${t(key)} · ${brand}`, desc: strip(t('browse.lede')) };
    }
    if (nav.mode === 'paths') {
      if (nav.path) {
        const tx = pathText(pathById(nav.path), loc);
        return { title: `${tx.title} · ${brand}`, desc: strip(tx.tagline) };
      }
      return { title: `${brand} · ${t('home.title')}`, desc: strip(t('home.lede')) };
    }
    if (nav.current == null) {
      return { title: `${brand} · ${t('home.title')}`, desc: strip(t('home.lede')) };
    }
    const ch = chOf(nav.current);
    return { title: `${ch.t} · ${brand}`, desc: strip(ch.sub) };
  });

  // 本頁路由（語言之外），供 canonical 與 hreflang 各語言重建路徑用
  let route = $derived({ mode: nav.mode, current: nav.current, iv: nav.iv, path: nav.path, browse: nav.browse });
  let canonical = $derived.by(() => {
    if (typeof location === 'undefined') return '';
    return location.origin + buildPath({ ...route, locale: i18n.locale });
  });

  function setMeta(attr, key, val) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
    el.setAttribute('content', val);
  }
  function setLink(rel, href) {
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); }
    el.setAttribute('href', href);
  }
  function setAlt(hreflang, href) {
    let el = document.head.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', 'alternate');
      el.setAttribute('hreflang', hreflang);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  }

  $effect(() => {
    document.title = meta.title;
    document.documentElement.lang = HTML_LANG[i18n.locale] || 'en';
    setMeta('name', 'description', meta.desc);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.desc);
    setMeta('property', 'og:locale', OG_LOCALE[i18n.locale] || 'en_US');
    setMeta('property', 'og:url', canonical);
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.desc);
    setLink('canonical', canonical);
    // hreflang 三語互指 + x-default（指向英文，主要語言）
    if (typeof location !== 'undefined') {
      const origin = location.origin;
      for (const [loc, hl] of HREFLANG) setAlt(hl, origin + buildPath({ ...route, locale: loc }));
      setAlt('x-default', origin + buildPath({ ...route, locale: 'en' }));
    }
  });
</script>
