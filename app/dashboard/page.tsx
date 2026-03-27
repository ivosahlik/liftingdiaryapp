"use client";

import { useState } from "react";
import { format, isSameDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

const MOCK_WORKOUTS = [
  {
    id: 1,
    name: "Push Day",
    date: new Date(2026, 2, 25),
    completedAt: new Date(2026, 2, 25, 9, 15),
    exercises: [
      {
        id: 1,
        name: "Bench Press",
        sets: [
          { setNumber: 1, reps: 10, weightKg: 80 },
          { setNumber: 2, reps: 8, weightKg: 82.5 },
          { setNumber: 3, reps: 6, weightKg: 85 },
        ],
      },
      {
        id: 2,
        name: "Overhead Press",
        sets: [
          { setNumber: 1, reps: 10, weightKg: 50 },
          { setNumber: 2, reps: 8, weightKg: 52.5 },
          { setNumber: 3, reps: 6, weightKg: 55 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Pull Day",
    date: new Date(2026, 2, 26),
    completedAt: new Date(2026, 2, 26, 9, 30),
    exercises: [
      {
        id: 3,
        name: "Pull-ups",
        sets: [
          { setNumber: 1, reps: 8, weightKg: 0 },
          { setNumber: 2, reps: 8, weightKg: 0 },
          { setNumber: 3, reps: 6, weightKg: 0 },
        ],
      },
      {
        id: 4,
        name: "Barbell Row",
        sets: [
          { setNumber: 1, reps: 10, weightKg: 60 },
          { setNumber: 2, reps: 10, weightKg: 62.5 },
          { setNumber: 3, reps: 8, weightKg: 65 },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Leg Day",
    date: new Date(2026, 2, 27),
    completedAt: null,
    exercises: [
      {
        id: 5,
        name: "Squat",
        sets: [
          { setNumber: 1, reps: 8, weightKg: 100 },
          { setNumber: 2, reps: 8, weightKg: 102.5 },
          { setNumber: 3, reps: 6, weightKg: 105 },
        ],
      },
      {
        id: 6,
        name: "Romanian Deadlift",
        sets: [
          { setNumber: 1, reps: 10, weightKg: 60 },
          { setNumber: 2, reps: 10, weightKg: 62.5 },
          { setNumber: 3, reps: 8, weightKg: 65 },
        ],
      },
    ],
  },
];

export default function DashboardPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const workouts = MOCK_WORKOUTS.filter((w) => isSameDay(w.date, date));

  return (
    <main className="max-w-2xl mx-auto px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className={buttonVariants({ variant: "outline", size: "default" }) + " w-48 justify-start"}>
          <CalendarIcon className="size-4" />
          {format(date, "do MMM yyyy")}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              if (d) {
                setDate(d);
                setOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>

      {workouts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No workouts logged for this date.</p>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <Card key={workout.id}>
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
          ))}
        </div>
      )}
    </main>
  );
}
