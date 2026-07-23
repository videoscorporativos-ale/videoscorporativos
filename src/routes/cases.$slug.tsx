import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { BlogCTA } from "@/components/site/BlogCTA";
import { getCaseBySlug, getAllCases } from "@/lib/portfolio-slugs";
import { hiResThumbFor, thumbFor } from "@/components/site/Portfolio";

const SITE = "https://videoscorporativos.com.br";

export const Route = createFileRoute("/cases/$slug")({
  loader: ({ params }) => {
    const item = getCaseBySlug(params.slug);
    if (!item) throw notFound();
    const related = getAllCases()
      .filter((c) => c.slug !== item.slug && c.category === item.category)
      .slice(0, 3);
    return { item, related };
  },
  head: ({ loaderData }) => {
    const item = loaderData?.item;
    if (!item) return { meta: [{ title: "Case não encontrado · Ale Fotógrafo" }] };
    const url = `${SITE}/cases/${item.slug}`;
    const image = hiResThumbFor(item.videoId);
    const title = `${item.title} · Case ${item.category}`;
    const description = `${item.title} — case de vídeo ${item.category.toLowerCase()} corporativo produzido por Ale Fotógrafo em São Paulo. Assista ao vídeo completo.`;

    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: item.title,
      description,
      thumbnailUrl: [image, thumbFor(item.videoId)],
      uploadDate: "2024-01-01T00:00:00-03:00",
      contentUrl: `https://www.youtube.com/watch?v=${item.videoId}`,
      embedUrl: `https://www.youtube.com/embed/${item.videoId}`,
      inLanguage: "pt-BR",
      genre: item.category,
      publisher: {
        "@type": "Organization",
        name: "Ale Fotógrafo",
        logo: { "@type": "ImageObject", url: `${SITE}/favicon.ico` },
      },
    };
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Cases", item: `${SITE}/cases` },
        { "@type": "ListItem", position: 3, name: item.title, item: url },
      ],
    };
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "video.other" },
        { property: "og:image", content: image },
        { property: "og:video", content: `https://www.youtube.com/embed/${item.videoId}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(videoSchema) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumb) },
      ],
    };
  },
  component: CasePage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-32 pb-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Case não encontrado</h1>
        <Link to="/cases" className="mt-6 inline-block text-brand hover:underline">Ver todos os cases</Link>
      </main>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen flex items-center justify-center">
      <button onClick={reset} className="text-brand">Tentar novamente</button>
    </div>
  ),
});

function CasePage() {
  const { item, related } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <article className="mx-auto max-w-5xl px-6">
          <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Início</Link>
            <span className="mx-2">/</span>
            <Link to="/cases" className="hover:text-brand">Cases</Link>
            <span className="mx-2">/</span>
            <span className="text-brand">{item.category}</span>
          </nav>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-brand">{item.category}</p>
          <h1 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight text-balance">
            {item.title}
          </h1>
          <div className="mt-10 aspect-video overflow-hidden rounded-2xl border border-border bg-surface">
            <iframe
              src={`https://www.youtube.com/embed/${item.videoId}`}
              title={item.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="size-full"
            />
          </div>
          <section className="mt-10 rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-brand">Sobre este case</p>
            <p className="mt-3 text-lg leading-relaxed text-foreground/90">
              <strong>{item.title}</strong> é uma produção audiovisual da categoria{" "}
              <strong>{item.category}</strong>, realizada pela Ale Fotógrafo — produtora de vídeo
              corporativo em São Paulo com mais de 30 anos de mercado. Roteiro, captação em cinema
              digital, direção, edição, color grading e trilha por equipe própria.
            </p>
          </section>
          <BlogCTA />
          {related.length > 0 && (
            <section className="mt-16 border-t border-border pt-10">
              <h2 className="font-display text-2xl font-semibold">Cases relacionados</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to="/cases/$slug"
                    params={{ slug: r.slug }}
                    className="group relative aspect-video overflow-hidden rounded-xl border border-border"
                  >
                    <img
                      loading="lazy"
                      src={thumbFor(r.videoId)}
                      alt={`${r.title} — case relacionado`}
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-[10px] uppercase tracking-widest text-brand">{r.category}</p>
                      <p className="mt-1 text-sm font-medium">{r.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}