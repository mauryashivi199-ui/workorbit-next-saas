"use client";

import { useState } from "react";
import { Settings, Shield, Bell, Key, Globe, Database, Save, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [companyName, setCompanyName] = useState("WorkOrbit Technologies");
  const [contactEmail, setContactEmail] = useState("info@workorbit.io");
  const [workDays, setWorkDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri"]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white">System Settings & RBAC</h1>
        <p className="text-xs text-slate-400">Configure company metadata, working hours, security & cloud webhooks</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Company Profile */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-white font-bold text-sm">
            <Globe className="h-4 w-4 text-emerald-400" />
            <span>Organization Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Official Support Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Working Hours & Shift Rules */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-white font-bold text-sm">
            <Shield className="h-4 w-4 text-cyan-400" />
            <span>Attendance & Policy Rules</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Standard Shift Time</label>
              <div className="text-slate-400 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5">
                09:00 AM - 06:00 PM (9.0 Hours)
              </div>
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Grace Period for Late Punch</label>
              <div className="text-slate-400 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5">
                15 Minutes Allowed
              </div>
            </div>
          </div>
        </div>

        {/* Security & Access Roles */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-white font-bold text-sm">
            <Key className="h-4 w-4 text-amber-400" />
            <span>Role-Based Access Control (RBAC)</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <div className="font-bold text-white">Super Admin Access</div>
                <div className="text-slate-400 text-[11px]">Full access to system, billing, and all modules</div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <div className="font-bold text-white">HR Manager Permissions</div>
                <div className="text-slate-400 text-[11px]">Employee records, leaves approval, and payroll runs</div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <div className="font-bold text-white">Employee Self-Service (ESS)</div>
                <div className="text-slate-400 text-[11px]">Web punch in/out, view payslips, and apply for leaves</div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl font-bold text-xs bg-emerald-400 hover:bg-emerald-300 text-slate-950 flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Save className="h-4 w-4" />
            <span>Save Settings</span>
          </button>
          {saved && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 className="h-4 w-4" />
              Settings saved successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
