"use client";

import type { Exercise } from "@/types/exercises";
import type { Workout } from "@/types/workout";

import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@motion-metrics/ui/components/ui/button";
import type { User } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import type { z } from "zod";

import { createWorkout } from "@/lib/actions/server/workouts";
import { DAY_FREQUENCIES } from "@/lib/constants/workout-plans";
import type { WorkoutPlan } from "@/lib/schemas/workouts";
import { workoutPlanSchema } from "@/lib/schemas/workouts";

import Icons from "./icons";
import { StepWorkoutDetails } from "./step-workout-details";
import { StepWorkoutExercises } from "./step-workout-exercises";

const STEP_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

const STEP_TRANSITION = {
  type: "easeCubic",
  ease: [0.87, 0, 0.13, 1],
  duration: 0.5,
};

const conflictingWorkoutDays = (
  active_workout_plan: Workout[],
  workoutPlan: WorkoutPlan,
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

interface Step {
  title: string;
  component: ReactNode;
  fields: string[];
}

type StepRange = 1 | 2 | 3 | 4 | 5;

interface Props {
  exercises: Exercise[];
  currentUser: User;
  active_workout_plan: Workout[];
}

export function CreateWorkoutForm({
  exercises,
  currentUser,
  active_workout_plan,
}: Props) {
  const router = useRouter();
  const [step, setStep] = useState<StepRange>(1);
  const [direction, setDirection] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    setError,
  } = useForm<WorkoutPlan>({
    resolver: zodResolver(workoutPlanSchema),
    defaultValues: {
      name: "",
      frequency: [],
      description: "",
      exercises: [],
    },
  });

  const workoutPlan = watch();

  const steps: Step[] = [
    {
      title: "Workout Details",
      component: <StepWorkoutDetails {...{ register, control, errors }} />,
      fields: ["name", "type", "frequency"],
    },
    {
      title: "Workout Exercises",
      component: <StepWorkoutExercises {...{ exercises, control, errors }} />,
      fields: ["exercises"],
    },
    {
      title: "Workout Summary",
      component: (
        <WorkoutSummaryStep
          {...{ workoutPlan, currentUser, active_workout_plan }}
        />
      ),
      fields: [],
    },
  ];

  const nextStep = async () => {
    if (step < steps.length) {
      const currentStep = steps[step - 1];

      if (!currentStep) {
        return;
      }

      const currentStepFields = currentStep.fields ?? [];

      if (currentStepFields.length > 0) {
        const isStepValid = await trigger(
          currentStepFields as Array<keyof WorkoutPlan>,
        );

        if (!isStepValid) {
          return Object.entries(errors).forEach(([key, value]) => {
            setError(key as keyof z.infer<typeof workoutPlanSchema>, {
              message: String(value.message),
            });
          });
        }
      }

      setDirection(-1);
      setStep((prev) => (prev + 1) as StepRange);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection(1);
      setStep((prev) => (prev - 1) as StepRange);
    }
  };

  const onSubmit = async (data: WorkoutPlan) => {
    const res = await createWorkout(data);
    if (res?.success) {
      toast.success("Workout plan saved successfully!");
      router.push("/workouts");
    }
    // router.push("/workouts");
  };

  return (
    <div className="h-full flex flex-col justify-between px-4 pt-2">
      <div className="">
        <div className="flex space-x-2 items-center mb-4">
          <button
            onClick={
              step === 1 ? () => router.push("/workouts") : () => prevStep()
            }
          >
            <Icons className="text-white" name="ArrowLeft" />
          </button>
          <h1 className="text-3xl font-bold">Create Workout Plan</h1>
        </div>

        <ProgressIndicator currentStep={step} steps={steps} />

        <AnimatePresence mode="wait">
          <motion.div
            className="h-full"
            key={step}
            custom={direction}
            variants={STEP_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={STEP_TRANSITION}
          >
            {steps[step - 1]?.component || <p>Invalid step</p>}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="[&>*]:w-full">
        {step < steps.length && steps[step] && (
          <Button onClick={nextStep}>Next step: {steps[step].title}</Button>
        )}
        {step === steps.length && (
          <Button onClick={handleSubmit(onSubmit)}>Save Workout Plan</Button>
        )}
      </div>
    </div>
  );
}

interface ProgressIndicatorProps {
  currentStep: number;
  steps: Step[];
}

function ProgressIndicator({ currentStep, steps }: ProgressIndicatorProps) {
  return (
    <div className="flex mb-6 space-x-2">
      {steps.map((s, index) => (
        <div key={index} className="flex-1">
          <div
            className={`h-2 ${
              index < currentStep ? "bg-dark-800" : "bg-dark-400"
            } rounded`}
          ></div>
          <p className="sr-only">{s.title}</p>
        </div>
      ))}
    </div>
  );
}

interface WorkoutSummaryStepProps {
  workoutPlan: WorkoutPlan;
  active_workout_plan: Workout[];
}

function WorkoutSummaryStep({
  workoutPlan,
  active_workout_plan,
}: WorkoutSummaryStepProps) {
  const totalSets = workoutPlan.exercises.reduce(
    (acc, exercise) => acc + exercise.sets.length,
    0,
  );

  const hasActiveWorkoutPlan = active_workout_plan !== null;
  const hasConflictingDays = conflictingWorkoutDays(
    active_workout_plan,
    workoutPlan,
  );

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Workout Summary of {workoutPlan.name}
        </h2>

        <p>Frequency: {workoutPlan.frequency.length} times a week</p>
        <p>Volume: {totalSets} sets</p>
        <h3 className="font-semibold text-lg mt-2">Exercises:</h3>
        <ul>
          {workoutPlan.exercises.map((exercise, index) => (
            <li key={index} className="flex justify-between">
              <p>{exercise.name}</p>
              <div>{exercise.sets.length} Set(s)</div>
            </li>
          ))}
        </ul>
      </div>

      {hasConflictingDays.length >= 1 && (
        <div className="bg-ui-error/40 p-4 rounded-md mb-[104px]">
          <p>
            {`Be aware, you already have created a workout on this day. You can only have one workout per day. When proceeding, you'll lose your existing workout on this day.`}
          </p>
        </div>
      )}

      {hasActiveWorkoutPlan && !hasConflictingDays && (
        <div className="bg-ui-error/40 p-4 rounded-md mb-[104px]">
          <p>
            {`Be aware, by creating a new workout you'll lose your active workout plan. Are you sure you want to proceed?`}
          </p>
        </div>
      )}
    </div>
  );
}
