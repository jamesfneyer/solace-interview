import { Advocate } from "@/types";

type GroupedAdvocate = {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    yearsOfExperience: number;
    phoneNumber: number;
    specialties: string[];
};

type AdvocateRow = {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    yearsOfExperience: number;
    phoneNumber: number;
    specialtyName: string | null;
};
    
export function groupAdvocates<T>(rows: AdvocateRow[]): GroupedAdvocate[] {
    const grouped = new Map<number, any>();

    for (const row of rows) {
      if (!grouped.has(row.id)) {
        grouped.set(row.id, {
          id: row.id,
          firstName: row.firstName,
          lastName: row.lastName,
          city: row.city,
          degree: row.degree,
          yearsOfExperience: row.yearsOfExperience,
          phoneNumber: row.phoneNumber,
          specialties: [],
        });
      }
  
      if (row.specialtyName) {
        grouped.get(row.id).specialties.push(row.specialtyName);
      }
    }
  
    return Array.from(grouped.values());
}