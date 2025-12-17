import { useState, useEffect } from "react";

// Định nghĩa kiểu dữ liệu khớp với Widget
export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  location: string;
}

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Gọi về API Route nội bộ của Next.js
        const res = await fetch("/api/weather");

        if (!res.ok) {
          throw new Error("Failed to fetch weather");
        }

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Weather unavailable");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    // Refresh mỗi 10 phút
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}
