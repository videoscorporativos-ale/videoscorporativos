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
  name: "Ale Fotógrafo",
  description:
    "Fotógrafo e produtor de vídeo corporativo em São Paulo, com mais de 30 anos. Retrato profissional, fotografia institucional, eventos corporativos e vídeo institucional em todo o Brasil.",
  url: "https://videoscorporativos.com.br",
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
      { title: "Vídeo Institucional em São Paulo · Eventos e Feiras" },
      { name: "description", content: "Vídeo institucional em São Paulo, filmagem de eventos corporativos e vídeo para feira de negócios. +30 anos de experiência, atendimento em todo o Brasil." },
      { name: "keywords", content: "vídeo institucional São Paulo, filmagem de eventos corporativos, vídeo para feira de negócios, produtora de vídeo SP, fotografia corporativa" },
      { property: "og:title", content: "Vídeo Institucional em São Paulo · Eventos e Feiras" },
      { property: "og:description", content: "Vídeo institucional, filmagem de eventos corporativos e vídeo para feira de negócios. +30 anos atendendo empresas em São Paulo e em todo o Brasil." },
      { property: "og:url", content: "https://videoscorporativos.com.br" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vídeo Institucional em São Paulo · Eventos e Feiras" },
      { name: "twitter:description", content: "Vídeo institucional, eventos corporativos e feiras de negócios. +30 anos em São Paulo." },
      { property: "og:image", content: "https://i.ytimg.com/vi/aOiYST9L8ec/maxresdefault.jpg" },
      { property: "og:image:width", content: "1280" },
      { property: "og:image:height", content: "720" },
      { name: "twitter:image", content: "https://i.ytimg.com/vi/aOiYST9L8ec/maxresdefault.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://videoscorporativos.com.br" },
      { rel: "preconnect", href: "https://i.ytimg.com", crossOrigin: "" },
      { rel: "preconnect", href: "https://www.youtube.com", crossOrigin: "" },
      { rel: "preload", as: "image", href: "https://i.ytimg.com/vi/aOiYST9L8ec/hqdefault.jpg", fetchpriority: "high" },
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
