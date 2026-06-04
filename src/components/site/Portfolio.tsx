import { useState } from "react";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "Todos" | "Institucional" | "Eventos" | "Feiras";

export type PortfolioItem = { title: string; category: Exclude<Category, "Todos">; videoId: string };

export const portfolioItems: PortfolioItem[] = [
  { title: "Vídeo Manifesto — Empreendimento, Estrutura e Propósito", category: "Institucional", videoId: "isrDJDmcOvE" },
  { title: "BMX Logística — Vídeo Institucional", category: "Institucional", videoId: "fsx2OBjkzFc" },
  { title: "Curso de Prestação de Contas Eleitorais 2026 — Professora Rita", category: "Institucional", videoId: "qsmVfufY6TM" },
  { title: "VIII Congresso Brasileiro de Direito da Empresa — IBDE Rio 2026", category: "Eventos", videoId: "6A7a7AaCX2Y" },
  { title: "Faz Farma Faz Negócio — 9ª Edição", category: "Feiras", videoId: "dFn6YIwakBI" },
  { title: "UNITEC — Vídeo Institucional", category: "Institucional", videoId: "_bdJOuE4I3Q" },
  { title: "Rocha & Queiroz Advogados — Institucional", category: "Institucional", videoId: "ITBhZlBQd6E" },
  { title: "IBIS Botucatu — Vídeo Manifesto", category: "Institucional", videoId: "PDFwTUHOwiY" },
  { title: "ATIVA Logística — Programa de Sustentabilidade", category: "Institucional", videoId: "aOiYST9L8ec" },
  { title: "ATIVA Logística — Centro de Distribuição Itapevi", category: "Institucional", videoId: "T4Uh7_Zcka8" },
  { title: "Galena 35 Anos", category: "Eventos", videoId: "JG6KloCm3jA" },
  { title: "Convenção de Vendas Tecnisa 2023", category: "Eventos", videoId: "cm3c0eMpL9M" },
  { title: "15ª Convenção ABRADILAN — Punta Cana", category: "Eventos", videoId: "TAv6Obk3TVE" },
  { title: "LATAM Sales Meeting 2021 — Convatec", category: "Eventos", videoId: "YT44mYNhlkA" },
  { title: "Encontro de Craques — Germed", category: "Eventos", videoId: "MVea__twp3A" },
  { title: "FCW — Prêmio Almirante Álvaro Alberto", category: "Eventos", videoId: "IEJhGi9yiMk" },
  { title: "SQ Química na ABRAFATI Show 2022", category: "Feiras", videoId: "ufqmkFC6lrw" },
  { title: "Faz Negócios 3", category: "Feiras", videoId: "C6XQuyikcrM" },
  { title: "Sustainable Foods Summit — São Paulo", category: "Feiras", videoId: "utaOjr3Dqxw" },
];

export const thumbFor = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
export const hiResThumbFor = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

const categories: Category[] = ["Todos", "Institucional", "Eventos", "Feiras"];

export function Portfolio() {
  const [active, setActive] = useState<Category>("Todos");
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  const filtered = active === "Todos" ? portfolioItems : portfolioItems.filter((i) => i.category === active);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-surface/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-brand">Portfólio</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              Trabalhos selecionados.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm border transition",
                  active === c
                    ? "bg-brand text-brand-foreground border-brand"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <button
              key={item.title}
              onClick={() => setOpenVideo(item.videoId)}
              className="group relative aspect-video rounded-xl overflow-hidden border border-border bg-surface text-left"
            >
              <img
                loading="lazy"
                src={thumbFor(item.videoId)}
                alt={item.title}
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="size-14 rounded-full bg-brand text-brand-foreground flex items-center justify-center">
                  <Play className="size-5 fill-current ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs uppercase tracking-widest text-brand">{item.category}</p>
                <p className="mt-1 font-display font-medium">{item.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {openVideo && (
        <div
          className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpenVideo(null)}
        >
          <button
            className="absolute top-6 right-6 size-10 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-brand hover:text-brand-foreground transition"
            onClick={() => setOpenVideo(null)}
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>
          <div
            className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${openVideo}?autoplay=1`}
              title="Vídeo"
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