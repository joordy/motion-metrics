import type { SuperRefinement, ZodSchema } from "zod";
import { z } from "zod";

import { password } from "./auth";

export const startSchema = z.object({});

export const registerAccountDetailsSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: password,
  password_confirmation: password,
});

export const personalAccountSchema = z.object({
  first_name: z.string().min(2, "First name is required."),
  last_name: z.string().min(2, "Last name is required."),
});

export const passwordRefine: SuperRefinement<z.infer<ZodSchema>> = (
  { password_confirmation, password },
  ctx,
) => {
  if (password_confirmation !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Wachtwoorden komen niet overeen",
      path: ["password_confirmation"],
    });
  }
};

export const registerSchemaRaw = startSchema
  .merge(registerAccountDetailsSchema)
  .merge(personalAccountSchema);

export const registerSchema = registerSchemaRaw.superRefine(passwordRefine);

export type RegisterSchema = z.infer<typeof registerSchemaRaw>;
