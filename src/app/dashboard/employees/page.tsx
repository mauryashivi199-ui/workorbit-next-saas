"use client";

import { useState } from "react";
import { Users, UserPlus, Search, Filter, Mail, Phone, Building, Briefcase, MoreVertical } from "lucide-react";

interface EmployeeItem {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  status: "ACTIVE" | "ON_LEAVE" | "REMOTE";
  joinedDate: string;
}

const INITIAL_EMPLOYEES: EmployeeItem[] = [
  {
    id: "1",
    code: "WO-001",
    name: "Shivi Maurya",
    email: "admin@workorbit.io",
    phone: "+91 9956572394",
    department: "Engineering & Tech",
    designation: "Lead Software Architect",
    status: "ACTIVE",
    joinedDate: "Jan 15, 2024",
  },
  {
    id: "2",
    code: "WO-002",
    name: "Shivangi Maurya",
    email: "shivangi@workorbit.io",
    phone: "+91 9876543210",
    department: "Human Resources",
    designation: "HR Operations Director",
    status: "ACTIVE",
    joinedDate: "Feb 01, 2024",
  },
  {
    id: "3",
    code: "WO-003",
    name: "Alex Kumar",
    email: "alex.kumar@workorbit.io",
    phone: "+91 9123456780",
    department: "Engineering & Tech",
    designation: "Senior Full Stack Engineer",
    status: "REMOTE",
    joinedDate: "Mar 10, 2024",
  },
  {
    id: "4",
    code: "WO-004",
    name: "Pooja Sharma",
    email: "pooja.sharma@workorbit.io",
    phone: "+91 9456123456",
    department: "Product & Design",
    designation: "Product UI/UX Designer",
    status: "ON_LEAVE",
    joinedDate: "May 20, 2024",
  },
];

export default function EmployeesDirectoryPage() {
  const [employees, setEmployees] = useState<EmployeeItem[]>(INITIAL_EMPLOYEES);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newEmp, setNewEmp] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Engineering & Tech",
    designation: "Software Engineer",
  });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const item: EmployeeItem = {
      id: Date.now().toString(),
      code: `WO-00${employees.length + 1}`,
      name: newEmp.name,
      email: newEmp.email,
      phone: newEmp.phone,
      department: newEmp.department,
      designation: newEmp.designation,
      status: "ACTIVE",
      joinedDate: "Today",
    };
    setEmployees([item, ...employees]);
    setShowAddModal(false);
    setNewEmp({ name: "", email: "", phone: "", department: "Engineering & Tech", designation: "Software Engineer" });
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.code.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === "ALL" || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Employee Directory</h1>
          <p className="text-xs text-slate-400">Manage employee records, profiles, and organization assignments</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-emerald-400 hover:bg-emerald-300 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="h-4 w-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, ID or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="h-4 w-4 text-slate-500" />
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Departments</option>
            <option value="Engineering & Tech">Engineering & Tech</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Product & Design">Product & Design</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-6">Employee</th>
                <th className="py-3.5 px-6">Contact</th>
                <th className="py-3.5 px-6">Department</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Joined</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                        {emp.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm">{emp.name}</div>
                        <div className="text-[11px] text-slate-400">{emp.code} • {emp.designation}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Mail className="h-3 w-3 text-slate-500" />
                      <span>{emp.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Phone className="h-3 w-3 text-slate-500" />
                      <span>{emp.phone}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">
                      {emp.department}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        emp.status === "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : emp.status === "REMOTE"
                          ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">{emp.joinedDate}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-base font-bold text-white">Onboard New Employee</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Singh"
                  value={newEmp.name}
                  onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@workorbit.io"
                  value={newEmp.email}
                  onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91..."
                    value={newEmp.phone}
                    onChange={(e) => setNewEmp({ ...newEmp, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Department</label>
                  <select
                    value={newEmp.department}
                    onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Engineering & Tech">Engineering</option>
                    <option value="Human Resources">HR</option>
                    <option value="Product & Design">Design</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Designation</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Backend Developer"
                  value={newEmp.designation}
                  onChange={(e) => setNewEmp({ ...newEmp, designation: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-xs bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors mt-2"
              >
                Complete Onboarding
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
