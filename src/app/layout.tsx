import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { GridBackground } from "@/components/ui/GridBackground";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { site } from "@/lib/site";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
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
      className={`${bebas.variable} ${inter.variable} ${jetbrains.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <SmoothScroll />
          <ScrollToTop />
          <GridBackground />
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
