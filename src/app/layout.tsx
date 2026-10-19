import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Bebas_Neue, DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { site } from "@/lib/site";

/* Outfit stays on .font-display (stats, quotes).
   Bebas Neue is the heading face. DM Sans is the text face. */
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('istiqeme-theme-v1');if(t==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${outfit.variable} ${dmSans.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <ScrollToTop />
          <Header />
          <main className="relative z-10 flex-1 overflow-x-clip">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <CookieBanner />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
