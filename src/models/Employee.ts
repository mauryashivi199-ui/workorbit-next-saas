import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  employeeCode: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  designation: string;
  location: string;
  joiningDate: Date;
  status: "ACTIVE" | "ON_LEAVE" | "RESIGNED" | "TERMINATED";
  salary: number;
  skills: string[];
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    employeeCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    location: { type: String, default: "Greater Noida HQ" },
    joiningDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["ACTIVE", "ON_LEAVE", "RESIGNED", "TERMINATED"],
      default: "ACTIVE",
    },
    salary: { type: Number, default: 0 },
    skills: [{ type: String }],
  },
  { timestamps: true }
);

export const Employee = mongoose.models.Employee || mongoose.model<IEmployee>("Employee", EmployeeSchema);
