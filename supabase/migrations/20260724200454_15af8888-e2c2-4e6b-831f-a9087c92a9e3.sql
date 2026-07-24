
ALTER TABLE public.contact_submissions ALTER COLUMN empresa DROP NOT NULL;
ALTER TABLE public.contact_submissions ALTER COLUMN email DROP NOT NULL;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS lgpd_consent boolean NOT NULL DEFAULT false;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS consent_at timestamptz;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS landing_path text;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS referrer text;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS utm_source text;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS utm_medium text;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS utm_campaign text;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS utm_term text;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS utm_content text;
