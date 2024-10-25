import type { Exercise } from "./exercises";

export type FrequencyDay = "0" | "1" | "2" | "3" | "4" | "5" | "6";

export interface Workout {
  name: string;
  uuid: string;
  exercises: WorkoutExercise[];
  type: "standard" | "custom";
  frequency: FrequencyDay[]; // removed "7" if not needed
  description?: string;
}

export interface WorkoutExercise extends Pick<Exercise, "name"> {
  sets: { reps: string; targetWeight?: string }[];
}

export interface STANDARD_PLAN {
  name: string;
  id: string;
  days: number;
  description: string;
  workouts: Pick<
    Workout,
    "name" | "uuid" | "exercises" | "description" | "type" | "frequency"
  >[];
}
