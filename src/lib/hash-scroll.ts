const HEADER_OFFSET = 88;

/** Smoothly scrolls to an element id, compensating for the fixed header. */
export function scrollToId(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}

/**
 * Click handler for in-page anchors like `/#servicos` or `#servicos`.
 * Scrolls in place when already on the target page; otherwise lets the
 * browser navigate normally.
 */
export function handleAnchorClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return;
  const path = href.slice(0, hashIndex) || "/";
  const id = href.slice(hashIndex + 1);
  if (!id) return;
  if (path !== "/" && path !== window.location.pathname) return;
  if (path === "/" && window.location.pathname !== "/") return;
  if (scrollToId(id)) {
    event.preventDefault();
    window.history.replaceState(null, "", `${window.location.pathname}#${id}`);
  }
}

/** Scrolls to the hash present in the URL (after mount / navigation). */
export function scrollToCurrentHash() {
  const id = window.location.hash.replace("#", "");
  if (!id) return;
  let attempts = 0;
  const tick = () => {
    if (scrollToId(id) || attempts > 20) return;
    attempts += 1;
    window.setTimeout(tick, 100);
  };
  tick();
}
