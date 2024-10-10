"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { password } from "@/lib/validations/auth";

export async function login(_: unknown, formData: FormData) {
  if (!formData) {
    // console.error("FormData is undefined");
    return { type: "error" as const, errors: { form: ["Invalid form data"] } };
  }

  const supabase = createClient();

  const schema = z.object({
    email: z.string().email(),
    password: password,
  });

  const formDataObject = Array.from(formData.entries()).reduce(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<string, FormDataEntryValue>
  );

  const result = schema.safeParse(formDataObject);

  if (result.success) {
    const { email, password } = result.data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      redirect("/error");
    }
    revalidatePath("/", "layout");
    redirect("/");
    return {
      type: "success",
      message: "You have successfully logged in!",
    };
  }
  return {
    type: "error" as const,
    errors: result.error.flatten().fieldErrors,
  };
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
