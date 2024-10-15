import Link from "next/link";
import { redirect } from "next/navigation";

import { buttonVariants } from "@motion-metrics/ui/components/ui/button";

import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

import { DashboardHeader } from "@/components/elements/dashboard-header";
import { WorkoutCalendar } from "@/components/elements/workout-calender";

const WORKOUTS = [
  { id: "1", date: "2024-10-09" /* other properties */ },
  { id: "2", date: "2024-10-07" /* other properties */ },
];

const SCHEDULED_DAYS = [1, 3, 5]; // Monday, Wednesday, Friday

async function getUserWorkoutData(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_workout_data")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    // console.error("Error fetching user workout data:", error);
    return null;
  }

  return data;
}

async function getCurrentUser() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth");
  }

  return data;
}

export default async function Page() {
  const { user: currentUser } = await getCurrentUser();
  const workoutInformation = await getUserWorkoutData(currentUser.id);

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  if (!workoutInformation.active_workout_plan) {
    return (
      <main className="flex flex-col justify-between pt-8">
        <DashboardHeader {...{ date: formattedDate, user: currentUser }} />

        <article className="border bg-[#1A1A1B] mx-3 rounded-md px-3 py-6 border-light-100">
          <h1 className="font-extrabold text-xl">No workout plan available.</h1>
          <p className="text-md">
            We help you finding the perfect workout-plan based on your
            preferences. Select a plan below or become member to create
            customized workout plans.
          </p>
          <Link
            className={cn("mt-6 w-full", buttonVariants())}
            href="/workouts?type=select_workout"
          >
            Find a plan that suits you
          </Link>
        </article>

        <article className="mt-8 overflow-hidden whitespace-nowrap">
          <div className="flex flex-col space-y-0 mx-3">
            <h2 className="font-extrabold leading-tight text-xl">
              Recommended workout plans
            </h2>
            <p className="leading-tight">Recommended workout plans by us</p>
          </div>
          <div className="flex overflow-x-auto mt-2 space-x-3 scroll-px-4 snap-x px-3 pb-2">
            {new Array(3).fill(null).map((_, i: number) => {
              return (
                <div className="min-w-56" key={i}>
                  <div className="h-32 w-full bg-dark-200 mb-2" />
                  <h3 className="font-semibold text-md">Upper / Lower</h3>
                  <div className="flex flex-col -space-y-0.5 text-md">
                    <p>4 Days</p>
                    <p>14 Exercices</p>
                    <p>25 Sets</p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </main>
    );
  }
  return (
    <main className="flex flex-col justify-between pt-8">
      <DashboardHeader {...{ date: formattedDate, user: currentUser }} />

      <WorkoutCalendar workouts={WORKOUTS} scheduled={SCHEDULED_DAYS} />

      <article className="mt-8 flex flex-col space-y-2">
        <h2 className="font-semibold text-2xl">Upcoming workout</h2>

        <div className="bg-[#1A1A1B] p-1 rounded flex space-x-3">
          <div className="h-auto bg-dark-300 w-12 rounded-sm" />

          <div>
            <h3 className="font-bold text-xl">Full body</h3>
            <p className="text-base">
              {`5 exercises`} — {`24 sets`}
            </p>
          </div>
        </div>
      </article>

      <article className="mt-8 flex flex-col space-y-2">
        <h2 className="text-2xl font-semibold">Weekly stats</h2>

        <div className="grid grid-cols-8 gap-2">
          <div className="col-span-4 bg-[#1A1A1B] rounded p-3 flex flex-col space-y-3">
            <h3 className="font-medium text-md">Moved weight</h3>
            <p className="font-extrabold text-xl">2400 kg</p>
          </div>
          <div className="col-span-4 bg-[#1A1A1B] rounded p-3 flex flex-col space-y-3">
            <h3 className="font-medium text-md">Active minutes</h3>
            <p className="font-extrabold text-xl">36.6 minutes</p>
          </div>
        </div>
      </article>
    </main>
  );
}
