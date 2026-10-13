import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://sanumaurya123jyg_db_user:RkfqkEDN8Ecg5NRZ@cluster0.ra4wlih.mongodb.net/crewzen_saas?retryWrites=true&w=majority&appName=Cluster0";

async function seedInitialMongo() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully!");

  const db = mongoose.connection.db;

  // 1. Create crewzen_saas collections
  const collections = await db.listCollections().toArray();
  const colNames = collections.map((c) => c.name);

  if (!colNames.includes("users")) {
    await db.createCollection("users");
    await db.collection("users").insertOne({
      name: "Shivi Maurya",
      email: "shivi@crewzen.saas",
      role: "SUPER_ADMIN",
      createdAt: new Date(),
    });
    console.log("Created users collection with Admin Shivi Maurya");
  }

  if (!colNames.includes("jobapplications")) {
    await db.createCollection("jobapplications");
    await db.collection("jobapplications").insertOne({
      jobId: "job-1",
      jobTitle: "Senior Next.js Developer",
      candidateName: "Aman Verma",
      email: "aman@example.com",
      phone: "+91 9876543210",
      qualification: "B.Tech / CS",
      experience: "3 Years",
      noticePeriod: "15 Days",
      resumeFileName: "Aman_Resume.pdf",
      skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
      stage: "INTERVIEW",
      rating: 5,
      createdAt: new Date(),
    });
    console.log("Created jobapplications collection with sample ATS candidate");
  }

  if (!colNames.includes("attendances")) {
    await db.createCollection("attendances");
    await db.collection("attendances").insertOne({
      employeeCode: "WO-001",
      employeeName: "Shivi Maurya",
      date: new Date().toISOString().split("T")[0],
      clockInTime: "09:00 AM",
      status: "PRESENT",
      location: "Greater Noida HQ",
    });
    console.log("Created attendances collection");
  }

  console.log("All collections seeded successfully into MongoDB Atlas!");
  await mongoose.disconnect();
}

seedInitialMongo().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
