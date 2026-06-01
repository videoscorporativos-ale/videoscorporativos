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
  /** Optional SEO title (≤60 chars). Falls back to `title` if omitted. */
  metaTitle?: string;
  excerpt: string; // 1-line summary used in cards
  tldr: string; // "Resposta rápida" — used as meta description
  /** Optional SEO description (≤160 chars). Falls back to `tldr` if omitted. */
  metaDescription?: string;
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
  // Deterministic, always-available cover image. Uses the query as a seed so
  // each post keeps a consistent picture across reloads. (source.unsplash.com
  // was discontinued by Unsplash and no longer serves images.)
  const seed = encodeURIComponent(query.trim().toLowerCase().replace(/\s+/g, "-"));
  return `https://picsum.photos/seed/${seed}/1600/900`;
}

/**
 * Blog posts. Add new entries here as the user provides article files.
 * Keep slugs URL-safe (lowercase, hyphens, no accents).
 */
export const posts: BlogPost[] = [
  {
    slug: "quanto-custa-um-video-institucional",
    title: "Quanto custa um vídeo institucional? Entenda o que forma o preço",
    metaTitle: "Quanto custa um vídeo institucional? Guia 2026",
    metaDescription:
      "Preço de vídeo institucional não tem tabela fixa: depende de duração, diárias, locações, equipe e pós. Veja como é formado e peça orçamento sob medida.",
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
  {
    slug: "como-escolher-uma-produtora-de-video",
    title: "Como escolher uma produtora de vídeo: checklist em 7 pontos",
    metaTitle: "Como escolher produtora de vídeo: checklist em 7 pontos",
    metaDescription:
      "Checklist em 7 pontos para escolher uma produtora de vídeo: portfólio, experiência, processo, orçamento, prazo, prova social e a primeira conversa.",
    excerpt:
      "Sete critérios objetivos para escolher uma produtora de vídeo sem se arrepender — do portfólio à química na primeira conversa.",
    tldr:
      "Avalie sete pontos: portfólio real, experiência comprovada, clareza do processo, transparência no orçamento, prazo definido, prova social e a química na primeira conversa. Como vídeo é um serviço intangível — você paga antes de ver o resultado — a prova de trabalho anterior é o que mais reduz o risco.",
    category: "Preço e contratação",
    coverQuery: "videographer professional meeting client",
    coverAlt:
      "Reunião de videomaker profissional com cliente discutindo projeto de vídeo institucional",
    datePublished: "2026-06-02",
    keywords:
      "como escolher produtora de vídeo, checklist produtora audiovisual, contratar produtora vídeo institucional",
    bodyHtml: `
<p>[IMAGEM: business meeting handshake office]</p>

<h2>Por que essa escolha assusta</h2>
<p>[IMAGEM: person searching laptop decision]</p>
<p>Você compra algo que ainda não existe e que vai carregar a imagem da empresa. Com dezenas de opções e preços que variam muito, a pergunta é: em quem confiar? O checklist torna a decisão racional.</p>

<h2>O checklist de 7 pontos</h2>
<p>[IMAGEM: checklist clipboard planning]</p>
<ol>
  <li><strong>Portfólio real e verificável</strong> — veja o que a produtora entregou; é o padrão que você pode esperar.</li>
  <li><strong>Experiência de estrada</strong> — anos de mercado significam imprevistos já resolvidos.</li>
  <li><strong>Processo claro</strong> — quem explica as fases dá previsibilidade.</li>
  <li><strong>Transparência no orçamento</strong> — o que está incluso e o que gera extra.</li>
  <li><strong>Prazo definido</strong> — cronograma com cada etapa.</li>
  <li><strong>Prova social</strong> — avaliações, depoimentos e clientes reais.</li>
  <li><strong>A primeira conversa</strong> — quem entende o objetivo antes do preço entrega melhor.</li>
</ol>
`,
    faqs: [
      {
        q: "Devo escolher a mais barata?",
        a: "Nem sempre. O barato sai caro quando o vídeo não diferencia sua empresa ou compromete a imagem da marca.",
      },
      {
        q: "Quantas produtoras devo consultar?",
        a: "Algumas, comparando processo e portfólio, não só preço. Duas ou três propostas costumam dar uma visão clara do mercado.",
      },
      {
        q: "Experiência conta muito?",
        a: "Sim. Décadas de trabalho corporativo significam equipes que já lidaram com quase todo tipo de imprevisto e formato.",
      },
    ],
  },
  {
    slug: "video-institucional-vale-a-pena",
    title: "Vídeo institucional vale a pena? O retorno que ele traz",
    metaTitle: "Vídeo institucional vale a pena? Entenda o ROI",
    metaDescription:
      "Vídeo institucional é ativo de longa duração: comunica credibilidade, apoia vendas e é usado por anos. Entenda onde aparece o retorno.",
    excerpt:
      "Um institucional é ativo, não despesa. Veja onde o retorno aparece e como justificar o investimento internamente.",
    tldr:
      "Sim. Um institucional bem produzido é um ativo de longa duração: comunica credibilidade em segundos e é usado por anos no site, propostas, redes, apresentações e eventos. O custo se dilui ao longo do uso; o retorno aparece em percepção de marca e geração de oportunidades.",
    category: "Resultado e ROI",
    coverQuery: "business presentation video screen",
    coverAlt:
      "Apresentação corporativa com vídeo institucional sendo exibido em tela para audiência empresarial",
    datePublished: "2026-06-03",
    keywords:
      "vídeo institucional vale a pena, ROI vídeo corporativo, retorno vídeo institucional, investimento audiovisual",
    bodyHtml: `
<p>[IMAGEM: corporate video screen presentation]</p>

<h2>O vídeo é um ativo, não uma despesa</h2>
<p>[IMAGEM: business growth investment chart]</p>
<p>Um único institucional abre reuniões, fortalece propostas, ocupa a home, alimenta o LinkedIn e serve em eventos. Dividido por todos os usos ao longo de anos, o custo por uso é baixo.</p>

<h2>Onde o retorno aparece</h2>
<p>[IMAGEM: business team success meeting]</p>
<p>Credibilidade imediata; apoio ao comercial (proposta com vídeo se diferencia); presença digital (alcance e engajamento); durabilidade (não expira como um anúncio).</p>

<h2>Como justificar internamente</h2>
<p>[IMAGEM: business report presentation boardroom]</p>
<p>Enquadre pelo uso e durabilidade, não pelo custo isolado. Liste onde será aplicado e por quanto tempo: um ativo usado por três anos em cinco canais tem custo por uso muito baixo.</p>
`,
    faqs: [
      {
        q: "Vídeo institucional aumenta vendas diretamente?",
        a: "Apoia a venda. Para conversões diretas, combine com vídeos de produto, cases e depoimentos que falem do problema específico do cliente.",
      },
      {
        q: "Qual a vida útil de um vídeo institucional?",
        a: "Anos, se produzido sem elementos datados como datas, prêmios pontuais ou pessoas que podem sair da empresa.",
      },
      {
        q: "Vale a pena para empresa pequena?",
        a: "Sim. Um institucional bem feito ajuda a competir visualmente no nível das grandes e profissionaliza a imagem da marca.",
      },
    ],
  },
  {
    slug: "erros-comuns-em-videos-institucionais",
    title: "7 erros comuns em vídeos institucionais (e como evitá-los)",
    metaTitle: "7 erros em vídeos institucionais e como evitá-los",
    metaDescription:
      "Os 7 erros mais comuns em vídeo institucional: longo demais, sem roteiro, áudio e luz amadores, sem CTA e mais. Veja como evitar cada um.",
    excerpt:
      "Os erros que mais arruínam um institucional — e o método de planejamento que evita quase todos.",
    tldr:
      "Os erros mais comuns: vídeo longo demais, sem roteiro/briefing, áudio e luz amadores, falta de foco, sem CTA, economizar na produção e não definir público. Quase todos nascem de começar a gravar sem planejamento. Um bom briefing previne a maioria.",
    category: "Tipos de vídeo",
    coverQuery: "video editing timeline screen",
    coverAlt:
      "Tela de edição de vídeo profissional com timeline mostrando processo de pós-produção",
    datePublished: "2026-06-04",
    keywords:
      "erros vídeo institucional, problemas produção audiovisual, como evitar erro em vídeo corporativo",
    bodyHtml: `
<p>[IMAGEM: video editing software screen]</p>

<h2>Os 7 erros</h2>
<p>[IMAGEM: film set mistakes production]</p>
<ol>
  <li><strong>Vídeo longo e cansativo</strong> — o "vídeo novela" perde o espectador nos primeiros minutos.</li>
  <li><strong>Sem roteiro e briefing</strong> — vira vídeo disperso, com retrabalho na edição.</li>
  <li><strong>Áudio e iluminação amadores</strong> — o que mais denuncia uma produção fraca.</li>
  <li><strong>Falta de foco</strong> — um vídeo, uma mensagem central.</li>
  <li><strong>Sem CTA</strong> — perde a chance de converter atenção em contato.</li>
  <li><strong>Economizar no lugar errado</strong> — pode depor contra a própria empresa.</li>
  <li><strong>Não definir público</strong> — tom e linguagem erram o alvo.</li>
</ol>

<h2>A raiz de tudo: planejamento</h2>
<p>[IMAGEM: script planning storyboard desk]</p>
<p>Quase todos os erros acontecem antes da câmera ligar. Briefing, público e roteiro reduzem retrabalho, encurtam prazo e elevam o resultado.</p>
`,
    faqs: [
      {
        q: "Qual a duração ideal de um vídeo institucional?",
        a: "Em geral entre 60 segundos e 2 minutos, dependendo do canal e da mensagem. Acima disso, o engajamento cai rápido.",
      },
      {
        q: "Posso gravar com celular?",
        a: "Para rede social simples às vezes funciona. Para institucional raramente — limitações de luz e áudio aparecem e prejudicam a imagem da marca.",
      },
      {
        q: "Como evito retrabalho na produção?",
        a: "Briefing claro e alinhamento na pré-produção. Decidir mensagem, público e formato antes de gravar evita 90% dos retrabalhos.",
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