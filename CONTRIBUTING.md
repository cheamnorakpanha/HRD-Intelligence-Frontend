# HRD Intelligence Web - Team Conventions

## Tools
- Package manager: **npm only**. Commit `package-lock.json`. Use `npm ci` in CI.
- Components: shadcn/ui (Base UI, Nova preset). Add with `npx shadcn@latest add <name>`.

## Where code goes
| What | Where |
|---|---|
| A page (URL) | `src/app/(main)/<page>/page.tsx` - keep it thin, render feature components |
| Feature UI | `src/features/<feature>/components` |
| Backend calls | `src/features/<feature>/services` - the ONLY place that calls the API |
| React Query hooks | `src/features/<feature>/hooks` |
| Feature types / form schemas | `src/features/<feature>/types.ts`, `schemas.ts` |
| Used by 2+ features | `src/components/shared`, `src/hooks`, `src/types` |
| Global client state | `src/stores` (zustand) - server data belongs in React Query, not here |

Data flow: **component -> hook -> service -> lib/api-client -> API Gateway**

## Rules
- A feature must not import from another feature's folder. Move shared code to `src/components/shared` or `src/types`.
- Use `ROUTES` from `src/constants/routes.ts` instead of hard-coded URLs.
- Use `ROLES` from `src/constants/roles.ts` for role checks. The backend still enforces permissions.
- File names: `kebab-case.tsx`. Components: `PascalCase`. Hooks: `useSomething`.

## Git
- Branches: `feature/<name>`, `fix/<name>` from `develop`.
- Commits: `feat: ...`, `fix: ...`, `refactor: ...`, `chore: ...`