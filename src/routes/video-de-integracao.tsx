import { createFileRoute } from "@tanstack/react-router";
import {
  ServiceLanding,
  serviceLandingSchemas,
  type ServiceLandingContent,
} from "@/components/site/ServiceLanding";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/video-de-integracao`;
const TITLE = "Vídeo de Integração de Novos Colaboradores · São Paulo";
const DESCRIPTION = "Vídeo de integração e onboarding para RH: boas-vindas, cultura, normas internas e tour pela empresa. Produção em São Paulo, padronizando a chegada de cada novo colaborador.";
const OG_IMAGE = "https://i.ytimg.com/vi/Js0RdcfsXo4/maxresdefault.jpg";

const content: ServiceLandingContent = {
  "breadcrumb": "Vídeo de Integração",
  "h1": "Vídeo de integração de novos colaboradores",
  "intro": "A primeira semana define a percepção que o colaborador terá da empresa. Quando a integração depende da agenda de cada gestor, a mensagem muda de pessoa para pessoa. O vídeo de integração padroniza esse momento: cultura, normas, estrutura e mensagem da liderança são apresentados da mesma forma para todo mundo, no primeiro dia, sem consumir o tempo do RH.",
  "paraQuem": [
    "RH e comunicação interna que recebem novos colaboradores todos os meses.",
    "Empresas com várias unidades, filiais ou equipes em campo.",
    "Operações com alta rotatividade, terceiros ou contratações por safra e projeto.",
    "Companhias em crescimento que precisam preservar a cultura durante a expansão."
  ],
  "quandoUsar": [
    "No primeiro dia do novo colaborador, antes do treinamento técnico.",
    "Na apresentação de código de conduta, normas internas e canais de comunicação.",
    "Na integração de prestadores e terceiros que entram nas instalações.",
    "Em processos de fusão, aquisição ou reposicionamento de marca empregadora."
  ],
  "entregaveis": [
    "Vídeo de boas-vindas com mensagem da liderança.",
    "Tour pelas áreas e apresentação da estrutura da empresa.",
    "Blocos separados por assunto: cultura, benefícios, segurança, conduta.",
    "Legendas e versão para assistir no celular, para quem não tem estação de trabalho.",
    "Arquivos prontos para intranet, portal de RH e plataformas de onboarding."
  ],
  "ctaLabel": "Planejar meu vídeo de integração",
  "ctaLocation": "integracao_page",
  "ctaMessage": "Olá, quero um orçamento de vídeo de integração para o RH da minha empresa.",
  "faqs": [
    {
      "q": "Qual a duração ideal de um vídeo de integração?",
      "a": "Na prática, funciona melhor dividido: um vídeo principal de 3 a 5 minutos com boas-vindas e cultura, e blocos curtos de 1 a 2 minutos por assunto. Assim o RH usa cada parte no momento certo do onboarding."
    },
    {
      "q": "Precisamos de atores?",
      "a": "Não. O melhor resultado vem dos próprios colaboradores e da liderança. Fazemos direção de cena para que a fala saia natural, mesmo com quem nunca gravou."
    },
    {
      "q": "Quantas diárias de gravação são necessárias?",
      "a": "A maioria dos projetos de integração é captada em uma ou duas diárias, com roteiro fechado antes para aproveitar a agenda dos executivos e das áreas."
    },
    {
      "q": "Dá para atualizar o vídeo depois?",
      "a": "Sim. Estruturamos em blocos justamente para permitir trocar um trecho — benefício, norma ou liderança — sem refazer o vídeo inteiro."
    }
  ]
};

const schemas = serviceLandingSchemas({
  url: URL,
  serviceType: "Vídeo de Integração",
  name: content.h1,
  description: DESCRIPTION,
  breadcrumb: content.breadcrumb,
  faqs: content.faqs,
});

export const Route = createFileRoute("/video-de-integracao")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "vídeo de integração, vídeo onboarding colaborador, vídeo de boas-vindas empresa, integração RH em vídeo, vídeo institucional para RH" },
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
