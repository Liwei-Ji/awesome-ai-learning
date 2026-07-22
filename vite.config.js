import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { TOTAL } from './src/data/chapters.js';

// AI Academy — 互動教學 app。零後端，純前端 SPA。
export default defineConfig({
  plugins: [
    svelte(),
    // 建置／開發時把 index.html 的佔位符換成即時課程數，避免手寫數字過時（SEO 描述＋JSON-LD 都會自動同步）。
    {
      name: 'inject-counts',
      transformIndexHtml(html) {
        return html.replaceAll('__LESSON_COUNT__', String(TOTAL));
      },
    },
  ],
});
