import mongoose, { Schema, Document } from "mongoose";

export interface ILeaveRequest extends Document {
  employeeCode: string;
  employeeName: string;
  leaveType: "SICK" | "CASUAL" | "PAID" | "FESTIVE";
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  appliedAt: Date;
}

const LeaveRequestSchema = new Schema<ILeaveRequest>(
  {
    employeeCode: { type: String, required: true },
    employeeName: { type: String, required: true },
    leaveType: {
      type: String,
      enum: ["SICK", "CASUAL", "PAID", "FESTIVE"],
      required: true,
    },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    totalDays: { type: Number, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const LeaveRequest =
  mongoose.models.LeaveRequest ||
  mongoose.model<ILeaveRequest>("LeaveRequest", LeaveRequestSchema);
