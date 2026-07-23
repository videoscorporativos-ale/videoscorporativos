import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getAllPosts } from "@/content/posts";
import { getAllCases } from "@/lib/portfolio-slugs";

const BASE_URL = "https://videoscorporativos.com.br";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
          { path: "/precos", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/blog", changefreq: "weekly", priority: "0.8", lastmod: today },
          { path: "/autor/alexandre-machado", changefreq: "monthly", priority: "0.6", lastmod: today },
          { path: "/cases", changefreq: "weekly", priority: "0.9", lastmod: today },
          { path: "/video-institucional-sao-paulo", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/filmagem-evento-corporativo-sao-paulo", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/video-para-feira-de-negocios", changefreq: "monthly", priority: "0.9", lastmod: today },
          ...getAllCases().map((c) => ({
            path: `/cases/${c.slug}`,
            changefreq: "monthly",
            priority: "0.6",
            lastmod: today,
          })),
          ...getAllPosts().map((p) => ({
            path: `/blog/${p.slug}`,
            changefreq: "monthly",
            priority: "0.7",
            lastmod: p.dateModified ?? p.datePublished,
          })),
        ];

        const urls = entries
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        // Most recent lastmod across all entries — used for Last-Modified header
        // so Google sees freshness immediately after a post is added/edited.
        const mostRecent = entries
          .map((e) => e.lastmod)
          .sort()
          .at(-1)!;
        const lastModifiedHttp = new Date(`${mostRecent}T00:00:00Z`).toUTCString();

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            // Short cache + must-revalidate so a fresh deploy invalidates almost
            // immediately at every edge. The resubmit hook also warms this URL.
            "Cache-Control": "public, max-age=60, must-revalidate",
            "Last-Modified": lastModifiedHttp,
          },
        });
      },
    },
  },
});