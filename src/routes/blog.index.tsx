import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { getAllPosts, coverImageUrl } from "@/content/posts";

const TITLE = "Blog · Vídeo corporativo, eventos e feiras | Ale Fotógrafo";
const DESCRIPTION =
  "Guias práticos sobre vídeo institucional, eventos corporativos e feiras de negócios: preço, tipos, processo e resultado. Por Alexandre Machado, +30 anos de experiência.";
const URL = "https://videoscorporativos.com.br/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
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
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Início</Link>
            <span className="mx-2">/</span>
            <span className="text-brand">Blog</span>
          </nav>

          <header className="mt-6 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-brand">Blog</p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              Vídeo corporativo, sem mistério.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Guias diretos sobre preço, tipos de vídeo, eventos, feiras e o que esperar de
              cada produção. Escrito por quem está em campo há mais de 30 anos.
            </p>
          </header>

          {posts.length === 0 ? (
            <div className="mt-16 rounded-2xl border border-border bg-surface/40 p-10 text-center">
              <p className="text-muted-foreground">
                Em breve, os primeiros artigos. Volte logo.
              </p>
            </div>
          ) : (
            <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="group block overflow-hidden rounded-2xl border border-border bg-surface/40 transition hover:border-brand/50"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                      <img
                        src={coverImageUrl(post.coverQuery)}
                        alt={post.coverAlt}
                        loading="lazy"
                        className="size-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                    </div>
                    <div className="p-6">
                      <p className="text-xs uppercase tracking-[0.18em] text-brand">
                        {post.category}
                      </p>
                      <h2 className="mt-3 font-display text-xl font-semibold leading-tight text-foreground group-hover:text-brand transition">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}