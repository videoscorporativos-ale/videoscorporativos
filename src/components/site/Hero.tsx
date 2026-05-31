import { useState } from "react";
import { Play, ArrowRight, X } from "lucide-react";

const SHOWREEL_ID = "aOiYST9L8ec";

export function Hero() {
  const [open, setOpen] = useState(false);
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 gradient-radial-brand pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-brand" />
            +30 anos produzindo imagem corporativa
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-balance">
            Vídeos que fazem a sua empresa ser{" "}
            <span className="text-brand">levada a sério.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Produção de vídeo institucional, eventos corporativos e feiras de
            negócios. Roteiro, captação e edição com mais de 30 anos de
            bagagem — em São Paulo e todo o Brasil.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 transition"
            >
              Ver portfólio
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium hover:bg-surface transition"
            >
              Solicitar orçamento
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 reveal" style={{ animationDelay: "120ms" }}>
          <button
            onClick={() => setOpen(true)}
            className="relative block w-full aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-surface group cursor-pointer text-left"
            aria-label="Assistir showreel"
          >
            <img
              src={`https://i.ytimg.com/vi/${SHOWREEL_ID}/hqdefault.jpg`}
              alt="Showreel — Ale Fotógrafo"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background/80 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-20 rounded-full bg-brand text-brand-foreground flex items-center justify-center shadow-2xl shadow-brand/30 group-hover:scale-110 transition">
                <Play className="size-7 fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-xs uppercase tracking-widest text-brand">Showreel</p>
              <p className="mt-1 font-display text-lg font-medium">ATIVA Logística — Programa de Sustentabilidade</p>
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute top-6 right-6 size-10 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-brand hover:text-brand-foreground transition"
            onClick={() => setOpen(false)}
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>
          <div
            className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${SHOWREEL_ID}?autoplay=1`}
              title="Showreel"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="size-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}