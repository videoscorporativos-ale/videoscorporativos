import aboutAsset from "@/assets/about-videomaker.jpg.asset.json";
const aboutImage = aboutAsset.url;

const stats = [
  { value: "+30", label: "anos de experiência" },
  { value: "Brasil", label: "projetos em todo o país" },
  { value: "3 em 1", label: "roteiro, captação e edição" },
  { value: "Multi", label: "entrega em todos os formatos" },
];

export function About() {
  return (
    <section id="sobre" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-surface">
            <img
              src={aboutImage}
              alt="Videomaker profissional filmando reunião corporativa em ambiente empresarial"
              className="absolute inset-0 size-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-brand">Sobre</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              Imagem corporativa com intenção estratégica, não apenas estética.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Sou Alexandre Machado, o Ale Fotógrafo. Há mais de 30 anos atendo
              empresas em São Paulo com fotografia corporativa, retratos
              profissionais, cobertura de eventos e vídeo institucional.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Entendo o posicionamento, o público e o objetivo da comunicação
              antes de iniciar qualquer produção. Atendimento direto, sem
              intermediários, com estúdio próprio e estrutura móvel para gravar
              na sua empresa.
            </p>
            <a
              href="#contato"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium hover:bg-surface transition"
            >
              Vamos conversar
            </a>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-8">
              <dt className="font-display text-4xl font-semibold text-brand md:text-5xl">
                {s.value}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}