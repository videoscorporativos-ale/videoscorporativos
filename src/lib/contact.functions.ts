import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ContactSchema = z.object({
  nome: z.string().trim().min(1).max(120),
  empresa: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(255),
  whatsapp: z.string().trim().min(6).max(40),
  mensagem: z.string().trim().min(1).max(2000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });