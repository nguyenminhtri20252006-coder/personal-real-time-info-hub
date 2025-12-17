import React from "react";
import { Newspaper } from "lucide-react";
import { Card } from "@/components/ui/card";

interface NewsItem {
  id: number;
  source: string;
  time: string;
  title: string;
}

interface NewsFeedProps {
  data: NewsItem[];
  theme: "swiss" | "cyberpunk";
}

export const NewsFeed = ({ data, theme }: NewsFeedProps) => {
  return (
    <Card
      theme={theme}
      className="h-full flex flex-col"
      title="Latest News"
      icon={Newspaper}
    >
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 scrollbar-hide">
        {data.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="flex justify-between items-start mb-1">
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  theme === "cyberpunk"
                    ? "bg-cyan-900/50 text-cyan-300"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {item.source}
              </span>
              <span className="text-[10px] opacity-50">{item.time}</span>
            </div>
            <h4
              className={`text-sm font-medium leading-snug group-hover:underline ${
                theme === "cyberpunk" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {item.title}
            </h4>
            <div
              className={`h-[1px] w-full mt-3 ${
                theme === "cyberpunk" ? "bg-white/10" : "bg-gray-100"
              }`}
            />
          </div>
        ))}
      </div>
      <div
        className={`mt-2 pt-2 text-center text-xs font-bold cursor-pointer uppercase tracking-widest ${
          theme === "cyberpunk"
            ? "text-cyan-500 hover:text-cyan-400"
            : "text-blue-600 hover:text-blue-700"
        }`}
      >
        View All Sources
      </div>
    </Card>
  );
};
