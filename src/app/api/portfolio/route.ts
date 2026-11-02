import { NextResponse } from "next/server";
import { fetchPortfolioFromStrapi } from "@/lib/strapi";

// Pastikan route ini tidak di-cache oleh Next.js di production
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  const data = await fetchPortfolioFromStrapi();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control":
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}


