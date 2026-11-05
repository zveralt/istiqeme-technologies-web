import { ButtonLink } from "@/components/Button";
import { Guide } from "@/components/Guide";
import { HomeHero } from "@/components/HomeHero";
import { Intake } from "@/components/Intake";
import { LeadDemo } from "@/components/LeadDemo";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { WorkCard } from "@/components/WorkCard";
import { AiHomeTeaser } from "@/components/ai/AiHomeTeaser";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { pillars, problems, services, site, work } from "@/lib/site";
import Link from "next/link";

function stackStyle(index: number) {
  return {
    top: 120,
    zIndex: index + 1,
    background: `linear-gradient(${150 + index * 8}deg, #0e3a66 0%, #164e86 58%, #0b2744 100%)`,
    color: "#ffffff",
    border: "1px solid rgba(214, 230, 255, 0.22)",
  };
}