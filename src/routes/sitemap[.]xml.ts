import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getAllPosts } from "@/content/posts";
import { getAllCases } from "@/lib/portfolio-slugs";

const BASE_URL = "https://videoscorporativos.com.br";

interface SitemapEntry {
  path: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: string;
  lastmod?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/precos", changefreq: "monthly", priority: "0.8" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/autor/alexandre-machado", changefreq: "monthly", priority: "0.6" },
          { path: "/politica-de-privacidade", changefreq: "yearly", priority: "0.3" },
          { path: "/cases", changefreq: "weekly", priority: "0.9" },
          { path: "/video-institucional-sao-paulo", changefreq: "monthly", priority: "0.9" },
          { path: "/video-corporativo-sao-paulo", changefreq: "monthly", priority: "0.9" },
          { path: "/filmagem-evento-corporativo-sao-paulo", changefreq: "monthly", priority: "0.9" },
          { path: "/video-para-feira-de-negocios", changefreq: "monthly", priority: "0.9" },
        ];

        const caseEntries: SitemapEntry[] = getAllCases().map((c) => ({
          path: `/cases/${c.slug}`,
          changefreq: "monthly",
          priority: "0.6",
        }));

        const postEntries: SitemapEntry[] = getAllPosts().map((p) => ({
          path: `/blog/${p.slug}`,
          changefreq: "monthly",
          priority: "0.7",
          lastmod: p.dateModified ?? p.datePublished,
        }));

        const entries = [...staticEntries, ...caseEntries, ...postEntries];

        const urls = entries
          .map((e) => {
            const lines = [`  <url>`, `    <loc>${BASE_URL}${e.path}</loc>`];
            if (e.lastmod) lines.push(`    <lastmod>${e.lastmod}</lastmod>`);
            lines.push(`    <changefreq>${e.changefreq}</changefreq>`);
            lines.push(`    <priority>${e.priority}</priority>`);
            lines.push(`  </url>`);
            return lines.join("\n");
          })
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        const mostRecent = entries
          .map((e) => e.lastmod)
          .filter(Boolean)
          .sort()
          .at(-1);
        const lastModifiedHttp = mostRecent
          ? new Date(`${mostRecent}T00:00:00Z`).toUTCString()
          : new Date().toUTCString();

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=60, must-revalidate",
            "Last-Modified": lastModifiedHttp,
          },
        });
      },
    },
  },
});
