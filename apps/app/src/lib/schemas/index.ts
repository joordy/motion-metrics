import { z } from "zod";

export const password = z
  .string()
  .min(1, "Password is required.")
  .min(8, "Password must contain more than 8 characters.")
  .max(32, "Password must not contain more than 32 characters.")
  .refine((value) => /[A-Z]/.test(value), {
    message: "Password must contain at least one uppercase letter.",
  })
  .refine((value) => /[a-z]/.test(value), {
    message: "Password must contain at least one lowercase letter.",
  })
  .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
    message: "Password must contain at least one special character.",
  })
  .refine((value) => /\d/.test(value), {
    message: "Password must contain at least one number.",
  });
