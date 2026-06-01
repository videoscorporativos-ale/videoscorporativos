export function About() {
  return (
    <section id="sobre" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-surface">
          <img
            src="https://images.unsplash.com/photo-1579165466991-467135ad3110?w=900&q=80"
            alt="Videomaker profissional ajustando câmera em set cinematográfico"
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Sobre</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Imagem corporativa com intenção estratégica, não apenas estética.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Sou Alexandre Machado, conhecido como Ale Fotógrafo. Há mais de 30
            anos atendo empresas em São Paulo com fotografia corporativa,
            retratos profissionais, cobertura de eventos e produção de vídeo
            institucional.
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Meu método é claro: entender o posicionamento do cliente, o público
            que será impactado e o objetivo da comunicação antes de iniciar
            qualquer produção. Atendimento direto, sem intermediários, com
            estúdio próprio e estrutura móvel para gravações na sua empresa —
            em toda a Grande SP, ABC, Alphaville, Faria Lima, Paulista e
            Berrini.
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