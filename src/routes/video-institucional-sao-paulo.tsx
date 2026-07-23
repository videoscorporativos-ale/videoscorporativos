import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/video-institucional-sao-paulo`;
const TITLE = "Vídeo Institucional em São Paulo · Produtora com +30 anos";
const DESCRIPTION =
  "Produção de vídeo institucional em São Paulo: roteiro, captação em cinema digital, edição e entrega. Atendimento em Paulista, Faria Lima, Berrini, Alphaville e todo SP.";
const OG_IMAGE = "https://i.ytimg.com/vi/aOiYST9L8ec/maxresdefault.jpg";

const faqs = [
  { q: "Qual o preço médio de um vídeo institucional em São Paulo?", a: "Em 2026, um vídeo institucional em São Paulo custa entre R$ 3.000 (versão simples, uma diária) e R$ 30.000+ (produção multi-locação com equipe ampliada). O valor exato depende de duração, diárias, locações, equipe e pós-produção." },
  { q: "Atende empresas fora da capital paulista?", a: "Sim. Atendo Grande São Paulo (ABC Paulista, Alphaville, Barueri, Osasco, Santana de Parnaíba, Guarulhos), interior de SP e projetos em todo o Brasil." },
  { q: "Quanto tempo leva a produção?", a: "Um vídeo institucional padrão em São Paulo leva de 3 a 6 semanas somando briefing, roteiro, captação e finalização. Projetos urgentes podem ser negociados." },
  { q: "Vocês têm estúdio próprio em SP?", a: "Sim, com estrutura móvel para captação em qualquer região da cidade — Paulista, Faria Lima, Berrini, Vila Olímpia, Itaim, Alphaville e ABC." },
];

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Produção de Vídeo Institucional",
  provider: { "@id": `${SITE}/#business` },
  areaServed: [
    { "@type": "City", name: "São Paulo" },
    { "@type": "AdministrativeArea", name: "Grande São Paulo" },
  ],
  name: "Vídeo institucional corporativo em São Paulo",
  description: DESCRIPTION,
  url: URL,
  offers: { "@type": "Offer", priceCurrency: "BRL", priceSpecification: { "@type": "PriceSpecification", price: "3000", priceCurrency: "BRL" } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
    { "@type": "ListItem", position: 2, name: "Vídeo Institucional em São Paulo", item: URL },
  ],
};

export const Route = createFileRoute("/video-institucional-sao-paulo")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "vídeo institucional São Paulo, produtora de vídeo SP, filmagem corporativa São Paulo, vídeo empresarial SP, vídeo institucional Paulista Faria Lima" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(service) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumb) },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <article className="mx-auto max-w-3xl px-6">
          <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Início</Link>
            <span className="mx-2">/</span>
            <span className="text-brand">Vídeo Institucional em São Paulo</span>
          </nav>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Vídeo Institucional em São Paulo
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Produção completa de vídeo institucional em São Paulo — roteiro estratégico, captação em
            cinema digital, edição, color grading e entrega nos formatos certos para site, LinkedIn,
            YouTube e propostas comerciais. +30 anos atendendo empresas na Avenida Paulista, Faria
            Lima, Berrini, Vila Olímpia, Itaim, Alphaville, Barueri e ABC Paulista.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppLink location="video_sp_hero" className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 transition">
              Solicitar orçamento · (11) 91355-0533
            </WhatsAppLink>
            <Link to="/precos" className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-brand transition">
              Ver faixas de preço
            </Link>
          </div>

          <Section title="Regiões de São Paulo onde atuamos">
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              {["Avenida Paulista", "Faria Lima", "Berrini", "Vila Olímpia", "Itaim Bibi", "Jardins", "Pinheiros", "Alphaville", "Barueri", "Osasco", "Santana de Parnaíba", "Santo André", "São Bernardo", "São Caetano", "Guarulhos", "Moema", "Brooklin", "Chácara Santo Antônio"].map((b) => (
                <li key={b} className="rounded-lg border border-border bg-surface/40 px-3 py-2">{b}</li>
              ))}
            </ul>
          </Section>

          <Section title="O que está incluso">
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Briefing estratégico e roteiro sob medida</li>
              <li>Captação com câmera cinema digital, lentes profissionais e áudio broadcast</li>
              <li>Direção de cena com executivos e colaboradores</li>
              <li>Edição, color grading, motion graphics e mixagem</li>
              <li>Entrega em versões web (16:9), Reels/Stories (9:16) e LinkedIn (1:1 e 4:5)</li>
              <li>Legendas em português (SEO/acessibilidade)</li>
            </ul>
          </Section>

          <Section title="Perguntas frequentes">
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-display text-lg font-medium">{f.q}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </Section>

          <div className="mt-16 rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold">Vamos conversar sobre seu projeto?</h2>
            <p className="mt-3 text-muted-foreground">Envie o briefing e receba orçamento em até 24h.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <WhatsAppLink location="video_sp_footer" className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 transition">
                Falar no WhatsApp
              </WhatsAppLink>
              <a href="mailto:comercial@alefotografo.com.br" className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-brand transition">
                comercial@alefotografo.com.br
              </a>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}