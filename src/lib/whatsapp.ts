const PHONE = "5511913550533";
const DEFAULT_MSG = "Olá, vim pelo site e gostaria de um orçamento.";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const STORAGE_KEY = "lead_utm_v1";

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function captureUtmFromUrl(): Utm {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const incoming: Utm = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) incoming[k] = v.slice(0, 120);
  }
  try {
    if (Object.keys(incoming).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(incoming));
      return incoming;
    }
    const cached = sessionStorage.getItem(STORAGE_KEY);
    return cached ? (JSON.parse(cached) as Utm) : {};
  } catch {
    return incoming;
  }
}

export function buildWhatsAppUrl(opts?: { location?: string; message?: string }) {
  const utm = captureUtmFromUrl();
  const base = opts?.message ?? DEFAULT_MSG;
  const tag = [
    opts?.location ? `origem: ${opts.location}` : null,
    utm.utm_source ? `fonte: ${utm.utm_source}` : null,
    utm.utm_campaign ? `campanha: ${utm.utm_campaign}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const text = tag ? `${base}\n\n(${tag})` : base;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
}

export function getStoredUtm(): Utm {
  if (typeof window === "undefined") return {};
  try {
    const cached = sessionStorage.getItem(STORAGE_KEY);
    return cached ? (JSON.parse(cached) as Utm) : {};
  } catch {
    return {};
  }
}