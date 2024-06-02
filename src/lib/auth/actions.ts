"use server";

import { LoginSchema, RegisterSchema } from "./utils";
import { compare, hash } from "bcryptjs";
import { createUser, getUserByEmail } from "../db/queries";

import { env } from "@/env";
import { z } from "zod";

export async function login(formData: z.infer<typeof LoginSchema>) {
  try {
    const data = LoginSchema.parse(formData);

    const user = await getUserByEmail(data.email);
    if (!user) {
      return null;
    }
    const validPassword = await compare(data.password, user.password);

    if (!validPassword) {
      return null;
    }
    return user;
  } catch (e) {
    return {
      error: "Invalid input",
    };
  }
}

export async function register(formData: z.infer<typeof RegisterSchema>) {
  try {
    const data = RegisterSchema.parse(formData);

    const user = await getUserByEmail(data.email);
    if (user) {
      throw new Error("User already exists");
    }

    const hashPassword = await hash(data.password, env.SALT_ROUNDS);

    const body = {
      email: data.email,
      password: hashPassword,
      name: data.name,
    };
    return await createUser(body);
  } catch (e) {
    throw new Error("An error occurred");
  }
}
