/** Bump when proxy/placeholder transform changes so browsers skip stale framed HTML. */
const SHOWCASE_EMBED_CACHE_BUST = "9";

export function showcaseProxyUrl(url: string) {
  return `/api/showcase-proxy?url=${encodeURIComponent(url)}&v=${SHOWCASE_EMBED_CACHE_BUST}`;
}

export function showcasePlaceholderUrl(id: string) {
  return `/api/showcase-placeholder?id=${encodeURIComponent(id)}&v=${SHOWCASE_EMBED_CACHE_BUST}`;
}

export type ComparisonConfig = {
  legacyKind: "placeholder" | "proxy";
  legacyUrl?: string;
  legacyPlaceholderId?: string;
  reframeUrl: string;
  reframeEmbed?: "direct" | "proxy";
};

export function resolveLegacyEmbedUrl(comparison: ComparisonConfig) {
  if (comparison.legacyKind === "placeholder" && comparison.legacyPlaceholderId) {
    return showcasePlaceholderUrl(comparison.legacyPlaceholderId);
  }
  if (comparison.legacyUrl) {
    return showcaseProxyUrl(comparison.legacyUrl);
  }
  return "";
}

export function resolveReframeEmbedUrl(comparison: ComparisonConfig) {
  if (comparison.reframeEmbed === "direct") {
    return comparison.reframeUrl;
  }
  return showcaseProxyUrl(comparison.reframeUrl);
}

/** Scroll sync only when both specimens are served from our origin (proxy / placeholder). */
export function canSyncScroll(comparison: ComparisonConfig) {
  const legacySameOrigin =
    comparison.legacyKind === "placeholder" || comparison.legacyKind === "proxy";
  const reframeSameOrigin =
    comparison.reframeEmbed === "proxy" ||
    comparison.reframeUrl.startsWith("/api/showcase-placeholder");
  return legacySameOrigin && reframeSameOrigin;
}

export type ShowcaseScrollMessage = {
  type: "istiqeme-showcase-scroll";
  siteId: string;
  y: number;
  /** 0–1 document scroll progress; preferred over absolute y when heights differ. */
  progress?: number;
};

export function isShowcaseScrollMessage(
  data: unknown,
): data is ShowcaseScrollMessage {
  return (
    typeof data === "object" &&
    data !== null &&
    (data as { type?: string }).type === "istiqeme-showcase-scroll" &&
    typeof (data as { siteId?: string }).siteId === "string" &&
    typeof (data as { y?: number }).y === "number"
  );
}

export function getPairedShowcaseHost(
  sourceHost: string,
  legacyHostId: string,
  reframeHostId: string,
) {
  if (sourceHost === legacyHostId) return reframeHostId;
  if (sourceHost === reframeHostId) return legacyHostId;
  return null;
}
