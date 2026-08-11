import { WhatsAppLink } from "./WhatsAppLink";

const tipos = [
  {
    title: "Vídeo institucional",
    text: "Para apresentar sua empresa, estrutura, equipe e diferenciais.",
    href: "/video-institucional-sao-paulo",
  },
  {
    title: "Vídeo comercial",
    text: "Para divulgar produtos, serviços e campanhas.",
    href: "/video-para-empresas",
  },
  {
    title: "Vídeo de treinamento",
    text: "Para padronizar processos e capacitar equipes.",
    href: "/video-de-treinamento-corporativo",
  },
  {
    title: "Vídeo de integração",
    text: "Para receber novos colaboradores.",
    href: "/video-de-integracao",
  },
  {
    title: "Depoimentos em vídeo",
    text: "Para gerar prova social e confiança.",
    href: "/depoimentos-em-video",
  },
  {
    title: "Vídeo de evento corporativo",
    text: "Para registrar e divulgar encontros empresariais.",
    href: "/cobertura-de-eventos-corporativos",
  },
  {
    title: "Reels corporativos",
    text: "Para gerar conteúdo rápido para LinkedIn, Instagram, YouTube Shorts e TikTok.",
    href: "/reels-corporativos",
  },
  {
    title: "Vídeo para clínicas e profissionais",
    text: "Para apresentar estrutura, equipe, atendimento e diferenciais.",
    href: "/video-para-clinicas",
  },
];

export function TiposDeVideo() {
  return (
    <section id="tipos-de-video" className="border-t border-border bg-surface/20 py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Tipos de vídeo para empresas</p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
            Que tipo de vídeo sua empresa precisa?
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tipos.map((t) => (
            <article
              key={t.title}
              className="flex flex-col rounded-2xl border border-border bg-background/60 p-6 transition hover:border-brand/40"
            >
              <h3 className="font-display text-lg font-medium">{t.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{t.text}</p>
              <WhatsAppLink
                location={`tipo_${t.title.toLowerCase().replace(/[^a-z]+/g, "_")}`}
                message={`Olá, quero um orçamento de ${t.title.toLowerCase()} para minha empresa.`}
                className="mt-5 inline-flex justify-center rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition hover:opacity-90"
              >
                Solicitar orçamento
              </WhatsAppLink>
              <a
                href={t.href}
                className="mt-3 text-center text-xs text-muted-foreground underline-offset-4 hover:text-brand hover:underline"
              >
                Saber mais
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}