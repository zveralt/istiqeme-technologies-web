"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type FaqItem = { question: string; answer: string };

export function ServiceFaq({
  items,
  contactNote,
}: {
  items: FaqItem[];
  contactNote?: React.ReactNode;
}) {
  const baseId = useId();
  const [open, setOpen] = useState(0);

  return (
    <div className="itq-service-faq">
      <ul className="itq-service-faq__list">
        {items.map((item, index) => {
          const isOpen = open === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-btn-${index}`;
          return (
            <li key={item.question} className={cn("itq-service-faq__item", isOpen && "is-open")}>
              <button
                id={buttonId}
                type="button"
                className="itq-service-faq__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <span className="itq-service-faq__index font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="itq-service-faq__question">{item.question}</span>
                <span className="itq-service-faq__icon" aria-hidden>
                  <span />
                  <span />
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="itq-service-faq__panel"
                data-open={isOpen ? "true" : "false"}
              >
                <div className="itq-service-faq__panel-inner">
                  <p className="itq-service-faq__answer">{item.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {contactNote ? <div className="itq-service-faq__note">{contactNote}</div> : null}
    </div>
  );
}
