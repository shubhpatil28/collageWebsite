import React from "react";
import PageBanner from "@/components/ui/PageBanner";
import { CAMPUS_FACILITIES } from "@/data/site-content";
import Link from "next/link";
import {
  Monitor,
  BookOpenCheck,
  Presentation,
  Trophy,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from "lucide-react";

export const metadata = {
  title: "Campus Life & Infrastructure",
  description: "Explore laboratories, central library, seminar hall, and student life facilities at AIM Chalisgaon."
};

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  BookOpenCheck,
  Presentation,
  Trophy
};

export default function CampusLifePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageBanner
        title="Campus Infrastructure & Student Life"
        subtitle="Modern academic facilities, computer labs, central library, and student development activities at AIM Chalisgaon."
        badge="Campus Facilities"
        breadcrumbs={[{ label: "Campus Life", href: "/campus-life" }]}
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CAMPUS_FACILITIES.map((fac) => {
            const IconComponent = iconMap[fac.icon] || Monitor;
            return (
              <div
                key={fac.id}
                className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-amber-700" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      {fac.tagline}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {fac.name}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Key Highlights:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {fac.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Co-Curricular & Student Development */}
        <div className="p-8 rounded-2xl bg-[#0A192F] text-white border border-slate-800 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">STUDENT DEVELOPMENT</span>
            <h3 className="text-2xl font-bold text-white">Co-Curricular & Extracurricular Activities</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
            Students at AIM Chalisgaon actively participate in university youth festivals, annual sports meets, technical seminars, cultural gatherings, and industrial visits organized throughout the academic session.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/admissions"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors"
            >
              Enquire For Admissions 2026-27
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}
