export default {
  qs: ['When should AI use search?', 'What is Deep Research?', 'Can I trust the sources AI gives?', 'Built-in knowledge vs search — what’s the difference?'],
  kb: [
    [['built-in', 'memory', 'from memory', 'training data', 'difference', 'modes'], 'Tell the two modes apart first: <b>answering from memory</b> (knowledge learned in training — fast, but frozen at the cutoff and prone to fabrication) vs <b>search then answer</b> (actually looks at the web and answers from results, with grounding). The same question has completely different reliability in each mode.'],
    [['when to search', 'should it search', 'stale', 'news', 'prices'], 'Make it <b>search first</b> for: anything that dates (prices, versions, news, regulations, opening hours) and anything specific enough to fabricate (a paper, a statistic, a quote). Built-in knowledge is fine for stable concepts and common knowledge (principles, history, definitions).'],
    [['deep research', 'research mode', 'report', 'in-depth'], '<b>Deep Research</b> lets the AI spend minutes to tens of minutes searching dozens of sources, cross-checking, and writing a cited report. Good for questions worth the wait: market research, option comparison, entering an unfamiliar field. For everyday questions, plain search is enough.'],
    [['sources', 'citations', 'links', 'trust', 'verify'], 'The sources AI attaches <b>also need checking</b>: it can misread content, cite the wrong passage, or list dead links. For anything important, <b>open the original</b>: does the source exist? does it really say this? credible site or content farm?'],
    [['judge source', 'credibility', 'trustworthy site', 'content farm', 'fake site'], 'Quick credibility screen: <b>who wrote it</b> (named author, institution?), <b>where it is published</b> (official docs, major outlet, or an unknown farm site), <b>how fresh</b> (does the date still apply?), and <b>is there a second independent source</b> that matches. If none check out, stay skeptical.'],
    [['hallucination', 'fabricate', 'made up', 'relation', 'ties back'], 'This ties back to <b>hallucination</b>: with search off, AI just strings together what sounds right — specific numbers, book titles, and quotes are the easiest to invent. Search greatly reduces fabrication, but <b>misreading and misciting still happen</b>, so the last gate is always you.'],
    [['rag', 'difference', 'vs rag', 'enterprise', 'knowledge base'], 'Relation to <b>RAG</b>: same principle (retrieve, then generate), different target. RAG searches <b>your own data</b> (company docs, notes); web search queries <b>public pages</b>. Both are the same move: make it look things up before answering.'],
    [['how to ask', 'phrasing', 'technique', 'search prompt'], 'Useful phrasings: <b>“search first, then answer, with source links”</b>, “only use post-2025 information,” “find three independent sources and cross-check.” Explicit requests beat silently hoping it will search on its own.'],
    [['compare', 'search engine', 'google', 'difference', 'replace'], 'Versus googling yourself: AI search <b>reads and digests for you</b>, saving time — but it adds a layer, and you can’t see what it skipped. For big decisions use both: let AI map the landscape, then re-check the key facts yourself.'],
    [['misconception', 'myth', 'assume', 'common'], 'The most common misconception: <b>“an AI answer = a verified fact.”</b> Without search it is just reciting from memory. Treat it as an assistant who is great at finding things, not an authoritative database — right mindset, right usage.'],
  ],
  notes: [
    'First tell whether it answered from memory or actually searched: reliability differs completely.',
    'For dated or easily-fabricated questions, say explicitly: search first, answer with sources.',
    'Deep Research suits big questions worth the wait: many sources, cross-checked, cited report.',
    'Open and verify the sources AI gives: do they exist, do they say this, is the site credible.',
    'Treat AI as a skilled research assistant, not an authoritative database; the last gate is you.',
  ],
};
