import { Instagram, Linkedin, Youtube } from "lucide-react";
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
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#servicos" className="hover:text-foreground">Serviços</a>
          <a href="#portfolio" className="hover:text-foreground">Portfólio</a>
          <a href="#processo" className="hover:text-foreground">Processo</a>
          <a href="#sobre" className="hover:text-foreground">Sobre</a>
          <a href="/precos" className="hover:text-foreground">Preços</a>
          <a href="#contato" className="hover:text-foreground">Contato</a>
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
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-muted-foreground">
          <p>Alexandre Machado Fotografia · CNPJ 03.230.626/0001-82 · Desde 1999 atendendo clientes especiais.</p>
          <p>comercial@alefotografo.com.br · (11) 91355-0533</p>
        </div>
      </div>
    </footer>
  );
}