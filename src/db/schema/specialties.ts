import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const specialties = pgTable("specialties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});
