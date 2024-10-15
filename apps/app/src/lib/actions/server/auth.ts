"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { z } from "zod";

import type { loginSchema } from "@/lib/schemas/login";
import type { registerSchemaRaw } from "@/lib/schemas/register";
import { createClient } from "@/lib/supabase/server";

type LoginSchema = z.infer<typeof loginSchema>;

export const login = async (data: LoginSchema) => {
  if (!data) {
    return { type: "error" as const, errors: { form: ["Invalid form data"] } };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
  return { success: true };
};

type RegisterSchema = z.infer<typeof registerSchemaRaw>;

export const signup = async (data: RegisterSchema) => {
  if (!data) {
    return { type: "error" as const, errors: { form: ["Invalid form data"] } };
  }

  const supabase = createClient();

  const response = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        subscribed: false,
        admin: false,
      },
    },
  });

  if (response.error) {
    return {
      type: "error" as const,
      errors: { form: [response.error.message] },
    };
  }

  revalidatePath("/confirm", "layout");
  redirect("/auth/verify-email");

  return { success: true };
};
