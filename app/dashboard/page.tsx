export const dynamic = 'force-dynamic';

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { DatePicker } from "./DatePicker";
import { getWorkoutsForDate } from "@/data/workouts";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const { date: dateParam } = await searchParams;
  const dateStr = dateParam ?? format(new Date(), "yyyy-MM-dd");

  const workouts = await getWorkoutsForDate(userId, dateStr);

  return (
    <main className="max-w-2xl mx-auto px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <DatePicker defaultDate={dateStr} />

      {workouts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No workouts logged for this date.
        </p>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <Link key={workout.id} href={`/dashboard/workout/${workout.id}`} className="block">
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{workout.name}</CardTitle>
                  <Badge variant={workout.completedAt ? "default" : "secondary"}>
                    {workout.completedAt ? "Completed" : "In progress"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {workout.exercises.map((exercise) => (
                  <div key={exercise.id} className="space-y-2">
                    <p className="text-sm font-medium">{exercise.name}</p>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">Set</TableHead>
                          <TableHead className="w-16">Reps</TableHead>
                          <TableHead>Weight (kg)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {exercise.sets.map((set) => (
                          <TableRow key={set.setNumber}>
                            <TableCell>{set.setNumber}</TableCell>
                            <TableCell>{set.reps ?? "—"}</TableCell>
                            <TableCell>{set.weightKg || "BW"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
