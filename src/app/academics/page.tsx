import React from "react";
import PageBanner from "@/components/ui/PageBanner";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROGRAMS, SITE_INFO } from "@/data/site-content";
import Link from "next/link";
import {
  GraduationCap,
  Clock,
  Building2,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  FileText
} from "lucide-react";

export const metadata = {
  title: "Academic Programs - BCA, BBA, MMS",
  description: "Explore undergraduate and postgraduate programs offered at Smt. S. M. Agrawal Institute of Management (AIM), Chalisgaon."
};

export default function AcademicsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageBanner
        title="Academic Programs"
        subtitle="Undergraduate and postgraduate degree programs affiliated with KBCNMU Jalgaon and recognized by DTE Maharashtra."
        badge="Curriculum & Degree Pathways"
        breadcrumbs={[]}
        parentHref="/"
        parentLabel="Home"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Intro Grid */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Higher Education Framework at AIM Chalisgaon
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
            Our academic structure offers comprehensive technical training in Computer Applications (BCA) and strategic managerial expertise in Business Administration (BBA) and Management Studies (MMS). Designed under university guidelines, our courses combine semester theory with practical laboratory sessions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>KBCNMU University Affiliated</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>DTE Code: {SITE_INFO.dcode}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span>NEP Compliant Structure</span>
            </div>
          </div>
        </div>

        {/* Detailed Program Cards */}
        <div className="space-y-8">
          {PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg text-xs font-black bg-amber-500/20 text-amber-900 border border-amber-500/30">
                    {prog.code}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {prog.duration}
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900">
                  {prog.name} ({prog.degree})
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {prog.overview}
                </p>

                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Program Highlights:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {prog.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Box */}
              <div className="lg:col-span-4 p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4 text-center lg:text-left">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Affiliation</span>
                  <p className="text-xs font-bold text-slate-900">{prog.affiliation}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    href={`/academics/${prog.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-slate-800 text-amber-400 font-bold text-xs transition-colors shadow"
                  >
                    <BookOpen className="w-4 h-4" />
                    View Course Syllabus & Career
                  </Link>

                  <Link
                    href="/admissions"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors"
                  >
                    Apply For Admission
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}
