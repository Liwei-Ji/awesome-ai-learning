---
name: promo-video
description: Produce a promotion video (HTML animatic first, then convert to video) for the Awesome AI Learning platform. Use whenever the user asks to make, produce, or update a promo / marketing / LinkedIn video. Always asks up front whether it is a PRODUCT intro or a single COURSE, and which course.
---

# promo-video

Produce a promotion piece for **Awesome AI Learning** (內部：AI 學院). Build a self-contained
**HTML animatic** first (fast to preview and iterate), confirm with the user, then convert to
actual video. The canonical brief is `marketing/AI_learning_platform_video_prompt.md`; read it
before building. Product visual tokens live in `src/styles/tokens.css`.

## Step 1: Ask the perspective (always, unless the user already said)

Use AskUserQuestion:
1. **Product intro, or a single course?** These are different pieces, never mix them.
2. If **course**: **which course?** The 29 lessons are keyed by slug in `src/data/chapters.js`
   (`DATA` + `OUTLINE`). Offer the visually strongest ones first (see the demo list below), and
   let them type any slug.

Do not start building until this is answered.

## Step 2: Gather accurate content (never invent product facts)

- Product facts (keep exact): 29 lessons, 64 challenges, 12 learning paths, interactive demos,
  trilingual (en/ja/zh), 100% offline (no runtime LLM), free, open source,
  URL `awesome-ai-learning.vercel.app`. Re-derive counts from the repo if unsure
  (`chapters.js` TOTAL, `interviews.js` IV_ORDER length, `paths.js` PATHS length).
- **Never put a changing count in on-screen copy.** Lesson / challenge / path totals grow over time, and
  a posted video cannot be updated, so an exact number goes stale. Use neutral phrasing on screen
  ("dozens of challenges", "guided learning paths", "a full course"). The exact counts above are for
  internal reference only, not for the video.
- For a **course** video, pull the real English copy for that slug from:
  `src/data/i18n/chapters.js` (`CH_TR.en[slug]` title/sub/key/terms),
  `src/data/bodies.js` (`BODIES[slug].en`), `src/data/knowledge/en/<slug>.js` (notes),
  `src/data/practice.js` (`PRACTICE[slug]` en). Do not paraphrase into something inaccurate.

## Step 3: Build the animatic (hard conventions)

Write a **standalone self-contained HTML** file (all CSS/JS inline, no external assets) to:
- product: `marketing/video-product.html`
- course: `marketing/video-course-<slug>.html`

Conventions (all mandatory):
- **English only.** Narration and burned captions are English. In the **product** piece, verbally
  mention the trilingual (English / 日本語 / 繁中) feature in one line; do NOT animate language
  switching.
- **Match the product style (light Editorial), not dark cinematic.** Use the tokens below. Restrained
  color, generous whitespace, hairline dividers, comfortable line-height. Motion is subtle and clean
  (fades, small rises, one accent per scene), not flashy.
- **No chrome.** No persistent wordmark, logo dot, "AI 學院" label, top-right tag, or footer URL, and no
  decorative orb on the closing scene. Brand is carried only by the opening eyebrow and the closing URL.
- **Music + motion sync.** Reference a local `background_music.mp3` in the same folder (relative src),
  started on the first user gesture, looping, with a mute toggle. Drive a subtle beat-reactive pulse with a
  Web Audio AnalyserNode (a breathing accent glow, a progress-bar glow) so the animation moves with the
  music. Do not embed copyrighted audio in the file; reference the local mp3. If the user gives a BPM, also
  snap scene cuts to bars for tighter sync.
- **LinkedIn first: 16:9 master.** Autoplay is muted on LinkedIn, so **burn captions into the frame**
  and put the hook in the first 3 seconds. Also make a 1:1 variant easy (a `?ar=1x1` switch or a note).
  Length ~45 to 75s. Professional, credible tone.
- **No em-dashes** (em-dash, en-dash, or horizontal bar) anywhere. Use ：，（）／→.
- Provide `?clean=1` (hide all chrome for recording), autoplay + loop, and Space/R controls.
- Expose `window.__jump(i)` and set a fixed frame so it renders deterministically for verification.

### Brand tokens (light, from src/styles/tokens.css)
```
--bg:#eef1f6; --surface:#ffffff; --surface-2:#f6f8fb; --surface-3:#eceff5;
--ink:#141821; --ink-2:#3b4557; --muted:#5b6678; --line:#dde3ec; --line-2:#c6cfdd;
--accent:#e07f0e; --accent-soft:#f6a940; --accent-ink:#a85a08;
--teal:#0f8a80; --teal-soft:#3fb6a8; --good:#1f9d57; --warn:#d69200; --crit:#d23f3f;
--mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
--sans:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang TC","Noto Sans TC",sans-serif;
--r:12px; --e-2:0 3px 10px rgba(20,30,55,.06); --e-3:0 14px 36px rgba(20,30,55,.11);
```

### Product piece: storytelling arc (not a feature list)
1. The moment: everyone uses AI, few understand it. Hook caption: "Using AI is not the same as understanding it."
2. The gap: tutorials teach tricks, not how the machine works.
3. The turn: a guided, hands-on path to actually understand it.
4. Show it: 2 to 4 signature interactive demos (tokenizer, attention, RAG, a model's knowledge).
5. The depth: 64 judgment challenges, learning paths, a completion certificate.
6. The values (one line): trilingual (en/ja/zh), offline, free, open source.
7. CTA: the URL.

### Course piece: single-concept arc
1. Hook: the question this concept answers (e.g., "How does a model know what it knows?").
2. The misconception it clears up.
3. The mechanism, shown with that course's demo metaphor (see below).
4. One practical takeaway (pull from that lesson's "In practice").
5. Soft CTA: "One lesson in Awesome AI Learning" + URL.

### Intro animation variants (the opening supports at least 6, via ?intro=1..6)
Same story, identical copy, different opening entrance. Driven by a class `intro-N` on the first scene.
1. Rise: eyebrow, headline, sub fade and translate up in sequence (default).
2. Fade: gentle opacity only, no movement. Calm and corporate.
3. Wipe: headline revealed left to right by a clip-path mask.
4. Blur: headline starts blurred and sharpens into focus.
5. Zoom: headline scales up slightly from the left as it fades in.
6. Word by word: each headline word rises in one after another (kinetic).
When you add a new one, append it here so the menu keeps growing.
When the user wants to compare them, emit one file per variant with the intro baked in as the default,
named `video-product_1.html` through `video-product_6.html`, and annotate each in its `<title>` and a top comment.

### Signature demos and their visual metaphor (for the "show it" beats)
- `tokenizer`: text splitting into colored token chips.
- `embedding`: points clustering by meaning.
- `transformer`: attention weights lighting between words (or an attention matrix).
- `llm`: next-token probability bars building a sentence.
- `model-knowledge`: a cutoff timeline; an after-cutoff question fails, then a connected source answers it (the strongest single visual).
- `rag`: retrieve (docs light up) then generate, with a source cite.
- `generative`: diffusion, noise resolving into an image.
- `agent`: a goal splitting into steps and tool calls.

## Step 4: Verify before claiming done

Render the file with headless Chrome (puppeteer-core via `/Applications/Google Chrome.app`), jumping
to several scenes via `window.__jump(i)`, and screenshot to confirm layout, captions, and that no
em-dashes appear. Fix spacing so visuals never overlap the caption. Open via
`file://` + encodeURI(path) + `?clean=1`.

## Step 5: Deliver + convert to video

- Tell the user how to preview: open the file, it autoplays and loops; `?clean=1` for recording.
- Convert to video: if `ffmpeg` is installed, capture frames headless and encode an MP4
  (16:9 master, plus 1:1). If not, the simplest path is screen-recording `?clean=1` fullscreen.
- LinkedIn reminders: 16:9 or 1:1, captions burned, hook in first 3s, professional tone, ~45 to 75s.

## Audio (free, verify each license for commercial use)
The animatic plays a local `background_music.mp3` (supplied by the user, placed next to the HTML) and
pulses a beat-reactive glow via AnalyserNode. To source or replace that track, free options:
- Music beds: YouTube Audio Library (many tracks need no attribution), Pixabay Music, Uppbeat (free tier with credit), Free Music Archive, Bensound (with credit), Incompetech / Kevin MacLeod (attribution).
- SFX (whoosh, tick, pop, chime): Pixabay SFX, Mixkit (free, no attribution), freesound.org (CC0 or CC-BY, check per file), Zapsplat (free with account).
- For this product: one calm, forward-moving electronic bed plus subtle transition ticks on scene changes. Keep it understated and credible for LinkedIn. Confirm commercial-use rights and add any required credit in the post.

## Notes
- `marketing/promo-animatic.html` is the early dark/9:16 exploration; it does not match this spec and
  should be replaced by output from this skill.
- Everything stays frontend-only and offline; the video is marketing collateral, not part of the app.
