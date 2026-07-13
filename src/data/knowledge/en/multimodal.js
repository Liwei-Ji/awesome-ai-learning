export default {
  qs: ['What is multimodal AI?', 'How does multimodal work?', 'How is multimodal different from a regular LLM?', 'What can multimodal AI be used for?'],
  kb: [
    [['what is', 'definition', 'define', 'multimodal', 'modality', 'meaning'], '<b>Multimodal</b> means a model can handle <b>several types of data at once</b>—text, images, sound, video—not just text. Models like GPT-4o and Gemini can look at a picture or listen to audio and then answer. A single “modality” is one type of data.'],
    [['how does it work', 'how it works', 'principle', 'how', 'flow', 'shared', 'space'], 'The key is a <b>shared meaning space</b>: each type gets its own encoder that turns it into the <b>same kind of vector</b>, so anything with the same meaning ends up close together. That’s why “a photo of a cat” and “the word cat” land in <b>nearly the same spot</b>—which lets the model understand and convert across types.'],
    [['difference', 'llm', 'regular', 'vs llm', 'differ', 'compare', 'plain'], 'A regular <b>LLM only takes text</b>; a <b>multimodal model</b> can also take images, sound, and video—and produce them too. The trick is <b>encoding every type into the same vector space</b> (an extension of the Embedding idea), then sharing one set of machinery for understanding and generating.'],
    [['applications', 'uses', 'examples', 'what can it do', 'use cases', 'which'], 'Common uses: <b>text-to-image</b> (Midjourney), <b>image captioning / describing pictures</b>, <b>speech recognition</b> (Whisper), <b>text-to-speech (TTS)</b>, <b>video summaries / subtitles</b>, and <b>text-to-video</b> (Sora). What they share: “one type goes in, another type comes out.”'],
    [['embedding', 'vector', 'relationship', 'connection', 'foundation', 'which chapter'], 'Multimodal is <b>built on top of Embedding</b>: Embedding turns text into vectors, and multimodal turns <b>images, sound, and video into vectors in the same space</b>. With shared coordinates, the model can say “this picture = this text” means the same thing.'],
    [['text to image', 'generate image', 'draw', 'midjourney', 'dall'], '<b>Text-to-image</b> is the “text → image” cross-modal jump: first the text is encoded into a meaning vector, then a generative model (a diffusion model) <b>denoises it into a picture</b> guided by that vector. That’s why the clearer your prompt, the closer the image matches what you wanted.'],
    [['image captioning', 'describe image', 'image to text', 'caption', 'ocr'], '<b>Image captioning (describing pictures)</b> is “image → text”: the model encodes the picture into a meaning vector, then uses its language ability to <b>describe it in words</b>. OCR (reading text inside an image) counts as this category too.'],
    [['speech', 'audio', 'sound', 'speech to text', 'whisper', 'recognition', 'tts', 'synthesis'], 'Two directions involve sound: <b>speech recognition</b> (sound → text, like Whisper) and <b>text-to-speech (TTS)</b> (text → sound). The principle is the same: map both sound and text into the one meaning space, then convert between them.'],
    [['misconception', 'not', 'stitched', 'four models', 'together', 'myth'], 'A common misconception: thinking multimodal is “four separate models, each handling one type, bolted together.” The real key is <b>one shared meaning space</b>—when different types are encoded into the same space, they can truly connect and convert into one another.'],
    [['limits', 'downsides', 'limitations', 'problems', 'challenges', 'weakness'], 'Multimodal has limits too: <b>aligning different types is hard</b> (it needs lots of paired data, e.g. “image + correct description”), hallucinations still happen (it may describe things not actually in the picture), and it costs more to run. Broader ability doesn’t mean more reliable.'],
    [['gpt', 'gemini', 'which models', 'who', 'famous', 'popular models'], 'Most mainstream large models today are multimodal: for example, <b>GPT-4o</b> and <b>Gemini</b> can see images and hear sound; for image/video generation there’s DALL·E, Midjourney, and Sora; for speech there’s Whisper and various TTS. The trend is “one model, many types.”'],
  ],
  notes: [
    'Multimodal = a model that handles many types at once: text, images, sound, video.',
    'The key is a shared meaning space: every type is encoded into the same kind of vector, and same meaning lands close together.',
    'With a shared space, you can freely convert: text-to-image, image captioning, speech-to-text…',
    'Multimodal is built on top of Embedding (turning images/sound/video into vectors too).',
    'It isn’t four models stitched together—it’s one shared space of understanding.',
    'Limits: cross-type alignment is hard, it still hallucinates, and it costs more.',
  ],
};
