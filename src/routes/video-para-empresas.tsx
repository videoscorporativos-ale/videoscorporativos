import { createFileRoute } from "@tanstack/react-router";
import {
  ServiceLanding,
  serviceLandingSchemas,
  type ServiceLandingContent,
} from "@/components/site/ServiceLanding";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/video-para-empresas`;
const TITLE = "Vídeo para Empresas · Produção Audiovisual Corporativa em SP";
const DESCRIPTION = "Produção de vídeo para empresas em São Paulo: institucional, comercial, processos, campanhas e conteúdo para redes. Orçamento pelo WhatsApp.";

const content: ServiceLandingContent = {
  "breadcrumb": "Vídeo para Empresas",
  "h1": "Vídeo para empresas em São Paulo",
  "intro": "Empresa que vende serviço complexo precisa explicar rápido o que faz, para quem faz e por que é confiável. O vídeo resolve isso em reunião, em proposta comercial, no site e no LinkedIn. Produzimos vídeo institucional, vídeo comercial, vídeo de processo e conteúdo para campanhas, sempre a partir do objetivo comercial da empresa — não de um pacote fechado.",
  "paraQuem": [
    "Empresas B2B que vendem serviço ou solução técnica e precisam encurtar a explicação.",
    "Marketing e comunicação que precisam de material próprio, com padrão e constância.",
    "Escritórios, consultorias e prestadores de serviço que vendem por autoridade.",
    "Indústrias, logística e distribuidoras que precisam mostrar estrutura e capacidade."
  ],
  "quandoUsar": [
    "No site e nas páginas de serviço, para reduzir dúvida antes do contato.",
    "Em apresentações comerciais, propostas e licitações.",
    "Em campanhas de tráfego pago e ações no LinkedIn.",
    "No lançamento de um produto, serviço ou nova unidade."
  ],
  "entregaveis": [
    "Briefing e roteiro alinhados ao objetivo comercial.",
    "Captação nas instalações da empresa, com equipe reduzida e sem parar a operação.",
    "Edição, color grading, trilha licenciada e legendas.",
    "Versão principal mais cortes em 16:9, 1:1 e 9:16 para cada canal."
  ],
  "ctaLabel": "Quero vídeos para minha empresa",
  "ctaLocation": "video_para_empresas_page",
  "ctaMessage": "Olá, quero um orçamento de vídeo para minha empresa.",
  "faqs": [
    {
      "q": "Qual tipo de vídeo minha empresa deveria fazer primeiro?",
      "a": "Na maioria dos casos, o institucional: ele responde quem é a empresa e sustenta site, proposta e apresentação. Depois vêm os vídeos de produto, processo e conteúdo para redes."
    },
    {
      "q": "Vocês gravam em mais de uma unidade?",
      "a": "Sim. O planejamento define quantas diárias e locações são necessárias, em São Paulo, Grande SP ou outras cidades."
    },
    {
      "q": "A empresa precisa aparecer com colaboradores?",
      "a": "Não obrigatoriamente. É possível construir o vídeo com narração, operação e ambientes, sem depender de depoimentos internos."
    },
    {
      "q": "Quanto custa um vídeo para empresa?",
      "a": "Depende de duração, diárias, locações e finalização. Há referências na página de preços e o valor exato sai depois de um briefing rápido pelo WhatsApp."
    }
  ]
};

const schemas = serviceLandingSchemas({
  url: URL,
  serviceType: "Vídeo para Empresas",
  name: content.h1,
  description: DESCRIPTION,
  breadcrumb: content.breadcrumb,
  faqs: content.faqs,
});

export const Route = createFileRoute("/video-para-empresas")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "vídeo para empresas, produção de vídeos corporativos, produção audiovisual corporativa, vídeo comercial para empresa, videomaker corporativo São Paulo" },
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
