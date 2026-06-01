
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Remove agendamento antigo se existir (idempotente)
DO $$
BEGIN
  PERFORM cron.unschedule('resubmit-sitemap-hourly');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

SELECT cron.schedule(
  'resubmit-sitemap-hourly',
  '17 * * * *', -- todo dia, a cada hora aos 17 minutos
  $$
  SELECT net.http_post(
    url := 'https://project--ce91384b-4394-4b53-9e43-bef737f42072.lovable.app/api/public/seo/resubmit-sitemap',
    headers := '{"Content-Type": "application/json", "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwY3BpbXpvdmdmbW5odWN4b2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxOTA5MzcsImV4cCI6MjA5NTc2NjkzN30.rLsb3dU0VwSTtHmjSBDXFv8yWACF03v8Dizc7dkCtJo"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);
