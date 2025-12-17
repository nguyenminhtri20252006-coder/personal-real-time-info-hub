"use client";

import React, { useState } from "react";
import { Globe, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { SystemStatus } from "@/components/widgets/SystemStatus";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";
import { MarketTicker } from "@/components/widgets/MarketTicker";
import { NewsFeed } from "@/components/widgets/NewsFeed";
import { MOCK_MARKETS, MOCK_NEWS } from "@/lib/constants";
import { useWeather } from "@/hooks/use-weather";

export default function Dashboard() {
  const [theme, setTheme] = useState<"swiss" | "cyberpunk">("swiss");

  // Fetch dữ liệu thật từ API thông qua custom hook
  const {
    data: weatherData,
    loading: weatherLoading,
    error: weatherError,
  } = useWeather();

  // Background styles động dựa trên theme
  const bgStyles =
    theme === "cyberpunk"
      ? "bg-[#050505] text-gray-200 selection:bg-cyan-500/30"
      : "bg-gray-50 text-gray-900 selection:bg-blue-200";

  return (
    <div
      className={cn(
        "min-h-screen w-full p-4 md:p-8 transition-colors duration-500 font-sans",
        bgStyles,
      )}
    >
      <Header theme={theme} setTheme={setTheme} />

      {/* BENTO GRID LAYOUT */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 auto-rows-[180px]">
        {/* Block 1: System Status (Đã tách component) */}
        <div className="col-span-1 md:col-span-2 row-span-2">
          <SystemStatus theme={theme} />
        </div>

        {/* Block 2: Weather (REAL DATA from Hook) */}
        <div className="col-span-1 md:col-span-1 row-span-2">
          <WeatherWidget
            data={weatherData}
            loading={weatherLoading}
            error={weatherError}
            theme={theme}
          />
        </div>

        {/* Block 3: Quick Tasks (Vẫn dùng Card cơ bản + Mock UI tại chỗ) */}
        <Card
          theme={theme}
          title="Quick Task"
          icon={Calendar}
          className="col-span-1 md:col-span-1 row-span-1"
        >
          <div className="flex items-center gap-2 mt-2">
            <div
              className={`h-3 w-3 rounded-full border ${
                theme === "cyberpunk" ? "bg-cyan-500" : "bg-blue-500"
              }`}
            />
            <span className="text-sm font-medium">Review API Docs</span>
          </div>
        </Card>

        {/* Block 4: Workspace Link */}
        <Card
          theme={theme}
          className="col-span-1 md:col-span-1 row-span-1 flex flex-col items-center justify-center cursor-pointer group hover:scale-[1.02] transition-transform"
        >
          <Globe
            size={32}
            className={
              theme === "cyberpunk" ? "text-purple-400" : "text-blue-500"
            }
          />
          <span className="text-xs font-bold mt-2 opacity-70">Workspace</span>
        </Card>

        {/* Block 5: Markets (Vẫn dùng Mock Data import từ constants) */}
        <div className="col-span-1 md:col-span-2 row-span-2">
          <MarketTicker data={MOCK_MARKETS} theme={theme} />
        </div>

        {/* Block 6: News Feed (Vẫn dùng Mock Data import từ constants) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2">
          <NewsFeed data={MOCK_NEWS} theme={theme} />
        </div>
      </main>
    </div>
  );
}
