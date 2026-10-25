import { showcaseScrollBridge } from "@/lib/showcase/scrollBridge";

const PLACEHOLDER_SCROLL_STYLE = `
<style>
  /* Document/window must be the scroller - body overflow breaks scroll sync. */
  html {
    margin: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }
  body {
    margin: 0;
    padding: 0;
    overflow: visible;
    min-height: 280vh;
    font-family: system-ui, -apple-system, Segoe UI, sans-serif;
  }
</style>`;

function placeholderShell(siteId: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Legacy Template</title>
  ${PLACEHOLDER_SCROLL_STYLE}
</head>
<body>
${body}
${showcaseScrollBridge(siteId)}
</body>
</html>`;
}

const serviceCards = ["Consulting", "Digital Solutions", "Support", "Training"]
  .map(
    (t) => `
    <div style="border:1px solid #cbd5e1;border-radius:8px;padding:18px;background:#f8fafc;">
      <h3 style="margin:0 0 8px;color:#1d4ed8;font-size:14px;">${t}</h3>
      <p style="margin:0;color:#64748b;font-size:12px;line-height:1.5;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
    </div>`,
  )
  .join("");

const projectCards = Array.from({ length: 4 }, (_, i) => `
  <div style="max-width:640px;margin:0 auto 16px;border:1px solid #e2e8f0;border-radius:8px;padding:16px;background:#f8fafc;">
    <h3 style="margin:0 0 6px;color:#1e40af;font-size:14px;">Project Highlight ${i + 1}</h3>
    <p style="margin:0;color:#64748b;font-size:12px;line-height:1.55;">Generic case study copy describing a successful client engagement and measurable outcomes.</p>
  </div>`).join("");

const istiqemePlaceholderBody = `
<header style="background:#1d4ed8;color:#fff;padding:14px 20px;">
  <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
    <strong style="font-size:15px;">ISTIQEME GROUP</strong>
    <nav style="display:flex;gap:14px;font-size:12px;">
      <span>Home</span><span>Services</span><span>About</span><span>Contact</span>
    </nav>
  </div>
</header>
<section style="background:#eff6ff;padding:48px 20px;text-align:center;">
  <p style="color:#2563eb;font-size:11px;font-weight:700;letter-spacing:.08em;margin:0 0 10px;">WELCOME TO OUR WEBSITE</p>
  <h1 style="color:#1e3a8a;font-size:28px;margin:0 0 12px;">Your Trusted Business Partner</h1>
  <p style="color:#475569;max-width:520px;margin:0 auto 20px;font-size:14px;line-height:1.6;">
    We provide quality solutions for all your business needs. Contact us today to learn more about what we can do for you.
  </p>
  <a href="#" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 22px;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;">Get In Touch</a>
</section>
<section style="padding:36px 20px;background:#fff;">
  <h2 style="text-align:center;color:#1d4ed8;font-size:20px;margin:0 0 24px;">Our Services</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;max-width:900px;margin:0 auto;">
    ${serviceCards}
  </div>
</section>
<section style="padding:36px 20px;background:#f1f5f9;">
  <h2 style="text-align:center;color:#334155;font-size:18px;margin:0 0 16px;">Why Choose Us?</h2>
  <ul style="max-width:560px;margin:0 auto;color:#475569;font-size:13px;line-height:1.8;padding-left:20px;">
    <li>Years of industry experience</li>
    <li>Dedicated customer support team</li>
    <li>Affordable pricing packages</li>
    <li>Trusted by businesses nationwide</li>
    <li>Fast project turnaround times</li>
  </ul>
</section>
<section style="padding:40px 20px;background:#fff;">
  <h2 style="text-align:center;color:#1d4ed8;font-size:18px;margin:0 0 20px;">Recent Projects</h2>
  ${projectCards}
</section>
<section style="padding:40px 20px;background:#1e40af;color:#fff;text-align:center;">
  <h2 style="margin:0 0 10px;font-size:18px;">Ready to Get Started?</h2>
  <p style="margin:0 0 16px;font-size:13px;opacity:.9;">Call us today or fill out our contact form.</p>
  <span style="display:inline-block;background:#fff;color:#1e40af;padding:9px 18px;border-radius:6px;font-size:12px;font-weight:700;">Contact Us Now</span>
</section>
<footer style="background:#0f172a;color:#94a3b8;text-align:center;padding:24px;font-size:11px;">
  (c) 2019 ISTIQEME Group. All rights reserved. | Privacy Policy | Terms
</footer>
`;

const pascaleProjects = Array.from({ length: 8 }, (_, i) => `
    <div style="aspect-ratio:1;background:linear-gradient(135deg,#e9d5ff,#fce7f3);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#9333ea;font-size:11px;font-weight:700;">Project ${i + 1}</div>`).join("");

const pascaleTags = ["Web Design", "Social Media", "Branding", "SEO", "Ads", "Content"]
  .map(
    (t) => `
    <span style="background:#fff;border:1px solid #e9d5ff;border-radius:999px;padding:8px 16px;font-size:11px;color:#7e22ce;font-weight:600;">${t}</span>`,
  )
  .join("");

const pascaleQuotes = Array.from({ length: 3 }, () => `
  <blockquote style="max-width:500px;margin:0 auto 20px;color:#6b7280;font-size:13px;font-style:italic;line-height:1.6;text-align:center;">
    "Amazing team! They totally transformed our online presence. Highly recommend!!!"
  </blockquote>`).join("");

const pascalePlaceholderBody = `
<header style="background:linear-gradient(90deg,#7c3aed,#db2777);color:#fff;padding:16px 20px;">
  <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
    <strong style="font-size:16px;letter-spacing:.04em;">PASCALE AGENCY</strong>
    <nav style="display:flex;gap:12px;font-size:11px;font-weight:600;">
      <span>WORK</span><span>ABOUT</span><span>BLOG</span><span>HIRE US</span>
    </nav>
  </div>
</header>
<section style="padding:52px 20px;text-align:center;background:#faf5ff;">
  <p style="color:#a855f7;font-size:10px;font-weight:800;letter-spacing:.15em;margin:0 0 8px;">CREATIVE DIGITAL AGENCY</p>
  <h1 style="color:#581c87;font-size:30px;margin:0 0 12px;font-weight:800;">We Make Brands Shine Online</h1>
  <p style="color:#6b7280;max-width:480px;margin:0 auto;font-size:13px;line-height:1.6;">
    Social media, websites, and marketing that gets results. Let's grow your business together!
  </p>
</section>
<section style="padding:32px 16px;background:#fff;">
  <h2 style="text-align:center;color:#7c3aed;font-size:17px;margin:0 0 20px;">Our Latest Work</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;max-width:880px;margin:0 auto;">
    ${pascaleProjects}
  </div>
</section>
<section style="padding:36px 20px;background:#fdf4ff;">
  <h2 style="text-align:center;color:#86198f;font-size:16px;margin:0 0 20px;">What We Offer</h2>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;max-width:700px;margin:0 auto;">
    ${pascaleTags}
  </div>
</section>
<section style="padding:40px 20px;background:#fff;">
  <h2 style="color:#4b5563;font-size:16px;margin:0 0 20px;text-align:center;">Client Testimonials</h2>
  ${pascaleQuotes}
</section>
<section style="padding:44px 20px;background:#f9fafb;">
  <h2 style="text-align:center;color:#7c3aed;font-size:16px;margin:0 0 16px;">Our Process</h2>
  <ol style="max-width:520px;margin:0 auto;color:#6b7280;font-size:13px;line-height:2;padding-left:20px;">
    <li>Discovery call and brief</li>
    <li>Design mockups and revisions</li>
    <li>Development and launch</li>
    <li>Ongoing support and growth</li>
  </ol>
</section>
<section style="padding:44px 20px;background:linear-gradient(135deg,#7c3aed,#ec4899);color:#fff;text-align:center;">
  <h2 style="margin:0 0 12px;font-size:20px;">Let's Work Together!</h2>
  <p style="margin:0 0 18px;font-size:13px;opacity:.95;">Drop us a message and we will get back to you within 24 hours.</p>
  <span style="display:inline-block;background:#fff;color:#7c3aed;padding:10px 24px;border-radius:999px;font-size:12px;font-weight:800;">FREE QUOTE</span>
</section>
<footer style="background:#1f2937;color:#9ca3af;text-align:center;padding:22px;font-size:10px;">
  (c) 2024 Pascale Agency. Made with care | Instagram | Facebook | Twitter
</footer>
`;

const saleCards = [
  "Polo Shirt - Rs 999",
  "Denim Jacket - Rs 2499",
  "Kids Tee - Rs 599",
  "Cap Bundle - Rs 450",
  "Hoodie XL - Rs 1899",
  "Track Pants - Rs 1299",
]
  .map(
    (label) => `
    <div style="border:2px solid #0b3d91;background:#fff;padding:12px;text-align:center;">
      <div style="height:90px;background:linear-gradient(135deg,#9aa8bc,#dfe8f5);margin-bottom:8px;border:1px solid #fff;"></div>
      <strong style="display:block;color:#0b3d91;font-size:11px;margin-bottom:4px;">${label}</strong>
      <span style="background:#c41e3a;color:#fff;font-size:9px;font-weight:700;padding:3px 6px;">ADD TO CART</span>
    </div>`,
  )
  .join("");

const legacyQuotes = [
  "Very nice website. Fast delivery. Will order again!!! - Ahmed K.",
  "Best prices in Karachi. My jacket arrived in 2 days. - Sara M.",
  "Click here for more reviews on our guestbook page. - Admin",
]
  .map(
    (quote) => `
  <div style="max-width:560px;margin:0 auto 12px;border-left:4px solid #ffe566;background:#f7f9fc;padding:12px 14px;">
    <p style="margin:0;color:#333;font-size:12px;line-height:1.55;font-style:italic;">"${quote}"</p>
  </div>`,
  )
  .join("");

const offdutyLegacyBody = `
<header style="background:#0b3d91;color:#fff;padding:10px 14px;font-size:11px;">
  <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
    <span>HOT DEAL!!! Free shipping if you call before Friday!!!</span>
    <strong style="color:#ffe566;">Call now: 021-000-0000</strong>
  </div>
</header>
<div style="display:flex;align-items:center;gap:10px;border-bottom:4px solid #c41e3a;background:#fff;padding:10px 14px;">
  <div style="border:2px dashed #0b3d91;background:#ffe566;padding:6px 10px;text-align:center;flex-shrink:0;">
    <div style="font-family:Georgia,serif;font-weight:700;font-size:14px;color:#0b3d91;line-height:1;">STYLE</div>
    <div style="font-size:8px;font-weight:700;color:#c41e3a;letter-spacing:.06em;">MART PK</div>
  </div>
  <nav style="display:flex;flex-wrap:wrap;gap:10px;font-size:11px;font-weight:700;color:#0b3d91;text-transform:uppercase;flex:1;">
    <span style="color:#c41e3a;text-decoration:underline;">Home</span>
    <span>Shop</span><span>New!!!</span><span>About Us</span><span>Gallery</span><span>Contact</span>
  </nav>
  <span style="background:#c41e3a;color:#fff;padding:6px 10px;font-size:10px;font-weight:700;">BUY NOW</span>
</div>
<section style="background:#dfe8f5;background-image:repeating-linear-gradient(45deg,#bcd,#bcd 8px,#dfe8f5 8px,#dfe8f5 16px);padding:28px 16px;">
  <p style="display:inline-block;background:#ffe566;color:#c41e3a;font-size:10px;font-weight:800;padding:3px 8px;margin:0 0 12px;">Best Quality Clothes</p>
  <h1 style="font-family:Georgia,serif;font-size:clamp(1.4rem,4vw,2.1rem);color:#0b3d91;margin:0 0 12px;text-shadow:1px 1px 0 #fff,2px 2px 0 #c41e3a;">
    Welcome to Our Online Store!!!
  </h1>
  <p style="max-width:34rem;color:#333;font-size:13px;line-height:1.55;margin:0 0 16px;">
    We sell shirts jackets and more. Click here for information. Best prices in Karachi.
    New collection available. Order today. Limited stock. Call for details.
  </p>
  <div style="display:flex;flex-wrap:wrap;gap:8px;">
    <span style="background:#0b3d91;color:#fff;padding:8px 14px;font-size:11px;font-weight:700;box-shadow:2px 2px 0 #c41e3a;">Click Here</span>
    <span style="border:2px solid #c41e3a;background:#fff;color:#c41e3a;padding:7px 14px;font-size:11px;font-weight:700;">More Info</span>
    <span style="background:#2e7d32;color:#fff;padding:8px 14px;font-size:11px;font-weight:700;">WhatsApp Us</span>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:420px;margin-top:22px;">
    <div style="aspect-ratio:4/3;border:2px solid #fff;background:#9aa8bc;display:flex;align-items:flex-end;justify-content:center;padding:6px;"><span style="background:rgba(255,255,255,.9);color:#0b3d91;font-size:9px;font-weight:700;padding:2px 6px;">Shirt.jpg</span></div>
    <div style="aspect-ratio:4/3;border:2px solid #fff;background:#7a8a9e;display:flex;align-items:flex-end;justify-content:center;padding:6px;"><span style="background:rgba(255,255,255,.9);color:#0b3d91;font-size:9px;font-weight:700;padding:2px 6px;">Jacket 2</span></div>
    <div style="aspect-ratio:4/3;border:2px solid #fff;background:#b8c4d4;display:flex;align-items:flex-end;justify-content:center;padding:6px;"><span style="background:rgba(255,255,255,.9);color:#0b3d91;font-size:9px;font-weight:700;padding:2px 6px;">NEW!!!</span></div>
    <div style="aspect-ratio:4/3;border:2px solid #fff;background:#8b9bb0;display:flex;align-items:flex-end;justify-content:center;padding:6px;"><span style="background:rgba(255,255,255,.9);color:#0b3d91;font-size:9px;font-weight:700;padding:2px 6px;">Sale 50%</span></div>
  </div>
</section>
<section style="background:#fff;padding:28px 16px;">
  <h2 style="color:#0b3d91;font-size:16px;margin:0 0 14px;text-align:center;">Featured Categories</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;max-width:720px;margin:0 auto;">
    <div style="border:1px solid #c5d0e0;padding:16px;background:#f7f9fc;text-align:center;"><div style="height:72px;background:linear-gradient(135deg,#c5d0e0,#9aa8bc);margin-bottom:10px;"></div><strong style="color:#0b3d91;font-size:12px;">Men Shirts</strong></div>
    <div style="border:1px solid #c5d0e0;padding:16px;background:#f7f9fc;text-align:center;"><div style="height:72px;background:linear-gradient(135deg,#c5d0e0,#9aa8bc);margin-bottom:10px;"></div><strong style="color:#0b3d91;font-size:12px;">Jackets</strong></div>
    <div style="border:1px solid #c5d0e0;padding:16px;background:#f7f9fc;text-align:center;"><div style="height:72px;background:linear-gradient(135deg,#c5d0e0,#9aa8bc);margin-bottom:10px;"></div><strong style="color:#0b3d91;font-size:12px;">Kids Wear</strong></div>
    <div style="border:1px solid #c5d0e0;padding:16px;background:#f7f9fc;text-align:center;"><div style="height:72px;background:linear-gradient(135deg,#c5d0e0,#9aa8bc);margin-bottom:10px;"></div><strong style="color:#0b3d91;font-size:12px;">Accessories</strong></div>
  </div>
</section>
<section style="background:#f7f9fc;padding:28px 16px;border-top:3px solid #c41e3a;">
  <h2 style="color:#c41e3a;font-size:16px;margin:0 0 8px;text-align:center;">!!! TODAY ONLY SALE !!!</h2>
  <p style="text-align:center;color:#333;font-size:12px;margin:0 0 18px;">Buy 1 Get 1 Free on selected items. Limited stock. Call before midnight.</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;max-width:800px;margin:0 auto;">
    ${saleCards}
  </div>
</section>
<section style="background:#fff;padding:28px 16px;">
  <h2 style="color:#0b3d91;font-size:15px;margin:0 0 14px;text-align:center;">Customer Testimonials</h2>
  ${legacyQuotes}
</section>
<section style="background:#0b3d91;color:#fff;padding:24px 16px;text-align:center;">
  <h2 style="margin:0 0 8px;font-size:15px;color:#ffe566;">Newsletter Signup</h2>
  <p style="margin:0 0 12px;font-size:12px;">Enter email for weekly deals and spam.</p>
  <div style="display:inline-flex;gap:0;max-width:360px;width:100%;">
    <span style="flex:1;background:#fff;color:#999;padding:8px 10px;font-size:11px;text-align:left;">your@email.com</span>
    <span style="background:#c41e3a;color:#fff;padding:8px 14px;font-size:11px;font-weight:700;">SUBSCRIBE</span>
  </div>
</section>
<section style="background:#dfe8f5;padding:24px 16px;">
  <h2 style="color:#0b3d91;font-size:14px;margin:0 0 12px;text-align:center;">Store Information</h2>
  <p style="max-width:520px;margin:0 auto;color:#333;font-size:12px;line-height:1.7;text-align:center;">
    Style Mart PK | Saddar, Karachi | Open Mon-Sat 10am-9pm<br/>
    Cash on delivery available | No returns on sale items<br/>
    Powered by FreeWebsiteBuilder 2012 | Optimized for Internet Explorer 8
  </p>
</section>
<footer style="background:#ffe566;color:#0b3d91;padding:12px 14px;font-size:10px;font-weight:700;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
  <span>Home | About | Contact | Sitemap | Guestbook</span>
  <span style="color:#c41e3a;">(c) 2012 Style Mart - Best Website Award Nominee</span>
</footer>
`;

const offdutyReframeBody = `
<div style="background:#000;color:#fff;font-family:ui-sans-serif,system-ui,sans-serif;">
  <img src="/work/offduty.png" alt="OFFDUTY Vol. 002 Soundwave homepage" width="1008" height="567" style="width:100%;height:auto;display:block;" />
  <section style="padding:48px 20px;max-width:720px;margin:0 auto;text-align:center;">
    <p style="margin:0 0 10px;font-size:10px;letter-spacing:.28em;color:#a3a3a3;">OFFDUTY - VOL. 002 - SOUNDWAVE</p>
    <h1 style="margin:0 0 14px;font-size:clamp(2rem,6vw,3.4rem);letter-spacing:.02em;font-weight:700;">TURN IT UP.</h1>
    <p style="margin:0 auto 22px;max-width:34rem;color:#a3a3a3;font-size:14px;line-height:1.65;">
      Eight 280 GSM oversized tees - song and cinema graphics plus OFFDUTY mark essentials.
      From Rs. 2,700. COD and bank transfer across Pakistan.
    </p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;">
      <span style="border:1px solid #fff;padding:10px 18px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;">Shop Soundwave</span>
      <span style="border:1px solid #404040;padding:10px 18px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#a3a3a3;">Size Guide</span>
    </div>
  </section>
  <section style="padding:40px 16px;border-top:1px solid #1a1a1a;">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:16px;max-width:900px;margin:0 auto;text-align:center;">
      <div><strong style="display:block;font-size:12px;letter-spacing:.08em;margin-bottom:6px;">Pakistan Delivery</strong><span style="font-size:11px;color:#a3a3a3;">Standard shipping Rs. 250</span></div>
      <div><strong style="display:block;font-size:12px;letter-spacing:.08em;margin-bottom:6px;">Free Shipping</strong><span style="font-size:11px;color:#a3a3a3;">On orders over Rs. 10,000</span></div>
      <div><strong style="display:block;font-size:12px;letter-spacing:.08em;margin-bottom:6px;">COD and Bank Transfer</strong><span style="font-size:11px;color:#a3a3a3;">Pay cash or Meezan transfer</span></div>
      <div><strong style="display:block;font-size:12px;letter-spacing:.08em;margin-bottom:6px;">Easy Returns</strong><span style="font-size:11px;color:#a3a3a3;">30-day returns and exchanges</span></div>
    </div>
  </section>
  <section style="padding:48px 20px;border-top:1px solid #1a1a1a;max-width:720px;margin:0 auto;">
    <p style="margin:0 0 8px;font-size:10px;letter-spacing:.28em;color:#a3a3a3;">VOL. 002</p>
    <h2 style="margin:0 0 14px;font-size:clamp(1.6rem,4vw,2.4rem);letter-spacing:.04em;">SOUNDWAVE</h2>
    <p style="margin:0 0 18px;color:#a3a3a3;font-size:14px;line-height:1.65;">
      Soundwave is not just a collection - it is a frequency. Eight oversized 280 GSM tees built around
      the music and moments that hit hardest - from And Justice to In Utero.
    </p>
    <ul style="margin:0;padding-left:18px;color:#d4d4d4;font-size:13px;line-height:1.9;">
      <li>280 GSM heavyweight cotton, drop-shoulder oversized fit</li>
      <li>Multi-color back prints, limited drop - no restocks</li>
      <li>From Rs. 2,700 - COD available</li>
    </ul>
  </section>
  <section style="padding:40px 16px;border-top:1px solid #1a1a1a;">
    <h2 style="text-align:center;font-size:14px;letter-spacing:.22em;margin:0 0 24px;">NEW DROP</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;max-width:960px;margin:0 auto;">
      <div style="border:1px solid #1a1a1a;background:#0a0a0a;padding:14px;"><div style="aspect-ratio:4/5;background:linear-gradient(160deg,#171717,#0a0a0a 55%,#1f1f1f);margin-bottom:12px;"></div><strong style="display:block;font-size:12px;margin-bottom:4px;">And Justice Tee</strong><span style="font-size:11px;color:#a3a3a3;">Rs. 3,000</span></div>
      <div style="border:1px solid #1a1a1a;background:#0a0a0a;padding:14px;"><div style="aspect-ratio:4/5;background:linear-gradient(160deg,#171717,#0a0a0a 55%,#1f1f1f);margin-bottom:12px;"></div><strong style="display:block;font-size:12px;margin-bottom:4px;">Fight Club Tee</strong><span style="font-size:11px;color:#a3a3a3;">Rs. 3,000</span></div>
      <div style="border:1px solid #1a1a1a;background:#0a0a0a;padding:14px;"><div style="aspect-ratio:4/5;background:linear-gradient(160deg,#171717,#0a0a0a 55%,#1f1f1f);margin-bottom:12px;"></div><strong style="display:block;font-size:12px;margin-bottom:4px;">In Utero Tee</strong><span style="font-size:11px;color:#a3a3a3;">Rs. 3,000</span></div>
      <div style="border:1px solid #1a1a1a;background:#0a0a0a;padding:14px;"><div style="aspect-ratio:4/5;background:linear-gradient(160deg,#171717,#0a0a0a 55%,#1f1f1f);margin-bottom:12px;"></div><strong style="display:block;font-size:12px;margin-bottom:4px;">Live More Tee</strong><span style="font-size:11px;color:#a3a3a3;">Rs. 2,700</span></div>
      <div style="border:1px solid #1a1a1a;background:#0a0a0a;padding:14px;"><div style="aspect-ratio:4/5;background:linear-gradient(160deg,#171717,#0a0a0a 55%,#1f1f1f);margin-bottom:12px;"></div><strong style="display:block;font-size:12px;margin-bottom:4px;">Static Wash Tee</strong><span style="font-size:11px;color:#a3a3a3;">Rs. 2,700</span></div>
      <div style="border:1px solid #1a1a1a;background:#0a0a0a;padding:14px;"><div style="aspect-ratio:4/5;background:linear-gradient(160deg,#171717,#0a0a0a 55%,#1f1f1f);margin-bottom:12px;"></div><strong style="display:block;font-size:12px;margin-bottom:4px;">Night Shift Tee</strong><span style="font-size:11px;color:#a3a3a3;">Rs. 2,700</span></div>
    </div>
  </section>
  <footer style="border-top:1px solid #1a1a1a;padding:28px 16px;text-align:center;color:#737373;font-size:11px;">
    <p style="margin:0 0 8px;letter-spacing:.2em;color:#a3a3a3;">work less. live more.</p>
    <p style="margin:0;">(c) 2026 OFFDUTY - Homepage specimen for ISTIQEME comparison</p>
  </footer>
</div>
`;

const PLACEHOLDER_HTML: Record<string, string> = {
  istiqeme: placeholderShell("placeholder-istiqeme", istiqemePlaceholderBody),
  pascale: placeholderShell("placeholder-pascale", pascalePlaceholderBody),
  "offduty-legacy": placeholderShell(
    "placeholder-offduty-legacy",
    offdutyLegacyBody,
  ),
  offduty: placeholderShell("placeholder-offduty", offdutyReframeBody),
};

export function getShowcasePlaceholderHtml(id: string) {
  return PLACEHOLDER_HTML[id] ?? null;
}

export const SHOWCASE_PLACEHOLDER_IDS = new Set(Object.keys(PLACEHOLDER_HTML));
