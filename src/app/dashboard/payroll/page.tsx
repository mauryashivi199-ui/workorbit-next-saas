"use client";

import { useState } from "react";
import { Banknote, Download, CheckCircle2, Play, FileText, ArrowRight } from "lucide-react";

interface PayrollItem {
  id: string;
  employee: string;
  role: string;
  basic: number;
  hra: number;
  allowance: number;
  deductions: number;
  netPay: number;
  status: "PROCESSED" | "PAID";
}

const INITIAL_PAYROLL: PayrollItem[] = [
  {
    id: "p-1",
    employee: "Shivi Maurya (WO-001)",
    role: "Lead Software Architect",
    basic: 85000,
    hra: 34000,
    allowance: 15000,
    deductions: 19000, // PF + Tax
    netPay: 115000,
    status: "PAID",
  },
  {
    id: "p-2",
    employee: "Shivangi Maurya (WO-002)",
    role: "HR Operations Director",
    basic: 65000,
    hra: 26000,
    allowance: 12000,
    deductions: 13000,
    netPay: 90000,
    status: "PAID",
  },
  {
    id: "p-3",
    employee: "Alex Kumar (WO-003)",
    role: "Senior Full Stack Engineer",
    basic: 55000,
    hra: 22000,
    allowance: 10000,
    deductions: 11000,
    netPay: 76000,
    status: "PROCESSED",
  },
];

export default function PayrollPage() {
  const [payroll, setPayroll] = useState<PayrollItem[]>(INITIAL_PAYROLL);
  const [running, setRunning] = useState(false);
  const [selectedPayslip, setSelectedPayslip] = useState<PayrollItem | null>(null);

  const handleRunPayroll = () => {
    setRunning(true);
    setTimeout(() => {
      setPayroll(payroll.map((p) => ({ ...p, status: "PAID" })));
      setRunning(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Payroll & Payslips Engine</h1>
          <p className="text-xs text-slate-400">Automated compensation calculation, tax deductions & digital payslips</p>
        </div>

        <button
          onClick={handleRunPayroll}
          disabled={running}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-400 hover:bg-emerald-300 text-slate-950 flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <Play className="h-4 w-4 fill-current" />
          <span>{running ? "Processing Batch..." : "Run Monthly Payroll"}</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 uppercase font-semibold">Total Net Outflow</div>
          <div className="text-3xl font-bold text-white mt-2">₹2,81,000</div>
          <div className="text-[11px] text-emerald-400 mt-1">Calculated for current cycle</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 uppercase font-semibold">Total Tax & PF Deducted</div>
          <div className="text-3xl font-bold text-cyan-400 mt-2">₹43,000</div>
          <div className="text-[11px] text-slate-400 mt-1">Statutory compliance reserved</div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 uppercase font-semibold">Disbursement Status</div>
          <div className="text-3xl font-bold text-emerald-400 mt-2">100% Ready</div>
          <div className="text-[11px] text-slate-400 mt-1">Direct Bank Transfer Enabled</div>
        </div>
      </div>

      {/* Payroll Records */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-sm font-bold text-white">Monthly Salary Statements</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-6">Employee</th>
                <th className="py-3.5 px-6">Basic Pay</th>
                <th className="py-3.5 px-6">HRA + Allowances</th>
                <th className="py-3.5 px-6">Deductions (PF/Tax)</th>
                <th className="py-3.5 px-6 font-bold text-emerald-400">Net Salary</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {payroll.map((p) => (
                <tr key={p.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-white">{p.employee}</div>
                    <div className="text-[11px] text-slate-400">{p.role}</div>
                  </td>
                  <td className="py-4 px-6 font-mono">₹{p.basic.toLocaleString()}</td>
                  <td className="py-4 px-6 font-mono text-cyan-400">
                    +₹{(p.hra + p.allowance).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 font-mono text-rose-400">
                    -₹{p.deductions.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-emerald-400 text-sm">
                    ₹{p.netPay.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        p.status === "PAID"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedPayslip(p)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 inline-flex items-center gap-1.5 transition-colors font-semibold"
                    >
                      <FileText className="h-3.5 w-3.5 text-emerald-400" />
                      <span>View PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Digital Payslip Modal View */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-xs">
                  WO
                </div>
                <h3 className="text-lg font-bold text-white">WorkOrbit Payslip</h3>
              </div>
              <button onClick={() => setSelectedPayslip(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="mt-6 space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex justify-between">
                <div>
                  <div className="text-slate-400">Employee</div>
                  <div className="font-bold text-white text-sm mt-0.5">{selectedPayslip.employee}</div>
                  <div className="text-slate-400 mt-0.5">{selectedPayslip.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400">Pay Period</div>
                  <div className="font-bold text-emerald-400 mt-0.5">October 2026</div>
                  <div className="text-emerald-400">Status: PAID</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
                  <div className="font-bold text-slate-300 text-xs border-b border-slate-800 pb-1">Earnings</div>
                  <div className="flex justify-between"><span>Basic Pay</span> <span className="font-mono">₹{selectedPayslip.basic.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>HRA</span> <span className="font-mono">₹{selectedPayslip.hra.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Special Allowance</span> <span className="font-mono">₹{selectedPayslip.allowance.toLocaleString()}</span></div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
                  <div className="font-bold text-slate-300 text-xs border-b border-slate-800 pb-1">Deductions</div>
                  <div className="flex justify-between"><span>Provident Fund (PF)</span> <span className="font-mono">₹{(selectedPayslip.deductions * 0.6).toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Income Tax (TDS)</span> <span className="font-mono">₹{(selectedPayslip.deductions * 0.4).toLocaleString()}</span></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Net Payable Salary</div>
                  <div className="text-2xl font-extrabold text-white mt-0.5 font-mono">₹{selectedPayslip.netPay.toLocaleString()}</div>
                </div>
                <button
                  onClick={() => alert("Payslip PDF exported successfully!")}
                  className="px-4 py-2 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
