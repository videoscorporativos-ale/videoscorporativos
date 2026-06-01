import { createFileRoute } from "@tanstack/react-router";
import { logSitemapPing } from "@/lib/sitemap-ping-log.server";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE_URL = "https://videoscorporativos.com.br/";
const SITEMAP_URL = `${SITE_URL}sitemap.xml`;

export const Route = createFileRoute("/api/public/seo/resubmit-sitemap")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Auth: must carry the project's Supabase anon/publishable key.
        const expected = process.env.SUPABASE_PUBLISHABLE_KEY;
        const provided =
          request.headers.get("apikey") ??
          request.headers.get("x-api-key") ??
          "";
        if (!expected || provided !== expected) {
          return new Response("Unauthorized", { status: 401 });
        }

        const lov = process.env.LOVABLE_API_KEY;
        const gsc = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
        if (!lov || !gsc) {
          return Response.json(
            { ok: false, error: "GSC connector not configured" },
            { status: 500 },
          );
        }

        const siteParam = encodeURIComponent(SITE_URL);
        const feedParam = encodeURIComponent(SITEMAP_URL);
        // Warm the sitemap URL with cache-bust so the edge serves the
        // freshly-generated XML before Google fetches it.
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
          const text = await res.text();
          await logSitemapPing({
            source: "cron-hourly",
            ok: false,
            status: res.status,
            message: text.slice(0, 500),
          });
          return Response.json(
            { ok: false, status: res.status, message: text.slice(0, 500) },
            { status: 502 },
          );
        }

        await logSitemapPing({
          source: "cron-hourly",
          ok: true,
          status: res.status,
          message: "Sitemap reenviado (cron horário).",
        });
        return Response.json({
          ok: true,
          message: "Sitemap reenviado ao Google.",
          at: new Date().toISOString(),
        });
      },
    },
  },
});