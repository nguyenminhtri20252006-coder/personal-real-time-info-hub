import React, { useState, useEffect } from "react";
import { Cpu, Wifi, Battery } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SystemStatusProps {
  theme: "swiss" | "cyberpunk";
}

export const SystemStatus = ({ theme }: SystemStatusProps) => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Sử dụng requestAnimationFrame hoặc setTimeout để tránh lỗi "synchronous setState"
    // trong React Strict Mode. Điều này đảm bảo state được update ở tick tiếp theo.
    const frameId = requestAnimationFrame(() => {
      setTime(new Date());
    });

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(timer);
    };
  }, []);

  if (!time) {
    return (
      <Card
        theme={theme}
        className="h-full flex flex-col justify-center items-center text-center p-6 relative animate-pulse"
      >
        <div className="h-12 w-32 bg-gray-200/20 rounded mb-2"></div>
        <div className="h-4 w-24 bg-gray-200/20 rounded"></div>
      </Card>
    );
  }

  return (
    <Card
      theme={theme}
      className="h-full flex flex-col justify-center items-center text-center p-6 relative"
    >
      <div className="absolute top-3 left-4 flex gap-2">
        <div
          className={`h-2 w-2 rounded-full ${
            theme === "cyberpunk"
              ? "bg-green-500 shadow-[0_0_8px_#22c55e]"
              : "bg-green-500"
          }`}
        />
        <span className="text-[10px] opacity-60 font-mono">ONLINE</span>
      </div>

      <div
        className={`text-5xl font-black tracking-tight font-mono mb-1 ${
          theme === "cyberpunk"
            ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
            : "text-gray-900"
        }`}
      >
        {time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })}
      </div>
      <div className="text-lg opacity-60 font-medium mb-6">
        {time.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </div>

      <div className="grid grid-cols-3 gap-6 w-full px-4">
        <div className="flex flex-col items-center gap-1">
          <Cpu
            size={16}
            className={
              theme === "cyberpunk" ? "text-pink-500" : "text-gray-400"
            }
          />
          <span className="text-[10px] font-mono">12%</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Wifi
            size={16}
            className={
              theme === "cyberpunk" ? "text-cyan-500" : "text-gray-400"
            }
          />
          <span className="text-[10px] font-mono">54ms</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Battery
            size={16}
            className={
              theme === "cyberpunk" ? "text-green-500" : "text-gray-400"
            }
          />
          <span className="text-[10px] font-mono">98%</span>
        </div>
      </div>
    </Card>
  );
};
