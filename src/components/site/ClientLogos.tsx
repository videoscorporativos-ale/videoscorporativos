const logos = ["Vortex", "Helix", "Northwave", "Atria", "Lumen Co.", "Praxis", "Orbital"];

export function ClientLogos() {
  return (
    <section className="border-y border-border bg-surface/40 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Empresas que já confiaram no nosso trabalho
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((l) => (
            <span
              key={l}
              className="font-display text-xl md:text-2xl font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}