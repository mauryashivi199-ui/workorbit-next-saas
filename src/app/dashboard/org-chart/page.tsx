"use client";

import { useState } from "react";
import {
  GitFork,
  Users,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Monitor,
  Code,
  Layers,
  ChevronDown,
  Building2,
  Mail,
  MapPin,
} from "lucide-react";

export default function OrgChartPage() {
  const [viewMode, setViewMode] = useState<"tree" | "cards">("cards");

  const hierarchy = [
    {
      id: "WO-001",
      name: "Shivi Maurya",
      role: "Founder & Chief Executive Architect",
      department: "Executive Leadership",
      avatar: "SM",
      email: "shivi@crewzen.saas",
      location: "HQ / Global",
      directReports: 4,
      skills: ["Next.js Architecture", "Strategic Growth", "Cloud Scalability"],
      level: 1,
      badge: "border-emerald-500/80 bg-emerald-950/40 text-emerald-300",
    },
    {
      id: "WO-002",
      name: "Shivangi Maurya",
      role: "Director of HR & People Operations",
      department: "Human Resources",
      avatar: "SM",
      email: "shivangi@crewzen.saas",
      location: "Greater Noida HQ",
      directReports: 2,
      skills: ["Talent Retention", "Payroll Strategy", "Culture & ATS"],
      level: 2,
      badge: "border-purple-500/60 bg-purple-950/30 text-purple-300",
    },
    {
      id: "WO-003",
      name: "Alex Kumar",
      role: "Lead Full Stack & Systems Architect",
      department: "Engineering & Tech",
      avatar: "AK",
      email: "alex@crewzen.saas",
      location: "Bengaluru Tech Center",
      directReports: 3,
      skills: ["React & Node.js", "Prisma ORM", "Microservices"],
      level: 2,
      badge: "border-cyan-500/60 bg-cyan-950/30 text-cyan-300",
    },
    {
      id: "WO-004",
      name: "Ananya Verma",
      role: "Head of Product & UX Design",
      department: "Design & Innovation",
      avatar: "AV",
      email: "ananya.v@crewzen.saas",
      location: "Gurugram Hub",
      directReports: 2,
      skills: ["Design Systems", "Prototyping", "User Research"],
      level: 2,
      badge: "border-pink-500/60 bg-pink-950/30 text-pink-300",
    },
    {
      id: "WO-005",
      name: "Rohan Mehta",
      role: "DevOps & Cloud Reliability Lead",
      department: "Infrastructure",
      avatar: "RM",
      email: "rohan.m@crewzen.saas",
      location: "Remote / Hybrid",
      directReports: 2,
      skills: ["Kubernetes", "AWS Clusters", "CI/CD Pipelines"],
      level: 2,
      badge: "border-amber-500/60 bg-amber-950/30 text-amber-300",
    },
    {
      id: "WO-006",
      name: "Pooja Sharma",
      role: "Frontend UI Specialist",
      department: "Engineering & Tech",
      avatar: "PS",
      email: "pooja.s@crewzen.saas",
      location: "Noida HQ",
      directReports: 0,
      skills: ["Tailwind CSS", "TypeScript", "Mobile Web"],
      level: 3,
      badge: "border-teal-500/50 bg-teal-950/20 text-teal-300",
    },
    {
      id: "WO-007",
      name: "Vikram Malhotra",
      role: "Talent Acquisition Specialist",
      department: "Human Resources",
      avatar: "VM",
      email: "vikram@crewzen.saas",
      location: "Noida HQ",
      directReports: 0,
      skills: ["Campus Drives", "Technical Screening", "ATS"],
      level: 3,
      badge: "border-purple-500/50 bg-purple-950/20 text-purple-300",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with View Toggle for Mobile + PC */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span>Workforce Management</span>
            <span>/</span>
            <span className="text-emerald-400 font-medium">Organization Hierarchy</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <GitFork className="h-6 w-6 text-emerald-400" />
            Visual Organization Hierarchy &amp; Leadership
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Mobile-optimized interactive reporting hierarchy, team divisions, and leadership structure.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-center">
          <button
            onClick={() => setViewMode("cards")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === "cards"
                ? "bg-emerald-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Responsive Cards</span>
          </button>
          <button
            onClick={() => setViewMode("tree")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === "tree"
                ? "bg-emerald-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Interactive Tree</span>
          </button>
        </div>
      </div>

      {/* 1. RESPONSIVE CARDS VIEW (Perfect for Mobile and Tablets) */}
      {viewMode === "cards" ? (
        <div className="space-y-6">
          {/* Top Leader (Level 1) */}
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border-2 border-emerald-500/50 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center text-lg border border-emerald-500/40 shrink-0">
                  SM
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-white">Shivi Maurya</h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      FOUNDER &amp; CEO
                    </span>
                  </div>
                  <p className="text-xs text-emerald-400 font-medium">Chief Executive Architect</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                    <span>WO-001</span>
                    <span>•</span>
                    <span>Executive Leadership</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                  Direct Reports: <strong className="text-emerald-400">4 Directors</strong>
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                  Global Workforce: <strong className="text-emerald-400">48 Staff</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Department Directors & Functional Leads (Level 2) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Department Directors &amp; Engineering Leads (Reporting to Shivi Maurya)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {hierarchy.filter((h) => h.level === 2).map((lead) => (
                <div
                  key={lead.id}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-xl bg-slate-800 font-bold text-xs flex items-center justify-center text-white border border-slate-700">
                        {lead.avatar}
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{lead.id}</span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">{lead.name}</h3>
                      <p className="text-xs text-emerald-400 font-medium mt-0.5">{lead.role}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{lead.department}</p>
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-cyan-400 shrink-0" />
                        <span className="truncate">{lead.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3 w-3 text-slate-500 shrink-0" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {lead.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[9px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Contributors / Specialists (Level 3) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              <Users className="h-4 w-4 text-cyan-400" />
              <span>Specialists &amp; Key Contributors</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hierarchy.filter((h) => h.level === 3).map((spec) => (
                <div
                  key={spec.id}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-slate-800 text-slate-200 font-bold flex items-center justify-center text-xs">
                      {spec.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{spec.name}</h4>
                      <p className="text-[11px] text-emerald-400">{spec.role}</p>
                      <p className="text-[10px] text-slate-400">{spec.department} • {spec.location}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                    {spec.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* 2. HORIZONTAL TREE VIEW (Scrollable on Mobile) */
        <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/60 border border-slate-800 overflow-x-auto">
          <div className="min-w-[700px] flex flex-col items-center py-4">
            {/* CEO Node */}
            <div className="p-4 rounded-2xl bg-gradient-to-tr from-emerald-950 to-slate-900 border-2 border-emerald-500/60 w-72 text-center shadow-xl">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold mx-auto flex items-center justify-center text-xs mb-2">
                SM
              </div>
              <div className="font-bold text-white text-sm">Shivi Maurya</div>
              <div className="text-xs text-emerald-400 font-semibold mt-0.5">CEO &amp; Chief Architect</div>
              <div className="text-[10px] text-slate-400 mt-1">Executive Leadership • WO-001</div>
            </div>

            {/* Connecting Tree Lines */}
            <div className="w-0.5 h-8 bg-slate-700" />
            <div className="w-[580px] h-0.5 bg-slate-700 relative">
              <div className="absolute left-0 top-0 w-0.5 h-8 bg-slate-700" />
              <div className="absolute left-1/3 top-0 w-0.5 h-8 bg-slate-700" />
              <div className="absolute right-1/3 top-0 w-0.5 h-8 bg-slate-700" />
              <div className="absolute right-0 top-0 w-0.5 h-8 bg-slate-700" />
            </div>

            {/* Level 2 Nodes */}
            <div className="flex items-start justify-between w-[640px] pt-8 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 w-36 text-center text-xs">
                <div className="font-bold text-white text-xs">Shivangi M.</div>
                <div className="text-[10px] text-purple-400">HR Director</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 w-36 text-center text-xs">
                <div className="font-bold text-white text-xs">Alex Kumar</div>
                <div className="text-[10px] text-cyan-400">Tech Lead</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 w-36 text-center text-xs">
                <div className="font-bold text-white text-xs">Ananya Verma</div>
                <div className="text-[10px] text-pink-400">Design Head</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 w-36 text-center text-xs">
                <div className="font-bold text-white text-xs">Rohan Mehta</div>
                <div className="text-[10px] text-amber-400">DevOps Lead</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
