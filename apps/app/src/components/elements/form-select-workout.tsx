"use client";

import type { STANDARD_PLAN } from "@/types/workout";

import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@motion-metrics/ui/components/ui/button";
import { Label } from "@motion-metrics/ui/components/ui/label";

import { selectWorkoutPlan } from "@/lib/actions/server/workouts";
import { DAY_FREQUENCIES } from "@/lib/constants/workout-plans";
import type { DefaultWorkoutPlan } from "@/lib/schemas/workouts";
import { createWorkoutPlanSchema } from "@/lib/schemas/workouts";

import { CustomSubmitButton } from "./custom-submit-button";

interface Props {
  plan: STANDARD_PLAN;
  buttonClassname?: string;
}

export function FormSelectWorkout({ buttonClassname, plan }: Props) {
  const requiredDays = plan.workouts.length;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DefaultWorkoutPlan>({
    resolver: zodResolver(createWorkoutPlanSchema(requiredDays)),
    defaultValues: {
      uuid: plan.id,
      frequency: [],
    },
  });

  const onSubmit = async (data: DefaultWorkoutPlan) => {
    await selectWorkoutPlan(data);
  };

  return (
    <div className="flex flex-col space-y-4 mt-6">
      <div className="flex flex-col space-y-1">
        <Label className="text-lg font-semibold">
          Select your {requiredDays} workout Days
        </Label>
        <div className="grid grid-cols-7 gap-2">
          <Controller
            name="frequency"
            control={control}
            render={({ field }) => (
              <>
                {DAY_FREQUENCIES.map((day) => (
                  <Button
                    key={day.value}
                    type="button"
                    variant={
                      field.value.includes(day.value) ? "default" : "outline"
                    }
                    onClick={() => {
                      const updatedFrequency = field.value.includes(day.value)
                        ? field.value.filter((d: string) => d !== day.value)
                        : field.value.length < requiredDays // Only allow adding if under limit
                          ? [...field.value, day.value]
                          : field.value;
                      field.onChange(updatedFrequency);
                    }}
                    aria-pressed={field.value.includes(day.value)}
                    className="w-full font-normal"
                  >
                    {day.name.slice(0, 2)}
                  </Button>
                ))}
              </>
            )}
          />
        </div>
        {errors.frequency && (
          <p className="text-red-500 text-md">{errors.frequency.message}</p>
        )}
      </div>

      <CustomSubmitButton
        onHandleSubmit={handleSubmit(onSubmit)}
        className={buttonClassname}
      >
        Select plan
      </CustomSubmitButton>
    </div>
  );
}
