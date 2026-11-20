import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { BlogCTA } from "@/components/site/BlogCTA";
import { getClient, casesForClient } from "@/content/clients";
import { thumbFor, hiResThumbFor } from "@/components/site/Portfolio";

const SITE = "https://videoscorporativos.com.br";

export const Route = createFileRoute("/clientes/$slug")({
  loader: ({ params }) => {
    const client = getClient(params.slug);
    if (!client) throw notFound();
    return { client: { ...client, match: undefined }, cases: casesForClient(client) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Cliente não encontrado" }, { name: "robots", content: "noindex" }] };
    const { client, cases } = loaderData;
    const url = `${SITE}/clientes/${client.slug}`;
    const title = `${client.name}: Vídeos Corporativos Produzidos | Ale Fotógrafo`;
    const description = `${client.summary} ${cases.length} ${cases.length === 1 ? "vídeo" : "vídeos"} produzidos em São Paulo.`.slice(0, 158);
    const image = cases[0] ? hiResThumbFor(cases[0].videoId) : undefined;
    const meta = [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
    ];
    return {
      meta,
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Clientes", item: `${SITE}/clientes` },
            { "@type": "ListItem", position: 3, name: client.name, item: url },
          ],
        }) },
        { type: "application/ld+json", children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Vídeos produzidos para ${client.name}`,
          itemListElement: cases.map((c, i) => ({
            "@type": "ListItem", position: i + 1, url: `${SITE}/cases/${c.slug}`,
            item: { "@type": "VideoObject", name: c.title, description: `${c.title} — vídeo produzido para ${client.name}.`,
              thumbnailUrl: thumbFor(c.videoId), uploadDate: "2024-01-01T00:00:00-03:00",
              embedUrl: `https://www.youtube.com/embed/${c.videoId}` },
          })),
        }) },
      ],
    };
  },
  component: ClientPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-32 pb-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Cliente não encontrado</h1>
        <Link to="/clientes" className="mt-6 inline-block text-brand hover:underline">Ver todos os clientes</Link>
      </main>
      <SiteFooter />
    </div>
  ),
});

function ClientPage() {
  const { client, cases } = Route.useLoaderData();
  const [main, ...rest] = cases;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <article className="mx-auto max-w-5xl px-6">
          <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Início</Link>
            <span className="mx-2">/</span>
            <Link to="/clientes" className="hover:text-brand">Clientes</Link>
            <span className="mx-2">/</span>
            <span className="text-brand">{client.name}</span>
          </nav>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-brand">{client.sector}</p>
          <h1 className="mt-3 font-display text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Vídeos corporativos para {client.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{client.summary}</p>
          {main && (
            <div className="mt-10 aspect-video overflow-hidden rounded-2xl border border-border bg-surface">
              <iframe src={`https://www.youtube.com/embed/${main.videoId}`} title={main.title}
                allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" className="size-full" />
            </div>
          )}
          {rest.length > 0 && (
            <section className="mt-14">
              <h2 className="font-display text-2xl font-semibold">Outros vídeos para {client.name}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((r) => (
                  <Link key={r.slug} to="/cases/$slug" params={{ slug: r.slug }}
                    className="group relative aspect-video overflow-hidden rounded-xl border border-border">
                    <img loading="lazy" src={thumbFor(r.videoId)} alt={r.title}
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-[10px] uppercase tracking-widest text-brand">{r.category}</p>
                      <h3 className="mt-1 text-sm font-medium">{r.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
          <BlogCTA />
          <p className="mt-10 text-center">
            <Link to="/clientes" className="text-brand hover:underline">← Ver todos os clientes</Link>
          </p>
        </article>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
