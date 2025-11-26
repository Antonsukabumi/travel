import { NextResponse } from "next/server";
import { getTravelPackages } from "@/lib/data-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");

  const packages = await getTravelPackages({
    featuredOnly: featured === "true",
  });

  return NextResponse.json({ data: packages });
}

