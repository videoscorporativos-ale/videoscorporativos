CREATE TABLE IF NOT EXISTS public.seo_reports (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  period_start date NOT NULL,
  period_end date NOT NULL,
  source text NOT NULL DEFAULT 'cron-monthly',
  totals jsonb NOT NULL DEFAULT '{}'::jsonb,
  pages jsonb NOT NULL DEFAULT '[]'::jsonb,
  queries jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (period_start, period_end)
);

GRANT ALL ON public.seo_reports TO service_role;

ALTER TABLE public.seo_reports ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  PERFORM cron.unschedule('seo-monthly-report');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

SELECT cron.schedule(
  'seo-monthly-report',
  '20 6 3 * *',
  $cron$
  SELECT net.http_post(
    url := 'https://project--ce91384b-4394-4b53-9e43-bef737f42072.lovable.app/api/public/seo/monthly-report',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'cron_secret' LIMIT 1)
    ),
    body := '{}'::jsonb
  );
  $cron$
);