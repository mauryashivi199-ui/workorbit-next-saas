"use client";

import { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Building2,
  Trash2,
  CheckCircle2,
  Users,
} from "lucide-react";

interface DepartmentItem {
  id: string;
  name: string;
  code: string;
  branch: string;
  headOfDepartment: string;
  employeeCount: number;
}

const INITIAL_DEPARTMENTS: DepartmentItem[] = [
  {
    id: "d-1",
    name: "Engineering & Tech",
    code: "ENG",
    branch: "Noida HQ",
    headOfDepartment: "Shivi Maurya",
    employeeCount: 22,
  },
  {
    id: "d-2",
    name: "Human Resources & Talent",
    code: "HR",
    branch: "Noida HQ",
    headOfDepartment: "Pooja Sharma",
    employeeCount: 6,
  },
  {
    id: "d-3",
    name: "Product Experience & Design",
    code: "PROD",
    branch: "Gurugram Tech Center",
    headOfDepartment: "Ananya Verma",
    employeeCount: 8,
  },
  {
    id: "d-4",
    name: "Finance & Accounts",
    code: "FIN",
    branch: "All Branches",
    headOfDepartment: "Vikas Aggarwal",
    employeeCount: 5,
  },
  {
    id: "d-5",
    name: "DevOps & Cloud Systems",
    code: "OPS",
    branch: "Remote / Bengaluru",
    headOfDepartment: "Rohan Mehta",
    employeeCount: 7,
  },
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<DepartmentItem[]>(INITIAL_DEPARTMENTS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    branch: "Noida HQ",
    headOfDepartment: "",
    employeeCount: 1,
  });

  const filtered = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.headOfDepartment.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;

    const item: DepartmentItem = {
      id: `dept-${Date.now()}`,
      name: formData.name,
      code: formData.code.toUpperCase(),
      branch: formData.branch,
      headOfDepartment: formData.headOfDepartment || "Shivi Maurya",
      employeeCount: Number(formData.employeeCount) || 1,
    };

    setDepartments([...departments, item]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      code: "",
      branch: "Noida HQ",
      headOfDepartment: "",
      employeeCount: 1,
    });
  };

  const handleDelete = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id));
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
            <span className="text-emerald-400 font-medium">Departments</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Building2 className="h-6 w-6 text-emerald-400" />
            Departments &amp; Divisions
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Structure corporate operational divisions, functional teams, and departmental leads.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-emerald-500/20 self-start sm:self-center"
        >
          <Plus className="h-4 w-4" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search department name or HOD..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {item.code}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-slate-500 hover:text-rose-400 p-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{item.name}</h3>
              <p className="text-xs text-slate-400">Head: <strong className="text-slate-200">{item.headOfDepartment}</strong></p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>{item.branch}</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-400">
                <Users className="h-3.5 w-3.5" /> {item.employeeCount} Members
              </span>
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
                <Building2 className="h-4 w-4 text-emerald-400" />
                Add Department
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
                  Department Name <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Artificial Intelligence Labs"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Department Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. AI"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 uppercase"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Branch</label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  >
                    <option value="Noida HQ">Noida HQ</option>
                    <option value="Gurugram Tech Center">Gurugram Tech Center</option>
                    <option value="Bengaluru Hub">Bengaluru Hub</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Head of Department (HOD)</label>
                <input
                  type="text"
                  placeholder="e.g. Shivi Maurya"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  value={formData.headOfDepartment}
                  onChange={(e) => setFormData({ ...formData, headOfDepartment: e.target.value })}
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
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
