# Data Mutations

## Rule: Mutations Go Through `/data` Helper Functions

**ALL database mutations MUST be done via helper functions in the `/data` directory using Drizzle ORM. Do NOT write raw SQL or call `db` directly from Server Actions or components.**

```ts
// data/workouts.ts
import { db } from "@/db";
import { workouts } from "@/db/schema";

export async function createWorkout(userId: string, date: string, notes: string) {
  return db.insert(workouts).values({ userId, date, notes });
}

export async function deleteWorkout(userId: string, workoutId: number) {
  return db.delete(workouts).where(
    and(eq(workouts.id, workoutId), eq(workouts.userId, userId))
  );
}
```

- Always scope mutations to the authenticated user — never mutate another user's data.
- Accept `userId` as an explicit parameter; never derive it inside the helper.

## Rule: Server Actions Only — Colocated in `actions.ts`

**ALL data mutations MUST be triggered via Server Actions. Do NOT use Route Handlers (`app/api/...`) for mutations.**

Server Actions must live in a colocated `actions.ts` file next to the route or component that uses them:

```
app/
  workouts/
    page.tsx
    actions.ts   ← Server Actions for this route
  dashboard/
    page.tsx
    actions.ts   ← Server Actions for this route
```

Every `actions.ts` file MUST begin with `"use server"`:

```ts
"use server";
```

## Rule: Typed Parameters — No `FormData`

**Server Action parameters MUST be explicitly typed. Do NOT use `FormData` as a parameter type.**

```ts
// ✅ Correct
export async function createWorkout(input: CreateWorkoutInput) { ... }

// ❌ Wrong
export async function createWorkout(formData: FormData) { ... }
```

Call Server Actions directly with typed objects from Client Components:

```tsx
// app/workouts/WorkoutForm.tsx
"use client";

import { createWorkout } from "./actions";

export function WorkoutForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createWorkout({ date: "2026-03-28", notes: "Leg day" });
  }
  // ...
}
```

## Rule: Validate All Inputs with Zod

**Every Server Action MUST validate its arguments with Zod before doing anything else.** Throw or return an error if validation fails — never proceed with invalid input.

Define the Zod schema alongside the action in `actions.ts`:

```ts
"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { createWorkout as createWorkoutInDb } from "@/data/workouts";

const CreateWorkoutSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be yyyy-MM-dd"),
  notes: z.string().max(1000).optional(),
});

type CreateWorkoutInput = z.infer<typeof CreateWorkoutSchema>;

export async function createWorkout(input: CreateWorkoutInput) {
  const parsed = CreateWorkoutSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthenticated");

  return createWorkoutInDb(userId, parsed.data.date, parsed.data.notes ?? "");
}
```

- Always use `safeParse` so you can return a meaningful error rather than letting Zod throw.
- Derive the TypeScript type from the schema with `z.infer<typeof Schema>` — do not duplicate type definitions.
- Validate before calling `auth()` to fail fast on bad input.