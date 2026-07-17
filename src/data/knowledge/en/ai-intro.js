export default {
  qs: ['How is AI different from regular programming?', 'Can AI think?', 'What kinds of AI are there?', 'Why has AI become so popular lately?'],
  kb: [
    [['difference', 'regular program', 'traditional', 'differ', 'vs', 'programming'], '<b>Regular software</b> follows rules a developer writes: “if temperature > 30, turn on the AC.” <b>AI</b> instead is given lots of examples and <b>figures out the rules itself</b>. So it can handle situations you never spelled out, even ones you can’t quite describe.'],
    [['think', 'conscious', 'understand', 'really understand', 'does it'], 'Today’s AI has <b>no consciousness and doesn’t truly “understand.”</b> It makes very good guesses using <b>statistical patterns</b>, it looks like thinking, but it’s really “computing the most likely next step from the huge amount of data it has seen.”'],
    [['kinds', 'types', 'which', 'narrow', 'strong', 'general', 'agi'], 'AI is often split into: <b>narrow AI</b>, good at a single task (chess, spotting cats); <b>strong AI / AGI</b>, learns anything like a human, which <b>doesn’t exist yet</b>. Everything we use today is narrow AI.'],
    [['generative', 'genai', 'draw', 'write', 'create', 'image'], '<b>Generative AI</b> is the recently booming kind: it not only judges but <b>produces</b> new content, articles, images, code. ChatGPT and Midjourney are examples. Text works by “predicting the next word”; images use “diffusion.”'],
    [['why', 'now', 'popular', 'boom', 'sudden', 'powerful'], 'The idea is decades old; it boomed recently because three things arrived together: <b>①huge data</b> (the internet) <b>②powerful compute</b> (GPUs) <b>③better algorithms</b> (deep learning, Transformer). All three at once made AI truly strong.'],
    [['machine learning', 'ml', 'deep learning', 'relationship', 'same'], 'They’re <b>nested</b>: AI is the big umbrella → inside is <b>machine learning</b> (learn rules from data) → inside that is <b>deep learning</b> (many-layered neural networks). Generative AI and LLMs sit on this line.'],
    [['need', 'requirements', 'how it works', 'flow', 'process'], 'AI’s backbone is: <b>data → model → prediction → decision</b>. It needs three nutrients: <b>data</b> (material to learn from), <b>compute</b> (processing power), and <b>algorithms</b> (how it learns), all three essential.'],
    [['danger', 'replace', 'job', 'threat', 'safe', 'risk'], 'AI is powerful, but it also <b>makes mistakes, has biases, and fabricates (hallucinates)</b>. It’s more a “super tool” than a “thinking person”, it will replace some repetitive work and create new work. The key: humans must learn to <b>use it and verify it</b>.'],
    [['example', 'application', 'where', 'life', 'everyday', 'use'], 'You use it every day: face unlock, auto photo albums, video/shopping recommendations, voice assistants, translation, ChatGPT, driver assistance, AI is behind all of them.'],
    [['definition', 'what is', 'define'], 'In one line: <b>AI is technology that lets machines imitate humans’ ability to “see, think, decide.”</b> The difference, humans rely on experience; machines rely on <b>patterns learned from data</b>.'],
    [['model'], 'A <b>model</b> is the name for “the set of rules AI has learned.” Feed input in and it outputs a prediction; training = extracting that set of rules from data.'],
    [['prediction', 'guess', 'confidence', 'accurate'], 'AI’s output is essentially a <b>guess with a confidence level</b>: e.g. “this image is 95% likely a cat.” It doesn’t “know”, it “computes the most likely,” so even high confidence can be wrong.'],
  ],
  notes: [
    'AI is a big umbrella: machine learning, deep learning, and generative AI all sit inside.',
    'Narrow AI is great at single tasks; human-like general AI (AGI) doesn’t exist yet.',
    'AI’s three essentials: data, compute, algorithms, none optional.',
    'This boom = huge data × GPU compute × deep-learning algorithms, all at once.',
    'AI isn’t magic: it learns patterns from data, then makes the most likely guess about new situations.',
  ],
};
