# Routing

## Rule: All App Routes Live Under `/dashboard`

All authenticated app routes MUST be nested under the `/dashboard` path. Do NOT place app pages at the root level (e.g., `/workouts`, `/profile`).

```
app/
  dashboard/
    page.tsx                  # /dashboard
    workouts/
      page.tsx                # /dashboard/workouts
      [id]/
        page.tsx              # /dashboard/workouts/[id]
    profile/
      page.tsx                # /dashboard/profile
```

## Rule: `/dashboard` and All Sub-Routes Are Protected

Every route under `/dashboard` is a protected route — only authenticated users may access it. Do NOT add per-page auth checks to enforce this. Protection is handled entirely by middleware (see below).

## Rule: Route Protection Is Done via Next.js Middleware

Use Clerk's `clerkMiddleware` in `middleware.ts` at the project root to protect all `/dashboard` routes. Do NOT implement custom session checks inside page components.

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jiff?g|webp|png|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

- Any route not explicitly listed in `isPublicRoute` is protected by default.
- `/dashboard` and all sub-paths are protected because they are not listed as public.

## Rule: Public Routes Are Explicitly Declared

Only the following routes are public (unauthenticated access allowed):

| Path | Purpose |
|------|---------|
| `/` | Marketing / landing page |
| `/sign-in` | Clerk sign-in flow |
| `/sign-up` | Clerk sign-up flow |

All other routes are private. Add new public routes explicitly to `isPublicRoute` in `middleware.ts`.

## Rule: Redirect After Sign-In Goes to `/dashboard`

Configure Clerk to redirect users to `/dashboard` after a successful sign-in.

```tsx
// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return <SignIn forceRedirectUrl="/dashboard" />;
}
```

## Rule: Layout Nesting for Dashboard

Create a shared layout at `app/dashboard/layout.tsx` for all dashboard pages (nav, sidebar, etc.). Do NOT duplicate layout chrome across individual dashboard pages.

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* shared nav/sidebar */}
      <main>{children}</main>
    </div>
  );
}
```
