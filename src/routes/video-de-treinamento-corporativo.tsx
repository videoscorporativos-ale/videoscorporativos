import { createFileRoute } from "@tanstack/react-router";
import {
  ServiceLanding,
  serviceLandingSchemas,
  type ServiceLandingContent,
} from "@/components/site/ServiceLanding";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/video-de-treinamento-corporativo`;
const TITLE = "Vídeo de Treinamento Corporativo · São Paulo";
const DESCRIPTION = "Produção de vídeo de treinamento corporativo em São Paulo: roteiro didático, gravação na sua operação, narração e legendas. Padronize o treinamento das equipes.";
const OG_IMAGE = "https://i.ytimg.com/vi/xYb2yPxMcL8/maxresdefault.jpg";

const content: ServiceLandingContent = {
  "breadcrumb": "Vídeo de Treinamento Corporativo",
  "h1": "Vídeo de treinamento corporativo",
  "intro": "Treinamento repetido presencialmente custa hora de instrutor, deslocamento e produtividade — e sai diferente a cada turma. Em vídeo, o mesmo procedimento é ensinado da mesma forma para todas as unidades, quantas vezes for necessário. Produzimos vídeos de treinamento a partir dos procedimentos da sua empresa, gravados na operação real, com linguagem didática e módulos organizados por tema.",
  "paraQuem": [
    "RH e times de treinamento e desenvolvimento que atendem equipes em várias unidades.",
    "Segurança do trabalho e qualidade que precisam registrar procedimentos, NRs e boas práticas.",
    "Indústrias, logística, clínicas e hospitais com alta rotatividade ou operação em turnos.",
    "Áreas técnicas que precisam padronizar a execução de um processo crítico."
  ],
  "quandoUsar": [
    "Quando o mesmo treinamento é repetido presencialmente mês após mês.",
    "Quando a operação tem turnos e não é possível reunir todos ao mesmo tempo.",
    "Quando há auditoria ou certificação que exige evidência de treinamento.",
    "Quando o procedimento mudou e precisa ser recomunicado rapidamente."
  ],
  "entregaveis": [
    "Roteiro didático construído a partir dos POPs e materiais internos da empresa.",
    "Gravação nas suas instalações, com a operação em funcionamento.",
    "Narração profissional ou apresentação por um instrutor da própria empresa.",
    "Legendas, apoios gráficos e destaques nos pontos críticos do procedimento.",
    "Divisão em módulos curtos por tema, prontos para o LMS ou portal de RH."
  ],
  "ctaLabel": "Falar sobre meu projeto de treinamento",
  "ctaLocation": "treinamento_page",
  "ctaMessage": "Olá, quero um orçamento de vídeo de treinamento corporativo.",
  "faqs": [
    {
      "q": "Quanto custa um vídeo de treinamento?",
      "a": "O valor depende do número de procedimentos, das diárias de gravação e da quantidade de módulos. Séries de treinamento saem mais eficientes quando gravadas na mesma diária. Envie a lista de temas pelo WhatsApp e devolvemos escopo e valor."
    },
    {
      "q": "Vocês gravam dentro da fábrica ou do centro de distribuição?",
      "a": "Sim. Gravamos na operação real, seguindo as normas de segurança e EPI do local, sem interromper a produção. Fazemos alinhamento prévio com segurança do trabalho quando necessário."
    },
    {
      "q": "Quem escreve o roteiro?",
      "a": "Nós. Partimos dos seus procedimentos escritos e das entrevistas com quem executa a tarefa, e transformamos isso em um roteiro didático que passa pela sua aprovação antes da gravação."
    },
    {
      "q": "O vídeo funciona no nosso LMS?",
      "a": "Sim. Entregamos os arquivos nos formatos e resoluções compatíveis com plataformas de LMS, intranet e portais de RH, com versões separadas por módulo."
    }
  ]
};

const schemas = serviceLandingSchemas({
  url: URL,
  serviceType: "Vídeo de Treinamento Corporativo",
  name: content.h1,
  description: DESCRIPTION,
  breadcrumb: content.breadcrumb,
  faqs: content.faqs,
});

export const Route = createFileRoute("/video-de-treinamento-corporativo")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "vídeo de treinamento corporativo, vídeo treinamento empresa, vídeo de procedimento, treinamento em vídeo São Paulo, vídeo NR segurança do trabalho" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: schemas.map((s) => ({
      type: "application/ld+json",
      children: JSON.stringify(s),
    })),
  }),
  component: () => <ServiceLanding content={content} />,
});
