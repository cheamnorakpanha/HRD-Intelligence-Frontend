@AGENTS.md

# HRD Intelligence Web

Admin/Instructor web app for HRD: students, attendance, scores, allowances, alumni, files, AI chat.
Frontend only. Backend is a separate Spring Boot API Gateway (REST, JWT from Keycloak).

## Stack
Next.js (App Router) · TypeScript strict · Tailwind · shadcn/ui (Base UI, Nova) · TanStack Query + Table
· react-hook-form + zod · Recharts · zustand · axios · Keycloak auth · npm only.

## Commands
- Dev: `npm run dev`
- Type check: `npx tsc --noEmit` (prefer this over `npm run build` to verify changes)
- Lint: `npm run lint`
- Add UI component: `npx shadcn@latest add <name>` (never hand-write files in components/ui)

## Where things go
- Pages: `src/app/(main)/<page>/page.tsx` — thin, just render feature components
- Public pages (no login): `src/app/(auth)/*`, `src/app/(public)/*`
- Feature code: `src/features/<feature>/{components,hooks,services}` + `types.ts`, `schemas.ts`
- Flow: component → hook (React Query) → service → `src/lib/api-client.ts` → API
- Only `services/` call the API. Server data lives in React Query, not zustand.
- Shared: `src/components/{shared,layout,charts,data-table}`, `src/types`, `src/hooks`
- Routes: always use `ROUTES` from `src/constants/routes.ts`. Roles: `ROLES` from `src/constants/roles.ts`.
- API response shapes: `src/types/api.ts`

## Rules
- A feature never imports from another feature. Move shared code to `src/components/shared` or `src/types`.
- Roles: ADMIN, INSTRUCTOR. Admin-only pages are listed in `ADMIN_ONLY_ROUTES`. Hide admin UI with role checks; backend still enforces.
- Files kebab-case, components PascalCase, hooks `useX`.
- No `any`. No new dependencies without asking.
- English only in UI.

## How to work (keep it short)
- Read only the files needed for the task. Don't scan the whole repo.
- Never read `node_modules`, `.next`, `package-lock.json`.
- Edit files in place; don't rewrite whole files for small changes.
- Don't repeat unchanged code back in replies. Summarize what changed in 1–3 lines.
- Ask before refactors that touch more than one feature.
