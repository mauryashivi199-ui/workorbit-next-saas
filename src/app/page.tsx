import Link from "next/link";
import {
  Users,
  Clock,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Zap className="h-6 w-6 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Work<span className="text-emerald-400">Orbit</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#solutions" className="hover:text-emerald-400 transition-colors">Modules</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
            <Link href="/careers" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <span>Careers</span>
              <span className="text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">Hiring</span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:opacity-95 transition-all shadow-lg shadow-emerald-500/20"
            >
              <span>Live Console</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.2),rgba(255,255,255,0))]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            WorkOrbit SaaS 2.0 • Ultra-Fast HR Automation
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Manage Workforce, Payroll & Hiring in{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              One Unified Orbit
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Eliminate fragmented spreadsheets. From smart biometric attendance to 1-click automated payslips and candidate ATS pipelines — everything in a high-speed reactive dashboard.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-xl font-semibold text-base text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-xl shadow-emerald-500/25 flex items-center gap-2"
            >
              <span>Explore Live Dashboard</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/careers"
              className="px-8 py-4 rounded-xl font-semibold text-base text-slate-200 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 transition-all"
            >
              Public Career Portal
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-10 border-t border-slate-800/80">
            <div>
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">1-Click</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Payroll Runs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">20K+</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Active Employees</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-400">ISO 27001</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Enterprise Security</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Enterprise Modules (Bento Grid) */}
      <section id="features" className="py-24 bg-slate-900/40 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-3">Enterprise Core Features</h2>
            <p className="text-3xl md:text-5xl font-bold tracking-tight text-white">Everything HR teams need to operate smoothly</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Employee 360° & Org Tree</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Centralized personal documents, department tagging, designations, promotions, and visual reporting hierarchy.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Attendance & Leaves</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                One-tap web clock punch with geo-logging, shift management, and auto-calculating annual leave balance quotas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Automated Payroll Engine</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Custom salary components, PF, TDS, dynamic allowances, and automated salary slip generation with PDF downloads.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">ATS Recruitment Kanban</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Post open roles publicly, receive candidate applications, and move them smoothly across interview pipeline stages.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">KPIs & Reviews</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Define employee performance objectives, quarterly milestones, manager appraisals, and employee growth metrics.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Role-Based Access (RBAC)</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tailored permissions for Super Admin, HR Directors, Department Leads, and individual Employee Self-Service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-3">Transparent Plans</h2>
            <p className="text-3xl md:text-5xl font-bold tracking-tight text-white">Simple, scalable pricing for every stage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Starter</h3>
                <p className="text-slate-400 text-xs mt-1">For small teams getting organized</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">₹0</span>
                  <span className="text-slate-400 text-xs">/ month</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Up to 10 Employees</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Web Clock In/Out</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Basic Leave Management</li>
                </ul>
              </div>
              <Link href="/dashboard" className="mt-8 block text-center py-3 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 transition-colors">
                Start Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-2xl bg-slate-900/90 border-2 border-emerald-500/80 flex flex-col justify-between shadow-2xl shadow-emerald-500/10 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold text-[11px] uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Growth Pro</h3>
                <p className="text-slate-400 text-xs mt-1">Full enterprise HR automation</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-emerald-400">₹2,499</span>
                  <span className="text-slate-400 text-xs">/ month</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Up to 100 Employees</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Automated Payroll & Tax Engine</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> ATS Recruitment Pipeline</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Interactive Org Chart</li>
                </ul>
              </div>
              <Link href="/dashboard" className="mt-8 block text-center py-3 rounded-xl font-semibold text-sm bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors shadow-lg shadow-emerald-500/20">
                Upgrade to Pro
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Enterprise</h3>
                <p className="text-slate-400 text-xs mt-1">Custom multi-tenant deployments</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">Custom</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Unlimited Employees</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Dedicated Cloud Database</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> 24/7 SLA Priority Support</li>
                </ul>
              </div>
              <Link href="/login" className="mt-8 block text-center py-3 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-xs">
              WO
            </div>
            <span>© 2026 WorkOrbit Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/careers" className="hover:text-slate-300 transition-colors">Careers</Link>
            <Link href="/login" className="hover:text-slate-300 transition-colors">Admin Console</Link>
            <a href="#features" className="hover:text-slate-300 transition-colors">System Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
