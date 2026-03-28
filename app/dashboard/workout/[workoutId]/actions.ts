"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { updateWorkout } from "@/data/workouts";

const UpdateWorkoutSchema = z.object({
  workoutId: z.number().int().positive(),
  name: z.string().min(1, "Workout name is required").max(255),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be yyyy-MM-dd"),
});

type UpdateWorkoutInput = z.infer<typeof UpdateWorkoutSchema>;

export async function updateWorkoutAction(input: UpdateWorkoutInput) {
  const parsed = UpdateWorkoutSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { userId } = await auth();
  if (!userId) return { error: "Unauthenticated" };

  const updated = await updateWorkout(
    userId,
    parsed.data.workoutId,
    parsed.data.name,
    parsed.data.date
  );

  if (!updated) return { error: "Workout not found" };

  return { date: parsed.data.date };
}
