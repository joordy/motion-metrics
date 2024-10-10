import { WorkoutCalendar } from "@/components/workout-calender";

const WORKOUTS = [
  { id: "1", date: "2024-10-09" /* other properties */ },
  { id: "2", date: "2024-10-07" /* other properties */ },
];

const SCHEDULED_DAYS = [1, 3, 5]; // Monday, Wednesday, Friday

export default async function Page() {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <main className="flex flex-col justify-between pt-8">
      <article className="flex justify-between items-center">
        <div className="flex  flex-col-reverse">
          <h1 className="font-bold -mt-1 text-3xl">Dashboard</h1>
          <p className="">{formattedDate}</p>
        </div>

        <div className="size-12 rounded-full bg-dark-900" />
      </article>

      <WorkoutCalendar workouts={WORKOUTS} scheduled={SCHEDULED_DAYS} />

      <article className="mt-8 flex flex-col space-y-2">
        <h2 className="font-semibold text-2xl">Upcoming workout</h2>

        <div className="bg-[#1A1A1B] p-1 rounded flex space-x-3">
          <div className="h-auto bg-dark-300 w-12 rounded-sm" />

          <div>
            <h3 className="font-bold text-xl">Full body</h3>
            <p className="text-base">
              {`5 exercises`} — {`24 sets`}
            </p>
          </div>
        </div>
      </article>

      <article className="mt-8 flex flex-col space-y-2">
        <h2 className="text-2xl font-semibold">Weekly stats</h2>

        <div className="grid grid-cols-8 gap-2">
          <div className="col-span-4 bg-[#1A1A1B] rounded p-3 flex flex-col space-y-3">
            <h3 className="font-medium text-md">Moved weight</h3>
            <p className="font-extrabold text-xl">2400 kg</p>
          </div>
          <div className="col-span-4 bg-[#1A1A1B] rounded p-3 flex flex-col space-y-3">
            <h3 className="font-medium text-md">Active minutes</h3>
            <p className="font-extrabold text-xl">36.6 minutes</p>
          </div>
        </div>
      </article>
    </main>
  );
}
