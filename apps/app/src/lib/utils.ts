import type { WorkoutExercise } from "@/types/workout";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDatesOfCurrentWeek(): Date[] {
  const today = new Date();
  const currentDay = today.getDay();
  const diff = currentDay === 0 ? -6 : 1;
  const monday = new Date(today);

  monday.setDate(today.getDate() - currentDay + diff);

  const weekDates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    weekDates.push(date);
  }

  return weekDates;
}

export const getTotalSets = (exercises: WorkoutExercise[]) => {
  return exercises.reduce(
    (
      acc: number,
      exercise: {
        sets: { reps: string; targetWeight: string }[];
        name: string;
      },
    ) => acc + exercise.sets.length,
    0,
  );
};
