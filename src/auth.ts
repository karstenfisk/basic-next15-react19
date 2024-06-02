import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/auth/utils";
import NextAuth from "next-auth";
import { login } from "./lib/auth/actions";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      password: string;
      emailVerified: Date | null;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        const { email, password } = credentials;

        try {
          const loginData = LoginSchema.parse({ email, password });

          user = await login(loginData);
          if (!user || "error" in user) {
            return null;
          }

          return user;
        } catch (e: any) {
          throw new Error(e?.message || "Invalid input");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
});
