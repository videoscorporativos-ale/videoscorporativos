/**
 * Regression check for blog cover images.
 *
 *   1. Every post's cover URL resolves to a real image (200 + image/* MIME).
 *   2. /blog listing HTML embeds every cover URL.
 *   3. Each /blog/$slug HTML embeds its own cover URL.
 *
 * Responsive sizing is pure CSS, so the URL is identical on desktop & mobile —
 * no per-viewport HTML fetch needed. The script reports "desktop + mobile" for
 * each cover so the checklist is explicit.
 *
 * Usage:
 *   bun scripts/check-blog-covers.ts
 *   BASE_URL=https://videoscorporativos.com.br bun scripts/check-blog-covers.ts
 */
import { posts, coverImageUrl } from "../src/content/posts";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const BASE_URL =
  process.env.BASE_URL?.replace(/\/$/, "") ??
  "https://videoscorporativos.lovable.app";

// The Lovable preview host blocks desktop UAs from receiving HTML directly
// (they're meant to load inside the editor iframe). The published domain
// answers any UA. Use an iPhone UA — works on both, and the HTML is identical
// across viewports (responsive sizing is pure CSS).
const UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const VIEWPORTS = ["desktop", "mobile"] as const;

const REPORT_PATH = process.env.REPORT_PATH ?? "reports/blog-covers.json";
const SUMMARY_PATH =
  process.env.SUMMARY_PATH ?? "reports/blog-covers.md";

type Result = {
  name: string;
  ok: boolean;
  url: string | null;
  status: number | null;
  contentType: string | null;
  detail: string;
};
const results: Result[] = [];

function record(
  name: string,
  ok: boolean,
  detail: string,
  extras: { url?: string | null; status?: number | null; contentType?: string | null } = {},
) {
  results.push({
    name,
    ok,
    detail,
    url: extras.url ?? null,
    status: extras.status ?? null,
    contentType: extras.contentType ?? null,
  });
  console.log(`${ok ? "✓" : "✗"} ${name} — ${detail}`);
}

async function checkCoverUrl(slug: string, url: string) {
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    const ct = res.headers.get("content-type") ?? "";
    const ok = res.ok && ct.startsWith("image/");
    record(`cover[${slug}]`, ok, `${res.status} ${ct || "no content-type"} (${url})`, {
      url,
      status: res.status,
      contentType: ct || null,
    });
  } catch (e) {
    record(`cover[${slug}]`, false, `fetch failed: ${(e as Error).message}`, {
      url,
    });
  }
}

type HtmlFetch = {
  body: string | null;
  status: number | null;
  contentType: string | null;
  error: string | null;
};

async function fetchHtml(path: string): Promise<HtmlFetch> {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html" },
    });
    const ct = res.headers.get("content-type") ?? null;
    if (!res.ok) {
      return { body: null, status: res.status, contentType: ct, error: null };
    }
    return {
      body: await res.text(),
      status: res.status,
      contentType: ct,
      error: null,
    };
  } catch (e) {
    return {
      body: null,
      status: null,
      contentType: null,
      error: (e as Error).message,
    };
  }
}

async function main() {
  console.log(`\nBlog cover regression — base: ${BASE_URL}\n`);

  // 1. Every cover URL must resolve to an actual image (counts for both viewports).
  await Promise.all(
    posts.map((p) => checkCoverUrl(p.slug, coverImageUrl(p.coverQuery))),
  );

  // 2. /blog listing must reference every cover URL.
  const listingUrl = `${BASE_URL}/blog`;
  const listing = await fetchHtml("/blog");
  for (const p of posts) {
    const expected = coverImageUrl(p.coverQuery);
    const has = !!listing.body && listing.body.includes(expected);
    for (const vp of VIEWPORTS) {
      record(
        `/blog → ${p.slug} @${vp}`,
        has,
        listing.body == null
          ? `listing HTML not reachable (status=${listing.status ?? "n/a"}, error=${listing.error ?? "none"})`
          : has
            ? `cover URL present in listing (page status ${listing.status}, ${listing.contentType ?? "no content-type"})`
            : `cover URL missing in listing (page status ${listing.status}, ${listing.contentType ?? "no content-type"})`,
        {
          url: listingUrl,
          status: listing.status,
          contentType: listing.contentType,
        },
      );
    }
  }

  // 3. Each post page must embed its own cover URL.
  for (const p of posts) {
    const pageUrl = `${BASE_URL}/blog/${p.slug}`;
    const html = await fetchHtml(`/blog/${p.slug}`);
    const expected = coverImageUrl(p.coverQuery);
    const has = !!html.body && html.body.includes(expected);
    for (const vp of VIEWPORTS) {
      record(
        `/blog/${p.slug} @${vp}`,
        has,
        html.body == null
          ? `post HTML not reachable (status=${html.status ?? "n/a"}, error=${html.error ?? "none"})`
          : has
            ? `cover URL present (page status ${html.status}, ${html.contentType ?? "no content-type"})`
            : `cover URL missing (page status ${html.status}, ${html.contentType ?? "no content-type"})`,
        { url: pageUrl, status: html.status, contentType: html.contentType },
      );
    }
  }

  const failed = results.filter((r) => !r.ok);
  const summary = {
    baseUrl: BASE_URL,
    generatedAt: new Date().toISOString(),
    totals: {
      total: results.length,
      passed: results.length - failed.length,
      failed: failed.length,
    },
    results,
  };

  // Write JSON + Markdown report (used by CI as artifacts).
  mkdirSync(dirname(REPORT_PATH), { recursive: true });
  writeFileSync(REPORT_PATH, JSON.stringify(summary, null, 2));

  const md: string[] = [];
  md.push(`# Blog cover regression`);
  md.push("");
  md.push(`- Base URL: \`${BASE_URL}\``);
  md.push(`- Generated: ${summary.generatedAt}`);
  md.push(
    `- **${summary.totals.passed}/${summary.totals.total} passed** (${summary.totals.failed} failed)`,
  );
  md.push("");
  if (failed.length > 0) {
    md.push(`## Failures`);
    md.push("");
    md.push(`| Check | Status | Content-Type | URL | Detail |`);
    md.push(`| --- | --- | --- | --- | --- |`);
    for (const f of failed) {
      md.push(
        `| ${f.name} | ${f.status ?? "—"} | ${f.contentType ?? "—"} | ${f.url ? `<${f.url}>` : "—"} | ${f.detail.replace(/\|/g, "\\|")} |`,
      );
    }
  } else {
    md.push(`All checks passed.`);
  }
  mkdirSync(dirname(SUMMARY_PATH), { recursive: true });
  writeFileSync(SUMMARY_PATH, md.join("\n") + "\n");

  // Append to GitHub Actions step summary when available.
  const gh = process.env.GITHUB_STEP_SUMMARY;
  if (gh) writeFileSync(gh, md.join("\n") + "\n", { flag: "a" });

  console.log(
    `\n${summary.totals.passed}/${summary.totals.total} checks passed.`,
  );
  console.log(`Report: ${REPORT_PATH}`);
  console.log(`Summary: ${SUMMARY_PATH}`);
  if (failed.length > 0) {
    console.error(`\n${failed.length} failure(s):`);
    for (const f of failed) {
      console.error(
        `  ✗ ${f.name} — status=${f.status ?? "n/a"} type=${f.contentType ?? "n/a"} url=${f.url ?? "n/a"}`,
      );
      console.error(`      ${f.detail}`);
    }
    process.exit(1);
  }
}

main();