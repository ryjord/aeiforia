// Libs
import { NextResponse } from "next/server";
import { fetchGlobalWeather } from "@/lib/weather/client";

export async function GET() {
  try {
    const weather = await fetchGlobalWeather();
    return NextResponse.json(weather);
  } catch (error) {
    console.error("Failed to fetch global weather:", error);
    return NextResponse.json({ error: "Failed to fetch global weather" }, { status: 502 });
  }
}
