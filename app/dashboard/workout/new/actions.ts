"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { insertWorkout } from "@/data/workouts";

const CreateWorkoutSchema = z.object({
  name: z.string().min(1, "Workout name is required").max(255),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be yyyy-MM-dd"),
});

type CreateWorkoutInput = z.infer<typeof CreateWorkoutSchema>;

export async function createWorkout(input: CreateWorkoutInput) {
  const parsed = CreateWorkoutSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { userId } = await auth();
  if (!userId) return { error: "Unauthenticated" };

  await insertWorkout(userId, parsed.data.name, parsed.data.date);

  return { date: parsed.data.date };
}
