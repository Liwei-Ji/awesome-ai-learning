# e2e — 真實互動回歸測試

用 [`puppeteer-core`](https://pptr.dev) 驅動**本機系統 Chrome**（不下載 Chromium），
實際點擊、拖曳、打字，攔截 console／page error，並偵測「靜默失效」
（按鈕有反應但沒改到 state 的空輸出、effect 迴圈全站 crash 等）。
這是靜態截圖抓不到的一層。

## 執行

```bash
# 1. 起 dev server
npm run dev

# 2. 另一個終端機
npm run test:e2e                              # 預設 http://localhost:5173
npm run test:e2e -- http://localhost:4173     # 或指定網址（如 vite preview）
```

- 需要本機安裝 Google Chrome。若路徑非預設，設環境變數：
  `CHROME_PATH="/path/to/chrome" npm run test:e2e`
- 離開碼：全部通過 = `0`，任何 console/page error 或死互動 = `1`（可接 CI）。

## 測什麼

| 層次 | 方法 |
|------|------|
| 崩潰／錯誤 | 每章點爆所有按鈕、拉滿所有滑桿，攔 `pageerror`／`console.error`／404 |
| 靜默失效 | 比對互動前後 demo 文字；沒變化會標 ⚠ 供人工確認（純視覺變化屬正常） |
| AI 教授 | 開合、建議問題、打字送出、切章重置對話 |

> 註：純視覺變化（如高亮、SVG 動畫）不改 innerText，會被標 ⚠ 但不算失敗——
> 需要時再用 class/樣式斷言確認（見 git 歷史中的 confirm 腳本）。
