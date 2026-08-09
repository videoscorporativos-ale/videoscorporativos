import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { BlogCTA } from "@/components/site/BlogCTA";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/autor/alexandre-machado`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alexandre Machado",
  alternateName: "Ale Fotógrafo",
  url: URL,
  image: `${SITE}/logo.png`,
  jobTitle: "Fotógrafo e Produtor de Vídeo Corporativo",
  description:
    "Fotógrafo profissional e produtor de vídeo corporativo em São Paulo, com mais de 30 anos de experiência atendendo empresas em todo o Brasil.",
  worksFor: {
    "@type": "Organization",
    name: "Ale Fotógrafo",
    url: SITE,
  },
  sameAs: [
    "https://alefotografo.com.br",
    "https://www.linkedin.com/in/alexandremachado-fotografo",
    "https://www.instagram.com/alefotografo",
  ],
  knowsAbout: [
    "Vídeo institucional",
    "Vídeo corporativo",
    "Cobertura de eventos corporativos",
    "Feiras de negócios",
    "Retrato corporativo",
    "Fotografia institucional",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
};

export const Route = createFileRoute("/autor/alexandre-machado")({
  head: () => ({
    meta: [
      { title: "Alexandre Machado — Ale Fotógrafo · Vídeo Corporativo SP" },
      {
        name: "description",
        content:
          "Conheça Alexandre Machado, o Ale Fotógrafo: +30 anos produzindo vídeo corporativo, eventos, feiras e retratos para empresas em São Paulo e no Brasil.",
      },
      { property: "og:title", content: "Alexandre Machado — Ale Fotógrafo" },
      {
        property: "og:description",
        content:
          "Fotógrafo e produtor de vídeo corporativo em São Paulo com mais de 30 anos de experiência.",
      },
      { property: "og:url", content: URL },
      { property: "og:type", content: "profile" },
      { property: "profile:first_name", content: "Alexandre" },
      { property: "profile:last_name", content: "Machado" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Autor", item: URL },
            {
              "@type": "ListItem",
              position: 3,
              name: "Alexandre Machado",
              item: URL,
            },
          ],
        }),
      },
    ],
  }),
  component: AuthorPage,
});

function AuthorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <article className="mx-auto max-w-3xl px-6">
          <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Início</Link>
            <span className="mx-2">/</span>
            <span className="text-brand">Autor</span>
          </nav>

          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-brand">Autor</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Alexandre Machado
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Ale Fotógrafo — Fotógrafo e produtor de vídeo corporativo em São Paulo.
          </p>

          <section className="mt-10 space-y-6 text-foreground/90 leading-relaxed">
            <p>
              Alexandre Machado é fotógrafo profissional e produtor de vídeo
              corporativo em São Paulo, com mais de <strong>30 anos de experiência</strong>{" "}
              atendendo empresas de diferentes segmentos em todo o Brasil. Especializou-se
              em fotografia corporativa, retratos profissionais, cobertura de eventos,
              feiras de negócios e produção de vídeo institucional.
            </p>
            <p>
              Seu trabalho é voltado para empresas e profissionais que precisam fortalecer
              a imagem, transmitir autoridade e se posicionar com consistência no mercado.
              Cada projeto começa por entender o posicionamento do cliente, o público que
              será impactado e o objetivo da comunicação — para que cada fotografia e cada
              vídeo tenha intenção estratégica, não apenas estética.
            </p>

            <h2 className="font-display text-2xl font-semibold pt-4">Áreas de atuação</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Vídeo institucional e vídeo manifesto</li>
              <li>Vídeo de vendas e depoimentos de clientes</li>
              <li>Cobertura de eventos corporativos e convenções</li>
              <li>Feiras de negócios e stands</li>
              <li>Retrato corporativo e fotografia institucional</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold pt-4">Credenciais</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>+30 anos de experiência profissional</li>
              <li>Centenas de empresas atendidas</li>
              <li>Nota Excelente no Google com +137 avaliações</li>
              <li>Atendimento direto, estúdio próprio e estrutura móvel</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold pt-4">Perfis e contato</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Site histórico:{" "}
                <a
                  className="text-brand underline"
                  href="https://alefotografo.com.br"
                  rel="me"
                >
                  alefotografo.com.br
                </a>
              </li>
              <li>
                LinkedIn:{" "}
                <a
                  className="text-brand underline"
                  href="https://www.linkedin.com/in/alexandremachado-fotografo"
                  rel="me"
                >
                  Alexandre Machado
                </a>
              </li>
              <li>
                Instagram:{" "}
                <a
                  className="text-brand underline"
                  href="https://www.instagram.com/alefotografo"
                  rel="me"
                >
                  @alefotografo
                </a>
              </li>
              <li>WhatsApp: (11) 91355-0533</li>
              <li>E-mail: comercial@alefotografo.com.br</li>
            </ul>
          </section>

          <BlogCTA location="author_page_cta" />
        </article>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}