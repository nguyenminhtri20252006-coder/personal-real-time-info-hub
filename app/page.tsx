"use client";

import React, { useState, useEffect } from "react";
import {
  Cloud,
  TrendingUp,
  Newspaper,
  Cpu,
  Wifi,
  Battery,
  Globe,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/header";

// --- MOCK DATA (Tạm thời) ---
const MOCK_WEATHER = {
  temp: 28,
  condition: "Partly Cloudy",
  humidity: 65,
  wind: 12,
  location: "Ho Chi Minh City, VN",
};
const MOCK_MARKETS = [
  {
    symbol: "VN-INDEX",
    price: "1,254.30",
    change: "+12.5",
    percent: "+1.02%",
    up: true,
  },
  {
    symbol: "S&P 500",
    price: "5,230.15",
    change: "-15.2",
    percent: "-0.29%",
    up: false,
  },
  {
    symbol: "GOLD",
    price: "2,350.80",
    change: "+5.4",
    percent: "+0.23%",
    up: true,
  },
  {
    symbol: "BTC/USD",
    price: "68,450.00",
    change: "+1,200",
    percent: "+1.78%",
    up: true,
  },
];
const MOCK_NEWS = [
  {
    id: 1,
    source: "VnExpress",
    time: "10m ago",
    title: "Xuất khẩu gạo Việt Nam lập kỷ lục mới trong quý 1.",
  },
  {
    id: 2,
    source: "Bloomberg",
    time: "1h ago",
    title: "Fed signals rate cuts might be delayed due to inflation.",
  },
  {
    id: 3,
    source: "TechCrunch",
    time: "2h ago",
    title: "New AI models are changing software development forever.",
  },
];

export default function Dashboard() {
  const [theme, setTheme] = useState<"swiss" | "cyberpunk">("swiss");

  // Background styles động
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
        {/* 1. System Status (Large Square) */}
        <Card
          theme={theme}
          className="col-span-1 md:col-span-2 row-span-2 flex flex-col justify-center items-center"
        >
          <div
            className={`text-5xl font-black tracking-tight font-mono mb-2 ${
              theme === "cyberpunk" ? "text-cyan-400" : "text-gray-900"
            }`}
          >
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
          <div className="text-lg opacity-60 mb-6 font-medium">
            System Optimal
          </div>
          <div className="grid grid-cols-3 gap-8 w-full px-8">
            <div className="flex flex-col items-center gap-2">
              <Cpu size={20} />
              <span className="text-xs font-mono">12%</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Wifi size={20} />
              <span className="text-xs font-mono">54ms</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Battery size={20} />
              <span className="text-xs font-mono">98%</span>
            </div>
          </div>
        </Card>

        {/* 2. Weather (Vertical) */}
        <Card
          theme={theme}
          title="Weather"
          icon={Cloud}
          className="col-span-1 md:col-span-1 row-span-2"
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-4xl font-bold">{MOCK_WEATHER.temp}°</h2>
              <p className="text-sm opacity-70">{MOCK_WEATHER.condition}</p>
            </div>
            <div className="text-xs space-y-1 opacity-80">
              <p>H: {MOCK_WEATHER.humidity}%</p>
              <p>W: {MOCK_WEATHER.wind} km/h</p>
              <p className="truncate mt-2 text-[10px]">
                {MOCK_WEATHER.location}
              </p>
            </div>
          </div>
        </Card>

        {/* 3. Quick Task (Small) */}
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

        {/* 4. Workspace Link (Small) */}
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

        {/* 5. Markets (Wide) */}
        <Card
          theme={theme}
          title="Markets"
          icon={TrendingUp}
          className="col-span-1 md:col-span-2 row-span-2"
        >
          <div className="space-y-2 mt-2">
            {MOCK_MARKETS.map((m, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-sm p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <span className="font-bold">{m.symbol}</span>
                <div className={m.up ? "text-green-500" : "text-red-500"}>
                  {m.price}{" "}
                  <span className="text-[10px] ml-1">({m.percent})</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 6. News (Wide/Tall) */}
        <Card
          theme={theme}
          title="Latest News"
          icon={Newspaper}
          className="col-span-1 md:col-span-2 row-span-2"
        >
          <div className="space-y-3 mt-1 overflow-y-auto h-[260px] scrollbar-hide">
            {MOCK_NEWS.map((n) => (
              <div
                key={n.id}
                className="border-b border-white/10 pb-2 last:border-0"
              >
                <div className="flex justify-between text-[10px] opacity-50 mb-1">
                  <span>{n.source}</span>
                  <span>{n.time}</span>
                </div>
                <div className="text-sm font-medium hover:underline cursor-pointer">
                  {n.title}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
