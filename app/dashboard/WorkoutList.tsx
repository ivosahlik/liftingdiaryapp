"use client";

import { useState, useEffect } from "react";
import { getWorkoutsForDate, type WorkoutWithDetails } from "./actions";

function todayString() {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

export default function WorkoutList() {
  const [date, setDate] = useState(todayString);
  const [workouts, setWorkouts] = useState<WorkoutWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWorkoutsForDate(date).then((data) => {
      setWorkouts(data);
      setLoading(false);
    });
  }, [date]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <label htmlFor="date-picker" className="text-sm font-medium">
          Date
        </label>
        <input
          id="date-picker"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-9 px-3 rounded-md border border-black/[.12] dark:border-white/[.12] text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
        />
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : workouts.length === 0 ? (
        <p className="text-sm text-gray-500">No workouts logged for this date.</p>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="rounded-lg border border-black/[.08] dark:border-white/[.08] p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{workout.name}</h2>
                <span className="text-xs text-gray-500">
                  {workout.completedAt ? "Completed" : "In progress"}
                </span>
              </div>

              {workout.exercises.map((exercise) => (
                <div key={exercise.id} className="space-y-2">
                  <h3 className="text-sm font-medium">{exercise.name}</h3>
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="text-gray-400">
                        <th className="pr-6 font-normal pb-1">Set</th>
                        <th className="pr-6 font-normal pb-1">Reps</th>
                        <th className="font-normal pb-1">Weight (kg)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exercise.sets.map((set) => (
                        <tr key={set.id} className="border-t border-black/[.04] dark:border-white/[.04]">
                          <td className="pr-6 py-1">{set.setNumber}</td>
                          <td className="pr-6 py-1">{set.reps ?? "—"}</td>
                          <td className="py-1">{set.weightKg ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
