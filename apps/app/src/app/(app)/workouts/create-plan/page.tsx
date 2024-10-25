import {
  getCurrentUser,
  getExercises,
  getUserWorkoutData,
} from "@/lib/server-utils";

import { AppMain } from "@/components/elements/app-main";
import { CreateWorkoutForm } from "@/components/elements/create-workout-form";

export default async function AppPage() {
  const { exercises } = await getExercises();
  const { user: currentUser } = await getCurrentUser();
  const { active_workout_plan } = await getUserWorkoutData(currentUser.id);

  return (
    <AppMain className="h-full">
      <CreateWorkoutForm {...{ exercises, currentUser, active_workout_plan }} />
    </AppMain>
  );
}
