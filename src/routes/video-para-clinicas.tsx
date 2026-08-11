import { createFileRoute } from "@tanstack/react-router";
import {
  ServiceLanding,
  serviceLandingSchemas,
  type ServiceLandingContent,
} from "@/components/site/ServiceLanding";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/video-para-clinicas`;
const TITLE = "Vídeo para Clínicas e Hospitais · Produção em São Paulo";
const DESCRIPTION = "Produção de vídeo para clínicas, hospitais e consultórios em São Paulo: estrutura, equipe, atendimento e explicação de procedimentos. Orçamento no WhatsApp.";

const content: ServiceLandingContent = {
  "breadcrumb": "Vídeo para Clínicas",
  "h1": "Vídeo para clínicas e hospitais",
  "intro": "Na saúde, a decisão é tomada por confiança e quase sempre antes do primeiro contato. O vídeo mostra estrutura, equipe e forma de atendimento com linguagem sóbria, respeitando as exigências de comunicação da área. Gravamos no ambiente de atendimento, com equipe discreta, sem interferir na rotina de pacientes.",
  "paraQuem": [
    "Clínicas, consultórios e centros de diagnóstico.",
    "Hospitais e operadoras que precisam apresentar estrutura e corpo clínico.",
    "Profissionais da saúde que constroem autoridade em canais digitais.",
    "Redes com várias unidades que precisam de padrão de comunicação."
  ],
  "quandoUsar": [
    "Na apresentação da estrutura e da equipe no site.",
    "Na explicação de procedimentos e preparo, reduzindo dúvidas no atendimento.",
    "Na inauguração de unidade ou chegada de novo equipamento.",
    "Em conteúdo educativo para redes sociais e campanhas."
  ],
  "entregaveis": [
    "Roteiro sóbrio, alinhado às exigências de comunicação da área da saúde.",
    "Captação discreta no ambiente de atendimento, com equipe reduzida.",
    "Direção de cena para profissionais que não são acostumados a câmera.",
    "Vídeo institucional mais cortes curtos e verticais para site e redes."
  ],
  "ctaLabel": "Quero um vídeo para minha clínica",
  "ctaLocation": "video_clinicas_page",
  "ctaMessage": "Olá, quero um orçamento de vídeo para minha clínica ou hospital.",
  "faqs": [
    {
      "q": "A gravação interfere no atendimento?",
      "a": "Não. Trabalhamos com equipe reduzida, equipamento compacto e agenda combinada com a recepção para evitar horários de pico."
    },
    {
      "q": "Podemos gravar com pacientes?",
      "a": "Somente com autorização formal de uso de imagem e respeitando as regras de comunicação da área. Fornecemos o termo de autorização."
    },
    {
      "q": "Vocês respeitam as normas de publicidade da saúde?",
      "a": "Sim. O roteiro evita promessa de resultado e linguagem sensacionalista, mantendo o foco em estrutura, equipe e informação ao paciente."
    },
    {
      "q": "Serve para clínica pequena?",
      "a": "Sim. Existem escopos enxutos, com uma diária, que resolvem apresentação da estrutura e alguns cortes para redes."
    }
  ]
};

const schemas = serviceLandingSchemas({
  url: URL,
  serviceType: "Vídeo para Clínicas e Hospitais",
  name: content.h1,
  description: DESCRIPTION,
  breadcrumb: content.breadcrumb,
  faqs: content.faqs,
});

export const Route = createFileRoute("/video-para-clinicas")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "vídeo para clínicas, vídeo institucional para clínica, vídeo para hospital, vídeo para consultório, produção de vídeo área da saúde São Paulo" },
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
