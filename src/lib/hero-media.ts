/**
 * Local hero photography for interior PageHero banners.
 * Home page stays on its existing bolt Hero (no image swap here).
 *
 * Source files from Downloads/hero banner images (Unsplash).
 * See public/images/heroes/ATTRIBUTION.txt
 */
export const heroMedia = {
  services: {
    src: "/images/heroes/services-meeting.jpg",
    alt: "Modern conference room with a long meeting table and chairs",
    objectPosition: "center 45%",
  },
  work: {
    src: "/images/heroes/work-nasa.jpg",
    alt: "Earth at night from orbit, city lights glowing against deep space",
    objectPosition: "center 65%",
  },
  ai: {
    src: "/images/heroes/ai-office.jpg",
    alt: "Team working late at monitors in a warm, modern open office",
    objectPosition: "center 40%",
  },
  aiProducts: {
    src: "/images/heroes/contact-payment.jpg",
    alt: "Digital product interface on a tablet during a contactless checkout",
    objectPosition: "center 35%",
  },
  aiAgents: {
    src: "/images/heroes/ai-agents.jpg",
    alt: "Futuristic metallic humanoid head suggesting an AI agent",
    objectPosition: "center 30%",
  },
  start: {
    src: "/images/heroes/start.jpg",
    alt: "Modern conference room with a long meeting table and chairs",
    objectPosition: "center 45%",
  },
  contact: {
    src: "/images/heroes/contact-payment.jpg",
    alt: "Hands using a phone for payment next to a business tablet",
    objectPosition: "center 55%",
  },
} as const;
