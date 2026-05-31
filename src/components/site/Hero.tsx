import { Play, ArrowRight } from "lucide-react";

export function Hero() {
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
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-surface group cursor-pointer">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, oklch(0 0 0 / 0.1), oklch(0 0 0 / 0.6)), url('https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=900&q=80')",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-20 rounded-full bg-brand text-brand-foreground flex items-center justify-center shadow-2xl shadow-brand/30 group-hover:scale-110 transition">
                <Play className="size-7 fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-xs uppercase tracking-widest text-brand">Showreel</p>
              <p className="mt-1 font-display text-lg font-medium">Trabalhos selecionados 2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}