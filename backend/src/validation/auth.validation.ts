import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(5, "Email is too short")
  .max(255, "Email is too long")
  .email("Invalid email address")
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email must be in a valid format");

export const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters long")
  .max(128, "Password must be less than 128 characters")
  .regex(/[A-Z]/, "Password must include at least one uppercase letter")
  .regex(/[a-z]/, "Password must include at least one lowercase letter")
  .regex(/[0-9]/, "Password must include at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must include at least one special character"
  );

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
