# HRD Intelligence — Web

Web app for HRD Admins and Instructors to manage students, attendance, scores, allowances, alumni, documents, and an AI assistant.

This repo is the **frontend only**. It talks to the Spring Boot API Gateway and uses Keycloak for login.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query (server data) + TanStack Table (tables)
- React Hook Form + Zod (forms)
- Recharts (charts), Zustand (UI state), Axios (API calls)

## Getting started

**Requirements:** Node.js LTS and npm. Use **npm only** — not pnpm or yarn.

```bash
# 1. Clone and enter the project
git clone <repo-url>
cd hrd-intelligence-web

# 2. Install exact dependency versions from package-lock.json
npm ci

# 3. Create your local environment file, then fill in the values
cp .env.example .env.local      # Windows PowerShell: Copy-Item .env.example .env.local

# 4. Start the dev server
npm run dev
```

Open http://localhost:3000.

Ask the team lead for the `.env.local` values. Never commit `.env.local`.

## Scripts

| Command                | What it does                            |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start the dev server                    |
| `npm run build`        | Production build                        |
| `npm run start`        | Run the production build                |
| `npm run lint`         | Check code with ESLint                  |
| `npm run format`       | Format all files with Prettier          |
| `npm run format:check` | Check formatting without changing files |

## Project structure

```
src/
├── app/                 Pages (routes)
│   ├── (auth)/          Login, forgot password — no login required
│   ├── (public)/        Alumni update form — opened from email
│   └── (main)/          Everything behind login
├── features/            One folder per module: components, hooks, services
├── components/          Shared UI: ui (shadcn), layout, charts, data-table, shared
├── constants/           ROUTES, ROLES
├── types/               Shared types (API response shapes)
├── hooks/               Shared hooks
├── lib/                 Utilities and API client
└── stores/              Zustand stores
```

## Team workflow

1. Pull the latest `develop`.
2. Create a branch: `feature/<name>` or `fix/<name>`.
3. Before pushing, run `npm run lint` and `npm run format`.
4. Open a pull request into `develop`.

Read [CONTRIBUTING.md](./CONTRIBUTING.md) for where code goes and naming rules.
