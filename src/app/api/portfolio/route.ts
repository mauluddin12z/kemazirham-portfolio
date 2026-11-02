import { NextResponse } from "next/server";
import { fetchPortfolioFromStrapi } from "@/lib/strapi";

export async function GET() {
  const data = await fetchPortfolioFromStrapi();
  return NextResponse.json(data);
}

