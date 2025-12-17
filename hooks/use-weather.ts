// File: hooks/use-weather.ts
// Vị trí: Thư mục gốc/hooks
import { useQuery } from "@tanstack/react-query";

// Định nghĩa Interface dữ liệu trả về cho UI dùng chung
export interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: string;
    humidity: number;
    wind_kph: number;
    updated_at: string;
  };
  forecast: Array<{
    time: string;
    temp_c: number;
    precip_prob: number;
  }>;
  sources: string[];
}

interface WeatherResponse {
  data: WeatherData;
  logs: Array<{ message: string; created_at: string }>;
  source: string;
}

interface WeatherParams {
  lat: number;
  lon: number;
  name: string;
}

interface UseWeatherOptions {
  pollingInterval?: number;
  enabled?: boolean;
}

export const useWeather = (
  params: WeatherParams,
  options: UseWeatherOptions = {},
) => {
  const { pollingInterval = 0, enabled = true } = options;

  return useQuery<WeatherResponse>({
    queryKey: ["weather", params.lat, params.lon],
    queryFn: async () => {
      const query = new URLSearchParams({
        lat: params.lat.toString(),
        lon: params.lon.toString(),
        name: params.name,
      });

      const res = await fetch(`/api/weather?${query}`);
      if (!res.ok) throw new Error("Failed to fetch weather");
      return res.json();
    },
    refetchInterval: pollingInterval,
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export const useForceRefreshWeather = () => {
  return async (params: WeatherParams) => {
    const query = new URLSearchParams({
      lat: params.lat.toString(),
      lon: params.lon.toString(),
      name: params.name,
      force: "true",
    });

    const res = await fetch(`/api/weather?${query}`);
    if (!res.ok) throw new Error("Failed to force refresh");
    return res.json();
  };
};
