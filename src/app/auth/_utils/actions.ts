"use server";
import { isRedirectError } from "next/dist/client/components/redirect";

import { signIn } from "@/auth";
import {
  type LoginSchemaType,
  type RegistrationFormSchemaType,
} from "./schema";
import { register as registerUser } from "@/lib/auth/actions";

function authCatchBlock(e: any) {
  if (isRedirectError(e)) {
    throw e;
  }

  return {
    error:
      e?.name === "CredentialsSignin"
        ? "Invalid username or password"
        : "Invalid input",
    type: "authError",
  };
}

export async function register(
  formData: RegistrationFormSchemaType,
  redirectUrl: string = "/"
) {
  try {
    const { confirmPassword, ...data } = formData;
    if (data.password !== confirmPassword) {
      return {
        error: "Passwords do not match",
        type: "validationError",
      };
    }
    await registerUser(data);
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: redirectUrl,
    });
  } catch (e: any) {
    return authCatchBlock(e);
  }
}

export async function login(
  formData: LoginSchemaType,
  redirectUrl: string = "/"
) {
  try {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirectTo: redirectUrl,
    });
  } catch (e: any) {
    return authCatchBlock(e);
  }
}
