export type BlogCategory =
  | "Preço e contratação"
  | "Tipos de vídeo"
  | "Eventos e feiras"
  | "Resultado e ROI";

export interface FaqItem {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string; // 1-line summary used in cards
  tldr: string; // "Resposta rápida" — used as meta description
  category: BlogCategory;
  /** Unsplash search term — generates cover image URL automatically */
  coverQuery: string;
  /** Alt text for cover image */
  coverAlt: string;
  /** ISO date string (YYYY-MM-DD) */
  datePublished: string;
  /** ISO date string (YYYY-MM-DD); defaults to datePublished if omitted */
  dateModified?: string;
  /** Article body as HTML (h2/h3, p, ul, ol, strong, a allowed) */
  bodyHtml: string;
  /** Optional FAQ block — rendered + emitted as FAQPage schema */
  faqs?: FaqItem[];
  /** Optional SEO keywords */
  keywords?: string;
}

/**
 * Cover image URL helper — pulls a free photo from Unsplash by search term.
 * Returns a dark-treated, 1600x900 image suitable as a hero cover.
 */
export function coverImageUrl(query: string): string {
  const q = encodeURIComponent(query);
  return `https://source.unsplash.com/featured/1600x900/?${q}`;
}

/**
 * Blog posts. Add new entries here as the user provides article files.
 * Keep slugs URL-safe (lowercase, hyphens, no accents).
 */
export const posts: BlogPost[] = [];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}