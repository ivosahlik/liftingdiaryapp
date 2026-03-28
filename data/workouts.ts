import { db } from "@/db";
import { workoutsTable, exercisesTable, setsTable } from "@/db/schema";
import { and, gte, lt, eq } from "drizzle-orm";

export async function insertWorkout(
  userId: string,
  name: string,
  date: string
): Promise<{ id: number }> {
  const startedAt = new Date(`${date}T00:00:00`);
  const [workout] = await db
    .insert(workoutsTable)
    .values({ userId, name, startedAt })
    .returning({ id: workoutsTable.id });
  return workout;
}

export type SetRow = {
  id: number;
  setNumber: number;
  reps: number | null;
  weightKg: number | null;
};

export type ExerciseWithSets = {
  id: number;
  name: string;
  order: number;
  sets: SetRow[];
};

export type WorkoutWithDetails = {
  id: number;
  name: string;
  startedAt: Date;
  completedAt: Date | null;
  exercises: ExerciseWithSets[];
};

export async function getWorkoutsForDate(
  userId: string,
  date: string
): Promise<WorkoutWithDetails[]> {
  const start = new Date(`${date}T00:00:00`);
  const end = new Date(`${date}T23:59:59.999`);
  if (isNaN(start.getTime())) return [];

  const workouts = await db
    .select()
    .from(workoutsTable)
    .where(
      and(
        eq(workoutsTable.userId, userId),
        gte(workoutsTable.startedAt, start),
        lt(workoutsTable.startedAt, end)
      )
    );

  const result: WorkoutWithDetails[] = [];

  for (const workout of workouts) {
    const exercises = await db
      .select()
      .from(exercisesTable)
      .where(eq(exercisesTable.workoutId, workout.id))
      .orderBy(exercisesTable.order);

    const exercisesWithSets: ExerciseWithSets[] = await Promise.all(
      exercises.map(async (exercise) => {
        const sets = await db
          .select({
            id: setsTable.id,
            setNumber: setsTable.setNumber,
            reps: setsTable.reps,
            weightKg: setsTable.weightKg,
          })
          .from(setsTable)
          .where(eq(setsTable.exerciseId, exercise.id))
          .orderBy(setsTable.setNumber);
        return { ...exercise, sets };
      })
    );

    result.push({ ...workout, exercises: exercisesWithSets });
  }

  return result;
}
