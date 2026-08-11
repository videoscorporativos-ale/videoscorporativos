import { createFileRoute } from "@tanstack/react-router";
import {
  ServiceLanding,
  serviceLandingSchemas,
  type ServiceLandingContent,
} from "@/components/site/ServiceLanding";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/video-para-industrias`;
const TITLE = "Vídeo para Indústrias e Logística · Produção em São Paulo";
const DESCRIPTION = "Produção de vídeo para indústrias e empresas de logística: planta, operação, frota, centros de distribuição e processos. São Paulo e todo o Brasil.";

const content: ServiceLandingContent = {
  "breadcrumb": "Vídeo para Indústrias",
  "h1": "Vídeo para indústrias e empresas de logística",
  "intro": "Capacidade operacional é difícil de provar em texto. Vídeo de planta, frota, armazém e processo mostra em segundos o que uma apresentação leva dez slides para explicar — e sustenta negociação de contrato, licitação e auditoria de cliente. Gravamos em operação, com equipe treinada para trabalhar sob regras de segurança e uso de EPI.",
  "paraQuem": [
    "Indústrias que precisam apresentar planta, linha de produção e certificações.",
    "Empresas de logística e transportadoras com CDs, filiais e frota própria.",
    "Áreas técnicas e de qualidade que documentam processos e procedimentos.",
    "Times comerciais que disputam contratos com auditoria e visita técnica."
  ],
  "quandoUsar": [
    "Em negociação de contrato e concorrências, no lugar da visita presencial.",
    "Na apresentação de capacidade produtiva e de armazenagem.",
    "Em treinamentos de segurança do trabalho e procedimentos operacionais.",
    "Em feiras de negócios e apresentações a novos clientes."
  ],
  "entregaveis": [
    "Planejamento de captação alinhado às regras de segurança e acesso da planta.",
    "Captação em operação, com EPI e acompanhamento da área responsável.",
    "Vídeo institucional, vídeo de processo e cortes por etapa da operação.",
    "Versões para site, apresentação comercial, feiras e redes sociais."
  ],
  "ctaLabel": "Orçar vídeo para minha indústria",
  "ctaLocation": "video_industrias_page",
  "ctaMessage": "Olá, quero um orçamento de vídeo para minha indústria ou operação logística.",
  "faqs": [
    {
      "q": "A equipe está preparada para gravar em área industrial?",
      "a": "Sim. Trabalhamos com EPI, integração de segurança quando exigida e acompanhamento da área responsável durante toda a captação."
    },
    {
      "q": "Precisamos parar a produção?",
      "a": "Não. O planejamento prevê gravação com a operação rodando; paradas só entram quando a própria empresa considera necessário."
    },
    {
      "q": "Dá para gravar em várias unidades?",
      "a": "Sim. Definimos quantas diárias e deslocamentos são necessários para planta, CDs e filiais."
    },
    {
      "q": "Vocês assinam termo de confidencialidade?",
      "a": "Sim. Quando o processo é sensível, assinamos NDA e submetemos o material à aprovação antes de qualquer divulgação."
    }
  ]
};

const schemas = serviceLandingSchemas({
  url: URL,
  serviceType: "Vídeo para Indústrias e Logística",
  name: content.h1,
  description: DESCRIPTION,
  breadcrumb: content.breadcrumb,
  faqs: content.faqs,
});

export const Route = createFileRoute("/video-para-industrias")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "vídeo para indústrias, vídeo industrial, vídeo para logística, vídeo de processo industrial, vídeo institucional de fábrica São Paulo" },
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
