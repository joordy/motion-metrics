import type { Workout } from "@/types/workout";

import Link from "next/link";

import { Badge } from "@motion-metrics/ui/components/ui/badge";
import { buttonVariants } from "@motion-metrics/ui/components/ui/button";
import { Card } from "@motion-metrics/ui/components/ui/card";

import {
  DAY_FREQUENCIES,
  STANDARD_WORKOUT_PLANS,
} from "@/lib/constants/workout-plans";
import { getCurrentUser, getUserWorkoutData } from "@/lib/server-utils";
import { cn, getTotalSets } from "@/lib/utils";

import { AppMain } from "@/components/elements/app-main";
import { DashboardHeader } from "@/components/elements/dashboard-header";
import Icons from "@/components/elements/icons";

const getWorkoutDays = (frequency: string[]) => {
  return frequency
    .map((freq) => DAY_FREQUENCIES.find((day) => day.value === freq)?.name)
    .filter(Boolean);
};

interface Props {
  searchParams: { [key: string]: string[] | string | undefined };
}
export default async function AppPage({ searchParams }: Props) {
  const { user: currentUser } = await getCurrentUser();
  const { active_workout_plan } = await getUserWorkoutData(currentUser.id);
  const hasCustomWorkouts = active_workout_plan.find(
    (el: Workout) => el.type === "custom",
  );
  const { type } = searchParams;

  return (
    <AppMain className="">
      <DashboardHeader {...{ type: "workouts", user: currentUser }} />

      {active_workout_plan.length >= 1 ? (
        <article className="overflow-hidden whitespace-nowrap ">
          <div className="flex justify-between items-center px-3">
            <h1 className="text-2xl font-bold leading-tight">This week</h1>

            <div className="flex items-center space-x-2">
              <Link
                href="?type=list"
                className={cn("hover:text-dark-900 ease-cubic duration-150", {
                  "text-dark-900": type === "list",
                  "text-dark-400": type !== "list",
                })}
              >
                <Icons name="LayoutList" className="size-5" />
              </Link>
              <Link
                href="?type=rows"
                className={cn("hover:text-dark-900 ease-cubic duration-150", {
                  "text-dark-900": type === "rows" || !type,
                  "text-dark-800": type !== "rows" && type === undefined,
                  "text-dark-400": type !== "rows" && type !== undefined,
                })}
              >
                <Icons name="Rows2" className="size-5 rotate-90" />
              </Link>
            </div>
          </div>

          <div
            className={cn("flex px-3 mt-2 scroll-px-4 snap-x pb-4", {
              "flex-col space-y-2": type === "list",
              "space-x-3 overflow-x-auto":
                type === "rows" || type === undefined,
            })}
          >
            {active_workout_plan.map((el: Workout) => {
              const days = getWorkoutDays(el.frequency);
              const totalSets = getTotalSets(el.exercises);

              const logged = false;

              return (
                <Card
                  className="relative p-4 rounded-md bg-dark-200 text-dark-900 min-w-72"
                  key={el.name}
                >
                  <div className="absolute right-4 top-4">
                    <Link className="flex" href={`/workouts/edit/${el.uuid}`}>
                      <Icons name="Pencil" className="size-4" />
                    </Link>
                  </div>
                  <div>
                    <p className="text-md flex space-x-1">
                      {days.map((el, index) => (
                        <span key={el}>
                          {el}
                          <span
                            className={cn({
                              "sr-only": index === days.length - 1,
                            })}
                          >
                            ,
                          </span>
                        </span>
                      ))}
                    </p>
                    <h3 className="text-xl font-bold">{el.name}</h3>
                  </div>

                  <div
                    className={cn("text-dark-600 flex space-x-1 mt-8", {
                      hidden: type === "list",
                    })}
                  >
                    <Badge className="text-md font-normal">
                      {el.exercises.length} exercises
                    </Badge>
                    <Badge className="text-md font-normal">
                      {String(totalSets)} sets
                    </Badge>
                  </div>

                  <Link
                    href={`/workouts/track/${el.uuid}`}
                    className={cn(
                      "w-full space-x-2 font-medium mt-2",
                      buttonVariants(),
                      {},
                    )}
                  >
                    <Icons
                      name={logged ? "SquareCheck" : "NotebookPen"}
                      className={logged ? "size-5" : "size-4"}
                    />
                    <span>{logged ? "Completed" : "Log workout"}</span>
                  </Link>
                </Card>
              );
            })}

            {hasCustomWorkouts && (
              <Link
                href="/workouts/create-plan"
                className="bg-transparent min-w-48 p-4 space-x-2 rounded-md flex justify-center items-center border-4 text-dark-600  border-dark-200 ease duration-150 hover:bg-dark-300"
              >
                <span>
                  <Icons name="SquarePlus" className="size-5" />
                </span>
                <span>Add workout</span>
              </Link>
            )}
          </div>
        </article>
      ) : (
        <article className="border bg-[#1A1A1B] rounded-md mx-3 px-2 py-6 border-light-100">
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
      )}

      <article className="mt-12 px-3">
        <h2 className="font-bold text-2xl leading-tight">Workout plans</h2>
        <p className="text-dark-600">
          Need a new workout plan? We’ve got some pre-built workout plans for
          you. If the plan doesn’t suit you, become{" "}
          <Link className="underline underline-offset-2 font-semibold" href="#">
            member
          </Link>{" "}
          to create customised plans.
        </p>
        <div className="flex flex-col mt-3 space-y-2">
          {STANDARD_WORKOUT_PLANS.map((plan) => {
            const totalExercises = plan.workouts.reduce((acc, workout) => {
              return acc + workout.exercises.length;
            }, 0);

            return (
              <Link href={`/workouts/${plan.id}`} key={plan.id}>
                <Card className="grid gap-3 grid-cols-[3rem_auto] bg-dark-200 rounded-md px-2 py-3">
                  <div className="bg-dark-500 overflow-hidden h-12 w-12 rounded" />
                  <div className="flex  flex-col -space-y-0.5">
                    <h2 className="text-xl font-bold">{plan.name}</h2>
                    <ul className="text-sm flex space-x-2">
                      <li>{plan.workouts.length} days a week</li>
                      <li>{totalExercises} Exercises</li>
                    </ul>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <Link
          href="/workouts/create-plan"
          className={cn("w-full mt-3", buttonVariants({ variant: "outline" }), {
            // "pointer-events-none opacity-30": !currentUser.user_metadata.subscribed,
          })}
        >
          <Icons name="Plus" className="size-4 mr-2" />
          <span>Create custom workouts</span>
        </Link>
      </article>
    </AppMain>
  );
}
