import { z } from "zod";

import { password } from "./index";

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
