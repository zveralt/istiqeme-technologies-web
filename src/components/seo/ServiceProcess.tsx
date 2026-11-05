"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { getLenis } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

type ProcessStep = { step: string; title: string; body: string };

/**
 * Service-page process journey with one continuous progress track.
 * Progress is driven by scroll through the enclosing section (Lenis-aware)
 * and painted via CSS vars. React state only updates when the active step changes.
 */
export function ServiceProcess({ steps }: { steps: ProcessStep[] }) {
  const rootRef = useRef<HTMLOListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || steps.length < 1) return;

    const progressRoot =
      (root.closest("section") as HTMLElement | null) ??
      (root.parentElement as HTMLElement | null) ??
      root;

    let frame = 0;
    let lastActive = -1;
    let lastProgress = -1;
    let lastGeomKey = "";

    const nodes = () => nodeRefs.current.filter(Boolean) as HTMLSpanElement[];

    const paintGeometry = () => {
      const list = nodes();
      if (list.length < 2) return;

      const orientation: "horizontal" | "vertical" = window.matchMedia(
        "(min-width: 1024px)",
      ).matches
        ? "horizontal"
        : "vertical";

      const rootRect = root.getBoundingClientRect();
      const first = list[0].getBoundingClientRect();
      const last = list[list.length - 1].getBoundingClientRect();
      const x0 = first.left + first.width / 2 - rootRect.left;
      const y0 = first.top + first.height / 2 - rootRect.top;
      const x1 = last.left + last.width / 2 - rootRect.left;
      const y1 = last.top + last.height / 2 - rootRect.top;

      const key =
        orientation === "horizontal"
          ? `h:${x0.toFixed(1)}:${y0.toFixed(1)}:${(x1 - x0).toFixed(1)}`
          : `v:${x0.toFixed(1)}:${y0.toFixed(1)}:${(y1 - y0).toFixed(1)}`;

      if (key === lastGeomKey) return;
      lastGeomKey = key;

      track.dataset.orientation = orientation;

      if (orientation === "horizontal") {
        track.style.left = `${x0}px`;
        track.style.top = `${y0}px`;
        track.style.width = `${Math.max(0, x1 - x0)}px`;
        track.style.height = "2px";
      } else {
        track.style.left = `${x0}px`;
        track.style.top = `${y0}px`;
        track.style.height = `${Math.max(0, y1 - y0)}px`;
        track.style.width = "2px";
      }
    };

    const update = () => {
      frame = 0;
      const list = nodes();
      if (list.length < 1) return;

      paintGeometry();

      const view = window.innerHeight;
      const sectionRect = progressRoot.getBoundingClientRect();

      // Section-based travel so a short horizontal step row still completes to 100%.
      const start = view * 0.72;
      const end = view * 0.28;
      const travel = Math.max(1, sectionRect.height + (start - end));
      let progress = (start - sectionRect.top) / travel;

      if (sectionRect.bottom <= end) progress = 1;
      if (sectionRect.top >= start) progress = 0;
      progress = Math.min(1, Math.max(0, progress));

      if (Math.abs(progress - lastProgress) > 0.0005) {
        lastProgress = progress;
        track.style.setProperty("--process-progress", String(progress));
      }

      // Fill spans first→last node; light a node when the fill reaches its center.
      const span = Math.max(1, list.length - 1);
      const nextActive =
        progress >= 0.999
          ? list.length - 1
          : Math.min(list.length - 1, Math.floor(progress * span + 1e-4));

      if (nextActive !== lastActive) {
        lastActive = nextActive;
        setActiveIndex(nextActive);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    const settleA = window.setTimeout(schedule, 120);
    const settleB = window.setTimeout(schedule, 480);

    const lenis = getLenis();
    const unsubLenis = lenis?.on("scroll", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    const ro = new ResizeObserver(schedule);
    ro.observe(root);
    if (progressRoot !== root) ro.observe(progressRoot);

    const mq = window.matchMedia("(min-width: 1024px)");
    mq.addEventListener("change", schedule);

    return () => {
      window.clearTimeout(settleA);
      window.clearTimeout(settleB);
      unsubLenis?.();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mq.removeEventListener("change", schedule);
      ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [steps.length]);

  return (
    <ol
      ref={rootRef}
      className="itq-service-process"
      style={{ ["--process-cols" as string]: String(Math.max(1, steps.length)) }}
    >
      <div ref={trackRef} className="itq-service-process__track" aria-hidden>
        <span className="itq-service-process__track-rail" />
        <span className="itq-service-process__track-fill" />
      </div>

      {steps.map((step, index) => {
        const reached = index <= activeIndex;
        return (
          <Reveal
            as="li"
            key={step.step}
            delay={index * 45}
            className={cn("itq-service-process__step", reached && "is-reached")}
            data-reached={reached ? "true" : "false"}
          >
            <span
              ref={(node) => {
                nodeRefs.current[index] = node;
              }}
              className="itq-service-process__node"
              aria-hidden
            />
            <div className="itq-service-process__content">
              <p className="itq-service-process__index">{step.step}</p>
              <h3 className="itq-service-process__title">{step.title}</h3>
              <p className="itq-service-process__body">{step.body}</p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
