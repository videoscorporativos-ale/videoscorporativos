import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getAllPosts } from "@/content/posts";
import {
  resubmitSitemap,
  requestIndexing,
  inspectUrl,
  listSitemapPings,
  generateMonthlySeoReport,
  listMonthlySeoReports,
} from "@/lib/seo-admin.functions";

const SITE = "https://videoscorporativos.com.br";
const GSC_PROPERTY = encodeURIComponent(`${SITE}/`);

export const Route = createFileRoute("/admin/seo")({
  head: () => ({
    meta: [
      { title: "Admin · SEO & Indexação" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminSeoPage,
});

type Status = { kind: "idle" } | { kind: "loading" } | { kind: "ok"; msg: string } | { kind: "err"; msg: string };

const PW_KEY = "admin_seo_pw";

function AdminSeoPage() {
  const [password, setPassword] = useState<string | null>(null);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? sessionStorage.getItem(PW_KEY) : null;
    if (saved) setPassword(saved);
  }, []);

  const posts = getAllPosts();
  const urls = [
    `${SITE}/`,
    `${SITE}/precos`,
    `${SITE}/blog`,
    ...posts.map((p) => `${SITE}/blog/${p.slug}`),
  ];

  const submitSitemapFn = useServerFn(resubmitSitemap);
  const requestIndexFn = useServerFn(requestIndexing);
  const inspectFn = useServerFn(inspectUrl);
  const listPingsFn = useServerFn(listSitemapPings);

  const [sitemapStatus, setSitemapStatus] = useState<Status>({ kind: "idle" });
  const [rowStatus, setRowStatus] = useState<Record<string, Status>>({});

  type PingRow = {
    id: string;
    source: string;
    ok: boolean;
    status: number | null;
    message: string | null;
    created_at: string;
  };
  const [pings, setPings] = useState<PingRow[]>([]);
  const [pingsStatus, setPingsStatus] = useState<Status>({ kind: "idle" });

  type ReportRow = {
    key: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    ctrDelta: number;
    positionDelta: number;
    clicksDelta: number;
  };
  type MonthlyReport = {
    id: string;
    source: string;
    createdAt: string;
    markdown: string;
    report: {
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
  };
  const generateReportFn = useServerFn(generateMonthlySeoReport);
  const listReportsFn = useServerFn(listMonthlySeoReports);
  const [reports, setReports] = useState<MonthlyReport[]>([]);
  const [reportStatus, setReportStatus] = useState<Status>({ kind: "idle" });
  const [activeTab, setActiveTab] = useState<"pages" | "queries">("pages");

  async function loadReports() {
    if (!password) return;
    try {
      const r = await listReportsFn({ data: { password, limit: 12 } });
      if (r.ok) setReports(r.reports as MonthlyReport[]);
    } catch (e) {
      setReportStatus({ kind: "err", msg: handleAuthError(e) });
    }
  }

  async function handleGenerateReport() {
    if (!password) return;
    setReportStatus({ kind: "loading" });
    try {
      const r = await generateReportFn({ data: { password } });
      if (r.ok) {
        setReportStatus({
          kind: "ok",
          msg: `Relatório ${r.report.periodStart} → ${r.report.periodEnd} atualizado.`,
        });
        void loadReports();
      } else {
        setReportStatus({ kind: "err", msg: r.message });
      }
    } catch (e) {
      setReportStatus({ kind: "err", msg: handleAuthError(e) });
    }
  }

  function downloadMarkdown(r: MonthlyReport) {
    const blob = new Blob([r.markdown], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `relatorio-seo-${r.report.periodStart.slice(0, 7)}.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function loadPings() {
    if (!password) return;
    setPingsStatus({ kind: "loading" });
    try {
      const r = await listPingsFn({ data: { password, limit: 20 } });
      if (r.ok) {
        setPings(r.rows as PingRow[]);
        setPingsStatus({ kind: "idle" });
      } else {
        setPingsStatus({ kind: "err", msg: r.message });
      }
    } catch (e) {
      setPingsStatus({ kind: "err", msg: handleAuthError(e) });
    }
  }

  useEffect(() => {
    if (password) {
      void loadPings();
      void loadReports();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  function setRow(url: string, s: Status) {
    setRowStatus((prev) => ({ ...prev, [url]: s }));
  }

  function handleAuthError(e: unknown): string {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes("Senha incorreta")) {
      sessionStorage.removeItem(PW_KEY);
      setPassword(null);
      setPwError("Senha incorreta. Faça login novamente.");
    }
    return msg;
  }

  function handleLogout() {
    sessionStorage.removeItem(PW_KEY);
    setPassword(null);
    setPwInput("");
  }

  async function handleSitemap() {
    if (!password) return;
    setSitemapStatus({ kind: "loading" });
    try {
      const r = await submitSitemapFn({ data: { password } });
      setSitemapStatus(r.ok ? { kind: "ok", msg: r.message } : { kind: "err", msg: `${r.status}: ${r.message}` });
      void loadPings();
    } catch (e) {
      setSitemapStatus({ kind: "err", msg: handleAuthError(e) });
    }
  }

  async function handleIndex(url: string) {
    if (!password) return;
    setRow(url, { kind: "loading" });
    try {
      const r = await requestIndexFn({ data: { password, url, type: "URL_UPDATED" } });
      setRow(url, r.ok ? { kind: "ok", msg: r.message } : { kind: "err", msg: `${r.status}: ${r.message}` });
    } catch (e) {
      setRow(url, { kind: "err", msg: handleAuthError(e) });
    }
  }

  async function handleInspect(url: string) {
    if (!password) return;
    setRow(url, { kind: "loading" });
    try {
      const r = await inspectFn({ data: { password, url } });
      if (!r.ok) {
        setRow(url, { kind: "err", msg: `${r.status}: ${r.message}` });
      } else {
        const verdict =
          (r.data as { inspectionResult?: { indexStatusResult?: { verdict?: string; coverageState?: string } } })
            ?.inspectionResult?.indexStatusResult;
        setRow(url, {
          kind: "ok",
          msg: `${verdict?.verdict ?? "?"} · ${verdict?.coverageState ?? "?"}`,
        });
      }
    } catch (e) {
      setRow(url, { kind: "err", msg: handleAuthError(e) });
    }
  }

  if (!password) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main className="pt-28 pb-24">
          <div className="mx-auto max-w-md px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-brand">Admin</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
              Acesso restrito
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Informe a senha de administrador para acessar o painel de SEO.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!pwInput) return;
                sessionStorage.setItem(PW_KEY, pwInput);
                setPassword(pwInput);
                setPwInput("");
                setPwError(null);
              }}
              className="mt-6 space-y-3"
            >
              <input
                type="password"
                autoFocus
                value={pwInput}
                onChange={(e) => setPwInput(e.target.value)}
                placeholder="Senha"
                className="w-full rounded-lg border border-border bg-surface/60 px-4 py-3 text-sm outline-none focus:border-brand"
              />
              {pwError && <p className="text-xs text-red-400">{pwError}</p>}
              <button
                type="submit"
                className="w-full rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground hover:opacity-90 transition"
              >
                Entrar
              </button>
            </form>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand">Admin</p>
              <h1 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-tight">
                SEO & Indexação no Google
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-brand/60 transition"
            >
              Sair
            </button>
          </div>
          <p className="mt-4 text-muted-foreground">
            Reenvie o sitemap ou solicite a indexação de cada URL diretamente, sem abrir o Search Console.
          </p>

          {/* Sitemap card */}
          <section className="mt-10 rounded-2xl border border-border bg-surface/60 p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="font-display text-xl font-semibold">Sitemap</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {SITE}/sitemap.xml
                </p>
                <p className="mt-2 text-xs text-muted-foreground max-w-xl">
                  Use logo após publicar ou editar um post para acelerar o rastreamento.
                  Um cron automático também reenvia de hora em hora.
                </p>
              </div>
              <button
                onClick={handleSitemap}
                disabled={sitemapStatus.kind === "loading"}
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-brand/20"
              >
                {sitemapStatus.kind === "loading" ? "Reenviando…" : "Reenviar agora"}
              </button>
            </div>
            <StatusLine status={sitemapStatus} />
          </section>

          {/* Ping history card */}
          <section className="mt-8 rounded-2xl border border-border bg-surface/60 p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="font-display text-xl font-semibold">Histórico de envios</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Últimos pings do sitemap ao Google (manuais, automáticos e via cron).
                </p>
                {pings[0] && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Último envio:{" "}
                    <span className="text-foreground/90">
                      {new Date(pings[0].created_at).toLocaleString("pt-BR")}
                    </span>{" "}
                    ·{" "}
                    <span className={pings[0].ok ? "text-emerald-400" : "text-red-400"}>
                      {pings[0].ok ? "sucesso" : "erro"}
                    </span>{" "}
                    · <span className="font-mono">{labelSource(pings[0].source)}</span>
                  </p>
                )}
              </div>
              <button
                onClick={loadPings}
                disabled={pingsStatus.kind === "loading"}
                className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-brand/60 disabled:opacity-50 transition"
              >
                {pingsStatus.kind === "loading" ? "Atualizando…" : "Atualizar"}
              </button>
            </div>
            {pingsStatus.kind === "err" && (
              <p className="mt-3 text-xs text-red-400">✗ {pingsStatus.msg}</p>
            )}
            {pings.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Nenhum envio registrado ainda.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface/40 overflow-hidden">
                {pings.map((p) => (
                  <li key={p.id} className="p-3 md:p-4 flex items-start gap-3 flex-wrap">
                    <span
                      className={`mt-0.5 inline-flex h-2 w-2 shrink-0 rounded-full ${p.ok ? "bg-emerald-400" : "bg-red-400"}`}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs md:text-sm">
                        <span className="text-foreground/90">
                          {new Date(p.created_at).toLocaleString("pt-BR")}
                        </span>{" "}
                        ·{" "}
                        <span className="font-mono text-muted-foreground">
                          {labelSource(p.source)}
                        </span>
                        {p.status != null && (
                          <>
                            {" "}
                            · <span className="font-mono text-muted-foreground">{p.status}</span>
                          </>
                        )}
                      </p>
                      {p.message && (
                        <p className="mt-1 text-xs text-muted-foreground break-words">
                          {p.message}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* URLs list */}
          {/* Monthly report */}
          <section className="mt-8 rounded-2xl border border-border bg-surface/60 p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="font-display text-xl font-semibold">
                  Relatório mensal de SEO
                </h2>
                <p className="mt-1 text-sm text-muted-foreground max-w-xl">
                  Gerado automaticamente todo dia 3 com os dados do mês fechado:
                  cliques, impressões, posição média e evolução de CTR por página e
                  por palavra-chave.
                </p>
              </div>
              <button
                onClick={handleGenerateReport}
                disabled={reportStatus.kind === "loading"}
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-brand/20"
              >
                {reportStatus.kind === "loading" ? "Gerando…" : "Gerar agora"}
              </button>
            </div>
            <StatusLine status={reportStatus} />

            {reports.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Nenhum relatório gerado ainda.
              </p>
            ) : (
              (() => {
                const latest = reports[0];
                const t = latest.report.totals;
                const rows =
                  activeTab === "pages" ? latest.report.pages : latest.report.queries;
                return (
                  <div className="mt-6">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <p className="text-sm text-muted-foreground">
                        Período:{" "}
                        <span className="text-foreground/90 font-mono">
                          {latest.report.periodStart} → {latest.report.periodEnd}
                        </span>{" "}
                        · vs{" "}
                        <span className="font-mono">
                          {latest.report.prevStart} → {latest.report.prevEnd}
                        </span>
                      </p>
                      <button
                        onClick={() => downloadMarkdown(latest)}
                        className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-brand/60 transition"
                      >
                        Baixar Markdown
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Metric label="Cliques" value={t.clicks} delta={t.clicks - t.prevClicks} />
                      <Metric
                        label="Impressões"
                        value={t.impressions}
                        delta={t.impressions - t.prevImpressions}
                      />
                      <Metric
                        label="CTR"
                        value={`${t.ctr}%`}
                        delta={Number((t.ctr - t.prevCtr).toFixed(2))}
                        suffix=" p.p."
                      />
                      <Metric
                        label="Posição média"
                        value={t.position}
                        delta={Number((t.prevPosition - t.position).toFixed(1))}
                      />
                    </div>

                    <div className="mt-6 flex gap-2">
                      {(["pages", "queries"] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                            activeTab === tab
                              ? "bg-brand text-brand-foreground"
                              : "border border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {tab === "pages" ? "Por página" : "Por palavra-chave"}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                      <table className="w-full text-xs md:text-sm">
                        <thead className="bg-surface/60 text-muted-foreground">
                          <tr>
                            <th className="p-3 text-left font-medium">
                              {activeTab === "pages" ? "Página" : "Palavra-chave"}
                            </th>
                            <th className="p-3 text-right font-medium">Cliques</th>
                            <th className="p-3 text-right font-medium">Impr.</th>
                            <th className="p-3 text-right font-medium">CTR</th>
                            <th className="p-3 text-right font-medium">Δ CTR</th>
                            <th className="p-3 text-right font-medium">Pos.</th>
                            <th className="p-3 text-right font-medium">Δ Pos.</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {rows.slice(0, 25).map((r) => (
                            <tr key={r.key}>
                              <td className="p-3 font-mono break-all max-w-[18rem]">{r.key}</td>
                              <td className="p-3 text-right">{r.clicks}</td>
                              <td className="p-3 text-right">{r.impressions}</td>
                              <td className="p-3 text-right">{r.ctr}%</td>
                              <td className={`p-3 text-right ${deltaClass(r.ctrDelta)}`}>
                                {fmtDelta(r.ctrDelta)}
                              </td>
                              <td className="p-3 text-right">{r.position}</td>
                              <td className={`p-3 text-right ${deltaClass(r.positionDelta)}`}>
                                {fmtDelta(r.positionDelta)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {reports.length > 1 && (
                      <div className="mt-5">
                        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                          Histórico
                        </p>
                        <ul className="mt-2 space-y-1">
                          {reports.slice(1).map((r) => (
                            <li
                              key={r.id}
                              className="flex items-center justify-between gap-3 text-xs"
                            >
                              <span className="font-mono text-muted-foreground">
                                {r.report.periodStart} → {r.report.periodEnd} ·{" "}
                                {r.report.totals.clicks} cliques · CTR{" "}
                                {r.report.totals.ctr}%
                              </span>
                              <button
                                onClick={() => downloadMarkdown(r)}
                                className="text-brand hover:underline"
                              >
                                baixar
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })()
            )}
          </section>

          {/* URLs list */}
          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold">URLs do site</h2>
            <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-surface/40 overflow-hidden">
              {urls.map((url) => {
                const st = rowStatus[url] ?? { kind: "idle" };
                const gscDeepLink = `https://search.google.com/search-console/inspect?resource_id=${GSC_PROPERTY}&id=${encodeURIComponent(url)}`;
                return (
                  <li key={url} className="p-4 md:p-5">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-xs md:text-sm text-foreground/90 break-all">{url}</p>
                        <StatusLine status={st} />
                      </div>
                      <div className="flex gap-2 flex-wrap shrink-0">
                        <button
                          onClick={() => handleIndex(url)}
                          disabled={st.kind === "loading"}
                          className="rounded-full bg-brand px-3.5 py-2 text-xs font-medium text-brand-foreground hover:opacity-90 disabled:opacity-50 transition"
                        >
                          Solicitar indexação
                        </button>
                        <button
                          onClick={() => handleInspect(url)}
                          disabled={st.kind === "loading"}
                          className="rounded-full border border-brand/60 px-3.5 py-2 text-xs font-medium hover:bg-brand/10 disabled:opacity-50 transition"
                        >
                          Inspecionar
                        </button>
                        <a
                          href={gscDeepLink}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-border px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-brand/60 transition"
                        >
                          Abrir no GSC
                        </a>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              "Solicitar indexação" usa a Indexing API do Google. Cota padrão: 200 URLs/dia.
              "Inspecionar" consulta o status atual da URL no índice.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function StatusLine({ status }: { status: Status }) {
  if (status.kind === "idle") return null;
  const cls =
    status.kind === "ok"
      ? "text-emerald-400"
      : status.kind === "err"
        ? "text-red-400"
        : "text-muted-foreground";
  const label =
    status.kind === "loading" ? "Processando…" : status.kind === "ok" ? `✓ ${status.msg}` : `✗ ${status.msg}`;
  return <p className={`mt-2 text-xs ${cls} break-words`}>{label}</p>;
}

function labelSource(source: string): string {
  switch (source) {
    case "deploy-hook":
      return "auto-deploy";
    case "admin-button":
      return "manual";
    case "cron-hourly":
      return "cron";
    default:
      return source;
  }
}
function fmtDelta(n: number): string {
  if (n === 0) return "—";
  return n > 0 ? `+${n}` : `${n}`;
}

function deltaClass(n: number): string {
  if (n === 0) return "text-muted-foreground";
  return n > 0 ? "text-emerald-400" : "text-red-400";
}

function Metric({
  label,
  value,
  delta,
  suffix = "",
}: {
  label: string;
  value: string | number;
  delta: number;
  suffix?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
      <p className={`mt-1 text-xs ${deltaClass(delta)}`}>
        {fmtDelta(delta)}
        {delta !== 0 ? suffix : ""}
      </p>
    </div>
  );
}
