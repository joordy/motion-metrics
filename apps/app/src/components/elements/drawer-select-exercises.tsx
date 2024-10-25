import type { Exercise } from "@/types/exercises";

import { useCallback, useMemo, useRef, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";

import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@motion-metrics/ui/components/ui/drawer";
import { Input } from "@motion-metrics/ui/components/ui/input";
import {
  ScrollArea,
  ScrollBar,
} from "@motion-metrics/ui/components/ui/scroll-area";

import type { WorkoutPlan } from "@/lib/schemas/workouts";
import { cn } from "@/lib/utils";

import Icons from "@/components/elements/icons";

function customSearch(exercises: Exercise[], searchTerm: string): Exercise[] {
  const lowercasedSearchTerm = searchTerm.toLocaleLowerCase().trim();

  if (!lowercasedSearchTerm) return exercises;

  return exercises.filter((exercise) =>
    exercise.name.toLocaleLowerCase().includes(lowercasedSearchTerm),
  );
}

export function DrawerSelectWorkouts({
  setIsDrawerOpen,
  exercises,
  field,
}: {
  exercises: Exercise[];
  setIsDrawerOpen: (open: boolean) => void;
  field: ControllerRenderProps<WorkoutPlan, "exercises">;
}) {
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredExercises = useMemo(() => {
    return customSearch(exercises, searchValue);
  }, [exercises, searchValue]);

  const handleExerciseClick = useCallback(
    (ex: Exercise) => {
      const { id, equipment, name } = ex;
      const addedExercise = {
        id,
        availableEquipment: equipment,
        name,
        sets: [{ reps: "0", targetWeight: "0" }],
      };

      field.onChange([...field.value, addedExercise]);
      setSearchValue("");
      setIsDrawerOpen(false);
    },
    [field, setIsDrawerOpen],
  );

  return (
    <DrawerContent>
      <DrawerHeader className="flex px-1 pb-4 items-center justify-between">
        <div>
          <DrawerTitle className="text-3xl text-left font-bold">
            Exercise Library
          </DrawerTitle>
          <p>{filteredExercises.length} amount of exercises found.</p>
        </div>
      </DrawerHeader>
      <ScrollArea className="h-[65dvh] mx-1 pb-16 ">
        {filteredExercises.length > 0 ? (
          filteredExercises.map((ex: Exercise) => (
            <button
              key={ex.name}
              className={cn(
                "flex border border-dark-400 items-center space-x-2 mb-2 p-3 bg-dark-300 hover:bg-dark-500 w-full cursor-pointer rounded",
                field.value.some((e) => e.name === ex.name) &&
                  "bg-dark-500 border-dark-800 pointer-events-none",
              )}
              onClick={() => handleExerciseClick(ex)}
            >
              <span>{ex.name}</span>
            </button>
          ))
        ) : (
          <div>No exercises found</div>
        )}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <div
        className="fixed bottom-0 h-16 bg-dark-300 border-t border-dark-500 right-0 left-0 px-3 py-2"
        ref={searchRef}
      >
        <div className="relative h-full">
          <button className="absolute bottom-0 top-0 left-0 p-2 rounded-full text-dark-600 focus:outline-none">
            <Icons name="Search" className="size-5 " />
          </button>
          <Input
            type="text"
            placeholder="Search exercises..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="pl-9 w-full py-2 border-dark-600 h-full border rounded-md shadow-md transition-all duration-300 ease-in-out"
            autoFocus
          />
        </div>
      </div>
    </DrawerContent>
  );
}
