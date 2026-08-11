import { WhatsAppLink } from "./WhatsAppLink";

type Bloco = { title: string; text: string; href?: string };

const blocos: Bloco[] = [
  {
    title: "Vídeo institucional",
    text: "Apresenta a empresa, a estrutura, a equipe e os diferenciais para clientes, parceiros e licitações.",
    href: "/video-institucional-sao-paulo",
  },
  {
    title: "Vídeo de treinamento",
    text: "Padroniza procedimentos e reduz retrabalho em equipes distribuídas em várias unidades.",
    href: "/video-de-treinamento-corporativo",
  },
  {
    title: "Vídeo de integração",
    text: "Recebe novos colaboradores com cultura, normas e estrutura explicadas da mesma forma sempre.",
    href: "/video-de-integracao",
  },
  {
    title: "Depoimentos em vídeo",
    text: "Gera prova social com clientes, parceiros e colaboradores falando de resultado real.",
    href: "/depoimentos-em-video",
  },
  {
    title: "Vídeos para eventos corporativos",
    text: "Registro, aftermovie e cortes de convenções, congressos, palestras e premiações.",
    href: "/cobertura-de-eventos-corporativos",
  },
  {
    title: "Vídeos para clínicas e hospitais",
    text: "Mostra estrutura, equipe e atendimento com linguagem sóbria e adequada à área da saúde.",
    href: "/video-para-clinicas",
  },
  {
    title: "Vídeos para escritórios e profissionais",
    text: "Constrói autoridade de advogados, consultores e profissionais liberais antes do primeiro contato.",
    href: "/video-para-empresas",
  },
  {
    title: "Vídeos para indústrias e logística",
    text: "Registra planta, operação, frota e centros de distribuição sem parar a produção.",
    href: "/video-para-industrias",
  },
  {
    title: "Reels corporativos",
    text: "Cortes verticais com legendas para LinkedIn, Instagram, YouTube Shorts e TikTok.",
    href: "/reels-corporativos",
  },
  {
    title: "Vídeos para campanhas e redes sociais",
    text: "Peças curtas para tráfego pago, lançamentos de produto e ações de marca empregadora.",
    href: "/video-para-empresas",
  },
];

export function VideosCorporativosSP() {
  return (
    <section id="videos-corporativos" className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Vídeo corporativo</p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
            Vídeos corporativos em São Paulo
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Um vídeo corporativo bem produzido ajuda sua empresa a apresentar sua estrutura,
            explicar serviços, treinar equipes, comunicar valores, gerar confiança e fortalecer a
            marca em canais digitais, reuniões, eventos e apresentações comerciais.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blocos.map((b) => (
            <li
              key={b.title}
              className="rounded-2xl border border-border bg-surface/30 p-6 transition hover:border-brand/40"
            >
              <h3 className="font-display text-lg font-medium">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.text}</p>
              {b.href && (
                <a
                  href={b.href}
                  className="mt-4 inline-flex text-sm text-brand underline-offset-4 hover:underline"
                >
                  Ver detalhes
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <WhatsAppLink
            location="secao_videos_corporativos"
            message="Olá, quero um orçamento de vídeo corporativo para minha empresa."
            className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition hover:opacity-90"
          >
            Solicitar orçamento de vídeo corporativo
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}