-- Move pg_net out of public schema (pg_net doesn't support SET SCHEMA; recreate)
CREATE SCHEMA IF NOT EXISTS extensions;
DROP EXTENSION IF EXISTS pg_net;
CREATE EXTENSION pg_net WITH SCHEMA extensions;

-- Tighten whatsapp_clicks: drop permissive INSERT policy
DROP POLICY IF EXISTS "anyone can insert whatsapp clicks" ON public.whatsapp_clicks;

-- Revoke unnecessary direct table access from anon/authenticated
REVOKE ALL ON public.whatsapp_clicks FROM anon, authenticated;
REVOKE ALL ON public.contact_submissions FROM anon, authenticated;
REVOKE ALL ON public.sitemap_pings FROM anon, authenticated;

GRANT ALL ON public.whatsapp_clicks TO service_role;
GRANT ALL ON public.contact_submissions TO service_role;
GRANT ALL ON public.sitemap_pings TO service_role;