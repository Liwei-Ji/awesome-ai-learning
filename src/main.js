import './lib/boot.js'; // 必須最先：把舊 query 連結正規化成路徑，早於任何 store 讀 location
import { mount } from 'svelte';
import './styles/tokens.css';
import './styles/global.css';
import App from './App.svelte';

// 清空掛載點（預渲染快照會先填入內容，client 端重新掛載前先清掉，避免疊加）
const target = document.getElementById('app');
target.innerHTML = '';

const app = mount(App, { target });

export default app;
