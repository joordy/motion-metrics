import { z } from "zod";

export const workoutPlanSchema = z.object({
  name: z.string().min(1, "Workout plan name is required"),
  // type: z.string().min(1, "Workout type is required"),
  frequency: z
    .array(z.string().regex(/^[0-6]$/, "Invalid day index"))
    .min(1, "At least one day must be selected"),
  description: z.string().optional(),
  exercises: z.array(
    z.object({
      name: z.string().min(1, "Exercise name is required"),
      sets: z
        .array(
          z.object({
            reps: z.string().min(1, "Reps must be at least 1"),
            targetWeight: z
              .string()
              .min(0, "Target KGs must be a non-negative number")
              .optional(),
          }),
        )
        .min(1, "At least one set is required"),
      description: z.string().optional(),
      restTime: z.string().optional(),
    }),
  ),
});

export type WorkoutPlan = z.infer<typeof workoutPlanSchema>;

export const defaultWorkoutPlan = z.object({
  uuid: z.string().min(2, "UUID is required"),
  frequency: z
    .array(z.string().regex(/^[0-6]$/, "Invalid day index"))
    .min(1, "At least one day must be selected"),
});

export const createWorkoutPlanSchema = (requiredDays: number) => {
  return z.object({
    uuid: z.string(),
    frequency: z
      .array(z.string())
      .length(requiredDays, `Select exactly ${requiredDays} workout days`),
  });
};

export type DefaultWorkoutPlan = z.infer<
  ReturnType<typeof createWorkoutPlanSchema>
>;
