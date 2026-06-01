import { Lightbulb, ClipboardList, Video, SlidersHorizontal, Send, type LucideIcon } from "lucide-react";

const AMBER = "#BA7517";

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
    <section id="processo" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em]" style={{ color: AMBER }}>Processo</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Do briefing à entrega, sem improviso.
          </h2>
        </div>

        <ol className="mt-16 relative max-w-3xl">
          {/* fio condutor vertical */}
          <div
            aria-hidden
            className="absolute left-[27px] top-2 bottom-2 w-px"
            style={{ backgroundColor: AMBER, opacity: 0.25 }}
          />

          {steps.map(({ n, title, desc, Icon }) => (
            <li key={n} className="group relative flex gap-6 pb-12 last:pb-0">
              {/* círculo */}
              <div
                className="relative z-10 flex shrink-0 items-center justify-center rounded-full bg-background transition-all duration-300 group-hover:scale-110 [&>svg]:transition-colors [&>svg]:duration-300 group-hover:[background-color:var(--amber)] group-hover:[&>svg]:text-background"
                style={{
                  width: 54,
                  height: 54,
                  borderWidth: 1.5,
                  borderStyle: "solid",
                  borderColor: AMBER,
                  ["--amber" as never]: AMBER,
                }}
              >
                <Icon style={{ color: AMBER }} size={22} strokeWidth={1.5} />
              </div>

              {/* conteúdo */}
              <div className="pt-1.5 flex-1">
                <div className="flex items-center gap-3">
                  <span
                    className="text-[11px] font-medium uppercase tracking-[0.25em]"
                    style={{ color: AMBER }}
                  >
                    Etapa {n}
                  </span>
                  <span aria-hidden className="h-px w-8" style={{ backgroundColor: AMBER, opacity: 0.5 }} />
                </div>
                <h3 className="mt-2 font-display text-xl md:text-2xl font-medium text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                  {desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}