const MEASUREMENT_ID = "G-XSWK78HG36";

let initialized = false;

export function initGoogleAnalytics() {
  if (typeof window === "undefined") return;
  if (initialized) return;
  initialized = true;

  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  w.dataLayer = w.dataLayer || [];
  function gtag() {
    // GA4 expects the raw `arguments` object to be pushed
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  }
  w.gtag = gtag as unknown as (...args: unknown[]) => void;

  w.gtag("js", new Date());
  w.gtag("config", MEASUREMENT_ID, {
    send_page_view: false,
    cookie_flags: "SameSite=None;Secure",
    allow_google_signals: true,
    allow_ad_personalization_signals: false,
    transport_type: "beacon",
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function trackPageView(path: string, title?: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", "page_view", {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | null | undefined>,
) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  const clean = Object.fromEntries(
    Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== null),
  );
  w.gtag?.("event", name, {
    ...clean,
    send_to: MEASUREMENT_ID,
    transport_type: "beacon",
    page_location: window.location.href,
    page_path: window.location.pathname,
  });
}

export function trackWhatsAppConversion(location: string) {
  trackEvent("contact", { method: "whatsapp", location });
  trackEvent("generate_lead", { channel: "whatsapp", location });
}
