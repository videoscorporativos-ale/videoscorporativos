import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { WhatsAppLink } from "@/components/site/WhatsAppLink";

const TITLE = "Preço de Vídeo Institucional 2026: R$ 3.000 a R$ 30.000";
const DESCRIPTION =
  "Quanto custa um vídeo institucional em 2026: tabela por duração, o que define o valor e exemplos reais em São Paulo. Orçamento no WhatsApp em até 24h.";
const URL = "https://videoscorporativos.com.br/precos";
const OG_IMAGE = "https://i.ytimg.com/vi/aOiYST9L8ec/maxresdefault.jpg";
const UPDATED = "2026-05-15";

const faqs = [
  {
    q: "Vídeo institucional vale o investimento?",
    a: "Sim, quando bem produzido. Um vídeo institucional comunica credibilidade, explica o que a empresa faz em segundos e pode ser usado por anos — no site, em propostas comerciais, redes sociais e apresentações. O custo se dilui ao longo do uso.",
  },
  {
    q: "Qual a diferença entre vídeo institucional e vídeo de evento?",
    a: "O institucional conta a história e os valores da empresa, com roteiro planejado. O vídeo de evento registra um acontecimento (convenção, lançamento, feira) e costuma virar um aftermovie. São objetivos e formatos diferentes.",
  },
  {
    q: "Quanto tempo leva para ficar pronto?",
    a: "Um institucional padrão costuma levar algumas semanas, somando roteiro, captação e finalização. Aftermovies de eventos podem ter entrega acelerada.",
  },
  {
    q: "O preço inclui roteiro?",
    a: "Sim. Roteiro, captação, edição, color grading, trilha e entrega nos formatos certos fazem parte do processo, não são extras escondidos.",
  },
  {
    q: "Atende empresas fora de São Paulo?",
    a: "Sim. A base é em São Paulo (Grande SP, ABC, Alphaville, Faria Lima, Paulista, Berrini), com projetos em todo o Brasil.",
  },
  {
    q: "Quanto custa um vídeo institucional de 1 minuto?",
    a: "Um vídeo institucional de 1 minuto normalmente fica entre R$ 3.000 e R$ 8.000 quando envolve uma diária de filmagem e uma locação. O tempo final do vídeo pesa menos no preço do que o número de diárias, o tamanho da equipe e o nível de pós-produção.",
  },
  {
    q: "Existe preço por minuto de vídeo institucional?",
    a: "Não de forma confiável. O mercado costuma citar de R$ 3.000 a R$ 6.000 por minuto finalizado, mas esse número engana: um minuto gravado em um dia na sede da empresa custa muito menos do que um minuto com três locações, drone e animação.",
  },
  {
    q: "Quanto custa gravar um vídeo institucional para loja ou empresa pequena?",
    a: "Para lojas e pequenas empresas, o formato mais eficiente é uma diária enxuta com entrega de um vídeo principal curto mais cortes verticais para redes sociais — geralmente na faixa de R$ 3.000 a R$ 6.000.",
  },
  {
    q: "Em quanto tempo recebo o orçamento?",
    a: "O orçamento é enviado em até 24 horas úteis após o briefing pelo WhatsApp ou e-mail, já com escopo, prazo e formatos de entrega descritos.",
  },
];

const testimonials: { name: string; text: string }[] = [
  {
    name: "Jean Duarte",
    text: "Profissional dedicado, que busca entender o seu momento para estruturar o trabalho e atender às suas expectativas. Recomendo sem dúvida.",
  },
  {
    name: "Silvio Valente",
    text: "Alexandre tem a rara combinação de experiência, competência e simpatia. Sem abdicar do rigor técnico, consegue fazer as fotos de forma leve.",
  },
  {
    name: "Leandro Capolupo",
    text: "Profissional ágil, competente e focado na qualidade. O processo foi leve e o resultado final ficou excelente.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Quanto custa um vídeo institucional? Guia 2026 com faixas de preço",
  description: DESCRIPTION,
  image: OG_IMAGE,
  datePublished: "2026-05-15",
  dateModified: UPDATED,
  author: {
    "@type": "Person",
    name: "Alexandre Machado",
    url: "https://videoscorporativos.com.br/#business",
  },
  publisher: {
    "@type": "Organization",
    name: "Ale Fotógrafo",
    logo: {
      "@type": "ImageObject",
      url: "https://videoscorporativos.com.br/logo.png",
    },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: "https://videoscorporativos.com.br/" },
    { "@type": "ListItem", position: 2, name: "Preços", item: URL },
  ],
};

export const Route = createFileRoute("/precos")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "quanto custa vídeo institucional, preço vídeo institucional, orçamento vídeo corporativo, valor vídeo institucional 2026, vídeo institucional São Paulo" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:type", content: "article" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1280" },
      { property: "og:image:height", content: "720" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(articleSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
    ],
  }),
  component: PrecosPage,
});

function PrecosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-32 pb-24">
        <article className="mx-auto max-w-3xl px-6">
          <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Início</Link>
            <span className="mx-2">/</span>
            <span className="text-brand">Preços</span>
          </nav>

          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Quanto custa um vídeo institucional?{" "}
            <span className="text-muted-foreground">Guia 2026 com faixas de preço</span>
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>Última atualização: maio de 2026</span>
            <span aria-hidden>·</span>
            <span>Por Alexandre Machado (Ale Fotógrafo)</span>
          </div>

          <section className="mt-12 rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-brand">Resumo rápido</p>
            <p className="mt-3 text-lg leading-relaxed text-foreground/90">
              O preço de um vídeo institucional no Brasil em 2026 varia, em média, de{" "}
              <strong>R$ 3.000 a R$ 30.000 ou mais</strong>, dependendo de cinco fatores: duração,
              número de diárias de filmagem, locações, tamanho da equipe e nível de pós-produção.
              Um vídeo simples (uma diária, edição direta) fica na faixa inicial; produções com
              roteiro elaborado, várias locações e finalização cinematográfica chegam à faixa
              superior. O orçamento é sempre feito sob medida após um briefing.
            </p>
          </section>

          <Section title="O que define o preço de um vídeo institucional">
            <p>
              O valor não é uma tabela fixa — ele responde ao escopo do projeto. Estes são os
              fatores que mais pesam:
            </p>
            <Factor title="Duração e complexidade do roteiro">
              Um vídeo de 60 a 90 segundos com mensagem direta custa menos que um institucional de
              3 a 5 minutos com narrativa, personagens e depoimentos.
            </Factor>
            <Factor title="Número de diárias de filmagem">
              Cada dia de captação envolve equipe, equipamento e logística. Uma diária única é o
              cenário mais econômico; produções com dois ou mais dias sobem proporcionalmente.
            </Factor>
            <Factor title="Locações">
              Gravar na sede da empresa é mais simples. Múltiplas locações, externas com
              autorização ou viagens aumentam o custo.
            </Factor>
            <Factor title="Tamanho da equipe">
              Um operador único é diferente de uma equipe com direção, câmera, iluminação, áudio e
              produção. Quanto mais robusta a produção, maior o resultado — e o investimento.
            </Factor>
            <Factor title="Pós-produção">
              Edição, color grading, trilha, mixagem de áudio, animações e legendas em vários
              formatos. A finalização é onde o vídeo ganha cara de cinema, e isso tem peso no
              orçamento.
            </Factor>
          </Section>

          <Section title="Faixas de preço por tipo de projeto (referência 2026)">
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-surface/60 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium">Tipo de projeto</th>
                    <th className="px-4 py-3 font-medium">Faixa de referência</th>
                    <th className="px-4 py-3 font-medium">O que costuma incluir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Vídeo institucional simples", "R$ 3.000 – R$ 8.000", "1 diária, 1 locação, edição direta, até ~90s"],
                    ["Vídeo institucional completo", "R$ 8.000 – R$ 20.000", "Roteiro, 1–2 diárias, depoimentos, color grading, trilha"],
                    ["Produção premium / multi-locação", "R$ 20.000+", "Várias diárias, várias locações, equipe ampliada, animações"],
                    ["Cobertura de evento corporativo", "R$ 4.000 – R$ 15.000", "Captação do evento + aftermovie editado"],
                    ["Vídeo para feira de negócios", "R$ 3.000 – R$ 10.000", "Registro do stand/participação + edição"],
                  ].map(([tipo, faixa, inc]) => (
                    <tr key={tipo}>
                      <td className="px-4 py-3 font-medium">{tipo}</td>
                      <td className="px-4 py-3 text-brand whitespace-nowrap">{faixa}</td>
                      <td className="px-4 py-3 text-muted-foreground">{inc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground italic">
              Estas faixas são referências de mercado para orientação. O valor final depende do
              briefing específico de cada empresa.
            </p>
          </Section>

          <Section title="Quanto custa um vídeo institucional de 1 minuto?">
            <p>
              Essa é a pergunta mais comum — e a resposta surpreende: a duração final do vídeo é um
              dos fatores que <em>menos</em> influencia o preço. Um vídeo de 1 minuto e um de 3
              minutos gravados no mesmo dia, na mesma empresa, custam quase o mesmo, porque o custo
              está na diária de filmagem e na equipe, não nos segundos entregues.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Faixas de preço de vídeo institucional por duração final em 2026
                </caption>
                <thead className="bg-surface/60 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium">Duração final</th>
                    <th className="px-4 py-3 font-medium">Faixa de referência</th>
                    <th className="px-4 py-3 font-medium">Cenário típico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["30 a 60 segundos", "R$ 3.000 – R$ 6.000", "1 diária, 1 locação, foco em redes sociais"],
                    ["1 a 2 minutos", "R$ 3.000 – R$ 8.000", "1 diária, edição direta, versão vertical inclusa"],
                    ["2 a 4 minutos", "R$ 8.000 – R$ 20.000", "Roteiro, depoimentos, 1–2 diárias"],
                    ["Acima de 4 minutos", "R$ 20.000+", "Várias locações, equipe ampliada, animações"],
                  ].map(([dur, faixa, cen]) => (
                    <tr key={dur}>
                      <td className="px-4 py-3 font-medium">{dur}</td>
                      <td className="px-4 py-3 text-brand whitespace-nowrap">{faixa}</td>
                      <td className="px-4 py-3 text-muted-foreground">{cen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Por isso desconfie de tabelas de “preço por minuto”. O mais honesto é orçar por
              escopo: quantos dias de gravação, quantas locações e qual nível de finalização a sua
              empresa precisa.
            </p>
          </Section>

          <Section title="O que dizem os clientes">
            <p>
              Avaliações reais de clientes no Google, entre as mais de 137 recebidas.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {testimonials.map((t) => (
                <blockquote
                  key={t.name}
                  className="rounded-2xl border border-border bg-surface/60 p-5"
                >
                  <p className="text-brand text-sm" aria-label="Nota 5 de 5">★★★★★</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90">“{t.text}”</p>
                  <footer className="mt-4 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {t.name}
                  </footer>
                </blockquote>
              ))}
            </div>
          </Section>

          <Section title="Perguntas frequentes">
            <p>
              As dúvidas que mais aparecem em orçamentos de vídeo institucional, incluindo preço
              por minuto e projetos de menor porte.
            </p>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-display text-lg font-medium">{f.q}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Como pedir um orçamento">
            <p>
              O caminho mais rápido é enviar um briefing curto: objetivo do vídeo, onde será
              usado, duração desejada e prazo. Com isso, devolvo um orçamento personalizado e uma
              primeira conversa estratégica, sem compromisso — <strong>resposta em até 24 horas
              úteis</strong>.
            </p>
            <p>
              Quer ver o serviço específico antes de pedir preço? Veja{" "}
              <Link to="/video-institucional-sao-paulo" className="text-brand underline underline-offset-4">
                vídeo institucional em São Paulo
              </Link>
              ,{" "}
              <Link to="/filmagem-evento-corporativo-sao-paulo" className="text-brand underline underline-offset-4">
                filmagem de evento corporativo
              </Link>{" "}
              e{" "}
              <Link to="/video-para-feira-de-negocios" className="text-brand underline underline-offset-4">
                vídeo para feira de negócios
              </Link>
              . Para entender prazos e etapas, leia{" "}
              <Link
                to="/blog/$slug"
                params={{ slug: "processo-producao-video-corporativo" }}
                className="text-brand underline underline-offset-4"
              >
                como funciona a produção de um vídeo corporativo
              </Link>
              .
            </p>
            <div className="mt-8 rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
              <p className="font-display text-xl font-semibold">Alexandre Machado — Ale Fotógrafo</p>
              <p className="mt-2 text-muted-foreground">
                Produção de vídeo institucional, eventos corporativos e feiras de negócios.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                São Paulo, atendimento em todo o Brasil · Nota Excelente no Google (+137 avaliações).
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <WhatsAppLink
                  location="precos_cta"
                  className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 transition"
                >
                  Falar no WhatsApp · (11) 91355-0533
                </WhatsAppLink>
                <a
                  href="mailto:comercial@alefotografo.com.br"
                  className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-brand transition"
                >
                  comercial@alefotografo.com.br
                </a>
              </div>
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
    <section className="mt-16">
      <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}

function Factor({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <p>
      <strong className="text-foreground">{title}.</strong>{" "}
      <span className="text-muted-foreground">{children}</span>
    </p>
  );
}