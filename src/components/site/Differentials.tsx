import { Award, Clapperboard, Camera, Scissors, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";

const items: { title: string; desc: string; Icon: LucideIcon }[] = [
  {
    title: "Mais de 30 anos em imagem corporativa",
    desc: "Desde 1999 atendendo empresas em fotografia e vídeo, com repertório de indústria, logística, saúde, jurídico e eventos.",
    Icon: Award,
  },
  {
    title: "Direção de cena",
    desc: "Executivos e colaboradores raramente são atores. Conduzimos a gravação para que a fala saia natural e objetiva.",
    Icon: Clapperboard,
  },
  {
    title: "Captação profissional",
    desc: "Câmeras de cinema, iluminação e áudio dedicados, com equipe treinada para gravar dentro da empresa em operação.",
    Icon: Camera,
  },
  {
    title: "Edição voltada à comunicação empresarial",
    desc: "Montagem que respeita a mensagem: clara, no tempo certo do canal e alinhada à identidade visual da companhia.",
    Icon: Scissors,
  },
  {
    title: "Atendimento em São Paulo e região",
    desc: "Base em São Paulo, com atendimento na Grande SP, ABC, Alphaville, Faria Lima, Paulista e Berrini — e projetos em todo o Brasil.",
    Icon: MapPin,
  },
  {
    title: "Processo previsível",
    desc: "Cronograma, escopo e aprovações definidos antes da primeira diária. Sem surpresa de prazo ou de entrega.",
    Icon: ShieldCheck,
  },
];

export function Differentials() {
  return (
    <section id="diferenciais" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Diferenciais</p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold tracking-tight text-balance">
            Por que empresas contratam este serviço
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, desc, Icon }) => (
            <div key={title} className="rounded-3xl border border-border bg-surface/50 p-6">
              <div className="flex size-11 items-center justify-center rounded-2xl border border-brand/40 text-brand">
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-display text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
