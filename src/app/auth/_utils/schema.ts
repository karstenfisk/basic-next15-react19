import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const loginResolver = zodResolver(LoginSchema);

export const RegistrationFormSchema = z.object({
  email: z.string().email({ message: "Invalid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(100, { message: "Password must be at most 100 characters." })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character.",
    }),
  confirmPassword: z.string(),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 character." })
    .max(250, { message: "Name must be less than 250 characters." })
    .regex(/^[a-zA-Z ]+$/, {
      message: "Name can only contain letters and spaces.",
    }),
});

export type RegistrationFormSchemaType = z.infer<typeof RegistrationFormSchema>;

export const registrationResolver = zodResolver(RegistrationFormSchema);
