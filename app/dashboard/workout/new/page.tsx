import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateWorkoutForm } from "./CreateWorkoutForm";

export default async function NewWorkoutPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const { date: dateParam } = await searchParams;
  const defaultDate = dateParam ?? format(new Date(), "yyyy-MM-dd");

  return (
    <main className="max-w-lg mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle>New workout</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateWorkoutForm defaultDate={defaultDate} />
        </CardContent>
      </Card>
    </main>
  );
}
