import { NextResponse } from "next/server";

// Map mã WMO của Open-Meteo sang trạng thái dễ đọc
const getWeatherCondition = (code: number): string => {
  if (code === 0) return "Clear Sky";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 67) return "Drizzle/Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95 && code <= 99) return "Thunderstorm";
  return "Unknown";
};

export async function GET(request: Request) {
  try {
    // Mặc định: TP.HCM (10.8231, 106.6297)
    const lat = 10.8231;
    const lon = 106.6297;

    // Gọi Open-Meteo (API công khai, không cần key)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;

    const res = await fetch(url, { next: { revalidate: 300 } }); // Cache 5 phút

    if (!res.ok) {
      throw new Error("Failed to fetch from Open-Meteo");
    }

    const data = await res.json();
    const current = data.current;

    // Format dữ liệu theo chuẩn Widget của chúng ta
    const formattedData = {
      temp: Math.round(current.temperature_2m),
      condition: getWeatherCondition(current.weather_code),
      humidity: current.relative_humidity_2m,
      wind: Math.round(current.wind_speed_10m),
      location: "Ho Chi Minh City, VN", // Tạm thời hardcode
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Weather API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 },
    );
  }
}
