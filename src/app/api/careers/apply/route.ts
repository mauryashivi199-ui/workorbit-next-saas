import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { JobApplication } from "@/models/JobApplication";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const {
      jobId,
      jobTitle,
      candidateName,
      email,
      phone,
      qualification,
      experience,
      noticePeriod,
      resumeFileName,
      skills,
      portfolioUrl,
      coverLetter,
    } = body;

    if (!candidateName || !email || !phone || !resumeFileName) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 400 }
      );
    }

    const application = await JobApplication.create({
      jobId: jobId || "job-1",
      jobTitle: jobTitle || "Open Role",
      candidateName,
      email,
      phone,
      qualification,
      experience,
      noticePeriod,
      resumeFileName,
      skills: skills || [],
      portfolioUrl: portfolioUrl || "",
      coverLetter: coverLetter || "",
      stage: "APPLIED",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted and stored in MongoDB successfully!",
        data: application,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Job Application Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit application to database." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch candidates." },
      { status: 500 }
    );
  }
}
