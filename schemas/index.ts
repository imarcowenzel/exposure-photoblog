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
      .regex(/^[^A-Z\s]+$/, {
        message: "Username must not contain uppercase letters or spaces.",
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

export const usernameSchema = z.object({
  newUsername: z
    .string()
    .regex(/^[^A-Z\s]+$/, {
      message: "Username must not contain uppercase letters or spaces.",
    })
    .min(3, { message: "Username must be at least 3 characters." })
    .max(15),
});

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Current password must be at least 6 characters." }),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, {
      message: "Password confirmation must be at least 6 characters.",
    }),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Password confirmation does not match the new password.",
    path: ["confirmPassword"],
  });

  export const photoSchema = z.object({
    photo: z.string().url(),
  });

  export const editSchema = z.object({
    tags: z
      .string()
      .min(2, { message: "Tag must contain at least 2 characters(s)" }),
  });