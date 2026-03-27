# Data Fetching

## Rule: Server Components Only

**ALL data fetching in this app MUST be done exclusively via Server Components.**

Do NOT fetch data via:
- Route handlers (`app/api/...`)
- Client components (`"use client"`)
- Any other mechanism

This is a hard rule with no exceptions.

## Rule: Drizzle ORM via `/data` Helper Functions

**ALL database queries MUST go through helper functions in the `/data` directory.**

These helper functions must use Drizzle ORM — **do NOT write raw SQL under any circumstances.**

Example structure:
```
/data
  workouts.ts   ← helper functions for workout queries
  exercises.ts  ← helper functions for exercise queries
```

Example helper function:
```ts
// data/workouts.ts
import { db } from "@/db";
import { workouts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getWorkoutsForUser(userId: string) {
  return db.select().from(workouts).where(eq(workouts.userId, userId));
}
```

Then consumed directly in a Server Component:
```ts
// app/workouts/page.tsx
import { getWorkoutsForUser } from "@/data/workouts";
import { auth } from "@/lib/auth";

export default async function WorkoutsPage() {
  const session = await auth();
  const workouts = await getWorkoutsForUser(session.user.id);
  // ...
}
```

## Rule: Users Can Only Access Their Own Data

**Every helper function in `/data` MUST scope queries to the authenticated user.**

- Always accept `userId` as a parameter and filter by it in every query.
- Never expose a function that returns data for all users or accepts an arbitrary ID without validating it against the session.
- The calling Server Component is responsible for passing `session.user.id` — never trust a user-supplied ID from params or search params without confirming it matches the session.

Failing to enforce this would allow any logged-in user to read another user's data. This is a critical security requirement.
