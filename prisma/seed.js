const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Departments
  const deptEngineering = await prisma.department.upsert({
    where: { code: "ENG" },
    update: {},
    create: {
      name: "Engineering & Tech",
      code: "ENG",
      description: "Software engineering, DevOps, and cloud systems",
      color: "#3b82f6",
    },
  });

  const deptHR = await prisma.department.upsert({
    where: { code: "HR" },
    update: {},
    create: {
      name: "Human Resources",
      code: "HR",
      description: "People operations, talent acquisition, culture",
      color: "#10b981",
    },
  });

  const deptSales = await prisma.department.upsert({
    where: { code: "SALES" },
    update: {},
    create: {
      name: "Sales & Marketing",
      code: "SALES",
      description: "Client growth and product revenue operations",
      color: "#f59e0b",
    },
  });

  // 2. Designations
  const desTechLead = await prisma.designation.upsert({
    where: { title: "Lead Software Architect" },
    update: {},
    create: {
      title: "Lead Software Architect",
      department: "Engineering & Tech",
    },
  });

  const desSrDev = await prisma.designation.upsert({
    where: { title: "Senior Full Stack Engineer" },
    update: {},
    create: {
      title: "Senior Full Stack Engineer",
      department: "Engineering & Tech",
    },
  });

  const desHRManager = await prisma.designation.upsert({
    where: { title: "HR Operations Director" },
    update: {},
    create: {
      title: "HR Operations Director",
      department: "Human Resources",
    },
  });

  // 3. Super Admin User & Employee
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@workorbit.io" },
    update: {},
    create: {
      email: "admin@workorbit.io",
      name: "Shivi Maurya (Admin)",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
  });

  const adminEmployee = await prisma.employee.upsert({
    where: { employeeCode: "WO-001" },
    update: {},
    create: {
      employeeCode: "WO-001",
      userId: adminUser.id,
      firstName: "Shivi",
      lastName: "Maurya",
      email: "admin@workorbit.io",
      phone: "+91 9956572394",
      status: "ACTIVE",
      departmentId: deptEngineering.id,
      designationId: desTechLead.id,
    },
  });

  // 4. Team Members
  const userEmp1 = await prisma.user.upsert({
    where: { email: "shivangi@workorbit.io" },
    update: {},
    create: {
      email: "shivangi@workorbit.io",
      name: "Shivangi Maurya",
      password: hashedPassword,
      role: "HR_ADMIN",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
  });

  const emp1 = await prisma.employee.upsert({
    where: { employeeCode: "WO-002" },
    update: {},
    create: {
      employeeCode: "WO-002",
      userId: userEmp1.id,
      firstName: "Shivangi",
      lastName: "Maurya",
      email: "shivangi@workorbit.io",
      phone: "+91 9876543210",
      status: "ACTIVE",
      departmentId: deptHR.id,
      designationId: desHRManager.id,
      managerId: adminEmployee.id,
    },
  });

  const userEmp2 = await prisma.user.upsert({
    where: { email: "alex.kumar@workorbit.io" },
    update: {},
    create: {
      email: "alex.kumar@workorbit.io",
      name: "Alex Kumar",
      password: hashedPassword,
      role: "EMPLOYEE",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
  });

  const emp2 = await prisma.employee.upsert({
    where: { employeeCode: "WO-003" },
    update: {},
    create: {
      employeeCode: "WO-003",
      userId: userEmp2.id,
      firstName: "Alex",
      lastName: "Kumar",
      email: "alex.kumar@workorbit.io",
      phone: "+91 9123456780",
      status: "ACTIVE",
      departmentId: deptEngineering.id,
      designationId: desSrDev.id,
      managerId: adminEmployee.id,
    },
  });

  // 5. Salary Structure & Payslips
  await prisma.salaryStructure.upsert({
    where: { employeeId: adminEmployee.id },
    update: {},
    create: {
      employeeId: adminEmployee.id,
      basicSalary: 85000,
      hra: 34000,
      allowance: 15000,
      pfDeduction: 10200,
      taxDeduction: 8800,
      netSalary: 115000,
    },
  });

  await prisma.salaryStructure.upsert({
    where: { employeeId: emp2.id },
    update: {},
    create: {
      employeeId: emp2.id,
      basicSalary: 55000,
      hra: 22000,
      allowance: 10000,
      pfDeduction: 6600,
      taxDeduction: 4400,
      netSalary: 76000,
    },
  });

  // 6. Job Openings
  const jobFrontend = await prisma.jobPosting.create({
    data: {
      title: "Senior Next.js & React Developer",
      departmentId: deptEngineering.id,
      location: "Hybrid (Noida / Remote)",
      type: "Full-time",
      salaryRange: "₹18,00,000 - ₹28,00,000 / yr",
      description: "Join our core engineering team to build scalable enterprise cloud microservices and reactive SaaS interfaces.",
      requirements: "3+ years in Next.js, TypeScript, Tailwind CSS, REST & GraphQL APIs.",
      isActive: true,
    },
  });

  const jobHR = await prisma.jobPosting.create({
    data: {
      title: "Talent Acquisition Specialist",
      departmentId: deptHR.id,
      location: "Onsite (Greater Noida)",
      type: "Full-time",
      salaryRange: "₹8,00,000 - ₹14,00,000 / yr",
      description: "Lead end-to-end recruitment operations, technical candidate interviews, and employee onboarding experience.",
      requirements: "2+ years technical hiring experience, knowledge of ATS pipelines.",
      isActive: true,
    },
  });

  // 7. ATS Candidates
  await prisma.candidate.createMany({
    data: [
      {
        jobId: jobFrontend.id,
        name: "Rahul Verma",
        email: "rahul.v@gmail.com",
        experience: "4 Years",
        stage: "INTERVIEW",
        rating: 4,
        notes: "Solid Next.js 14 and state management knowledge.",
      },
      {
        jobId: jobFrontend.id,
        name: "Pooja Sharma",
        email: "pooja.sharma@outlook.com",
        experience: "3 Years",
        stage: "OFFERED",
        rating: 5,
        notes: "Top performer, offer letter sent.",
      },
      {
        jobId: jobHR.id,
        name: "Vikram Mehta",
        email: "vikram.m@yahoo.com",
        experience: "5 Years",
        stage: "SCREENING",
        rating: 3,
        notes: "Initial phone screening scheduled for Monday.",
      },
    ],
  });

  // 8. Sample Attendance Records
  await prisma.attendanceRecord.createMany({
    data: [
      {
        employeeId: adminEmployee.id,
        clockIn: new Date(Date.now() - 8 * 3600 * 1000),
        clockOut: new Date(),
        totalHours: 8.0,
        status: "PRESENT",
        location: "WorkOrbit HQ (Greater Noida)",
      },
      {
        employeeId: emp1.id,
        clockIn: new Date(Date.now() - 7.5 * 3600 * 1000),
        clockOut: new Date(),
        totalHours: 7.5,
        status: "PRESENT",
        location: "Remote / Web Punch",
      },
      {
        employeeId: emp2.id,
        clockIn: new Date(Date.now() - 9 * 3600 * 1000),
        clockOut: new Date(),
        totalHours: 8.5,
        status: "PRESENT",
        location: "WorkOrbit HQ",
      },
    ],
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
