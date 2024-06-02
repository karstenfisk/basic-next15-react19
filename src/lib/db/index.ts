import "server-only";

import * as schema from "./schema";

import { createPool } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { env } from "@/env";

const sql = createPool({
  connectionString: env.POSTGRES_URL,
});

export const db = drizzle(sql, { schema });
