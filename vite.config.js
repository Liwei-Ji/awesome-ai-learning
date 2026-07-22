import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { TOTAL } from './src/data/chapters.js';
import { IV_ORDER } from './src/data/interviews.js';

// AI Academy — 互動教學 app。零後端，純前端 SPA。
export default defineConfig({
  plugins: [
    svelte(),
    // 建置／開發時把 index.html 的佔位符換成即時課程數與挑戰題數，避免手寫數字過時（SEO 描述＋JSON-LD 都會自動同步）。
    {
      name: 'inject-counts',
      transformIndexHtml(html) {
        return html
          .replaceAll('__LESSON_COUNT__', String(TOTAL))
          .replaceAll('__CHALLENGE_COUNT__', String(IV_ORDER.length));
      },
    },
  ],
});
