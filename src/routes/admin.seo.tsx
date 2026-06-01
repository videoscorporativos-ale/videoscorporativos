import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getAllPosts } from "@/content/posts";
import {
  resubmitSitemap,
  requestIndexing,
  inspectUrl,
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

function AdminSeoPage() {
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

  const [sitemapStatus, setSitemapStatus] = useState<Status>({ kind: "idle" });
  const [rowStatus, setRowStatus] = useState<Record<string, Status>>({});

  function setRow(url: string, s: Status) {
    setRowStatus((prev) => ({ ...prev, [url]: s }));
  }

  async function handleSitemap() {
    setSitemapStatus({ kind: "loading" });
    try {
      const r = await submitSitemapFn();
      setSitemapStatus(r.ok ? { kind: "ok", msg: r.message } : { kind: "err", msg: `${r.status}: ${r.message}` });
    } catch (e) {
      setSitemapStatus({ kind: "err", msg: e instanceof Error ? e.message : String(e) });
    }
  }

  async function handleIndex(url: string) {
    setRow(url, { kind: "loading" });
    try {
      const r = await requestIndexFn({ data: { url, type: "URL_UPDATED" } });
      setRow(url, r.ok ? { kind: "ok", msg: r.message } : { kind: "err", msg: `${r.status}: ${r.message}` });
    } catch (e) {
      setRow(url, { kind: "err", msg: e instanceof Error ? e.message : String(e) });
    }
  }

  async function handleInspect(url: string) {
    setRow(url, { kind: "loading" });
    try {
      const r = await inspectFn({ data: { url } });
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
      setRow(url, { kind: "err", msg: e instanceof Error ? e.message : String(e) });
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-brand">Admin</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-tight">
            SEO & Indexação no Google
          </h1>
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
              </div>
              <button
                onClick={handleSitemap}
                disabled={sitemapStatus.kind === "loading"}
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground hover:opacity-90 disabled:opacity-50 transition"
              >
                {sitemapStatus.kind === "loading" ? "Reenviando…" : "Reenviar sitemap"}
              </button>
            </div>
            <StatusLine status={sitemapStatus} />
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