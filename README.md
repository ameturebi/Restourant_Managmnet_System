# Restaurant Order Management System 🍽️

A simple order management system with a NestJS backend (TypeORM + MySQL) and a static Bootstrap frontend for customers and admins.

## Quick start

Requirements:

- Node.js (>=18)
- npm
- MySQL (or managed MySQL)

Run backend (development):

```bash
cd backend
npm install
npm run start:dev
```

Serve frontend (static):

```bash
# from project root
npx http-server ./frontend/customer -p 8080
```

## Environment variables

Set these for production or when running locally against a DB:

- `DB_HOST` (e.g. 127.0.0.1)
- `DB_PORT` (default: 3306)
- `DB_USER` / `DB_USERNAME`
- `DB_PASSWORD`
- `DB_NAME` (default: `ourorder`)
- `JWT_SECRET`

## Deployment (Vercel)

1. Link the repository in Vercel.
2. Add the env vars listed above in the Vercel project settings.
3. Ensure `vercel.json` is present (routes `/api/*` to serverless backend entrypoint).
4. Run `vercel --prod` to deploy.

## Notes

- Frontend uses relative `/api/*` endpoints so it works when backend is hosted under the same domain.
- The backend reads `process.env.JWT_SECRET` for JWT validation.

## Troubleshooting

- If `8080` is in use, pick a different port or kill the process with `npx kill-port 8080`.
- If Nest cannot connect to the DB, verify env variables and network access.

---

If you want, I can also:

- Provision a managed MySQL (PlanetScale) and configure production env vars, or
- Set the env vars and deploy the backend to Vercel for you (I will need DB credentials + `JWT_SECRET`).
