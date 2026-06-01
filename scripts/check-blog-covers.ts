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

const BASE_URL =
  process.env.BASE_URL?.replace(/\/$/, "") ??
  "https://videoscorporativos.lovable.app";

// Neutral UA — the preview host returns an empty body for some desktop UAs.
const UA =
  "Mozilla/5.0 (compatible; BlogCoverChecker/1.0; +https://videoscorporativos.com.br)";
const VIEWPORTS = ["desktop", "mobile"] as const;

type Result = { name: string; ok: boolean; detail: string };
const results: Result[] = [];

function record(name: string, ok: boolean, detail: string) {
  results.push({ name, ok, detail });
  console.log(`${ok ? "✓" : "✗"} ${name} — ${detail}`);
}

async function checkCoverUrl(slug: string, url: string) {
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    const ct = res.headers.get("content-type") ?? "";
    const ok = res.ok && ct.startsWith("image/");
    record(
      `cover[${slug}]`,
      ok,
      `${res.status} ${ct || "no content-type"} (${url})`,
    );
  } catch (e) {
    record(`cover[${slug}]`, false, `fetch failed: ${(e as Error).message}`);
  }
}

async function fetchHtml(path: string): Promise<string | null> {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html" },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function main() {
  console.log(`\nBlog cover regression — base: ${BASE_URL}\n`);

  // 1. Every cover URL must resolve to an actual image (counts for both viewports).
  await Promise.all(
    posts.map((p) => checkCoverUrl(p.slug, coverImageUrl(p.coverQuery))),
  );

  // 2. /blog listing must reference every cover URL.
  const listing = await fetchHtml("/blog");
  for (const p of posts) {
    const expected = coverImageUrl(p.coverQuery);
    const has = !!listing && listing.includes(expected);
    for (const vp of VIEWPORTS) {
      record(
        `/blog → ${p.slug} @${vp}`,
        has,
        listing == null
          ? "listing HTML not reachable"
          : has
            ? "cover URL present in listing"
            : "cover URL missing in listing",
      );
    }
  }

  // 3. Each post page must embed its own cover URL.
  for (const p of posts) {
    const html = await fetchHtml(`/blog/${p.slug}`);
    const expected = coverImageUrl(p.coverQuery);
    const has = !!html && html.includes(expected);
    for (const vp of VIEWPORTS) {
      record(
        `/blog/${p.slug} @${vp}`,
        has,
        html == null
          ? "post HTML not reachable"
          : has
            ? "cover URL present"
            : "cover URL missing",
      );
    }
  }

  const failed = results.filter((r) => !r.ok);
  console.log(
    `\n${results.length - failed.length}/${results.length} checks passed.`,
  );
  if (failed.length > 0) {
    console.error(`\n${failed.length} failure(s):`);
    for (const f of failed) console.error(`  ✗ ${f.name} — ${f.detail}`);
    process.exit(1);
  }
}

main();