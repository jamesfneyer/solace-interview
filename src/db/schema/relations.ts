import { relations } from "drizzle-orm";
import { advocates } from "./advocates";
import { specialties } from "./specialties";
import { advocateSpecialties } from "./advocateSpecialties";

export const advocateRelations = relations(advocates, ({ many }) => ({
  advocateSpecialties: many(advocateSpecialties),
}));

export const specialtyRelations = relations(specialties, ({ many }) => ({
  advocateSpecialties: many(advocateSpecialties),
}));

export const advocateSpecialtiesRelations = relations(advocateSpecialties, ({ one }) => ({
  advocate: one(advocates, {
    fields: [advocateSpecialties.advocateId],
    references: [advocates.id],
  }),
  specialty: one(specialties, {
    fields: [advocateSpecialties.specialtyId],
    references: [specialties.id],
  }),
}));
