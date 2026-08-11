import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { WhatsAppLink } from "./WhatsAppLink";

export type ServiceLandingContent = {
  breadcrumb: string;
  h1: string;
  intro: string;
  paraQuem: string[];
  quandoUsar: string[];
  entregaveis: string[];
  ctaLabel: string;
  ctaLocation: string;
  ctaMessage: string;
  faqs: { q: string; a: string }[];
};

export function ServiceLanding({ content }: { content: ServiceLandingContent }) {
  const cta = (
    <WhatsAppLink
      location={content.ctaLocation}
      message={content.ctaMessage}
      className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition hover:opacity-90"
    >
      {content.ctaLabel}
    </WhatsAppLink>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <article className="mx-auto max-w-3xl px-6">
          <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-brand">Início</Link>
            <span className="mx-2">/</span>
            <span className="text-brand">{content.breadcrumb}</span>
          </nav>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            {content.h1}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{content.intro}</p>
          <div className="mt-8">{cta}</div>

          <List title="Para quem é" items={content.paraQuem} />
          <List title="Quando usar" items={content.quandoUsar} />
          <List title="O que entregamos" items={content.entregaveis} />

          <Section title="Perguntas frequentes">
            <div className="space-y-6">
              {content.faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-display text-lg font-medium">{f.q}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Pedir orçamento">
            <p className="text-muted-foreground leading-relaxed">
              Informe o tipo de vídeo, o objetivo, a cidade da gravação e o prazo desejado. Devolvemos
              escopo, cronograma e valor. Também é possível{" "}
              <a href="/precos" className="text-brand underline-offset-4 hover:underline">ver referências de preço</a>{" "}
              ou{" "}
              <Link to="/cases" className="text-brand underline-offset-4 hover:underline">assistir a exemplos reais</Link>.
            </p>
            <div className="mt-6">{cta}</div>
          </Section>
        </article>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <Section title={title}>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-muted-foreground leading-relaxed">
            <Check className="mt-1 size-4 shrink-0 text-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
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

export function serviceLandingSchemas(opts: {
  url: string;
  serviceType: string;
  name: string;
  description: string;
  breadcrumb: string;
  faqs: { q: string; a: string }[];
}) {
  const SITE = "https://videoscorporativos.com.br";
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: opts.serviceType,
      name: opts.name,
      description: opts.description,
      url: opts.url,
      provider: { "@id": `${SITE}/#business` },
      areaServed: [
        { "@type": "City", name: "São Paulo" },
        { "@type": "Country", name: "Brasil" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: opts.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: opts.breadcrumb, item: opts.url },
      ],
    },
  ];
}
