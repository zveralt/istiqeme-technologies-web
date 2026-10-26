/**
 * Local Unsplash-licensed hero photography for interior PageHero banners.
 * Home page stays on its existing bolt Hero (no image swap here).
 *
 * Sources verified downloaded from images.unsplash.com (Unsplash License).
 * See public/images/heroes/ATTRIBUTION.txt
 */
export const heroMedia = {
  services: {
    src: "/images/heroes/services.jpg",
    alt: "Bright modern office with glass walls and collaborative desks",
    objectPosition: "center 40%",
  },
  work: {
    src: "/images/heroes/work.jpg",
    alt: "Laptop on a desk showing analytics charts and website work",
    objectPosition: "center center",
  },
  ai: {
    src: "/images/heroes/ai.jpg",
    alt: "Abstract digital interface suggesting artificial intelligence systems",
    objectPosition: "center center",
  },
  aiProducts: {
    src: "/images/heroes/ai-products.jpg",
    alt: "Product analytics dashboard on a laptop screen",
    objectPosition: "center 35%",
  },
  aiAgents: {
    src: "/images/heroes/ai-agents.jpg",
    alt: "Person interacting with a digital assistant interface",
    objectPosition: "center 30%",
  },
  start: {
    src: "/images/heroes/start.jpg",
    alt: "Professionals collaborating across a meeting table",
    objectPosition: "center 45%",
  },
  contact: {
    src: "/images/heroes/contact.jpg",
    alt: "Close-up of a smartphone used for business communication",
    objectPosition: "center center",
  },
} as const;
