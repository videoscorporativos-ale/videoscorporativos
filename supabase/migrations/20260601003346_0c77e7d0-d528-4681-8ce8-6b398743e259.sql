CREATE TABLE public.whatsapp_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  location text,
  landing_path text,
  referrer text,
  user_agent text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text
);

GRANT INSERT ON public.whatsapp_clicks TO anon, authenticated;
GRANT ALL ON public.whatsapp_clicks TO service_role;

ALTER TABLE public.whatsapp_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can insert whatsapp clicks"
  ON public.whatsapp_clicks
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX whatsapp_clicks_campaign_idx ON public.whatsapp_clicks (utm_campaign, created_at DESC);
CREATE INDEX whatsapp_clicks_created_at_idx ON public.whatsapp_clicks (created_at DESC);