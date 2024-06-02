import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET: z.string().min(1),
    SALT_ROUNDS: z.string().transform((v) => parseInt(v, 10)),
    POSTGRES_URL: z.string().url(),
  },
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
});
