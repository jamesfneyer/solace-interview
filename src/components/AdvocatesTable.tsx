import { AdvocateTable } from "@/types";

function formatPhoneNumber(raw: number): string {
    const str = raw.toString().padStart(10, "0"); // handles leading zeros
  
    if (str.length !== 10) return str; // Return as-is if invalid
  
    const areaCode = str.slice(0, 3);
    const prefix = str.slice(3, 6);
    const lineNumber = str.slice(6);
  
    return `(${areaCode}) ${prefix}-${lineNumber}`;
}
  

export default function AdvocatesTable({ advocates }: AdvocateTable) {
    return (
        <table className="w-full">
        <thead>
            <tr>
                <th>First</th>
                <th>Last</th>
                <th>City</th>
                <th>Degree</th>
                <th>Specialties</th>
                <th>Experience</th>
                <th>Phone</th>
            </tr>
        </thead>
        <tbody>
            {advocates.map((a) => (
            <tr key={a.id}>
                <td>{a.firstName}</td>
                <td>{a.lastName}</td>
                <td>{a.city}</td>
                <td>{a.degree}</td>
                <td>{a.specialties.join(", ")}</td>
                <td>{a.yearsOfExperience}</td>
                <td className="whitespace-nowrap">{formatPhoneNumber(a.phoneNumber)}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
}
  