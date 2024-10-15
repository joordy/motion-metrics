import { z } from "zod";

import { password } from "./auth";

export const startSchema = z.object({});

export const authenticateSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: password,
});

export const loginSchemaRaw = startSchema.merge(authenticateSchema);

export const loginSchema = loginSchemaRaw;

export type LoginSchema = z.infer<typeof loginSchemaRaw>;
