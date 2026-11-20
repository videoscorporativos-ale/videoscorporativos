import { Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { WhatsAppLink } from "./WhatsAppLink";
import { handleAnchorClick } from "@/lib/hash-scroll";
import logoUrl from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <img
            src={logoUrl}
            alt="Ale Fotógrafo"
            width={180}
            height={54}
            loading="lazy"
            className="h-[72px] w-auto"
          />
          <p className="mt-3 text-sm text-muted-foreground">
            Fotografia e vídeo corporativo em São Paulo, para todo o Brasil.
          </p>
        </div>
        <nav aria-label="Serviços de vídeo corporativo" className="grid gap-x-10 gap-y-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          <a href="/#videos-corporativos" onClick={(e) => handleAnchorClick(e, "/#videos-corporativos")} className="hover:text-foreground">Vídeos Corporativos</a>
          <a href="/video-institucional-sao-paulo" className="hover:text-foreground">Vídeo Institucional</a>
          <a href="/video-para-empresas" className="hover:text-foreground">Vídeo para Empresas</a>
          <a href="/video-de-treinamento-corporativo" className="hover:text-foreground">Vídeo de Treinamento</a>
          <a href="/video-de-integracao" className="hover:text-foreground">Vídeo de Integração</a>
          <a href="/depoimentos-em-video" className="hover:text-foreground">Depoimentos em Vídeo</a>
          <a href="/cobertura-de-eventos-corporativos" className="hover:text-foreground">Cobertura de Eventos Corporativos</a>
          <a href="/reels-corporativos" className="hover:text-foreground">Reels Corporativos</a>
          <a href="/video-para-clinicas" className="hover:text-foreground">Vídeo para Clínicas</a>
          <a href="/video-para-industrias" className="hover:text-foreground">Vídeo para Indústrias</a>
          <Link to="/cases" className="hover:text-foreground">Cases</Link>
          <a href="/precos" className="hover:text-foreground">Preços</a>
          <a href="/blog" className="hover:text-foreground">Blog</a>
          <a href="/#contato" onClick={(e) => handleAnchorClick(e, "/#contato")} className="hover:text-foreground">Contato</a>
          <WhatsAppLink
            location="footer_orcamento"
            message="Olá, quero um orçamento de vídeo corporativo para minha empresa."
            className="font-medium text-brand hover:underline"
          >
            Orçamento pelo WhatsApp
          </WhatsAppLink>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Instagram" className="size-9 rounded-full border border-border flex items-center justify-center hover:bg-brand hover:text-brand-foreground hover:border-brand transition">
            <Instagram className="size-4" />
          </a>
          <a href="#" aria-label="LinkedIn" className="size-9 rounded-full border border-border flex items-center justify-center hover:bg-brand hover:text-brand-foreground hover:border-brand transition">
            <Linkedin className="size-4" />
          </a>
          <a href="#" aria-label="YouTube" className="size-9 rounded-full border border-border flex items-center justify-center hover:bg-brand hover:text-brand-foreground hover:border-brand transition">
            <Youtube className="size-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 pt-6 text-sm text-muted-foreground">
          <p>
            Produção de vídeos corporativos em São Paulo para empresas, clínicas, escritórios,
            indústrias, logística, RH, marketing e eventos corporativos.
          </p>
          <p className="mt-2">
            <a href="/avaliacoes" className="hover:text-brand">Avaliações no Google</a> · Fotografia corporativa e retratos:{" "}
            <a href="https://alefotografo.com.br" target="_blank" rel="noopener" className="text-brand hover:underline">alefotografo.com.br</a>
          </p>
        </div>
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-muted-foreground">
          <p>Alexandre Machado Fotografia · CNPJ 03.230.626/0001-82 · Desde 1999 atendendo clientes especiais.</p>
          <p>comercial@alefotografo.com.br · (11) 91355-0533</p>
        </div>
      </div>
    </footer>
  );
}