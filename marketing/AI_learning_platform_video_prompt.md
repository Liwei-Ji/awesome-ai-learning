# Awesome AI Learning 宣傳影片 Brief（canonical）

這份是宣傳影片的定案準則。實際製作流程寫在 `.claude/skills/promo-video`（可用 `/promo-video` 觸發）。
每次要做影片，先讀這份，再依技能問「產品篇 or 課程篇」。

---

## 1. 定位 Positioning
核心：**懂原理**。一句話 hook：**Using AI ≠ Understanding it（會用 AI 不等於懂 AI）**。
我們不是「教你用 AI 工具做文案／圖／影片」的產品，而是「讓你真正看懂 AI 怎麼運作」。文案不得回到工具實作的舊調性。

## 2. 語言 Language
- 影片一律 **英文旁白 ＋ 英文字幕**，不做語言切換動畫。
- 但在**產品篇**的介紹裡，要用講的**提到「三語 English / 日本語 / 繁中」是產品特色**（一句話帶過即可，不用畫面翻頁）。

## 3. 風格 Style（對齊產品本身）
影片要**貼合產品的視覺語言**：Editorial 亮色風，不要暗色電影感（那跟產品不一致）。
直接沿用產品 tokens（見 `src/styles/tokens.css`）：
- 亮底 `--bg #eef1f6`、白面板 `--surface #fff`、深墨字 `--ink #141821`。
- 克制用色：主色橙 `--accent #e07f0e`，輔色 teal `--teal #0f8a80`，其餘走灰階。
- 細線分隔 `--line #dde3ec`、大量留白、舒適行高（`--lh-body 1.65`）。
- 字體 `--sans`（system / PingFang）標題，`--mono` 當 eyebrow／數據標籤。
- 圓角 `--r 12px`，陰影用細膩 elevation（非漸層光暈）。

## 4. 敘事 Storytelling（產品篇專用）
產品篇要用**故事線**，不是功能列點。基本 arc：
1. The moment：人人都在用 AI，卻很少人真的懂它。
2. The gap：教學一堆，但都在教技巧，不是教這台機器怎麼運作。
3. The turn：於是有了一條「動手就能看懂」的路。
4. Show it：互動 demo（tokenizer、attention、RAG、模型的知識…）。
5. The depth：判斷題、學習路線、結業證書。
6. The values：三語、離線、免費、開源。
7. CTA：網址。

## 5. 兩種視角（分開處理）
- **產品篇 Product**：介紹整個平台，走上面的故事線。
- **課程篇 Course**：單獨深講**一堂課**，把那個概念用它的互動 demo 講清楚，最後輕輕帶到「這是 Awesome AI Learning 的其中一課」。
這兩種訴求不同，不要混做。由 `/promo-video` 技能在開始時詢問：**要產品篇還是課程篇？課程篇的話，哪一課？**

## 6. 平台 Platform
- 主要發 **LinkedIn** → 主格式 **16:9**（備選 1:1）。9:16 只當之後轉投 Reels/Shorts 時再切。
- LinkedIn 靜音自動播放：**字幕一定燒進畫面**，前 3 秒就要有 hook。
- 語氣專業、可信；長度約 **45 至 75 秒**。

## 7. 產品事實 Facts（文案取用，需正確）
29 lessons、64 challenges、12 learning paths、interactive demos、trilingual（en/ja/zh）、100% offline（no runtime LLM）、free、open source。
URL：`awesome-ai-learning.vercel.app`

注意：影片畫面上**不要寫死會變動的數字**（課數、題數、路線數），因為影片發布後改不了，數字一加就過時。畫面用中性說法（例如 dozens of challenges、a full course、guided learning paths）；上面的精確數字只當內部參考。

## 8. 硬規則
- 文案**不得出現破折號**（em-dash、en-dash、橫線），改用 ：，（）／→。
- 先用**自足 HTML animatic** 預覽（快、可改），確認沒問題**才**轉影片（螢幕錄影，或裝了 ffmpeg 由程式輸出 MP4）。
- HTML 自足：CSS/JS 全部內嵌，不連外部資源。

## 附註
`promo-animatic.html` 是最早的探索版（暗色、9:16、含語言切換），與本 Brief 不符，之後由 `/promo-video` 依此規格重做取代。
