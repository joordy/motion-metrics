import { cn, getDatesOfCurrentWeek } from "@/lib/utils";

const DAY_ABBREVIATIONS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Workout {
  id: string;
  date: string;
}

interface Props {
  workouts: Workout[];
  scheduled: number[];
}

export function WorkoutCalendar({ scheduled, workouts }: Props) {
  const weekDates = getDatesOfCurrentWeek();
  const today = new Date();

  return (
    <article className="mt-8">
      <ul className="grid grid-cols-7 gap-2">
        {weekDates.map((el: Date, i: number) => {
          const date = el.getDate();
          const isActive = el.toDateString() === today.toDateString();
          const dateString = el.toISOString().split("T")[0]; // 'YYYY-MM-DD'
          const dayWorkouts = workouts.filter(
            (workout) => workout.date === dateString,
          );
          const isScheduled = scheduled.includes(el.getDay());
          const isScheduledAndLogged = isScheduled && dayWorkouts.length >= 1;

          return (
            <li
              key={i}
              className={cn(
                "relative flex py-2 px-1 text-md rounded justify-center items-center flex-col",
                {
                  "bg-brand-lime font-bold text-dark-100": isActive,
                  "bg-brand-lime/50": dayWorkouts.length >= 1 && !isActive,
                  "border border-brand-lime/20":
                    isScheduled && dayWorkouts.length === 0 && !isActive,
                  "bg-brand-lime/20": isScheduledAndLogged && !isActive,
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
