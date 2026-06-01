import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/contact.functions";
import { WhatsAppLink } from "./WhatsAppLink";

export function ContactCTA() {
  const [sending, setSending] = useState(false);
  const send = useServerFn(submitContact);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      nome: String(fd.get("nome") ?? ""),
      empresa: String(fd.get("empresa") ?? ""),
      email: String(fd.get("email") ?? ""),
      whatsapp: String(fd.get("whatsapp") ?? ""),
      mensagem: String(fd.get("mensagem") ?? ""),
    };
    setSending(true);
    try {
      await send({ data: payload });
      toast.success("Mensagem recebida! Retornaremos em até 1 dia útil.");
      form.reset();
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
            <Field label="Nome" name="nome" required />
            <Field label="Empresa" name="empresa" required />
            <Field label="E-mail" name="email" type="email" required />
            <Field label="WhatsApp" name="whatsapp" required />
          </div>
          <div className="mt-4">
            <label htmlFor="mensagem" className="text-xs uppercase tracking-widest text-muted-foreground">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              required
              rows={4}
              maxLength={1000}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-brand transition resize-none placeholder:text-muted-foreground"
              placeholder="Conte sobre o projeto..."
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="mt-6 w-full rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-brand-foreground hover:opacity-90 transition disabled:opacity-60"
          >
            {sending ? "Enviando..." : "Enviar mensagem"}
          </button>
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-brand transition placeholder:text-muted-foreground"
      />
    </div>
  );
}