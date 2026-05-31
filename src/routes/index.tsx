import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { ClientLogos } from "@/components/site/ClientLogos";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { Process } from "@/components/site/Process";
import { WhyUs } from "@/components/site/WhyUs";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { ContactCTA } from "@/components/site/ContactCTA";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { FAQ, faqSchema } from "@/components/site/FAQ";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Alê Produções",
  description:
    "Produtora de vídeo corporativo em São Paulo. Vídeo institucional, filmagem de eventos corporativos e vídeo para feira de negócios em todo o Brasil.",
  url: "https://videoscorporativos.lovable.app",
  telephone: "+55-11-91355-0533",
  email: "comercial@alefotografo.com.br",
  areaServed: "BR",
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  sameAs: [],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "137",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vídeo Institucional em São Paulo · Alê Produções" },
      { name: "description", content: "Produtora de vídeo institucional em São Paulo com +30 anos. Eventos corporativos e feiras de negócios no Brasil. Orçamento sob medida." },
      { property: "og:title", content: "Vídeo Institucional São Paulo · Filmagem de Eventos Corporativos" },
      { property: "og:description", content: "Produtora com +30 anos em vídeo institucional, eventos corporativos e feiras de negócios. São Paulo e todo o Brasil." },
      { property: "og:url", content: "https://videoscorporativos.lovable.app" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vídeo Institucional São Paulo · Alê Produções" },
      { name: "twitter:description", content: "Vídeo institucional, eventos corporativos e feiras de negócios. +30 anos em São Paulo, atendendo todo o Brasil." },
    ],
    links: [
      { rel: "canonical", href: "https://videoscorporativos.lovable.app" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(faqSchema),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <ClientLogos />
        <Services />
        <Portfolio />
        <Process />
        <WhyUs />
        <About />
        <Testimonials />
        <FAQ />
        <ContactCTA />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
