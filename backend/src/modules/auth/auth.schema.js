import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.email(),
    password: z.string().min(12).max(1024),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
