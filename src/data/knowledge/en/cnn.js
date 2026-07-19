export default {
  qs: ["What is a CNN?", "What does convolution do?", "Why is a CNN good at seeing images?", "How does a CNN differ from a Transformer?"],
  kb: [
    [["what is", "cnn", "convolutional neural network", "what is it"], "A <b>CNN (convolutional neural network)</b> is a neural network specialized for seeing images. At its core, a tiny <b>filter</b> slides across the whole image to detect local patterns (edges, corners). After stacking many layers, it can recognize everything from edges up to shapes and objects."],
    [["convolution", "filter", "how does it work", "principle", "sliding"], "<b>Convolution</b> means taking a small square <b>filter</b> and sliding it across the whole image cell by cell, and at each spot computing 'how much this looks like the pattern I am searching for', producing a <b>feature map</b>. The same filter is reused across the whole image, so the same pattern can be detected anywhere."],
    [["good at", "why images", "local", "positional invariance", "weight sharing"], "A CNN is good at seeing images because it captures <b>local patterns</b>, and <b>the same filter is used everywhere (weight sharing)</b>: it recognizes a cat whether it is in the top left or the bottom right (<b>positional invariance</b>), and it has far fewer parameters than a fully connected network, so training is cheaper and less prone to overfitting."],
    [["hierarchy", "edges", "shapes", "objects", "stacking layers", "abstraction", "deep"], "A CNN builds a hierarchy by <b>stacking layers</b>: <b>shallow layers see edges, middle layers see shapes and textures, deep layers see eyes, faces, and whole objects</b>. This is what deep learning's 'layer-by-layer abstraction' looks like in concrete form for images, and these filters <b>are learned from data</b>, not designed by hand."],
    [["pooling", "shrink", "downsample", "reduce size"], "<b>Pooling</b> is used between convolutions to <b>shrink</b> the image and keep only the strongest signals (for example, taking the maximum value in a small patch). It saves the model compute, enlarges the receptive field, and makes it more robust to small shifts in position."],
    [["alexnet", "imagenet", "2012", "history", "starting point", "ignite"], "In 2012 the CNN <b>AlexNet</b> left its rivals far behind in the image recognition contest <b>ImageNet</b>, proving that 'a deep network plus lots of data' really works, and directly ignited this wave of deep learning. Afterward, face recognition, medical imaging, and self-driving vision mostly have a CNN underneath."],
    [["transformer", "vit", "difference", "compare", "vision transformer"], "A CNN captures <b>local features and texture</b> and is fast and economical; <b>Vision Transformer (ViT)</b> brings Transformer to images and uses attention to capture <b>global relationships</b>, reaching high accuracy but demanding a lot of data. In many practical settings CNN is still the fast and stable first choice, and the two are often combined."],
    [["multimodal", "vlm", "seeing images", "encoder", "relationship"], "When a <b>multimodal model (VLM)</b> looks at an image, the <b>image encoder</b> at the front that 'turns the image into vectors' is often a CNN (or ViT). So understanding CNN helps you understand how a VLM actually 'makes sense of' an image."],
  ],
  notes: [
    "A CNN slides a small filter across the whole image to detect local patterns (edges, textures) that can appear anywhere.",
    "Weight sharing plus positional invariance: the same filter is used everywhere, it recognizes patterns even when they move, and there are fewer parameters.",
    "Stacking layers builds a hierarchy: edges → shapes → objects; the filters are learned, not designed by hand.",
    "Pooling shrinks the image and keeps the strongest signals, saving compute and improving robustness to shifts in position.",
    "In 2012 AlexNet won big on ImageNet, igniting this wave of deep learning.",
    "CNN is still a strong baseline for images; ViT adds global relationships, and CNN is also commonly used in the front end of VLMs.",
  ],
};
