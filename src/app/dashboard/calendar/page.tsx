"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "Holiday" | "Interview" | "Review" | "Birthday" | "Payroll";
  time?: string;
  badgeColor: string;
}

const EVENTS: CalendarEvent[] = [
  {
    id: "e-1",
    title: "Diwali National Holiday",
    date: "2026-10-20",
    type: "Holiday",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  {
    id: "e-2",
    title: "Diwali Bonus Disbursement",
    date: "2026-10-21",
    type: "Payroll",
    time: "11:00 AM",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "e-3",
    title: "Lead Next.js Dev - Round 2 Interview",
    date: "2026-10-14",
    type: "Interview",
    time: "02:30 PM",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  },
  {
    id: "e-4",
    title: "Q4 Engineering Townhall (Shivi Maurya)",
    date: "2026-10-18",
    type: "Review",
    time: "04:00 PM",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  {
    id: "e-5",
    title: "Birthday: Ananya Verma 🎂",
    date: "2026-10-25",
    type: "Birthday",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  },
];

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState("October 2026");
  const [eventTypeFilter, setEventTypeFilter] = useState("ALL");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const filteredEvents = EVENTS.filter(
    (e) => eventTypeFilter === "ALL" || e.type === eventTypeFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Dashboard</span>
            <span>/</span>
            <span>Overview</span>
            <span>/</span>
            <span className="text-emerald-400 font-medium">Calendar</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Calendar className="h-6 w-6 text-emerald-400" />
            Company Schedule &amp; Calendar
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Unified view of holidays, interview schedules, payroll runs, and team birthdays.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Event Types</option>
            <option value="Holiday">Holidays</option>
            <option value="Interview">Interviews</option>
            <option value="Payroll">Payroll</option>
            <option value="Birthday">Birthdays</option>
          </select>
        </div>
      </div>

      {/* Month Navigator */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>{currentMonth}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            31 Days
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-semibold">
            Today
          </button>
          <button className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid (October 2026 starts on Thursday) - Fully responsive with horizontal scroll on small mobile */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4 shadow-xl overflow-x-auto">
        <div className="min-w-[620px]">
          {/* Days of week */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 pb-3 border-b border-slate-800 uppercase tracking-wider">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Calendar days grid */}
          <div className="grid grid-cols-7 gap-2 pt-3">
            {/* Offset 4 days for Thu start */}
            <div className="min-h-[80px] sm:min-h-[90px] p-1.5 rounded-xl bg-slate-950/30 text-slate-600 text-xs">27</div>
            <div className="min-h-[80px] sm:min-h-[90px] p-1.5 rounded-xl bg-slate-950/30 text-slate-600 text-xs">28</div>
            <div className="min-h-[80px] sm:min-h-[90px] p-1.5 rounded-xl bg-slate-950/30 text-slate-600 text-xs">29</div>
            <div className="min-h-[80px] sm:min-h-[90px] p-1.5 rounded-xl bg-slate-950/30 text-slate-600 text-xs">30</div>

            {days.map((day) => {
              const dayStr = `2026-10-${day < 10 ? `0${day}` : day}`;
              const matchedEvents = filteredEvents.filter((e) => e.date === dayStr);
              const isToday = day === 11;

              return (
                <div
                  key={day}
                  className={`min-h-[80px] sm:min-h-[90px] p-2 rounded-xl border transition-all flex flex-col justify-between ${
                    isToday
                      ? "bg-emerald-500/10 border-emerald-500/50"
                      : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isToday
                          ? "h-5 w-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-extrabold"
                          : "text-slate-300"
                      }`}
                    >
                      {day}
                    </span>
                    {matchedEvents.length > 0 && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    )}
                  </div>

                  <div className="space-y-1 mt-1">
                    {matchedEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[9px] sm:text-[10px] p-1 rounded-md border truncate font-medium ${ev.badgeColor}`}
                        title={ev.title}
                      >
                        {ev.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Events List */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span>Upcoming Highlights This Month</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3"
            >
              <div>
                <p className="text-xs font-bold text-white">{ev.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {ev.date} {ev.time && `• ${ev.time}`}
                </p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${ev.badgeColor}`}>
                {ev.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
