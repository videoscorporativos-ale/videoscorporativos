import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/video-para-feira-de-negocios`;
const TITLE = "Vídeo para Feira de Negócios · São Paulo e Brasil";
const DESCRIPTION =
  "Vídeo para feira de negócios: registro do stand, depoimentos, entrevistas e aftermovie. Prove o ROI da participação da sua empresa nas feiras do Brasil.";
const OG_IMAGE = "https://i.ytimg.com/vi/0fYFQ9PCQhM/maxresdefault.jpg";

const faqs = [
  { q: "Por que filmar a participação da minha empresa em uma feira?", a: "Uma feira é um investimento alto (estande, equipe, hospedagem, brindes). Sem vídeo, o resultado se apaga quando o evento acaba. Com vídeo, você prova o alcance no board, atrai clientes que não foram e usa o material o ano todo em LinkedIn, propostas e site." },
  { q: "Qual o preço médio?", a: "Entre R$ 3.000 e R$ 10.000, dependendo do número de diárias no evento, entregas (aftermovie, vídeo para redes, vídeo loop para o próximo estande) e quantidade de câmeras." },
  { q: "Quais feiras vocês cobrem?", a: "Hospitalar, ABRAFATI, Fispal, Anufood, ExpoRevestir, ABRADILAN, Feicon, entre outras. Base em São Paulo, cobertura em qualquer capital do Brasil." },
  { q: "O que costuma ser entregue?", a: "Aftermovie 60-90s para pós-evento; corte 30s para tráfego pago; vídeo institucional 2-3min do estande; entrevistas com clientes e executivos; fotos still do estande." },
];

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Vídeo para Feira de Negócios",
  provider: { "@id": `${SITE}/#business` },
  areaServed: { "@type": "Country", name: "Brasil" },
  name: "Vídeo para feira de negócios",
  description: DESCRIPTION,
  url: URL,
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
    { "@type": "ListItem", position: 2, name: "Vídeo para Feira de Negócios", item: URL },
  ],
};

export const Route = createFileRoute("/video-para-feira-de-negocios")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "vídeo feira de negócios, filmagem estande feira, aftermovie feira, vídeo Hospitalar ABRAFATI Fispal, ROI feira de negócios" },
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
            <span className="text-brand">Vídeo para Feira de Negócios</span>
          </nav>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Vídeo para Feira de Negócios
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Sua empresa investe alto para expor em uma feira — estande, equipe, viagens, brindes.
            Sem registro audiovisual profissional, esse investimento evapora quando o evento
            termina. Nós capturamos o estande, entrevistas com clientes, depoimentos de executivos
            e o clima geral do evento, entregando aftermovie, cortes verticais para redes sociais e
            vídeo institucional para uso o ano todo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppLink location="feira_hero" className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 transition">
              Orçar cobertura da feira
            </WhatsAppLink>
          </div>

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