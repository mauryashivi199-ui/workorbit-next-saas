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
  Calendar,
  Award,
  Megaphone,
  Sun,
  Building2,
  ChevronDown,
  Building,
  TrendingUp,
} from "lucide-react";

interface NavGroup {
  category: string;
  items: {
    name: string;
    href: string;
    icon: any;
  }[];
}

const ADMIN_NAV_GROUPS: NavGroup[] = [
  {
    category: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
    ],
  },
  {
    category: "Workforce Management",
    items: [
      { name: "Employees", href: "/dashboard/employees", icon: Users },
      { name: "Organization Chart", href: "/dashboard/org-chart", icon: GitFork },
      { name: "Attendance Records", href: "/dashboard/attendance", icon: Clock },
      { name: "Leave Management", href: "/dashboard/leaves", icon: CalendarDays },
    ],
  },
  {
    category: "Organization Structure",
    items: [
      { name: "Departments", href: "/dashboard/departments", icon: Building2 },
      { name: "Holidays Calendar", href: "/dashboard/holidays", icon: Sun },
      { name: "Announcements", href: "/dashboard/announcements", icon: Megaphone },
    ],
  },
  {
    category: "Talent & Growth",
    items: [
      { name: "Recruitment (ATS)", href: "/dashboard/recruitment", icon: Briefcase },
      { name: "Awards & Recognition", href: "/dashboard/awards", icon: Award },
      { name: "Promotions", href: "/dashboard/promotions", icon: TrendingUp },
    ],
  },
  {
    category: "Finance & Assets",
    items: [
      { name: "Payroll Management", href: "/dashboard/payroll", icon: Banknote },
      { name: "Settings & RBAC", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

const EMPLOYEE_NAV_GROUPS: NavGroup[] = [
  {
    category: "My Workplace",
    items: [
      { name: "My Workplace Hub", href: "/dashboard", icon: LayoutDashboard },
      { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
      { name: "Punch & Attendance", href: "/dashboard/attendance", icon: Clock },
      { name: "My Leaves", href: "/dashboard/leaves", icon: CalendarDays },
      { name: "My Payslips", href: "/dashboard/payroll", icon: Banknote },
      { name: "Org Chart", href: "/dashboard/org-chart", icon: GitFork },
      { name: "Announcements", href: "/dashboard/announcements", icon: Megaphone },
      { name: "Company Holidays", href: "/dashboard/holidays", icon: Sun },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string; email: string }>({
    name: "Shivi Maurya (Admin)",
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

  const navGroups = user.role === "SUPER_ADMIN" ? ADMIN_NAV_GROUPS : EMPLOYEE_NAV_GROUPS;

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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80 py-4">
          <Link href="/" className="flex items-center py-1">
            <img
              src="/images/crewzen-logo.png"
              alt="Crewzen Workforce Management Platform"
              className="h-14 w-auto max-w-[210px] object-contain rounded-lg"
            />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Navigation with Categories according to Role */}
        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.category} className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                {group.category}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
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
            </div>
          ))}
        </nav>

        {/* Current User Pill & Switch Role */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center font-bold text-sm ${
              user.role === "SUPER_ADMIN" ? "bg-emerald-500/20 text-emerald-400" : "bg-cyan-500/20 text-cyan-400"
            }`}>
              {user.name ? user.name[0] : "S"}
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

            {/* Notification Bell with Interactive Dropdown Popup */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-850 active:scale-95 transition-all relative"
                aria-label="Notifications"
                title="Notifications"
              >
                <Bell className="h-4.5 w-4.5 text-emerald-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 absolute top-2 right-2 ring-2 ring-slate-950 animate-pulse" />
              </button>

              {/* Notification Popover Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 p-4 space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-emerald-400" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Crewzen Notifications (3 New)
                      </h4>
                    </div>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-slate-400 hover:text-white text-xs p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">Leave Approved</span>
                        <span className="text-[10px] text-slate-500">10m ago</span>
                      </div>
                      <p className="text-xs text-slate-200">
                        Pooja Sharma's sick leave request has been approved by HR.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase">New Candidate</span>
                        <span className="text-[10px] text-slate-500">45m ago</span>
                      </div>
                      <p className="text-xs text-slate-200">
                        New application received for Lead Next.js Developer role with auto-extracted skills.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-400 uppercase">Diwali Bonus</span>
                        <span className="text-[10px] text-slate-500">2h ago</span>
                      </div>
                      <p className="text-xs text-slate-200">
                        Diwali festive bonus schedule circular has been broadcasted to all branches.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 text-center">
                    <Link
                      href="/dashboard/announcements"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-[11px] font-semibold text-emerald-400 hover:underline"
                    >
                      View All Circulars & Announcements →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
            >
              Public Site
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
