import React from "react";
import PageBanner from "@/components/ui/PageBanner";
import { LEADERSHIP, SITE_INFO } from "@/data/site-content";
import Link from "next/link";
import { Quote, User, CheckCircle2, ArrowRight, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Director's Message - Prof. Piyush S. Agrawal",
  description: "Academic message from I/C Director Prof. Piyush S. Agrawal at Smt. S. M. Agrawal Institute of Management (AIM), Chalisgaon."
};

export default function DirectorPage() {
  const { director } = LEADERSHIP;

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageBanner
        title="Director's Message"
        subtitle="Academic message from I/C Director Prof. Piyush S. Agrawal, Head of Academic Directorate at AIM Chalisgaon."
        badge="Academic Leadership"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Director", href: "/about/director" }
        ]}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        
        {/* Profile Card */}
        <div className="p-8 rounded-2xl bg-[#0A192F] text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
          <div className="w-24 h-24 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
            <User className="w-12 h-12" />
          </div>

          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              ACADEMIC DIRECTORATE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{director.name}</h2>
            <p className="text-xs text-slate-300 font-medium">{director.role}</p>
            <p className="text-xs text-amber-300/80">AIM Chalisgaon</p>
          </div>
        </div>

        {/* Quote & Detailed Message */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          
          {director.quote && (
            <div className="p-6 rounded-xl bg-blue-50 border-l-4 border-blue-600 text-blue-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-blue-800">
                <Quote className="w-4 h-4 text-blue-600" />
                Academic Approach
              </div>
              <p className="text-base sm:text-lg italic font-semibold">
                &quot;{director.quote}&quot;
              </p>
            </div>
          )}

          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              Academic Vision & Student Development
            </h3>
            <p>{director.message}</p>
            <p>
              In today&apos;s fast-evolving digital era, higher education must combine technical mastery with practical adaptability. At AIM Chalisgaon, our curriculum for BCA, BBA, and MMS is tailored to ensure students develop solid programming foundations, analytical business acumen, and strong soft skills.
            </p>
          </div>

          {/* Key Vision Points */}
          {director.visionPoints && (
            <div className="space-y-4 border-t border-slate-100 pt-6">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Academic Priorities:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {director.visionPoints.map((point, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <strong>Prof. Piyush S. Agrawal</strong>
              <br />
              I/C Director, Smt. S. M. Agrawal Institute of Management, Chalisgaon
            </div>

            <Link
              href="/academics"
              className="inline-flex items-center gap-1.5 font-bold text-amber-700 hover:text-amber-800 transition-colors"
            >
              Explore Programs & Curriculum
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </section>
    </main>
  );
}
