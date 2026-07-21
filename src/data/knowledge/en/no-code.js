export default {
  qs: ['Can I build things with AI without coding?', 'What is vibe coding?', 'Can AI make a web page or analyze data for me?', 'Can I ship what it builds directly?'],
  kb: [
    [['cannot code', 'no background', 'still build', 'beginner', 'non-technical'], 'Yes. You <b>describe what you want in plain language</b>, and AI writes the code and runs it; you look at the result and steer with words. You don’t need to read the code, but you <b>do need to state the need clearly and tell whether the result is right</b>.'],
    [['vibe coding', 'what is', 'code by talking'], '<b>Vibe coding</b> means: instead of typing code yourself, you <b>describe what to build in conversation</b>, let AI generate the code, and just look at what runs and steer. The focus shifts from “how to write it” to “what I want and whether it’s right.”'],
    [['coding assistant', 'claude code', 'cursor', 'copilot', 'tool'], 'Behind it is a <b>coding assistant</b> (Claude Code, Cursor, Copilot, etc.): it reads and writes code, runs it, sees errors, and fixes itself — really an <b>agent</b> that uses tools. So this chapter is agents applied, not something new.'],
    [['what can it do', 'examples', 'use', 'make what'], 'Without coding you can already: hand it an Excel file to <b>analyze data and draw charts</b>; describe a layout to get a <b>personal site or signup page</b>; build <b>small tools</b> (expense tracker, raffle, countdown); even a playable <b>mini game</b>. Idea to usable is often under an hour.'],
    [['data analysis', 'image', 'generate image', 'multimodal', 'excel', 'charts'], 'Multimodal means it handles more than text: snap a photo and ask “what is this / how do I fix it,” hand over a spreadsheet to <b>compute, find trends, and draw charts</b> (this is a code interpreter — the AI actually runs code for you), or describe a scene to generate image assets. Give it whatever you have.'],
    [['small steps', 'iterate', 'trick', 'technique', 'how to do it well'], 'The key trick is <b>iterating in small steps</b>: get the simplest working version first, then react — “make the button bigger,” “add sorting.” Describe the perfect product in one go and when it breaks you can’t say where; small steps stay understandable and reversible.'],
    [['ship', 'production', 'usable', 'reliable', 'product', 'use directly'], 'Great for <b>prototypes and personal tools</b>; but to <b>ship for real, serve many people, or touch money or personal data</b>, you still need someone who knows the craft to vet security, performance, and edge cases. Mindset: validate the idea fast, then invest properly if it’s worth it.'],
    [['limits', 'risk', 'watch out', 'gatekeep', 'pitfalls'], 'Watch out: what AI builds <b>can look like it works but have holes</b> (wrong math, breaks on mobile, security gaps). You don’t have to fix it, but you must <b>test</b>: are the numbers right? still fine on another device? did you try it before handing it over?'],
    [['agent', 'relation', 'ties back', 'integration'], 'This chapter connects the earlier ones: <b>prompt</b> (stating it clearly) + <b>agent / MCP</b> (using tools, acting on its own) = you can direct AI to build something with a sentence. Vibe coding isn’t magic; it’s the abilities you’ve learned combined.'],
    [['misconception', 'myth', 'assume', 'replace engineers'], 'Common misconception: <b>“we won’t need engineers anymore.”</b> Really, the barrier drops and prototypes get fast, but making things robust, secure, and scalable is still a craft. It lets many more people <b>get a usable first version</b> — it doesn’t make the expertise disappear.'],
  ],
  notes: [
    'You can build with AI without coding: you state the need clearly and judge whether the result is right.',
    'Vibe coding = describe in conversation, let AI write code; behind it is a tool-using coding assistant (agent).',
    'You can make: data analysis and charts, personal sites, small tools, mini games — often within an hour.',
    'The trick is small-step iteration: get a working minimal version, then change it bit by bit.',
    'Prototypes are fast, but shipping or touching money/personal data still needs an expert to vet; AI builds, you gatekeep.',
  ],
};
