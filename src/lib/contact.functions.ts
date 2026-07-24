import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ContactSchema = z.object({
  nome: z.string().trim().min(1).max(120),
  whatsapp: z.string().trim().min(6).max(40),
  mensagem: z.string().trim().min(1).max(2000),
  empresa: z.string().trim().max(160).optional().nullable(),
  email: z.string().trim().email().max(255).optional().nullable().or(z.literal("")),
  lgpd_consent: z.literal(true, {
    errorMap: () => ({ message: "É necessário aceitar a Política de Privacidade (LGPD)." }),
  }),
  landing_path: z.string().max(512).optional().nullable(),
  referrer: z.string().max(512).optional().nullable(),
  utm_source: z.string().max(120).optional().nullable(),
  utm_medium: z.string().max(120).optional().nullable(),
  utm_campaign: z.string().max(120).optional().nullable(),
  utm_term: z.string().max(120).optional().nullable(),
  utm_content: z.string().max(120).optional().nullable(),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactSchema.parse(input))
  .handler(async ({ data }) => {
    const row = {
      nome: data.nome,
      whatsapp: data.whatsapp,
      mensagem: data.mensagem,
      empresa: data.empresa || null,
      email: data.email ? data.email : null,
      lgpd_consent: data.lgpd_consent,
      consent_at: new Date().toISOString(),
      landing_path: data.landing_path || null,
      referrer: data.referrer || null,
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      utm_term: data.utm_term || null,
      utm_content: data.utm_content || null,
    };
    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .insert(row);
    if (error) {
      console.error("[submitContact] DB error:", error.message);
      throw new Error("Não foi possível enviar a mensagem. Tente novamente.");
    }
    return { ok: true };
  });