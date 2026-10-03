"use client";

import { useState } from "react";
import { CalendarDays, Plus, Check, X, Clock, AlertCircle } from "lucide-react";

interface LeaveItem {
  id: string;
  employee: string;
  type: string;
  dates: string;
  days: number;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const INITIAL_LEAVES: LeaveItem[] = [
  {
    id: "l-1",
    employee: "Alex Kumar (WO-003)",
    type: "Sick Leave",
    dates: "Oct 04 - Oct 05, 2026",
    days: 2,
    reason: "Severe viral fever and medical recovery.",
    status: "PENDING",
  },
  {
    id: "l-2",
    employee: "Pooja Sharma (WO-004)",
    type: "Casual Leave",
    dates: "Oct 03, 2026",
    days: 1,
    reason: "Attending family function.",
    status: "APPROVED",
  },
];

export default function LeavesManagementPage() {
  const [leaves, setLeaves] = useState<LeaveItem[]>(INITIAL_LEAVES);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [newLeave, setNewLeave] = useState({
    type: "Casual Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleAction = (id: string, action: "APPROVED" | "REJECTED") => {
    setLeaves(
      leaves.map((l) => (l.id === id ? { ...l, status: action } : l))
    );
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const item: LeaveItem = {
      id: Date.now().toString(),
      employee: "Shivi Maurya (Current User)",
      type: newLeave.type,
      dates: `${newLeave.startDate} to ${newLeave.endDate}`,
      days: 1,
      reason: newLeave.reason,
      status: "PENDING",
    };
    setLeaves([item, ...leaves]);
    setShowApplyModal(false);
    setNewLeave({ type: "Casual Leave", startDate: "", endDate: "", reason: "" });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Leave Quotas & Approvals</h1>
          <p className="text-xs text-slate-400">Apply for time off and manage employee requests</p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-emerald-400 hover:bg-emerald-300 text-slate-950 flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Apply for Leave</span>
        </button>
      </div>

      {/* Quota Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 uppercase font-semibold">Casual Leave (CL)</div>
          <div className="text-3xl font-bold text-emerald-400 mt-2">10 / 12</div>
          <div className="text-[11px] text-slate-400 mt-1">Days remaining this calendar year</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 uppercase font-semibold">Medical / Sick (SL)</div>
          <div className="text-3xl font-bold text-cyan-400 mt-2">6 / 8</div>
          <div className="text-[11px] text-slate-400 mt-1">Days remaining with doctor note</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 uppercase font-semibold">Earned Privilege (EL)</div>
          <div className="text-3xl font-bold text-amber-400 mt-2">15 / 15</div>
          <div className="text-[11px] text-slate-400 mt-1">Carried forward eligible balance</div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-sm font-bold text-white">Leave Requests Pipeline</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-6">Employee</th>
                <th className="py-3.5 px-6">Leave Type</th>
                <th className="py-3.5 px-6">Duration</th>
                <th className="py-3.5 px-6">Reason</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">HR Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {leaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">{leave.employee}</td>
                  <td className="py-4 px-6 text-slate-300">{leave.type}</td>
                  <td className="py-4 px-6 text-slate-400">
                    <div>{leave.dates}</div>
                    <div className="text-[10px] text-emerald-400">{leave.days} Day(s)</div>
                  </td>
                  <td className="py-4 px-6 text-slate-400 max-w-xs">{leave.reason}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        leave.status === "APPROVED"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : leave.status === "REJECTED"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {leave.status === "PENDING" ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleAction(leave.id, "APPROVED")}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 font-semibold"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(leave.id, "REJECTED")}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 font-semibold"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Decided</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-base font-bold text-white">Apply for Time Off</h3>
              <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Leave Category</label>
                <select
                  value={newLeave.type}
                  onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Casual Leave">Casual Leave (CL)</option>
                  <option value="Sick Leave">Sick Leave (SL)</option>
                  <option value="Earned Leave">Earned Leave (EL)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={newLeave.startDate}
                    onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={newLeave.endDate}
                    onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Reason for Leave</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Explain brief reason..."
                  value={newLeave.reason}
                  onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-xs bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors mt-2"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
