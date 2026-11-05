import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { getLegalDocument } from "@/lib/legal/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return [
    { slug: "privacy-policy" },
    { slug: "terms" },
    { slug: "cookie-policy" },
    { slug: "ai-disclosure" },
    { slug: "intellectual-property" },
    { slug: "disclaimer" },
    { slug: "accessibility" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDocument(slug);
  if (!doc) return { title: "Legal" };
  return {
    title: doc.title,
    description: doc.description,
    robots: { index: true, follow: true },
  };
}

export default async function LegalDocumentPage({ params }: Props) {
  const { slug } = await params;
  const doc = getLegalDocument(slug);
  if (!doc) notFound();
  return (
    <div className="itq-container py-28 md:py-32">
      <LegalDocumentView doc={doc} />
    </div>
  );
}
