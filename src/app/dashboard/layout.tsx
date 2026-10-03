"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarDays,
  Banknote,
  Briefcase,
  GitFork,
  Settings,
  LogOut,
  Zap,
  Menu,
  X,
  Bell,
  Search,
  UserCheck,
  FileText,
} from "lucide-react";

// Admin gets full enterprise modules
const ADMIN_NAV = [
  { name: "Executive Hub", href: "/dashboard", icon: LayoutDashboard },
  { name: "Employees Directory", href: "/dashboard/employees", icon: Users },
  { name: "Org Chart Hierarchy", href: "/dashboard/org-chart", icon: GitFork },
  { name: "Attendance & Punch", href: "/dashboard/attendance", icon: Clock },
  { name: "Leave Approvals", href: "/dashboard/leaves", icon: CalendarDays },
  { name: "Payroll & Payslips", href: "/dashboard/payroll", icon: Banknote },
  { name: "ATS Recruitment", href: "/dashboard/recruitment", icon: Briefcase },
  { name: "Settings & RBAC", href: "/dashboard/settings", icon: Settings },
];

// Employee only gets Self-Service Portal
const EMPLOYEE_NAV = [
  { name: "My Workplace Hub", href: "/dashboard", icon: LayoutDashboard },
  { name: "Punch & Attendance", href: "/dashboard/attendance", icon: Clock },
  { name: "My Leave Requests", href: "/dashboard/leaves", icon: CalendarDays },
  { name: "My Payslips", href: "/dashboard/payroll", icon: Banknote },
  { name: "Company Org Chart", href: "/dashboard/org-chart", icon: GitFork },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string; email: string }>({
    name: "Shivam Maurya (Admin)",
    role: "SUPER_ADMIN",
    email: "admin@workorbit.io",
  });

  useEffect(() => {
    const raw = localStorage.getItem("workorbit_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (e) {}
    }
  }, []);

  const navItems = user.role === "SUPER_ADMIN" ? ADMIN_NAV : EMPLOYEE_NAV;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950/95 border-r border-slate-800/80 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-18 px-6 flex items-center justify-between border-b border-slate-800/80 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 shadow-md shadow-emerald-500/20">
              <Zap className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">WorkOrbit</span>
              <span className={`text-[10px] ml-1.5 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                user.role === "SUPER_ADMIN"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-cyan-500/20 text-cyan-400"
              }`}>
                {user.role === "SUPER_ADMIN" ? "ADMIN" : "PORTAL"}
              </span>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Navigation according to Role */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            {user.role === "SUPER_ADMIN" ? "Executive Controls" : "Employee Self-Service"}
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-emerald-400" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Current User Pill & Switch Role */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center font-bold text-sm ${
              user.role === "SUPER_ADMIN" ? "bg-emerald-500/20 text-emerald-400" : "bg-cyan-500/20 text-cyan-400"
            }`}>
              {user.name ? user.name[0] : "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className={`text-[10px] font-bold truncate ${
                user.role === "SUPER_ADMIN" ? "text-emerald-400" : "text-cyan-400"
              }`}>{user.role}</p>
            </div>
            <Link href="/login" title="Logout or Switch" className="text-slate-400 hover:text-rose-400 transition-colors">
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
          <Link
            href="/login"
            className="block text-center text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition-colors py-1"
          >
            ⇄ Switch Role (Login)
          </Link>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white">
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block w-72">
              <Search className="h-4 w-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={user.role === "SUPER_ADMIN" ? "Search staff, payroll, jobs..." : "Search my payslips, policies..."}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold border hidden sm:inline-block ${
              user.role === "SUPER_ADMIN"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
            }`}>
              {user.role === "SUPER_ADMIN" ? "👑 Admin Mode" : "👤 Employee Mode"}
            </span>

            <button className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white relative">
              <Bell className="h-4 w-4" />
              <span className="h-2 w-2 rounded-full bg-emerald-400 absolute top-2 right-2 ring-2 ring-slate-950" />
            </button>

            <Link
              href="/"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
            >
              Public Site
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
