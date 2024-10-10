import { z } from "zod";

export const password = z
  .string()
  .min(1, "Wachtwoord is verplicht.")
  .min(8, "Wachtwoord moet meer dan 8 tekens bevatten.")
  .max(32, "Wachtwoord mag niet meer dan 32 tekens bevatten.")
  .refine((value) => /[A-Z]/.test(value), {
    message: "Wachtwoord moet minimaal één hoofdletter bevatten.",
  })
  .refine((value) => /[a-z]/.test(value), {
    message: "Wachtwoord moet minimaal één kleine letter bevatten.",
  })
  .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
    message: "Wachtwoord moet minimaal één speciaal teken bevatten.",
  })
  .refine((value) => /\d/.test(value), {
    message: "Wachtwoord moet minimaal één cijfer bevatten.",
  });
