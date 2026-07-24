/* ============================================================
   AI 知識地圖，純資料，一次定義、多處使用：
     · 首頁「AI 知識地圖」樹狀圖（根 → 上排分支 → 往下流）
     · Ch「系統整合」的關聯圖（radial）
     · AI 教授 Phase 2 的概念推理（PREREQ 前置關係）

   分組沿用課綱的 6 章（chapters.js GROUPS）：
   前 4 章＝上排分支、後 2 章＝往下流。改課綱分組這裡自動跟著變。
   ============================================================ */
import { MAP_GROUPS } from './chapters.js';

export const ROOT = 'AI（人工智慧）';

export const BRANCHES = MAP_GROUPS.slice(0, 4);   // { t, desc, ids }
export const FLOW = MAP_GROUPS.slice(4);          // { t, desc, ids }

// 少數章節的子重點（以 slug 為鍵，顯示在節點下方的小標）
export const SUB = {
  limits: ['幻覺', '偏見', '安全', '驗證'],
  capstone: ['工作', '學習', '創作', '自動化'],
};

// 概念前置關係（slug → 需先懂的 slug[]），畫依賴線 + 教授 Phase 2 推理
export const PREREQ = {
  ml: ['ai-intro'],
  data: ['ai-intro'],
  'deep-learning': ['ml'],
  'neural-network': ['deep-learning'],
  training: ['neural-network'],
  backprop: ['training'],
  cnn: ['deep-learning'],
  rnn: ['embedding'],
  'model-size': ['neural-network'],
  inference: ['llm'],
  'context-window': ['llm'],
  tokenizer: ['ml'],
  embedding: ['tokenizer'],
  transformer: ['embedding', 'neural-network'],
  llm: ['transformer'],
  pretraining: ['llm'],
  'fine-tuning': ['llm'],
  reasoning: ['llm', 'prompt'],
  generative: ['deep-learning'],
  multimodal: ['embedding', 'llm'],
  prompt: ['llm'],
  'system-prompt': ['prompt'],
  'thought-partner': ['prompt'],
  'find-info': ['model-knowledge'],
  'no-code': ['agent'],
  'vector-search': ['embedding'],
  rag: ['embedding', 'llm'],
  'knowledge-graph': ['rag'],
  memory: ['context-window'],
  mcp: ['llm'],
  agent: ['llm', 'mcp'],
  skills: ['agent', 'mcp'],
  orchestration: ['agent'],
  integration: ['agent', 'rag'],
  limits: ['llm'],
  evaluation: ['limits', 'llm'],
  capstone: ['integration'],
};
