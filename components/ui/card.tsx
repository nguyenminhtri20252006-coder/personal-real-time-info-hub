import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: LucideIcon;
  theme: "swiss" | "cyberpunk";
}

export const Card = ({
  children,
  className,
  title,
  icon: Icon,
  theme,
}: CardProps) => {
  // Style cho chế độ Cyberpunk
  const cyberpunkStyle =
    "bg-black/80 border-cyan-500/30 text-cyan-50 shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-md hover:border-cyan-400/60";

  // Style cho chế độ Swiss (Minimalist)
  const swissStyle =
    "bg-white border-gray-200 text-gray-800 shadow-sm hover:shadow-md";

  return (
    <div
      className={cn(
        "relative p-4 rounded-2xl border transition-all duration-500 overflow-hidden group",
        theme === "cyberpunk" ? cyberpunkStyle : swissStyle,
        className,
      )}
    >
      {/* Card Header */}
      {(title || Icon) && (
        <div className="flex items-center justify-between mb-3 opacity-70">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
            {Icon && <Icon size={14} />}
            <span>{title}</span>
          </div>
          {theme === "cyberpunk" && (
            <div className="h-1 w-1 bg-cyan-500 rounded-full animate-pulse" />
          )}
        </div>
      )}

      {/* Card Content */}
      <div className="h-full w-full">{children}</div>

      {/* Cyberpunk Decor Element */}
      {theme === "cyberpunk" && (
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-tl-xl pointer-events-none" />
      )}
    </div>
  );
};
