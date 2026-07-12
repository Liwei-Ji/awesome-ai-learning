/* 純函式小工具（無副作用），供各 demo 共用。 */

/** 把 x 夾在 [a, b] 之間 */
export const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

/** Sigmoid：把任意實數擠壓到 (0, 1)，神經網路活化用 */
export const sig = (x) => 1 / (1 + Math.exp(-x));
