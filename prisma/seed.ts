import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding local database...");

  // 1. Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: "admin@workorbit.io" },
    update: {},
    create: {
      email: "admin@workorbit.io",
      password: "admin_secure_password",
      name: "Shivi Maurya",
      role: "SUPER_ADMIN",
    },
  });

  // 2. Create Departments
  const engDept = await prisma.department.upsert({
    where: { code: "ENG" },
    update: {},
    create: {
      name: "Engineering & Tech",
      code: "ENG",
      description: "Cloud microservices, Next.js platform and web applications",
      color: "#10b981",
    },
  });

  const hrDept = await prisma.department.upsert({
    where: { code: "HR" },
    update: {},
    create: {
      name: "Human Resources",
      code: "HR",
      description: "Talent acquisition, payroll and workplace culture",
      color: "#8b5cf6",
    },
  });

  // 3. Create Sample Employees
  await prisma.employee.upsert({
    where: { employeeCode: "WO-001" },
    update: {},
    create: {
      employeeCode: "WO-001",
      userId: admin.id,
      firstName: "Shivi",
      lastName: "Maurya",
      email: "admin@workorbit.io",
      phone: "+91 9876543210",
      departmentId: engDept.id,
      status: "ACTIVE",
    },
  });

  // 4. Create Job Postings
  await prisma.jobPosting.createMany({
    data: [
      {
        title: "Senior Next.js & React Developer",
        departmentId: engDept.id,
        location: "Hybrid (Noida / Remote)",
        type: "Full-time",
        salaryRange: "₹18,00,000 - ₹28,00,000 / yr",
        description: "Build scalable cloud microservices, reactive UI workflows, and modern SaaS components with Next.js 14.",
        requirements: "React, Next.js, TypeScript, Tailwind CSS, PostgreSQL",
      },
      {
        title: "HR Operations & Talent Specialist",
        departmentId: hrDept.id,
        location: "Onsite (Greater Noida)",
        type: "Full-time",
        salaryRange: "₹8,00,000 - ₹14,00,000 / yr",
        description: "Manage end-to-end recruitment lifecycle, employee onboarding pipelines, and workplace operations.",
        requirements: "Recruitment, People Ops, ATS, Employee Engagement",
      },
    ],
  });

  console.log("Local database successfully seeded with initial Admin and Data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
