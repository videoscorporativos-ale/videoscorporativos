import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Satisfação e agradecimento. Profissional dedicado, que busca entender o seu momento para estruturar o trabalho e atender às suas expectativas. Recomendo sem dúvida, e com a certeza de que me acompanhará daqui para frente.",
    name: "Jean Duarte",
  },
  {
    quote:
      "Alê é um fotógrafo sensacional! Muito profissional e super detalhista. Te deixa à vontade e confiante para tirar as melhores fotos.",
    name: "Patricia Martinelli",
  },
  {
    quote:
      "Alexandre tem a rara combinação de experiência, competência e simpatia. Sem abdicar do rigor técnico, consegue fazer as fotos de forma leve, e assim extrai o melhor resultado. Recomendo fortemente.",
    name: "Silvio Valente",
  },
  {
    quote:
      "Alê é ótimo, cara super experiente, deixa o cliente bem à vontade, auxilia nas roupas e na direção. Muito boa a experiência, recomendo!",
    name: "Humberto Júnior",
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
        <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-border bg-surface/60 px-5 py-3">
          <div className="flex gap-0.5 text-brand">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star key={idx} className="size-4 fill-current" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Nota Excelente no Google</span> — mais de 137 avaliações de clientes
          </p>
        </div>
      </div>
    </section>
  );
}