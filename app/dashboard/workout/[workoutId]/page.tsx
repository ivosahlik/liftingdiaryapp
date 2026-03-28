import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWorkoutById } from "@/data/workouts";
import { EditWorkoutForm } from "./EditWorkoutForm";

export default async function EditWorkoutPage({
  params,
}: {
  params: Promise<{ workoutId: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const { workoutId } = await params;
  const id = parseInt(workoutId, 10);
  if (isNaN(id)) notFound();

  const workout = await getWorkoutById(userId, id);
  if (!workout) notFound();

  const defaultDate = format(workout.startedAt, "yyyy-MM-dd");

  return (
    <main className="max-w-lg mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit workout</CardTitle>
        </CardHeader>
        <CardContent>
          <EditWorkoutForm
            workoutId={id}
            defaultName={workout.name}
            defaultDate={defaultDate}
          />
        </CardContent>
      </Card>
    </main>
  );
}
