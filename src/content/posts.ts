export type BlogCategory =
  | "Preço e contratação"
  | "Tipos de vídeo"
  | "Eventos e feiras"
  | "Resultado e ROI"
  | "Retratos Corporativos"
  | "Eventos Corporativos"
  | "Estratégia de Vídeo";

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
  {
    slug: "video-para-feira-de-negocios",
    title: "Vídeo para feira de negócios: como provar o resultado da participação",
    metaTitle: "Vídeo para feira de negócios: como provar o ROI",
    metaDescription:
      "Vídeo para feira de negócios: aftermovie, cobertura e prova de ROI. Veja o que entrega, como planejar e por que vale para qualquer tamanho de estande.",
    excerpt:
      "Feira é investimento caro. O vídeo transforma a presença em ativo que continua trabalhando depois do estande desmontado.",
    tldr:
      "O vídeo de feira registra a participação e gera dois ativos: conteúdo para redes/site (aftermovie) e a prova concreta do investimento. Como feira é cara e difícil de justificar, o vídeo transforma a presença em resultado tangível, que continua trabalhando depois do estande desmontado.",
    category: "Eventos e feiras",
    coverQuery: "trade show business booth exhibition",
    coverAlt:
      "Estande corporativo em feira de negócios com público circulando durante exposição",
    datePublished: "2026-06-05",
    keywords:
      "vídeo para feira de negócios, aftermovie de feira, cobertura de feira corporativa, vídeo evento empresarial, filmagem feira São Paulo, ROI feira de negócios",
    bodyHtml: `
<p>[IMAGEM: trade fair exhibition booth]</p>

<h2>Por que filmar uma feira de negócios</h2>
<p>[IMAGEM: business networking event crowd]</p>
<p>Feiras concentram, em poucos dias, os formadores de opinião do setor. É um investimento alto — estande, equipe, deslocamento, materiais — e costuma sobrar pouca evidência depois. O vídeo de feira captura movimento, conversas, lançamentos e energia do estande, e converte tudo em material reutilizável para meses de comunicação.</p>

<h2>O que o vídeo de feira entrega</h2>
<p>[IMAGEM: videographer filming event]</p>
<p>Quatro ativos saem de uma boa cobertura: <strong>aftermovie</strong> — resumo dinâmico de 60 a 120 segundos, perfeito para site e redes; <strong>prova de investimento</strong> para apresentar à diretoria e justificar a próxima edição; <strong>conteúdo evergreen</strong> (cortes curtos, depoimentos, bastidores) que alimenta campanhas por meses; e <strong>posicionamento de autoridade</strong>, mostrando sua marca no centro do setor.</p>

<h2>O que faz um bom registro de feira</h2>
<p>[IMAGEM: camera operator event coverage]</p>
<p>Planejamento. Agenda do estande mapeada, horários de pico, lançamentos, palestras e as pessoas certas para depoimento definidas antes do primeiro dia. Improviso em feira é perder o momento que não volta — o lançamento já saiu, a autoridade já foi embora, o público já dispersou. Equipe enxuta, mobilidade e leitura rápida do ambiente fazem a diferença entre uma cobertura que serve e uma que sobra.</p>
`,
    faqs: [
      {
        q: "Qual a diferença entre cobertura e aftermovie?",
        a: "Cobertura é a captação durante o evento; aftermovie é o vídeo editado, com narrativa, ritmo e trilha, pronto para divulgação.",
      },
      {
        q: "Quando recebo o material?",
        a: "Aftermovies têm entrega acelerada para aproveitar o calor do evento, geralmente em poucos dias após a feira.",
      },
      {
        q: "Vale para estande pequeno?",
        a: "Sim. Um bom registro valoriza a presença independentemente do tamanho do estande e ajuda a comunicar autoridade no setor.",
      },
    ],
  },
  {
    slug: "o-que-e-video-institucional",
    title: "O que é vídeo institucional e para que serve (com exemplos)",
    metaTitle: "O que é vídeo institucional: definição, usos e exemplos",
    metaDescription:
      "Vídeo institucional é o filme curto que apresenta sua empresa. Entenda o que é, para que serve, exemplos de uso e o que um bom institucional precisa ter.",
    excerpt:
      "Um filme curto que apresenta a empresa e transmite credibilidade. Veja para que serve e como reconhecer um bom institucional.",
    tldr:
      "Vídeo institucional é um filme curto que apresenta a empresa — sua história, valores, estrutura, produtos e diferencial. Serve para transmitir credibilidade ao público externo (clientes, parceiros, investidores) e interno (equipe), e é usado no site, em propostas, redes sociais, eventos e treinamentos.",
    category: "Tipos de vídeo",
    coverQuery: "corporate office team filming",
    coverAlt:
      "Equipe corporativa em escritório durante gravação de vídeo institucional",
    datePublished: "2026-06-06",
    keywords:
      "o que é vídeo institucional, para que serve vídeo institucional, exemplos de vídeo institucional, filme institucional empresa, vídeo corporativo, vídeo de apresentação empresarial",
    bodyHtml: `
<p>[IMAGEM: corporate video filming office]</p>

<h2>Para que serve um vídeo institucional, na prática</h2>
<p>[IMAGEM: business team office collaboration]</p>
<p>O vídeo institucional é, hoje, um dos conteúdos mais versáteis da comunicação corporativa. Em 60 a 120 segundos ele consegue: apresentar a empresa para quem nunca ouviu falar; abrir reuniões comerciais com autoridade; fortalecer propostas e RFPs; ocupar a home do site e o canal do YouTube; integrar novos colaboradores no onboarding; e reforçar a marca em eventos, feiras e convenções.</p>

<h2>Exemplos reais de vídeo institucional</h2>
<p>[IMAGEM: factory industrial tour video]</p>
<p>Alguns recortes recorrentes: a empresa B2B que abre toda reunião com um institucional de 90 segundos; a indústria que mostra a fábrica, o processo produtivo e o controle de qualidade; o escritório de serviços que comunica valores e cultura para atrair talentos; a companhia que celebra um marco — aniversário, expansão, inauguração de nova unidade — e usa o vídeo durante o ano todo.</p>

<h2>O que um bom vídeo institucional precisa ter</h2>
<p>[IMAGEM: film director camera quality]</p>
<p>Quatro elementos não-negociáveis: <strong>mensagem central clara</strong> (uma ideia, não dez), <strong>roteiro enxuto</strong> que respeita o tempo de quem assiste, <strong>captação técnica</strong> impecável em luz e áudio, e um <strong>CTA</strong> que conduz o espectador ao próximo passo. Tudo a serviço de comunicar com clareza e respeitar a reputação da marca — porque um institucional ruim comunica o oposto do que se queria dizer.</p>
`,
    faqs: [
      {
        q: "Vídeo institucional é o mesmo que vídeo publicitário?",
        a: "Não. O institucional apresenta a empresa como um todo; o publicitário vende um produto, serviço ou campanha específica.",
      },
      {
        q: "Qual a duração ideal?",
        a: "Em geral entre 60 segundos e 2 minutos. O suficiente para comunicar a essência sem cansar o espectador.",
      },
      {
        q: "Toda empresa precisa?",
        a: "Qualquer empresa que queira passar credibilidade e profissionalizar a comunicação se beneficia de um bom institucional.",
      },
    ],
  },
  {
    slug: "video-institucional-publicitario-manifesto-diferenca",
    title: "Vídeo institucional, publicitário e manifesto: qual a diferença",
    metaTitle: "Vídeo institucional, publicitário e manifesto: qual a diferença",
    metaDescription:
      "Entenda a diferença entre vídeo institucional, publicitário e manifesto: objetivos, tom e quando usar cada um para sua empresa.",
    excerpt:
      "Institucional apresenta a empresa. Publicitário vende. Manifesto inspira. Veja quando usar cada um.",
    tldr:
      "Institucional apresenta a empresa (história, valores, estrutura). Publicitário vende um produto ou campanha específica, com foco em conversão. Manifesto é emocional e de posicionamento, comunica uma causa ou visão de marca. São objetivos diferentes — escolher o tipo certo começa pelo que você quer alcançar.",
    category: "Tipos de vídeo",
    coverQuery: "film clapperboard director",
    coverAlt: "Claquete de cinema em set de filmagem representando tipos de produção audiovisual",
    datePublished: "2026-06-07",
    keywords:
      "vídeo institucional publicitário manifesto, diferença tipos de vídeo, vídeo institucional vs publicitário, manifesto de marca vídeo",
    bodyHtml: `
<p>[IMAGEM: clapperboard film production]</p>

<h2>As diferenças</h2>
<p>[IMAGEM: video types comparison screens]</p>
<ul>
  <li><strong>Institucional</strong> — quem somos, o que fazemos; tom de credibilidade; uso duradouro.</li>
  <li><strong>Publicitário</strong> — foco num produto/oferta; tom persuasivo; ligado a campanha.</li>
  <li><strong>Manifesto</strong> — emoção e posicionamento; comunica propósito; fortalece identidade.</li>
</ul>

<h2>Como escolher</h2>
<p>[IMAGEM: creative team brainstorm strategy]</p>
<p>Pergunte o objetivo: apresentar a empresa? Institucional. Vender algo específico? Publicitário. Inspirar e posicionar? Manifesto. Muitas vezes uma captação rende versões para mais de um propósito.</p>
`,
    faqs: [
      {
        q: "Posso ter os três?",
        a: "Sim, e às vezes a partir de um mesmo dia de filmagem com bom planejamento.",
      },
      {
        q: "Qual converte mais?",
        a: "O publicitário é o mais direto; o institucional gera confiança que apoia a venda.",
      },
      {
        q: "Manifesto serve para empresa pequena?",
        a: "Sim, quando há um propósito claro a comunicar.",
      },
    ],
  },
  {
    slug: "quanto-tempo-produzir-video-corporativo",
    title: "Quanto tempo leva para produzir um vídeo corporativo",
    metaTitle: "Quanto tempo leva para produzir um vídeo corporativo",
    metaDescription:
      "Prazo de produção de vídeo corporativo: o que define o tempo, as etapas e como acelerar sem perder qualidade.",
    excerpt:
      "O prazo varia com a complexidade. Entenda o que define o tempo e como acelerar sem perder qualidade.",
    tldr:
      "O prazo varia com a complexidade. Um vídeo institucional padrão costuma levar algumas semanas, somando roteiro, pré-produção, captação e finalização. Aftermovies de eventos têm entrega mais rápida. O prazo exato é definido no início, com um cronograma por etapa.",
    category: "Preço e contratação",
    coverQuery: "production schedule planning calendar",
    coverAlt: "Calendário de planejamento de produção audiovisual com cronograma de etapas",
    datePublished: "2026-06-08",
    keywords:
      "quanto tempo produzir vídeo corporativo, prazo vídeo institucional, tempo de produção audiovisual, cronograma vídeo empresa",
    bodyHtml: `
<p>[IMAGEM: calendar schedule planning]</p>

<h2>O que define o prazo</h2>
<p>[IMAGEM: film production planning meeting]</p>
<p>Complexidade do roteiro; número de diárias e locações; disponibilidade de pessoas para gravar; volume de pós-produção (edição, color, trilha, animações); rodadas de revisão.</p>

<h2>As etapas e o tempo</h2>
<p>[IMAGEM: video production stages workflow]</p>
<p>Pré-produção (briefing, roteiro, planejamento) — onde se ganha tempo depois. Captação — concentrada em uma ou mais diárias. Pós-produção — geralmente a fase mais longa, onde o vídeo toma forma.</p>

<h2>Como acelerar sem perder qualidade</h2>
<p>[IMAGEM: team fast workflow office]</p>
<p>Briefing claro desde o início, decisões rápidas nas aprovações, e agenda de gravação bem definida. A maior fonte de atraso é indefinição na pré-produção.</p>
`,
    faqs: [
      {
        q: "Dá para fazer com urgência?",
        a: "Em muitos casos sim, com escopo ajustado; vale conversar.",
      },
      {
        q: "Quantas revisões?",
        a: "Definidas na proposta, para evitar retrabalho sem fim.",
      },
      {
        q: "O cliente precisa participar?",
        a: "Sim, principalmente no briefing e nas aprovações.",
      },
    ],
  },
  {
    slug: "foto-perfil-linkedin-gestor-contratos",
    title: "Por que a foto de perfil do LinkedIn do seu gestor está custando contratos",
    metaTitle: "Foto de perfil no LinkedIn: por que ela custa contratos",
    metaDescription:
      "Uma foto de perfil profissional no LinkedIn pode ser o fator decisivo entre fechar ou perder um negócio. Veja por que e como resolver isso hoje.",
    excerpt:
      "A primeira impressão no LinkedIn acontece em menos de 100 milissegundos. Veja como uma foto de perfil profissional pode ser o fator entre fechar ou perder um negócio.",
    tldr:
      "A foto de perfil do LinkedIn é avaliada em menos de 100 milissegundos. Uma imagem escura, amadora ou com fundo bagunçado comunica descuido antes mesmo da primeira mensagem. O retrato corporativo profissional — com iluminação direcional, expressão confiante e fundo neutro — cria a primeira impressão que abre portas.",
    category: "Retratos Corporativos",
    coverQuery: "professional headshot corporate portrait",
    coverAlt:
      "Retrato corporativo profissional de executivo com fundo neutro e iluminação direcional",
    datePublished: "2026-06-09",
    keywords:
      "foto perfil LinkedIn, retrato corporativo, foto profissional LinkedIn, retrato executivo, imagem corporativa LinkedIn",
    bodyHtml: `
<p>[IMAGEM: man wearing white dress shirt looking at camera]</p>

<h2>O que sua foto comunica sem você saber</h2>
<p>Pesquisas de psicologia da percepção mostram que levamos menos de 100 milissegundos para formar uma primeira impressão de uma face. Competência, confiança e simpatia são julgadas antes de você dizer uma palavra.</p>
<p>Uma foto escura, com expressão tensa, fundo bagunçado ou tirada por celular comunica:</p>
<ul>
  <li>Descuido com a própria imagem</li>
  <li>Desorganização</li>
  <li>Amadorismo</li>
</ul>
<p>Mesmo que não seja a realidade, é o que a foto diz.</p>

<p>[IMAGEM: woman in black blazer smiling looking at camera]</p>

<h2>O retrato corporativo profissional: o que faz diferença</h2>
<p><strong>Iluminação:</strong> suave, direcional, sem sombras agressivas.</p>
<p><strong>Expressão:</strong> acessível mas séria. Confiante mas não arrogante.</p>
<p><strong>Fundo:</strong> neutro ou levemente desfocado (bokeh) para destacar o rosto.</p>
<p><strong>Enquadramento:</strong> meio-busto, levemente lateralizado. Nunca full-face frontal.</p>
<p><strong>Roupa:</strong> adequada ao setor — executivo, criativo ou técnico.</p>

<p>[IMAGEM: people in front of light source]</p>

<h2>Quantas fotos você precisa?</h2>
<p>Para uso profissional completo (LinkedIn, site, apresentações, crachá, press kit), recomendo no mínimo:</p>
<ul>
  <li>3 variações de expressão</li>
  <li>2 enquadramentos (busto e meio-corpo)</li>
  <li>2 opções de fundo ou locação</li>
</ul>
<p>Uma sessão bem planejada entrega tudo isso em 60-90 minutos.</p>

<p>[IMAGEM: photography of woman in pink top]</p>

<p>👉 <strong>Veja também:</strong> <a href="https://videoscorporativos.com.br/blog/linkedin-video-corporativo-oportunidades-b2b">Vídeo de apresentação pessoal para LinkedIn: o complemento perfeito do retrato</a> — foto + vídeo curto de apresentação criam uma presença profissional imbatível.</p>

<p><a href="/#contato">Agende sua sessão de retratos corporativos →</a></p>
`,
  },
  {
    slug: "fotografia-eventos-corporativos-briefing",
    title: "Fotografia de eventos corporativos: o que seu fotógrafo precisa saber antes de chegar",
    metaTitle: "Fotografia de eventos corporativos: briefing completo",
    metaDescription:
      "Briefing inadequado é a causa número 1 de decepção com fotógrafos de eventos. Veja o checklist completo que garante imagens que contam a história do seu evento.",
    excerpt:
      "Briefing inadequado é a causa número 1 de decepção com fotógrafos de eventos. Veja o checklist que garante imagens que contam a história.",
    tldr:
      "A maioria das decepções com fotografia de evento corporativo começa no briefing. Comunicar o propósito do evento, os VIPs, os momentos obrigatórios, o uso das imagens e o prazo de entrega transforma um registro genérico em uma narrativa visual que conta a história do evento.",
    category: "Eventos Corporativos",
    coverQuery: "corporate event photographer camera auditorium",
    coverAlt:
      "Fotógrafo profissional com câmera em auditório de evento corporativo",
    datePublished: "2026-06-10",
    keywords:
      "fotografia eventos corporativos, briefing fotógrafo evento, cobertura fotográfica empresa, fotógrafo evento corporativo, fotografia convenção",
    bodyHtml: `
<p>[IMAGEM: photographer dslr camera corporate event auditorium]</p>

<h2>O briefing que transforma um fotógrafo em contador de histórias</h2>
<p>Antes de qualquer evento, o fotógrafo precisa saber:</p>
<ol>
  <li><strong>Qual é o propósito do evento?</strong> (aniversário de empresa, lançamento, convenção?)</li>
  <li><strong>Quem são os VIPs?</strong> (CEO, diretor, palestrante principal — eles precisam de atenção especial)</li>
  <li><strong>Quais momentos são obrigatórios?</strong> (assinatura de contrato, entrega de prêmio, discurso de abertura)</li>
  <li><strong>Onde as fotos vão ser usadas?</strong> (redes sociais, press release, relatório anual?)</li>
  <li><strong>Qual o prazo de entrega?</strong></li>
</ol>

<p>[IMAGEM: corporate event stage logo illuminated podium]</p>

<h2>O que diferencia uma cobertura comum de uma cobertura memorável</h2>
<p>Fotografia de evento não é documentação — é narrativa. O fotógrafo que entende isso busca:</p>
<ul>
  <li><strong>O momento antes do momento:</strong> o nervosismo dos bastidores</li>
  <li><strong>A reação da plateia:</strong> o riso, o aplauso, a surpresa</li>
  <li><strong>Os detalhes que contam a escala:</strong> o salão visto de cima, a mesa de coffee fartamente servida</li>
  <li><strong>Os encontros nos corredores:</strong> onde os negócios reais acontecem</li>
</ul>

<p>[IMAGEM: corporate event audience applause genuine reaction]</p>

<h2>Por que contratar fotografia e vídeo do mesmo profissional</h2>
<p>Quando foto e vídeo vêm do mesmo produtor, a narrativa é coerente, a logística de produção no dia é mais limpa e o custo total é menor.</p>

<p>[IMAGEM: photographer videographer side by side corporate event production]</p>

<p>👉 <strong>Veja também:</strong> <a href="https://videoscorporativos.com.br/blog/cobertura-eventos-corporativos-video-guia">Cobertura de eventos corporativos em vídeo: o guia definitivo</a> — tudo que você precisa saber sobre a parte audiovisual do seu evento.</p>

<p><a href="/#contato">Próximo evento? Vamos conversar →</a></p>
`,
  },
  {
    slug: "video-corporativo-afastando-clientes",
    title: "Seu vídeo corporativo está afastando clientes — e você nem sabe disso",
    metaDescription:
      "Descubra por que vídeos corporativos mal produzidos custam mais do que você imagina — e como corrigir isso antes do próximo evento da sua empresa.",
    excerpt:
      "Vídeos corporativos mal produzidos custam mais do que você imagina. Veja os 5 sinais de alerta e como um vídeo profissional transforma resultados.",
    tldr:
      "Um vídeo corporativo mal produzido é pior do que não ter vídeo: comunica descuido e amadorismo. Os principais sinais de alerta são áudio ruim, iluminação fraca, roteiro genérico, falta de CTA e ausência de legendas. Um vídeo profissional transfere confiança e pode aumentar a conversão em até 80%.",
    category: "Estratégia de Vídeo",
    coverQuery: "frustrated businessman laptop video corporate",
    coverAlt:
      "Empresário frustrado assistindo vídeo corporativo em notebook",
    datePublished: "2026-06-11",
    keywords:
      "vídeo corporativo ruim, erros vídeo institucional, vídeo afastando clientes, produção audiovisual profissional, briefing estratégico vídeo",
    bodyHtml: `
<p>Você já entrou num site de uma empresa, assistiu ao vídeo institucional e saiu antes de terminar? Pois é. Seus clientes também fazem isso.</p>

<p>A verdade que ninguém conta: um vídeo corporativo ruim é pior do que não ter vídeo nenhum. Ele comunica descuido, amadorismo e falta de seriedade — exatamente o oposto do que sua empresa quer transmitir.</p>

<p>[IMAGEM: businessman frustrated watching video laptop corporate]</p>

<h2>O custo invisível do vídeo mal feito</h2>

<p>Pense assim: você investiu R$ 3.000 num vídeo caseiro feito pelo sobrinho. Parece economia, certo? Mas e se esse vídeo estiver na homepage que recebe 2.000 acessos por mês? E se 30% dessas pessoas saírem antes de 10 segundos porque o áudio está ruim e a imagem tremendo?</p>

<p>Você está perdendo contratos que nunca saberá que existiram.</p>

<p>[IMAGEM: corporate meeting room modern executives discussion]</p>

<h2>Os 5 sinais de que seu vídeo está te prejudicando</h2>

<ol>
  <li><strong>Áudio com eco ou chiado</strong> — soa como gravação de celular num corredor</li>
  <li><strong>Iluminação amarelada ou com sombras duras</strong> — envelhece sua marca 10 anos</li>
  <li><strong>Roteiro genérico</strong> — "somos uma empresa com foco no cliente" não convence ninguém</li>
  <li><strong>Sem chamada para ação clara</strong> — o espectador termina sem saber o que fazer</li>
  <li><strong>Sem legendas ou sem versão vertical</strong> — invisível para 60% dos usuários mobile</li>
</ol>

<p>[IMAGEM: professional camera studio setup corporate production]</p>

<h2>O que um vídeo profissional realmente entrega</h2>

<p>Não é apenas imagem bonita. É confiança transferida. É o tomador de decisão do outro lado da tela sentindo que pode confiar na sua empresa antes mesmo de falar com você.</p>

<p>Estudos da Forbes e HubSpot mostram que landing pages com vídeo convertem até 80% mais. No mercado B2B brasileiro, onde a decisão de compra passa por 3 a 7 pessoas, um vídeo corporativo bem feito é o vendedor que trabalha 24h por dia.</p>

<p>[IMAGEM: professional recording testimonial corporate lighting]</p>

<h2>Por onde começar?</h2>

<p>Se você quer entender qual tipo de vídeo faz mais sentido para o momento da sua empresa — institucional, depoimento de clientes, vídeo de produto ou cobertura de evento — o primeiro passo é um briefing estratégico.</p>

<p>👉 <strong>Veja também:</strong> <a href="https://alefotografos.com.br/blog/fotografia-eventos-corporativos-conteudo">Como fotografar eventos corporativos para gerar conteúdo de alto impacto</a> — porque foto e vídeo juntos multiplicam o resultado.</p>

<p><strong>Quer saber o que um vídeo profissional custaria para a sua empresa?</strong></p>

<p><a href="/#contato">Solicite um orçamento sem compromisso →</a></p>
`,
  },
  {
    slug: "video-institucional-vs-video-de-vendas",
    title: "Vídeo institucional vs. vídeo de vendas: qual a sua empresa precisa agora?",
    metaTitle: "Vídeo institucional vs. vídeo de vendas: qual usar?",
    metaDescription:
      "Entenda a diferença real entre vídeo institucional e vídeo de vendas — e descubra qual formato vai gerar mais resultado para o momento do seu negócio.",
    excerpt:
      "Descubra a diferença entre vídeo institucional e vídeo de vendas, e qual formato gera mais resultado para o momento do seu negócio.",
    tldr:
      "Vídeo institucional constrói autoridade e confiança na empresa. Vídeo de vendas acelera a decisão de compra. As empresas que crescem usam os dois em momentos diferentes da jornada do cliente.",
    category: "Tipos de vídeo",
    coverQuery: "corporate video screens comparison business",
    coverAlt:
      "Monitores lado a lado exibindo cenas de vídeo corporativo diferente",
    datePublished: "2026-06-12",
    keywords:
      "vídeo institucional, vídeo de vendas, vídeo institucional vs vendas, tipos de vídeo corporativo, vídeo B2B, vídeo comercial",
    bodyHtml: `
<p>Quando uma empresa decide investir em vídeo, a primeira pergunta quase sempre é: "Mas que tipo de vídeo eu preciso?"</p>

<p>É uma pergunta excelente — e a resposta errada pode desperdiçar todo o investimento.</p>

<p>[IMAGEM: two monitors side by side different video scenes office]</p>

<h2>Vídeo Institucional: construindo autoridade</h2>

<p>O <a href="/blog/video-institucional-vale-a-pena">vídeo institucional</a> é o cartão de visitas audiovisual da sua empresa. Ele responde a pergunta: <strong>"Quem vocês são e por que devo confiar em você?"</strong></p>

<p>Ideal para:</p>

<ul>
  <li>Homepage do site</li>
  <li>Apresentações comerciais</li>
  <li><a href="/blog/video-para-feira-de-negocios">Stands em feiras e eventos</a></li>
  <li>Prospecção B2B</li>
  <li>Candidatos a vagas de emprego</li>
</ul>

<p>[IMAGEM: executive presenting corporate meeting room audience]</p>

<h2>Vídeo de Vendas: acelerando decisões</h2>

<p>O vídeo de vendas tem uma função cirúrgica: <strong>mover o prospect de "estou interessado" para "quero comprar"</strong>. Ele fala de dor, solução e resultado — nessa ordem.</p>

<p>Ideal para:</p>

<ul>
  <li><a href="/blog/video-corporativo-afastando-clientes">Landing pages de produtos/serviços</a></li>
  <li>Sequências de email marketing</li>
  <li>Propostas comerciais</li>
  <li>WhatsApp de vendedores</li>
  <li>Remarketing no YouTube e Instagram</li>
</ul>

<p>[IMAGEM: sales funnel graph laptop screen business growth]</p>

<h2>A combinação que empresas inteligentes usam</h2>

<p>As empresas que crescem mais rápido não escolhem entre um ou outro — elas usam os dois em momentos diferentes da jornada do cliente.</p>

<p>Um prospect descobre sua empresa → assiste ao vídeo institucional e confia.</p>

<p>Ele entra na página de serviços → assiste ao vídeo de vendas e decide.</p>

<p>[IMAGEM: customer journey funnel discovery consideration decision]</p>

<h2>Quanto custa cada um?</h2>

<p>Os valores variam com complexidade, locação, número de dias de gravação e pós-produção. Para entender em detalhe como o orçamento é montado, veja <a href="/blog/quanto-custa-um-video-institucional">quanto custa um vídeo institucional</a>. O que posso garantir: o custo de <strong>não ter</strong> um bom vídeo é sempre maior.</p>

<p>👉 <strong>Veja também:</strong> <a href="https://alefotografos.com.br/blog/fotografia-corporativa-estrategia-de-conteudo">Como a fotografia corporativa complementa sua estratégia de vídeo</a> — fotos e vídeo do mesmo evento criam um arsenal de conteúdo imbatível.</p>

<p><a href="/#contato">Fale comigo e descubra qual formato é ideal para você →</a></p>
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}