import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorkOrbit SaaS - Enterprise HR & Workforce Automation",
  description: "Next-Gen SaaS HRMS platform for automated payroll, intelligent attendance, ATS recruitment, and dynamic organization management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
