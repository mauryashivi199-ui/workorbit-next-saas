import mongoose, { Schema, Document } from "mongoose";

export interface IJobApplication extends Document {
  jobId: string;
  jobTitle: string;
  candidateName: string;
  email: string;
  phone: string;
  qualification: string;
  experience: string;
  noticePeriod: string;
  resumeFileName: string;
  resumeUrl?: string;
  skills: string[];
  portfolioUrl?: string;
  coverLetter?: string;
  stage: "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFERED" | "HIRED" | "REJECTED";
  rating: number;
  createdAt: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    jobId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    candidateName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: String, required: true },
    noticePeriod: { type: String, required: true },
    resumeFileName: { type: String, required: true },
    resumeUrl: { type: String },
    skills: [{ type: String }],
    portfolioUrl: { type: String },
    coverLetter: { type: String },
    stage: {
      type: String,
      enum: ["APPLIED", "SCREENING", "INTERVIEW", "OFFERED", "HIRED", "REJECTED"],
      default: "APPLIED",
    },
    rating: { type: Number, default: 4 },
  },
  { timestamps: true }
);

export const JobApplication =
  mongoose.models.JobApplication ||
  mongoose.model<IJobApplication>("JobApplication", JobApplicationSchema);
