import React from "react";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { SITE_INFO } from "@/data/site-content";
import {
  Building2,
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  Users,
  Target
} from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 bg-[#FAFAFA] text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Institutional Profile"
          title="Empowering Rural & Semi-Urban Youth Through"
          highlightText="Modern Higher Education"
          subtitle="Smt. S. M. Agrawal Institute of Management (AIM), Chalisgaon, is dedicated to academic excellence in computer applications and business management."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual Highlight Card with Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#0A192F] text-white p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-800 overflow-hidden">
              
              {/* Campus Building Thumbnail */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-700">
                <Image
                  src="/images/aim-building.png"
                  alt="Smt. S. M. Agrawal Institute of Management Chalisgaon Campus Building"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-80" />
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shrink-0">
                  2001
                </div>
                <div>
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Established Year</span>
                  <h3 className="text-xl font-bold text-white">25+ Years Legacy</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Founded by <strong>{SITE_INFO.trust}</strong>, AIM Chalisgaon empowers students with university-aligned computer science skills and business leadership capabilities.
              </p>

              <div className="space-y-3 border-t border-slate-800 pt-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Affiliated University</h4>
                    <p className="text-xs text-slate-400">{SITE_INFO.affiliation}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">State Authority Recognition</h4>
                    <p className="text-xs text-slate-400">{SITE_INFO.recognition}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shadow-md"
                >
                  Discover Full History & Mission
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

          {/* Right Column: Key Academic Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Academic Excellence</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Strictly aligned with KBCNMU North Maharashtra University curriculum, featuring internal assessments, semester exams, and practical lab training.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Experienced Faculty</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Qualified professors and instructors dedicated to personalized student mentoring, practical project guidance, and skill enhancement.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Modern Infrastructure</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Equipped computer laboratories, central academic library, AV seminar hall, and campus located conveniently on Dhule Road at B.P. Arts, S.M.A. Science, K.K.C. Commerce College Campus, Chalisgaon.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Career Readiness</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Focused on preparing graduates for IT software jobs, enterprise management roles, higher studies (MCA/MBA), and competitive examinations.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
