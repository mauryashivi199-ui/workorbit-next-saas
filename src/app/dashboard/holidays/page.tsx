"use client";

import { useState } from "react";
import {
  Calendar,
  Plus,
  Search,
  Building,
  CheckCircle2,
  Trash2,
  Sun,
  Flame,
} from "lucide-react";

interface HolidayItem {
  id: string;
  name: string;
  date: string;
  day: string;
  type: "National" | "Gazetted" | "Optional" | "Restricted";
  description: string;
}

const INITIAL_HOLIDAYS: HolidayItem[] = [
  {
    id: "h-1",
    name: "Diwali (Deepavali)",
    date: "2026-10-20",
    day: "Tuesday",
    type: "National",
    description: "Festival of Lights celebration across India.",
  },
  {
    id: "h-2",
    name: "Govardhan Puja",
    date: "2026-10-21",
    day: "Wednesday",
    type: "Gazetted",
    description: "Post-Diwali traditional worship & celebration.",
  },
  {
    id: "h-3",
    name: "Bhai Dooj",
    date: "2026-10-22",
    day: "Thursday",
    type: "Gazetted",
    description: "Sibling celebration festival.",
  },
  {
    id: "h-4",
    name: "Guru Nanak Jayanti",
    date: "2026-11-24",
    day: "Tuesday",
    type: "National",
    description: "Birth anniversary of Guru Nanak Dev Ji.",
  },
  {
    id: "h-5",
    name: "Christmas Day",
    date: "2026-12-25",
    day: "Friday",
    type: "National",
    description: "Annual Christian festival celebrating the birth of Jesus Christ.",
  },
  {
    id: "h-6",
    name: "Republic Day",
    date: "2027-01-26",
    day: "Tuesday",
    type: "National",
    description: "Celebration of the Constitution of India.",
  },
];

export default function HolidaysPage() {
  const [holidays, setHolidays] = useState<HolidayItem[]>(INITIAL_HOLIDAYS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    type: "National" as "National" | "Gazetted" | "Optional" | "Restricted",
    description: "",
  });

  const filtered = holidays.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date) return;

    const dateObj = new Date(formData.date);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    const item: HolidayItem = {
      id: `h-${Date.now()}`,
      name: formData.name,
      date: formData.date,
      day: dayName,
      type: formData.type,
      description: formData.description || "Company scheduled public holiday.",
    };

    setHolidays([...holidays, item]);
    setIsModalOpen(false);
    setFormData({ name: "", date: "", type: "National", description: "" });
  };

  const handleDelete = (id: string) => {
    setHolidays(holidays.filter((h) => h.id !== id));
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
            <span className="text-emerald-400 font-medium">Holidays Calendar</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Sun className="h-6 w-6 text-amber-400" />
            Official Holiday Calendar
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure national holidays, gazetted leaves, and regional office closures for the fiscal year.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-emerald-500/20 self-start sm:self-center"
        >
          <Plus className="h-4 w-4" />
          <span>Add Holiday</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search holiday name, month or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Holidays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                    item.type === "National"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                      : "bg-cyan-500/20 text-cyan-400 border-cyan-500/40"
                  }`}
                >
                  {item.type}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-slate-500 hover:text-rose-400 p-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{item.name}</h3>
              <p className="text-xs text-slate-400">{item.description}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-mono text-emerald-400 font-semibold">
                <Calendar className="h-3.5 w-3.5" />
                <span>{item.date}</span>
              </div>
              <span className="text-slate-400 font-medium">{item.day}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sun className="h-4 w-4 text-amber-400" />
                Add New Company Holiday
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
                  Holiday Name <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Independence Day"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Type</label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as "National" | "Gazetted" | "Optional" | "Restricted",
                      })
                    }
                  >
                    <option value="National">National</option>
                    <option value="Gazetted">Gazetted</option>
                    <option value="Optional">Optional</option>
                    <option value="Restricted">Restricted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Holiday details or celebration note..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  Add to Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
