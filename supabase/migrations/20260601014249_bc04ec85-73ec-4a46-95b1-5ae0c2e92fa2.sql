CREATE TABLE public.sitemap_pings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,
  ok boolean NOT NULL,
  status integer,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX sitemap_pings_created_at_idx ON public.sitemap_pings (created_at DESC);

GRANT ALL ON public.sitemap_pings TO service_role;

ALTER TABLE public.sitemap_pings ENABLE ROW LEVEL SECURITY;
-- No policies: only service_role (server-side admin) reads/writes this log.