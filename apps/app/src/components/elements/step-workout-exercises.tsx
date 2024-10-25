"use client";

import type { Exercise } from "@/types/exercises";

import { useState } from "react";
import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Button } from "@motion-metrics/ui/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
} from "@motion-metrics/ui/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@motion-metrics/ui/components/ui/dropdown-menu";

import type { WorkoutPlan } from "@/lib/schemas/workouts";

import { DrawerSelectWorkouts } from "@/components/elements/drawer-select-exercises";
import Icons from "@/components/elements/icons";

import { PopupExerciseDetails } from "./popup-exercise-details";

export interface WorkoutExercise {
  name: string;
  sets: {
    reps: string;
    targetWeight?: string;
  }[];
  description?: string;
  restTime?: string;
  availableEquipment?: string[];
}

interface StepWorkoutExercisesProps {
  control: Control<WorkoutPlan>;
  errors: FieldErrors<WorkoutPlan>;
  exercises: Exercise[];
}

export function StepWorkoutExercises({
  exercises,
  control,
  errors,
}: StepWorkoutExercisesProps) {
  const sortedExercises = exercises.sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectedExercise, setSelectedExercise] = useState<{
    index: number;
    exercise: WorkoutExercise;
  } | null>(null);

  return (
    <div>
      <Controller
        name="exercises"
        control={control}
        render={({ field }) => {
          return (
            <>
              {field.value.length === 0 && (
                <div className="mt-12 mb-8">
                  <p>No exercises added yet</p>
                </div>
              )}
              {field.value.map((exercise, index) => {
                return (
                  <Drawer
                    key={index}
                    open={
                      !!selectedExercise && selectedExercise.index === index
                    }
                    onOpenChange={(open) => !open && setSelectedExercise(null)}
                  >
                    <div className="mb-4 grid place-items-center w-full grid-cols-[1fr,2rem] gap-1.5">
                      <div className="w-full flex justify-between items-center">
                        <h3 className="font-semibold text-base">
                          {exercise.name}
                        </h3>
                        <div className="space-x-2 flex">
                          <DrawerTrigger
                            asChild
                            className="border rounded-md text-md px-3 py-2"
                          >
                            <Button
                              onClick={() =>
                                setSelectedExercise({
                                  index,
                                  exercise: {
                                    ...exercise,
                                    sets: exercise.sets.map((set) => ({
                                      reps: String(set.reps),
                                      targetWeight: set.targetWeight
                                        ? String(set.targetWeight)
                                        : undefined,
                                    })),
                                  },
                                })
                              }
                              variant="outline"
                              className="text-md"
                            >
                              {exercise.sets.length >= 1
                                ? `${exercise.sets.length} Set(s)`
                                : "Set amount of sets"}
                            </Button>
                          </DrawerTrigger>
                        </div>

                        {errors.exercises?.[index] && (
                          <p className="text-red-500 mt-1">
                            {errors.exercises[index]?.name?.message ||
                              errors.exercises[index]?.sets?.message ||
                              errors.exercises[index]?.restTime?.message}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger className=" h-12 w-6">
                            <Icons name="EllipsisVertical" className="" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedExercise({
                                    index,
                                    exercise: {
                                      ...exercise,
                                      sets: exercise.sets.map((set) => ({
                                        reps: String(set.reps),
                                        targetWeight: set.targetWeight
                                          ? String(set.targetWeight)
                                          : undefined,
                                      })),
                                    },
                                  })
                                }
                                className="flex space-x-2 items-center"
                              >
                                <Icons name="Pencil" />
                                <span>Edit Exercise details</span>
                              </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-[#D77167] ease duration-100 hover:bg-[#D77167] flex items-center space-x-2"
                              onClick={() => {
                                const newExercises = field.value.filter(
                                  (_, i) => i !== index,
                                );
                                field.onChange(newExercises);
                              }}
                            >
                              <Icons name="Trash2" />

                              <span>Delete exercise</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <PopupExerciseDetails
                        {...{
                          exercise,
                          setExerciseToEdit: setSelectedExercise,
                          exerciseToEdit: selectedExercise,
                          field,
                        }}
                      />
                    </div>
                  </Drawer>
                );
              })}
              <div className="border-t-2 border-t-dark-400 my-3">
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full flex mt-3 justify-items-center space-x-3"
                    >
                      <Icons name="CirclePlus" className="ml-1" />
                      <span>Add Exercise</span>
                    </Button>
                  </DrawerTrigger>

                  <DrawerSelectWorkouts
                    {...{ exercises: sortedExercises, setIsDrawerOpen, field }}
                  />
                </Drawer>
              </div>
            </>
          );
        }}
      />
    </div>
  );
}
