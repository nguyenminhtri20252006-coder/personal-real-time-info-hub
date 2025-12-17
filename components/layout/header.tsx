import React from "react";
import { Zap, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  theme: "swiss" | "cyberpunk";
  setTheme: (theme: "swiss" | "cyberpunk") => void;
}

export const Header = ({ theme, setTheme }: HeaderProps) => {
  return (
    <header className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
      {/* Logo Area */}
      <div>
        <h1
          className={cn(
            "text-2xl md:text-3xl font-black tracking-tight transition-colors duration-500",
            theme === "cyberpunk"
              ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600"
              : "text-gray-900",
          )}
        >
          INFO HUB
          <span className="text-xs align-top opacity-50 ml-1">v1.0</span>
        </h1>
        <p className="text-xs md:text-sm opacity-60 mt-1">
          Personal Real-Time Dashboard
        </p>
      </div>

      {/* Action Area */}
      <div className="flex items-center gap-4">
        {/* Live Indicator */}
        <div
          className={cn(
            "hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border transition-colors duration-500",
            theme === "cyberpunk"
              ? "border-cyan-900 bg-cyan-950/30 text-cyan-400"
              : "border-gray-200 bg-white text-gray-500",
          )}
        >
          <span className="relative flex h-2 w-2">
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                theme === "cyberpunk" ? "bg-cyan-400" : "bg-green-400",
              )}
            ></span>
            <span
              className={cn(
                "relative inline-flex rounded-full h-2 w-2",
                theme === "cyberpunk" ? "bg-cyan-500" : "bg-green-500",
              )}
            ></span>
          </span>
          Live Connection
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === "swiss" ? "cyberpunk" : "swiss")}
          className={cn(
            "p-2 rounded-full transition-all duration-300",
            theme === "cyberpunk"
              ? "bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.6)] hover:bg-yellow-300"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300",
          )}
          title="Toggle Theme"
        >
          {theme === "cyberpunk" ? <Zap size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
};
