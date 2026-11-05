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
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { keywordForPath } from "@/lib/seo/keywords";
import { SITE_URL } from "@/lib/seo/site";
import { site } from "@/lib/site";

const homeSeo = keywordForPath("/");

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
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      homeSeo?.title ??
      "ISTIQEME Technologies — Websites, Software & AI in Karachi",
    template: "%s — ISTIQEME Technologies",
  },
  description: homeSeo?.description ?? site.tagline,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  keywords: [
    "website design company Karachi",
    "website development Pakistan",
    "custom software development Pakistan",
    "mobile app development Pakistan",
    "AI automation Pakistan",
    "digital marketing Karachi",
    "ISTIQEME Technologies",
  ],
  openGraph: {
    title: homeSeo?.title ?? site.name,
    description: homeSeo?.description ?? site.tagline,
    url: SITE_URL,
    siteName: site.name,
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo?.title ?? site.name,
    description: homeSeo?.description ?? site.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('istiqeme-theme-v1');if(t==='light')document.documentElement.classList.remove('dark');else document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebas.variable} ${inter.variable} ${jetbrains.variable} dark h-full`}
      data-scroll-behavior="auto"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
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
