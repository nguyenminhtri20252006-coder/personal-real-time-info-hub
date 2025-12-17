// File: models/SystemLog.ts
// Vị trí: Thư mục gốc/models
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISystemLog extends Document {
  module: string;
  action: string;
  status: "success" | "error" | "warning";
  message: string;
  metadata?: Record<string, unknown>; // Thay thế any bằng Record
  created_at: Date;
}

const SystemLogSchema = new Schema<ISystemLog>({
  module: { type: String, required: true, index: true },
  action: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["success", "error", "warning"],
  },
  message: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed }, // Mongoose Mixed maps to flexible object
  created_at: { type: Date, default: Date.now, expires: 60 * 60 * 48 },
});

const SystemLog: Model<ISystemLog> =
  mongoose.models.SystemLog ||
  mongoose.model<ISystemLog>("SystemLog", SystemLogSchema);

export default SystemLog;
