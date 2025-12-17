// File: app/api/weather/cron/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { updateWeatherData } from "@/lib/weather-service";

export async function POST() {
  // Cron thường là request rỗng hoặc từ triggered task
  try {
    await connectToDatabase();

    const locations = [
      {
        name: "Ho Chi Minh City",
        lat: 10.8231,
        lon: 106.6297,
        code: "10.82-106.63",
      },
      { name: "Hanoi", lat: 21.0285, lon: 105.8542, code: "21.03-105.85" },
      { name: "Da Nang", lat: 16.0544, lon: 108.2022, code: "16.05-108.20" },
    ];

    const promises = locations.map((loc) => updateWeatherData(loc, "cron"));
    await Promise.all(promises);

    return NextResponse.json({
      success: true,
      message: `Cron executed for ${locations.length} locations.`,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
