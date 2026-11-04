import { NextRequest, NextResponse } from "next/server";
import { fetchPackagesFromStrapi } from "@/lib/strapi";

export async function GET(request: NextRequest) {
  // Akses query param agar request bersifat dinamis di Next.js App Router
  request.nextUrl.searchParams.get("_t");

  const packages = await fetchPackagesFromStrapi();

  return NextResponse.json(packages, {
    headers: {
      "Cache-Control":
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

