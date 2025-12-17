// File: models/Weather.ts
// Vị trí: Thư mục gốc/models (Nếu chưa có folder 'models', hãy tạo mới)
import mongoose, { Schema, Document, Model } from "mongoose";

// Interface cho dữ liệu thời tiết
export interface IWeatherData extends Document {
  location: {
    name: string;
    lat: number;
    lon: number;
    code: string; // Khóa định danh (VD: 'hanoi-vn')
  };
  provider: string; // 'open-meteo', 'weather-api', etc.
  current: {
    temp_c: number;
    condition: string;
    humidity: number;
    wind_kph: number;
    precip_mm: number;
    cloud_cover: number;
    updated_at: Date;
  };
  forecast: Array<{
    time: Date;
    temp_c: number;
    precip_mm: number;
    precip_prob: number;
  }>;
  raw_response?: Record<string, unknown>; // Thay thế any
  fetched_at: Date;
}

const WeatherSchema = new Schema<IWeatherData>(
  {
    location: {
      name: { type: String, required: true },
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
      code: { type: String, required: true, index: true }, // Index để query nhanh
    },
    provider: { type: String, required: true },
    current: {
      temp_c: Number,
      condition: String,
      humidity: Number,
      wind_kph: Number,
      precip_mm: Number,
      cloud_cover: Number,
      updated_at: Date,
    },
    forecast: [
      {
        time: Date,
        temp_c: Number,
        precip_mm: Number,
        precip_prob: Number,
      },
    ],
    raw_response: Object,
    fetched_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Tự động có createdAt, updatedAt
  },
);

// Compound Index: Tìm nhanh theo Location + Provider
WeatherSchema.index({ "location.code": 1, provider: 1 }, { unique: true });

// Tránh lỗi OverwriteModel khi hot reload trong Next.js
const Weather: Model<IWeatherData> =
  mongoose.models.Weather ||
  mongoose.model<IWeatherData>("Weather", WeatherSchema);

export default Weather;
