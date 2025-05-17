import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string()
    .min(1, "First name is required.")
    .regex(/^[A-Za-z\s]+$/, "First name must not contain numbers."),
  lastName: z.string()
    .min(1, "Last name is required.")
    .regex(/^[A-Za-z\s]+$/, "Last name must not contain numbers."),
  password: z
    .string()
    .superRefine((val, ctx) => {
      if (val.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "must be at least 6 characters",
        });
      }
      if (!/[A-Z]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "must have at least one upper case letter",
        });
      }
      if (!/[a-z]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "must have at least one lower case letter",
        });
      }
      if (!/[0-9]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "must have at least one numeric character",
        });
      }
      if (!/[^A-Za-z0-9]/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "must have at least one special character",
        });
      }
    }),
  passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match.",
  path: ["passwordConfirm"],
});

export type SignupFormData = z.infer<typeof signupSchema>;
