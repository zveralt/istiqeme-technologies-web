import { AIDemo } from "@/components/bolt/AIDemo";
import { FinalCTA } from "@/components/bolt/FinalCTA";
import { Hero } from "@/components/bolt/Hero";
import { InquiryForm } from "@/components/bolt/InquiryForm";
import { Process } from "@/components/bolt/Process";
import { Projects } from "@/components/bolt/Projects";
import { Services } from "@/components/bolt/Services";
import { Testimonials } from "@/components/bolt/Testimonials";
import { Workflow } from "@/components/bolt/Workflow";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Workflow />
      <Projects />
      <Testimonials />
      <AIDemo />
      <Process />
      <InquiryForm />
      <FinalCTA />
    </>
  );
}
