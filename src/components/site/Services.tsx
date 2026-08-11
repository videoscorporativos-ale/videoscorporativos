import {
  Building2,
  Briefcase,
  GraduationCap,
  UserPlus,
  MessageSquareQuote,
  CalendarDays,
  Smartphone,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { WhatsAppLink } from "./WhatsAppLink";

export type ServiceBlock = {
  slug?: string;
  title: string;
  Icon: LucideIcon;
  para: string;
  quando: string;
  entrega: string;
  cta: string;
  ctaLocation: string;
};

export const services: ServiceBlock[] = [
  {
    slug: "/video-institucional-sao-paulo",
    title: "Vídeo institucional",
    Icon: Building2,
    para: "Indústrias, empresas de logística, escritórios de advocacia e companhias que precisam apresentar estrutura e credibilidade.",
    quando: "Em propostas comerciais, no site, em licitações, em feiras e na apresentação da empresa para novos clientes e investidores.",
    entrega: "Roteiro, direção de cena, captação em suas unidades, edição, color grading, trilha e versões para site, YouTube e apresentações.",
    cta: "Planejar meu vídeo institucional",
    ctaLocation: "servico_institucional",
  },
  {
    slug: "/video-corporativo-sao-paulo",
    title: "Vídeo corporativo",
    Icon: Briefcase,
    para: "Departamentos de marketing e comunicação que precisam de vídeo para campanhas, produtos, processos e comunicados.",
    quando: "No lançamento de um produto ou serviço, na explicação de um processo interno ou no reforço de uma campanha comercial.",
    entrega: "Planejamento de mensagem, captação, motion graphics leve, legendas e cortes adaptados a cada canal da empresa.",
    cta: "Quero um vídeo para minha empresa",
    ctaLocation: "servico_corporativo",
  },
  {
    slug: "/video-de-treinamento-corporativo",
    title: "Vídeo de treinamento",
    Icon: GraduationCap,
    para: "RH, qualidade, segurança do trabalho e áreas técnicas que treinam equipes distribuídas em várias unidades.",
    quando: "Quando o mesmo treinamento é repetido presencialmente, quando há alta rotatividade ou quando o procedimento precisa ser padronizado.",
    entrega: "Roteiro didático a partir do procedimento da empresa, gravação em operação, narração, legendas e módulos separados por tema.",
    cta: "Falar sobre meu projeto de treinamento",
    ctaLocation: "servico_treinamento",
  },
  {
    slug: "/video-de-integracao",
    title: "Vídeo de integração",
    Icon: UserPlus,
    para: "RH e comunicação interna que recebem novos colaboradores todo mês e querem padronizar o onboarding.",
    quando: "No primeiro dia do novo colaborador, na apresentação da cultura, das normas internas e da estrutura da empresa.",
    entrega: "Vídeo de boas-vindas, tour pelas áreas, mensagem da liderança, versões curtas por assunto e formato pronto para o portal de RH.",
    cta: "Planejar meu vídeo de integração",
    ctaLocation: "servico_integracao",
  },
  {
    slug: "/depoimentos-em-video",
    title: "Depoimentos em vídeo",
    Icon: MessageSquareQuote,
    para: "Times comerciais que precisam de prova real para encurtar a decisão de compra em vendas B2B.",
    quando: "Em propostas, no funil de vendas, em landing pages e quando o cliente pede referências antes de fechar.",
    entrega: "Condução da entrevista, direção para quem não é acostumado a câmera, captação de áudio limpo e cortes de 30s, 60s e versão completa.",
    cta: "Quero gravar depoimentos de clientes",
    ctaLocation: "servico_depoimentos",
  },
  {
    slug: "/filmagem-evento-corporativo-sao-paulo",
    title: "Cobertura de eventos corporativos",
    Icon: CalendarDays,
    para: "Empresas e associações que realizam convenções, fóruns, premiações, SIPAT e confraternizações.",
    quando: "Quando o evento precisa render conteúdo depois: relatório para a diretoria, divulgação da próxima edição e comunicação interna.",
    entrega: "Cobertura durante o evento, entrevistas com participantes, aftermovie, cortes para redes sociais e entrega acelerada.",
    cta: "Orçar cobertura do meu evento",
    ctaLocation: "servico_eventos",
  },
  {
    title: "Reels corporativos",
    Icon: Smartphone,
    para: "Marketing e comunicação que precisam alimentar LinkedIn e Instagram com constância e padrão profissional.",
    quando: "Em ações recorrentes de marca empregadora, bastidores, lançamentos e presença em eventos.",
    entrega: "Captação vertical, edição dinâmica, legendas queimadas e pacotes com vários cortes gravados na mesma diária.",
    cta: "Falar sobre reels corporativos",
    ctaLocation: "servico_reels",
  },
  {
    title: "Vídeos para clínicas e profissionais liberais",
    Icon: Stethoscope,
    para: "Clínicas, hospitais, consultórios e escritórios que precisam transmitir confiança antes do primeiro contato.",
    quando: "Na apresentação da estrutura, na explicação de procedimentos e na construção de autoridade do profissional.",
    entrega: "Captação discreta no ambiente de atendimento, direção de cena para quem não é ator, edição sóbria e versões para site e redes.",
    cta: "Quero um vídeo para minha clínica",
    ctaLocation: "servico_clinicas",
  },
];

export function Services() {
  return (
    <section id="servicos" className="border-y border-border bg-surface/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Serviços</p>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
            Vídeos que ajudam sua empresa a vender, treinar e comunicar melhor
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Produção de vídeo corporativo em São Paulo para indústrias, empresas de logística,
            clínicas e hospitais, escritórios de advocacia e áreas de marketing, RH e comunicação
            interna. Cada projeto começa pelo objetivo comercial — não pelo equipamento.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.title}
              className="flex flex-col rounded-3xl border border-border bg-background/60 p-7 transition hover:border-brand/40"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-brand/40 text-brand">
                  <s.Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-medium">{s.title}</h3>
              </div>

              <dl className="mt-6 space-y-4 text-sm leading-relaxed">
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand">Para quem é</dt>
                  <dd className="mt-1 text-muted-foreground">{s.para}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand">Quando usar</dt>
                  <dd className="mt-1 text-muted-foreground">{s.quando}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand">O que entregamos</dt>
                  <dd className="mt-1 text-muted-foreground">{s.entrega}</dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap items-center gap-3 pt-1">
                <WhatsAppLink
                  location={s.ctaLocation}
                  message={`Olá, gostaria de um orçamento de ${s.title.toLowerCase()} para minha empresa.`}
                  className="inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition hover:opacity-90"
                >
                  {s.cta}
                </WhatsAppLink>
                {s.slug && (
                  <a href={s.slug} className="text-sm text-muted-foreground underline-offset-4 hover:text-brand hover:underline">
                    Ver detalhes
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Serviços de produção de vídeo corporativo em São Paulo",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      serviceType: s.title,
      description: `${s.para} ${s.entrega}`,
      provider: { "@id": "https://videoscorporativos.com.br/#business" },
      areaServed: [
        { "@type": "City", name: "São Paulo" },
        { "@type": "Country", name: "Brasil" },
      ],
      ...(s.slug ? { url: `https://videoscorporativos.com.br${s.slug}` } : {}),
    },
  })),
};
