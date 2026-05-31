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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alê Produções — Vídeo Institucional, Eventos e Feiras em SP" },
      { name: "description", content: "Produtora de vídeo corporativo com +30 anos em São Paulo. Vídeo institucional, cobertura de eventos e aftermovie de feiras em todo o Brasil." },
      { property: "og:title", content: "Alê Produções — Vídeo Corporativo em São Paulo" },
      { property: "og:description", content: "Roteiro, captação e edição cinematográfica para empresas. +30 anos de bagagem." },
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
        <ContactCTA />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
