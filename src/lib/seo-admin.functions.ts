import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE_URL = "https://videoscorporativos.com.br/";
const SITEMAP_PATH = "sitemap.xml";

function authHeaders(): Record<string, string> {
  const lov = process.env.LOVABLE_API_KEY;
  const gsc = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
  if (!lov) throw new Error("LOVABLE_API_KEY ausente no servidor.");
  if (!gsc) throw new Error("Conexão Google Search Console não encontrada.");
  return {
    Authorization: `Bearer ${lov}`,
    "X-Connection-Api-Key": gsc,
    "Content-Type": "application/json",
  };
}

/** Reenvia o sitemap.xml para o Google Search Console. */
export const resubmitSitemap = createServerFn({ method: "POST" }).handler(async () => {
  const siteParam = encodeURIComponent(SITE_URL);
  const feedParam = encodeURIComponent(`${SITE_URL}${SITEMAP_PATH}`);
  const res = await fetch(
    `${GATEWAY}/webmasters/v3/sites/${siteParam}/sitemaps/${feedParam}`,
    { method: "PUT", headers: authHeaders() },
  );
  if (!res.ok) {
    const text = await res.text();
    return { ok: false as const, status: res.status, message: text.slice(0, 500) };
  }
  return { ok: true as const, message: "Sitemap reenviado ao Google." };
});

/**
 * Solicita indexação de uma URL via Google Indexing API (urlNotifications:publish).
 * Funciona melhor para URLs novas ou recém-atualizadas.
 */
export const requestIndexing = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        url: z.string().url().max(2048),
        type: z.enum(["URL_UPDATED", "URL_DELETED"]).default("URL_UPDATED"),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const res = await fetch(`${GATEWAY}/indexing/v3/urlNotifications:publish`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ url: data.url, type: data.type }),
    });
    const text = await res.text();
    if (!res.ok) {
      return {
        ok: false as const,
        status: res.status,
        message: text.slice(0, 800),
      };
    }
    return { ok: true as const, message: "Indexação solicitada.", payload: text };
  });

/** Inspeciona o status de indexação de uma URL no Google. */
export const inspectUrl = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ url: z.string().url().max(2048) }).parse(input),
  )
  .handler(async ({ data }) => {
    const res = await fetch(`${GATEWAY}/searchconsole/v1/urlInspection/index:inspect`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        inspectionUrl: data.url,
        siteUrl: SITE_URL,
        languageCode: "pt-BR",
      }),
    });
    const text = await res.text();
    if (!res.ok) {
      return { ok: false as const, status: res.status, message: text.slice(0, 800) };
    }
    try {
      return { ok: true as const, data: JSON.parse(text) };
    } catch {
      return { ok: true as const, data: text };
    }
  });