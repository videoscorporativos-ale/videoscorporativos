const steps = [
  { n: "01", title: "Briefing e roteiro", desc: "Entendemos o objetivo e desenhamos a narrativa." },
  { n: "02", title: "Pré-produção", desc: "Planejamento, locações, equipe e cronograma." },
  { n: "03", title: "Captação", desc: "Filmagem com equipamentos de cinema e direção apurada." },
  { n: "04", title: "Edição e finalização", desc: "Montagem, color grading, trilha e mixagem." },
  { n: "05", title: "Entrega", desc: "Versões para institucional, Reels, YouTube e mais." },
];

export function Process() {
  return (
    <section id="processo" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Processo</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Do briefing à entrega, sem improviso.
          </h2>
        </div>
        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-border" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="size-16 rounded-full border border-border bg-background flex items-center justify-center font-display text-brand text-lg relative z-10">
                  {s.n}
                </div>
                <h3 className="mt-5 font-display text-lg font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}