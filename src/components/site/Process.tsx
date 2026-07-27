import { Lightbulb, ClipboardList, Video, SlidersHorizontal, Send, type LucideIcon } from "lucide-react";

type Step = { n: string; title: string; desc: string; Icon: LucideIcon };

const steps: Step[] = [
  { n: "01", title: "Briefing e roteiro", desc: "Entendemos o objetivo e desenhamos a narrativa.", Icon: Lightbulb },
  { n: "02", title: "Pré-produção", desc: "Planejamento, locações, equipe e cronograma.", Icon: ClipboardList },
  { n: "03", title: "Captação", desc: "Filmagem com equipamentos de cinema e direção apurada.", Icon: Video },
  { n: "04", title: "Edição e finalização", desc: "Montagem, color grading, trilha e mixagem.", Icon: SlidersHorizontal },
  { n: "05", title: "Entrega", desc: "Versões para institucional, Reels, YouTube e mais.", Icon: Send },
];

export function Process() {
  return (
    <section id="processo" className="py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Processo</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Do briefing à entrega, sem improviso.
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground leading-relaxed">
            Cinco etapas claras, com cronograma definido e aprovação em cada
            ponto de virada.
          </p>
        </div>

        <ol className="grid gap-3 sm:grid-cols-2">
          {steps.map(({ n, title, desc, Icon }) => (
            <li
              key={n}
              className="group rounded-3xl border border-border bg-surface/50 p-6 transition hover:border-brand/40 hover:bg-surface"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-brand/40 text-brand transition group-hover:bg-brand group-hover:text-brand-foreground">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-brand">
                  Etapa {n}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-medium text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}