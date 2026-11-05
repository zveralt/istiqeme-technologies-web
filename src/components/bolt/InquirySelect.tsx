"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { inquiryInputClass } from "@/components/bolt/inquiry-field-styles";

export type InquirySelectOption = { value: string; label: string };

type InquirySelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: InquirySelectOption[];
  placeholder: string;
  hasError?: boolean;
  id?: string;
};

export function InquirySelect({
  value,
  onChange,
  options,
  placeholder,
  hasError = false,
  id,
}: InquirySelectProps) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();
  const buttonId = id ?? generatedId;

  const selected = options.find((o) => o.value === value);
  const display = selected?.label ?? placeholder;
  const isPlaceholder = !value;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const idx = Math.max(
      0,
      options.findIndex((o) => o.value === value),
    );
    setHighlight(idx >= 0 ? idx : 0);
  }, [open, options, value]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const row = listRef.current.children[highlight] as HTMLElement | undefined;
    const btn = row?.querySelector("button");
    const list = listRef.current;
    if (!btn) return;
    const rowTop = btn.offsetTop;
    const rowBottom = rowTop + btn.offsetHeight;
    const viewTop = list.scrollTop;
    const viewBottom = viewTop + list.clientHeight;
    if (rowTop < viewTop) list.scrollTop = rowTop;
    else if (rowBottom > viewBottom) list.scrollTop = rowBottom - list.clientHeight;
  }, [highlight, open]);

  const choose = (next: string) => {
    onChange(next);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, options.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[highlight];
      if (opt) choose(opt.value);
    }
  };

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        id={buttonId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${buttonId}-listbox`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className={cn(
          inquiryInputClass(hasError, "flex min-h-[42px] items-center justify-between gap-3 text-left"),
          isPlaceholder && "text-ink-400 dark:text-ink-600",
        )}
      >
        <span className="truncate">{display}</span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={cn("shrink-0 text-ink-400 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-ink-200 bg-white shadow-xl shadow-black/10 ring-1 ring-black/5 dark:border-ink-700 dark:bg-ink-900 dark:shadow-black/40 dark:ring-white/10"
        >
          <ul
            ref={listRef}
            id={`${buttonId}-listbox`}
            role="listbox"
            aria-labelledby={buttonId}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            className="itq-inquiry-select-menu max-h-64 overscroll-contain py-1.5"
          >
          {options.map((opt, i) => {
            const active = opt.value === value;
            const hot = i === highlight;
            return (
              <li key={opt.value || `opt-${i}`} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 px-3.5 py-2.5 text-left text-sm transition-colors",
                    hot && !active && "bg-ink-100 dark:bg-ink-800/80",
                    active
                      ? "bg-accent-500/12 text-accent-600 dark:text-accent-400"
                      : "text-ink-800 dark:text-ink-100",
                  )}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => choose(opt.value)}
                >
                  <span className="text-pretty">{opt.label}</span>
                  {active ? <Check size={15} strokeWidth={2.5} className="shrink-0 text-accent-500" aria-hidden /> : null}
                </button>
              </li>
            );
          })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
