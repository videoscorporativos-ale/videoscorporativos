import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/filmagem-evento-corporativo-sao-paulo`;
const TITLE = "Empresa de Vídeos para Eventos em SP: Filmagem e Aftermovie";
const DESCRIPTION =
  "Filmagem de evento corporativo em São Paulo de R$ 4.000 a R$ 15.000: convenções, lançamentos, congressos e feiras. Aftermovie em 5 a 10 dias úteis.";
const OG_IMAGE = "https://i.ytimg.com/vi/aOiYST9L8ec/maxresdefault.jpg";

const faqs = [
  { q: "Quanto custa filmar um evento corporativo em São Paulo?", a: "Faixas de 2026: R$ 4.000 a R$ 15.000 dependendo da duração, número de câmeras, entrega (só bruto, resumo curto ou aftermovie) e prazo. Convenções de mais de um dia sobem proporcionalmente." },
  { q: "Quantas câmeras vão para o evento?", a: "Depende do formato: mesa redonda ou palestra normalmente com 2 câmeras; convenções e lançamentos com palco, 3 a 5. Áudio direto da mesa técnica sempre." },
  { q: "Qual o prazo de entrega do aftermovie?", a: "Aftermovie curto (60-90s) sai em 5 a 10 dias úteis. Vídeo completo (2-4 min) em 15 a 20 dias. Teasers para redes sociais podem ser entregues no dia seguinte." },
  { q: "Filmam eventos híbridos e transmissão ao vivo?", a: "Sim. Fazemos captação, streaming ao vivo (YouTube, LinkedIn, RTMP privado) e gravação em multicam para edição posterior." },
];

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Filmagem de Evento Corporativo",
  provider: { "@id": `${SITE}/#business` },
  areaServed: [{ "@type": "City", name: "São Paulo" }],
  name: "Filmagem de evento corporativo em São Paulo",
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
    { "@type": "ListItem", position: 2, name: "Filmagem de Evento Corporativo em SP", item: URL },
  ],
};

export const Route = createFileRoute("/filmagem-evento-corporativo-sao-paulo")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "filmagem evento corporativo São Paulo, aftermovie SP, filmagem convenção empresa, filmagem congresso SP, filmagem lançamento produto" },
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
            <span className="text-brand">Filmagem de Evento Corporativo</span>
          </nav>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Filmagem de Evento Corporativo em São Paulo
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-brand">Empresa de vídeos para eventos · +30 anos</p>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Cobertura audiovisual profissional de convenções, lançamentos, feiras, congressos,
            palestras, premiações e confraternizações corporativas em São Paulo. Equipe multicam,
            áudio direto da mesa técnica e aftermovie com entrega em dias, não semanas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppLink location="evento_sp_hero" className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 transition">
              Orçamento do evento
            </WhatsAppLink>
            <Link to="/cases" className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-brand transition">
              Ver aftermovies
            </Link>
          </div>

          <Section title="Tipos de evento que cobrimos">
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {["Convenções de vendas", "Lançamentos de produto", "Congressos e fóruns", "Feiras de negócios", "Palestras e keynotes", "Premiações e galas", "Aniversários de empresa", "Confraternizações", "Eventos híbridos e streaming"].map((t) => (
                <li key={t} className="rounded-lg border border-border bg-surface/40 px-3 py-2">{t}</li>
              ))}
            </ul>
          </Section>

          <Section title="Quanto custa e em quanto tempo entregamos">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="py-3 pr-4 font-medium">Formato</th>
                    <th className="py-3 pr-4 font-medium">Investimento</th>
                    <th className="py-3 font-medium">Prazo</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Cobertura de meio período + teaser 30s", "R$ 4.000 a R$ 6.000", "5 dias úteis"],
                    ["Diária completa + aftermovie 60-90s", "R$ 6.000 a R$ 10.000", "5 a 10 dias úteis"],
                    ["Multicam com palestras + aftermovie 2-4 min", "R$ 10.000 a R$ 15.000", "15 a 20 dias úteis"],
                    ["Convenção de 2+ dias ou evento híbrido", "Sob medida", "Definido no cronograma"],
                  ].map(([f, v, p]) => (
                    <tr key={f} className="border-b border-border/60">
                      <td className="py-3 pr-4">{f}</td>
                      <td className="py-3 pr-4 text-brand">{v}</td>
                      <td className="py-3 text-muted-foreground">{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Valores de referência para São Paulo e Grande SP em 2026. Deslocamento para outras
              cidades entra no orçamento. Veja também as{" "}
              <Link to="/precos" className="text-brand underline-offset-4 hover:underline">faixas de preço de vídeo institucional</Link>.
            </p>
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
            <h2 className="font-display text-2xl font-semibold">Vamos filmar seu próximo evento?</h2>
            <p className="mt-3 text-muted-foreground">Data marcada? Envie briefing agora — agendas fecham rápido.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <WhatsAppLink location="evento_sp_footer" className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 transition">
                WhatsApp · (11) 91355-0533
              </WhatsAppLink>
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