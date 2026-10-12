# ExerciseLog Frontend

## Project Overview

Frontend application for ExerciseLog - a workout tracking app with AI-powered workout generation. Built with Next.js 16 (App Router) + React 19 + TypeScript strict mode.

## Working Mode

**Do not write or modify code unless the user explicitly asks for it.** The default mode is advisory: analyse, explain what to do, where and why, propose the approach — the user writes the implementation themselves.

This means, unless explicitly told otherwise:

- Do not create, edit or delete source files
- Do not run installers, generators or scaffolding that adds files (`npx shadcn@latest add`, `npm install`, `npx create-*`)
- Do not slip refactors or "while I was there" fixes into an answer

A question about what to do next, a description of a design, or a pasted screenshot is **context, not a green light**. Write code only on an explicit instruction ("napisz", "zaimplementuj", "zrób to", "dodaj", "go ahead").

Always fine without asking: reading files, searching the codebase, read-only commands (`git status`, `git log`, `git diff`, `npm run lint`), and writing to the scratchpad directory.

If a proposal needs a code sample to be understandable, put a short snippet in the chat answer — do not apply it to the repo.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5 (strict)
- **Styling:** Tailwind CSS 4, shadcn/ui (New York style, CSS variables)
- **Design system:** `--el-*` design tokens in `globals.css` (source of truth); shadcn semantic tokens are bridged to them. Brand = purple `#7C3AED` + lime `#BEF264`. Font = General Sans via `next/font/local` (`src/app/fonts/`). Dark is the intended default theme, but `defaultTheme` is temporarily set to `light` for UI testing (see "Decyzje projektowe" in the plan) - restore before release.
- **State:** TanStack Query v5 (server state), Zustand 5 (UI state)
- **Forms:** React Hook Form + Zod 4 + @hookform/resolvers
- **HTTP:** Axios with cookie-based auth + refresh token interceptor
- **Utilities:** date-fns, nuqs (URL state), next-themes, framer-motion, Sonner (toasts)
- **Icons:** Lucide React

## Project Structure

Feature-based (hybrid): domain code lives in `features/`, infrastructure in `shared/`, and `app/` holds routing only.

```
src/
  app/                        # Routing and composition ONLY - no business logic
    (auth)/                   # Auth pages (login, signup) - no nav, centered layout
    (dashboard)/              # Protected pages - with bottom nav / sidebar
    layout.tsx  globals.css  fonts/

  features/                   # One folder per domain
    auth/
      api.ts                  # login, signup, logout, getMe
      schemas.ts              # Zod schemas
      hooks/                  # use-auth, ...
      components/             # login-form, signup-form
      index.ts                # PUBLIC API of the feature
    workouts/                 # same shape: api.ts, schemas.ts, hooks/, components/, index.ts
    exercises/
    sets/
    ai-generator/
    stats/
    profile/

  shared/                     # Cross-cutting infrastructure, domain-agnostic
    api/client.ts             # Axios instance + refresh interceptor
    components/form/          # Generic RHF field wrappers (TextField, ...)
    components/layout/        # Navigation, headers
    lib/utils.ts              # cn(), formatDate(), formatDuration()
    types/api.ts              # Backend DTO contract - stays shared, do NOT split
    hooks/                    # Generic hooks (use-media-query, ...)

  components/ui/              # shadcn/ui - stays here (components.json alias)
  providers/                  # QueryProvider, ThemeProvider
  stores/                     # Zustand stores (ui-store, active-workout-store)
```

### Architecture Rules (enforced in review)

1. **Dependency direction is one-way:** `app/` → `features/` → `shared/`. `shared/` must NEVER import from `features/`; `features/` must NEVER import from `app/`.
2. **`app/` stays thin.** A `page.tsx` imports a component from a feature and composes layout. No data fetching, no forms, no business logic in route files. Route-local components go in `_components/` only when used by exactly that one route.
3. **Cross-feature imports go through the barrel only:** `@/features/workouts`, never `@/features/workouts/hooks/use-workouts`. Deep imports into another feature are a review finding.
4. **Barrels only at feature root.** No `index.ts` inside `hooks/`, `components/`, etc. - it hurts tree-shaking and navigation.
5. **Feature dependency order:** `workouts` → `exercises` → `sets`. Never the reverse. A reverse import means the boundary is wrong - flag it rather than working around it.
6. **`shared/types/api.ts` is not split per feature.** Backend DTOs are mutually nested (`Workout.exercises`, `Exercise.sets`); splitting creates circular type imports. Treat it as a generated backend contract.
7. **Schemas spanning multiple domains** (e.g. bulk workout create) belong to the highest-level feature that owns them (`workouts` or `ai-generator`), not duplicated across features.

**Migration status:** the codebase is mid-migration from the old type-based layout (`src/api/`, `src/hooks/`, `src/lib/validations/`, `src/types/`). New code follows the structure above. Existing files still in the old locations are known debt, not review findings - but do not add new files there.

## Backend API (ExerciseLog API - NestJS)

**Base URL:** `NEXT_PUBLIC_API_URL` — the relative path `/api`, proxied to the backend by Next rewrites (`next.config.ts`, target from `API_PROXY_TARGET`).

⚠️ **The rewrite is load-bearing for auth, not a convenience.** Keeping API calls same-origin is what puts the backend's `Authentication` / `Refresh` cookies on the frontend origin, which is the only way `src/proxy.ts` (middleware) can read them server-side. Point `NEXT_PUBLIC_API_URL` straight at the API host and the cookies land on the API domain instead: the middleware stops seeing them and every logged-in user is bounced back to `/login` — silently, with no type or build error. Consequence to keep in mind: a relative base URL makes `apiClient` browser-only, so calling it from an RSC or route handler throws `Invalid URL`.

### Authentication

- Cookie-based JWT: `Authentication` (access, 24h) + `Refresh` (refresh, 7d)
- Both cookies are httpOnly, secure in production, sameSite=Lax
- All API calls use `withCredentials: true`
- On 401: auto-refresh via `POST /auth/refresh`, retry original request
- On refresh failure: redirect to `/login?reason=session_expired`

### Key Endpoints

- `POST /auth/login` | `POST /auth/signup` | `POST /auth/refresh` | `POST /auth/logout`
- `GET /users/me` | `PATCH /users/:id` | `DELETE /users/:id`
- `GET /users/:id/workouts` (paginated) | `POST /users/:id/workouts` | `POST /users/:id/workouts/bulk`
- `GET /workouts/:id` | `PATCH /workouts/:id` | `DELETE /workouts/:id`
- `GET /workouts/:id/exercises` | `POST /workouts/:id/exercises`
- `GET /exercises/:id` | `PATCH /exercises/:id` | `DELETE /exercises/:id`
- `GET /exercises/:id/sets` | `POST /exercises/:id/sets` | `POST /exercises/:id/image` (FormData)
- `GET /sets/:id` | `PATCH /sets/:id` | `DELETE /sets/:id`
- `POST /ai/generate-workout` (auth required - `@UseGuards(JwtAuthGuard)` sits on the controller, so plan the AI generator as a screen behind login, not a public one)

### Response Format

Verified against the running API and the backend source (`data-response.interceptor.ts`, `all-exceptions.filter.ts`).

- **Success:** `{ apiVersion, data }` - exactly two keys, nothing else.
- **Error:** `{ apiVersion, error: { statusCode, message, timestamp, path } }` - note the extra nesting. Read it via `data.error.message`, never `data.message`. `message` is always a single string; the filter joins `ValidationPipe` output with `', '`, so `string[]` never reaches the frontend.
- **Paginated:** the page sits _inside_ `data`: `{ apiVersion, data: { data: T[], meta: { total, lastPage, currentPage, perPage, prev, next }, links } }`.
- **`204`** (`POST /auth/logout`, all `DELETE`): empty body, no envelope - `response.data === ''` in axios.

`apiVersion` comes straight from `process.env.APP_VERSION` and `JSON.stringify` drops the key when the variable is unset - never treat it as an envelope marker.

The response interceptor in `src/api/client.ts` unwraps the success envelope **exactly one level** (recursing would eat the outer level of pagination and return a bare array), so functions in a feature's `api.ts` receive the payload directly. Envelope types: `ApiEnvelope<T>` / `ApiErrorEnvelope` in `src/types/api.ts`.

## Conventions

- **Language:** Code in English, UI text in English
- **Comments:** Do NOT add code comments unless explicitly asked. Write self-explanatory code instead. Never add comments that merely restate what the code does. Existing comments stay untouched unless the code they describe changes.
- **Components:** Use shadcn/ui as base, extend with Tailwind
- **Forms:** Always React Hook Form + Zod resolver, validate before submit
- **Data fetching:** TanStack Query hooks in the feature's `hooks/` directory, never fetch in components directly
- **API layer:** Thin functions in the feature's `api.ts` that call the shared apiClient and return typed data
- **State:** Server state in TanStack Query, UI-only state in Zustand
- **Routing:** nuqs for URL search params (pagination, filters)
- **Dark mode:** Intended default is dark (gym app!), use next-themes. Currently `light` temporarily for UI testing
- **Mobile-first:** Bottom nav on mobile, sidebar/topnav on desktop
- **Path aliases:** `@/*` maps to `src/*`

## Implementation Plan

Detailed plan in `ai-tmp/Plan Implementacji Frontend.md` (14 phases, Polish). Deliberate deviations from it are recorded in its "Decyzje projektowe" section - read it before flagging a mismatch. Current status: Phases 0-2 complete, Phase 3 (auth) nearly complete.

## Commands

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - ESLint check

## Custom Agents

- `api-compliance-reviewer` - Senior FullStack reviewer: checks code against API contract, implementation plan, security, and architecture. **Does not write code.**
