import React from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROGRAMS } from "@/data/site-content";
import {
  GraduationCap,
  Clock,
  Building2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen
} from "lucide-react";

export default function ProgramsSection() {
  return (
    <section className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <SectionHeader
          badge="Academic Offerings"
          title="Explore Our Offered"
          highlightText="Degree Programs"
          subtitle="All programs are affiliated with KBCNMU Jalgaon and approved by Directorate of Technical Education (DTE), Govt. of Maharashtra."
        />

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="group rounded-2xl bg-[#FAFAFA] border border-slate-200 hover:border-amber-500/50 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-200 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-amber-600 transition-all" />

              <div className="space-y-6">
                
                {/* Badge Header */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg text-xs font-black bg-amber-500/20 text-amber-900 border border-amber-500/30">
                    {prog.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {prog.duration}
                  </span>
                </div>

                {/* Program Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {prog.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {prog.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-2 border-t border-slate-200 pt-4">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Key Focus Areas:
                  </h4>
                  {prog.highlights.slice(0, 3).map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{h}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="pt-8 mt-6 border-t border-slate-200 flex items-center justify-between gap-3">
                <Link
                  href={`/academics/${prog.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#0A192F] hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  Detailed Syllabus
                </Link>

                <Link
                  href="/admissions"
                  className="inline-flex items-center justify-center p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors"
                  title="Apply for Admission"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
