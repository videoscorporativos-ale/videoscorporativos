import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { buildWhatsAppUrl, captureUtmFromUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/tracking.functions";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  location: string;
  message?: string;
  children: ReactNode;
};

export const WhatsAppLink = forwardRef<HTMLAnchorElement, Props>(function WhatsAppLink(
  { location, message, children, onClick, ...rest },
  ref,
) {
  const track = useServerFn(trackWhatsAppClick);
  const href = buildWhatsAppUrl({ location, message });

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    const utm = captureUtmFromUrl();
    // fire-and-forget; do not block navigation
    void track({
      data: {
        location,
        landing_path: window.location.pathname + window.location.search,
        referrer: document.referrer || undefined,
        user_agent: navigator.userAgent.slice(0, 512),
        ...utm,
      },
    }).catch(() => undefined);
  }

  return (
    <a
      {...rest}
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
    >
      {children}
    </a>
  );
});