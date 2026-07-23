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
import { portfolioItems, hiResThumbFor } from "@/components/site/Portfolio";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://videoscorporativos.com.br/#business",
  name: "Alexandre Machado Fotografia (Ale Fotógrafo)",
  alternateName: "Ale Fotógrafo",
  legalName: "Alexandre Machado Fotografia",
  foundingDate: "1999",
  identifier: [
    { "@type": "PropertyValue", propertyID: "CNPJ", value: "03.230.626/0001-82" },
  ],
  taxID: "03.230.626/0001-82",
  description:
    "Produção de vídeo institucional, cobertura de eventos corporativos e vídeo para feiras de negócios. Fotografia e vídeo corporativo em São Paulo, com mais de 30 anos de experiência, atendendo todo o Brasil.",
  url: "https://videoscorporativos.com.br",
  telephone: "+55-11-91355-0533",
  email: "comercial@alefotografo.com.br",
  image: "https://i.ytimg.com/vi/aOiYST9L8ec/maxresdefault.jpg",
  logo: "https://videoscorporativos.com.br/favicon.ico",
  priceRange: "$$",
  areaServed: [
    { "@type": "Country", name: "Brasil" },
    { "@type": "City", name: "São Paulo" },
    { "@type": "AdministrativeArea", name: "Grande São Paulo" },
    { "@type": "AdministrativeArea", name: "ABC Paulista" },
    { "@type": "Place", name: "Alphaville" },
    { "@type": "Place", name: "Faria Lima" },
    { "@type": "Place", name: "Avenida Paulista" },
    { "@type": "Place", name: "Berrini" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Atendimento sob agendamento",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "01310-100",
    addressCountry: "BR",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+55-11-91355-0533",
      contactType: "customer service",
      areaServed: "BR",
      availableLanguage: ["Portuguese"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+55-11-91355-0533",
      contactType: "sales",
      areaServed: "BR",
      availableLanguage: ["Portuguese"],
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "137",
    bestRating: "5",
    worstRating: "1",
  },
  // sameAs: adicione aqui a URL curta do Google Business Profile assim que
  // o perfil for aprovado (ex.: "https://g.co/kgs/XXXXX" ou o link do maps).
  sameAs: [
    "https://alefotografo.com.br",
    "https://www.instagram.com/alefotografo",
    "https://www.linkedin.com/in/alexandremachadofotografo",
    "https://www.youtube.com/@alefotografo",
  ],
};

const videoObjectsSchema = {
  "@context": "https://schema.org",
  "@graph": portfolioItems.map((item) => ({
    "@type": "VideoObject",
    name: item.title,
    description: `${item.title} — produção audiovisual por Ale Fotógrafo (categoria: ${item.category}).`,
    thumbnailUrl: [hiResThumbFor(item.videoId)],
    uploadDate: "2024-01-01T00:00:00-03:00",
    contentUrl: `https://www.youtube.com/watch?v=${item.videoId}`,
    embedUrl: `https://www.youtube.com/embed/${item.videoId}`,
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: "Ale Fotógrafo",
      logo: { "@type": "ImageObject", url: "https://videoscorporativos.com.br/favicon.ico" },
    },
  })),
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
      {
        type: "application/ld+json",
        children: JSON.stringify(videoObjectsSchema),
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
