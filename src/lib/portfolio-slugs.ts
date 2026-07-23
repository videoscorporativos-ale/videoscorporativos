import { portfolioItems, type PortfolioItem } from "@/components/site/Portfolio";

/** Slugify PT-BR title into a URL-safe slug. */
export function slugifyTitle(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "-e-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export type CaseItem = PortfolioItem & { slug: string };

const cache = new Map<string, CaseItem>();
const list: CaseItem[] = portfolioItems.map((item) => {
  let slug = slugifyTitle(item.title);
  // Ensure uniqueness by appending videoId if collision.
  if (cache.has(slug)) slug = `${slug}-${item.videoId.toLowerCase()}`;
  const c: CaseItem = { ...item, slug };
  cache.set(slug, c);
  return c;
});

export function getAllCases(): CaseItem[] {
  return list;
}

export function getCaseBySlug(slug: string): CaseItem | undefined {
  return cache.get(slug);
}