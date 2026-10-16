import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ISTIQEME Technologies — Complex systems, beautifully simplified",
    template: "%s — ISTIQEME Technologies",
  },
  description: site.tagline,
  metadataBase: new URL("https://www.istiqeme.net"),
  openGraph: {
    title: "ISTIQEME Technologies",
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <div className="grain" aria-hidden />
        <Header />
        <main className="pb-24">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
