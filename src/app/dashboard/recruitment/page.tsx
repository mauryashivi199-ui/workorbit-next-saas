"use client";

import { useState } from "react";
import { Briefcase, Plus, UserCheck, Star, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";

interface CandidateCard {
  id: string;
  name: string;
  role: string;
  experience: string;
  stage: "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFERED" | "HIRED";
  rating: number;
}

const INITIAL_CANDIDATES: CandidateCard[] = [
  {
    id: "c-1",
    name: "Vikram Mehta",
    role: "HR Operations Lead",
    experience: "5 Years",
    stage: "APPLIED",
    rating: 3,
  },
  {
    id: "c-2",
    name: "Rahul Verma",
    role: "Senior Next.js Developer",
    experience: "4 Years",
    stage: "SCREENING",
    rating: 4,
  },
  {
    id: "c-3",
    name: "Sneha Patel",
    role: "DevOps & Cloud Engineer",
    experience: "3.5 Years",
    stage: "INTERVIEW",
    rating: 4,
  },
  {
    id: "c-4",
    name: "Pooja Sharma",
    role: "Product Designer",
    experience: "3 Years",
    stage: "OFFERED",
    rating: 5,
  },
];

const STAGES: Array<CandidateCard["stage"]> = ["APPLIED", "SCREENING", "INTERVIEW", "OFFERED", "HIRED"];

export default function RecruitmentKanbanPage() {
  const [candidates, setCandidates] = useState<CandidateCard[]>(INITIAL_CANDIDATES);

  const moveCandidate = (id: string, nextStage: CandidateCard["stage"]) => {
    setCandidates(
      candidates.map((c) => (c.id === id ? { ...c, stage: nextStage } : c))
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Recruitment & ATS Pipeline</h1>
          <p className="text-xs text-slate-400">Track candidates across recruitment stages from application to offer</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/careers"
            target="_blank"
            className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
          >
            Open Public Career Portal
          </a>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-6">
        {STAGES.map((stage) => {
          const list = candidates.filter((c) => c.stage === stage);
          return (
            <div key={stage} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[500px]">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {stage}
                </span>
                <span className="h-5 w-5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 flex items-center justify-center">
                  {list.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1">
                {list.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-sm space-y-2.5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-bold text-white text-xs">{c.name}</div>
                      <div className="flex items-center text-amber-400 text-[10px]">
                        <Star className="h-3 w-3 fill-current mr-0.5" />
                        {c.rating}.0
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400">{c.role}</div>
                    <div className="text-[10px] text-emerald-400 font-medium">Exp: {c.experience}</div>

                    {/* Move to next stage button */}
                    <div className="pt-2 border-t border-slate-900 flex justify-end">
                      {stage !== "HIRED" ? (
                        <button
                          onClick={() => {
                            const nextIdx = STAGES.indexOf(stage) + 1;
                            moveCandidate(c.id, STAGES[nextIdx]);
                          }}
                          className="text-[10px] font-bold px-2 py-1 rounded bg-slate-900 hover:bg-emerald-500/20 text-emerald-400 border border-slate-800 hover:border-emerald-500/30 flex items-center gap-1 transition-all"
                        >
                          <span>Move Next</span>
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      ) : (
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Hired!
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {list.length === 0 && (
                  <div className="text-center py-12 text-slate-600 text-xs">
                    No candidates
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
