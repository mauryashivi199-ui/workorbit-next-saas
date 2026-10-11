"use client";

import { useState } from "react";
import {
  Megaphone,
  Plus,
  Search,
  Calendar,
  Building2,
  Bell,
  Trash2,
  CheckCircle2,
} from "lucide-react";

interface AnnouncementItem {
  id: string;
  title: string;
  branch: string;
  department: string;
  startDate: string;
  endDate: string;
  summary: string;
  priority: "High" | "Normal" | "Urgent";
}

const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "ann-1",
    title: "Diwali Festive Bonus & Extended Holidays",
    branch: "All Branches",
    department: "All Departments",
    startDate: "2026-10-15",
    endDate: "2026-10-25",
    summary: "Annual festive bonus will be credited with October payroll. Office will observe holiday from Oct 20 to Oct 24.",
    priority: "Urgent",
  },
  {
    id: "ann-2",
    title: "Q4 Townhall & Tech All-Hands Meeting",
    branch: "Noida HQ",
    department: "Engineering & Tech",
    startDate: "2026-10-18",
    endDate: "2026-10-18",
    summary: "Live quarterly roadmap demonstration hosted by Shivi Maurya with upcoming SaaS product launches.",
    priority: "High",
  },
  {
    id: "ann-3",
    title: "New Health Insurance & Wellness Reimbursement Policy",
    branch: "All Branches",
    department: "Human Resources",
    startDate: "2026-10-01",
    endDate: "2026-11-01",
    summary: "Upgraded medical coverage limit to ₹10,00,000 for all full-time confirmed crew members.",
    priority: "Normal",
  },
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    branch: "All Branches",
    department: "All Departments",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    summary: "",
    priority: "Normal" as "High" | "Normal" | "Urgent",
  });

  const filtered = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase()) ||
      a.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.summary) return;

    const item: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      title: formData.title,
      branch: formData.branch,
      department: formData.department,
      startDate: formData.startDate,
      endDate: formData.endDate || formData.startDate,
      summary: formData.summary,
      priority: formData.priority,
    };

    setAnnouncements([item, ...announcements]);
    setIsModalOpen(false);
    setFormData({
      title: "",
      branch: "All Branches",
      department: "All Departments",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      summary: "",
      priority: "Normal",
    });
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span>Organization Structure</span>
            <span>/</span>
            <span className="text-emerald-400 font-medium">Announcements</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Megaphone className="h-6 w-6 text-emerald-400" />
            Company Announcements &amp; Notice Board
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Broadcast official circulars, event notifications, and critical policy changes across branches.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-emerald-500/20 self-start sm:self-center"
        >
          <Plus className="h-4 w-4" />
          <span>Post Announcement</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search circular title, department or circular text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Grid of Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                    item.priority === "Urgent"
                      ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                      : item.priority === "High"
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                      : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  }`}
                >
                  {item.priority}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-slate-500 hover:text-rose-400 p-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.summary}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Building2 className="h-3 w-3 text-cyan-400" />
                <span>{item.branch}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <Calendar className="h-3 w-3 text-emerald-400" />
                <span>{item.startDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-emerald-400" />
                Post Company Announcement
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Circular Title <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Annual Bonus & Holiday Circular"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Branch</label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  >
                    <option value="All Branches">All Branches</option>
                    <option value="Noida HQ">Noida HQ</option>
                    <option value="Gurugram Tech Center">Gurugram Tech Center</option>
                    <option value="Bengaluru Hub">Bengaluru Hub</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Priority</label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value as "High" | "Normal" | "Urgent" })
                    }
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Department</label>
                  <input
                    type="text"
                    placeholder="All Departments"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Circular Details / Summary <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Type the full announcement content..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
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
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold"
                >
                  Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
