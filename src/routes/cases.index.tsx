import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Play, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { getAllCases } from "@/lib/portfolio-slugs";
import { thumbFor } from "@/components/site/Portfolio";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/cases`;
const TITLE = "Cases de Vídeo Corporativo · Portfólio Ale Fotógrafo";
const DESCRIPTION =
  "Portfólio completo de vídeos corporativos produzidos pela Ale Fotógrafo: institucionais, eventos e feiras de negócios para empresas em São Paulo e no Brasil.";

export const Route = createFileRoute("/cases/")({
  head: () => {
    const cases = getAllCases();
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: cases.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}/cases/${c.slug}`,
        name: c.title,
      })),
    };
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Cases", item: URL },
      ],
    };
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:url", content: URL },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
      ],
      links: [{ rel: "canonical", href: URL }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(itemList) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumb) },
      ],
    };
  },
  component: CasesIndex,
});

function CasesIndex() {
  const cases = getAllCases();
  const groups = (["Institucional", "Eventos", "Feiras", "Reels"] as const).map((cat) => ({
    cat,
    items: cases.filter((c) => c.category === cat),
  }));
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Início</Link>
            <span className="mx-2">/</span>
            <span className="text-brand">Cases</span>
          </nav>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Cases de vídeo corporativo
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {cases.length} produções audiovisuais entregues para empresas — institucionais,
            cobertura de eventos corporativos, vídeo para feiras de negócios e reels verticais.
          </p>
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Ir para categoria">
            {groups.map((g) => (
              <a
                key={g.cat}
                href={`#${g.cat.toLowerCase()}`}
                className="rounded-full border border-border px-5 py-2 text-sm text-muted-foreground transition hover:border-brand/50 hover:text-foreground"
              >
                {g.cat} ({g.items.length})
              </a>
            ))}
          </nav>

          {groups.map((g) => (
            <section key={g.cat} id={g.cat.toLowerCase()} className="mt-16 scroll-mt-28">
              <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                {g.cat}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((c) => (
                  <Link
                    key={c.slug}
                    to="/cases/$slug"
                    params={{ slug: c.slug }}
                    className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-surface"
                  >
                    <img
                      loading="lazy"
                      src={thumbFor(c.videoId)}
                      alt={`${c.title} — case de vídeo ${c.category.toLowerCase()} corporativo`}
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-xs uppercase tracking-widest text-brand">{c.category}</p>
                      <p className="mt-1 font-display font-medium">{c.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}