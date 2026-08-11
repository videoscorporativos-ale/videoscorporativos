import { createFileRoute } from "@tanstack/react-router";
import {
  ServiceLanding,
  serviceLandingSchemas,
  type ServiceLandingContent,
} from "@/components/site/ServiceLanding";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/reels-corporativos`;
const TITLE = "Reels Corporativos · Vídeos Verticais para Empresas em SP";
const DESCRIPTION = "Produção de reels corporativos e vídeos verticais para LinkedIn, Instagram, Shorts e TikTok. Vários cortes na mesma diária. Orçamento pelo WhatsApp.";

const content: ServiceLandingContent = {
  "breadcrumb": "Reels Corporativos",
  "h1": "Reels corporativos para empresas",
  "intro": "Presença digital de empresa não se sustenta com um vídeo por ano. Reels corporativos resolvem o problema de constância: em uma diária de gravação bem planejada, sai um pacote de cortes verticais com legendas, prontos para LinkedIn, Instagram, YouTube Shorts e TikTok — no padrão visual da marca, sem parecer conteúdo improvisado.",
  "paraQuem": [
    "Marketing e comunicação que precisam publicar com frequência e padrão.",
    "Áreas de RH que trabalham marca empregadora e recrutamento.",
    "Empresas que participam de eventos e feiras e querem aproveitar o material.",
    "Profissionais liberais e sócios que constroem autoridade em vídeo."
  ],
  "quandoUsar": [
    "Em calendários mensais de conteúdo para LinkedIn e Instagram.",
    "Em lançamentos de produto e campanhas de tráfego pago.",
    "Em bastidores, obras, operação e rotina da equipe.",
    "Em eventos, aproveitando a presença de porta-vozes e clientes."
  ],
  "entregaveis": [
    "Pauta e roteiro curto para cada corte antes da gravação.",
    "Captação vertical com luz e áudio dedicados.",
    "Edição dinâmica com legendas queimadas e identidade da marca.",
    "Pacote com vários cortes gravados na mesma diária."
  ],
  "ctaLabel": "Falar sobre reels corporativos",
  "ctaLocation": "reels_page",
  "ctaMessage": "Olá, quero um orçamento de reels corporativos para minha empresa.",
  "faqs": [
    {
      "q": "Quantos reels saem em uma diária?",
      "a": "Com pauta definida antes e porta-vozes disponíveis, é comum sair um pacote de vários cortes na mesma diária. O número exato é combinado no planejamento."
    },
    {
      "q": "Precisa de alguém da empresa falando na câmera?",
      "a": "Ajuda, mas não é obrigatório. Também produzimos cortes com operação, produto, ambiente e narração."
    },
    {
      "q": "Os vídeos vêm com legenda?",
      "a": "Sim, todos os cortes verticais são entregues com legendas, porque a maior parte do consumo em feed é sem áudio."
    },
    {
      "q": "Dá para contratar de forma recorrente?",
      "a": "Sim. Muitas empresas preferem uma diária periódica que alimenta o calendário do mês inteiro."
    }
  ]
};

const schemas = serviceLandingSchemas({
  url: URL,
  serviceType: "Reels Corporativos",
  name: content.h1,
  description: DESCRIPTION,
  breadcrumb: content.breadcrumb,
  faqs: content.faqs,
});

export const Route = createFileRoute("/reels-corporativos")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "reels corporativos, vídeo vertical para empresa, vídeo para LinkedIn, shorts corporativo, produção de reels São Paulo" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: schemas.map((s) => ({
      type: "application/ld+json",
      children: JSON.stringify(s),
    })),
  }),
  component: () => <ServiceLanding content={content} />,
});
