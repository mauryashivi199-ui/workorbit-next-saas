"use client";

import { useState } from "react";
import {
  TrendingUp,
  Plus,
  Search,
  Calendar,
  ArrowUpRight,
  UserCheck,
  CheckCircle2,
  Trash2,
} from "lucide-react";

interface PromotionItem {
  id: string;
  employeeName: string;
  employeeEmail: string;
  previousDesignation: string;
  promotedDesignation: string;
  promotionDate: string;
  salaryIncrement: string;
}

const INITIAL_PROMOTIONS: PromotionItem[] = [
  {
    id: "p-1",
    employeeName: "Shivi Maurya",
    employeeEmail: "shivi@crewzen.saas",
    previousDesignation: "Senior Software Engineer",
    promotedDesignation: "Lead Systems Architect & Tech Lead",
    promotionDate: "2026-10-01",
    salaryIncrement: "+35% Hike",
  },
  {
    id: "p-2",
    employeeName: "Ananya Verma",
    employeeEmail: "ananya.v@crewzen.saas",
    previousDesignation: "UI/UX Designer",
    promotedDesignation: "Senior Product Experience Lead",
    promotionDate: "2026-09-01",
    salaryIncrement: "+25% Hike",
  },
  {
    id: "p-3",
    employeeName: "Rohan Mehta",
    employeeEmail: "rohan.m@crewzen.saas",
    previousDesignation: "Cloud Associate",
    promotedDesignation: "DevOps & Infrastructure Specialist",
    promotionDate: "2026-08-15",
    salaryIncrement: "+30% Hike",
  },
];

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<PromotionItem[]>(INITIAL_PROMOTIONS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeEmail: "",
    previousDesignation: "",
    promotedDesignation: "",
    promotionDate: new Date().toISOString().split("T")[0],
    salaryIncrement: "+20%",
  });

  const filtered = promotions.filter(
    (p) =>
      p.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      p.promotedDesignation.toLowerCase().includes(search.toLowerCase()) ||
      p.previousDesignation.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employeeName || !formData.promotedDesignation) return;

    const item: PromotionItem = {
      id: `p-${Date.now()}`,
      employeeName: formData.employeeName,
      employeeEmail: formData.employeeEmail || `${formData.employeeName.toLowerCase().replace(/\s+/g, ".")}@crewzen.saas`,
      previousDesignation: formData.previousDesignation,
      promotedDesignation: formData.promotedDesignation,
      promotionDate: formData.promotionDate,
      salaryIncrement: formData.salaryIncrement,
    };

    setPromotions([item, ...promotions]);
    setIsModalOpen(false);
    setFormData({
      employeeName: "",
      employeeEmail: "",
      previousDesignation: "",
      promotedDesignation: "",
      promotionDate: new Date().toISOString().split("T")[0],
      salaryIncrement: "+20%",
    });
  };

  const handleDelete = (id: string) => {
    setPromotions(promotions.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span>Employee Lifecycle</span>
            <span>/</span>
            <span className="text-emerald-400 font-medium">Promotions</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
            Employee Promotions &amp; Upgrades
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track career progressions, role transitions, band upgrades, and salary adjustments.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-emerald-500/20 self-start sm:self-center"
        >
          <Plus className="h-4 w-4" />
          <span>Record Promotion</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search employee or new designation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Previous Role</th>
                <th className="py-3.5 px-4">Promoted To</th>
                <th className="py-3.5 px-4">Effective Date</th>
                <th className="py-3.5 px-4">Hike / Band</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-4 text-center font-mono text-slate-400">
                    {index + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{item.employeeName}</div>
                    <div className="text-[11px] text-slate-400">{item.employeeEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{item.previousDesignation}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      {item.promotedDesignation}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-mono">{item.promotionDate}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-emerald-400 font-bold">{item.salaryIncrement}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                Record Employee Promotion
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Employee Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Shivi Maurya"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  value={formData.employeeName}
                  onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Previous Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Engineer"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    value={formData.previousDesignation}
                    onChange={(e) =>
                      setFormData({ ...formData, previousDesignation: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Promoted Role <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Lead Architect"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    value={formData.promotedDesignation}
                    onChange={(e) =>
                      setFormData({ ...formData, promotedDesignation: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Effective Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    value={formData.promotionDate}
                    onChange={(e) => setFormData({ ...formData, promotionDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Salary Hike %
                  </label>
                  <input
                    type="text"
                    placeholder="+25% Hike"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    value={formData.salaryIncrement}
                    onChange={(e) => setFormData({ ...formData, salaryIncrement: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold"
                >
                  Confirm Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
