/* ============================================================
   Demo 註冊表，章節「slug（概念代號）」→ 互動 demo 元件。
   用 slug 綁定（非章號），所以課綱重排、章號變動都不影響對應。
   還沒做互動 demo 的章節自動 fallback 到 Placeholder。
   ============================================================ */
import History from './History.svelte';
import Multimodal from './Multimodal.svelte';
import Evaluation from './Evaluation.svelte';
import Classify from './Classify.svelte';
import DataSize from './DataSize.svelte';
import DataFuel from './DataFuel.svelte';
import Layers from './Layers.svelte';
import ModelSize from './ModelSize.svelte';
import ModelKnowledge from './ModelKnowledge.svelte';
import SequenceMemory from './SequenceMemory.svelte';
import ConvFilter from './ConvFilter.svelte';
import Inference from './Inference.svelte';
import Network from './Network.svelte';
import GradientDescent from './GradientDescent.svelte';
import Backprop from './Backprop.svelte';
import ContextWindow from './ContextWindow.svelte';
import Tokenizer from './Tokenizer.svelte';
import Embedding from './Embedding.svelte';
import Attention from './Attention.svelte';
import NextToken from './NextToken.svelte';
import ToChatGPT from './ToChatGPT.svelte';
import PromptCraft from './PromptCraft.svelte';
import RAG from './RAG.svelte';
import FineTune from './FineTune.svelte';
import Diffusion from './Diffusion.svelte';
import Memory from './Memory.svelte';
import MCP from './MCP.svelte';
import Limits from './Limits.svelte';
import Capstone from './Capstone.svelte';
import Agent from './Agent.svelte';
import Pipeline from './Pipeline.svelte';
import Placeholder from './Placeholder.svelte';

const demos = {
  'history': History,
  'ai-intro': Classify,
  'ml': DataSize,
  'data': DataFuel,
  'deep-learning': Layers,
  'neural-network': Network,   // 深色發光版
  'model-size': ModelSize,     // 深色發光版
  'model-knowledge': ModelKnowledge,
  'inference': Inference,      // 深色發光版
  'training': GradientDescent, // 深色發光版
  'backprop': Backprop,        // 深色發光版
  'cnn': ConvFilter,
  'context-window': ContextWindow, // 深色發光版
  'tokenizer': Tokenizer,          // 深色發光版
  'embedding': Embedding,          // 深色發光版
  'rnn': SequenceMemory,
  'transformer': Attention,
  'llm': NextToken,
  'pretraining': ToChatGPT,    // 深色發光版
  'prompt': PromptCraft,
  'rag': RAG,
  'fine-tuning': FineTune,
  'generative': Diffusion,
  'multimodal': Multimodal,
  'memory': Memory,
  'mcp': MCP,
  'limits': Limits,
  'evaluation': Evaluation,
  'capstone': Capstone,
  'agent': Agent,
  'integration': Pipeline,
};

/** 依 slug 取 demo 元件；未建者回 Placeholder。 */
export function demoFor(slug) {
  return demos[slug] ?? Placeholder;
}
