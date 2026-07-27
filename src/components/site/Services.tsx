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
    <section id="servicos" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Serviços</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Três frentes, um único padrão de qualidade.
          </h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="group relative rounded-3xl border border-border bg-surface/50 p-8 transition-all duration-300 hover:border-brand/50 hover:bg-surface"
              >
                <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-display text-xl font-medium">{s.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            );
          })}
          <a
            href="#contato"
            className="group flex flex-col justify-between gap-3 rounded-3xl border border-brand/30 bg-brand/5 p-8 transition hover:bg-brand/10 md:col-span-2 md:flex-row md:items-center lg:col-span-3"
          >
            <p className="font-display text-xl font-medium text-brand">
              Não sabe qual formato precisa?
            </p>
            <p className="text-sm text-muted-foreground">
              Conte o objetivo e eu indico o caminho — sem compromisso.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}