-- Move CRON_SECRET out of the migration file. The cron job now reads
-- the secret from Supabase Vault at execution time, so the SQL history
-- never contains the secret value.

-- 1) Ensure a vault entry exists for the cron secret. We insert a
-- placeholder only if it does not already exist; the real value must be
-- set out-of-band (via vault.update_secret) and rotated.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM vault.secrets WHERE name = 'cron_secret') THEN
    PERFORM vault.create_secret(
      'REPLACE_ME_SET_VIA_VAULT_UPDATE_SECRET',
      'cron_secret',
      'Secret used to authenticate the hourly sitemap resubmit cron job'
    );
  END IF;
END $$;

-- 2) Reschedule the job to pull the header value from Vault dynamically.
DO $$
BEGIN
  PERFORM cron.unschedule('resubmit-sitemap-hourly');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

SELECT cron.schedule(
  'resubmit-sitemap-hourly',
  '17 * * * *',
  $cron$
  SELECT net.http_post(
    url := 'https://project--ce91384b-4394-4b53-9e43-bef737f42072.lovable.app/api/public/seo/resubmit-sitemap',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'cron_secret' LIMIT 1)
    ),
    body := '{}'::jsonb
  );
  $cron$
);
