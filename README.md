# Zohaib Portfolio (Next.js)

Single Next.js app — UI + contact/chat API — ready for one Vercel deploy.

## Local development

```bash
npm install
cp .env.example .env.local
# set MONGO_URI (required for contact form)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Purpose |
|----------|---------|
| `MONGO_URI` | MongoDB Atlas (contact messages) |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v2 site key (optional locally) |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA secret (required in production if site key set) |
| `GROQ_API_KEY` | Optional smarter chatbot |

## Deploy on Vercel

1. Import the GitHub repo
2. **Root Directory:** `.` (repo root)
3. Framework: Next.js (auto)
4. Add env vars above
5. Deploy

No separate backend host is required. API routes live at `/api/contact`, `/api/chat`, `/api/health`.
