/**
 * Injected into showcase iframes (proxy + placeholders).
 * Syncs scroll by progress (0-1) so mismatched document heights don't rubber-band.
 */
export function showcaseScrollBridge(siteId: string) {
  return `
<script id="istiqeme-showcase-bridge">
(function () {
  var siteId = ${JSON.stringify(siteId)};
  var syncing = false;
  var lastProgress = -1;
  var raf = null;
  var syncClear = null;

  function scroller() {
    return document.scrollingElement || document.documentElement;
  }

  function maxScroll() {
    var el = scroller();
    return Math.max(1, (el.scrollHeight || document.body.scrollHeight) - window.innerHeight);
  }

  function currentY() {
    var el = scroller();
    return el.scrollTop || window.pageYOffset || window.scrollY || 0;
  }

  function progressFromY(y) {
    var p = y / maxScroll();
    if (p < 0) return 0;
    if (p > 1) return 1;
    return p;
  }

  function emitScroll() {
    if (syncing) return;
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = null;
      if (syncing) return;
      var y = currentY();
      var progress = progressFromY(y);
      if (Math.abs(progress - lastProgress) < 0.003) return;
      lastProgress = progress;
      parent.postMessage({
        type: "istiqeme-showcase-scroll",
        siteId: siteId,
        y: y,
        progress: progress
      }, "*");
    });
  }

  window.addEventListener("scroll", emitScroll, { passive: true });
  document.addEventListener("scroll", emitScroll, { passive: true, capture: true });

  window.addEventListener("message", function (event) {
    var data = event.data;
    if (!data || data.type !== "istiqeme-showcase-set-scroll" || data.targetSiteId !== siteId) return;
    var progress = typeof data.progress === "number" ? data.progress : progressFromY(data.y || 0);
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;
    var targetY = progress * maxScroll();
    // Compare against live scroll position — lastProgress alone can desync.
    if (Math.abs(progress - lastProgress) < 0.003 && Math.abs(targetY - currentY()) < 6) return;
    syncing = true;
    if (syncClear) clearTimeout(syncClear);
    var el = scroller();
    el.scrollTop = targetY;
    window.scrollTo(0, targetY);
    lastProgress = progress;
    // Hold lock so programmatic scroll does not echo back and fight the peer frame.
    syncClear = setTimeout(function () { syncing = false; }, 160);
  });
})();
</script>`;
}
