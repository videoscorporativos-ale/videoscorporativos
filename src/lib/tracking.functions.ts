import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ClickSchema = z.object({
  location: z.string().min(1).max(64),
  landing_path: z.string().max(512).optional(),
  referrer: z.string().max(512).optional(),
  user_agent: z.string().max(512).optional(),
  utm_source: z.string().max(120).optional(),
  utm_medium: z.string().max(120).optional(),
  utm_campaign: z.string().max(120).optional(),
  utm_term: z.string().max(120).optional(),
  utm_content: z.string().max(120).optional(),
});

export const trackWhatsAppClick = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ClickSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("whatsapp_clicks").insert(data);
    if (error) {
      console.error("[whatsapp-click] insert failed", error);
      return { ok: false };
    }
    return { ok: true };
  });