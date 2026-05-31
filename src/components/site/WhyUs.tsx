const stats = [
  { value: "+30", label: "anos de experiência" },
  { value: "Brasil", label: "projetos em todo o país" },
  { value: "3 em 1", label: "roteiro, captação e edição" },
  { value: "Multi", label: "entrega em todos os formatos" },
];

export function WhyUs() {
  return (
    <section className="py-24 md:py-32 bg-surface/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Por que Alê Produções</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Bagagem que se vê no resultado.
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-8">
              <div className="font-display text-4xl md:text-5xl font-semibold text-brand">{s.value}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}