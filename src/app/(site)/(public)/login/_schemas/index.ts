import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z
    .string()
    .min(8, "Password must be minimum 8 characters")
    .max(50, "Password cannot be more than 50 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
