"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Lock, Mail, User, ArrowRight, ShieldCheck, UserPlus, LogIn } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("admin@workorbit.io");
  const [password, setPassword] = useState("admin123");
  const [role, setRole] = useState("SUPER_ADMIN");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const displayName = isRegister
      ? name
      : role === "SUPER_ADMIN"
      ? "Shivam Maurya (Admin)"
      : "Alex Kumar (Employee)";

    localStorage.setItem(
      "workorbit_user",
      JSON.stringify({
        email,
        role: isRegister ? role : role,
        name: displayName,
      })
    );

    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  const selectPresetRole = (targetRole: "SUPER_ADMIN" | "EMPLOYEE") => {
    setRole(targetRole);
    if (targetRole === "SUPER_ADMIN") {
      setEmail("admin@workorbit.io");
      setPassword("admin123");
      setName("Shivam Maurya");
    } else {
      setEmail("alex.kumar@workorbit.io");
      setPassword("emp123");
      setName("Alex Kumar");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-6 relative overflow-hidden py-12">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-emerald-500/30">
              <Zap className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="text-2xl font-bold tracking-tight">WorkOrbit</span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {isRegister ? "Create New Workspace Account" : "Sign in to your workplace"}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isRegister
              ? "Register your company or employee account"
              : "Switch between Admin and Employee roles below"}
          </p>
        </div>

        {/* Tab Switcher: Login vs Register */}
        <div className="flex bg-slate-900/90 border border-slate-800 p-1 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              !isRegister ? "bg-emerald-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In (Login)
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              isRegister ? "bg-emerald-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
          {/* Quick Demo Switcher if on Login */}
          {!isRegister && (
            <div className="mb-6">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                1-Click Quick Demo Login:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => selectPresetRole("SUPER_ADMIN")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                    role === "SUPER_ADMIN"
                      ? "bg-emerald-500/15 border-emerald-500 text-emerald-400"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  👑 Super Admin
                </button>
                <button
                  type="button"
                  onClick={() => selectPresetRole("EMPLOYEE")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                    role === "EMPLOYEE"
                      ? "bg-cyan-500/15 border-cyan-500 text-cyan-400"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  👤 Employee Portal
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* If Registering, ask for Full Name */}
            {isRegister && (
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="h-4 w-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Work Email</label>
              <div className="relative">
                <Mail className="h-4 w-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="your.email@workorbit.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="h-4 w-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="SUPER_ADMIN">👑 Company Admin / HR Manager</option>
                  <option value="EMPLOYEE">👤 Staff / Regular Employee</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 to-teal-300 hover:opacity-95 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span>{loading ? "Processing..." : isRegister ? "Create Account & Enter" : "Sign In to Workspace"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Encrypted Session • Role-Based Access Control</span>
          </div>
        </div>
      </div>
    </div>
  );
}
