import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Attendance } from "@/models/Attendance";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { 
      employeeCode, 
      employeeName, 
      action,
      latitude,
      longitude,
      distanceFromOffice,
      isWithinGeofence,
      selfieImage,
      locationName
    } = await req.json();

    const today = new Date().toISOString().split("T")[0];
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (action === "IN") {
      const record = await Attendance.findOneAndUpdate(
        { employeeCode, date: today },
        {
          employeeCode,
          employeeName,
          date: today,
          clockInTime: nowTime,
          status: "PRESENT",
          location: locationName || "Greater Noida HQ (Geo Verified)",
          latitude,
          longitude,
          distanceFromOffice,
          isWithinGeofence,
          selfieImage,
        },
        { upsert: true, new: true }
      );
      return NextResponse.json({ 
        success: true, 
        record, 
        message: `Punched IN at ${nowTime} ${isWithinGeofence ? '(Within Office Radius)' : '(Remote Radius Logged)'}` 
      });
    } else {
      const record = await Attendance.findOneAndUpdate(
        { employeeCode, date: today },
        { clockOutTime: nowTime },
        { new: true }
      );
      return NextResponse.json({ success: true, record, message: `Punched OUT at ${nowTime}` });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const records = await Attendance.find().sort({ createdAt: -1 }).limit(20);
    return NextResponse.json({ success: true, records });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
