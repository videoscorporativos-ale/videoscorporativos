import { useState } from "react";
import { Play, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "Todos" | "Institucional" | "Eventos" | "Feiras" | "Reels";

export type PortfolioItem = { title: string; category: Exclude<Category, "Todos">; videoId: string };

export const portfolioItems: PortfolioItem[] = [
  // Ordem espelhada de alefotografo.com.br/videos-para-empresas (do mais novo ao mais antigo).
  { title: "Procooler na FEBRAVA — Cobertura de Feiras e Eventos Corporativos", category: "Feiras", videoId: "uFNcEB1uvAA" },
  { title: "SQ Química na FCE Pharma — Cobertura em Vídeo para Feiras de Negócios", category: "Feiras", videoId: "WGtAZjK5v9Q" },
  { title: "Tecnisa — Almoço com Fornecedores", category: "Eventos", videoId: "zmUyWgXxOnk" },
  { title: "Curso de Prestação de Contas Eleitorais 2026 — Turma São Paulo", category: "Eventos", videoId: "xYb2yPxMcL8" },
  { title: "Nini Bambini — Moda Infantil com Encanto e Estilo", category: "Reels", videoId: "iyxP0y_nSgc" },
  { title: "Unipac 50 Anos", category: "Eventos", videoId: "Ze3Tf9X1q_g" },
  { title: "Women in Tech Brasil", category: "Reels", videoId: "4-HGedVzqAA" },
  { title: "FINCON — 1º Encontro da Comunicação Financeira", category: "Reels", videoId: "z_98miIgOZA" },
  { title: "Genesis IA na Feira Hospitalar", category: "Reels", videoId: "0fYFQ9PCQhM" },
  { title: "11º Fórum ABRADILAN 2026", category: "Eventos", videoId: "p-JHaQ8GJ5M" },
  { title: "11º Fórum ABRADILAN 2026 — Vídeo Corporativo do Evento", category: "Eventos", videoId: "gSngB97GbcQ" },
  { title: "Nitriflex — Indústria Química de Polímeros e Borrachas Nitrílicas", category: "Institucional", videoId: "VzEBf22nMJg" },
  { title: "FlexFunds — Fundos de Investimento e Soluções Financeiras", category: "Institucional", videoId: "S5Uc9ZfKObI" },
  { title: "Fiorde Logística — Soluções Logísticas Integradas para Empresas", category: "Institucional", videoId: "iod4JyF9l6w" },
  { title: "ATIVA Log — Vídeo Institucional", category: "Institucional", videoId: "nkHJbeXx5Qo" },
  { title: "Vídeo Manifesto — Empreendimento, Estrutura e Propósito", category: "Institucional", videoId: "isrDJDmcOvE" },
  { title: "ibis Jaú — Evento e Experiência Audiovisual", category: "Eventos", videoId: "0b5TzqvHyxs" },
  { title: "Curso de Prestação de Contas Eleitorais 2026 — Professora Rita", category: "Eventos", videoId: "qsmVfufY6TM" },
  { title: "VIII Congresso Brasileiro de Direito da Empresa — IBDE Rio 2026", category: "Eventos", videoId: "6A7a7AaCX2Y" },
  { title: "OneMBA — Produção Audiovisual", category: "Eventos", videoId: "EmO4fVfDYWM" },
  { title: "22º Fórum de Compras & Sourcing", category: "Eventos", videoId: "DT4MCU5Xtqw" },
  { title: "Faz Farma Faz Negócio — 9ª Edição", category: "Feiras", videoId: "dFn6YIwakBI" },
  { title: "Depoimento de Cliente — Hausy Robotton", category: "Institucional", videoId: "3oqAVErx48w" },
  { title: "BMX Logística — Vídeo Institucional", category: "Institucional", videoId: "fsx2OBjkzFc" },
  { title: "9º Fórum ABRADILAN", category: "Eventos", videoId: "285bF1csiwA" },
  { title: "Professora Rita — Curso de Prestação de Contas Eleitorais 2024", category: "Eventos", videoId: "-CiaVIA5dpQ" },
  { title: "UNITEC — Vídeo Institucional", category: "Institucional", videoId: "_bdJOuE4I3Q" },
  { title: "ATIVA Log — Estrutura, Operação e Eficiência Logística", category: "Institucional", videoId: "x_XuKwIA5cE" },
  { title: "IBDE Mendoza — III Congresso Internacional", category: "Eventos", videoId: "GPmdEz8JwxU" },
  { title: "ABRADILAN 25 Anos", category: "Eventos", videoId: "Xm_357kCK00" },
  { title: "Encontro Farmarcas 2023", category: "Eventos", videoId: "b91pHq5zOPc" },
  { title: "15ª Convenção ABRADILAN — Punta Cana", category: "Eventos", videoId: "TAv6Obk3TVE" },
  { title: "Convenção de Vendas Tecnisa 2023", category: "Eventos", videoId: "cm3c0eMpL9M" },
  { title: "Copapharma — Coquetel de Lançamento", category: "Eventos", videoId: "I2r_IBgFbdE" },
  { title: "Faz Negócios 3", category: "Feiras", videoId: "C6XQuyikcrM" },
  { title: "Festa de Confraternização Tecnisa 2022", category: "Eventos", videoId: "-PL7myCgsgw" },
  { title: "III Congresso Brasileiro de Direito da Empresa", category: "Eventos", videoId: "b1z0NHf4QYU" },
  { title: "SQ Química — 34º Prêmio SITIVESP de Fornecedor do Ano", category: "Eventos", videoId: "dk38Bmjy-Os" },
  { title: "OneMBA Class 2023 — São Paulo", category: "Eventos", videoId: "clXZzDxmSh0" },
  { title: "Galena Celebra", category: "Eventos", videoId: "9lX_53reZN8" },
  { title: "SIPAT 2022 — Foseco", category: "Eventos", videoId: "Js0RdcfsXo4" },
  { title: "SQ Química — Unidade Vinhedo", category: "Institucional", videoId: "g5Lvz0ugdyI" },
  { title: "Encontro Farmarcas 2022", category: "Eventos", videoId: "osKTMaS96D8" },
  { title: "I Congresso Brasileiro de Direito da Empresa no Novo Futebol — IBDE", category: "Eventos", videoId: "3LECyXdj3HQ" },
  { title: "Galena 35 Anos", category: "Eventos", videoId: "JG6KloCm3jA" },
  { title: "ATIVA Logística — Programa de Sustentabilidade", category: "Institucional", videoId: "aOiYST9L8ec" },
  { title: "SQ Química na ABRAFATI Show 2022", category: "Feiras", videoId: "ufqmkFC6lrw" },
  { title: "Ensaio de Retratos Profissionais — Ale Fotógrafo", category: "Reels", videoId: "h2lRpMbOF_w" },
  { title: "Confraternização ABRADILAN", category: "Eventos", videoId: "2xd_0_EuMpM" },
  { title: "7º Fórum ABRADILAN de Desenvolvimento Empresarial", category: "Eventos", videoId: "8wnIwksSzZY" },
  { title: "Retratos Profissionais em Estúdio", category: "Reels", videoId: "ZPBa1hfp9S0" },
  { title: "Retrato Corporativo — Ensaio Fotográfico", category: "Reels", videoId: "zuPikKnrM40" },
  { title: "IBIS Botucatu — Teaser de Inauguração", category: "Institucional", videoId: "niLTzkDS8_8" },
  { title: "IBIS Botucatu — Vídeo Manifesto", category: "Institucional", videoId: "PDFwTUHOwiY" },
  { title: "Curso de Prestação de Contas Eleitorais — Professora Rita Gonçalves", category: "Eventos", videoId: "bpsY_yi4qfQ" },
  { title: "Latin Sales Meeting 2022 — Punta Cana", category: "Eventos", videoId: "YhHZU7MULgE" },
  { title: "Jantar Febrafar 2022", category: "Eventos", videoId: "MaG2NwbxVxc" },
  { title: "Salomão Concursos — Aulão em São Paulo", category: "Eventos", videoId: "Ou1-75sNL-s" },
  { title: "Renove Mudanças — Institucional", category: "Institucional", videoId: "Y7YKDeR9TrE" },
  { title: "SITIVESP 80 Anos", category: "Eventos", videoId: "2hCd4N_QAJg" },
  { title: "Rocha & Queiroz — Vídeo do Escritório", category: "Institucional", videoId: "3Jm3PyVBZDo" },
  { title: "LATAM Sales Meeting 2021 — Convatec", category: "Eventos", videoId: "YT44mYNhlkA" },
  { title: "ATIVA Logística — Institucional", category: "Institucional", videoId: "jRq5LqzarHc" },
  { title: "Rocha & Queiroz Advogados — Institucional", category: "Institucional", videoId: "ITBhZlBQd6E" },
  { title: "ATIVALOG — Vídeo de Boas Festas", category: "Institucional", videoId: "M5rpZqjInHE" },
  { title: "Sustainable Foods Summit — São Paulo", category: "Feiras", videoId: "utaOjr3Dqxw" },
  { title: "Encontro de Craques — Germed", category: "Eventos", videoId: "MVea__twp3A" },
  { title: "ATIVA Logística — Centro de Distribuição Itapevi", category: "Institucional", videoId: "T4Uh7_Zcka8" },
  { title: "FCW — Prêmio Almirante Álvaro Alberto", category: "Eventos", videoId: "IEJhGi9yiMk" },
];

export const thumbFor = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
export const hiResThumbFor = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

/** Frentes de serviço + destaques do portfólio, integrados em uma única dobra. */
export const serviceSections: {
  id: string;
  category: Exclude<Category, "Todos">;
  title: string;
  description: string;
  vertical?: boolean;
  videoIds: string[];
}[] = [
  {
    id: "institucional",
    category: "Institucional",
    title: "Vídeo Institucional",
    description:
      "Conte a história, os valores e o diferencial da sua empresa em um filme que transmite credibilidade.",
    videoIds: [
      "nkHJbeXx5Qo",
      "isrDJDmcOvE",
      "iod4JyF9l6w",
      "Y7YKDeR9TrE",
      "VzEBf22nMJg",
      "S5Uc9ZfKObI",
      "3oqAVErx48w",
      "fsx2OBjkzFc",
      "_bdJOuE4I3Q",
      "x_XuKwIA5cE",
      "g5Lvz0ugdyI",
      "aOiYST9L8ec",
      "niLTzkDS8_8",
      "PDFwTUHOwiY",
      "3Jm3PyVBZDo",
      "jRq5LqzarHc",
      "ITBhZlBQd6E",
      "M5rpZqjInHE",
      "T4Uh7_Zcka8",
    ],
  },
  {
    id: "eventos",
    category: "Eventos",
    title: "Eventos Corporativos",
    description:
      "Cobertura completa de convenções, congressos e confraternizações, com entrega ágil e qualidade de cinema.",
    videoIds: [
      "xYb2yPxMcL8",
      "Ze3Tf9X1q_g",
      "0b5TzqvHyxs",
      "6A7a7AaCX2Y",
      "zmUyWgXxOnk",
      "p-JHaQ8GJ5M",
      "gSngB97GbcQ",
      "qsmVfufY6TM",
      "EmO4fVfDYWM",
      "DT4MCU5Xtqw",
      "285bF1csiwA",
      "-CiaVIA5dpQ",
      "GPmdEz8JwxU",
      "Xm_357kCK00",
      "b91pHq5zOPc",
      "TAv6Obk3TVE",
      "cm3c0eMpL9M",
      "I2r_IBgFbdE",
      "-PL7myCgsgw",
      "b1z0NHf4QYU",
      "dk38Bmjy-Os",
      "clXZzDxmSh0",
      "9lX_53reZN8",
      "Js0RdcfsXo4",
      "osKTMaS96D8",
      "3LECyXdj3HQ",
      "JG6KloCm3jA",
      "2xd_0_EuMpM",
      "8wnIwksSzZY",
      "bpsY_yi4qfQ",
      "YhHZU7MULgE",
      "MaG2NwbxVxc",
      "Ou1-75sNL-s",
      "2hCd4N_QAJg",
      "YT44mYNhlkA",
      "MVea__twp3A",
      "IEJhGi9yiMk",
    ],
  },
  {
    id: "feiras",
    category: "Feiras",
    title: "Feiras de Negócios",
    description:
      "Registro e aftermovie da sua participação em feiras, para gerar conteúdo e provar resultado.",
    videoIds: [
      "uFNcEB1uvAA",
      "WGtAZjK5v9Q",
      "dFn6YIwakBI",
      "ufqmkFC6lrw",
      "C6XQuyikcrM",
      "utaOjr3Dqxw",
    ],
  },
  {
    id: "reels",
    category: "Reels",
    title: "Reels e Vídeos Verticais",
    description:
      "Conteúdo curto e vertical para Instagram, LinkedIn e TikTok — feito para prender atenção nos primeiros segundos.",
    vertical: true,
    videoIds: [
      "iyxP0y_nSgc",
      "4-HGedVzqAA",
      "z_98miIgOZA",
      "0fYFQ9PCQhM",
      "h2lRpMbOF_w",
      "ZPBa1hfp9S0",
      "zuPikKnrM40",
    ],
  },
];

const byId = new Map(portfolioItems.map((i) => [i.videoId, i]));

const INITIAL_VISIBLE = 4;
const EXPAND_STEP = 4;

export function Portfolio() {
  const [active, setActive] = useState<string>(serviceSections[0].id);
  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(serviceSections.map((s) => [s.id, INITIAL_VISIBLE])),
  );

  const section = serviceSections.find((s) => s.id === active) ?? serviceSections[0];
  const allItems = section.videoIds
    .map((id) => byId.get(id))
    .filter((i): i is PortfolioItem => Boolean(i));
  const visibleCount = visibleCounts[section.id] ?? INITIAL_VISIBLE;
  const items = allItems.slice(0, visibleCount);
  const hasMore = visibleCount < allItems.length;
  const remaining = allItems.length - visibleCount;

  const handleTabChange = (id: string) => {
    setActive(id);
    setVisibleCounts((prev) => ({ ...prev, [id]: prev[id] ?? INITIAL_VISIBLE }));
  };

  const handleExpand = () => {
    setVisibleCounts((prev) => ({
      ...prev,
      [section.id]: Math.min(prev[section.id] ?? INITIAL_VISIBLE, allItems.length) + EXPAND_STEP,
    }));
  };

  return (
    <section id="servicos" className="py-24 md:py-32 bg-surface/30 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-brand">Serviços & Portfólio</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Quatro frentes, um único padrão de qualidade.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Escolha a frente e veja trabalhos reais entregues para empresas. Expanda cada seção
            para conferir mais cases do mesmo serviço.
          </p>
        </div>

        <div
          className="mt-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Frentes de serviço"
        >
          {serviceSections.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={active === s.id}
              onClick={() => handleTabChange(s.id)}
              className={cn(
                "rounded-full px-5 py-2 text-sm border transition",
                active === s.id
                  ? "bg-brand text-brand-foreground border-brand"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40",
              )}
            >
              {s.title}
            </button>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
          {section.description}
        </p>

        <div
          className={cn(
            "mt-8 grid gap-4 sm:grid-cols-2",
            section.vertical ? "sm:grid-cols-4 gap-3 max-w-3xl" : "lg:grid-cols-2",
          )}
        >
          {items.map((item) => (
            <button
              key={item.videoId}
              onClick={() => setOpenVideo(item.videoId)}
              aria-label={`Assistir: ${item.title}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border bg-surface text-left transition hover:border-brand/40",
                section.vertical ? "aspect-[9/16]" : "aspect-video",
              )}
            >
              <img
                loading="lazy"
                src={thumbFor(item.videoId)}
                alt={`${item.title} — vídeo ${item.category.toLowerCase()} corporativo por Ale Fotógrafo`}
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="size-14 rounded-full bg-brand text-brand-foreground flex items-center justify-center">
                  <Play className="size-5 fill-current ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs uppercase tracking-widest text-brand">{item.category}</p>
                <p className="mt-1 font-display font-medium line-clamp-2">{item.title}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {hasMore && (
            <button
              type="button"
              onClick={handleExpand}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium hover:bg-surface transition"
            >
              Ver mais {Math.min(remaining, EXPAND_STEP)} cases de {section.title}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-6 py-3 text-sm font-medium text-brand transition hover:bg-brand/20"
          >
            Não sabe qual formato precisa? Fale comigo
          </a>
        </div>
      </div>

      {openVideo && (
        <div
          className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpenVideo(null)}
        >
          <button
            className="absolute top-6 right-6 size-10 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-brand hover:text-brand-foreground transition"
            onClick={() => setOpenVideo(null)}
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>
          <div
            className={cn(
              "overflow-hidden rounded-xl border border-border",
              section.vertical
                ? "h-[80vh] aspect-[9/16] max-w-full"
                : "w-full max-w-5xl aspect-video",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${openVideo}?autoplay=1`}
              title="Vídeo"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="size-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
