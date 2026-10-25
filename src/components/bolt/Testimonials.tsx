"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { boltTestimonials as testimonials } from "@/lib/bolt-home-data";
import { Reveal } from "./Reveal";

function getOffset(index: number, selected: number, total: number) {
  let offset = index - selected;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export function Testimonials() {
  const [selected, setSelected] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const moveSelection = (direction: number) => {
    setSelected((current) => (current + direction + testimonials.length) % testimonials.length);
    setTilt({ x: 0, y: 0 });
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 10 });
  };

  return (
    <section id="testimonials" className="relative overflow-hidden border-y border-ink-200/70 bg-ink-50 py-28 dark:border-ink-800/80 dark:bg-ink-950 lg:py-36">
      <div className="absolute inset-0 grid-faint pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-mono uppercase tracking-wide2 text-accent-500">Partner correspondence</p>
            <h2 className="font-display text-5xl leading-[0.95] tracking-tightest text-ink-900 dark:text-ink-50 sm:text-6xl">
              Systems people actually use.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-500 dark:text-ink-400 sm:text-base">
              Notes from operators across Karachi. Bring a card forward, then open it for the full story.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto mt-14 max-w-5xl [perspective:1400px] sm:mt-20">
            <div className="relative h-[390px] sm:h-[420px]">
              {testimonials.map((testimonial, index) => {
                const offset = getOffset(index, selected, testimonials.length);
                const isSelected = offset === 0;
                const distance = Math.abs(offset);
                const style: CSSProperties = {
                  zIndex: 20 - distance,
                  opacity: distance > 2 ? 0 : 1 - distance * 0.16,
                  transform: isSelected
                    ? `translate(-50%, -50%) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                    : `translate(calc(-50% + ${offset * 225}px), calc(-50% + ${distance * 8}px)) rotateZ(${offset * 2.5}deg) scale(${1 - distance * 0.035})`,
                  pointerEvents: distance > 2 ? 'none' : 'auto',
                };

                return (
                  <button
                    key={testimonial.company}
                    type="button"
                    aria-label={`Show testimonial from ${testimonial.company}`}
                    aria-pressed={isSelected}
                    className={`absolute left-1/2 top-1/2 h-[330px] w-[min(82vw,370px)] origin-center rounded-2xl border p-6 text-left transition-[transform,box-shadow,border-color,opacity] duration-500 ease-out sm:h-[350px] sm:w-[390px] sm:p-7 ${
                      isSelected
                        ? 'border-accent-500 bg-white shadow-[0_28px_80px_rgba(17,28,49,0.18)] dark:bg-ink-900 dark:shadow-[0_28px_80px_rgba(0,0,0,0.4)]'
                        : 'border-ink-200 bg-white/90 shadow-[0_18px_50px_rgba(17,28,49,0.08)] dark:border-ink-800 dark:bg-ink-900/90 dark:shadow-[0_18px_50px_rgba(0,0,0,0.24)]'
                    }`}
                    style={style}
                    onClick={() => {
                      setSelected(index);
                      setTilt({ x: 0, y: 0 });
                    }}
                    onPointerMove={isSelected ? handlePointerMove : undefined}
                    onPointerLeave={isSelected ? () => setTilt({ x: 0, y: 0 }) : undefined}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-xs text-accent-500">{testimonial.name}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wide2 text-ink-400">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="mt-7 font-display text-2xl leading-[1.05] tracking-wide text-ink-900 dark:text-ink-50 sm:text-3xl">
                      {testimonial.quote}
                    </p>
                    <p className="mt-5 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{testimonial.detail}</p>
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between sm:bottom-7 sm:left-7 sm:right-7">
                      <span className="font-mono text-xs text-accent-600 dark:text-accent-400">{isSelected ? 'Open full note' : 'Bring forward'}</span>
                      <ChevronDown size={16} className={`text-ink-400 transition-transform ${isSelected ? 'text-accent-500' : ''}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col items-center gap-5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => moveSelection(-1)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-300 bg-white text-ink-700 transition-colors hover:border-accent-500 hover:text-accent-500 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-2" aria-label={`${selected + 1} of ${testimonials.length}`}>
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={testimonial.company}
                      type="button"
                      aria-label={`Select testimonial ${index + 1}`}
                      onClick={() => {
                        setSelected(index);
                        setTilt({ x: 0, y: 0 });
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${index === selected ? 'w-5 bg-accent-500' : 'w-2 bg-ink-300 hover:bg-accent-300 dark:bg-ink-700'}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => moveSelection(1)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-300 bg-white text-ink-700 transition-colors hover:border-accent-500 hover:text-accent-500 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-200"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              <p className="text-xs font-mono text-ink-400">{testimonials[selected].name} <span className="mx-2 text-ink-300 dark:text-ink-400">·</span> {testimonials[selected].company}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
