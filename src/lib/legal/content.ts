import type { LegalDocument } from "./meta";
import { legalEntity } from "./meta";

const processors = [
  "Vercel, Inc. — website hosting, edge delivery, and (if you consent) Web Analytics and Speed Insights.",
  "Resend — transactional email delivery when you submit contact or project inquiry forms.",
  "Supabase — authentication and session management if you create or use a login account on this site.",
  "Meta Platforms (WhatsApp) — when you choose to open a WhatsApp chat link; governed by WhatsApp’s terms and privacy policy.",
];

export const legalDocuments: Record<string, LegalDocument> = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How ISTIQEME Technologies collects, uses, and protects personal information on this website.",
    sections: [
      {
        id: "controller",
        title: "1. Who we are",
        paragraphs: [
          `${legalEntity.name} (“ISTIQEME”, “we”, “us”) operates the website at ${legalEntity.website}. We provide website development, e-commerce, custom software, mobile applications, AI solutions, automation, and digital marketing services from ${legalEntity.city}, ${legalEntity.country}, and may work with clients in other countries.`,
          legalEntity.registrationNote,
          `Privacy contact: ${legalEntity.email} · ${legalEntity.phone} · ${legalEntity.address}`,
        ],
      },
      {
        id: "scope",
        title: "2. Scope",
        paragraphs: [
          "This policy describes personal information we process when you visit this website, use its forms or demonstrations, create an account, or contact us through channels linked from the site.",
          "It does not govern separate written contracts, statements of work, or project agreements with clients unless those documents refer to this policy.",
        ],
      },
      {
        id: "collect",
        title: "3. Information we collect",
        paragraphs: ["Depending on how you use the site, we may process:"],
        bullets: [
          "Identity and contact data — name, email address, company name, phone number if you provide it in a form or message.",
          "Inquiry content — service interest, budget range (optional), project description, or contact message subject and body.",
          "Account data — email and authentication credentials if you register or sign in via our Supabase-powered login.",
          "Technical data — IP address, browser type, device information, and page interaction data collected by our host and (only with your consent) Vercel Analytics / Speed Insights.",
          "Preferences — theme choice and cookie consent choices stored in your browser’s local storage.",
          "WhatsApp — we do not receive your WhatsApp messages through this website until you initiate a chat on WhatsApp; Meta processes that conversation under its own policies.",
        ],
      },
      {
        id: "sources",
        title: "4. How we collect information",
        paragraphs: [
          "You provide information directly when you submit the homepage project inquiry form, the contact page form, create an account, or email us.",
          "Our website demonstrations (including the on-page “Guide” assistant and scripted AI demos) match your typed questions to predefined FAQ content in your browser. Those demo interactions are not sent to external AI providers and are not stored on our servers as chat logs.",
          "We automatically receive limited technical logs from our hosting provider when you load pages.",
        ],
      },
      {
        id: "purposes",
        title: "5. Purposes of use",
        paragraphs: ["We use personal information to:"],
        bullets: [
          "Respond to inquiries and provide information about our services.",
          "Send your form submission to our team by email (via Resend).",
          "Operate login sessions where accounts are enabled.",
          "Maintain website security, prevent abuse, and improve performance.",
          "Measure aggregated site usage when you consent to analytics cookies/technologies.",
          "Comply with applicable law and protect our legal rights.",
        ],
      },
      {
        id: "lawful",
        title: "6. Legal bases (where applicable)",
        paragraphs: [
          "Under Pakistan’s applicable electronic transactions and cybercrime frameworks, we process information consistent with lawful business operations and your consent where required.",
          "Where the EU or UK GDPR applies to our processing (typically because you are in the EEA/UK and we offer services to you), we rely on: (a) performance of a contract or steps at your request before a contract (responding to inquiries); (b) legitimate interests in operating and securing our website and business, balanced against your rights; and (c) consent for non-essential analytics and similar technologies.",
          "Where US state privacy laws such as the California CPRA apply, we process information as described in this policy and honour applicable consumer rights requests where we meet statutory thresholds and scope.",
        ],
      },
      {
        id: "sharing",
        title: "7. Processors and sharing",
        paragraphs: [
          "We use service providers that process data on our behalf under contractual safeguards:",
          ...processors,
          "We do not sell your personal information. We may disclose information if required by law, court order, or to protect rights, safety, and security.",
        ],
      },
      {
        id: "transfers",
        title: "8. International transfers",
        paragraphs: [
          "Our providers may process data in the United States, European Union, or other countries where they operate data centres. Where GDPR/UK GDPR applies, we rely on appropriate safeguards such as standard contractual clauses offered by reputable providers, where applicable.",
        ],
      },
      {
        id: "retention",
        title: "9. Retention",
        paragraphs: [
          "Form submissions emailed to our team are retained according to our internal business and email retention practices. [CONFIRM: specify retention period with counsel — e.g. 24 months for unsolicited inquiries unless a client relationship continues.]",
          "Hosting and security logs are retained for a limited period defined by Vercel.",
          "Account data is retained while your account is active and as required by Supabase configuration and law.",
          "Cookie consent records are stored locally in your browser until you clear them.",
        ],
      },
      {
        id: "security",
        title: "10. Security",
        paragraphs: [
          "We implement technical and organisational measures appropriate to a digital services business, including HTTPS, access controls on administrative systems, and server-side validation on forms. No method of transmission over the Internet is completely secure.",
        ],
      },
      {
        id: "rights",
        title: "11. Your rights",
        paragraphs: [
          "Depending on your location, you may have rights to access, correct, delete, restrict, or object to certain processing, and to withdraw consent for analytics where processing is consent-based.",
          "To exercise rights, email us at " + legalEntity.email + ". We may need to verify your identity. You may lodge a complaint with a supervisory authority in your country if GDPR/UK GDPR applies.",
        ],
      },
      {
        id: "marketing",
        title: "12. Marketing",
        paragraphs: [
          "We do not operate a newsletter subscription on this website at the time of this policy. If we contact you after an inquiry, it will relate to your request or an existing business relationship.",
        ],
      },
      {
        id: "children",
        title: "13. Children",
        paragraphs: [
          "Our services are directed at businesses and adults. We do not knowingly collect personal information from children under 16. Contact us if you believe a child has provided information.",
        ],
      },
      {
        id: "changes",
        title: "14. Changes",
        paragraphs: [
          "We may update this policy from time to time. The “Last updated” date at the top of the page indicates the latest revision.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    title: "Website Terms & Conditions",
    description: "Rules for using the ISTIQEME Technologies website.",
    sections: [
      {
        id: "agreement",
        title: "1. Agreement",
        paragraphs: [
          `By accessing ${legalEntity.website}, you agree to these Website Terms. If you do not agree, do not use the site.`,
          "These terms govern use of the website only. They do not replace any signed proposal, statement of work, master services agreement, or other contract between ISTIQEME and a client.",
        ],
      },
      {
        id: "services",
        title: "2. About our services",
        paragraphs: [
          "ISTIQEME provides digital engineering and marketing services as described on the site. Case studies, demos, and metrics may be illustrative; specific outcomes depend on scope, client inputs, and third-party platforms.",
        ],
      },
      {
        id: "use",
        title: "3. Permitted use",
        paragraphs: ["You may use the website for lawful purposes to learn about our services and contact us. You must not:"],
        bullets: [
          "Attempt unauthorised access to systems, accounts, or data.",
          "Introduce malware, scrape the site in a way that impairs performance, or abuse forms or APIs.",
          "Misrepresent your identity or submit unlawful, harassing, or infringing content through forms.",
          "Copy or reuse site content except as permitted in our Intellectual Property notice or with our written permission.",
        ],
      },
      {
        id: "ip",
        title: "4. Intellectual property",
        paragraphs: [
          "Site content, branding, layout, and original materials are owned by ISTIQEME or licensors. See our Intellectual Property notice for details. Client-owned deliverables are not transferred through browsing this website.",
        ],
      },
      {
        id: "ai-demo",
        title: "5. Demonstrations and AI features",
        paragraphs: [
          "Interactive assistants and demos on this site may use scripted or local matching logic rather than live human support. See our AI Disclosure. Do not rely on demos as professional, legal, financial, or medical advice.",
        ],
      },
      {
        id: "third-party",
        title: "6. Third-party links",
        paragraphs: [
          "Links to WhatsApp, client websites, portfolio showcases, or other third parties are provided for convenience. We are not responsible for third-party content or practices.",
        ],
      },
      {
        id: "availability",
        title: "7. Availability",
        paragraphs: [
          "We aim to keep the website available but do not guarantee uninterrupted access. Maintenance, updates, or factors outside our control may cause downtime.",
        ],
      },
      {
        id: "liability",
        title: "8. Liability",
        paragraphs: [
          "To the fullest extent permitted by applicable law in Pakistan, ISTIQEME is not liable for indirect, incidental, or consequential damages arising from use of this website. Nothing in these terms excludes liability that cannot be excluded by law.",
          "[CONFIRM WITH COUNSEL: liability caps and specific wording for your entity type.]",
        ],
      },
      {
        id: "law",
        title: "9. Governing law",
        paragraphs: [
          "These Website Terms are governed by the laws of Pakistan, without regard to conflict-of-law rules. Courts in Karachi, Sindh, shall have non-exclusive jurisdiction, subject to mandatory consumer protections in your country of residence where applicable.",
          "[CONFIRM WITH COUNSEL: exclusive vs non-exclusive jurisdiction and B2B vs consumer scenarios.]",
        ],
      },
      {
        id: "contact",
        title: "10. Contact",
        paragraphs: [`Questions about these terms: ${legalEntity.email} · ${legalEntity.address}`],
      },
    ],
  },
  "cookie-policy": {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description: "Cookies and similar technologies used on the ISTIQEME website.",
    sections: [
      {
        id: "what",
        title: "1. What we use",
        paragraphs: [
          "Cookies are small text files stored on your device. We also use similar technologies such as local storage for preferences.",
        ],
      },
      {
        id: "essential",
        title: "2. Strictly necessary",
        paragraphs: ["These are required for the site to function and cannot be switched off in our preference centre:"],
        bullets: [
          "Authentication session cookies if you log in (Supabase).",
          "Security and load-balancing cookies from our host (Vercel).",
          "localStorage key `istiqeme-theme-v1` — remembers light/dark theme.",
          "localStorage key `istiqeme-consent-v2` — remembers your cookie choices.",
        ],
      },
      {
        id: "analytics",
        title: "3. Analytics (optional)",
        paragraphs: [
          "With your consent, we load Vercel Web Analytics and Vercel Speed Insights to understand aggregated traffic and performance. These technologies are blocked until you accept analytics in our cookie banner or preference centre.",
        ],
      },
      {
        id: "no-ads",
        title: "4. What we do not use",
        paragraphs: [
          "At the time of this policy, we do not use advertising or social-media tracking pixels on this website.",
        ],
      },
      {
        id: "manage",
        title: "5. Managing preferences",
        paragraphs: [
          "Use the cookie banner, footer link “Cookie preferences”, or visit /legal/cookie-preferences to accept, reject, or change analytics settings at any time.",
        ],
      },
      {
        id: "peCR",
        title: "6. UK PECR / ePrivacy",
        paragraphs: [
          "Where UK PECR or similar rules apply, we request consent before non-essential analytics storage/access, as implemented on this site.",
        ],
      },
    ],
  },
  "ai-disclosure": {
    slug: "ai-disclosure",
    title: "AI Usage & Transparency Disclosure",
    description: "How automated and AI-related features on this website work.",
    sections: [
      {
        id: "overview",
        title: "1. Overview",
        paragraphs: [
          "ISTIQEME designs AI solutions for clients. On this marketing website, most “AI” experiences are educational demonstrations — not live production agents connected to your accounts.",
        ],
      },
      {
        id: "guide",
        title: "2. Website Guide (FAQ assistant)",
        paragraphs: [
          "The “Talk to ISTIQEME” / Guide panel matches your typed questions to predefined FAQ entries in your browser. Responses are not generated by a third-party large language model API and are not reviewed by a human in real time. Conversation text is not uploaded to our servers as part of that feature.",
        ],
      },
      {
        id: "demos",
        title: "3. Scripted demos",
        paragraphs: [
          "Sections such as the homepage AI demo, lead-flow demo, and Command Center sample dashboard use pre-written scripts and sample data to illustrate capabilities. They do not process your personal data except what you choose to type locally (Guide) or display on screen.",
        ],
      },
      {
        id: "voice",
        title: "4. Voice and microphone",
        paragraphs: [
          "Marketing copy describes AI voice agents we can build for clients. This website does not request microphone access and does not record voice input in the browser.",
        ],
      },
      {
        id: "accuracy",
        title: "5. Accuracy and reliance",
        paragraphs: [
          "Automated and demo responses may be incomplete or outdated. They are not legal, financial, medical, or professional advice. For binding quotes, scope, or support, contact our human team via the contact form, email, or WhatsApp.",
        ],
      },
      {
        id: "production",
        title: "6. Client production systems",
        paragraphs: [
          "When ISTIQEME deploys AI for a client, separate agreements, data processing terms, and transparency measures apply to those production systems — not this marketing site.",
        ],
      },
      {
        id: "eu-ai",
        title: "7. EU AI Act",
        paragraphs: [
          "Where the EU AI Act applies to specific ISTIQEME client deployments, client-facing transparency obligations are addressed in project contracts. This public website’s demos are not high-risk AI systems under typical marketing-use interpretations, but legal classification should be confirmed per deployment.",
        ],
      },
    ],
  },
  "intellectual-property": {
    slug: "intellectual-property",
    title: "Intellectual Property Notice",
    description: "Ownership and permitted use of website and portfolio materials.",
    sections: [
      {
        id: "site",
        title: "1. Website content",
        paragraphs: [
          `Unless stated otherwise, content on ${legalEntity.website} — including text, layout, graphics, icons, and original photography or illustrations produced by ISTIQEME — is © ${new Date().getFullYear()} ${legalEntity.name} or its licensors. All rights reserved.`,
        ],
      },
      {
        id: "brand",
        title: "2. Branding",
        paragraphs: [
          "ISTIQEME names, logos, and trade dress may not be used without written permission except for fair reference to our business.",
        ],
      },
      {
        id: "code",
        title: "3. Software",
        paragraphs: [
          "Underlying website code is proprietary. Open-source components remain subject to their respective licences.",
        ],
      },
      {
        id: "portfolio",
        title: "4. Portfolio and client work",
        paragraphs: [
          "Screenshots and links to client sites identify work ISTIQEME performed or contributed to. Client brands, trademarks, and site content remain owned by those clients or their licensors. Portfolio display is for illustration of our capabilities, not a licence to reuse client assets.",
        ],
      },
      {
        id: "third",
        title: "5. Third-party materials",
        paragraphs: [
          "Fonts, stock imagery, icons, and embedded showcase sites may be subject to third-party rights. We do not grant licences to third-party content.",
        ],
      },
      {
        id: "enquiries",
        title: "6. Permissions",
        paragraphs: [`For licensing enquiries: ${legalEntity.email}`],
      },
    ],
  },
  disclaimer: {
    slug: "disclaimer",
    title: "Website Disclaimer",
    description: "Important limitations on website information.",
    sections: [
      {
        id: "general",
        title: "1. General",
        paragraphs: [
          "Information on this website is for general business information only. It is provided in good faith but without warranty of completeness or accuracy.",
        ],
      },
      {
        id: "no-advice",
        title: "2. No professional advice",
        paragraphs: [
          "Nothing on this site constitutes legal, tax, financial, or technical advice for your specific situation. Engage ISTIQEME under a written agreement for scoped professional services.",
        ],
      },
      {
        id: "demos",
        title: "3. Demos and testimonials",
        paragraphs: [
          "Demonstrations, sample dashboards, and partner testimonials illustrate types of outcomes. Individual results vary. Testimonials reflect experiences described by those parties and are not guarantees.",
        ],
      },
      {
        id: "external",
        title: "4. External sites",
        paragraphs: [
          "We are not responsible for content on websites we link to or embed in portfolio showcases.",
        ],
      },
    ],
  },
  accessibility: {
    slug: "accessibility",
    title: "Accessibility Statement",
    description: "Our approach to digital accessibility on this website.",
    sections: [
      {
        id: "commitment",
        title: "1. Commitment",
        paragraphs: [
          "ISTIQEME aims to make this website usable for people with diverse abilities, including keyboard navigation, readable contrast in light and dark themes, and semantic structure.",
        ],
      },
      {
        id: "status",
        title: "2. Current status",
        paragraphs: [
          "We continue to review pages for accessibility improvements. Some showcase embeds and motion-heavy demonstrations may be challenging for assistive technology; we provide alternative contact paths (email, phone, WhatsApp, forms).",
        ],
      },
      {
        id: "feedback",
        title: "3. Feedback",
        paragraphs: [
          `If you encounter a barrier on this site, email ${legalEntity.email} with the page URL and description. We will try to respond within a reasonable time.`,
        ],
      },
      {
        id: "standards",
        title: "4. Standards",
        paragraphs: [
          "We use WCAG 2.2 Level AA as a reference where practical. Full conformance has not been independently certified.",
        ],
      },
    ],
  },
};

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments[slug];
}
