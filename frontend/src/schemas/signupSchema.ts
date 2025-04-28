import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string()
    .min(1, "First name is required.")
    .regex(/^[A-Za-z\s]+$/, "First name must not contain numbers."),
  lastName: z.string()
    .min(1, "Last name is required.")
    .regex(/^[A-Za-z\s]+$/, "Last name must not contain numbers."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match.",
  path: ["passwordConfirm"],
});

export type SignupFormData = z.infer<typeof signupSchema>;
