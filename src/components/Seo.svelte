<script>
  /* SEO head 管理器：依目前路由（課程章／挑戰題／首頁）＋語言，
     就地更新 <title>、description、canonical、OG／Twitter 標籤。
     用 $effect 更新既有標籤（不新增重複節點）；純 client-side、無後端。
     元件本身不輸出任何畫面。 */
  import { nav } from '../stores/state.svelte.js';
  import { CH } from '../data/chapters.js';
  import { chOf } from '../data/localize.js';
  import { INTERVIEWS, ivOf } from '../data/interviews.js';
  import { t, i18n } from '../stores/i18n.svelte.js';

  const strip = (s) => (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const OG_LOCALE = { en: 'en_US', ja: 'ja_JP', zh: 'zh_TW' };
  const HTML_LANG = { en: 'en', ja: 'ja', zh: 'zh-Hant' };

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
    if (nav.current == null) {
      return { title: `${brand} · ${t('home.title')}`, desc: strip(t('home.lede')) };
    }
    const ch = chOf(nav.current);
    return { title: `${ch.t} · ${brand}`, desc: strip(ch.sub) };
  });

  // canonical：從 nav＋語言重建（比 location.href 可靠，因為 go() 用 replaceState 不觸發反應）
  let canonical = $derived.by(() => {
    if (typeof location === 'undefined') return '';
    const u = new URL(location.origin + location.pathname);
    if (nav.mode === 'interview') { if (nav.iv != null) u.searchParams.set('iv', nav.iv); }
    else if (nav.current != null) u.searchParams.set('ch', String(nav.current));
    if (i18n.locale !== 'zh') u.searchParams.set('lang', i18n.locale);
    return u.href;
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

  $effect(() => {
    document.title = meta.title;
    document.documentElement.lang = HTML_LANG[i18n.locale] || 'zh-Hant';
    setMeta('name', 'description', meta.desc);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.desc);
    setMeta('property', 'og:locale', OG_LOCALE[i18n.locale] || 'zh_TW');
    setMeta('property', 'og:url', canonical);
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.desc);
    setLink('canonical', canonical);
  });
</script>
