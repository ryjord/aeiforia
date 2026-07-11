// Libs
import { NextResponse } from "next/server";
import { fetchNationalGenerationMix } from "@/lib/carbon-intensity/client";

export async function GET() {
  try {
    const mix = await fetchNationalGenerationMix();
    return NextResponse.json(mix);
  } catch (error) {
    console.error("Failed to fetch national generation mix:", error);
    return NextResponse.json({ error: "Failed to fetch national generation mix" }, { status: 502 });
  }
}
