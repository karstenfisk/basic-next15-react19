import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(100, { message: "Password must be at most 100 characters." })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character.",
    }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(100, { message: "Password must be at most 100 characters." })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character.",
    }),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 character." })
    .max(250, { message: "Name must be less than 250 characters." })
    .regex(/^[a-zA-Z ]+$/, {
      message: "Name can only contain letters and spaces.",
    }),
});
