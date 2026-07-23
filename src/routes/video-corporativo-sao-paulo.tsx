import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/video-corporativo-sao-paulo`;
const TITLE = "Vídeo Corporativo em São Paulo · Produtora com +30 anos";
const DESCRIPTION =
  "Vídeo corporativo em São Paulo: institucional, evento e feira. Roteiro, captação em cinema digital e entrega multi-formato. Atendimento em Paulista, Faria Lima, Berrini e todo SP.";
const OG_IMAGE = "https://i.ytimg.com/vi/aOiYST9L8ec/maxresdefault.jpg";

const faqs = [
  { q: "O que é um vídeo corporativo?", a: "Vídeo corporativo é qualquer produção audiovisual feita para uma empresa comunicar-se com clientes, colaboradores, investidores ou o mercado — incluindo institucional, cobertura de eventos, treinamento, comunicação interna e vídeo para feiras de negócios." },
  { q: "Quanto custa um vídeo corporativo em São Paulo em 2026?", a: "Entre R$ 3.000 (versão simples, uma diária, até 90s) e R$ 30.000+ (produção premium multi-locação). Institucional simples R$ 3.000–8.000; completo R$ 8.000–20.000; premium R$ 20.000+. Evento corporativo R$ 4.000–15.000. Vídeo para feira R$ 3.000–10.000." },
  { q: "Qual a diferença entre vídeo corporativo e vídeo institucional?", a: "Institucional é uma categoria dentro do vídeo corporativo — foca em apresentar a empresa (missão, produtos, cultura). Vídeo corporativo é o guarda-chuva: inclui institucional, eventos, treinamento, comunicação interna, cases, aftermovies e vídeo para feira." },
  { q: "Quanto tempo leva a produção de um vídeo corporativo?", a: "De 3 a 6 semanas para institucionais somando briefing, roteiro, captação e finalização. Aftermovies de eventos podem ser entregues em 5 a 20 dias úteis, dependendo da duração." },
  { q: "Atende empresas fora de São Paulo capital?", a: "Sim. Base em São Paulo, com captação em toda Grande SP (ABC, Alphaville, Barueri, Guarulhos), interior de SP e projetos sob demanda em capitais brasileiras." },
];

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Produção de Vídeo Corporativo",
  provider: { "@id": `${SITE}/#business` },
  areaServed: [
    { "@type": "City", name: "São Paulo" },
    { "@type": "AdministrativeArea", name: "Grande São Paulo" },
  ],
  name: "Vídeo corporativo em São Paulo",
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
    { "@type": "ListItem", position: 2, name: "Vídeo Corporativo em São Paulo", item: URL },
  ],
};

export const Route = createFileRoute("/video-corporativo-sao-paulo")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "vídeo corporativo São Paulo, produtora de vídeo corporativo SP, filmagem corporativa São Paulo, vídeo empresarial SP, produtora audiovisual SP" },
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
            <span className="text-brand">Vídeo Corporativo em São Paulo</span>
          </nav>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Vídeo Corporativo em São Paulo
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Produção completa de vídeo corporativo em São Paulo — institucional, cobertura de eventos,
            vídeo para feira, comunicação interna e cases. Roteiro estratégico, captação em cinema
            digital, edição, color grading e entrega nos formatos certos para site, LinkedIn, YouTube
            e propostas comerciais. +30 anos atendendo empresas na Paulista, Faria Lima, Berrini,
            Vila Olímpia, Itaim, Alphaville, Barueri e ABC Paulista.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppLink location="video_corp_sp_hero" className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 transition">
              Solicitar orçamento · (11) 91355-0533
            </WhatsAppLink>
            <Link to="/precos" className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-brand transition">
              Ver faixas de preço
            </Link>
          </div>

          <Section title="Tipos de vídeo corporativo que produzimos em SP">
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link to="/video-institucional-sao-paulo" className="text-foreground font-medium hover:text-brand">Vídeo institucional</Link>
                {" — "}apresentação da empresa, missão, cultura e produtos.
              </li>
              <li>
                <Link to="/filmagem-evento-corporativo-sao-paulo" className="text-foreground font-medium hover:text-brand">Cobertura de eventos corporativos</Link>
                {" — "}convenções, lançamentos, congressos, aftermovies.
              </li>
              <li>
                <Link to="/video-para-feira-de-negocios" className="text-foreground font-medium hover:text-brand">Vídeo para feira de negócios</Link>
                {" — "}aftermovie de estande, cobertura de participação, teaser pré-feira.
              </li>
              <li><span className="text-foreground font-medium">Vídeo de comunicação interna</span> — mensagens de liderança, endomarketing, treinamento.</li>
              <li><span className="text-foreground font-medium">Cases e depoimentos</span> — clientes e colaboradores contando resultados reais.</li>
            </ul>
          </Section>

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
              <WhatsAppLink location="video_corp_sp_footer" className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 transition">
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