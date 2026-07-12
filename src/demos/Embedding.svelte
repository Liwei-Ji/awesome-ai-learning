<script>
  /* Ch · Embedding 詞嵌入 · 語意星圖。
     30 個詞落在 2D 語意空間（示意投影），意義相近的自然聚成 5 團。
     模式：
       探索 — 鎖定一個詞看它的 top-5 最近鄰（連線+相似度%）；再滑到別的詞即時比較。
       拖曳 — 把詞拖到別團，最近鄰即時重算（親手改變「意義」）。
       向量運算 — 國王 − 男人 + 女人 = 皇后（平行四邊形精確命中）。
     相似度＝距離型高斯 sim=exp(-d²/σ²)（跟眼睛看到「哪顆最近」一致；hint 註明真實模型多用 cosine）。
     深色舞台、確定性、離線。 */
  import { onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import { dur, D, reduceMotion } from '../lib/motion.js';
  import { clamp } from '../lib/helpers.js';

  const W0 = [
    ['貓',20,20,'動物'],['狗',26,24,'動物'],['老虎',16,28,'動物'],['兔子',24,16,'動物'],['大象',12,22,'動物'],['馬',29,30,'動物'],
    ['蘋果',74,20,'食物'],['香蕉',82,18,'食物'],['麵包',76,28,'食物'],['米飯',85,26,'食物'],['披薩',80,14,'食物'],['咖啡',71,30,'食物'],
    ['快樂',20,74,'情緒'],['悲傷',26,83,'情緒'],['生氣',15,80,'情緒'],['害怕',29,74,'情緒'],['驚訝',22,88,'情緒'],['愛',31,79,'情緒'],
    ['電腦',74,76,'科技'],['手機',82,78,'科技'],['網路',76,85,'科技'],['程式',71,82,'科技'],['機器人',85,84,'科技'],['人工智慧',80,89,'科技'],
    ['男人',44,58,'皇室'],['女人',53,55,'皇室'],['國王',44,45,'皇室'],['皇后',53,42,'皇室'],['王子',37,52,'皇室'],['公主',49,50,'皇室'],
  ];
  const CLUSTERS = [
    { name: '動物', color: '#e07f0e' }, { name: '食物', color: '#e59418' },
    { name: '情緒', color: '#d98a9a' }, { name: '科技', color: '#0f8a80' }, { name: '皇室', color: '#9a8ad9' },
  ];
  const clColor = (c) => CLUSTERS.find((k) => k.name === c)?.color ?? '#e07f0e';

  // 群集星雲中心（原始座標平均）
  const CENTROIDS = CLUSTERS.map((c) => {
    const ws = W0.filter((w) => w[3] === c.name);
    return { name: c.name, color: c.color, x: ws.reduce((s, w) => s + w[1], 0) / ws.length, y: ws.reduce((s, w) => s + w[2], 0) / ws.length };
  });

  const SIGMA = 24;
  const SX = (mx) => 40 + (mx / 100) * 520;
  const SY = (my) => 30 + (my / 100) * 380;
  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const sim = (a, b) => Math.exp(-(dist(a, b) ** 2) / (SIGMA * SIGMA));
  const vec = (w) => [((w.x - 50) / 10).toFixed(1), ((50 - w.y) / 10).toFixed(1)];
  const byName = (n) => words.findIndex((w) => w.w === n);

  let words = $state(W0.map(([w, x, y, cl]) => ({ w, x, y, cl })));
  let mode = $state('explore');   // explore | drag | arith
  let lockId = $state(null);      // 鎖定的主角（探索/比較的 A）；預設不鎖，讓 hover 能預覽鄰居
  let hoverId = $state(0);         // 預設先示範聚焦在「貓」，滑到別的詞就換
  let dragId = $state(null);
  let showCoords = $state(true);
  let svgEl;

  let focusId = $derived(lockId ?? hoverId);
  let compareId = $derived(mode === 'explore' && lockId != null && hoverId != null && hoverId !== lockId ? hoverId : null);

  function neighborsOf(id, n = 5) {
    if (id == null) return [];
    return words.map((w, i) => ({ i, s: sim(words[id], w) }))
      .filter((o) => o.i !== id).sort((a, b) => b.s - a.s).slice(0, n);
  }
  let neighbors = $derived(neighborsOf(focusId));
  let neighborIds = $derived(new Set(neighbors.map((o) => o.i)));
  let pairSim = $derived(compareId != null ? Math.round(100 * sim(words[focusId], words[compareId])) : 0);
  let pairDist = $derived(compareId != null ? dist(words[focusId], words[compareId]).toFixed(1) : '0');

  function activeState(i) {
    if (i === lockId) return 'lock';
    if (i === compareId) return 'compare';
    if (i === focusId) return 'focus';
    if (neighborIds.has(i)) return 'near';
    return focusId != null ? 'dim' : 'idle';
  }

  // ---- 探索互動 ----
  function dotEnter(i) { if (mode === 'explore') hoverId = i; }
  function dotLeave() { if (mode === 'explore') hoverId = null; }
  function dotClick(i) {
    if (mode !== 'explore') return;
    lockId = lockId === i ? null : i; // 再點同一顆＝解除鎖定
  }

  // ---- 拖曳互動 ----
  function toMap(e) {
    const r = svgEl.getBoundingClientRect();
    const sx = (e.clientX - r.left) * (600 / r.width);
    const sy = (e.clientY - r.top) * (440 / r.height);
    return { mx: clamp(((sx - 40) / 520) * 100, 3, 97), my: clamp(((sy - 30) / 380) * 100, 3, 97) };
  }
  function dotDown(i, e) {
    if (mode !== 'drag') return;
    dragId = i; lockId = i; e.preventDefault();
    svgEl.setPointerCapture?.(e.pointerId);
  }
  function dragMove(e) {
    if (dragId == null) return;
    const { mx, my } = toMap(e);
    words[dragId].x = mx; words[dragId].y = my;
  }
  function dragEnd() { dragId = null; }
  function resetPositions() { words = W0.map(([w, x, y, cl]) => ({ w, x, y, cl })); }

  // ---- 向量運算 ----
  const EQS = [
    { label: '國王 − 男人 + 女人 = ？', a: '國王', minus: '男人', plus: '女人', answer: '皇后' },
    { label: '皇后 − 女人 + 男人 = ？', a: '皇后', minus: '女人', plus: '男人', answer: '國王' },
  ];
  let eqIdx = $state(0);
  let arithNonce = $state(0);
  let pp = $state(0);
  let eq = $derived(EQS[eqIdx]);
  let arith = $derived.by(() => {
    const base = words[byName(eq.a)], mi = words[byName(eq.minus)], pl = words[byName(eq.plus)], ans = words[byName(eq.answer)];
    const g = { x: pl.x - mi.x, y: pl.y - mi.y };
    const res = { x: base.x + g.x, y: base.y + g.y };
    return { base, mi, pl, ans, g, res,
      gDraw: clamp((pp - 0.2) / 0.3, 0, 1),
      ghost: clamp((pp - 0.5) / 0.28, 0, 1),
      reveal: pp > 0.78 };
  });
  function runArith() { pp = 0; arithNonce++; }

  $effect(() => {
    arithNonce; eqIdx;
    if (mode !== 'arith') return;
    if (reduceMotion) { pp = 1; return; }
    let raf, base; const ms = dur(2800) || 1;
    const step = (t) => { if (base === undefined) base = t; const p = Math.min(1, (t - base) / ms); pp = 1 - (1 - p) ** 3; if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  });

  function setMode(m) {
    mode = m; dragId = null; hoverId = null; // 清掉殘留 hover，避免漏進拖曳/運算模式
    if (m === 'arith') { resetPositions(); lockId = null; runArith(); } // 重設座標，保證平行四邊形精確命中
    else if (m === 'explore') { lockId = null; hoverId = 0; }
    else { lockId = null; } // 拖曳
  }

  onDestroy(() => {});
</script>

<div class="panel">
  <div class="panel-h"><h3>互動：詞語的「語意星圖」</h3><span class="eyebrow">★ Interactive</span></div>
  <p class="lede">
    電腦不懂字，只懂<b>數字向量</b>。把每個詞的向量畫成一個點，意義相近的詞位置就會靠在一起——
    自然分成動物、食物、情緒、科技、皇室五團。滑過任一個詞，看它<b>最像的鄰居</b>。
  </p>

  <div class="pills">
    <button class="pl" class:on={mode === 'explore'} onclick={() => setMode('explore')}>探索</button>
    <button class="pl" class:on={mode === 'drag'} onclick={() => setMode('drag')}>拖曳改變意義</button>
    <button class="pl" class:on={mode === 'arith'} onclick={() => setMode('arith')}>向量運算</button>
  </div>

  <div class="demo-stage light">
    <div class="grid">
      <div class="mapwrap">
        <span class="mono cap">語意地圖 · 2D 示意投影{mode === 'drag' ? '（可拖曳詞點）' : ''}</span>
        <svg class="map" viewBox="0 0 600 440" bind:this={svgEl}
          class:dragging={dragId != null}
          onpointermove={dragMove} onpointerup={dragEnd} onpointerleave={dragEnd} role="presentation">
          <defs>
            <radialGradient id="emb-dot" cx="38%" cy="30%" r="72%"><stop offset="0%" stop-color="#e07f0e" /><stop offset="100%" stop-color="#e07f0e" /></radialGradient>
            <radialGradient id="emb-teal" cx="38%" cy="30%" r="72%"><stop offset="0%" stop-color="#0f8a80" /><stop offset="100%" stop-color="#0f8a80" /></radialGradient>
            <filter id="emb-glow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="emb-neb" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="22" /></filter>
          </defs>

          <!-- 星雲 + 團名 -->
          {#each CENTROIDS as c}
            <circle cx={SX(c.x)} cy={SY(c.y)} r="92" fill={c.color} opacity="0.13" filter="url(#emb-neb)" />
          {/each}
          {#each CENTROIDS as c}
            <text class="cname" x={SX(c.x)} y={SY(c.y)} text-anchor="middle" fill={c.color}
              opacity={mode === 'explore' && focusId != null && words[focusId].cl !== c.name ? 0.22 : 0.5}>{c.name}</text>
          {/each}

          <!-- 探索：最近鄰連線 -->
          {#if mode !== 'arith' && focusId != null}
            {#each neighbors as nb}
              <line x1={SX(words[focusId].x)} y1={SY(words[focusId].y)} x2={SX(words[nb.i].x)} y2={SY(words[nb.i].y)}
                stroke="#0f8a80" stroke-width={0.6 + nb.s * 2.4} opacity={0.25 + nb.s * 0.6} stroke-linecap="round" />
            {/each}
          {/if}
          <!-- 比較：A–B 線 -->
          {#if compareId != null}
            <line x1={SX(words[focusId].x)} y1={SY(words[focusId].y)} x2={SX(words[compareId].x)} y2={SY(words[compareId].y)}
              stroke="#e07f0e" stroke-width="2" stroke-dasharray="5 4" opacity="0.85" />
          {/if}

          <!-- 向量運算圖層 -->
          {#if mode === 'arith'}
            <!-- g 方向：男人→女人 -->
            <line x1={SX(arith.mi.x)} y1={SY(arith.mi.y)}
              x2={SX(arith.mi.x + (arith.pl.x - arith.mi.x) * arith.gDraw)} y2={SY(arith.mi.y + (arith.pl.y - arith.mi.y) * arith.gDraw)}
              stroke="#9a8ad9" stroke-width="2.5" opacity="0.9" />
            <!-- base + g 幽靈箭頭 -->
            {#if arith.ghost > 0}
              <line x1={SX(arith.base.x)} y1={SY(arith.base.y)}
                x2={SX(arith.base.x + arith.g.x * arith.ghost)} y2={SY(arith.base.y + arith.g.y * arith.ghost)}
                stroke="#0f8a80" stroke-width="2.5" stroke-dasharray="5 5" opacity="0.85" />
              <circle cx={SX(arith.res.x)} cy={SY(arith.res.y)} r="14" fill="none" stroke="#0f8a80" stroke-width="1.6" opacity="0.8" filter="url(#emb-glow)" />
            {/if}
          {/if}

          <!-- 詞點 -->
          {#each words as w, i}
            {@const st = mode === 'arith'
              ? (w.w === eq.answer && arith.reveal ? 'lock' : (w.w === eq.a || w.w === eq.minus || w.w === eq.plus ? 'near' : 'dim'))
              : activeState(i)}
            <g class="dot {st}" in:fly={{ y: 8, duration: dur(D.base), delay: dur(i * 25), opacity: 0 }}>
              <circle class="dot-c" cx={SX(w.x)} cy={SY(w.y)} r={st === 'lock' || st === 'focus' ? 9 : 6}
                fill={st === 'lock' || st === 'focus' || st === 'near' ? 'url(#emb-teal)' : 'url(#emb-dot)'}
                filter="url(#emb-glow)"
                onpointerdown={(e) => dotDown(i, e)} onmouseenter={() => dotEnter(i)} onmouseleave={dotLeave} onclick={() => dotClick(i)} role="presentation" />
              <text class="wlabel dot-c" x={SX(w.x) + 10} y={SY(w.y) + 4}>{w.w}</text>
              {#if mode !== 'arith' && neighborIds.has(i)}
                <text class="pct" x={SX(w.x) + 10} y={SY(w.y) + 16}>{Math.round(sim(words[focusId], w) * 100)}%</text>
              {/if}
            </g>
          {/each}
        </svg>
      </div>

      <!-- 讀數面板 -->
      <div class="panelR">
        {#if mode === 'arith'}
          <div class="rt">向量運算</div>
          <p class="eqline">{eq.label}</p>
          <div class="btn-row">
            {#each EQS as e, i}<button class="pl sm" class:on={i === eqIdx} onclick={() => { eqIdx = i; }}>{e.label.split(' = ')[0]}</button>{/each}
          </div>
          <button class="btn primary rerun" onclick={runArith}>▶ 開始運算</button>
          {#if arith.reveal}
            <p class="answer" in:fly={{ y: 8, duration: dur(D.base) }}>= <b>{eq.answer}</b> 🎯</p>
            <p class="rnote">把「性別方向」平移到「{eq.a}」頭上，落點精確命中「{eq.answer}」。這就是詞向量能做<b>語意加減法</b>的原因。</p>
          {/if}
        {:else if focusId != null}
          <div class="rt">Embedding 詞嵌入</div>
          <div class="fcard">
            <div class="fw">{words[focusId].w}</div>
            <div class="mono vlab">電腦眼中 Vector = [{vec(words[focusId])[0]}, {vec(words[focusId])[1]}]</div>
          </div>
          {#if compareId != null}
            <div class="cmp">
              <div class="mono crow"><b style="color:var(--accent)">{words[focusId].w}</b> vs <b style="color:var(--teal)">{words[compareId].w}</b> · 距離 {pairDist}</div>
              <div class="gauge"><div class="gfill" style="width:{pairSim}%"></div></div>
              <div class="gnum">相似度 <b>{pairSim}%</b></div>
            </div>
          {:else}
            <div class="mono nbcap">最近的鄰居 TOP 5</div>
            {#each neighbors as nb}
              <div class="nb">
                <span class="nw">{words[nb.i].w}</span>
                <div class="nbar"><div class="nfill" style="width:{Math.round(nb.s * 100)}%"></div></div>
                <span class="np">{Math.round(nb.s * 100)}%</span>
              </div>
            {/each}
          {/if}
        {:else}
          <div class="rt">語意星圖</div>
          <p class="rnote">滑過任一個詞，看它最像的鄰居；<b>點一下</b>可鎖定，再滑到別的詞比較相似度。</p>
        {/if}

        <div class="legend">
          {#each CLUSTERS as c}<span><i class="d" style="background:{c.color}"></i>{c.name}</span>{/each}
        </div>
        <p class="disc mono">2D 示意投影：真實 embedding 有數百維，此處壓成 2D 方便觀察。</p>
      </div>
    </div>
  </div>

  <div class="btn-row">
    {#if mode === 'drag'}<button class="btn ghost" onclick={resetPositions}>重設位置</button>{/if}
    {#if mode === 'explore'}<button class="btn ghost" onclick={() => { lockId = null; hoverId = null; }}>清除鎖定</button>{/if}
  </div>

  <p class="hint">
    這就是 <b>Embedding 詞嵌入</b>：把詞變成向量後，「意義相近」變成「位置相近」，相似度就能<b>用數學算出來</b>。
    （本示範用距離；真實模型多用<b>餘弦相似度 cosine</b>，精神相同——都是量兩個向量有多接近。座標為 2D 示意。）
  </p>
</div>

<style>
  .lede { margin: 0 0 var(--sp-3); color: var(--ink-2); font-size: var(--fs-body); line-height: var(--lh-body); }
  .pills { display: flex; gap: var(--sp-2); flex-wrap: wrap; margin-bottom: 10px; }
  .pl { font-size: var(--fs-cap); padding: 6px 13px; border-radius: 99px; border: 1px solid var(--line-2); background: var(--surface-2); color: var(--ink-2); }
  .pl.sm { font-size: var(--fs-micro); padding: 5px 10px; }
  .pl:hover { border-color: var(--accent); color: var(--accent-ink); }
  .pl.on { background: var(--accent); border-color: transparent; color: #3a1e00; font-weight: 600; }

  .grid { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(210px, 1fr); gap: var(--sp-4); }
  @media (max-width: 720px) { .grid { grid-template-columns: 1fr; } }
  .cap { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); display: block; margin-bottom: var(--sp-1); }
  .map { width: 100%; height: auto; display: block; touch-action: none; }
  .map.dragging { cursor: grabbing; }
  .map .cname { font-size: var(--fs-sm); font-family: var(--mono); letter-spacing: .3em; transition: opacity .3s; pointer-events: none; }
  .map .wlabel { font-size: var(--fs-sm); fill: var(--ink-2); font-family: var(--sans); pointer-events: none; }
  .map .pct { font-size: var(--fs-micro); fill: var(--teal); font-family: var(--mono); pointer-events: none; }
  .dot .dot-c { transition: opacity .3s; }
  .map:not(.dragging) .dot circle { transition: cx .3s, cy .3s, r .2s, opacity .3s; }
  .dot.dim { opacity: 0.18; }
  .dot.idle, .dot.near, .dot.focus, .dot.lock, .dot.compare { opacity: 1; }
  .dot circle[role] { cursor: pointer; }

  .panelR { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 12px 14px; }
  .rt { font-family: var(--mono); font-size: var(--fs-eyebrow); letter-spacing: .12em; color: var(--muted); margin-bottom: var(--sp-2); }
  .fcard { margin-bottom: 10px; }
  .fw { font-size: 22px; font-weight: 700; color: var(--ink); }
  .vlab { font-size: var(--fs-micro); color: var(--accent); margin-top: 2px; }
  .nbcap { font-size: var(--fs-micro); letter-spacing: .1em; color: var(--muted); margin: 6px 0; }
  .nb { display: grid; grid-template-columns: 54px 1fr 40px; align-items: center; gap: var(--sp-2); margin: 5px 0; }
  .nw { font-size: var(--fs-sm); color: var(--ink-2); }
  .nbar { height: 8px; border-radius: 99px; background: var(--surface-3); overflow: hidden; }
  .nfill { height: 100%; background: var(--teal); border-radius: 99px; transition: width .4s cubic-bezier(.2,.7,.2,1); }
  .np { font-family: var(--mono); font-size: var(--fs-micro); color: var(--teal); text-align: right; }
  .cmp { margin-top: var(--sp-2); }
  .crow { font-size: var(--fs-cap); color: var(--muted); margin-bottom: 6px; }
  .gauge { height: 12px; border-radius: 99px; background: var(--surface-3); overflow: hidden; }
  .gfill { height: 100%; background: var(--teal); border-radius: 99px; transition: width .5s cubic-bezier(.2,.7,.2,1); }
  .gnum { font-size: var(--fs-sm); color: var(--ink-2); margin-top: 6px; }
  .gnum b { color: var(--teal); font-family: var(--mono); font-size: var(--fs-lg); }
  .eqline { font-size: var(--fs-lede); color: var(--ink); margin: 4px 0 8px; }
  .rerun { margin: 4px 0 8px; }
  .answer { font-size: 20px; color: var(--teal); margin: 6px 0; }
  .answer b { color: var(--ink); }
  .rnote { font-size: var(--fs-cap); color: var(--muted); line-height: 1.6; }

  .legend { display: flex; gap: var(--sp-3); flex-wrap: wrap; margin-top: var(--sp-4); font-size: var(--fs-eyebrow); color: var(--muted); }
  .legend i { display: inline-block; width: 8px; height: 8px; border-radius: 3px; margin-right: var(--sp-1); vertical-align: middle; }
  .disc { font-size: var(--fs-micro); color: var(--muted); margin-top: var(--sp-2); line-height: 1.5; }

  .status { font-size: var(--fs-sm); font-weight: 550; color: var(--accent-ink); margin: var(--sp-3) 0 0; }
</style>
