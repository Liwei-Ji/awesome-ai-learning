# Awesome AI Learning 宣傳影片：實拍鏡位清單 + 多平台剪輯建議

定位：**懂原理**。核心 hook：**會用 AI ≠ 懂 AI**。
做法：以「真實螢幕錄影」為主，AI／素材 B-roll 只用在開頭的問題鋪陳。真實產品的 UI 就是最強賣點，錄真的比生成假介面更好看、更省、也更誠實（順帶解決草稿裡「不要出現錯誤文字」的顧慮，真畫面文字一定正確）。

Base URL：`https://awesome-ai-learning.vercel.app`
語言前綴：預設英文；`/zh`、`/ja` 可切；右上角有即時語言切換。

---

## 一、實拍鏡位清單（master：60 秒 · 直式 9:16 · 4K）

每個鏡位 = 一段真實畫面。錄製前把視窗調到乾淨狀態，游標移動放慢，錄完再加字幕與轉場。

| # | 秒數 | 錄什麼（真實來源 + 動作） | 畫面上字幕 |
|---|---|---|---|
| 1 | 0-3 | **B-roll（非產品）**：一堆「10 個必學 AI 提示詞！」縮圖、彈窗快速刷過，然後定格。 | zh 會用 AI，不等於懂 AI<br>en Using AI is not the same as understanding it<br>ja AI を使えることと、理解していることは違う |
| 2 | 3-8 | **B-roll**：分頁一個個彈開（教學影片、文章、工具），畫面越來越亂。 | zh 工具一大堆，卻沒有一條真正搞懂原理的路<br>en So many tools, no real path to understanding<br>ja ツールは山ほど、原理を理解する道はない |
| 3 | 8-12 | **產品登場**：錄 `/`（首頁）載入，向下滑到 **AI 知識地圖（ConceptGraph）**，弦線亮起。 | zh 於是我們做了一條路<br>en So we built the path |
| 4 | 12-16 | 錄 `/course/tokenizer`：demo 把句子切成彩色 token。 | zh 從最底層開始，動手看懂<br>en Start from the ground up, hands on |
| 5 | 16-20 | 錄 `/course/transformer`：Attention 權重在字與字之間亮起連線。 | （無字幕，讓動畫說話，旁白帶過） |
| 6 | 20-24 | 錄 `/course/generative`：Diffusion demo 從雜訊一步步去噪成圖。 | zh 生成式 AI 怎麼「畫」出來<br>en How generative AI actually draws |
| 7 | 24-29 | 錄 `/course/rag`：RAG demo 按「▶ 檢索」→「▶ 生成」，資料流進知識庫再生成答案。 | zh RAG：先查資料，再回答<br>en RAG: retrieve first, then answer |
| 8 | 29-34 | 錄 `/course/model-knowledge`（最新一課）：點「今天的頭條新聞」→ 出現 ✗ →按「接上外部知識源」→ 翻成 ✓。 | zh 連「模型到底知道什麼」都玩得到<br>en Even "what the model knows" is playable |
| 9 | 34-40 | 錄 `/challenge/what-model-stores`：捲動考點 → 三個選項 → 點出正解（判斷題）。 | zh 64 道判斷題，練的是決策，不是背答案<br>en 64 challenges: train judgment, not memory |
| 10 | 40-46 | 錄 `/paths/llm-internals`：路線卡片 → 進到播放器，側欄步驟打勾，進度條前進。 | zh 一條路線，帶你從頭走到懂<br>en One path, from zero to understanding |
| 11 | 46-51 | 觸發**結業證書**：走完一條短路線（建議先用 `/paths/understand`）後點側欄「結業證書」，錄證書彈出＋彩帶。 | zh 走到最後，拿到結業證書<br>en Finish, and earn your certificate |
| 12 | 51-55 | 在任一頁點右上角語言切換：**EN → 日本語 → 繁中** 即時翻頁。 | zh 英日中三語，一個網站<br>en English, Japanese, Chinese, one site |
| 13 | 55-60 | 回到 `/` 首頁定格，疊上網址與 CTA。 | zh 免費・開源・免註冊・三語<br>en Free · Open source · Trilingual<br>**awesome-ai-learning.vercel.app** |

旁白語氣：專業、鼓勵、不浮誇。背景音樂：科技電子，節奏隨鏡 3（產品登場）拉起，鏡 11（證書）達到高點。

**錄製小抄**
- 用桌面版把瀏覽器縮到 9:16 附近的視窗，或錄全畫面後再裁切；重點 demo 段落錄 60fps 讓動畫順。
- 每個 demo 進場先停 0.5 秒再操作，剪輯時好對拍點。
- 鏡 8、鏡 12 是我們最獨特的兩個畫面（互動 demo + 即時三語），優先給足時間。
- 隱藏書籤列、通知、其他分頁；深淺色主題挑一個統一（建議淺色，畫面較亮）。

---

## 二、多平台剪輯建議（一次拍攝，多版輸出）

主素材錄一次，靠剪輯與字幕產出多個版本。

### A. 直式 60 秒（master）· 9:16
- 平台：TikTok、YouTube Shorts、Instagram Reels。
- 就是上面的完整 13 鏡。字幕燒進畫面（多數人靜音看）。

### B. 15 秒 hook 版 · 9:16
- 平台：同上，用來當廣告投放與快速引流。
- 選鏡：**1（hook）→ 4 tokenizer → 6 diffusion → 8 model-knowledge 切換 → 13 CTA**。
- 節奏更快，一句話講完：會用 AI ≠ 懂 AI，這裡讓你真的看懂 → 網址。

### C. 橫式 20-30 秒 · 16:9
- 平台：官網首頁 hero 自動循環、LinkedIn、Product Hunt、Twitter/X。
- 無聲可懂：全程燒字幕，去掉旁白也成立；結尾定格網址。
- 選鏡：3 知識地圖 → 5 attention → 7 RAG → 10 路線 → 12 三語 → 13 CTA。
- 建議做成無限循環（loop）版放官網。

### D. 方形 1:1 · 選配
- 平台：IG/FB 動態貼文。由 B 版裁切即可，字幕置中安全區。

### 三語輸出
- 一份剪輯 timeline，輸出三套字幕／旁白：`_en` / `_ja` / `_zh`。
- 檔名建議：`aial_promo_60s_9x16_zh.mp4`、`aial_promo_15s_9x16_en.mp4`、`aial_promo_loop_16x9_ja.mp4` 依此類推。
- 字幕已在鏡位表備妥三語，全程無破折號，符合產品文案規範。

### 投放順序建議
1. 先出 **B 15 秒**（en + zh）測 hook 與點閱。
2. 表現好的 hook 再擴成 **A 60 秒** 完整版。
3. **C 16:9 loop** 放官網首頁與 Product Hunt 當常設素材。
