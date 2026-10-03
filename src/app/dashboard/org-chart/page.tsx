"use client";

import { GitFork, Users, ShieldCheck, Sparkles } from "lucide-react";

export default function OrgChartPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Visual Organization Hierarchy</h1>
        <p className="text-xs text-slate-400">Interactive company reporting structure and tree flow</p>
      </div>

      {/* Visual Tree Canvas */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 overflow-x-auto flex flex-col items-center">
        {/* CEO / Top Architect Node */}
        <div className="flex flex-col items-center">
          <div className="p-5 rounded-2xl bg-gradient-to-tr from-emerald-950 to-slate-900 border-2 border-emerald-500/60 w-72 text-center shadow-xl shadow-emerald-500/10">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 font-bold mx-auto flex items-center justify-center text-sm mb-3">
              SM
            </div>
            <div className="font-bold text-white text-base">Shivam Maurya</div>
            <div className="text-xs text-emerald-400 font-semibold mt-0.5">Chief Executive & Architect</div>
            <div className="text-[10px] text-slate-400 mt-2">Executive Leadership • WO-001</div>
          </div>

          {/* Vertical Connecting Stem */}
          <div className="w-0.5 h-10 bg-slate-700" />
          {/* Horizontal Branch Bar */}
          <div className="w-[520px] h-0.5 bg-slate-700 relative">
            <div className="absolute left-0 top-0 w-0.5 h-8 bg-slate-700" />
            <div className="absolute right-0 top-0 w-0.5 h-8 bg-slate-700" />
          </div>
        </div>

        {/* Level 2 Nodes (Directors / Department Heads) */}
        <div className="flex items-start justify-between w-[640px] pt-8">
          {/* Branch 1: HR Operations */}
          <div className="flex flex-col items-center w-64">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 w-full text-center shadow-lg transition-all">
              <div className="h-10 w-10 rounded-xl bg-purple-500/20 text-purple-400 font-bold mx-auto flex items-center justify-center text-xs mb-2">
                SM
              </div>
              <div className="font-bold text-white text-sm">Shivangi Maurya</div>
              <div className="text-xs text-purple-400 font-medium">HR Operations Director</div>
              <div className="text-[10px] text-slate-400 mt-1">Human Resources • WO-002</div>
            </div>

            {/* Subordinate Line */}
            <div className="w-0.5 h-8 bg-slate-700" />
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 w-56 text-center text-xs">
              <div className="font-semibold text-slate-200">Vikram Mehta</div>
              <div className="text-[11px] text-slate-400">Talent Acquisition Lead</div>
            </div>
          </div>

          {/* Branch 2: Engineering */}
          <div className="flex flex-col items-center w-64">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 w-full text-center shadow-lg transition-all">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold mx-auto flex items-center justify-center text-xs mb-2">
                AK
              </div>
              <div className="font-bold text-white text-sm">Alex Kumar</div>
              <div className="text-xs text-cyan-400 font-medium">Sr. Full Stack Engineer</div>
              <div className="text-[10px] text-slate-400 mt-1">Engineering & Tech • WO-003</div>
            </div>

            {/* Subordinate Line */}
            <div className="w-0.5 h-8 bg-slate-700" />
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 w-56 text-center text-xs">
              <div className="font-semibold text-slate-200">Pooja Sharma</div>
              <div className="text-[11px] text-slate-400">UI/UX Design Specialist</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
