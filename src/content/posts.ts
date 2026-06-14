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
    coverQuery: "M2",
    coverAlt:
      "Executivo apresentando para equipe em ambiente corporativo",
    datePublished: "2026-06-11",
    keywords:
      "vídeo corporativo ruim, erros vídeo institucional, vídeo afastando clientes, produção audiovisual profissional, briefing estratégico vídeo",
    bodyHtml: `
<p>Você já entrou num site de uma empresa, assistiu ao vídeo institucional e saiu antes de terminar? Pois é. Seus clientes também fazem isso.</p>

<p>A verdade que ninguém conta: um vídeo corporativo ruim é pior do que não ter vídeo nenhum.</p>

<p>[IMAGEM: E1 | alt: Profissional analisando vídeo institucional no notebook]</p>

<h2>O custo invisível do vídeo mal feito</h2>
<p>Você investiu R$ 3.000 num vídeo caseiro. Parece economia, certo? Mas e se esse vídeo estiver na homepage que recebe 2.000 acessos por mês e 30% saírem antes de 10 segundos? Você está perdendo contratos que nunca saberá que existiram.</p>

<p>[IMAGEM: M1 | alt: Executivos em reunião corporativa]</p>

<h2>Os 5 sinais de que seu vídeo está te prejudicando</h2>
<ol>
  <li><strong>Áudio com eco ou chiado</strong></li>
  <li><strong>Iluminação amarelada ou com sombras duras</strong></li>
  <li><strong>Roteiro genérico</strong></li>
  <li><strong>Sem chamada para ação clara</strong></li>
  <li><strong>Sem legendas ou sem versão vertical</strong></li>
</ol>

<p>[IMAGEM: V2 | alt: Câmera profissional em tripé para vídeo corporativo]</p>

<h2>O que um vídeo profissional realmente entrega</h2>
<p>Não é apenas imagem bonita. É confiança transferida. Estudos da Forbes e HubSpot mostram que landing pages com vídeo convertem até 80% mais.</p>

<p>[IMAGEM: V3 | alt: Cinegrafista gravando depoimento corporativo]</p>

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
    coverQuery: "M10",
    coverAlt:
      "Plateia ouvindo apresentação corporativa",
    datePublished: "2026-06-12",
    keywords:
      "vídeo institucional, vídeo de vendas, vídeo institucional vs vendas, tipos de vídeo corporativo, vídeo B2B, vídeo comercial",
    bodyHtml: `
<p>Quando uma empresa decide investir em vídeo, a primeira pergunta quase sempre é: "Mas que tipo de vídeo eu preciso?"</p>

<p>[IMAGEM: E3 | alt: Tela de edição de vídeo corporativo]</p>

<h2>Vídeo Institucional: construindo autoridade</h2>
<p>O <a href="/blog/video-institucional-vale-a-pena">vídeo institucional</a> é o cartão de visitas audiovisual. Responde: <strong>"Quem vocês são e por que devo confiar?"</strong></p>
<ul>
  <li>Homepage do site</li>
  <li>Apresentações comerciais</li>
  <li><a href="/blog/video-para-feira-de-negocios">Stands em feiras e eventos</a></li>
  <li>Prospecção B2B</li>
</ul>

<p>[IMAGEM: M2 | alt: Executivo apresentando em reunião]</p>

<h2>Vídeo de Vendas: acelerando decisões</h2>
<p>O vídeo de vendas tem função cirúrgica: <strong>mover o prospect de "estou interessado" para "quero comprar"</strong>. Fala de dor, solução e resultado.</p>
<ul>
  <li><a href="/blog/video-corporativo-afastando-clientes">Landing pages</a></li>
  <li>Email marketing</li>
  <li>Propostas comerciais</li>
  <li>WhatsApp de vendedores</li>
</ul>

<p>[IMAGEM: E1 | alt: Análise de funil de vendas em notebook]</p>

<h2>A combinação que empresas inteligentes usam</h2>
<p>Um prospect descobre sua empresa → assiste ao vídeo institucional e confia. Entra na página de serviços → assiste ao vídeo de vendas e decide.</p>

<p>[IMAGEM: M3 | alt: Jornada do cliente em ambiente corporativo]</p>

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
    coverQuery: "B1",
    coverAlt:
      "Skyline corporativo de São Paulo",
    datePublished: "2026-06-13",
    keywords:
      "vídeo corporativo São Paulo, empresas abandonando vídeos genéricos, storytelling corporativo, depoimento cliente vídeo, produção audiovisual SP",
    bodyHtml: `
<p>Existe um padrão que se repete em empresas que crescem consistentemente no mercado B2B de São Paulo: elas pararam de fazer vídeos que "apresentam a empresa" e começaram a fazer vídeos que <strong>contam histórias que o cliente reconhece como a própria história</strong>.</p>

<p>[IMAGEM: B1 | alt: Skyline corporativo de São Paulo]</p>

<h2>O problema com vídeos "de vitrine"</h2>
<p>O <a href="/blog/erros-comuns-em-videos-institucionais">vídeo genérico corporativo</a> tem uma estrutura previsível: imagens aéreas do prédio, executivos caminhando em corredor, frase de missão-visão-valores, logo no final. Todo mundo já viu. Ninguém se lembra.</p>

<p>[IMAGEM: B2 | alt: Edifícios corporativos modernos em São Paulo]</p>

<h2>Storytelling corporativo: o formato que está funcionando em São Paulo</h2>
<p><strong>Storytelling de problema-solução:</strong> começam mostrando a dor do cliente.</p>
<p><strong>Depoimentos reais:</strong> não atores, não textos ensaiados.</p>
<p><strong>Ambiente autêntico:</strong> gravado onde a empresa realmente opera.</p>

<p>[IMAGEM: V6 | alt: Entrevista corporativa em produção com equipe]</p>

<h2>Case: o poder do depoimento bem produzido</h2>
<p>Um <a href="/blog/video-institucional-vs-video-de-vendas">depoimento de cliente</a> com luz profissional, áudio limpo e edição elegante pode ser o ativo de marketing mais valioso da sua empresa.</p>

<p>[IMAGEM: M9 | alt: Depoimento de cliente em ambiente corporativo]</p>

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
    slug: "video-imobiliario-empreendimentos-alto-padrao",
    title: "Vídeo imobiliário para empreendimentos de alto padrão: o que realmente vende",
    metaTitle: "Vídeo imobiliário de alto padrão: o que realmente vende",
    metaDescription:
      "Vídeo imobiliário para empreendimentos de alto padrão exige tour de qualidade cinematográfica, imagens aéreas e narrativa de bairro. Veja como produzir.",
    excerpt:
      "No alto padrão, vídeo amador queima o produto. Veja o que diferencia um tour imobiliário que realmente vende.",
    tldr:
      "Vídeo imobiliário de alto padrão exige captação cinematográfica do interior, imagens aéreas do entorno e narrativa que comunique estilo de vida — não só metragem. O cliente do segmento de luxo compra experiência, e a produção precisa estar à altura.",
    category: "Tipos de vídeo",
    coverQuery: "R3",
    coverAlt:
      "Interior moderno de apartamento de alto padrão",
    datePublished: "2026-06-15",
    keywords:
      "vídeo imobiliário alto padrão, tour virtual apartamento luxo, vídeo lançamento imobiliário, drone imobiliário, video marketing imobiliário",
    bodyHtml: `
<p>[IMAGEM: R3 | alt: Interior de empreendimento de alto padrão]</p>

<h2>Por que o vídeo amador queima o produto de luxo</h2>
<p>[IMAGEM: R1 | alt: Sala de apartamento decorado para tour imobiliário]</p>
<p>No segmento de alto padrão, o cliente compara o vídeo do seu empreendimento ao do concorrente em segundos. Câmera tremida, luz dura ou narração genérica desvalorizam o produto antes da visita. A produção tem que comunicar o mesmo padrão do imóvel.</p>

<h2>O tour cinematográfico</h2>
<p>[IMAGEM: B2 | alt: Vista aérea de empreendimento corporativo]</p>
<p>Movimentos de câmera estáveis (gimbal ou slider), iluminação que valoriza as texturas dos acabamentos, planos que respeitam a arquitetura. O ritmo é contemplativo — o espectador precisa absorver cada ambiente.</p>

<h2>O entorno conta a história</h2>
<p>[IMAGEM: B1 | alt: Vista aérea de bairro nobre]</p>
<p>Drone do bairro, vizinhança, conveniências. No alto padrão, localização e estilo de vida vendem tanto quanto a planta.</p>
`,
    faqs: [
      {
        q: "Drone é obrigatório?",
        a: "Para alto padrão, é praticamente obrigatório. A imagem aérea comunica localização, escala e exclusividade.",
      },
      {
        q: "Quantos vídeos saem de uma captação?",
        a: "Tipicamente um vídeo principal de 90s, cortes verticais para Instagram/Reels e um teaser curto para anúncios.",
      },
      {
        q: "Preciso de decoração pronta?",
        a: "Sim. Apartamento decorado vende muito mais do que apartamento vazio em vídeo.",
      },
    ],
  },
  {
    slug: "video-hotelaria-experiencia-hospede",
    title: "Vídeo para hotelaria: como comunicar a experiência antes da reserva",
    metaTitle: "Vídeo para hotelaria: comunique a experiência do hóspede",
    metaDescription:
      "Vídeo para hotelaria precisa comunicar a experiência completa — lobby, quarto, lazer, eventos. Veja como produzir vídeos que aumentam reservas diretas.",
    excerpt:
      "Hóspede de hotel decide pelo sentimento, não pela diária. Veja como o vídeo comunica essa experiência.",
    tldr:
      "Vídeo para hotelaria precisa comunicar a experiência completa do hóspede: lobby, quarto, gastronomia, lazer e eventos. Quando bem produzido, reduz a dependência de OTAs e aumenta a reserva direta no site.",
    category: "Tipos de vídeo",
    coverQuery: "H1",
    coverAlt:
      "Lobby de hotel de luxo",
    datePublished: "2026-06-17",
    keywords:
      "vídeo hotelaria, vídeo hotel, vídeo pousada, marketing hoteleiro, vídeo resort, reservas diretas hotel",
    bodyHtml: `
<p>[IMAGEM: H1 | alt: Lobby de hotel de luxo]</p>

<h2>O hóspede compra sentimento</h2>
<p>[IMAGEM: R2 | alt: Quarto de hotel de alto padrão]</p>
<p>Ninguém escolhe hotel só pelo preço. Escolhe pela expectativa da experiência. O vídeo é a forma mais eficiente de transmitir essa expectativa antes da decisão.</p>

<h2>Os quatro blocos de um vídeo de hotel</h2>
<p>[IMAGEM: H2 | alt: Ambiente de lazer de hotel]</p>
<ul>
  <li><strong>Hospitalidade</strong> — lobby, recepção, pequenos gestos.</li>
  <li><strong>Acomodação</strong> — quarto, vista, conforto.</li>
  <li><strong>Lazer e gastronomia</strong> — piscina, restaurante, ambientes sociais.</li>
  <li><strong>Eventos e convenções</strong> — salões, infraestrutura para empresas.</li>
</ul>

<h2>Para eventos corporativos no hotel</h2>
<p>[IMAGEM: EV4 | alt: Salão de eventos montado em hotel]</p>
<p>Hotéis que captam eventos corporativos precisam de um vídeo específico dos salões prontos para receber convenções, com configurações típicas e infraestrutura técnica.</p>
`,
    faqs: [
      {
        q: "Drone vale para hotel?",
        a: "Sim, principalmente para resorts e hotéis com piscina, jardim ou vista privilegiada.",
      },
      {
        q: "Quantos vídeos preciso?",
        a: "Tipicamente um vídeo principal de 90-120s, cortes por categoria (suíte, gastronomia, eventos) e Reels para redes.",
      },
      {
        q: "Precisa de ator/figurante?",
        a: "Para alguns planos sim, principalmente para humanizar o ambiente. Sempre com autorização de uso de imagem.",
      },
    ],
  },
  {
    slug: "video-treinamento-corporativo-rh",
    title: "Vídeo de treinamento corporativo: por que o RH está abandonando o presencial",
    metaTitle: "Vídeo de treinamento corporativo: o novo padrão do RH",
    metaDescription:
      "Vídeo de treinamento corporativo escala onboarding, padroniza conhecimento e reduz custo. Veja como o RH moderno produz e mede resultado.",
    excerpt:
      "Treinamento em vídeo escala, padroniza e é mensurável. Veja por que o RH moderno aposta nesse formato.",
    tldr:
      "Vídeo de treinamento corporativo padroniza o conhecimento, escala para todas as unidades, fica disponível 24/7 e tem métricas claras de consumo. Para onboarding, compliance e capacitação técnica, supera o treinamento presencial em custo e consistência.",
    category: "Tipos de vídeo",
    coverQuery: "M8",
    coverAlt:
      "Equipe corporativa em treinamento com laptops",
    datePublished: "2026-06-19",
    keywords:
      "vídeo treinamento corporativo, vídeo onboarding, vídeo capacitação RH, treinamento online empresa, LMS vídeo, vídeo instrucional",
    bodyHtml: `
<p>[IMAGEM: M8 | alt: Equipe corporativa em treinamento]</p>

<h2>Por que vídeo virou o padrão de treinamento</h2>
<p>[IMAGEM: E1 | alt: Colaborador assistindo a videotreinamento]</p>
<p>Treinamento presencial não escala: depende de instrutor, sala, agenda. O vídeo elimina tudo isso e ainda padroniza o conteúdo — todos recebem exatamente a mesma instrução, sem variação de qualidade entre turmas.</p>

<h2>Os formatos que funcionam</h2>
<p>[IMAGEM: M5 | alt: Equipe em treinamento corporativo presencial]</p>
<ul>
  <li><strong>Onboarding</strong> — cultura, processos, ferramentas.</li>
  <li><strong>Compliance</strong> — código de conduta, LGPD, segurança.</li>
  <li><strong>Capacitação técnica</strong> — passo a passo, demonstrações.</li>
  <li><strong>Microlearning</strong> — vídeos curtos para reforço pontual.</li>
</ul>

<h2>O que diferencia um vídeo instrucional bem feito</h2>
<p>[IMAGEM: E4 | alt: Gravação de vídeo de treinamento profissional]</p>
<p>Roteiro didático, presença do instrutor, recursos gráficos (legendas, ilustrações, infográficos animados) e ritmo que respeita a atenção. Vídeo de treinamento ruim não é assistido — e quando é, não é absorvido.</p>

<h2>Métricas que o RH passa a ter</h2>
<p>[IMAGEM: E3 | alt: Painel de métricas de aprendizado corporativo]</p>
<p>Quem assistiu, quantas vezes, onde parou, quem completou. Plataformas de LMS plugam o vídeo a dashboards de RH e transformam treinamento em dado.</p>
`,
    faqs: [
      {
        q: "Posso usar o CEO ou diretor como apresentador?",
        a: "Sim — e funciona muito bem em conteúdos de cultura. Para conteúdo técnico, especialista interno costuma ser melhor.",
      },
      {
        q: "Quanto tempo deve ter cada módulo?",
        a: "Idealmente entre 3 e 8 minutos por tópico. Acima disso, divida em capítulos.",
      },
      {
        q: "Vídeo substitui treinamento presencial?",
        a: "Substitui boa parte. Para soft skills e dinâmicas, o presencial ainda agrega — mas vídeo cobre o conhecimento técnico e processual com folga.",
      },
    ],
  },
  {
    slug: "video-corporativo-contabilidade-juridico",
    title: "Vídeo corporativo para contabilidade e jurídico: como vender confiança",
    metaTitle: "Vídeo corporativo para contabilidade e jurídico",
    metaDescription:
      "Escritórios de contabilidade e jurídico vendem confiança. Veja como o vídeo corporativo posiciona o escritório e atrai o cliente certo.",
    excerpt:
      "Cliente de contabilidade e jurídico compra confiança. O vídeo é o melhor ativo para comunicar isso.",
    tldr:
      "Escritórios de contabilidade e advocacia vendem um produto intangível: confiança e segurança. O vídeo corporativo profissional comunica autoridade, humaniza o sócio e diferencia o escritório em um mercado saturado de sites genéricos.",
    category: "Tipos de vídeo",
    coverQuery: "M9",
    coverAlt:
      "Reunião de consultoria entre advogado e cliente",
    datePublished: "2026-06-21",
    keywords:
      "vídeo escritório contabilidade, vídeo advocacia, vídeo escritório advocacia, marketing jurídico, vídeo corporativo contábil, vídeo serviços profissionais",
    bodyHtml: `
<p>[IMAGEM: E4 | alt: Profissional em escritório de serviços profissionais]</p>

<h2>O cliente compra a pessoa antes do serviço</h2>
<p>[IMAGEM: M7 | alt: Reunião de consultoria com cliente]</p>
<p>Em escritórios de serviços profissionais, o cliente está delegando algo crítico — sua contabilidade, seu processo, seu patrimônio. A decisão é emocional antes de racional: ele precisa sentir confiança no profissional. Texto frio em um site não comunica isso.</p>

<h2>O formato que funciona</h2>
<p>[IMAGEM: E1 | alt: Gravação de vídeo educativo profissional]</p>
<p>Vídeo do sócio explicando como o escritório atua, conteúdo educativo respondendo dúvidas comuns do cliente ideal (com isso o profissional já entrega valor antes de cobrar) e depoimentos curtos de clientes satisfeitos.</p>

<h2>Conteúdo recorrente posiciona autoridade</h2>
<p>[IMAGEM: M6 | alt: Equipe de escritório contábil em reunião]</p>
<p>Uma gravação consegue render vários vídeos curtos para LinkedIn e YouTube. Conteúdo consistente, ao longo do tempo, transforma o sócio em autoridade reconhecida no nicho.</p>
`,
    faqs: [
      {
        q: "Não tenho desenvoltura na frente da câmera. Funciona mesmo assim?",
        a: "Sim. Boa direção e edição compensam a falta de prática. Em poucas gravações o sócio ganha naturalidade.",
      },
      {
        q: "Posso falar de casos reais?",
        a: "Com cuidado e sempre respeitando sigilo profissional. Cases anonimizados e exemplos genéricos funcionam bem.",
      },
      {
        q: "Quantos vídeos preciso para começar?",
        a: "Um institucional do escritório + 3 a 5 vídeos curtos respondendo dúvidas comuns já posicionam.",
      },
    ],
  },
  {
    slug: "drone-video-corporativo-quando-vale",
    title: "Drone em vídeo corporativo: quando vale e quando é só firula",
    metaTitle: "Drone em vídeo corporativo: quando vale e quando é firula",
    metaDescription:
      "Drone em vídeo corporativo tem usos onde transforma o resultado e usos onde só encarece. Veja onde realmente vale incluir imagens aéreas.",
    excerpt:
      "Drone virou padrão, mas nem todo vídeo precisa. Veja onde aérea agrega e onde só infla o orçamento.",
    tldr:
      "Imagem aérea agrega muito em empreendimentos imobiliários, indústria, logística, eventos e qualquer projeto onde a escala importa. Para escritórios em prédios comerciais ou serviços urbanos, costuma ser firula que encarece sem entregar valor proporcional.",
    category: "Tipos de vídeo",
    coverQuery: "B2",
    coverAlt:
      "Vista aérea de complexo corporativo",
    datePublished: "2026-06-23",
    keywords:
      "drone vídeo corporativo, drone imobiliário, drone indústria, filmagem aérea empresa, drone evento, drone marketing",
    bodyHtml: `
<p>[IMAGEM: B1 | alt: Imagem aérea urbana para vídeo corporativo]</p>

<h2>Quando o drone transforma o vídeo</h2>
<p>[IMAGEM: B2 | alt: Vista aérea de complexo corporativo]</p>
<p>Empreendimentos imobiliários (mostra entorno e implantação), indústria e logística (escala da operação), eventos ao ar livre (público e estrutura), agronegócio (extensão da área), construção civil (acompanhamento de obra). Em todos esses casos, a aérea entrega informação que a câmera no chão não consegue.</p>

<h2>Quando é só firula</h2>
<p>[IMAGEM: V3 | alt: Operação audiovisual em campo]</p>
<p>Escritórios em prédios comerciais (a aérea do prédio não diz nada do serviço), serviços puramente digitais, depoimentos de cliente. O plano aéreo entra no vídeo só para "parecer caro" e acaba comunicando o oposto: que faltou conteúdo.</p>

<h2>Cuidados técnicos e regulatórios</h2>
<p>[IMAGEM: B1 | alt: Imagem aérea cinematográfica de cidade]</p>
<p>Drone profissional exige piloto certificado pela ANAC, autorização DECEA na maior parte das áreas urbanas e seguro. Operação caseira sem registro pode multar e inviabilizar o material para uso comercial.</p>
`,
    faqs: [
      {
        q: "Drone gera quanto a mais no orçamento?",
        a: "Depende da locação e do tempo de voo, mas é um adicional relevante. Pedimos sempre se faz sentido para o objetivo.",
      },
      {
        q: "Posso usar drone em qualquer lugar?",
        a: "Não. Áreas próximas a aeroportos, helipontos e algumas regiões urbanas exigem autorização específica.",
      },
      {
        q: "Vale para evento indoor?",
        a: "Em geral não. Espaço fechado limita o drone e a imagem perde o impacto que justifica o uso.",
      },
    ],
  },
  {
    slug: "video-lancamento-produto-roteiro",
    title: "Vídeo de lançamento de produto: o roteiro que faz o lançamento converter",
    metaTitle: "Vídeo de lançamento de produto: roteiro que converte",
    metaDescription:
      "Vídeo de lançamento de produto: estrutura de roteiro, captação e métricas que separam um lançamento que vende de um que passa despercebido.",
    excerpt:
      "Lançamento de produto é janela curta. Veja a estrutura de vídeo que aumenta a conversão na hora certa.",
    tldr:
      "Um bom vídeo de lançamento estrutura o roteiro em problema → solução → diferencial → prova → CTA, capta o produto com iluminação dedicada e tem cortes para o feed, anúncio e PDV. Lançamento é janela curta — produção amadora desperdiça o investimento de toda a equipe de marketing.",
    category: "Estratégia de Vídeo",
    coverQuery: "V1",
    coverAlt:
      "Briefing de produção com claquete para lançamento de produto",
    datePublished: "2026-06-25",
    keywords:
      "vídeo lançamento produto, roteiro vídeo lançamento, vídeo go-to-market, vídeo produto novo, vídeo campanha lançamento",
    bodyHtml: `
<p>[IMAGEM: V1 | alt: Briefing de produção com claquete]</p>

<h2>A estrutura do roteiro</h2>
<p>[IMAGEM: V4 | alt: Captação de produto com câmera profissional]</p>
<ol>
  <li><strong>Problema</strong> — a dor que o produto resolve, em 5–10 segundos.</li>
  <li><strong>Solução</strong> — o produto entra como resposta.</li>
  <li><strong>Diferencial</strong> — o que faz esse produto ser melhor que as alternativas.</li>
  <li><strong>Prova</strong> — depoimento, número, demonstração.</li>
  <li><strong>CTA</strong> — onde comprar, o que fazer agora.</li>
</ol>

<h2>A captação que valoriza o produto</h2>
<p>[IMAGEM: M10 | alt: Equipe de marketing avaliando o vídeo de lançamento]</p>
<p>Iluminação dedicada, câmera estável, planos detalhados das texturas e funcionalidades. Produto bem filmado vende sozinho — produto mal filmado precisa de muito argumento para compensar.</p>

<h2>Versões que multiplicam o investimento</h2>
<p>[IMAGEM: E3 | alt: Métricas de engajamento de vídeo de lançamento]</p>
<p>De uma captação saem: vídeo principal de 60-90s, teaser de 15s, Reels verticais, GIFs para WhatsApp, peças para anúncio. Pensar nessas versões na pré-produção evita retrabalho caro depois.</p>
`,
    faqs: [
      {
        q: "Quando começar a produzir o vídeo de lançamento?",
        a: "Idealmente 60 a 90 dias antes da data de lançamento. Roteiro, captação, edição e aprovações tomam mais tempo do que se imagina.",
      },
      {
        q: "Preciso de um teaser antes do vídeo principal?",
        a: "Para lançamentos relevantes, sim. O teaser cria expectativa e ajuda o algoritmo a entender o público antes do principal entrar.",
      },
      {
        q: "Quanto custa em relação ao institucional?",
        a: "Geralmente mais, porque exige captação dedicada do produto, mais cortes e versões para várias mídias.",
      },
    ],
  },
  {
    slug: "linkedin-video-corporativo-oportunidades-b2b",
    title: "Vídeo no LinkedIn: como o B2B está perdendo oportunidades sem ele",
    metaTitle: "Vídeo no LinkedIn: o que o B2B perde sem produzir",
    metaDescription:
      "Vídeo no LinkedIn entrega 5x mais engajamento que texto, mas exige formato certo. Veja como produzir vídeo corporativo que funciona no LinkedIn.",
    excerpt:
      "Vídeo no LinkedIn tem 5x mais engajamento que texto. Veja o formato que realmente funciona para B2B.",
    tldr:
      "Vídeo no LinkedIn entrega cerca de 5x mais engajamento que post de texto, mas exige formato específico: vertical ou quadrado, legendas obrigatórias (85% assiste sem som), primeiros 3 segundos decisivos e CEO/sócio na frente da câmera. B2B que ignora vídeo no LinkedIn perde alcance para concorrentes que produzem.",
    category: "Estratégia de Vídeo",
    coverQuery: "M2",
    coverAlt:
      "Executivo apresentando para equipe corporativa",
    datePublished: "2026-06-27",
    keywords:
      "vídeo LinkedIn, vídeo corporativo LinkedIn, marketing B2B LinkedIn, vídeo CEO LinkedIn, vídeo executivo, vídeo profissional LinkedIn",
    bodyHtml: `
<p>[IMAGEM: E1 | alt: Profissional usando LinkedIn no notebook]</p>

<h2>Por que o LinkedIn priorizou vídeo</h2>
<p>[IMAGEM: E3 | alt: Painel de analytics de vídeo no LinkedIn]</p>
<p>O algoritmo do LinkedIn entrega vídeos para mais pessoas que post de texto, porque vídeo segura o usuário mais tempo na plataforma. Resultado: post em vídeo gera, em média, 5x mais engajamento que post escrito.</p>

<h2>O formato que funciona</h2>
<p>[IMAGEM: E4 | alt: Executivo gravando vídeo para LinkedIn]</p>
<ul>
  <li><strong>Vertical (9:16) ou quadrado (1:1)</strong> — feed mobile.</li>
  <li><strong>Legendas embutidas</strong> — 85% assiste sem som.</li>
  <li><strong>Hook nos primeiros 3 segundos</strong> — se não prendeu, perdeu.</li>
  <li><strong>Duração entre 30s e 2min</strong> — depende do conteúdo.</li>
  <li><strong>CEO/sócio na frente da câmera</strong> — pessoa real conecta mais que marca.</li>
</ul>

<h2>Calendário editorial e consistência</h2>
<p>[IMAGEM: E2 | alt: Planejamento de calendário editorial de vídeos]</p>
<p>O ganho real está na consistência. Uma gravação por mês com bom planejamento rende 8-12 vídeos curtos, suficientes para uma cadência semanal de meses.</p>
`,
    faqs: [
      {
        q: "Posso gravar no celular?",
        a: "Para algumas situações, sim. Para vídeo do CEO ou conteúdo de marca, vale produção profissional — celular denuncia rápido.",
      },
      {
        q: "Vídeo horizontal funciona no LinkedIn?",
        a: "Funciona, mas vertical/quadrado tem melhor performance no feed mobile, que domina o consumo.",
      },
      {
        q: "Com que frequência postar?",
        a: "1 a 2 vídeos por semana é uma cadência sustentável e suficiente para gerar resultado consistente.",
      },
    ],
  },
  {
    slug: "video-corporativo-saude-farmaceutico",
    title: "Vídeo corporativo para saúde e farmacêutico: o que comunicar (e o que não pode)",
    metaTitle: "Vídeo corporativo para saúde e farmacêutico",
    metaDescription:
      "Vídeo corporativo para saúde e farmacêutico precisa equilibrar comunicação e regras de Anvisa, CFM, CRF. Veja o que pode e o que não pode.",
    excerpt:
      "Saúde e farmacêutico têm regras de comunicação rígidas. Veja como produzir vídeo institucional sem comprometer o compliance.",
    tldr:
      "Vídeo corporativo para empresas de saúde e farmacêutico precisa respeitar as regras de Anvisa, CFM, CRF e CRO sobre publicidade de produtos e serviços de saúde. Comunique processo, equipe, infraestrutura e cultura — não prometa resultados clínicos.",
    category: "Tipos de vídeo",
    coverQuery: "HC1",
    coverAlt:
      "Profissionais de saúde em ambiente clínico",
    datePublished: "2026-06-29",
    keywords:
      "vídeo corporativo saúde, vídeo farmacêutico, vídeo hospital, vídeo clínica, marketing médico, vídeo institucional saúde, vídeo Anvisa",
    bodyHtml: `
<p>[IMAGEM: HC1 | alt: Profissionais de saúde em ambiente clínico]</p>

<h2>Por que esse setor exige cuidado redobrado</h2>
<p>[IMAGEM: M2 | alt: Reunião corporativa do setor de saúde]</p>
<p>Anvisa, CFM, CRF, CRO e outras entidades de classe têm regras claras sobre o que pode ser comunicado em publicidade de saúde. Prometer cura, exibir antes/depois sem critério, fazer comparação direta entre marcas ou usar depoimentos sem ressalvas pode gerar autuação e dano de imagem maior do que o vídeo trouxe de benefício.</p>

<h2>O que comunicar com segurança</h2>
<p><strong>Processo e diferenciais técnicos</strong> — tecnologias, certificações, protocolos.</p>
<p><strong>Equipe</strong> — profissionais, qualificação, especialidades.</p>
<p><strong>Infraestrutura</strong> — instalações, equipamentos, capacidade.</p>
<p><strong>Cultura e responsabilidade</strong> — humanização, segurança do paciente, pesquisa.</p>

<h2>O briefing certo evita problema depois</h2>
<p>Antes de gravar, alinhe roteiro com a área de compliance ou jurídica. Custa pouco e evita retrabalho, multa e a pior consequência — tirar o vídeo do ar.</p>
`,
    faqs: [
      {
        q: "Posso usar depoimento de paciente?",
        a: "Com cuidado. Anvisa e CFM têm restrições. Sempre com autorização escrita e ressalvas adequadas.",
      },
      {
        q: "Posso citar nome de medicamento?",
        a: "Depende do produto e do público. Medicamentos de prescrição têm regras estritas; OTCs têm mais flexibilidade, mas ainda sob a Anvisa.",
      },
      {
        q: "Quem aprova o vídeo antes da publicação?",
        a: "Idealmente compliance ou jurídico do contratante. A produtora não pode ser a única responsável por avaliar adequação regulatória.",
      },
    ],
  },
  {
    slug: "depoimento-cliente-video-corporativo",
    title: "Depoimento de cliente em vídeo: por que vende mais que qualquer outro formato",
    metaTitle: "Depoimento de cliente em vídeo: o ativo de marketing mais forte",
    metaDescription:
      "Depoimento de cliente em vídeo é o ativo de marketing com maior taxa de conversão. Veja como produzir um depoimento que realmente vende.",
    excerpt:
      "Cliente falando de resultado vale mais que qualquer texto comercial. Veja como produzir um depoimento que converte.",
    tldr:
      "Depoimento de cliente bem produzido é o ativo de marketing com maior taxa de conversão no B2B. Cliente real, falando de problema real e resultado mensurável, derruba as principais objeções do prospect em menos de 90 segundos. Produção precisa ser profissional para que o cliente apareça da melhor forma.",
    category: "Estratégia de Vídeo",
    coverQuery: "M9",
    coverAlt:
      "Depoimento de cliente sendo gravado em ambiente corporativo",
    datePublished: "2026-07-01",
    keywords:
      "depoimento cliente vídeo, case de sucesso vídeo, vídeo testimonial, vídeo case cliente, prova social vídeo",
    bodyHtml: `
<p>[IMAGEM: M9 | alt: Depoimento de cliente sendo gravado]</p>

<h2>Por que depoimento converte mais</h2>
<p>O prospect confia mais em outro cliente do que na própria empresa. É comportamento humano. Quando um cliente real, em vídeo, descreve o problema que tinha, como sua empresa resolveu e qual o resultado, ele derruba as três objeções mais comuns: "isso funciona?", "funciona para empresa como a minha?" e "vale o investimento?".</p>

<h2>O roteiro do depoimento</h2>
<p>[IMAGEM: M7 | alt: Fechamento de negócio entre empresas]</p>
<p>Três blocos: <strong>antes</strong> (qual era o problema, qual o impacto), <strong>durante</strong> (como foi trabalhar com sua empresa) e <strong>depois</strong> (o resultado concreto, com números sempre que possível).</p>

<h2>A produção que valoriza o depoente</h2>
<p>Iluminação cuidadosa, áudio limpo, fundo neutro do ambiente do cliente, edição que respeita o ritmo da fala. Cliente bem filmado dá depoimento que ele mesmo quer compartilhar. Cliente mal filmado fica constrangido — e o vídeo não chega ao prospect.</p>
`,
    faqs: [
      {
        q: "E se o cliente não quiser aparecer?",
        a: "Existem alternativas: depoimento em texto com foto, áudio com slides, ou cliente filmado sem foco no rosto. Mas vídeo é o formato mais forte.",
      },
      {
        q: "Quanto tempo de depoimento gravar?",
        a: "Captação de 30-45 minutos rende um vídeo principal de 60-90s e cortes curtos para redes.",
      },
      {
        q: "Posso enviar perguntas antes?",
        a: "Sim, e recomendamos. Cliente preparado entrega depoimento mais articulado e em menos tempo de gravação.",
      },
    ],
  },
  {
    slug: "motion-graphics-video-corporativo",
    title: "Motion graphics em vídeo corporativo: quando vale e quando atrapalha",
    metaTitle: "Motion graphics em vídeo corporativo: quando vale a pena",
    metaDescription:
      "Motion graphics traz clareza, mas mal usado polui. Veja quando usar animação 2D, infográficos e elementos gráficos em vídeo corporativo.",
    excerpt:
      "Motion graphics deve servir à mensagem, não a si mesmo. Veja onde animação eleva o vídeo e onde estraga.",
    tldr:
      "Motion graphics — animações 2D, infográficos, transições — agrega muito em conteúdo explicativo, dados e processos. Em depoimentos, institucionais emocionais e vídeos de cultura, costuma atrapalhar. A regra é simples: o gráfico está a serviço da mensagem, nunca o contrário.",
    category: "Tipos de vídeo",
    coverQuery: "E1",
    coverAlt:
      "Edição e motion em pós-produção de vídeo corporativo",
    datePublished: "2026-07-03",
    keywords:
      "motion graphics, animação vídeo corporativo, infográfico animado, explainer vídeo, motion design empresa, vídeo animado corporativo",
    bodyHtml: `
<p>[IMAGEM: E1 | alt: Edição e motion em pós-produção]</p>

<h2>Quando motion graphics agrega</h2>
<p>[IMAGEM: E3 | alt: Tela de pós-produção com gráficos animados]</p>
<ul>
  <li><strong>Explainer videos</strong> — explicar produto ou serviço complexo.</li>
  <li><strong>Dados e resultados</strong> — visualizar números de forma memorável.</li>
  <li><strong>Processos</strong> — mostrar etapas de um workflow.</li>
  <li><strong>Conceitos abstratos</strong> — segurança, dados, tecnologia.</li>
</ul>

<h2>Quando atrapalha</h2>
<p>Depoimentos emocionais, vídeos institucionais de cultura, conteúdo humanizado. Nesses casos, gráfico tira o foco da pessoa e quebra a conexão emocional. O excesso de motion vira ruído.</p>

<h2>O custo escondido</h2>
<p>Motion graphics é trabalho denso de pós-produção. Vídeo cheio de animação custa significativamente mais — e demora mais — do que um institucional bem filmado. Vale planejar na pré-produção, não pedir "umas animaçõezinhas" depois da edição.</p>
`,
    faqs: [
      {
        q: "Posso fazer um vídeo só com motion graphics?",
        a: "Sim, é o típico explainer animado. Funciona muito bem para produtos digitais e conceitos complexos.",
      },
      {
        q: "Motion encarece muito?",
        a: "Significativamente. Dependendo do volume, pode dobrar o custo da pós-produção. Vale pesar o ganho de clareza.",
      },
      {
        q: "Qual a diferença entre motion graphics e edição comum?",
        a: "Edição organiza o que foi filmado. Motion graphics cria elementos animados que não foram filmados — gráficos, textos, ilustrações.",
      },
    ],
  },
  {
    slug: "video-industrial-logistica-operacao",
    title: "Vídeo industrial e logístico: como mostrar a operação sem parar a operação",
    metaTitle: "Vídeo industrial e logístico: produção em ambiente operacional",
    metaDescription:
      "Vídeo industrial e logístico exige planejamento de segurança, sem interromper a produção. Veja como filmar fábrica, CD e operação com qualidade.",
    excerpt:
      "Filmar fábrica e CD pede planejamento de segurança e operação. Veja como produzir sem parar a linha.",
    tldr:
      "Vídeo industrial e logístico precisa equilibrar três coisas: comunicar a escala e o controle da operação, respeitar normas de segurança (EPI, áreas de risco, NRs) e não interromper a produção. Equipe enxuta, equipamento adequado e planejamento prévio com o time de operações são decisivos.",
    category: "Tipos de vídeo",
    coverQuery: "I1",
    coverAlt:
      "Operação industrial com maquinário em fábrica",
    datePublished: "2026-07-05",
    keywords:
      "vídeo industrial, vídeo fábrica, vídeo logística, vídeo CD centro de distribuição, vídeo operação industrial, vídeo segurança trabalho",
    bodyHtml: `
<p>[IMAGEM: I1 | alt: Operação industrial com maquinário]</p>

<h2>O que o vídeo industrial precisa comunicar</h2>
<p>[IMAGEM: I2 | alt: Logística e transporte corporativo]</p>
<p>Escala da operação, controle de qualidade, segurança, certificações, capacidade produtiva, integração logística. O cliente B2B que assiste quer conferir robustez — não estética.</p>

<h2>Os cuidados de segurança que sempre aparecem</h2>
<p>EPI completo (e adequado à área), respeito a sinalizações, briefing prévio com brigada/SESMT, autorização para áreas classificadas e horários de menor movimento. Equipe que ignora isso vira problema operacional sério.</p>

<h2>Captação sem parar a produção</h2>
<p>Câmera com estabilizador para acompanhar fluxos, drone interno (em CDs amplos) para mostrar escala, planos longos sem cortes para transmitir continuidade. Quando bem produzido, o vídeo industrial vira ativo comercial poderoso — clientes B2B fecham contrato depois de verem a operação.</p>
`,
    faqs: [
      {
        q: "Drone pode ser usado dentro de galpão?",
        a: "Em geral sim, com cuidados de segurança e autorização do gestor da operação. Em fábricas com áreas classificadas (Ex), não.",
      },
      {
        q: "Preciso parar a linha de produção?",
        a: "Idealmente não. Bom planejamento permite captar sem interrupção. Pausas, quando necessárias, são curtas e pontuais.",
      },
      {
        q: "Pessoas filmadas precisam assinar autorização?",
        a: "Sim. Todo colaborador filmado de forma identificável deve autorizar o uso de imagem por escrito.",
      },
    ],
  },
  {
    slug: "acessibilidade-video-corporativo-legendas",
    title: "Acessibilidade em vídeo corporativo: por que legendas viraram obrigação",
    metaTitle: "Acessibilidade em vídeo corporativo: legendas e mais",
    metaDescription:
      "Legendas, audiodescrição e LIBRAS em vídeo corporativo deixaram de ser bônus. Veja por que acessibilidade impacta alcance, ESG e compliance.",
    excerpt:
      "Acessibilidade em vídeo virou padrão: legendas, audiodescrição e LIBRAS deixaram de ser bônus. Veja por quê.",
    tldr:
      "Legendas, audiodescrição e LIBRAS em vídeo corporativo deixaram de ser diferencial e viraram padrão. Aumentam alcance (85% assiste sem som), atendem ESG e LBI (Lei Brasileira de Inclusão), e melhoram SEO. Produção que não considera acessibilidade desde o briefing fica para trás.",
    category: "Estratégia de Vídeo",
    coverQuery: "M5",
    coverAlt:
      "Equipe corporativa inclusiva em reunião",
    datePublished: "2026-07-07",
    keywords:
      "acessibilidade vídeo, legenda vídeo corporativo, LIBRAS vídeo, audiodescrição vídeo, ESG vídeo, LBI lei brasileira inclusão",
    bodyHtml: `
<p>[IMAGEM: E1 | alt: Vídeo corporativo com legendas no notebook]</p>

<h2>Os três motivos que tornaram acessibilidade obrigatória</h2>
<p>[IMAGEM: M5 | alt: Equipe corporativa inclusiva em reunião]</p>
<p><strong>Alcance:</strong> 85% das pessoas assiste vídeo no celular sem som. Sem legenda, sua mensagem some.</p>
<p><strong>ESG e compliance:</strong> grandes empresas exigem fornecedores aderentes a critérios de acessibilidade. A LBI (Lei 13.146/2015) determina padrões.</p>
<p><strong>SEO:</strong> plataformas indexam o texto da legenda. Vídeo legendado é mais encontrado.</p>

<h2>Os formatos de acessibilidade</h2>
<ul>
  <li><strong>Legenda descritiva</strong> — texto da fala + indicações de áudio (música, ruído).</li>
  <li><strong>Audiodescrição</strong> — narração que descreve o que aparece em tela, para deficientes visuais.</li>
  <li><strong>LIBRAS</strong> — janela com intérprete de Língua Brasileira de Sinais.</li>
</ul>

<h2>Planejar acessibilidade na pré-produção custa menos</h2>
<p>Adicionar legendas e LIBRAS depois é trabalho retroativo caro. Quando entram no briefing, o roteiro já considera pausas, enquadramentos com espaço para janela e ritmo compatível.</p>
`,
    faqs: [
      {
        q: "Legenda automática do YouTube serve?",
        a: "Para conteúdo informal sim, mas tem erros. Para vídeo corporativo, legenda revisada é o padrão.",
      },
      {
        q: "LIBRAS é obrigatória?",
        a: "Para órgãos públicos e algumas situações, sim. Para empresas privadas, é fortemente recomendada e cada vez mais cobrada por contratantes.",
      },
      {
        q: "Quanto encarece adicionar acessibilidade?",
        a: "Legenda é barata. LIBRAS e audiodescrição têm custo proporcional ao tempo do vídeo, mas planejadas na pré-produção ficam mais econômicas.",
      },
    ],
  },
  {
    slug: "employer-branding-video-rh-cultura",
    title: "Vídeo de employer branding: como o RH vence a guerra por talento",
    metaTitle: "Vídeo de employer branding: o RH ganha a guerra por talento",
    metaDescription:
      "Vídeo de employer branding mostra cultura, equipe e propósito. Veja como o RH usa vídeo para atrair e reter os melhores talentos.",
    excerpt:
      "Talento bom escolhe onde quer trabalhar. Veja como o vídeo de employer branding faz sua empresa ser a escolha.",
    tldr:
      "Vídeo de employer branding mostra cultura real, equipe e propósito — não folder corporativo. Em um mercado em que o talento bom escolhe a empresa, o vídeo é a forma mais eficaz de comunicar por que vale trabalhar ali. Reduz custo de recrutamento e melhora retenção.",
    category: "Estratégia de Vídeo",
    coverQuery: "M6",
    coverAlt:
      "Reunião de equipe corporativa engajada",
    datePublished: "2026-07-09",
    keywords:
      "employer branding, vídeo RH, vídeo cultura empresa, atração de talento, vídeo recrutamento, marca empregadora",
    bodyHtml: `
<p>[IMAGEM: M6 | alt: Cultura organizacional em reunião de equipe]</p>

<h2>Por que o vídeo de cultura virou estratégia de RH</h2>
<p>[IMAGEM: M4 | alt: Time corporativo engajado em apresentação]</p>
<p>Candidato sênior pesquisa a empresa antes de aceitar entrevista. LinkedIn, Glassdoor, redes sociais — em todos esses lugares, vídeo de cultura aparece. Quando bem produzido, ele encurta o funil de recrutamento, atrai perfis aderentes e reduz turnover de quem entra.</p>

<h2>O que mostrar (e o que não mostrar)</h2>
<p><strong>Sim:</strong> rotina real, lideranças acessíveis, equipe diversa, projetos relevantes, benefícios concretos, momentos genuínos.</p>
<p><strong>Não:</strong> coreografia de happy hour, frases prontas sobre "ser família", clichês de comunicação interna que ninguém acredita.</p>

<h2>O depoimento do colaborador é o melhor formato</h2>
<p>Funcionário falando por que escolheu a empresa, o que faz no dia a dia e como a cultura aparece na prática vale mais que qualquer manifesto institucional. Captação simples, edição que respeita a fala, mínima narração — o conteúdo é a pessoa.</p>
`,
    faqs: [
      {
        q: "Posso ter colaboradores em vídeo sem autorização?",
        a: "Não. Todo colaborador identificável precisa assinar autorização de uso de imagem, mesmo em vídeo interno.",
      },
      {
        q: "Funciona para empresa pequena?",
        a: "Sim, e até mais. Empresa pequena tem cultura mais visível e personalidade clara — material rico para vídeo.",
      },
      {
        q: "Com que frequência produzir?",
        a: "Um vídeo principal por ano + 4 a 6 vídeos curtos de equipe ao longo do ano é uma cadência sustentável.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return posts
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}
