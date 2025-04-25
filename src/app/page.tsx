"use client";

import { useAdvocates } from "@/hooks/useAdvocates";
import FilterControls from "@/components/FilterControls";
import AdvocatesTable from "@/components/AdvocatesTable";

export default function Home() {
  const {
    advocates,
    filters,
    updateFilter,
    removeFilter,
    fetchAdvocates,
  } = useAdvocates();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Solace Advocates</h1>
      <FilterControls
        filters={filters}
        onChange={updateFilter}
        onSubmit={fetchAdvocates}
        onReset={() => {
          Object.keys(filters).forEach(removeFilter);
          fetchAdvocates();
        }}
      />
      <AdvocatesTable advocates={advocates} />
    </main>
  );
}
