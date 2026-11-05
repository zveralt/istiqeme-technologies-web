import Link from "next/link";
import { LEGAL_LAST_UPDATED, legalNav, type LegalDocument } from "@/lib/legal/meta";

export function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  const related = legalNav.filter((item) => item.slug !== doc.slug && item.slug !== "cookie-preferences");

  return (
    <article className="itq-legal">
      <header className="itq-legal__header">
        <p className="itq-legal__eyebrow">Legal</p>
        <h1 className="itq-legal__title font-display">{doc.title}</h1>
        <p className="itq-legal__desc">{doc.description}</p>
        <p className="itq-legal__meta">Last updated: {LEGAL_LAST_UPDATED}</p>
      </header>

      <div className="itq-legal__layout">
        <nav className="itq-legal__toc" aria-label="On this page">
          <p className="itq-legal__toc-title">On this page</p>
          <ul>
            {doc.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title.replace(/^\d+\.\s*/, "")}</a>
              </li>
            ))}
          </ul>
          <p className="itq-legal__toc-title mt-6">Related</p>
          <ul>
            {related.slice(0, 5).map((item) => (
              <li key={item.slug}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="itq-legal__body">
          {doc.sections.map((section) => (
            <section key={section.id} id={section.id} className="itq-legal__section">
              <h2>{section.title}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          <footer className="itq-legal__footer-note">
            <p>
              This document is provided for transparency and does not constitute legal advice.{" "}
              <Link href="/legal/privacy-policy">Privacy Policy</Link> ·{" "}
              <Link href="/contact">Contact</Link>
            </p>
          </footer>
        </div>
      </div>
    </article>
  );
}
