export const categories = [
  {
    name: "Miniature Worlds",
    slug: "miniature-art",
    description: "Small places. Endless possibilities.",
    image: "/images/hero.webp",
  },
  {
    name: "Architectural Miniatures",
    slug: "architecture",
    description: "A sense of place, captured in scale.",
    image: "/images/architecture.webp",
  },
  {
    name: "Fantasy Dioramas",
    slug: "dioramas",
    description: "Where the impossible feels real.",
    image: "/images/forest.webp",
  },
  {
    name: "Miniature Photography",
    slug: "photography",
    description: "A different way of seeing.",
    image: "/images/photography.webp",
  },
  {
    name: "Handmade Miniature Models",
    slug: "figurines",
    description: "Character in every little detail.",
    image: "/images/workbench.webp",
  },
  {
    name: "Custom Commissions",
    slug: "custom-commissions",
    description: "Your memories, made miniature.",
    image: "/images/cottage.webp",
  },
];
export const projects = [
  {
    slug: "the-forgotten-cottage",
    name: "The Forgotten Cottage",
    category: "miniature-art",
    kind: "MINIATURE WORLD",
    image: "/images/hero.webp",
    detail: "/images/cottage.webp",
    year: "Concept study",
    scale: "1:24",
    dimensions: "30 × 24 × 28 cm",
    materials: "Basswood, clay, preserved moss, acrylic, LED light",
    story:
      "Somewhere between a memory and a dream, a little light is still on.",
    concept:
      "A quiet tribute to the places we imagine returning to. A winding path leads through a tangle of green to a cottage that seems to have grown from the woodland itself.",
    process:
      "The proposed build begins with a basswood structure. Individual roof tiles, softly aged plaster and a layered woodland floor give the scene its sense of time.",
    realHeight: 672,
    modelHeight: 28,
  },
  {
    slug: "a-street-in-time",
    name: "A Street in Time",
    category: "architecture",
    kind: "ARCHITECTURAL MINIATURE",
    image: "/images/architecture.webp",
    detail: "/images/architecture.webp",
    year: "Concept study",
    scale: "1:24",
    dimensions: "42 × 28 × 32 cm",
    materials: "Foam board, wood, paper, acrylic",
    story: "A slow afternoon, a familiar corner, a city held in a moment.",
    concept:
      "Weathered façades and intimate shopfronts explore the poetry of everyday architecture. The story lives in the irregularities.",
    process:
      "Measured drawings establish a believable rhythm. Layered finishes and painted signs bring human presence to an otherwise still scene.",
    realHeight: 768,
    modelHeight: 32,
  },
  {
    slug: "where-the-forest-dreams",
    name: "Where the Forest Dreams",
    category: "dioramas",
    kind: "FANTASY DIORAMA",
    image: "/images/forest.webp",
    detail: "/images/forest.webp",
    year: "Concept study",
    scale: "1:48",
    dimensions: "36 × 30 × 24 cm",
    materials: "Sculpting clay, resin, natural textures",
    story: "Follow the light. There is more here than meets the eye.",
    concept:
      "An imagined woodland sanctuary built around the soft contrast of warm windows and deep green shadows.",
    process:
      "A sculpted terrain supports handmade foliage. Carefully planned points of light guide the eye through the composition.",
    realHeight: 1152,
    modelHeight: 24,
  },
  {
    slug: "the-quiet-hour",
    name: "The Quiet Hour",
    category: "photography",
    kind: "MINIATURE PHOTOGRAPHY",
    image: "/images/photography.webp",
    detail: "/images/cottage.webp",
    year: "Concept study",
    scale: "1:24",
    dimensions: "30 × 24 × 28 cm",
    materials: "Miniature set, practical lighting, macro lens",
    story: "An entire world in the space between light and shadow.",
    concept:
      "A photographic exploration of atmosphere at a tiny scale, using a shallow depth of field and a single warm light source.",
    process:
      "Light is shaped close to the model. Low camera angles and a carefully chosen focal plane create the feeling of standing inside the scene.",
    realHeight: 672,
    modelHeight: 28,
  },
  {
    slug: "little-companions",
    name: "Little Companions",
    category: "figurines",
    kind: "HANDMADE MODEL",
    image: "/images/workbench.webp",
    detail: "/images/workbench.webp",
    year: "Concept study",
    scale: "1:12",
    dimensions: "8 × 6 × 15 cm",
    materials: "Polymer clay, wire armature, acrylic",
    story: "The smallest gestures tell the biggest stories.",
    concept:
      "An exploration of character through hand-shaped forms, small imperfections and a restrained color palette.",
    process:
      "A wire armature supports layered sculpting. Translucent paint is built up slowly to preserve the detail of the surface.",
    realHeight: 180,
    modelHeight: 15,
  },
  {
    slug: "a-place-to-remember",
    name: "A Place to Remember",
    category: "custom-commissions",
    kind: "COMMISSION CONCEPT",
    image: "/images/cottage.webp",
    detail: "/images/hero.webp",
    year: "Concept study",
    scale: "1:24",
    dimensions: "30 × 24 × 28 cm",
    materials: "Wood, clay, acrylic, mixed media",
    story: "Some places never really leave us.",
    concept:
      "A sample direction for transforming a meaningful home into a tactile keepsake. Every future commission starts with the client’s own reference material.",
    process:
      "Photographs and stories inform a scale drawing, followed by a material study and an individually built scene.",
    realHeight: 672,
    modelHeight: 28,
  },
];
export type Project = (typeof projects)[number];
export const processSteps = [
  [
    "Concept & Imagination",
    "Every little world starts with a big “what if”. We explore the feeling, memory or story at its heart.",
  ],
  [
    "Sketching & Planning",
    "Loose sketches become considered compositions, with room for discoveries along the way.",
  ],
  [
    "Scale & Material Selection",
    "The scale sets the language. We choose materials for their texture, character and longevity.",
  ],
  [
    "Sculpting & Construction",
    "Piece by piece, a world takes shape. Tiny structures are cut, formed and assembled by hand.",
  ],
  [
    "Painting & Detailing",
    "Layers of color, weathering and light turn a model into a place that feels lived in.",
  ],
  [
    "Photography & Presentation",
    "The final scene is carefully lit, photographed and prepared to share its story.",
  ],
];
export const journals = [
  {
    slug: "finding-wonder-in-the-ordinary",
    title: "Finding wonder in the ordinary",
    tag: "INSPIRATION",
    image: "/images/cottage.webp",
    excerpt:
      "The best little stories often begin with something we almost walked past.",
    paragraphs: [
      "A worn doorstep. A window left glowing at dusk. Moss finding its way between stones. Miniature-making begins with paying attention to the ordinary.",
      "Keep a small visual notebook of textures, colors and places. The goal is not to collect perfect references, but to notice the details that make a place feel personal.",
      "Choose one emotional center for a scene. A single pool of light or an empty chair can suggest more than a crowded composition. Let the viewer complete the story.",
    ],
  },
  {
    slug: "the-language-of-tiny-textures",
    title: "The language of tiny textures",
    tag: "FROM THE WORKBENCH",
    image: "/images/workbench.webp",
    excerpt:
      "Building age, character and a sense of time, one layer at a time.",
    paragraphs: [
      "Realism at a small scale comes from restraint. A texture that looks subtle in your hand can become overpowering through a macro lens.",
      "Begin with a fine base texture, then vary the finish. Thin layers of acrylic allow the surface below to remain visible. Work from broad color relationships toward individual marks.",
      "Study where a real object would weather: roof edges, exposed corners and surfaces close to the ground. Detail is most convincing when it has a reason to be there.",
    ],
  },
  {
    slug: "painting-with-light",
    title: "Painting with light, in miniature",
    tag: "PHOTOGRAPHY",
    image: "/images/photography.webp",
    excerpt: "How a little light can change the feeling of an entire world.",
    paragraphs: [
      "Before reaching for another prop, move the light. A small shift in direction can turn the same scene from welcoming to mysterious.",
      "Use a low camera angle to bring the viewer inside the model. A diffused source creates gentle transitions, while a tiny practical light suggests human presence.",
      "Protect the highlights and leave some shadows unexplained. Miniature photography works best when its technical choices quietly support the story.",
    ],
  },
];
