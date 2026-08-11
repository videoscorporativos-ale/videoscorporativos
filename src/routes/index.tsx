import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { ClientLogos } from "@/components/site/ClientLogos";
import { Portfolio } from "@/components/site/Portfolio";
import { Process } from "@/components/site/Process";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { ContactCTA } from "@/components/site/ContactCTA";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { FAQ, faqSchema } from "@/components/site/FAQ";
import { Services, servicesSchema } from "@/components/site/Services";
import { Differentials } from "@/components/site/Differentials";
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
  logo: {
    "@type": "ImageObject",
    url: "https://videoscorporativos.com.br/logo.png",
    width: 360,
    height: 191,
  },
  priceRange: "$$",
  currenciesAccepted: "BRL",
  paymentAccepted: "Pix, Transferência bancária, Boleto, Cartão de crédito",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
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
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Jean Duarte" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
      reviewBody:
        "Profissional dedicado, que busca entender o seu momento para estruturar o trabalho e atender às suas expectativas. Recomendo sem dúvida.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Silvio Valente" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
      reviewBody:
        "Alexandre tem a rara combinação de experiência, competência e simpatia. Sem abdicar do rigor técnico, consegue fazer as fotos de forma leve.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Leandro Capolupo" },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
      reviewBody:
        "Profissional ágil, competente e focado na qualidade. O processo foi leve e o resultado final ficou excelente.",
    },
  ],
  sameAs: [
    "https://alefotografo.com.br",
    "https://www.instagram.com/alefotografo",
    "https://www.linkedin.com/in/alexandremachadofotografo",
    "https://www.youtube.com/@alefotografo",
    "https://www.google.com/search?q=Ale+Fot%C3%B3grafo&stick=H4sIAAAAAAAA_-NgU1IxqLA0SU41s0wxNbA0SEuztEizMqiwSLRMMk4ySTU1Nzc1MjRcxMrnmJOq4JZfcnhzelFiWj4AuLpeizkAAAA&hl=pt-BR&mat=CTZmN1naZclzElcBa0lj__kKo65-BqWL0PBRiZvCtbboeTHDKHJ40NjJfgo5qSw32KcqLC4XzTlbSZjarLtsQgUyaHNRoIzOQY4ZVRCPKobAY30G7vozgyJBLdpasE6VFZw&authuser=0",
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
      logo: { "@type": "ImageObject", url: "https://videoscorporativos.com.br/logo.png" },
    },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vídeos Corporativos em São Paulo · Institucional e Treinamento" },
      { name: "description", content: "Produção de vídeos corporativos em São Paulo: institucional, treinamento, integração, depoimentos e eventos empresariais. Orçamento pelo WhatsApp." },
      { name: "keywords", content: "vídeos corporativos, vídeo corporativo em São Paulo, vídeo institucional, produção de vídeo institucional, vídeo para empresas, videomaker corporativo, vídeo de treinamento corporativo, depoimento em vídeo, cobertura de evento corporativo" },
      { property: "og:title", content: "Vídeos Corporativos em São Paulo · Institucional e Treinamento" },
      { property: "og:description", content: "Vídeos institucionais, de treinamento, de integração, depoimentos e cobertura de eventos empresariais. +30 anos atendendo empresas em São Paulo e no Brasil." },
      { property: "og:url", content: "https://videoscorporativos.com.br" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vídeos Corporativos em São Paulo · Institucional e Treinamento" },
      { name: "twitter:description", content: "Vídeo institucional, treinamento, integração, depoimentos e eventos corporativos em São Paulo." },
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
      {
        type: "application/ld+json",
        children: JSON.stringify(servicesSchema),
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
        <Differentials />
        <About />
        <Testimonials />
        <ContactCTA />
        <FAQ />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
