/* ============================================================
   學習進度（localStorage，離線／無帳號）。
   - done：走過的步驟集合，鍵＝`${k}:${ref}`（course:slug 或 iv:id）。
     跨路線共用：某一步做過，所有含它的路線都算完成。
   - celebrated：已慶祝過（自動彈證書）的路線 id，確保只自動彈一次。
   - name：學員姓名（結業證書用，選填）。
   - certFor：目前要顯示結業證書的路線 id（null＝不顯示）；跨元件觸發用。
   ============================================================ */
const KEY = 'aial:progress';
const CEL = 'aial:celebrated';
const NAME = 'aial:name';
const hasLS = typeof localStorage !== 'undefined';

function loadSet(key) {
  try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); } catch { return new Set(); }
}

export const progress = $state({
  done: hasLS ? loadSet(KEY) : new Set(),
  celebrated: hasLS ? loadSet(CEL) : new Set(),
  name: (hasLS && localStorage.getItem(NAME)) || '',
  certFor: null,
});

const save = (key, set) => { try { localStorage.setItem(key, JSON.stringify([...set])); } catch { /* 隱私模式等：略過 */ } };
const keyOf = (k, ref) => `${k}:${ref}`;

export function isDone(k, ref) { return progress.done.has(keyOf(k, ref)); }

export function markDone(k, ref) {
  const key = keyOf(k, ref);
  if (progress.done.has(key)) return;
  const next = new Set(progress.done); next.add(key);
  progress.done = next; save(KEY, next);
}

export function isCelebrated(id) { return progress.celebrated.has(id); }
export function markCelebrated(id) {
  if (progress.celebrated.has(id)) return;
  const next = new Set(progress.celebrated); next.add(id);
  progress.celebrated = next; save(CEL, next);
}

export function setName(n) {
  progress.name = n;
  try { localStorage.setItem(NAME, n); } catch { /* 略過 */ }
}

export function openCert(id) { progress.certFor = id; }
export function closeCert() { progress.certFor = null; }

/** 路線完成度：{ done, total, complete, courses, challenges } */
export function pathStats(path) {
  const steps = path ? path.phases.flatMap((ph) => ph.steps) : [];
  let done = 0, courses = 0, challenges = 0;
  for (const s of steps) {
    if (s.k === 'course') courses++; else challenges++;
    if (progress.done.has(keyOf(s.k, s.ref))) done++;
  }
  return { done, total: steps.length, complete: steps.length > 0 && done === steps.length, courses, challenges };
}
