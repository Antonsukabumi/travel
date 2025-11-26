import { NextResponse } from "next/server";
import { getPhotographyPackages } from "@/lib/data-service";

export async function GET() {
  const packages = await getPhotographyPackages();
  return NextResponse.json({ data: packages });
}

