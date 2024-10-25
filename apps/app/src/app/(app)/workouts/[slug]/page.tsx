import Link from "next/link";
import { redirect } from "next/navigation";

import { Badge } from "@motion-metrics/ui/components/ui/badge";
import { buttonVariants } from "@motion-metrics/ui/components/ui/button";
import { Card, CardTitle } from "@motion-metrics/ui/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@motion-metrics/ui/components/ui/drawer";

import { STANDARD_WORKOUT_PLANS } from "@/lib/constants/workout-plans";
import { getCurrentUser, getUserWorkoutData } from "@/lib/server-utils";
import { cn, getTotalSets } from "@/lib/utils";

import { AppMain } from "@/components/elements/app-main";
import { FormSelectWorkout } from "@/components/elements/form-select-workout";
import Icons from "@/components/elements/icons";

const getSelectedWorkout = (slug: string) => {
  if (!slug) return redirect("/workouts");

  const workout = STANDARD_WORKOUT_PLANS.find((plan) => plan.id === slug);
  if (!workout) return redirect("/workouts");

  return workout;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const { user: currentUser } = await getCurrentUser();
  const { active_workout_plan } = await getUserWorkoutData(currentUser.id);

  const workoutPlan = getSelectedWorkout(params.slug);
  const hasExistingPlan = active_workout_plan?.id !== workoutPlan.id;

  const totalExercises = workoutPlan.workouts.reduce((acc, workout) => {
    return acc + workout.exercises.length;
  }, 0);

  const totalSets = workoutPlan.workouts.reduce((acc, workout) => {
    return acc + getTotalSets(workout.exercises);
  }, 0);

  return (
    <AppMain className="px-3">
      <div className="flex space-x-2 items-center">
        <Link href="/workouts">
          <Icons name="ArrowLeft" className="size-5" />
        </Link>
        <h1 className="font-bold text-3xl">{workoutPlan.name}</h1>
      </div>

      <article className="mt-3">
        <p className="text-md">{workoutPlan.description}</p>

        <div className="flex flex-wrap [&>*]:mr-2 [&>*]:mt-2 mt-1">
          <Badge className="bg-transparent border border-dark-500 font-normal text-md w-fit">
            {workoutPlan.workouts.length} Days
          </Badge>
          <Badge className="bg-transparent border border-dark-500 font-normal text-md w-fit">
            {totalExercises}
          </Badge>
          <Badge className="bg-transparent border border-dark-500 font-normal text-md w-fit">
            20 Sets per workout
          </Badge>
        </div>
      </article>

      <Drawer>
        {hasExistingPlan ? (
          <DrawerTrigger
            className={cn(
              buttonVariants({ variant: "default" }),
              "mt-5 w-full",
            )}
          >
            Select plan
          </DrawerTrigger>
        ) : (
          <FormSelectWorkout
            {...{
              buttonClassname: "mt-5",
              plan: workoutPlan,
            }}
          />
        )}
        <DrawerContent className="bg-dark-200">
          {hasExistingPlan && (
            <div className="bg-ui-error/40 p-4 rounded-md mb-4">
              <p>
                Be aware, by selecting this plan you will replace your current
                plan. Are you sure you want to proceed?
              </p>
            </div>
          )}

          <DrawerTitle className="mb-3 text-2xl flex flex-wrap">
            <span className="mr-1.5">Start new workout plan —</span>
            <span>{workoutPlan.name}</span>
          </DrawerTitle>

          <DrawerDescription>
            {`The selected plan contains ${workoutPlan.workouts.length} days, with an average of ${Math.floor(totalExercises / workoutPlan.workouts.length).toString()} exercises and ${Math.floor(totalSets / workoutPlan.workouts.length).toString()} sets per day. By selecting this plan you will be able to log your progress and track your workouts based on this plan.`}
          </DrawerDescription>

          <FormSelectWorkout
            {...{
              buttonClassname: "mt-8",
              plan: workoutPlan,
            }}
          />
        </DrawerContent>
      </Drawer>

      <article className="mt-8">
        <h2 className="text-2xl font-bold">Summary</h2>
        {workoutPlan.workouts.map((el, index) => {
          const totalSets = getTotalSets(el.exercises);

          return (
            <Card key={index} className="px-2 py-3 mt-2 rounded-md bg-dark-200">
              <CardTitle>{el.name}</CardTitle>
              <div className="flex space-x-1 mt-5">
                <Badge className="bg-transparent border border-dark-500 font-normal text-md w-fit">
                  {el.exercises.length} exercises
                </Badge>
                <Badge className="bg-transparent border border-dark-500 font-normal text-md w-fit">
                  {totalSets} sets
                </Badge>
              </div>
            </Card>
          );
        })}
      </article>
    </AppMain>
  );
}
