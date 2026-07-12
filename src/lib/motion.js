/* ============================================================
   動畫系統 —— 全站動畫的單一調校點（professional = 節奏一致 + 有減速感）。

   原則：
     · 動畫是對「數值」補間，不是靠 setTimeout 硬改 DOM。
     · 緩動幾乎不用線性；狀態轉場用 ease-out，往返強調用 in-out。
     · 連續跟隨（拖曳）用 snappy spring/短時長；一次性進場用較長 + stagger。
     · 一律尊重 prefers-reduced-motion：時長歸零＝瞬間切換、功能不變。
   ============================================================ */
import { cubicOut, cubicInOut } from 'svelte/easing';

export const reduceMotion =
  typeof matchMedia !== 'undefined' &&
  matchMedia('(prefers-reduced-motion:reduce)').matches;

/** 依 reduce-motion 給出實際時長（ms） */
export const dur = (ms) => (reduceMotion ? 0 : ms);

/** 統一緩動 */
export const ease = cubicOut;
export const easeInOut = cubicInOut;

/** 統一時長階層 */
export const D = { fast: 260, base: 440, slow: 700 };

/** spring 預設：拖曳即時跟隨用 snappy，一般狀態轉場用 soft */
export const spring = {
  soft: { stiffness: 0.1, damping: 0.7 },
  snappy: { stiffness: 0.22, damping: 0.85 },
};

/** Tween/transition 選項糖 */
export const tween = (ms = D.base, easing = cubicOut) => ({ duration: dur(ms), easing });
