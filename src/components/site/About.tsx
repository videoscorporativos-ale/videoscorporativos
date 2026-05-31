export function About() {
  return (
    <section id="sobre" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-surface">
          <img
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&q=80"
            alt="Alexandre Machado, produtor audiovisual"
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Sobre</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Vídeo corporativo, com respeito à reputação da marca.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Sou Alexandre Machado, produtor audiovisual com mais de 30 anos
            dedicados à imagem corporativa. Já registrei desde grandes eventos
            a filmes institucionais para empresas de todo o país, sempre com o
            mesmo princípio: vídeo que comunica com clareza e respeita a
            reputação da marca.
          </p>
          <a
            href="#contato"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium hover:bg-surface transition"
          >
            Vamos conversar
          </a>
        </div>
      </div>
    </section>
  );
}