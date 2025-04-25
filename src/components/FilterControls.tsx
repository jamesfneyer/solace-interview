import { Filters, FilterKeys } from "@/types";
import { useEffect } from "react";

interface FilterControlsProps {
    filters: Filters;
    onChange: (key: FilterKeys, value: string) => void;
    onSubmit: () => void;
    onReset: () => void;
};  

export default function FilterControls({ filters, onChange, onSubmit, onReset }: FilterControlsProps) {
    const fields: FilterKeys[] = ["firstName", "lastName", "city", "degree", "experience"];
    // ✅ Trigger onSubmit once when the component mounts
    useEffect(() => {
        onSubmit();
      }, []);

    return (
      <div className="flex gap-4 flex-wrap mb-4">
        {fields.map((field) => (
          <input
            key={field}
            placeholder={`Filter by ${field}`}
            value={filters[field] || ""}
            onChange={(e) => onChange(field, e.target.value)}
            className="border p-1 rounded"
          />
        ))}
  
        <button onClick={onSubmit} className="bg-blue-600 text-white px-4 py-1 rounded">Search</button>
        <button onClick={onReset} className="bg-gray-200 text-gray-800 px-4 py-1 rounded">Reset</button>
      </div>
    );
  }
  