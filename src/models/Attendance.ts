import mongoose, { Schema, Document } from "mongoose";

export interface IAttendance extends Document {
  employeeCode: string;
  employeeName: string;
  date: string;
  clockInTime: string;
  clockOutTime?: string;
  status: "PRESENT" | "HALF_DAY" | "LATE" | "ON_LEAVE";
  ipAddress?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  distanceFromOffice?: number;
  isWithinGeofence?: boolean;
  selfieImage?: string; // base64 photo capture
  workHours?: number;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    employeeCode: { type: String, required: true },
    employeeName: { type: String, required: true },
    date: { type: String, required: true },
    clockInTime: { type: String, required: true },
    clockOutTime: { type: String },
    status: {
      type: String,
      enum: ["PRESENT", "HALF_DAY", "LATE", "ON_LEAVE"],
      default: "PRESENT",
    },
    ipAddress: { type: String },
    location: { type: String, default: "Greater Noida HQ" },
    latitude: { type: Number },
    longitude: { type: Number },
    distanceFromOffice: { type: Number },
    isWithinGeofence: { type: Boolean, default: true },
    selfieImage: { type: String },
    workHours: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Attendance =
  mongoose.models.Attendance || mongoose.model<IAttendance>("Attendance", AttendanceSchema);
