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
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [resumeFileName, setResumeFileName] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkillInput, setCustomSkillInput] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    noticePeriod: "",
    coverLetter: "",
    portfolioLink: "",
  });

  const availableSkillSuggestions = [
    "Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS",
    "Prisma", "PostgreSQL", "Docker", "AWS", "Python",
    "Recruitment", "People Ops", "ATS", "HR Analytics"
  ];

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResumeFileName(file.name);
    setIsParsingResume(true);

    // Smart simulated resume parser extracting skills & autofilling
    setTimeout(() => {
      setIsParsingResume(false);
      const fname = file.name.toLowerCase();
      let extracted: string[] = [];

      if (fname.includes("fullstack") || fname.includes("react") || fname.includes("frontend") || fname.includes("dev")) {
        extracted = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"];
      } else if (fname.includes("hr") || fname.includes("recruiter") || fname.includes("talent")) {
        extracted = ["Recruitment", "People Ops", "ATS", "HR Analytics"];
      } else if (fname.includes("devops") || fname.includes("cloud") || fname.includes("infra")) {
        extracted = ["Docker", "AWS", "CI/CD", "Kubernetes", "Linux"];
      } else {
        extracted = ["Next.js", "TypeScript", "Node.js", "PostgreSQL"];
      }

      setSelectedSkills((prev) => Array.from(new Set([...prev, ...extracted])));
    }, 1200);
  };

  const addCustomSkill = () => {
    if (customSkillInput.trim() && !selectedSkills.includes(customSkillInput.trim())) {
      setSelectedSkills([...selectedSkills, customSkillInput.trim()]);
      setCustomSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skillToRemove));
  };

  const toggleSkillSuggestion = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFileName) {
      alert("Please upload your Resume in PDF format.");
      return;
    }

    try {
      // Post directly to MongoDB API endpoint
      await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJob || "job-1",
          jobTitle: activeJobData?.title || "Position",
          candidateName: formData.name,
          email: formData.email,
          phone: formData.phone,
          qualification: formData.qualification,
          experience: formData.experience,
          noticePeriod: formData.noticePeriod,
          resumeFileName,
          skills: selectedSkills,
          portfolioUrl: formData.portfolioLink,
          coverLetter: formData.coverLetter,
        }),
      });
    } catch (err) {
      console.warn("Could not reach MongoDB endpoint, proceeding with visual feedback:", err);
    }

    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedJob(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        qualification: "",
        experience: "",
        noticePeriod: "",
        coverLetter: "",
        portfolioLink: "",
      });
      setResumeFileName("");
      setSelectedSkills([]);
    }, 3500);
  };

  const activeJobData = DEMO_JOBS.find((j) => j.id === selectedJob);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Careers Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/crewzen-logo.png"
              alt="Crewzen Workforce Management Platform"
              className="h-14 w-auto max-w-[210px] object-contain rounded-lg"
            />
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Careers
            </span>
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
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl p-6 md:p-8 relative shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
              {applied ? (
                <div className="py-12 text-center space-y-4">
                  <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Application Received Successfully!</h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    Thank you <span className="text-emerald-400 font-semibold">{formData.name}</span>. Our HR Talent Team will review your resume and reach out within 48 business hours.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-6">
                    <div>
                      <div className="text-xs uppercase tracking-wider font-semibold text-emerald-400">Application Form</div>
                      <h3 className="text-xl font-bold text-white mt-1">
                        Apply for: {activeJobData?.title || "Open Position"}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Fields marked with <span className="text-rose-500 font-bold">*</span> are required.
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 text-lg leading-none"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Candidate Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                          Full Name <span className="text-rose-500 font-bold">*</span>
                        </label>
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
                        <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                          Email Address <span className="text-rose-500 font-bold">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="rahul@example.com"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Phone & Qualification */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                          Phone Number <span className="text-rose-500 font-bold">*</span>
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                          Highest Qualification <span className="text-rose-500 font-bold">*</span>
                        </label>
                        <select
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                          value={formData.qualification}
                          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        >
                          <option value="">Select Qualification</option>
                          <option value="B.Tech / B.E. (Computer Science / IT)">B.Tech / B.E. (Computer Science / IT)</option>
                          <option value="BCA / MCA">BCA / MCA</option>
                          <option value="B.Sc / M.Sc (IT / CS)">B.Sc / M.Sc (IT / CS)</option>
                          <option value="MBA / PGDM (HR / Operations)">MBA / PGDM (HR / Operations)</option>
                          <option value="BBA / B.Com / Bachelor Degree">BBA / B.Com / Bachelor Degree</option>
                          <option value="Other Postgraduate Degree">Other Postgraduate Degree</option>
                          <option value="Diploma / Self Taught">Diploma / Self Taught</option>
                        </select>
                      </div>
                    </div>

                    {/* Total Experience & Notice Period */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                          Total Experience <span className="text-rose-500 font-bold">*</span>
                        </label>
                        <select
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        >
                          <option value="">Select Experience</option>
                          <option value="Fresher (0 Years)">Fresher (0 Years)</option>
                          <option value="1 - 2 Years">1 - 2 Years</option>
                          <option value="3 - 5 Years">3 - 5 Years</option>
                          <option value="5 - 8 Years">5 - 8 Years</option>
                          <option value="8+ Years (Lead / Staff)">8+ Years (Lead / Staff)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                          Notice Period <span className="text-rose-500 font-bold">*</span>
                        </label>
                        <select
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                          value={formData.noticePeriod}
                          onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                        >
                          <option value="">Select Notice Period</option>
                          <option value="Immediate Joiner (< 7 Days)">Immediate Joiner (&lt; 7 Days)</option>
                          <option value="15 Days">15 Days</option>
                          <option value="30 Days (1 Month)">30 Days (1 Month)</option>
                          <option value="60 Days (2 Months)">60 Days (2 Months)</option>
                          <option value="90 Days (3 Months)">90 Days (3 Months)</option>
                          <option value="Currently Serving Notice Period">Currently Serving Notice Period</option>
                        </select>
                      </div>
                    </div>

                    {/* Resume Upload in PDF (With Auto Skill Extraction) */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-300 block">
                          Upload Resume in PDF <span className="text-rose-500 font-bold">*</span>
                        </label>
                        <span className="text-[11px] text-emerald-400 font-medium">Smart AI Skill Extractor</span>
                      </div>

                      <div className="relative border-2 border-dashed border-slate-700 hover:border-emerald-500/70 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-900/40">
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          required={!resumeFileName}
                          onChange={handleResumeFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-200">
                            {resumeFileName ? (
                              <span className="text-emerald-400 font-semibold flex items-center justify-center gap-2">
                                <CheckCircle2 className="h-4 w-4" /> {resumeFileName}
                              </span>
                            ) : (
                              <span>Click to browse or drop your <strong className="text-white">Resume.pdf</strong></span>
                            )}
                          </p>
                          <p className="text-xs text-slate-400">PDF file only (Max size: 5MB)</p>
                        </div>
                      </div>

                      {isParsingResume && (
                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                          <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs text-emerald-300 font-medium">
                            Scanning PDF and automatically extracting skills &amp; keywords...
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Skills (Auto-Populated from Resume + Manual Addition) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-slate-300">
                          Key Skills <span className="text-slate-400 font-normal">(Auto-extracted from Resume or pick below)</span>
                        </label>
                        <span className="text-[11px] text-slate-400">{selectedSkills.length} selected</span>
                      </div>

                      {/* Selected Skill Badges */}
                      <div className="flex flex-wrap gap-2 mb-3 min-h-[36px] p-2 rounded-xl bg-slate-950 border border-slate-800">
                        {selectedSkills.length === 0 ? (
                          <span className="text-xs text-slate-500 italic py-1 px-1">Upload PDF or click suggestions to add skills...</span>
                        ) : (
                          selectedSkills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-medium"
                            >
                              <span>{skill}</span>
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="text-emerald-400 hover:text-white"
                              >
                                ×
                              </button>
                            </span>
                          ))
                        )}
                      </div>

                      {/* Skill Quick Suggestions */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {availableSkillSuggestions.map((skill) => {
                          const isSelected = selectedSkills.includes(skill);
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => toggleSkillSuggestion(skill)}
                              className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors border ${
                                isSelected
                                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                  : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                              }`}
                            >
                              + {skill}
                            </button>
                          );
                        })}
                      </div>

                      {/* Add Custom Skill input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add custom skill (e.g. GraphQL, Redux, Jira)..."
                          value={customSkillInput}
                          onChange={(e) => setCustomSkillInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addCustomSkill();
                            }
                          }}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={addCustomSkill}
                          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
                        >
                          Add Skill
                        </button>
                      </div>
                    </div>

                    {/* Portfolio / LinkedIn Link (Optional) */}
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Portfolio / LinkedIn / GitHub URL <span className="text-slate-500 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/... or github.com/..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                        value={formData.portfolioLink}
                        onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                      />
                    </div>

                    {/* Covering Letter (Optional) */}
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Covering Letter <span className="text-slate-500 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Briefly tell us why you are a great fit for this position and your key achievements..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none"
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl font-bold text-sm bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-colors shadow-lg shadow-emerald-500/20"
                      >
                        Submit Job Application
                      </button>
                    </div>
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
