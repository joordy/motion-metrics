"use client";

import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useCallback } from "react";
import type { ControllerRenderProps } from "react-hook-form";

import { Button } from "@motion-metrics/ui/components/ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@motion-metrics/ui/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@motion-metrics/ui/components/ui/dropdown-menu";
import { Input } from "@motion-metrics/ui/components/ui/input";
import { Label } from "@motion-metrics/ui/components/ui/label";
import { ScrollArea } from "@motion-metrics/ui/components/ui/scroll-area";
import { Textarea } from "@motion-metrics/ui/components/ui/textarea";

import type { WorkoutPlan } from "@/lib/schemas/workouts";

import Icons from "@/components/elements/icons";

import type { WorkoutExercise } from "./step-workout-exercises";

interface Props {
  exercise: WorkoutExercise;
  setExerciseToEdit: Dispatch<
    SetStateAction<{
      index: number;
      exercise: WorkoutExercise;
    } | null>
  >;
  exerciseToEdit: {
    index: number;
    exercise: WorkoutExercise;
  } | null;
  field: ControllerRenderProps<WorkoutPlan, "exercises">;
}

export function PopupExerciseDetails({
  exercise,
  exerciseToEdit,
  setExerciseToEdit,
  field,
}: Props) {
  const handleOnRepChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, setIndex: number) => {
      if (!exerciseToEdit) return;

      const newExercise = {
        ...exerciseToEdit.exercise,
        sets: exerciseToEdit.exercise.sets.map((set, idx) => {
          if (idx === setIndex) {
            return { ...set, reps: e.target.value };
          }
          return set;
        }),
      };

      setExerciseToEdit({ ...exerciseToEdit, exercise: newExercise });

      const newExercises = [...field.value];
      newExercises[exerciseToEdit.index] = newExercise;
      field.onChange(newExercises);
    },
    [exerciseToEdit, setExerciseToEdit, field],
  );

  const handleOnWeightChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, setIndex: number) => {
      if (!exerciseToEdit) return;

      const newExercise = {
        ...exerciseToEdit.exercise,
        sets: exerciseToEdit.exercise.sets.map((set, idx) => {
          if (idx === setIndex) {
            return { ...set, targetWeight: e.target.value || undefined };
          }
          return set;
        }),
      };

      setExerciseToEdit({ ...exerciseToEdit, exercise: newExercise });

      const newExercises = [...field.value];
      newExercises[exerciseToEdit.index] = newExercise;
      field.onChange(newExercises);
    },
    [exerciseToEdit, setExerciseToEdit, field],
  );

  const handleOnAddSetClick = useCallback(() => {
    if (!exerciseToEdit) return;

    const newExercise = {
      ...exerciseToEdit.exercise,
      sets: [
        ...exerciseToEdit.exercise.sets,
        {
          reps:
            exerciseToEdit.exercise.sets[
              exerciseToEdit.exercise.sets.length - 1
            ]?.reps || "0",
          targetWeight:
            exerciseToEdit.exercise.sets[
              exerciseToEdit.exercise.sets.length - 1
            ]?.targetWeight,
        },
      ],
    };

    setExerciseToEdit({ ...exerciseToEdit, exercise: newExercise });

    const newExercises = [...field.value];
    newExercises[exerciseToEdit.index] = newExercise;
    field.onChange(newExercises);
  }, [exerciseToEdit, setExerciseToEdit, field]);

  // In your PopupExerciseDetails component, add a handler:
  const handleDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!exerciseToEdit) return;

      const newExercise = {
        ...exerciseToEdit.exercise,
        description: e.target.value,
      };

      // Update local state
      setExerciseToEdit({
        ...exerciseToEdit,
        exercise: newExercise,
      });

      // Update form field
      const newExercises = [...field.value];
      newExercises[exerciseToEdit.index] = newExercise;
      field.onChange(newExercises);
    },
    [exerciseToEdit, setExerciseToEdit, field],
  );

  const handleOnExerciseSave = useCallback(() => {
    if (!exerciseToEdit) return;

    const newExercises = [...field.value];
    newExercises[exerciseToEdit.index] = exerciseToEdit.exercise;
    field.onChange(newExercises);
    setExerciseToEdit(null);
  }, [exerciseToEdit, field, setExerciseToEdit]);

  if (!exerciseToEdit || !exercise) return null;

  return (
    <DrawerContent className="bg-dark-200 text-dark-900  border-none pt-4">
      <ScrollArea className="min-h-[400px] h-[65dvh] pt-2 px-3 mx-1">
        <DrawerHeader className="flex flex-col px-1 items-start">
          <div className="flex space-x-2">
            {/* <button onClick={() => setExerciseToEdit(null)}>
              <Icons name="ArrowLeft" className="size-5" />
            </button> */}
            <DrawerTitle className="text-3xl font-bold">
              Exercise Details
            </DrawerTitle>
          </div>
          <p className="text-left">
            Adjust your preferences for the exercise: {exercise.name}
          </p>
        </DrawerHeader>

        <div className="flex flex-col space-y-10 px-1 pb-4">
          <div>
            <div className="relative">
              <Label className="absolute left-3 bg-dark-200 -top-2 text-md">
                Description
              </Label>
              <Textarea
                className="min-h-[100px] pt-4 w-full rounded-md border border-dark-400 bg-transparent px-3 pb-2 shadow-sm"
                placeholder="Add exercise description..."
                value={exerciseToEdit.exercise.description ?? ""}
                onChange={handleDescriptionChange}
              />
            </div>

            <div>
              <h3 className="font-bold text-xl mb-2 mt-8">Sets to log</h3>
              <div className="font-medium text-md mb-1 grid grid-cols-[1fr,1fr,44px] gap-3">
                <p>Reps</p>
                <p>Weight</p>
              </div>
            </div>
            <ul className="flex flex-col space-y-1">
              {exerciseToEdit.exercise.sets.map(
                (set: WorkoutExercise["sets"][0], index: number) => {
                  return (
                    <li
                      key={index}
                      className="grid grid-cols-[1fr,1fr,44px] gap-3"
                    >
                      <Input
                        onChange={(e) => handleOnRepChange(e, index)}
                        name="reps"
                        placeholder="Reps"
                        value={set.reps}
                        className="border-dark-400"
                      />
                      <Input
                        onChange={(e) => handleOnWeightChange(e, index)}
                        name="targetWeight"
                        placeholder="Weight"
                        value={set.targetWeight ?? ""}
                        className="border-dark-400"
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center justify-center">
                          <Icons name="EllipsisVertical" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-[#D77167]">
                            <button
                              onClick={() => void 0}
                              className="flex items-center space-x-2"
                            >
                              <Icons name="Trash2" />
                              <span>Delete set</span>
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </li>
                  );
                },
              )}
            </ul>

            <Button
              onClick={handleOnAddSetClick}
              className="w-full mt-4"
              variant="outline"
            >
              Add set
            </Button>
          </div>

          <Button className="w-full mt-10" onClick={handleOnExerciseSave}>
            Save exercise details
          </Button>
        </div>
      </ScrollArea>
    </DrawerContent>
  );
}
