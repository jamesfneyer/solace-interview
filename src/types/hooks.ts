import { Advocate } from "./objects";

export type UseAdvocates = {
    advocates: Advocate[];
    filters: Record<string, string>;
    updateFilter: (key: string, value: string) => void;
    removeFilter: (key: string) => void;
    fetchAdvocates: () => Promise<void>;
};
