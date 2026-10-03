"use client";

import { useState } from "react";
import { Clock, Play, Square, CheckCircle2, AlertCircle, Calendar, MapPin } from "lucide-react";

export default function AttendancePage() {
  const [punched, setPunched] = useState(false);
  const [punchTime, setPunchTime] = useState<string | null>(null);

  const [records, setRecords] = useState([
    {
      id: "att-1",
      employee: "Shivam Maurya (WO-001)",
      date: "Today, Oct 03",
      clockIn: "09:02 AM",
      clockOut: "--",
      hours: "Running",
      status: "PRESENT",
      type: "HQ Biometric / Web Punch",
    },
    {
      id: "att-2",
      employee: "Shivangi Maurya (WO-002)",
      date: "Today, Oct 03",
      clockIn: "09:14 AM",
      clockOut: "--",
      hours: "Running",
      status: "PRESENT",
      type: "HQ Biometric",
    },
    {
      id: "att-3",
      employee: "Alex Kumar (WO-003)",
      date: "Today, Oct 03",
      clockIn: "09:30 AM",
      clockOut: "--",
      hours: "Running",
      status: "PRESENT",
      type: "Remote Web Punch",
    },
    {
      id: "att-4",
      employee: "Pooja Sharma (WO-004)",
      date: "Today, Oct 03",
      clockIn: "--",
      clockOut: "--",
      hours: "0.0",
      status: "LEAVE",
      type: "Casual Leave",
    },
  ]);

  const handlePunch = () => {
    if (!punched) {
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setPunched(true);
      setPunchTime(now);
      setRecords([
        {
          id: Date.now().toString(),
          employee: "You (Current Session)",
          date: "Today, Oct 03",
          clockIn: now,
          clockOut: "--",
          hours: "Just Clocked In",
          status: "PRESENT",
          type: "Web Punch",
        },
        ...records,
      ]);
    } else {
      setPunched(false);
      setPunchTime(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Attendance & Shifts</h1>
        <p className="text-xs text-slate-400">Virtual punch logs, biometric synchronization and daily shift tracking</p>
      </div>

      {/* Clock-in Terminal Banner */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Clock className="h-8 w-8" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Web Clock Terminal</div>
            <div className="text-xl font-bold text-white mt-1">
              {punched ? `Active Session since ${punchTime}` : "You haven't punched in yet"}
            </div>
            <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-emerald-400" />
              <span>Location: Greater Noida / Automatic IP Logged</span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePunch}
          className={`px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${
            punched
              ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30"
              : "bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-emerald-500/20"
          }`}
        >
          {punched ? (
            <>
              <Square className="h-4 w-4 fill-current" />
              <span>Punch Out</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" />
              <span>Punch In Now</span>
            </>
          )}
        </button>
      </div>

      {/* Daily Records Table */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Today Attendance Register (Oct 03, 2026)</h2>
          <span className="text-xs text-slate-400">Total Entries: {records.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-6">Employee</th>
                <th className="py-3.5 px-6">Punch In</th>
                <th className="py-3.5 px-6">Punch Out</th>
                <th className="py-3.5 px-6">Total Hours</th>
                <th className="py-3.5 px-6">Punch Method</th>
                <th className="py-3.5 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {records.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">{rec.employee}</td>
                  <td className="py-4 px-6 text-slate-300">{rec.clockIn}</td>
                  <td className="py-4 px-6 text-slate-400">{rec.clockOut}</td>
                  <td className="py-4 px-6 text-slate-300 font-medium">{rec.hours}</td>
                  <td className="py-4 px-6 text-slate-400">{rec.type}</td>
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        rec.status === "PRESENT"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
