import type { Workout } from "@/types/workout";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { DAY_FREQUENCIES } from "./constants/workout-plans";

export const validateAuthenticatedUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { success: false };
  }

  return user;
};

export async function getCurrentUser() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth");
  }

  return data;
}

export async function getUserWorkoutData(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_workout_data")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function getExercises() {
  const supabase = createClient();

  const { data, error } = await supabase.from("exercises").select("*");

  if (error) {
    return { exercises: [] };
  }

  return { exercises: data };
}

export const conflictingWorkoutDays = (
  active_workout_plan: Workout[],
  workoutPlan: Workout,
) => {
  const existingWorkoutDays =
    active_workout_plan?.flatMap((workout) => workout.frequency) || [];

  const conflicts = workoutPlan.frequency.filter((day: string) =>
    existingWorkoutDays.some((existingDay: string) => existingDay === day),
  );

  const conflictingDays = conflicts.map(
    (freq: string) => DAY_FREQUENCIES.find((day) => day.value === freq)?.value,
  );

  return conflictingDays;
};
