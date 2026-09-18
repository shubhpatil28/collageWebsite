import React from "react";
import PageBanner from "@/components/ui/PageBanner";
import { PROGRAMS, SITE_INFO } from "@/data/site-content";
import Link from "next/link";
import {
  GraduationCap,
  Clock,
  Building2,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Briefcase,
  Layers
} from "lucide-react";

export const metadata = {
  title: "MMS Program - Master of Management Studies",
  description: "MMS (Computer Management) Degree Program at AIM Chalisgaon affiliated with KBCNMU Jalgaon."
};

export default function MmsProgramPage() {
  const mms = PROGRAMS.find((p) => p.id === "mms") || PROGRAMS[2];

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageBanner
        title={`${mms.code} - ${mms.name}`}
        subtitle={mms.description}
        badge={mms.degree}
        breadcrumbs={[
          { label: "Academics", href: "/academics" },
          { label: "MMS", href: "/academics/mms" }
        ]}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Quick Facts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-bold uppercase">Duration</span>
            <p className="text-sm font-bold text-slate-900">{mms.duration}</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-bold uppercase">Affiliation</span>
            <p className="text-sm font-bold text-slate-900">{mms.affiliation}</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-bold uppercase">Approval</span>
            <p className="text-sm font-bold text-slate-900">{mms.approval}</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs text-slate-500 font-bold uppercase">Degree Level</span>
            <p className="text-sm font-bold text-slate-900">Postgraduate (PG)</p>
          </div>
        </div>

        {/* Overview & Eligibility */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Program Overview</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {mms.overview}
              </p>
            </div>

            {/* Curriculum Breakdown */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600" />
                <h3 className="text-xl font-bold text-slate-900">Curriculum & Subjects</h3>
              </div>

              <div className="space-y-6">
                {mms.subjects.map((sem, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="text-sm font-bold text-[#0A192F] uppercase tracking-wider border-b border-slate-200 pb-2">
                      {sem.semester}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {sem.courses.map((c, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Paths */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-600" />
                <h3 className="text-xl font-bold text-slate-900">Career Opportunities</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
                {mms.careerOpportunities.map((career, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{career}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Eligibility & Admission CTA */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Eligibility Criteria
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                {mms.eligibility.map((crit, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{crit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0A192F] text-white border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white">Apply For MMS Admission</h3>
              <p className="text-xs text-slate-300">
                Postgraduate admissions open for Academic Year 2026-27 under KBCNMU Jalgaon directives.
              </p>

              <Link
                href="/admissions"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shadow-lg"
              >
                Start Admission Enquiry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </section>
    </main>
  );
}
