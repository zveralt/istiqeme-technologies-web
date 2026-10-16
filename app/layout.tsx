import type { Metadata } from "next";
import { Fraunces, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { RouteLoading } from "@/components/RouteLoading";
import { site } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-fraunces",
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
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <div className="grain" aria-hidden />
        <RouteLoading />
        <Header />
        <main className="pb-24">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <CookieBanner />
      </body>
    </html>
  );
}
