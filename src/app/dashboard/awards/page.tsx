"use client";

import { useState } from "react";
import {
  Award,
  Plus,
  Search,
  Filter,
  Calendar,
  Gift,
  Trophy,
  Star,
  CheckCircle2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface AwardItem {
  id: string;
  employeeName: string;
  employeeEmail: string;
  awardType: string;
  awardDate: string;
  gift: string;
  description: string;
}

const INITIAL_AWARDS: AwardItem[] = [
  {
    id: "aw-1",
    employeeName: "Shivi Maurya",
    employeeEmail: "shivi@crewzen.saas",
    awardType: "Employee of the Month",
    awardDate: "2026-10-01",
    gift: "₹25,000 Bonus + Trophy",
    description: "Exceptional architecture leadership and shipping Crewzen Next.js platform ahead of schedule.",
  },
  {
    id: "aw-2",
    employeeName: "Ananya Verma",
    employeeEmail: "ananya.v@crewzen.saas",
    awardType: "Star Performer Award",
    awardDate: "2026-09-15",
    gift: "iPad Air + Certificate",
    description: "Outstanding product design delivery with seamless responsive UX workflows.",
  },
  {
    id: "aw-3",
    employeeName: "Rohan Mehta",
    employeeEmail: "rohan.m@crewzen.saas",
    awardType: "Innovation Excellence",
    awardDate: "2026-08-30",
    gift: "Noise Cancelling Headphones",
    description: "Architected automated CI/CD container clusters reducing deployment downtime to 0%.",
  },
];

export default function AwardsPage() {
  const [awards, setAwards] = useState<AwardItem[]>(INITIAL_AWARDS);
  const [search, setSearch] = useState("");
  const [awardTypeFilter, setAwardTypeFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAward, setNewAward] = useState({
    employeeName: "",
    employeeEmail: "",
    awardType: "Employee of the Month",
    awardDate: new Date().toISOString().split("T")[0],
    gift: "",
    description: "",
  });

  const awardCategories = [
    "Employee of the Month",
    "Star Performer Award",
    "Innovation Excellence",
    "Leadership Star",
    "Rising Star Award",
    "Spot Recognition",
    "Long Service Milestone",
  ];

  const filteredAwards = awards.filter((a) => {
    const matchesSearch =
      a.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      a.employeeEmail.toLowerCase().includes(search.toLowerCase()) ||
      a.gift.toLowerCase().includes(search.toLowerCase());
    const matchesType = awardTypeFilter === "ALL" || a.awardType === awardTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleCreateAward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAward.employeeName || !newAward.gift) return;

    const item: AwardItem = {
      id: `aw-${Date.now()}`,
      employeeName: newAward.employeeName,
      employeeEmail: newAward.employeeEmail || `${newAward.employeeName.toLowerCase().replace(/\s+/g, ".")}@crewzen.saas`,
      awardType: newAward.awardType,
      awardDate: newAward.awardDate,
      gift: newAward.gift,
      description: newAward.description || "Awarded for exceptional commitment and contribution.",
    };

    setAwards([item, ...awards]);
    setIsModalOpen(false);
    setNewAward({
      employeeName: "",
      employeeEmail: "",
      awardType: "Employee of the Month",
      awardDate: new Date().toISOString().split("T")[0],
      gift: "",
      description: "",
    });
  };

  const handleDeleteAward = (id: string) => {
    setAwards(awards.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span>Employee Lifecycle</span>
            <span>/</span>
            <span className="text-emerald-400 font-medium">Awards &amp; Recognitions</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Trophy className="h-6 w-6 text-amber-400" />
            Awards &amp; Recognition
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage honors, employee of the month rewards, and appreciation gifts across departments.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-emerald-500/20 self-start sm:self-center"
        >
          <Plus className="h-4 w-4" />
          <span>Add Award</span>
        </button>
      </div>

      {/* Filter and Search Bar matching user's screenshot */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search employee, gift, keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Award Type Filter */}
        <select
          value={awardTypeFilter}
          onChange={(e) => setAwardTypeFilter(e.target.value)}
          className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
        >
          <option value="ALL">All Award Types</option>
          {awardCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 text-xs text-slate-400 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl">
          <Calendar className="h-3.5 w-3.5 text-emerald-400" />
          <span>All Cycles</span>
        </div>
      </div>

      {/* Awards Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Award Type</th>
                <th className="py-3.5 px-4">Award Date</th>
                <th className="py-3.5 px-4">Gift / Prize</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredAwards.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <Trophy className="h-8 w-8 mx-auto mb-2 text-slate-600" />
                    <p className="text-sm font-medium">No awards found</p>
                    <p className="text-xs text-slate-600 mt-1">Try adjusting your filters or click "+ Add Award"</p>
                  </td>
                </tr>
              ) : (
                filteredAwards.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3.5 px-4 text-center font-mono text-slate-400">
                      {index + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs">
                          {item.employeeName[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{item.employeeName}</div>
                          <div className="text-[11px] text-slate-400">{item.employeeEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Star className="h-3 w-3 fill-current" />
                        {item.awardType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-mono">
                      {item.awardDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                        <Gift className="h-3.5 w-3.5 text-purple-400" />
                        <span>{item.gift}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-xs">
                        {item.description}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteAward(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Delete Award"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing <strong className="text-white">{filteredAwards.length}</strong> awards
          </div>
          <div className="flex items-center gap-2">
            <button className="px-2.5 py-1 rounded-lg border border-slate-800 text-slate-500 cursor-not-allowed">
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              1
            </span>
            <button className="px-2.5 py-1 rounded-lg border border-slate-800 text-slate-500 cursor-not-allowed">
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Award Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Add New Employee Award</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAward} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Employee Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Shivi Maurya"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  value={newAward.employeeName}
                  onChange={(e) => setNewAward({ ...newAward, employeeName: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Employee Official Email <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="email"
                  placeholder="e.g. shivi@crewzen.saas"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  value={newAward.employeeEmail}
                  onChange={(e) => setNewAward({ ...newAward, employeeEmail: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Award Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    value={newAward.awardType}
                    onChange={(e) => setNewAward({ ...newAward, awardType: e.target.value })}
                  >
                    {awardCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Award Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    value={newAward.awardDate}
                    onChange={(e) => setNewAward({ ...newAward, awardDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Gift / Prize / Bonus <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. ₹20,000 Cash Bonus + Plaque"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  value={newAward.gift}
                  onChange={(e) => setNewAward({ ...newAward, gift: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Reason / Citation
                </label>
                <textarea
                  rows={2}
                  placeholder="Citation for exceptional dedication..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                  value={newAward.description}
                  onChange={(e) => setNewAward({ ...newAward, description: e.target.value })}
                />
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
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20"
                >
                  Save &amp; Announce Award
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
