// File: app/api/weather/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { getMergedWeather, updateWeatherData } from "@/lib/weather-service";
import SystemLog from "@/models/SystemLog";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get("lat") || "10.8231");
    const lon = parseFloat(searchParams.get("lon") || "106.6297");
    const name = searchParams.get("name") || "Ho Chi Minh City";
    const force = searchParams.get("force") === "true";

    const code = `${lat.toFixed(2)}-${lon.toFixed(2)}`;
    const locationParams = { name, lat, lon, code };

    await connectToDatabase();

    if (force) {
      await updateWeatherData(locationParams, "manual");
    }

    let data = await getMergedWeather(code);

    if (!data) {
      await updateWeatherData(locationParams, "manual");
      data = await getMergedWeather(code);
    }

    const latestLogs = await SystemLog.find({ module: "weather" })
      .sort({ created_at: -1 })
      .limit(5);

    return NextResponse.json({
      data,
      logs: latestLogs,
      source: "database_merged",
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
