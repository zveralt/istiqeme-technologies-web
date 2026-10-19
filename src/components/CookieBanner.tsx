"use client";

import { useEffect, useState } from "react";

const KEY = "istiqeme-cookie-choice";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  function choose(value: "accept" | "decline") {
    localStorage.setItem(KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="itq-surface mx-auto flex max-w-3xl flex-col gap-4 p-4 text-card-foreground !shadow-[var(--shadow-float)] md:flex-row md:items-center md:justify-between">
        <p className="text-[14px] leading-relaxed text-ink-soft">
          We use a single preference on this device to remember this choice. No extra trackers are loaded.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("decline")}
            className="itq-glow-btn itq-glow-btn-outline itq-glow-btn-sm"
          >
            Decline
          </button>
          <button type="button" onClick={() => choose("accept")} className="itq-glow-btn itq-glow-btn-sm">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
