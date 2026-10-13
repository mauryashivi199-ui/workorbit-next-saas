import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { LeaveRequest } from "@/models/LeaveRequest";

export async function GET() {
  try {
    await connectToDatabase();
    const leaves = await LeaveRequest.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, leaves });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { employeeCode, employeeName, leaveType, startDate, endDate, totalDays, reason } = body;

    const newLeave = await LeaveRequest.create({
      employeeCode: employeeCode || "WO-001",
      employeeName: employeeName || "Shivi Maurya",
      leaveType: leaveType || "CASUAL",
      startDate: startDate || new Date().toISOString().split("T")[0],
      endDate: endDate || new Date().toISOString().split("T")[0],
      totalDays: Number(totalDays) || 1,
      reason: reason || "Personal work",
      status: "PENDING",
    });

    return NextResponse.json({ success: true, leave: newLeave }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const { id, status } = await req.json();

    const updated = await LeaveRequest.findByIdAndUpdate(id, { status }, { new: true });
    return NextResponse.json({ success: true, leave: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
