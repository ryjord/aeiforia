// Libs
import { NextResponse } from "next/server";
import { fetchMicroplastics } from "@/lib/microplastics/client";

export async function GET() {
  const grid = await fetchMicroplastics();

  if (!grid) {
    return NextResponse.json({ error: "Microplastics data unavailable" }, { status: 502 });
  }

  return NextResponse.json(grid);
}
