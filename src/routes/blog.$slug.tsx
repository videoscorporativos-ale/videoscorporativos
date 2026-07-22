import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { BlogCTA } from "@/components/site/BlogCTA";
import { getPostBySlug, coverImageUrl, type FaqItem } from "@/content/posts";
import { getAllPosts } from "@/content/posts";

const SITE = "https://videoscorporativos.com.br";

/**
 * Replaces `[IMAGEM: termo de busca]` markers in HTML with an Unsplash <figure>.
 * Uses the nearest preceding <h2> or <h3> text as alt text, falling back to the search term.
 */
function expandInlineImages(html: string): string {
  return html.replace(
    /(?:<p>\s*)?\[IMAGEM:\s*([^\]]+?)\s*\](?:\s*<\/p>)?/gi,
    (_match, raw: string, offset: number, full: string) => {
      // Support `[IMAGEM: search term | alt: descriptive alt text]`
      const [termPart, ...altParts] = raw.split("|");
      const term = termPart.trim();
      const altOverride = altParts
        .join("|")
        .replace(/^\s*alt\s*:\s*/i, "")
        .trim();
      let alt = altOverride;
      if (!alt) {
        const before = full.slice(0, offset);
        const headingMatch = before.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>(?![\s\S]*<h[23])/i);
        alt = headingMatch ? headingMatch[1].replace(/<[^>]+>/g, "").trim() : term;
      }
      const src = coverImageUrl(term);
      return `<figure class="my-8 overflow-hidden rounded-2xl border border-border bg-surface"><img src="${src}" alt="${alt.replace(/"/g, "&quot;")}" loading="lazy" width="1600" height="900" class="aspect-[16/9] w-full object-cover opacity-90" /></figure>`;
    },
  );
}

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    const all = getAllPosts().filter((p) => p.slug !== post.slug);
    // Prefer same-category posts; fill remainder with most recent.
    const sameCat = all.filter((p) => p.category === post.category).slice(0, 3);
    const filler = all.filter((p) => !sameCat.includes(p)).slice(0, 3 - sameCat.length);
    const related = [...sameCat, ...filler].slice(0, 3).map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      coverQuery: p.coverQuery,
      coverAlt: p.coverAlt,
    }));
    return { post, related };
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return {
        meta: [{ title: "Artigo não encontrado · Ale Fotógrafo" }],
      };
    }
    const url = `${SITE}/blog/${post.slug}`;
    const image = coverImageUrl(post.coverQuery);
    const modified = post.dateModified ?? post.datePublished;
    const metaTitle = post.metaTitle ?? post.title;
    const metaDescription = post.metaDescription ?? post.tldr;
    const wordCount = post.bodyHtml
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean).length;
    const tags = post.keywords
      ? post.keywords.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: metaDescription,
      image: [{ "@type": "ImageObject", url: image, width: 1600, height: 900 }],
      datePublished: post.datePublished,
      dateModified: modified,
      wordCount,
      keywords: post.keywords,
      articleSection: post.category,
      inLanguage: "pt-BR",
      author: {
        "@type": "Person",
        name: "Alexandre Machado",
        url: `${SITE}/autor/alexandre-machado`,
        sameAs: [
          "https://alefotografo.com.br",
          "https://www.linkedin.com/in/alexandremachado-fotografo",
          "https://www.instagram.com/alefotografo",
        ],
      },
      publisher: {
        "@type": "Organization",
        name: "Ale Fotógrafo",
        logo: { "@type": "ImageObject", url: `${SITE}/favicon.ico` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", ".prose-blog p:first-of-type"],
      },
    };

    const scripts: Array<{ type: string; children: string }> = [
      { type: "application/ld+json", children: JSON.stringify(articleSchema) },
    ];

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    };
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbSchema),
    });

    if (post.faqs && post.faqs.length > 0) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      });
    }

    return {
      meta: [
        { title: `${metaTitle} · Ale Fotógrafo` },
        { name: "description", content: metaDescription },
        ...(post.keywords ? [{ name: "keywords", content: post.keywords }] : []),
        { name: "author", content: "Alexandre Machado" },
        { property: "article:published_time", content: post.datePublished },
        { property: "article:modified_time", content: modified },
        { property: "article:author", content: `${SITE}/autor/alexandre-machado` },
        { property: "article:section", content: post.category },
        ...tags.map((tag) => ({ property: "article:tag", content: tag })),
        { property: "og:title", content: metaTitle },
        { property: "og:description", content: metaDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: image },
        { property: "og:image:width", content: "1600" },
        { property: "og:image:height", content: "900" },
        { property: "og:image:alt", content: post.coverAlt },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: metaTitle },
        { name: "twitter:description", content: metaDescription },
        { name: "twitter:image", content: image },
        { name: "twitter:image:alt", content: post.coverAlt },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-brand">404</p>
          <h1 className="mt-3 font-display text-3xl font-semibold">Artigo não encontrado</h1>
          <p className="mt-4 text-muted-foreground">
            O artigo que você procura pode ter sido movido ou ainda não foi publicado.
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 transition"
          >
            Ver todos os artigos
          </Link>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    console.error(error);
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-2xl font-semibold">Não foi possível carregar este artigo</h1>
          <button
            onClick={reset}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 transition"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  },
});

function BlogPostPage() {
  const { post, related } = Route.useLoaderData();
  const image = coverImageUrl(post.coverQuery);
  const dateLabel = new Date(post.datePublished + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <article className="mx-auto max-w-3xl px-6">
          <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Início</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-brand">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-brand">{post.category}</span>
          </nav>

          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-brand">{post.category}</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>Por Alexandre Machado — Ale Fotógrafo</span>
            <span aria-hidden>·</span>
            <time dateTime={post.datePublished}>{dateLabel}</time>
          </div>

          <figure className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface">
            <img
              src={image}
              alt={post.coverAlt}
              width={1600}
              height={900}
              className="aspect-[16/9] w-full object-cover opacity-90"
            />
          </figure>

          <section className="mt-10 rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-brand">Resposta rápida</p>
            <p className="mt-3 text-lg leading-relaxed text-foreground/90">{post.tldr}</p>
          </section>

          <div
            className="prose-blog mt-12"
            dangerouslySetInnerHTML={{ __html: expandInlineImages(post.bodyHtml) }}
          />

          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                Perguntas frequentes
              </h2>
              <div className="mt-6 space-y-6">
                {post.faqs.map((f: FaqItem) => (
                  <div key={f.q}>
                    <h3 className="font-display text-lg font-medium">{f.q}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <BlogCTA />

          {related.length > 0 && (
            <section className="mt-20 border-t border-border pt-12" aria-labelledby="related-heading">
              <h2 id="related-heading" className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                Leia também
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r: typeof related[number]) => (
                  <Link
                    key={r.slug}
                    to="/blog/$slug"
                    params={{ slug: r.slug }}
                    className="group block overflow-hidden rounded-2xl border border-border bg-surface/60 transition hover:border-brand/60"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={coverImageUrl(r.coverQuery, 800)}
                        alt={r.coverAlt}
                        loading="lazy"
                        width={800}
                        height={450}
                        className="size-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-brand">{r.category}</p>
                      <h3 className="mt-2 font-display text-lg font-medium leading-snug text-balance group-hover:text-brand">
                        {r.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{r.excerpt}</p>
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