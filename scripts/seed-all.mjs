import mongoose from "mongoose";

const uri =
  "mongodb://sanumaurya123jyg_db_user:RkfqkEDN8Ecg5NRZ@ac-b0ck3uh-shard-00-00.ra4wlih.mongodb.net:27017,ac-b0ck3uh-shard-00-01.ra4wlih.mongodb.net:27017,ac-b0ck3uh-shard-00-02.ra4wlih.mongodb.net:27017/crewzen_saas?ssl=true&replicaSet=atlas-dwso5p-shard-0&authSource=admin&appName=Cluster0";

async function seedAll() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  // 1. Employees collection
  const empCount = await db.collection("employees").countDocuments();
  if (empCount === 0) {
    await db.collection("employees").insertMany([
      {
        employeeCode: "WO-001",
        name: "Shivi Maurya",
        email: "shivi@crewzen.saas",
        department: "Engineering & Tech",
        designation: "Lead Software Architect",
        location: "HQ / Global",
        status: "ACTIVE",
        salary: 150000,
        createdAt: new Date(),
      },
      {
        employeeCode: "WO-002",
        name: "Shivangi Maurya",
        email: "shivangi@crewzen.saas",
        department: "Human Resources",
        designation: "HR Operations Director",
        location: "Greater Noida HQ",
        status: "ACTIVE",
        salary: 110000,
        createdAt: new Date(),
      },
      {
        employeeCode: "WO-003",
        name: "Alex Kumar",
        email: "alex@crewzen.saas",
        department: "Engineering & Tech",
        designation: "Sr. Full Stack Engineer",
        location: "Bengaluru Tech Center",
        status: "ACTIVE",
        salary: 125000,
        createdAt: new Date(),
      },
      {
        employeeCode: "WO-004",
        name: "Ananya Verma",
        email: "ananya.v@crewzen.saas",
        department: "Product Experience",
        designation: "Head of UX Design",
        location: "Gurugram Hub",
        status: "ACTIVE",
        salary: 105000,
        createdAt: new Date(),
      },
    ]);
    console.log("SEEDED: employees collection");
  }

  // 2. Attendances collection
  const attCount = await db.collection("attendances").countDocuments();
  if (attCount === 0) {
    await db.collection("attendances").insertMany([
      {
        employeeCode: "WO-001",
        employeeName: "Shivi Maurya",
        date: "2026-10-14",
        clockInTime: "09:02 AM",
        status: "PRESENT",
        location: "Greater Noida HQ",
        workHours: 8.5,
        createdAt: new Date(),
      },
      {
        employeeCode: "WO-002",
        employeeName: "Shivangi Maurya",
        date: "2026-10-14",
        clockInTime: "09:14 AM",
        status: "PRESENT",
        location: "Greater Noida HQ",
        workHours: 8.0,
        createdAt: new Date(),
      },
      {
        employeeCode: "WO-003",
        employeeName: "Alex Kumar",
        date: "2026-10-14",
        clockInTime: "09:30 AM",
        status: "PRESENT",
        location: "Remote Web Punch",
        workHours: 7.8,
        createdAt: new Date(),
      },
    ]);
    console.log("SEEDED: attendances collection");
  }

  // 3. Leave Requests collection
  const leaveCount = await db.collection("leaverequests").countDocuments();
  if (leaveCount === 0) {
    await db.collection("leaverequests").insertMany([
      {
        employeeCode: "WO-003",
        employeeName: "Alex Kumar",
        leaveType: "SICK",
        startDate: "2026-10-15",
        endDate: "2026-10-16",
        totalDays: 2,
        reason: "Viral recovery and rest",
        status: "PENDING",
        createdAt: new Date(),
      },
      {
        employeeCode: "WO-004",
        employeeName: "Ananya Verma",
        leaveType: "CASUAL",
        startDate: "2026-10-20",
        endDate: "2026-10-21",
        totalDays: 2,
        reason: "Family festive trip",
        status: "APPROVED",
        createdAt: new Date(),
      },
    ]);
    console.log("SEEDED: leaverequests collection");
  }

  // 4. Users collection
  const userCount = await db.collection("users").countDocuments();
  if (userCount === 0) {
    await db.collection("users").insertOne({
      name: "Shivi Maurya",
      email: "admin@workorbit.io",
      role: "SUPER_ADMIN",
      avatar: "/images/crewzen-logo.png",
      createdAt: new Date(),
    });
    console.log("SEEDED: users collection");
  }

  const collections = await db.listCollections().toArray();
  console.log("ALL_CURRENT_COLLECTIONS_IN_ATLAS:", collections.map((c) => c.name));
  await mongoose.disconnect();
}

seedAll().catch((e) => {
  console.error("Seed error:", e);
  process.exit(1);
});
