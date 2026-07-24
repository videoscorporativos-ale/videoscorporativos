import { useState } from "react";
import { Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/contact.functions";
import { WhatsAppLink } from "./WhatsAppLink";
import { buildWhatsAppUrl, getStoredUtm, captureUtmFromUrl } from "@/lib/whatsapp";

// Push a conversion event to Google Analytics (gtag) and GTM dataLayer.
// No-ops on servers or when neither is present.
function trackConversion(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  try {
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "lead_form_submit", ...payload });
    w.gtag?.("event", "generate_lead", {
      form_location: "contact_section",
      ...payload,
    });
  } catch {
    /* ignore analytics errors */
  }
}

export function ContactCTA() {
  const [sending, setSending] = useState(false);
  const [consent, setConsent] = useState(false);
  const send = useServerFn(submitContact);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!consent) {
      toast.error("É necessário aceitar a Política de Privacidade (LGPD).");
      return;
    }
    const fd = new FormData(form);
    const nome = String(fd.get("nome") ?? "").trim();
    const whatsapp = String(fd.get("whatsapp") ?? "").trim();
    const mensagem = String(fd.get("mensagem") ?? "").trim();
    const empresa = String(fd.get("empresa") ?? "").trim();
    const utm = { ...getStoredUtm(), ...captureUtmFromUrl() };
    const payload = {
      nome,
      whatsapp,
      mensagem,
      empresa: empresa || null,
      email: null,
      lgpd_consent: true as const,
      landing_path:
        typeof window !== "undefined" ? window.location.pathname.slice(0, 512) : null,
      referrer:
        typeof document !== "undefined" ? document.referrer.slice(0, 512) : null,
      utm_source: utm.utm_source ?? null,
      utm_medium: utm.utm_medium ?? null,
      utm_campaign: utm.utm_campaign ?? null,
      utm_term: utm.utm_term ?? null,
      utm_content: utm.utm_content ?? null,
    };
    setSending(true);
    try {
      await send({ data: payload });
      trackConversion({
        utm_source: payload.utm_source,
        utm_medium: payload.utm_medium,
        utm_campaign: payload.utm_campaign,
      });
      toast.success("Recebemos! Abrindo o WhatsApp para continuar a conversa…");
      form.reset();
      setConsent(false);
      // Continue the conversation on WhatsApp with context prefilled.
      const waMsg = `Olá! Sou ${nome}${
        empresa ? ` (${empresa})` : ""
      }. Acabei de enviar um pedido pelo site.\n\n${mensagem}`;
      const url = buildWhatsAppUrl({ location: "contact_form", message: waMsg });
      if (typeof window !== "undefined") {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contato" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-radial-brand pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Contato</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Vamos produzir o vídeo da sua empresa?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
            Conte sobre o seu projeto. Respondemos em até 1 dia útil com uma
            primeira conversa estratégica, sem compromisso.
          </p>
          <div className="mt-10 space-y-4">
            <WhatsAppLink
              location="contact_section"
              className="flex items-center gap-4 rounded-xl border border-border bg-surface/60 p-5 hover:border-brand/50 transition"
            >
              <div className="size-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                <MessageCircle className="size-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</p>
                <p className="font-medium">(11) 91355-0533</p>
              </div>
            </WhatsAppLink>
            <a
              href="mailto:comercial@alefotografo.com.br"
              className="flex items-center gap-4 rounded-xl border border-border bg-surface/60 p-5 hover:border-brand/50 transition"
            >
              <div className="size-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                <Mail className="size-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">E-mail</p>
                <p className="font-medium">comercial@alefotografo.com.br</p>
              </div>
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-surface/60 p-8 backdrop-blur"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Nome" name="nome" required autoComplete="name" />
            <Field
              label="WhatsApp"
              name="whatsapp"
              required
              type="tel"
              autoComplete="tel"
              placeholder="(11) 99999-0000"
            />
          </div>
          <div className="mt-4">
            <Field label="Empresa (opcional)" name="empresa" autoComplete="organization" />
          </div>
          <div className="mt-4">
            <label htmlFor="mensagem" className="text-xs uppercase tracking-widest text-muted-foreground">
              Conte sobre o projeto
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              required
              rows={3}
              maxLength={1000}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-brand transition resize-none placeholder:text-muted-foreground"
              placeholder="Tipo de vídeo, prazo estimado, cidade…"
            />
          </div>
          <label className="mt-5 flex items-start gap-3 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="mt-0.5 size-4 accent-brand shrink-0"
              aria-label="Aceitar Política de Privacidade (LGPD)"
            />
            <span className="leading-relaxed">
              Autorizo o contato pelos dados informados e concordo com o tratamento conforme
              a <a href="/politica-de-privacidade" className="text-brand underline hover:no-underline">Política de Privacidade</a> (LGPD).
              Seus dados são usados apenas para responder este contato.
            </span>
          </label>
          <button
            type="submit"
            disabled={sending || !consent}
            className="mt-6 w-full rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-brand-foreground hover:opacity-90 transition disabled:opacity-60"
          >
            {sending ? "Enviando..." : "Enviar e abrir WhatsApp"}
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck className="size-3.5" aria-hidden />
            Resposta em até 1 dia útil · Dados protegidos (LGPD)
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={255}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-brand transition placeholder:text-muted-foreground"
      />
    </div>
  );
}