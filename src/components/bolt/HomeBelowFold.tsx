import dynamic from "next/dynamic";

const Workflow = dynamic(() => import("@/components/bolt/Workflow").then((m) => ({ default: m.Workflow })));
const Projects = dynamic(() => import("@/components/bolt/Projects").then((m) => ({ default: m.Projects })));
const Testimonials = dynamic(() =>
  import("@/components/bolt/Testimonials").then((m) => ({ default: m.Testimonials })),
);
const AIDemo = dynamic(() => import("@/components/bolt/AIDemo").then((m) => ({ default: m.AIDemo })));
const Process = dynamic(() => import("@/components/bolt/Process").then((m) => ({ default: m.Process })));
const InquiryForm = dynamic(() =>
  import("@/components/bolt/InquiryForm").then((m) => ({ default: m.InquiryForm })),
);

/** Below-the-fold homepage sections — separate chunks to improve initial JS parse cost. */
export function HomeBelowFold() {
  return (
    <>
      <Workflow />
      <Projects />
      <Testimonials />
      <AIDemo />
      <Process />
      <InquiryForm />
    </>
  );
}
