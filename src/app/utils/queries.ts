import db from "@/db";
import { advocates, specialties, advocateSpecialties } from "@/db/schema";
import { eq } from "drizzle-orm";

export function baseAdvocateQuery() {
    return db
        .select({
        id: advocates.id,
        firstName: advocates.firstName,
        lastName: advocates.lastName,
        city: advocates.city,
        degree: advocates.degree,
        yearsOfExperience: advocates.yearsOfExperience,
        phoneNumber: advocates.phoneNumber,
        specialtyName: specialties.name,
        })
        .from(advocates)
        .leftJoin(advocateSpecialties, eq(advocateSpecialties.advocateId, advocates.id))
        .leftJoin(specialties, eq(advocateSpecialties.specialtyId, specialties.id));
}
  