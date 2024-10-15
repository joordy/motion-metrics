import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

import { type EmailOtpType } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser();

    if (getUserError || !user) {
      // console.error("Error getting user:", getUserError);
      redirect("/error");
    }

    // Insert a new row into user_workout_data
    const { error: insertError } = await supabase
      .from("user_workout_data")
      .insert([
        {
          user_id: user.id,
          active_workout_plan: null,
          logged_workouts: [],
        },
      ]);

    // if (insertError) {
    //   // console.error("Error inserting user_workout_data:", insertError);
    //   // You might want to handle this error differently,
    //   // perhaps by redirecting to a specific error page or showing a message
    //   //
    // }
    // // const { data, error } = await supabase
    // //   .from('workout_logs')
    // //   .insert([
    // //     {
    // //       user_id: supabase.auth.user().id,
    // //       workout_date: workoutData.date,
    // //       exercise: workoutData.exercise,
    // //       sets: workoutData.sets,
    // //       reps: workoutData.reps,
    // //       weight: workoutData.weight
    // //     }
    // //   ]);

    if (!error || !insertError) {
      // redirect user to specified redirect URL or root of app
      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/error");
}
