# Authentication

## Rule: Clerk Is the Only Auth Provider

**This app uses [Clerk](https://clerk.com) for all authentication. Do NOT use any other auth library (NextAuth, Auth.js, Lucia, custom JWT, etc.).**

Install the Clerk SDK:
```bash
npm install @clerk/nextjs
```

## Rule: Wrap the App in `ClerkProvider`

The root layout (`app/layout.tsx`) MUST wrap its children in `<ClerkProvider>`:

```tsx
// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

## Rule: Protect Routes via Middleware

Use Clerk's `clerkMiddleware` in `middleware.ts` at the project root to protect routes. Do NOT implement custom session checks on individual pages.

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
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jiff?g|webp|png|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
```

## Rule: Read the Authenticated User in Server Components

Use Clerk's `auth()` helper from `@clerk/nextjs/server` to get the current user's ID in Server Components and pass it to `/data` helper functions.

```ts
// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { getWorkoutsForUser } from "@/data/workouts";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) return null; // middleware should have already redirected

  const workouts = await getWorkoutsForUser(userId);
  // ...
}
```

- Always destructure `userId` from `auth()` — never use the full session object to pass IDs downstream.
- Never trust a `userId` from URL params or request bodies — always use the value from `auth()`.

## Rule: Sign-In and Sign-Up Pages

Use Clerk's hosted or embedded components. Do NOT build custom sign-in/sign-up forms.

```tsx
// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return <SignIn />;
}
```

```tsx
// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return <SignUp />;
}
```

## Rule: User-Facing Auth UI Controls

Use Clerk's `<UserButton>` for the signed-in user menu (avatar, sign-out, profile). Do NOT build a custom sign-out button or user menu.

```tsx
import { UserButton } from "@clerk/nextjs";

<UserButton />
```

## Environment Variables

The following variables MUST be set in `.env.local` and are required for Clerk to function:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

Do NOT commit these values to source control.