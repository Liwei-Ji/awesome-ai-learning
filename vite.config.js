import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// AI Academy — 互動教學 app。零後端，純前端 SPA。
export default defineConfig({
  plugins: [svelte()],
});
