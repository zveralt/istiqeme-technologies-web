/**
 * Unique hero + overview photography for each service landing page.
 * Intentionally separate from `heroMedia` (shared interior pages) so service
 * banners never reuse Home / Services / AI / Contact photography.
 *
 * Sources: Unsplash License — see public/images/services/ATTRIBUTION.txt
 */
export type ServicePhoto = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export type ServiceMedia = {
  hero: ServicePhoto;
  overview: ServicePhoto;
};

export const serviceMedia = {
  "web-design-development": {
    hero: {
      src: "/images/heroes/svc-web-hero.jpg",
      alt: "Laptop on a dark desk showing code and a web interface in a focused workspace",
      objectPosition: "center 42%",
    },
    overview: {
      src: "/images/services/svc-web-overview.jpg",
      alt: "Designer desk with a large monitor showing a modern website layout and UI frames",
      objectPosition: "center 40%",
    },
  },
  "ecommerce-development": {
    hero: {
      src: "/images/heroes/svc-ecommerce-hero.jpg",
      alt: "Customer paying at a modern retail counter with a digital point-of-sale terminal",
      objectPosition: "center 45%",
    },
    overview: {
      src: "/images/services/svc-ecommerce-overview.jpg",
      alt: "Hands completing a secure online checkout on a laptop with a credit card",
      objectPosition: "center 48%",
    },
  },
  "custom-software-development": {
    hero: {
      src: "/images/heroes/svc-software-hero.jpg",
      alt: "Business analytics dashboard with charts and KPI panels on a wide display",
      objectPosition: "center 35%",
    },
    overview: {
      src: "/images/services/svc-software-overview.jpg",
      alt: "Close view of application source code on a developer monitor",
      objectPosition: "center 50%",
    },
  },
  "mobile-app-development": {
    hero: {
      src: "/images/heroes/svc-mobile-hero.jpg",
      alt: "Hands holding a smartphone showing a clean mobile application interface",
      objectPosition: "center 40%",
    },
    overview: {
      src: "/images/services/svc-mobile-overview.jpg",
      alt: "Mobile product screens arranged on a dark surface during app design review",
      objectPosition: "center 45%",
    },
  },
  "ai-solutions": {
    hero: {
      src: "/images/heroes/svc-ai-hero.jpg",
      alt: "Abstract luminous neural network visual suggesting practical AI systems",
      objectPosition: "center 45%",
    },
    overview: {
      src: "/images/services/svc-ai-overview.jpg",
      alt: "Humanoid robot in a bright studio, suggesting applied automation for business",
      objectPosition: "center 30%",
    },
  },
  "digital-marketing": {
    hero: {
      src: "/images/heroes/svc-marketing-hero.jpg",
      alt: "Laptop open to a marketing analytics dashboard with charts and campaign metrics",
      objectPosition: "center 48%",
    },
    overview: {
      src: "/images/services/svc-marketing-overview.jpg",
      alt: "Team reviewing digital campaign performance on screens in a modern studio",
      objectPosition: "center 40%",
    },
  },
} as const satisfies Record<string, ServiceMedia>;

export type ServiceMediaSlug = keyof typeof serviceMedia;

export function getServiceMedia(slug: string): ServiceMedia | null {
  if (slug in serviceMedia) {
    return serviceMedia[slug as ServiceMediaSlug];
  }
  return null;
}
