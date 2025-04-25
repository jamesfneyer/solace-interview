import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import * as schema from './schema';
dotenv.config();

const setup = (): PostgresJsDatabase<typeof schema> => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    throw new Error("Missing DATABASE_URL environment variable");
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL!);
  const db = drizzle(queryClient, { schema });
  return db;
};

export default setup();
