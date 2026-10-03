# 🚀 WorkOrbit SaaS 2.0 (Next-Gen Enterprise HRMS)

An ultra-modern, lightning-fast Workforce Automation and HR Management System built using **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma ORM**.

---

## 🌟 Modules Implemented

1. **Modern SaaS Landing Page (`/`)**:
   - Hero banner with Bento-Grid feature showcase.
   - Transparent pricing plans with feature matrix.
   - Quick sign-in and public navigation.

2. **Public Career Portal (`/careers`)**:
   - Public job listings with department tags and compensation badges.
   - 1-Click candidate job application modal form.

3. **Multi-Role Authentication (`/login`)**:
   - Quick toggle for Super Admin / Employee portal access.
   - SHA-256 secure encrypted sessions.

4. **Executive Workforce Command Center (`/dashboard`)**:
   - Live virtual clock-in & punch terminal.
   - Real-time attendance KPIs, active employee count, and monthly payroll burn rate.
   - Live stream of employee clock-in activities.

5. **Employee Directory (`/dashboard/employees`)**:
   - Searchable, department-filtered employee list.
   - Quick Onboard modal with automatic employee code generation (`WO-xxx`).

6. **Visual Org Hierarchy (`/dashboard/org-chart`)**:
   - Tree chart displaying leadership, department heads, and reporting subordinates.

7. **Smart Attendance & Shifts (`/dashboard/attendance`)**:
   - Daily attendance register, total hour calculations, and IP/location tags.

8. **Leave Quotas & Approvals (`/dashboard/leaves`)**:
   - Casual (CL), Sick (SL), and Earned (EL) balance meters.
   - HR Approval / Rejection engine with real-time status updates.

9. **Automated Payroll Engine (`/dashboard/payroll`)**:
   - 1-Click monthly payroll run batch calculation.
   - Interactive digital payslip with PDF export preview.

10. **Recruitment ATS Pipeline (`/dashboard/recruitment`)**:
    - Kanban stages: `Applied` ➔ `Screening` ➔ `Interview` ➔ `Offered` ➔ `Hired`.
    - One-click candidate pipeline stage transitions.

11. **System Settings & RBAC (`/dashboard/settings`)**:
    - Organization metadata, shift rules, and permission policies.

---

## ⚡ Quick Start

### 1. Launch directly:
Double-click `START_WORKORBIT.bat` or run:
```bash
npm run dev
```

### 2. Open in browser:
- Landing Page: `http://localhost:3000`
- Careers: `http://localhost:3000/careers`
- Dashboard: `http://localhost:3000/dashboard`
- Admin Login: `http://localhost:3000/login`
