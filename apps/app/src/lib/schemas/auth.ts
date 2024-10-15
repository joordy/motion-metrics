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

export const introSchema = z.object({});

export const registerStepOneSchema = z.object({
  email: z.string().email("Invalid email address"),
  password,
  password_confirmation: password,
});

export const registerStepTwoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password,
});
