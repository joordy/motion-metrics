"use client";

import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Button } from "@motion-metrics/ui/components/ui/button";
import { Input } from "@motion-metrics/ui/components/ui/input";
import { Label } from "@motion-metrics/ui/components/ui/label";

import { DAY_FREQUENCIES } from "@/lib/constants/workout-plans";
import type { WorkoutPlan } from "@/lib/schemas/workouts";

interface StepWorkoutDetailsProps {
  register: UseFormRegister<WorkoutPlan>;
  control: Control<WorkoutPlan>;
  errors: FieldErrors<WorkoutPlan>;
}

export function StepWorkoutDetails({
  register,
  control,
  errors,
}: StepWorkoutDetailsProps) {
  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="flex flex-col space-y-1">
        <Label className="text-lg font-semibold">Workout Name</Label>
        <Input {...register("name")} placeholder="e.g., Summer Shred 2024" />
        {errors.name && (
          <p className="text-red-500 text-md">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <Label className="text-lg font-semibold">Workout Days</Label>
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
                        : [...field.value, day.value];
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

      {/* <div className="flex flex-col space-y-1">
        <Label className="text-lg font-semibold">Workout Type</Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="text-base py-[11px] h-fit">
                <SelectValue placeholder="Select workout type" />
              </SelectTrigger>
              <SelectContent className="[&>*]:text-base">
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="cardio">Cardio</SelectItem>
                <SelectItem value="hiit">HIIT</SelectItem>
                <SelectItem value="flexibility">Flexibility</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && (
          <p className="text-red-500 text-md">{errors.type.message}</p>
        )}
      </div> */}

      {/* <div className="flex flex-col space-y-1">
        <Label className="text-lg font-semibold">Description</Label>
        <Input
          {...register("description")}
          placeholder="e.g., A high-intensity program for summer"
        />
      </div> */}
    </div>
  );
}
