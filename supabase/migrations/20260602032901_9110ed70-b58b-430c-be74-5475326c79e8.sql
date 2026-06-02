-- Substitui o cron 'resubmit-sitemap-hourly' para usar um segredo privado
-- (x-cron-secret) em vez da anon key, que é pública.
DO $$
BEGIN
  PERFORM cron.unschedule('resubmit-sitemap-hourly');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

SELECT cron.schedule(
  'resubmit-sitemap-hourly',
  '17 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://project--ce91384b-4394-4b53-9e43-bef737f42072.lovable.app/api/public/seo/resubmit-sitemap',
    headers := '{"Content-Type": "application/json", "x-cron-secret": "af03c5ac6c408cbca44e406e024850f7000a765834a0632dff187e8b3c8976a3"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);