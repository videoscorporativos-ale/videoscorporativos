import { useState } from "react";
import { Star } from "lucide-react";
import { GOOGLE_RATING, googleReviews } from "@/content/google-reviews";

const GOOGLE_URL = "https://www.google.com/search?q=Ale+Fot%C3%B3grafo";
const STEP = 6;

function Stars() {
  return (
    <div className="flex gap-0.5 text-brand" aria-label="5 estrelas">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star key={idx} className="size-4 fill-current" />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [shown, setShown] = useState(STEP);
  const rating = GOOGLE_RATING.value.toLocaleString("pt-BR");

  return (
    <section id="depoimentos" className="py-24 md:py-32 bg-surface/40 border-y border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-balance">
            O que os clientes dizem no Google
          </h2>
          <a
            href={GOOGLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-surface/60 px-5 py-3 hover:border-brand transition"
          >
            <Stars />
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Nota {rating} no Google</span> · {GOOGLE_RATING.count} avaliações
            </span>
          </a>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {googleReviews.slice(0, shown).map((r) => (
            <li key={r.author + r.date} className="flex flex-col rounded-2xl border border-border bg-background/60 p-6">
              <Stars />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">"{r.text}"</blockquote>
              <p className="mt-5 text-sm font-medium">{r.author}</p>
              <p className="text-xs text-muted-foreground">
                Avaliação no Google · {new Date(r.date).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })}
              </p>
            </li>
          ))}
        </ul>

        {shown < googleReviews.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShown((s) => s + STEP)}
              className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-brand transition"
            >
              Ver mais avaliações
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
