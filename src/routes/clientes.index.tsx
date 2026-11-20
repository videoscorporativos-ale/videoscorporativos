import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { BlogCTA } from "@/components/site/BlogCTA";
import { clients, casesForClient } from "@/content/clients";
import { thumbFor } from "@/components/site/Portfolio";

const SITE = "https://videoscorporativos.com.br";
const title = "Clientes de Vídeo Corporativo em São Paulo | Ale Fotógrafo";
const description = "Empresas que confiam na nossa produção de vídeo: ABRADILAN, ATIVA Log, Tecnisa, SQ Química, Nitriflex e outras. Veja os vídeos de cada cliente.";

export const Route = createFileRoute("/clientes/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${SITE}/clientes` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/clientes` }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Clientes de vídeo corporativo",
        itemListElement: clients.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, url: `${SITE}/clientes/${c.slug}` })),
      }),
    }],
  }),
  component: ClientesPage,
});

function ClientesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-brand">Clientes</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Empresas que confiam na nossa produção de vídeo
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Indústrias, associações, logística, saúde e serviços. Veja o que produzimos para cada cliente.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((c) => {
              const cs = casesForClient(c);
              const first = cs[0];
              return (
                <Link key={c.slug} to="/clientes/$slug" params={{ slug: c.slug }}
                  className="group overflow-hidden rounded-2xl border border-border bg-surface/60 transition-colors hover:border-brand">
                  {first && (
                    <div className="aspect-video overflow-hidden">
                      <img loading="lazy" src={thumbFor(first.videoId)} alt={`Vídeo produzido para ${c.name}`}
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-[10px] uppercase tracking-widest text-brand">{c.sector}</p>
                    <h2 className="mt-1 font-display text-xl font-semibold">{c.name}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{cs.length} {cs.length === 1 ? "vídeo" : "vídeos"}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <BlogCTA />
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
