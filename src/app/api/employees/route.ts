import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Employee } from "@/models/Employee";

export async function GET() {
  try {
    await connectToDatabase();
    const employees = await Employee.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, employees });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { name, email, phone, department, designation, salary, location } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and Email are required." }, { status: 400 });
    }

    const count = await Employee.countDocuments();
    const employeeCode = `WO-${String(count + 1).padStart(3, "0")}`;

    const newEmp = await Employee.create({
      employeeCode,
      name,
      email,
      phone: phone || "",
      department: department || "Engineering & Tech",
      designation: designation || "Software Engineer",
      location: location || "Greater Noida HQ",
      salary: Number(salary) || 50000,
      status: "ACTIVE",
    });

    return NextResponse.json({ success: true, employee: newEmp }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
