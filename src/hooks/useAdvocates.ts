import { UseAdvocates } from "@/types";
import { useState } from "react";

export function useAdvocates(): UseAdvocates {
  const [advocates, setAdvocates] = useState([]);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const removeFilter = (key: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const fetchAdvocates = async () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(`filter[${key}][ilike]`, value);
      }
    });

    const res = await fetch(`/api/advocates?${params.toString()}`);
    const json = await res.json();
    setAdvocates(json.data);
  };

  return {
    advocates,
    filters,
    updateFilter,
    removeFilter,
    fetchAdvocates,
  };
}
