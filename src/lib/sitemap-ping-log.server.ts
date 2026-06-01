import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type PingSource =
  | "deploy-hook"
  | "admin-button"
  | "cron-hourly";

export async function logSitemapPing(input: {
  source: PingSource;
  ok: boolean;
  status?: number | null;
  message?: string | null;
}) {
  try {
    await supabaseAdmin.from("sitemap_pings").insert({
      source: input.source,
      ok: input.ok,
      status: input.status ?? null,
      message: input.message?.slice(0, 500) ?? null,
    });
  } catch (err) {
    console.warn("[sitemap-ping-log] insert failed:", err);
  }
}