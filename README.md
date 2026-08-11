# Zohaib Portfolio (Next.js)

Single Next.js app — UI + contact/chat API — ready for one Vercel deploy.

## Local development

```bash
npm install
cp .env.example .env.local
# set Supabase URL + service role key
# run supabase/schema.sql once in the Supabase SQL editor
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key for contact inserts (never expose in client) |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v2 site key (optional locally) |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA secret (required in production if site key set) |
| `GROQ_API_KEY` | Optional smarter chatbot |

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. **SQL Editor** → run [`supabase/schema.sql`](supabase/schema.sql) (creates `contacts` table)
3. **Project Settings → API** → copy Project URL + `service_role` key into `.env.local`
4. Contact form posts to `/api/contact` and rows appear in **Table Editor → contacts**

## Deploy on Vercel

1. Import the GitHub repo
2. **Root Directory:** `.` (repo root)
3. Framework: Next.js (auto)
4. Add env vars above
5. Deploy

No separate backend host is required. API routes live at `/api/contact`, `/api/chat`, `/api/health`.
