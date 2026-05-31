import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "O resultado superou o que tínhamos imaginado. O filme institucional virou peça central da nossa comunicação interna e externa.",
    name: "Carolina Reis",
    role: "Diretora de Marketing",
    company: "Vortex",
  },
  {
    quote:
      "Cobertura impecável da nossa convenção anual. Entrega rápida, edição cinematográfica e equipe extremamente profissional.",
    name: "Rafael Andrade",
    role: "Gerente de Eventos",
    company: "Helix",
  },
  {
    quote:
      "O aftermovie da feira gerou mais engajamento do que qualquer post que já fizemos. Recomendo sem pestanejar.",
    name: "Mariana Lopes",
    role: "Head de Comunicação",
    company: "Atria",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  return (
    <section className="py-24 md:py-32 bg-surface/40 border-y border-border">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Quote className="size-10 text-brand mx-auto" />
        <blockquote className="mt-8 font-display text-2xl md:text-3xl leading-snug text-balance">
          "{t.quote}"
        </blockquote>
        <div className="mt-8">
          <p className="font-medium">{t.name}</p>
          <p className="text-sm text-muted-foreground">
            {t.role} · {t.company}
          </p>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setI((i - 1 + testimonials.length) % testimonials.length)}
            className="size-10 rounded-full border border-border hover:bg-surface transition flex items-center justify-center"
            aria-label="Anterior"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-brand" : "w-1.5 bg-border"}`}
                aria-label={`Depoimento ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setI((i + 1) % testimonials.length)}
            className="size-10 rounded-full border border-border hover:bg-surface transition flex items-center justify-center"
            aria-label="Próximo"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}