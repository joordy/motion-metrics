"use client";

import { MuscleGroup } from "@/types/exercises";

import type { KeyboardEvent } from "react";
import { useCallback, useRef, useState } from "react";

import { Badge } from "@motion-metrics/ui/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@motion-metrics/ui/components/ui/command";
import { Label } from "@motion-metrics/ui/components/ui/label";
import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";

type MuscleGroupOption = Record<"value" | "label", string>;

const MUSCLE_GROUPS = [
  {
    value: MuscleGroup.Abs,
    label: "Abs",
  },
  {
    value: MuscleGroup.Back,
    label: "Back",
  },
  {
    value: MuscleGroup.Biceps,
    label: "Biceps",
  },
  {
    value: MuscleGroup.Calves,
    label: "Calves",
  },
  {
    value: MuscleGroup.Chest,
    label: "Chest",
  },
  {
    value: MuscleGroup.Forearms,
    label: "Forearms",
  },
  {
    value: MuscleGroup.Glutes,
    label: "Glutes",
  },
  {
    value: MuscleGroup.Hamstrings,
    label: "Hamstrings",
  },
  {
    value: MuscleGroup.Lats,
    label: "Lats",
  },
  {
    value: MuscleGroup.Quadriceps,
    label: "Quadriceps",
  },
  {
    value: MuscleGroup.Shoulders,
    label: "Shoulders",
  },
  {
    value: MuscleGroup.Trapezius,
    label: "Trapezius",
  },
  {
    value: MuscleGroup.Triceps,
    label: "Triceps",
  },
] satisfies MuscleGroupOption[];

export function WorkoutTypeStep() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<MuscleGroupOption[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleUnselect = useCallback((framework: MuscleGroupOption) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const selectables = MUSCLE_GROUPS.filter(
    (muscles) => !selected.includes(muscles),
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent flex flex-col space-y-1"
    >
      <Label className="text-lg font-semibold text-dark-900">
        Select muscle groups
      </Label>

      <div className="group rounded-md border border-input px-2 py-3 text-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((framework) => {
            return (
              <Badge key={framework.value} variant="secondary">
                {framework.label}
                <button
                  className="ml-1 rounded-full  outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(framework);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={
              selected.length >= 1
                ? "Select more muscle groups..."
                : "Select muscle group"
            }
            className="ml-2 flex-1 bg-transparent outline-none "
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute bg-white top-0 z-10 w-full rounded-md border bg-popover  shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        setSelected((prev) => [...prev, framework]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {framework.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
