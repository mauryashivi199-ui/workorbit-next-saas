"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Clock,
  TrendingUp,
  Banknote,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Play,
  Square,
  Sparkles,
  CalendarDays,
  FileText,
  Building,
  ShieldCheck,
} from "lucide-react";

export default function DynamicDashboard() {
  const [user, setUser] = useState({
    name: "Shivi Maurya (Admin)",
    role: "SUPER_ADMIN",
    email: "admin@workorbit.io",
  });
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("workorbit_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (e) {}
    }
  }, []);

  const toggleClock = () => {
    if (!clockedIn) {
      setClockedIn(true);
      setClockTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } else {
      setClockedIn(false);
      setClockTime(null);
    }
  };

  const isAdmin = user.role === "SUPER_ADMIN";

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome & Quick Punch Bar */}
      <div className={`p-6 md:p-8 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden ${
        isAdmin
          ? "bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border-slate-800"
          : "bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border-slate-800"
      }`}>
        <div className="space-y-1 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-1 bg-emerald-500/10 text-emerald-400">
            <Sparkles className="h-3 w-3" />
            {isAdmin ? "Company Executive & Admin Hub" : "Employee Self-Service Portal"}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Welcome back, {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-xs md:text-sm text-slate-400">
            {isAdmin
              ? "Crewzen live telemetry: 3 active branches, 48 total employees, 0 pending payroll issues."
              : "Software Engineering Division • Reporting to Shivi Maurya • Shift: 09:00 AM - 06:00 PM"}
          </p>
        </div>

        {/* Web Punch Widget */}
        <div className="z-10 flex items-center gap-4 bg-slate-950/80 border border-slate-800 p-3 rounded-2xl">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Daily Web Clock Punch</div>
            <div className="text-xs font-semibold text-white mt-0.5">
              {clockedIn ? `Punched In at ${clockTime}` : "Shift Status: Not Clocked In"}
            </div>
          </div>
          <button
            onClick={toggleClock}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
              clockedIn
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30"
                : "bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-emerald-500/20"
            }`}
          >
            {clockedIn ? (
              <>
                <Square className="h-3.5 w-3.5 fill-current" />
                <span>Punch Out</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Punch In Now</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ===================== ADMIN VIEW ===================== */}
      {isAdmin ? (
        <>
          {/* Admin KPI Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/40">
              <div className="flex items-center justify-between text-emerald-400 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider">Payroll This Month</span>
                <Banknote className="h-4 w-4" />
              </div>
              <div className="text-xl font-extrabold text-white">₹38.4L</div>
              <div className="text-[10px] text-emerald-400/80 mt-1">1 run scheduled</div>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-900/40">
              <div className="flex items-center justify-between text-cyan-400 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider">Total Employees</span>
                <Users className="h-4 w-4" />
              </div>
              <div className="text-xl font-extrabold text-white">48</div>
              <div className="text-[10px] text-cyan-400/80 mt-1">+4 this month</div>
            </div>

            <div className="p-5 rounded-2xl bg-teal-950/20 border border-teal-900/40">
              <div className="flex items-center justify-between text-teal-400 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider">Branches</span>
                <Building className="h-4 w-4" />
              </div>
              <div className="text-xl font-extrabold text-white">3</div>
              <div className="text-[10px] text-teal-400/80 mt-1">5 departments</div>
            </div>

            <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-900/40">
              <div className="flex items-center justify-between text-purple-400 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider">Attendance Rate</span>
                <Clock className="h-4 w-4" />
              </div>
              <div className="text-xl font-extrabold text-white">96.2%</div>
              <div className="text-[10px] text-purple-400/80 mt-1">44 clocked in</div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-900/40">
              <div className="flex items-center justify-between text-amber-400 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider">Pending Leaves</span>
                <CalendarDays className="h-4 w-4" />
              </div>
              <div className="text-xl font-extrabold text-white">1</div>
              <div className="text-[10px] text-amber-400/80 mt-1">Alex Kumar</div>
            </div>

            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40">
              <div className="flex items-center justify-between text-rose-400 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider">Active Jobs</span>
                <Briefcase className="h-4 w-4" />
              </div>
              <div className="text-xl font-extrabold text-white">3</div>
              <div className="text-[10px] text-rose-400/80 mt-1">18 candidates</div>
            </div>
          </div>

          {/* Today's Birthdays & Today's Leave Widgets (Exact match to screenshot 1) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Today's Birthdays */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Today's Birthdays</span>
                    <span className="text-xs">🎉</span>
                  </h3>
                  <p className="text-xs text-slate-400">Celebrate with your team members</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>

              <div className="py-6 text-center rounded-2xl bg-slate-950/50 border border-slate-850">
                <div className="text-2xl mb-1">🎂</div>
                <p className="text-xs font-semibold text-slate-300">Upcoming Birthday</p>
                <p className="text-xs text-emerald-400 font-bold mt-1">Ananya Verma • Oct 25</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Product Experience Lead</p>
              </div>
            </div>

            {/* Today's Leave */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Today's Leave</span>
                    <span className="text-xs">🏖️</span>
                  </h3>
                  <p className="text-xs text-slate-400">Employees on leave today</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <CalendarDays className="h-4 w-4" />
                </div>
              </div>

              <div className="py-6 text-center rounded-2xl bg-slate-950/50 border border-slate-850">
                <div className="text-2xl mb-1">🌴</div>
                <p className="text-xs font-semibold text-slate-300">1 Employee On Approved Leave</p>
                <p className="text-xs text-amber-400 font-bold mt-1">Pooja Sharma • Sick Leave</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Frontend UI Specialist • Returning Tomorrow</p>
              </div>
            </div>
          </div>

          {/* Company Technology Architecture & Growth Ecosystem (Replaces plain text table) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <h2 className="text-base font-bold text-white">Engineering Architecture &amp; Team Growth Radar</h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time tech stack orchestration, team velocities &amp; enterprise microservices
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 self-start sm:self-center">
                  99.99% Cloud Health
                </span>
              </div>

              {/* Interactive Visual Tech Stack & Team Node Diagram */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Core Tech Stack Deployment</span>
                  <span className="text-emerald-400 text-[11px] font-mono">Next.js 14 • Node.js • Prisma • Postgres</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 hover:border-emerald-400 transition-colors">
                    <div className="text-xs font-bold text-emerald-400">Frontend Apps</div>
                    <div className="text-[11px] text-white font-semibold mt-1">Next.js 14 App Router</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Tailwind CSS + Lucide</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 transition-colors">
                    <div className="text-xs font-bold text-cyan-400">Database Engine</div>
                    <div className="text-[11px] text-white font-semibold mt-1">PostgreSQL + Prisma</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Connection Pooling</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-purple-500/30 hover:border-purple-400 transition-colors">
                    <div className="text-xs font-bold text-purple-400">API &amp; Auth</div>
                    <div className="text-[11px] text-white font-semibold mt-1">JWT + RBAC Security</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Role Guard Middleware</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/30 hover:border-amber-400 transition-colors">
                    <div className="text-xs font-bold text-amber-400">Cloud Infrastructure</div>
                    <div className="text-[11px] text-white font-semibold mt-1">Docker &amp; CI/CD</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Automated Workflows</div>
                  </div>
                </div>
              </div>

              {/* Department Velocities & Growth Progress Bars */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Sprint Velocity &amp; Team Output (October 2026)
                </h3>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-300">Engineering &amp; Cloud Platform (Shivi Maurya)</span>
                      <span className="text-emerald-400 font-bold">94% Target Achieved</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: "94%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-300">Product UX &amp; System Workflows (Ananya Verma)</span>
                      <span className="text-cyan-400 font-bold">88% Target Achieved</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full" style={{ width: "88%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-300">Talent Acquisition &amp; ATS Pipeline (Shivangi Maurya)</span>
                      <span className="text-purple-400 font-bold">92% Hiring Target</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full" style={{ width: "92%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
                <h2 className="text-base font-bold text-white mb-4">Quick HR Controls</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/dashboard/employees" className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all text-center">
                    <Users className="h-5 w-5 text-emerald-400 mx-auto mb-1.5" />
                    <span className="text-xs font-semibold text-slate-200 block">Add Staff</span>
                  </Link>
                  <Link href="/dashboard/payroll" className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all text-center">
                    <Banknote className="h-5 w-5 text-amber-400 mx-auto mb-1.5" />
                    <span className="text-xs font-semibold text-slate-200 block">Run Payroll</span>
                  </Link>
                  <Link href="/dashboard/org-chart" className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all text-center">
                    <TrendingUp className="h-5 w-5 text-cyan-400 mx-auto mb-1.5" />
                    <span className="text-xs font-semibold text-slate-200 block">Org Hierarchy</span>
                  </Link>
                  <Link href="/dashboard/recruitment" className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all text-center">
                    <Briefcase className="h-5 w-5 text-purple-400 mx-auto mb-1.5" />
                    <span className="text-xs font-semibold text-slate-200 block">ATS Pipeline</span>
                  </Link>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-4 w-4 text-amber-400" />
                  <h2 className="text-sm font-bold text-white">Pending Leave Requests</h2>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Alex Kumar has applied for 2 Days of Sick Leave.
                </p>
                <Link href="/dashboard/leaves" className="block w-full py-2.5 text-center rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition-colors">
                  Review & Approve
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ===================== EMPLOYEE PORTAL VIEW ===================== */
        <>
          {/* Employee Personal Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider">Leave Balance</span>
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <CalendarDays className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">16 Days Left</div>
              <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                <span>10 Casual • 6 Sick Available</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider">This Month Attendance</span>
                <div className="h-8 w-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">100% Present</div>
              <div className="text-xs text-slate-400 mt-2">22 of 22 working days logged</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider">My Latest Salary</span>
                <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Banknote className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-emerald-400">₹76,000</div>
              <div className="text-xs text-slate-400 mt-2">Disbursed for September</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider">My Department</span>
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Building className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">Engineering</div>
              <div className="text-xs text-purple-400 mt-2">Team Size: 12 members</div>
            </div>
          </div>

          {/* Employee Two Column: Self Quick Actions & Profile Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white">My Attendance & Work Log (Recent)</h2>
              <div className="space-y-3">
                {[
                  { date: "Oct 03, 2026 (Today)", in: "09:30 AM", out: "Active", status: "Present (Web Punch)", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
                  { date: "Oct 02, 2026", in: "09:05 AM", out: "06:12 PM", status: "Completed (9.1 Hrs)", badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
                  { date: "Oct 01, 2026", in: "08:58 AM", out: "06:05 PM", status: "Completed (9.0 Hrs)", badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
                  { date: "Sep 30, 2026", in: "09:10 AM", out: "06:00 PM", status: "Completed (8.8 Hrs)", badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
                ].map((log, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white text-xs">{log.date}</div>
                      <div className="text-[11px] text-slate-400">Punch: {log.in} ➔ {log.out}</div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${log.badge}`}>
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
                <h2 className="text-base font-bold text-white mb-4">Self-Service Actions</h2>
                <div className="space-y-3">
                  <Link href="/dashboard/leaves" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 flex items-center gap-3 transition-all">
                    <CalendarDays className="h-5 w-5 text-emerald-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">Apply for Leave</div>
                      <div className="text-[10px] text-slate-400">Request Casual / Sick leave</div>
                    </div>
                  </Link>

                  <Link href="/dashboard/payroll" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 flex items-center gap-3 transition-all">
                    <FileText className="h-5 w-5 text-cyan-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">Download Payslip</div>
                      <div className="text-[10px] text-slate-400">View latest monthly salary slip</div>
                    </div>
                  </Link>

                  <Link href="/dashboard/org-chart" className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 flex items-center gap-3 transition-all">
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">View Org Tree</div>
                      <div className="text-[10px] text-slate-400">Find teammates and managers</div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <div className="font-bold text-emerald-400 mb-1">Company Policy Notice</div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  Upcoming Holiday: <strong>Oct 15 (Dussehra)</strong>. Please submit all pending leave regularizations by Friday.
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
