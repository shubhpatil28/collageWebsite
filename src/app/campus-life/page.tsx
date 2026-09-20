import React from "react";
import PageBanner from "@/components/ui/PageBanner";
import { CAMPUS_FACILITIES } from "@/data/site-content";
import Image from "next/image";
import Link from "next/link";
import {
  Monitor,
  BookOpenCheck,
  Presentation,
  CheckCircle2
} from "lucide-react";

export const metadata = {
  title: "Campus Life & Infrastructure",
  description: "Explore computer laboratories, central library, audio-visual seminar hall, and campus facilities at AIM Chalisgaon."
};

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  BookOpenCheck,
  Presentation
};

export default function CampusLifePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageBanner
        title="Campus Infrastructure & Facilities"
        subtitle="Modern academic infrastructure, computer laboratories, central library, and student development facilities at AIM Chalisgaon."
        badge="Campus Facilities"
        breadcrumbs={[]}
        parentHref="/"
        parentLabel="Home"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Facilities Grid with Next/Image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CAMPUS_FACILITIES.map((fac) => {
            const IconComponent = iconMap[fac.icon] || Monitor;
            return (
              <div
                key={fac.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Facility Image Container */}
                  <div className="relative w-full h-52 bg-slate-100 overflow-hidden">
                    <Image
                      src={fac.image}
                      alt={`Smt. S. M. Agrawal Institute of Management - ${fac.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-slate-900/80 backdrop-blur-md text-amber-400 flex items-center justify-center border border-slate-700">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                        {fac.tagline}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900">
                        {fac.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {fac.description}
                    </p>

                    <div className="space-y-2 border-t border-slate-100 pt-4">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Key Features:
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-700">
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
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            Students at AIM Chalisgaon actively participate in university youth festivals, sports meets, technical seminars, cultural gatherings, and industrial visits organized throughout the academic session.
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
