# Server Components

## Rule: Server Components Are the Default

All page and layout files in `app/` are Server Components by default. Do NOT add `"use client"` unless the component requires browser APIs, event handlers, or React hooks.

## Rule: `params` and `searchParams` MUST Be Awaited

**This is a Next.js 15 project. `params` and `searchParams` are Promises — they MUST be awaited before accessing any property.**

Do NOT destructure them directly from the function signature. Always `await` them first:

```tsx
// ✅ Correct
export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ workoutId: string }>;
}) {
  const { workoutId } = await params;
  // ...
}
```

```tsx
// ❌ Wrong — params is a Promise in Next.js 15, not a plain object
export default async function WorkoutPage({
  params,
}: {
  params: { workoutId: string };
}) {
  const { workoutId } = params; // runtime error
  // ...
}
```

The same applies to `searchParams`:

```tsx
// ✅ Correct
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;
  // ...
}
```

## Rule: Type `params` and `searchParams` as Promises

Always type these props as `Promise<{ ... }>`, never as plain objects:

```tsx
// ✅ Correct
type Props = {
  params: Promise<{ workoutId: string }>;
  searchParams: Promise<{ date?: string }>;
};
```

## Rule: Redirect Unauthenticated Users With `redirect()`

Use `redirect()` from `next/navigation` (not `Response`) to send unauthenticated users away. Always check auth before fetching data:

```tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");
  // safe to fetch data here
}
```

## Rule: Use `notFound()` for Missing Resources

If a resource does not exist or does not belong to the authenticated user, call `notFound()` from `next/navigation` to render the nearest `not-found.tsx`:

```tsx
import { notFound } from "next/navigation";

const workout = await getWorkoutById(userId, id);
if (!workout) notFound();
```
