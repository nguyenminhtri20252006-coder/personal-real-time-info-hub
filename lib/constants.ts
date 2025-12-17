// --- MOCK DATA FOR DEVELOPMENT ---

export const MOCK_WEATHER = {
  temp: 28,
  condition: "Partly Cloudy",
  humidity: 65,
  wind: 12,
  location: "Ho Chi Minh City, VN",
};

export const MOCK_MARKETS = [
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

export const MOCK_NEWS = [
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
  {
    id: 4,
    source: "Reuters",
    time: "3h ago",
    title: "Oil prices surge amid geopolitical tensions in Middle East.",
  },
  {
    id: 5,
    source: "CafeF",
    time: "4h ago",
    title: "Thị trường chứng khoán đón dòng vốn ngoại trở lại.",
  },
];
