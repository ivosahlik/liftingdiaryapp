# Coding Standards Overview

This file summarizes the coding standards for this app. Each section links to a dedicated doc with full rules and examples.

## Routing

See [docs/routing.md](./routing.md) for full rules.

- All app routes MUST be nested under `/dashboard` (e.g. `/dashboard/workouts`, `/dashboard/profile`).
- `/dashboard` and every sub-route is a **protected route** — unauthenticated users are redirected to sign-in.
- Route protection is enforced exclusively via **Next.js middleware** (`middleware.ts`) using Clerk's `clerkMiddleware`. Do NOT add per-page auth checks.
- Public routes (`/`, `/sign-in`, `/sign-up`) must be explicitly declared in the middleware's `isPublicRoute` matcher.
- After sign-in, users are redirected to `/dashboard`.
- Shared dashboard chrome (nav, sidebar) belongs in `app/dashboard/layout.tsx`.

## Authentication

See [docs/auth.md](./auth.md) for full rules.

- Clerk is the only auth provider. Do not use any other library.
- Wrap the root layout in `<ClerkProvider>`.
- Use `auth()` from `@clerk/nextjs/server` to read the authenticated user in Server Components.
- Use Clerk's built-in UI components (`<SignIn>`, `<SignUp>`, `<UserButton>`). Do not build custom auth forms.

## UI

See [docs/ui.md](./ui.md) for full rules.

## Data Fetching

See [docs/data-fetching.md](./data-fetching.md) for full rules.

## Data Mutations

See [docs/data-mutations.md](./data-mutations.md) for full rules.

## Server Components

See [docs/server-components.md](./server-components.md) for full rules.
