// File: lib/weather-service.ts
// Vị trí: Thư mục gốc/lib
import Weather, { IWeatherData } from "@/models/Weather";
import SystemLog from "@/models/SystemLog";

interface LocationParams {
  name: string;
  lat: number;
  lon: number;
  code: string;
}

// Định nghĩa kiểu trả về Union rõ ràng để TS check
type FetchResult =
  | { success: true; data: Partial<IWeatherData> }
  | { success: false; error: string };

// 1. Adapter cho Open-Meteo
async function fetchOpenMeteo(loc: LocationParams): Promise<FetchResult> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,cloud_cover&hourly=temperature_2m,precipitation_probability,precipitation&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`OpenMeteo Error: ${res.statusText}`);
    const data = await res.json();

    return {
      success: true,
      data: {
        provider: "open-meteo",
        location: loc,
        current: {
          temp_c: data.current.temperature_2m,
          condition: `Code: ${data.current.weather_code}`,
          humidity: data.current.relative_humidity_2m,
          wind_kph: data.current.wind_speed_10m,
          precip_mm: data.current.precipitation,
          cloud_cover: data.current.cloud_cover,
          updated_at: new Date(data.current.time),
        },
        forecast: data.hourly.time.slice(0, 24).map((t: string, i: number) => ({
          time: new Date(t),
          temp_c: data.hourly.temperature_2m[i],
          precip_mm: data.hourly.precipitation[i],
          precip_prob: data.hourly.precipitation_probability[i],
        })),
        fetched_at: new Date(),
      } as Partial<IWeatherData>,
    };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return { success: false, error: msg };
  }
}

// Giả lập Adapter cho Provider khác
async function fetchSecondaryProvider(
  loc: LocationParams,
): Promise<FetchResult> {
  // Placeholder logic
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _check = loc;
  return { success: false, error: "Provider not configured" };
}

// 2. Hàm Fetch All (Parallel) & Save
export async function updateWeatherData(
  loc: LocationParams,
  trigger: "cron" | "manual",
) {
  const providers = [fetchOpenMeteo, fetchSecondaryProvider];

  const results = await Promise.all(providers.map((p) => p(loc)));

  let successCount = 0;

  for (const res of results) {
    // Discriminated Union Check: Nếu success === true, TS tự biết data tồn tại
    if (res.success) {
      // Vì res.data là Partial, cần ensure logic ghi vào DB
      if (res.data && res.data.provider) {
        await Weather.findOneAndUpdate(
          { "location.code": loc.code, provider: res.data.provider },
          res.data,
          { upsert: true, new: true },
        );
        successCount++;
      }
    }
  }

  await SystemLog.create({
    module: "weather",
    action: trigger === "cron" ? "cron_fetch" : "manual_refresh",
    status: successCount > 0 ? "success" : "error",
    message: `Updated ${loc.name}. Success: ${successCount}/${providers.length}`,
    metadata: { location: loc.code },
  });

  return successCount;
}

// 3. Hàm Get & Merge
export async function getMergedWeather(locationCode: string) {
  const docs = await Weather.find({ "location.code": locationCode });

  if (!docs || docs.length === 0) return null;

  const primary = docs.find((d) => d.provider === "open-meteo") || docs[0];

  return {
    ...primary.toObject(),
    sources: docs.map((d) => d.provider),
    merged_at: new Date(),
  };
}
