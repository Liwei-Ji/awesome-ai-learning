export default {
  qs: ["What is an RNN?", "Why is an RNN forgetful?", "Why did Transformer replace RNN?", "How does LSTM differ from RNN?"],
  kb: [
    [["what category", "sequence model", "rnn", "recurrent", "what is"], "A <b>sequence model</b> reads in order, one word at a time, and the classic one is the <b>RNN (recurrent neural network)</b>. Each time it reads a word, it compresses 'what it understands so far' into a single <b>hidden state</b> and carries it forward, using that state as memory."],
    [["hidden state", "memory", "how does it remember", "state"], "The <b>hidden state</b> is the RNN's compressed memory of 'what it has read so far', updated and passed along word by word. It is like the live impression in your head of 'what they are saying now' while you listen to someone talk: it is compressed, not a word-for-word recording."],
    [["forgetful", "forgets", "vanishing gradient", "long", "forgets the beginning", "cannot remember"], "Over long inputs an RNN becomes <b>forgetful</b>: information at the start is diluted as it is compressed and passed along, so by the end of a sentence it often forgets the beginning (this is the intuitive version of <b>vanishing gradients</b>). So do not expect it to remember what came earlier in long texts; for long context you need a Transformer."],
    [["parallel", "cannot parallelize", "slow", "sequential", "speed"], "RNNs <b>cannot parallelize</b>: the Nth word can only be computed after all the earlier ones are done, so training goes one step at a time and is slow. Transformer computes all words together, which lets it take in more data and train faster: one of the key reasons it won out."],
    [["lstm", "gate", "gru", "improvement"], "<b>LSTM</b> (and GRU) are improved versions of the RNN that add <b>gates</b> to control 'what to remember and what to forget', letting it remember a bit longer than a plain RNN. But the two fundamental limits, forgetting and the lack of parallelism, are not truly removed."],
    [["transformer", "replace", "attention", "why", "difference", "compare"], "<b>Transformer</b> uses <b>Attention</b> to let every word <b>see the whole sentence at once</b> and directly work out what to attend to. This solves both RNN's forgetfulness (even distant words connect directly) and its lack of parallelism (everything is computed together), so after 2017 it replaced RNN as the mainstream for language models and made LLMs possible."],
    [["still useful", "obsolete", "useless", "where is it used", "use cases"], "RNNs are not completely obsolete. They are <b>small and resource-efficient</b>, and remain practical for <b>short sequences, real-time, and on-device</b> settings (some speech recognition, sensor and time-series signals). It is only for handling long text quickly and powerfully that Transformer is today's first choice."],
    [["embedding", "relationship", "order", "connection to previous", "which chapter"], "The RNN comes after <b>Embedding</b>: first each word is turned into a vector, then the RNN reads this string of vectors in one by one <b>in order</b> and updates the hidden state. The next stop, Transformer, switches to seeing everything at once, and understanding it shows you why Attention was a huge leap."],
  ],
  notes: [
    "Sequence models read in order, one word at a time, using a hidden state to compress what came before into memory.",
    "RNNs are forgetful: as a sentence grows, information at the start is diluted as it is compressed and passed along (the intuition behind vanishing gradients).",
    "RNNs cannot parallelize: the Nth word must wait for the earlier ones to finish, so training is slow.",
    "LSTM uses gates to remember a bit longer, but it does not truly eliminate forgetfulness or the lack of parallelism.",
    "Transformer uses Attention to see the whole sentence at once, solving both at once, which is what made LLMs possible.",
    "RNNs are still practical for short sequences, real-time work, and on-device use; they are not obsolete.",
  ],
};
