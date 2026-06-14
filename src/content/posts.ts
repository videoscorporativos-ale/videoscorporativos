export type BlogCategory =
  | "Preço e contratação"
  | "Tipos de vídeo"
  | "Eventos e feiras"
  | "Resultado e ROI"
  | "Retratos Corporativos"
  | "Eventos Corporativos"
  | "Estratégia de Vídeo"
  | "Mercado & Tendências";

export interface FaqItem {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle?: string;
  excerpt: string;
  tldr: string;
  metaDescription?: string;
  category: BlogCategory;
  /** Bank key (e.g. "M2") or Unsplash search term. */
  coverQuery: string;
  coverAlt: string;
  datePublished: string;
  dateModified?: string;
  bodyHtml: string;
  faqs?: FaqItem[];
  keywords?: string;
}

/**
 * Verified Unsplash CDN image bank (commercial use, no attribution required).
 * Keys map to direct CDN URLs that never change to a wrong photo.
 */
export const IMAGE_BANK: Record<string, string> = {
  // Reuniões / executivos / corporativo
  M1: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
  M2: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
  M3: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e",
  M4: "https://images.unsplash.com/photo-1568992687947-868a62a9f521",
  M5: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4",
  M6: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a",
  M7: "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325",
  M8: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885",
  M9: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
  M10: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13",
  M11: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407",
  M12: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0",
  // Prédios / skyline / aérea
  B1: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
  B2: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2",
  // Vídeo / câmera / produção
  V1: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
  V2: "https://images.unsplash.com/photo-1625690303837-654c9666d2d0",
  V3: "https://images.unsplash.com/photo-1576280314550-773c50583407",
  V4: "https://images.unsplash.com/photo-1612548403247-aa2873e9422d",
  V5: "https://images.unsplash.com/photo-1553166272-e69910ab5ae1",
  V6: "https://images.unsplash.com/photo-1632187989763-c9c620420b4d",
  V7: "https://images.unsplash.com/photo-1485662543942-9ab24cc0acf0",
  V8: "https://images.unsplash.com/photo-1535540878298-a155c6d065ef",
  V9: "https://images.unsplash.com/photo-1577190651915-bf62d54d5b36",
  // Edição / pós-produção / telas
  E1: "https://images.unsplash.com/photo-1528109966604-5a6a4a964e8d",
  E2: "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7",
  E3: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d",
  E4: "https://images.unsplash.com/photo-1497015289639-54688650d173",
  // Eventos / auditório
  EV1: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
  EV2: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
  EV3: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69",
  EV4: "https://images.unsplash.com/photo-1596522354195-e84ae3c98731",
  // Hotelaria
  H1: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6",
  H2: "https://images.unsplash.com/photo-1621293954908-907159247fc8",
  // Imobiliário / interiores
  R1: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b",
  R2: "https://images.unsplash.com/photo-1635108197198-63277d473c68",
  R3: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff",
  // Indústria / logística
  I1: "https://images.unsplash.com/photo-1716643863806-989dd76ae093",
  I2: "https://images.unsplash.com/photo-1610891015188-5369212db097",
  // Saúde / farmacêutico
  HC1: "https://images.unsplash.com/photo-1551601651-2a8555f1a136",
};

const BANK_KEY_RE = /^[A-Z]+\d+$/;

/**
 * Returns a CDN URL for either a bank key (e.g. "M2") or a free-text Unsplash query.
 * @param keyOrQuery - bank key like "M2" or descriptive search term
 * @param width - target width (default 1600 for covers; pass 800 for inline)
 */
export function coverImageUrl(keyOrQuery: string, width = 1600): string {
  const trimmed = keyOrQuery.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    // Direct CDN URL: swap or add w= param
    if (/[?&]w=\d+/.test(trimmed)) return trimmed.replace(/([?&]w=)\d+/, `$1${width}`);
    return trimmed + (trimmed.includes("?") ? "&" : "?") + `w=${width}&q=80&auto=format&fit=crop`;
  }
  if (BANK_KEY_RE.test(trimmed) && IMAGE_BANK[trimmed]) {
    return `${IMAGE_BANK[trimmed]}?w=${width}&q=80&auto=format&fit=crop`;
  }
  const seed = encodeURIComponent(trimmed.toLowerCase().replace(/\s+/g, "-"));
  return `https://picsum.photos/seed/${seed}/${width}/${Math.round((width * 9) / 16)}`;
}

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
    coverQuery: "V2",
    coverAlt:
      "Câmera profissional em tripé para produção de vídeo institucional",
    datePublished: "2026-06-01",
    keywords:
      "quanto custa um vídeo institucional, preço vídeo institucional, orçamento vídeo corporativo, valor produção audiovisual",
    bodyHtml: `
<p>[IMAGEM: E2 | alt: Análise de investimento em vídeo institucional]</p>

<h2>Por que não existe um preço único</h2>
<p>[IMAGEM: V6 | alt: Equipe de produção de vídeo corporativo em set]</p>
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
<p>[IMAGEM: M7 | alt: Fechamento de contrato corporativo entre empresas]</p>
<p>A imagem da sua empresa estará nesse vídeo. Produção amadora — áudio ruim, luz fraca, roteiro sem foco — comunica o oposto do que você quer, e o investimento se perde.</p>
<p>[IMAGEM: V5 | alt: Câmera profissional de vídeo em estúdio]</p>
<p>Vídeo institucional é um ativo usado por anos, em site, redes, apresentações comerciais e feiras. Trate como investimento, não como despesa a cortar.</p>
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
        a: "Um institucional padrão costuma levar algumas semanas, entre briefing, pré-produção, filmagem e finalização.",
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
      "Avalie sete pontos: portfólio real, experiência comprovada, clareza do processo, transparência no orçamento, prazo definido, prova social e a química na primeira conversa.",
    category: "Preço e contratação",
    coverQuery: "M7",
    coverAlt:
      "Reunião para escolha de produtora de vídeo corporativo",
    datePublished: "2026-06-02",
    keywords:
      "como escolher produtora de vídeo, checklist produtora audiovisual, contratar produtora vídeo institucional",
    bodyHtml: `
<p>[IMAGEM: M7 | alt: Reunião para escolha de produtora de vídeo]</p>

<h2>Por que essa escolha assusta</h2>
<p>[IMAGEM: M6 | alt: Briefing com produtora de vídeo corporativo]</p>
<p>Você compra algo que ainda não existe e que vai carregar a imagem da empresa. Com dezenas de opções e preços que variam muito, a pergunta é: em quem confiar? O checklist torna a decisão racional.</p>

<h2>O checklist de 7 pontos</h2>
<p>[IMAGEM: M1 | alt: Executivos em reunião analisando portfólio]</p>
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
      "Sim. Um institucional bem produzido é um ativo de longa duração: comunica credibilidade em segundos e é usado por anos no site, propostas, redes, apresentações e eventos.",
    category: "Resultado e ROI",
    coverQuery: "M10",
    coverAlt:
      "Apresentação corporativa com vídeo institucional sendo exibido para audiência",
    datePublished: "2026-06-03",
    keywords:
      "vídeo institucional vale a pena, ROI vídeo corporativo, retorno vídeo institucional, investimento audiovisual",
    bodyHtml: `
<p>[IMAGEM: M10 | alt: Plateia ouvindo apresentação corporativa]</p>

<h2>O vídeo é um ativo, não uma despesa</h2>
<p>[IMAGEM: E3 | alt: Painel de métricas de vídeo corporativo]</p>
<p>Um único institucional abre reuniões, fortalece propostas, ocupa a home, alimenta o LinkedIn e serve em eventos. Dividido por todos os usos ao longo de anos, o custo por uso é baixo.</p>

<h2>Onde o retorno aparece</h2>
<p>[IMAGEM: M3 | alt: Equipe em ambiente corporativo de sucesso]</p>
<p>Credibilidade imediata; apoio ao comercial; presença digital; durabilidade — não expira como um anúncio.</p>

<h2>Como justificar internamente</h2>
<p>[IMAGEM: M8 | alt: Apresentação para diretoria em sala de reunião]</p>
<p>Enquadre pelo uso e durabilidade, não pelo custo isolado. Um ativo usado por três anos em cinco canais tem custo por uso muito baixo.</p>
`,
    faqs: [
      {
        q: "Vídeo institucional aumenta vendas diretamente?",
        a: "Apoia a venda. Para conversões diretas, combine com vídeos de produto, cases e depoimentos.",
      },
      {
        q: "Qual a vida útil de um vídeo institucional?",
        a: "Anos, se produzido sem elementos datados como datas, prêmios pontuais ou pessoas que podem sair da empresa.",
      },
      {
        q: "Vale a pena para empresa pequena?",
        a: "Sim. Um institucional bem feito ajuda a competir visualmente no nível das grandes.",
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
      "Os erros mais comuns: vídeo longo demais, sem roteiro/briefing, áudio e luz amadores, falta de foco, sem CTA, economizar na produção e não definir público.",
    category: "Tipos de vídeo",
    coverQuery: "E1",
    coverAlt:
      "Tela de edição de vídeo profissional em pós-produção",
    datePublished: "2026-06-04",
    keywords:
      "erros vídeo institucional, problemas produção audiovisual, como evitar erro em vídeo corporativo",
    bodyHtml: `
<p>[IMAGEM: E1 | alt: Edição de vídeo em MacBook profissional]</p>

<h2>Os 7 erros</h2>
<p>[IMAGEM: V6 | alt: Equipe em set de produção corporativa]</p>
<ol>
  <li><strong>Vídeo longo e cansativo</strong> — o "vídeo novela" perde o espectador.</li>
  <li><strong>Sem roteiro e briefing</strong> — vira vídeo disperso.</li>
  <li><strong>Áudio e iluminação amadores</strong> — o que mais denuncia produção fraca.</li>
  <li><strong>Falta de foco</strong> — um vídeo, uma mensagem central.</li>
  <li><strong>Sem CTA</strong> — perde a chance de converter atenção em contato.</li>
  <li><strong>Economizar no lugar errado</strong> — pode depor contra a própria empresa.</li>
  <li><strong>Não definir público</strong> — tom e linguagem erram o alvo.</li>
</ol>

<h2>A raiz de tudo: planejamento</h2>
<p>[IMAGEM: V1 | alt: Briefing de produção com claquete]</p>
<p>Quase todos os erros acontecem antes da câmera ligar. Briefing, público e roteiro reduzem retrabalho e elevam o resultado.</p>
`,
    faqs: [
      {
        q: "Qual a duração ideal de um vídeo institucional?",
        a: "Em geral entre 60 segundos e 2 minutos, dependendo do canal e da mensagem.",
      },
      {
        q: "Posso gravar com celular?",
        a: "Para rede social simples às vezes funciona. Para institucional raramente.",
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
      "O vídeo de feira registra a participação e gera dois ativos: conteúdo para redes/site (aftermovie) e a prova concreta do investimento.",
    category: "Eventos e feiras",
    coverQuery: "EV2",
    coverAlt:
      "Público assistindo apresentação em feira de negócios",
    datePublished: "2026-06-05",
    keywords:
      "vídeo para feira de negócios, aftermovie de feira, cobertura de feira corporativa, vídeo evento empresarial, filmagem feira São Paulo, ROI feira de negócios",
    bodyHtml: `
<p>[IMAGEM: EV1 | alt: Auditório corporativo durante evento de negócios]</p>

<h2>Por que filmar uma feira de negócios</h2>
<p>[IMAGEM: E1 | alt: Edição do aftermovie do evento corporativo]</p>
<p>Feiras concentram, em poucos dias, os formadores de opinião do setor. É um investimento alto — estande, equipe, deslocamento, materiais — e costuma sobrar pouca evidência depois. O vídeo de feira captura movimento, conversas, lançamentos e energia do estande.</p>

<h2>O que o vídeo de feira entrega</h2>
<p>[IMAGEM: M6 | alt: Reunião de briefing do evento corporativo]</p>
<p>Quatro ativos: <strong>aftermovie</strong> — resumo dinâmico de 60 a 120 segundos; <strong>prova de investimento</strong> para apresentar à diretoria; <strong>conteúdo evergreen</strong> que alimenta campanhas por meses; e <strong>posicionamento de autoridade</strong>.</p>

<h2>O que faz um bom registro de feira</h2>
<p>[IMAGEM: V3 | alt: Cinegrafista captando vídeo em evento corporativo]</p>
<p>Planejamento. Agenda do estande mapeada, horários de pico, lançamentos e palestras definidos antes do primeiro dia.</p>
`,
    faqs: [
      {
        q: "Qual a diferença entre cobertura e aftermovie?",
        a: "Cobertura é a captação durante o evento; aftermovie é o vídeo editado, com narrativa, ritmo e trilha.",
      },
      {
        q: "Quando recebo o material?",
        a: "Aftermovies têm entrega acelerada, geralmente em poucos dias após a feira.",
      },
      {
        q: "Vale para estande pequeno?",
        a: "Sim. Um bom registro valoriza a presença independentemente do tamanho do estande.",
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
      "Vídeo institucional é um filme curto que apresenta a empresa — sua história, valores, estrutura, produtos e diferencial.",
    category: "Tipos de vídeo",
    coverQuery: "M3",
    coverAlt:
      "Profissionais em ambiente corporativo durante gravação institucional",
    datePublished: "2026-06-06",
    keywords:
      "o que é vídeo institucional, para que serve vídeo institucional, exemplos de vídeo institucional, filme institucional empresa, vídeo corporativo",
    bodyHtml: `
<p>[IMAGEM: M3 | alt: Profissionais em ambiente corporativo]</p>

<h2>Para que serve um vídeo institucional, na prática</h2>
<p>[IMAGEM: M5 | alt: Equipe corporativa em colaboração]</p>
<p>Em 60 a 120 segundos ele consegue apresentar a empresa, abrir reuniões comerciais com autoridade, fortalecer propostas, ocupar a home do site, integrar novos colaboradores e reforçar a marca em eventos.</p>

<h2>Exemplos reais de vídeo institucional</h2>
<p>[IMAGEM: I1 | alt: Tour industrial de fábrica para vídeo corporativo]</p>
<p>A empresa B2B que abre toda reunião com um institucional de 90 segundos; a indústria que mostra a fábrica e o processo produtivo; o escritório de serviços que comunica valores e cultura.</p>

<h2>O que um bom vídeo institucional precisa ter</h2>
<p>[IMAGEM: V4 | alt: Câmera DSLR profissional captando cena institucional]</p>
<p>Quatro elementos não-negociáveis: <strong>mensagem central clara</strong>, <strong>roteiro enxuto</strong>, <strong>captação técnica</strong> impecável e um <strong>CTA</strong> que conduz o próximo passo.</p>
`,
    faqs: [
      {
        q: "Vídeo institucional é o mesmo que vídeo publicitário?",
        a: "Não. O institucional apresenta a empresa como um todo; o publicitário vende um produto, serviço ou campanha específica.",
      },
      {
        q: "Qual a duração ideal?",
        a: "Em geral entre 60 segundos e 2 minutos.",
      },
      {
        q: "Toda empresa precisa?",
        a: "Qualquer empresa que queira passar credibilidade e profissionalizar a comunicação se beneficia.",
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
      "Institucional apresenta a empresa. Publicitário vende um produto. Manifesto é emocional e de posicionamento.",
    category: "Tipos de vídeo",
    coverQuery: "V1",
    coverAlt:
      "Claquete de cinema em set de filmagem",
    datePublished: "2026-06-07",
    keywords:
      "vídeo institucional publicitário manifesto, diferença tipos de vídeo, vídeo institucional vs publicitário, manifesto de marca vídeo",
    bodyHtml: `
<p>[IMAGEM: V1 | alt: Claquete de produção audiovisual]</p>

<h2>As diferenças</h2>
<p>[IMAGEM: E3 | alt: Comparação entre tipos de vídeo em monitor de edição]</p>
<ul>
  <li><strong>Institucional</strong> — quem somos, o que fazemos; tom de credibilidade; uso duradouro.</li>
  <li><strong>Publicitário</strong> — foco num produto/oferta; tom persuasivo; ligado a campanha.</li>
  <li><strong>Manifesto</strong> — emoção e posicionamento; comunica propósito; fortalece identidade.</li>
</ul>

<h2>Como escolher</h2>
<p>[IMAGEM: M6 | alt: Equipe criativa em brainstorm estratégico]</p>
<p>Pergunte o objetivo: apresentar a empresa? Institucional. Vender algo específico? Publicitário. Inspirar e posicionar? Manifesto.</p>
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
      "Um vídeo institucional padrão costuma levar algumas semanas, somando roteiro, pré-produção, captação e finalização.",
    category: "Preço e contratação",
    coverQuery: "V6",
    coverAlt:
      "Cronograma de produção audiovisual com etapas planejadas",
    datePublished: "2026-06-08",
    keywords:
      "quanto tempo produzir vídeo corporativo, prazo vídeo institucional, tempo de produção audiovisual, cronograma vídeo empresa",
    bodyHtml: `
<p>[IMAGEM: V6 | alt: Equipe em pré-produção de vídeo corporativo]</p>

<h2>O que define o prazo</h2>
<p>[IMAGEM: M6 | alt: Reunião de planejamento de produção]</p>
<p>Complexidade do roteiro; número de diárias e locações; disponibilidade de pessoas para gravar; volume de pós-produção; rodadas de revisão.</p>

<h2>As etapas e o tempo</h2>
<p>[IMAGEM: E2 | alt: Notebook em mesa de trabalho durante etapa de edição]</p>
<p>Pré-produção (briefing, roteiro, planejamento). Captação concentrada em uma ou mais diárias. Pós-produção — geralmente a fase mais longa.</p>

<h2>Como acelerar sem perder qualidade</h2>
<p>[IMAGEM: M5 | alt: Equipe corporativa ágil em fluxo de aprovação]</p>
<p>Briefing claro desde o início, decisões rápidas nas aprovações, e agenda de gravação bem definida.</p>
`,
    faqs: [
      {
        q: "Dá para fazer com urgência?",
        a: "Em muitos casos sim, com escopo ajustado.",
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
      "A primeira impressão no LinkedIn acontece em menos de 100 milissegundos. Veja como uma foto profissional pode ser o fator decisivo.",
    tldr:
      "A foto de perfil do LinkedIn é avaliada em menos de 100 milissegundos. O retrato corporativo profissional cria a primeira impressão que abre portas.",
    category: "Retratos Corporativos",
    coverQuery: "M2",
    coverAlt:
      "Retrato corporativo profissional de executivo apresentando",
    datePublished: "2026-06-09",
    keywords:
      "foto perfil LinkedIn, retrato corporativo, foto profissional LinkedIn, retrato executivo, imagem corporativa LinkedIn",
    bodyHtml: `
<p>[IMAGEM: M2 | alt: Executivo profissional em ambiente corporativo]</p>

<h2>O que sua foto comunica sem você saber</h2>
<p>Pesquisas mostram que levamos menos de 100 milissegundos para formar uma primeira impressão de uma face. Uma foto escura, com expressão tensa ou tirada por celular comunica descuido, desorganização e amadorismo.</p>

<p>[IMAGEM: M9 | alt: Profissional em retrato corporativo com expressão confiante]</p>

<h2>O retrato corporativo profissional: o que faz diferença</h2>
<p><strong>Iluminação:</strong> suave, direcional, sem sombras agressivas.</p>
<p><strong>Expressão:</strong> acessível mas séria. Confiante mas não arrogante.</p>
<p><strong>Fundo:</strong> neutro ou levemente desfocado para destacar o rosto.</p>
<p><strong>Enquadramento:</strong> meio-busto, levemente lateralizado.</p>

<p>[IMAGEM: M7 | alt: Sessão de retratos corporativos profissional]</p>

<h2>Quantas fotos você precisa?</h2>
<p>Para uso profissional completo: 3 variações de expressão, 2 enquadramentos, 2 opções de fundo. Uma sessão bem planejada entrega tudo em 60-90 minutos.</p>

<p>[IMAGEM: M5 | alt: Equipe corporativa com retratos profissionais]</p>

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
      "A maioria das decepções com fotografia de evento corporativo começa no briefing. Comunicar propósito, VIPs, momentos obrigatórios, uso e prazo transforma o registro.",
    category: "Eventos Corporativos",
    coverQuery: "EV1",
    coverAlt:
      "Auditório corporativo durante evento empresarial",
    datePublished: "2026-06-10",
    keywords:
      "fotografia eventos corporativos, briefing fotógrafo evento, cobertura fotográfica empresa, fotógrafo evento corporativo, fotografia convenção",
    bodyHtml: `
<p>[IMAGEM: EV1 | alt: Plateia em auditório corporativo]</p>

<h2>O briefing que transforma um fotógrafo em contador de histórias</h2>
<p>Antes de qualquer evento, o fotógrafo precisa saber:</p>
<ol>
  <li><strong>Qual é o propósito do evento?</strong></li>
  <li><strong>Quem são os VIPs?</strong></li>
  <li><strong>Quais momentos são obrigatórios?</strong></li>
  <li><strong>Onde as fotos vão ser usadas?</strong></li>
  <li><strong>Qual o prazo de entrega?</strong></li>
</ol>

<p>[IMAGEM: EV2 | alt: Palco iluminado de evento corporativo]</p>

<h2>O que diferencia uma cobertura comum de uma cobertura memorável</h2>
<ul>
  <li><strong>O momento antes do momento:</strong> os bastidores</li>
  <li><strong>A reação da plateia:</strong> o riso, o aplauso</li>
  <li><strong>Os detalhes de escala:</strong> o salão visto de cima</li>
  <li><strong>Os encontros nos corredores:</strong> onde os negócios reais acontecem</li>
</ul>

<p>[IMAGEM: EV3 | alt: Plateia em seminário corporativo reagindo à apresentação]</p>

<h2>Por que contratar fotografia e vídeo do mesmo profissional</h2>
<p>Quando foto e vídeo vêm do mesmo produtor, a narrativa é coerente, a logística é mais limpa e o custo total é menor.</p>

<p>[IMAGEM: M6 | alt: Equipe de fotografia e vídeo em evento corporativo]</p>

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
      "Um vídeo corporativo mal produzido é pior do que não ter vídeo: comunica descuido e amadorismo. Um vídeo profissional transfere confiança e pode aumentar a conversão em até 80%.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Executivo apresentando para equipe",
    datePublished: "2026-06-11",
    keywords:
      "vídeo corporativo ruim, erros vídeo institucional, vídeo afastando clientes, produção audiovisual profissional, briefing estratégico vídeo",
    bodyHtml: `
<p>Você já entrou num site de uma empresa, assistiu ao vídeo institucional e saiu antes de terminar? Pois é. Seus clientes também fazem isso.</p>

<p>A verdade que ninguém conta: um vídeo corporativo ruim é pior do que não ter vídeo nenhum.</p>

<p>[IMAGEM: https://images.unsplash.com/photo-1528109966604-5a6a4a964e8d?w=800&q=80&auto=format&fit=crop | alt: Edição de vídeo em notebook]</p>

<h2>O custo invisível do vídeo mal feito</h2>
<p>Você investiu R$ 3.000 num vídeo caseiro. Parece economia, certo? Mas e se esse vídeo estiver na homepage que recebe 2.000 acessos por mês e 30% saírem antes de 10 segundos? Você está perdendo contratos que nunca saberá que existiram.</p>

<p>[IMAGEM: https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80&auto=format&fit=crop | alt: Executivos em reunião corporativa]</p>

<h2>Os 5 sinais de que seu vídeo está te prejudicando</h2>
<ol>
  <li><strong>Áudio com eco ou chiado</strong></li>
  <li><strong>Iluminação amarelada ou com sombras duras</strong></li>
  <li><strong>Roteiro genérico</strong></li>
  <li><strong>Sem chamada para ação clara</strong></li>
  <li><strong>Sem legendas ou sem versão vertical</strong></li>
</ol>

<p>[IMAGEM: https://images.unsplash.com/photo-1625690303837-654c9666d2d0?w=800&q=80&auto=format&fit=crop | alt: Câmera profissional em tripé]</p>

<h2>O que um vídeo profissional realmente entrega</h2>
<p>Não é apenas imagem bonita. É confiança transferida. Estudos da Forbes e HubSpot mostram que landing pages com vídeo convertem até 80% mais.</p>

<p>[IMAGEM: https://images.unsplash.com/photo-1576280314550-773c50583407?w=800&q=80&auto=format&fit=crop | alt: Cinegrafista gravando vídeo corporativo]</p>

<h2>Por onde começar?</h2>
<p>O primeiro passo é um briefing estratégico.</p>

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
      "Vídeo institucional constrói autoridade e confiança. Vídeo de vendas acelera a decisão de compra. As empresas que crescem usam os dois.",
    category: "Tipos de vídeo",
    coverQuery: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Plateia ouvindo apresentação",
    datePublished: "2026-06-12",
    keywords:
      "vídeo institucional, vídeo de vendas, vídeo institucional vs vendas, tipos de vídeo corporativo, vídeo B2B, vídeo comercial",
    bodyHtml: `
<p>Quando uma empresa decide investir em vídeo, a primeira pergunta quase sempre é: "Mas que tipo de vídeo eu preciso?"</p>

<p>[IMAGEM: https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80&auto=format&fit=crop | alt: Monitor de pós-produção]</p>

<h2>Vídeo Institucional: construindo autoridade</h2>
<p>O <a href="/blog/video-institucional-vale-a-pena">vídeo institucional</a> é o cartão de visitas audiovisual. Responde: <strong>"Quem vocês são e por que devo confiar?"</strong></p>
<ul>
  <li>Homepage do site</li>
  <li>Apresentações comerciais</li>
  <li><a href="/blog/video-para-feira-de-negocios">Stands em feiras e eventos</a></li>
  <li>Prospecção B2B</li>
</ul>

<p>[IMAGEM: https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&auto=format&fit=crop | alt: Executivo apresentando para equipe]</p>

<h2>Vídeo de Vendas: acelerando decisões</h2>
<p>O vídeo de vendas tem função cirúrgica: <strong>mover o prospect de "estou interessado" para "quero comprar"</strong>. Fala de dor, solução e resultado.</p>
<ul>
  <li><a href="/blog/video-corporativo-afastando-clientes">Landing pages</a></li>
  <li>Email marketing</li>
  <li>Propostas comerciais</li>
  <li>WhatsApp de vendedores</li>
</ul>

<p>[IMAGEM: https://images.unsplash.com/photo-1528109966604-5a6a4a964e8d?w=800&q=80&auto=format&fit=crop | alt: Edição de vídeo em notebook]</p>

<h2>A combinação que empresas inteligentes usam</h2>
<p>Um prospect descobre sua empresa → assiste ao vídeo institucional e confia. Entra na página de serviços → assiste ao vídeo de vendas e decide.</p>

<p>[IMAGEM: https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=800&q=80&auto=format&fit=crop | alt: Profissionais em ambiente corporativo]</p>

<h2>Quanto custa cada um?</h2>
<p>Os valores variam com complexidade, locação e pós-produção. Veja <a href="/blog/quanto-custa-um-video-institucional">quanto custa um vídeo institucional</a>.</p>

<p><a href="/#contato">Fale comigo e descubra qual formato é ideal para você →</a></p>
`,
  },
  {
    slug: "empresas-sao-paulo-abandonando-videos-genericos",
    title: "Por que grandes empresas em São Paulo estão abandonando vídeos genéricos",
    metaTitle: "Empresas em SP abandonam vídeos genéricos",
    metaDescription:
      "Empresas líderes em São Paulo estão abandonando vídeos genéricos e apostando em storytelling real. Entenda por que isso gera mais negócios.",
    excerpt:
      "O mercado corporativo paulistano mudou. Veja por que empresas líderes estão apostando em vídeos com identidade e storytelling real.",
    tldr:
      "Empresas que crescem no B2B paulistano abandonaram vídeos genéricos e adotam storytelling de problema-solução, depoimentos reais e ambientes autênticos.",
    category: "Mercado & Tendências",
    coverQuery: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Skyline corporativo urbano",
    datePublished: "2026-06-13",
    keywords:
      "vídeo corporativo São Paulo, empresas abandonando vídeos genéricos, storytelling corporativo, depoimento cliente vídeo, produção audiovisual SP",
    bodyHtml: `
<p>Existe um padrão que se repete em empresas que crescem consistentemente no mercado B2B de São Paulo: elas pararam de fazer vídeos que "apresentam a empresa" e começaram a fazer vídeos que <strong>contam histórias que o cliente reconhece como a própria história</strong>.</p>

<p>[IMAGEM: https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format&fit=crop | alt: Skyline corporativo urbano]</p>

<h2>O problema com vídeos "de vitrine"</h2>
<p>O <a href="/blog/erros-comuns-em-videos-institucionais">vídeo genérico corporativo</a> tem uma estrutura previsível: imagens aéreas do prédio, executivos caminhando em corredor, frase de missão-visão-valores, logo no final. Todo mundo já viu. Ninguém se lembra.</p>

<p>[IMAGEM: https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?w=800&q=80&auto=format&fit=crop | alt: Edifícios corporativos modernos]</p>

<h2>Storytelling corporativo: o formato que está funcionando em São Paulo</h2>
<p><strong>Storytelling de problema-solução:</strong> começam mostrando a dor do cliente.</p>
<p><strong>Depoimentos reais:</strong> não atores, não textos ensaiados.</p>
<p><strong>Ambiente autêntico:</strong> gravado onde a empresa realmente opera.</p>

<p>[IMAGEM: https://images.unsplash.com/photo-1632187989763-c9c620420b4d?w=800&q=80&auto=format&fit=crop | alt: Equipe de produção em set de gravação]</p>

<h2>Case: o poder do depoimento bem produzido</h2>
<p>Um <a href="/blog/video-institucional-vs-video-de-vendas">depoimento de cliente</a> com luz profissional, áudio limpo e edição elegante pode ser o ativo de marketing mais valioso da sua empresa.</p>

<p>[IMAGEM: https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?w=800&q=80&auto=format&fit=crop | alt: Retrato profissional acolhedor]</p>

<p><a href="/#contato">Solicite uma proposta para o seu vídeo →</a></p>
`,
    faqs: [
      {
        q: "Por que vídeos genéricos não funcionam mais no B2B?",
        a: "O público corporativo está saturado de conteúdo visual. Vídeos com estrutura previsível não geram atenção nem memória.",
      },
      {
        q: "Depoimentos reais funcionam melhor que atores?",
        a: "Sim. Clientes reais transmitem autenticidade e credibilidade que atores não conseguem reproduzir.",
      },
      {
        q: "Qual a diferença entre vídeo 'de vitrine' e storytelling de problema-solução?",
        a: "O vídeo de vitrine apresenta a empresa; o storytelling começa pela dor do cliente e mostra como a empresa resolve.",
      },
    ],
  },
  {
    slug: "ceo-rosto-da-empresa-foto-video",
    title: "O CEO é o rosto da empresa — e hoje esse rosto precisa estar em foto e vídeo",
    metaTitle: "O CEO é o rosto da empresa — e hoje esse rosto precisa estar em foto e vídeo",
    metaDescription:
      "Em decisões B2B de médio e grande porte, o decisor pesquisa o líder antes da empresa. Veja por que o CEO precisa de imagem profissional — e como começar.",
    excerpt:
      "Em decisões B2B de médio e grande porte, o decisor pesquisa o líder antes da empresa. Veja por que o CEO precisa de imagem profissional — e como começar.",
    tldr:
      "Em decisões B2B de médio e grande porte, o decisor pesquisa o líder antes da empresa. Veja por que o CEO precisa de imagem profissional — e como começar.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Retrato executivo de CEO em ambiente corporativo",
    datePublished: "2025-06-10",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&auto=format&fit=crop | alt: Retrato executivo de CEO em ambiente corporativo]</p>
<p>Antes de uma empresa fechar um contrato relevante, alguém do outro lado digita o nome do seu CEO no Google e no LinkedIn. O que essa pessoa encontra define o tom da primeira reunião — às vezes, define se a reunião acontece.</p>
<p>No mercado B2B brasileiro, a decisão de compra passa por três a sete pessoas. Cada uma delas avalia risco. E nada reduz a percepção de risco mais rápido do que ver, com clareza, <strong>quem lidera a empresa</strong>: um rosto, uma postura, uma voz que transmite competência.</p>
<h2>O problema da liderança "invisível"</h2>
<p>A maioria dos CEOs de empresas sólidas tem uma presença digital frágil: uma foto de celular cortada de um evento, nenhum vídeo, nenhum posicionamento. Enquanto isso, concorrentes menores — porém mais visíveis — ocupam o espaço de autoridade que deveria ser seu.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&auto=format&fit=crop | alt: Executivo apresentando em ambiente corporativo]</p>
<h2>O que a imagem do líder comunica (sem dizer uma palavra)</h2>
<p>Um retrato executivo bem feito e um vídeo de posicionamento transmitem três coisas em segundos: <strong>solidez</strong> (a empresa é séria), <strong>proximidade</strong> (dá para confiar nessa pessoa) e <strong>liderança</strong> (esse é alguém que entende do assunto). Isso encurta o ciclo de vendas e melhora a qualidade do lead que chega até você.</p>
<h2>Por onde o CEO começa</h2>
<p>O ponto de partida costuma ser um pacote enxuto: um retrato executivo profissional + um vídeo curto de posicionamento (60 a 90 segundos) para o LinkedIn e o site. A partir daí, a presença cresce de forma consistente.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/video-posicionamento-ceo-linkedin">Vídeo de posicionamento para CEOs</a> e <a href="/blog/linkedin-video-corporativo-oportunidades-b2b">LinkedIn e vídeo corporativo: mais oportunidades B2B</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/retratos-executivos-linkedin-guia-definitivo">Retratos executivos para LinkedIn</a></p>
<p><strong>Quer transformar a presença do seu CEO em um ativo de negócios?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento sem compromisso →</a></p>
`,
  },
  {
    slug: "retrato-executivo-c-level-imagem",
    title: "Retrato executivo para o C-level: o ativo de imagem que abre portas",
    metaTitle: "Retrato executivo para o C-level: o ativo de imagem que abre portas",
    metaDescription:
      "Diretores e C-level que investem em retrato executivo profissional são percebidos como mais competentes e confiáveis. Entenda o impacto — e como fazer o seu.",
    excerpt:
      "Diretores e C-level que investem em retrato executivo profissional são percebidos como mais competentes e confiáveis. Entenda o impacto — e como fazer o seu.",
    tldr:
      "Diretores e C-level que investem em retrato executivo profissional são percebidos como mais competentes e confiáveis. Entenda o impacto — e como fazer o seu.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1648474484044-bb82df2f5a1f?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Retrato corporativo de executivo de terno",
    datePublished: "2025-06-17",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1648474484044-bb82df2f5a1f?w=800&q=80&auto=format&fit=crop | alt: Retrato corporativo de executivo de terno]</p>
<p>Existe um detalhe que separa o perfil de um diretor que inspira confiança do perfil de um diretor que passa despercebido: a foto. Não é vaidade — é leitura de mercado. Em segundos, o cérebro de quem avalia decide se aquela pessoa parece competente, acessível e no comando.</p>
<h2>O custo de uma foto amadora no perfil</h2>
<p>Uma selfie, uma foto recortada de casamento ou uma imagem desatualizada comunicam descuido. Para um C-level de empresa de médio ou grande porte, isso é caro: enfraquece a autoridade exatamente onde ela mais importa — diante de investidores, conselhos, clientes estratégicos e talentos que você quer atrair.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop | alt: Executiva em retrato corporativo profissional]</p>
<h2>O que muda com um retrato profissional</h2>
<p>Iluminação correta, direção de pose, enquadramento e tratamento transformam a percepção. O mesmo executivo passa a transmitir presença. E como a foto vive por anos no LinkedIn, no site institucional, em releases e apresentações, é um dos investimentos de imagem com maior retorno por real aplicado.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/ceo-rosto-da-empresa-foto-video">O CEO é o rosto da empresa</a> e <a href="/blog/imagem-decisao-compra-b2b">Como a imagem influencia a decisão de compra B2B</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/retrato-corporativo-percepacao-negocio">Retrato corporativo: como a foto certa transforma a percepção do negócio</a></p>
<p><strong>Pronto para uma imagem à altura do seu cargo?</strong> <a href="https://wa.me/5511913550533">Solicite seu orçamento de retrato executivo →</a></p>
`,
  },
  {
    slug: "video-posicionamento-ceo-linkedin",
    title: "Vídeo de posicionamento para CEOs: como liderar a conversa do seu setor",
    metaTitle: "Vídeo de posicionamento para CEOs: como liderar a conversa do seu setor",
    metaDescription:
      "Vídeos curtos de posicionamento colocam o CEO como referência no setor e geram oportunidades B2B no LinkedIn. Veja o formato que funciona — e como produzir.",
    excerpt:
      "Vídeos curtos de posicionamento colocam o CEO como referência no setor e geram oportunidades B2B no LinkedIn. Veja o formato que funciona — e como produzir.",
    tldr:
      "Vídeos curtos de posicionamento colocam o CEO como referência no setor e geram oportunidades B2B no LinkedIn. Veja o formato que funciona — e como produzir.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1497015289639-54688650d173?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Executivo gravando vídeo de posicionamento",
    datePublished: "2025-06-24",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1497015289639-54688650d173?w=800&q=80&auto=format&fit=crop | alt: Executivo gravando vídeo de posicionamento]</p>
<p>Os CEOs que mais crescem em relevância no Brasil não esperam o jornalista ligar. Eles publicam vídeos curtos, com opinião clara sobre o próprio mercado, e ocupam o espaço de autoridade que antes pertencia só à imprensa.</p>
<h2>Por que vídeo, e por que agora</h2>
<p>O algoritmo do LinkedIn entrega vídeo nativo para muito mais gente do que texto puro. Para um CEO, isso significa aparecer recorrentemente diante de decisores que você nunca alcançaria por prospecção fria. Um vídeo de 60 a 90 segundos bem produzido vale mais que dez posts escritos.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1576280314550-773c50583407?w=800&q=80&auto=format&fit=crop | alt: Captação profissional de vídeo de posicionamento]</p>
<h2>O formato que converte</h2>
<p>Funciona assim: o CEO comenta uma tendência ou dor real do setor, traz uma visão própria e fecha com um convite à conversa. Sem teleprompter robótico, sem jargão. Luz boa, áudio limpo, edição enxuta com legendas. Uma série de 6 a 10 vídeos, gravada em um único dia, abastece meses de presença.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/linkedin-video-corporativo-oportunidades-b2b">LinkedIn e vídeo corporativo: oportunidades B2B</a> e <a href="/blog/ceo-rosto-da-empresa-foto-video">O CEO é o rosto da empresa</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/retratos-executivos-linkedin-guia-definitivo">Retratos executivos para LinkedIn</a></p>
<p><strong>Vamos gravar sua série de posicionamento em um único dia?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "marketing-medico-etico-foto-video",
    title: "Marketing médico com ética: como foto e vídeo constroem autoridade dentro das regras do CFM",
    metaTitle: "Marketing médico com ética: como foto e vídeo constroem autoridade dentro das regras do CFM",
    metaDescription:
      "Médicos podem (e devem) construir autoridade com imagem profissional respeitando o Código de Ética. Veja o que funciona em foto e vídeo — sem risco de infração.",
    excerpt:
      "Médicos podem (e devem) construir autoridade com imagem profissional respeitando o Código de Ética. Veja o que funciona em foto e vídeo — sem risco de infração.",
    tldr:
      "Médicos podem (e devem) construir autoridade com imagem profissional respeitando o Código de Ética. Veja o que funciona em foto e vídeo — sem risco de infração.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Médicos em ambiente clínico",
    datePublished: "2025-07-01",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80&auto=format&fit=crop | alt: Médicos em ambiente clínico]</p>
<p>O médico vive um paradoxo: precisa ser conhecido para atrair pacientes, mas opera sob regras rígidas de publicidade do Conselho Federal de Medicina. A boa notícia é que <strong>autoridade não é propaganda</strong> — e é exatamente aí que foto e vídeo profissionais entram.</p>
<h2>O que o CFM permite (e valoriza)</h2>
<p>O caminho ético não é prometer resultado nem expor "antes e depois" sensacionalista. É <strong>informar com seriedade</strong> e <strong>humanizar o profissional</strong>. Conteúdo educativo, um retrato que transmite competência e acolhimento, e vídeos que explicam condições e tratamentos de forma responsável constroem confiança sem cruzar nenhuma linha.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1497015289639-54688650d173?w=800&q=80&auto=format&fit=crop | alt: Médico gravando vídeo educativo]</p>
<h2>O arsenal de imagem do médico moderno</h2>
<p>Um retrato profissional para o perfil e o site, fotos reais do consultório (ambiente transmite cuidado) e vídeos educativos curtos. Esse conjunto faz o paciente chegar à primeira consulta já confiando — e diferencia você de colegas que dependem só de indicação.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/video-institucional-clinicas-consultorios">Vídeo institucional para clínicas e consultórios</a> e <a href="/blog/retrato-profissional-medicos">Retrato profissional para médicos</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/fotografia-medica-clinicas-hospitais">Fotografia médica para clínicas e consultórios</a></p>
<p><strong>Quer construir sua autoridade médica com segurança e elegância?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "video-institucional-clinicas-consultorios",
    title: "Vídeo institucional para clínicas e consultórios: confiança antes da primeira consulta",
    metaTitle: "Vídeo institucional para clínicas e consultórios: confiança antes da primeira consulta",
    metaDescription:
      "Clínicas e consultórios que investem em vídeo institucional reduzem a barreira da primeira consulta e atraem pacientes mais qualificados. Veja como estruturar o seu.",
    excerpt:
      "Clínicas e consultórios que investem em vídeo institucional reduzem a barreira da primeira consulta e atraem pacientes mais qualificados. Veja como estruturar o seu.",
    tldr:
      "Clínicas e consultórios que investem em vídeo institucional reduzem a barreira da primeira consulta e atraem pacientes mais qualificados. Veja como estruturar o seu.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Equipe de saúde em ambiente clínico",
    datePublished: "2025-07-08",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80&auto=format&fit=crop | alt: Equipe de saúde em ambiente clínico]</p>
<p>A decisão de escolher um médico ou uma clínica é movida por uma palavra: confiança. E confiança se constrói muito antes da recepção — ela começa quando o paciente assiste a um vídeo e sente que está em boas mãos.</p>
<h2>O que o vídeo institucional resolve</h2>
<p>Ele responde, em silêncio, às perguntas que travam a marcação: o ambiente é seguro? A equipe é competente? Vou ser bem atendido? Um tour pela estrutura, a apresentação dos profissionais e o cuidado visível no atendimento dissolvem a insegurança que faz o paciente adiar.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop | alt: Atendimento humanizado em consultório]</p>
<h2>Estrutura que funciona na saúde</h2>
<p>Tom sóbrio e acolhedor, sem exageros. Imagem limpa, luz natural valorizada, áudio impecável. E sempre dentro das diretrizes do CFM: informar e humanizar, nunca prometer. O resultado é um ativo que trabalha pela sua clínica 24 horas por dia.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/marketing-medico-etico-foto-video">Marketing médico com ética</a> e <a href="/blog/video-setor-farmaceutico-saude-corporativa">Vídeo para o setor farmacêutico e saúde corporativa</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/fotografia-medica-clinicas-hospitais">Fotografia médica para clínicas e hospitais</a></p>
<p><strong>Vamos mostrar ao paciente por que sua clínica é a escolha certa?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "retrato-profissional-medicos",
    title: "Retrato profissional para médicos: a imagem que transmite competência e acolhimento",
    metaTitle: "Retrato profissional para médicos: a imagem que transmite competência e acolhimento",
    metaDescription:
      "O retrato é o primeiro contato do paciente com o médico. Veja por que uma foto profissional aumenta a confiança e a taxa de agendamento — com elegância e ética.",
    excerpt:
      "O retrato é o primeiro contato do paciente com o médico. Veja por que uma foto profissional aumenta a confiança e a taxa de agendamento — com elegância e ética.",
    tldr:
      "O retrato é o primeiro contato do paciente com o médico. Veja por que uma foto profissional aumenta a confiança e a taxa de agendamento — com elegância e ética.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Retrato profissional de médico com expressão acolhedora",
    datePublished: "2025-07-15",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?w=800&q=80&auto=format&fit=crop | alt: Retrato profissional de médico com expressão acolhedora]</p>
<p>Quando um paciente busca um especialista, ele clica em vários perfis em segundos. A foto decide quem ele lê primeiro — e quem ele descarta. Para o médico, o retrato não é estética: é a porta de entrada da relação de confiança.</p>
<h2>O que uma boa foto transmite na saúde</h2>
<p>Equilíbrio entre <strong>competência</strong> (firmeza, seriedade) e <strong>acolhimento</strong> (olhar, postura, leveza). É um equilíbrio difícil de alcançar com câmera de celular e fácil de obter com direção profissional. A diferença aparece direto na sensação de "esse médico me passa segurança".</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&auto=format&fit=crop | alt: Profissional da saúde em retrato corporativo]</p>
<h2>Onde esse retrato trabalha por você</h2>
<p>Perfil no Doctoralia e Google, site, redes sociais, materiais da clínica, palestras e congressos. Uma única sessão alimenta todos esses pontos por anos — sempre respeitando as diretrizes do CFM.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/marketing-medico-etico-foto-video">Marketing médico com ética</a> e <a href="/blog/retrato-executivo-c-level-imagem">Retrato executivo para o C-level</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/fotografia-medica-clinicas-hospitais">Fotografia médica para clínicas e hospitais</a></p>
<p><strong>Quer um retrato que faça o paciente confiar antes de entrar?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "imagem-profissional-advogados-escritorios",
    title: "Imagem profissional para advogados e escritórios: autoridade que respeita as regras da OAB",
    metaTitle: "Imagem profissional para advogados e escritórios: autoridade que respeita as regras da OAB",
    metaDescription:
      "Advogados podem construir autoridade com foto e vídeo profissionais sem infringir o Código de Ética da OAB. Veja o que é permitido — e o que realmente gera clientes.",
    excerpt:
      "Advogados podem construir autoridade com foto e vídeo profissionais sem infringir o Código de Ética da OAB. Veja o que é permitido — e o que realmente gera clientes.",
    tldr:
      "Advogados podem construir autoridade com foto e vídeo profissionais sem infringir o Código de Ética da OAB. Veja o que é permitido — e o que realmente gera clientes.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1648474484044-bb82df2f5a1f?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Retrato de advogado em escritório",
    datePublished: "2025-07-22",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1648474484044-bb82df2f5a1f?w=800&q=80&auto=format&fit=crop | alt: Retrato de advogado em escritório]</p>
<p>A advocacia vende confiança e discrição — e tem um código de ética que limita a publicidade. Por isso muitos escritórios travam: têm medo de "fazer marketing". Mas há uma diferença enorme entre publicidade mercantil (vedada) e <strong>construção sóbria de autoridade</strong> (permitida e poderosa).</p>
<h2>O que é permitido — e funciona</h2>
<p>Imagem institucional séria, retratos profissionais dos sócios, conteúdo informativo de qualidade e vídeos que explicam temas com profundidade. Nada de promessa de resultado, nada de sensacionalismo. Apenas a transmissão clara de competência, experiência e seriedade.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80&auto=format&fit=crop | alt: Ambiente de escritório de advocacia]</p>
<h2>Por que isso importa para o cliente certo</h2>
<p>Empresas de médio e grande porte contratam escritórios pela percepção de solidez. Um site com imagem amadora levanta dúvida; um retrato e um vídeo institucional bem produzidos posicionam o escritório no patamar dos grandes — antes mesmo da primeira reunião.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/video-institucional-advocacia">Vídeo institucional para escritórios de advocacia</a> e <a href="/blog/video-contabilidade-escritorios-servicos-profissionais">Vídeo para contabilidade e serviços profissionais</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/retratos-corporativos-advogados-contadores">Retratos corporativos para advogados e contadores</a></p>
<p><strong>Quer elevar a percepção do seu escritório com segurança ética?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "video-institucional-advocacia",
    title: "Vídeo institucional para escritórios de advocacia: confiança sem parecer propaganda",
    metaTitle: "Vídeo institucional para escritórios de advocacia: confiança sem parecer propaganda",
    metaDescription:
      "Como produzir um vídeo institucional para advocacia que gera autoridade e respeita o Código de Ética da OAB. Estrutura, tom e o que evitar.",
    excerpt:
      "Como produzir um vídeo institucional para advocacia que gera autoridade e respeita o Código de Ética da OAB. Estrutura, tom e o que evitar.",
    tldr:
      "Como produzir um vídeo institucional para advocacia que gera autoridade e respeita o Código de Ética da OAB. Estrutura, tom e o que evitar.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Sala de reunião de escritório jurídico",
    datePublished: "2025-07-29",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80&auto=format&fit=crop | alt: Sala de reunião de escritório jurídico]</p>
<p>Um bom vídeo institucional de advocacia não "vende serviço". Ele apresenta uma banca: quem são os sócios, qual a filosofia de atuação, como o cliente é tratado. É posicionamento sóbrio — e é exatamente isso que conquista o cliente corporativo.</p>
<h2>O tom certo para o jurídico</h2>
<p>Sobriedade acima de tudo. Imagem elegante, ritmo calmo, narração precisa, ambiente que transmite tradição e segurança. Nada de trilha exagerada ou frases de efeito. O cliente que você quer atrair valoriza discrição — o vídeo precisa refletir isso.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&auto=format&fit=crop | alt: Sócio apresentando a filosofia do escritório]</p>
<h2>O retorno de um único vídeo</h2>
<p>Ele trabalha no site, em propostas comerciais, em apresentações e na prospecção de clientes corporativos. Para uma banca, é o "cartão de visitas" que sustenta a percepção de solidez em todos os pontos de contato.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/imagem-profissional-advogados-escritorios">Imagem profissional para advogados</a> e <a href="/blog/video-contabilidade-escritorios-servicos-profissionais">Vídeo para serviços profissionais</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/retratos-corporativos-advogados-contadores">Retratos para advogados e contadores</a></p>
<p><strong>Pronto para um institucional à altura da sua banca?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "banco-de-imagens-proprio-marketing",
    title: "Banco de imagens próprio: por que todo diretor de marketing deveria largar a foto de banco genérica",
    metaTitle: "Banco de imagens próprio: por que todo diretor de marketing deveria largar a foto de banco genérica",
    metaDescription:
      "Foto de banco genérica enfraquece a marca. Veja por que um banco de imagens próprio, com foto e vídeo reais da sua empresa, converte mais e diferencia.",
    excerpt:
      "Foto de banco genérica enfraquece a marca. Veja por que um banco de imagens próprio, com foto e vídeo reais da sua empresa, converte mais e diferencia.",
    tldr:
      "Foto de banco genérica enfraquece a marca. Veja por que um banco de imagens próprio, com foto e vídeo reais da sua empresa, converte mais e diferencia.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Diretor de marketing analisando desempenho de conteúdo",
    datePublished: "2025-08-05",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800&q=80&auto=format&fit=crop | alt: Diretor de marketing analisando desempenho de conteúdo]</p>
<p>Aquela foto de "equipe sorrindo apontando para um gráfico" está em milhares de sites. Quando o seu cliente reconhece a imagem de banco, algo se quebra: a marca parece menos real, menos confiável, menos premium. Para um diretor de marketing, isso é vazamento de credibilidade.</p>
<h2>O problema da imagem genérica</h2>
<p>Stock genérico comunica "qualquer empresa". Mas sua empresa não é qualquer uma. Cada vez que você usa uma foto que o concorrente também pode usar, você dilui exatamente aquilo que deveria diferenciar.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&q=80&auto=format&fit=crop | alt: Equipe real da empresa em ambiente de trabalho]</p>
<h2>O que um banco de imagens próprio entrega</h2>
<p>Fotos e vídeos reais da sua operação, sua equipe, seus produtos e seus escritórios — padronizados, com identidade visual, prontos para site, redes, campanhas e apresentações. Um único dia de produção bem planejado gera um acervo que abastece o marketing por meses.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/conteudo-audiovisual-em-escala-um-dia">Conteúdo audiovisual em escala</a> e <a href="/blog/roi-video-corporativo-board">ROI de vídeo corporativo para o board</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/banco-de-imagens-corporativo">Banco de imagens corporativo profissional</a></p>
<p><strong>Quer um acervo visual que só a sua empresa tem?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "conteudo-audiovisual-em-escala-um-dia",
    title: "Conteúdo audiovisual em escala: abasteça o calendário de marketing com um único dia de produção",
    metaTitle: "Conteúdo audiovisual em escala: abasteça o calendário de marketing com um único dia de produção",
    metaDescription:
      "Um dia de produção bem planejado gera dezenas de peças de foto e vídeo. Veja como diretores de marketing multiplicam conteúdo sem multiplicar o orçamento.",
    excerpt:
      "Um dia de produção bem planejado gera dezenas de peças de foto e vídeo. Veja como diretores de marketing multiplicam conteúdo sem multiplicar o orçamento.",
    tldr:
      "Um dia de produção bem planejado gera dezenas de peças de foto e vídeo. Veja como diretores de marketing multiplicam conteúdo sem multiplicar o orçamento.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1632187989763-c9c620420b4d?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Equipe de produção captando conteúdo em um dia",
    datePublished: "2025-08-12",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1632187989763-c9c620420b4d?w=800&q=80&auto=format&fit=crop | alt: Equipe de produção captando conteúdo em um dia]</p>
<p>O maior desafio de um diretor de marketing não é ter ideias — é alimentar o calendário com material de qualidade, mês após mês, sem estourar o orçamento. A solução não é produzir mais vezes. É produzir <strong>melhor, de uma vez só</strong>.</p>
<h2>A lógica do "produzir em lote"</h2>
<p>Com roteiro e planejamento de captação, um único dia de produção rende: vídeos institucionais, cortes curtos para redes, depoimentos, fotos para site e campanhas, e material para apresentações. O custo por peça despenca e a consistência visual aumenta.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1528109966604-5a6a4a964e8d?w=800&q=80&auto=format&fit=crop | alt: Edição transformando um dia de captação em dezenas de peças]</p>
<h2>O que muda na rotina do time</h2>
<p>Em vez de correr atrás de imagem toda semana, seu time passa a distribuir um acervo já pronto. Menos pressa, mais estratégia, e uma marca que aparece com regularidade — exatamente o que os algoritmos recompensam.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/banco-de-imagens-proprio-marketing">Banco de imagens próprio</a> e <a href="/blog/foto-video-mesmo-dia-multiplica-resultado">Foto + vídeo no mesmo dia</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/banco-de-imagens-corporativo">Banco de imagens corporativo</a></p>
<p><strong>Vamos planejar seu dia de produção e abastecer meses de conteúdo?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "roi-video-corporativo-board",
    title: "ROI de vídeo corporativo: o que apresentar ao board para aprovar o investimento",
    metaTitle: "ROI de vídeo corporativo: o que apresentar ao board para aprovar o investimento",
    metaDescription:
      "Precisa defender o orçamento de vídeo na frente da diretoria? Veja os números e argumentos que transformam custo em investimento com retorno mensurável.",
    excerpt:
      "Precisa defender o orçamento de vídeo na frente da diretoria? Veja os números e argumentos que transformam custo em investimento com retorno mensurável.",
    tldr:
      "Precisa defender o orçamento de vídeo na frente da diretoria? Veja os números e argumentos que transformam custo em investimento com retorno mensurável.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Dashboard de resultados de conteúdo audiovisual",
    datePublished: "2025-08-19",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?w=800&q=80&auto=format&fit=crop | alt: Dashboard de resultados de conteúdo audiovisual]</p>
<p>Todo diretor de marketing já viveu a cena: a ideia é boa, mas o board pergunta "qual o retorno?". Vídeo corporativo não é gasto de imagem — é um ativo com impacto direto em conversão, ciclo de vendas e custo de aquisição. Basta apresentar do jeito certo.</p>
<h2>Os números que convencem o board</h2>
<p>Landing pages com vídeo convertem significativamente mais. Vídeo nativo amplia o alcance orgânico. Depoimentos em vídeo encurtam o ciclo de vendas porque respondem objeções antes da reunião. E o ativo se paga: um vídeo fica no ar por anos, diluindo o custo a cada novo lead.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1638262052640-82e94d64664a?w=800&q=80&auto=format&fit=crop | alt: O resultado final: mais negócios fechados]</p>
<h2>Como estruturar a apresentação</h2>
<p>Conecte cada peça a um indicador: taxa de conversão da landing, tempo médio de fechamento, CAC, alcance orgânico. Transforme "vídeo bonito" em "ferramenta de receita". É a linguagem que o board entende e aprova.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/quanto-custa-video-corporativo-sao-paulo">Quanto custa um vídeo corporativo</a> e <a href="/blog/banco-de-imagens-proprio-marketing">Banco de imagens próprio</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/quanto-custa-sessao-fotos-corporativas">Quanto custa uma sessão de fotos corporativas</a></p>
<p><strong>Quer um orçamento com argumentos prontos para o board?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "video-produto-b2b-90-segundos",
    title: "Vídeo de produto B2B: como explicar uma solução complexa em 90 segundos",
    metaTitle: "Vídeo de produto B2B: como explicar uma solução complexa em 90 segundos",
    metaDescription:
      "Diretores de produto sabem o desafio: explicar uma solução técnica de forma clara e desejável. Veja como o vídeo de produto B2B faz isso em 90 segundos.",
    excerpt:
      "Diretores de produto sabem o desafio: explicar uma solução técnica de forma clara e desejável. Veja como o vídeo de produto B2B faz isso em 90 segundos.",
    tldr:
      "Diretores de produto sabem o desafio: explicar uma solução técnica de forma clara e desejável. Veja como o vídeo de produto B2B faz isso em 90 segundos.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1612548403247-aa2873e9422d?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Captação profissional de vídeo de produto",
    datePublished: "2025-08-26",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1612548403247-aa2873e9422d?w=800&q=80&auto=format&fit=crop | alt: Captação profissional de vídeo de produto]</p>
<p>Quanto mais sofisticada a solução, mais difícil explicá-la — e mais o cliente trava na hora de entender o valor. O vídeo de produto B2B existe para resolver isso: transformar complexidade em clareza, e clareza em desejo, em menos de dois minutos.</p>
<h2>A estrutura que faz o cliente "entender e querer"</h2>
<p>Dor → por que as soluções atuais falham → sua solução → como funciona → prova → próximo passo. Quando essa sequência é traduzida em imagem, motion graphics e narração precisa, o prospect sai do vídeo sabendo exatamente por que falar com você.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80&auto=format&fit=crop | alt: Motion e edição traduzindo a solução em clareza visual]</p>
<h2>Onde o vídeo de produto acelera vendas</h2>
<p>Landing pages, propostas comerciais, e-mails de nutrição, demonstrações e até o WhatsApp do time comercial. Ele padroniza a melhor explicação do produto e a entrega sempre no mesmo nível — sem depender do dia bom (ou ruim) do vendedor.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/video-demonstracao-produto-ciclo-vendas">Demonstração de produto em vídeo</a> e <a href="/blog/video-lancamento-produtos-corporativos-roteiro">Roteiro de lançamento que converte</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/fotografia-produto-corporativo-lancamento">Fotografia de produto para fortalecer o lançamento</a></p>
<p><strong>Quer traduzir sua solução em 90 segundos que vendem?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "video-demonstracao-produto-ciclo-vendas",
    title: "Demonstração de produto em vídeo: o material que encurta o ciclo de vendas",
    metaTitle: "Demonstração de produto em vídeo: o material que encurta o ciclo de vendas",
    metaDescription:
      "Vídeos de demonstração reduzem o número de reuniões necessárias para fechar. Veja como diretores de produto e vendas usam demos em vídeo para acelerar pipeline.",
    excerpt:
      "Vídeos de demonstração reduzem o número de reuniões necessárias para fechar. Veja como diretores de produto e vendas usam demos em vídeo para acelerar pipeline.",
    tldr:
      "Vídeos de demonstração reduzem o número de reuniões necessárias para fechar. Veja como diretores de produto e vendas usam demos em vídeo para acelerar pipeline.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1632187989763-c9c620420b4d?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Produção de vídeo de demonstração de produto",
    datePublished: "2025-09-02",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1632187989763-c9c620420b4d?w=800&q=80&auto=format&fit=crop | alt: Produção de vídeo de demonstração de produto]</p>
<p>Cada reunião de demonstração consome tempo do seu time mais caro. E muitas delas terminam com o mesmo "vou levar para a equipe avaliar". O vídeo de demonstração resolve os dois problemas: explica com qualidade constante e circula internamente no cliente sem precisar do seu vendedor presente.</p>
<h2>Por que a demo em vídeo funciona</h2>
<p>Ela mostra o produto em ação, no ritmo certo, destacando exatamente os pontos que importam para o decisor. E, diferente de uma demo ao vivo, ela pode ser assistida por todos os envolvidos na decisão — aqueles 3 a 7 nomes que precisam dizer "sim".</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=800&q=80&auto=format&fit=crop | alt: Comitê de decisão assistindo à demo internamente]</p>
<h2>O efeito no pipeline</h2>
<p>Menos reuniões repetitivas, leads mais qualificados chegando à conversa final e um ciclo de vendas mais curto. É o tipo de ativo que paga a produção já no primeiro trimestre.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/video-produto-b2b-90-segundos">Vídeo de produto B2B em 90 segundos</a> e <a href="/blog/imagem-decisao-compra-b2b">Como a imagem influencia a decisão de compra B2B</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/fotografia-produto-corporativo-lancamento">Fotografia de produto corporativo</a></p>
<p><strong>Quer uma demo em vídeo que vende enquanto você dorme?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "employer-branding-video-atrair-talentos",
    title: "Employer branding em vídeo: como atrair talentos que escolhem cultura, não só salário",
    metaTitle: "Employer branding em vídeo: como atrair talentos que escolhem cultura, não só salário",
    metaDescription:
      "Diretores de RH de empresas de médio e grande porte usam vídeo de employer branding para atrair os melhores talentos. Veja o que mostrar — e o que evitar.",
    excerpt:
      "Diretores de RH de empresas de médio e grande porte usam vídeo de employer branding para atrair os melhores talentos. Veja o que mostrar — e o que evitar.",
    tldr:
      "Diretores de RH de empresas de médio e grande porte usam vídeo de employer branding para atrair os melhores talentos. Veja o que mostrar — e o que evitar.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Equipe engajada representando a cultura da empresa",
    datePublished: "2025-09-09",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&q=80&auto=format&fit=crop | alt: Equipe engajada representando a cultura da empresa]</p>
<p>Os melhores profissionais escolhem onde trabalhar — e pesquisam a empresa antes de aceitar uma proposta. Nessa pesquisa, o que eles encontram sobre a sua cultura pode atrair o talento certo ou afastá-lo para o concorrente. O vídeo de employer branding é a forma mais poderosa de mostrar quem a empresa realmente é.</p>
<h2>O que talentos querem ver</h2>
<p>Não é a fachada do prédio. É gente real, ambiente real, propósito real. Como as equipes trabalham, como as pessoas são tratadas, no que a empresa acredita. Autenticidade vence produção engessada — e é justamente isso que um profissional experiente sabe reconhecer.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80&auto=format&fit=crop | alt: Time real demonstrando a cultura no dia a dia]</p>
<h2>O retorno para o RH</h2>
<p>Vagas preenchidas mais rápido, candidatos mais alinhados e redução do custo de recrutamento. Além de fortalecer a retenção: quem entra sabendo da cultura tende a ficar mais.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/video-onboarding-cultura-rh">Vídeo de onboarding e cultura</a> e <a href="/blog/video-rh-employer-branding-talentos">Vídeo para RH: employer branding que atrai talentos</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/fotografia-cultura-organizacional">Fotografia de cultura organizacional</a></p>
<p><strong>Quer mostrar sua cultura para atrair os melhores?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "video-onboarding-cultura-rh",
    title: "Vídeo de onboarding e cultura: o que diretores de RH de grandes empresas estão produzindo",
    metaTitle: "Vídeo de onboarding e cultura: o que diretores de RH de grandes empresas estão produzindo",
    metaDescription:
      "Vídeo de onboarding reduz tempo de integração e padroniza a cultura. Veja como estruturar um programa de videoonboarding para empresas de médio e grande porte.",
    excerpt:
      "Vídeo de onboarding reduz tempo de integração e padroniza a cultura. Veja como estruturar um programa de videoonboarding para empresas de médio e grande porte.",
    tldr:
      "Vídeo de onboarding reduz tempo de integração e padroniza a cultura. Veja como estruturar um programa de videoonboarding para empresas de médio e grande porte.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Novos colaboradores em integração",
    datePublished: "2025-09-16",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&q=80&auto=format&fit=crop | alt: Novos colaboradores em integração]</p>
<p>Em empresas que crescem, o onboarding presencial não escala. Cada nova leva de contratados consome horas de gestores repetindo a mesma apresentação de cultura, processos e estrutura. O vídeo resolve isso — e ainda garante que todos recebam a melhor versão da mensagem.</p>
<h2>O que o vídeo de onboarding entrega</h2>
<p>Padronização: cada colaborador conhece a história, os valores e o funcionamento da empresa da mesma forma. Velocidade: a integração acontece sem depender da agenda dos líderes. E memória: o material fica disponível para revisão sempre que necessário.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1497015289639-54688650d173?w=800&q=80&auto=format&fit=crop | alt: Liderança apresentando a cultura em vídeo]</p>
<h2>Como medir o resultado</h2>
<p>Tempo de integração reduzido, menos dúvidas repetitivas chegando ao RH e colaboradores produtivos mais cedo. Um investimento que se paga já nas primeiras contratações do ano.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/employer-branding-video-atrair-talentos">Employer branding em vídeo</a> e <a href="/blog/video-treinamento-corporativo-capacitacao">Vídeo de treinamento corporativo</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/fotografia-cultura-organizacional">Fotografia de cultura organizacional</a></p>
<p><strong>Vamos estruturar seu vídeo de onboarding?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "cultura-organizacional-video-foto",
    title: "Fotografia de cultura organizacional: mostrando quem a empresa realmente é",
    metaTitle: "Fotografia de cultura organizacional: mostrando quem a empresa realmente é",
    metaDescription:
      "Imagens reais da cultura fortalecem employer branding, comunicação interna e marca. Veja como foto e vídeo de cultura organizacional transformam a percepção da empresa.",
    excerpt:
      "Imagens reais da cultura fortalecem employer branding, comunicação interna e marca. Veja como foto e vídeo de cultura organizacional transformam a percepção da empresa.",
    tldr:
      "Imagens reais da cultura fortalecem employer branding, comunicação interna e marca. Veja como foto e vídeo de cultura organizacional transformam a percepção da empresa.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Equipe real em seu ambiente de trabalho",
    datePublished: "2025-09-23",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=800&q=80&auto=format&fit=crop | alt: Equipe real em seu ambiente de trabalho]</p>
<p>Cultura não se descreve — se mostra. Por mais que o RH escreva sobre "ambiente colaborativo" e "propósito", são as imagens reais das pessoas trabalhando que tornam isso crível. Foto e vídeo de cultura organizacional dão rosto e verdade à marca empregadora.</p>
<h2>Onde essas imagens trabalham</h2>
<p>Página de carreiras, LinkedIn da empresa, comunicação interna, relatórios, apresentações institucionais e campanhas de recrutamento. Um acervo autêntico substitui o stock genérico e faz a empresa parecer — porque é — única.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=800&q=80&auto=format&fit=crop | alt: Colaboradores reais em ambiente corporativo]</p>
<h2>Foto e vídeo: melhores juntos</h2>
<p>A foto congela a identidade; o vídeo dá movimento e emoção. Produzidos no mesmo dia, criam um acervo completo de cultura que serve a todas as frentes do RH e do marketing.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/employer-branding-video-atrair-talentos">Employer branding em vídeo</a> e <a href="/blog/video-rh-employer-branding-talentos">Vídeo para RH</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/fotografia-cultura-organizacional">Fotografia de cultura organizacional</a></p>
<p><strong>Quer mostrar a cultura real da sua empresa?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "imagem-decisao-compra-b2b",
    title: "Como a imagem da sua empresa influencia a decisão de compra B2B (mesmo antes da reunião)",
    metaTitle: "Como a imagem da sua empresa influencia a decisão de compra B2B (mesmo antes da reunião)",
    metaDescription:
      "Compradores de empresas de médio e grande porte avaliam fornecedores pela imagem antes da primeira conversa. Veja como foto e vídeo reduzem a percepção de risco.",
    excerpt:
      "Compradores de empresas de médio e grande porte avaliam fornecedores pela imagem antes da primeira conversa. Veja como foto e vídeo reduzem a percepção de risco.",
    tldr:
      "Compradores de empresas de médio e grande porte avaliam fornecedores pela imagem antes da primeira conversa. Veja como foto e vídeo reduzem a percepção de risco.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "A imagem do fornecedor influencia a percepção do comprador",
    datePublished: "2025-09-30",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&auto=format&fit=crop | alt: A imagem do fornecedor influencia a percepção do comprador]</p>
<p>Quem compra para uma grande empresa carrega um medo silencioso: escolher o fornecedor errado. Por isso, antes de qualquer reunião, o comprador pesquisa. E o que ele vê — site, LinkedIn, vídeos, fotos da equipe — define se você entra na lista curta ou é descartado em segundos.</p>
<h2>Imagem é gestão de risco</h2>
<p>Para o comprador, imagem amadora = empresa de risco. Imagem profissional = empresa estabelecida, séria, confiável. Não é superficial: é o único sinal disponível antes do contato. E sinais fracos eliminam fornecedores tecnicamente competentes só porque "não pareciam à altura".</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1672380135241-c024f7fbfa13?w=800&q=80&auto=format&fit=crop | alt: A percepção de solidez encurta o caminho até o sim]</p>
<h2>O que blinda sua empresa nessa avaliação</h2>
<p>Vídeo institucional sólido, retratos profissionais da liderança, fotos reais da operação e depoimentos de clientes. Esse conjunto transmite estabilidade e faz o comprador chegar à reunião já inclinado a confiar.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/foto-video-propostas-comerciais-rfp">Foto e vídeo para propostas comerciais e RFPs</a> e <a href="/blog/retrato-executivo-c-level-imagem">Retrato executivo para o C-level</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/retrato-corporativo-percepacao-negocio">Retrato corporativo e percepção do negócio</a></p>
<p><strong>Quer ser o fornecedor que inspira confiança antes da reunião?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "foto-video-propostas-comerciais-rfp",
    title: "Foto e vídeo para propostas comerciais e RFPs: o detalhe que diferencia fornecedores",
    metaTitle: "Foto e vídeo para propostas comerciais e RFPs: o detalhe que diferencia fornecedores",
    metaDescription:
      "Em concorrências e RFPs, propostas com foto e vídeo profissionais transmitem mais credibilidade e se destacam. Veja como usar o audiovisual para vencer.",
    excerpt:
      "Em concorrências e RFPs, propostas com foto e vídeo profissionais transmitem mais credibilidade e se destacam. Veja como usar o audiovisual para vencer.",
    tldr:
      "Em concorrências e RFPs, propostas com foto e vídeo profissionais transmitem mais credibilidade e se destacam. Veja como usar o audiovisual para vencer.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Comitê avaliando propostas concorrentes",
    datePublished: "2025-10-07",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80&auto=format&fit=crop | alt: Comitê avaliando propostas concorrentes]</p>
<p>Numa concorrência, o comitê recebe propostas técnicas parecidas. Todas prometem qualidade, prazo e preço justo. O que faz uma proposta saltar não é só o conteúdo — é a percepção de solidez que ela transmite. E imagem profissional é o diferencial mais barato de produzir.</p>
<h2>Onde foto e vídeo entram na proposta</h2>
<p>Um vídeo institucional curto anexado à proposta, fotos reais da equipe e da estrutura, retratos dos responsáveis pelo projeto. Enquanto o concorrente entrega um PDF frio, você entrega uma apresentação que faz o comitê <strong>ver</strong> com quem está lidando.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&auto=format&fit=crop | alt: Apresentação que transmite domínio e confiança]</p>
<h2>O efeito na concorrência</h2>
<p>Diferenciação imediata, percepção de empresa maior e mais estruturada, e uma vantagem emocional que pesa quando os critérios técnicos empatam. Em decisões de alto valor, esse empurrão decide contratos.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/imagem-decisao-compra-b2b">Como a imagem influencia a decisão B2B</a> e <a href="/blog/video-produto-b2b-90-segundos">Vídeo de produto B2B</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/banco-de-imagens-corporativo">Banco de imagens corporativo</a></p>
<p><strong>Quer propostas que se destacam na concorrência?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "foto-video-mesmo-dia-multiplica-resultado",
    title: "Foto + vídeo no mesmo dia: por que produzir junto multiplica resultado e reduz custo",
    metaTitle: "Foto + vídeo no mesmo dia: por que produzir junto multiplica resultado e reduz custo",
    metaDescription:
      "Contratar foto e vídeo na mesma produção gera mais conteúdo, narrativa coerente e custo menor. Veja por que empresas inteligentes não separam mais as duas coisas.",
    excerpt:
      "Contratar foto e vídeo na mesma produção gera mais conteúdo, narrativa coerente e custo menor. Veja por que empresas inteligentes não separam mais as duas coisas.",
    tldr:
      "Contratar foto e vídeo na mesma produção gera mais conteúdo, narrativa coerente e custo menor. Veja por que empresas inteligentes não separam mais as duas coisas.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1577190651915-bf62d54d5b36?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Equipe captando foto e vídeo na mesma produção",
    datePublished: "2025-10-14",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1577190651915-bf62d54d5b36?w=800&q=80&auto=format&fit=crop | alt: Equipe captando foto e vídeo na mesma produção]</p>
<p>Muitas empresas contratam o vídeo num mês e a foto no outro — com fornecedores diferentes, em dias diferentes, com estéticas que não conversam. O resultado é mais caro, menos coerente e mais trabalhoso. Produzir foto e vídeo <strong>juntos</strong> resolve os três problemas de uma vez.</p>
<h2>O que você ganha produzindo junto</h2>
<p><strong>Mais conteúdo:</strong> o mesmo set, a mesma luz e a mesma equipe rendem foto e vídeo simultaneamente. <strong>Coerência:</strong> a narrativa visual fica alinhada em todos os canais. <strong>Custo menor:</strong> uma única diária de produção em vez de duas.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1632187989763-c9c620420b4d?w=800&q=80&auto=format&fit=crop | alt: Um único dia, um acervo completo de foto e vídeo]</p>
<h2>Para quem isso faz diferença</h2>
<p>Para o diretor de marketing que precisa abastecer canais, para o RH que documenta cultura, para o time de produto que lança soluções — e para qualquer empresa que quer máximo resultado com orçamento inteligente.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/conteudo-audiovisual-em-escala-um-dia">Conteúdo audiovisual em escala</a> e <a href="/blog/o-que-esperar-produtora-corporativa">O que esperar de uma produtora corporativa de verdade</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/quanto-custa-sessao-fotos-corporativas">Quanto custa uma sessão de fotos corporativas</a></p>
<p><strong>Vamos produzir foto e vídeo no mesmo dia e multiplicar seu acervo?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
  {
    slug: "o-que-esperar-produtora-corporativa",
    title: "O que esperar de uma produtora corporativa de verdade: processo, prazos e entrega",
    metaTitle: "O que esperar de uma produtora corporativa de verdade: processo, prazos e entrega",
    metaDescription:
      "Contratar produtora de foto e vídeo sem dor de cabeça começa por entender o processo. Veja as etapas, prazos e o que cobrar de uma produtora corporativa séria.",
    excerpt:
      "Contratar produtora de foto e vídeo sem dor de cabeça começa por entender o processo. Veja as etapas, prazos e o que cobrar de uma produtora corporativa séria.",
    tldr:
      "Contratar produtora de foto e vídeo sem dor de cabeça começa por entender o processo. Veja as etapas, prazos e o que cobrar de uma produtora corporativa séria.",
    category: "Estratégia de Vídeo",
    coverQuery: "https://images.unsplash.com/photo-1632187989763-c9c620420b4d?w=1600&q=80&auto=format&fit=crop",
    coverAlt:
      "Produtora corporativa em produção planejada",
    datePublished: "2025-10-21",
    bodyHtml: `
<p>[IMAGEM: https://images.unsplash.com/photo-1632187989763-c9c620420b4d?w=800&q=80&auto=format&fit=crop | alt: Produtora corporativa em produção planejada]</p>
<p>Quem já contratou produção audiovisual sabe: o resultado depende menos do equipamento e mais do <strong>processo</strong>. Uma produtora corporativa séria conduz o projeto com método — do briefing à entrega — para que você não tenha surpresas nem retrabalho.</p>
<h2>As etapas de um projeto bem conduzido</h2>
<p><strong>Briefing estratégico:</strong> entender objetivo, público e onde o material será usado. <strong>Pré-produção:</strong> roteiro, cronograma, locação e logística. <strong>Produção:</strong> captação com equipe e equipamento adequados. <strong>Pós-produção:</strong> edição, tratamento, motion, áudio e legendas. <strong>Entrega:</strong> arquivos nos formatos certos para cada canal.</p>
<p>[IMAGEM: https://images.unsplash.com/photo-1528109966604-5a6a4a964e8d?w=800&q=80&auto=format&fit=crop | alt: Pós-produção: onde o material ganha acabamento profissional]</p>
<h2>O que cobrar de uma produtora séria</h2>
<p>Clareza de escopo, cronograma definido, comunicação ao longo do projeto e um portfólio com clientes reais. Mais de 30 anos de experiência atendendo empresas em todo o Brasil dizem muito sobre previsibilidade e qualidade de entrega.</p>
<p>👉 <strong>Leia também:</strong> <a href="/blog/foto-video-mesmo-dia-multiplica-resultado">Foto + vídeo no mesmo dia</a> e <a href="/blog/como-escolher-produtora-video-corporativo">Como escolher a produtora de vídeo certa</a>.</p>
<p>🔗 <strong>Veja o lado fotográfico no Alê Fotógrafo →</strong> <a href="https://alefotografos.com.br/blog/como-escolher-fotografo-corporativo">Como escolher um fotógrafo corporativo</a></p>
<p><strong>Quer trabalhar com uma produtora que entrega com método?</strong> <a href="https://wa.me/5511913550533">Solicite um orçamento →</a></p>
`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return posts
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}
