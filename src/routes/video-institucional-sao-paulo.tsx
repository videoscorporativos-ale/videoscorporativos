import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/video-institucional-sao-paulo`;
const TITLE = "Vídeo Institucional em São Paulo: Produtora, Preços e Cases";
const DESCRIPTION =
  "Vídeo institucional em São Paulo a partir de R$ 3.000: roteiro, filmagem, edição e cases reais (Nitriflex, Fiorde, FlexFunds). Orçamento em 24h.";
const OG_IMAGE = "https://i.ytimg.com/vi/aOiYST9L8ec/maxresdefault.jpg";

const faqs = [
  { q: "Qual o preço médio de um vídeo institucional em São Paulo?", a: "Em 2026, um vídeo institucional em São Paulo custa entre R$ 3.000 (versão simples, uma diária) e R$ 30.000+ (produção multi-locação com equipe ampliada). O valor exato depende de duração, diárias, locações, equipe e pós-produção." },
  { q: "Atende empresas fora da capital paulista?", a: "Sim. Atendo Grande São Paulo (ABC Paulista, Alphaville, Barueri, Osasco, Santana de Parnaíba, Guarulhos), interior de SP e projetos em todo o Brasil." },
  { q: "Quanto tempo leva a produção?", a: "Um vídeo institucional padrão em São Paulo leva de 3 a 6 semanas somando briefing, roteiro, captação e finalização. Projetos urgentes podem ser negociados." },
  { q: "Vocês têm estúdio próprio em SP?", a: "Sim, com estrutura móvel para captação em qualquer região da cidade — Paulista, Faria Lima, Berrini, Vila Olímpia, Itaim, Alphaville e ABC." },
  { q: "Qual a duração ideal de um vídeo institucional?", a: "Para site e propostas comerciais, de 1min30 a 3 minutos. Para redes sociais, cortes de 15 a 60 segundos a partir do mesmo material. Vídeos mais curtos têm taxa de visualização completa bem maior." },
  { q: "O que preciso preparar antes da gravação?", a: "Objetivo do vídeo, público, mensagens principais e quem vai falar. Nós conduzimos o briefing, escrevemos o roteiro e orientamos os entrevistados para que todos fiquem à vontade diante da câmera." },
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

          <Section title="Cases de vídeo institucional">
            <ul className="space-y-3 text-muted-foreground">
              <li><strong className="text-foreground">Nitriflex</strong> — indústria química de polímeros: estrutura fabril, processos e propósito da marca.</li>
              <li><strong className="text-foreground">Fiorde Logística</strong> — soluções logísticas integradas apresentadas para clientes e parceiros.</li>
              <li><strong className="text-foreground">FlexFunds</strong> — fundos de investimento: vídeo para gerar confiança em um público financeiro.</li>
              <li><strong className="text-foreground">ATIVA Log</strong> — vídeo institucional para apresentação comercial.</li>
            </ul>
            <Link to="/cases" search={{ segmento: "institucional" }} className="mt-6 inline-flex text-sm font-medium text-brand hover:underline">Assistir aos cases de vídeo institucional →</Link>
          </Section>

          <Section title="Quanto custa um vídeo institucional em São Paulo">
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-surface/60 text-left"><tr><th className="p-3">Formato</th><th className="p-3">Faixa de investimento</th></tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border"><td className="p-3">Essencial — 1 diária, 1 locação, até 2 min</td><td className="p-3">R$ 3.000 a R$ 8.000</td></tr>
                  <tr className="border-t border-border"><td className="p-3">Completo — 2 diárias, entrevistas e drone</td><td className="p-3">R$ 8.000 a R$ 18.000</td></tr>
                  <tr className="border-t border-border"><td className="p-3">Premium — várias locações, equipe ampliada</td><td className="p-3">R$ 18.000 a R$ 30.000+</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Veja o detalhamento completo na <Link to="/precos" className="text-brand hover:underline">tabela de preços de vídeo institucional</Link>.</p>
          </Section>

          <Section title="Como funciona a produção">
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Briefing</strong> — entendemos objetivo, público e mensagens (1 reunião).</li>
              <li><strong className="text-foreground">Roteiro</strong> — texto e plano de gravação aprovados por você.</li>
              <li><strong className="text-foreground">Filmagem</strong> — equipe na sua empresa, em qualquer região de SP.</li>
              <li><strong className="text-foreground">Edição</strong> — montagem, cor, trilha e legendas, com rodada de ajustes.</li>
              <li><strong className="text-foreground">Entrega</strong> — versões para site, LinkedIn, YouTube e Reels.</li>
            </ol>
          </Section>

          <Section title="Outros serviços em São Paulo">
            <ul className="flex flex-wrap gap-2 text-sm">
              <li><Link to="/video-corporativo-sao-paulo" className="inline-flex rounded-full border border-border px-4 py-2 hover:border-brand">Vídeo corporativo</Link></li>
              <li><Link to="/filmagem-evento-corporativo-sao-paulo" className="inline-flex rounded-full border border-border px-4 py-2 hover:border-brand">Filmagem de eventos</Link></li>
              <li><Link to="/video-de-treinamento-corporativo" className="inline-flex rounded-full border border-border px-4 py-2 hover:border-brand">Vídeo de treinamento</Link></li>
              <li><Link to="/depoimentos-em-video" className="inline-flex rounded-full border border-border px-4 py-2 hover:border-brand">Depoimentos em vídeo</Link></li>
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