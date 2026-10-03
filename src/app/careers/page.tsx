"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

const DEMO_JOBS = [
  {
    id: "job-1",
    title: "Senior Next.js & React Developer",
    department: "Engineering & Tech",
    location: "Hybrid (Noida / Remote)",
    type: "Full-time",
    salary: "₹18,00,000 - ₹28,00,000 / yr",
    description: "Build scalable cloud microservices, reactive UI workflows, and modern SaaS components with Next.js 14.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "job-2",
    title: "HR Operations & Talent Specialist",
    department: "Human Resources",
    location: "Onsite (Greater Noida)",
    type: "Full-time",
    salary: "₹8,00,000 - ₹14,00,000 / yr",
    description: "Manage end-to-end recruitment lifecycle, employee onboarding pipelines, and workplace operations.",
    tags: ["Recruitment", "People Ops", "ATS", "Employee Engagement"],
  },
  {
    id: "job-3",
    title: "DevOps & Cloud Infrastructure Engineer",
    department: "Engineering & Tech",
    location: "Remote",
    type: "Full-time",
    salary: "₹15,00,000 - ₹24,00,000 / yr",
    description: "Automate CI/CD pipelines, Docker containerization, Kubernetes clusters, and cloud monitoring.",
    tags: ["Docker", "Kubernetes", "AWS", "CI/CD"],
  },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    resumeLink: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedJob(null);
      setFormData({ name: "", email: "", phone: "", experience: "", resumeLink: "" });
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Careers Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-slate-950">
              WO
            </div>
            <span className="text-xl font-bold tracking-tight">WorkOrbit Careers</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300"
          >
            Employee / Admin Login
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="py-16 text-center border-b border-slate-800/60 bg-gradient-to-b from-slate-900/50 to-transparent px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
          We are actively hiring
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">Join the Team Building the Future of Work</h1>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm md:text-base">
          Solve meaningful problems with incredible colleagues. Explore open positions below and apply in 60 seconds.
        </p>
      </div>

      {/* Job Listings & Apply Modal */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 gap-6">
          {DEMO_JOBS.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-xl font-bold text-white">{job.title}</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {job.department}
                  </span>
                </div>
                <p className="text-sm text-slate-400 max-w-2xl">{job.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 flex-wrap">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-emerald-400" /> {job.location}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-cyan-400" /> {job.type}</span>
                  <span className="text-emerald-400 font-semibold">{job.salary}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedJob(job.id)}
                className="whitespace-nowrap px-6 py-3 rounded-xl text-sm font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors flex items-center justify-center gap-2 self-start md:self-center"
              >
                <span>Apply Now</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Modal Apply Form */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 relative shadow-2xl">
              {applied ? (
                <div className="py-12 text-center space-y-4">
                  <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Application Received!</h3>
                  <p className="text-sm text-slate-400">
                    Our talent team will review your profile and reach out within 48 business hours.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-white">Quick Candidate Application</h3>
                      <p className="text-xs text-slate-400">Enter your details to submit resume</p>
                    </div>
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="text-slate-400 hover:text-white text-sm"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="rahul@example.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">Phone</label>
                        <input
                          required
                          type="tel"
                          placeholder="+91 98765..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">Experience</label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. 3 Years"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Resume / Portfolio Link</label>
                      <input
                        required
                        type="url"
                        placeholder="https://drive.google.com/... or linkedin"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                        value={formData.resumeLink}
                        onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl font-semibold text-sm bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors mt-2"
                    >
                      Submit Application
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
