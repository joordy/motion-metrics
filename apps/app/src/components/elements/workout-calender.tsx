import type { FrequencyDay, Workout } from "@/types/workout";

import { cn, getDatesOfCurrentWeek } from "@/lib/utils";

const DAY_ABBREVIATIONS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  workouts: any;
  scheduled: string[];
}

export function WorkoutCalendar({ workouts }: Props) {
  const weekDates = getDatesOfCurrentWeek();
  const today = new Date();

  return (
    <article className="mt-8">
      <ul className="grid grid-cols-7 gap-2">
        {weekDates.map((el: Date, i: number) => {
          const date = el.getDate();
          const isActive = el.toDateString() === today.toDateString();

          const getMondayBasedWeekIndex = (date: Date = new Date()) =>
            (date.getDay() === 0
              ? "6"
              : (date.getDay() - 1).toString()) as FrequencyDay;

          const dayIndex = getMondayBasedWeekIndex(el);

          const isScheduled = workouts.some((workout: Workout) =>
            workout.frequency?.includes(dayIndex),
          );

          const dayWorkouts = workouts.filter((workout: Workout) =>
            workout.frequency?.includes(dayIndex),
          );

          return (
            <li
              key={i}
              className={cn(
                "relative flex py-2 px-1 text-md rounded justify-center items-center flex-col",
                {
                  "border border-dark-800 font-bold ": isActive,
                  "border border-dark-800/50":
                    dayWorkouts.length >= 1 && !isActive,
                  "bg-dark-800 text-dark-100":
                    dayWorkouts.length >= 1 && isActive,
                  "border border-dark-800/20":
                    isScheduled && dayWorkouts.length === 0 && !isActive,
                },
              )}
            >
              <p className="text-sm leading-tight">{DAY_ABBREVIATIONS[i]}</p>
              <p className="text-lg leading-tight">{date}</p>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
