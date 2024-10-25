import type { Workout } from "@/types/workout";

import { redirect } from "next/navigation";

import { getCurrentUser, getUserWorkoutData } from "@/lib/server-utils";

import { AppMain } from "@/components/elements/app-main";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (slug.length < 1) return redirect("/workout");

  const { user: currentUser } = await getCurrentUser();
  const { active_workout_plan: workouts } = await getUserWorkoutData(
    currentUser.id,
  );

  const workout = workouts.find((workout: Workout) => workout.uuid === slug);

  if (!workout) return redirect("/workouts");

  return (
    <AppMain className="relative px-3">
      <p>Edit workout..</p>
      {/* <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/workouts">
            <Icons name="ArrowLeft" className="size-5" />
          </Link>
          <h1 className="font-bold text-3xl">{workout.name}</h1>
        </div>
        <Button>Start</Button>
      </div>

      <p>Weekly on {DAY_FREQUENCIES[workout.frequency[0]]?.name}</p>

      <hr className="border-dark-300 my-3" />


      <hr className="border-dark-300 my-3" />

      <div className="fixed pointer-events-none z-50 bottom-0 left-0 right-0 p-3 bg-dark-200">
        <Button className="pointer-events-auto w-full">Start workout</Button>
      </div> */}
    </AppMain>
  );
}
