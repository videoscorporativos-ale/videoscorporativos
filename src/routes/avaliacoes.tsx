import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";
import { GOOGLE_RATING, googleReviews } from "@/content/google-reviews";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/avaliacoes`;
const TITLE = `Avaliações de Clientes: Nota ${GOOGLE_RATING.value.toLocaleString("pt-BR")} no Google | Ale Fotógrafo`;
const DESCRIPTION = `${GOOGLE_RATING.count} avaliações reais no Google, nota ${GOOGLE_RATING.value.toLocaleString("pt-BR")}. Veja o que empresas e profissionais dizem sobre os vídeos e fotos de Alexandre Machado em São Paulo.`;

export const Route = createFileRoute("/avaliacoes")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Avaliações", item: URL },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function Stars() {
  return (
    <div className="flex gap-0.5 text-brand" aria-label="5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
    </div>
  );
}

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Início</Link>
            <span className="mx-2">/</span>
            <span className="text-brand">Avaliações</span>
          </nav>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Avaliações de clientes no Google
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Nota <strong className="text-foreground">{GOOGLE_RATING.value.toLocaleString("pt-BR")}</strong> com{" "}
            <strong className="text-foreground">{GOOGLE_RATING.count} avaliações</strong> no perfil Ale Fotógrafo.
            Abaixo, os depoimentos completos de 5 estrelas, exatamente como foram publicados.
          </p>
          <ul className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-4">
            {googleReviews.map((r) => (
              <li key={r.author + r.date} className="mb-4 break-inside-avoid rounded-2xl border border-border bg-surface/40 p-6">
                <Stars />
                <blockquote className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">"{r.text}"</blockquote>
                <p className="mt-5 text-sm font-medium">{r.author}</p>
                <p className="text-xs text-muted-foreground">
                  Google · {new Date(r.date).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-12 rounded-2xl border border-border bg-surface/60 p-8 text-center">
            <h2 className="font-display text-2xl font-semibold">Quer o mesmo resultado na sua empresa?</h2>
            <WhatsAppLink location="avaliacoes_cta" className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 transition">
              Solicitar orçamento no WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
