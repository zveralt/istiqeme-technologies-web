export const CONSENT_STORAGE_KEY = "istiqeme-consent-v2";

export type ConsentCategories = {
  /** Strictly necessary — always enabled; not user-toggleable. */
  essential: true;
  /** Vercel Web Analytics & Speed Insights. */
  analytics: boolean;
};

export type StoredConsent = ConsentCategories & {
  version: 1;
  updatedAt: string;
};

export const defaultConsent: StoredConsent = {
  version: 1,
  essential: true,
  analytics: false,
  updatedAt: new Date(0).toISOString(),
};

export function parseConsent(raw: string | null): StoredConsent | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as StoredConsent;
    if (data.version !== 1 || data.essential !== true) return null;
    if (typeof data.analytics !== "boolean") return null;
    return data;
  } catch {
    return null;
  }
}

export function serializeConsent(c: ConsentCategories): StoredConsent {
  return {
    version: 1,
    essential: true,
    analytics: c.analytics,
    updatedAt: new Date().toISOString(),
  };
}

/** Migrate legacy banner choice (v1) if present. */
export function migrateLegacyChoice(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  const legacy = window.localStorage.getItem("istiqeme-cookie-choice");
  if (legacy === "accept") {
    return serializeConsent({ essential: true, analytics: true });
  }
  if (legacy === "decline") {
    return serializeConsent({ essential: true, analytics: false });
  }
  return null;
}
