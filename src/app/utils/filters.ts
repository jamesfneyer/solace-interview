import { eq, lte, ilike, gte, and } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

export function buildFilters(params: URLSearchParams, filterableColumns: Record<string, PgColumn>) {
    const filters = [];

    for (const [key, value] of params.entries()) {
      const match = key.match(/^filter\[(\w+)\]\[(\w+)\]$/);
      if (!match) continue;
  
      const [_, field, op] = match;
      if (!(field in filterableColumns)) continue;
  
      const column = filterableColumns[field as keyof typeof filterableColumns];
  
      switch (op) {
        case "equals":
          filters.push(eq(column, value));
          break;
        case "gte":
          filters.push(gte(column, Number(value)));
          break;
        case "lte":
          filters.push(lte(column, Number(value)));
          break;
        case "ilike":
          filters.push(ilike(column, `%${value}%`));
          break;
        default:
          break;
      }
    }
  
    return filters;
};
