# ISTIQEME Technologies

Marketing site for ISTIQEME Technologies. It presents services, live work, and a short intake, with optional Supabase accounts.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Environment

Copy `.env.example` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL` — project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public anon key, safe for the browser
- `SUPABASE_SERVICE_ROLE_KEY` — server only, used by the cron route
- `CRON_SECRET` — shared secret for `Authorization: Bearer`

Do not prefix the service role key or cron secret with `NEXT_PUBLIC_`.

## Auth

- `/login` and `/signup` use email and password through Supabase Auth.
- Migration `supabase/migrations/20261016182333_profiles_and_cron_runs.sql` creates `profiles` (one row per auth user, readable and updatable only by that user) and `cron_runs` (row level security on, no public policies).
- A trigger in the `private` schema inserts a profile when a user is created.

Apply the migration with the Supabase CLI against your project when you are ready. This repository does not apply it automatically.

## Cron

`GET /api/cron` checks `Authorization: Bearer <CRON_SECRET>` and inserts a row into `cron_runs` with the service role key.

`vercel.json` schedules that path daily at 06:00 UTC. On Vercel, set `CRON_SECRET` so the platform can send the bearer token.
