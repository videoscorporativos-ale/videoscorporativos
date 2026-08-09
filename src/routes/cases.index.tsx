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
  validateSearch: (search: Record<string, unknown>) => ({
    segmento: typeof search.segmento === "string" ? search.segmento : "institucional",
  }),
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
  const CATS = ["Institucional", "Eventos", "Feiras", "Reels"] as const;
  const groups = CATS.map((cat) => ({
    cat,
    items: cases.filter((c) => c.category === cat),
  }));
  const INITIAL = 4;
  const STEP = 4;
  const { segmento } = Route.useSearch();
  const active =
    CATS.find((c) => c.toLowerCase() === segmento.toLowerCase()) ?? "Institucional";
  const [counts, setCounts] = useState<Record<string, number>>(
    () => Object.fromEntries(CATS.map((c) => [c, INITIAL])),
  );
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  const group = groups.find((g) => g.cat === active) ?? groups[0];
  const vertical = group.cat === "Reels";
  const visible = counts[group.cat] ?? INITIAL;
  const items = group.items.slice(0, visible);
  const remaining = group.items.length - visible;

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
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Categorias de cases">
            {groups.map((g) => (
              <Link
                key={g.cat}
                to="/cases"
                search={{ segmento: g.cat.toLowerCase() }}
                replace
                resetScroll={false}
                role="tab"
                aria-selected={active === g.cat}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm transition",
                  active === g.cat
                    ? "bg-brand text-brand-foreground border-brand"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                )}
              >
                {g.cat} ({g.items.length})
              </Link>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
              {group.cat}
            </h2>
            <div
              className={cn(
                "mt-6 grid gap-4 sm:grid-cols-2",
                vertical ? "sm:grid-cols-4 gap-3 max-w-3xl" : "lg:grid-cols-4",
              )}
            >
              {items.map((c) => (
                <div key={c.slug} className="group">
                  <button
                    type="button"
                    onClick={() => setOpenVideo(c.videoId)}
                    aria-label={`Assistir: ${c.title}`}
                    className={cn(
                      "relative w-full overflow-hidden rounded-xl border border-border bg-surface text-left transition hover:border-brand/40",
                      vertical ? "aspect-[9/16]" : "aspect-video",
                    )}
                  >
                    <img
                      loading="lazy"
                      src={thumbFor(c.videoId)}
                      alt={`${c.title} — case de vídeo ${c.category.toLowerCase()} corporativo`}
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                      <div className="size-12 rounded-full bg-brand text-brand-foreground flex items-center justify-center">
                        <Play className="size-4 fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-xs uppercase tracking-widest text-brand">{c.category}</p>
                      <p className="mt-1 font-display text-sm font-medium line-clamp-2">{c.title}</p>
                    </div>
                  </button>
                  <Link
                    to="/cases/$slug"
                    params={{ slug: c.slug }}
                    className="mt-2 inline-block text-xs text-muted-foreground hover:text-brand"
                  >
                    Ver detalhes do case
                  </Link>
                </div>
              ))}
            </div>

            {remaining > 0 && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setCounts((prev) => ({ ...prev, [group.cat]: (prev[group.cat] ?? INITIAL) + STEP }))
                  }
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium transition hover:bg-surface"
                >
                  Ver mais {Math.min(remaining, STEP)} cases de {group.cat}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {openVideo && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
          onClick={() => setOpenVideo(null)}
        >
          <button
            className="absolute right-6 top-6 size-10 rounded-full border border-border bg-surface flex items-center justify-center transition hover:bg-brand hover:text-brand-foreground"
            onClick={() => setOpenVideo(null)}
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>
          <div
            className={cn(
              "overflow-hidden rounded-xl border border-border",
              vertical ? "h-[80vh] aspect-[9/16] max-w-full" : "w-full max-w-5xl aspect-video",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${openVideo}?autoplay=1`}
              title="Vídeo do case"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="size-full"
            />
          </div>
        </div>
      )}
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}