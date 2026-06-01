import { Link } from "@tanstack/react-router";
import { WhatsAppLink } from "./WhatsAppLink";

export function BlogCTA({ location = "blog_article_cta" }: { location?: string }) {
  return (
    <aside className="mt-16 rounded-2xl border border-brand/40 bg-brand/10 p-6 md:p-8">
      <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
        Vamos produzir o vídeo da sua empresa?
      </h2>
      <p className="mt-3 text-base text-foreground/85 leading-relaxed">
        Conte sobre o seu projeto. Devolvemos um orçamento personalizado e uma primeira
        conversa estratégica, sem compromisso.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <WhatsAppLink
          location={location}
          className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 transition"
        >
          Solicitar orçamento
        </WhatsAppLink>
        <Link
          to="/"
          hash="portfolio"
          className="inline-flex items-center justify-center rounded-full border border-brand/60 px-6 py-3 text-sm font-medium text-foreground hover:bg-brand/15 transition"
        >
          Ver portfólio
        </Link>
      </div>
      <p className="mt-5 text-xs text-muted-foreground">
        Mais de 30 anos de experiência · Nota Excelente no Google (+137 avaliações).
      </p>
    </aside>
  );
}