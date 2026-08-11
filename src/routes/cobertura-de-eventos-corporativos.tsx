import { createFileRoute } from "@tanstack/react-router";
import {
  ServiceLanding,
  serviceLandingSchemas,
  type ServiceLandingContent,
} from "@/components/site/ServiceLanding";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/cobertura-de-eventos-corporativos`;
const TITLE = "Cobertura de Eventos Corporativos em Vídeo · São Paulo";
const DESCRIPTION = "Cobertura de eventos corporativos em vídeo: aftermovie, gravação de palestras, depoimentos, bastidores e cortes para redes. São Paulo e todo o Brasil.";

const content: ServiceLandingContent = {
  "breadcrumb": "Cobertura de Eventos Corporativos",
  "h1": "Cobertura de eventos corporativos em vídeo",
  "intro": "Produzimos vídeos para registrar, divulgar e valorizar eventos empresariais, congressos, convenções, palestras, treinamentos, ativações de marca e encontros corporativos. O objetivo não é só registrar: é sair do evento com material que sirva para relatório interno, comunicação da marca e divulgação da próxima edição.",
  "paraQuem": [
    "Empresas e associações que realizam convenções, fóruns e premiações.",
    "Áreas de marketing e comunicação responsáveis por eventos de marca.",
    "RH e comunicação interna em SIPAT, treinamentos presenciais e confraternizações.",
    "Organizadores que precisam prestar contas do evento a patrocinadores e diretoria."
  ],
  "quandoUsar": [
    "Quando o evento precisa render conteúdo por semanas depois de acabar.",
    "Quando há patrocinadores que exigem comprovação de exposição.",
    "Quando as palestras têm valor de reuso em treinamento ou conteúdo.",
    "Quando a próxima edição já será divulgada com base nesta."
  ],
  "entregaveis": [
    "Vídeo resumo do evento (aftermovie) e reels com cortes curtos.",
    "Gravação de palestras e painéis com áudio da mesa de som.",
    "Depoimentos gravados no evento e bastidores.",
    "Highlights para redes sociais e conteúdo para pós-evento."
  ],
  "ctaLabel": "Orçar cobertura de evento",
  "ctaLocation": "cobertura_eventos_page",
  "ctaMessage": "Olá, quero um orçamento de cobertura de evento corporativo em vídeo.",
  "faqs": [
    {
      "q": "Em quanto tempo o vídeo do evento fica pronto?",
      "a": "O aftermovie pode ter entrega acelerada, inclusive em poucos dias, quando o evento tem desdobramento imediato. Palestras completas e pacotes maiores seguem um cronograma combinado antes."
    },
    {
      "q": "Gravam palestras inteiras?",
      "a": "Sim, com captação de áudio direto da mesa de som e enquadramentos de palco, plateia e apresentação."
    },
    {
      "q": "Cobrem eventos fora de São Paulo?",
      "a": "Sim. Atendemos São Paulo, Grande SP e outras cidades do Brasil, com deslocamento previsto no orçamento."
    },
    {
      "q": "Dá para gravar depoimentos durante o evento?",
      "a": "Sim, e costuma ser o melhor momento: clientes e parceiros já estão no local, o que reduz a agenda necessária depois."
    }
  ]
};

const schemas = serviceLandingSchemas({
  url: URL,
  serviceType: "Cobertura de Eventos Corporativos em Vídeo",
  name: content.h1,
  description: DESCRIPTION,
  breadcrumb: content.breadcrumb,
  faqs: content.faqs,
});

export const Route = createFileRoute("/cobertura-de-eventos-corporativos")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "cobertura de eventos corporativos em vídeo, filmagem de evento corporativo, aftermovie corporativo, gravação de palestras, vídeo de convenção São Paulo" },
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
