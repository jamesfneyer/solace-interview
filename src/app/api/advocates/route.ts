import { and } from "drizzle-orm";
import { advocates } from "../../../db/schema";
import { NextRequest } from "next/server";
import { buildFilters } from "@/app/utils/filters";
import { groupAdvocates } from "@/app/utils/mappers";
import { baseAdvocateQuery } from "@/app/utils/queries";

const filterableColumns = {
  yearsOfExperience: advocates.yearsOfExperience,
  city: advocates.city,
  degree: advocates.degree,
  firstName: advocates.firstName,
  lastName: advocates.lastName,
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = url.searchParams;

  const filters = buildFilters(params, filterableColumns);

  const baseQuery = baseAdvocateQuery();

  const rows = filters.length > 0
    ? await baseQuery.where(and(...filters))
    : await baseQuery;

  const data = groupAdvocates(rows);

  return Response.json({ data });
};
