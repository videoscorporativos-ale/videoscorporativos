import { Film, Video, Calendar } from "lucide-react";

const services = [
  {
    icon: Film,
    title: "Vídeo Institucional",
    description:
      "Conte a história, os valores e o diferencial da sua empresa em um filme que transmite credibilidade.",
  },
  {
    icon: Calendar,
    title: "Eventos Corporativos",
    description:
      "Cobertura completa de convenções, lançamentos e confraternizações, com entrega ágil e qualidade de cinema.",
  },
  {
    icon: Video,
    title: "Feiras de Negócios",
    description:
      "Registro e aftermovie da sua participação em feiras, para gerar conteúdo e provar resultado.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Serviços</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Três frentes, um único padrão de qualidade.
          </h2>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group relative rounded-2xl border border-border bg-surface/60 p-8 hover:border-brand/50 hover:bg-surface transition-all duration-300"
              >
                <div className="size-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-6">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-display text-xl font-medium">{s.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}