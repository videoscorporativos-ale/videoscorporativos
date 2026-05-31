import { useState } from "react";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "Todos" | "Institucional" | "Eventos" | "Feiras";

const items: { title: string; category: Exclude<Category, "Todos">; thumb: string; videoId: string }[] = [
  { title: "Vortex — Filme institucional", category: "Institucional", thumb: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80", videoId: "dQw4w9WgXcQ" },
  { title: "Convenção Helix 2024", category: "Eventos", thumb: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80", videoId: "dQw4w9WgXcQ" },
  { title: "Aftermovie Feira Expo+", category: "Feiras", thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", videoId: "dQw4w9WgXcQ" },
  { title: "Northwave — Manifesto", category: "Institucional", thumb: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80", videoId: "dQw4w9WgXcQ" },
  { title: "Lançamento Atria Pro", category: "Eventos", thumb: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80", videoId: "dQw4w9WgXcQ" },
  { title: "Feira Lumen — Stand", category: "Feiras", thumb: "https://images.unsplash.com/photo-1561489413-985b06da5bee?w=800&q=80", videoId: "dQw4w9WgXcQ" },
];

const categories: Category[] = ["Todos", "Institucional", "Eventos", "Feiras"];

export function Portfolio() {
  const [active, setActive] = useState<Category>("Todos");
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  const filtered = active === "Todos" ? items : items.filter((i) => i.category === active);

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
                src={item.thumb}
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