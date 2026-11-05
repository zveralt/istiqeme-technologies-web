"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CONSENT_STORAGE_KEY,
  defaultConsent,
  migrateLegacyChoice,
  parseConsent,
  serializeConsent,
  type ConsentCategories,
  type StoredConsent,
} from "@/lib/legal/consent";

type ConsentContextValue = {
  consent: StoredConsent | null;
  ready: boolean;
  showBanner: boolean;
  showPreferences: boolean;
  setShowPreferences: (open: boolean) => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (categories: ConsentCategories) => void;
  analyticsAllowed: boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<StoredConsent | null>(null);
  const [ready, setReady] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const stored = parseConsent(localStorage.getItem(CONSENT_STORAGE_KEY));
    const migrated = stored ?? migrateLegacyChoice();
    if (migrated) {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(migrated));
      setConsent(migrated);
    }
    setReady(true);
  }, []);

  const persist = useCallback((categories: ConsentCategories) => {
    const next = serializeConsent(categories);
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
    setConsent(next);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ essential: true, analytics: true });
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist({ essential: true, analytics: false });
  }, [persist]);

  const savePreferences = useCallback(
    (categories: ConsentCategories) => {
      persist(categories);
      setShowPreferences(false);
    },
    [persist],
  );

  const showBanner = ready && consent === null;

  const value = useMemo(
    (): ConsentContextValue => ({
      consent,
      ready,
      showBanner,
      showPreferences,
      setShowPreferences,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      analyticsAllowed: consent?.analytics === true,
    }),
    [
      consent,
      ready,
      showBanner,
      showPreferences,
      acceptAll,
      rejectNonEssential,
      savePreferences,
    ],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
