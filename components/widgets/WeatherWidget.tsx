import React from "react";
import { Cloud, Sun, Droplets, Wind, Globe, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { WeatherData } from "@/hooks/use-weather";

interface WeatherWidgetProps {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  theme: "swiss" | "cyberpunk";
}

export const WeatherWidget = ({
  data,
  loading,
  error,
  theme,
}: WeatherWidgetProps) => {
  // 1. Trạng thái Loading
  if (loading) {
    return (
      <Card
        theme={theme}
        className="h-full flex flex-col justify-between animate-pulse"
        title="Weather"
        icon={Cloud}
      >
        <div className="flex justify-between items-start">
          <div className="h-10 w-20 bg-gray-200/20 rounded"></div>
          <div className="h-10 w-10 bg-gray-200/20 rounded-full"></div>
        </div>
        <div className="space-y-2 mt-4">
          <div className="h-3 w-full bg-gray-200/20 rounded"></div>
          <div className="h-3 w-2/3 bg-gray-200/20 rounded"></div>
        </div>
      </Card>
    );
  }

  // 2. Trạng thái Error
  if (error || !data) {
    return (
      <Card
        theme={theme}
        className="h-full flex flex-col items-center justify-center text-center"
        title="Weather"
        icon={Cloud}
      >
        <AlertTriangle className="text-red-500 mb-2" size={24} />
        <span className="text-xs opacity-60">Weather Unavailable</span>
      </Card>
    );
  }

  // 3. Trạng thái Success (Hiển thị dữ liệu thật)
  return (
    <Card
      theme={theme}
      className="h-full flex flex-col justify-between"
      title="Weather"
      icon={Cloud}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-bold">{data.temp}°</h2>
          <p
            className={`text-sm ${
              theme === "cyberpunk" ? "text-cyan-300" : "text-gray-500"
            }`}
          >
            {data.condition}
          </p>
        </div>
        <div
          className={`${
            theme === "cyberpunk" ? "text-yellow-400" : "text-orange-500"
          }`}
        >
          <Sun size={48} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs opacity-80">
        <div className="flex items-center gap-1">
          <Droplets size={12} />
          <span>H: {data.humidity}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Wind size={12} />
          <span>W: {data.wind} km/h</span>
        </div>
        <div className="col-span-2 flex items-center gap-1 mt-1">
          <Globe size={12} />
          <span className="truncate">{data.location}</span>
        </div>
      </div>
    </Card>
  );
};
