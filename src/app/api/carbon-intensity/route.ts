// Libs
import { NextResponse } from "next/server";
import { fetchRegionalIntensity } from "@/lib/carbon-intensity/client";

export async function GET() {
  try {
    const intensity = await fetchRegionalIntensity();
    return NextResponse.json(intensity);
  } catch (error) {
    console.error("Failed to fetch carbon intensity:", error);
    return NextResponse.json({ error: "Failed to fetch carbon intensity" }, { status: 502 });
  }
}
