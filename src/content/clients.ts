import { getAllCases, type CaseItem } from "@/lib/portfolio-slugs";

export type Client = {
  slug: string;
  name: string;
  sector: string;
  summary: string;
  match: RegExp;
};

export const clients: Client[] = [
  { slug: "abradilan", name: "ABRADILAN", sector: "Associação · Distribuição farmacêutica", summary: "Parceria de longo prazo cobrindo fóruns, convenções nacionais e internacionais e o aniversário de 25 anos da associação.", match: /abradilan/i },
  { slug: "ativa-log", name: "ATIVA Log", sector: "Logística e armazenagem", summary: "Série de vídeos institucionais, operação de centro de distribuição, programa de sustentabilidade e comunicação de fim de ano.", match: /ativa ?log/i },
  { slug: "tecnisa", name: "Tecnisa", sector: "Incorporação imobiliária", summary: "Cobertura em vídeo de convenção de vendas, confraternização e relacionamento com fornecedores.", match: /tecnisa/i },
  { slug: "sq-quimica", name: "SQ Química", sector: "Indústria química", summary: "Vídeo institucional de unidade fabril, coberturas em feiras (FCE Pharma, ABRAFATI) e premiação SITIVESP.", match: /sq qu[ií]mica/i },
  { slug: "ibde", name: "IBDE", sector: "Instituto jurídico · Congressos", summary: "Cobertura de congressos de Direito da Empresa no Brasil e no exterior (Rio de Janeiro e Mendoza).", match: /ibde|direito da empresa/i },
  { slug: "nitriflex", name: "Nitriflex", sector: "Indústria química de polímeros", summary: "Vídeo institucional apresentando a planta, a tecnologia e o posicionamento da indústria.", match: /nitriflex/i },
  { slug: "fiorde-logistica", name: "Fiorde Logística", sector: "Logística integrada", summary: "Vídeo institucional sobre soluções logísticas integradas para empresas.", match: /fiorde/i },
  { slug: "flexfunds", name: "FlexFunds", sector: "Mercado financeiro", summary: "Vídeo institucional para apresentar fundos de investimento e soluções financeiras.", match: /flexfunds/i },
  { slug: "ibis", name: "ibis (Accor)", sector: "Hotelaria", summary: "Teaser de inauguração, vídeo manifesto e cobertura de evento em unidades ibis.", match: /ibis/i },
  { slug: "rocha-e-queiroz-advogados", name: "Rocha & Queiroz Advogados", sector: "Escritório de advocacia", summary: "Vídeos institucionais que apresentam o escritório, a equipe e as áreas de atuação.", match: /rocha & queiroz/i },
  { slug: "galena", name: "Galena", sector: "Indústria farmacêutica", summary: "Vídeos comemorativos dos 35 anos e do evento Galena Celebra.", match: /galena/i },
  { slug: "onemba", name: "OneMBA", sector: "Educação executiva", summary: "Produção audiovisual das turmas internacionais do OneMBA em São Paulo.", match: /onemba/i },
  { slug: "farmarcas", name: "Farmarcas", sector: "Rede de farmácias", summary: "Cobertura em vídeo dos encontros anuais da rede.", match: /farmarcas/i },
  { slug: "sitivesp", name: "SITIVESP", sector: "Sindicato da indústria de tintas", summary: "Vídeo dos 80 anos do sindicato e cobertura de premiações do setor.", match: /sitivesp/i },
];

export function casesForClient(c: Client): CaseItem[] {
  return getAllCases().filter((x) => c.match.test(x.title));
}

export function getClient(slug: string) {
  return clients.find((c) => c.slug === slug);
}
