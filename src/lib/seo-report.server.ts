import { supabaseAdmin } from "@/integrations/supabase/client.server";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE_URL = "https://videoscorporativos.com.br/";

export type ReportRow = {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  prevClicks: number;
  prevImpressions: number;
  prevCtr: number;
  prevPosition: number;
  ctrDelta: number;
  positionDelta: number;
  clicksDelta: number;
};

export type SeoReport = {
  periodStart: string;
  periodEnd: string;
  prevStart: string;
  prevEnd: string;
  totals: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    prevClicks: number;
    prevImpressions: number;
    prevCtr: number;
    prevPosition: number;
  };
  pages: ReportRow[];
  queries: ReportRow[];
};

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Mês completo anterior à data de referência (ex.: em 03/09 devolve 01/08–31/08). */
export function monthRange(ref = new Date()) {
  const end = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), 0));
  const start = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 1));
  const prevEnd = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 0));
  const prevStart = new Date(Date.UTC(prevEnd.getUTCFullYear(), prevEnd.getUTCMonth(), 1));
  return {
    periodStart: iso(start),
    periodEnd: iso(end),
    prevStart: iso(prevStart),
    prevEnd: iso(prevEnd),
  };
}

function headers() {
  const lov = process.env.LOVABLE_API_KEY;
  const gsc = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
  if (!lov) throw new Error("LOVABLE_API_KEY ausente no servidor.");
  if (!gsc) throw new Error("Conexão Google Search Console não encontrada.");
  return {
    Authorization: `Bearer ${lov}`,
    "X-Connection-Api-Key": gsc,
    "Content-Type": "application/json",
  };
}

type GscRow = {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
};

async function query(
  dimension: "page" | "query" | null,
  startDate: string,
  endDate: string,
): Promise<GscRow[]> {
  const res = await fetch(
    `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        startDate,
        endDate,
        ...(dimension ? { dimensions: [dimension] } : {}),
        rowLimit: dimension ? 200 : 1,
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`Search Console [${res.status}]: ${(await res.text()).slice(0, 300)}`);
  }
  const json = (await res.json()) as { rows?: GscRow[] };
  return json.rows ?? [];
}

function merge(current: GscRow[], previous: GscRow[]): ReportRow[] {
  const prev = new Map(previous.map((r) => [r.keys?.[0] ?? "", r]));
  const rows = current.map((r) => {
    const key = r.keys?.[0] ?? "";
    const p = prev.get(key);
    const ctr = (r.ctr ?? 0) * 100;
    const prevCtr = (p?.ctr ?? 0) * 100;
    return {
      key,
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: Number(ctr.toFixed(2)),
      position: Number((r.position ?? 0).toFixed(1)),
      prevClicks: p?.clicks ?? 0,
      prevImpressions: p?.impressions ?? 0,
      prevCtr: Number(prevCtr.toFixed(2)),
      prevPosition: Number((p?.position ?? 0).toFixed(1)),
      ctrDelta: Number((ctr - prevCtr).toFixed(2)),
      // Posição menor é melhor: delta positivo = subiu no ranking.
      positionDelta: p ? Number(((p.position ?? 0) - (r.position ?? 0)).toFixed(1)) : 0,
      clicksDelta: (r.clicks ?? 0) - (p?.clicks ?? 0),
    };
  });
  return rows.sort((a, b) => b.impressions - a.impressions);
}

/** Monta o relatório do mês completo anterior comparando com o mês retrasado. */
export async function buildMonthlyReport(ref = new Date()): Promise<SeoReport> {
  const { periodStart, periodEnd, prevStart, prevEnd } = monthRange(ref);
  const [totalNow, totalPrev, pagesNow, pagesPrev, queriesNow, queriesPrev] =
    await Promise.all([
      query(null, periodStart, periodEnd),
      query(null, prevStart, prevEnd),
      query("page", periodStart, periodEnd),
      query("page", prevStart, prevEnd),
      query("query", periodStart, periodEnd),
      query("query", prevStart, prevEnd),
    ]);
  const t = totalNow[0] ?? {};
  const tp = totalPrev[0] ?? {};
  return {
    periodStart,
    periodEnd,
    prevStart,
    prevEnd,
    totals: {
      clicks: t.clicks ?? 0,
      impressions: t.impressions ?? 0,
      ctr: Number(((t.ctr ?? 0) * 100).toFixed(2)),
      position: Number((t.position ?? 0).toFixed(1)),
      prevClicks: tp.clicks ?? 0,
      prevImpressions: tp.impressions ?? 0,
      prevCtr: Number(((tp.ctr ?? 0) * 100).toFixed(2)),
      prevPosition: Number((tp.position ?? 0).toFixed(1)),
    },
    pages: merge(pagesNow, pagesPrev),
    queries: merge(queriesNow, queriesPrev),
  };
}

/** Gera e persiste o relatório do mês (upsert por período). */
export async function generateAndStoreMonthlyReport(
  source: "cron-monthly" | "admin-button",
  ref = new Date(),
) {
  const report = await buildMonthlyReport(ref);
  const { error } = await supabaseAdmin.from("seo_reports").upsert(
    {
      period_start: report.periodStart,
      period_end: report.periodEnd,
      source,
      totals: { ...report.totals, prevStart: report.prevStart, prevEnd: report.prevEnd },
      pages: report.pages,
      queries: report.queries,
    },
    { onConflict: "period_start,period_end" },
  );
  if (error) throw new Error(`Falha ao salvar relatório: ${error.message}`);
  return report;
}

function sign(n: number) {
  return n > 0 ? `+${n}` : `${n}`;
}

/** Converte o relatório em Markdown pronto para download. */
export function reportToMarkdown(report: SeoReport): string {
  const t = report.totals;
  const lines: string[] = [
    `# Relatório de SEO — ${report.periodStart} a ${report.periodEnd}`,
    "",
    `Comparativo com o período anterior (${report.prevStart} a ${report.prevEnd}). Fonte: Google Search Console.`,
    "",
    "## Resumo",
    "",
    "| Métrica | Período | Anterior | Variação |",
    "| --- | --- | --- | --- |",
    `| Cliques | ${t.clicks} | ${t.prevClicks} | ${sign(t.clicks - t.prevClicks)} |`,
    `| Impressões | ${t.impressions} | ${t.prevImpressions} | ${sign(t.impressions - t.prevImpressions)} |`,
    `| CTR | ${t.ctr}% | ${t.prevCtr}% | ${sign(Number((t.ctr - t.prevCtr).toFixed(2)))} p.p. |`,
    `| Posição média | ${t.position} | ${t.prevPosition} | ${sign(Number((t.prevPosition - t.position).toFixed(1)))} |`,
    "",
    "## Páginas",
    "",
    "| Página | Cliques | Impressões | CTR | Δ CTR (p.p.) | Posição | Δ Posição |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...report.pages
      .slice(0, 50)
      .map(
        (r) =>
          `| ${r.key} | ${r.clicks} | ${r.impressions} | ${r.ctr}% | ${sign(r.ctrDelta)} | ${r.position} | ${sign(r.positionDelta)} |`,
      ),
    "",
    "## Palavras-chave",
    "",
    "| Palavra-chave | Cliques | Impressões | CTR | Δ CTR (p.p.) | Posição | Δ Posição |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...report.queries
      .slice(0, 50)
      .map(
        (r) =>
          `| ${r.key} | ${r.clicks} | ${r.impressions} | ${r.ctr}% | ${sign(r.ctrDelta)} | ${r.position} | ${sign(r.positionDelta)} |`,
      ),
    "",
  ];
  return lines.join("\n");
}

/** Reconstrói um SeoReport a partir da linha persistida. */
export function rowToReport(row: {
  period_start: string;
  period_end: string;
  totals: Record<string, unknown>;
  pages: unknown;
  queries: unknown;
}): SeoReport {
  const totals = row.totals as SeoReport["totals"] & {
    prevStart?: string;
    prevEnd?: string;
  };
  return {
    periodStart: row.period_start,
    periodEnd: row.period_end,
    prevStart: totals.prevStart ?? "",
    prevEnd: totals.prevEnd ?? "",
    totals,
    pages: (row.pages as ReportRow[]) ?? [],
    queries: (row.queries as ReportRow[]) ?? [],
  };
}
