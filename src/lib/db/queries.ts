import "server-only";

import { CreateUser } from "@/lib/auth/types";
import { db } from ".";
import { users } from "./schema";

export async function getUserByEmail(email: string) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
    columns: {
      id: true,
      email: true,
      password: true,
      emailVerified: true,
    },
  });
}

export async function createUser(user: CreateUser) {
  return db.insert(users).values(user).returning();
}
