import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MarketItem {
  symbol: string;
  price: string;
  change: string;
  percent: string;
  up: boolean;
}

interface MarketTickerProps {
  data: MarketItem[];
  theme: "swiss" | "cyberpunk";
}

export const MarketTicker = ({ data, theme }: MarketTickerProps) => {
  return (
    <Card theme={theme} className="h-full" title="Markets" icon={TrendingUp}>
      <div className="space-y-3 mt-2">
        {data.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between p-2 rounded-lg ${
              theme === "cyberpunk"
                ? "bg-white/5 hover:bg-white/10"
                : "bg-gray-50 hover:bg-gray-100"
            } transition-colors cursor-pointer`}
          >
            <div>
              <div className="font-bold text-sm">{m.symbol}</div>
              <div className="text-xs opacity-60">{m.price}</div>
            </div>
            <div
              className={`text-right ${
                m.up ? "text-green-500" : "text-red-500"
              }`}
            >
              <div className="font-bold text-sm flex items-center justify-end gap-1">
                {m.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {m.percent}
              </div>
              <div className="text-xs">{m.change}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
