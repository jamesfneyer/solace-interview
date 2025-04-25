import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { advocates } from "./advocates";
import { specialties } from "./specialties";

export const advocateSpecialties = pgTable("advocate_specialties", {
  id: serial("id").primaryKey(),
  advocateId: integer("advocate_id")
    .references(() => advocates.id)
    .notNull(),
  specialtyId: integer("specialty_id")
    .references(() => specialties.id)
    .notNull(),
});
