import db from "..";
import { advocates, advocateSpecialties, specialties } from "../schema";
import { advocateData } from "./advocates";
import { randomSpecialties, specialtyNames } from "./specialties";


async function seed() {
    console.log("🧹 Clearing existing data...");
    await db.delete(advocateSpecialties);
    await db.delete(advocates);
    await db.delete(specialties);

    console.log("🌱 Seeding specialties...");
    const insertedSpecialties = await db
        .insert(specialties)
        .values(specialtyNames.map((name) => ({ name })))
        .returning();

    const specialtyMap = new Map<string, number>();
    insertedSpecialties.forEach((s) => {
        specialtyMap.set(s.name, s.id);
    });

    console.log("👥 Seeding advocates...");
    for (const advocate of advocateData) {

        const [created] = await db
        .insert(advocates)
        .values(advocate)
        .returning();

        const specialtyIds = randomSpecialties()
        .map((name) => specialtyMap.get(name))
        .filter((id): id is number => typeof id === "number");

        if (specialtyIds.length > 0) {
        await db.insert(advocateSpecialties).values(
            specialtyIds.map((specialtyId) => ({
            advocateId: created.id,
            specialtyId,
            }))
        );
        }
    }

    console.log("✅ Seed complete!");
}

if (require.main === module) {
    seed().catch((err) => {
        console.error("❌ Seeding failed:", err);
    }).finally(() => process.exit(1));
}