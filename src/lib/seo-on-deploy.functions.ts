import { createServerFn } from "@tanstack/react-start";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE_URL = "https://videoscorporativos.com.br/";
const SITEMAP_URL = `${SITE_URL}sitemap.xml`;

// Module-level guard. Cloudflare Workers spin up a fresh isolate per deploy,
// so this resets on every publish — first request after deploy triggers the
// resubmit, all subsequent requests in the same isolate are no-ops. This acts
// as a natural per-deploy debounce.
let firedThisIsolate = false;
let inflight: Promise<void> | null = null;

async function doResubmit() {
  const lov = process.env.LOVABLE_API_KEY;
  const gsc = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
  if (!lov || !gsc) return;
  const siteParam = encodeURIComponent(SITE_URL);
  const feedParam = encodeURIComponent(SITEMAP_URL);
  try {
    // Warm the sitemap URL with a cache-busting query so any CDN edge
    // serves the freshly-generated XML before Google fetches it.
    await fetch(`${SITEMAP_URL}?ts=${Date.now()}`, {
      method: "GET",
      headers: { "Cache-Control": "no-cache" },
    }).catch(() => {});
    const res = await fetch(
      `${GATEWAY}/webmasters/v3/sites/${siteParam}/sitemaps/${feedParam}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${lov}`,
          "X-Connection-Api-Key": gsc,
        },
      },
    );
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.warn(
        `[seo-on-deploy] sitemap resubmit failed: ${res.status} ${body.slice(0, 200)}`,
      );
    } else {
      console.log("[seo-on-deploy] sitemap resubmitted to Google.");
    }
  } catch (err) {
    console.warn("[seo-on-deploy] sitemap resubmit threw:", err);
  }
}

/**
 * Fire-and-forget ping. Safe to call on every request; only the first call
 * per Worker isolate (i.e. once per deploy) actually hits Google.
 */
export const pingSitemapOnDeploy = createServerFn({ method: "GET" }).handler(
  async () => {
    if (firedThisIsolate) return { triggered: false as const };
    firedThisIsolate = true;
    inflight = doResubmit();
    // Do not await — return immediately so the caller is never blocked.
    void inflight;
    return { triggered: true as const };
  },
);