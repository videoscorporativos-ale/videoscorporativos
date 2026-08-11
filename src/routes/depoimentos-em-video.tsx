import { createFileRoute } from "@tanstack/react-router";
import {
  ServiceLanding,
  serviceLandingSchemas,
  type ServiceLandingContent,
} from "@/components/site/ServiceLanding";

const SITE = "https://videoscorporativos.com.br";
const URL = `${SITE}/depoimentos-em-video`;
const TITLE = "Depoimentos em Vídeo de Clientes · Produção em São Paulo";
const DESCRIPTION = "Produção de depoimentos em vídeo de clientes para vendas B2B: condução da entrevista, áudio limpo e cortes de 30s, 60s e versão completa. São Paulo e todo o Brasil.";
const OG_IMAGE = "https://i.ytimg.com/vi/3oqAVErx48w/maxresdefault.jpg";

const content: ServiceLandingContent = {
  "breadcrumb": "Depoimentos em Vídeo",
  "h1": "Depoimentos em vídeo de clientes",
  "intro": "Em venda B2B, o comprador confia mais em outro cliente do que em qualquer material da empresa. O depoimento em vídeo entrega essa prova com rosto, nome e contexto — algo que um texto no site não sustenta. Conduzimos a entrevista para extrair o que interessa ao seu funil: o problema antes, a decisão e o resultado obtido.",
  "paraQuem": [
    "Times comerciais B2B com ciclo de venda longo e necessidade de referência.",
    "Marketing que precisa de prova real para landing pages, propostas e campanhas.",
    "Empresas que já têm clientes satisfeitos, mas nada registrado em vídeo.",
    "Escritórios, clínicas e prestadores de serviço que vendem por confiança."
  ],
  "quandoUsar": [
    "Na etapa final do funil, quando o cliente pede referências antes de fechar.",
    "Em propostas e apresentações comerciais.",
    "No lançamento de um serviço que ainda precisa provar resultado.",
    "Em eventos e feiras, aproveitando a presença dos clientes no mesmo local."
  ],
  "entregaveis": [
    "Roteiro de perguntas alinhado ao seu argumento de venda.",
    "Condução e direção do entrevistado, inclusive de quem não é acostumado a câmera.",
    "Captação com iluminação e áudio dedicados, no escritório do cliente ou no evento.",
    "Corte completo de 2 a 3 minutos, mais versões de 60s e 30s.",
    "Cortes verticais com legendas para LinkedIn, Reels e tráfego pago."
  ],
  "ctaLabel": "Quero gravar depoimentos de clientes",
  "ctaLocation": "depoimentos_page",
  "ctaMessage": "Olá, quero um orçamento para gravar depoimentos em vídeo de clientes.",
  "faqs": [
    {
      "q": "Quantos depoimentos dá para gravar em um dia?",
      "a": "Com agenda organizada no mesmo local, é comum gravar de três a cinco depoimentos em uma diária. Em eventos e feiras esse número pode ser maior, porque os clientes já estão no lugar."
    },
    {
      "q": "E se o cliente ficar travado na frente da câmera?",
      "a": "Isso é a regra, não a exceção. A entrevista é conduzida em conversa, sem decoreba, e a edição aproveita as melhores passagens. Mais de 30 anos dirigindo executivos em foto e vídeo ajudam nessa parte."
    },
    {
      "q": "Vocês gravam no escritório do meu cliente?",
      "a": "Sim. Levamos estrutura compacta de luz e áudio para gravar na empresa do seu cliente, em São Paulo, Grande SP ou outra cidade, com o mínimo de ocupação de agenda dele."
    },
    {
      "q": "Precisamos de autorização de imagem?",
      "a": "Sim, e nós fornecemos o termo de autorização de uso de imagem para o entrevistado assinar antes da gravação."
    }
  ]
};

const schemas = serviceLandingSchemas({
  url: URL,
  serviceType: "Depoimentos em Vídeo",
  name: content.h1,
  description: DESCRIPTION,
  breadcrumb: content.breadcrumb,
  faqs: content.faqs,
});

export const Route = createFileRoute("/depoimentos-em-video")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "depoimento em vídeo, depoimento de cliente em vídeo, vídeo de case de sucesso, prova social em vídeo, gravação de depoimento São Paulo" },
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
