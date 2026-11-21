export const serviceGroups = [
  {
    slug: "personalized-miniatures",
    category: "personalized",
    icon: "people",
    name: "Personalized miniatures",
    purpose: "People, personalities & little memories",
    description:
      "Turn a favourite person, pet or photograph into a personal miniature keepsake.",
    brief:
      "Share clear photographs, the people or pets to include and your preferred pose.",
    image: "/images/services/handcraft.webp",
    imageAlt: "Hands carefully working on a bespoke craft piece",
    includes: [
      "Custom Human Miniatures",
      "Couple Miniatures",
      "Wedding Miniatures",
      "Family Miniatures",
      "Baby and Kids Miniatures",
      "Pet Miniatures",
      "Custom Character Figurines",
      "Photo-to-3D Miniatures",
    ],
  },
  {
    slug: "architectural-miniatures",
    category: "architecture",
    icon: "home",
    name: "Architectural miniatures",
    purpose: "Spaces worth a closer look",
    description:
      "Explore buildings, interiors and landscapes through carefully considered scale models.",
    brief:
      "Bring plans, elevations, dimensions and the scale or display size you have in mind.",
    image: "/images/services/home.webp",
    imageAlt: "Architecture and home model reference supplied by the studio",
    includes: [
      "Residential Building Models",
      "Commercial Building Models",
      "Villa and Apartment Models",
      "Interior Design Miniatures",
      "Landscape and Garden Models",
      "Real Estate Project Models",
    ],
  },
  {
    slug: "diorama-creative-miniatures",
    category: "diorama",
    icon: "layers",
    name: "Dioramas & creative worlds",
    purpose: "A whole world in the details",
    description:
      "From a familiar room to an imagined world, build a small scene with a story to tell.",
    brief:
      "Share the scene, mood, references and furniture or characters you want included.",
    image: "/images/services/home.webp",
    imageAlt: "A place and its details, inspiration for a miniature scene",
    includes: [
      "Miniature Room Models",
      "Miniature House Models",
      "Miniature Shop and Café Models",
      "Historical Scene Dioramas",
      "Fantasy and Theme-Based Miniatures",
      "Miniature Furniture Models",
    ],
  },
  {
    slug: "vehicle-miniatures",
    category: "vehicles",
    icon: "bus",
    name: "Vehicle miniatures",
    purpose: "For the journeys you know by heart",
    description:
      "Recreate the character of a favourite vehicle, from its paintwork to the smallest familiar detail.",
    brief:
      "Photos of the vehicle, its colours, registration or route board are a useful starting point.",
    image: "/images/services/vehicle.webp",
    imageAlt: "Vehicle reference supplied for custom miniature models",
    includes: [
      "Car Miniatures",
      "Bike Miniatures",
      "Truck and Bus Miniatures",
      "Custom Vehicle Replicas",
    ],
  },
  {
    slug: "corporate-commercial-miniatures",
    category: "corporate",
    icon: "building",
    name: "Corporate & commercial",
    purpose: "Big ideas, made tangible",
    description:
      "Give a product, brand or project a physical form for presentations, gifting and exhibitions.",
    brief:
      "Share your project brief, quantities, display requirements and deadline.",
    image: "/images/services/academic.webp",
    imageAlt: "Project display reference supplied by the studio",
    includes: [
      "Corporate Gift Miniatures",
      "Product Replica Miniatures",
      "Industrial and Factory Models",
      "Exhibition Display Models",
      "Brand Promotional Miniatures",
      "Prototype and Concept Models",
    ],
  },
  {
    slug: "gifts-special-occasions",
    category: "gifts",
    icon: "gift",
    name: "Gifts & special occasions",
    purpose: "A small gift. A big feeling.",
    description:
      "Celebrate a person, a milestone or a shared memory with something made especially for them.",
    brief: "Tell us the occasion, personal details and when you need the gift.",
    image: "/images/services/handcraft.webp",
    imageAlt: "Handmade craft details for a thoughtful personal gift",
    includes: [
      "Birthday Miniature Gifts",
      "Anniversary Miniature Gifts",
      "Valentine's Day Miniatures",
      "Graduation Miniatures",
      "Memory and Keepsake Miniatures",
      "Customized Miniature Gift Boxes",
    ],
  },
  {
    slug: "additional-services",
    category: "craft",
    icon: "craft",
    name: "Modelling, printing & finishing",
    purpose: "From first concept to final touch",
    description:
      "Get help with a model's next step, from digital design and printing to painting or repair.",
    brief:
      "Share existing files or photographs, dimensions and the finish or repair you need.",
    image: "/images/services/academic.webp",
    imageAlt: "Creative project reference for modelling and finishing",
    includes: [
      "Custom 3D Modeling",
      "3D Printing",
      "Hand-Painted Miniatures",
      "Miniature Restoration and Repair",
    ],
  },
] as const;
export const services = serviceGroups.map((service) => ({
  ...service,
  type: service.includes[0],
}));
export const serviceOptions = serviceGroups.flatMap((service) => [
  ...service.includes,
]);
export function serviceSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
