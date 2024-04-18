import * as z from "zod";

export const logInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const signUpSchema = z
  .object({
    username: z
      .string()
      .regex(/^[a-z]+$/, {
        message: "Username must contain only lowercase letters without spaces.",
      })
      .min(3, { message: "Username must be at least 3 characters." })
      .max(15),
    email: z
      .string()
      .min(5, { message: "Email must be at least 5 characters." })
      .email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, {
      message: "Password confirmation must be at least 6 characters.",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Password confirmation does not match the password.",
    path: ["confirmPassword"],
  });
