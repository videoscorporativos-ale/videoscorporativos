import { WhatsAppLink } from "./WhatsAppLink";

type Segmento = {
  title: string;
  dor: string;
  indicado: string;
  beneficio: string;
  cta: string;
};

const segmentos: Segmento[] = [
  {
    title: "Empresas e indústrias",
    dor: "A operação é complexa e difícil de explicar em texto ou apresentação de slides.",
    indicado: "Vídeo institucional e vídeo de processo, gravados na planta ou no escritório.",
    beneficio: "Encurta a explicação técnica em reuniões, licitações e propostas comerciais.",
    cta: "Quero vídeos para minha empresa",
  },
  {
    title: "Clínicas e hospitais",
    dor: "O paciente decide por confiança e chega ao site sem conhecer a estrutura nem a equipe.",
    indicado: "Vídeo institucional da estrutura e vídeos curtos de explicação de procedimentos.",
    beneficio: "Reduz a insegurança antes do agendamento e valoriza o atendimento.",
    cta: "Quero um vídeo para minha clínica",
  },
  {
    title: "Escritórios de advocacia",
    dor: "O serviço é intangível e a escolha depende da autoridade percebida do profissional.",
    indicado: "Vídeo institucional sóbrio e série de vídeos de conteúdo com os sócios.",
    beneficio: "Constrói autoridade e sustenta a indicação com material próprio.",
    cta: "Falar sobre vídeo para meu escritório",
  },
  {
    title: "Empresas de logística",
    dor: "Frota, armazém e capacidade operacional só convencem quando são vistos.",
    indicado: "Vídeo institucional em CDs e filiais, mais vídeo de processo operacional.",
    beneficio: "Prova capacidade de atendimento em negociações de contrato.",
    cta: "Orçar vídeo para logística",
  },
  {
    title: "RH e treinamento",
    dor: "O mesmo treinamento é repetido presencialmente e a rotatividade consome a agenda.",
    indicado: "Vídeo de treinamento e vídeo de integração modulados por tema.",
    beneficio: "Padroniza a informação e libera horas do time interno.",
    cta: "Orçar vídeo de treinamento",
  },
  {
    title: "Marketing e comunicação",
    dor: "Falta material de vídeo com constância e padrão para alimentar os canais.",
    indicado: "Vídeo comercial, reels corporativos e cortes para campanhas.",
    beneficio: "Mantém a presença digital ativa sem cair na estética genérica de banco de imagens.",
    cta: "Quero vídeos para campanhas",
  },
  {
    title: "Eventos corporativos",
    dor: "O evento acontece, gera investimento alto e sobra pouco material aproveitável.",
    indicado: "Cobertura em vídeo, aftermovie, gravação de palestras e depoimentos no local.",
    beneficio: "Transforma o evento em conteúdo para relatório interno e divulgação da próxima edição.",
    cta: "Orçar cobertura de evento",
  },
  {
    title: "Profissionais liberais",
    dor: "A venda depende de reputação pessoal, mas não há nada em vídeo que mostre o trabalho.",
    indicado: "Vídeo de apresentação profissional e cortes verticais para redes.",
    beneficio: "Aproxima o cliente antes do primeiro contato e diferencia da concorrência.",
    cta: "Falar sobre meu projeto",
  },
];

export function Segmentos() {
  return (
    <section id="segmentos" className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Segmentos atendidos</p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
            Produção de vídeo para diferentes segmentos
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {segmentos.map((s) => (
            <article
              key={s.title}
              className="flex flex-col rounded-3xl border border-border bg-surface/30 p-7 transition hover:border-brand/40"
            >
              <h3 className="font-display text-xl font-medium">{s.title}</h3>
              <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand">Desafio</dt>
                  <dd className="mt-1 text-muted-foreground">{s.dor}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand">Vídeo indicado</dt>
                  <dd className="mt-1 text-muted-foreground">{s.indicado}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand">Benefício comercial</dt>
                  <dd className="mt-1 text-muted-foreground">{s.beneficio}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <WhatsAppLink
                  location={`segmento_${s.title.toLowerCase().replace(/[^a-z]+/g, "_")}`}
                  message={`Olá, sou de ${s.title.toLowerCase()} e quero um orçamento de vídeo corporativo.`}
                  className="inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition hover:opacity-90"
                >
                  {s.cta}
                </WhatsAppLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}