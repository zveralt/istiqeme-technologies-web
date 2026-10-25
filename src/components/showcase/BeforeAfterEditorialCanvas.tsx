/* Copied from istiqeme-website BeforeAfterEditorialCanvas - keep behavior identical. */
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps, react-hooks/refs */
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, GripVertical } from "lucide-react";
import { portfolioCopy } from "./data/portfolio-section";
import { useAnimInView } from "./hooks/useAnimInView";
import { useGatedHeritageReveal } from "./hooks/useGatedHeritageReveal";
import { TechDisplayHeading } from "./ui/TechDisplayHeading";
import { TechRule } from "./ui/TechRule";
import {
  canSyncScroll,
  getPairedShowcaseHost,
  isShowcaseScrollMessage,
  resolveLegacyEmbedUrl,
  resolveReframeEmbedUrl,
} from "./showcaseProxy";

type Comparison = (typeof portfolioCopy.beforeAfterComparisons)[number];

const REFRAME_POSITION = 0;
const LEGACY_POSITION = 100;
const MOBILE_SLIDE = {
  reframe: 0,
  legacy: 1,
} as const;

type MobileSlideIndex = (typeof MOBILE_SLIDE)[keyof typeof MOBILE_SLIDE];

export function BeforeAfterEditorialCanvas() {
  const sectionRef = useRef<HTMLElement>(null);
  useGatedHeritageReveal(sectionRef);
  useAnimInView(sectionRef);

  const comparisons = portfolioCopy.beforeAfterComparisons;
  const [activeId, setActiveId] = useState(comparisons[0].id);
  const active = comparisons.find((c) => c.id === activeId) ?? comparisons[0];

  return (
    <section
      ref={sectionRef}
      className="heritage-reveal relative z-10"
      data-reveal="pending"
      aria-label="Before and after web design comparison"
    >
      <TechDisplayHeading
        lines={[portfolioCopy.beforeAfterTitle]}
        as="h2"
        size="section"
        className="mb-4"
      />
      <p className="tech-body text-sm sm:text-base tech-body-muted mb-8 max-w-2xl">
        {portfolioCopy.beforeAfterSubtitle}
      </p>
      <TechRule className="mb-8 border-white/15" />

      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Select portfolio framework"
      >
        {comparisons.map((comparison) => {
          const selected = comparison.id === activeId;
          return (
            <button
              key={comparison.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(comparison.id)}
              className={`tech-cta text-[0.6rem] min-h-[44px] ${selected ? "border-[#7DA4D4]/50 text-white" : ""}`}
            >
              {comparison.tabLabel}
            </button>
          );
        })}
      </div>

      <p className="tech-body text-sm tech-body-muted mb-8 max-w-2xl">{active.subtitle}</p>

      <BeforeAfterSlider
        key={active.id}
        comparison={active}
        legacyEmbedUrl={resolveLegacyEmbedUrl(active)}
        reframeEmbedUrl={resolveReframeEmbedUrl(active)}
      />
    </section>
  );
}

function BeforeAfterSlider({
  comparison,
  legacyEmbedUrl,
  reframeEmbedUrl,
}: {
  comparison: Comparison;
  legacyEmbedUrl: string;
  reframeEmbedUrl: string;
}) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [mobileSlide, setMobileSlide] = useState<MobileSlideIndex>(MOBILE_SLIDE.reframe);
  const [legacyRequested, setLegacyRequested] = useState(false);
  const touchStartXRef = useRef(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const legacyLayerRef = useRef<HTMLDivElement>(null);
  const reframeLayerRef = useRef<HTMLDivElement>(null);
  /** Mobile + desktop each mount a frame per host ? keep every live iframe. */
  const frameRefs = useRef<Record<string, Set<HTMLIFrameElement>>>({});
  const splitRef = useRef(50);
  const pointerXRef = useRef(0);
  const syncScroll = canSyncScroll(comparison);

  const requestLegacy = useCallback(() => {
    setLegacyRequested(true);
  }, []);

  const pairRef = useRef({
    legacyHostId: comparison.legacyHostId,
    reframeHostId: comparison.reframeHostId,
  });
  pairRef.current = {
    legacyHostId: comparison.legacyHostId,
    reframeHostId: comparison.reframeHostId,
  };

  const clampPosition = useCallback((pct: number) => Math.max(0, Math.min(100, pct)), []);

  const updateLayerPointerEvents = useCallback((pct: number, clientX: number, dragging: boolean) => {
    const legacyEl = legacyLayerRef.current;
    const reframeEl = reframeLayerRef.current;
    const container = containerRef.current;
    if (!legacyEl || !reframeEl || !container) return;

    if (dragging) {
      legacyEl.style.pointerEvents = "none";
      reframeEl.style.pointerEvents = "none";
      return;
    }

    const rect = container.getBoundingClientRect();
    const dividerX = rect.left + (pct / 100) * rect.width;
    const reframeActive = pct <= 1 || (pct < 99 && clientX >= dividerX);

    legacyEl.style.pointerEvents = reframeActive ? "none" : "auto";
    reframeEl.style.pointerEvents = reframeActive ? "auto" : "none";
  }, []);

  const applySplit = useCallback(
    (pct: number, options?: { animate?: boolean; clientX?: number; dragging?: boolean }) => {
      const clamped = clampPosition(pct);
      splitRef.current = clamped;

      if (clipRef.current) {
        clipRef.current.style.clipPath = `inset(0 0 0 ${clamped}%)`;
        clipRef.current.style.transition = options?.animate
          ? "clip-path 0.45s ease-in-out"
          : "none";
      }
      if (handleRef.current) {
        handleRef.current.style.left = `${clamped}%`;
        handleRef.current.style.transition = options?.animate ? "left 0.45s ease-in-out" : "none";
      }

      const clientX = options?.clientX ?? pointerXRef.current;
      updateLayerPointerEvents(clamped, clientX, options?.dragging ?? false);
    },
    [clampPosition, updateLayerPointerEvents],
  );

  const calcPositionFromClientX = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return splitRef.current;
      const rect = el.getBoundingClientRect();
      return clampPosition(((clientX - rect.left) / rect.width) * 100);
    },
    [clampPosition],
  );

  const snapTo = useCallback(
    (pct: number) => {
      if (pct > 0) requestLegacy();
      applySplit(pct, { animate: true });
      setPosition(clampPosition(pct));
    },
    [applySplit, clampPosition, requestLegacy],
  );

  useEffect(() => {
    applySplit(50);
    setPosition(50);
    setMobileSlide(MOBILE_SLIDE.reframe);
    setLegacyRequested(false);
    // Reset split when switching portfolio tab only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comparison.id]);

  // Desktop mid-split shows both specimens — stagger legacy so reframe paints first.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const id = window.setTimeout(() => requestLegacy(), 450);
    return () => window.clearTimeout(id);
  }, [comparison.id, requestLegacy]);

  const goToMobileSlide = useCallback(
    (slide: MobileSlideIndex) => {
      if (slide === MOBILE_SLIDE.legacy) requestLegacy();
      setMobileSlide(slide);
    },
    [requestLegacy],
  );

  const goToPrevSlide = useCallback(() => {
    goToMobileSlide(MOBILE_SLIDE.legacy);
  }, [goToMobileSlide]);

  const goToNextSlide = useCallback(() => {
    goToMobileSlide(MOBILE_SLIDE.reframe);
  }, [goToMobileSlide]);

  const onMobileTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? 0;
  };

  const onMobileTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches[0];
    if (!touch) return;
    const delta = touch.clientX - touchStartXRef.current;
    if (Math.abs(delta) < 48) return;
    if (delta > 0) {
      goToPrevSlide();
      return;
    }
    goToNextSlide();
  };

  const tabletSlideIndex = position >= 50 ? MOBILE_SLIDE.legacy : MOBILE_SLIDE.reframe;

  const onTabletPrev = () => snapTo(LEGACY_POSITION);
  const onTabletNext = () => snapTo(REFRAME_POSITION);
  const onTabletSelect = (index: MobileSlideIndex) => {
    snapTo(index === MOBILE_SLIDE.legacy ? LEGACY_POSITION : REFRAME_POSITION);
  };

  useEffect(() => {
    if (!isDragging) return;

    requestLegacy();
    if (clipRef.current) {
      clipRef.current.style.willChange = "clip-path";
    }

    let raf = 0;
    let pendingX: number | null = null;

    const flush = () => {
      raf = 0;
      if (pendingX === null) return;
      const x = pendingX;
      pendingX = null;
      pointerXRef.current = x;
      const pct = calcPositionFromClientX(x);
      applySplit(pct, { clientX: x, dragging: true });
    };

    const onMove = (e: PointerEvent) => {
      pendingX = e.clientX;
      if (!raf) raf = window.requestAnimationFrame(flush);
    };

    const onUp = (e: PointerEvent) => {
      if (raf) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      }
      setIsDragging(false);
      if (clipRef.current) {
        clipRef.current.style.willChange = "auto";
      }
      const pct = calcPositionFromClientX(e.clientX);
      applySplit(pct, { clientX: e.clientX, dragging: false });
      setPosition(pct);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (raf) window.cancelAnimationFrame(raf);
      if (clipRef.current) {
        clipRef.current.style.willChange = "auto";
      }
    };
  }, [isDragging, applySplit, calcPositionFromClientX, requestLegacy]);

  useEffect(() => {
    if (!syncScroll) return;

    let lastSent = 0;
    const onMessage = (event: MessageEvent) => {
      if (!isShowcaseScrollMessage(event.data)) return;
      const now = performance.now();
      if (now - lastSent < 32) return;
      lastSent = now;

      const { legacyHostId, reframeHostId } = pairRef.current;
      const pairedHost = getPairedShowcaseHost(
        event.data.siteId,
        legacyHostId,
        reframeHostId,
      );
      if (!pairedHost) return;

      const payload = {
        type: "istiqeme-showcase-set-scroll" as const,
        targetSiteId: pairedHost,
        y: event.data.y,
        progress: event.data.progress,
      };

      const targets = new Set<HTMLIFrameElement>();
      frameRefs.current[pairedHost]?.forEach((frame) => targets.add(frame));
      // Fallback when mobile/desktop remounts drop callback refs.
      document.querySelectorAll("iframe").forEach((frame) => {
        const src = frame.src || "";
        if (!src) return;
        if (pairedHost.startsWith("placeholder-")) {
          const placeholderId = pairedHost.slice("placeholder-".length);
          if (
            src.includes("/api/showcase-placeholder") &&
            src.includes(`id=${encodeURIComponent(placeholderId)}`)
          ) {
            targets.add(frame);
          }
          return;
        }
        if (src.includes(pairedHost)) targets.add(frame);
      });

      targets.forEach((frame) => {
        frame.contentWindow?.postMessage(payload, "*");
      });
    };

    window.addEventListener("message", onMessage, false);
    return () => window.removeEventListener("message", onMessage, false);
  }, [syncScroll]);

  const onHandlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerXRef.current = e.clientX;
    const pct = calcPositionFromClientX(e.clientX);
    applySplit(pct, { clientX: e.clientX, dragging: true });
  };

  const onViewportPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) return;
    pointerXRef.current = e.clientX;
    updateLayerPointerEvents(splitRef.current, e.clientX, false);
  };

  const showLegacy = position >= 65;
  const showReframe = position <= 35;

  const registerFrame = useCallback(
    (hostId: string) => (node: HTMLIFrameElement | null) => {
      const bucket = (frameRefs.current[hostId] ??= new Set());
      if (!node) return;
      bucket.add(node);
      return () => {
        bucket.delete(node);
      };
    },
    [],
  );

  return (
    <div className="space-y-6">
      <div
        className="md:hidden relative border border-white/10 bg-[#0A0F1D] overflow-hidden"
        onTouchStart={onMobileTouchStart}
        onTouchEnd={onMobileTouchEnd}
      >
        <div className="relative h-[58vh] min-h-[480px] max-h-[640px]">
          <div
            className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
              mobileSlide === MOBILE_SLIDE.legacy
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={mobileSlide !== MOBILE_SLIDE.legacy}
          >
            <SiteFrame
              embedUrl={legacyEmbedUrl}
              label={portfolioCopy.beforeAfterSpecimenA}
              iframeRef={registerFrame(comparison.legacyHostId)}
              enabled={legacyRequested || mobileSlide === MOBILE_SLIDE.legacy}
            />
          </div>
          <div
            className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
              mobileSlide === MOBILE_SLIDE.reframe
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={mobileSlide !== MOBILE_SLIDE.reframe}
          >
            <SiteFrame
              embedUrl={reframeEmbedUrl}
              label={portfolioCopy.beforeAfterSpecimenB}
              iframeRef={registerFrame(comparison.reframeHostId)}
              enabled
            />
          </div>
        </div>
        <ComparisonSliderNav
          activeIndex={mobileSlide}
          labels={[portfolioCopy.beforeAfterToggleB, portfolioCopy.beforeAfterToggleA]}
          onPrev={goToPrevSlide}
          onNext={goToNextSlide}
          onSelect={goToMobileSlide}
          className="border-t border-white/10 bg-[#121A2E]/95"
        />
      </div>

      <div className="hidden md:block">
      <div
        ref={containerRef}
        className="noir-before-after relative z-10 overflow-hidden border border-white/10 bg-[#0A0F1D]"
        role="group"
        aria-label={`Before and after comparison for ${comparison.tabLabel}`}
      >
        <div
          className="relative h-[28rem] sm:h-[32rem] md:h-[44rem] lg:h-[36rem]"
          onPointerMove={onViewportPointerMove}
        >
          <div ref={legacyLayerRef} className="absolute inset-0">
            <SiteFrame
              embedUrl={legacyEmbedUrl}
              label={portfolioCopy.beforeAfterSpecimenA}
              iframeRef={registerFrame(comparison.legacyHostId)}
              enabled={legacyRequested}
            />
          </div>

          <div
            ref={clipRef}
            className="noir-before-after-clip absolute inset-0"
            style={{ clipPath: "inset(0 0 0 50%)" }}
          >
            <div ref={reframeLayerRef} className="absolute inset-0">
              <SiteFrame
                embedUrl={reframeEmbedUrl}
                label={portfolioCopy.beforeAfterSpecimenB}
                iframeRef={registerFrame(comparison.reframeHostId)}
                enabled
              />
            </div>
          </div>

          <div
            ref={handleRef}
            data-drag-handle
            className="noir-before-after__handle-touch absolute inset-y-0 z-50 flex w-10 -translate-x-1/2 cursor-col-resize touch-none items-center justify-center"
            style={{ left: "50%" }}
            onPointerDown={onHandlePointerDown}
            role="slider"
            aria-label="Drag to compare specimens"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") snapTo(position - 5);
              if (e.key === "ArrowRight") snapTo(position + 5);
              if (e.key === "Home") snapTo(REFRAME_POSITION);
              if (e.key === "End") snapTo(LEGACY_POSITION);
            }}
          >
            <div className="noir-before-after__grip flex h-14 w-7 cursor-col-resize flex-col items-center justify-center border border-[#7DA4D4]/40 bg-[#121A2E] shadow-[0_0_24px_rgb(125_164_212/0.15)] transition-colors lg:hover:border-[#7DA4D4]/70">
              <GripVertical className="h-4 w-4 text-[#7DA4D4]" strokeWidth={1.5} />
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#7DA4D4]/50" />
          </div>
        </div>
        <ComparisonSliderNav
          activeIndex={tabletSlideIndex}
          labels={[portfolioCopy.beforeAfterToggleB, portfolioCopy.beforeAfterToggleA]}
          onPrev={onTabletPrev}
          onNext={onTabletNext}
          onSelect={onTabletSelect}
          className="lg:hidden absolute inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-[#121A2E]/95 backdrop-blur-sm"
          overlay
        />
      </div>
      </div>

      <div className="hidden lg:flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="tech-meta text-[0.5rem] tracking-[0.28em] text-[#94A3B8]">
          {portfolioCopy.beforeAfterDragHint}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => snapTo(LEGACY_POSITION)}
            className={`tech-cta text-[0.6rem] min-h-[44px] ${showLegacy ? "border-[#7DA4D4]/50 text-white" : ""}`}
          >
            {portfolioCopy.beforeAfterToggleA}
          </button>
          <button
            type="button"
            onClick={() => snapTo(REFRAME_POSITION)}
            className={`tech-cta text-[0.6rem] min-h-[44px] ${showReframe ? "border-[#7DA4D4]/50 text-white" : ""}`}
          >
            {portfolioCopy.beforeAfterToggleB}
          </button>
        </div>
      </div>
    </div>
  );
}

function ComparisonSliderNav({
  activeIndex,
  labels,
  onPrev,
  onNext,
  onSelect,
  className = "",
  overlay = false,
}: {
  activeIndex: MobileSlideIndex;
  labels: [string, string];
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: MobileSlideIndex) => void;
  className?: string;
  overlay?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-4 ${overlay ? "pointer-events-auto" : ""} ${className}`}
      role="toolbar"
      aria-label="Compare before and after specimens"
    >
      <button
        type="button"
        onClick={onPrev}
        aria-label={`Show ${labels[1]}`}
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-white/15 p-3 text-[#7DA4D4] transition-colors active:border-[#7DA4D4]/60 active:text-white focus-visible:border-[#7DA4D4]/60 focus-visible:text-white"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden />
      </button>

      <div className="flex min-w-0 flex-1 flex-col items-center gap-2 px-1">
        <div className="flex items-center gap-2.5" role="tablist" aria-label="Specimen pagination">
          {labels.map((label, index) => {
            const slideIndex = index as MobileSlideIndex;
            const selected = activeIndex === slideIndex;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={label}
                onClick={() => onSelect(slideIndex)}
                className={`min-h-[44px] min-w-[44px] rounded-full border p-3 transition-colors ${
                  selected
                    ? "border-[#7DA4D4] bg-[#7DA4D4]/15 shadow-[0_0_12px_rgb(125_164_212/0.2)]"
                    : "border-white/20 bg-transparent active:border-[#7DA4D4]/50"
                }`}
              >
                <span
                  className={`block h-2 w-2 rounded-full ${selected ? "bg-[#7DA4D4]" : "bg-[#94A3B8]/70"}`}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>
        <p className="tech-meta truncate text-[0.5rem] tracking-[0.22em] text-[#94A3B8]">
          {labels[activeIndex]}
        </p>
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label={`Show ${labels[0]}`}
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-white/15 p-3 text-[#7DA4D4] transition-colors active:border-[#7DA4D4]/60 active:text-white focus-visible:border-[#7DA4D4]/60 focus-visible:text-white"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden />
      </button>
    </div>
  );
}

function SiteFrame({
  embedUrl,
  label,
  iframeRef,
  enabled = true,
}: {
  embedUrl: string;
  label: string;
  iframeRef: (node: HTMLIFrameElement | null) => void | (() => void);
  enabled?: boolean;
}) {
  const [loadState, setLoadState] = useState<"loading" | "ready">("loading");
  const [iframeSrc, setIframeSrc] = useState<string | undefined>();
  const [nearViewport, setNearViewport] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoadState("loading");
    setIframeSrc(undefined);
    setNearViewport(false);
  }, [embedUrl]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [embedUrl]);

  useEffect(() => {
    if (!enabled || !nearViewport) return;
    setIframeSrc(embedUrl);
  }, [enabled, nearViewport, embedUrl]);

  return (
    <div ref={containerRef} className="flex h-full flex-col bg-[#0A0F1D]">
      <div className="shrink-0 border-b border-white/10 bg-[#121A2E] px-4 py-2.5 sm:px-5">
        <p className="tech-meta text-[0.5rem] tracking-[0.28em] text-[#7DA4D4]">{label}</p>
      </div>
      <div className="relative min-h-0 flex-1 bg-[#0A0F1D]">
        {loadState === "loading" && (
          <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center bg-[#121A2E]">
            <p className="tech-meta text-[0.5rem] tracking-[0.3em] text-[#7DA4D4] animate-pulse">
              LOADING SPECIMEN...
            </p>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          title={label}
          className="h-full w-full border-0 bg-white"
          loading="lazy"
          onLoad={() => setLoadState("ready")}
        />
      </div>
    </div>
  );
}
