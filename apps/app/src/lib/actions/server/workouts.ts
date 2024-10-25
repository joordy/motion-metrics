"use server";

import type { Workout } from "@/types/workout";

import { revalidatePath } from "next/cache";

import type { z } from "zod";

import { STANDARD_WORKOUT_PLANS } from "@/lib/constants/workout-plans";
import { defaultWorkoutPlan, workoutPlanSchema } from "@/lib/schemas/workouts";
import { conflictingWorkoutDays, getCurrentUser } from "@/lib/server-utils";
import { createClient } from "@/lib/supabase/server";

type Workouts = z.infer<typeof workoutPlanSchema>;
type DefaultWorkoutPlan = z.infer<typeof defaultWorkoutPlan>;

export const createWorkout = async (data: Workouts) => {
  const supabase = createClient();
  const result = workoutPlanSchema.safeParse(data);

  if (result.success) {
    const { user } = await getCurrentUser();

    const { data: currentData } = await supabase
      .from("user_workout_data")
      .select("*")
      .eq("user_id", user.id)
      .single();

    const hasCustomWorkouts = currentData.active_workout_plan.find(
      (el: Workout) => el.type === "custom",
    );

    const workoutToAdd = {
      name: result.data.name,
      uuid: crypto.randomUUID(),
      type: "custom" as const,
      exercises: result.data.exercises.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((set) => ({
          reps: set.reps,
          targetWeight: set.targetWeight || "",
        })),
      })),
      frequency: result.data.frequency as Workout["frequency"],
      description: result.data.description || undefined,
    };

    if (!hasCustomWorkouts) {
      const { error: updateError } = await supabase
        .from("user_workout_data")
        .update({ active_workout_plan: [workoutToAdd] })
        .eq("user_id", user.id)
        .select()
        .single();

      if (updateError) {
        return { success: false };
      }

      revalidatePath("/workouts");

      return { success: true };
    }

    const hasConflictingDays = conflictingWorkoutDays(
      currentData.active_workout_plan,
      result.data,
    );

    let updatedWorkoutPlans: Workout[];

    if (hasConflictingDays.length > 0) {
      updatedWorkoutPlans = currentData.active_workout_plan
        .map((workout: Workout) => {
          const hasConflict = workout.frequency.some((freq) =>
            result.data.frequency.includes(freq),
          );

          if (hasConflict) {
            const updatedFrequencies = workout.frequency.filter(
              (freq) => !result.data.frequency.includes(freq),
            );

            if (updatedFrequencies.length === 0) return null;

            return { ...workout, frequency: updatedFrequencies };
          }

          return workout;
        })
        .filter(Boolean) as Workout[];

      updatedWorkoutPlans.push(workoutToAdd);
    } else {
      updatedWorkoutPlans = [...currentData.active_workout_plan, workoutToAdd];
    }

    const { data: updatedData, error: updateError } = await supabase
      .from("user_workout_data")
      .update({ active_workout_plan: updatedWorkoutPlans })
      .eq("user_id", user.id)
      .select()
      .single();

    if (updateError) {
      return { success: false, error: "Failed to update workout plans" };
    }

    revalidatePath("/workouts");

    return { success: true, data: updatedData };
  }

  return {
    success: false,
    type: "error" as const,
    errors: { form: ["Invalid form data"] },
  };
};

export const selectWorkoutPlan = async (data: DefaultWorkoutPlan) => {
  const supabase = createClient();
  const result = defaultWorkoutPlan.safeParse(data);

  if (result.success) {
    const { user } = await getCurrentUser();
    const selectedWorkout = STANDARD_WORKOUT_PLANS.find(
      (el) => el.id === result.data.uuid,
    );

    if (!selectedWorkout) return { success: false };

    // const { data,  } = await supabase
    //   .from("user_workout_data")
    //   .select("*")
    //   .eq("user_id", user.id)
    //   .single();
    // const currentWorkoutPlans = data.active_workout_plan || [];

    const sortedFrequencies = [...result.data.frequency].sort(
      (a, b) => Number(a) - Number(b),
    );

    const newFormattedPlan = selectedWorkout.workouts.map((workout, index) => {
      const frequency = sortedFrequencies[index]
        ? [sortedFrequencies[index]]
        : ["0"];

      return {
        name: workout.name || `${selectedWorkout.name} - Day ${index + 1}`,
        uuid: crypto.randomUUID(),
        frequency,
        type: "standard",
        description: workout.description || undefined,
        exercises: workout.exercises || [],
      };
    });

    const { error: updateError } = await supabase
      .from("user_workout_data")
      .update({ active_workout_plan: newFormattedPlan })
      .eq("user_id", user.id)
      .select()
      .single();

    if (updateError) {
      return { success: false };
    }

    revalidatePath("/workouts");

    return { success: true };
  }
  return { success: false };
};
