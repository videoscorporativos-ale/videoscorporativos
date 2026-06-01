export type BlogCategory =
  | "Preço e contratação"
  | "Tipos de vídeo"
  | "Eventos e feiras"
  | "Resultado e ROI";

export interface FaqItem {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string; // 1-line summary used in cards
  tldr: string; // "Resposta rápida" — used as meta description
  category: BlogCategory;
  /** Unsplash search term — generates cover image URL automatically */
  coverQuery: string;
  /** Alt text for cover image */
  coverAlt: string;
  /** ISO date string (YYYY-MM-DD) */
  datePublished: string;
  /** ISO date string (YYYY-MM-DD); defaults to datePublished if omitted */
  dateModified?: string;
  /** Article body as HTML (h2/h3, p, ul, ol, strong, a allowed) */
  bodyHtml: string;
  /** Optional FAQ block — rendered + emitted as FAQPage schema */
  faqs?: FaqItem[];
  /** Optional SEO keywords */
  keywords?: string;
}

/**
 * Cover image URL helper — pulls a free photo from Unsplash by search term.
 * Returns a dark-treated, 1600x900 image suitable as a hero cover.
 */
export function coverImageUrl(query: string): string {
  const q = encodeURIComponent(query);
  return `https://source.unsplash.com/featured/1600x900/?${q}`;
}

/**
 * Blog posts. Add new entries here as the user provides article files.
 * Keep slugs URL-safe (lowercase, hyphens, no accents).
 */
export const posts: BlogPost[] = [
  {
    slug: "quanto-custa-um-video-institucional",
    title: "Quanto custa um vídeo institucional? Entenda o que forma o preço",
    excerpt:
      "Não existe tabela fixa: cinco fatores definem o preço de um vídeo institucional. Entenda cada um e peça um orçamento sob medida.",
    tldr:
      "O preço de um vídeo institucional não tem tabela fixa: é definido por cinco fatores — duração e roteiro, número de diárias, locações, tamanho da equipe e nível de pós-produção. O caminho certo é um orçamento sob medida, feito após um briefing rápido. Quanto mais claro o objetivo, mais preciso o orçamento.",
    category: "Preço e contratação",
    coverQuery: "film production camera set",
    coverAlt:
      "Câmera de cinema em set de filmagem profissional preparada para produção de vídeo institucional",
    datePublished: "2026-06-01",
    keywords:
      "quanto custa um vídeo institucional, preço vídeo institucional, orçamento vídeo corporativo, valor produção audiovisual",
    bodyHtml: `
<p>[IMAGEM: cinema camera lens detail]</p>

<h2>Por que não existe um preço único</h2>
<p>[IMAGEM: video production crew working]</p>
<p>Vídeo institucional é um serviço sob medida. Dois projetos de mesma duração podem custar valores bem diferentes conforme o que envolvem. É como pedir o preço de "uma reforma" sem dizer o tamanho do imóvel.</p>
<p>O que mais pesa no orçamento:</p>
<ul>
  <li><strong>Duração e complexidade do roteiro</strong> — um vídeo de 60 segundos com narrativa simples não se compara a um institucional de 5 minutos com múltiplos depoimentos.</li>
  <li><strong>Número de diárias de filmagem</strong> — cada diária mobiliza equipe, equipamento e logística.</li>
  <li><strong>Locações</strong> — gravar em uma sala vs. cobrir três unidades em cidades diferentes muda tudo.</li>
  <li><strong>Tamanho da equipe</strong> — de operador único a equipe completa com direção, câmera, luz e áudio.</li>
  <li><strong>Pós-produção</strong> — edição, color grading, trilha, mixagem e versões para diferentes formatos.</li>
</ul>

<h2>Por que o mais barato costuma sair caro</h2>
<p>[IMAGEM: professional lighting film studio]</p>
<p>A imagem da sua empresa estará nesse vídeo. Produção amadora — áudio ruim, luz fraca, roteiro sem foco — comunica o oposto do que você quer, e o investimento se perde.</p>
<p>Vídeo institucional é um ativo usado por anos, em site, redes, apresentações comerciais e feiras. Trate como investimento, não como despesa a cortar. A diferença entre uma produção feita com critério e uma feita "no jeitinho" aparece já no primeiro segundo de exibição.</p>
`,
    faqs: [
      {
        q: "Como peço um orçamento preciso?",
        a: "Envie um briefing curto com objetivo do vídeo, onde será usado, duração desejada e prazo. Com essas informações devolvemos uma proposta personalizada.",
      },
      {
        q: "O orçamento inclui roteiro?",
        a: "Sim. Roteiro, captação, edição, color grading, trilha sonora e entrega nos formatos finais fazem parte do processo de produção.",
      },
      {
        q: "Quanto tempo leva para produzir um vídeo institucional?",
        a: "Um institucional padrão costuma levar algumas semanas, entre briefing, pré-produção, filmagem e finalização. O prazo é combinado no início do projeto.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}