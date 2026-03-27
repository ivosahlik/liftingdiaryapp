import WorkoutList from "./WorkoutList";

export default function DashboardPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <WorkoutList />
    </main>
  );
}
