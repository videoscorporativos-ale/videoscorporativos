import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { pingSitemapOnDeploy } from "@/lib/seo-on-deploy.functions";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ale Fotógrafo — Fotografia e Vídeo Corporativo em SP" },
      { name: "description", content: "Fotógrafo e produtor de vídeo corporativo em São Paulo, com +30 anos. Retrato profissional, eventos e vídeo institucional em todo o Brasil." },
      { name: "author", content: "Ale Fotógrafo" },
      { property: "og:title", content: "Ale Fotógrafo — Fotografia e Vídeo Corporativo em SP" },
      { property: "og:description", content: "Fotógrafo e produtor de vídeo corporativo em São Paulo, com +30 anos. Retrato profissional, eventos e vídeo institucional em todo o Brasil." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Ale Fotógrafo — Fotografia e Vídeo Corporativo em SP" },
      { name: "twitter:description", content: "Fotógrafo e produtor de vídeo corporativo em São Paulo, com +30 anos. Retrato profissional, eventos e vídeo institucional em todo o Brasil." },
      { property: "og:site_name", content: "Ale Fotógrafo" },
      { property: "og:locale", content: "pt_BR" },
      { name: "google-site-verification", content: "QxOKt1WWlGlC7_WS0lNVLjAKX4goXgoGTWUkvqX6Q50" },
      { name: "google-site-verification", content: "WU6biZ_OzI3kZYdZvZA7zGScn-wS1DWoL-KBUFcgTgQ" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  loader: () => {
    // Fire-and-forget per-deploy sitemap resubmit. The server fn is idempotent
    // (guarded by a module-level flag that resets only on a new Worker isolate,
    // i.e. once per deploy) so calling it on every navigation is cheap.
    void pingSitemapOnDeploy().catch(() => {});
    return null;
  },
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
