/**
 * Regression check: every blog post cover image must resolve to a real image,
 * and each rendered page (/blog and /blog/$slug) must include the cover URL
 * in its HTML — verified at desktop (1366px) and mobile (390px) widths via
 * the `width=` viewport hint and the matching `User-Agent`.
 *
 * Usage:
 *   bun scripts/check-blog-covers.ts                 # uses BASE_URL or preview
 *   BASE_URL=https://videoscorporativos.com.br bun scripts/check-blog-covers.ts
 *
 * Exits with code 1 on any failure so it can wire into CI later.
 */
import { posts, coverImageUrl } from "../src/content/posts";

const BASE_URL =
  process.env.BASE_URL?.replace(/\/$/, "") ??
  "https://videoscorporativos.lovable.app";

const VIEWPORTS = [
  {
    name: "desktop",
    width: 1366,
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
  },
  {
    name: "mobile",
    width: 390,
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  },
] as const;

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

async function checkPageHasCover(
  label: string,
  path: string,
  expectedUrl: string,
  viewport: (typeof VIEWPORTS)[number],
) {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": viewport.ua,
        "Sec-CH-Viewport-Width": String(viewport.width),
        Accept: "text/html",
      },
    });
    if (!res.ok) {
      record(`${label}@${viewport.name}`, false, `HTTP ${res.status} on ${url}`);
      return;
    }
    const html = await res.text();
    const has = html.includes(expectedUrl);
    record(
      `${label}@${viewport.name}`,
      has,
      has ? `cover URL present` : `cover URL missing in HTML`,
    );
  } catch (e) {
    record(
      `${label}@${viewport.name}`,
      false,
      `fetch failed: ${(e as Error).message}`,
    );
  }
}

async function main() {
  console.log(`\nBlog cover regression — base: ${BASE_URL}\n`);

  // 1. Every cover URL must resolve to an actual image.
  await Promise.all(
    posts.map((p) => checkCoverUrl(p.slug, coverImageUrl(p.coverQuery))),
  );

  // 2. /blog listing must reference every cover URL in both viewports.
  for (const vp of VIEWPORTS) {
    const url = `${BASE_URL}/blog`;
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": vp.ua, Accept: "text/html" },
      });
      const html = res.ok ? await res.text() : "";
      for (const p of posts) {
        const expected = coverImageUrl(p.coverQuery);
        const has = html.includes(expected);
        record(
          `/blog#${p.slug}@${vp.name}`,
          has,
          has ? "cover URL present in listing" : "cover URL missing in listing",
        );
      }
    } catch (e) {
      record(`/blog@${vp.name}`, false, `fetch failed: ${(e as Error).message}`);
    }
  }

  // 3. Each post page must embed its own cover URL in both viewports.
  for (const vp of VIEWPORTS) {
    await Promise.all(
      posts.map((p) =>
        checkPageHasCover(
          `/blog/${p.slug}`,
          `/blog/${p.slug}`,
          coverImageUrl(p.coverQuery),
          vp,
        ),
      ),
    );
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