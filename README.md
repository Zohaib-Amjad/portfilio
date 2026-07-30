# Zohaib — MERN Portfolio

A production-ready, single-page developer portfolio with a React frontend and an Express/MongoDB contact API. The visual system uses a near-black terminal aesthetic with a metallic Doom-inspired green accent.

## Stack

- **Client:** React 19, Vite, Tailwind CSS, Framer Motion
- **Server:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **Targets:** Vercel (client) and Render (server)

## Project structure

```text
client/   React portfolio and contact form
server/   Express API, validation, and MongoDB persistence
```

## Local setup

Requirements: Node.js 20+ and a MongoDB database.

1. Configure the server:

   ```bash
   cd server
   cp .env.example .env
   npm install
   npm run dev
   ```

2. In a second terminal, configure the client:

   ```bash
   cd client
   cp .env.example .env
   npm install
   npm run dev
   ```

3. Open `http://localhost:5173`. The API health endpoint is available at `http://localhost:5000/api/health`.

The contact form sends `POST /api/contact` requests shaped like:

```json
{
  "name": "Your name",
  "email": "you@example.com",
  "message": "A project message of at least 10 characters."
}
```

## Environment variables

### Server

- `MONGO_URI`: MongoDB Atlas or MongoDB connection string
- `PORT`: local server port; defaults to `5000`
- `CLIENT_URL`: comma-separated allowed client origins
- `NODE_ENV`: `development` or `production`

### Client

- `VITE_API_URL`: deployed API origin, for example `https://portfolio-api.onrender.com`

Only `.env.example` files are committed. Never commit real database credentials.

## Verification

```bash
cd server && npm test
cd client && npm run lint
cd client && npm run build
```

The API tests cover health, request validation, and the successful persistence path.

## Deploy the API to Render

1. Create a **Web Service** from this repository.
2. Set the root directory to `server`.
3. Use `npm install` as the build command and `npm start` as the start command.
4. Add `MONGO_URI`, `NODE_ENV=production`, and `CLIENT_URL=https://your-portfolio.vercel.app`.
5. Deploy and copy the Render service URL.

For MongoDB Atlas, allow Render network access and use a database user with only the permissions this app needs.

## Deploy the client to Vercel

1. Import this repository and set the root directory to `client`.
2. Vercel detects Vite automatically. The build command is `npm run build`; output is `dist`.
3. Add `VITE_API_URL` with the Render service URL.
4. Deploy, then update the server's `CLIENT_URL` to the final Vercel domain.

## Content to customize before launch

- Replace project and social URLs in `client/src/data/projects.js` and `client/src/components/Footer.jsx`.
- Update the contact email in `client/src/components/Contact.jsx`.
- Add the final resume as `client/public/zohaib-resume.pdf`.
- Replace the Open Graph image with a full-size social preview and update `client/index.html`.
